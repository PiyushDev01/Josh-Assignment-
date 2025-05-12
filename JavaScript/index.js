document.addEventListener('DOMContentLoaded', function() {
    const preloader = document.querySelector('.preloader');
    
    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.classList.add('loaded');
            document.body.style.overflow = 'auto';
        }, 500);
    });
    
    document.body.style.overflow = 'hidden';
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('.nav-links ul li a');
    const menuOverlay = document.querySelector('.mobile-menu-overlay');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            header.classList.toggle('mobile-menu-open');
            
            if (header.classList.contains('mobile-menu-open')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    if (menuOverlay) {
        menuOverlay.addEventListener('click', function() {
            if (header.classList.contains('mobile-menu-open')) {
                header.classList.remove('mobile-menu-open');
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (header.classList.contains('mobile-menu-open')) {
                header.classList.remove('mobile-menu-open');
                document.body.style.overflow = 'auto';
            }
        });
    });
    
    let lastScrollY = window.scrollY;
    let scrollingTimeout;

    if (window.scrollY <= 100) {
        header.classList.add('transparent');
    }

    window.addEventListener('scroll', function() {
        if (!scrollingTimeout) {
            scrollingTimeout = setTimeout(function() {
                const currentScrollY = window.scrollY;
                
                if (currentScrollY <= 100) {
                    header.classList.add('transparent');
                    header.classList.remove('hidden');
                } else {
                    header.classList.remove('transparent');
                    
                    if (currentScrollY < lastScrollY) {
                        header.classList.remove('hidden');
                    } else if (currentScrollY > lastScrollY && currentScrollY > 300) {
                        header.classList.add('hidden');
                    }
                }
                
                lastScrollY = currentScrollY;
                scrollingTimeout = null;
            }, 100);
        }
    });
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                
                window.scrollTo({
                    top: targetPosition - headerHeight,
                    behavior: 'smooth'
                });
                
                history.pushState(null, null, targetId);
                
                updateActiveNavLink(targetId);
            }
        });
    });
    
    function updateActiveNavLink(activeId = null) {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        if (activeId) {
            navLinks.forEach(link => link.classList.remove('active'));
            
            document.querySelector(`.nav-links a[href="${activeId}"]`)?.classList.add('active');
            return;
        }
        
        let currentSectionId = '';
        const scrollPosition = window.scrollY + header.offsetHeight + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = '#' + section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentSectionId) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', function() {
        if (!scrollingTimeout) {
            scrollingTimeout = setTimeout(function() {
                updateActiveNavLink();
                scrollingTimeout = null;
            }, 100);
        }
    });
    
    updateActiveNavLink();
    
    const backToTopButton = document.querySelector('.back-to-top');
    
    function toggleBackToTopButton() {
        if (window.scrollY > 500) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    }
    
    toggleBackToTopButton();
    
    window.addEventListener('scroll', function() {
        toggleBackToTopButton();
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    const videoContainer = document.querySelector('.video-container');
    const video = document.getElementById('showcase-video');
    const playButton = document.querySelector('.video-play-btn');
    
    if (videoContainer && video && playButton) {
        video.preload = 'metadata';
        
        window.addEventListener('load', function() {
            video.load();
        });
        
        playButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            if (video.paused) {
                playButton.classList.add('playing');
                
                setTimeout(() => {
                    const playPromise = video.play();
                    
                    if (playPromise !== undefined) {
                        playPromise.then(_ => {
                            videoContainer.classList.add('playing');
                            setTimeout(() => {
                                if (!video.paused) {
                                    playButton.style.opacity = '0';
                                }
                            }, 800);
                        })
                        .catch(error => {
                            playButton.classList.remove('playing');
                            videoContainer.classList.remove('playing');
                            console.log("Autoplay prevented:", error);
                        });
                    }
                }, 100);
            } else {
                video.pause();
                playButton.style.opacity = '1';
                setTimeout(() => {
                    playButton.classList.remove('playing');
                    videoContainer.classList.remove('playing');
                }, 50);
            }
        });
        
        video.addEventListener('click', function() {
            playButton.click();
        });
        
        video.addEventListener('ended', function() {
            playButton.classList.remove('playing');
            videoContainer.classList.remove('playing');
            playButton.style.opacity = '1';
        });
        
        videoContainer.addEventListener('mouseenter', function() {
            if (!video.paused) {
                playButton.style.transition = 'opacity 0.3s ease';
                playButton.style.opacity = '1';
                
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