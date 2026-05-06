'use strict';

const DELAY = 1000 * 1.5;

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

const initSVGLoader = ($elem, idx) => {
  // const $svgLoader = document.querySelector('.svg_loader').cloneNode(true);
  const $svgLoader = document.querySelector('.svg_loader2').cloneNode(true);
  show($svgLoader);
  $elem.appendChild($svgLoader);
  showItems($elem, $svgLoader, idx);
};

document.addEventListener('DOMContentLoaded', () => {
  [...document.querySelectorAll('.card_list .card')].forEach(($element, index) => initSVGLoader($element, index));
});