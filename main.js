const song = document.querySelector(".song"),
        video = document.querySelector(".vid-container video"),
        play = document.querySelector(".play"),
        replay = document.querySelector(".replay"),
        outline = document.querySelector(".moving-outline circle");

//Sounds
const sounds = document.querySelectorAll(".sound-picker button");

//Time Display
const timeDisplay = document.querySelector(".time-display");
const outlineLength = outline.getTotalLength();

//Duration
const timeSelect = document.querySelectorAll(".time-select button");
let timeDuration = 600;

outline.style.strokeDashoffset = outlineLength;
outline.style.strokeDasharray = outlineLength;

timeDisplay.textContent = `${Math.floor(timeDuration / 60)}:${plusZero(Math.floor(
    timeDuration % 60)
  )}`;

sounds.forEach(sound => {
  sound.addEventListener("click", function(){
    song.src = this.getAttribute("data-sound");
    video.src = this.getAttribute("data-video");
    checkPlaying(song);
  });
});

play.addEventListener("click", function(){
  checkPlaying(song);
});

replay.addEventListener("click", function(){
  restartSong(song);
});

const restartSong = song => {
  song.currentTime = 0;
};

timeSelect.forEach(valueTime => {
  valueTime.addEventListener("click", function(){
    timeDuration = this.getAttribute("data-time");
    timeDisplay.textContent = `${Math.floor(timeDuration / 60)}:${plusZero(Math.floor(timeDuration % 60))}`;
  });
});

const checkPlaying = song => {
  if (song.paused){
    song.play();
    video.play();
    play.src = "./svg/pause.svg";
  } else {
    song.pause();
    video.pause();
    play.src = "./svg/play.svg";
  }
};

function plusZero (n) {
  return (parseInt(n, 10) < 10 ? "0" : "") + n;
}

song.ontimeupdate  = function () {
  let currentTime = song.currentTime;
  let timePassed = timeDuration - currentTime;
  let seconds = plusZero(Math.floor(timePassed % 60));

  let minuts = Math.floor(timePassed / 60);
  timeDisplay.textContent  = `${minuts}:${seconds}`;
  let progress = outlineLength * (1- currentTime/timeDuration);
  outline.style.strokeDashoffset = progress;

  if(currentTime >= timeDuration){
    song.pause();
    song.currentTime = 0;
    play.src = "./svg/play.svg"
    video.pause();
  }
};

