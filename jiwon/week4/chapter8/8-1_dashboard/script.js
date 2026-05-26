'use strict';

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const STORAGE_KEY = 'week4-dashboard-state';

const state = {
  theme: 'light',
  viewType: 'list',
  searchWords: '',
};

const saveState = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

const loadState = () => {
  const savedState = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  Object.assign(state, savedState);
};

const setTheme = (theme) => {
  state.theme = theme;
  document.documentElement.classList.toggle('dark', theme === 'dark');
  $('.js-theme').textContent = theme === 'dark' ? 'Light' : 'Dark';
  $('.js-theme').setAttribute('aria-pressed', theme === 'dark');
};

const setView = (viewType) => {
  state.viewType = viewType;
  $('.js-view-container').dataset.type = viewType;
  $$('.js-view').forEach(($button) => {
    $button.setAttribute('aria-pressed', $button.dataset.view === viewType);
  });
};

const setSearch = (searchWords) => {
  state.searchWords = searchWords.trim();
  $('#search').value = state.searchWords;
  const normalized = state.searchWords.toLowerCase();

  $$('.workout_list .list').forEach(($item) => {
    const targetText = $item.dataset.keyword.toLowerCase();
    $item.hidden = normalized ? !targetText.includes(normalized) : false;
  });
};

const openCommunity = () => {
  $('.js-community').classList.add('active');
};

const closeCommunity = () => {
  $('.js-community').classList.remove('active');
};

document.addEventListener('DOMContentLoaded', () => {
  loadState();
  setTheme(state.theme);
  setView(state.viewType);
  setSearch(new URLSearchParams(location.search).get('searchWords') || state.searchWords);

  $('.js-theme').addEventListener('click', () => {
    setTheme(state.theme === 'dark' ? 'light' : 'dark');
    saveState();
  });

  $$('.js-view').forEach(($button) => {
    $button.addEventListener('click', () => {
      setView($button.dataset.view);
      saveState();
    });
  });

  $('#search').addEventListener('input', (event) => {
    setSearch(event.target.value);
    saveState();
  });

  $('.js-open-menu').addEventListener('click', () => {
    $('.js-sidebar').classList.toggle('active');
  });

  $('.js-open-community').addEventListener('click', openCommunity);
  $('.js-close-community').addEventListener('click', closeCommunity);
});

window.addEventListener('pagehide', saveState);
