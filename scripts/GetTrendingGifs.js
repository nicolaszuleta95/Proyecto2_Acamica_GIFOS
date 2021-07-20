import api from "./services/services.js";

let trendings = document.querySelector(".trendings");
let trendGifsArr = [];

//paints the trending gifs
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
    gifs += paintTrendings(gif);
    trendings.innerHTML = gifs;
  }
};

readTrendings();
