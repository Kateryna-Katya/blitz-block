document.addEventListener('DOMContentLoaded', () => {
    // 1. Инициализация иконок
    if (window.lucide) lucide.createIcons();

    // 2. Мобильное меню
    const burger = document.querySelector('.header__burger');
    const nav = document.querySelector('.header__nav');
    
    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        nav.classList.toggle('active');
    });

    // 3. Капча
    const captchaText = document.getElementById('captcha-question');
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    if (captchaText) captchaText.innerText = `${num1} + ${num2}`;

    // 4. Валидация телефона (только цифры)
    const phoneInput = document.getElementById('phone');
    phoneInput?.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^\d]/g, '');
    });

    // 5. Обработка формы (AJAX имитация)
    const form = document.getElementById('ai-form');
    const status = document.getElementById('form-status');

    form?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const answer = document.getElementById('captcha-answer').value;

        if (parseInt(answer) !== (num1 + num2)) {
            status.innerText = "Ошибка капчи. Попробуйте снова.";
            status.className = "form__status error";
            return;
        }

        status.innerText = "Отправка...";
        status.className = "form__status success";

        // Имитация задержки сервера
        await new Promise(resolve => setTimeout(resolve, 1500));

        status.innerText = "Успех! Мы свяжемся с вами в ближайшее время.";
        form.reset();
    });

    // 6. Cookie Popup
    const cookiePopup = document.getElementById('cookie-popup');
    const cookieAccept = document.getElementById('cookie-accept');

    if (!localStorage.getItem('cookies-accepted')) {
        setTimeout(() => {
            cookiePopup.classList.add('active');
        }, 2000);
    }

    cookieAccept?.addEventListener('click', () => {
        localStorage.setItem('cookies-accepted', 'true');
        cookiePopup.classList.remove('active');
    });

    // 7. GSAP Анимации
    if (window.gsap) {
        gsap.from(".hero__title", { opacity: 0, y: 50, duration: 1, delay: 0.2 });
        gsap.from(".hero__text", { opacity: 0, y: 30, duration: 1, delay: 0.5 });
        
        // Появление секций при скролле
        const sections = document.querySelectorAll('section');
        sections.forEach(sec => {
            gsap.from(sec, {
                scrollTrigger: {
                    trigger: sec,
                    start: "top 85%",
                },
                opacity: 0,
                y: 50,
                duration: 0.8
            });
        });
    }
});