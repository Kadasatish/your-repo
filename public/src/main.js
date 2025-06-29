const video = document.getElementById('video');
const toggle = document.getElementById('toggleCam');
const dot = document.getElementById('dot');

let stream;

toggle.addEventListener('change', async () => {
  if (toggle.checked) {
    dot.style.backgroundColor = 'white';
    try {
      stream = await navigator.mediaDevices.getUserMedia({ video: true });
      video.srcObject = stream;
    } catch (err) {
      console.error("Camera error:", err);
    }
  } else {
    dot.style.backgroundColor = 'black';
    if (stream) {
      let tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      video.srcObject = null;
    }
  }
});
