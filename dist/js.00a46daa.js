// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/index.js":[function(require,module,exports) {
//
// Author: Sergi. J
//
"use strict"; // import "regenerator-runtime/runtime";
// import "core-js/stable";
////////////////////////////////////////////////////////
// API Urls
////////////////////////////////////////////////////////

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var apiUrl = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=53d1126a0f1a18cf2551da1519c821af&page=1";
var imgPath = "https://image.tmdb.org/t/p/w500";
var searchUrl = "https://api.themoviedb.org/3/search/movie?api_key=53d1126a0f1a18cf2551da1519c821af&query=";
var dramaMoviesUrl = "https://api.themoviedb.org/3/discover/movie?with_genres=18&sort_by=popularity.desc&api_key=53d1126a0f1a18cf2551da1519c821af&page=1";
var highGrossUrl = "https://api.themoviedb.org/3/discover/movie?certification_country=US&certification=R&sort_by=revenue.desc&api_key=53d1126a0f1a18cf2551da1519c821af&page=1"; ////////////////////////////////////////////////////////
// Selecting Elements
////////////////////////////////////////////////////////

var nav = document.querySelector(".nav");
var searchForm = document.querySelector(".nav__search__form");
var searchInput = document.querySelector(".nav__search__input");
var popMovies = document.querySelector("#pop-movies");
var dramaMovies = document.querySelector("#drama-movies");
var highGrossMovies = document.querySelector("#high-gross-movies");
var moviesContainer = document.querySelector(".movies");
var moviesTitle = document.querySelector(".movies-title");
var search = document.querySelector(".nav__search");
var searchBtn = document.querySelector(".nav__search-btn button");
var searchBtnIcon = document.querySelector(".nav__search-btn button i");
var hamBtn = document.querySelector(".nav__ham-btn button");
var hamBtnIcon = document.querySelector(".nav__ham-btn button i");
var menu = document.querySelector(".nav__menu");
var menuLinks = document.querySelectorAll(".nav__menu a");
var favItemsContainer = document.querySelector(".favorites__container");
var favBtn = document.querySelector(".favorites__btn button");
var favBtnIcon = document.querySelector(".favorites__btn button i");
var favItems = []; ////////////////////////////////////////////////////////
// Navigation & Search Form
////////////////////////////////////////////////////////

var showSearch = function showSearch() {
  search.classList.toggle("nav__search--show");
  searchBtnIcon.classList.toggle("fa-times");
  favBtn.classList.toggle("favorites__btn--passive");
};

var showNav = function showNav() {
  menu.classList.toggle("nav__menu--show");
  hamBtnIcon.classList.toggle("fa-times");
  favBtn.classList.toggle("favorites__btn--passive");
};

var outSideClick = function outSideClick(event) {
  if (menu.classList.contains("nav__menu--show") && !hamBtn.contains(event.target) && !event.target.closest(".nav__menu")) {
    showNav();
  } else if (search.classList.contains("nav__search--show") && !searchBtn.contains(event.target) && !searchInput.contains(event.target) && !event.target.closest(".nav__search")) {
    showSearch();
  } else if (favItemsContainer.classList.contains("favorites__container--show") && !favBtn.contains(event.target) && !event.target.closest(".favorites__container") && !event.target.classList.contains("movies__item__fav")) {
    showFav();
  } else if (favItemsContainer.classList.contains("fav-show")) {
    showFav();
  }
};

searchBtn.addEventListener("click", showSearch);
hamBtn.addEventListener("click", showNav);
if (menu.classList.contains(".nav__menu--show")) menuLinks.forEach(function (link) {
  return link.addEventListener("click", showNav);
});
document.addEventListener("click", outSideClick); ////////////////////////////////////////////////////////
// Fav Items
////////////////////////////////////////////////////////

var showFav = function showFav() {
  favItemsContainer.classList.toggle("favorites__container--show");
  favBtnIcon.classList.toggle("fa-times");
  favItemsContainer.classList.remove("fav-show");
};

favBtn.addEventListener("click", showFav); ////////////////////////////////////////////////////////
// Getting Movies
////////////////////////////////////////////////////////

var getMovies = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url) {
    var resp, data, movies;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return fetch(url);

          case 3:
            resp = _context.sent;
            _context.next = 6;
            return resp.json();

          case 6:
            data = _context.sent;
            movies = data.results;
            renderMovies(movies);

            if (!(!movies.length > 0)) {
              _context.next = 11;
              break;
            }

            throw new Error("Nothing Found");

          case 11:
            _context.next = 17;
            break;

          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](0);
            moviesTitle.textContent = _context.t0;
            moviesContainer.insertAdjacentHTML("beforeend", "<a class=\"btn-home\" href=\"./\">Main Page</a>");

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 13]]);
  }));

  return function getMovies(_x) {
    return _ref.apply(this, arguments);
  };
}(); ////////////////////////////////////////////////////////
// Rendering Movies
////////////////////////////////////////////////////////


