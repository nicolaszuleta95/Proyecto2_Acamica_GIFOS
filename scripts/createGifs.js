const startBtn = document.querySelector(".startBtn");
const recBtn = document.querySelector(".recBtn");
const endBtn = document.querySelector(".endBtn");
const Msgs = document.querySelector(".Msgs");
const mainMsg = document.querySelector(".mainMsg");
const secMsg = document.querySelector(".secMsg");
const oneBtn = document.querySelector(".oneBtn");
const twoBtn = document.querySelector(".twoBtn");
const videoFrame = document.querySelector(".videoFrame");

function getStreamAndRecord() {
  navigator.mediaDevices
    .getUserMedia({
      audio: false,
      video: {
        height: { max: 480 },
      },
    })
    .then(function (stream) {
      Msgs.style.display = "none";
      videoFrame.style.display = "flex";
      paintBtn(oneBtn, "white");
      paintBtn(twoBtn, "purple");
      recBtn.style.display = "block";
      videoFrame.srcObject = stream;
      videoFrame.play();
    });
}

function changeMsg() {
  mainMsg.innerHTML = "<p>¿Nos das acceso<br />a tu cámara?</p>";
  secMsg.innerHTML =
    "<p>El acceso a tu camara será válido sólo<br />por el tiempo en el que estés creando el GIFO.</p>";

  startBtn.style.display = "none";
  paintBtn(oneBtn, "purple");
  getStreamAndRecord();
}

function paintBtn(btn, color) {
  if (color === "purple") {
    btn.style.backgroundColor = "#572ee5";
    btn.style.color = "#ffffff";
  } else if (color === "white") {
    btn.style.backgroundColor = "#ffffff";
    btn.style.color = "#572ee5";
  }
}

startBtn.addEventListener("click", changeMsg);
