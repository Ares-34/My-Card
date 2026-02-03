// Modern Music Player - Simple & Beautiful
const audio = document.getElementById('audio');
const playBtn = document.getElementById('play-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const progress = document.getElementById('progress');
const progressBar = document.getElementById('progress-bar');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const trackTitle = document.getElementById('track-title');
const trackArtist = document.getElementById('track-artist');
const volumeSlider = document.getElementById('volume-slider');
const volumeIcon = document.getElementById('volume-icon');

// Music tracks
const tracks = [
    { title: "Summer's End", artist: "Reze Arc OST", src: "music/30. the city mouse and the country mouse - REZE ARC original soundtrack -summers end-.mp3" },
    { title: "Hades in the Dead of Winter", artist: "Unknown", src: "music/hades in the dead of winter.mp3" },
    { title: "To Forget (Live)", artist: "Kinoue64", src: "music/kinoue64 - to forget (live).mp3" },
    { title: "Luv(sic) feat. Shing02", artist: "Nujabes", src: "music/Nujabes - Luv(sic) feat.Shing02 [Official Audio].mp3" },
    { title: "PUKE SOMETHING", artist: "Unknown", src: "music/PUKE SOMETHING.mp3" }
];

let currentTrackIndex = Math.floor(Math.random() * tracks.length);
let isPlaying = false;

// Initialize
function init() {
    loadTrack(currentTrackIndex);
    audio.volume = volumeSlider.value / 100;
}

// Load track
function loadTrack(index) {
    const track = tracks[index];
    audio.src = track.src;
    // Format: Title - Artist
    trackTitle.textContent = `${track.title} - ${track.artist}`;
    if (trackArtist) trackArtist.textContent = track.artist;
}

// Play track
function playTrack() {
    audio.play();
    isPlaying = true;
    playBtn.querySelector('i').className = 'fas fa-pause';
}

// Pause track
function pauseTrack() {
    audio.pause();
    isPlaying = false;
    playBtn.querySelector('i').className = 'fas fa-play';
}

// Toggle play/pause
function togglePlay() {
    if (isPlaying) {
        pauseTrack();
    } else {
        playTrack();
    }
}

// Next track
function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    loadTrack(currentTrackIndex);
    if (isPlaying) playTrack();
}

// Previous track
function prevTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    loadTrack(currentTrackIndex);
    if (isPlaying) playTrack();
}

// Update progress bar
function updateProgress() {
    const { duration, currentTime } = audio;
    
    if (duration && !isNaN(duration) && duration > 0) {
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
    }
    
    currentTimeEl.textContent = formatTime(currentTime);
    if (duration) {
        durationEl.textContent = formatTime(duration);
    }
}

// Format time
function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// Set progress
function setProgress(e) {
    const width = progressBar.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

// Update volume icon
function updateVolumeIcon() {
    const volume = audio.volume;
    if (volume === 0) {
        volumeIcon.className = 'fas fa-volume-mute';
    } else if (volume < 0.5) {
        volumeIcon.className = 'fas fa-volume-down';
    } else {
        volumeIcon.className = 'fas fa-volume-up';
    }
}

// Toggle mute
function toggleMute() {
    if (audio.volume > 0) {
        audio.dataset.previousVolume = audio.volume;
        audio.volume = 0;
        volumeSlider.value = 0;
    } else {
        const previousVolume = audio.dataset.previousVolume || 0.7;
        audio.volume = previousVolume;
        volumeSlider.value = previousVolume * 100;
    }
    updateVolumeIcon();
}

// Event listeners
playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', prevTrack);
nextBtn.addEventListener('click', nextTrack);
audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', nextTrack);
progressBar.addEventListener('click', setProgress);
volumeSlider.addEventListener('input', (e) => {
    audio.volume = e.target.value / 100;
    updateVolumeIcon();
});
volumeIcon.addEventListener('click', toggleMute);

// Initialize player
init();
