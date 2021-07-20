import api from "./services/services.js";

let elements = document.getElementsByClassName("gifSpace");
let titleGif = document.getElementsByClassName("tituloGIF");
let userGif = document.getElementsByClassName("user");
let trendings = document.querySelector(".trendings");
let trendGifsArr = [];

// function renderGiphy(giphy) {
//   for (let i = 0; i < elements.length; i++) {
//     const img = document.createElement("IMG");
//     img.src = giphy[i].images.original.url;
//     img.id = giphy[i].id;
//     img.classList.add("gif-img");
//     elements[i].appendChild(img);
//     elements[i].id = giphy[i].id;
//     trendGifsArr.push(giphy[i]);
//   }
// }

// function fillGIF(giphy) {
//   for (let i = 0; i < titleGif.length; i++) {
//     titleGif[i].innerText = giphy[i].title;
//   }
//   for (let i = 0; i < userGif.length; i++) {
//     userGif[i].innerText = giphy[i].username;
//   }
// }

// api
//   .getTrending(3, 0)
//   .then((res) => {
//     const { data } = res;
//     renderGiphy(data);
//     fillGIF(data);
//   })
//   .catch((error) => console.warn("Error getTrending: ", error));

//console.log(trendGifsArr);

const paintTrendings = (data) => {
  const { id, title, username, images } = data;
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
};

function readTrendings() {
  api
    .getTrending(3, 0)
    .then((res) => {
      const { data } = res;
      trendGifsArr = data;
      getTrendings(trendGifsArr);
    })
    .catch((error) => console.warn("Error getTrending: ", error));
}

const getTrendings = (arr) => {
  let gifs = "";
  for (let i = 0; i < arr.length; i++) {
    const gif = arr[i];
    console.log(gif);
    gifs += paintTrendings(gif);
    trendings.innerHTML = gifs;
  }
};

readTrendings();
console.log(trendGifsArr);
