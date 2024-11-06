let playerState = "run";
const dropdown = document.getElementById("animations")
dropdown.addEventListener("change", function (e) {
    playerState = e.target.value;
});

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const canvasWidth = canvas.width = 600;
const canvasHeight = canvas.height = 600;

const playerImage = new Image();
playerImage.src = "cute-dog.png";

const spriteWidth = 575; // (6876 / 12)
const spriteHeight = 523; // (5230 / 10)
let gameFrame = 0;
let staggerFrames = 5;
const dogAnimation = [];
const animationStates = [
    {
        name: "idle",
        frames: 7,
    },
    {
        name: "jump",
        frames: 7,
    },
    {
        name: "fall",
        frames: 7,
    }, {
        name: "run",
        frames: 9,
    }, {
        name: "dizzy",
        frames: 11,
    }, {
        name: "sit",
        frames: 5,
    }, {
        name: "roll",
        frames: 7,
    }, {
        name: "bite",
        frames: 7,
    }, {
        name: "ko",
        frames: 12,
    }, {
        name: "getHit",
        frames: 4,
    }
];

animationStates.forEach((state, index) => {
    let frames = {
        loc: [],
    }
    for (let i = 0; i < state.frames; i++) {
        let positionX = i * spriteWidth;
        let positionY = index * spriteHeight;
        frames.loc.push({ x: positionX, y: positionY });
    }
    dogAnimation[state.name] = frames;
});
console.log(dogAnimation);

console.log(spriteHeight, spriteWidth);
function animate() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    // ctx.fillRect(50, 50, 100, 100)

    // let position = Math.floor(gameFrame / staggerFrames) % 6;
    // 6 because the image has 6 frames ~ wag tail has 6 frames 0123456
    // 0/5 = 0   --> math.floor --> 0  | 0 % 6 = 0
    // 1/5 = 0.2 --> math.floor --> 0  | 0 % 6 = 0
    // 2/5 = 0.4 --> math.floor --> 0  | 0 % 6 = 0
    // 3/5 = 0.6 --> math.floor --> 0  | 0 % 6 = 0
    // 4/5 = 0.8 --> math.floor --> 0  | 0 % 6 = 0
    // 5/5 = 1   --> math.floor --> 1  | 1 % 6 = 1
    // then using position ++
    // 0 % 6 = 0
    // 1 % 6 = 1
    // 2 % 6 = 2
    // 3 % 6 = 3
    // 4 % 6 = 4
    // 5 % 6 = 5
    // 6 % 6 = 0
    // 7 % 6 = 1
    // 8 % 6 = 2
    //...
    // so it cycles between 0 < 6
    // % - modulus
    let position = Math.floor(gameFrame / staggerFrames) % dogAnimation[playerState].loc.length;
    let frameX = dogAnimation[playerState].loc[position].x;
    let frameY = dogAnimation[playerState].loc[position].y;

    // s - source (image placement / cutting)
    // d - destination (canvas placement / draw the cropped out part)
    // w / h - width / height
    // x / y - positions
    // ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
    ctx.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);

    gameFrame++;
    requestAnimationFrame(animate);
}
animate();