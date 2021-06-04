const suggEndpoint = "https://api.giphy.com/v1/tags/related/";

import paths from "./services/paths.js";
import api from "./services/services.js";

let SEARCH_LIMIT = 12;
let searchOffset = 0;
let SUGGS_LIMIT = 4;
let gifosCount = 0;

const inputSearch = document.querySelector(".input-search");
const btnSearch = document.querySelector(".searchButton");
const btnSearchLeft = document.querySelector(".searchButtonLeft");
const btnClose = document.querySelector(".XButton");
const autocompleteList = document.querySelector(".autocomSearch");

let searchedGIFS = document.getElementsByClassName("searchedGIFS");

const handleToSearch = () => {
  api
    .getSearch(inputSearch.value, SEARCH_LIMIT, searchOffset)
    .then((response) => {
      gifosCount += SEARCH_LIMIT;
      console.log(response);
      searchOffset = searchOffset + SEARCH_LIMIT;
    })
    .catch((error) => {
      console.warn(error);
    });
};

const giveSuggs = async (searchText) => {
  autocompleteList.classList.remove("dispnone");
  inputSearch.classList.add("hideborder");
  btnSearch.classList.add("hideX");
  btnClose.classList.remove("hideX");
  btnSearchLeft.classList.remove("hideX");

  const res = await fetch(
    `${suggEndpoint}${searchText}?api_key=${paths.API_KEY}&limit=${SUGGS_LIMIT}`
  );
  const suggs = await res.json();

  if (searchText.length === 0) {
    suggs.data = [];
    autocompleteList.innerHTML = "";
    autocompleteList.classList.add("dispnone");
    inputSearch.classList.remove("hideborder");
    btnSearch.classList.remove("hideX");
    btnClose.classList.add("hideX");
    btnSearchLeft.classList.add("hideX");
  }

  paintSuggsHTML(suggs.data);
};

const completeInput = (link) => {
  inputSearch.value = link.getAttribute("value");
};

const paintSuggsHTML = async (suggestions) => {
  if (suggestions.length > 0) {
    const html = suggestions
      .map(
        (match) =>
          `<hr /><a class="suggLink" href="#"
          onclick="completeInput(this)" value="${match.name}"><li><i class="fas fa-search"></i>${match.name}</li></a>`
      )
      .join("");
    autocompleteList.innerHTML = html;
  }

  if (suggestions.length === 0) {
    autocompleteList.innerHTML = `<a class="suggLink" href="#"
    onclick="completeInput(this)">`;
  }

  const suggLink = document.querySelector(".suggLink");
  suggLink.addEventListener("click", () => handleToSearch());
};

const closeSearch = () => {
  inputSearch.value = "";
  autocompleteList.innerHTML = "";
  autocompleteList.classList.add("dispnone");
  inputSearch.classList.remove("hideborder");
  btnSearch.classList.remove("hideX");
  btnClose.classList.add("hideX");
};

btnSearch.addEventListener("click", handleToSearch);
btnSearchLeft.addEventListener("click", handleToSearch);
inputSearch.addEventListener("input", () => giveSuggs(inputSearch.value));
btnClose.addEventListener("click", () => closeSearch());

//presionar el boton search al hundir click
inputSearch.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    btnSearch.click();
  }
});
