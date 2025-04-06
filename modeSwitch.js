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
