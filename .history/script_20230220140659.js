'use strict';
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Implementing Smooth Scrolling . Реализуем плавный переход

// Кнопка прокрутки
btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords); //DOMRect {x: 0, y: 555, width: 1168, height: 1405.6875, top: 555, …}

  console.log(e.target.getBoundingClientRect());

  console.log(
    'Текущая прокрутка (X/Y)',
    window.pageXOffset,
    window.pageYOffset
  ); // 0 294

  console.log('height/width');

  console.log(
    'высота/ ширина viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // Scrolling
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,  // текущая позиция + текущая прокрутка
  //   s1coords.top + window.pageYOffset
  // );

  // // Старый метод, где нужно вручную прописывать координаты
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset, // текущая позиция + текущая прокрутка
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',  // плавно
  // });

  section1.scrollIntoView({ behavior: 'smooth' }); // Метод Element.scrollIntoView() интерфейса Element прокручивает контейнер родителя элемента так, чтобы элемент, на котором был вызван scrollIntoView(), стал виден пользователю.
});

////////////////////////////////////////////////////////////////////////////
// Навигация страницы

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault(); // предотвращаем прокрутку
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// 1. Add event listener общим родительским элементам
// 2. Определить какой элемент породил событие

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault(); // предотвращаем прокрутку

  // Matching strategy (стратегия соответсвия условию). Реагирует только на нажатие ссылок в родительском элементе с классом nav__link
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    console.log(id); //  #section--1, 2, 3
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// LECT Selecting, Creating, and Deleting Elements

// Selecting
// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

// const header = document.querySelector('.header');
// const allSections = document.querySelectorAll('.section');
// console.log(allSections);

// document.getElementById('section--1');
// const allButtons = document.getElementsByTagName('button');
// console.log(allButtons);

// console.log(document.getElementsByClassName('btn'));

// // Creating and inserting elements
// // .insertAdjacentHTML
// const message = document.createElement('div');
// message.classList.add('cookie-message');
// // message.textContent =
// //   'Мы используем куки для улучшения функциональности и аналитики.';
// message.innerHTML =
//   'Мы используем куки для улучшения функциональности и аналитики. <button class = "btn btn--close-cookie"> Got it! </button>';
// // header.prepend(message);
// header.append(message);
// // header.append(message.cloneNode(true)); // если нужно продублировать

// // header.before(message);
// // header.after(message);

// // Delete elements
// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', function () {
//     message.remove(); // относительно новый метод
//     // message.parentElement.removeChild(message); // аналогичное удаление
//   });
///////////////////////////////////////////////////////////////////////

// // LECT Styles
// message.style.backgroundColor = '#37383d';
// message.style.width = '120%';

// console.log(message.style.height);
// console.log(message.style.backgroundColor);

// console.log(getComputedStyle(message).alignItems);
// console.log(getComputedStyle(message).height);
// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px'; //parseFloat разбирает текстовую строку, ищет и возвращает из неё десятичное число

// console.log(getComputedStyle(message).height);

// document.documentElement.style.setProperty('--color-primary', 'orangered'); // Устанавливаем новое свойство (меняем цвет). (имя, свойство)

// // АТРИБУТЫ (src, alt, class, id, href,... )
// const logo = document.querySelector('.nav__logo');
// console.log(logo.alt); // Bankist logo

// console.log(logo.className); // nav__logo

// logo.alt = 'Beatiful minimalist logo';

// // Нестандартные атрибуты, поэтому нужно через getAttribute
// console.log(logo.designer); // undefined
// console.log(logo.getAttribute('designer')); // Jonas
// console.log(logo.hasAttribute('designer')); // true
// logo.setAttribute('company', 'Bankist'); // устанавливаем новый атрибут

// console.log(logo.src); // http://127.0.0.1:5500/img/logo.png
// console.log(logo.getAttribute('src')); // img/logo.png

// const link = document.querySelector('.nav__link--btn');
// console.log(link.href); // http://127.0.0.1:5500/#
// console.log(link.getAttribute('href')); // #

// // Data atributes
// console.log(logo.dataset.versionNumber); // 3.0  через camelCase используя объект dataset

// // Классы
// logo.classList.add('c');
// logo.classList.remove('c');
// logo.classList.toggle('c');
// console.log(logo.classList.contains('c')); // true

// // // DON'T USE !!
// // logo.className = ' jonas'

// //////LECT Types of Events and Event Handlers
// const h1 = document.querySelector('h1');

// const alertH1 = function (e) {
//   alert('addEventListener: Отлично! Вы прочитали заголовок:))');
// };
// // Событие mouseenter вызывается в Element когда указательное устройство (обычно мышь) изначально перемещается так, что его горячая точка находится в пределах элемента, в котором было запущено событие.
// h1.addEventListener('mouseenter', alertH1);

// setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);

// // Старыый метод
// // h1.onmouseenter = function (e) {
// //   alert('onmouseenter: Отлично! Вы прочитали заголовок:))');
// // };

// LECT Event Propagation (Прекращение всплытия): Bubbling(«стадия всплытия») and Capturing (перехват)
//rgb(255,255,255);
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);

// const randomColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)} )`;
// console.log(randomColor());

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('LINK', e.target, e.currentTarget); // e.target везде один и тот же : <a classs = nav__link... // currenTarget - конкретное место
//   console.log(e.currentTarget === this); // true

//   // Прекращение всплытия - не очень хорошая практика
//   // e.stopPropagation();
// });

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('CONTAINER', e.target, e.currentTarget);
//   console.log(e.currentTarget === this); // true
// });

// document.querySelector('.nav').addEventListener(
//   'click',
//   function (e) {
//     this.style.backgroundColor = randomColor();
//     console.log('NAV', e.target, e.currentTarget);
//     console.log(e.currentTarget === this); // true
//   }
//   // true   //  Если аргумент true, то событие будет перехвачено по дороге вниз.
// );

// LECT Traversing (Прохождение) DOM
const h1 = document.querySelector('h1');
// Downwards (вниз): child
console.log(h1.querySelectorAll('.highlight')); // NodeList(2) [span.highlight, span.highlight]
console.log(h1.childNodes); // полный список NodeList(9) [text, comment, text, span.highlight, text, br, text, span.highlight, text]
console.log(h1.children); // HTMLCollection(3) [span.highlight, br, span.highlight]
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orange';
