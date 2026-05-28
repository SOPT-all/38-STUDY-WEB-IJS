import { get$, getAll$ } from "../../js/utils.js";
import { summary, communityPosts, workouts } from "../../js/data.js";

const setTheme = (theme = "light") => {
  document.documentElement.setAttribute("class", theme);
};

const themeChangeHandler = (event) => {
  const theme = document.documentElement.classList.contains("dark")
    ? "light"
    : "dark";
  const $theme = event.target
    .closest("button")
    .querySelector(`[data-theme="${theme}"]`);
  if ($theme) {
    setTheme($theme.dataset.theme);
  }
};

const setViewType = (viewType = "thumbnail") => {
  get$(".js-viewChange .active")?.classList.remove("active");
  get$(`.js-viewChange [data-type="${viewType}"]`)?.classList.add("active");
  get$(".js-viewType").dataset.type = viewType;
};

const viewChangeHandler = (event) => {
  const $target = event.target.closest("button");
  if (!$target || $target.classList.contains("active")) {
    return;
  }
  setViewType($target.dataset.type);
};

const toggleFavorite = (event) => {
  if (!event.target.closest("button")) {
    return;
  }
  event.target.closest(".list").classList.toggle("active");
};

const getActiveFavorite = ([...$favorites]) => {
  const result = $favorites.map(($element) =>
    $element.classList.contains("active")
  );
  return JSON.stringify(result);
};
const setActiveFavorite = ([...favorites]) => {
  if (favorites.length <= 0) {
    return;
  }
  [...getAll$(".js-favorite .list")].forEach((list, index) => {
    list.classList.toggle("active", favorites[index]);
  });
};

const setSearch = (search) => {
  const searchKeyword = new URLSearchParams(search).get("searchWords");
  if (!searchKeyword) return;
  get$("#search").value = searchKeyword;
  [...getAll$(".js-viewContainer .list")].forEach(($element) => {
    if ($element.querySelector(".title").textContent.includes(searchKeyword)) {
      $element.style.display = "block";
    } else {
      $element.style.display = "none";
    }
  });
};

const openCommunity = () => {
  get$(".js-community").classList.add("active");
};

const closeCommunity = () => {
  get$(".js-community").classList.remove("active");
};

/* ---------- 렌더링: <template>을 복제해 data.js 데이터로 채움 ---------- */

const renderSummary = () => {
  const tpl = get$("#tpl-summary");
  const list = get$(".progress");
  summary.forEach(({ count, label }) => {
    const item = tpl.content.cloneNode(true);
    item.querySelector(".count").textContent = count;
    item.querySelector(".text").textContent = label;
    list.append(item);
  });
};

const renderCommunity = () => {
  const tpl = get$("#tpl-community");
  const list = get$(".js-favorite");
  communityPosts.forEach(({ image, name, text, date }) => {
    const item = tpl.content.cloneNode(true);
    item.querySelector("img").src = `../../img/${image}`;
    item.querySelector(".name").textContent = name;
    item.querySelector(".text").textContent = text;
    item.querySelector(".date").textContent = date;
    list.append(item);
  });
};

const renderWorkouts = () => {
  const tpl = get$("#tpl-workout");
  const list = get$(".js-viewContainer");
  workouts.forEach(({ date, title, subTitle, progress }) => {
    const item = tpl.content.cloneNode(true);
    item.querySelector(".date").textContent = date;
    item.querySelector(".title").textContent = title;
    item.querySelector(".sub_title").textContent = subTitle;
    item.querySelector("progress").value = progress;
    item.querySelector(".percent").textContent = `${progress}%`;
    list.append(item);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  renderSummary();
  renderCommunity();
  renderWorkouts();

  setViewType(localStorage.getItem("viewType") ?? "list");
  setTheme(localStorage.getItem("theme") ?? "light");
  setActiveFavorite(JSON.parse(localStorage.getItem("favorites")) ?? []);
  setSearch(window.location.search);
  get$("body").style.visibility = "visible";

  get$(".js-theme").addEventListener("click", themeChangeHandler);
  get$(".js-viewChange").addEventListener("click", viewChangeHandler);
  get$(".js-openCommunity").addEventListener("click", openCommunity);
  get$(".js-closeCommunity").addEventListener("click", closeCommunity);
  get$(".js-favorite").addEventListener("click", toggleFavorite);
  getAll$(".js-notWorking").forEach(($element) =>
    $element.addEventListener("click", notWorking)
  );
});

window.addEventListener("beforeunload", () => {
  localStorage.setItem("viewType", get$(".js-viewType").dataset.type);
  localStorage.setItem("theme", document.documentElement.getAttribute("class"));
  localStorage.setItem(
    "favorites",
    getActiveFavorite([...getAll$(".js-favorite .list")])
  );
});
