document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.querySelector('.contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      const nameInput = contactForm.querySelector('input[type="text"]');
      const emailInput = contactForm.querySelector('input[type="email"]');
      const messageInput = contactForm.querySelector('textarea');
      
      let isFormValid = true;
      
      if (!nameInput.value.trim()) {
        addError(nameInput, 'Please enter your name');
        isFormValid = false;
      } else {
        removeError(nameInput);
      }
      
      if (!emailInput.value.trim()) {
        addError(emailInput, 'Please enter your email address');
        isFormValid = false;
      } else if (!isValidEmail(emailInput.value.trim())) {
        addError(emailInput, 'Please enter a valid email address');
        isFormValid = false;
      } else {
        removeError(emailInput);
      }
      
      if (!messageInput.value.trim()) {
        addError(messageInput, 'Please enter your message');
        isFormValid = false;
      } else {
        removeError(messageInput);
      }
      
      if (!isFormValid) {
        return;
      }
    });
  }
  
  const formFields = document.querySelectorAll('.contact-form input, .contact-form textarea');
  
  formFields.forEach(field => {
    field.addEventListener('focus', function() {
      this.classList.add('focused');
      removeError(this);
    });
    
    field.addEventListener('blur', function() {
      if (!this.value) {
        this.classList.remove('focused');
      }
    });
    
    if (field.value) {
      field.classList.add('focused');
    }
  });

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  function addError(field, message) {
    removeError(field);
    
    field.classList.add('error');
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-error-message';
    errorDiv.textContent = message;
    
    field.parentNode.insertBefore(errorDiv, field.nextSibling);
  }
  
  function removeError(field) {
    field.classList.remove('error');
    const errorDiv = field.nextElementSibling;
    if (errorDiv && errorDiv.className === 'form-error-message') {
      errorDiv.remove();
    }
  }
});