document.addEventListener('DOMContentLoaded', function () {
    // --- LÓGICA DO MENU HAMBÚRGUER ---
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (menuToggle && navLinks) {
        const menuIcon = menuToggle.querySelector('i');

        menuToggle.addEventListener('click', function () {
            // Alterna a classe 'hidden' do Tailwind no container dos links.
            navLinks.classList.toggle('hidden');

            // Troca o ícone do botão com base na visibilidade do menu.
            if (navLinks.classList.contains('hidden')) {
                // Se o menu está escondido, mostra o ícone de barras.
                menuIcon.classList.remove('fa-xmark');
                menuIcon.classList.add('fa-bars');
            } else {
                // Se o menu está visível, mostra o ícone de 'X'.
                menuIcon.classList.remove('fa-bars');
                menuIcon.classList.add('fa-xmark');
            }
        });
    }

    // --- LÓGICA DO SWIPER CAROUSEL (se existir) ---
    // Este código garante que o carrossel continue funcionando.
    const swiper = new Swiper('.aapm-carousel', {
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
    });

    // Você pode adicionar outras lógicas do 'scroll-animation.js' ou de outros scripts aqui,
    // se desejar unificar os arquivos no futuro.
});