import api from "./services/services.js";
import { downloadGif, maxGif } from "./buttonsFunc.js";

let trendings = document.querySelector(".trendings");
let trendGifsArr = [];
let likedArr = localStorage.getItem("Liked");

//paints the trending gifs
const paintTrendings = (data) => {
  const { id, title, username, images } = data;
  return `
      <div class="gifSpace" id="${id}">
        <img src="${images.original.url}" alt="" class="gif-img trGif" id="${id}">
        <div class="purpleSquare">
          <div class="iconsCard">
              <div class="loveButton loveTr"></div>
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
  let trArr = [];
  for (let i = 0; i < arr.length; i++) {
    const gif = arr[i];
    gifs += paintTrendings(gif);
    trendings.innerHTML = gifs;
    const trendgif = JSON.stringify(arr[i]);
    trArr.push(trendgif);
    localStorage.setItem("trendingGifs", JSON.stringify(trArr));
  }
};

readTrendings();

function likeTrending() {
  let loveTr = document.querySelectorAll(".loveTr");
  let trGif = document.querySelectorAll(".trGif");

  for (let t = 0; t < loveTr.length; t++) {
    let likeTr = loveTr[t];
    likeTr.addEventListener("click", () => {
      console.log("please work");
      if (loveTr[t].innerHTML === "") {
        loveTr[t].innerHTML = '<span class="icon-icon-fav-active"></span>';
        for (let i = 0; i < trGif.length; i++) {
          if (loveTr[t].parentNode.parentNode.parentNode.id === trGif[i].id) {
            likedArr = JSON.parse(localStorage.getItem("Liked"));
            api
              .getApiGifByID(trGif[i].id)
              .then((res) => {
                const { data } = res;
                likedArr.push(JSON.stringify(data));
                localStorage.setItem("Liked", JSON.stringify(likedArr));
                window.location.reload();
              })
              .catch((error) => console.warn("Error getApiGifByID: ", error));
          }
        }
      } else if (loveTr[t].innerHTML !== "") {
        loveTr[t].innerHTML = "";
        for (let i = 0; i < trGif.length; i++) {
          if (loveTr[t].parentNode.parentNode.parentNode.id === trGif[i].id) {
            api
              .getApiGifByID(trGif[i].id)
              .then((res) => {
                const { data } = res;
                const index = likedArr.indexOf(JSON.stringify(data));
                if (index > -1) {
                  likedArr.splice(index, 1);
                }
                localStorage.setItem("Liked", JSON.stringify(likedArr));
                window.location.reload();
              })
              .catch((error) => console.warn("Error getApiGifByID: ", error));
          }
        }
      }
    });
  }
}

setTimeout(() => {
  likeTrending();
  downloadGif();
  maxGif();
}, 1000);
