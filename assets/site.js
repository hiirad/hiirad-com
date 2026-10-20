'use strict';
const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.nav-links');
function closeMenu() {
  if (!menu || !navigation) return;
  menu.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-label', 'Open navigation');
  navigation.classList.remove('open');
}
menu?.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  navigation.classList.toggle('open', open);
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu?.getAttribute('aria-expanded') === 'true') {
    closeMenu(); menu.focus();
  }
});
document.addEventListener('click', event => {
  if (!event.target.closest('.site-header')) closeMenu();
});
window.matchMedia('(min-width: 861px)').addEventListener('change', closeMenu);
document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });
const oldRoutes = {about:'about.html',divisions:'divisions.html',projects:'projects.html',contact:'contact.html'};
if ((location.pathname === '/' || location.pathname.endsWith('/index.html')) && oldRoutes[location.hash.slice(1)]) {
  location.replace(oldRoutes[location.hash.slice(1)]);
}

const carousel = document.querySelector('.hero-carousel');
if (carousel) {
  const slides = [...carousel.querySelectorAll('[data-slide]')];
  const dots = [...carousel.querySelectorAll('[data-go]')];
  const controls = carousel.querySelector('.carousel-controls');
  const pause = carousel.querySelector('[data-pause]');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let index = 0, timer = null, paused = reduced.matches, hovered = false;
  controls.hidden = false;
  function show(next, manual = false) {
    index = (next + slides.length) % slides.length;
    slides.forEach((slide, i) => { slide.hidden = i !== index; });
    dots.forEach((dot, i) => dot.setAttribute('aria-pressed', String(i === index)));
    if (manual) carousel.querySelector('#slide-status').textContent = `Slide ${index + 1} of ${slides.length}`;
  }
  function syncTimer() {
    clearInterval(timer); timer = null;
    pause.textContent = paused ? 'Play' : 'Pause';
    pause.setAttribute('aria-label', paused ? 'Play slideshow' : 'Pause slideshow');
    if (!paused && !hovered && !document.hidden && !carousel.contains(document.activeElement)) {
      timer = setInterval(() => show(index + 1), 7000);
    }
  }
  function manual(next) { paused = true; show(next, true); syncTimer(); }
  carousel.querySelector('[data-prev]').addEventListener('click', () => manual(index - 1));
  carousel.querySelector('[data-next]').addEventListener('click', () => manual(index + 1));
  dots.forEach(dot => dot.addEventListener('click', () => manual(Number(dot.dataset.go))));
  pause.addEventListener('click', () => { paused = !paused; syncTimer(); });
  carousel.addEventListener('mouseenter', () => { hovered = true; syncTimer(); });
  carousel.addEventListener('mouseleave', () => { hovered = false; syncTimer(); });
  carousel.addEventListener('focusin', syncTimer);
  carousel.addEventListener('focusout', () => setTimeout(syncTimer, 0));
  document.addEventListener('visibilitychange', syncTimer);
  reduced.addEventListener('change', () => { if (reduced.matches) paused = true; syncTimer(); });
  syncTimer();
}

const form = document.querySelector('#enquiry-form');
if (form) {
  const topic = new URLSearchParams(location.search).get('topic');
  if (topic && [...form.elements.topic.options].some(option => option.value === topic)) form.elements.topic.value = topic;
  const review = document.querySelector('#quote-review');
  const preview = document.querySelector('#quote-text');
  const status = document.querySelector('#form-status');
  let enquiry = '';
  form.addEventListener('input', () => { review.hidden = true; status.textContent = ''; });
  form.addEventListener('change', () => { review.hidden = true; status.textContent = ''; });
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const value = name => String(data.get(name) || '').trim();
    for (const name of ['name','email','country','message']) {
      if (!value(name)) { status.textContent = 'Please complete all required fields.'; form.elements[name].focus(); return; }
    }
    enquiry = `Hiirad quote enquiry\n\nTopic: ${value('topic')}\nName: ${value('name')}\nEmail: ${value('email')}\nCompany: ${value('company') || 'Not specified'}\nPhone: ${value('phone') || 'Not specified'}\nCountry / destination: ${value('country')}\nPreferred timescale: ${value('timescale') || 'Not specified'}\n\nRequirements:\n${value('message')}`;
    preview.textContent = enquiry;
    document.querySelector('#send-email').href = 'mailto:info@hiirad.net?subject=' + encodeURIComponent('Hiirad quote: ' + value('topic')) + '&body=' + encodeURIComponent(enquiry);
    review.hidden = false;
    status.textContent = 'Review your enquiry below. It has not been sent.';
    review.focus();
    review.scrollIntoView({block:'nearest', behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
  });
  document.querySelector('#copy-quote').addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(enquiry); status.textContent = 'Enquiry copied. Paste it into your email or the online contact form.'; }
    catch { status.textContent = 'Copying is unavailable. Select the enquiry text above and copy it manually.'; }
  });
  document.querySelector('#send-email').addEventListener('click', () => {
    status.textContent = 'Your email app may open with a draft. Review and send it there. This website has not sent your enquiry.';
  });
}
