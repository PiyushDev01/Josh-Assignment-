// Contact form handling
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.querySelector('.contact-form');
  
  if (contactForm) {
    // Form submission handler
    contactForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      const nameInput = contactForm.querySelector('input[type="text"]');
      const emailInput = contactForm.querySelector('input[type="email"]');
      const messageInput = contactForm.querySelector('textarea');
      
      // Add form validation with visual feedback
      let isFormValid = true;
      
      // Validate name
      if (!nameInput.value.trim()) {
        addError(nameInput, 'Please enter your name');
        isFormValid = false;
      } else {
        removeError(nameInput);
      }
      
      // Validate email
      if (!emailInput.value.trim()) {
        addError(emailInput, 'Please enter your email address');
        isFormValid = false;
      } else if (!isValidEmail(emailInput.value.trim())) {
        addError(emailInput, 'Please enter a valid email address');
        isFormValid = false;
      } else {
        removeError(emailInput);
      }
      
      // Validate message
      if (!messageInput.value.trim()) {
        addError(messageInput, 'Please enter your message');
        isFormValid = false;
      } else {
        removeError(messageInput);
      }
      
      if (!isFormValid) {
        return;
      }
      
      // Form submission simulation
      const submitBtn = contactForm.querySelector('.submit-btn');
      const originalBtnText = submitBtn.textContent;
      
      // Show loading state
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      
      // Simulate server request
      setTimeout(() => {
        const formData = {
          name: nameInput.value.trim(),
          email: emailInput.value.trim(),
          message: messageInput.value.trim()
        };
        
        console.log('Form submitted with data:', formData);
        
        // Reset form
        contactForm.reset();
        formFields.forEach(field => field.classList.remove('focused'));
        
        // Restore button
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
        
        // Show success message
        showNotification('Thank you for your message! We will get back to you soon.', 'success');
      }, 1500);
    });
  }
  
  // Enhance form fields with focus effects
  const formFields = document.querySelectorAll('.contact-form input, .contact-form textarea');
  
  formFields.forEach(field => {
    // Focus effects
    field.addEventListener('focus', function() {
      this.classList.add('focused');
      removeError(this);
    });
    
    field.addEventListener('blur', function() {
      if (!this.value) {
        this.classList.remove('focused');
      }
    });
    
    // Initialize with focused class if field has value (for page reload cases)
    if (field.value) {
      field.classList.add('focused');
    }
  });
  
  // Helper functions
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  function addError(field, message) {
    // Remove any existing error
    removeError(field);
    
    // Add error styling
    field.classList.add('error');
    
    // Create error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-error-message';
    errorDiv.textContent = message;
    
    // Insert error after the field
    field.parentNode.insertBefore(errorDiv, field.nextSibling);
  }
  
  function removeError(field) {
    field.classList.remove('error');
    const errorDiv = field.nextElementSibling;
    if (errorDiv && errorDiv.className === 'form-error-message') {
      errorDiv.remove();
    }
  }
  
  function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => notification.classList.add('show'), 10);
    
    // Remove after delay
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }, 5000);
  }
});