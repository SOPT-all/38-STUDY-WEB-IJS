'use strict';

const themes = {
  flower: {
    background: '#eef6f4',
    highlight: '#2d8f73',
    text: '#17201c',
  },
  material: {
    background: '#edf0e4',
    highlight: '#7f6846',
    text: '#1e2119',
  },
  heart: {
    background: '#f7ecef',
    highlight: '#ca536d',
    text: '#2a181d',
  },
  banana: {
    background: '#fff4c4',
    highlight: '#c69014',
    text: '#30260c',
  },
  orange: {
    background: '#fff0e3',
    highlight: '#e05d2f',
    text: '#2f1810',
  },
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const applyTheme = (themeName) => {
  const theme = themes[themeName];
  if (!theme) return;

  const rootStyle = document.documentElement.style;
  rootStyle.setProperty('--color-background', theme.background);
  rootStyle.setProperty('--color-highlight', theme.highlight);
  rootStyle.setProperty('--color-text', theme.text);
  rootStyle.setProperty('--color-link', theme.text);

  $$('[data-theme-link]').forEach(($link) => {
    $link.classList.toggle('active', $link.dataset.themeLink === themeName);
  });
};

const pageState = new Proxy(
  {
    currentTheme: '',
    isScrollingByScript: false,
  },
  {
    set(target, property, value) {
      target[property] = value;

      if (property === 'currentTheme') {
        applyTheme(value);
        $('.js-back-top').classList.toggle('active', value !== 'flower');
      }

      return true;
    },
  },
);

const moveToSection = (themeName, shouldPushState = true) => {
  const $section = $(`[data-theme="${themeName}"]`);
  if (!$section) return;

  pageState.isScrollingByScript = true;
  $section.scrollIntoView({ block: 'start', behavior: 'smooth' });
  pageState.currentTheme = themeName;

  if (shouldPushState) {
    history.pushState({ themeName }, '', `#${themeName}`);
  }

  window.setTimeout(() => {
    pageState.isScrollingByScript = false;
  }, 550);
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle('is-visible', entry.isIntersecting);

      if (!entry.isIntersecting || entry.intersectionRatio < 0.55 || pageState.isScrollingByScript) return;

      const themeName = entry.target.dataset.theme;
      pageState.currentTheme = themeName;
      history.replaceState({ themeName }, '', `#${themeName}`);
    });
  },
  {
    threshold: [0.2, 0.55, 0.8],
  },
);

document.addEventListener('DOMContentLoaded', () => {
  $$('.panel').forEach(($panel) => observer.observe($panel));

  $$('[data-theme-link]').forEach(($link) => {
    $link.addEventListener('click', (event) => {
      event.preventDefault();
      moveToSection($link.dataset.themeLink);
    });
  });

  $('.js-back-top').addEventListener('click', () => {
    moveToSection('flower');
  });

  const initialTheme = location.hash.replace('#', '') || 'flower';
  moveToSection(themes[initialTheme] ? initialTheme : 'flower', false);
});

window.addEventListener('popstate', (event) => {
  const themeName = event.state?.themeName || location.hash.replace('#', '') || 'flower';
  moveToSection(themes[themeName] ? themeName : 'flower', false);
});

window.addEventListener('hashchange', () => {
  const themeName = location.hash.replace('#', '');
  if (themes[themeName]) {
    pageState.currentTheme = themeName;
  }
});
