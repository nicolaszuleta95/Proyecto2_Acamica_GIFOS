let noContent = document.querySelector(".noContent");
let gifGrid = document.querySelector(".gifGrid");
let gifResults = document.querySelector(".gifResults");
let seeMoreBtn = document.querySelector(".btnVerMas");

const paintFavorites = (data) => {
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

const getFavorites = (likedGifs) => {
  let gifs = "";
  for (let i = 0; i < likedGifs.length; i++) {
    const gif = JSON.parse(likedGifs[i]);
    gifs += paintFavorites(gif);
    gifResults.innerHTML = gifs;
  }
};

const readFavorites = () => {
  if (
    localStorage.getItem("Liked") === null ||
    localStorage.getItem("Liked") === "" ||
    localStorage.getItem("Liked") === "[]"
  ) {
    noContent.style.display = "flex";
    gifGrid.style.display = "none";
    seeMoreBtn.style.display = "none";
  } else {
    noContent.style.display = "none";
    gifGrid.style.display = "flex";
    seeMoreBtn.style.display = "none";

    let likedGifs = JSON.parse(localStorage.getItem("Liked"));
    getFavorites(likedGifs);
    let numberOfLiked = likedGifs.length;
    if (numberOfLiked > 12) {
      seeMoreBtn.style.display = "flex";
    }
  }
};

setTimeout(() => {
  readFavorites();
}, 200);
