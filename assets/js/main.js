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


// Dynamic Captcha for Exhibitor Form
const captchaCodeBox = document.getElementById("captchaCode");
const refreshCaptchaBtn = document.getElementById("refreshCaptcha");
const captchaInput = document.getElementById("captchaInput");
const captchaError = document.getElementById("captchaError");
const exhibitorForm = document.getElementById("exhibitorForm");

let currentCaptcha = "";

function generateCaptcha() {
  currentCaptcha = "";

  const chars = "0123456789";
  const captchaLength = 4;

  for (let i = 0; i < captchaLength; i++) {
    currentCaptcha += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  if (captchaCodeBox) {
    captchaCodeBox.innerHTML = "";

    currentCaptcha.split("").forEach((char, index) => {
      const span = document.createElement("span");
      span.textContent = char;

      if (index % 2 === 0) {
        span.style.transform = "rotate(-8deg)";
      } else {
        span.style.transform = "rotate(7deg)";
      }

      captchaCodeBox.appendChild(span);
    });
  }

  if (captchaInput) {
    captchaInput.value = "";
  }

  if (captchaError) {
    captchaError.textContent = "";
  }
}

if (captchaCodeBox) {
  generateCaptcha();
}

if (refreshCaptchaBtn) {
  refreshCaptchaBtn.addEventListener("click", function () {
    generateCaptcha();
  });
}

if (exhibitorForm) {
  exhibitorForm.addEventListener("submit", function (e) {
    if (!captchaInput) return;

    const enteredCaptcha = captchaInput.value.trim();

    if (enteredCaptcha !== currentCaptcha) {
      e.preventDefault();

      if (captchaError) {
        captchaError.textContent = "Captcha does not match. Please try again.";
      }

      captchaInput.focus();
      generateCaptcha();
      return false;
    }

    if (captchaError) {
      captchaError.textContent = "";
    }
  });
}

// Visitor Registration - India / Overseas Toggle
const visitorTypeRadios = document.querySelectorAll('input[name="visitor_type"]');
const indiaFields = document.querySelectorAll(".india-field");
const overseasFields = document.querySelectorAll(".overseas-field");

visitorTypeRadios.forEach((radio) => {
  radio.addEventListener("change", function () {
    if (this.value === "india") {
      indiaFields.forEach((field) => field.classList.remove("d-none"));
      overseasFields.forEach((field) => field.classList.add("d-none"));
    } else {
      indiaFields.forEach((field) => field.classList.add("d-none"));
      overseasFields.forEach((field) => field.classList.remove("d-none"));
    }
  });
});

// Visitor Registration Captcha
const visitorCaptchaCodeBox = document.getElementById("visitorCaptchaCode");
const visitorRefreshCaptchaBtn = document.getElementById("visitorRefreshCaptcha");
const visitorCaptchaInput = document.getElementById("visitorCaptchaInput");
const visitorCaptchaError = document.getElementById("visitorCaptchaError");
const visitorRegistrationForm = document.getElementById("visitorRegistrationForm");

let visitorCurrentCaptcha = "";

function generateVisitorCaptcha() {
  visitorCurrentCaptcha = "";

  const chars = "0123456789";
  const captchaLength = 4;

  for (let i = 0; i < captchaLength; i++) {
    visitorCurrentCaptcha += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  if (visitorCaptchaCodeBox) {
    visitorCaptchaCodeBox.innerHTML = "";

    visitorCurrentCaptcha.split("").forEach((char, index) => {
      const span = document.createElement("span");
      span.textContent = char;
      span.style.transform = index % 2 === 0 ? "rotate(-8deg)" : "rotate(7deg)";
      visitorCaptchaCodeBox.appendChild(span);
    });
  }

  if (visitorCaptchaInput) {
    visitorCaptchaInput.value = "";
  }

  if (visitorCaptchaError) {
    visitorCaptchaError.textContent = "";
  }
}

if (visitorCaptchaCodeBox) {
  generateVisitorCaptcha();
}

if (visitorRefreshCaptchaBtn) {
  visitorRefreshCaptchaBtn.addEventListener("click", function () {
    generateVisitorCaptcha();
  });
}

if (visitorRegistrationForm) {
  visitorRegistrationForm.addEventListener("submit", function (e) {
    if (!visitorCaptchaInput) return;

    const enteredCaptcha = visitorCaptchaInput.value.trim();

    if (enteredCaptcha !== visitorCurrentCaptcha) {
      e.preventDefault();

      if (visitorCaptchaError) {
        visitorCaptchaError.textContent = "Captcha does not match. Please try again.";
      }

      visitorCaptchaInput.focus();
      generateVisitorCaptcha();
      return false;
    }

    if (visitorCaptchaError) {
      visitorCaptchaError.textContent = "";
    }
  });
}

// Contact Form Captcha
const contactCaptchaCodeBox = document.getElementById("contactCaptchaCode");
const contactRefreshCaptchaBtn = document.getElementById("contactRefreshCaptcha");
const contactCaptchaInput = document.getElementById("contactCaptchaInput");
const contactCaptchaError = document.getElementById("contactCaptchaError");
const contactForm = document.getElementById("contactForm");

let contactCurrentCaptcha = "";

function generateContactCaptcha() {
  contactCurrentCaptcha = "";

  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const captchaLength = 5;

  for (let i = 0; i < captchaLength; i++) {
    contactCurrentCaptcha += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  if (contactCaptchaCodeBox) {
    contactCaptchaCodeBox.innerHTML = "";

    contactCurrentCaptcha.split("").forEach((char, index) => {
      const span = document.createElement("span");
      span.textContent = char;
      span.style.transform = index % 2 === 0 ? "rotate(-7deg)" : "rotate(6deg)";
      contactCaptchaCodeBox.appendChild(span);
    });
  }

  if (contactCaptchaInput) {
    contactCaptchaInput.value = "";
  }

  if (contactCaptchaError) {
    contactCaptchaError.textContent = "";
  }
}

if (contactCaptchaCodeBox) {
  generateContactCaptcha();
}

if (contactRefreshCaptchaBtn) {
  contactRefreshCaptchaBtn.addEventListener("click", function () {
    generateContactCaptcha();
  });
}

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    if (!contactCaptchaInput) return;

    const enteredCaptcha = contactCaptchaInput.value.trim().toUpperCase();

    if (enteredCaptcha !== contactCurrentCaptcha) {
      e.preventDefault();

      if (contactCaptchaError) {
        contactCaptchaError.textContent = "Captcha does not match. Please try again.";
      }

      captchaInput.focus();
      generateContactCaptcha();
      return false;
    }

    if (contactCaptchaError) {
      contactCaptchaError.textContent = "";
    }
  });
}

// Floor Plan Modal
const floorPlanOpenBtns = document.querySelectorAll(".floor-plan-open");
const floorPlanModal = document.getElementById("floorPlanModal");
const floorPlanClose = document.getElementById("floorPlanClose");

function openFloorPlanModal() {
  if (!floorPlanModal) return;

  floorPlanModal.classList.add("active");
  document.body.classList.add("floor-modal-open");
}

function closeFloorPlanModal() {
  if (!floorPlanModal) return;

  floorPlanModal.classList.remove("active");
  document.body.classList.remove("floor-modal-open");
}

if (floorPlanOpenBtns.length && floorPlanModal) {
  floorPlanOpenBtns.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      openFloorPlanModal();
    });
  });
}

if (floorPlanClose) {
  floorPlanClose.addEventListener("click", closeFloorPlanModal);
}

if (floorPlanModal) {
  floorPlanModal.addEventListener("click", function (e) {
    if (
      e.target.classList.contains("floor-plan-modal") ||
      e.target.classList.contains("floor-plan-modal-overlay")
    ) {
      closeFloorPlanModal();
    }
  });
}

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && floorPlanModal && floorPlanModal.classList.contains("active")) {
    closeFloorPlanModal();
  }
});