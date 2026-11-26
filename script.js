(() => {
  const html = document.documentElement;
  const themeToggle = document.getElementById("themeToggle");
  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.getElementById("navLinks");
  const toast = document.getElementById("toast");
  const year = document.getElementById("year");

  if (year) year.textContent = new Date().getFullYear();

  const savedTheme = localStorage.getItem("portfolio_theme");
  if (savedTheme === "light" || savedTheme === "dark") {
    html.setAttribute("data-theme", savedTheme);
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
      html.setAttribute("data-theme", next);
      localStorage.setItem("portfolio_theme", next);
    });
  }

  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
      const open = navLinks.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", String(open));
    });
    navLinks.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => toast.classList.remove("show"), 2200);
  }

  document.querySelectorAll("[data-copy]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const val = btn.getAttribute("data-copy");
      if (!val) return;
      try {
        await navigator.clipboard.writeText(val);
        showToast(`Disalin: ${val}`);
      } catch {
        showToast(val);
      }
    });
  });

  const form = document.getElementById("contactForm");
  const sendEmailBtn = document.getElementById("sendEmailBtn");

  function getValues() {
    return {
      name: document.getElementById("senderName")?.value.trim() || "",
      topic: document.getElementById("senderTopic")?.value.trim() || "",
      msg: document.getElementById("senderMessage")?.value.trim() || "",
    };
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const { name, topic, msg } = getValues();
      const text = encodeURIComponent(
        `Halo Arief Dika Rifaldi,\n\nNama: ${name}\nTopik: ${topic}\n\nPesan:\n${msg}`
      );
      window.open(`https://wa.me/6281371292854?text=${text}`, "_blank", "noopener,noreferrer");
    });
  }

  if (sendEmailBtn && form) {
    sendEmailBtn.addEventListener("click", () => {
      if (!form.reportValidity()) return;
      const { name, topic, msg } = getValues();
      const subject = encodeURIComponent(`[Portofolio] ${topic} - ${name}`);
      const body = encodeURIComponent(`Halo Arief,\n\nNama: ${name}\nTopik: ${topic}\n\n${msg}`);
      window.location.href = `mailto:dikaaruef@gmail.com?subject=${subject}&body=${body}`;
    });
  }

  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    reveals.forEach((el) => obs.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("visible"));
  }
})();
