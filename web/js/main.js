// Document Ready Function
document.addEventListener("DOMContentLoaded", function () {
  // Initialize AOS Animation Library
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true,
    mirror: false,
  });

  // Initialize Hero Slider
  const heroSlider = new Swiper(".hero-slider", {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    autoplay: {
      delay: 6000,
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
  });

  // Initialize Sports Slider
  const sportsSlider = new Swiper(".sports-swiper", {
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
    breakpoints: {
      576: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 3,
      },
    },
  });

  // Mobile Menu Toggle
  const menuToggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".menu");

  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      menu.classList.toggle("active");
    });
  }

  // Dropdown Click for Mobile
  const dropdownLinks = document.querySelectorAll(".dropdown > a");

  if (window.innerWidth < 992) {
    dropdownLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        this.parentNode.classList.toggle("active");
      });
    });
  }

  // Back to Top Button
  const backToTop = document.querySelector(".back-to-top");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      backToTop.classList.add("active");
    } else {
      backToTop.classList.remove("active");
    }
  });

  if (backToTop) {
    backToTop.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // Counter Animation
  const counters = document.querySelectorAll(".counter-number");

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

  // Gallery Modal
  let galleryItems = document.querySelectorAll(".gallery-item");
  let modal = document.getElementById("galleryModal");
  let modalImg = document.getElementById("modalImage");
  let captionText = document.getElementById("modalCaption");
  let closeBtn = document.querySelector(".close-modal");
  let currentIndex = 0;

  if (galleryItems.length > 0) {
    galleryItems.forEach((item, index) => {
      item.addEventListener("click", function () {
        currentIndex = index;
        modal.style.display = "block";
        modalImg.src = this.querySelector("img").src;
        captionText.innerHTML = this.querySelector("img").alt;
      });
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", function () {
      modal.style.display = "none";
    });
  }

  // Change Gallery Image
  window.changeImage = function (direction) {
    currentIndex += direction;
    if (currentIndex >= galleryItems.length) {
      currentIndex = 0;
    } else if (currentIndex < 0) {
      currentIndex = galleryItems.length - 1;
    }

    modalImg.src = galleryItems[currentIndex].querySelector("img").src;
    captionText.innerHTML = galleryItems[currentIndex].querySelector("img").alt;
  };

  // Close modal when clicking outside of it
  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  // Smooth Scroll for Anchor Links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      if (this.getAttribute("href") !== "#") {
        e.preventDefault();

        // Close mobile menu if open
        if (menu.classList.contains("active")) {
          menu.classList.remove("active");
        }

        const targetId = this.getAttribute("href");
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          const headerHeight = header.offsetHeight;
          const targetPosition =
            targetElement.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = targetPosition - headerHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }
    });
  });

  // Add animation class to elements that should be animated
  const animatedElements = document.querySelectorAll(".animated");
  animatedElements.forEach((element) => {
    element.style.opacity = "0";
  });

  // Function to check if element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  // Function to add animation class when element is in viewport
  function animateOnScroll() {
    animatedElements.forEach((element) => {
      if (isInViewport(element)) {
        element.style.opacity = "1";
        element.classList.add("fadeIn");
      }
    });
  }

  // Run animation check on scroll
  window.addEventListener("scroll", animateOnScroll);
  animateOnScroll(); // Run once on page load
});

// Gallery Modal Functions
function openGallery(index) {
  let modal = document.getElementById("galleryModal");
  let modalImg = document.getElementById("modalImage");
  let captionText = document.getElementById("modalCaption");

  currentIndex = index - 1;
  modal.style.display = "block";

  const galleryItems = document.querySelectorAll(".gallery-item");
  modalImg.src = galleryItems[currentIndex].querySelector("img").src;
  captionText.innerHTML = galleryItems[currentIndex].querySelector("img").alt;
}

// Add CSS animation classes
document.addEventListener("DOMContentLoaded", function () {
  // Add fadeIn animation class
  document.head.insertAdjacentHTML(
    "beforeend",
    `
        <style>
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            .fadeIn {
                animation: fadeIn 1s ease-in-out forwards;
            }
            @keyframes fadeInLeft {
                from { opacity: 0; transform: translateX(-50px); }
                to { opacity: 1; transform: translateX(0); }
            }
            .fadeInLeft {
                animation: fadeInLeft 1s ease-in-out forwards;
            }
            @keyframes fadeInRight {
                from { opacity: 0; transform: translateX(50px); }
                to { opacity: 1; transform: translateX(0); }
            }
            .fadeInRight {
                animation: fadeInRight 1s ease-in-out forwards;
            }
            @keyframes fadeInUp {
                from { opacity: 0; transform: translateY(50px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .fadeInUp {
                animation: fadeInUp 1s ease-in-out forwards;
            }
            @keyframes fadeInDown {
                from { opacity: 0; transform: translateY(-50px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .fadeInDown {
                animation: fadeInDown 1s ease-in-out forwards;
            }
            @keyframes zoomIn {
                from { opacity: 0; transform: scale(0.5); }
                to { opacity: 1; transform: scale(1); }
            }
            .zoomIn {
                animation: zoomIn 1s ease-in-out forwards;
            }
            
            /* Add sticky header styling */
            header.sticky {
                position: fixed;
                top: 0;
                width: 100%;
                box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
                animation: fadeInDown 0.5s;
            }
            header.sticky .main-nav {
                height: 70px;
            }
            header.sticky + .hero-section {
                margin-top: 70px;
            }
        </style>
    `
  );
});
