// Left Navigation Component
// Include this file in any page to render the consistent left nav

const LeftNav = {
  // Current active page - set this before calling render()
  activePage: 'Feed',

  // Track accordion states (persists across renders and page loads)
  accordionStates: null,

  // Load accordion states from localStorage or use defaults
  loadAccordionStates() {
    if (this.accordionStates === null) {
      try {
        const saved = localStorage.getItem('leftNavAccordionStates');
        this.accordionStates = saved ? JSON.parse(saved) : { 'Entities': false };
      } catch (e) {
        this.accordionStates = { 'Entities': true };
      }
    }
    return this.accordionStates;
  },

  // Save accordion states to localStorage
  saveAccordionStates() {
    try {
      localStorage.setItem('leftNavAccordionStates', JSON.stringify(this.accordionStates));
    } catch (e) {
      // localStorage may be unavailable
    }
  },

  // Navigation items configuration
  // action: function name to call on click
  // deAction: function name to call when in Data Exploration (if different)
  navItems: [
    { name: 'Feed', icon: 'icon-feed-rss-outline', href: '/feed.html' },
    { name: 'Quality Home', icon: 'icon-dot-double-arcs-outline', href: '/quality-home.html' },
    { 
      name: 'Entities', 
      icon: 'icon-circles-outline', 
      href: '/entities/',
      expandable: true,
      subnav: [
        { name: 'Agents', action: null, deAction: null }
      ]
    },
    { name: 'Metrics', icon: 'icon-dots-lines-outline', href: '/metrics/' },
    { type: 'divider' },
    { name: 'Data Exploration', icon: 'icon-chart-outline', href: '/data-explore.html', action: null, deAction: null },
    { type: 'divider' },
    { name: 'Protections', icon: 'icon-shield-outline', action: null, deAction: null },
    { name: 'SEV Criteria', icon: 'icon-flame-outline', action: null, deAction: null }
  ],

  // Search dropdown items
  searchItems: [
    { name: 'Agents', icon: 'agent', action: null },
    { name: 'MCP Tools', icon: 'tool', action: null },
    { name: 'Mobile Apps', icon: 'mobile', action: null },
    { name: 'Comet Apps', icon: 'comet', action: null }
  ],

  recentItems: [
    { name: 'AI Assistant Agent', icon: 'agent', action: null },
    { name: 'Data Processing Tool', icon: 'tool', action: null },
    { name: 'iOS Mobile App', icon: 'mobile', action: null }
  ],

  // Get icon SVG based on type
  getSearchIcon(type) {
    const icons = {
      agent: '<svg class="sk-search-dropdown-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 4-6 8-6s8 2 8 6"/><circle cx="19" cy="8" r="2"/><path d="M21 14c1.5 0 3 1 3 3"/></svg>',
      tool: '<svg class="sk-search-dropdown-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',
      mobile: '<svg class="sk-search-dropdown-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12" y2="18"/></svg>',
      comet: '<svg class="sk-search-dropdown-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>'
    };
    return icons[type] || icons.agent;
  },

  // Generate the nav item HTML
  renderNavItem(item, isInDataExploration = false) {
    if (item.type === 'divider') {
      return '<div class="sk-simple-nav-divider"></div>';
    }

    const isActive = item.name === this.activePage;
    const activeClass = isActive ? ' active' : '';
    
    // Determine onclick action based on context
    let onclick = '';
    const action = isInDataExploration ? item.deAction : item.action;
    if (action) {
      onclick = ` onclick="${action}(); return false;"`;
    }

    if (item.expandable) {
      // Use persisted accordion state from localStorage
      const states = this.loadAccordionStates();
      const isExpanded = states[item.name] !== undefined 
        ? states[item.name] 
        : false; // default to collapsed
      const expandedClass = isExpanded ? ' expanded' : '';
      const subnavOpenClass = isExpanded ? ' open' : '';
      
      // If item has href, create split click areas (link + chevron toggle)
      if (item.href) {
        let html = `
          <div class="sk-simple-nav-item-wrapper">
            <a href="${item.href}" class="sk-simple-nav-item sk-nav-link-part${activeClass}">
              <svg class="sk-nav-icon"><use href="#${item.icon}"></use></svg>
              <span>${item.name}</span>
            </a>
            <button class="sk-nav-chevron-btn${expandedClass}" data-accordion-name="${item.name}">
              <svg class="sk-chevron" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9" fill="none" stroke="currentColor" stroke-width="2"/></svg>
            </button>
          </div>
          <div class="sk-simple-nav-subnav${subnavOpenClass}">`;
        
        if (item.subnav) {
          item.subnav.forEach(subitem => {
            let subOnclick = '';
            const subAction = isInDataExploration ? subitem.deAction : subitem.action;
            if (subAction) {
              subOnclick = ` onclick="${subAction}(); return false;"`;
            }
            html += `<a href="#" class="sk-simple-nav-item sk-subnav-item"${subOnclick}>${subitem.name}</a>`;
          });
        }
        
        html += '</div>';
        return html;
      }
      
      let html = `
        <button class="sk-simple-nav-item sk-expandable${expandedClass}" data-accordion-name="${item.name}">
          <svg class="sk-nav-icon"><use href="#${item.icon}"></use></svg>
          <span>${item.name}</span>
          <svg class="sk-chevron" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9" fill="none" stroke="currentColor" stroke-width="2"/></svg>
        </button>
        <div class="sk-simple-nav-subnav${subnavOpenClass}">`;
      
      if (item.subnav) {
        item.subnav.forEach(subitem => {
          let subOnclick = '';
          const subAction = isInDataExploration ? subitem.deAction : subitem.action;
          if (subAction) {
            subOnclick = ` onclick="${subAction}(); return false;"`;
          }
          html += `<a href="#" class="sk-simple-nav-item sk-subnav-item"${subOnclick}>${subitem.name}</a>`;
        });
      }
      
      html += '</div>';
      return html;
    }

    // Use href if provided, otherwise use action handler
    const linkHref = item.href || '#';
    
    return `
      <a href="${linkHref}" class="sk-simple-nav-item${activeClass}"${onclick}>
        <svg class="sk-nav-icon"><use href="#${item.icon}"></use></svg>
        <span>${item.name}</span>
      </a>`;
  },

  // Generate search dropdown HTML
  renderSearchDropdown(idPrefix = '') {
    let html = `
      <div class="sk-search-dropdown" id="${idPrefix}discoverDropdown">`;
    
    this.searchItems.forEach(item => {
      html += `
        <a href="#" class="sk-search-dropdown-item">
          ${this.getSearchIcon(item.icon)}
          <span>${item.name}</span>
        </a>`;
    });

    html += `
        <div class="sk-search-dropdown-divider"></div>
        <div class="sk-search-dropdown-label">Recent</div>`;

    this.recentItems.forEach(item => {
      html += `
        <a href="#" class="sk-search-dropdown-item">
          ${this.getSearchIcon(item.icon)}
          <span>${item.name}</span>
        </a>`;
    });

    html += '</div>';
    return html;
  },

  // Render the complete sidebar
  render(containerId, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`LeftNav: Container #${containerId} not found`);
      return;
    }

    const isDataExploration = options.isDataExploration || false;
    const extraClass = isDataExploration ? ' de-sk-sidebar' : '';
    const idPrefix = isDataExploration ? 'de' : '';
    const logoAction = isDataExploration ? ' onclick="closeDataExploration(); return false;"' : '';

    const html = `
      <aside class="sidebar sk-sidebar${extraClass}">
        <div class="sk-sidebar-header">
          <a href="/feed.html" class="sk-logo"${logoAction}>
            <img src="/ops-dashboard_12.12.25/images/1Micon.png" alt="1M" class="sk-logo-icon">
            <span class="sk-logo-text">OneMonitoring</span>
          </a>
        </div>
        <button class="sk-create-btn">
          <svg class="sk-create-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          <span>Create</span>
        </button>
        <div class="sk-search-box">
          <svg class="sk-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input type="text" placeholder="Discover" class="sk-search-input" id="${idPrefix}DiscoverSearchInput">
          ${this.renderSearchDropdown(idPrefix)}
        </div>
        <nav class="sk-simple-nav">
          ${this.navItems.map(item => this.renderNavItem(item, isDataExploration)).join('')}
        </nav>
      </aside>`;

    container.innerHTML = html;
    this.initEventListeners(container, idPrefix);
  },

  // Initialize event listeners for the rendered nav
  initEventListeners(container, idPrefix) {
    // Helper to toggle accordion and save state
    const toggleAccordion = (accordionName, currentExpanded) => {
      const newState = !currentExpanded;
      
      // Update persisted state and save to localStorage
      this.loadAccordionStates();
      this.accordionStates[accordionName] = newState;
      this.saveAccordionStates();
      
      // Sync all accordions with this name across all navs (both types)
      document.querySelectorAll(`[data-accordion-name="${accordionName}"]`).forEach(element => {
        element.classList.toggle('expanded', newState);
        // Find the subnav - it's either next sibling or parent's next sibling
        let subnav = element.nextElementSibling;
        if (!subnav || !subnav.classList.contains('sk-simple-nav-subnav')) {
          // For chevron buttons inside wrapper, look for subnav after the wrapper
          const wrapper = element.closest('.sk-simple-nav-item-wrapper');
          if (wrapper) {
            subnav = wrapper.nextElementSibling;
          }
        }
        if (subnav && subnav.classList.contains('sk-simple-nav-subnav')) {
          subnav.classList.toggle('open', newState);
        }
      });
    };

    // Expandable nav items (full button accordions - no href)
    const expandables = container.querySelectorAll('.sk-simple-nav-item.sk-expandable');
    expandables.forEach(btn => {
      btn.addEventListener('click', () => {
        const accordionName = btn.getAttribute('data-accordion-name');
        const isExpanded = btn.classList.contains('expanded');
        toggleAccordion(accordionName, isExpanded);
      });
    });

    // Chevron buttons (for items with href - split click areas)
    const chevronBtns = container.querySelectorAll('.sk-nav-chevron-btn');
    chevronBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const accordionName = btn.getAttribute('data-accordion-name');
        const isExpanded = btn.classList.contains('expanded');
        toggleAccordion(accordionName, isExpanded);
      });
    });

    // Search input focus/blur for dropdown
    const searchInput = container.querySelector(`#${idPrefix}DiscoverSearchInput`);
    const searchDropdown = container.querySelector(`#${idPrefix}discoverDropdown`);
    
    if (searchInput && searchDropdown) {
      searchInput.addEventListener('focus', () => {
        searchDropdown.classList.add('visible');
      });
      
      searchInput.addEventListener('blur', (e) => {
        setTimeout(() => {
          if (!searchDropdown.contains(document.activeElement)) {
            searchDropdown.classList.remove('visible');
          }
        }, 150);
      });
    }
  },

  // Set active nav item across all rendered navs
  setActive(itemName) {
    this.activePage = itemName;
    
    // Update all rendered navs
    document.querySelectorAll('.sidebar.sk-sidebar .sk-simple-nav-item').forEach(item => {
      item.classList.remove('active');
      if (item.querySelector('span')?.textContent === itemName) {
        item.classList.add('active');
      }
    });
  }
};

// Navigation functions (global)
function setActiveNavItem(itemName) {
  LeftNav.setActive(itemName);
}

// Make LeftNav available globally
window.LeftNav = LeftNav;

