document.addEventListener('DOMContentLoaded', function() {
    const splashScreen = document.getElementById('splash-screen');
    const mainContent = document.getElementById('main-content');
    const enterBtn = document.getElementById('enter-btn');
    const audio = document.getElementById('audio');
    
    applyAdminSettings();
    
    enterBtn.addEventListener('click', function() {
        splashScreen.classList.add('hidden');
        
        setTimeout(() => {
            mainContent.classList.add('visible');
        }, 100);
        
        setTimeout(() => {
            if (audio && typeof playTrack === 'function') {
                playTrack();
            }
        }, 800);
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.shiftKey && e.key === 'A') {
            e.preventDefault();
            if (typeof ADMIN_ENABLED !== 'undefined' && ADMIN_ENABLED) {
                window.location.href = 'admin.html';
            } else {
                console.log('Admin panel is currently disabled.');
            }
        }
    });
});

function applyAdminSettings() {
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
    
    const defaultEffect = localStorage.getItem('defaultEffect');
    if (defaultEffect) {
        setTimeout(() => {
            if (typeof setEffect === 'function') {
                setEffect(defaultEffect);
            } else {
                console.warn('setEffect function not available yet');
            }
        }, 100);
    }
    
    const videoEnabled = localStorage.getItem('videoEnabled');
    if (videoEnabled === 'false') {
        const video = document.getElementById('bg-video');
        if (video) {
            video.style.display = 'none';
        }
    }
    
    const socialLinks = {
        discord: localStorage.getItem('socialDiscord'),
        instagram: localStorage.getItem('socialInstagram'),
        github: localStorage.getItem('socialGithub'),
        twitter: localStorage.getItem('socialTwitter')
    };
    
    Object.keys(socialLinks).forEach(platform => {
        if (socialLinks[platform]) {
            const link = document.querySelector(`a[data-social="${platform}"]`);
            if (link) {
                link.href = socialLinks[platform];
            }
        }
    });
}
