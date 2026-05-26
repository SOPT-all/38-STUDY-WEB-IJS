'use strict';

const DELAY = 1000 * 1;

const show = ($elem) => ($elem.style.display = 'block');
const hide = ($elem) => ($elem.style.display = 'none');
const showItems = ($elem, $loader, idx) => {
  setTimeout(
    () => {
      hide($loader);
      $elem.classList.remove('hidden');
    },
    DELAY * (idx + 1),
  );
};

const initSkeleton = ($elem, idx) => {
  const $skeleton = document.querySelector('.skeleton').cloneNode(true);
  show($skeleton);
  $elem.appendChild($skeleton);
  showItems($elem, $skeleton, idx);
};

document.addEventListener('DOMContentLoaded', () => {
  [...document.querySelectorAll('.card_list .card')].forEach(($element, index) => initSkeleton($element, index));
});