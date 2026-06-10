(function () {
  "use strict";

  AOS.init({
    duration: 900,
    once: true,
    offset: 80
  });

  const header = document.querySelector(".main-header");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 80) {
      header.classList.add("header-scrolled");
    } else {
      header.classList.remove("header-scrolled");
    }
  });

  const heroSlider = document.querySelector("#heroSlider");

  if (heroSlider) {
    const carousel = new bootstrap.Carousel(heroSlider, {
      interval: 5000,
      ride: "carousel",
      pause: false,
      wrap: true
    });
  }

  const dropdownLinks = document.querySelectorAll(".dropdown-toggle");

  dropdownLinks.forEach(function (dropdown) {
    dropdown.addEventListener("click", function (event) {
      if (window.innerWidth >= 992) {
        event.preventDefault();
      }
    });
  });
})();

const menuButton = document.querySelector(".custom-toggler");

if (menuButton) {
  menuButton.addEventListener("click", function () {
    this.classList.toggle("is-open");
  });
}


// Memories Swiper
const memoriesSwiperElement = document.querySelector(".memoriesSwiper");

if (memoriesSwiperElement) {
  const memoriesSwiper = new Swiper(".memoriesSwiper", {
    loop: true,
    speed: 900,
    spaceBetween: 24,
    grabCursor: true,
    centeredSlides: false,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    pagination: {
      el: ".memory-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".memory-next",
      prevEl: ".memory-prev",
    },
    breakpoints: {
      0: {
        slidesPerView: 1.15,
        spaceBetween: 16,
      },
      576: {
        slidesPerView: 1.6,
        spaceBetween: 18,
      },
      768: {
        slidesPerView: 2.3,
        spaceBetween: 20,
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 22,
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 22,
      },
    },
  });
}

// Memories image preview modal
const memoryCards = document.querySelectorAll(".memory-card");
const memoryModal = document.getElementById("memoryModal");
const memoryModalImg = document.getElementById("memoryModalImg");
const memoryModalClose = document.getElementById("memoryModalClose");

if (memoryCards.length && memoryModal && memoryModalImg && memoryModalClose) {
  memoryCards.forEach((card) => {
    card.addEventListener("click", function () {
      const img = this.querySelector("img");

      if (img) {
        memoryModalImg.src = img.src;
        memoryModal.classList.add("active");
        document.body.style.overflow = "hidden";
      }
    });
  });

  memoryModalClose.addEventListener("click", function () {
    memoryModal.classList.remove("active");
    memoryModalImg.src = "";
    document.body.style.overflow = "";
  });

  memoryModal.addEventListener("click", function (event) {
    if (event.target === memoryModal) {
      memoryModal.classList.remove("active");
      memoryModalImg.src = "";
      document.body.style.overflow = "";
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && memoryModal.classList.contains("active")) {
      memoryModal.classList.remove("active");
      memoryModalImg.src = "";
      document.body.style.overflow = "";
    }
  });
}