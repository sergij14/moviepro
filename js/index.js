//
// Author: Sergi. J
//

"use strict";

import "regenerator-runtime/runtime";
import "core-js/stable";

////////////////////////////////////////////////////////
// Urls
////////////////////////////////////////////////////////
const popularMoviesUrl =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=53d1126a0f1a18cf2551da1519c821af&page=1";
const imgPath = "https://image.tmdb.org/t/p/w500";
const searchUrl =
  "https://api.themoviedb.org/3/search/movie?api_key=53d1126a0f1a18cf2551da1519c821af&query=";
const dramaMoviesUrl =
  "https://api.themoviedb.org/3/discover/movie?with_genres=18&sort_by=popularity.desc&api_key=53d1126a0f1a18cf2551da1519c821af&page=1";
const highGrossUrl =
  "https://api.themoviedb.org/3/discover/movie?certification_country=US&certification=R&sort_by=revenue.desc&api_key=53d1126a0f1a18cf2551da1519c821af&page=1";

////////////////////////////////////////////////////////
// Selecting Elements
////////////////////////////////////////////////////////
const nav = document.querySelector(".nav");

const searchForm = document.querySelector(".nav__search__form");
const searchInput = document.querySelector(".nav__search__input");

const popMovies = document.querySelector("#pop-movies");
const dramaMovies = document.querySelector("#drama-movies");
const highGrossMovies = document.querySelector("#high-gross-movies");

const logoLink = document.querySelector("#logo-link");

const favCount = document.querySelector(".favorites__count");

const moviesContainer = document.querySelector(".movies");
const moviesTitle = document.querySelector(".movies-title");

const search = document.querySelector(".nav__search");
const searchBtn = document.querySelector(".nav__search-btn button");
const searchBtnIcon = document.querySelector(".nav__search-btn button i");

const hamBtn = document.querySelector(".nav__ham-btn button");
const hamBtnIcon = document.querySelector(".nav__ham-btn button i");
const menu = document.querySelector(".nav__menu");
const menuLinks = document.querySelectorAll(".nav__menu a");

const favItemsContainer = document.querySelector(".favorites__container");

const favBtn = document.querySelector(".favorites__btn button");
const favBtnIcon = document.querySelector(".favorites__btn button i");

let favItems = [];

////////////////////////////////////////////////////////
// Navigation & Search Form
////////////////////////////////////////////////////////

const showSearch = function () {
  search.classList.toggle("nav__search--show");
  searchBtnIcon.classList.toggle("fa-times");
};

const showNav = function () {
  menu.classList.toggle("nav__menu--show");
  hamBtnIcon.classList.toggle("fa-times");
};

const outSideClick = function (event) {
  if (
    menu.classList.contains("nav__menu--show") &&
    !hamBtn.contains(event.target) &&
    !event.target.closest(".nav__menu")
  ) {
    showNav();
  } else if (
    search.classList.contains("nav__search--show") &&
    !searchBtn.contains(event.target) &&
    !searchInput.contains(event.target) &&
    !event.target.closest(".nav__search")
  ) {
    showSearch();
  } else if (
    favItemsContainer.classList.contains("favorites__container--show") &&
    !favBtn.contains(event.target) &&
    !event.target.closest(".favorites__container") &&
    !event.target.classList.contains("movies__item__fav")
  ) {
    showFav();
  }
};

searchBtn.addEventListener("click", showSearch);
hamBtn.addEventListener("click", showNav);

menuLinks.forEach((link) => link.addEventListener("click", showNav));

document.addEventListener("click", outSideClick);

////////////////////////////////////////////////////////
// Fav Items
////////////////////////////////////////////////////////

const showFav = function () {
  favItemsContainer.classList.toggle("favorites__container--show");
  favBtnIcon.classList.toggle("fa-times");
};

favBtn.addEventListener("click", showFav);

////////////////////////////////////////////////////////
// Getting Movies
////////////////////////////////////////////////////////

const getMovies = async function (url) {
  try {
    const resp = await fetch(url);
    const data = await resp.json();
    const movies = data.results;
    renderMovies(movies);
    if (!movies.length > 0) throw new Error("Nothing Found");
  } catch (error) {
    moviesTitle.textContent = error;
    moviesContainer.insertAdjacentHTML(
      "beforeend",
      `<a id="home" class="btn-home" href="#">Main Page</a>`
    );
    document.getElementById("home").addEventListener("click", function () {
      goHome();
    });
  }
};

////////////////////////////////////////////////////////
// Rendering Movies
////////////////////////////////////////////////////////

