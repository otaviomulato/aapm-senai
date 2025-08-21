document.addEventListener('DOMContentLoaded', () => {

    const sections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('header nav a.nav-link[href^="#"]');
    const firstNavLink = navLinks.length > 0 ? navLinks[0] : null;

    if (sections.length === 0 || navLinks.length === 0) {
        console.log("Scroll Spy não iniciado: Seções com ID ou links de navegação não encontrados.");
        return;
    }

    const setActiveLink = (linkToActivate) => {
        navLinks.forEach(link => {
            link.classList.remove('scroll-active');
        });
        if (linkToActivate) {
            linkToActivate.classList.add('scroll-active');
        }
    };

    const handleScroll = () => {
        const topOfPageOffset = 200; 
        if (window.scrollY < topOfPageOffset) {
            setActiveLink(firstNavLink);
        }
    };

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
            rootMargin: '0px 0px -40% 0px',
        }
    );

    sections.forEach((section) => {
        observer.observe(section);
    });

    window.addEventListener('scroll', handleScroll);
    
    handleScroll();
});