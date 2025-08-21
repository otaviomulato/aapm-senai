document.addEventListener('DOMContentLoaded', () => {

    const sections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('header nav a.nav-link[href^="#"]');
    const firstNavLink = navLinks.length > 0 ? navLinks[0] : null;

    if (sections.length === 0 || navLinks.length === 0) {
        console.log("Scroll Spy não iniciado: Seções com ID ou links de navegação não encontrados.");
        return;
    }

    // Função para definir o link ativo
    const setActiveLink = (linkToActivate) => {
        navLinks.forEach(link => {
            link.classList.remove('scroll-active');
        });
        if (linkToActivate) {
            linkToActivate.classList.add('scroll-active');
        }
    };

    // Lógica para o topo da página
    const handleScroll = () => {
        const topOfPageOffset = 200; 
        if (window.scrollY < topOfPageOffset) {
            setActiveLink(firstNavLink);
        }
    };

    // Observador para as seções
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    const activeLink = document.querySelector(`header nav a[href="#${id}"]`);
                    setActiveLink(activeLink);
                }
            });
        }, {
            // ===== LÓGICA DE DETECÇÃO CORRIGIDA =====
            // Define uma área de ativação que vai do topo da tela (0px)
            // até 40% da altura da tela a partir do rodapé.
            // Isso garante que mesmo a última seção (curta) seja detectada.
            rootMargin: '0px 0px -40% 0px',
        }
    );

    // Ativa o observador para cada seção
    sections.forEach((section) => {
        observer.observe(section);
    });

    // Ativa a lógica que cuida do topo da página
    window.addEventListener('scroll', handleScroll);
    
    handleScroll();
});