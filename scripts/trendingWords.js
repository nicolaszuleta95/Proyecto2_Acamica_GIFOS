//import paths from "./services/paths.js";
import api from "./services/services.js";

const trendingWords = document.querySelector(".trendingWords");

function trendWords() {
  api.getTrendingSearch().then((res) => {
    const { data } = res;
    const slicedArray = data.slice(0, 5);
    let newArr = [];
    for (let i = 0; i < slicedArray.length; i++) {
      const element = slicedArray[i];
      var pEl = document.createElement("a");
      trendingWords.appendChild(pEl);

      pEl.innerHTML = element + ", ";
      pEl.id = element;
      pEl.classList = "searchWord";
    }
  });
}

trendWords();
