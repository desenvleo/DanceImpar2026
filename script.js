
const reveals = document.querySelectorAll('.reveal');

window.addEventListener('scroll', () => {
    const triggerBottom = window.innerHeight * 0.85;

    reveals.forEach(el => {
        const elTop = el.getBoundingClientRect().top;

        if (elTop < triggerBottom) {
            el.classList.add('active');
        } else {
            el.classList.remove('active');
        }
    });
});

window.addEventListener('load', () => {
    reveals.forEach(el => {
        const elTop = el.getBoundingClientRect().top;
        if (elTop < window.innerHeight * 0.85) {
            el.classList.add('active');
        }
    });
});

// ----------------------------------------------------//
const btnHorarios = document.getElementById('btnHorarios')
const diasContainer = document.getElementById('dias')
const dias = document.querySelectorAll('.dia-semana') // corrigido
const prev = document.getElementById('prevDia') // corrigido
const next = document.getElementById('nextDia') // corrigido
let currentDia = 0;

function showDia(index) {
    dias.forEach((dia, i) => dia.classList.toggle('active', i === index))
}

btnHorarios.addEventListener('click', () => {
    diasContainer.style.display = 'flex';
    showDia(currentDia);
});

prev.addEventListener('click', () => {
    currentDia = (currentDia - 1 + dias.length) % dias.length;
    showDia(currentDia);
});

next.addEventListener('click', () => {
    currentDia = (currentDia + 1) % dias.length;
    showDia(currentDia);

});
document.addEventListener('click', (e) => {
    if (!diasContainer.contains(e.target) && e.target !== btnHorarios) {
        diasContainer.style.display = 'none';
    }
});

// ------------------------------------------------------ //

// CARDS INTERACTION. //
// Seleciona o container que contém todos os cards
document.addEventListener('DOMContentLoaded', () => {

    const containerCards = document.querySelector('.cardsContainer');

    let speed = 0.6; // velocidade constante
    let animationId;

    // duplica os cards para criar loop infinito
    containerCards.innerHTML += containerCards.innerHTML;

    function slide() {
        containerCards.scrollLeft += speed;

        // quando chegar na metade, volta para o início
        if (containerCards.scrollLeft >= containerCards.scrollWidth / 2) {
            containerCards.scrollLeft = 0;
        }

        animationId = requestAnimationFrame(slide);
    }

    // inicia automaticamente
    slide();



});
// JS mobile toggle para telas <= 800px
(() => {
    const mobileWidth = 800;

    function enableMobileToggles() {
        const toggles = document.querySelectorAll('[data-toggle]');
        toggles.forEach(toggle => {
            toggle.addEventListener('click', () => {
                // Alterna a classe 'active' no próprio elemento
                toggle.classList.toggle('active');
            });
        });
    }

    // Inicializa se a tela estiver no tamanho mobile
    function init() {
        if (window.innerWidth <= mobileWidth) {
            enableMobileToggles();
        }
    }

    // Dispara no carregamento
    window.addEventListener('load', init);

    // Dispara ao redimensionar a tela, evitando múltiplos listeners
    window.addEventListener('resize', () => {
        // Só adiciona novamente se passar de 800px para <=800px
        if (window.innerWidth <= mobileWidth && !document.body.classList.contains('mobile-init')) {
            enableMobileToggles();
            document.body.classList.add('mobile-init'); // evita múltiplos listeners
        } else if (window.innerWidth > mobileWidth && document.body.classList.contains('mobile-init')) {
            // Remove a classe 'active' de todos os toggles ao sair do mobile
            document.querySelectorAll('[data-toggle].active').forEach(el => el.classList.remove('active'));
            document.body.classList.remove('mobile-init');
        }
    });
})();
