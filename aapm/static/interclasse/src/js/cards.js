document.addEventListener('DOMContentLoaded', () => {
    const descricoes = {
    futsal: `
        <div class=" text-gray-800 p-6 rounded-lg shadow-lg">
            <h3 class="text-2xl font-bold text-azul mb-3">⚽ Futsal – Velocidade, habilidade e muita emoção!</h3>
            <p class="leading-relaxed text-justify">Com lances rápidos, dribles desconcertantes e gols eletrizantes, o futsal é um dos esportes mais empolgantes do interclasses! Aqui, a quadra vira palco de pura intensidade, onde cada segundo conta e cada jogada pode decidir a partida. Reúna sua equipe, mostre entrosamento e venha sentir a emoção de jogar com raça e representar sua turma com orgulho!</p>
        </div>
        `,
    volei: `
        <div class=" text-gray-800 p-6 rounded-lg shadow-lg">
            <h3 class="text-2xl font-bold text-azul mb-3">🏐 Vôlei – Mais que um jogo, uma verdadeira conexão em quadra!</h3>
            <p class="leading-relaxed text-justify">O vôlei é pura emoção e estratégia! Cada ponto é conquistado com garra, trabalho em equipe e muita vibração. Nada como ver aquela bola levantada com perfeição e a torcida indo à loucura após um ataque certeiro! No interclasses, o vôlei promete grandes lances, defesas espetaculares e disputas acirradas. Se você curte adrenalina e quer fazer bonito com seu time, essa é a sua chance de brilhar!</p>
        </div>`,
        'tenis-de-mesa': `<div class=" text-gray-800 p-6 rounded-lg shadow-lg">
                <h3 class="text-2xl font-bold text-azul mb-3">🏓 Tênis de Mesa – Agilidade e precisão em cada jogada!</h3>
                <p class="leading-relaxed text-justify">Conhecido como o "xadrez em movimento", o tênis de mesa exige raciocínio rápido, reflexos afiados e uma boa dose de estratégia. Cada troca de bola é um duelo intenso, onde o foco e o controle fazem toda a diferença. No interclasses, essa modalidade vai desafiar os mais ágeis e concentrados. Se você tem mãos rápidas e mente veloz, a mesa está te esperando!</p>
        </div>`
    };
    const cards = document.querySelectorAll('.modalidade-card');
    const displayDescricao = document.getElementById('modalidade-descricao');
    
    if (cards.length > 0 && displayDescricao) {
        cards.forEach(card => {
            card.addEventListener('click', () => {
                cards.forEach(c => c.classList.remove('ring-4', 'ring-vermelhosenai'));
                card.classList.add('ring-4', 'ring-vermelhosenai');
                const modalidadeSelecionada = card.dataset.modalidade;
                displayDescricao.innerHTML = descricoes[modalidadeSelecionada];
                displayDescricao.classList.remove('hidden');
            });
        });
    }
})