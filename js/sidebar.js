// Sidebar configuration
const sidebarConfig = {
    profile: {
        name: "Mario Chacón-Falcón",
        title: "Ph.D. Candidate in Artificial Intelligence",
        affiliation: "Institute of Mathematical Sciences (ICMAT-CSIC)",
        image: "images/profile3.JPG"
    },
    navigation: [
        { href: "index.html", icon: "fas fa-user", text: "About Me" },
        //{ href: "publications.html", icon: "fas fa-scroll", text: "Publications" },
        { href: "conferences.html", icon: "fas fa-chalkboard-teacher", text: "Conferences" },
        //{ href: "research_projects.html", icon: "fas fa-flask", text: "Research Projects" },
        { href: "projects.html", icon: "fas fa-code-branch", text: "Personal Projects" },
        //{ href: "awards.html", icon: "fas fa-trophy", text: "Awards & Honors" }
    ],
    contact: {
        email: "mario.chacon@icmat.es",
        social: [
            { href: "https://github.com/mchacon28", icon: "fab fa-github", title: "GitHub" },
            { href: "https://www.linkedin.com/in/mario-chacon-falcon518831318/", icon: "fab fa-linkedin", title: "LinkedIn" },
            { href: "https://orcid.org/0009-0004-5938-0551", icon: "fab fa-orcid", title: "ORCID" },
            //{ href: "https://www.researchgate.net/profile/Mario-Chacon-Falcon", icon: "fab fa-researchgate", title: "ResearchGate" },
            { href: "https://scholar.google.es/citations?user=s39KvDoAAAAJ&hl=es", icon: "fas fa-graduation-cap", title: "Google Scholar" }
        ]
    }
};

// Function to create the sidebar HTML
function createSidebar() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Determinar si estamos en modo móvil
    const isMobile = window.innerWidth <= 768;
    
    const sidebarHTML = `
        <aside class="sidebar">
            <div class="sidebar-content">
                <div class="sidebar-top">
                    <div class="profile-container">
                        <img src="${sidebarConfig.profile.image}" alt="Profile picture" class="profile-image">
                        <div class="profile-text">
                            <h1>${sidebarConfig.profile.name}</h1>
                            <p class="title">${sidebarConfig.profile.title}</p>
                            <p class="affiliation">${sidebarConfig.profile.affiliation}</p>
                        </div>
                    </div>
                    
                    ${isMobile ? '<button class="mobile-toggle">Menu ▼</button>' : ''}
                    
                    <nav class="sidebar-nav ${isMobile ? '' : 'active'}">
                        <ul>
                            ${sidebarConfig.navigation.map(item => `
                                <li>
                                    <a href="${item.href}" class="nav-link ${item.href === currentPage ? 'active' : ''}">
                                        <i class="${item.icon}"></i> ${item.text}
                                    </a>
                                </li>
                            `).join('')}
                        </ul>
                    </nav>
                </div>
                
                <div class="sidebar-contact">
                    <h3>Contact</h3>
                    <ul class="contact-list">
                        <li>
                            <a href="mailto:${sidebarConfig.contact.email}" class="contact-icon" data-type="email" data-value="${sidebarConfig.contact.email}" title="Copy email">
                                <i class="fas fa-envelope"></i>
                            </a>
                        </li>
                        ${sidebarConfig.contact.social.map(item => `
                            <li>
                                <a href="${item.href}" target="_blank" class="contact-icon" title="${item.title}">
                                    <i class="${item.icon}"></i>
                                </a>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            </div>
        </aside>
    `;

    // Insert sidebar at the beginning of the layout container
    const layoutContainer = document.querySelector('.layout-container');
    if (layoutContainer) {
        layoutContainer.insertAdjacentHTML('afterbegin', sidebarHTML);
    }

    // Manejar el menú desplegable en móvil
    const toggleButton = document.querySelector('.mobile-toggle');
    if (toggleButton) {
        toggleButton.addEventListener('click', function() {
            const navMenu = document.querySelector('.sidebar-nav');
            if (navMenu) {
                navMenu.classList.toggle('active');
                this.classList.toggle('active');
                
                // Cambiar el texto del botón según el estado
                if (this.classList.contains('active')) {
                    this.innerHTML = 'Menu ▲';
                } else {
                    this.innerHTML = 'Menu ▼';
                }
            }
        });
    }

    // Add email copy functionality
    const emailLinks = document.querySelectorAll('.contact-icon[data-type="email"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const email = this.getAttribute('data-value');
            navigator.clipboard.writeText(email)
                .then(() => {
                    // Create and show tooltip
                    const tooltip = document.createElement('div');
                    tooltip.className = 'tooltip';
                    tooltip.textContent = 'Email copied!';
                    document.body.appendChild(tooltip);
                    
                    // Position tooltip near the icon
                    const rect = this.getBoundingClientRect();
                    tooltip.style.top = `${rect.top - 40}px`;
                    tooltip.style.left = `${rect.left}px`;
                    
                    // Remove tooltip after a delay
                    setTimeout(() => {
                        tooltip.classList.add('fade-out');
                        setTimeout(() => {
                            document.body.removeChild(tooltip);
                        }, 500);
                    }, 2000);
                })
                .catch(err => {
                    console.error('Failed to copy email: ', err);
                });
        });
    });
}

// Función para manejar cambios de tamaño de la ventana
function handleResize() {
    // Solo recrear la barra si cambiamos entre modo móvil y escritorio
    const isMobileNow = window.innerWidth <= 768;
    const wasMobile = document.querySelector('.mobile-toggle') !== null;
    
    // Si cambiamos entre móvil y escritorio (o viceversa), recrear la barra lateral
    if (isMobileNow !== wasMobile) {
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
            sidebar.remove();
            createSidebar();
        }
    }
}

// Initialize sidebar when DOM is loaded and handle resize events
document.addEventListener('DOMContentLoaded', function() {
    createSidebar();
    
    // Usar un debounce para evitar llamadas múltiples durante el redimensionamiento
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(handleResize, 250);
    });
}); 