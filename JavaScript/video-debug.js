// Video debug helper - checks for issues with video functionality
console.log("Video debug script loaded");

document.addEventListener('DOMContentLoaded', function() {
    const videoPlayBtn = document.querySelector('.video-play-btn');
    const video = document.getElementById('showcase-video');
    const playIcon = document.querySelector('.play-icon');
    const pauseIcon = document.querySelector('.pause-icon');
    
    if (videoPlayBtn && video) {
        console.log("Video and play button found");
        console.log("Play icon found:", !!playIcon);
        console.log("Pause icon found:", !!pauseIcon);
        
        // Log computed styles for debugging centering issues
        if (playIcon && pauseIcon) {
            const playIconStyle = window.getComputedStyle(playIcon);
            const pauseIconStyle = window.getComputedStyle(pauseIcon);
            
            console.log("Play icon position:", {
                top: playIconStyle.top,
                left: playIconStyle.left,
                transform: playIconStyle.transform,
                opacity: playIconStyle.opacity
            });
            
            console.log("Pause icon position:", {
                top: pauseIconStyle.top,
                left: pauseIconStyle.left,
                transform: pauseIconStyle.transform,
                opacity: pauseIconStyle.opacity
            });
        }
        
        // Monitor video state changes
        video.addEventListener('play', function() {
            console.log("Video started playing");
            console.log("Button class list:", videoPlayBtn.classList.contains('playing') ? 'has playing class' : 'missing playing class');
            console.log("Button opacity:", window.getComputedStyle(videoPlayBtn).opacity);
        });
        
        video.addEventListener('pause', function() {
            console.log("Video paused");
            console.log("Button class list:", videoPlayBtn.classList.contains('playing') ? 'has playing class' : 'missing playing class');
            console.log("Button opacity:", window.getComputedStyle(videoPlayBtn).opacity);
        });
        
    } else {
        console.error("Video element or play button not found");
        if (!videoPlayBtn) console.error("Play button not found");
        if (!video) console.error("Video element not found");
    }
});
