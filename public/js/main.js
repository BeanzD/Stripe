function openTutorial(tutorialId) {
    const tutorial = tutorials[tutorialId];
    if (!tutorial) {
        console.error('教程不存在：', tutorialId);
        return;
    }

    const modal = document.getElementById('tutorial-modal');
    const modalBody = document.getElementById('modal-body');

    modalBody.innerHTML = `
        <h2 class="modal-title">${tutorial.title}</h2>
        <p class="modal-subtitle">${tutorial.subtitle}</p>
        ${tutorial.content}
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    Prism.highlightAll();
}

function closeModal() {
    const modal = document.getElementById('tutorial-modal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

function switchCodeTab(button, codeId) {
    const container = button.closest('.code-container');
    const tabs = container.parentElement.querySelectorAll('.code-tab');
    const codes = container.querySelectorAll('pre code');

    tabs.forEach(tab => tab.classList.remove('active'));
    codes.forEach(code => code.style.display = 'none');

    button.classList.add('active');
    const targetCode = document.getElementById(codeId);
    if (targetCode) {
        targetCode.style.display = 'block';
        Prism.highlightElement(targetCode);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    const modal = document.getElementById('tutorial-modal');

    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });

    const tutorialCards = document.querySelectorAll('.tutorial-card');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    tutorialCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    const sections = document.querySelectorAll('.section');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});