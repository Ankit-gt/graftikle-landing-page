// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');
  const closeIcon = document.getElementById('close-icon');

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', function() {
      mobileMenu.classList.toggle('hidden');
      menuIcon.classList.toggle('hidden');
      closeIcon.classList.toggle('hidden');
    });
  }

  // Fade-up animation for services, testimonials, roadmap, FAQ, and footer
  const fadeElements = document.querySelectorAll('.fade-up, .fade-up-testimonial, .fade-up-roadmap, .fade-up-faq, .fade-up-footer');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, {
    threshold: 0.1
  });

  fadeElements.forEach(element => {
    observer.observe(element);
  });
  
  // FAQ Accordion functionality
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const answer = question.nextElementSibling;
      const icon = question.querySelector('.faq-icon');
      
      // Toggle active class on answer
      answer.classList.toggle('active');
      
      // Toggle icon rotation
      icon.classList.toggle('active');
      
      // Close other open FAQ items
      faqQuestions.forEach(otherQuestion => {
        if (otherQuestion !== question) {
          const otherAnswer = otherQuestion.nextElementSibling;
          const otherIcon = otherQuestion.querySelector('.faq-icon');
          
          otherAnswer.classList.remove('active');
          otherIcon.classList.remove('active');
        }
      });
    });
  });

  // Testimonial navigation functionality
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  const testimonialNavButtons = document.querySelectorAll('.testimonial-nav-button');
  const testimonialIndicators = document.querySelectorAll('.testimonial-indicator');
  let currentTestimonialIndex = 0;
  const totalTestimonials = testimonialCards.length;
  
  // Function to update indicators
  function updateIndicators() {
    testimonialIndicators.forEach((indicator, index) => {
      if (index === currentTestimonialIndex) {
        indicator.classList.add('active');
      } else {
        indicator.classList.remove('active');
      }
    });
  }
  
  // Function to show only the current testimonial on mobile
  function updateTestimonialVisibility() {
    // Only apply sliding behavior on mobile screens
    if (window.innerWidth <= 768) {
      testimonialCards.forEach((card, index) => {
        if (index === currentTestimonialIndex) {
          card.style.display = 'block';
          card.classList.add('active');
        } else {
          card.style.display = 'none';
          card.classList.remove('active');
        }
      });
      
      // Update indicators
      updateIndicators();
    } else {
      // On desktop, show all testimonials
      testimonialCards.forEach(card => {
        card.style.display = 'block';
        card.classList.add('active');
      });
    }
  }
  
  // Function to navigate to a specific testimonial
  function navigateToTestimonial(index) {
    currentTestimonialIndex = index;
    updateTestimonialVisibility();
  }
  
  // Initialize testimonial visibility
  updateTestimonialVisibility();
  
  // Add event listeners to navigation buttons
  testimonialNavButtons.forEach((button, index) => {
    button.addEventListener('click', function() {
      // Visual feedback
      button.classList.add('animate-pulse');
      setTimeout(() => {
        button.classList.remove('animate-pulse');
      }, 300);
      
      // Determine direction (left or right)
      const isLeftButton = index === 0;
      
      // Update current testimonial index
      if (isLeftButton) {
        currentTestimonialIndex = (currentTestimonialIndex - 1 + totalTestimonials) % totalTestimonials;
      } else {
        currentTestimonialIndex = (currentTestimonialIndex + 1) % totalTestimonials;
      }
      
      // Update which testimonial is visible
      updateTestimonialVisibility();
    });
  });
  
  // Add event listeners to indicators
  testimonialIndicators.forEach((indicator, index) => {
    indicator.addEventListener('click', function() {
      navigateToTestimonial(index);
    });
  });
  
  // Update testimonial visibility when window is resized
  window.addEventListener('resize', updateTestimonialVisibility);
  
  // Auto-rotate testimonials on mobile every 5 seconds
  let autoRotateInterval;
  
  function startAutoRotate() {
    if (window.innerWidth <= 768) {
      // Clear any existing interval first
      if (autoRotateInterval) {
        clearInterval(autoRotateInterval);
      }
      
      autoRotateInterval = setInterval(() => {
        currentTestimonialIndex = (currentTestimonialIndex + 1) % totalTestimonials;
        updateTestimonialVisibility();
      }, 5000);
    }
  }
  
  // Start auto-rotation
  startAutoRotate();
  
  // Reset auto-rotation on window resize
  window.addEventListener('resize', () => {
    startAutoRotate();
  });
  
  // Add swipe gesture support for mobile
  const testimonialsSection = document.getElementById('testimonials');
  let touchStartX = 0;
  let touchEndX = 0;
  
  testimonialsSection.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, false);
  
  testimonialsSection.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, false);
  
  function handleSwipe() {
    // Reset auto-rotation when user interacts
    if (autoRotateInterval) {
      clearInterval(autoRotateInterval);
      startAutoRotate();
    }
    
    // Detect swipe direction (minimum 50px movement to count as swipe)
    if (touchEndX < touchStartX - 50) {
      // Swipe left - go to next testimonial
      currentTestimonialIndex = (currentTestimonialIndex + 1) % totalTestimonials;
      updateTestimonialVisibility();
    }
    
    if (touchEndX > touchStartX + 50) {
      // Swipe right - go to previous testimonial
      currentTestimonialIndex = (currentTestimonialIndex - 1 + totalTestimonials) % totalTestimonials;
      updateTestimonialVisibility();
    }
  }
});

