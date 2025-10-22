document.addEventListener('DOMContentLoaded', () => {
    // --- Global Effects ---

    // Initialize particles.js if the container exists
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": {
                "number": { "value": 120, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#7F00FF" },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.5, "random": false },
                "size": { "value": 3, "random": true },
                "line_linked": { "enable": true, "distance": 150, "color": "#7F00FF", "opacity": 0.4, "width": 1 },
                "move": { "enable": true, "speed": 8, "direction": "none", "out_mode": "out" }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": { "onhover": { "enable": true, "mode": "repulse" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
                "modes": { "repulse": { "distance": 200, "duration": 0.4 }, "push": { "particles_nb": 4 } }
            },
            "retina_detect": true
        });
    }

    // Create the gradual blur effect if the container exists
    const createGradualBlur = () => {
        const container = document.getElementById('gradual-blur');
        if (!container) return;
        // ... (blur effect implementation remains the same)
    };
    createGradualBlur();

    // Dock effect
    const dockContainer = document.getElementById('dock-container');
    if (dockContainer) {
        const dockItems = document.querySelectorAll('.dock-item');
        const magnification = 70;
        const distance = 200;
        const baseItemSize = 50;
        const spring = { mass: 0.1, stiffness: 150, damping: 12 };

        dockItems.forEach(item => {
            gsap.to(item, { width: baseItemSize, height: baseItemSize, ...spring });
        });

        dockContainer.addEventListener('mousemove', (e) => {
            const mouseX = e.pageX;
            dockItems.forEach(item => {
                const rect = item.getBoundingClientRect();
                const itemX = rect.left + rect.width / 2;
                const mouseDistance = mouseX - itemX;
                let targetSize = Math.abs(mouseDistance) < distance
                    ? baseItemSize + (magnification - baseItemSize) * (1 - Math.abs(mouseDistance) / distance)
                    : baseItemSize;
                gsap.to(item, { width: targetSize, height: targetSize, ...spring });
            });
        });

        dockContainer.addEventListener('mouseleave', () => {
            dockItems.forEach(item => {
                gsap.to(item, { width: baseItemSize, height: baseItemSize, ...spring });
            });
        });
    }

    // --- Page-Specific Effects ---

    // SplitText animation for the hero title
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.innerHTML = '';
        text.split('').forEach(char => {
            const span = document.createElement('span');
            span.innerHTML = char === ' ' ? '&nbsp;' : char;
            span.style.display = 'inline-block';
            heroTitle.appendChild(span);
        });

        gsap.from(heroTitle.querySelectorAll('span'), {
            duration: 0.8,
            opacity: 0,
            y: -50,
            rotationX: -90,
            stagger: 0.05,
            ease: 'power2.out',
            delay: 0.5
        });
    }

    // Tilted card effect for all product cards
    const tiltedCards = document.querySelectorAll('.product-card');
    if (tiltedCards.length > 0) {
        tiltedCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const rotateX = (y - rect.height / 2) / 5;
                const rotateY = (x - rect.width / 2) / -5;
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            });
        });
    }

    // ChromaGrid effect
    const chromaGrid = document.getElementById('chroma-grid');
    if (chromaGrid) {
        const chromaFade = chromaGrid.querySelector('.chroma-fade');
        if (chromaFade) {
            const setX = gsap.quickSetter(chromaGrid, '--x', 'px');
            const setY = gsap.quickSetter(chromaGrid, '--y', 'px');
            const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
            gsap.to(pos, {
                x: pos.x, y: pos.y, ease: 'power3.out',
                onUpdate: () => { setX(pos.x); setY(pos.y); }
            });

            chromaGrid.addEventListener('pointermove', (e) => {
                const rect = chromaGrid.getBoundingClientRect();
                gsap.to(pos, {
                    x: e.clientX - rect.left, y: e.clientY - rect.top,
                    duration: 0.45, ease: 'power3.out',
                    onUpdate: () => { setX(pos.x); setY(pos.y); },
                    overwrite: true
                });
                gsap.to(chromaFade, { opacity: 0, duration: 0.25, overwrite: true });
            });

            chromaGrid.addEventListener('pointerleave', () => {
                gsap.to(chromaFade, { opacity: 1, duration: 0.6, overwrite: true });
            });
        }
    }

    // --- Theme Switcher ---
    const themeSwitcher = document.getElementById('theme-switcher');
    const body = document.body;

    const setTheme = (theme) => {
        if (theme === 'light') {
            body.classList.add('light-theme');
            themeSwitcher.checked = true;
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.remove('light-theme');
            themeSwitcher.checked = false;
            localStorage.setItem('theme', 'dark');
        }
    };

    if (themeSwitcher) {
        themeSwitcher.addEventListener('change', () => {
            const theme = themeSwitcher.checked ? 'light' : 'dark';
            setTheme(theme);
        });

        // Load saved theme from local storage
        const savedTheme = localStorage.getItem('theme') || 'dark';
        setTheme(savedTheme);
    }


    // Search functionality for products page
    const searchBar = document.getElementById('search-bar');
    if (searchBar) {
        const productCards = document.querySelectorAll('.product-card');
        const suggestionsContainer = document.getElementById('suggestions-container');
        const productNames = Array.from(productCards).map(card => card.querySelector('h3').textContent);

        const filterProducts = () => {
            const searchTerm = searchBar.value.toLowerCase();
            productCards.forEach(card => {
                const productName = card.querySelector('h3').textContent.toLowerCase();
                if (productName.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        };

        const showSuggestions = () => {
            const searchTerm = searchBar.value.toLowerCase();
            suggestionsContainer.innerHTML = '';
            if (searchTerm.length === 0) {
                suggestionsContainer.style.display = 'none';
                return;
            }

            const filteredNames = productNames.filter(name => name.toLowerCase().includes(searchTerm));

            if (filteredNames.length > 0) {
                filteredNames.forEach(name => {
                    const item = document.createElement('div');
                    item.classList.add('suggestion-item');
                    item.textContent = name;
                    item.addEventListener('click', () => {
                        searchBar.value = name;
                        suggestionsContainer.style.display = 'none';
                        filterProducts();
                    });
                    suggestionsContainer.appendChild(item);
                });
                suggestionsContainer.style.display = 'block';
            } else {
                suggestionsContainer.style.display = 'none';
            }
        };

        searchBar.addEventListener('input', () => {
            filterProducts();
            showSuggestions();
        });

        document.addEventListener('click', (e) => {
            if (suggestionsContainer && !suggestionsContainer.contains(e.target) && e.target !== searchBar) {
                suggestionsContainer.style.display = 'none';
            }
        });
    }
});