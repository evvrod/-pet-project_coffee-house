import './menu.html';
import './style.scss';
import './img.js'

import './scripts/burger.js'

import menuItems from './products.json';

const buttonCoffee = document.getElementById('button-coffee');
const buttonTea = document.getElementById('button-tea');
const buttonDessert = document.getElementById('button-dessert');

const buttonRefresh = document.getElementById('button-refresh');

const modal = document.querySelector('.modal__wrapper');
const body = document.querySelector('body');

const buttonModalClose = document.getElementById('button-modal-close');

function developMenuItemBlock(type) {
  let divMenuItems = document.querySelector('.menu__items');
  divMenuItems.innerHTML = '';
  let activeItem = menuItems.filter((el) => el.category === type);

  let i = 0;
  while (i < activeItem.length) {
    const divMenuItem = document.createElement('div');
    divMenuItem.classList.add('menu__item');
    divMenuItem.setAttribute('id', activeItem[i].id);

    const divItemWrapperImg = document.createElement('div');
    divItemWrapperImg.classList.add('item__wrapper-img');

    const imgItemImg = document.createElement('div');
    imgItemImg.classList.add("item__img");
    imgItemImg.style.backgroundImage = 'url(' + activeItem[i].img + ')';
    // imgItemImg.style.backgroundImage = `url(assets/img/${activeItem[i].category}-${i + 1}.jpg)`;

    const divItemInfoWithPrice = document.createElement('div');
    divItemInfoWithPrice.classList.add("item__info-with-price");

    const divItemInfo = document.createElement('div');
    divItemInfo.classList.add("item__info");

    const h3ItemTitle = document.createElement('h3');
    h3ItemTitle.innerHTML = activeItem[i].name;
    h3ItemTitle.classList.add("item__title");
    h3ItemTitle.classList.add("h3");

    const divItemDetails = document.createElement('div');
    divItemDetails.innerHTML = activeItem[i].description;
    divItemDetails.classList.add("item__details");

    const h3ItemPrice = document.createElement('h3');
    h3ItemPrice.innerHTML = '$' + activeItem[i].price;
    h3ItemPrice.classList.add("item__price");
    h3ItemPrice.classList.add("h3");

    divMenuItem.append(divItemWrapperImg);
    divItemWrapperImg.append(imgItemImg);
    divMenuItem.append(divItemInfoWithPrice);
    divItemInfoWithPrice.append(divItemInfo);
    divItemInfo.append(h3ItemTitle);
    divItemInfo.append(divItemDetails);
    divItemInfoWithPrice.append(h3ItemPrice);

    divMenuItems.append(divMenuItem);
    i += 1;
  }
}

function addListenerMenuItems() {
  const menuItem = document.querySelectorAll('.menu__item');
  menuItem.forEach(item => {
    item.addEventListener('click', (e) => {
      modal.classList.add('modal__wrapper_show');
      body.classList.add('lock');

      // создание модального окна
      generateModal(item.id);

      const buttonSizeS = document.getElementById('button-size-s');
      const buttonSizeM = document.getElementById('button-size-m');
      const buttonSizeL = document.getElementById('button-size-l');

      const buttonAdditives1 = document.getElementById('button-additives-1');
      const buttonAdditives2 = document.getElementById('button-additives-2');
      const buttonAdditives3 = document.getElementById('button-additives-3');

      // логика работы тегов размера и добавок
      buttonSizeS.addEventListener('click', (e) => {
        const modalPrice = document.querySelector('.modal__wrapper .modal__total-price');
        changeActive(buttonSizeS, buttonSizeM, buttonSizeL);
        console.log(item.id)
        modalPrice.textContent = addPrice(item.id);
      })

      buttonSizeM.addEventListener('click', (e) => {
        const modalPrice = document.querySelector('.modal__wrapper .modal__total-price');
        changeActive(buttonSizeM, buttonSizeS, buttonSizeL);
        modalPrice.textContent = addPrice(item.id);
      })

      buttonSizeL.addEventListener('click', (e) => {
        const modalPrice = document.querySelector('.modal__wrapper .modal__total-price');
        changeActive(buttonSizeL, buttonSizeS, buttonSizeM);
        modalPrice.textContent = addPrice(item.id);
      })

      buttonAdditives1.addEventListener('click', (e) => {
        const modalPrice = document.querySelector('.modal__wrapper .modal__total-price');
        buttonAdditives1.classList.toggle('tag_active');
        modalPrice.textContent = addPrice(item.id);
      })

      buttonAdditives2.addEventListener('click', (e) => {
        const modalPrice = document.querySelector('.modal__wrapper .modal__total-price');
        buttonAdditives2.classList.toggle('tag_active');
        modalPrice.textContent = addPrice(item.id);
      })

      buttonAdditives3.addEventListener('click', (e) => {
        const modalPrice = document.querySelector('.modal__wrapper .modal__total-price');
        buttonAdditives3.classList.toggle('tag_active');
        modalPrice.textContent = addPrice(item.id);
      })
    })
  })
}

