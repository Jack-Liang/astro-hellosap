export function createTagsToggle(containerId, toggleId, options = {}) {
  const {
    lineHeight = 40,
    maxLines = 2,
    initialCollapsed = true
  } = options;

  const container = document.getElementById(containerId);
  const toggle = document.getElementById(toggleId);

  if (!container || !toggle) return;

  const checkOverflow = () => {
    const containerHeight = container.offsetHeight;
    const threshold = lineHeight * maxLines;

    if (containerHeight > threshold) {
      toggle.style.display = initialCollapsed ? 'inline-flex' : 'flex';
      if (initialCollapsed) {
        container.classList.add('collapsed');
      }
      toggle.querySelector('.toggle-text').textContent = '展开';
      toggle.querySelector('.toggle-arrow').textContent = '▼';
    } else {
      toggle.style.display = 'none';
      container.classList.remove('collapsed');
    }
  };

  const toggleCollapse = () => {
    const isCollapsed = container.classList.contains('collapsed');

    if (isCollapsed) {
      container.classList.remove('collapsed');
      toggle.querySelector('.toggle-text').textContent = '收起';
      toggle.querySelector('.toggle-arrow').textContent = '▲';
    } else {
      container.classList.add('collapsed');
      toggle.querySelector('.toggle-text').textContent = '展开';
      toggle.querySelector('.toggle-arrow').textContent = '▼';
    }
  };

  toggle.addEventListener('click', toggleCollapse);
  window.addEventListener('resize', checkOverflow);

  const deferredCheck = () => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        checkOverflow();
        setTimeout(checkOverflow, 500);
        setTimeout(checkOverflow, 1000);
      });
    });
  };

  return {
    checkOverflow,
    toggleCollapse,
    deferredCheck
  };
}