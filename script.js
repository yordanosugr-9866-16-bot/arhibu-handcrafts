/* ============================================================
   አርሂቡ Hand Crafts Shop — Main Script
   ============================================================ */

/* ---------- 1. Mobile Navigation Toggle ---------- */
const navToggle = document.getElementById('navToggle');
const mainNav   = document.getElementById('mainNav');

if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  // Close nav when a link is clicked
  mainNav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Close nav on outside click
  document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !mainNav.contains(e.target)) {
      mainNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ---------- 2. Active Nav Link on Scroll ---------- */
const sections = document.querySelectorAll('section[id], header[id]');
const navLinks  = document.querySelectorAll('.nav-link[href^="#"]');

function updateActiveNav() {
  const scrollY = window.scrollY + 100;
  let current = '';

  sections.forEach(section => {
    if (scrollY >= section.offsetTop) {
      current = section.id;
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });


/* ---------- 3. Counter Widget ---------- */
const incResult = document.getElementById('incresult');
const incBtn    = document.getElementById('incbtn');
const decBtn    = document.getElementById('decbtn');

if (incResult && incBtn && decBtn) {
  let count = 0;

  function updateCounter() {
    incResult.textContent = count;
    // Visual cue for positive/negative
    incResult.style.color = count < 0 ? '#C0392B' : count > 0 ? '#3A5E3F' : 'inherit';
  }

  incBtn.addEventListener('click', () => {
    count += 1;
    updateCounter();
  });

  decBtn.addEventListener('click', () => {
    count -= 1;
    updateCounter();
  });
}


/* ---------- 4. Background Color Switcher ---------- */
const colorBtns = document.querySelectorAll('.color-btn');

colorBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    if (btn.dataset.reset) {
      // Reset to original CSS variable values
      document.body.style.removeProperty('background-color');
      document.body.style.removeProperty('color');
    } else {
      document.body.style.backgroundColor = btn.dataset.color;
      document.body.style.color = btn.dataset.text || 'black';
    }
  });
});


/* ---------- 5. Contact Form Validation ---------- */
const contactForm  = document.getElementById('contactForm');
const formSuccess  = document.getElementById('formSuccess');

function showError(inputId, errorId, message) {
  const input = document.getElementById(inputId);
  const error = document.getElementById(errorId);
  if (input)  input.classList.add('error');
  if (error)  error.textContent = message;
}

function clearError(inputId, errorId) {
  const input = document.getElementById(inputId);
  const error = document.getElementById(errorId);
  if (input)  input.classList.remove('error');
  if (error)  error.textContent = '';
}

function validateForm() {
  let isValid = true;

  // First name
  const firstName = document.getElementById('firstName');
  clearError('firstName', 'firstNameError');
  if (!firstName || firstName.value.trim() === '') {
    showError('firstName', 'firstNameError', 'ስምዎን ያስገቡ — Please enter your first name.');
    isValid = false;
  }

  // Last name
  const lastName = document.getElementById('lastName');
  clearError('lastName', 'lastNameError');
  if (!lastName || lastName.value.trim() === '') {
    showError('lastName', 'lastNameError', 'የአባትዎን ስም ያስገቡ — Please enter your last name.');
    isValid = false;
  }

  // Password
  const password = document.getElementById('userPassword');
  clearError('userPassword', 'passwordError');
  if (!password || password.value.trim() === '') {
    showError('userPassword', 'passwordError', 'መለያ ቁጥር ያስፈልጋል — A password is required.');
    isValid = false;
  } else if (password.value.length < 4) {
    showError('userPassword', 'passwordError', 'መለያ ቁጥሩ ቢያንስ 4 ቁምፊ ሊኖረው ይገባል — Password must be at least 4 characters.');
    isValid = false;
  }

  // Email (optional but validate format if filled)
  const email = document.getElementById('userEmail');
  clearError('userEmail', 'emailError');
  if (email && email.value.trim() !== '') {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value.trim())) {
      showError('userEmail', 'emailError', 'እባክዎ ትክክለኛ email ያስገቡ — Please enter a valid email address.');
      isValid = false;
    }
  }

  return isValid;
}

if (contactForm && formSuccess) {
  // Real-time error clearing on input
  ['firstName', 'lastName', 'userPassword', 'userEmail'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', () => clearError(id, id + 'Error'));
    }
  });

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    formSuccess.classList.remove('visible');
    formSuccess.textContent = '';

    if (validateForm()) {
      // Show success message
      formSuccess.textContent = '✓ አመሰግናለሁ! — Thank you! Your message has been received. We will contact you soon.';
      formSuccess.classList.add('visible');

      // Scroll to success message
      formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

      // Reset form after a short delay
      setTimeout(() => {
        contactForm.reset();
        formSuccess.classList.remove('visible');
      }, 5000);
    } else {
      // Scroll to first error
      const firstError = contactForm.querySelector('.error');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstError.focus();
      }
    }
  });

  // Clear success on reset
  contactForm.addEventListener('reset', () => {
    formSuccess.classList.remove('visible');
    ['firstName', 'lastName', 'userPassword', 'userEmail'].forEach(id => {
      clearError(id, id + 'Error');
    });
  });
}


/* ---------- 6. Footer Year ---------- */
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}


/* ---------- 7. Scroll-reveal (lightweight, no library) ---------- */
function revealOnScroll() {
  const cards = document.querySelectorAll('.product-card, .stat, .price-table tr');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  cards.forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(24px)';
    card.style.transition = `opacity 0.4s ease ${i * 0.06}s, transform 0.4s ease ${i * 0.06}s`;

    // Respect reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      card.style.opacity = '1';
      card.style.transform = 'none';
      card.style.transition = 'none';
    } else {
      observer.observe(card);
    }
  });
}

// Run after DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', revealOnScroll);
} else {
  revealOnScroll();
}
