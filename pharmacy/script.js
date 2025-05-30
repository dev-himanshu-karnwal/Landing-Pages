document.addEventListener("DOMContentLoaded", function () {
  // Mobile Navigation Toggle
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger) {
    hamburger.addEventListener("click", function () {
      navLinks.classList.toggle("active");
      hamburger.classList.toggle("active");
    });
  }

  // Mood Selection
  const moodOptions = document.querySelectorAll(".mood-option");

  moodOptions.forEach((option) => {
    option.addEventListener("click", function () {
      // Remove selected class from all options
      moodOptions.forEach((opt) => opt.classList.remove("selected"));

      // Add selected class to clicked option
      this.classList.add("selected");
    });
  });

  // Mood Chart
  const ctx = document.getElementById("moodChart");

  if (ctx) {
    new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            label: "Mood",
            data: [2, 1, 3, 4, 3, 2, 5],
            fill: {
              target: "origin",
              above: "rgba(74, 123, 255, 0.1)",
            },
            borderColor: "#4a7bff",
            tension: 0.4,
            pointBackgroundColor: "#4a7bff",
            pointRadius: 5,
            pointHoverRadius: 7,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            max: 5,
            ticks: {
              stepSize: 1,
              callback: function (value) {
                const labels = [
                  "Worst",
                  "Down",
                  "Neutral",
                  "Good",
                  "Great",
                  "Amazing",
                ];
                return labels[value];
              },
            },
            grid: {
              display: true,
              color: "rgba(0, 0, 0, 0.05)",
            },
          },
          x: {
            grid: {
              display: false,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                const labels = [
                  "Worst",
                  "Down",
                  "Neutral",
                  "Good",
                  "Great",
                  "Amazing",
                ];
                return labels[context.raw];
              },
            },
          },
        },
      },
    });
  }

  // Chat Functionality
  const chatInput = document.querySelector(".chat-input input");
  const sendBtn = document.querySelector(".send-btn");
  const chatMessages = document.querySelector(".chat-messages");

  if (chatInput && sendBtn && chatMessages) {
    sendBtn.addEventListener("click", sendMessage);
    chatInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        sendMessage();
      }
    });
  }

  function sendMessage() {
    const message = chatInput.value.trim();

    if (message !== "") {
      // Add user message
      const userMessage = document.createElement("div");
      userMessage.classList.add("message", "user");
      userMessage.innerHTML = `<p>${message}</p>`;
      chatMessages.appendChild(userMessage);

      // Clear input
      chatInput.value = "";

      // Scroll to bottom
      chatMessages.scrollTop = chatMessages.scrollHeight;

      // Simulate assistant response after a delay
      setTimeout(() => {
        const assistantMessage = document.createElement("div");
        assistantMessage.classList.add("message", "assistant");

        // Simple response logic
        let response = "";
        const lowerMessage = message.toLowerCase();

        if (
          lowerMessage.includes("anxious") ||
          lowerMessage.includes("anxiety")
        ) {
          response =
            "I understand anxiety can be challenging. Would you like to try a quick breathing exercise to help calm your mind?";
        } else if (
          lowerMessage.includes("sad") ||
          lowerMessage.includes("depressed")
        ) {
          response =
            "I'm sorry to hear you're feeling down. Remember that it's okay to not be okay sometimes. Would you like to explore some mood-lifting activities?";
        } else if (
          lowerMessage.includes("sleep") ||
          lowerMessage.includes("tired")
        ) {
          response =
            "Sleep issues can significantly impact your wellbeing. I can suggest some relaxation techniques that might help improve your sleep quality.";
        } else if (
          lowerMessage.includes("stress") ||
          lowerMessage.includes("overwhelmed")
        ) {
          response =
            "It sounds like you're dealing with a lot right now. Let's break things down into smaller, manageable steps. What's your biggest concern at the moment?";
        } else {
          response =
            "Thank you for sharing. How can I support you today? We could explore coping strategies, relaxation techniques, or just continue talking about what's on your mind.";
        }

        assistantMessage.innerHTML = `<p>${response}</p>`;
        chatMessages.appendChild(assistantMessage);

        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }, 1000);
    }
  }

  // Animate elements when they come into view
  const animateOnScroll = function () {
    const elements = document.querySelectorAll(
      ".fade-in, .slide-in-left, .slide-in-right"
    );

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementPosition < windowHeight - 50) {
        element.style.animationDelay = "0.2s";
        element.style.animationPlayState = "running";
      }
    });
  };

  // Run animation check on load
  animateOnScroll();

  // Run animation check on scroll
  window.addEventListener("scroll", animateOnScroll);

  // Progress circles animation
  const circles = document.querySelectorAll(".circle");

  circles.forEach((circle) => {
    const value = circle.getAttribute("stroke-dasharray").split(",")[0];
    circle.style.strokeDasharray = "0, 100";

    setTimeout(() => {
      circle.style.strokeDasharray = `${value}, 100`;
    }, 500);
  });
});
