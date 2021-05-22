const searchEndpoint = "https://api.giphy.com/v1/gifs/search";

let SEARCH_LIMIT = 10;
let searchOffset = 0;
let gifosCount = 0;

const inputSearch = document.querySelector(".input-search");
const btnSearch = document.querySelector(".searchButton");

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

btnSearch.addEventListener("click", handleToSearch);
