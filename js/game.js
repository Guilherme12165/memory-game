const grid = document.querySelector('.grid');

const characters = [
    'adesivo lâmpada acesa',
    'area verde do senac',
    'cabide',
    'coletor de medicamentos',
    'dispensador de cigaro',
    'esdacas ODS',
    'jardim pedagógico',
    'lixo especificos',
    'papa pilha',
    'placas informativas',
];
//  Função para criar elemento HTML
const createElement = (tag, className) => {
    // Criando um elemento HTMML
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let firstCard = '';
let secondCard = '';
const checkEndGame = () => {
    const disabledCads = document.querySelectorAll('.disabled-card');

    if (disabledCads.length === 20) {
        alert('Parabéns, você conseguiu!');
    }
}

const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');
    
    if (firstCharacter === secondCharacter) {

        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');
        firstCard = '';
        secondCard = '';

        checkEndGame();

    } else {
        setTimeout(() => {
           
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');

            firstCard = '';
            secondCard = '';

        }, 500);
    }

}

const revealCard = ({ target }) => {
   if (target.parentNode.className.includes('reveal-card')){
    return;
   }

   if (firstCard === ''){
    
    target.parentNode.classList.add('reveal-card');
    firstCard = target.parentNode;

   } else if (secondCard === '') {

       target.parentNode.classList.add('reveal-card');
       secondCard = target.parentNode;

       checkCards();
   }
   
}

// Função para ciar um cartão
const createCard = (character) => {

    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url('../imagens/${character}.svg')`;
    
    // Adiciona o personagem na frente
    card.appendChild(front); 
    // Texto padrão para a parte de trás
    card.appendChild(back);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-character', character);   

    return card;
}

const loadGame = () => {

    // Função para carregar o jogo
    grid.innerHTML = '';
    
    const duplicateCharacters = [ ...characters, ...characters];
    
    const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

    shuffledArray.forEach((character) => {
        //  Passando o personagem para afução createCard
        const card = createCard(character);
        grid.appendChild(card);
     });
     
}

loadGame();
