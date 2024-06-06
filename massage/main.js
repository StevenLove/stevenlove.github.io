const songs = [
    "01 Anma Massage",
    "02 Shiatsu",
    "03 Stone Massage",
    "04 Tantric Massage",
    "05 Thai Massage",
    "06 Ayurvedic Massage",
    "07 Balinese Massage",
    "08 Craniosacral Therapy",
    "09 Foot Massage",
    "10 Kum Nye",
    "11 Lymphatic Drainage",
    "12 Swedish Massage",
    "13 Reflexology",
    "14 Myofascial Release"
]
const paths = songs.map(song=>song+".m4a");
const setSource = path => document.getElementById("audioSource").setAttribute("src",path);
const audio = document.getElementById("audio");
const select = document.createElement("select")


const play = () => {
    audio.load();
    audio.play();
}
const getCurrentSongPath = () => document.getElementById("audioSource").getAttribute("src");
const getCurrentSongName = () => pathToSongName(getCurrentSongPath());
const pathToSongName = path => path.slice(0,-4);
const playNextSong = () => {
    let index = songs.findIndex(song=>song==getCurrentSongName());
    ++index;
    if(index >= songs.length) index = 0;
    playSong(paths[index]);
}
const playSong = path => {
    console.log("playing",path);
    setSource(path);play();
    selectOption(pathToSongName(path));
}

const autoplayNextSong = () => {
    audio.addEventListener("ended", playNextSong, false);
}
const selectOption = val => {
    select.value = val
}
const createDropdown = () => {
    select.style.fontSize = "2.5em";
    select.onchange = function(){
        playSong(this.value+".m4a");
    }
    songs.forEach(song=>{
        let option = document.createElement("option");
        option.innerHTML = song;
        select.appendChild(option);
    })
    document.querySelector("body").appendChild(select);
    selectOption(getCurrentSongName())
}
createDropdown();
autoplayNextSong();