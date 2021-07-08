const misGifosGrid = document.querySelector(".misGifosGrid");
const misGifosNoContent = document.querySelector(".misGifosNoContent");
const gifResults = document.querySelector(".gifResults");
const btnVerMas = document.querySelector(".btnVerMas");
let trashButton = document.getElementsByClassName("trashButton");
let allGifs = document.getElementsByClassName("gif-img");

let likedGifs = JSON.parse(localStorage.getItem("Liked"));
let myGifs = JSON.parse(localStorage.getItem("myGifs"));
let page = 0;

const paintMyGifs = (data) => {
  const { id, title, username, images } = data;
  return `
        <div class="gifSpace" id="${id}">
          <img src="${images.original.url}" alt="" class="gif-img" id="${id}">
          <div class="purpleSquare">
            <div class="iconsCard">
                <div class="trashButton"></div>
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

const getmyGifs = (myGifs) => {
  let gifs = "";
  for (let i = 0; i < myGifs.length; i++) {
    const gif = JSON.parse(myGifs[i]);
    gifs += paintMyGifs(gif);
    gifResults.innerHTML = gifs;
  }

  trash();
  saveTrash();
};

function splitArrayIntoChunksOfLen(arr, len) {
  var chunks = [],
    i = 0,
    n = arr.length;
  while (i < n) {
    chunks.push(arr.slice(i, (i += len)));
  }
  return chunks;
}

const readMyGifs = () => {
  if (
    localStorage.getItem("myGifs") === null ||
    localStorage.getItem("myGifs") === "" ||
    localStorage.getItem("myGifs") === "[]"
  ) {
    misGifosGrid.style.display = "none";
    misGifosNoContent.style.display = "block";
    btnVerMas.style.display = "none";
  } else {
    misGifosGrid.style.display = "grid";
    misGifosNoContent.style.display = "none";
    btnVerMas.style.display = "none";

    let numberOfMyGifs = myGifs.length;
    let dividedMyGifs = splitArrayIntoChunksOfLen(myGifs, 8);
    if (numberOfMyGifs > 8 && page !== dividedMyGifs.length) {
      btnVerMas.style.display = "flex";
      getmyGifs(dividedMyGifs[0]);
      btnVerMas.addEventListener("click", () => {
        page += 1;
        getmyGifs(dividedMyGifs[page]);
        if (page === dividedMyGifs.length - 1) {
          btnVerMas.style.display = "none";
        }
      });
    } else {
      getmyGifs(dividedMyGifs[0]);
    }
  }
};

const trash = () => {
  for (let t = 0; t < trashButton.length; t++) {
    if (
      trashButton[t].parentNode.parentNode.parentNode.parentNode.id ===
      "gifSectionFavs"
    ) {
      trashButton[t].innerHTML = "";
    } else {
      trashButton[t].innerHTML = '<span class="icon-icon-trash-normal"></span>';
    }

    let unlike = trashButton[t];
    unlike.addEventListener("click", () => {
      console.log("clicked unlike");
      trashButton[t].innerHTML = "";
      for (let i = 0; i < allGifs.length; i++) {
        if (
          trashButton[t].parentNode.parentNode.parentNode.id === allGifs[i].id
        ) {
          let myGifs = JSON.parse(localStorage.getItem("myGifs"));
          for (let e = 0; e < myGifs.length; e++) {
            const gif = JSON.parse(myGifs[e]);
            if (gif.id === allGifs[i].id) {
              const index = myGifs.indexOf(JSON.stringify(gif));
              console.log(index);
              if (index > -1) {
                myGifs.splice(index, 1);
              }
              localStorage.setItem("myGifs", JSON.stringify(myGifs));
              console.log(myGifs);
              //refresco la pagina
              window.location.reload();
            }
          }
        }
      }
    });
  }
};

const saveTrash = () => {
  let myGifs = JSON.parse(localStorage.getItem("myGifs"));
  localStorage.setItem("myGifs", JSON.stringify(myGifs));
};

setTimeout(() => {
  readMyGifs();
}, 200);
