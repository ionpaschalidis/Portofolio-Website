const NAV_BAR = document.getElementById('navBar');
const NAV_LIST = document.getElementById('navList');
const HERO_HEADER = document.getElementById('home');
const HAMBURGER_BTN = document.getElementById('hamburgerBtn');
const NAV_LINKS = Array.from( document.querySelectorAll('.nav__list-link'));
const SERVICE_BOXES = document.querySelectorAll('.about-card__box');
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
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('#home, #aboutMe, #experience, #education, #projects, #contact');
  const NAV_BAR_HEIGHT = NAV_BAR.getBoundingClientRect().height;
  let closestSection = null;
  let minDistance = Number.POSITIVE_INFINITY;

  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    const distance = Math.abs(rect.top - NAV_BAR_HEIGHT);

    if (distance < minDistance) {
      minDistance = distance;
      closestSection = section;
    }
  });

  if (closestSection) {
    const ID = closestSection.getAttribute('id');
    const LINK = NAV_LINKS.find(link => link.getAttribute('href') === `#${ID}`);

    if (LINK && LINK !== currentActiveLink) {
      if (currentActiveLink) {
        currentActiveLink.classList.remove(ACTIVE_LINK_CLASS);
      }
      LINK.classList.add(ACTIVE_LINK_CLASS);
      currentActiveLink = LINK;
    }
  }
});

// When navbar link is clicked, reset the active state
NAV_LINKS.forEach(link => {
  link.addEventListener('click', ()=>{
    resetActiveState();
    link.blur();
  })
})

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

// Multiple pictures per project
document.querySelectorAll('.carousel').forEach(carousel => {
  const images = Array.from(carousel.querySelectorAll('.carousel__image'));
  const prevBtn = carousel.querySelector('.carousel__btn.prev');
  const nextBtn = carousel.querySelector('.carousel__btn.next');
  let currentIndex = 0;

  const updateCarousel = (index) => {
    images.forEach((img, i) => {
      img.classList.toggle('active', i === index);
    });
    currentIndex = index;
  };

  nextBtn?.addEventListener('click', () => {
    const nextIndex = (currentIndex + 1) % images.length;
    updateCarousel(nextIndex);
  });

  prevBtn?.addEventListener('click', () => {
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    updateCarousel(prevIndex);
  });
});

//Flip projects
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.flip-card').forEach(card => {
    const inner = card.querySelector('.flip-card__inner');
    let flipBackTimeout;

    card.querySelectorAll('img').forEach(img => {
      img.addEventListener('click', (e) => {
        //if the image is inside a .link-icon, do nothing
        if (img.closest('.link-icon')) {
          return; 
        }
        e.preventDefault();
        if (inner.classList.contains('flipped')) {
          inner.classList.remove('flipped');
        } else {
          inner.classList.add('flipped');
        }
      });
    });
    

    const backSide = card.querySelector('.flip-card__back');
    backSide.addEventListener('click', () => {
      inner.classList.remove('flipped');
    });
    
    card.addEventListener('mouseleave', () => {
      if (inner.classList.contains('flipped')) {
        flipBackTimeout = setTimeout(() => {
          console.log("Mouse left");
          clearTimeout(flipBackTimeout);
          inner.classList.remove('flipped');
        }, 4000);
      }
    });

    card.addEventListener('mouseenter', () => {
      console.log("Mouse entered");
      clearTimeout(flipBackTimeout);
    });
  });
});

//Make popup disappear
document.addEventListener("DOMContentLoaded", function() {
  const projectItems = document.querySelectorAll('.project__item');
  projectItems.forEach(item => {
    const popupText = item.querySelector('.popuptext');
    item.addEventListener('mouseenter', () => {
      popupText.classList.add('show');
      setTimeout(() => {
        popupText.classList.remove('show');
      }, 1500); //1500ms
    });
    item.addEventListener('mouseleave', () => {
      popupText.classList.remove('show');
    });
  });
});

//Extra information
function extraInfo(school) {
  const space = document.getElementById("space-" + school);
  const moreText = document.getElementById("more-info-" + school);
  const icon = document.getElementById("icon-" + school).querySelector("path");

  const upPath = "M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z";
  const downPath = "M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z";

  const isHidden = moreText.style.display === "none" || moreText.style.display === "";

  space.style.display = isHidden ? "inline" : "none";
  moreText.style.display = isHidden ? "inline" : "none";
  icon.setAttribute("d", isHidden ? downPath : upPath);
}

// Setup auto-hide for all "more-info" containers
document.addEventListener("DOMContentLoaded", () => {
  const upPath = "M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z";
  const downPath = "M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z";

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        const moreInfo = entry.target;
        const id = moreInfo.id.replace("more-info-", "");
        const space = document.getElementById("space-" + id);
        const icon = document.getElementById("icon-" + id).querySelector("path");

        moreInfo.style.display = "none";
        space.style.display = "none";
        icon.setAttribute("d", downPath); // reset icon
      }
    });
  }, {
    threshold: 0.1
  });

  // Observe all "more-info" elements
  document.querySelectorAll("[id^='more-info-']").forEach(el => observer.observe(el));
});
