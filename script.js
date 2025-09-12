// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
  // Force start at the first section on reload
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  setTimeout(() => {
    if (typeof window.scrollTo === 'function') {
      window.scrollTo(0, 0);
    }
    const firstSection = document.querySelector('section');
    if (firstSection) {
      firstSection.scrollIntoView({ behavior: 'auto', block: 'start' });
    }
  }, 0);
  // Consultation modal open on load and close handlers
  const modal = document.getElementById('consultation-modal');
  const closeModalBtn = document.getElementById('close-consultation-modal');
  function openConsultationModal() {
    if (modal) {
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    }
  }
  function closeConsultationModal() {
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  }
  // Open on first page load after a brief delay (avoid layout jank)
  setTimeout(openConsultationModal, 600);
  // Close interactions
  if (closeModalBtn) closeModalBtn.addEventListener('click', closeConsultationModal);
  if (modal) {
    modal.addEventListener('click', function(e){ if (e.target === modal) closeConsultationModal(); });
  }

  // Modal form submission using existing EmailJS flow (reuses config)
  const modalForm = document.getElementById('consultation-form-modal');
  if (modalForm) {
    modalForm.addEventListener('submit', function(e){
      e.preventDefault();
      const formData = new FormData(modalForm);
      const name = formData.get('name');
      const age = formData.get('age');
      const location = formData.get('location');
      const phone = formData.get('phone');
      const email = formData.get('email');
      const hairLossLevel = formData.get('hairLossLevel') || 'Stage 1';

      if (!name || !age || !location || !phone || !email) {
        alert('Please fill in all required fields');
        return;
      }

      const submitButton = modalForm.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
      submitButton.textContent = 'Sending...';
      submitButton.disabled = true;

      const emailBody = `\nName: ${name}\nAge: ${age}\nLocation: ${location}\nPhone: ${phone}\nEmail: ${email}\nHair Loss Level: ${hairLossLevel}\n`;

      const templateParams = {
        name, age, location, phone, email, hairLossLevel,
        message: emailBody,
        email_body: emailBody
      };

      const EMAILJS_SERVICE_ID = 'service_cfr101r';
      const EMAILJS_TEMPLATE_ID = 'template_l711u1c';
      const EMAILJS_PUBLIC_KEY = 'R2pIDhvz8zfAiju7f';

      if (!window.emailjs) {
        alert('Sorry, email service is unavailable right now.');
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        return;
      }

      emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY)
        .then(() => {
          alert('Form submitted successfully!');
          modalForm.reset();
          submitButton.textContent = originalText;
          submitButton.disabled = false;
          closeConsultationModal();
        })
        .catch(() => {
          alert('Sorry, we could not submit your request right now. Please try again later.');
          submitButton.textContent = originalText;
          submitButton.disabled = false;
        });
    });
  }
  // Results Before & After Slideshow Functionality
  const resultsDots = document.querySelectorAll('.results-slideshow .dot');
  const beforeImages = document.querySelectorAll('.before-img');
  const mainImage = document.querySelector('.main-image');
  const graftsInfo = document.querySelector('.grafts-info span');
  let currentResultsIndex = 0;
  let resultsAutoRotateInterval;

  // Image data for slideshow
  const resultsData = [
    {
      mainImage: 'assests/patient_results1.webp',
      beforeImages: ['assests/patient_results1.webp', 'assests/patient_results1.webp'],
      grafts: '3600 Grafts'
    },
    {
      mainImage: 'assests/patient_results2.webp',
      beforeImages: ['assests/patient_results2.webp', 'assests/patient_results2.webp'],
      grafts: '2800 Grafts'
    },
    {
      mainImage: 'assests/patient_results3.webp',
      beforeImages: ['assests/patient_results3.webp', 'assests/patient_results3.webp'],
      grafts: '4200 Grafts'
    },
    {
      mainImage: 'assests/patient_results4.webp',
      beforeImages: ['assests/patient_results4.webp', 'assests/patient_results4.webp'],
      grafts: '3500 Grafts'
    }
  ];

  function showResultsSlide(index) {
    const data = resultsData[index];
    
    // Update main image
    if (mainImage) {
      mainImage.src = data.mainImage;
      mainImage.alt = `After - ${data.grafts}`;
    }
    
    // Update before images
    beforeImages.forEach((img, i) => {
      if (data.beforeImages[i]) {
        img.src = data.beforeImages[i];
        img.alt = `Before - Hair Loss Stage ${i + 1}`;
      }
    });
    
    // Update grafts info
    if (graftsInfo) {
      graftsInfo.textContent = data.grafts;
    }
    
    // Update dots
    resultsDots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  function nextResultsSlide() {
    currentResultsIndex = (currentResultsIndex + 1) % resultsData.length;
    showResultsSlide(currentResultsIndex);
  }

  function prevResultsSlide() {
    currentResultsIndex = (currentResultsIndex - 1 + resultsData.length) % resultsData.length;
    showResultsSlide(currentResultsIndex);
  }

  function startResultsAutoRotate() {
    if (resultsAutoRotateInterval) {
      clearInterval(resultsAutoRotateInterval);
    }
    
    resultsAutoRotateInterval = setInterval(() => {
      nextResultsSlide();
    }, 5000);
  }

  function resetResultsAutoRotate() {
    if (resultsAutoRotateInterval) {
      clearInterval(resultsAutoRotateInterval);
    }
    startResultsAutoRotate();
  }

  // Initialize results slideshow
  if (resultsDots.length > 0) {
    // Show first slide
    showResultsSlide(0);
    
    // Add dot click events
    resultsDots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentResultsIndex = index;
        showResultsSlide(currentResultsIndex);
        resetResultsAutoRotate();
      });
    });
    
    // Start auto-rotation
    startResultsAutoRotate();
    
    // Pause on hover
    const resultsSlideshow = document.querySelector('.results-slideshow');
    if (resultsSlideshow) {
      resultsSlideshow.addEventListener('mouseenter', () => {
        clearInterval(resultsAutoRotateInterval);
      });
      
      resultsSlideshow.addEventListener('mouseleave', () => {
        startResultsAutoRotate();
      });
    }
  }

  // Customer Experience Video Functionality
  const videoThumbnail = document.querySelector('.video-thumbnail');
  const playButton = document.querySelector('.play-button');
  
  if (videoThumbnail && playButton) {
    // Add click event to play video inline
    videoThumbnail.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      // Check if video is already playing
      if (this.classList.contains('video-playing')) {
        return;
      }
      
      // Mark as playing
      this.classList.add('video-playing');
      
      // Hide the play button
      playButton.style.display = 'none';
      
      // Create video element
      const videoElement = document.createElement('video');
      videoElement.controls = true;
      videoElement.autoplay = true;
      videoElement.muted = true;
      videoElement.className = 'inline-video';
      videoElement.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 15px;
        background: #000;
        z-index: 5;
      `;
      
      // Add video source
      const source = document.createElement('source');
      source.src = 'assests/video.mp4';
      source.type = 'video/mp4';
      videoElement.appendChild(source);
      
      // Add fallback text
      videoElement.innerHTML += 'Your browser does not support the video tag.';
      
      // Add close button
      const closeButton = document.createElement('button');
      closeButton.className = 'close-video';
      closeButton.innerHTML = `
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      `;
      closeButton.style.cssText = `
        position: absolute;
        top: 10px;
        right: 10px;
        background: rgba(0, 0, 0, 0.7);
        color: white;
        border: none;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 10;
        transition: all 0.3s ease;
      `;
      
      // Add close button functionality
      closeButton.addEventListener('click', function(e) {
        e.stopPropagation();
        // Remove video and restore thumbnail
        videoElement.remove();
        closeButton.remove();
        playButton.style.display = 'flex';
        videoThumbnail.classList.remove('video-playing');
      });
      
      // Add hover effect for close button
      closeButton.addEventListener('mouseenter', function() {
        this.style.background = 'rgba(255, 0, 0, 0.8)';
        this.style.transform = 'scale(1.1)';
      });
      
      closeButton.addEventListener('mouseleave', function() {
        this.style.background = 'rgba(0, 0, 0, 0.7)';
        this.style.transform = 'scale(1)';
      });
      
      // Add video to thumbnail
      this.appendChild(videoElement);
      this.appendChild(closeButton);
      
      // Try to play the video
      videoElement.play().catch(error => {
        console.log('Video autoplay failed (this is normal in many browsers):', error);
        // Video will still be playable with controls
      });
      
      // Handle video end
      videoElement.addEventListener('ended', function() {
        // Remove video and restore thumbnail
        videoElement.remove();
        closeButton.remove();
        playButton.style.display = 'flex';
        videoThumbnail.classList.remove('video-playing');
      });
      
      // Handle video errors
      videoElement.addEventListener('error', function(e) {
        console.error('Video loading error:', e);
        // Remove video and restore thumbnail
        videoElement.remove();
        closeButton.remove();
        playButton.style.display = 'flex';
        videoThumbnail.classList.remove('video-playing');
        
        // Show error message
        alert('Video could not be loaded. Please check your internet connection.');
      });
    });
    
    // Add hover effects
    videoThumbnail.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.02)';
      playButton.style.transform = 'translate(-50%, -50%) scale(1.1)';
    });
    
    videoThumbnail.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
      playButton.style.transform = 'translate(-50%, -50%) scale(1)';
    });
  }
  
  // Function to show video modal (optional)
  // function showVideoModal(videoUrl) {
  //   // Create modal overlay
  //   const modal = document.createElement('div');
  //   modal.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50';
  //   modal.innerHTML = `
  //     <div class="relative max-w-4xl w-full mx-4">
  //       <button class="absolute -top-10 right-0 text-white text-2xl hover:text-gray-300" onclick="this.parentElement.parentElement.remove()">
  //         ×
  //       </button>
  //       <div class="aspect-video bg-black overflow-hidden">
  //         <iframe 
  //           src="${videoUrl.replace('watch?v=', 'embed/')}" 
  //           class="w-full h-full" 
  //           frameborder="0" 
  //           allowfullscreen>
  //         </iframe>
  //       </div>
  //     </div>
  //   `;
    
  //   document.body.appendChild(modal);
    
  //   // Close modal when clicking outside
  //   modal.addEventListener('click', function(e) {
  //     if (e.target === modal) {
  //       modal.remove();
  //     }
  //   });
  // }
  
  // Stats Carousel Functionality
  const statsItems = document.querySelectorAll('.results-stats .stat');
  let currentStatsIndex = 0;
  let statsVisible = 5; // Number of stats visible at once on desktop
  
  // Adjust visible stats based on screen size
  function updateStatsVisible() {
    if (window.innerWidth <= 480) {
      statsVisible = 1;
    } else if (window.innerWidth <= 768) {
      statsVisible = 2;
    } else if (window.innerWidth <= 1024) {
      statsVisible = 3;
    } else {
      statsVisible = 5;
    }
  }
  
  // Initialize stats visibility
  updateStatsVisible();
  window.addEventListener('resize', updateStatsVisible);
  
  // Auto rotate stats on smaller screens
  function rotateStats() {
    if (statsItems.length > statsVisible) {
      // Only rotate on smaller screens where not all stats are visible
      if (window.innerWidth <= 1024) {
        statsItems.forEach((stat, i) => {
          const isVisible = (i >= currentStatsIndex && i < currentStatsIndex + statsVisible) || 
                          (currentStatsIndex + statsVisible > statsItems.length && 
                           i < (currentStatsIndex + statsVisible) % statsItems.length);
          
          if (isVisible) {
            stat.style.display = 'flex';
            setTimeout(() => {
              stat.style.opacity = '1';
              stat.style.transform = 'translateY(0)';
            }, 50);
          } else {
            stat.style.opacity = '0';
            stat.style.transform = 'translateY(20px)';
            setTimeout(() => {
              stat.style.display = 'none';
            }, 300);
          }
        });
        
        currentStatsIndex = (currentStatsIndex + 1) % statsItems.length;
      }
    }
  }
  
  // Start stats rotation if needed
  if (statsItems.length > 0) {
    // Initial display
    rotateStats();
    
    // Auto rotate every 3 seconds
    setInterval(rotateStats, 3000);
  }
  
  // Fade-up animation for results section
  const resultsElements = document.querySelectorAll('.fade-up');
  
  const resultsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        resultsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  resultsElements.forEach(el => {
    resultsObserver.observe(el);
  });
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
  // Close mobile menu when a menu link is clicked
  const mobileMenuLinks = document.querySelectorAll('#mobile-menu a');
  if (mobileMenuLinks && mobileMenuLinks.length) {
    mobileMenuLinks.forEach(link => {
      link.addEventListener('click', function() {
        // Hide the menu
        mobileMenu.classList.add('hidden');
        // Restore hamburger icon state
        if (menuIcon) menuIcon.classList.remove('hidden');
        if (closeIcon) closeIcon.classList.add('hidden');
      });
    });
  }
  
  // Treatment Options Functionality
  const treatmentOptions = document.querySelectorAll('.treatment-option');
  const treatmentDetails = document.getElementById('treatment-details');
  const treatmentPanels = document.querySelectorAll('.treatment-detail-panel');
  
  // Function to hide all treatment panels
  function hideAllTreatmentPanels() {
    treatmentPanels.forEach(panel => {
      panel.classList.add('hidden');
      panel.classList.remove('active');
    });
  }
  
  // Function to show a specific treatment panel
  function showTreatmentPanel(treatmentOption) {
    // Get the treatment type from data attribute
    const treatmentType = treatmentOption.getAttribute('data-treatment');
    
    // Hide all panels first
    hideAllTreatmentPanels();
    
    // Show the treatment details container
    treatmentDetails.classList.remove('hidden');
    
    // Show the specific treatment panel
    const targetPanel = document.getElementById(`${treatmentType}-details`);
    if (targetPanel) {
      targetPanel.classList.remove('hidden');
      
      // Add active class for animation after a small delay
      setTimeout(() => {
        targetPanel.classList.add('active');
      }, 50);
    }
    
    // Add active class to selected treatment and remove from others
    treatmentOptions.forEach(opt => {
      opt.classList.remove('active-treatment');
    });
    treatmentOption.classList.add('active-treatment');
  }
  
  // Add click event to each treatment option
  treatmentOptions.forEach(option => {
    option.addEventListener('click', function() {
      showTreatmentPanel(this);
      
      // Scroll to the treatment details
      treatmentDetails.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  })
  
  // Show the first treatment option by default when the page loads
  document.addEventListener('DOMContentLoaded', function() {
    if (treatmentOptions.length > 0) {
      showTreatmentPanel(treatmentOptions[0]);
    }
  });
  
  // Hair Loss Level Selection Functionality
  function updateHairLossSelection() {
    // Remove active class from all options
    document.querySelectorAll('.baldness-option label > div').forEach(div => {
      div.classList.remove('border-primary');
      div.classList.add('border-gray-200');
      // Hide the checkmark
      const checkmark = div.querySelector('.absolute');
      if (checkmark) {
        checkmark.style.opacity = '0';
      }
    });
    
    // Add active class to selected option
    const selectedOption = document.querySelector('.baldness-option input[type="radio"]:checked');
    if (selectedOption) {
      const label = selectedOption.nextElementSibling;
      const div = label.querySelector('div');
      div.classList.remove('border-gray-200');
      div.classList.add('border-primary');
      // Show the checkmark
      const checkmark = div.querySelector('.absolute');
      if (checkmark) {
        checkmark.style.opacity = '1';
      }
    }
  }
  
  // Style the hair loss level radio buttons
  const baldnessOptions = document.querySelectorAll('.baldness-option input[type="radio"]');
  baldnessOptions.forEach(option => {
    option.addEventListener('change', updateHairLossSelection);
  });
  
  // Initialize the hair loss level selection if there's a default
  const defaultBaldnessOption = document.querySelector('.baldness-option input[type="radio"]:checked');
  if (defaultBaldnessOption) {
    updateHairLossSelection();
  }
  
  // Consultation Form Animation
  const contactElements = document.querySelectorAll('.fade-up-contact');
  
  const contactObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-up-show');
        contactObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  contactElements.forEach(el => {
    contactObserver.observe(el);
  });

  // Consultation Form Submission
const consultationForm = document.getElementById('consultation-form');
if (consultationForm) {
  consultationForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const location = document.getElementById('location').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    
    // Get selected hair loss level
    let hairLossLevel = '';
    const hairLossOptions = document.querySelectorAll('input[name="hairLossLevel"]');
    hairLossOptions.forEach(option => {
      if (option.checked) {
        hairLossLevel = option.value;
      }
    });
    
    // Make optional: message field may be absent in the form
    const messageInput = document.getElementById('message');
    const message = messageInput ? messageInput.value : '';
    
    // Basic validation
    if (!name || !age || !location || !phone || !email) {
      alert('Please fill in all required fields');
      return;
    }

    // Create submit button reference for UI feedback
    const submitButton = consultationForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    
    // Show loading state
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Prepare data for server
    const formData = {
      name,
      age,
      location,
      phone,
      email,
      hairLossLevel,
      message
    };
    
    // Send via EmailJS (client-side)
    // OWNER: Set your EmailJS values below
    const EMAILJS_SERVICE_ID = 'service_cfr101r';    // e.g. 'service_xxxxx'
    const EMAILJS_TEMPLATE_ID = 'template_l711u1c';  // e.g. 'template_xxxxx'
    const EMAILJS_PUBLIC_KEY =  'R2pIDhvz8zfAiju7f';    // same as used in index.html init
 
    if (!window.emailjs) {
      console.error('EmailJS SDK not loaded');
      alert('Sorry, email service is unavailable right now.');
      submitButton.textContent = originalButtonText;
      submitButton.disabled = false;
      return;
    }

    // Compose a single fallback body so your template can show content even if it only uses one variable
    const emailBody = `
Name: ${name}
Age: ${age}
Location: ${location}
Phone: ${phone}
Email: ${email}
Hair Loss Level: ${hairLossLevel}
Additional Information: ${message || 'None'}
`;

    // Simple syntax: pass params from the form
    // OWNER: In your EmailJS template, you can use either {{email_body}} OR the individual fields
    const templateParams = {
      name,
      age,
      location,
      phone,
      email,
      hairLossLevel,
      message: message || emailBody,
      email_body: emailBody
    };
    // Send with explicit public key to avoid init mismatches
    emailjs
      .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY)
      .then(() => {
        // Reset form
        consultationForm.reset();
        document.getElementById('stage1').checked = true;
        updateHairLossSelection();
        
        alert('Form submitted successfully!');
        // Reset button
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
        
        // Reload after brief delay
        setTimeout(() => window.location.reload(), 400);
      })
      .catch((err) => {
        console.error('EmailJS error:', (err && (err.text || err.message)) || err);
        alert('Sorry, we could not submit your request right now. Please try again later.');
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
      });
  });
}

  // Fade-up animation for services, testimonials, roadmap, results, FAQ, footer, and contact
  const fadeElements = document.querySelectorAll('.fade-up, .fade-up-testimonial, .fade-up-roadmap, .fade-up-result, .fade-up-faq, .fade-up-footer, .fade-up-contact');
  
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

  // Testimonial carousel functionality with auto-rotation
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  const testimonialNavButtons = document.querySelectorAll('.testimonial-nav-button');
  const testimonialIndicators = document.querySelectorAll('.testimonial-indicator');
  const prevButton = document.querySelector('.prev-testimonial');
  const nextButton = document.querySelector('.next-testimonial');
  let currentTestimonialIndex = 0;
  const totalTestimonials = testimonialCards.length;
  let autoRotateInterval;
  
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
  
  // Function to show only the current testimonial
  function updateTestimonialVisibility() {
    testimonialCards.forEach((card, index) => {
      if (index === currentTestimonialIndex) {
        card.classList.add('active');
        card.style.transition = 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out';
        card.style.display = 'block';
      } else {
        card.classList.remove('active');
        card.style.display = 'none';
      }
    });
    
    // Update indicators
    updateIndicators();
  }
  
  // Function to navigate to a specific testimonial
  function navigateToTestimonial(index) {
    currentTestimonialIndex = index;
    updateTestimonialVisibility();
  }
  
  // Initialize testimonial visibility
  updateTestimonialVisibility();
  
  // Add event listeners to navigation buttons
  prevButton.addEventListener('click', function() {
    // Visual feedback
    this.classList.add('animate-pulse');
    setTimeout(() => {
      this.classList.remove('animate-pulse');
    }, 300);
    
    // Go to previous testimonial
    currentTestimonialIndex = (currentTestimonialIndex - 1 + totalTestimonials) % totalTestimonials;
    
    // Update which testimonial is visible
    updateTestimonialVisibility();
    
    // Reset auto-rotation timer
    resetAutoRotate();
    
    // Announce to screen readers
    const currentIndex = currentTestimonialIndex + 1;
    const announcement = `Showing testimonial ${currentIndex} of ${totalTestimonials}`;
    const ariaLive = document.createElement('div');
    ariaLive.setAttribute('aria-live', 'polite');
    ariaLive.classList.add('sr-only');
    ariaLive.textContent = announcement;
    document.body.appendChild(ariaLive);
    setTimeout(() => document.body.removeChild(ariaLive), 1000);
  });
  
  nextButton.addEventListener('click', function() {
    // Visual feedback
    this.classList.add('animate-pulse');
    setTimeout(() => {
      this.classList.remove('animate-pulse');
    }, 300);
    
    // Go to next testimonial
    currentTestimonialIndex = (currentTestimonialIndex + 1) % totalTestimonials;
    
    // Update which testimonial is visible
    updateTestimonialVisibility();
    
    // Reset auto-rotation timer
    resetAutoRotate();
    
    // Announce to screen readers
    const currentIndex = currentTestimonialIndex + 1;
    const announcement = `Showing testimonial ${currentIndex} of ${totalTestimonials}`;
    const ariaLive = document.createElement('div');
    ariaLive.setAttribute('aria-live', 'polite');
    ariaLive.classList.add('sr-only');
    ariaLive.textContent = announcement;
    document.body.appendChild(ariaLive);
    setTimeout(() => document.body.removeChild(ariaLive), 1000);
  });
  
  // Add event listeners to indicators
  testimonialIndicators.forEach((indicator, index) => {
    indicator.addEventListener('click', function() {
      navigateToTestimonial(index);
      resetAutoRotate();
      
      // Visual feedback for indicator click
      this.classList.add('pulse');
      setTimeout(() => {
        this.classList.remove('pulse');
      }, 300);
    });
  });
  
  // Auto-rotate testimonials every 5 seconds
  // Remove duplicate declaration that was causing issues
  function startAutoRotate() {
    // Clear any existing interval first
    if (autoRotateInterval) {
      clearInterval(autoRotateInterval);
    }
    
    autoRotateInterval = setInterval(() => {
      currentTestimonialIndex = (currentTestimonialIndex + 1) % totalTestimonials;
      updateTestimonialVisibility();
    }, 5000);
  }
  
  function resetAutoRotate() {
    // Reset the auto-rotation timer when user interacts
    if (autoRotateInterval) {
      clearInterval(autoRotateInterval);
    }
    startAutoRotate();
  }
  
  // Pause auto-rotation when user hovers over testimonials section
  const testimonialContainer = document.querySelector('.testimonials-container');
  if (testimonialContainer) {
    testimonialContainer.addEventListener('mouseenter', () => {
      clearInterval(autoRotateInterval);
    });
    
    testimonialContainer.addEventListener('mouseleave', () => {
      startAutoRotate();
    });
  }
  
  // Initialize testimonial visibility and start auto-rotation
  updateTestimonialVisibility();
  startAutoRotate();
  
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
    // Detect swipe direction (minimum 50px movement to count as swipe)
    if (touchEndX < touchStartX - 50) {
      // Swipe left - go to next testimonial
      currentTestimonialIndex = (currentTestimonialIndex + 1) % totalTestimonials;
      updateTestimonialVisibility();
      resetAutoRotate();
    }
    
    if (touchEndX > touchStartX + 50) {
      // Swipe right - go to previous testimonial
      currentTestimonialIndex = (currentTestimonialIndex - 1 + totalTestimonials) % totalTestimonials;
      updateTestimonialVisibility();
      resetAutoRotate();
    }
  }
});

