let cvs = document.getElementById("canvas")
let ctx = cvs.getContext("2d")

let gap = 90;
let score = 0;

//img
let bird = new Image();
let bg = new Image();
let fg = new Image();
let pipeUp = new Image();
let pipeBottom = new Image();

bird.src = "img/bird.png";
bg.src = "img/bg.png";
fg.src = "img/fg.png";
pipeUp.src = "img/pipeUp.png";
pipeBottom.src = "img/pipeBottom.png";

//audio
let fly= new Audio();
let score_audio=new Audio();

fly.src="audio/fly.mp3";
score_audio.src="audio/score.mp3";

//При нажатии на клавишу
document.addEventListener("keydown", moveUp);

function moveUp() {
    yPos -= 25;
    fly.play();
}

//Создание блоков
let pipe = [];
pipe[0] = {
    x: cvs.width,
    y: 0
}//создание нулевого объекта, создается через фигурные скобки

//Позиция птички

let xPos = 10;
let yPos = 150;
let grav = 1.5;

function draw() {
    ctx.drawImage(bg, 0, 0);

    for (let i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

        pipe[i].x--; //Чтобы блоки двигались, берем массив pipe и вычитаем1

        if (pipe[i].x === 125) { //Чтобы появлялись новые картинки
            pipe.push({
                x: cvs.width,
                y: Math.floor(Math.random() * pipeUp.height) -
                    pipeUp.height});
        }


        //Проверка условия столкновения птички c препятствием//при столкновении вызывается перезагрузка игры

        if (xPos + bird.width >= pipe[i].x
            && xPos <= pipe[i].x + pipeUp.width
            && (yPos <= pipe[i].y + pipeUp.height
                || yPos + bird.height >= pipe[i].y + pipeUp.height +
                gap) || yPos+bird.height>=cvs.height - fg.height) {
                    location.reload();
            }
//для счета очков
        if (pipe[i].x===5){
            score++;
            score_audio.play();
        }

    }


    ctx.drawImage(fg, 0, cvs.height - fg.height);
    ctx.drawImage(bird, xPos, yPos);
    yPos += grav


//Отрисовка счета
    ctx.fillStyle = "#000";
    ctx.font = "24px Verdana";
    ctx.fillText("Счёт: " + score, 10, cvs.height - 20);


    requestAnimationFrame(draw);


}

pipeBottom.onload = draw;
