// Document Ready Function
document.addEventListener("DOMContentLoaded", function () {
  // Initialize Facilities Slider
  const facilitiesSlider = new Swiper(".facilities-swiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      576: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 3,
      },
    },
  });

  // Team Card Hover Effects
  const teamCards = document.querySelectorAll(".team-card");

  teamCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-15px)";
      const badge = this.querySelector(".team-badge");
      if (badge) {
        badge.style.transform = "scale(1.1) rotate(10deg)";
      }
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
      const badge = this.querySelector(".team-badge");
      if (badge) {
        badge.style.transform = "scale(1) rotate(0)";
      }
    });
  });

  // Coach Card Hover Effects
  const coachCards = document.querySelectorAll(".coach-card");

  coachCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      const img = this.querySelector(".coach-image img");
      if (img) {
        img.style.transform = "scale(1.1)";
      }
    });

    card.addEventListener("mouseleave", function () {
      const img = this.querySelector(".coach-image img");
      if (img) {
        img.style.transform = "scale(1)";
      }
    });
  });

  // Timeline Animation
  const timelineItems = document.querySelectorAll(".timeline-item");

  // Add animation classes to timeline
  const timelineObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
        }
      });
    },
    {
      threshold: 0.2,
    }
  );

  timelineItems.forEach((item) => {
    timelineObserver.observe(item);
  });

  // Add CSS for timeline animations
  const style = document.createElement("style");
  style.textContent = `
        .timeline-item {
            opacity: 0;
            transform: translateX(-30px);
            transition: all 0.5s ease;
        }
        
        .timeline-item.animate {
            opacity: 1;
            transform: translateX(0);
        }
        
        .timeline-item:nth-child(1).animate {
            transition-delay: 0.1s;
        }
        
        .timeline-item:nth-child(2).animate {
            transition-delay: 0.3s;
        }
        
        .timeline-item:nth-child(3).animate {
            transition-delay: 0.5s;
        }
        
        .timeline-item:nth-child(4).animate {
            transition-delay: 0.7s;
        }
        
        /* Hover Effects for Timeline */
        .timeline-content {
            transition: all 0.3s ease;
        }
        
        .timeline-content:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }
        
        /* Hover Effects for Timeline Dot */
        .timeline-dot {
            transition: all 0.3s ease;
        }
        
        .timeline-item:hover .timeline-dot {
            transform: scale(1.5);
            background-color: var(--primary-color);
        }
        
        /* Facility Card Hover Effects */
        .facility-card {
            transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .facility-card:hover {
            transform: translateY(-10px) scale(1.03);
        }
        
        /* Join Team Button Effects */
        .btn-join {
            position: relative;
            overflow: hidden;
        }
        
        .btn-join:before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
            transition: all 0.5s ease;
        }
        
        .btn-join:hover:before {
            left: 100%;
        }
        
        /* Add Pulse Animation to Join Team CTA Button */
        @keyframes pulse {
            0% {
                transform: scale(1);
                box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7);
            }
            70% {
                transform: scale(1.05);
                box-shadow: 0 0 0 10px rgba(255, 255, 255, 0);
            }
            100% {
                transform: scale(1);
                box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
            }
        }
        
        .join-team-cta .btn {
            animation: pulse 2s infinite;
        }
        
        /* Coach Social Icons Animation */
        .coach-social a {
            transform: translateY(20px);
            opacity: 0;
            transition: all 0.3s ease;
        }
        
        .coach-card:hover .coach-social a {
            transform: translateY(0);
            opacity: 1;
        }
        
        .coach-card:hover .coach-social a:nth-child(1) {
            transition-delay: 0.1s;
        }
        
        .coach-card:hover .coach-social a:nth-child(2) {
            transition-delay: 0.2s;
        }
        
        .coach-card:hover .coach-social a:nth-child(3) {
            transition-delay: 0.3s;
        }
    `;
  document.head.appendChild(style);

  // 3D Tilt Effect for Facility Cards
  const facilityCards = document.querySelectorAll(".facility-card");

  facilityCards.forEach((card) => {
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
  });

  // Add Ripple Effect to Buttons
  const buttons = document.querySelectorAll(".btn, .btn-join");

  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const x = e.clientX - e.target.getBoundingClientRect().left;
      const y = e.clientY - e.target.getBoundingClientRect().top;

      const ripple = document.createElement("span");
      ripple.classList.add("ripple");
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // Add Ripple CSS
  const rippleStyle = document.createElement("style");
  rippleStyle.textContent = `
        .btn, .btn-join {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            transform: scale(0);
            animation: rippleEffect 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes rippleEffect {
            to {
                transform: scale(2.5);
                opacity: 0;
            }
        }
    `;
  document.head.appendChild(rippleStyle);

  // Add Parallax Effect to Join Team CTA
  const joinTeamCta = document.querySelector(".join-team-cta");

  if (joinTeamCta) {
    window.addEventListener("scroll", function () {
      const scrollPosition = window.scrollY;
      const offset = joinTeamCta.offsetTop;
      const windowHeight = window.innerHeight;

      if (scrollPosition + windowHeight > offset) {
        const yPos = -(scrollPosition - offset) * 0.2;
        joinTeamCta.style.backgroundPosition = `center ${yPos}px`;
      }
    });
  }

  // Add Animated Counter for Team Details
  const animateValue = (element, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      element.textContent = Math.floor(progress * (end - start) + start);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  };

  // Trigger animation when team card is visible
  const teamDetailObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const trophyCounters = entry.target.querySelectorAll(
            ".detail:nth-child(2) span"
          );
          trophyCounters.forEach((counter) => {
            const value = counter.textContent.match(/\d+/);
            if (value) {
              animateValue(counter, 0, parseInt(value[0]), 1000);
            }
          });
          teamDetailObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.5,
    }
  );

  teamCards.forEach((card) => {
    teamDetailObserver.observe(card);
  });

  // Add Floating Animation to Team Badges
  const floatingStyle = document.createElement("style");
  floatingStyle.textContent = `
        @keyframes floating {
            0% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
            100% { transform: translateY(0); }
        }
        
        .team-badge {
            animation: floating 3s ease-in-out infinite;
        }
    `;
  document.head.appendChild(floatingStyle);

  // Add Smooth Scrolling for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector("header").offsetHeight;
        const targetPosition =
          targetElement.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = targetPosition - headerHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });
});
