import api from "../scripts/services/services.js";

const inputSearch = document.querySelector(".input-search");
const btnSearch = document.querySelector(".searchButton");
let gifResults = document.querySelector(".gifResults");
let seeMoreBtn = document.querySelector(".seeMoreBtn");

let SEARCH_LIMIT = 12;
let searchOffset = 0;
let gifosCount = 0;

function paintSearchGifs(data) {
  const { id, title, username, images } = data.data;
  //   return `
  //   <div class="gifSpace">
  //     <img src="${images.downsized.url}" alt="" class="gif-img">
  //     <div class="purpleSquare">
  //     <div class="iconsCard">
  //         <div class="loveButton"></div>
  //         <img src="/img/icon-link-normal.svg" alt="link" />
  //         <img src="/img/icon-max-normal.svg" alt="max" />
  //     </div>
  //     <div class="GIFinfo">
  //         <p class="user">${username}</p>
  //         <h3 class="tituloGIF">${title}</h3>
  //     </div>
  //   </div>
  //   `;

  return `
        <div class="gif">
          <img src="${images.downsized.url}" alt="" class="gif-img">
        </div>
      `;
}

const handleToSearch = () => {
  api
    .getSearch(inputSearch.value, SEARCH_LIMIT, searchOffset)
    .then((response) => {
      const { data } = response;
      console.log(response);
      let acum = 0;
      let gifs = "";
      let gifsArr = [];
      for (let i = 0; i < data.length; i++) {
        api.getApiGifByID(data[i].id).then((response) => {
          acum++;
          gifsArr.push(response);

          if (acum === data.length) {
            gifsArr.sort((a, b) => {
              return a.id > b.id ? 1 : b.id > a.id ? -1 : 0;
            });

            for (let i = 0; i < gifsArr.length; i++) {
              gifs += paintSearchGifs(gifsArr[i]);
            }
            gifResults.innerHTML = gifs;
          }
        });
      }

      console.log(gifsArr);
      gifosCount += SEARCH_LIMIT;
      searchOffset = searchOffset + SEARCH_LIMIT;
      if (gifosCount >= response.pagination.total_count) {
        seeMoreBtn.classList.add("hideBtn");
      }
    })
    .catch((error) => {
      console.warn(error);
    });
};

btnSearch.addEventListener("click", handleToSearch);
seeMoreBtn.addEventListener("click", handleToSearch);
//presionar el boton search al hundir click
inputSearch.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    btnSearch.click();
  }
});
