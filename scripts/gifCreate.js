import api from "./services/services.js";

const startBtn = document.querySelector(".startBtn");
const recBtn = document.querySelector(".recBtn");
const endBtn = document.querySelector(".endBtn");
const uploadBtn = document.querySelector(".uploadBtn");
const repeatBtn = document.querySelector(".repeatBtn");
const Msgs = document.querySelector(".Msgs");
const mainMsg = document.querySelector(".mainMsg");
const secMsg = document.querySelector(".secMsg");
const oneBtn = document.querySelector(".oneBtn");
const twoBtn = document.querySelector(".twoBtn");
const threeBtn = document.querySelector(".threeBtn");
const videoFrame = document.querySelector(".videoFrame");
const gifPreview = document.querySelector(".gifPreview");
const gifPreviewPurple = document.querySelector(".gifPreviewPurple");
const insideText = document.querySelector(".insideText");
const loading = document.querySelector(".loading");
const check = document.querySelector(".check");

const timeP = document.querySelector(".timeP");
const gifTimer = document.querySelector(".gifTimer");
var recorder;
var dateStarted;
let myGifsArr = [];

function calculateTimeDuration(secs) {
  var hr = Math.floor(secs / 3600);
  var min = Math.floor((secs - hr * 3600) / 60);
  var sec = Math.floor(secs - hr * 3600 - min * 60);

  if (min < 10) {
    min = "0" + min;
  }

  if (sec < 10) {
    sec = "0" + sec;
  }

  if (hr <= 0) {
    return min + ":" + sec;
  }

  return hr + ":" + min + ":" + sec;
}

function looper() {
  if (!recorder) {
    return;
  }

  timeP.innerHTML = calculateTimeDuration(
    (new Date().getTime() - dateStarted) / 1000
  );

  setTimeout(looper, 1000);
}

function captureCamera(callback) {
  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then(function (camera) {
      callback(camera);
    })
    .catch(function (error) {
      alert("No es posible conectarse a la camara");
      console.error(error);
    });
}

function stopRecordingCallback() {
  gifPreview.style.display = "block";
  let blob = recorder.getBlob();
  gifPreview.src = URL.createObjectURL(blob);

  recorder.destroy();
  recorder = null;

  videoFrame.style.display = "none";
  gifPreview.style.display = "block";
  endBtn.style.display = "none";
  uploadBtn.style.display = "block";

  gifTimer.style.display = "none";
  repeatBtn.style.display = "block";

  uploadBtn.addEventListener("click", () => {
    repeatBtn.style.display = "none";
    gifPreviewPurple.style.display = "flex";
    console.log(blob);
    api
      .uploadGif(blob)
      .then((res) => {
        console.log(res);
        const { data } = res;
        myGifsArr = JSON.parse(localStorage.getItem("myGifs"));
        api
          .getApiGifByID(data.id)
          .then((res) => {
            const { data } = res;
            console.log(data);
            myGifsArr.push(JSON.stringify(data));
            localStorage.setItem("myGifs", JSON.stringify(myGifsArr));

            insideText.innerHTML = "GIFO subido con éxito";
            loading.style.display = "none";
            check.style.display = "block";
            paintBtn(twoBtn, "white");
            paintBtn(threeBtn, "purple");
          })
          .catch((error) => console.warn("Error getApiGifByID: ", error));
      })
      .catch((err) => {
        console.log("error de uploadGif", err);
        alert("subida de Gif fallida");
      });
  });
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

function changeMsg() {
  mainMsg.innerHTML = "<p>¿Nos das acceso<br />a tu cámara?</p>";
  secMsg.innerHTML =
    "<p>El acceso a tu camara será válido sólo<br />por el tiempo en el que estés creando el GIFO.</p>";

  startBtn.style.display = "none";
  paintBtn(oneBtn, "purple");
  getStreamAndRecord();
}

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

startBtn.addEventListener("click", changeMsg);
recBtn.addEventListener("click", () => {
  captureCamera(function (camera) {
    recorder = RecordRTC(camera, {
      type: "gif",
      frameRate: 1,
      quality: 10,
      width: 360,
      hidden: 240,
      onGifRecordingStarted: function () {
        //console.log("started");
      },
      onGifPreview: function (gifURL) {
        gifPreview.src = gifURL;
      },
    });
    recorder.startRecording();

    dateStarted = new Date().getTime();
    looper();

    gifTimer.style.display = "block";
    recBtn.style.display = "none";
    endBtn.style.display = "block";

    // release camera on stopRecording
    recorder.camera = camera;
  });
});

endBtn.addEventListener("click", () => {
  recorder.stopRecording(stopRecordingCallback);
});

repeatBtn.addEventListener("click", () => {
  gifPreview.style.display = "none";
  repeatBtn.style.display = "none";
  uploadBtn.style.display = "none";
  recBtn.style.display = "block";
  navigator.mediaDevices
    .getUserMedia({
      audio: false,
      video: {
        height: { max: 480 },
      },
    })
    .then(function (stream) {
      videoFrame.style.display = "flex";
      paintBtn(oneBtn, "white");
      paintBtn(twoBtn, "purple");
      recBtn.style.display = "block";
      videoFrame.srcObject = stream;
      videoFrame.play();
    });
});
