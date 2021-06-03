import api from "./services/services.js";

let elements = document.getElementsByClassName("gifSpace");
let titleGif = document.getElementsByClassName("tituloGIF");
let userGif = document.getElementsByClassName("user");

function renderGiphy(giphy) {
  for (let i = 0; i < elements.length; i++) {
    const img = document.createElement("IMG");
    img.src = giphy[i].images.downsized.url;
    elements[i].appendChild(img);
  }
}

function fillGIF(giphy) {
  for (let i = 0; i < titleGif.length; i++) {
    titleGif[i].innerText = giphy[i].title;
  }
  for (let i = 0; i < userGif.length; i++) {
    userGif[i].innerText = giphy[i].username;
  }
}

const requestTrendingGifs = () => {
  return new Promise((resolve, reject) => {
    fetch(`${trendingEndpoint}`)
      .then((response) => response.json())
      .then(({ data }) => {
        renderGiphy(data);
        fillGIF(data);
      })
      .catch((error) => reject(`Error de ${error}`));
  });
};

api
  .getTrending(3, 0)
  .then((res) => {
    const { data } = res;
    renderGiphy(data);
    fillGIF(data);
  })
  .catch((error) => console.warn("Error getTrending: ", error));
