const apiKey = "hMezKtdsiOx17jANW8QDU3ipt0Kks8jK";
const trendingEndpoint = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=3&rating=g`;

let elements = document.getElementsByClassName("gifSpace");
let titleGif = document.getElementsByClassName("tituloGIF");
let userGif = document.getElementsByClassName("user");

function renderGiphy(giphy) {
  for (let i = 0; i < elements.length; i++) {
    const img = document.createElement("IMG");
    img.src = giphy[i].images.downsized.url;
    elements[i].appendChild(img);
  }
}

function fillGIF(giphy) {
  for (let i = 0; i < titleGif.length; i++) {
    titleGif[i].innerText = giphy[i].title;
  }
  for (let i = 0; i < userGif.length; i++) {
    userGif[i].innerText = giphy[i].username;
  }
}

fetch(trendingEndpoint)
  .then((res) => res.json())
  .then(({ data }) => {
    renderGiphy(data);
    fillGIF(data);
  })
  .catch((error) => {
    console.warn(`Error de ${error}`);
  });
