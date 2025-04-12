const NAV_BAR = document.getElementById('navBar');
const NAV_LIST = document.getElementById('navList');
const HERO_HEADER = document.getElementById('home');
const HAMBURGER_BTN = document.getElementById('hamburgerBtn');
const NAV_LINKS = Array.from( document.querySelectorAll('.nav__list-link'));
const SERVICE_BOXES = document.querySelectorAll('.service-card__box');
const ACTIVE_LINK_CLASS = 'active';
const BREAKPOINT = 576;

let currentServiceBG = null;
let currentActiveLink = NAV_LINKS.find(link => link.classList.contains(ACTIVE_LINK_CLASS)) || null;

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

// Remove the active state once the breakpoint is reached
const resetActiveState = ()=>{
  NAV_LIST.classList.remove('nav--active');
  Object.assign(NAV_LIST.style, {
    height: null
  });
  Object.assign(document.body.style, {
    overflowY: null
  });
}

//Add padding to the header to make it visible because navbar has a fixed position.
const addPaddingToHeroHeaderFn = () => {
const NAV_BAR_HEIGHT = NAV_BAR.getBoundingClientRect().height;
const HEIGHT_IN_REM = NAV_BAR_HEIGHT / 10;

// If hamburger button is active, do not add padding
  if (NAV_LIST.classList.contains('nav--active')) {
    return;
  }
  Object.assign(HERO_HEADER.style, {
    paddingTop: HEIGHT_IN_REM + 'rem'
  });
}
addPaddingToHeroHeaderFn();
window.addEventListener('resize', ()=>{
  addPaddingToHeroHeaderFn();

// When the navbar is active and the window is being resized, remove the active state once the breakpoint is reached
  if(window.innerWidth >= BREAKPOINT){
    addPaddingToHeroHeaderFn();
    resetActiveState();
  }
});

// As the user scrolls, the active link should change based on the section currently displayed on the screen.
/* LOOKING FOR ERROR */
function updateActiveLinkOnScroll() {
    const sections = document.querySelectorAll('#home, #aboutMe, #education, #projects, #contact');
    const NAV_BAR_HEIGHT = NAV_BAR.getBoundingClientRect().height;
    let found = false;
  
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionID = section.getAttribute('id');
  
      const isInView = window.scrollY >= sectionTop - NAV_BAR_HEIGHT &&
                       window.scrollY < sectionTop + sectionHeight - NAV_BAR_HEIGHT;
  
      if (isInView) {
        console.log(`🟢 In view: ${sectionID}`);
        const LINK = NAV_LINKS.find(link => link.href.includes(`#${sectionID}`));
        if (!LINK) {
          console.warn(`⚠️ No nav link found for ${sectionID}`);
          return;}
  
        if (currentActiveLink !== LINK) {
          if (currentActiveLink) {
            currentActiveLink.classList.remove(ACTIVE_LINK_CLASS);
            console.log(`🔴 Removed active from: ${currentActiveLink.textContent}`);
          }
          LINK.classList.add(ACTIVE_LINK_CLASS);
          currentActiveLink = LINK;
          console.log(`🟢 Added active to: ${LINK.textContent}`);
        }
        found = true;
      }});
  
    if (!found) {console.log('🔘 No section in view');}}
  
  window.addEventListener('scroll', updateActiveLinkOnScroll);
  window.addEventListener('load', updateActiveLinkOnScroll);

// Shows & hide navbar on smaller screen
HAMBURGER_BTN.addEventListener('click', ()=>{
  NAV_LIST.classList.toggle('nav--active');
  if (NAV_LIST.classList.contains('nav--active')) {
    Object.assign(document.body.style, {
      overflowY: 'hidden'
    });
    Object.assign(NAV_LIST.style, {
      height: '100vh'
    });
    return;
  }
  Object.assign(NAV_LIST.style, {
    height: 0
  });
  Object.assign(document.body.style, {
    overflowY: null
  });
});

// When navbar link is clicked, reset the active state
NAV_LINKS.forEach(link => {
  link.addEventListener('click', ()=>{
    resetActiveState();
    link.blur();
  })
})