document.addEventListener('DOMContentLoaded', () => {
    // SplitText animation for the hero title
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.innerHTML = ''; // Use innerHTML to allow for spaces
        text.split('').forEach(char => {
            const span = document.createElement('span');
            if (char === ' ') {
                span.innerHTML = '&nbsp;'; // Use a non-breaking space
            } else {
                span.textContent = char;
            }
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

    // Add scroll animations to product cards
    const productCards = document.querySelectorAll('.product-card');
    const animateOnScroll = () => {
        productCards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            if (cardTop < window.innerHeight - 100) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    };

    // Initial animation check
    animateOnScroll();

    // Listen for scroll events
    window.addEventListener('scroll', animateOnScroll);

    // Initialize particles.js
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 120,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#7F00FF"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                },
            },
            "opacity": {
                "value": 0.5,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#7F00FF",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 8,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "repulse"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 400,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });

    // Create the gradual blur effect
    const createGradualBlur = () => {
        const container = document.getElementById('gradual-blur');
        if (!container) return;

        const config = {
            divCount: 12,
            strength: 4,
            position: 'bottom'
        };

        const increment = 100 / config.divCount;
        const getGradientDirection = (position) => ({
            top: 'to top',
            bottom: 'to bottom',
            left: 'to left',
            right: 'to right'
        }[position] || 'to bottom');

        for (let i = 1; i <= config.divCount; i++) {
            const progress = i / config.divCount;
            const blurValue = Math.pow(2, progress * 4) * 0.0625 * config.strength;
            const p1 = Math.round((increment * i - increment) * 10) / 10;
            const p2 = Math.round(increment * i * 10) / 10;
            const p3 = Math.round((increment * i + increment) * 10) / 10;
            const p4 = Math.round((increment * i + increment * 2) * 10) / 10;

            let gradient = `transparent ${p1}%, black ${p2}%`;
            if (p3 <= 100) gradient += `, black ${p3}%`;
            if (p4 <= 100) gradient += `, transparent ${p4}%`;

            const direction = getGradientDirection(config.position);
            const div = document.createElement('div');
            div.style.position = 'absolute';
            div.style.inset = '0';
            div.style.maskImage = `linear-gradient(${direction}, ${gradient})`;
            div.style.webkitMaskImage = `linear-gradient(${direction}, ${gradient})`;
            div.style.backdropFilter = `blur(${blurValue.toFixed(3)}rem)`;
            div.style.webkitBackdropFilter = `blur(${blurValue.toFixed(3)}rem)`;
            container.appendChild(div);
        }
    };

    createGradualBlur();

    // Tilted card effect
    const tiltedCards = document.querySelectorAll('.product-card');

    tiltedCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 5;
            const rotateY = (x - centerX) / -5;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });

    // ChromaGrid effect
    const chromaGrid = document.getElementById('chroma-grid');
    const chromaFade = document.querySelector('.chroma-fade');

    if (chromaGrid && chromaFade) {
        const setX = gsap.quickSetter(chromaGrid, '--x', 'px');
        const setY = gsap.quickSetter(chromaGrid, '--y', 'px');
        const pos = { x: 0, y: 0 };

        const { width, height } = chromaGrid.getBoundingClientRect();
        pos.x = width / 2;
        pos.y = height / 2;
        setX(pos.x);
        setY(pos.y);

        const moveTo = (x, y) => {
            gsap.to(pos, {
                x,
                y,
                duration: 0.45,
                ease: 'power3.out',
                onUpdate: () => {
                    setX(pos.x);
                    setY(pos.y);
                },
                overwrite: true
            });
        };

        chromaGrid.addEventListener('pointermove', (e) => {
            const rect = chromaGrid.getBoundingClientRect();
            moveTo(e.clientX - rect.left, e.clientY - rect.top);
            gsap.to(chromaFade, { opacity: 0, duration: 0.25, overwrite: true });
        });

        chromaGrid.addEventListener('pointerleave', () => {
            gsap.to(chromaFade, { opacity: 1, duration: 0.6, overwrite: true });
        });
    }

    // Dock effect
    const dockContainer = document.getElementById('dock-container');
    const dockItems = document.querySelectorAll('.dock-item');
    const magnification = 70;
    const distance = 200;
    const baseItemSize = 50;

    if (dockContainer && dockItems.length > 0) {
        const spring = { mass: 0.1, stiffness: 150, damping: 12 };

        dockItems.forEach(item => {
            const itemProxy = { size: baseItemSize };
            gsap.to(itemProxy, {
                size: baseItemSize,
                ...spring,
                onUpdate: () => {
                    item.style.width = `${itemProxy.size}px`;
                    item.style.height = `${itemProxy.size}px`;
                }
            });
        });

        dockContainer.addEventListener('mousemove', (e) => {
            const mouseX = e.pageX;
            dockItems.forEach(item => {
                const rect = item.getBoundingClientRect();
                const itemX = rect.left + rect.width / 2;
                const mouseDistance = mouseX - itemX;
                let targetSize;
                if (Math.abs(mouseDistance) < distance) {
                    targetSize = baseItemSize + (magnification - baseItemSize) * (1 - Math.abs(mouseDistance) / distance);
                } else {
                    targetSize = baseItemSize;
                }
                gsap.to(item, {
                    width: targetSize,
                    height: targetSize,
                    ...spring
                });
            });
        });

        dockContainer.addEventListener('mouseleave', () => {
            dockItems.forEach(item => {
                gsap.to(item, {
                    width: baseItemSize,
                    height: baseItemSize,
                    ...spring
                });
            });
        });

        dockItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = item.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
});