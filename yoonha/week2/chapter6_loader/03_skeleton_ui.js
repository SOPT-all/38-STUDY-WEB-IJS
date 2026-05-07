"use strict";

const SKELETON_DELAY = 1000 * 1;

const showSkeleton = ($elem) => ($elem.style.display = "block");
const hideSkeleton = ($elem) => ($elem.style.display = "none");

const initSkeleton = ($elem) => {
  const $skeleton = document.querySelector(".skeleton").cloneNode(true);
  showSkeleton($skeleton);
  $elem.appendChild($skeleton);
  setTimeout(() => {
    hideSkeleton($skeleton);
    $elem.classList.remove("hidden");
  }, SKELETON_DELAY);
};

document.addEventListener("DOMContentLoaded", () => {
  const $secondCard = document.querySelector(".card_list .card:nth-child(2)");
  if ($secondCard) initSkeleton($secondCard);
});
