// Document Ready Function
document.addEventListener("DOMContentLoaded", function () {
  // Initialize AOS animations
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true,
  });

  // Initialize Chart
  const ctx = document.getElementById("grades-chart").getContext("2d");

  // Sample data for the chart
  const subjects = [
    "IoT",
    "Thiết kế Web",
    "AVCB5",
    "Tương tác NM",
    ".NET",
    "C#",
    "Quốc phòng",
  ];
  const semester1Data = [8.0, 7.5, 8.5, 7.0, 8.0, 8.5, 8.5];
  const semester2Data = [8.5, 8.0, 9.0, 7.5, 8.5, 9.0, 9.0];

  const gradesChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: subjects,
      datasets: [
        {
          label: "Học kỳ 1",
          data: semester1Data,
          backgroundColor: "rgba(54, 162, 235, 0.7)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
        {
          label: "Học kỳ 2",
          data: semester2Data,
          backgroundColor: "rgba(75, 192, 192, 0.7)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: false,
          min: 5,
          max: 10,
          ticks: {
            stepSize: 1,
          },
        },
      },
      plugins: {
        legend: {
          position: "top",
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              return `${context.dataset.label}: ${context.raw}`;
            },
          },
        },
      },
      animation: {
        duration: 1500,
        easing: "easeInOutQuad",
      },
    },
  });

  // Filter functionality
  const viewGradesBtn = document.getElementById("view-grades-btn");

  viewGradesBtn.addEventListener("click", function () {
    const semester = document.getElementById("semester-select").value;
    const year = document.getElementById("year-select").value;

    // Show loading state
    this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang tải...';
    this.disabled = true;

    // Simulate API call
    setTimeout(() => {
      // Update chart based on selection
      if (semester === "semester1") {
        gradesChart.data.datasets[0].hidden = false;
        gradesChart.data.datasets[1].hidden = true;
      } else {
        gradesChart.data.datasets[0].hidden = true;
        gradesChart.data.datasets[1].hidden = false;
      }
      gradesChart.update();

      // Reset button
      this.innerHTML = '<i class="fas fa-search"></i> Xem điểm';
      this.disabled = false;

      // Show notification
      showNotification(
        `Đã tải điểm học kỳ ${
          semester === "semester1" ? "1" : "2"
        } năm học ${year}`
      );
    }, 1500);
  });

  // Show notification function
  function showNotification(message) {
    const notification = document.createElement("div");
    notification.className = "notification";
    notification.innerHTML = `
        <div class="notification-content">
          <i class="fas fa-check-circle"></i>
          <span>${message}</span>
        </div>
      `;

    document.body.appendChild(notification);

    // Add animation
    setTimeout(() => {
      notification.classList.add("show");
    }, 10);

    // Remove after 3 seconds
    setTimeout(() => {
      notification.classList.remove("show");
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);
  }

  // Add notification styles
  const notificationStyle = document.createElement("style");
  notificationStyle.textContent = `
      .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #27ae60;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        transform: translateY(100px);
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 1000;
      }
      
      .notification.show {
        transform: translateY(0);
        opacity: 1;
      }
      
      .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      
      .notification i {
        font-size: 20px;
      }
    `;
  document.head.appendChild(notificationStyle);

  // Add smooth scrolling for anchor links
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

  // Add hover effect for table rows
  const tableRows = document.querySelectorAll(".grades-table tbody tr");

  tableRows.forEach((row) => {
    row.addEventListener("mouseenter", function () {
      this.style.transform = "translateX(5px)";
    });

    row.addEventListener("mouseleave", function () {
      this.style.transform = "translateX(0)";
    });
  });
});
