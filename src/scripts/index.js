import '../styles/index.css';

let vid, playPauseBtn, seekSlider, curTimeText, durTimeText,  muteUnmuteBtn, fullScreen, volumeSlider;
let isVideoNowFullscreen = false;

const video_player_box = document.querySelector(".video_player_box");

function intializePlayer() {
    if (typeof (window.MediaSource || window.WebKitMediaSource) === "function") {
        playPauseBtn = document.querySelector(".playPauseBtn");
        muteUnmuteBtn = document.querySelector(".muteUnmuteBtn");
        fullScreen = document.querySelector(".fullScreen");

        vid = document.getElementById("my_video");
        seekSlider = document.getElementById("seekSlider");
        curTimeText = document.getElementById("curTimeText");
        durTimeText = document.getElementById("durTimeText");
        volumeSlider = document.getElementById("volumeSlider");

        playPauseBtn.addEventListener("click", playPause, false);
        seekSlider.addEventListener("change", vidSeek, false);
        vid.addEventListener("timeupdate", seekTimeUpdate, false);
        muteUnmuteBtn.addEventListener("click", vidMute, false);
        volumeSlider.addEventListener("change", setVolume, false);
        fullScreen.addEventListener("click", toggleFullScreen, false);
    } else {
        const unsupportedDOM = document.querySelector(".unsupported");
        unsupportedDOM.classList.add("is-show");
        video_player_box.classList.add("is-hide");
    }
}

document.addEventListener("DOMContentLoaded", intializePlayer);

function playPause() {
    if (vid.paused) {
        vid.play();
        playPauseBtn.classList.add("is-play");
    } else {
        vid.pause();
        playPauseBtn.classList.remove("is-play");
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
        muteUnmuteBtn.classList.add("is-mute");
    } else {
        vid.muted = true;
        muteUnmuteBtn.classList.remove("is-mute");
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
            fullScreen.classList.remove("is-full");
        } else if (video_player_box.webkitRequestFullScreen) {
            video_player_box.webkitRequestFullScreen();
            fullScreen.classList.remove("is-full");
        } else if (video_player_box.mozRequestFullScreen) {
            video_player_box.mozRequestFullScreen();
            fullScreen.classList.remove("is-full");
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
            fullScreen.classList.add("is-full");
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
            fullScreen.classList.add("is-full");
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
            fullScreen.classList.add("is-full");
        }
    }
isVideoNowFullscreen = !isVideoNowFullscreen;
}
