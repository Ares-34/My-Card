const particlesCanvas = document.getElementById('particles-canvas');
const rainCanvas = document.getElementById('rain-canvas');
const snowCanvas = document.getElementById('snow-canvas');

const particlesCtx = particlesCanvas.getContext('2d');
const rainCtx = rainCanvas.getContext('2d');
const snowCtx = snowCanvas.getContext('2d');

let currentEffect = 'particles';
const availableEffects = ['particles', 'rain', 'snow', 'none'];

function resizeCanvas() {
    particlesCanvas.width = rainCanvas.width = snowCanvas.width = window.innerWidth;
    particlesCanvas.height = rainCanvas.height = snowCanvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
    constructor() {
        this.x = Math.random() * particlesCanvas.width;
        this.y = Math.random() * particlesCanvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > particlesCanvas.width) this.x = 0;
        if (this.x < 0) this.x = particlesCanvas.width;
        if (this.y > particlesCanvas.height) this.y = 0;
        if (this.y < 0) this.y = particlesCanvas.height;
    }

    draw() {
        particlesCtx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        particlesCtx.beginPath();
        particlesCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        particlesCtx.fill();
    }
}

const particles = [];
for (let i = 0; i < 100; i++) {
    particles.push(new Particle());
}

function animateParticles() {
    particlesCtx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    if (currentEffect === 'particles') {
        requestAnimationFrame(animateParticles);
    }
}

class RainDrop {
    constructor() {
        this.x = Math.random() * rainCanvas.width;
        this.y = Math.random() * rainCanvas.height - rainCanvas.height;
        this.speed = Math.random() * 10 + 5;
        this.length = Math.random() * 20 + 10;
    }

    update() {
        this.y += this.speed;
        if (this.y > rainCanvas.height) {
            this.y = -this.length;
            this.x = Math.random() * rainCanvas.width;
        }
    }

    draw() {
        rainCtx.strokeStyle = 'rgba(174, 194, 224, 0.5)';
        rainCtx.lineWidth = 1;
        rainCtx.beginPath();
        rainCtx.moveTo(this.x, this.y);
        rainCtx.lineTo(this.x, this.y + this.length);
        rainCtx.stroke();
    }
}

const rainDrops = [];
for (let i = 0; i < 200; i++) {
    rainDrops.push(new RainDrop());
}

function animateRain() {
    rainCtx.clearRect(0, 0, rainCanvas.width, rainCanvas.height);
    rainDrops.forEach(drop => {
        drop.update();
        drop.draw();
    });
    if (currentEffect === 'rain') {
        requestAnimationFrame(animateRain);
    }
}

class SnowFlake {
    constructor() {
        this.x = Math.random() * snowCanvas.width;
        this.y = Math.random() * snowCanvas.height - snowCanvas.height;
        this.size = Math.random() * 3 + 1;
        this.speed = Math.random() * 1 + 0.5;
        this.drift = Math.random() * 0.5 - 0.25;
    }

    update() {
        this.y += this.speed;
        this.x += this.drift;
        if (this.y > snowCanvas.height) {
            this.y = -this.size;
            this.x = Math.random() * snowCanvas.width;
        }
    }

    draw() {
        snowCtx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        snowCtx.beginPath();
        snowCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        snowCtx.fill();
    }
}

const snowFlakes = [];
for (let i = 0; i < 150; i++) {
    snowFlakes.push(new SnowFlake());
}

function animateSnow() {
    snowCtx.clearRect(0, 0, snowCanvas.width, snowCanvas.height);
    snowFlakes.forEach(flake => {
        flake.update();
        flake.draw();
    });
    if (currentEffect === 'snow') {
        requestAnimationFrame(animateSnow);
    }
}

function setEffect(effect) {
    currentEffect = effect;
    
    particlesCanvas.style.display = 'none';
    rainCanvas.style.display = 'none';
    snowCanvas.style.display = 'none';

    document.querySelectorAll('.effect-option').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.effect === effect) {
            btn.classList.add('active');
        }
    });

    switch(effect) {
        case 'particles':
            particlesCanvas.style.display = 'block';
            animateParticles();
            break;
        case 'rain':
            rainCanvas.style.display = 'block';
            animateRain();
            break;
        case 'snow':
            snowCanvas.style.display = 'block';
            animateSnow();
            break;
        case 'none':
            break;
    }
}

function cycleEffect(button) {
    let randomEffect;
    do {
        randomEffect = availableEffects[Math.floor(Math.random() * availableEffects.length)];
    } while (randomEffect === currentEffect && availableEffects.length > 1);
    
    setEffect(randomEffect, button);
}

document.addEventListener('DOMContentLoaded', function() {
    const effectButton = document.getElementById('effect-btn');
    const effectDropdown = document.getElementById('effect-dropdown');
    
    if (effectButton && effectDropdown) {
        effectButton.addEventListener('click', function(e) {
            e.stopPropagation();
            effectDropdown.classList.toggle('show');
        });
        
        document.addEventListener('click', function(e) {
            if (!effectButton.contains(e.target) && !effectDropdown.contains(e.target)) {
                effectDropdown.classList.remove('show');
            }
        });
        
        document.querySelectorAll('.effect-option').forEach(option => {
            option.addEventListener('click', function(e) {
                e.stopPropagation();
                const effect = this.dataset.effect;
                setEffect(effect);
                effectDropdown.classList.remove('show');
            });
        });
    }
});

animateParticles();
