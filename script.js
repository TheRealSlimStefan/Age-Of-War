//bullets

let keys = {};
let bullets = [];
let bulletSpeed = 10;

let app = new PIXI.Application({ width: 800, height: 600 });
let player = PIXI.Sprite.from("images/sample.png");
let div = document.getElementById("keys");

document.querySelector("#gameDiv").appendChild(app.view);
player.anchor.set(0.5);
player.x = app.view.width / 2;
player.y = app.view.height / 2;

app.stage.addChild(player);

app.stage.interactive = true;
document.querySelector("#gameDiv").addEventListener("pointerdown", fireBullet);

function fireBullet(e) {
    console.log("Fire!");

    let bullet = createBullet();
    bullets.push(bullet);
}

function createBullet() {
    let bullet = new PIXI.Sprite.from("images/bullet.png");
    bullet.anchor.set(0.5);
    bullet.x = player.x;
    bullet.y = player.y;
    bullet.speed = bulletSpeed;
    app.stage.addChild(bullet);

    return bullet;
}

app.ticker.add(gameLoop);

function updateBullets() {
    for (let i = 0; i < bullets.length; i++) {
        bullets[i].position.y -= bulletSpeed;
        if (bullets[i].position.y < 0) {
            app.stage.removeChild(bullets[i]);
            bullets.splice(i, 1);
        }
    }
}

function handleKeyDown(e) {
    console.log(e.keyCode);
    keys[e.keyCode] = true;
}

function handleKeyUp(e) {
    console.log(e.keyCode);
    keys[e.keyCode] = false;
}

function gameLoop(delta) {
    if (keys["39"]) {
        player.x += 5;
    }

    if (keys["37"]) {
        player.x -= 5;
    }

    if (keys["38"]) {
        player.y -= 5;
    }

    if (keys["40"]) {
        player.y += 5;
    }

    updateBullets(delta);
}

window.addEventListener("keydown", handleKeyDown);
window.addEventListener("keyup", handleKeyUp);

//preloader

// let app = new PIXI.Application({ width: 800, height: 600 });
// document.body.appendChild(app.view);
// let player;

// app.loader.baseUrl = "images";
// app.loader.add("player", "sample.png");
// app.loader.onProgress.add(showProgress);
// app.loader.onComplete.add(doneLoading);
// app.loader.onError.add(reportError);
// app.loader.load();

// function showProgress(e) {
//     console.log(e.progress);
// }

// function doneLoading() {
//     console.log("DONE LOADING");
//     player = PIXI.Sprite.from(app.loader.resources.player.texture);
//     player.x = app.view.width / 2;
//     player.y = app.view.height / 2;
//     player.anchor.set(0.5);
//     app.stage.addChild(player);
// }

// function reportError(e) {
//     console.log("ERROR: " + e.message);
// }

//obsługa klawiszy i myszki
// let keys = {};

// let app = new PIXI.Application({ width: 1200, height: 800 });
// let player = PIXI.Sprite.from("images/sample.png");
// let div = document.getElementById("keys");

// document.body.appendChild(app.view);
// player.anchor.set(0.5);
// player.x = app.view.width / 2;
// player.y = app.view.height / 2;

// app.stage.addChild(player);

// app.stage.interactive = true;
// //app.stage.on("pointermove", movePlayer);

// app.ticker.add(gameLoop);

// function movePlayer(e) {
//     let position = e.data.global;
//     player.x = position.x;
//     player.y = position.y;
// }

// function handleKeyDown(e) {
//     console.log(e.keyCode);
//     keys[e.keyCode] = true;
// }

// function handleKeyUp(e) {
//     console.log(e.keyCode);
//     keys[e.keyCode] = false;
// }

// function gameLoop() {
//     div.innerHTML = JSON.stringify(keys);

//     if (keys["39"]) {
//         player.x += 5;
//     }

//     if (keys["37"]) {
//         player.x -= 5;
//     }

//     if (keys["38"]) {
//         player.y -= 5;
//     }

//     if (keys["40"]) {
//         player.y += 5;
//     }
// }

// window.addEventListener("keydown", handleKeyDown);
// window.addEventListener("keyup", handleKeyUp);
