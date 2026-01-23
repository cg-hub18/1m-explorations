/* ===========================================
   Opsmate Panel Component - JavaScript Controller
   A slide-out chat panel that pushes page content
   =========================================== */

(function() {
  'use strict';

  // Configuration
  const CONFIG = {
    panelWidth: 420,
    iframeSrc: '../opsmate/dist/index.html?chatOnly=true',
    animationDuration: 300
  };

  // DOM Elements (populated on init)
  let panel = null;
  let iframe = null;
  let mainContent = null;
  let toggleBtn = null;

  /**
   * Initialize the Opsmate Panel
   * Call this after DOM is ready
   */
  function init() {
    // Find panel elements
    panel = document.getElementById('opsmate-panel');
    iframe = panel ? panel.querySelector('.opsmate-iframe') : null;
    toggleBtn = document.getElementById('ask-opsmate-btn');
    
    // Find main content area (supports multiple class names)
    mainContent = document.querySelector('.main-content') || 
                  document.querySelector('.content-area') ||
                  document.querySelector('.de-main') ||
                  document.querySelector('main');

    // Add transition class to main content
    if (mainContent) {
      mainContent.classList.add('opsmate-panel-push');
    }

    // Bind toggle button
    if (toggleBtn) {
      toggleBtn.addEventListener('click', toggle);
    }

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && isOpen()) {
        close();
      }
    });

    // Listen for close message from iframe
    window.addEventListener('message', function(event) {
      if (event.data === 'closeOpsmate') {
        close();
      }
    });
  }

  /**
   * Check if panel is open
   */
  function isOpen() {
    return panel && panel.classList.contains('open');
  }

  /**
   * Open the panel
   */
  function open() {
    if (!panel || !iframe) return;
    
    iframe.src = CONFIG.iframeSrc;
    panel.classList.add('open');
    if (mainContent) mainContent.classList.add('panel-open');
  }

  /**
   * Close the panel
   */
  function close() {
    if (!panel || !iframe) return;
    
    panel.classList.remove('open');
    if (mainContent) mainContent.classList.remove('panel-open');
    
    // Clear iframe src after animation
    setTimeout(function() {
      iframe.src = '';
    }, CONFIG.animationDuration);
  }

  /**
   * Toggle the panel open/closed
   */
  function toggle() {
    if (isOpen()) {
      close();
    } else {
      open();
    }
  }

  // Auto-initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose API globally
  window.OpsmatePanel = {
    init: init,
    open: open,
    close: close,
    toggle: toggle,
    isOpen: isOpen
  };
})();