const renderMovies = function (movies) {
  moviesContainer.innerHTML = "";
  movies.map((movie) => {
    const image = movie.poster_path;
    const title = movie.title;
    const vote = movie.vote_average;
    const date = movie.release_date;
    const id = movie.id;

    if (
      movie.backdrop_path !== null &&
      movie.genre_ids !== [] &&
      movie.overview !== ""
    ) {
      moviesContainer.insertAdjacentHTML(
        "beforeend",
        `
        <div class="movies__item" data-id="${id}">
        <h6 class="movies__item__title">${title}</h6>
         <div class="movies__item__img-container">
         <img class="movies__item__img" src="${imgPath + image}" />
         <button class="movies__item__fav" data-id="${id}">
         Add To Favorites
         </button>
         </div>
        <div class="movies__item__details">
        <span class="movies__item__date">${date}</span>
        <span class="movies__item__vote" style="color:${checkColor(vote)}">
        ${vote}
        </span>

        </div>
        </div>
         `
      );
    }
  });
  clickCheck();
  btnCheck();
};

////////////////////////////////////////////////////////
// Helper Functions
////////////////////////////////////////////////////////

const checkColor = (vote) => {
  if (vote >= 8) {
    return "green";
  } else if (vote > 5) {
    return "orange";
  } else {
    return "red";
  }
};

const loadMsg = () => {
  moviesContainer.insertAdjacentHTML(
    "beforeend",
    `<h6><i class="fas fa-spinner"></i></h6>`
  );
};

const goHome = () => {
  event.preventDefault();
  getMovies(popularMoviesUrl);
  moviesTitle.textContent = "Popular Movies";
  window.scroll(0, 0);
};

////////////////////////////////////////////////////////
// Get Clicked Movie
////////////////////////////////////////////////////////

const clickCheck = function () {
  const moviesItem = document.querySelectorAll(".movies__item");
  moviesItem.forEach((item) =>
    item.addEventListener("click", function (event) {
      const id = item.dataset.id;
      if (event.target.classList.contains("movies__item__img")) {
        window.scroll(0, 0);
        getClickedMovie(id);
      }
    })
  );
  const btns = document.querySelectorAll(".movies__item__fav");
  btns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const id = btn.dataset.id.toString();
      btn.textContent = "In Favorites";
      btn.setAttribute("disabled", true);

      if (!favItems.includes(id)) {
        favItems.push(id);
        fetchFavItem(id);
        addToStorage(favItems);
        favCount.textContent = favItems.length;
        favItemsContainer.scroll(0, 0);

        if (document.getElementById("no-fav-msg")) {
          favItemsContainer.removeChild(document.getElementById("no-fav-msg"));
        }
      }
    });
  });
};

const getClickedMovie = async function (id) {
  try {
    const resp = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=53d1126a0f1a18cf2551da1519c821af`
    );
    const data = await resp.json();
    const movie = data;
    renderClickedMovie(movie);
  } catch (error) {
    moviesTitle.textContent = error;
    moviesContainer.insertAdjacentHTML(
      "beforeend",
      `<a class="btn-home" id="home" href="#">Main Page</a>`
    );
    document.getElementById("home").addEventListener("click", function (event) {
      goHome();
    });
  }
};

////////////////////////////////////////////////////////
// Add to Favorites
////////////////////////////////////////////////////////

const btnCheck = function () {
  const btns = document.querySelectorAll(".movies__item__fav");
  btns.forEach((btn) => {
    if (favItems.includes(btn.dataset.id)) {
      btn.textContent = "In Favorites";
      btn.setAttribute("disabled", true);
    } else {
      btn.textContent = "Add to Favorites";
      btn.removeAttribute("disabled");
    }
  });
};

const addToStorage = function (favItems) {
  localStorage.setItem("favs", favItems);
};

const getFavItems = function () {
  const favItemsLC = localStorage.getItem("favs");
  if (favItemsLC) {
    favItems = favItemsLC.split(",");
    favItems.forEach((item) => {
      fetchFavItem(item);
    });
    favCount.textContent = favItems.length;
  } else {
    favItemsContainer.insertAdjacentHTML(
      "afterbegin",
      `<h6 id="no-fav-msg" class="txt-center pad-tb-1">No Favorites</h6>`
    );
    favCount.textContent = "0";
  }
};

const fetchFavItem = async function (id) {
  try {
    const resp = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=53d1126a0f1a18cf2551da1519c821af`
    );
    const data = await resp.json();
    const movie = data;
    renderFavItem(movie);
  } catch (error) {
    moviesTitle.textContent = error;
    moviesContainer.insertAdjacentHTML(
      "beforeend",
      `<a id="home" class="btn-home" href="#">Main Page</a>`
    );
    document.getElementById("home").addEventListener("click", function (event) {
      goHome();
    });
  }
};

