document.addEventListener('DOMContentLoaded', function() {
    
    // Get all window elements
    const windows = document.querySelectorAll('.window');
    const revealAllBtn = document.getElementById('revealAllBtn');
    const hideAllBtn = document.getElementById('hideAllBtn');
    
    windows.forEach(window => {
        // Add mouseenter event
        window.addEventListener('mouseenter', function() {
            this.classList.add('active');
            playHoverSound();
        });
        
        // Add mouseleave event
        window.addEventListener('mouseleave', function() {
            // Remove active class
            this.classList.remove('active');
        });
        
        window.addEventListener('click', function(e) {
            if (e.target.classList.contains('control-btn')) return;
            
            this.classList.toggle('force-open');
            if (this.classList.contains('force-open')) {
                const revealContent = this.querySelector('.reveal-content');
                revealContent.style.opacity = '1';
                revealContent.style.transform = 'scale(1)';
                revealContent.style.zIndex = '3';
                const windowId = this.id;
                switch(windowId) {
                    case 'window1':
                        revealContent.style.clipPath = 'circle(100% at 50% 50%)';
                        break;
                    case 'window2':
                        revealContent.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%, 0 100%)';
                        break;
                    case 'window3':
                        revealContent.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%, 0 100%)';
                        break;
                    case 'window4':
                        revealContent.style.transform = 'translateX(0)';
                        break;
                    case 'window5':
                        revealContent.style.opacity = '1';
                        break;
                }
            } else {
                // Reset styles when toggling off
                const revealContent = this.querySelector('.reveal-content');
                revealContent.style = '';
            }
        });
    });
    
    // Reveal all windows button
    revealAllBtn.addEventListener('click', function() {
        windows.forEach(window => {
            window.classList.add('force-open');
            const revealContent = window.querySelector('.reveal-content');
            revealContent.style.opacity = '1';
            revealContent.style.transform = 'scale(1)';
            revealContent.style.zIndex = '3';
            
            const windowId = window.id;
            switch(windowId) {
                case 'window1':
                    revealContent.style.clipPath = 'circle(100% at 50% 50%)';
                    break;
                case 'window2':
                    revealContent.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%, 0 100%)';
                    break;
                case 'window3':
                    revealContent.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%, 0 100%)';
                    break;
                case 'window4':
                    revealContent.style.transform = 'translateX(0)';
                    break;
                case 'window5':
                    revealContent.style.opacity = '1';
                    break;
            }
        });
        
        // Show a temporary message
        showMessage('All windows revealed!');
    });
    
    // Hide all windows button
    hideAllBtn.addEventListener('click', function() {
        windows.forEach(window => {
            window.classList.remove('force-open');
            const revealContent = window.querySelector('.reveal-content');
            revealContent.style = '';
        });
        
        // Show a temporary message
        showMessage('All windows hidden!');
    });
    
    function playHoverSound() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = 800;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
        } catch (e) {
        }
    }
    
    function showMessage(text) {
        // Remove existing message if any
        const existingMessage = document.querySelector('.temp-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create new message element
        const message = document.createElement('div');
        message.className = 'temp-message';
        message.textContent = text;
        message.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(67, 97, 238, 0.9);
            color: white;
            padding: 12px 24px;
            border-radius: 50px;
            font-weight: 600;
            z-index: 1000;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            animation: fadeInOut 2s ease-in-out;
        `;
        
        // Add CSS for animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeInOut {
                0% { opacity: 0; top: 0px; }
                10% { opacity: 1; top: 20px; }
                90% { opacity: 1; top: 20px; }
                100% { opacity: 0; top: 0px; }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(message);
        
        // Remove message after animation
        setTimeout(() => {
            if (message.parentNode) {
                message.remove();
            }
            if (style.parentNode) {
                style.remove();
            }
        }, 2000);
    }
    
    // Check if the image file exists and show a message if not
    function checkImage() {
        const img = new Image();
        img.src = 'roy.jpeg';
        
        img.onload = function() {
            console.log('Image roy.jpeg loaded successfully');
        };
        
        img.onerror = function() {
            showMessage('Note: roy.jpeg not found. Using placeholder image.');
        };
    }
    
     // run image without delay
    setTimeout(checkImage, 1000);
    
    // Add some initial animation to the windows
    setTimeout(() => {
        windows.forEach((window, index) => {
            window.style.opacity = '0';
            window.style.transform = 'translateY(20px)';
            
            // Stagger the animation
            setTimeout(() => {
                window.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                window.style.opacity = '1';
                window.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }, 300);
});