const side = document.getElementById('sideBtn');
const nav = document.getElementById('navbarSupportedContent');
side.addEventListener('click', () => {
    nav.classList.toggle('nav-show')
})