const renderFavItem = function (movie) {
  const image = movie.poster_path;
  const title = movie.title;
  const date = movie.release_date;
  const id = movie.id;
  favItemsContainer.insertAdjacentHTML(
    "afterbegin",
    `
  <div class="favorites__item" data-id="${id}">
  <img class="favorites__item__img" src="${imgPath + image}" />

<div class="favorites__item__info">
<p>
<span class="favorites__item__title">${title}</span>
<span class="favorites__item__date mar-tb-05">${date}</span>
<button class="favorites__item__remove-btn" data-id="${id}">Remove</button>
</p>
</div>

  </div>
  `
  );
  favClickCheck();
};

const favClickCheck = function () {
  const moviesItem = document.querySelectorAll(".favorites__item");
  moviesItem.forEach((item) =>
    item.addEventListener("click", function (event) {
      let id = item.dataset.id;
      if (event.target.classList.contains("favorites__item__img")) {
        getClickedMovie(id);
        window.scroll(0, 0);
        favItemsContainer.classList.remove("favorites__container--show");
      }
      if (event.target.classList.contains("favorites__item__remove-btn")) {
        const btn = event.target;
        const clickedItem = btn.parentElement.parentElement.parentElement;
        id = id.toString();
        favItems = favItems.filter((item) => item !== id);
        addToStorage(favItems);
        favCount.textContent = favItems.length;
        setTimeout(function () {
          if (clickedItem.parentNode) {
            favItemsContainer.removeChild(
              btn.parentElement.parentElement.parentElement
            );
            if (!favItemsContainer.firstElementChild) {
              showFav();
              favItemsContainer.insertAdjacentHTML(
                "afterbegin",
                `<h6 id="no-fav-msg" class="txt-center pad-tb-1">No Favorites</h6>`
              );
            }
          }
        }, 0);

        btnCheck();
      }
    })
  );
};

////////////////////////////////////////////////////////
// Render Clicked Movie
////////////////////////////////////////////////////////

const renderClickedMovie = function (movie) {
  const image = movie.poster_path;
  const title = movie.title;
  const vote = movie.vote_average;
  const date = movie.release_date;
  const plot = movie.overview;
  const runtime = movie.runtime;
  const imdbID = movie.imdb_id;
  const genres = movie.genres;

  const getGenres = function (genres) {
    const genreslist = genres.map((genre) => genre.name);
    return genreslist.join(", ");
  };

  moviesContainer.innerHTML = "";
  moviesTitle.textContent = "Movie Details: " + title;
  moviesContainer.insertAdjacentHTML(
    "beforeend",
    `
    <div class="movies__detail">
    <div class="movies__detail__img">
    <img src="${imgPath + image}" />
    </div>
    <div class="movies__detail__info">
    <span class="movies__detail__genres mar-tb-05">${getGenres(genres)}</span>
    <span class="movies__detail__date">Release Date: <b>${date}</b></span>
    <span class="movies__detail__vote mar-tb-05">Votes: <b><font style="color:${checkColor(
      vote
    )}">${vote}</font></b></span>
    <span class="movies__detail__runtime">Rruntime: <b>${runtime}</b> Min</span>
    <p class="movies__detail__plot mar-tb-1"><b>Overview:</b></b><br>${plot}</p>

    <a class="movies__detail__imdb-btn mar-tb-05" target="_blank" href="https://www.imdb.com/title/${imdbID}/">View On IMDB</a>
    
    <p class="home-link mar-t-1">or <a id="return-home" href="#"><b>Return Home</b></a></p>

    </div>
    </div>
          `
  );
  document.getElementById("return-home").addEventListener("click", function () {
    goHome();
  });
};

////////////////////////////////////////////////////////
// Movie Categories
////////////////////////////////////////////////////////

nav.addEventListener("click", function (event) {
  if (event.target === popMovies) {
    goHome();
  } else if (event.target === dramaMovies) {
    event.preventDefault();
    getMovies(dramaMoviesUrl);
    moviesTitle.textContent = "Drama Movies";
    window.scroll(0, 0);
  } else if (event.target === highGrossMovies) {
    event.preventDefault();
    getMovies(highGrossUrl);
    moviesTitle.textContent = "High Grossing Movies";
    window.scroll(0, 0);
  } else if (event.target === logoLink) {
    goHome();
  }
});

////////////////////////////////////////////////////////
// Searching Movies
////////////////////////////////////////////////////////

searchForm.addEventListener("submit", (event) => {
  const searchTerm = searchInput.value;
  event.preventDefault();
  if (searchTerm !== "") {
    window.scroll(0, 0);
    getMovies(searchUrl + searchTerm);
    moviesTitle.textContent = `Search: ${searchTerm}`;
    searchInput.blur();
    search.classList.remove("nav__search--show");
    searchBtnIcon.classList.remove("fa-times");
  } else {
    window.location.reload();
  }
});

////////////////////////////////////////////////////////
loadMsg();
window.addEventListener("DOMContentLoaded", () => {
  getMovies(popularMoviesUrl);
  getFavItems();
});
