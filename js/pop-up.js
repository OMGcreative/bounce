document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('contactPopup');
  if (!modal) return;

  const triggers = document.querySelectorAll('.pop-up-trigger');
  const overlay = modal.querySelector('.pop-up');
  const closeBtns = modal.querySelectorAll('[data-popup-close]');
  let lastFocus = null;

  const focusableSel = [
    'a[href]',
    'area[href]',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    'button:not([disabled])',
    '[tabindex]:not([tabindex="-1"])'
  ].join(',');

  function openModal() {
    lastFocus = document.activeElement;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no_scroll');
    const first = modal.querySelector(focusableSel);
    if (first) first.focus();
    document.addEventListener('keydown', onKeydown);
  }

  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no_scroll');
    document.removeEventListener('keydown', onKeydown);
    if (lastFocus) lastFocus.focus();
  }

  function onKeydown(e) {
    if (e.key === 'Escape') closeModal();
    if (e.key === 'Tab') trapFocus(e);
  }

  function trapFocus(e) {
    const focusables = modal.querySelectorAll(focusableSel);
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus();
    }
  }

  triggers.forEach(t => t.addEventListener('click', e => {
    e.preventDefault();
    openModal();
  }));
  overlay.addEventListener('click', closeModal);
  closeBtns.forEach(btn => btn.addEventListener('click', closeModal));
});