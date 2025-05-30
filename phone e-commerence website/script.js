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

// Tab switching for deals section
document.addEventListener("DOMContentLoaded", function () {
  const tabButtons = document.querySelectorAll(".tab-btn");

  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      // Add active class to clicked button
      this.classList.add("active");

      // Here you would typically load different content
      // For demo purposes, we'll just update the button state
    });
  });
});

// Search functionality
document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.querySelector(".search-input");
  const filterSelects = document.querySelectorAll(".filter-select");

  searchInput.addEventListener("input", function () {
    // Implement search functionality
    console.log("Searching for:", this.value);
  });

  filterSelects.forEach((select) => {
    select.addEventListener("change", function () {
      // Implement filter functionality
      console.log("Filter changed:", this.value);
    });
  });
});

// Add to cart functionality
document.addEventListener("DOMContentLoaded", function () {
  const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Add loading state
      const originalText = this.textContent;
      this.textContent = "Adding...";
      this.disabled = true;

      // Simulate API call
      setTimeout(() => {
        this.textContent = "Added!";
        this.style.background = "#28a745";

        // Update cart count
        const cartCounts = document.querySelectorAll(".cart-count");
        cartCounts.forEach((cartCount) => {
          const currentCount = parseInt(cartCount.textContent) || 0;
          cartCount.textContent = currentCount + 1;
        });

        // Reset button after 2 seconds
        setTimeout(() => {
          this.textContent = originalText;
          this.disabled = false;
          this.style.background = "";
        }, 2000);
      }, 1000);
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

      if (emailInput.value) {
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
        }, 1000);
      }
    });
  }
});

// Smooth scrolling for anchor links
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
    ".feature-card, .product-card, .testimonial-card, .blog-card"
  );

  animatedElements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(element);
  });
});

// Product comparison functionality
document.addEventListener("DOMContentLoaded", function () {
  const compareButton = document.querySelector(".btn-outline");

  if (compareButton) {
    compareButton.addEventListener("click", function () {
      // Simulate loading more comparison models
      this.textContent = "Loading...";
      this.disabled = true;

      setTimeout(() => {
        this.textContent = "Compare More Models";
        this.disabled = false;
        // Here you would typically load more comparison data
      }, 1500);
    });
  }
});

// Header scroll effect
window.addEventListener("scroll", function () {
  const header = document.querySelector(".header");

  if (window.scrollY > 100) {
    header.style.background = "rgba(26, 31, 46, 0.95)";
    header.style.backdropFilter = "blur(10px)";
  } else {
    header.style.background = "#1a1f2e";
    header.style.backdropFilter = "none";
  }
});

// Price formatting
function formatPrice(price) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

// Local storage for cart items
function updateCartCount() {
  const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
  const cartCounts = document.querySelectorAll(".cart-count");
  cartCounts.forEach((cartCount) => {
    if (cartCount) {
      cartCount.textContent = cartItems.length;
    }
  });
}

// Initialize cart count on page load
document.addEventListener("DOMContentLoaded", function () {
  updateCartCount();
});

// Form validation
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Error handling for images
document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll("img");

  images.forEach((img) => {
    img.addEventListener("error", function () {
      this.src =
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjZjVmNWY1Ii8+Cjx0ZXh0IHg9IjE1MCIgeT0iMTUwIiBmaWxsPSIjOTk5IiBmb250LXNpemU9IjE0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iMC4zZW0iPkltYWdlIG5vdCBmb3VuZDwvdGV4dD4KPHN2Zz4=";
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
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  const lazyImages = document.querySelectorAll("img[data-src]");
  lazyImages.forEach((img) => imageObserver.observe(img));
}
