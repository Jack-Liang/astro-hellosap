/**
 * 标签区域折叠：当标签换行超过 maxLines 行时显示"展开/收起"按钮。
 * blog/index.astro 与 blog/[slug].astro 共用此逻辑。
 *
 * @param {string} containerId 标签容器元素 id
 * @param {string} toggleId    展开/收起按钮元素 id
 * @param {object} options
 * @param {number} [options.lineHeight=40] 单行高度（px）
 * @param {number} [options.maxLines=2]    超过多少行才出现折叠按钮
 * @param {string} [options.expandedDisplay='inline-flex'] 展开后按钮的 display 值
 */
export function createTagsToggle(containerId, toggleId, options = {}) {
  const {
    lineHeight = 40,
    maxLines = 2,
    expandedDisplay = 'inline-flex'
  } = options

  const container = document.getElementById(containerId)
  const toggle = document.getElementById(toggleId)

  if (!container || !toggle) return

  const threshold = lineHeight * maxLines

  // 把按钮复位为"展开"态（容器折叠、按钮可点开）
  const collapse = () => {
    container.classList.add('collapsed')
    toggle.querySelector('.toggle-text').textContent = '展开'
    toggle.querySelector('.toggle-arrow').textContent = '▼'
  }

  const expand = () => {
    container.classList.remove('collapsed')
    toggle.querySelector('.toggle-text').textContent = '收起'
    toggle.querySelector('.toggle-arrow').textContent = '▲'
  }

  // 根据容器实际高度决定是否需要折叠按钮
  const checkOverflow = () => {
    if (container.offsetHeight > threshold) {
      toggle.style.display = expandedDisplay
      collapse()
    } else {
      toggle.style.display = 'none'
      container.classList.remove('collapsed')
    }
  }

  toggle.addEventListener('click', () => {
    if (container.classList.contains('collapsed')) {
      expand()
    } else {
      collapse()
    }
  })

  window.addEventListener('resize', checkOverflow)

  // 标签宽度可能受字体加载/图片影响，延迟多次检测确保准确
  const deferredCheck = () => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        checkOverflow()
        setTimeout(checkOverflow, 500)
        setTimeout(checkOverflow, 1000)
      })
    })
  }

  deferredCheck()

  return { checkOverflow, collapse, expand }
}
