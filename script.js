// This site works without JavaScript; these are progressive enhancements.
document.documentElement.classList.add('js');
const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
const links = [...navigation.querySelectorAll('a')];
toggle.hidden = false;

function closeMenu() {
  toggle.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('is-open');
}

toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('is-open', open);
});
navigation.addEventListener('click', (event) => {
  if (event.target.closest('a')) closeMenu();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    toggle.focus();
  }
});

// Highlight the section nearest the top, including the last section at page end.
const sections = links.map(link => document.querySelector(link.hash));
let scheduled = false;
function updateNavigation() {
  let active = sections[0];
  for (const section of sections) {
    if (section.getBoundingClientRect().top <= 160) active = section;
  }
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
    active = sections[sections.length - 1];
  }
  links.forEach(link => {
    if (link.hash === `#${active.id}`) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  scheduled = false;
}
window.addEventListener('scroll', () => {
  if (!scheduled) {
    scheduled = true;
    window.requestAnimationFrame(updateNavigation);
  }
}, { passive: true });
window.addEventListener('resize', () => {
  if (window.innerWidth > 620) closeMenu();
  updateNavigation();
});
window.addEventListener('load', updateNavigation);
document.querySelector('#year').textContent = new Date().getFullYear();
