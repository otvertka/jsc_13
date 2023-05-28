'use strict';
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab'); // кнопки вкладок
const tabsContainer = document.querySelector('.operations__tab-container'); //
const tabsContent = document.querySelectorAll('.operations__content'); // Контент вкладок

const nav = document.querySelector('.nav');

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

// Tabbed component (ВКЛАДКИ ОПЕРАЦИЙ)

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);

  // Guard clause (предотвращение ошибки)
  if (!clicked) return; // если не нажали ни на одну из кнопок, либо не попали по кнопке

  // Remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active')); // удаляем во Вкладках класс Актив вначале, чтобы неактивная кнопка уходила вниз
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));
  // Active tab. Активируем вкладку при нажатии
  clicked.classList.add('operations__tab--active');

  // Activate content area
  console.log(clicked.dataset.tab); // 1 / 2 / 3

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`) // считывает цифру Датасет из нажатой кнопки, и открываем видимость контента (из CSS)
    .classList.add('operations__content--active');
});

// ЗАТЕМНЕНИЕ МЕНЮ АНИМАЦИЯ

const handleHover = function (e) {
  // console.log(this, e.currentTarget);  // 0.5 <nav class=​"nav">​…​</nav>​ flex <img src=​"img/​logo.png" alt=​"Bankist logo" class=​"nav__logo" id=​"logo" designer=​"Jonas" data-version-number=​"3.0">​<ul class=​"nav__links">​…​</ul>​ flex </nav>​

  if (e.target.classList.contains('nav__link')) {
    // проверяем, нажатая ссылка с классом nav__link или нет?
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link'); // находим ближайшего родителя(.nav) .. и выбираем всех детей с классом ('.nav__link')
    const logo = link.closest('.nav').querySelector('img'); // находим ближайшего родителя(.nav) .. и выбираем все изображения(лого)

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this; // затемняем все ссылки, кроме нажатой
    });
    logo.style.opacity = this;
  }
};

// Передача "аргумента" обработчику
nav.addEventListener('mouseover', handleHover.bind(0.5)); // Метод bind() создаёт новую функцию, которая при вызове устанавливает в качестве контекста выполнения this предоставленное значение. В метод также передаётся набор аргументов, которые будут установлены перед переданными в привязанную функцию аргументами при её вызове.
nav.addEventListener('mouseout', handleHover.bind(1)); // Метод bind() создаёт новую функцию, которая при вызове устанавливает в качестве контекста выполнения this предоставленное значение. В метод также передаётся набор аргументов, которые будут установлены перед переданными в привязанную функцию аргументами при её вызове.

// nav.addEventListener('mouseover', function (e) {
//   handleHover(e, 0.5);
// });

// nav.addEventListener('mouseout', function (e) {
//   handleHover(e, 1);
// });

// Sticky navigation
const initialCoords = section1.getBoundingClientRect(); // координаты начала 1й секции
console.log(initialCoords);

window.addEventListener('scroll', function (e) {
  console.log(window.scrollY); // позиция до верха viewporta

  if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
  // если опускаемся ниже, чем верхние координаты 1й секции, то добавляем класс Sticky
  else nav.classList.remove('sticky');
});

// A Better Way: The Intersection Observer API
//  Intersection Observer API позволяет веб-приложениям асинхронно следить за изменением пересечения элемента с его родителем или областью видимости документа viewport.
//////////////////////////////
//////////////////////////////
//////////////////////////////

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
// const h1 = document.querySelector('h1');
// // Downwards (вниз):выбираем child
// console.log(h1.querySelectorAll('.highlight')); // NodeList(2) [span.highlight, span.highlight] Вне зависимости от глубины нахождения
// console.log(h1.childNodes); // полный список NodeList(9) [text, comment, text, span.highlight, text, br, text, span.highlight, text]
// console.log(h1.children); // HTMLCollection(3) [span.highlight, br, span.highlight]
// h1.firstElementChild.style.color = 'white';
// h1.lastElementChild.style.color = 'orange';

// // Upwards (вверх): выбираем parents
// console.log(h1.parentNode); // header__title
// console.log(h1.parentElement); // header__title

// h1.closest('.header').style.background = 'var(--gradient-secondary)';
// h1.closest('h1').style.background = 'var(--gradient-primary)';

// // Going sideways( прохождение по сторонам): siblings(братья и сёстры)
// console.log(h1.previousElementSibling); // Предыдущий эл. null   т.к. никого нет впереди
// console.log(h1.nextElementSibling); // Следующий эл.  h4

// // очень редкий случай . Полный список
// console.log(h1.previousSibling); //
// console.log(h1.nextSibling);

// // Частый случай. Полный список
// console.log(h1.parentElement.children); // HTMLCollection(4) [h1, h4, button.btn--text.btn--scroll-to, img.header__img]
// // трансформировали в массив с пом. SPREAD. Затем изменили все элементы, кроме самого заголовка H1 на 50%
// [...h1.parentElement.children].forEach(function (el) {
//   if (el !== h1) el.style.transform = 'scale(0.5)';
// });
