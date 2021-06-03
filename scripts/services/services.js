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

  getApiGifByID(id) {
    return new Promise((resolve, reject) => {
      fetch(`${paths.API_GIF_BY_ID}${id}?api_key=${paths.API_KEY}`)
        .then((res) => res.json())
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  },
};
