document.addEventListener('DOMContentLoaded', function() {
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.testimonial-dot');
  let currentSlide = 0;
  let slideInterval;
  
  function startSlideTimer() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 5000);
  }

  function showSlide(slideIndex) {
    const activeSlide = document.querySelector('.testimonial-slide.active');
    const targetSlide = slides[slideIndex];
    
    if (activeSlide === targetSlide) return;
    
    dots.forEach(dot => {
      dot.classList.remove('active');
    });
    
    dots[slideIndex].classList.add('active');
    
    if (activeSlide) {
      activeSlide.style.opacity = '0';
      
      setTimeout(() => {
        activeSlide.classList.remove('active');
        targetSlide.classList.add('active');
        
        setTimeout(() => {
          targetSlide.style.opacity = '1';
        }, 50);
      }, 400);
    } else {
      targetSlide.classList.add('active');
      targetSlide.style.opacity = '1';
    }
  }
  
  function nextSlide() {
    currentSlide++;
    if (currentSlide >= slides.length) {
      currentSlide = 0;
    }
    showSlide(currentSlide);
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', function() {
      clearInterval(slideInterval);
      currentSlide = index;
      showSlide(currentSlide);
      startSlideTimer();
    });
  });

  showSlide(currentSlide);
  startSlideTimer();
});