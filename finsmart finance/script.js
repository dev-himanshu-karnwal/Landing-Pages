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
        const headerHeight = document.querySelector(".header").offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
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

// Pricing toggle functionality
document.addEventListener("DOMContentLoaded", function () {
  const toggleButtons = document.querySelectorAll(".toggle-btn");
  const priceAmounts = document.querySelectorAll(".amount");

  const monthlyPrices = ["$0", "$9.99", "$19.99"];
  const annualPrices = ["$0", "$99", "$199"];

  toggleButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      toggleButtons.forEach((btn) => btn.classList.remove("active"));
      // Add active class to clicked button
      this.classList.add("active");

      const period = this.getAttribute("data-period");
      const prices = period === "annual" ? annualPrices : monthlyPrices;
      const periodText = period === "annual" ? "/year" : "/month";

      priceAmounts.forEach((amount, index) => {
        if (index < prices.length) {
          amount.textContent = prices[index];
          const periodElement = amount.nextElementSibling;
          if (periodElement && periodElement.classList.contains("period")) {
            periodElement.textContent = periodText;
          }
        }
      });
    });
  });
});

// Button click handlers
document.addEventListener("DOMContentLoaded", function () {
  const primaryButtons = document.querySelectorAll(".btn-primary");
  const secondaryButtons = document.querySelectorAll(".btn-secondary");
  const planButtons = document.querySelectorAll(".plan-btn");

  // Primary button handlers (Start Free Trial, etc.)
  primaryButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Add loading state
      const originalText = this.textContent;
      this.textContent = "Starting Trial...";
      this.disabled = true;
      this.classList.add("loading");

      // Simulate trial start process
      setTimeout(() => {
        this.textContent = "Trial Started!";
        this.style.background = "#28a745";
        this.classList.remove("loading");

        // Reset button after 3 seconds
        setTimeout(() => {
          this.textContent = originalText;
          this.disabled = false;
          this.style.background = "";
        }, 3000);
      }, 2000);
    });
  });

  // Secondary button handlers (Watch Demo)
  secondaryButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Simulate demo modal or video
      console.log("Opening demo video...");

      const originalHTML = this.innerHTML;
      this.innerHTML =
        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="10,8 16,12 10,16"></polyline></svg> Loading Demo...';
      this.disabled = true;

      setTimeout(() => {
        this.innerHTML = originalHTML;
        this.disabled = false;
        alert("Demo video would open here!");
      }, 1500);
    });
  });

  // Plan button handlers
  planButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const originalText = this.textContent;
      this.textContent = "Processing...";
      this.disabled = true;

      setTimeout(() => {
        this.textContent = "Success!";
        this.style.background = "#28a745";
        this.style.borderColor = "#28a745";
        this.style.color = "white";

        setTimeout(() => {
          this.textContent = originalText;
          this.disabled = false;
          this.style.background = "";
          this.style.borderColor = "";
          this.style.color = "";
        }, 2000);
      }, 1500);
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
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  // Add animation classes to sections
  const animatedElements = document.querySelectorAll(
    ".feature-card, .testimonial-card, .pricing-card, .security-feature"
  );

  animatedElements.forEach((element) => {
    element.classList.add("fade-in");
    observer.observe(element);
  });
});

// Counter animation for stats
document.addEventListener("DOMContentLoaded", function () {
  const statNumbers = document.querySelectorAll(".stat-number");

  const animateCounter = (element, target, duration = 2000) => {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }

      // Format the number based on the original text
      const originalText = element.textContent;
      if (originalText.includes("M+")) {
        element.textContent = `$${Math.floor(current)}M+`;
      } else if (originalText.includes("%")) {
        element.textContent = `${Math.floor(current)}%`;
      } else if (originalText.includes("K+")) {
        element.textContent = `${Math.floor(current)}K+`;
      } else if (originalText.includes("/5")) {
        element.textContent = `${(current / 10).toFixed(1)}/5`;
      }
    }, 16);
  };

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const text = element.textContent;

        if (text.includes("42M+")) {
          animateCounter(element, 42);
        } else if (text.includes("87%")) {
          animateCounter(element, 87);
        } else if (text.includes("250K+")) {
          animateCounter(element, 250);
        } else if (text.includes("4.8/5")) {
          animateCounter(element, 48);
        }

        statsObserver.unobserve(element);
      }
    });
  });

  statNumbers.forEach((stat) => {
    statsObserver.observe(stat);
  });
});

// Progress bar animations
document.addEventListener("DOMContentLoaded", function () {
  const progressBars = document.querySelectorAll(
    ".budget-progress, .goal-progress"
  );

  const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const progressBar = entry.target;
        const width = progressBar.style.width;
        progressBar.style.width = "0%";

        setTimeout(() => {
          progressBar.style.width = width;
        }, 100);

        progressObserver.unobserve(progressBar);
      }
    });
  });

  progressBars.forEach((bar) => {
    progressObserver.observe(bar);
  });
});

// Dashboard card hover effect
document.addEventListener("DOMContentLoaded", function () {
  const dashboardCard = document.querySelector(".dashboard-card");

  if (dashboardCard) {
    dashboardCard.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.05) rotateY(5deg)";
      this.style.transition = "transform 0.3s ease";
    });

    dashboardCard.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1) rotateY(0deg)";
    });
  }
});

// Error handling for images
document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll("img");

  images.forEach((img) => {
    img.addEventListener("error", function () {
      this.src =
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiBmaWxsPSIjZjVmNWY1Ii8+Cjx0ZXh0IHg9IjI1IiB5PSIyNSIgZmlsbD0iIzk5OSIgZm9udC1zaXplPSI4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iMC4zZW0iPk5vIEltYWdlPC90ZXh0Pgo8L3N2Zz4=";
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

// Analytics tracking (placeholder)
function trackEvent(eventName, properties = {}) {
  console.log(`Analytics Event: ${eventName}`, properties);
  // In a real application, this would send data to your analytics service
}

// Track button clicks
document.addEventListener("click", function (e) {
  if (e.target.matches(".btn-primary")) {
    trackEvent("primary_button_click", {
      button_text: e.target.textContent,
      page_section: e.target.closest("section")?.className || "unknown",
    });
  }

  if (e.target.matches(".btn-secondary")) {
    trackEvent("secondary_button_click", {
      button_text: e.target.textContent,
      page_section: e.target.closest("section")?.className || "unknown",
    });
  }

  if (e.target.matches(".plan-btn")) {
    trackEvent("plan_button_click", {
      plan_name:
        e.target.closest(".pricing-card")?.querySelector("h3")?.textContent ||
        "unknown",
      button_text: e.target.textContent,
    });
  }
});

// Page load performance
window.addEventListener("load", function () {
  const loadTime = performance.now();
  console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);

  trackEvent("page_load", {
    load_time: loadTime,
    user_agent: navigator.userAgent,
  });
});
