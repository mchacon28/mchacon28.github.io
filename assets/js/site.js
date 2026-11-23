/* Shared header / footer and small interactions for every page.
   Edit SITE below to change the navigation or footer in one place. */

const SITE = {
    name: "Mario Chacón-Falcón",
    nav: [
        { href: "publications.html", label: "Publications", key: "publications" },
        { href: "talks.html", label: "Talks", key: "talks" },
        { href: "teaching.html", label: "Teaching & More", key: "teaching" },
        { href: "cv.html", label: "CV", key: "cv" }
    ],
    lastUpdated: "November 2026"
};

(function () {
    const page = document.body.dataset.page || "";

    /* ---------- Header ---------- */
    const header = document.createElement("header");
    header.className = "site-header";
    header.innerHTML = `
        <div class="wrap">
            <a class="brand" href="index.html">${SITE.name}</a>
            <div class="header-actions">
                <nav class="site-nav" id="site-nav" aria-label="Main">
                    ${SITE.nav.map(item =>
                        `<a href="${item.href}"${item.key === page ? ' aria-current="page"' : ""}>${item.label}</a>`
                    ).join("")}
                </nav>
                <button class="icon-btn theme-btn" type="button" aria-label="Toggle dark mode" title="Toggle dark mode">
                    <i class="fa-solid fa-moon"></i>
                </button>
                <button class="icon-btn menu-btn" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="site-nav">
                    <i class="fa-solid fa-bars"></i>
                </button>
            </div>
        </div>`;
    document.body.prepend(header);

    const skip = document.createElement("a");
    skip.className = "skip-link";
    skip.href = "#content";
    skip.textContent = "Skip to content";
    document.body.prepend(skip);

    /* ---------- Footer ---------- */
    const footer = document.createElement("footer");
    footer.className = "site-footer";
    footer.innerHTML = `
        <div class="wrap">
            <div>
                &copy; ${new Date().getFullYear()} ${SITE.name}<br>
                Last updated ${SITE.lastUpdated}
            </div>
            <div class="funding">
                <img src="images/Logo-Momentum-Negativo_Circular.png" alt="Momentum CSIC logo" width="40" height="40">
                <span>Funded by the European Commission &ndash; NextGenerationEU, through the Momentum CSIC Programme: <em>Develop Your Digital Talent</em>.</span>
            </div>
        </div>`;
    document.body.append(footer);

    /* ---------- Mobile menu ---------- */
    const nav = header.querySelector(".site-nav");
    const menuBtn = header.querySelector(".menu-btn");
    menuBtn.addEventListener("click", () => {
        const open = nav.classList.toggle("open");
        menuBtn.setAttribute("aria-expanded", String(open));
        menuBtn.innerHTML = open ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
    });

    /* ---------- Theme toggle ---------- */
    const root = document.documentElement;
    const themeBtn = header.querySelector(".theme-btn");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

    function currentTheme() {
        return root.dataset.theme || (prefersDark.matches ? "dark" : "light");
    }
    function paintIcon() {
        themeBtn.innerHTML = currentTheme() === "dark"
            ? '<i class="fa-solid fa-sun"></i>'
            : '<i class="fa-solid fa-moon"></i>';
    }
    themeBtn.addEventListener("click", () => {
        const next = currentTheme() === "dark" ? "light" : "dark";
        root.dataset.theme = next;
        try { localStorage.setItem("theme", next); } catch (e) { /* storage unavailable */ }
        paintIcon();
    });
    prefersDark.addEventListener?.("change", paintIcon);
    paintIcon();

    /* ---------- Toast + copy helpers ---------- */
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.setAttribute("role", "status");
    document.body.append(toast);
    let toastTimer;
    function showToast(msg) {
        toast.textContent = msg;
        toast.classList.add("show");
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => toast.classList.remove("show"), 1800);
    }

    document.addEventListener("click", (e) => {
        const btn = e.target.closest("[data-copy]");
        if (!btn) return;
        e.preventDefault();
        const target = document.getElementById(btn.dataset.copy);
        const text = target ? target.textContent.trim() : btn.dataset.copy;
        navigator.clipboard.writeText(text)
            .then(() => showToast(btn.dataset.toast || "Copied to clipboard"))
            .catch(() => showToast("Could not copy — please select the text manually"));
    });
})();
