// ===== Mobile Menu Toggle =====
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  hamburger.classList.toggle("active");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    hamburger.classList.remove("active");
  });
});

// ===== Smooth Scrolling =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// ===== Contact Form =====
const form = document.getElementById("contact-form");
const feedback = document.querySelector(".form-feedback");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.textContent = "Sending...";

  emailjs
    .sendForm("service_8ed6lkz", "template_fg64toy", form)
    .then(() => {
      feedback.textContent = "✅ Message sent successfully!";
      feedback.style.color = "#10b981";
      form.reset();
      setTimeout(() => {
        feedback.textContent = "";
        btn.disabled = false;
        btn.textContent = "Send Message";
      }, 3000);
    })
    .catch(() => {
      feedback.textContent = "❌ Failed to send. Try again!";
      feedback.style.color = "#ef4444";
      btn.disabled = false;
      btn.textContent = "Send Message";
      setTimeout(() => {
        feedback.textContent = "";
      }, 3000);
    });
});

// ===== Active Nav Link on Scroll =====
window.addEventListener("scroll", () => {
  let current = "";
  const sections = document.querySelectorAll("section");

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});
