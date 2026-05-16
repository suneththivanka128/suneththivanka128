document.addEventListener('DOMContentLoaded', () => {
  // Theme Toggle Logic
  const themeBtn = document.getElementById('theme-btn');
  const icon = themeBtn.querySelector('i');
  
  // Check for saved theme preference or use default
  const currentTheme = localStorage.getItem('theme');
  if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'light') {
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
    }
  }

  themeBtn.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    
    if (theme === 'light') {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'dark');
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
    }
  });


  // Navbar Scroll Effect
  const navbar = document.querySelector('.glass-nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile Menu Toggle
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');
  
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Close mobile menu on link click
  document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    navLinks.classList.remove('active');
  }));

  // Scroll Reveal Animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Optional: stop observing once animated
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-up').forEach(el => {
    observer.observe(el);
  });

  // Form Submission via Formspree AJAX
  const contactForm = document.getElementById('contact-form');
  if(contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button');
      const originalText = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      
      const formData = new FormData(contactForm);
      const actionUrl = contactForm.getAttribute('action');
      
      // Basic check to see if the user replaced YOUR_FORM_ID
      if(actionUrl.includes('YOUR_FORM_ID')) {
        alert('Please replace YOUR_FORM_ID with your actual Formspree ID in index.html!');
        btn.innerHTML = originalText;
        return;
      }

      try {
        const response = await fetch(actionUrl, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          btn.innerHTML = '<i class="fas fa-check"></i> Sent Successfully';
          btn.style.background = 'var(--accent-2)';
          contactForm.reset();
          
          setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
          }, 3000);
        } else {
          throw new Error('Form submission failed');
        }
      } catch (error) {
        console.error(error);
        btn.innerHTML = '<i class="fas fa-times"></i> Error Sending';
        btn.style.background = '#ef4444'; // Red error color
        
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.style.background = '';
        }, 3000);
      }
    });
  }
});
