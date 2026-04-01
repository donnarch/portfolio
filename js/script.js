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

// ===== MOBILE MENU TOGGLE =====
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

if (hamburger && navMenu) {
  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    hamburger.classList.toggle("active");
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    if (hamburger) hamburger.classList.remove("active");
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
      const navbarHeight =
        document.querySelector(".navbar")?.offsetHeight || 70;
      const elementPosition =
        targetElement.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - navbarHeight,
        behavior: "smooth",
      });
    }
  });
});

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

// ===== ACTIVE NAV LINK ON SCROLL =====
function setActiveLink() {
  const sections = document.querySelectorAll("section");
  let current = "";
  const scrollPosition = window.scrollY + 120;

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

// Ensure initial active link after load
window.addEventListener("load", () => {
  setActiveLink();
  if (document.getElementById("dynamicName")?.innerText === "Doniyor") {
    const nameCur = document.getElementById("nameCursor");
    if (nameCur) nameCur.style.display = "none";
  }
});
