const video = document.getElementById("rickVideo");
video.controls = false;
video.disablePictureInPicture = true;
video.muted = false;

function forcePlay() {
  const p = video.play();
  if (p && typeof p.then === "function") {
    p.catch(() => {
      video.muted = true;
      video.play().catch(() => {});
      const unmute = () => {
        video.muted = false;
        video.play().catch(() => {});
        window.removeEventListener("click", unmute);
        window.removeEventListener("touchstart", unmute);
        window.removeEventListener("keydown", unmute);
      };
      window.addEventListener("click", unmute);
      window.addEventListener("touchstart", unmute);
      window.addEventListener("keydown", unmute);
    });
  }
}

forcePlay();

video.addEventListener("pause", () => video.play());
video.addEventListener("ended", () => { video.currentTime = 0; video.play(); });

document.addEventListener("keydown", (e) => e.preventDefault(), true);
document.addEventListener("contextmenu", (e) => e.preventDefault());
video.addEventListener("click", (e) => { e.preventDefault(); e.stopPropagation(); }, true);

