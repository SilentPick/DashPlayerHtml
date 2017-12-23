import '../styles/index.css';
import Hls from 'hls.js';

let vids, playPauseBtns, seekSliders, volumeSliders, BtnFormatDashDOM, BtnFormatHlsDOM, seekSlider, muteUnmuteBtns, fullScreens, jsFormatHls, jsFormatDash,  volumeSlider;
let isVideoNowFullscreen = false;

const video_player_box = document.querySelector(".video_player_box");

function intializePlayer() {

    BtnFormatDashDOM = document.querySelector(".BtnFormatDash");
    BtnFormatHlsDOM = document.querySelector(".BtnFormatHls");

    if (Hls.isSupported() || typeof (window.MediaSource || window.WebKitMediaSource) === "function") {

        playPauseBtns = document.querySelectorAll(".playPauseBtn");
        muteUnmuteBtns = document.querySelectorAll(".muteUnmuteBtn");
        fullScreens = document.querySelectorAll(".fullScreen");
        vids = document.querySelectorAll(".my_video");
        seekSliders = document.querySelectorAll(".seekSlider");
        volumeSliders = document.querySelectorAll(".volumeSlider");

        jsFormatDash = document.querySelector(".jsFormatDash");
        jsFormatHls = document.querySelector(".jsFormatHls");

        playPauseBtns.forEach(button => button.addEventListener("click", playPause, false));
        seekSliders.forEach(button => button.addEventListener("change", vidSeek, false));
        vids.forEach(button => button.addEventListener("timeupdate", seekTimeUpdate, false));
        muteUnmuteBtns.forEach(button => button.addEventListener("click", vidMute, false));
        volumeSliders.forEach(button => button.addEventListener("input", setVolume, false));
        fullScreens.forEach(button => button.addEventListener("click", toggleFullScreen, false));

        BtnFormatDashDOM.addEventListener("click", BtnFormatDash, false);
        BtnFormatHlsDOM.addEventListener("click", BtnFormatHls, false);

        let video = document.querySelector('.jsFormatHls video');
        let hls = new Hls();
        hls.loadSource('https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8');
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED,function() {
            video.play();
        });

    } else {
        const unsupportedDOM = document.querySelector(".unsupported");
        unsupportedDOM.classList.add("is-show");
        video_player_box.classList.add("is-hide");
        BtnFormatDashDOM.classList.add("is-hide");
        BtnFormatHlsDOM.classList.add("is-hide");
    }
}

document.addEventListener("DOMContentLoaded", intializePlayer);

function playPause(e) {
    console.log(e);
    const currentVideo = e.currentTarget.closest('.video_player_box').querySelector('video');

    if (currentVideo.paused) {
        currentVideo.play();
        e.currentTarget.classList.add("is-play");
    } else {
        currentVideo.pause();
        e.currentTarget.classList.remove("is-play");
    }
}

function vidSeek(e) {
    const currentVideo = e.currentTarget.closest('.video_player_box').querySelector('video');
    const currentSeekSlider = e.currentTarget.closest('.video_player_box').querySelector('.seekSlider');
    let seekto = currentVideo.duration * (currentSeekSlider.value / 100);
    currentVideo.currentTime = seekto;
}

function BtnFormatDash() {
    document.querySelector(".jsFormatHls .playPauseBtn").classList.remove("is-play");
    document.querySelector(".jsFormatHls video").pause();
    jsFormatHls.classList.add("is-hide");
    jsFormatDash.classList.remove("is-hide");
}

function BtnFormatHls() {
    document.querySelector(".jsFormatDash .playPauseBtn").classList.remove("is-play");
    document.querySelector(".jsFormatDash video").pause();
    jsFormatHls.classList.remove("is-hide");
    jsFormatDash.classList.add("is-hide");
}

function seekTimeUpdate(e) {
    const currentSeekSlider = e.currentTarget.closest('.video_player_box').querySelector('.seekSlider');
    const currentVideo = e.currentTarget.closest('.video_player_box').querySelector('video');
    const currentTimeText = e.currentTarget.closest('.video_player_box').querySelector('.curTimeText');
    const durationTimeText = e.currentTarget.closest('.video_player_box').querySelector('.durTimeText');
    let nt = currentVideo.currentTime * (100 / currentVideo.duration);
    currentSeekSlider.value = nt;
    let curmins = Math.floor(currentVideo.currentTime / 60);
    let cursecs = Math.floor(currentVideo.currentTime - curmins * 60);
    let durmins = Math.floor(currentVideo.duration / 60);
    let dursecs = Math.floor(currentVideo.duration - durmins * 60);
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
    currentTimeText.innerHTML = curmins + ":" + cursecs;
    durationTimeText.innerHTML = durmins + ":" + dursecs;
}

function vidMute(e) {
    const currentVideo = e.currentTarget.closest('.video_player_box').querySelector('video');
    if (currentVideo.muted) {
        currentVideo.muted = false;
        e.currentTarget.classList.add("is-mute");
    } else {
        currentVideo.muted = true;
        e.currentTarget.classList.remove("is-mute");
    }
}

function setVolume(e) {
    const currentVideo = e.currentTarget.closest('.video_player_box').querySelector('video');
    const currentSlider = e.currentTarget.closest('.video_player_box').querySelector('.volumeSlider');
    currentVideo.volume = currentSlider.value / 100;
}

function toggleFullScreen(e) {
    console.log('function toggleFullScreen called');
    const currentVideoBox = e.currentTarget.closest('.video_player_box');
    const currentFullScreen = e.currentTarget.closest('.video_player_box').querySelector('.fullScreen');
    if (!(isVideoNowFullscreen)) {
        if (currentVideoBox.requestFullScreen){
            currentVideoBox.requestFullScreen();
            currentFullScreen.classList.remove("is-full");
        } else if (currentVideoBox.webkitRequestFullScreen) {
            currentVideoBox.webkitRequestFullScreen();
            currentFullScreen.classList.remove("is-full");
        } else if (currentVideoBox.mozRequestFullScreen) {
            currentVideoBox.mozRequestFullScreen();
            currentFullScreen.classList.remove("is-full");
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
            currentFullScreen.classList.add("is-full");
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
            currentFullScreen.classList.add("is-full");
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
            currentFullScreen.classList.add("is-full");
        }
    }
isVideoNowFullscreen = !isVideoNowFullscreen;
}
