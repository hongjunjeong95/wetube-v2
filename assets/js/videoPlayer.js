import getBlobDuration from 'get-blob-duration';

const videoContainer = document.getElementById('jsVideoPlayer');
const videoPlayer = document.querySelector('#jsVideoPlayer video');
const playBtn = document.getElementById('jsPlayBtn');
const volumeBtn = document.getElementById('jsVolumeBtn');
const volumeRange = document.getElementById('jsVolumeRange');
const fullScreen = document.getElementById('jsFullScreen');
const currentTime = document.getElementById('jsCurrentTime');
const totalTime = document.getElementById('jsTotalTime');
const progress = document.getElementById('jsProgress');
const progressBar = document.getElementById('jsProgressBar');

let fullScrnCheck = 0;
let mousedown = false;

const handlePlayClick = () => {
  if (videoPlayer.paused) {
    videoPlayer.play();
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    videoPlayer.pause();
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
  }
};

const handleVolumeClick = () => {
  if (videoPlayer.muted) {
    videoPlayer.muted = false;
    volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    volumeRange.value = videoPlayer.volume;
  } else {
    videoPlayer.muted = true;
    volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    volumeRange.value = 0;
  }
};

const handleVolumeRange = (event) => {
  const {
    target: { value },
  } = event;
  videoPlayer.volume = value;
  if (value >= 0.7) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
  } else if (value >= 0.4) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
  } else if (value >= 0.1) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-off"></i>';
  } else {
    volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
  }
};

const goFullScreen = () => {
  if (videoContainer.requestFullscreen) {
    videoContainer.requestFullscreen();
  }
  fullScreen.innerHTML = '<i class="fas fa-compress"></i>';
  fullScreen.removeEventListener('click', goFullScreen);
  fullScreen.addEventListener('click', exitFullScreen);
  videoContainer.removeEventListener('dblclick', goFullScreen);
  videoContainer.addEventListener('dblclick', exitFullScreen);
  fullScrnCheck = 1;
};

const exitFullScreen = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  }
  fullScreen.innerHTML = '<i class="fas fa-expand"></i>';
  fullScreen.removeEventListener('click', exitFullScreen);
  fullScreen.addEventListener('click', goFullScreen);
  videoContainer.removeEventListener('dblclick', exitFullScreen);
  videoContainer.addEventListener('dblclick', goFullScreen);
  fullScrnCheck = 0;
};

const handleKeydown = (event) => {
  if (event.which === 32) {
    handlePlayClick();
  } else if (event.which === 70) {
    if (!fullScrnCheck) {
      goFullScreen();
      fullScrnCheck = 1;
    } else if (fullScrnCheck) {
      exitFullScreen();
      fullScrnCheck = 0;
    }
  } else if (event.which === 77) {
    handleVolumeClick();
  }
};

const preventSpaceScroll = (event) => {
  if (event.keyCode === 32 && event.target === document.body) {
    event.preventDefault();
  }
};

const formatDate = (duration) => {
  const fullMinutes = Math.floor(duration / 60);
  const fullHours = Math.floor(fullMinutes / 60);
  let seconds = Math.floor(duration % 60);
  let minutes = fullMinutes % 60;
  let hours = fullHours % 24;

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  return `${hours}:${minutes}:${seconds}`;
};

const formatProgress = (duration) => {
  const fullMinutes = Math.floor(duration / 60);
  const fullHours = Math.floor(fullMinutes / 60);
  let seconds = Math.floor(duration % 60);
  let minutes = fullMinutes % 60;
  let hours = fullHours / 24;

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  return `${hours}:${minutes}:${seconds}`;
};

const getCurrentTime = () => {
  currentTime.innerHTML = formatDate(videoPlayer.currentTime);
};

const setTotalTime = async () => {
  const duration = await getBlobDuration(videoPlayer.src);
  const totalTimeString = formatDate(duration);
  totalTime.innerHTML = totalTimeString;
  setInterval(getCurrentTime, 1000);
};

const handleProgress = () => {
  const percent = (videoPlayer.currentTime / videoPlayer.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
};

const scrub = (event) => {
  console.log('event.offsetX: ', event.offsetX);
  console.log('progress.offsetWidth: ', progress.offsetWidth);
  const scrubTime =
    (event.offsetX / progress.offsetWidth) * videoPlayer.duration;
  videoPlayer.currentTime = scrubTime;
};

const init = () => {
  playBtn.addEventListener('click', handlePlayClick);
  videoPlayer.addEventListener('click', handlePlayClick);
  volumeBtn.addEventListener('click', handleVolumeClick);
  volumeRange.addEventListener('input', handleVolumeRange);
  fullScreen.addEventListener('click', goFullScreen);
  videoContainer.addEventListener('dblclick', goFullScreen);
  videoPlayer.addEventListener('mouseover keydown', handleKeydown);
  document.addEventListener('keydown', handleKeydown);
  window.addEventListener('keydown', preventSpaceScroll);
  setTotalTime();

  // Video progress
  videoPlayer.addEventListener('timeupdate', handleProgress);
  progress.addEventListener('click', scrub);
  videoContainer.addEventListener('mousemove', (event) => {
    mousedown && scrub(event);
  });
  progress.addEventListener('mousedown', () => (mousedown = true));
  videoContainer.addEventListener('mousedown', () => (mousedown = true));

  progress.addEventListener('mouseup', () => (mousedown = false));
  videoContainer.addEventListener('mouseup', () => (mousedown = false));
};

if (videoContainer) {
  init();
}
