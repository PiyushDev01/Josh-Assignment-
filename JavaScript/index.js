// Document Ready Function
document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    
    // Hide preloader after page is fully loaded
    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.classList.add('loaded');
            // Enable scrolling on body
            document.body.style.overflow = 'auto';
        }, 500);
    });
    
    // Disable scrolling while preloader is active
    document.body.style.overflow = 'hidden';    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('.nav-links ul li a');
    const menuOverlay = document.querySelector('.mobile-menu-overlay');
    
    // Toggle mobile menu
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            header.classList.toggle('mobile-menu-open');
            
            // Toggle body scroll when menu is open
            if (header.classList.contains('mobile-menu-open')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Close menu when clicking on overlay
    if (menuOverlay) {
        menuOverlay.addEventListener('click', function() {
            if (header.classList.contains('mobile-menu-open')) {
                header.classList.remove('mobile-menu-open');
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (header.classList.contains('mobile-menu-open')) {
                header.classList.remove('mobile-menu-open');
                document.body.style.overflow = 'auto';
            }
        });
    });
    
    // Navigation scroll behavior
    let lastScrollY = window.scrollY;
    let scrollingTimeout;

    // Initialize header state
    if (window.scrollY <= 100) {
        header.classList.add('transparent');
    }

    // Scroll event handler with throttling
    window.addEventListener('scroll', function() {
        if (!scrollingTimeout) {
            scrollingTimeout = setTimeout(function() {
                const currentScrollY = window.scrollY;
                
                // At top of page - make transparent
                if (currentScrollY <= 100) {
                    header.classList.add('transparent');
                    header.classList.remove('hidden');
                } else {
                    header.classList.remove('transparent');
                    
                    // Show header when scrolling up, hide when scrolling down
                    if (currentScrollY < lastScrollY) {
                        // Scrolling up - show header
                        header.classList.remove('hidden');
                    } else if (currentScrollY > lastScrollY && currentScrollY > 300) {
                        // Scrolling down and not at the top - hide header
                        header.classList.add('hidden');
                    }
                }
                
                lastScrollY = currentScrollY;
                scrollingTimeout = null;
            }, 100); // Throttle to improve performance
        }
    });    // Add smooth scrolling to anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            // Skip if it's just "#" (empty anchor)
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Calculate offset for fixed header
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                
                // Scroll to element with header offset
                window.scrollTo({
                    top: targetPosition - headerHeight,
                    behavior: 'smooth'
                });
                
                // Update URL without page reload
                history.pushState(null, null, targetId);
                
                // Update active navigation link
                updateActiveNavLink(targetId);
            }
        });
    });
    
    // Track active section while scrolling
    function updateActiveNavLink(activeId = null) {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        if (activeId) {
            // Remove active class from all links
            navLinks.forEach(link => link.classList.remove('active'));
            
            // Add active class to the clicked link
            document.querySelector(`.nav-links a[href="${activeId}"]`)?.classList.add('active');
            return;
        }
        
        // For scroll event - determine which section is in view
        let currentSectionId = '';
        const scrollPosition = window.scrollY + header.offsetHeight + 100; // Add offset for better accuracy
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = '#' + section.getAttribute('id');
            }
        });
        
        // Update active nav link based on current section
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentSectionId) {
                link.classList.add('active');
            }
        });
    }
    
    // Update active link on scroll (with throttling)
    window.addEventListener('scroll', function() {
        if (!scrollingTimeout) {
            scrollingTimeout = setTimeout(function() {
                updateActiveNavLink();
                scrollingTimeout = null;
            }, 100);
        }
    });
      // Initial call to highlight the current section
    updateActiveNavLink();
    
    // Back to top button functionality
    const backToTopButton = document.querySelector('.back-to-top');
    
    // Show/hide back to top button based on scroll position
    function toggleBackToTopButton() {
        if (window.scrollY > 500) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    }
    
    // Initial check
    toggleBackToTopButton();
    
    // Toggle button on scroll
    window.addEventListener('scroll', function() {
        toggleBackToTopButton();
    });
    
    // Scroll to top when button is clicked
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });    const videoContainer = document.querySelector('.video-container');
    const video = document.getElementById('showcase-video');
    const playButton = document.querySelector('.video-play-btn');
    
    if (videoContainer && video && playButton) {
        // Preload video metadata for better user experience
        video.preload = 'metadata';
        
        // Load video when page is fully loaded for better performance
        window.addEventListener('load', function() {
            video.load();
        });
        
        // Handle play/pause button click
        playButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation(); // Prevent event bubbling
            
            if (video.paused) {
                // First add the playing class for smoother transition
                playButton.classList.add('playing');
                
                // Slight delay before playing to allow animation to begin
                setTimeout(() => {
                    // Promise-based play to handle autoplay policy issues
                    const playPromise = video.play();
                    
                    if (playPromise !== undefined) {
                        playPromise.then(_ => {
                            // Playback started successfully
                            videoContainer.classList.add('playing');
                            // Fade out play button after a short delay
                            setTimeout(() => {
                                if (!video.paused) {
                                    playButton.style.opacity = '0';
                                }
                            }, 800);
                        })
                        .catch(error => {
                            // Auto-play was prevented
                            playButton.classList.remove('playing');
                            videoContainer.classList.remove('playing');
                            console.log("Autoplay prevented:", error);
                        });
                    }
                }, 100);
            } else {
                // Pause video
                video.pause();
                // Make button visible immediately
                playButton.style.opacity = '1';
                // Slight delay before changing icons for smoother transition
                setTimeout(() => {
                    playButton.classList.remove('playing');
                    videoContainer.classList.remove('playing');
                }, 50);
            }
        });
          // Handle video click to toggle play/pause
        video.addEventListener('click', function() {
            playButton.click();
        });
        
        // Reset UI when video ends
        video.addEventListener('ended', function() {
            playButton.classList.remove('playing');
            videoContainer.classList.remove('playing');
            // Show play button again for smoother transition
            playButton.style.opacity = '1';
        });
        
        // Show controls briefly when hovering over the video
        videoContainer.addEventListener('mouseenter', function() {
            if (!video.paused) {
                // Make play button visible with a fade in
                playButton.style.transition = 'opacity 0.3s ease';
                playButton.style.opacity = '1';
                
                // Clear any previous timeout
                clearTimeout(videoContainer.timeoutId);
                videoContainer.timeoutId = setTimeout(function() {
                    if (!videoContainer.matches(':hover') && !video.paused) {
                        playButton.style.opacity = '0';
                    }
                }, 2000);
            }
        });
        
        videoContainer.addEventListener('mouseleave', function() {
            if (!video.paused) {
                // Add small delay before hiding
                clearTimeout(videoContainer.timeoutId);
                videoContainer.timeoutId = setTimeout(() => {
                    if (!videoContainer.matches(':hover') && !video.paused) {
                        playButton.style.opacity = '0';
                    }
                }, 300);
            }
        });
    }
});