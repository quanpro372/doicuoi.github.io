// Document Ready Function
document.addEventListener("DOMContentLoaded", function () {
  // Info Card Hover Effect with 3D Tilt
  const infoCards = document.querySelectorAll(".info-card");

  infoCards.forEach((card) => {
    card.addEventListener("mousemove", function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position within the element
      const y = e.clientY - rect.top; // y position within the element

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const deltaX = ((x - centerX) / centerX) * 5; // max 5 degrees
      const deltaY = ((y - centerY) / centerY) * 5; // max 5 degrees

      this.style.transform = `perspective(1000px) rotateX(${-deltaY}deg) rotateY(${deltaX}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform =
        "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)";
    });

    // Add ripple effect on click
    card.addEventListener("click", function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = document.createElement("span");
      ripple.classList.add("ripple-effect");
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // FAQ Toggle Functionality
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {
      // Close other open FAQs
      faqItems.forEach((otherItem) => {
        if (otherItem !== item && otherItem.classList.contains("active")) {
          otherItem.classList.remove("active");
        }
      });

      // Toggle current FAQ
      item.classList.toggle("active");
    });
  });

  // Counter Animation for Stats
  const counters = document.querySelectorAll(".stats-number");

  if (counters.length > 0) {
    const counterObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.getAttribute("data-count"));
            let count = 0;
            const updateCounter = () => {
              const increment = target / 100;
              if (count < target) {
                count += increment;
                counter.innerText = Math.ceil(count);
                setTimeout(updateCounter, 20);
              } else {
                counter.innerText = target;
              }
            };
            updateCounter();
            observer.unobserve(counter);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach((counter) => {
      counterObserver.observe(counter);
    });
  }

  // Add dynamic hover effect to links
  const buttons = document.querySelectorAll(".btn");
  buttons.forEach((button) => {
    button.addEventListener("mouseenter", function (e) {
      const x = e.pageX - this.offsetLeft;
      const y = e.pageY - this.offsetTop;

      const ripples = document.createElement("span");
      ripples.classList.add("btn-ripple");
      ripples.style.left = x + "px";
      ripples.style.top = y + "px";
      this.appendChild(ripples);

      setTimeout(() => {
        ripples.remove();
      }, 600);
    });
  });

  // Add ripple effect CSS
  const style = document.createElement("style");
  style.innerHTML = `
        .ripple-effect {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .btn-ripple {
            position: absolute;
            width: 0;
            height: 0;
            background: rgba(255, 255, 255, 0.4);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            animation: btnRipple 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes btnRipple {
            0% {
                width: 0;
                height: 0;
                opacity: 0.5;
            }
            100% {
                width: 500px;
                height: 500px;
                opacity: 0;
            }
        }
        
        /* Add hover animation for info cards */
        .info-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .info-card:hover {
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
        }
        
        .info-card .info-icon {
            transition: transform 0.3s ease;
        }
        
        .info-card:hover .info-icon {
            transform: scale(1.1) rotate(10deg);
        }
    `;
  document.head.appendChild(style);

  // Add subtle particle background to page title
  const pageTitle = document.querySelector(".page-title");
  if (pageTitle) {
    const particleContainer = document.createElement("div");
    particleContainer.classList.add("particles-container");
    pageTitle.appendChild(particleContainer);

    // Add particle styles
    const particleStyle = document.createElement("style");
    particleStyle.innerHTML = `
            .particles-container {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                overflow: hidden;
                z-index: 0;
            }
            
            .particle {
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.15);
                pointer-events: none;
                z-index: -1;
            }
        `;
    document.head.appendChild(particleStyle);

    // Create particles
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement("div");
      particle.classList.add("particle");

      // Random size between 5 and 20px
      const size = Math.random() * 15 + 5;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;

      // Random position
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      particle.style.left = `${posX}%`;
      particle.style.top = `${posY}%`;

      // Random opacity
      particle.style.opacity = Math.random() * 0.5 + 0.1;

      // Random animation duration between 10 and 30 seconds
      const duration = Math.random() * 20 + 10;
      particle.style.animation = `float ${duration}s infinite ease-in-out`;

      // Random delay
      particle.style.animationDelay = `${Math.random() * 5}s`;

      particleContainer.appendChild(particle);
    }

    // Add float animation
    const floatStyle = document.createElement("style");
    floatStyle.innerHTML = `
            @keyframes float {
                0% {
                    transform: translateY(0) translateX(0) rotate(0);
                }
                25% {
                    transform: translateY(-20px) translateX(10px) rotate(5deg);
                }
                50% {
                    transform: translateY(0) translateX(20px) rotate(10deg);
                }
                75% {
                    transform: translateY(20px) translateX(10px) rotate(5deg);
                }
                100% {
                    transform: translateY(0) translateX(0) rotate(0);
                }
            }
        `;
    document.head.appendChild(floatStyle);
  }
});
