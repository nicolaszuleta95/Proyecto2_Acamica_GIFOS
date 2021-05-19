const apiKey = "hMezKtdsiOx17jANW8QDU3ipt0Kks8jK";
const trendingEndpoint = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=3&rating=g`;

/*const gifSpace = document.querySelector(".gifSpace");*/
let elements = document.getElementsByClassName("gifSpace");

function renderGiphy(giphy) {
  const img = document.createElement("IMG");
  img.src = giphy.images.downsized.url;
  for (let i = 0; i < elements.length; i++) {
    elements[i].appendChild(img);
  }
}

fetch(trendingEndpoint)
  .then((res) => res.json())
  .then(({ data }) => data.map(renderGiphy));
