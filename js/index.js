const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

/// Вставляем бэкграунд
const background = new Image();
const bird = new Image();
const pipeUp = new Image();
const pipeBottom = new Image();

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
});

const pipes = [{
    x: canvas.width,
    y: 0,
}];

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
                birdY + bird.height >= pipe.y + gap + pipeBottom.height)) {
            location.reload();
        }
    })

    birdY = birdY >= canvas.height - 26 ? canvas.height / 2 : birdY + gravity;
}, 12);

