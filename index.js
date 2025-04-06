// DOM Elements
const NAV_BAR = document.getElementById('navBar');
const NAV_LIST = document.getElementById('navList');
const HERO_HEADER = document.getElementById('heroHeader');
const HAMBURGER_BTN = document.getElementById('hamburgerBtn');
const NAV_LINKS = Array.from(document.querySelectorAll('.nav__list-link'));
const ACTIVE_LINK_CLASS = 'active';
const BREAKPOINT = 576;

let currentActiveLink = document.querySelector('.nav__list-link.active');

// Resets mobile navbar state
const resetActiveState = () => {
  NAV_LIST.classList.remove('nav--active');
  NAV_LIST.style.height = null;
  document.body.style.overflowY = null;
};

// Adds padding to hero header below fixed navbar
const addPaddingToHeroHeader = () => {
  const NAV_BAR_HEIGHT = NAV_BAR.getBoundingClientRect().height;
  if (!NAV_LIST.classList.contains('nav--active')) {
    HERO_HEADER.style.paddingTop = `${NAV_BAR_HEIGHT / 10}rem`;
  }
};

// Init padding and update on resize
addPaddingToHeroHeader();
window.addEventListener('resize', () => {
  addPaddingToHeroHeader();
  if (window.innerWidth >= BREAKPOINT) {
    resetActiveState();
  }
});

//Dark and light mode
let lightmode = localStorage.getItem('lightmode');
const themeSwitch = document.getElementById('theme-switch'); // button

const enableLightMode = () => {
    document.body.classList.add('lightmode');
    localStorage.setItem('lightmode', 'active');
};

const disableLightMode = () => {
    document.body.classList.remove('lightmode');
    localStorage.setItem('lightmode', null);
};

if (lightmode === "active") enableLightMode()

themeSwitch.addEventListener("click", () => {
    lightmode = localStorage.getItem('lightmode'); // update value
    lightmode !== "active" ? enableLightMode() : disableLightMode();
});


// Scroll-based active nav link highlighting
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('#heroHeader, #aboutMe, #education, #projects, #contact');
  const NAV_BAR_HEIGHT = NAV_BAR.getBoundingClientRect().height;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionId = section.getAttribute('id');

    if (window.scrollY >= sectionTop - NAV_BAR_HEIGHT) {
      const targetLink = NAV_LINKS.find(link => link.getAttribute('href') === `#${sectionId}`);
      if (targetLink && currentActiveLink !== targetLink) {
        currentActiveLink.classList.remove(ACTIVE_LINK_CLASS);
        targetLink.classList.add(ACTIVE_LINK_CLASS);
        currentActiveLink = targetLink;
      }
    }
  });
});

// Hamburger toggle for mobile nav
HAMBURGER_BTN.addEventListener('click', () => {
  const isActive = NAV_LIST.classList.toggle('nav--active');
  document.body.style.overflowY = isActive ? 'hidden' : null;
  NAV_LIST.style.height = isActive ? '100vh' : 0;
});

// Nav link click closes mobile menu and blurs
NAV_LINKS.forEach(link => {
  link.addEventListener('click', () => {
    resetActiveState();
    link.blur();
  });
});

// Smooth scroll
new SweetScroll({
  trigger: '.nav__list-link',
  easing: 'easeOutQuint',
  offset: NAV_BAR.getBoundingClientRect().height - 80
});