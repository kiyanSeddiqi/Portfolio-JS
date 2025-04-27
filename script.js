'use strict';
const switchBtn = document.querySelector('.theme-switcher');
const mainNav_switchBtn = document.querySelector('.main-nav__theme-switcher');
const rootElem = document.documentElement;

const imgContainer = document.querySelector('.portfolio__container');
const previewBox = document.querySelector('.portfolio__preview');
const previewClose = document.querySelector('.portfolio__preview-close');
const previewImg = document.querySelector('.portfolio__preview-img');
const overlayDark = document.querySelector('.overlay--dark');
const portfolioImages = document.querySelectorAll('.portfolio__img');
const previewSliderRightBtn = document.querySelector('.portfolio__preview-btn--right');
const previewSliderLeftBtn = document.querySelector('.portfolio__preview-btn--left');

const categoryList = document.querySelector('.portfolio__category-list');
const images = document.querySelectorAll('.portfolio__img-box');
const imagePreviewIcon = document.querySelectorAll('.portfolio__img-box-icon');

const downloadImgBtns = document.querySelectorAll('[data-download]');

const slides = document.querySelectorAll('.review__slide');
const dotContainer = document.querySelector('.review__slider-dots');
const sliderBtnLeft = document.querySelector('.review__slider-btn--left');
const sliderBtnRight = document.querySelector('.review__slider-btn--right');

const overlayLight = document.querySelector('.overlay.overlay--light');
const moreInfoBtn = document.querySelector('.info-panel__arrow-btn');
const moreInfoBtnRight = document.querySelector('.info-panel__arrow--right');
const moreInfoBtnLeft = document.querySelector('.info-panel__arrow--left');
const infoPanel = document.querySelector('.info-panel');

const hamburgerMenu = document.querySelector('.main-nav__hamburger-menu');
const sideNav = document.querySelector('.side-nav');

// DARK THEME MODE--------------------
function swicthTheme() {
  let dataTheme = rootElem.getAttribute('data-theme');
  let newTheme;
  newTheme = dataTheme === 'light' ? 'dark' : 'light';
  rootElem.setAttribute('data-theme', newTheme);

  // Set theme in local storage
  localStorage.setItem('theme', newTheme);
}

switchBtn.addEventListener('click', swicthTheme);
mainNav_switchBtn.addEventListener('click', swicthTheme);

function checkLocalS() {
  let localS = localStorage.getItem('theme');
  if (localS === 'dark') rootElem.setAttribute('data-theme', 'dark');
}
window.addEventListener('DOMContentLoaded', checkLocalS);

// PORTFOLIO IMAGE FILTER--------------------

categoryList.addEventListener('click', function (e) {
  const activeItem = categoryList.querySelector('.portfolio__category-item--active');

  if (e.target.classList.contains('portfolio__category-item')) {
    activeItem.classList.remove('portfolio__category-item--active');
    e.target.classList.add('portfolio__category-item--active');
    let filterName = e.target.getAttribute('data-name');

    images.forEach((image) => {
      let imgDataSet = image.getAttribute('data-name');
      if (filterName === imgDataSet || filterName === 'all') {
        image.classList.add('portfolio__img-box-show');
        image.classList.remove('portfolio__img-box-hide');
      } else {
        image.classList.remove('portfolio__img-box-show');
        image.classList.add('portfolio__img-box-hide');
      }
    });
  }
});

// PORTFOLIO IMAGE PREVIEW--------------------

function showPreviewImg(imgSrc) {
  previewImg.setAttribute('src', imgSrc);
  previewBox.classList.add('portfolio__preview--show');
  overlayDark.style.display = 'block';
  previewBox.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'center' });
  overlayDark.addEventListener('click', closePreviewImg);
  rootElem.addEventListener('keyup', function (e) {
    if (e.key === 'Escape') closePreviewImg();
  });
}

function closePreviewImg() {
  previewBox.classList.remove('portfolio__preview--show');
  overlayDark.style.display = 'none';
}
imgContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('portfolio__img-magnifier')) {
    let parentElem = e.target.closest('.portfolio__img-box');
    let targetImgSrc = parentElem.querySelector('img').getAttribute('src');
    showPreviewImg(targetImgSrc);
  }

  // PORTFOLIO IMAGE HITTING LIKE--------------------
  if (e.target.classList.contains('fa-heart')) {
    e.target.classList.toggle('fa-solid');
  }
});

previewClose.addEventListener('click', closePreviewImg);

// PORTFOLIO IMAGE PREVIEW SLIDER--------------------

portfolioImages.forEach((img, i) => {
  img.setAttribute('data-index', i);
});

imgContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('portfolio__img-magnifier')) {
    let parentElem = e.target.closest('.portfolio__img-box');
    let targetImgDataset = parentElem.querySelector('img').getAttribute('data-index');
    previewSliderRightBtn.addEventListener('click', function () {
      if (+targetImgDataset === portfolioImages.length - 1) targetImgDataset = 0;
      else targetImgDataset++;
      let nextImg = document.querySelector(
        `.portfolio__img[data-index="${targetImgDataset}"]`
      );
      showPreviewImg(nextImg.getAttribute('src'));
    });
    previewSliderLeftBtn.addEventListener('click', function () {
      if (+targetImgDataset === 0) targetImgDataset = portfolioImages.length - 1;
      else targetImgDataset--;
      let prevImg = document.querySelector(
        `.portfolio__img[data-index="${targetImgDataset}"]`
      );
      showPreviewImg(prevImg.getAttribute('src'));
    });
  }
});

