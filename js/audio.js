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
const playlistBtn = document.getElementById('playlist-btn');
const playlistContainer = document.getElementById('playlist-container');
const playlistList = document.getElementById('playlist-list');


// Music tracks
const tracks = [
    { title: "Amoureux (Last Kiss)", artist: "Artist", src: "music/Amoureux (Last Kiss).mp3" },
    { title: "COP.OSLM", artist: "Artist", src: "music/COP.OSLM.mp3" },
    { title: "KONiEUR & Omar", artist: "Artist", src: "music/KONiEUR&Omar.mp3" },
    { title: "Kobalad", artist: "Artist", src: "music/Kobalad.mp3" },
    { title: "Leto Mozart Capitaine Jackson", artist: "Artist", src: "music/LetoMozartCapitaineJackson.mp3" },
    { title: "MHD", artist: "MHD", src: "music/MHD.mp3" },
    { title: "Ninho", artist: "Ninho", src: "music/Ninho.mp3" },
    { title: "Niska", artist: "Niska", src: "music/Niska.mp3" }
];

let currentTrackIndex = 0;
let isPlaying = false;

// Initialize
function init() {
    initPlaylist();
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
    updatePlaylistActive();
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

// Playlist Logic
function initPlaylist() {
    playlistList.innerHTML = '';
    tracks.forEach((track, index) => {
        const li = document.createElement('li');
        li.className = 'playlist-item';
        
        li.innerHTML = `
            <i class="fas fa-music"></i>
            <span>${track.title}</span>
        `;
        
        li.addEventListener('click', () => {
            currentTrackIndex = index;
            loadTrack(currentTrackIndex);
            playTrack();
            closePlaylist();
        });
        
        playlistList.appendChild(li);
    });
    updatePlaylistActive();
}

function updatePlaylistActive() {
    const items = playlistList.querySelectorAll('.playlist-item');
    items.forEach((item, index) => {
        const icon = item.querySelector('i');
        if (index === currentTrackIndex) {
            item.classList.add('active');
            if(icon) {
                icon.className = 'fas fa-compact-disc';
                icon.style.animation = 'spin 2s linear infinite';
            }
        } else {
            item.classList.remove('active');
            if(icon) {
                icon.className = 'fas fa-music';
                icon.style.animation = '';
            }
        }
    });
}

function togglePlaylist(e) {
    if (e) e.stopPropagation();
    
    // If show class is present, we are closing it
    if (playlistContainer.classList.contains('show')) {
        closePlaylist();
    } else {
        // Opening
        playlistContainer.style.display = 'flex';
        positionPlaylist(); // Position immediately
        
        // Small delay for transition
        setTimeout(() => {
            playlistContainer.classList.add('show');
        }, 10);
    }
}

function positionPlaylist() {
    const btnRect = playlistBtn.getBoundingClientRect();
    
    // Default width
    const containerWidth = 250;
    
    // Center horizontally relative to button
    let left = btnRect.left + (btnRect.width / 2) - (containerWidth / 2);
    
    // Bounds check
    if (left < 10) left = 10;
    if (left + containerWidth > window.innerWidth - 10) {
        left = window.innerWidth - containerWidth - 10;
    }
    
    // Position above button
    // Ensure we are using viewport coordinates
    const bottom = window.innerHeight - btnRect.top + 15;
    
    // Set styles directly
    playlistContainer.style.position = 'fixed';
    playlistContainer.style.left = left + 'px';
    playlistContainer.style.bottom = bottom + 'px';
    
    // Debug
    // console.log('Positioning playlist at:', left, bottom);
}

function closePlaylist() {
    playlistContainer.classList.remove('show');
    setTimeout(() => {
        playlistContainer.style.display = 'none';
    }, 300);
}

// Close playlist when clicking outside
document.addEventListener('click', (e) => {
    // Check if playlist is open
    if (!playlistContainer.classList.contains('show')) return;
    
    // Check if click is outside container AND outside button
    if (!playlistContainer.contains(e.target) && !playlistBtn.contains(e.target)) {
        closePlaylist();
    }
});

// Update position on resize
window.addEventListener('resize', () => {
    if (playlistContainer.classList.contains('show')) {
        positionPlaylist();
    }
});

// Event listeners
playlistBtn.addEventListener('click', togglePlaylist);
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
