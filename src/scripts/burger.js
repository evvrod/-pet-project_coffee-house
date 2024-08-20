
const buttonBurger = document.querySelector('.button-burger');
const modalMenu = document.querySelector('.burger-menu');

function showBurgerMenu() {
  buttonBurger.classList.toggle('button-burger_active');
  modalMenu.classList.toggle('burger-menu_show');
}

function hideBurgerMenu() {
  buttonBurger.classList.remove('button-burger_active');
  modalMenu.classList.remove('burger-menu_show');
}

buttonBurger.addEventListener('click', (e) => {
  showBurgerMenu();
})

window.addEventListener('scroll', (e) => {
  hideBurgerMenu();
})

window.addEventListener('resize', (e) => {
  if (window.screen.width > 768 & buttonBurger.classList.contains('button-burger_active')) {
    hideBurgerMenu();
  }
})

const buttonMenu = document.querySelector('.burger-menu .link_disabled');
if (buttonMenu !== null) {
  buttonMenu.addEventListener('click', (e) => {
    hideBurgerMenu();
  })
}

function openLink(link) {
  setTimeout(() => {
    window.location = link.href;
  }, 500);
}

const logo = document.querySelector('.logo');

logo.addEventListener('click', (e) => {
  hideBurgerMenu();
  if (e.target.closest('.logo_link') !== null) {
    const link = document.querySelector('.logo_link');
    e.preventDefault();
    openLink(link);
  }
})

const burgerMenuLinks = document.querySelectorAll('.burger-menu__navigation .link');
burgerMenuLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    hideBurgerMenu();
    openLink(link);
  })
})