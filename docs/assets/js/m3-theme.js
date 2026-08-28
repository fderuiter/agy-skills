// Material Design 3 (Material You) Interactive Theme Controller for agy-skills

(function () {
  'use strict';

  // 1. Theme Management (Light / Dark)
  const THEME_STORAGE_KEY = 'agy_m3_theme';

  function getSystemTheme() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const themeIcon = document.getElementById('theme-toggle-icon');
    if (themeIcon) {
      themeIcon.textContent = theme === 'dark' ? 'light_mode' : 'dark_mode';
    }
  }

  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) || getSystemTheme();
  applyTheme(savedTheme);

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem(THEME_STORAGE_KEY)) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });

  document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || getSystemTheme();
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
        localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
        applyTheme(nextTheme);
      });
    }

    // 2. Mobile Drawer Navigation
    const menuBtn = document.getElementById('menu-toggle-btn');
    const drawer = document.getElementById('nav-drawer');
    const backdrop = document.getElementById('drawer-backdrop');

    function toggleDrawer(open) {
      if (!drawer) return;
      const isOpen = open !== undefined ? open : !drawer.classList.contains('open');
      if (isOpen) {
        drawer.classList.add('open');
        if (backdrop) backdrop.style.display = 'block';
      } else {
        drawer.classList.remove('open');
        if (backdrop) backdrop.style.display = 'none';
      }
    }

    if (menuBtn) {
      menuBtn.addEventListener('click', () => toggleDrawer());
    }

    if (backdrop) {
      backdrop.addEventListener('click', () => toggleDrawer(false));
    }

    // 3. Code Block Enhancement (Copy Button & Language Headers)
    const codeBlocks = document.querySelectorAll('.m3-markdown-body pre');
    codeBlocks.forEach((pre) => {
      if (pre.closest('.m3-code-wrapper')) return;

      const wrapper = document.createElement('div');
      wrapper.className = 'm3-code-wrapper';

      const header = document.createElement('div');
      header.className = 'm3-code-header';

      const codeElement = pre.querySelector('code');
      let lang = 'Code';
      if (codeElement && codeElement.className) {
        const langMatch = codeElement.className.match(/language-([a-zA-Z0-9_\-]+)/);
        if (langMatch) {
          lang = langMatch[1].toUpperCase();
        }
      }

      const langLabel = document.createElement('span');
      langLabel.textContent = lang;

      const copyBtn = document.createElement('button');
      copyBtn.className = 'm3-code-copy-btn';
      copyBtn.innerHTML = '<span class="material-symbols-outlined" style="font-size: 16px;">content_copy</span> Copy';

      copyBtn.addEventListener('click', () => {
        const textToCopy = pre.innerText.trim();
        navigator.clipboard.writeText(textToCopy).then(() => {
          copyBtn.innerHTML = '<span class="material-symbols-outlined" style="font-size: 16px;">check</span> Copied!';
          setTimeout(() => {
            copyBtn.innerHTML = '<span class="material-symbols-outlined" style="font-size: 16px;">content_copy</span> Copy';
          }, 2000);
        });
      });

      header.appendChild(langLabel);
      header.appendChild(copyBtn);

      pre.parentNode.insertBefore(wrapper, pre);
      wrapper.appendChild(header);
      wrapper.appendChild(pre);
    });

    // 4. Client-Side Search Dialog
    const searchTriggers = document.querySelectorAll('[data-action="open-search"]');
    const searchModal = document.getElementById('search-modal');
    const searchBackdrop = document.getElementById('search-backdrop');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    const searchCloseBtn = document.getElementById('search-close-btn');

    let searchIndex = [];

    // Pre-populate index from navigation links & static catalog
    function buildSearchIndex() {
      const navLinks = document.querySelectorAll('.m3-nav-item');
      const itemsMap = new Map();

      navLinks.forEach((link) => {
        const href = link.getAttribute('href');
        const title = link.textContent.trim();
        if (href && title && !itemsMap.has(href)) {
          const category = href.includes('/engineering/') || href.includes('skills-')
            ? 'Engineering'
            : href.includes('/productivity/')
            ? 'Productivity'
            : href.includes('/dictionary/')
            ? 'Dictionary'
            : 'General';

          itemsMap.set(href, {
            title: title,
            url: href,
            category: category,
            desc: `Documentation and reference for ${title}.`
          });
        }
      });

      searchIndex = Array.from(itemsMap.values());
    }

    buildSearchIndex();

    function openSearchModal() {
      if (!searchModal) return;
      searchModal.classList.add('open');
      if (searchInput) {
        searchInput.value = '';
        searchInput.focus();
        renderSearchResults('');
      }
    }

    function closeSearchModal() {
      if (!searchModal) return;
      searchModal.classList.remove('open');
    }

    searchTriggers.forEach((trigger) => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        openSearchModal();
      });
    });

    if (searchCloseBtn) {
      searchCloseBtn.addEventListener('click', closeSearchModal);
    }

    if (searchBackdrop) {
      searchBackdrop.addEventListener('click', closeSearchModal);
    }

    // Keyboard Shortcuts (Ctrl+K, Cmd+K, or slash '/')
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (searchModal && searchModal.classList.contains('open')) {
          closeSearchModal();
        } else {
          openSearchModal();
        }
      } else if (e.key === '/' && !searchModal?.classList.contains('open')) {
        const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
        if (activeTag !== 'input' && activeTag !== 'textarea') {
          e.preventDefault();
          openSearchModal();
        }
      } else if (e.key === 'Escape' && searchModal?.classList.contains('open')) {
        closeSearchModal();
      }
    });

    // Live search rendering
    function renderSearchResults(query) {
      if (!searchResults) return;
      searchResults.innerHTML = '';

      const normalized = query.toLowerCase().trim();
      const filtered = normalized === ''
        ? searchIndex.slice(0, 8)
        : searchIndex.filter((item) =>
            item.title.toLowerCase().includes(normalized) ||
            item.category.toLowerCase().includes(normalized) ||
            item.desc.toLowerCase().includes(normalized)
          ).slice(0, 12);

      if (filtered.length === 0) {
        searchResults.innerHTML = `
          <div style="padding: 24px; text-align: center; color: var(--md-sys-color-on-surface-variant);">
            <p>No results matching "<strong>${escapeHtml(query)}</strong>"</p>
          </div>
        `;
        return;
      }

      filtered.forEach((item, index) => {
        const itemEl = document.createElement('a');
        itemEl.href = item.url;
        itemEl.className = 'm3-search-item' + (index === 0 ? ' selected' : '');
        itemEl.innerHTML = `
          <div class="m3-search-item-title">
            <span class="material-symbols-outlined" style="font-size: 18px;">
              ${item.category === 'Engineering' ? 'terminal' : item.category === 'Productivity' ? 'psychology' : 'menu_book'}
            </span>
            ${escapeHtml(item.title)}
            <span class="m3-chip" style="font-size: 11px; padding: 1px 6px; margin-left: auto;">${escapeHtml(item.category)}</span>
          </div>
          <div class="m3-search-item-desc">${escapeHtml(item.desc)}</div>
        `;
        searchResults.appendChild(itemEl);
      });
    }

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        renderSearchResults(e.target.value);
      });

      searchInput.addEventListener('keydown', (e) => {
        const items = searchResults.querySelectorAll('.m3-search-item');
        if (items.length === 0) return;

        let currentIndex = -1;
        items.forEach((item, idx) => {
          if (item.classList.contains('selected')) currentIndex = idx;
        });

        if (e.key === 'ArrowDown') {
          e.preventDefault();
          const nextIndex = (currentIndex + 1) % items.length;
          items.forEach((it) => it.classList.remove('selected'));
          items[nextIndex].classList.add('selected');
          items[nextIndex].scrollIntoView({ block: 'nearest' });
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          const prevIndex = (currentIndex - 1 + items.length) % items.length;
          items.forEach((it) => it.classList.remove('selected'));
          items[prevIndex].classList.add('selected');
          items[prevIndex].scrollIntoView({ block: 'nearest' });
        } else if (e.key === 'Enter') {
          e.preventDefault();
          if (currentIndex >= 0 && items[currentIndex]) {
            window.location.href = items[currentIndex].href;
          }
        }
      });
    }

    function escapeHtml(text) {
      const div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
    }
  });
})();

