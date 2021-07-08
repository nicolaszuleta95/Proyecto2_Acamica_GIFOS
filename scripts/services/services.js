import paths from "./paths.js";

export default {
  getTrending(limit, offset) {
    return new Promise((resolve, reject) => {
      fetch(
        `${paths.API_TRENDING}?api_key=${paths.API_KEY}&limit=${limit}&offset=${offset}`
      )
        .then((res) => res.json())
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  },

  getSearch(search, limit, offset) {
    return new Promise((resolve, reject) => {
      fetch(
        `${paths.API_SEARCH}?api_key=${paths.API_KEY}&q=${search}&limit=${limit}&offset=${offset}`
      )
        .then((res) => res.json())
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  },

  getTrendingSearch() {
    return new Promise((resolve, reject) => {
      fetch(`${paths.API_SEARCH_TRENDING}?api_key=${paths.API_KEY}`)
        .then((res) => res.json())
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  },

  getApiGifByID(id) {
    return new Promise((resolve, reject) => {
      fetch(`${paths.API_GIF_BY_ID}${id}?api_key=${paths.API_KEY}`)
        .then((res) => res.json())
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  },

  getSuggs(search) {
    return new Promise((resolve, reject) => {
      fetch(`${paths.API_SUGGS}?api_key=${paths.API_KEY}&q=${search}`)
        .then((res) => res.json())
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  },

  getApiGifByID(id) {
    return new Promise((resolve, reject) => {
      fetch(`${paths.API_GIF_BY_ID}${id}?api_key=${paths.API_KEY}`)
        .then((res) => res.json())
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  },

  downloadGifLink(url) {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then((res) => res)
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  },

  uploadGif(blob) {
    const url = `${paths.API_UPLOAD_GIF}?api_key=${paths.API_KEY}`;
    console.log(blob);

    let form = new FormData();
    form.append("file", blob, "myGif.gif");

    return new Promise((resolve, reject) => {
      fetch(url, { method: "POST", body: form })
        .then((res) => res.json())
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  },
};
