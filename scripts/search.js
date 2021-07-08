const suggEndpoint = "https://api.giphy.com/v1/tags/related/";

import paths from "./services/paths.js";
import api from "./services/services.js";
import { liked, downloadGif, maxGif } from "./buttonsFunc.js";

let SEARCH_LIMIT = 12;
let searchOffset = 0;
let SUGGS_LIMIT = 4;
let gifosCount = 0;

maxGif();
liked();
downloadGif();

const inputSearch = document.querySelector(".input-search");
const btnSearch = document.querySelector(".searchButton");
const btnSearchLeft = document.querySelector(".searchButtonLeft");
const btnClose = document.querySelector(".XButton");
const autocompleteList = document.querySelector(".autocomSearch");

let gifResults = document.querySelector(".gifResults");
let seeMoreBtn = document.querySelector(".seeMoreBtn");
let searchedValue = document.querySelector(".searchedValue");
let searchedGIFS = document.querySelector(".searchedGIFS");
let trending = document.querySelector(".trending");

function initializeLocal() {
  let likedArr = [];
  if (localStorage.getItem("Liked") === null) {
    localStorage.setItem("Liked", JSON.stringify(likedArr));
  }
  let myGifsArr = [];
  if (localStorage.getItem("myGifs") === null) {
    localStorage.setItem("myGifs", JSON.stringify(myGifsArr));
  }
}
initializeLocal();

function paintSearchGifs(data) {
  const { id, title, username, images } = data.data;
  return `
    <div class="gifSpace" id="${id}">
      <img src="${images.original.url}" alt="" class="gif-img" id="${id}">
      <div class="purpleSquare">
        <div class="iconsCard">
            <div class="loveButton"></div>
            <img class="downloadBtn" src="/img/icon-download.svg" alt="link" />
            <img class="maxBtn" src="/img/icon-max-normal.svg" alt="max" />
        </div>
        <div class="GIFinfo">
            <p class="user">${username}</p>
            <h3 class="tituloGIF">${title}</h3>
        </div>
      </div>
    </div>
    `;
}

const handleToSearch = () => {
  if (inputSearch.value != "") {
    searchedValue.innerHTML = inputSearch.value;
    api
      .getSearch(inputSearch.value, SEARCH_LIMIT, searchOffset)
      .then((response) => {
        console.log(response);
        const { data } = response;
        let acum = 0;
        let gifs = "";
        let gifsArr = [];
        for (let i = 0; i < data.length; i++) {
          api.getApiGifByID(data[i].id).then((response) => {
            acum++;
            gifsArr.push(response);

            if (acum === data.length) {
              gifsArr.sort((a, b) => {
                return a.id > b.id ? 1 : b.id > a.id ? -1 : 0;
              });

              for (let i = 0; i < gifsArr.length; i++) {
                gifs += paintSearchGifs(gifsArr[i]);
              }
              gifResults.innerHTML = gifs;

              maxGif();
              liked();
              downloadGif();
            }
          });
        }

        gifosCount += 12;
        searchOffset += 12;
        SEARCH_LIMIT += 12;

        if (gifosCount >= response.pagination.total_count) {
          seeMoreBtn.style.display = "none";
        } else {
          seeMoreBtn.style.display = "flex";
        }

        searchedGIFS.style.display = "flex";
        trending.style.display = "none";
        hideSearched(gifsArr);
      })
      .catch((error) => {
        console.warn(error);
      });
  }
};

const giveSuggs = async (searchText) => {
  if (searchText != "") {
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
  }
};

const completeInput = (link) => {
  inputSearch.value = link;
  SEARCH_LIMIT = 12;
  searchOffset = 0;
  SUGGS_LIMIT = 4;
  gifosCount = 0;
  handleToSearch();
};

const paintSuggsHTML = async (suggestions) => {
  let suggsArr = [];
  for (let i = 0; i < suggestions.length; i++) {
    suggsArr.push(suggestions[i]);
  }

  if (suggestions.length > 0) {
    const html = suggestions
      .map(
        (match) =>
          `<hr /><a class="suggLink" href="#" id="${match.name}" value="${match.name}"><li><i class="fas fa-search"></i>${match.name}</li></a>`
      )
      .join("");
    autocompleteList.innerHTML = html;
  }

  if (suggestions.length === 0) {
    autocompleteList.innerHTML = `<a class="suggLink" href="#" id="${match.name}" value="${match.name}">`;
  }

  for (let t = 0; t < suggsArr.length; t++) {
    let auto = document.getElementById(`${suggsArr[t].name}`);

    auto.addEventListener("click", () => {
      completeInput(suggsArr[t].name);
    });
  }
};

const closeSearch = () => {
  inputSearch.value = "";
  autocompleteList.innerHTML = "";
  autocompleteList.classList.add("dispnone");
  inputSearch.classList.remove("hideborder");
  btnSearch.classList.remove("hideX");
  btnClose.classList.add("hideX");
  searchedGIFS.style.display = "none";
  searchedGIFS.classList.remove("tag1");
  trending.style.display = "flex";
  SEARCH_LIMIT = 12;
  searchOffset = 0;
  SUGGS_LIMIT = 4;
  gifosCount = 0;
};

function hideSearched(gifsArrLength) {
  if (searchedGIFS.style.display === "none" && gifsArrLength > 0) {
    searchedGIFS.style.display = "flex";
  } else if (gifsArrLength === 0) {
    searchedGIFS.style.display = "none";
  }
}

btnSearch.addEventListener("click", handleToSearch);
btnSearchLeft.addEventListener("click", handleToSearch);
inputSearch.addEventListener("input", () => giveSuggs(inputSearch.value));
btnClose.addEventListener("click", () => closeSearch());
seeMoreBtn.addEventListener("click", handleToSearch);

//presionar el boton search al hundir click
inputSearch.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    btnSearch.click();
  }
});

const trendingWords = document.querySelector(".trendingWords");

function trendWords() {
  api
    .getTrendingSearch()
    .then((res) => {
      const { data } = res;
      return data;
    })
    .then((data) => {
      const slicedArray = data.slice(0, 5);

      for (let i = 0; i < slicedArray.length; i++) {
        const element = slicedArray[i];
        var listItem = document.createElement("li");
        var aEl = document.createElement("a");
        trendingWords.appendChild(listItem);
        listItem.appendChild(aEl);

        listItem.classList = "searchWord";
        if (i == 4) {
          aEl.innerHTML = element + ".";
        } else {
          aEl.innerHTML = element + ", ";
        }

        aEl.id = element;
        aEl.classList = "sWord";
      }
      const sWord = document.querySelectorAll(".sWord");

      for (let i = 0; i < slicedArray.length; i++) {
        sWord[i].addEventListener("click", () => {
          completeInput(sWord[i].id);
        });
      }
    });
}

trendWords();
