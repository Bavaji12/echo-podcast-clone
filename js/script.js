/* ==========================================================
   ECHO PODCAST - VANILLA JAVASCRIPT
   ========================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    /* 1. Navbar Scrolled Effect & Scroll Progress Bar */
    const header = document.querySelector('.header-section');
    const scrollProgress = document.getElementById('scroll-progress');
    const backToTopBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;

        // Update progress bar
        if (scrollProgress) {
            scrollProgress.style.width = scrollPercent + '%';
        }

        // Header scrolled class
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Back to top button visibility
        if (scrollTop > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });

    // Back to top action
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /* 2. Dark Mode Toggle */
    const themeToggleBtn = document.getElementById('themeToggle');
    const currentTheme = localStorage.getItem('theme') || 'light';

    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        if (themeToggleBtn) {
            themeToggleBtn.innerHTML = '<i class="bi bi-sun-fill text-warning"></i>';
        }
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            let theme = document.documentElement.getAttribute('data-theme');
            if (theme === 'dark') {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
                themeToggleBtn.innerHTML = '<i class="bi bi-moon-stars-fill"></i>';
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                themeToggleBtn.innerHTML = '<i class="bi bi-sun-fill text-warning"></i>';
            }
        });
    }

    /* 3. Search Overlay & Filter */
    const searchToggle = document.getElementById('searchToggle');
    const searchOverlay = document.getElementById('searchOverlay');
    const searchClose = document.getElementById('searchClose');
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');

    // Mock podcast episodes database for search
    const episodesData = [
        { title: "Designing for the Next Billion Users", host: "Sarah Jenkins", category: "Technology", date: "Oct 12, 2026" },
        { title: "Scaling Remote Engineering Teams", host: "David Chen", category: "Business", date: "Oct 05, 2026" },
        { title: "The Ethics of Autonomous Systems", host: "Dr. Elena Rostova", category: "AI & Future", date: "Sep 28, 2026" }
    ];

    if (searchToggle && searchOverlay) {
        searchToggle.addEventListener('click', () => {
            searchOverlay.classList.add('active');
            setTimeout(() => searchInput.focus(), 100);
        });

        searchClose.addEventListener('click', () => {
            searchOverlay.classList.remove('active');
            searchInput.value = '';
            searchResults.innerHTML = '';
        });

        // Close on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                searchOverlay.classList.remove('active');
            }
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            searchResults.innerHTML = '';

            if (query === '') return;

            const filtered = episodesData.filter(item => 
                item.title.toLowerCase().includes(query) || 
                item.host.toLowerCase().includes(query) || 
                item.category.toLowerCase().includes(query)
            );

            if (filtered.length === 0) {
                searchResults.innerHTML = `<p class="text-white-50 text-center">No episodes found matching "${query}"</p>`;
                return;
            }

            let html = '<div class="list-group bg-transparent">';
            filtered.forEach(ep => {
                html += `
                    <a href="#episodes" class="list-group-item list-group-item-action bg-transparent border-secondary text-white rounded-3 mb-2 p-3">
                        <div class="d-flex justify-content-between align-items-center">
                            <h6 class="mb-1 fw-bold">${ep.title}</h6>
                            <span class="badge bg-primary">${ep.category}</span>
                        </div>
                        <small class="text-white-50">Host: ${ep.host} • ${ep.date}</small>
                    </a>
                `;
            });
            html += '</div>';
            searchResults.innerHTML = html;

            // Close overlay when clicking result
            searchResults.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    searchOverlay.classList.remove('active');
                });
            });
        });
    }

    /* 4. Favorite Button Toggle */
    const favButtons = document.querySelectorAll('.fav-btn');
    favButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            btn.classList.toggle('active');
            const icon = btn.querySelector('bi');
            if (btn.classList.contains('active')) {
                btn.innerHTML = '<i class="bi bi-heart-fill"></i>';
            } else {
                btn.innerHTML = '<i class="bi bi-heart"></i>';
            }
        });
    });

    /* 5. Smooth Scrolling for Navigation Links */
    document.querySelectorAll('a.nav-link, a.footer-links').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId.startsWith('#') && targetId.length > 1) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                    // Close mobile navbar if open
                    const navbarCollapse = document.getElementById('navbarNav');
                    if (navbarCollapse.classList.contains('show')) {
                        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                        if (bsCollapse) bsCollapse.hide();
                    }
                }
            }
        });
    });

});