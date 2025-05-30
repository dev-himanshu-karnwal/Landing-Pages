// Mobile menu functionality
document.addEventListener("DOMContentLoaded", function () {
  const hamburgerMenu = document.getElementById("hamburgerMenu");
  const mobileMenuOverlay = document.getElementById("mobileMenuOverlay");
  const closeMenu = document.getElementById("closeMenu");
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

  // Open mobile menu
  hamburgerMenu.addEventListener("click", function () {
    mobileMenuOverlay.classList.add("active");
    hamburgerMenu.classList.add("active");
    document.body.style.overflow = "hidden";
  });

  // Close mobile menu
  closeMenu.addEventListener("click", function () {
    mobileMenuOverlay.classList.remove("active");
    hamburgerMenu.classList.remove("active");
    document.body.style.overflow = "";
  });

  // Close menu when clicking on overlay
  mobileMenuOverlay.addEventListener("click", function (e) {
    if (e.target === mobileMenuOverlay) {
      mobileMenuOverlay.classList.remove("active");
      hamburgerMenu.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

  // Close menu when clicking on nav links
  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", function () {
      mobileMenuOverlay.classList.remove("active");
      hamburgerMenu.classList.remove("active");
      document.body.style.overflow = "";
    });
  });

  // Close menu on escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && mobileMenuOverlay.classList.contains("active")) {
      mobileMenuOverlay.classList.remove("active");
      hamburgerMenu.classList.remove("active");
      document.body.style.overflow = "";
    }
  });
});

// Smooth scrolling for navigation links
document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
});

// Header scroll effect
window.addEventListener("scroll", function () {
  const header = document.querySelector(".header");

  if (window.scrollY > 100) {
    header.style.background = "rgba(255, 255, 255, 0.98)";
    header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
  } else {
    header.style.background = "rgba(255, 255, 255, 0.95)";
    header.style.boxShadow = "none";
  }
});

// Filter functionality
document.addEventListener("DOMContentLoaded", function () {
  const filterSelect = document.querySelector(".filter-select");
  const toggleSwitch = document.querySelector(".toggle-switch input");

  filterSelect.addEventListener("change", function () {
    console.log("Filter changed to:", this.value);
    // Implement filter logic here
  });

  toggleSwitch.addEventListener("change", function () {
    console.log("Show available only:", this.checked);
    // Implement availability filter logic here
  });
});

// Book now functionality
document.addEventListener("DOMContentLoaded", function () {
  const bookButtons = document.querySelectorAll(
    ".book-btn, .book-now-btn, .mobile-book-btn"
  );

  bookButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Add loading state
      const originalText = this.textContent;
      this.textContent = "Booking...";
      this.disabled = true;

      // Simulate booking process
      setTimeout(() => {
        this.textContent = "Booked!";
        this.style.background = "#28a745";

        // Reset button after 3 seconds
        setTimeout(() => {
          this.textContent = originalText;
          this.disabled = false;
          this.style.background = "";
        }, 3000);
      }, 2000);
    });
  });
});

// Newsletter subscription
document.addEventListener("DOMContentLoaded", function () {
  const newsletterForm = document.querySelector(".newsletter-form");

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const emailInput = this.querySelector(".newsletter-input");
      const submitButton = this.querySelector(".newsletter-btn");

      if (emailInput.value && validateEmail(emailInput.value)) {
        const originalText = submitButton.textContent;
        submitButton.textContent = "Subscribing...";
        submitButton.disabled = true;

        // Simulate API call
        setTimeout(() => {
          submitButton.textContent = "Subscribed!";
          submitButton.style.background = "#28a745";
          emailInput.value = "";

          // Reset button after 3 seconds
          setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            submitButton.style.background = "";
          }, 3000);
        }, 1500);
      } else {
        alert("Please enter a valid email address.");
      }
    });
  }
});

// Email validation
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Intersection Observer for animations
document.addEventListener("DOMContentLoaded", function () {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Add animation classes to elements
  const animatedElements = document.querySelectorAll(
    ".experience-card, .retreat-card, .testimonial-card"
  );

  animatedElements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition = "opacity 0.8s ease, transform 0.8s ease";
    observer.observe(element);
  });
});

// Parallax effect for hero section
window.addEventListener("scroll", function () {
  const scrolled = window.pageYOffset;
  const heroImage = document.querySelector(".hero-image");

  if (heroImage) {
    const rate = scrolled * -0.5;
    heroImage.style.transform = `translateY(${rate}px)`;
  }
});

// CTA buttons functionality
document.addEventListener("DOMContentLoaded", function () {
  const ctaButtons = document.querySelectorAll(
    ".btn-primary, .btn-secondary, .explore-btn"
  );

  ctaButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Add ripple effect
      const ripple = document.createElement("span");
      ripple.classList.add("ripple");
      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
});

// Learn more links functionality
document.addEventListener("DOMContentLoaded", function () {
  const learnMoreLinks = document.querySelectorAll(".learn-more");

  learnMoreLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      // Simulate navigation to retreat details
      console.log("Navigating to retreat details...");

      // Add loading state
      const originalText = this.textContent;
      this.textContent = "Loading...";

      setTimeout(() => {
        this.textContent = originalText;
      }, 2000);
    });
  });
});

// Error handling for images
document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll("img");

  images.forEach((img) => {
    img.addEventListener("error", function () {
      this.src =
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjZjVmNWY1Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiBmaWxsPSIjOTk5IiBmb250LXNpemU9IjE2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iMC4zZW0iPkltYWdlIG5vdCBmb3VuZDwvdGV4dD4KPHN2Zz4=";
      this.alt = "Image not found";
    });
  });
});

// Performance optimization - lazy loading
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.classList.remove("lazy");
          imageObserver.unobserve(img);
        }
      }
    });
  });

  const lazyImages = document.querySelectorAll("img[data-src]");
  lazyImages.forEach((img) => imageObserver.observe(img));
}

// Add CSS for ripple effect
const style = document.createElement("style");
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
