import { getAssetFromKV, mapRequestToAsset } from '@cloudflare/kv-asset-handler';

/**
 * 处理静态资产请求
 */
async function handleStaticAsset(event) {
  const url = new URL(event.request.url);
  
  // 对于根路径，映射到index.html
  if (url.pathname === '/') {
    url.pathname = '/index.html';
  }
  
  // 对于以/结尾的路径，添加index.html
  if (url.pathname.endsWith('/')) {
    url.pathname += 'index.html';
  }
  
  try {
    const asset = await getAssetFromKV(event, {
      mapRequestToAsset: (req) => mapRequestToAsset(new Request(url, req))
    });
    return asset;
  } catch (error) {
    // 找不到资产时回退到 404.html，返回 404 状态码
    try {
      const notFoundUrl = new URL(event.request.url);
      notFoundUrl.pathname = '/404.html';
      const notFoundAsset = await getAssetFromKV(event, {
        mapRequestToAsset: () => new Request(notFoundUrl, event.request)
      });
      return new Response(notFoundAsset.body, {
        status: 404,
        headers: notFoundAsset.headers
      });
    } catch (fallbackError) {
      console.error('Asset not found and no 404.html:', error);
      return new Response('Not Found', {
        status: 404,
        headers: {
          'content-type': 'text/plain'
        }
      });
    }
  }
}

/**
 * 主请求处理函数
 */
async function handleRequest(event) {
  const request = event.request;
  const url = new URL(request.url);
  
  // 处理静态资产
  return await handleStaticAsset(event);
}

// 导出fetch事件处理函数
export default {
  fetch: handleRequest
};
