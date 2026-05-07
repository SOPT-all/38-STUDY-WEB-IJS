"use strict";

const SPINNER_DELAY = 1000 * 1;

const showSpinner = ($elem) => ($elem.style.display = "block");
const hideSpinner = ($elem) => ($elem.style.display = "none");

const initSpinner = ($elem) => {
  const $spinner = document.querySelector(".spinner").cloneNode();
  showSpinner($spinner);
  $elem.appendChild($spinner);
  setTimeout(() => {
    hideSpinner($spinner);
    $elem.classList.remove("hidden");
  }, SPINNER_DELAY);
};

document.addEventListener("DOMContentLoaded", () => {
  const $firstCard = document.querySelector(".card_list .card:nth-child(1)");
  if ($firstCard) initSpinner($firstCard);
});
