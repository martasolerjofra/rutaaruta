// Funció per carregar components HTML (header i footer)
async function loadComponent(elementId, filePath) {
    try {
        // Detectem la base del projecte buscant on està main.js
        const scripts = document.getElementsByTagName('script');
        let basePath = '';
        for (let i = 0; i < scripts.length; i++) {
            if (scripts[i].src.includes('js/main.js')) {
                basePath = scripts[i].src.split('js/main.js')[0];
                break;
            }
        }

        const response = await fetch(basePath + filePath);
        if (!response.ok) throw new Error(`Status: ${response.status}`);

        const content = await response.text();
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = content;

        // Determinem si estem a la home o a una subpàgina
        const isHomePage = window.location.pathname.endsWith('index.html') ||
            window.location.pathname.endsWith('/') ||
            window.location.pathname === '' ||
            window.location.pathname.split('/').pop() === '';

        // Corregir imatges
        tempDiv.querySelectorAll('img').forEach(img => {
            const src = img.getAttribute('src');
            if (src && !src.startsWith('http') && !src.startsWith('/')) {
                img.src = basePath + src;
            }
        });

        // Corregir enllaços
        tempDiv.querySelectorAll('a').forEach(a => {
            const href = a.getAttribute('href');
            if (href) {
                if (href.startsWith('#')) {
                    // Si som en subpàgina, els enllaços d'àncora han d'anar a la home
                    if (!isHomePage) {
                        a.href = basePath + 'index.html' + href;
                    }
                } else if (!href.startsWith('http') && !href.startsWith('/') && !href.startsWith('mailto:')) {
                    // Rutes relatives (ex: 'Assets/...')
                    a.href = basePath + href;
                }
            }
        });

        document.getElementById(elementId).innerHTML = tempDiv.innerHTML;
    } catch (error) {
        console.error(`Error carregant el component ${filePath}:`, error);
    }
}

// Inicialització global
document.addEventListener('DOMContentLoaded', () => {
    // Carregar components
    loadComponent('header-placeholder', 'components/header.html');
    loadComponent('footer-placeholder', 'components/footer.html');

    // Event Delegation per al scroll suavitzat (funciona per a elements carregats dinàmicament)
    document.addEventListener('click', (e) => {
        const anchor = e.target.closest('a[href^="#"]');
        if (anchor) {
            const href = anchor.getAttribute('href');
            // Només fem scroll si estem a la mateixa pàgina on existeix l'element
            if (href !== '#') {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        }
    });

    // Carousel Logic
    const initCarousels = () => {
        const carousels = document.querySelectorAll('.gallery-carousel');
        carousels.forEach(carousel => {
            const container = carousel.querySelector('.carousel-container');
            const prevBtn = carousel.querySelector('.carousel-btn.prev');
            const nextBtn = carousel.querySelector('.carousel-btn.next');

            if (prevBtn && nextBtn && container) {
                prevBtn.addEventListener('click', () => {
                    container.scrollLeft -= container.offsetWidth;
                });
                nextBtn.addEventListener('click', () => {
                    container.scrollLeft += container.offsetWidth;
                });
            }
        });
    };

    initCarousels();

    // Lògica per mostrar més destins
    const loadMoreBtn = document.getElementById('load-more-btn');
    const extraDestinations = document.querySelectorAll('.extra-destination');

    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            const isHidden = extraDestinations[0].style.display === 'none' || extraDestinations[0].style.display === '';

            if (isHidden) {
                extraDestinations.forEach(dest => {
                    dest.style.display = 'block';
                    dest.style.animation = 'fadeIn 0.5s ease forwards';
                });
                loadMoreBtn.textContent = 'Veure\'n menys';
            } else {
                extraDestinations.forEach(dest => {
                    dest.style.display = 'none';
                });
                loadMoreBtn.textContent = 'Veure tots els destins';
                // Tornem a fer scroll cap a la secció per no quedar-nos a baix de tot
                document.getElementById('destins').scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});
