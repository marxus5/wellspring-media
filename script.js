// Mobile menu toggle
  const hamburger = document.querySelector('.hamburger');
  const navContainer = document.querySelector('.nav-container');
  const nav = document.querySelector('nav');

  // Transparent nav — add .scrolled once user scrolls past 60px
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
  
  hamburger.addEventListener('click', () => {
    navContainer.classList.toggle('active');
    hamburger.classList.toggle('active');
  });

  // Close menu when a link is clicked
  const navLinks = document.querySelectorAll('.nav-container a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navContainer.classList.remove('active');
      hamburger.classList.remove('active');
    });
  });

  // Intersection observer for reveal animations
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 60);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  revealEls.forEach(el => io.observe(el));

// Contact form — mailto handler
  const submitBtn = document.querySelector('.submit-btn');

  submitBtn.addEventListener('click', () => {
  // Grab field values
  const firstName = document.querySelector('input[placeholder="Jordan"]').value.trim();
  const lastName  = document.querySelector('input[placeholder="Ellis"]').value.trim();
  const email     = document.querySelector('input[type="email"]').value.trim();
  const service   = document.querySelector('select').value;
  const message   = document.querySelector('textarea').value.trim();

  // Basic validation — highlight empty required fields
  let valid = true;
  [firstName, lastName, email, message].forEach((val, i) => {
    const fields = [
      document.querySelector('input[placeholder="Jordan"]'),
      document.querySelector('input[placeholder="Ellis"]'),
      document.querySelector('input[type="email"]'),
      document.querySelector('textarea'),
    ];
    if (!val) {
      fields[i].style.borderColor = '#c0392b';
      valid = false;
    } else {
      fields[i].style.borderColor = '';
    }
  });

  if (!valid) {
    submitBtn.textContent = 'Please fill in required fields';
    submitBtn.style.background = '#c0392b';
    setTimeout(() => {
      submitBtn.textContent = 'Send Message →';
      submitBtn.style.background = '';
    }, 3000);
    return;
  }

  // Build mailto
  const to      = 'samuel@wellspringmedia.net';
  const subject = encodeURIComponent(
    `Project Inquiry${service ? ' — ' + service : ''} from ${firstName} ${lastName}`
  );
  const body = encodeURIComponent(
    `Name: ${firstName} ${lastName}\n` +
    `Email: ${email}\n` +
    `Service: ${service || 'Not specified'}\n\n` +
    `Message:\n${message}`
  );

  window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;

  // Button feedback
  submitBtn.textContent = 'Opening Mail App ✓';
    submitBtn.style.background = '#2a7a9a';
    setTimeout(() => {
      submitBtn.textContent = 'Send Message →';
      submitBtn.style.background = '';
    }, 3000);
  });