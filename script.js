const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');

const tempoSpan = document.getElementById('tempo');
const recordeSpan = document.getElementById('recorde');

const gameOverText = document.querySelector('.game-over');
const restartButton = document.querySelector('.restart');

let jogoAtivo = true;
let tempo = 0;
let recorde = localStorage.getItem('recorde') || 0;
recordeSpan.textContent = recorde;



let cronometro = setInterval(() => {
    if(jogoAtivo){
    tempo++;
    tempoSpan.textContent = tempo;
    }
}, 900);


const jump = () => {
    mario.classList.add('jump');

    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
};

const loop = setInterval(() => {

    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    if (pipePosition <= 130 && pipePosition > 0 && marioPosition < 100 ) {

        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

       mario.src ='./img/game-over.png';
       mario.style.width ='70px';
       mario.style.marginLeft = '60px';

       gameOverText.style.display = 'block';
       restartButton.style.display = 'block';


       clearInterval(loop);
       jogoAtivo = false;
       clearInterval(cronometro);

       if( tempo > recorde) {
        localStorage.setItem('recorde', tempo);
        recordeSpan.textContent = tempo;
       }
    }
}, 10);

document.addEventListener('keydown', jump);
