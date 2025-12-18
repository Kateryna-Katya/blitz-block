document.addEventListener('DOMContentLoaded', () => {
    // 1. Инициализация иконок Lucide
    if (window.lucide) {
        lucide.createIcons();
    }

    // --- МОБИЛЬНОЕ МЕНЮ (ИСПРАВЛЕННОЕ) ---
    const burger = document.querySelector('.header__burger');
    const nav = document.querySelector('.header__nav');
    const body = document.body;
    const navLinks = document.querySelectorAll('.header__link, .header__cta');

    // Функция переключения меню
    const toggleMenu = () => {
        const isActive = nav.classList.toggle('active');
        burger.classList.toggle('active');
        // Блокируем скролл при открытом меню
        body.style.overflow = isActive ? 'hidden' : '';
    };

    // Функция принудительного закрытия
    const closeMenu = () => {
        nav.classList.remove('active');
        burger.classList.remove('active');
        body.style.overflow = '';
    };

    if (burger) {
        burger.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });
    }

    // Закрытие при клике на любую ссылку в меню
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Закрытие при клике вне меню (опционально, для удобства)
    document.addEventListener('click', (e) => {
        if (nav.classList.contains('active') && !nav.contains(e.target) && !burger.contains(e.target)) {
            closeMenu();
        }
    });


    // --- ВАЛИДАЦИЯ И ОТПРАВКА ФОРМЫ ---
    const form = document.getElementById('ai-form');
    const status = document.getElementById('form-status');
    const captchaText = document.getElementById('captcha-question');
    const phoneInput = document.getElementById('phone');

    // Генерация капчи
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    if (captchaText) captchaText.innerText = `${num1} + ${num2}`;

    // Только цифры в телефоне
    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^\d]/g, '');
        });
    }

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const captchaAnswer = document.getElementById('captcha-answer').value;

            if (parseInt(captchaAnswer) !== (num1 + num2)) {
                showStatus("Ошибка капчи. Попробуйте снова.", "error");
                return;
            }

            showStatus("Отправка данных...", "success");

            // Имитация AJAX
            try {
                await new Promise(resolve => setTimeout(resolve, 1500));
                showStatus("Успех! Мы свяжемся с вами в ближайшее время.", "success");
                form.reset();
            } catch (err) {
                showStatus("Произошла ошибка. Попробуйте позже.", "error");
            }
        });
    }

    function showStatus(text, type) {
        if (!status) return;
        status.innerText = text;
        status.className = `form__status ${type}`;
        status.style.display = 'block';
    }


    // --- COOKIE POPUP ---
    const cookiePopup = document.getElementById('cookie-popup');
    const cookieAccept = document.getElementById('cookie-accept');

    if (cookiePopup && !localStorage.getItem('cookies-accepted')) {
        setTimeout(() => {
            cookiePopup.classList.add('active');
        }, 2000);
    }

    if (cookieAccept) {
        cookieAccept.addEventListener('click', () => {
            localStorage.setItem('cookies-accepted', 'true');
            cookiePopup.classList.remove('active');
        });
    }


    // --- GSAP АНИМАЦИИ ---
    if (window.gsap) {
        // Регистрация ScrollTrigger если он подключен
        if (window.ScrollTrigger) {
            gsap.registerPlugin(ScrollTrigger);
        }

        // Анимация Hero
        const tl = gsap.timeline();
        tl.from(".hero__title", { opacity: 0, x: -50, duration: 1, ease: "power3.out" })
          .from(".hero__text", { opacity: 0, y: 30, duration: 0.8 }, "-=0.5")
          .from(".hero__btns", { opacity: 0, y: 20, duration: 0.6 }, "-=0.3")
          .from(".hero__viz", { opacity: 0, scale: 0.8, duration: 1, ease: "back.out(1.7)" }, "-=0.8");

        // Параллакс карточки в Hero
        document.addEventListener("mousemove", (e) => {
            const x = (window.innerWidth / 2 - e.pageX) / 40;
            const y = (window.innerHeight / 2 - e.pageY) / 40;
            gsap.to(".hero__card", { 
                rotationY: x, 
                rotationX: -y, 
                duration: 1,
                ease: "power2.out" 
            });
        });

        // Появление секций при скролле
        const sections = document.querySelectorAll('section');
        sections.forEach(sec => {
            gsap.from(sec, {
                scrollTrigger: {
                    trigger: sec,
                    start: "top 85%",
                    toggleActions: "play none none none"
                },
                opacity: 0,
                y: 40,
                duration: 0.8,
                ease: "power2.out"
            });
        });
    }

    // Плавный скролл для всех внутренних ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
});