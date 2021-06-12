import paths from "./services/paths.js";
import api from "./services/services.js";

export default function liked() {
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
                localStorage.setItem("Liked", JSON.stringify(data));
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
                localStorage.removeItem("Liked", JSON.stringify(data));
              })
              .catch((error) => console.warn("Error getApiGifByID: ", error));
          }
        }
      }
    });
  }
}
