document.addEventListener('DOMContentLoaded', function() {
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
  
  const modalOverlay = document.getElementById('successModal');
  const closeButtons = modalOverlay.querySelectorAll('.modal-close, .modal-button');
  
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      const nameInput = contactForm.querySelector('input[type="text"]');
      const emailInput = contactForm.querySelector('input[type="email"]');
      const messageInput = contactForm.querySelector('textarea');
      
      if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
        return;
      }
      
      const submitBtn = contactForm.querySelector('.submit-btn');
      const originalBtnText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      
      setTimeout(() => {
        contactForm.reset();
        
        const contactFormFields = contactForm.querySelectorAll('input, textarea');
        contactFormFields.forEach(field => field.classList.remove('focused'));
        
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
          
        document.querySelector('.modal-title').textContent = 'Success!';
        document.querySelector('.modal-message').textContent = 'Your query sent successfully.';
        showModal();
      }, 1000);
    });
  }
  
  const orderButtons = document.querySelectorAll('.pricing-order-button');
  orderButtons.forEach(button => {
    button.addEventListener('click', function() {
      document.querySelector('.modal-title').textContent = 'Order Confirmed!';
      document.querySelector('.modal-message').textContent = 'Your order has been placed successfully.';
      showModal();
    });
  });
  
  const tryFreeButtons = document.querySelectorAll('.btn-primary, .try-free-button');
  tryFreeButtons.forEach(button => {
    button.addEventListener('click', function(event) {
      if (button.closest('.video-play-btn')) {
        return;
      }
        
      document.querySelector('.modal-title').textContent = 'Thank You!';
      document.querySelector('.modal-message').textContent = 'Your trial account has been created successfully.';
      showModal();
    });
  });
  
  closeButtons.forEach(button => {
    button.addEventListener('click', hideModal);
  });
  
  modalOverlay.addEventListener('click', function(event) {
    if (event.target === modalOverlay) {
      hideModal();
    }
  });
  
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && modalOverlay.classList.contains('active')) {
      hideModal();
    }
  });
    
  function showModal() {
    const scrollY = window.scrollY;
    
    modalOverlay.classList.add('active');
    
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';
    
    document.body.setAttribute('data-scroll-position', scrollY);
  }
  
  function hideModal() {
    modalOverlay.classList.remove('active');
    
    const scrollY = parseInt(document.body.getAttribute('data-scroll-position') || '0');
    
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    document.body.style.overflow = '';
    
    window.scrollTo(0, scrollY);
  }
});
