document.addEventListener('DOMContentLoaded', () => {
    // Pega todas as seções que têm um ID dentro do <main>
    const sections = document.querySelectorAll('main section[id]');
    
    // Pega todos os links de navegação
    const navLinks = document.querySelectorAll('header nav a.nav-link');
    
    // Define um deslocamento para compensar a altura do header fixo
    const headerOffset = 150; // Ajuste este valor se necessário

    const handleScrollSpy = () => {
        let currentSectionId = '';

        // Itera sobre cada seção para ver qual está na tela
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            
            // Se a posição de rolagem passou do topo da seção (com o deslocamento)
            if (window.scrollY >= sectionTop - headerOffset) {
                currentSectionId = section.getAttribute('id');
            }
        });

        // --- CORREÇÃO PARA A ÚLTIMA SEÇÃO ---
        // Verifica se o usuário chegou ao final da página
        const isAtBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 2; // 2px de tolerância
        if (isAtBottom) {
            // Se estiver no final, força o ID para ser o da última seção
            currentSectionId = sections[sections.length - 1].getAttribute('id');
        }
        // --- FIM DA CORREÇÃO ---

        // Agora, itera sobre os links para ativar o correto
        navLinks.forEach(link => {
            link.classList.remove('scroll-active');

            const linkHref = link.getAttribute('href');

            if (`#${currentSectionId}` === linkHref) {
                link.classList.add('scroll-active');
            }
        });
        
        // Caso especial para o link 'Início'
        if (currentSectionId === '') {
            const homeLink = document.querySelector('header nav a[href="index.html"]');
            if (homeLink) {
                homeLink.classList.add('scroll-active');
            }
        }
    };

    // Adiciona o listener de scroll e executa uma vez no carregamento
    window.addEventListener('scroll', handleScrollSpy);
    handleScrollSpy();
});