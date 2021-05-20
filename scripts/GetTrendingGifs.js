const apiKey = "hMezKtdsiOx17jANW8QDU3ipt0Kks8jK";
const trendingEndpoint = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=3&rating=g`;

/*const gifSpace = document.querySelector(".gifSpace");*/
let elements = document.getElementsByClassName("gifSpace");

function renderGiphy(giphy) {
  /* for (let i = 0; i < elements.length; i++) {
    console.log(giphy);
    const img = document.createElement("IMG");
    img.src = giphy.images.downsized.url;
    console.log(elements);
    elements[i].appendChild(img);
  }
  console.log(elements); */

  for (let i = 0; i < elements.length; i++) {
    const img = document.createElement("IMG");
    img.src = giphy[i].images.downsized.url;
    elements[i].appendChild(img);
    console.log(elements[i]);
    console.log(img);
  }
}

fetch(trendingEndpoint)
  .then((res) => res.json())
  .then(({ data }) => {
    renderGiphy(data);
  });
