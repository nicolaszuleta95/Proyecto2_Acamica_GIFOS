const searchEndpoint = "https://api.giphy.com/v1/gifs/search";
const suggEndpoint = "https://api.giphy.com/v1/tags/related/";

let SEARCH_LIMIT = 10;
let searchOffset = 0;
let SUGGS_LIMIT = 4;
let gifosCount = 0;

const inputSearch = document.querySelector(".input-search");
const btnSearch = document.querySelector(".searchButton");
const btnSearchLeft = document.querySelector(".searchButtonLeft");
const btnClose = document.querySelector(".XButton");
const autocompleteList = document.querySelector(".autocomSearch");

const requestSearch = () => {
  return new Promise((resolve, reject) => {
    fetch(
      `${searchEndpoint}?api_key=${apiKey}&q=${inputSearch.value}&limit=${SEARCH_LIMIT}&offset=${searchOffset}`
    )
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((error) => reject(`Error de ${error}`));
  });
};

const handleToSearch = () => {
  requestSearch()
    .then((response) => {
      gifosCount += SEARCH_LIMIT;
      console.log(response);
      searchOffset = searchOffset + SEARCH_LIMIT;
      //if(gifosCount === response.pagination.total_count) //Desaparecer el btn de ver mas
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
    `${suggEndpoint}${searchText}?api_key=${apiKey}&limit=${SUGGS_LIMIT}`
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

const paintSuggsHTML = async (suggestions) => {
  if (suggestions.length > 0) {
    const html = suggestions
      .map(
        (match) =>
          `<hr /><a href="#"><li><i class="fas fa-search"></i>${match.name}</li></a>`
      )
      .join("");
    autocompleteList.innerHTML = html;
  }
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
