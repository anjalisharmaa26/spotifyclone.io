console.log("Welcome to Spotify")
let songindex = 0;
let audioElement = new Audio('./Songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let Progressbar = document.getElementById('Progressbar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let Songs = [
    { songName: "Ban Ja Tu Meri Rani", filepath: "./Songs/1.mp3", coverPath: "./Cover/1.jpg" },
    { songName: "Janiye", filepath: "./Songs/2.mp3", coverPath: "./Cover/2.jpg" },
    { songName: "Nain ta Heere", filepath: "./Songs/3.mp3", coverPath: "./Cover/3.jpg" },
    { songName: "Hayye Oye", filepath: "./Songs/4.mp3", coverPath: "./Cover/4.jpg" },
    { songName: "Dheere Dheere", filepath: "./Songs/5.mp3", coverPath: "./Cover/5.jpg" },
    { songName: "Bekhayali", filepath: "./Songs/6.mp3", coverPath: "./Cover/6.jpg" },
    { songName: "Fakira By Sanam", filepath: "./Songs/7.mp3", coverPath: "./Cover/7.jpg" },
    { songName: "Jeene Laga Hu", filepath: "./Songs/8.mp3", coverPath: "./Cover/8.jpg" },
    { songName: "Zara Zara By Jalraj", filepath: "./Songs/9.m4a", coverPath: "./Cover/9.jpg" },
    { songName: "O Mere Sona re", filepath: "./Songs/10.mp3", coverPath: "./Cover/10.jpg" }
]

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = Songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = Songs[i].songName;
});

masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', () => {
    // console.log('timeupdate');
    Progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    // console.log(Progress);
    Progressbar.value = Progress;
})

Progressbar.addEventListener('change', () => {
    audioElement.currentTime = Progressbar.value * audioElement.duration / 100;
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.add('fa-circle-play')
        element.classList.remove('fa-circle-pause')
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        if (e.target.classList.contains('fa-circle-play')) {
            makeAllPlays();
            songindex = parseInt(e.target.id);
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            audioElement.src = `./Songs/${songindex + 1}.mp3`;
            masterSongName.innerText = Songs[songindex].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
        }
        else {
            e.target.classList.remove('fa-circle-pause');
            e.target.classList.add('fa-circle-play');
            audioElement.currentTime = 1;
            audioElement.pause();
            gif.style.opacity = 0;
            masterPlay.classList.add('fa-circle-play');
            masterPlay.classList.remove('fa-circle-pause');
        }
    });
});

document.getElementById('next').addEventListener('click', () => {
    if (songindex >= 9) {
        songindex = 0;
    }
    else {
        songindex += 1;
    }
    audioElement.src = `./Songs/${songindex + 1}.mp3`;
    masterSongName.innerText = Songs[songindex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.add('fa-circle-play');
    masterPlay.classList.remove('fa-circle-pause');
})

document.getElementById('previous').addEventListener('click', () => {
    if (songindex <= 0) {
        songindex = 0;
    }
    else {
        songindex -= 1;
    }
    audioElement.src = `./Songs/${songindex + 1}.mp3`;
    masterSongName.innerText = Songs[songindex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.add('fa-circle-play');
    masterPlay.classList.remove('fa-circle-pause');
})