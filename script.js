const video = document.getElementById("rickVideo");
video.controls = false;
video.disablePictureInPicture = true;

let audioCtx = null;
function ensureAudio() {
  if (!audioCtx) {
    try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {}
  }
  if (audioCtx && audioCtx.state === "suspended") audioCtx.resume().catch(() => {});
}

function tryUnmute() {
  ensureAudio();
  video.muted = false;
  video.volume = 1;
  video.play().catch(() => {});
}

function forcePlay() {
  video.muted = false;
  video.volume = 1;
  const p = video.play();
  if (p && typeof p.then === "function") {
    p.catch(() => {
      video.muted = true;
      video.play().catch(() => {});
    });
  }
}

forcePlay();

const events = ["click", "touchstart", "keydown", "mousemove", "scroll", "pointerdown", "mouseover"];
events.forEach((ev) => window.addEventListener(ev, tryUnmute, { passive: true }));

setInterval(() => {
  if (video.muted) tryUnmute();
  if (video.paused) video.play().catch(() => {});
}, 1000);

video.addEventListener("pause", () => video.play());
video.addEventListener("ended", () => { video.currentTime = 0; video.play(); });

document.addEventListener("keydown", (e) => e.preventDefault(), true);
document.addEventListener("contextmenu", (e) => e.preventDefault());
video.addEventListener("click", (e) => { e.preventDefault(); e.stopPropagation(); }, true);
