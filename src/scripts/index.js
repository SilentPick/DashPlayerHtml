import '../styles/index.css';

let vid, playBtn, seekSlider, curTimeText, durTimeText, muteBtn, fullScreenBtn, volumeSlider;
let isVideoNowFullscreen = false
const video_player_box = document.querySelector(".video_player_box");
function intializePlayer() {
    if (typeof (window.MediaSource || window.WebKitMediaSource) === "function") {
        vid = document.getElementById("my_video");
        playBtn = document.getElementById("playPauseBtn");
        seekSlider = document.getElementById("seekSlider");
        curTimeText = document.getElementById("curTimeText");
        durTimeText = document.getElementById("durTimeText");
        muteBtn = document.getElementById("muteBtn");
        volumeSlider = document.getElementById("volumeSlider");
        fullScreenBtn = document.getElementById("fullScreenBtn")
        // Add event listeners
        playBtn.addEventListener("click", playPause, false);
        seekSlider.addEventListener("change", vidSeek, false);
        vid.addEventListener("timeupdate", seekTimeUpdate, false);
        muteBtn.addEventListener("click", vidMute, false);
        volumeSlider.addEventListener("change", setVolume, false);
        fullScreenBtn.addEventListener("click", toggleFullScreen, false);

    } else {
        const unsupportedDOM = document.querySelector(".unsupported");
        unsupportedDOM.classList.add("is-show");

        video_player_boxDOM.classList.add("is-hide");
    }
}

document.addEventListener("DOMContentLoaded", intializePlayer);

function playPause() {
    if (vid.paused) {
        vid.play();
        playBtn.innerHTML = "Pause";
    } else {
        vid.pause();
        playBtn.innerHTML = "Play";
    }
}

function vidSeek() {
    let seekto = vid.duration * (seekSlider.value / 100);
    vid.currentTime = seekto;
}

function seekTimeUpdate() {
    let nt = vid.currentTime * (100 / vid.duration);
    seekSlider.value = nt;
    let curmins = Math.floor(vid.currentTime / 60);
    let cursecs = Math.floor(vid.currentTime - curmins * 60);
    let durmins = Math.floor(vid.duration / 60);
    let dursecs = Math.floor(vid.duration - durmins * 60);
    if (cursecs < 10) {
        cursecs = "0" + cursecs;
    }
    if (dursecs < 10) {
        dursecs = "0" + dursecs;
    }
    if (curmins < 10) {
        curmins = "0" + curmins;
    }
    if (durmins < 10) {
        durmins = "0" + durmins;
    }
    curTimeText.innerHTML = curmins + ":" + cursecs;
    durTimeText.innerHTML = durmins + ":" + dursecs;
}

function vidMute() {
    if (vid.muted) {
        vid.muted = false;
        muteBtn.innerHTML = "Mute";
    } else {
        vid.muted = true;
        muteBtn.innerHTML = "Unmute";
    }
}

function setVolume() {
    vid.volume = volumeSlider.value / 100;
}



function toggleFullScreen() {
    console.log('function toggleFullScreen called')

    if (!(isVideoNowFullscreen)) {
        if (video_player_box.requestFullScreen){
            video_player_box.requestFullScreen();
        } else if (video_player_box.webkitRequestFullScreen) {
            video_player_box.webkitRequestFullScreen();
        } else if (video_player_box.mozRequestFullScreen) {
            video_player_box.mozRequestFullScreen();

        }
    } else {
        if (video_player_box.exitFullscreen) {
            video_player_box.exitFullscreen();
        } else if (video_player_box.mozCancelFullScreen) {
            video_player_box.mozCancelFullScreen();
        } else if (video_player_box.webkitExitFullscreen) {
            video_player_box.webkitExitFullscreen();
        }
    }


isVideoNowFullscreen = !isVideoNowFullscreen;
}
