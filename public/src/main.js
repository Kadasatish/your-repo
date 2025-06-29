const socket = io("https://your-repo-ds9a.onrender.com");

const toggleBtn = document.getElementById("toggle-btn");
const statusDot = document.getElementById("status-dot");

toggleBtn.addEventListener("change", () => {
  const isOn = toggleBtn.checked;
  statusDot.style.backgroundColor = isOn ? "white" : "black";
  socket.emit("cameraToggle", isOn);
});

socket.on("cameraToggle", (isOn) => {
  toggleBtn.checked = isOn;
  statusDot.style.backgroundColor = isOn ? "white" : "black";
});
