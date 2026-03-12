const root = document;

const langToggle = root.querySelector('[data-lang-toggle]');
const langWrap = root.querySelector('.lang');
if (langToggle && langWrap) {
  langToggle.addEventListener('click', () => langWrap.classList.toggle('open'));
  root.addEventListener('click', (e) => {
    if (!langWrap.contains(e.target)) langWrap.classList.remove('open');
  });
}

const drawer = root.querySelector('[data-drawer]');
const drawerBtn = root.querySelector('[data-open-drawer]');
const drawerClose = root.querySelector('[data-close-drawer]');
const drawerBackdrop = root.querySelector('[data-drawer-backdrop]');
let trapNodes = [];

function setScrollLock(on) {
  document.body.classList.toggle('no-scroll', on);
}

function trapFocus(e) {
  if (!drawer.classList.contains('open')) return;
  if (e.key !== 'Tab') return;
  const first = trapNodes[0];
  const last = trapNodes[trapNodes.length - 1];
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  }
  if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
}

function closeDrawer() {
  drawer.classList.remove('open');
  drawerBackdrop.classList.remove('open');
  setScrollLock(false);
  document.removeEventListener('keydown', trapFocus);
}
function openDrawer() {
  drawer.classList.add('open');
  drawerBackdrop.classList.add('open');
  setScrollLock(true);
  trapNodes = drawer.querySelectorAll('a, button');
  if (trapNodes.length) trapNodes[0].focus();
  document.addEventListener('keydown', trapFocus);
}

if (drawer && drawerBtn && drawerClose && drawerBackdrop) {
  drawerBtn.addEventListener('click', openDrawer);
  drawerClose.addEventListener('click', closeDrawer);
  drawerBackdrop.addEventListener('click', closeDrawer);
  root.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDrawer();
      closeModal();
    }
  });
}

root.querySelectorAll('.faq-item').forEach((item) => {
  const btn = item.querySelector('.faq-q');
  btn.addEventListener('click', () => {
    root.querySelectorAll('.faq-item').forEach((f) => f.classList.remove('open'));
    item.classList.add('open');
  });
});

const modal = root.querySelector('[data-modal]');
const openModalBtn = root.querySelectorAll('[data-open-privacy]');
const closeModalBtns = root.querySelectorAll('[data-close-privacy]');

function closeModal() {
  if (!modal) return;
  modal.classList.remove('open');
  setScrollLock(false);
}

if (modal) {
  openModalBtn.forEach((btn) => btn.addEventListener('click', () => {
    modal.classList.add('open');
    setScrollLock(true);
  }));
  closeModalBtns.forEach((btn) => btn.addEventListener('click', closeModal));
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('in');
  });
}, { threshold: 0.2 });

root.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
