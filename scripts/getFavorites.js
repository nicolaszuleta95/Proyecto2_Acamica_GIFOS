let noContent = document.querySelector(".noContent");
let gifGrid = document.querySelector(".gifGrid");
let gifResults = document.querySelector(".gifResults");
let seeMoreBtn = document.querySelector(".btnVerMas");
let loveButton = document.getElementsByClassName("loveButton");
let allGifs = document.getElementsByClassName("gif-img");


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

  unlikeFavs();
  saveFavs();
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

const unlikeFavs = () => {
  for (let t = 0; t < loveButton.length; t++) {
    if (loveButton[t].parentNode.parentNode.parentNode.parentNode.id === 'gifSectionFavs') {
      loveButton[t].innerHTML = '';
    } else {
      loveButton[t].innerHTML = '<span class="icon-icon-fav-active"></span>';
    }

    let unlike = loveButton[t];
    unlike.addEventListener("click", () => {
      console.log('clicked unlike')
      loveButton[t].innerHTML = "";
      for (let i = 0; i < allGifs.length; i++) {
        if (
          loveButton[t].parentNode.parentNode.parentNode.id === allGifs[i].id
        ) {
          let likedGifs = JSON.parse(localStorage.getItem("Liked"));
          for (let e = 0; e < likedGifs.length; e++) {
            const gif = JSON.parse(likedGifs[e])
            if (gif.id === allGifs[i].id) {
              const index = likedGifs.indexOf(JSON.stringify(gif));
              console.log(index)
              if (index > -1) {
                likedGifs.splice(index, 1);
              }
              localStorage.setItem("Liked", JSON.stringify(likedGifs));
              console.log(likedGifs)
              //refresco la pagina
              window.location.reload();
            }
          }
          
        }
      }
    })
  }
    
}

const saveFavs = () => {
  let likedGifs = JSON.parse(localStorage.getItem("Liked"));
  localStorage.setItem("Liked", JSON.stringify(likedGifs));
  console.log('favs saved')
}


setTimeout(() => {
  readFavorites();
}, 200);