var renderMovies = function renderMovies(movies) {
  moviesContainer.innerHTML = "";
  movies.map(function (movie) {
    var image = movie.poster_path;
    var title = movie.title;
    var vote = movie.vote_average;
    var date = movie.release_date;
    var id = movie.id;

    if (movie.backdrop_path !== null && movie.genre_ids !== [] && movie.overview !== "") {
      moviesContainer.insertAdjacentHTML("beforeend", "\n        <div class=\"movies__item\" data-id=\"".concat(id, "\">\n        <h6 class=\"movies__item__title\">").concat(title, "</h6>\n         <div class=\"movies__item__img-container\">\n         <img class=\"movies__item__img\" src=\"").concat(imgPath + image, "\" />\n         <button class=\"movies__item__fav\" data-id=\"").concat(id, "\">\n         Add To Favorites\n         </button>\n         </div>\n        <div class=\"movies__item__details\">\n        <span class=\"movies__item__date\">").concat(date, "</span>\n        <span class=\"movies__item__vote\" style=\"color:").concat(checkColor(vote), "\">\n        ").concat(vote, "\n        </span>\n\n        </div>\n        </div>\n         "));
    }
  });
  clickCheck();
  btnCheck();
}; ////////////////////////////////////////////////////////
// Helper Functions
////////////////////////////////////////////////////////


var checkColor = function checkColor(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote > 5) {
    return "orange";
  } else {
    return "red";
  }
};

var loadMsg = function loadMsg() {
  moviesContainer.insertAdjacentHTML("beforeend", "<h6><i class=\"fas fa-spinner\"></i></h6>");
}; ////////////////////////////////////////////////////////
// Get Clicked Movie
////////////////////////////////////////////////////////


var clickCheck = function clickCheck() {
  var moviesItem = document.querySelectorAll(".movies__item");
  moviesItem.forEach(function (item) {
    return item.addEventListener("click", function (event) {
      var id = item.dataset.id;

      if (event.target.classList.contains("movies__item__img")) {
        window.scroll(0, 0);
        getClickedMovie(id);
      }
    });
  });
  var btns = document.querySelectorAll(".movies__item__fav");
  btns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var id = btn.dataset.id.toString();
      btn.textContent = "In Favorites";
      btn.setAttribute("disabled", true);

      if (!favItems.includes(id)) {
        favItems.push(id);
        fetchFavItem(id);
        addToStorage(favItems);
        favItemsContainer.scroll(0, 0);

        if (!favItemsContainer.classList.contains("fav-show") && !favItemsContainer.classList.contains("favorites__container--show")) {
          favItemsContainer.classList.toggle("fav-show");
        }
      }
    });
  });
};

var getClickedMovie = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(id) {
    var resp, data, movie;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return fetch("https://api.themoviedb.org/3/movie/".concat(id, "?api_key=53d1126a0f1a18cf2551da1519c821af"));

          case 3:
            resp = _context2.sent;
            _context2.next = 6;
            return resp.json();

          case 6:
            data = _context2.sent;
            movie = data;
            renderClickedMovie(movie);
            _context2.next = 15;
            break;

          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2["catch"](0);
            moviesTitle.textContent = _context2.t0;
            moviesContainer.insertAdjacentHTML("beforeend", "<a class=\"btn-home\" href=\"./\">Main Page</a>");

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 11]]);
  }));

  return function getClickedMovie(_x2) {
    return _ref2.apply(this, arguments);
  };
}(); ////////////////////////////////////////////////////////
// Add to Favorites
////////////////////////////////////////////////////////


var btnCheck = function btnCheck() {
  var btns = document.querySelectorAll(".movies__item__fav");
  btns.forEach(function (btn) {
    if (favItems.includes(btn.dataset.id)) {
      btn.textContent = "In Favorites";
      btn.setAttribute("disabled", true);
    } else {
      btn.textContent = "Add to Favorites";
      btn.removeAttribute("disabled");
    }
  });
};

var addToStorage = function addToStorage(favItems) {
  localStorage.setItem("favs", favItems);
};

var getFavItems = function getFavItems() {
  var favItemsLC = localStorage.getItem("favs");

  if (favItemsLC) {
    favItems = favItemsLC.split(",");
    favItems.forEach(function (item) {
      fetchFavItem(item);
    });
  }
};

