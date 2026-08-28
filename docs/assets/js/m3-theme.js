// Material Design 3 (Material You) Interactive Theme Controller for agy-skills

(function () {
  'use strict';

  // 1. Theme Management (Light / Dark)
  const THEME_STORAGE_KEY = 'agy_m3_theme';

  const USER_INVOKED_SKILLS = new Set([
    'ask-fred',
    'grill-with-docs',
    'triage',
    'improve-codebase-architecture',
    'setup-agy-skills',
    'setup-mcp',
    'setup-ts-deep-modules',
    'to-spec',
    'to-tickets',
    'implement',
    'implement-spec',
    'wayfinder',
    'retro',
    'grill-me',
    'teach',
    'to-questionnaire',
    'wait-what'
  ]);

  const MODEL_INVOKED_SKILLS = new Set([
    'prototype',
    'diagnosing-bugs',
    'research',
    'tdd',
    'domain-modeling',
    'codebase-design',
    'code-review',
    'resolving-merge-conflicts',
    'wizard',
    'grilling',
    'handoff',
    'writing-beats',
    'writing-for-agents',
    'writing-fragments',
    'writing-shape'
  ]);

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
    if (window.mermaid) {
      renderMermaidDiagrams(theme);
    }
  }

  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) || getSystemTheme();
  applyTheme(savedTheme);

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem(THEME_STORAGE_KEY)) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });

  // 2. Dynamic Mermaid Renderer with Theme Synchronization
  let mermaidInitialized = false;

  function initMermaid(theme) {
    if (!window.mermaid) return;
    try {
      window.mermaid.initialize({
        startOnLoad: false,
        theme: theme === 'dark' ? 'dark' : 'default',
        securityLevel: 'loose',
        fontFamily: 'Roboto Flex, Roboto, sans-serif'
      });
      mermaidInitialized = true;
    } catch (e) {
      console.warn('Mermaid initialization failed:', e);
    }
  }

  function renderMermaidDiagrams(theme) {
    if (!window.mermaid) return;
    initMermaid(theme);

    const codeBlocks = document.querySelectorAll('pre code.language-mermaid, pre.language-mermaid, div.language-mermaid');
    codeBlocks.forEach((block, index) => {
      let rawSource = block.getAttribute('data-mermaid-source');
      if (!rawSource) {
        rawSource = block.textContent.trim();
        block.setAttribute('data-mermaid-source', rawSource);
      }

      let container = block.closest('.m3-mermaid-container');
      if (!container) {
        container = document.createElement('div');
        container.className = 'm3-mermaid-container';
        const preParent = block.closest('pre') || block;
        preParent.parentNode.insertBefore(container, preParent);
        preParent.style.display = 'none';
      }

      const diagramId = `m3-mermaid-diag-${index}-${Date.now()}`;
      try {
        window.mermaid.render(diagramId, rawSource).then(({ svg }) => {
          container.innerHTML = svg;
        }).catch((err) => {
          console.warn('Mermaid render error:', err);
          container.innerHTML = `<pre style="color: var(--md-sys-color-error); font-size: 12px;">${escapeHtml(rawSource)}</pre>`;
        });
      } catch (err) {
        console.warn('Mermaid synchronous error:', err);
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    // Theme toggle button
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || getSystemTheme();
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
        localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
        applyTheme(nextTheme);
      });
    }

    // Render Mermaid diagrams on initial load
    if (window.mermaid) {
      renderMermaidDiagrams(document.documentElement.getAttribute('data-theme') || 'light');
    }

    // 3. Populate Page Header Badge
    const badgeSlot = document.getElementById('m3-page-badge-slot');
    if (badgeSlot) {
      const path = window.location.pathname;
      let matchedSkill = null;

      for (const skill of USER_INVOKED_SKILLS) {
        if (path.includes(`skills-${skill}`) || path.includes(`/${skill}`)) {
          matchedSkill = { name: skill, type: 'user' };
          break;
        }
      }

      if (!matchedSkill) {
        for (const skill of MODEL_INVOKED_SKILLS) {
          if (path.includes(`skills-${skill}`) || path.includes(`/${skill}`)) {
            matchedSkill = { name: skill, type: 'model' };
            break;
          }
        }
      }

      if (matchedSkill) {
        const badge = document.createElement('span');
        badge.className = `m3-badge ${matchedSkill.type === 'user' ? 'm3-badge-user-invoked' : 'm3-badge-model-invoked'}`;
        badge.textContent = matchedSkill.type === 'user' ? 'User-invoked' : 'Model-invoked';
        badgeSlot.appendChild(badge);
      } else if (path.includes('/dictionary/') && !path.endsWith('/dictionary/') && !path.endsWith('/dictionary')) {
        const badge = document.createElement('span');
        badge.className = 'm3-badge m3-badge-dictionary';
        badge.textContent = 'Dictionary Concept';
        badgeSlot.appendChild(badge);
      }
    }

    // 4. Mobile Drawer Navigation
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

    // 5. Code Block Enhancement (Copy Button & Language Headers)
    const codeBlocks = document.querySelectorAll('.m3-markdown-body pre');
    codeBlocks.forEach((pre) => {
      if (pre.closest('.m3-code-wrapper') || pre.classList.contains('language-mermaid') || pre.querySelector('code.language-mermaid')) return;

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

    // 6. Client-Side Search Dialog with Filter Chips & Invocation Badges
    const searchTriggers = document.querySelectorAll('[data-action="open-search"]');
    const searchModal = document.getElementById('search-modal');
    const searchBackdrop = document.getElementById('search-backdrop');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    const searchCloseBtn = document.getElementById('search-close-btn');
    const searchFilterBar = document.getElementById('search-filter-bar');

    let activeFilter = 'all';
    let searchIndex = [];

    function determineInvocationType(url, title) {
      const normalized = (url + ' ' + title).toLowerCase();
      for (const skill of USER_INVOKED_SKILLS) {
        if (normalized.includes(skill)) return 'User-invoked';
      }
      for (const skill of MODEL_INVOKED_SKILLS) {
        if (normalized.includes(skill)) return 'Model-invoked';
      }
      return null;
    }

    function buildSearchIndex() {
      const navLinks = document.querySelectorAll('.m3-nav-item');
      const itemsMap = new Map();

      navLinks.forEach((link) => {
        const href = link.getAttribute('href');
        const title = link.textContent.trim();
        if (href && title && !itemsMap.has(href)) {
          let category = 'General';
          if (href.includes('/engineering/') || (href.includes('skills-') && !href.includes('/productivity/'))) {
            category = 'Engineering';
          } else if (href.includes('/productivity/')) {
            category = 'Productivity';
          } else if (href.includes('/dictionary/')) {
            category = 'Dictionary';
          }

          const invocation = determineInvocationType(href, title);

          itemsMap.set(href, {
            title: title,
            url: href,
            category: category,
            invocation: invocation,
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

    if (searchFilterBar) {
      searchFilterBar.querySelectorAll('.m3-filter-chip').forEach((chip) => {
        chip.addEventListener('click', () => {
          searchFilterBar.querySelectorAll('.m3-filter-chip').forEach((c) => c.classList.remove('active'));
          chip.classList.add('active');
          activeFilter = chip.getAttribute('data-filter') || 'all';
          renderSearchResults(searchInput ? searchInput.value : '');
        });
      });
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
      let matched = searchIndex;

      if (activeFilter !== 'all') {
        matched = matched.filter((item) => item.category.toLowerCase() === activeFilter.toLowerCase());
      }

      if (normalized !== '') {
        matched = matched.filter((item) =>
          item.title.toLowerCase().includes(normalized) ||
          item.category.toLowerCase().includes(normalized) ||
          (item.invocation && item.invocation.toLowerCase().includes(normalized)) ||
          item.desc.toLowerCase().includes(normalized)
        );
      }

      const filtered = matched.slice(0, 12);

      if (filtered.length === 0) {
        searchResults.innerHTML = `
          <div style="padding: 24px; text-align: center; color: var(--md-sys-color-on-surface-variant);">
            <p>No results matching "<strong>${escapeHtml(query)}</strong>" in ${escapeHtml(activeFilter === 'all' ? 'any category' : activeFilter)}</p>
          </div>
        `;
        return;
      }

      filtered.forEach((item, index) => {
        const itemEl = document.createElement('a');
        itemEl.href = item.url;
        itemEl.className = 'm3-search-item' + (index === 0 ? ' selected' : '');
        
        let badgeHtml = '';
        if (item.invocation === 'User-invoked') {
          badgeHtml = `<span class="m3-badge m3-badge-user-invoked" style="font-size: 10px; padding: 1px 6px;">User</span>`;
        } else if (item.invocation === 'Model-invoked') {
          badgeHtml = `<span class="m3-badge m3-badge-model-invoked" style="font-size: 10px; padding: 1px 6px;">Model</span>`;
        } else if (item.category === 'Dictionary') {
          badgeHtml = `<span class="m3-badge m3-badge-dictionary" style="font-size: 10px; padding: 1px 6px;">Dict</span>`;
        }

        itemEl.innerHTML = `
          <div class="m3-search-item-title">
            <span class="material-symbols-outlined" style="font-size: 18px;">
              ${item.category === 'Engineering' ? 'terminal' : item.category === 'Productivity' ? 'psychology' : 'menu_book'}
            </span>
            <span>${escapeHtml(item.title)}</span>
            <div style="margin-left: auto; display: flex; align-items: center; gap: 6px;">
              ${badgeHtml}
              <span class="m3-chip" style="font-size: 11px; padding: 1px 6px;">${escapeHtml(item.category)}</span>
            </div>
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

    // 7. M3 Snackbar Toast Controller
    let snackbarTimeout = null;
    function showSnackbar(message, icon = 'check') {
      const snackbar = document.getElementById('m3-snackbar');
      if (!snackbar) return;

      snackbar.innerHTML = `
        <span class="material-symbols-outlined" style="font-size: 18px;">${escapeHtml(icon)}</span>
        <span>${escapeHtml(message)}</span>
      `;
      snackbar.classList.add('show');

      if (snackbarTimeout) {
        clearTimeout(snackbarTimeout);
      }

      snackbarTimeout = setTimeout(() => {
        snackbar.classList.remove('show');
      }, 2600);
    }

    // 8. Scroll Reading Progress Bar
    const progressBar = document.getElementById('m3-reading-progress');
    if (progressBar) {
      window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = scrollHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100)) : 0;
        progressBar.style.width = `${progress}%`;
      }, { passive: true });
    }

    // 9. Interactive Heading Anchor Links
    function slugify(text) {
      return text
        .toLowerCase()
        .trim()
        .replace(/<[^>]+>/g, '')
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');
    }

    const contentArticle = document.querySelector('.m3-markdown-body');
    if (contentArticle) {
      const headings = contentArticle.querySelectorAll('h2, h3');
      headings.forEach((heading) => {
        if (!heading.id) {
          heading.id = slugify(heading.textContent);
        }

        const anchor = document.createElement('button');
        anchor.className = 'm3-heading-anchor-btn';
        anchor.setAttribute('type', 'button');
        anchor.setAttribute('title', 'Copy section link');
        anchor.setAttribute('aria-label', `Copy link to ${heading.textContent.trim()}`);
        anchor.innerHTML = '<span class="material-symbols-outlined" style="font-size: 16px;">tag</span>';

        anchor.addEventListener('click', (e) => {
          e.preventDefault();
          const url = `${window.location.origin}${window.location.pathname}#${heading.id}`;
          navigator.clipboard.writeText(url).then(() => {
            history.pushState(null, null, `#${heading.id}`);
            heading.scrollIntoView({ behavior: 'smooth', block: 'start' });
            showSnackbar('Section link copied to clipboard', 'link');
          }).catch(() => {
            window.location.hash = heading.id;
          });
        });

        heading.appendChild(anchor);
      });

      // 10. Dynamic On-Page Table of Contents (Desktop Sidebar & Mobile Expandable Card)
      const tocSidebar = document.getElementById('m3-toc-sidebar');
      const tocMobileSlot = document.getElementById('m3-toc-mobile-slot');

      if (headings.length >= 2) {
        // Build items
        let listItemsHtml = '';
        headings.forEach((heading) => {
          const isH3 = heading.tagName.toLowerCase() === 'h3';
          const clone = heading.cloneNode(true);
          const anchorBtn = clone.querySelector('.m3-heading-anchor-btn');
          if (anchorBtn) anchorBtn.remove();
          const text = clone.textContent.trim();
          listItemsHtml += `
            <li class="m3-toc-item ${isH3 ? 'm3-toc-item-h3' : 'm3-toc-item-h2'}">
              <a href="#${heading.id}" class="m3-toc-link" data-target-id="${heading.id}">
                ${escapeHtml(text)}
              </a>
            </li>
          `;
        });

        if (tocSidebar) {
          tocSidebar.innerHTML = `
            <div class="m3-toc-card">
              <div class="m3-toc-header">
                <span class="material-symbols-outlined" style="font-size: 18px;">toc</span>
                <span>On this page</span>
              </div>
              <ul class="m3-toc-list">
                ${listItemsHtml}
              </ul>
            </div>
          `;
          tocSidebar.style.display = 'block';
        }

        if (tocMobileSlot) {
          tocMobileSlot.innerHTML = `
            <details class="m3-toc-mobile-card">
              <summary class="m3-toc-mobile-summary">
                <span class="material-symbols-outlined" style="font-size: 18px;">toc</span>
                <span>Table of Contents</span>
                <span class="material-symbols-outlined m3-toc-expand-icon">expand_more</span>
              </summary>
              <ul class="m3-toc-list">
                ${listItemsHtml}
              </ul>
            </details>
          `;
        }

        // Setup smooth scroll for ToC links
        document.querySelectorAll('.m3-toc-link').forEach((link) => {
          link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target-id');
            const targetEl = document.getElementById(targetId);
            if (targetEl) {
              history.pushState(null, null, `#${targetId}`);
              targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          });
        });

        // IntersectionObserver for active heading highlight
        const tocLinks = document.querySelectorAll('.m3-toc-link');
        const observerOptions = {
          root: null,
          rootMargin: '-80px 0px -70% 0px',
          threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const activeId = entry.target.id;
              tocLinks.forEach((link) => {
                if (link.getAttribute('data-target-id') === activeId) {
                  link.classList.add('active');
                } else {
                  link.classList.remove('active');
                }
              });
            }
          });
        }, observerOptions);

        headings.forEach((heading) => observer.observe(heading));
      } else {
        if (tocSidebar) tocSidebar.style.display = 'none';
        if (tocMobileSlot) tocMobileSlot.innerHTML = '';
      }
    }
  });
})();

