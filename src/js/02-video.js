import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');
const iframePlayer = new Player(iframe);
let currentTime;
const trottleTimeupdatePlayer = throttle(onTimeupdate, 1000);
iframePlayer.on('timeupdate', trottleTimeupdatePlayer);
function onTimeupdate(e) {
  currentTime = e.seconds;
  localStorage.setItem('videoplayer-current-time', currentTime);
}

const savedTime = localStorage.getItem('videoplayer-current-time');

if (savedTime) {
  iframePlayer.setCurrentTime(savedTime);
}
