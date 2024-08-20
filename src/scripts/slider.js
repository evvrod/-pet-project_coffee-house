let isPaused = false;
let timer;
const stylesheet = document.styleSheets[0];

const sliderItems = document.querySelector('.slider__items');
const sliderNavigation = document.querySelectorAll('.favorites__navigation');
const arrowRight = document.getElementById('sl-arrow-right');
const arrowLeft = document.getElementById('sl-arrow-left');

const newRule = [...stylesheet.cssRules].find((r) => r.selectorText === ".slider__items");


function changeActiveNavigation(start, finish) {
  clearInterval(timer);
  sliderNavigation[start].childNodes[1].style.width = 0 + 'px';
  sliderNavigation[start].classList.remove('favorites__navigation_active');
  sliderNavigation[finish].classList.add('favorites__navigation_active');
  tic(finish);
}

// arrow left
arrowLeft.addEventListener('click', (e) => {
  shiftLeftSlider();
});

function shiftRightSlider() {
  const currentSliderNavigation = Number((document.querySelector('.favorites .favorites__navigation_active').id).at(-1));
  changeActiveNavigation(currentSliderNavigation - 1, currentSliderNavigation % 3);

  const itemGap = parseInt(window.getComputedStyle(sliderItems).gap);
  const itemWidth = (parseInt(window.getComputedStyle(sliderItems).width) - 2 * itemGap) / 3;
  const currentPosition = - (currentSliderNavigation - 1) * (itemWidth + itemGap);

  if (currentSliderNavigation === 3) {
    newRule.style.setProperty('left', `0px`);
  } else {
    newRule.style.setProperty('left', `${currentPosition - itemGap - itemWidth}px`);
  }
}

// arrow right
arrowRight.addEventListener('click', shiftRightSlider);

function shiftLeftSlider() {
  const currentSliderNavigation = Number((document.querySelector('.favorites .favorites__navigation_active').id).at(-1));

  changeActiveNavigation(currentSliderNavigation - 1, (currentSliderNavigation - 1 + 2) % 3);

  const itemGap = parseInt(window.getComputedStyle(sliderItems).gap);
  const itemWidth = (parseInt(window.getComputedStyle(sliderItems).width) - 2 * itemGap) / 3;
  const currentPosition = - (currentSliderNavigation - 1) * (itemWidth + itemGap);

  if (currentSliderNavigation === 1) {
    newRule.style.setProperty('left', `${currentPosition - 2 * itemGap - 2 * itemWidth}px`);
  } else {
    newRule.style.setProperty('left', `${currentPosition + itemGap + itemWidth}px`);
  }
}

function tic(currentNavigation) {
  let i = 0;
  let value = 0;

  timer = setInterval(paint, 100);

  function paint() {
    if (!isPaused) {
      if (value >= 100) {
        shiftLeftSlider();
        sliderNavigation[currentNavigation].childNodes[1].style.width = 0 + 'px';
        i = 0;
        value = 0;
      } else {
        value += 2;
        sliderNavigation[currentNavigation].childNodes[1].style.width = value + '%';
      }
    }
  }
}

window.addEventListener('load', (e) => {
  tic(0);
  swap();
})

sliderItems.addEventListener('mousemove', (e) => {
  isPaused = true;
})

sliderItems.addEventListener('mouseout', (e) => {
  isPaused = false;
})

function swap() {
  let starPositionX;
  sliderItems.addEventListener('touchstart', (e) => {
    isPaused = true;
    starPositionX = parseInt(e.changedTouches[0].clientX);
    e.preventDefault();
  })

  sliderItems.addEventListener('touchend', (e) => {
    isPaused = false;
    let dist = parseInt(e.changedTouches[0].clientX) - starPositionX;

    if (Math.abs(dist) > 5) {
      if (dist < 0) {
        shiftRightSlider();
      } else {
        shiftLeftSlider();
      }
    }
    e.preventDefault();
  });
}