// PORTFOLIO IMAGE DOWNLOAD--------------------

downloadImgBtns.forEach((btn) => {
  let id = btn.dataset.download;
  let img = document.getElementById(id);
  let anchorLink = document.createElement('a');
  anchorLink.setAttribute('href', img.src);
  anchorLink.download = '';
  btn.addEventListener('click', function () {
    document.body.appendChild(anchorLink);
    anchorLink.click();
  });
});

// INFO PANLE DYNAMIC PROGRESSBAR ---------------
setTimeout(() => {
  const progressBars = document.querySelectorAll('.info-panel__progressbar');

  progressBars.forEach((bar) => {
    let barData = bar.getAttribute('data-percent');
    let barParent = bar.parentElement.parentElement;
    let barValue = barParent.querySelector('span');
    let barwidth = 10;
    let progressAnimation = setInterval(progressfunc, 100);
    function progressfunc() {
      if (barwidth >= barData) {
        clearInterval(progressAnimation);
      } else {
        barwidth++;
        bar.style.width = barwidth + '%';
        barValue.innerHTML = barwidth + '%';
      }
    }
  });
}, 1500);

// TESTIMONIAL SLIDER--------------------

let curSlide = 0;
let maxSlide = slides.length - 1;

function goToSlide(slide) {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
}
goToSlide(0);

function nextSlide() {
  if (curSlide === maxSlide) curSlide = 0;
  else curSlide++;
  goToSlide(curSlide);
  activeSlide(curSlide);
}
function prevSlide() {
  if (curSlide === 0) curSlide = maxSlide;
  else curSlide--;
  goToSlide(curSlide);
  activeSlide(curSlide);
}

let intervalId = null;
function portfolioAutoSlider() {
  intervalId = setInterval(nextSlide, 5000);
}
window.addEventListener('DOMContentLoaded', portfolioAutoSlider);

sliderBtnRight.addEventListener('click', nextSlide);
sliderBtnLeft.addEventListener('click', prevSlide);

document.addEventListener('keyup', function (e) {
  if (e.key === 'ArrowRight') nextSlide();
  if (e.key === 'ArrowLeft') prevSlide();
});

function activeSlide(slide) {
  document
    .querySelectorAll('.review__slider-dot')
    .forEach((dot) => dot.classList.remove('review__slider-dot--active'));
  document
    .querySelector(`.review__slider-dot[data-slide="${slide}"]`)
    .classList.add('review__slider-dot--active');
}

slides.forEach((_, i) => {
  dotContainer.insertAdjacentHTML(
    'beforeend',
    `
    <button class="review__slider-dot" data-slide='${i}'></button>
    `
  );
});

dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('review__slider-dot')) {
    const slide = e.target.dataset.slide;
    goToSlide(slide);
    activeSlide(slide);
    clearInterval(intervalId);
  }
});

// INFO PANEL ARROW------------------

let flag = true;

function closeInfoPanel() {
  infoPanel.style.transform = 'translateX(-100%)';
  overlayLight.style.display = 'none';
  moreInfoBtnRight.style.opacity = 1;
  moreInfoBtnLeft.style.opacity = 0;
  flag = !flag;
}

moreInfoBtn.addEventListener('click', function () {
  if (flag) {
    infoPanel.style.transform = 'translateX(0%)';
    overlayLight.style.display = 'block';
    moreInfoBtnRight.style.opacity = 0;
    moreInfoBtnLeft.style.opacity = 1;
    flag = !flag;
  } else closeInfoPanel();

  document.documentElement.addEventListener('keyup', (e) => {
    if (e.key === 'Escape') closeInfoPanel();
  });

  overlayLight.addEventListener('click', closeInfoPanel);

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 784) {
      infoPanel.style.transform = 'translateX(0%)';
      overlayLight.style.display = 'none';
    } else closeInfoPanel();
  });
});

// HAMBURGER MENU ------------------

let menuFlag = true;
function closeSideNav() {
  hamburgerMenu.classList.remove('change');
  overlayLight.style.display = 'none';
  if (window.innerWidth <= 600) sideNav.style.transform = 'translateX(100%)';

  menuFlag = !menuFlag;
}

function sideNavClosing() {
  const sideNavList = document.querySelector('.side-nav__list');
  sideNavList.querySelectorAll('.side-nav__item').forEach((item) => {
    item.addEventListener('click', closeSideNav);
  });
}

hamburgerMenu.addEventListener('click', function (e) {
  this.classList.toggle('change');
  if (menuFlag) {
    sideNav.style.transform = 'translateX(0)';
    overlayLight.style.display = 'block';
    menuFlag = !menuFlag;
    sideNavClosing();
  } else closeSideNav();

  overlayLight.addEventListener('click', closeSideNav);

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 600) {
      sideNav.style.transform = 'translateX(0%)';
    } else {
      sideNav.style.transform = 'translateX(100%)';
      hamburgerMenu.classList.remove('change');
    }
  });
});