var fetchFavItem = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(id) {
    var resp, data, movie;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return fetch("https://api.themoviedb.org/3/movie/".concat(id, "?api_key=53d1126a0f1a18cf2551da1519c821af"));

          case 3:
            resp = _context3.sent;
            _context3.next = 6;
            return resp.json();

          case 6:
            data = _context3.sent;
            movie = data;
            renderFavItem(movie);
            _context3.next = 15;
            break;

          case 11:
            _context3.prev = 11;
            _context3.t0 = _context3["catch"](0);
            moviesTitle.textContent = _context3.t0;
            moviesContainer.insertAdjacentHTML("beforeend", "<a class=\"btn-home\" href=\"./\">Main Page</a>");

          case 15:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 11]]);
  }));

  return function fetchFavItem(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

var renderFavItem = function renderFavItem(movie) {
  var image = movie.poster_path;
  var title = movie.title;
  var id = movie.id;
  favItemsContainer.insertAdjacentHTML("afterbegin", "\n  <div class=\"favorites__item\" data-id=\"".concat(id, "\">\n  <img class=\"favorites__item__img\" src=\"").concat(imgPath + image, "\" />\n\n<div class=\"favorites__item__info\">\n<p>\n<span class=\"favorites__item__title\">").concat(title, "</span>\n\n<button class=\"favorites__item__remove-btn\" data-id=\"").concat(id, "\">Remove</button>\n</p>\n</div>\n\n  </div>\n  "));
  favClickCheck();
};

var favClickCheck = function favClickCheck() {
  var moviesItem = document.querySelectorAll(".favorites__item");
  moviesItem.forEach(function (item) {
    return item.addEventListener("click", function (event) {
      var id = item.dataset.id;

      if (event.target.classList.contains("favorites__item__img")) {
        getClickedMovie(id);
        window.scroll(0, 0);
        favItemsContainer.classList.remove("favorites__container--show");
        favItemsContainer.classList.remove("fav-show");
      }

      if (event.target.classList.contains("favorites__item__remove-btn")) {
        var btn = event.target;
        var clickedItem = btn.parentElement.parentElement.parentElement;
        id = id.toString();
        favItems = favItems.filter(function (item) {
          return item !== id;
        });
        addToStorage(favItems);
        setTimeout(function () {
          if (clickedItem.parentNode) {
            favItemsContainer.removeChild(btn.parentElement.parentElement.parentElement);

            if (!favItemsContainer.firstElementChild) {
              showFav();
            }
          }
        }, 0);
        btnCheck();
      }
    });
  });
}; ////////////////////////////////////////////////////////
// Render Clicked Movie
////////////////////////////////////////////////////////


var renderClickedMovie = function renderClickedMovie(movie) {
  var image = movie.poster_path;
  var title = movie.title;
  var vote = movie.vote_average;
  var date = movie.release_date;
  var plot = movie.overview;
  var runtime = movie.runtime;
  var imdbID = movie.imdb_id;
  var genres = movie.genres;

  var getGenres = function getGenres(genres) {
    var genreslist = genres.map(function (genre) {
      return genre.name;
    });
    return genreslist.join(", ");
  };

  moviesContainer.innerHTML = "";
  moviesTitle.textContent = "Movie Details: " + title;
  moviesContainer.insertAdjacentHTML("beforeend", "\n    <div class=\"movies__detail\">\n    <div class=\"movies__detail__img\">\n    <img src=\"".concat(imgPath + image, "\" />\n    </div>\n    <div class=\"movies__detail__info\">\n    <span class=\"movies__detail__genres mar-tb-05\">").concat(getGenres(genres), "</span>\n    <span class=\"movies__detail__date\">Release Date: <b>").concat(date, "</b></span>\n    <span class=\"movies__detail__vote mar-tb-05\">Votes: <b><font style=\"color:").concat(checkColor(vote), "\">").concat(vote, "</font></b></span>\n    <span class=\"movies__detail__runtime\">Rruntime: <b>").concat(runtime, "</b> Min</span>\n    <p class=\"movies__detail__plot mar-tb-1\"><b>Overview:</b></b><br>").concat(plot, "</p>\n\n    <a class=\"movies__detail__imdb-btn mar-tb-05\" target=\"_blank\" href=\"https://www.imdb.com/title/").concat(imdbID, "/\">View On IMDB</a>\n    \n    <p class=\"home-link mar-t-1\">or <a href=\"./\"><b>Return Home</b></a></p>\n\n    </div>\n    </div>\n          "));
}; ////////////////////////////////////////////////////////
// Movie Categories
////////////////////////////////////////////////////////


nav.addEventListener("click", function (event) {
  if (event.target === popMovies) {
    getMovies(apiUrl);
    moviesTitle.textContent = "Popular Movies";
    window.scroll(0, 0);
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
  }
}); ////////////////////////////////////////////////////////
// Searching Movies
////////////////////////////////////////////////////////

searchForm.addEventListener("submit", function (event) {
  var searchTerm = searchInput.value;
  event.preventDefault();

  if (searchTerm !== "") {
    getMovies(searchUrl + searchTerm);
    moviesTitle.textContent = "Search: ".concat(searchTerm);
    searchInput.blur();
    showSearch();
  } else {
    window.location.reload();
  }
}); ////////////////////////////////////////////////////////

loadMsg();
window.addEventListener("DOMContentLoaded", function () {
  getMovies(apiUrl);
  getFavItems();
});
},{}],"node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "59585" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel/src/builtins/hmr-runtime.js","js/index.js"], null)
//# sourceMappingURL=/js.00a46daa.js.map