document.addEventListener("DOMContentLoaded", function () {
    const video = document.getElementById("background-video");
    if (video) {
      setTimeout(() => {
        video.play();
        video.classList.add("playing");
      }, 11000); // 8.7 seconds
    }
  });

  console.log(6+9); // 15