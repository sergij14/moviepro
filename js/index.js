import "regenerator-runtime/runtime";
import "core-js/stable";

//
// Author: Sergi. J
//

("use strict");

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
        <img class="movies__item__img" src="${imgPath + image}" />
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
};

const checkColor = function (vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote > 5) {
    return "orange";
  } else {
    return "red";
  }
};

////////////////////////////////////////////////////////
// Get Clicked Movie
////////////////////////////////////////////////////////

const clickCheck = function () {
  const moviesItem = document.querySelectorAll(".movies__item");
  moviesItem.forEach((item) =>
    item.addEventListener("click", function (event) {
      if (event.target.classList.contains("movies__item__img")) {
        const id = item.dataset.id;
        getClickedMovie(id);
      }
    })
  );
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
      `<a class="btn-home" href="./">Main Page</a>`
    );
  }
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
    </div>
    </div>
          `
  );
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
window.addEventListener("DOMContentLoaded", () => {
  getMovies(apiUrl);
});
