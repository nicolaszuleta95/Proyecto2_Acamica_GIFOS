export default function liked() {
  let loveButton = document.getElementsByClassName("loveButton");

  for (let t = 0; t < loveButton.length; t++) {
    let like = loveButton[t];
    like.addEventListener("click", () => {
      if (loveButton[t].innerHTML === "") {
        loveButton[t].innerHTML = '<span class="icon-icon-fav-active"></span>';
      } else if (loveButton[t].innerHTML !== "") {
        loveButton[t].innerHTML = "";
      }
    });
  }
}
