// Initialize EmailJS
(function () {
  emailjs.init("16WhvWq-EcFlaX7y4");
})();

// ===== TYPEWRITER ANIMATION =====
(function () {
  const nameElement = document.getElementById("dynamicName");
  const nameCursor = document.getElementById("nameCursor");
  const subtitleElement = document.getElementById("dynamicSubtitle");
  const subtitleCursor = document.getElementById("subtitleCursor");

  const nameToType = "Doniyor";
  const subtitleToType =
    "Crafting beautiful, responsive web experiences with React & Tailwind";

  let nameIndex = 0;
  let subtitleIndex = 0;

  function typeName() {
    if (nameIndex < nameToType.length) {
      nameElement.innerText += nameToType.charAt(nameIndex);
      nameIndex++;
      setTimeout(typeName, 100);
    } else {
      if (nameCursor) nameCursor.style.display = "none";
      if (subtitleCursor) subtitleCursor.style.display = "inline-block";
      typeSubtitle();
    }
  }

  function typeSubtitle() {
    if (subtitleIndex < subtitleToType.length) {
      subtitleElement.innerText += subtitleToType.charAt(subtitleIndex);
      subtitleIndex++;
      setTimeout(typeSubtitle, 45);
    } else {
      if (subtitleCursor) {
        subtitleCursor.style.animation = "blinkCursor 0.9s step-end infinite";
      }
    }
  }

  if (nameElement) nameElement.innerText = "";
  if (subtitleElement) subtitleElement.innerText = "";
  setTimeout(() => {
    if (nameElement) typeName();
  }, 400);
})();

// ===== SIDEBAR TOGGLE (MOBILE) =====
const sidebar = document.getElementById("sidebar");
const menuToggle = document.getElementById("menuToggle");
const closeSidebar = document.getElementById("closeSidebar");
const overlay = document.getElementById("overlay");

function openSidebar() {
  if (sidebar) sidebar.classList.add("open");
  if (overlay) overlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeSidebarFunc() {
  if (sidebar) sidebar.classList.remove("open");
  if (overlay) overlay.classList.remove("active");
  document.body.style.overflow = "";
}

if (menuToggle) menuToggle.addEventListener("click", openSidebar);
if (closeSidebar) closeSidebar.addEventListener("click", closeSidebarFunc);
if (overlay) overlay.addEventListener("click", closeSidebarFunc);

// Close sidebar when a nav link is clicked (mobile)
const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 768) closeSidebarFunc();
  });
});

// ===== SMOOTH SCROLLING (with offset) =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    if (targetId === "#" || targetId === "") return;
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      e.preventDefault();
      const offset = 20;
      const elementPosition =
        targetElement.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  });
});

// ===== ACTIVE NAV LINK ON SCROLL =====
function setActiveLink() {
  const sections = document.querySelectorAll("section");
  let current = "";
  const scrollPosition = window.scrollY + 100;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionBottom = sectionTop + section.offsetHeight;
    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    const href = link.getAttribute("href");
    if (href && href === `#${current}`) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", setActiveLink);
window.addEventListener("load", setActiveLink);

// ===== TOP NAVIGATION ICONS (LEFT/RIGHT) =====
const sections = ["home", "about", "skills", "projects", "contact"];
let currentSectionIndex = 0;

function updateCurrentSectionIndex() {
  const scrollPosition = window.scrollY + 100;
  sections.forEach((sectionId, index) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        currentSectionIndex = index;
      }
    }
  });
}

function navigateToSection(direction) {
  let newIndex = currentSectionIndex + direction;
  if (newIndex < 0) newIndex = 0;
  if (newIndex >= sections.length) newIndex = sections.length - 1;

  if (newIndex !== currentSectionIndex) {
    const targetSection = document.getElementById(sections[newIndex]);
    if (targetSection) {
      const offset = 20;
      const elementPosition =
        targetSection.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
      currentSectionIndex = newIndex;
    }
  }
}

const leftIcon = document.getElementById("leftNavIcon");
const rightIcon = document.getElementById("rightNavIcon");

if (leftIcon) {
  leftIcon.addEventListener("click", () => navigateToSection(-1));
}
if (rightIcon) {
  rightIcon.addEventListener("click", () => navigateToSection(1));
}

window.addEventListener("scroll", updateCurrentSectionIndex);
window.addEventListener("load", updateCurrentSectionIndex);

// ===== SLIDER NAVIGATION (Tech Stack & Projects) =====
function setupSlider(sliderId, leftArrowSelector, rightArrowSelector) {
  const slider = document.getElementById(sliderId);
  if (!slider) return;

  const scrollAmount = 340; // Width of one card + gap

  const leftArrow = document.querySelector(
    `${leftArrowSelector}[data-slider="${sliderId}"]`
  );
  const rightArrow = document.querySelector(
    `${rightArrowSelector}[data-slider="${sliderId}"]`
  );

  if (leftArrow) {
    leftArrow.addEventListener("click", () => {
      slider.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    });
  }

  if (rightArrow) {
    rightArrow.addEventListener("click", () => {
      slider.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    });
  }
}

// Initialize both sliders
setupSlider("skillsSlider", ".left-arrow", ".right-arrow");
setupSlider("projectsSlider", ".left-arrow", ".right-arrow");

// ===== CONTACT FORM =====
const form = document.getElementById("contact-form");
const feedback = document.querySelector(".form-feedback");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    if (!btn) return;
    btn.disabled = true;
    btn.textContent = "Sending...";

    emailjs
      .sendForm("service_8ed6lkz", "template_fg64toy", form)
      .then(() => {
        if (feedback) {
          feedback.textContent = "✅ Message sent successfully!";
          feedback.style.color = "#10b981";
        }
        form.reset();
        setTimeout(() => {
          if (feedback) feedback.textContent = "";
          btn.disabled = false;
          btn.textContent = "Send Message";
        }, 3000);
      })
      .catch(() => {
        if (feedback) {
          feedback.textContent = "❌ Failed to send. Try again!";
          feedback.style.color = "#ef4444";
        }
        btn.disabled = false;
        btn.textContent = "Send Message";
        setTimeout(() => {
          if (feedback) feedback.textContent = "";
        }, 3000);
      });
  });
}

// ===== SCROLL REVEAL ANIMATION =====
const revealElements = document.querySelectorAll(
  ".skill-card, .project-card, .about-grid, .contact-grid"
);
const appearOnScroll = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        appearOnScroll.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
);

revealElements.forEach((el) => {
  if (
    el.classList.contains("skill-card") ||
    el.classList.contains("project-card")
  ) {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    appearOnScroll.observe(el);
  } else if (
    el.classList.contains("about-grid") ||
    el.classList.contains("contact-grid")
  ) {
    el.style.opacity = "0";
    el.style.transform = "translateY(16px)";
    el.style.transition = "opacity 0.6s ease 0.1s, transform 0.5s ease";
    appearOnScroll.observe(el);
  }
});
