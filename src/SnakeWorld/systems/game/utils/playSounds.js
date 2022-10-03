// I don't think this is used by anything...

const soundsPlayer = document.createElement("audio");

const musicPlayer = document.createElement("audio");

function playSounds(src, unmuted) {
  soundsPlayer.src = src;
  soundsPlayer.volume = 0.2;
  if (unmuted) {
    soundsPlayer.play();
  }
}

function playMusic(src, unmuted) {
  musicPlayer.src = src;
  if (unmuted) {
    musicPlayer.play();
  }
}

function muteSounds() {
  soundsPlayer.muted = true;
  musicPlayer.muted = true;
}

function unmuteSounds() {
  soundsPlayer.muted = false;
  musicPlayer.muted = false;
}

export { playSounds, playMusic, muteSounds, unmuteSounds };