// Form submission handling
document.addEventListener('DOMContentLoaded', function() {
  const consultationForm = document.getElementById('consultation-form');
  
  if (consultationForm) {
    consultationForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(consultationForm);
      const formDataObj = {};
      
      formData.forEach((value, key) => {
        formDataObj[key] = value;
      });
      
      // Simple form validation
      const requiredFields = ['name', 'phone', 'age', 'location', 'baldness_level'];
      let isValid = true;
      
      requiredFields.forEach(field => {
        const input = document.getElementById(field) || 
                     document.querySelector(`input[name="${field}"]:checked`);
        
        if (!input || !input.value) {
          isValid = false;
          // Highlight the missing field
          if (document.getElementById(field)) {
            document.getElementById(field).classList.add('border-red-500');
          } else {
            // For radio buttons, highlight the group
            document.querySelectorAll(`input[name="${field}"]`).forEach(radio => {
              radio.closest('.baldness-option').classList.add('border-red-500');
            });
          }
        }
      });
      
      if (!isValid) {
        alert('Please fill in all required fields');
        return;
      }
      
      // Construct email body
      const emailBody = `
        Name: ${formDataObj.name}\n
        Phone: ${formDataObj.phone}\n
        Age: ${formDataObj.age}\n
        Location: ${formDataObj.location}\n
        Baldness Level: ${formDataObj.baldness_level}\n
        Additional Information: ${formDataObj.message || 'None provided'}
      `;
      
      // Use mailto protocol to open email client
      const mailtoLink = `mailto:info@graftickle.com?subject=Consultation Request from ${formDataObj.name}&body=${encodeURIComponent(emailBody)}`;
      
      window.location.href = mailtoLink;
      
      // Reset form
      consultationForm.reset();
      
      // Show success message
      alert('Thank you for your submission! Your email client will open to send your consultation request.');
    });
    
    // Clear validation styling on input
    consultationForm.querySelectorAll('input, textarea').forEach(input => {
      input.addEventListener('input', function() {
        this.classList.remove('border-red-500');
      });
    });
    
    // Clear validation styling on radio button group when any option is selected
    consultationForm.querySelectorAll('input[type="radio"]').forEach(radio => {
      radio.addEventListener('change', function() {
        document.querySelectorAll(`input[name="${this.name}"]`).forEach(r => {
          r.closest('.baldness-option').classList.remove('border-red-500');
        });
      });
    });
  }
  
  // Add animation classes for new sections
  const fadeElements = document.querySelectorAll('.fade-up-contact, .fade-up-video');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, {
    threshold: 0.1
  });

  fadeElements.forEach(element => {
    observer.observe(element);
  });
});
