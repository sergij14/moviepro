//
// Author: Sergi. J
//

"use strict";

import "regenerator-runtime/runtime";
import "core-js/stable";

////////////////////////////////////////////////////////
// API Urls
////////////////////////////////////////////////////////
const apiUrl =
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
const tenMovies = document.querySelector("#ten-movies");
const highGrossMovies = document.querySelector("#high-gross-movies");

const moviesContainer = document.querySelector(".movies");
const mainContainer = document.querySelector("main .container");
const moviesTitle = document.querySelector(".movies-title");

const search = document.querySelector(".nav__search");
const searchBtn = document.querySelector(".nav__search-btn");
const searchBtnIcon = document.querySelector(".nav__search-btn button i");

const hamBtn = document.querySelector(".nav__ham-btn");
const hamBtnIcon = document.querySelector(".nav__ham-btn button i");
const menu = document.querySelector(".nav__menu");
const menuLinks = document.querySelectorAll(".nav__menu a");

const footer = document.querySelector(".footer");

////////////////////////////////////////////////////////
// Navigation & Search Form
////////////////////////////////////////////////////////

const showSearch = function () {
  mainContainer.classList.toggle("container--moved-bottom");
  footer.classList.toggle("footer--moved-bottom");
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
  }
};

searchBtn.addEventListener("click", showSearch);
hamBtn.addEventListener("click", showNav);
menuLinks.forEach((link) => link.addEventListener("click", showNav));
document.addEventListener("click", outSideClick);

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
      `<a class="btn-home" href="./">Main Page</a>`
    );
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
    const plot = movie.overview;
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
  <div class="movies__item__img">
  <img src="${imgPath + image}" />
  <p class="movies__item__plot">${plot}</p>
  </div>
  <div class="movies__item__details">
  <span class="movies__item__date">${date}</span>
  <span class="movies__item__vote">${vote}</span>
  </div>
  </div>
   `
      );
    }
  });
};

////////////////////////////////////////////////////////
// Movie Categories
////////////////////////////////////////////////////////

nav.addEventListener("click", function (event) {
  if (event.target === popMovies) {
    getMovies(apiUrl);
    moviesTitle.textContent = "Popular Movies";
  } else if (event.target === dramaMovies) {
    event.preventDefault();
    getMovies(dramaMoviesUrl);
    moviesTitle.textContent = "Drama Movies";
  } else if (event.target === highGrossMovies) {
    event.preventDefault();
    getMovies(highGrossUrl);
    moviesTitle.textContent = "High Grossing Movies";
  }
});

////////////////////////////////////////////////////////
// Searching Movies
////////////////////////////////////////////////////////

searchForm.addEventListener("submit", (event) => {
  const searchTerm = searchInput.value;
  event.preventDefault();
  if (searchTerm !== "") {
    getMovies(searchUrl + searchTerm);
    moviesTitle.textContent = `Search: ${searchTerm}`;
    searchInput.blur();
  } else {
    window.location.reload();
  }
});

////////////////////////////////////////////////////////
window.addEventListener("DOMContentLoaded", () => getMovies(apiUrl));
