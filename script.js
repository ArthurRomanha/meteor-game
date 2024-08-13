const ship = document.getElementById('ship');
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

let loopId;

let spriteSize = 30;

let xShip = canvas.width / 2 - spriteSize;
let yShip = canvas.height - spriteSize;

let shoot;
let widthShoot = 5;

let xShoot = xShip + spriteSize / 2 - widthShoot / 2;
let yShoot = yShip;
let shootExist = false;

const initSprites = () => {
    ctx.drawImage(
        ship, xShip, yShip, spriteSize, spriteSize
    );
}

const drawShoot = () => {
    if (shootExist == true) {
        ctx.fillStyle = "white";
        shoot = ctx.fillRect(xShoot, yShoot, 5, 15);
        yShoot -= 30;
    } else {
        yShoot = yShip;
        shootExist = true;
    }
}

const drawGrid = () => {
    ctx.lineWidth = 1
    ctx.strokeStyle = 'gray';

    for (let i = 0; i < canvas.width + 30; i += 30) {//linhas verticais
        ctx.beginPath();
        ctx.lineTo(i, 0)
        ctx.lineTo(i, canvas.height)
        ctx.stroke()

        ctx.beginPath();
        ctx.lineTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
    }
}


const game = () => {
    console.log(shoot);
    clearInterval(loopId);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    initSprites();
    if(yShoot>0){
        drawShoot();
    }else{
        shootExist=false;
    }
       

    drawGrid();

    loopId = setTimeout(() => {
        game();
    }, 100);
}
game();

document.addEventListener('keydown', function (tecla) {
    switch (tecla.keyCode) {
        case 39://right
            if (xShip < canvas.width - spriteSize) {
                xShip += 30;
            }
            break;
        case 37://left
            if (xShip > 0) { xShip -= 30; }
            break;
        case 38://up
            if (yShip > 0) { yShip -= 30; }
            break;
        case 40://down
            if (yShip < canvas.height - spriteSize) { yShip += 30; }
            break;
        case 32:
            if (shootExist == false) {
                xShoot=xShoot = xShip + spriteSize / 2 - widthShoot / 2;;
                yShoot=yShip;
                shootExist = true;
                drawShoot()
            }
            break;
    }
});
