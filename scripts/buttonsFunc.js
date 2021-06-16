import paths from "./services/paths.js";
import api from "./services/services.js";
let likedArr = [];

//Like function
export function liked() {
  let loveButton = document.getElementsByClassName("loveButton");
  let allGifs = document.getElementsByClassName("gif-img");

  for (let t = 0; t < loveButton.length; t++) {
    let like = loveButton[t];
    like.addEventListener("click", () => {
      if (loveButton[t].innerHTML === "") {
        loveButton[t].innerHTML = '<span class="icon-icon-fav-active"></span>';
        for (let i = 0; i < allGifs.length; i++) {
          if (
            loveButton[t].parentNode.parentNode.parentNode.id === allGifs[i].id
          ) {
            api
              .getApiGifByID(allGifs[i].id)
              .then((res) => {
                const { data } = res;
                likedArr.push(JSON.stringify(data));
                localStorage.setItem("Liked", JSON.stringify(likedArr));
              })
              .catch((error) => console.warn("Error getApiGifByID: ", error));
          }
        }
      } else if (loveButton[t].innerHTML !== "") {
        loveButton[t].innerHTML = "";
        for (let i = 0; i < allGifs.length; i++) {
          if (
            loveButton[t].parentNode.parentNode.parentNode.id === allGifs[i].id
          ) {
            api
              .getApiGifByID(allGifs[i].id)
              .then((res) => {
                const { data } = res;
                const index = likedArr.indexOf(JSON.stringify(data));
                if (index > -1) {
                  likedArr.splice(index, 1);
                }
                localStorage.setItem("Liked", JSON.stringify(likedArr));
              })
              .catch((error) => console.warn("Error getApiGifByID: ", error));
          }
        }
      }
    });
  }
}

//download gif function
export function downloadGif() {
  let downloadBtn = document.getElementsByClassName("downloadBtn");
  let allGifs = document.getElementsByClassName("gif-img");
  let a = document.createElement("a");

  for (let t = 0; t < downloadBtn.length; t++) {
    let dwn = downloadBtn[t];
    dwn.addEventListener("click", () => {
      for (let i = 0; i < allGifs.length; i++) {
        if (
          downloadBtn[t].parentNode.parentNode.parentNode.id === allGifs[i].id
        ) {
          api.getApiGifByID(allGifs[i].id).then((res) => {
            const { data } = res;
            api
              .downloadGifLink(data.images.original.url)
              .then((response) => {
                response
                  .blob()
                  .then((file) => {
                    const a = document.createElement("a");
                    a.download = data.id;
                    a.href = window.URL.createObjectURL(file);
                    a.dataset.downloadurl = [
                      "application/octet-stream",
                      a.download,
                      a.href,
                    ].join(":");
                    a.click();
                  })
                  .catch((err) => {
                    console.error("Error al crear descargable: ", err);
                  });
              })
              .catch((err) => {
                console.error("Error al descargar el gif: ", err);
              });
          });
        }
      }
    });
  }
}

//max gif function
export function maxGif() {
  let maxBtn = document.getElementsByClassName("maxBtn");
  let allGifs = document.getElementsByClassName("gif-img");
  let maxGifSpace = document.querySelector(".maxGifSpace");
  let maximizeGif = document.querySelector(".maximizeGif");

  for (let t = 0; t < maxBtn.length; t++) {
    let maxG = maxBtn[t];

    maxG.addEventListener("click", () => {
      for (let i = 0; i < allGifs.length; i++) {
        if (maxBtn[t].parentNode.parentNode.parentNode.id === allGifs[i].id) {
          api.getApiGifByID(allGifs[i].id).then((res) => {
            const { data } = res;
            let url = data.images.original.url;
            maxGifSpace.innerHTML += `<img class="maxImg" src="${url}" alt="maximized Gif" />`;
            maximizeGif.style.display = "flex";

            let closeButton = document.querySelector(".closeButton");
            closeButton.addEventListener("click", () => {
              maximizeGif.style.display = "none";
              var image_x = document.querySelector(".maxImg");
              image_x.parentNode.removeChild(image_x);
            });
          });
        }
      }
    });
  }
}
