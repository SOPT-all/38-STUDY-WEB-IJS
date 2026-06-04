import { scroll, transform } from "https://cdn.jsdelivr.net/npm/motion@11.13.5/+esm";

const heroSection = document.querySelector(".js-hero-section");
const heroSticky = document.querySelector(".js-hero-sticky");
// 사용자가 OS / browser에서 동작 줄이기 설정 켰는지 확인.
const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
let latestProgress = 0;

const motionValues = {
  // 0에서 1까지의 스크롤 진행률에 따라 오버레이의 투명도를 조절하는 transform 함수.
  overlayAlpha: transform(
    [0, 0.16, 0.38, 0.62, 0.82, 1],
    [0.82, 0.78, 0.56, 0.34, 0.16, 0.04]
  ),
  backgroundScale: transform([0, 1], [1, 1.03]),

  designOpacity: transform([0, 0.14, 0.26, 0.34], [1, 1, 0.32, 0]),
  designY: transform([0, 0.14, 0.42], [0, 0, 76]),
  designBlur: transform([0, 0.18, 0.34], [0, 0, 10]),

  buildOpacity: transform([0.2, 0.32, 0.5, 0.62], [0, 1, 1, 0]),
  buildY: transform([0.2, 0.34, 0.62], [52, 0, -20]),
  buildBlur: transform([0.2, 0.32, 0.5, 0.62], [10, 0, 0, 8]),

  impactOpacity: transform([0.54, 0.68, 0.9, 1], [0, 1, 1, 1]),
  impactScale: transform([0.54, 0.72, 0.9, 1], [0.8, 1, 1, 1]),
  impactY: transform([0.54, 0.72, 1], [40, 0, 0]),
  impactBlur: transform([0.54, 0.7, 0.9, 1], [12, 0, 0, 0]),
};

function setNumberProperty(name, value) {
  heroSticky.style.setProperty(name, value.toFixed(3));
}

function setPixelProperty(name, value) {
  heroSticky.style.setProperty(name, `${value.toFixed(2)}px`);
}

function applyProgress(progress) {
  latestProgress = progress;

  const shouldReduceMotion = reduceMotionQuery.matches;

  setNumberProperty("--overlay-alpha", motionValues.overlayAlpha(progress));
  setNumberProperty(
    "--bg-scale",
    shouldReduceMotion ? 1 : motionValues.backgroundScale(progress)
  );

  setNumberProperty("--design-opacity", motionValues.designOpacity(progress));
  setPixelProperty("--design-y", shouldReduceMotion ? 0 : motionValues.designY(progress));
  setPixelProperty("--design-blur", shouldReduceMotion ? 0 : motionValues.designBlur(progress));

  setNumberProperty("--build-opacity", motionValues.buildOpacity(progress));
  setPixelProperty("--build-y", shouldReduceMotion ? 0 : motionValues.buildY(progress));
  setPixelProperty("--build-blur", shouldReduceMotion ? 0 : motionValues.buildBlur(progress));

  setNumberProperty("--impact-opacity", motionValues.impactOpacity(progress));
  setNumberProperty("--impact-scale", shouldReduceMotion ? 1 : motionValues.impactScale(progress));
  setPixelProperty("--impact-y", shouldReduceMotion ? 0 : motionValues.impactY(progress));
  setPixelProperty("--impact-blur", shouldReduceMotion ? 0 : motionValues.impactBlur(progress));
}

if (heroSection && heroSticky) {
  applyProgress(0);

  scroll(applyProgress, {
    target: heroSection,
    offset: ["start start", "end end"],
  });

  reduceMotionQuery.addEventListener("change", () => applyProgress(latestProgress));
}
