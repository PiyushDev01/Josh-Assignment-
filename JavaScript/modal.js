// Modal functionality
document.addEventListener('DOMContentLoaded', function() {
  // Create modal elements and add to the DOM
  const modalHTML = `
    <div class="modal-overlay" id="successModal">
      <div class="modal">
        <button class="modal-close" aria-label="Close modal">
          <svg viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
          </svg>
        </button>
        <div class="modal-icon">
          <svg viewBox="0 0 24 24">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
          </svg>
        </div>
        <h2 class="modal-title">Success!</h2>
        <p class="modal-message">Your query has been sent successfully.</p>
        <button class="modal-button">OK</button>
      </div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', modalHTML);
  
  // Modal elements
  const modalOverlay = document.getElementById('successModal');
  const closeButtons = modalOverlay.querySelectorAll('.modal-close, .modal-button');
  
  // Contact form submission
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      // Form validation - we'll keep this simple as we already have validation in contact.js
      const nameInput = contactForm.querySelector('input[type="text"]');
      const emailInput = contactForm.querySelector('input[type="email"]');
      const messageInput = contactForm.querySelector('textarea');
      
      if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
        return; // Let contact.js handle the validation errors
      }
      
      // Show loading state on button
      const submitBtn = contactForm.querySelector('.submit-btn');
      const originalBtnText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      
      // Simulate server request with a slight delay
      setTimeout(() => {        // Reset form
        contactForm.reset();
        
        // Remove any focus styles from the form fields
        const formFields = contactForm.querySelectorAll('input, textarea');
        formFields.forEach(field => field.classList.remove('focused'));
        
        // Restore button
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
          // Show success modal with appropriate text
        document.querySelector('.modal-title').textContent = 'Success!';
        document.querySelector('.modal-message').textContent = 'Your query sent successfully.';
        showModal();
      }, 1000);
    });
  }
  
  // Pricing order buttons
  const orderButtons = document.querySelectorAll('.pricing-order-button');
  orderButtons.forEach(button => {
    button.addEventListener('click', function() {      // Change modal text for pricing
      document.querySelector('.modal-title').textContent = 'Order Confirmed!';
      document.querySelector('.modal-message').textContent = 'Your order has been placed successfully.';
      showModal();
    });
  });
  
  // Try For Free buttons (excluding video buttons)
  const tryFreeButtons = document.querySelectorAll('.btn-primary, .try-free-button');
  tryFreeButtons.forEach(button => {
    button.addEventListener('click', function(event) {
      // Skip if this is a video button
      if (button.closest('.video-play-btn')) {
        return;
      }
        // Change modal text for try free
      document.querySelector('.modal-title').textContent = 'Thank You!';
      document.querySelector('.modal-message').textContent = 'Your trial account has been created successfully.';
      showModal();
    });
  });
  
  // Close modal when clicking close button or overlay
  closeButtons.forEach(button => {
    button.addEventListener('click', hideModal);
  });
  
  // Also close when clicking outside the modal
  modalOverlay.addEventListener('click', function(event) {
    if (event.target === modalOverlay) {
      hideModal();
    }
  });
  
  // Close modal with Escape key
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && modalOverlay.classList.contains('active')) {
      hideModal();
    }
  });
    // Modal functions
  function showModal() {
    // Store the current scroll position
    const scrollY = window.scrollY;
    
    // Add the active class to show the modal
    modalOverlay.classList.add('active');
    
    // Add styles to prevent scrolling but maintain the scroll position
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';
    
    // Set data attribute to remember scrollY position
    document.body.setAttribute('data-scroll-position', scrollY);
  }
  
  function hideModal() {
    // Remove the active class to hide the modal
    modalOverlay.classList.remove('active');
    
    // Get the stored scroll position
    const scrollY = parseInt(document.body.getAttribute('data-scroll-position') || '0');
    
    // Remove the styles that prevent scrolling
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    document.body.style.overflow = '';
    
    // Scroll back to the original position
    window.scrollTo(0, scrollY);
  }
});
