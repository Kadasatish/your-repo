const socket = io("https://your-render-backend.onrender.com"); // update this URL

const toggleBtn = document.getElementById("toggleBtn");
const video = document.getElementById("camera");
let isCameraOn = false;
let stream = null;

toggleBtn.addEventListener("click", () => {
  isCameraOn = !isCameraOn;
  socket.emit("toggle", isCameraOn);
  updateCamera(isCameraOn);
});

socket.on("toggle", (state) => {
  isCameraOn = state;
  updateCamera(state);
});

async function updateCamera(state) {
  if (state) {
    toggleBtn.textContent = "Turn Camera OFF";
    video.style.display = "block";
    stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
  } else {
    toggleBtn.textContent = "Turn Camera ON";
    video.style.display = "none";
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
  }
    }
