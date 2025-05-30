// Custom JavaScript for CRM Landing Page

document.addEventListener("DOMContentLoaded", function () {
  // Initialize all functionality
  initNavbar();
  initScrollAnimations();
  initFormHandling();
  initMetricAnimations();
  initSmoothScrolling();
  initParallaxEffects();
  initLoadingStates();
});

// Navbar functionality
function initNavbar() {
  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Mobile menu toggle
  const navbarToggler = document.querySelector(".navbar-toggler");
  const navbarCollapse = document.querySelector(".navbar-collapse");

  if (navbarToggler) {
    navbarToggler.addEventListener("click", function () {
      navbarCollapse.classList.toggle("show");
    });
  }

  // Close mobile menu when clicking on links
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      if (window.innerWidth < 992) {
        navbarCollapse.classList.remove("show");
      }
    });
  });
}

// Scroll animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        // Staggered animations for cards
        if (
          entry.target.classList.contains("feature-card") ||
          entry.target.classList.contains("testimonial-card")
        ) {
          const cards = entry.target.parentElement.querySelectorAll(
            ".feature-card, .testimonial-card"
          );
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.classList.add("slide-up");
            }, index * 100);
          });
        }
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animatedElements = document.querySelectorAll(
    ".feature-card, .testimonial-card, .hero-content, .pipeline-content, .pipeline-visual, .cta-content, .demo-form-container"
  );

  animatedElements.forEach((el) => {
    el.classList.add("fade-in");
    observer.observe(el);
  });
}

// Form handling
function initFormHandling() {
  const demoForm = document.getElementById("demoForm");

  if (demoForm) {
    demoForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(demoForm);
      const data = Object.fromEntries(formData);

      if (validateForm(data)) {
        submitForm(data);
      }
    });

    // Real-time validation
    const inputs = demoForm.querySelectorAll("input, select");
    inputs.forEach((input) => {
      input.addEventListener("blur", function () {
        validateField(this);
      });

      input.addEventListener("input", function () {
        clearFieldError(this);
      });
    });
  }
}

function validateForm(data) {
  const requiredFields = [
    "fullName",
    "workEmail",
    "companyName",
    "companySize",
    "demoTime",
  ];
  let isValid = true;

  requiredFields.forEach((field) => {
    const input = document.getElementById(field);
    if (!data[field] || data[field].trim() === "") {
      showFieldError(input, "This field is required");
      isValid = false;
    }
  });

  // Email validation
  if (data.workEmail && !isValidEmail(data.workEmail)) {
    showFieldError(
      document.getElementById("workEmail"),
      "Please enter a valid email address"
    );
    isValid = false;
  }

  // Consent validation
  if (!document.getElementById("consent").checked) {
    showFieldError(
      document.getElementById("consent"),
      "Please agree to receive communications"
    );
    isValid = false;
  }

  return isValid;
}

function validateField(input) {
  const value = input.value.trim();

  if (input.hasAttribute("required") && !value) {
    showFieldError(input, "This field is required");
    return false;
  }

  if (input.type === "email" && value && !isValidEmail(value)) {
    showFieldError(input, "Please enter a valid email address");
    return false;
  }

  clearFieldError(input);
  return true;
}

function showFieldError(input, message) {
  clearFieldError(input);

  input.classList.add("is-invalid");
  input.style.borderColor = "#ef4444";

  const errorDiv = document.createElement("div");
  errorDiv.className = "error-message";
  errorDiv.style.color = "#ef4444";
  errorDiv.style.fontSize = "0.875rem";
  errorDiv.style.marginTop = "0.25rem";
  errorDiv.textContent = message;

  input.parentNode.appendChild(errorDiv);
}

