const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

/// Вставляем бэкграунд
const background = new Image();
const bird = new Image();
const pipeUp = new Image();
const pipeBottom = new Image();

let score = 0;

background.src = './img/flappy_bird_bg.png';
bird.src = './img/flappy_bird_bird.png';
pipeUp.src = './img/flappy_bird_pipeUp.png';
pipeBottom.src = './img/flappy_bird_pipeBottom.png';

// Без события load картинка не загрузиться 
// background.addEventListener('load', () => {
//     context.drawImage(background, 0, 0,);
// });

// bird.addEventListener('load', () => {
//     context.drawImage(bird, 0, canvas.height / 2);
// });

const gravity = 1.5;
const gap = 85;

const birdX = 0;
let birdY = canvas.height / 2;
document.addEventListener('keydown', () => {
    birdY = birdY <= 26 ? 0 : birdY - 50;
    flySound()
});

const pipes = [{
    x: canvas.width,
    y: 0,
}];

//draw score
function drawScore() {
    context.beginPath()

    context.font = '40px Arial ';
    context.fillText(`${score}`, canvas.width /2 , 100);
    
    context.fillStyle = 'white'

    context.closePath();
}

setInterval(() => {
    context.drawImage(background, 0, 0,);
    context.drawImage(bird, 0, birdY);

    

    pipes.forEach(pipe => {
        context.drawImage(pipeUp, pipe.x, pipe.y);
        context.drawImage(pipeBottom, pipe.x, pipe.y + gap + pipeBottom.height);

        pipe.x--;

        if (pipe.x === 125) {
            pipes.push({
                x: canvas.width,
                y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            })
        }

        if (
            birdX + bird.width >= pipe.x &&
            birdX <= pipe.x + pipeUp.width &&
            (birdY <= pipe.y + pipeUp.height ||
            birdY + bird.height >= pipe.y + gap + pipeBottom.height))
        {
            location.reload();
            score = 0;
            return
        }

        if (
            birdX === pipe.x + pipeUp.width
        ) {
            score++;
            pointSound()
        }

        

    })



    birdY = birdY >= canvas.height - 26 ? canvas.height / 2  : birdY + gravity;

    drawScore()
}, 12);


function pointSound() {
    const myAudio = new Audio()
    myAudio.src = '/audio/files/point.mp3';
    myAudio.play()
}

function flySound() {
    const myAudio = new Audio()
    myAudio.src = '/audio/files/fly.mp3';
    myAudio.play()
}

