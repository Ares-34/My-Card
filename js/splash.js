// Splash Screen Handler
document.addEventListener('DOMContentLoaded', function() {
    const splashScreen = document.getElementById('splash-screen');
    const mainContent = document.getElementById('main-content');
    const enterBtn = document.getElementById('enter-btn');
    const audio = document.getElementById('audio');
    
    // Apply saved settings from admin panel
    applyAdminSettings();
    
    // Handle enter button click
    enterBtn.addEventListener('click', function() {
        // Hide splash screen with fade out
        splashScreen.classList.add('hidden');
        
        // Show main content with fade in
        setTimeout(() => {
            mainContent.classList.add('visible');
        }, 100);
        
        // Autoplay music after user interaction (required for browser autoplay policies)
        setTimeout(() => {
            if (audio && typeof playTrack === 'function') {
                playTrack();
            }
        }, 800);
    });
    
    // Keyboard shortcut to admin panel (Ctrl+Shift+A)
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.shiftKey && e.key === 'A') {
            e.preventDefault();
            // Check if admin is enabled before redirecting
            if (typeof ADMIN_ENABLED !== 'undefined' && ADMIN_ENABLED) {
                window.location.href = 'admin.html';
            } else {
                console.log('Admin panel is currently disabled.');
            }
        }
    });
});

// Apply admin settings from localStorage
function applyAdminSettings() {
    // Apply profile title and description
    const profileTitle = localStorage.getItem('profileTitle');
    const profileDescription = localStorage.getItem('profileDescription');
    
    if (profileTitle) {
        const titleElements = document.querySelectorAll('h1');
        titleElements.forEach(el => {
            if (el.textContent.trim() === 'Ares') {
                el.textContent = profileTitle;
            }
        });
        const splashTitle = document.querySelector('.splash-title');
        if (splashTitle && splashTitle.textContent.trim() === 'Ares') {
            splashTitle.textContent = profileTitle;
        }
    }
    
    if (profileDescription) {
        const descElements = document.querySelectorAll('.description, .splash-subtitle');
        descElements.forEach(el => {
            if (el.textContent.trim() === 'welcome to my world') {
                el.textContent = profileDescription;
            }
        });
    }
    
    // Apply default effect
    const defaultEffect = localStorage.getItem('defaultEffect');
    if (defaultEffect) {
        setTimeout(() => {
            // Check if setEffect function is available from effects.js
            if (typeof setEffect === 'function') {
                setEffect(defaultEffect);
            } else {
                console.warn('setEffect function not available yet');
            }
        }, 100);
    }
    
    // Apply video visibility
    const videoEnabled = localStorage.getItem('videoEnabled');
    if (videoEnabled === 'false') {
        const video = document.getElementById('bg-video');
        if (video) {
            video.style.display = 'none';
        }
    }
    
    // Apply social links
    const socialLinks = {
        discord: localStorage.getItem('socialDiscord'),
        instagram: localStorage.getItem('socialInstagram'),
        github: localStorage.getItem('socialGithub'),
        twitter: localStorage.getItem('socialTwitter')
    };
    
    // Update social links using data attributes for reliable mapping
    Object.keys(socialLinks).forEach(platform => {
        if (socialLinks[platform]) {
            const link = document.querySelector(`a[data-social="${platform}"]`);
            if (link) {
                link.href = socialLinks[platform];
            }
        }
    });
}
