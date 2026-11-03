const video = document.getElementById("rickVideo");
video.controls = false;
video.disablePictureInPicture = true;

function tryUnmute() {
  video.muted = false;
  video.volume = 1;
  video.play().catch(() => {});
}

function forcePlay() {
  video.muted = false;
  const p = video.play();
  if (p && typeof p.then === "function") {
    p.catch(() => {
      video.muted = true;
      video.play().catch(() => {});
      const events = ["click", "touchstart", "keydown", "mousemove", "scroll", "pointerdown"];
      const handler = () => {
        tryUnmute();
      };
      events.forEach((ev) => window.addEventListener(ev, handler, { once: true }));
    });
  }
}

forcePlay();

video.addEventListener("pause", () => video.play());
video.addEventListener("ended", () => { video.currentTime = 0; video.play(); });

document.addEventListener("keydown", (e) => e.preventDefault(), true);
document.addEventListener("contextmenu", (e) => e.preventDefault());
video.addEventListener("click", (e) => { e.preventDefault(); e.stopPropagation(); }, true);
