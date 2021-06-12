import api from "./services/services.js";

let elements = document.getElementsByClassName("gifSpace");
let titleGif = document.getElementsByClassName("tituloGIF");
let userGif = document.getElementsByClassName("user");
let trendGifsArr = [];

function renderGiphy(giphy) {
  for (let i = 0; i < elements.length; i++) {
    const img = document.createElement("IMG");
    img.src = giphy[i].images.original.url;
    img.id = giphy[i].id;
    img.classList.add("gif-img");
    elements[i].appendChild(img);
    elements[i].id = giphy[i].id;
    trendGifsArr.push(giphy[i]);
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

api
  .getTrending(3, 0)
  .then((res) => {
    const { data } = res;
    renderGiphy(data);
    fillGIF(data);
  })
  .catch((error) => console.warn("Error getTrending: ", error));

//console.log(trendGifsArr);
