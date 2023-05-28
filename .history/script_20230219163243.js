'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

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

// LECT Selecting, Creating, and Deleting Elements

// Selecting
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
console.log(allSections);

document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button');
console.log(allButtons);

console.log(document.getElementsByClassName('btn'));

// Creating and inserting elements
// .insertAdjacentHTML
const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent =
//   'Мы используем куки для улучшения функциональности и аналитики.';
message.innerHTML =
  'Мы используем куки для улучшения функциональности и аналитики. <button class = "btn btn--close-cookie"> Got it! </button>';
// header.prepend(message);
header.append(message);
// header.append(message.cloneNode(true)); // если нужно продублировать

// header.before(message);
// header.after(message);

// Delete elements
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove(); // относительно новый метод
    // message.parentElement.removeChild(message); // аналогичное удаление
  });

// LECT Styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

console.log(message.style.height);
console.log(message.style.backgroundColor);

console.log(getComputedStyle(message).alignItems);
console.log(getComputedStyle(message).height);
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px'; //parseFloat разбирает текстовую строку, ищет и возвращает из неё десятичное число

console.log(getComputedStyle(message).height);

document.documentElement.style.setProperty('--color-primary', 'orangered'); // Устанавливаем новое свойство (меняем цвет). (имя, свойство)

// АТРИБУТЫ (src, alt, class, id, href,... )
const logo = document.querySelector('.nav__logo');
console.log(logo.alt); // Bankist logo

console.log(logo.className); // nav__logo

logo.alt = 'Beatiful minimalist logo';

// Нестандартные атрибуты, поэтому нужно через getAttribute
console.log(logo.designer); // undefined
console.log(logo.getAttribute('designer')); // Jonas
console.log(logo.hasAttribute('designer')); // true
logo.setAttribute('company', 'Bankist'); // устанавливаем новый атрибут

console.log(logo.src); // http://127.0.0.1:5500/img/logo.png
console.log(logo.getAttribute('src')); // img/logo.png

const link = document.querySelector('.twitter-link');
console.log(link.href);
console.log(link.getAttribute('href'));
