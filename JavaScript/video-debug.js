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
    } 
});
