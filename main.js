const song = document.querySelector('.song'),
  video = document.querySelector('.vid-container video'),
  play = document.querySelector('.play'),
  replay = document.querySelector('.replay'),
  outline = document.querySelector('.moving-outline circle'),
  forwardRight = document.querySelector('.forward-right');

//Sounds
const sounds = document.querySelectorAll('.sound-picker button');

//Time Display
const timeDisplay = document.querySelector('.time-display');
const outlineLength = outline.getTotalLength();

//Duration
const timeSelect = document.querySelectorAll('.time-select button');
let timeDuration = 600;

outline.style.strokeDashoffset = outlineLength;
outline.style.strokeDasharray = outlineLength;

timeDisplay.textContent = `${Math.floor(timeDuration / 60)}:${plusZero(
  Math.floor(timeDuration % 60)
)}`;

sounds.forEach((sound) => {
  sound.addEventListener('click', function () {
    song.src = this.getAttribute('data-sound');
    video.src = this.getAttribute('data-video');
    checkPlaying(song);
  });
});

play.addEventListener('click', function () {
  checkPlaying(song);
});

replay.addEventListener('click', function () {
  restartSong(song);
});

const restartSong = (song) => {
  song.currentTime = 0;
};

timeSelect.forEach((valueTime) => {
  valueTime.addEventListener('click', function () {
    timeDuration = this.getAttribute('data-time');
    timeDisplay.textContent = `${Math.floor(timeDuration / 60)}:${plusZero(
      Math.floor(timeDuration % 60)
    )}`;
    restartSong(song);
  });
  
});

const checkPlaying = (song) => {
  if (song.paused) {
    song.play();
    video.play();
    play.src = './svg/pause.svg';
  } else {
    song.pause();
    video.pause();
    play.src = './svg/play.svg';
  }
};

function plusZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

song.ontimeupdate = function () {
  getCurrentTime();
  displayProgress();

  if (currentTime > timeDuration) {
    song.pause();
    song.currentTime = 0;
    play.src = './svg/play.svg';
    video.pause();
  }
};

function getCurrentTime() {
  currentTime = song.currentTime;
}
function displayProgress() {
  let timePassed = timeDuration - currentTime;
  let seconds = plusZero(Math.floor(timePassed % 60));
  let minuts = Math.floor(timePassed / 60);
  timeDisplay.textContent = `${minuts}:${seconds}`;
  let progress = outlineLength * (1 - currentTime / timeDuration);
  outline.style.strokeDashoffset = progress;
}

forwardRight.addEventListener('click', function () {
  if (timeDuration - currentTime < 10) {
    song.currentTime = timeDuration;
    currentTime = song.currentTime;
      song.pause();
      play.src = './svg/play.svg';
      video.pause();
      checkPlaying(song);
  } else {
    song.currentTime += 10;
    currentTime = song.currentTime;
  }
});
