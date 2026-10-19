/* =========================================================
   PORTFOLIO SCRIPT
   ✏️ Most of the time you only need to edit the CONFIG
   object right below. Everything else builds the page
   from it automatically.
   ========================================================= */

const CONFIG = {
  // ---- Your details ----
  name: "Usman Abdulmumini",
  role: "Graphic Designer & Full-Stack Developer",
  tagline: "I design brands and build the websites they live on.",
  location: "Abuja, Nigeria",

  // ---- Contact ----
  email: "usabmedjimeta@gmail.com",       // ✏️ the form opens an email to this address
  links: [
    { label: "LinkedIn",  url: "https://linkedin.com/in/your-handle" },
    { label: "GitHub",    url: "https://github.com/your-handle" },
    { label: "Behance",   url: "https://behance.net/your-handle" },
    { label: "Instagram", url: "https://instagram.com/your-handle" },
  ],

  // ---- Skills (set learning: true for things you're still learning) ----
  skills: [
    {
      icon: "🎨", title: "Graphic Design",
      items: [
        { name: "Logos & Flyers" }, { name: "CorelDraw" },
        { name: "Canva" },
      ],
    },
    {
      icon: "💻", title: "Front-end",
      items: [
        { name: "HTML" }, { name: "CSS" },
        { name: "JavaScript", learning: true },
      ],
    },
    {
      icon: "⚙️", title: "Back-end",
      items: [
        { name: "Node.js", learning: true },
        { name: "Databases", learning: true },
        { name: "APIs", learning: true },
      ],
    },
  ],

  // ---- Projects ----
  // category: "design" or "code"
  // image: put the file in assets/images/ (leave "" for a colour gradient)
  // link: a live URL, a GitHub repo, or a Behance page ("" hides the link)
  projects: [
    {
      title: "Brand Identity — Sample Co.",
      category: "design",
      description: "Logo, colour palette and brand guidelines for a small business.",
      image: "assets/images/project-1.jpg",
      link: "https://behance.net/your-handle",
      linkText: "View on Behance",
    },
    {
      title: "Poster Series",
      category: "design",
      description: "A set of event posters exploring bold type and colour.",
      image: "assets/images/project-2.jpg",
      link: "",
    },
    {
      title: "Landing Page",
      category: "code",
      description: "A responsive landing page built with HTML and CSS.",
      image: "assets/images/project-3.jpg",
      link: "https://github.com/your-handle/landing-page",
      linkText: "View code",
    },
    {
      title: "To-Do App",
      category: "code",
      description: "A small JavaScript app that saves tasks in the browser.",
      image: "assets/images/project-4.jpg",
      link: "https://github.com/your-handle/todo-app",
      linkText: "View code",
    },
  ],
};

/* ---------- 1. Fill in text that uses data-text="..." ---------- */
document.querySelectorAll("[data-text]").forEach((el) => {
  const key = el.dataset.text;
  if (CONFIG[key]) el.textContent = CONFIG[key];
});
document.title = `${CONFIG.name} — ${CONFIG.role}`;
document.getElementById("year").textContent = new Date().getFullYear();

/* ---------- 2. Build the skills section ---------- */
const skillsGrid = document.getElementById("skillsGrid");
CONFIG.skills.forEach((group) => {
  const tags = group.items
    .map((s) => `<span class="tag ${s.learning ? "learning" : ""}">${s.name}${s.learning ? " · learning" : ""}</span>`)
    .join("");
  skillsGrid.insertAdjacentHTML(
    "beforeend",
    `<article class="skill-card reveal">
       <span class="icon">${group.icon}</span>
       <h3>${group.title}</h3>
       <div class="tags">${tags}</div>
     </article>`
  );
});

/* ---------- 3. Build the project cards ---------- */
const projectGrid = document.getElementById("projectGrid");
CONFIG.projects.forEach((p) => {
  const img = p.image
    ? `<img src="${p.image}" alt="${p.title}" loading="lazy" onerror="this.remove()" />`
    : "";
  const link = p.link
    ? `<a class="project-link" href="${p.link}" target="_blank" rel="noopener">${p.linkText || "View project"} →</a>`
    : "";
  projectGrid.insertAdjacentHTML(
    "beforeend",
    `<article class="project reveal" data-category="${p.category}">
       <div class="project-thumb">${img}</div>
       <div class="project-body">
         <h3>${p.title}</h3>
         <p>${p.description}</p>
         ${link}
       </div>
     </article>`
  );
});

/* ---------- 4. Project filter buttons ---------- */
const filterButtons = document.querySelectorAll(".filter");
filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const chosen = btn.dataset.filter;
    document.querySelectorAll(".project").forEach((card) => {
      const show = chosen === "all" || card.dataset.category === chosen;
      card.classList.toggle("hide", !show);
    });
  });
});

/* ---------- 5. Contact links ---------- */
const contactLinks = document.getElementById("contactLinks");
contactLinks.insertAdjacentHTML("beforeend", `<li><a href="mailto:${CONFIG.email}">${CONFIG.email}</a></li>`);
CONFIG.links.forEach((l) => {
  contactLinks.insertAdjacentHTML(
    "beforeend",
    `<li><a href="${l.url}" target="_blank" rel="noopener">${l.label} ↗</a></li>`
  );
});

/* ---------- 6. Contact form (opens the visitor's email app) ----------
   Simple option that needs no back-end. For a real form that sends
   email by itself, see GUIDE.md (Formspree).                          */
const form = document.getElementById("contactForm");
const statusEl = document.getElementById("formStatus");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const { name, email, message } = form.elements;

  if (!name.value.trim() || !email.value.includes("@") || !message.value.trim()) {
    statusEl.textContent = "Please fill in all fields with a valid email.";
    statusEl.className = "form-status error";
    return;
  }

  const subject = encodeURIComponent(`Portfolio message from ${name.value}`);
  const body = encodeURIComponent(`${message.value}\n\n— ${name.value} (${email.value})`);
  window.location.href = `mailto:${CONFIG.email}?subject=${subject}&body=${body}`;

  statusEl.textContent = "Opening your email app…";
  statusEl.className = "form-status ok";
  form.reset();
});

/* ---------- 7. Dark / light theme (remembers your choice) ---------- */
const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
root.dataset.theme = savedTheme || (prefersDark ? "dark" : "light");

themeToggle.addEventListener("click", () => {
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  localStorage.setItem("theme", next);
});

/* ---------- 8. Mobile menu ---------- */
const nav = document.getElementById("nav");
document.getElementById("menuBtn").addEventListener("click", () => nav.classList.toggle("open"));
nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => nav.classList.remove("open")));

/* ---------- 9. Fade-in on scroll ---------- */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
