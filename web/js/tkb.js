// Document Ready Function
document.addEventListener("DOMContentLoaded", function () {
  // Initialize AOS animations
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true,
  });

  // Tab switching functionality
  const tabs = document.querySelectorAll(".tab");
  const daySchedules = document.querySelectorAll(".day-schedule");

  tabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      // Remove active class from all tabs
      tabs.forEach((t) => t.classList.remove("active"));

      // Add active class to clicked tab
      this.classList.add("active");

      // Hide all day schedules
      daySchedules.forEach((schedule) => {
        schedule.classList.remove("active");
      });

      // Show corresponding day schedule
      const day = this.getAttribute("data-day");
      document.getElementById(`${day}-schedule`).classList.add("active");
    });
  });

  // Schedule Card Hover Effects
  const scheduleCards = document.querySelectorAll(
    ".schedule-card:not(.break-card)"
  );

  scheduleCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px)";
      const badge = this.querySelector(".subject-badge");
      if (badge) {
        badge.style.transform = "rotate(15deg) scale(1.1)";
      }
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
      const badge = this.querySelector(".subject-badge");
      if (badge) {
        badge.style.transform = "rotate(0) scale(1)";
      }
    });
  });

  // Teacher Card Hover Effects
  const teacherCards = document.querySelectorAll(".teacher-card");

  teacherCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      const img = this.querySelector(".teacher-image img");
      if (img) {
        img.style.transform = "scale(1.1)";
      }
    });

    card.addEventListener("mouseleave", function () {
      const img = this.querySelector(".teacher-image img");
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
      
      /* Exam Dot Hover Effect */
      .timeline-item:hover .exam-dot {
        background-color: var(--secondary-color);
      }
    `;
  document.head.appendChild(style);

  // Add Ripple Effect to Buttons
  const buttons = document.querySelectorAll(".btn, .btn-outline");

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
      .btn, .btn-outline {
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

  // Add Parallax Effect to Download CTA
  const downloadCta = document.querySelector(".download-schedule-cta");

  if (downloadCta) {
    window.addEventListener("scroll", function () {
      const scrollPosition = window.scrollY;
      const offset = downloadCta.offsetTop;
      const windowHeight = window.innerHeight;

      if (scrollPosition + windowHeight > offset) {
        const yPos = -(scrollPosition - offset) * 0.2;
        downloadCta.style.backgroundPosition = `center ${yPos}px`;
      }
    });
  }

  // Add Floating Animation to Subject Badges
  const floatingStyle = document.createElement("style");
  floatingStyle.textContent = `
      @keyframes floating {
        0% { transform: translateY(0); }
        50% { transform: translateY(-5px); }
        100% { transform: translateY(0); }
      }
      
      .subject-badge {
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

  // Class filter functionality
  const classSelect = document.getElementById("class-select");
  const weekSelect = document.getElementById("week-select");
  const viewScheduleBtn = document.querySelector(".schedule-filter .btn");

  viewScheduleBtn.addEventListener("click", function () {
    // In a real app, this would fetch the schedule based on selections
    const selectedClass = classSelect.value;
    const selectedWeek = weekSelect.value;

    // Show loading animation
    this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang tải...';

    // Simulate API call
    setTimeout(() => {
      this.textContent = "Xem lịch";
      alert(
        `Đã tải thời khóa biểu cho lớp ${selectedClass.toUpperCase()} - ${
          selectedWeek === "current" ? "Tuần hiện tại" : "Tuần sau"
        }`
      );
    }, 1000);
  });
});
