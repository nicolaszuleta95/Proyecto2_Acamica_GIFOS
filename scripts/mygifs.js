const misGifosGrid = document.querySelector(".misGifosGrid");
const misGifosNoContent = document.querySelector(".misGifosNoContent");
const btnVerMas = document.querySelector(".btnVerMas");

let myGifs = JSON.parse(localStorage.getItem("myGifs"));
let page = 0;

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
    } else {
    }
  }
};

readMyGifs();
