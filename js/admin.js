// Admin Panel JavaScript
// NOTE: This is a CLIENT-SIDE ONLY implementation for a personal portfolio site.
// For production use with sensitive data, implement proper server-side authentication
// with secure session management, encrypted passwords, and token-based auth.

// Check if admin panel is enabled in config
// NOTE: This is a client-side check only and can be bypassed. It's intended as a
// convenience feature for personal sites, not as a security measure.
if (typeof ADMIN_ENABLED !== 'undefined' && !ADMIN_ENABLED) {
    window.location.href = 'index.html';
}

const ADMIN_PASSWORD = 'Ro0oo';

const loginScreen = document.getElementById('login-screen');
const adminPanel = document.getElementById('admin-panel');
const loginForm = document.getElementById('login-form');
const passwordInput = document.getElementById('password-input');
const errorMessage = document.getElementById('error-message');
const logoutBtn = document.getElementById('logout-btn');

if (localStorage.getItem('adminLoggedIn') === 'true') {
    showAdminPanel();
}

loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const password = passwordInput.value;
    
    if (password === ADMIN_PASSWORD) {
        localStorage.setItem('adminLoggedIn', 'true');
        errorMessage.textContent = '';
        showAdminPanel();
    } else {
        errorMessage.textContent = 'Incorrect password. Please try again.';
        passwordInput.value = '';
        passwordInput.focus();
    }
});

function showAdminPanel() {
    loginScreen.style.display = 'none';
    adminPanel.style.display = 'block';
    loadSettings();
}

logoutBtn.addEventListener('click', function() {
    localStorage.removeItem('adminLoggedIn');
    location.reload();
});

function loadSettings() {
    const profileTitle = localStorage.getItem('profileTitle') || 'Ares';
    const profileDesc = localStorage.getItem('profileDescription') || 'welcome to my world';
    document.getElementById('profile-title').value = profileTitle;
    document.getElementById('profile-description').value = profileDesc;
    
    const defaultEffect = localStorage.getItem('defaultEffect') || 'particles';
    const videoEnabled = localStorage.getItem('videoEnabled') !== 'false';
    document.getElementById('default-effect').value = defaultEffect;
    document.getElementById('video-enabled').checked = videoEnabled;
    
    const socialDiscord = localStorage.getItem('socialDiscord') || 'https://discord.com/users/669540654732279837';
    const socialGithub = localStorage.getItem('socialGithub') || 'https://github.com/Ares-34';
    const socialRoblox = localStorage.getItem('socialRoblox') || 'https://www.roblox.com/fr/users/9589396/profile';
    const socialSteam = localStorage.getItem('socialSteam') || 'https://steamcommunity.com/id/Apnk34';
    
    document.getElementById('social-discord').value = socialDiscord;
    document.getElementById('social-github').value = socialGithub;
    document.getElementById('social-roblox').value = socialRoblox;
    document.getElementById('social-steam').value = socialSteam;
}

document.getElementById('save-profile-btn').addEventListener('click', function() {
    const title = document.getElementById('profile-title').value;
    const description = document.getElementById('profile-description').value;
    
    localStorage.setItem('profileTitle', title);
    localStorage.setItem('profileDescription', description);
    
    showSuccessMessage('Profile settings saved successfully!');
});

document.getElementById('save-effects-btn').addEventListener('click', function() {
    const defaultEffect = document.getElementById('default-effect').value;
    const videoEnabled = document.getElementById('video-enabled').checked;
    
    localStorage.setItem('defaultEffect', defaultEffect);
    localStorage.setItem('videoEnabled', videoEnabled);
    
    showSuccessMessage('Effect settings saved successfully!');
});

document.getElementById('save-social-btn').addEventListener('click', function() {
    const discord = document.getElementById('social-discord').value;
    const github = document.getElementById('social-github').value;
    const roblox = document.getElementById('social-roblox').value;
    const steam = document.getElementById('social-steam').value;
    
    localStorage.setItem('socialDiscord', discord);
    localStorage.setItem('socialGithub', github);
    localStorage.setItem('socialRoblox', roblox);
    localStorage.setItem('socialSteam', steam);
    
    showSuccessMessage('Social links saved successfully!');
});

const playlistManager = document.getElementById('playlist-manager');

playlistManager.addEventListener('click', function(e) {
    const button = e.target.closest('.btn-icon');
    if (!button) return;
    
    const playlistItem = button.closest('.playlist-item');
    if (!playlistItem) return;
    
    const isUpButton = button.title === 'Move Up';
    const isDownButton = button.title === 'Move Down';
    
    if (isUpButton) {
        const prev = playlistItem.previousElementSibling;
        if (prev) {
            playlistManager.insertBefore(playlistItem, prev);
            showSuccessMessage('Playlist order updated!');
        }
    } else if (isDownButton) {
        const next = playlistItem.nextElementSibling;
        if (next) {
            playlistManager.insertBefore(next, playlistItem);
            showSuccessMessage('Playlist order updated!');
        }
    }
});

function showSuccessMessage(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.style.animation = 'slideIn 0.3s ease-out reverse';
        setTimeout(() => {
            successDiv.remove();
        }, 300);
    }, 2500);
}

console.log('%c💡 Admin Panel Tip', 'color: #4a9eff; font-size: 16px; font-weight: bold;');
console.log('%cPress Ctrl+Shift+A on the main page to quickly access the admin panel!', 'color: #888; font-size: 12px;');
