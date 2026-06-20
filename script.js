/* ============================================================
   PORTFOLIO MAIN SCRIPT
   ============================================================ */

/* -----------------------------
   CUSTOM CURSOR
----------------------------- */
const cursor = document.getElementById("cursor");
const cursorTrail = document.getElementById("cursorTrail");

let mouseX = 0, mouseY = 0;
let trailX = 0, trailY = 0;

window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
});

function animateTrail() {
  trailX += (mouseX - trailX) * 0.12;
  trailY += (mouseY - trailY) * 0.12;

  cursorTrail.style.transform = `translate(${trailX}px, ${trailY}px)`;
  requestAnimationFrame(animateTrail);
}
animateTrail();

/* -----------------------------
   NAVBAR SCROLL EFFECT
----------------------------- */
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  // back to top button
  const backToTop = document.getElementById("backToTop");
  if (window.scrollY > 600) {
    backToTop.classList.add("visible");
  } else {
    backToTop.classList.remove("visible");
  }
});

/* -----------------------------
   HAMBURGER MENU
----------------------------- */
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  navLinks.classList.toggle("open");

  const expanded = hamburger.getAttribute("aria-expanded") === "true";
  hamburger.setAttribute("aria-expanded", !expanded);
});

document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("open");
    navLinks.classList.remove("open");
  });
});

/* -----------------------------
   SMOOTH ACTIVE NAV LINK
----------------------------- */
const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  document.querySelectorAll(".nav-link").forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

/* -----------------------------
   TYPING EFFECT
----------------------------- */
const typingText = document.getElementById("typingText");

const roles = [
  "BLDC Motor Design",
  "Ansys Maxwell Simulation",
  "Electromagnetic Design",
  "Motor-CAD Optimization"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const current = roles[roleIndex];

  if (isDeleting) {
    charIndex--;
  } else {
    charIndex++;
  }

  typingText.textContent = current.substring(0, charIndex);

  let speed = isDeleting ? 60 : 90;

  if (!isDeleting && charIndex === current.length) {
    speed = 1500;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    speed = 500;
  }

  setTimeout(typeEffect, speed);
}
typeEffect();

/* -----------------------------
   SCROLL REVEAL
----------------------------- */
const revealElements = document.querySelectorAll("[data-reveal]");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach(el => revealObserver.observe(el));

/* -----------------------------
   SKILL BAR ANIMATION
----------------------------- */
const skillBars = document.querySelectorAll(".skill-fill");

const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        bar.style.width = bar.getAttribute("data-width") + "%";
      }
    });
  },
  { threshold: 0.4 }
);

skillBars.forEach(bar => skillObserver.observe(bar));

/* -----------------------------
   COUNTERS (PROJECT STATS)
----------------------------- */
const counters = document.querySelectorAll(".stat-number");

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = +el.getAttribute("data-count");
        let count = 0;

        const update = () => {
          const step = target / 60;
          count += step;

          if (count < target) {
            el.textContent = Math.floor(count);
            requestAnimationFrame(update);
          } else {
            el.textContent = target;
          }
        };

        update();
        counterObserver.unobserve(el);
      }
    });
  },
  { threshold: 0.6 }
);

counters.forEach(counter => counterObserver.observe(counter));

/* -----------------------------
   PARTICLE BACKGROUND
----------------------------- */
const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

for (let i = 0; i < 80; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2,
    dx: (Math.random() - 0.5) * 0.5,
    dy: (Math.random() - 0.5) * 0.5
  });
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "rgba(0, 212, 255, 0.6)";

  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();

    p.x += p.dx;
    p.y += p.dy;

    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  });

  requestAnimationFrame(drawParticles);
}
drawParticles();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