function clearFieldError(input) {
  input.classList.remove("is-invalid");
  input.style.borderColor = "";

  const errorDiv = input.parentNode.querySelector(".error-message");
  if (errorDiv) {
    errorDiv.remove();
  }
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function submitForm(data) {
  const submitBtn = document.querySelector(".submit-btn");
  const originalText = submitBtn.textContent;

  // Show loading state
  submitBtn.textContent = "Booking Demo...";
  submitBtn.disabled = true;
  submitBtn.classList.add("loading");

  // Simulate API call
  setTimeout(() => {
    // Show success message
    showSuccessMessage();

    // Reset form
    document.getElementById("demoForm").reset();

    // Reset button
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
    submitBtn.classList.remove("loading");

    // Track conversion (you can replace this with your analytics)
    if (typeof gtag !== "undefined") {
      gtag("event", "conversion", {
        send_to: "AW-CONVERSION_ID/CONVERSION_LABEL",
      });
    }
  }, 2000);
}

function showSuccessMessage() {
  const successHTML = `
        <div class="success-toast" style="
            position: fixed;
            top: 100px;
            right: 20px;
            background: #10b981;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            z-index: 9999;
            max-width: 400px;
            animation: slideInRight 0.3s ease;
        ">
            <div style="display: flex; align-items: center; gap: 0.75rem;">
                <i class="fas fa-check-circle" style="font-size: 1.25rem;"></i>
                <div>
                    <strong>Demo Booked Successfully!</strong><br>
                    <span style="opacity: 0.9; font-size: 0.875rem;">
                        We'll contact you within 24 hours to schedule your personalized demo.
                    </span>
                </div>
                <button onclick="this.parentElement.parentElement.remove()" style="
                    background: none;
                    border: none;
                    color: white;
                    font-size: 1.25rem;
                    cursor: pointer;
                    opacity: 0.7;
                    margin-left: auto;
                ">×</button>
            </div>
        </div>
    `;

  document.body.insertAdjacentHTML("beforeend", successHTML);

  // Auto remove after 5 seconds
  setTimeout(() => {
    const toast = document.querySelector(".success-toast");
    if (toast) {
      toast.style.animation = "slideOutRight 0.3s ease";
      setTimeout(() => toast.remove(), 300);
    }
  }, 5000);
}

// Metric animations
function initMetricAnimations() {
  const metricBars = document.querySelectorAll(".metric-progress");

  const metricObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const progressBar = entry.target;
          const width = progressBar.getAttribute("data-width");

          setTimeout(() => {
            progressBar.style.width = width + "%";
          }, 500);

          metricObserver.unobserve(progressBar);
        }
      });
    },
    { threshold: 0.5 }
  );

  metricBars.forEach((bar) => {
    metricObserver.observe(bar);
  });
}

// Smooth scrolling
function initSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 80;

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });
}

// Parallax effects
function initParallaxEffects() {
  const parallaxElements = document.querySelectorAll(".floating-circle");

  window.addEventListener("scroll", function () {
    const scrolled = window.pageYOffset;

    parallaxElements.forEach((element, index) => {
      const rate = scrolled * (0.2 + index * 0.1);
      element.style.transform = `translateY(${rate}px)`;
    });
  });
}

// Loading states
function initLoadingStates() {
  const buttons = document.querySelectorAll(".btn:not(.submit-btn)");

  buttons.forEach((btn) => {
    btn.addEventListener("click", function () {
      if (!this.classList.contains("loading")) {
        this.classList.add("loading");
        setTimeout(() => {
          this.classList.remove("loading");
        }, 1000);
      }
    });
  });
}

// Utility functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Add CSS animations
const style = document.createElement("style");
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .is-invalid {
        border-color: #ef4444 !important;
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;
    }
`;
document.head.appendChild(style);

// Performance optimization
window.addEventListener("load", function () {
  // Lazy load images
  const images = document.querySelectorAll("img[data-src]");
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
});

// Error handling
window.addEventListener("error", function (e) {
  console.error("JavaScript error:", e.error);
  // You can send this to your error tracking service
});

// Resize handler
window.addEventListener(
  "resize",
  debounce(function () {
    // Handle responsive changes
    const navbar = document.querySelector(".navbar-collapse");
    if (window.innerWidth >= 992 && navbar.classList.contains("show")) {
      navbar.classList.remove("show");
    }
  }, 250)
);