function generateModal(num) {
  let activeItem = menuItems.filter((el) => el.id === Number(num))[0];

  const modalImg = document.querySelector('.modal .modal__img');
  const img = document.createElement('img');
  img.classList.add('item__img');
  img.setAttribute('src', activeItem.img);
  modalImg.append(img);

  document.querySelector('.modal .item__title').textContent = activeItem.name;
  document.querySelector('.modal .item__details').textContent = activeItem.description;

  const modalTagsSize = document.querySelector('.modal__size .modal__tags');
  console.log(modalTagsSize);
  modalTagsSize.innerHTML = '';

  const size = ['s', 'm', 'l'];
  for (let i = 0; i < 3; i++) {
    const button = document.createElement('button');
    button.classList.add('tag', 'two-columns', 'two-columns_gap8');
    if (i === 0) { button.classList.add('tag_active') }
    button.setAttribute('id', 'button-size-' + size[i]);

    const tagCircle = document.createElement('span');
    tagCircle.classList.add('tag__circle');

    const tagCircleCaption = document.createElement('span');
    tagCircleCaption.textContent = size[i].toUpperCase();

    const tagSizeText = document.createElement('span');
    tagSizeText.classList.add('tag__text', 'tag__size' + (i + 1));
    tagSizeText.textContent = activeItem.sizes[size[i]].size;

    button.append(tagCircle, tagSizeText);
    tagCircle.append(tagCircleCaption);

    modalTagsSize.append(button);
  }

  const modalTagsAdditives = document.querySelector('.modal__additives .modal__tags');
  console.log(modalTagsAdditives)
  modalTagsAdditives.innerHTML = '';

  for (let i = 0; i < 3; i++) {
    const button = document.createElement('button');
    button.classList.add('tag', 'two-columns', 'two-columns_gap8');
    button.setAttribute('id', 'button-additives-' + (i + 1));

    const tagCircle = document.createElement('span');
    tagCircle.classList.add('tag__circle');

    const tagCircleCaption = document.createElement('span');
    tagCircleCaption.textContent = i + 1;

    const tagSizeText = document.createElement('span');
    tagSizeText.classList.add('tag__text', 'tag__additives' + (i + 1));
    tagSizeText.textContent = activeItem.additives[i].name;

    button.append(tagCircle, tagSizeText);
    tagCircle.append(tagCircleCaption);

    modalTagsAdditives.append(button);
  }
  document.querySelector('.modal .modal__total-price').textContent = addPrice(Number(num));
}

// логика работы тегов для подсчета цены
function changeActive(active, ...inactive) {
  active.classList.add('tag_active');
  inactive.forEach(item => item.classList.remove('tag_active'))
}

function addPrice(num) {
  const activeItem = menuItems.filter((el) => el.id === Number(num))[0];

  const sizeTag = document.querySelector('.item__size .tag_active');
  const additivesTags = document.querySelectorAll('.item__additives .tag_active');

  const price = Number(activeItem.price);
  let plusPrice = 0;

  switch (sizeTag.id) {
    case 'button-size-s':
      plusPrice = Number(activeItem.sizes.s['add-price']);
      break;
    case 'button-size-m':
      plusPrice = Number(activeItem.sizes.m['add-price']);
      break;
    case 'button-size-l':
      plusPrice = Number(activeItem.sizes.l['add-price']);
      break;
  }

  additivesTags.forEach(item => {
    switch (item.id) {
      case 'button-additives-1':
        plusPrice += Number(activeItem.additives[0]['add-price']);
        break;
      case 'button-additives-2':
        plusPrice += Number(activeItem.additives[1]['add-price']);
        break;
      case 'button-additives-3':
        plusPrice += Number(activeItem.additives[2]['add-price']);
        break;
    }
  })
  return '$' + (price + plusPrice).toFixed(2);
}

// закрытие модального окна
function closeModal(el) {
  el.classList.remove('modal__wrapper_show');
  body.classList.remove('lock');
}

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal(modal);
  }
})

buttonModalClose.addEventListener('click', (e) => {
  closeModal(modal);
})

window.addEventListener('load', (e) => {
  buttonCoffee.classList.add('tag_active');
  developMenuItemBlock('coffee');
  addListenerMenuItems();
  // if (document.querySelectorAll('.menu__item').length > 4) 
})

// логика работы тегов кофе / чай / десерты
buttonCoffee.addEventListener('click', (e) => {
  changeActive(buttonCoffee, buttonTea, buttonDessert);
  developMenuItemBlock('coffee');
  addListenerMenuItems();
  buttonRefresh.classList.remove('button-refresh_hide');
})

buttonTea.addEventListener('click', (e) => {
  changeActive(buttonTea, buttonCoffee, buttonDessert);
  developMenuItemBlock('tea');
  addListenerMenuItems();
  buttonRefresh.classList.remove('button-refresh_hide');

})

buttonDessert.addEventListener('click', (e) => {
  changeActive(buttonDessert, buttonCoffee, buttonTea);
  developMenuItemBlock('dessert');
  addListenerMenuItems();
  buttonRefresh.classList.remove('button-refresh_hide');
})

buttonRefresh.addEventListener('click', (e) => {
  document.querySelectorAll('.menu__item').forEach(item => item.classList.add('menu__item_show'));
  buttonRefresh.classList.add('button-refresh_hide');
})

