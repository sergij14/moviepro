parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"QvaY":[function(require,module,exports) {
"use strict";function e(e,t,n,a,o,i,s){try{var r=e[i](s),c=r.value}catch(l){return void n(l)}r.done?t(c):Promise.resolve(c).then(a,o)}function t(t){return function(){var n=this,a=arguments;return new Promise(function(o,i){var s=t.apply(n,a);function r(t){e(s,o,i,r,c,"next",t)}function c(t){e(s,o,i,r,c,"throw",t)}r(void 0)})}}var n="https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=53d1126a0f1a18cf2551da1519c821af&page=1",a="https://image.tmdb.org/t/p/w500",o="https://api.themoviedb.org/3/search/movie?api_key=53d1126a0f1a18cf2551da1519c821af&query=",i="https://api.themoviedb.org/3/discover/movie?with_genres=18&sort_by=popularity.desc&api_key=53d1126a0f1a18cf2551da1519c821af&page=1",s="https://api.themoviedb.org/3/discover/movie?certification_country=US&certification=R&sort_by=revenue.desc&api_key=53d1126a0f1a18cf2551da1519c821af&page=1",r=document.querySelector(".nav"),c=document.querySelector(".nav__search__form"),l=document.querySelector(".nav__search__input"),_=document.querySelector("#pop-movies"),v=document.querySelector("#drama-movies"),u=document.querySelector("#high-gross-movies"),d=document.querySelector(".movies"),m=document.querySelector(".movies-title"),f=document.querySelector(".nav__search"),p=document.querySelector(".nav__search-btn button"),h=document.querySelector(".nav__search-btn button i"),g=document.querySelector(".nav__ham-btn button"),b=document.querySelector(".nav__ham-btn button i"),w=document.querySelector(".nav__menu"),L=document.querySelectorAll(".nav__menu a"),y=document.querySelector(".favorites__container"),S=document.querySelector(".favorites__btn button"),k=document.querySelector(".favorites__btn button i"),x=[],E=function(){f.classList.toggle("nav__search--show"),h.classList.toggle("fa-times"),S.classList.toggle("favorites__btn--passive")},q=function(){w.classList.toggle("nav__menu--show"),b.classList.toggle("fa-times"),S.classList.toggle("favorites__btn--passive")},M=function(e){!w.classList.contains("nav__menu--show")||g.contains(e.target)||e.target.closest(".nav__menu")?!f.classList.contains("nav__search--show")||p.contains(e.target)||l.contains(e.target)||e.target.closest(".nav__search")?!y.classList.contains("favorites__container--show")||S.contains(e.target)||e.target.closest(".favorites__container")||e.target.classList.contains("movies__item__fav")?y.classList.contains("fav-show")&&A():A():E():q()};p.addEventListener("click",E),g.addEventListener("click",q),w.classList.contains(".nav__menu--show")&&L.forEach(function(e){return e.addEventListener("click",q)}),document.addEventListener("click",M);var A=function(){y.classList.toggle("favorites__container--show"),k.classList.toggle("fa-times"),y.classList.remove("fav-show")};S.addEventListener("click",A);var C=function(){var e=t(regeneratorRuntime.mark(function e(t){var n,a,o;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch(t);case 3:return n=e.sent,e.next=6,n.json();case 6:if(a=e.sent,o=a.results,j(o),!(!o.length>0)){e.next=11;break}throw new Error("Nothing Found");case 11:e.next=17;break;case 13:e.prev=13,e.t0=e.catch(0),m.textContent=e.t0,d.insertAdjacentHTML("beforeend",'<a class="btn-home" href="./">Main Page</a>');case 17:case"end":return e.stop()}},e,null,[[0,13]])}));return function(t){return e.apply(this,arguments)}}(),j=function(e){d.innerHTML="",e.map(function(e){var t=e.poster_path,n=e.title,o=e.vote_average,i=e.release_date,s=e.id;null!==e.backdrop_path&&e.genre_ids!==[]&&""!==e.overview&&d.insertAdjacentHTML("beforeend",'\n        <div class="movies__item" data-id="'.concat(s,'">\n        <h6 class="movies__item__title">').concat(n,'</h6>\n         <div class="movies__item__img-container">\n         <img class="movies__item__img" src="').concat(a+t,'" />\n         <button class="movies__item__fav" data-id="').concat(s,'">\n         Add To Favorites\n         </button>\n         </div>\n        <div class="movies__item__details">\n        <span class="movies__item__date">').concat(i,'</span>\n        <span class="movies__item__vote" style="color:').concat(H(o),'">\n        ').concat(o,"\n        </span>\n\n        </div>\n        </div>\n         "))}),T(),P()},H=function(e){return e>=8?"green":e>5?"orange":"red"},R=function(){d.insertAdjacentHTML("beforeend",'<h6><i class="fas fa-spinner"></i></h6>')},T=function(){document.querySelectorAll(".movies__item").forEach(function(e){return e.addEventListener("click",function(t){var n=e.dataset.id;t.target.classList.contains("movies__item__img")&&(window.scroll(0,0),D(n))})}),document.querySelectorAll(".movies__item__fav").forEach(function(e){e.addEventListener("click",function(){var t=e.dataset.id.toString();e.textContent="In Favorites",e.setAttribute("disabled",!0),x.includes(t)||(x.push(t),O(t),F(x),y.scroll(0,0),y.classList.contains("fav-show")||y.classList.contains("favorites__container--show")||y.classList.toggle("fav-show"))})})},D=function(){var e=t(regeneratorRuntime.mark(function e(t){var n,a;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch("https://api.themoviedb.org/3/movie/".concat(t,"?api_key=53d1126a0f1a18cf2551da1519c821af"));case 3:return n=e.sent,e.next=6,n.json();case 6:a=e.sent,B(a),e.next=15;break;case 11:e.prev=11,e.t0=e.catch(0),m.textContent=e.t0,d.insertAdjacentHTML("beforeend",'<a class="btn-home" href="./">Main Page</a>');case 15:case"end":return e.stop()}},e,null,[[0,11]])}));return function(t){return e.apply(this,arguments)}}(),P=function(){document.querySelectorAll(".movies__item__fav").forEach(function(e){x.includes(e.dataset.id)?(e.textContent="In Favorites",e.setAttribute("disabled",!0)):(e.textContent="Add to Favorites",e.removeAttribute("disabled"))})},F=function(e){localStorage.setItem("favs",e)},I=function(){var e=localStorage.getItem("favs");e&&(x=e.split(",")).forEach(function(e){O(e)})},O=function(){var e=t(regeneratorRuntime.mark(function e(t){var n,a;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch("https://api.themoviedb.org/3/movie/".concat(t,"?api_key=53d1126a0f1a18cf2551da1519c821af"));case 3:return n=e.sent,e.next=6,n.json();case 6:a=e.sent,N(a),e.next=15;break;case 11:e.prev=11,e.t0=e.catch(0),m.textContent=e.t0,d.insertAdjacentHTML("beforeend",'<a class="btn-home" href="./">Main Page</a>');case 15:case"end":return e.stop()}},e,null,[[0,11]])}));return function(t){return e.apply(this,arguments)}}(),N=function(e){var t=e.poster_path,n=e.title,o=e.id;y.insertAdjacentHTML("afterbegin",'\n  <div class="favorites__item" data-id="'.concat(o,'">\n  <img class="favorites__item__img" src="').concat(a+t,'" />\n\n<div class="favorites__item__info">\n<p>\n<span class="favorites__item__title">').concat(n,'</span>\n\n<button class="favorites__item__remove-btn" data-id="').concat(o,'">Remove</button>\n</p>\n</div>\n\n  </div>\n  ')),V()},V=function(){document.querySelectorAll(".favorites__item").forEach(function(e){return e.addEventListener("click",function(t){var n=e.dataset.id;if(t.target.classList.contains("favorites__item__img")&&(D(n),window.scroll(0,0),y.classList.remove("favorites__container--show"),y.classList.remove("fav-show")),t.target.classList.contains("favorites__item__remove-btn")){var a=t.target,o=a.parentElement.parentElement.parentElement;n=n.toString(),x=x.filter(function(e){return e!==n}),F(x),setTimeout(function(){o.parentNode&&(y.removeChild(a.parentElement.parentElement.parentElement),y.firstElementChild||A())},0),P()}})})},B=function(e){var t=e.poster_path,n=e.title,o=e.vote_average,i=e.release_date,s=e.overview,r=e.runtime,c=e.imdb_id,l=e.genres;d.innerHTML="",m.textContent="Movie Details: "+n,d.insertAdjacentHTML("beforeend",'\n    <div class="movies__detail">\n    <div class="movies__detail__img">\n    <img src="'.concat(a+t,'" />\n    </div>\n    <div class="movies__detail__info">\n    <span class="movies__detail__genres mar-tb-05">').concat(function(e){return e.map(function(e){return e.name}).join(", ")}(l),'</span>\n    <span class="movies__detail__date">Release Date: <b>').concat(i,'</b></span>\n    <span class="movies__detail__vote mar-tb-05">Votes: <b><font style="color:').concat(H(o),'">').concat(o,'</font></b></span>\n    <span class="movies__detail__runtime">Rruntime: <b>').concat(r,'</b> Min</span>\n    <p class="movies__detail__plot mar-tb-1"><b>Overview:</b></b><br>').concat(s,'</p>\n\n    <a class="movies__detail__imdb-btn mar-tb-05" target="_blank" href="https://www.imdb.com/title/').concat(c,'/">View On IMDB</a>\n    \n    <p class="home-link mar-t-1">or <a href="./"><b>Return Home</b></a></p>\n\n    </div>\n    </div>\n          '))};r.addEventListener("click",function(e){e.target===_?(C(n),m.textContent="Popular Movies",window.scroll(0,0)):e.target===v?(e.preventDefault(),C(i),m.textContent="Drama Movies",window.scroll(0,0)):e.target===u&&(e.preventDefault(),C(s),m.textContent="High Grossing Movies",window.scroll(0,0))}),c.addEventListener("submit",function(e){var t=l.value;e.preventDefault(),""!==t?(C(o+t),m.textContent="Search: ".concat(t),l.blur(),E()):window.location.reload()}),R(),window.addEventListener("DOMContentLoaded",function(){C(n),I()});
},{}]},{},["QvaY"], null)
//# sourceMappingURL=/js.1ff7eb1f.js.map