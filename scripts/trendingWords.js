import api from "./services/services.js";

const trendingWords = document.querySelector(".trendingWords");

function trendWords() {
  api.getTrendingSearch().then((res) => {
    const { data } = res;
    const slicedArray = data.slice(0, 5);
    for (let i = 0; i < slicedArray.length; i++) {
      const element = slicedArray[i];
      var listItem = document.createElement("li");
      var aEl = document.createElement("a");
      trendingWords.appendChild(listItem);
      listItem.appendChild(aEl);

      listItem.classList = "searchWord";
      aEl.innerHTML = element + ", ";
      aEl.id = element;
      aEl.classList = "sWord";
    }
  });
}

trendWords();
