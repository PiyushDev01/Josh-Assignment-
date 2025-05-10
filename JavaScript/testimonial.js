// Testimonials Slider Functionality
document.addEventListener('DOMContentLoaded', function() {
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.testimonial-dot');
  let currentSlide = 0;
  let slideInterval;
  // Function to start the auto-slide
  function startSlideTimer() {
    clearInterval(slideInterval); // Clear any existing intervals first
    slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
  }

  // Function to show a specific slide with smoother transition
  function showSlide(slideIndex) {
    // Get the current active slide
    const activeSlide = document.querySelector('.testimonial-slide.active');
    const targetSlide = slides[slideIndex];
    
    if (activeSlide === targetSlide) return;
    
    // Deactivate all dots first
    dots.forEach(dot => {
      dot.classList.remove('active');
    });
    
    // Activate the target dot
    dots[slideIndex].classList.add('active');
    
    // Fade out current slide and fade in new slide
    if (activeSlide) {
      activeSlide.style.opacity = '0';
      
      // Wait for fade out before showing new slide
      setTimeout(() => {
        activeSlide.classList.remove('active');
        targetSlide.classList.add('active');
        
        // Small delay before fading in the new slide for smoother transition
        setTimeout(() => {
          targetSlide.style.opacity = '1';
        }, 50);
      }, 400);
    } else {
      // First time loading, no transition needed
      targetSlide.classList.add('active');
      targetSlide.style.opacity = '1';
    }
  }
  // Function to go to the next slide with smoother transition
  function nextSlide() {
    currentSlide++;
    if (currentSlide >= slides.length) {
      currentSlide = 0;
    }
    showSlide(currentSlide);
  }

  // Add click event to dots for manual navigation
  dots.forEach((dot, index) => {
    dot.addEventListener('click', function() {
      // Reset the interval when a dot is clicked
      clearInterval(slideInterval);
      currentSlide = index;
      showSlide(currentSlide);
      startSlideTimer();
    });
  });

  // Show the first slide and start the timer
  showSlide(currentSlide);
  startSlideTimer();
});