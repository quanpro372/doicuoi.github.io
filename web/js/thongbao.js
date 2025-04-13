// Document Ready Function
document.addEventListener("DOMContentLoaded", function () {
  // Initialize AOS Animation
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true,
    mirror: false,
  });

  // Filter Functionality
  const categoryFilter = document.getElementById("category");
  const monthFilter = document.getElementById("month");
  const searchInput = document.getElementById("search");
  const announcementItems = document.querySelectorAll(".announcement-item");

  function filterAnnouncements() {
    const categoryValue = categoryFilter.value;
    const monthValue = monthFilter.value;
    const searchValue = searchInput.value.toLowerCase().trim();

    announcementItems.forEach((item) => {
      const itemCategory = item.getAttribute("data-category");
      const itemMonth = item.getAttribute("data-month");
      const itemText = item.textContent.toLowerCase();

      const categoryMatch =
        categoryValue === "all" || itemCategory === categoryValue;
      const monthMatch = monthValue === "all" || itemMonth === monthValue;
      const searchMatch = searchValue === "" || itemText.includes(searchValue);

      if (categoryMatch && monthMatch && searchMatch) {
        item.style.display = "";
        item.classList.add("show-item");
        setTimeout(() => {
          item.style.opacity = "1";
          item.style.transform = "translateX(0)";
        }, 50);
      } else {
        item.classList.remove("show-item");
        item.style.opacity = "0";
        item.style.transform = "translateX(-20px)";
        setTimeout(() => {
          item.style.display = "none";
        }, 500);
      }
    });

    // Check if no items are shown and display a message
    setTimeout(() => {
      const visibleItems = document.querySelectorAll(
        ".announcement-item.show-item"
      );
      const noResultsMessage = document.querySelector(".no-results-message");

      if (visibleItems.length === 0) {
        if (!noResultsMessage) {
          const message = document.createElement("div");
          message.className = "no-results-message";
          message.innerHTML =
            "<p>Không tìm thấy thông báo nào phù hợp với bộ lọc của bạn.</p>";
          document.querySelector(".announcements-list").appendChild(message);
        }
      } else {
        if (noResultsMessage) {
          noResultsMessage.remove();
        }
      }
    }, 600);
  }

  // Add event listeners to filters
  if (categoryFilter)
    categoryFilter.addEventListener("change", filterAnnouncements);
  if (monthFilter) monthFilter.addEventListener("change", filterAnnouncements);
  if (searchInput) {
    searchInput.addEventListener("input", filterAnnouncements);

    // Add clear button to search input
    const searchContainer = searchInput.parentElement;
    const clearButton = document.createElement("button");
    clearButton.className = "search-clear-btn";
    clearButton.innerHTML = '<i class="fas fa-times"></i>';
    clearButton.style.display = "none";
    searchContainer.appendChild(clearButton);

    searchInput.addEventListener("input", function () {
      clearButton.style.display = this.value ? "block" : "none";
    });

    clearButton.addEventListener("click", function () {
      searchInput.value = "";
      this.style.display = "none";
      filterAnnouncements();
    });
  }

  // Add CSS styles for filtered items and clear button
  const style = document.createElement("style");
  style.textContent = `
        .announcement-item {
            transition: opacity 0.5s ease, transform 0.5s ease, display 0.5s ease;
        }
        .search-clear-btn {
            position: absolute;
            right: 45px;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            color: #999;
            cursor: pointer;
            padding: 5px;
            z-index: 2;
        }
        .search-clear-btn:hover {
            color: var(--primary-color);
        }
        .no-results-message {
            text-align: center;
            padding: 30px;
            background-color: #f8f9fa;
            border-radius: var(--border-radius);
            color: var(--gray-color);
            animation: fadeIn 0.5s ease;
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;
  document.head.appendChild(style);

  // Pagination Functionality
  const paginationLinks = document.querySelectorAll(".pagination a.page");
  const prevLink = document.querySelector(".pagination .prev");
  const nextLink = document.querySelector(".pagination .next");

  if (paginationLinks.length > 0) {
    paginationLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();

        // Remove active class from all links
        paginationLinks.forEach((l) => l.classList.remove("active"));

        // Add active class to clicked link
        this.classList.add("active");

        // Get page number
        const page = parseInt(this.textContent);

        // Update prev/next buttons
        if (page === 1) {
          prevLink.classList.add("disabled");
        } else {
          prevLink.classList.remove("disabled");
        }

        if (page === paginationLinks.length) {
          nextLink.classList.add("disabled");
        } else {
          nextLink.classList.remove("disabled");
        }

        // Simulate page change with scroll to top of announcements
        window.scrollTo({
          top: document.querySelector(".all-announcements").offsetTop - 100,
          behavior: "smooth",
        });
      });
    });

    // Prev/Next button functionality
    if (prevLink) {
      prevLink.addEventListener("click", function (e) {
        e.preventDefault();

        if (this.classList.contains("disabled")) return;

        const activeLink = document.querySelector(".pagination a.page.active");
        const prevPage = activeLink.previousElementSibling;

        if (prevPage && prevPage.classList.contains("page")) {
          prevPage.click();
        }
      });
    }

    if (nextLink) {
      nextLink.addEventListener("click", function (e) {
        e.preventDefault();

        if (this.classList.contains("disabled")) return;

        const activeLink = document.querySelector(".pagination a.page.active");
        const nextPage = activeLink.nextElementSibling;

        if (nextPage && nextPage.classList.contains("page")) {
          nextPage.click();
        }
      });
    }
  }

  // Card Hover Effects
  const importantCards = document.querySelectorAll(".important-card");

  importantCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      const icon = this.querySelector(".card-icon i");
      if (icon) {
        icon.style.transition = "transform 0.5s ease";
        icon.style.transform = "rotateY(180deg)";
      }
    });

    card.addEventListener("mouseleave", function () {
      const icon = this.querySelector(".card-icon i");
      if (icon) {
        icon.style.transform = "rotateY(0)";
      }
    });
  });

  // Newsletter Form Submit
  const newsletterForm = document.querySelector(".newsletter-form form");

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const emailInput = this.querySelector('input[type="email"]');
      const email = emailInput.value.trim();

      if (email) {
        // Simulate form submission success
        emailInput.value = "";

        // Show success message
        const successMessage = document.createElement("div");
        successMessage.className = "newsletter-success";
        successMessage.textContent =
          "Cảm ơn bạn đã đăng ký! Bạn sẽ nhận được các thông báo qua email.";

        const formGroup = this.querySelector(".form-group");
        formGroup.style.display = "none";

        this.appendChild(successMessage);

        // Reset form after 3 seconds
        setTimeout(() => {
          successMessage.remove();
          formGroup.style.display = "flex";
        }, 3000);
      }
    });
  }

  // Add CSS for newsletter success message
  const newsletterStyle = document.createElement("style");
  newsletterStyle.textContent = `
        .newsletter-success {
            background-color: rgba(255, 255, 255, 0.2);
            padding: 15px;
            border-radius: var(--border-radius);
            text-align: center;
            animation: fadeIn 0.5s ease;
        }
    `;
  document.head.appendChild(newsletterStyle);

  // Add hover effect to announcement items
  announcementItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.querySelector(".announcement-date").style.transform = "scale(1.05)";
    });

    item.addEventListener("mouseleave", function () {
      this.querySelector(".announcement-date").style.transform = "scale(1)";
    });
  });

  // Add floating animation to important cards
  const cardStyle = document.createElement("style");
  cardStyle.textContent = `
        @keyframes float {
            0% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
            100% { transform: translateY(0); }
        }
        
        .important-card {
            animation: float 3s ease-in-out infinite;
            animation-delay: calc(var(--i) * 0.5s);
        }
        
        .important-card:nth-child(1) {
            --i: 0;
        }
        
        .important-card:nth-child(2) {
            --i: 1;
        }
        
        .important-card:nth-child(3) {
            --i: 2;
        }
    `;
  document.head.appendChild(cardStyle);

  // Add ripple effect to buttons
  const buttons = document.querySelectorAll(".btn, .read-more, .card-link");

  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

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

  // Add ripple effect CSS
  const rippleStyle = document.createElement("style");
  rippleStyle.textContent = `
        .btn, .read-more, .card-link {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
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
    `;
  document.head.appendChild(rippleStyle);
});
