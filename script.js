class Base {
    constructor(x, y) {
        console.log("Stworzyłeś obiekt Baza!");

        this.baseHealthPoints = 900;
        this.baseMaxHealthPoints = 1000;
        this.baseSize = 50;

        this.baseHealthBar = new HealthBar(
            x,
            y,
            this.baseHealthPoints,
            this.baseMaxHealthPoints
        );

        this.base = new PIXI.Sprite.from("images/baza.png");
        this.base.anchor.set(0.5);
        this.base.x = this.baseSize + x;
        this.base.y = y - this.baseSize;

        app.stage.addChild(this.base);
    }

    getHealthPoints() {
        return this.baseHealthPoints;
    }

    addDamage(amount) {
        console.log("Here I am!");
        this.baseHealthPoints -= amount;
        console.log(this.baseHealthPoints);
    }
}

class Soldier {
    constructor(x) {
        console.log("Stworzyłeś obiekt Soldier!");

        this.soldierWidth = 15;
        this.soldierHeight = 45;
        this.soldierHealthPoints = 100;
        this.soldierMaxHealthPoints = 100;
        this.damage = 25;

        let soldier = PIXI.Sprite.from("images/soldier.png");
        soldier.anchor.set(0.5);
        soldier.x = 120;
        soldier.y = app.view.height - 22.5;

        soldiers.push(soldier);

        app.stage.addChild(soldier);
    }

    damage() {
        return this.damage();
    }
}

class Button {
    constructor(x, y, width, height) {
        let button = new PIXI.Graphics();
        button.beginFill(0xffffff);
        button.drawRect(x, y, width, height);
        button.interactive = true;
        button.buttonMode = true;
        button.on("pointerdown", doPointerDown);
        app.stage.addChild(button);
    }
}

class HealthBar {
    constructor(x, y, actual, max) {
        console.log("Stworzyłeś obiekt HealthBar!");

        let healthBar = new PIXI.Graphics();
        healthBar.beginFill(0x00cc00);
        healthBar.drawRect(x + 10, y - 120, 80, 10);
        app.stage.addChild(healthBar);

        let healthBar2 = new PIXI.Graphics();
        healthBar2.beginFill(0x00ff00);
        healthBar2.drawRect(x + 10, y - 120, (actual / max) * 80, 10);
        app.stage.addChild(healthBar2);
    }
}

let app;
let soldiers = [];
let playerBase = {};
let enemyBase = {};

app = new PIXI.Application({
    width: 1000,
    height: 500,
    backgroundColor: 0x87ceeb,
});

document.querySelector("#game").appendChild(app.view);
app.stage.interactive = true;
app.ticker.add(gameLoop);

playerBase = { x: 0, y: app.view.height };
enemyBase = { x: app.view.width, y: app.view.height };

// playerBase = new PIXI.Sprite.from("images/baza.png");
// base.anchor.set(0.5);
// base.x = baseSize + x;
// base.y = y - baseSize;

app.stage.addChild(base);

let base1 = new Base(0, app.view.height);
let base2 = new Base(app.view.width - 100, app.view.height);
let button1 = new Button(0 + 50, 0 + 50, 50, 50);

function gameLoop() {
    moveSoldiers();
}

function moveSoldiers() {
    for (let i = 0; i < soldiers.length; i++) {
        if (soldiers[i].x >= app.view.width - 110) {
            soldiers[i].x = app.view.width - 110;
        } else soldiers[i].x += 5;
    }
}

function doPointerDown(e) {
    //console.log("doPointerDown");
    new Soldier();
}

//pointerEvents

// const NORMAL = 0xffffff;
// const OVER = 0x00ff00;
// const DOWN = 0xff0000;

// let app = new PIXI.Application({ width: 800, height: 600 });
// document.querySelector("#gameDiv").appendChild(app.view);

// let redRect = new PIXI.Graphics();
// redRect.beginFill(NORMAL);
// redRect.drawRect(app.view.width / 2 - 100, app.view.height / 2 - 100, 200, 200);
// redRect.interactive = true;
// redRect.buttonMode = true;
// redRect.on("pointerup", doPointerUp);
// redRect.on("pointerdown", doPointerDown);
// redRect.on("pointerover", doPointerOver);
// redRect.on("pointerout", doPointerOut);
// app.stage.addChild(redRect);

// function doPointerUp(e) {
//     console.log("doPointerUp");
//     this.tint = NORMAL;
// }

// function doPointerDown(e) {
//     console.log("doPointerDown");
//     this.tint = DOWN;
// }

// function doPointerOver(e) {
//     console.log("doPointerOver");
//     this.tint = OVER;
// }

// function doPointerOut(e) {
//     console.log("doPointerOut");
// }

//containers

// let app;
// let titleScreen;
// let mainScreen;
// let endScreen;

// app = new PIXI.Application({
//     width: 800,
//     height: 600,
//     backgroundColor: 0xaaaaaa,
// });
// document.body.appendChild(app.view);

// titleScreen = new PIXI.Container();
// mainScreen = new PIXI.Container();
// endScreen = new PIXI.Container();

// mainScreen.visible = false;
// endScreen.visible = false;

// app.stage.addChild(titleScreen);
// app.stage.addChild(mainScreen);
// app.stage.addChild(endScreen);

// let redRect = new PIXI.Graphics();
// redRect.beginFill(0xff0000);
// redRect.drawRect(0, 0, app.view.width, app.view.height);
// titleScreen.addChild(redRect);

// let greenRect = new PIXI.Graphics();
// greenRect.beginFill(0x00ff00);
// greenRect.drawRect(0, 0, app.view.width, app.view.height);
// mainScreen.addChild(greenRect);

// let blueRect = new PIXI.Graphics();
// blueRect.beginFill(0x0000ff);
// blueRect.drawRect(0, 0, app.view.width, app.view.height);
// endScreen.addChild(blueRect);

// window.addEventListener("keyup", switchContainer);

// function switchContainer(e) {
//     titleScreen.visible = false;
//     mainScreen.visible = true;
// }

//SpriteSheet animated movement

// let keys = {};

// let app = new PIXI.Application({ width: 800, height: 600 });
// let div = document.getElementById("keys");
// let playerSheet = {};
// let player;
// let speed = 0.5;
// document.body.appendChild(app.view);

// app.loader.add("player", "images/player.png");
// app.loader.load(doneLoading);

// function createPlayer() {
//     player = new PIXI.AnimatedSprite(playerSheet.standNorth);
//     player.anchor.set(0.5);
//     player.animationSpeed = 2;
//     player.loop = false;
//     player.x = app.view.width / 2;
//     player.y = app.view.height / 2;
//     app.stage.addChild(player);
//     player.play();
// }

// function createPlayerSheet() {
//     player = PIXI.BaseTexture.from(app.loader.resources["player"].url);
//     let w = 20;
//     let h = 26;
//     playerSheet["standNorth"] = [
//         new PIXI.Texture(player, new PIXI.Rectangle(1 * w, 0, w, h)),
//     ];
//     playerSheet["walkNorth"] = [
//         new PIXI.Texture(player, new PIXI.Rectangle(0 * w, 0, w, h)),
//         new PIXI.Texture(player, new PIXI.Rectangle(1 * w, 0, w, h)),
//         new PIXI.Texture(player, new PIXI.Rectangle(2 * w, 0, w, h)),
//     ];
// }

// function doneLoading(e) {
//     createPlayerSheet();
//     createPlayer();
//     app.ticker.add(gameLoop);
// }

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
//         if (!player.playing) {
//             player.textures = playerSheet.walkNorth;
//             player.play();
//         }
//         player.x += speed;
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

//collision detection

// let app = new PIXI.Application({ width: 800, height: 600 });
// let player = PIXI.Sprite.from("images/player.png");
// let enemy = PIXI.Sprite.from("images/enemy.png");
// let div = document.getElementById("keys");

// document.querySelector("#gameDiv").appendChild(app.view);
// player.anchor.set(0.5);
// player.x = 25;
// player.y = app.view.height / 2;
// app.stage.addChild(player);

// document.querySelector("#gameDiv").appendChild(app.view);
// enemy.anchor.set(0.5);
// enemy.x = app.view.width - 25;
// enemy.y = app.view.height / 2;
// app.stage.addChild(enemy);

// app.stage.interactive = true;
// app.stage.on("pointermove", movePlayer);

// function movePlayer(e) {
//     let position = e.data.global;
//     player.x = position.x;
//     player.y = position.y;

//     if (collisionDetection(player, enemy)) {
//         console.log("Collision detected!");
//     }
// }

// function collisionDetection(a, b) {
//     let aBox = a.getBounds();
//     let bBox = b.getBounds();

//     return (
//         aBox.x + aBox.width > bBox.x &&
//         aBox.x < bBox.x + bBox.width &&
//         aBox.y + aBox.height > bBox.y &&
//         bBox.y < bBox.y + bBox.height
//     );
// }

//bullets

// let keys = {};
// let bullets = [];
// let bulletSpeed = 10;

// let app = new PIXI.Application({ width: 800, height: 600 });
// let player = PIXI.Sprite.from("images/sample.png");
// let div = document.getElementById("keys");

// document.querySelector("#gameDiv").appendChild(app.view);
// player.anchor.set(0.5);
// player.x = app.view.width / 2;
// player.y = app.view.height / 2;

// app.stage.addChild(player);

// app.stage.interactive = true;
// document.querySelector("#gameDiv").addEventListener("pointerdown", fireBullet);

// function fireBullet(e) {
//     console.log("Fire!");

//     let bullet = createBullet();
//     bullets.push(bullet);
// }

// function createBullet() {
//     let bullet = new PIXI.Sprite.from("images/bullet.png");
//     bullet.anchor.set(0.5);
//     bullet.x = player.x;
//     bullet.y = player.y;
//     bullet.speed = bulletSpeed;
//     app.stage.addChild(bullet);

//     return bullet;
// }

// app.ticker.add(gameLoop);

// function updateBullets() {
//     for (let i = 0; i < bullets.length; i++) {
//         bullets[i].position.y -= bulletSpeed;
//         if (bullets[i].position.y < 0) {
//             app.stage.removeChild(bullets[i]);
//             bullets.splice(i, 1);
//         }
//     }
// }

// function handleKeyDown(e) {
//     console.log(e.keyCode);
//     keys[e.keyCode] = true;
// }

// function handleKeyUp(e) {
//     console.log(e.keyCode);
//     keys[e.keyCode] = false;
// }

// function gameLoop(delta) {
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

//     updateBullets(delta);
// }

// window.addEventListener("keydown", handleKeyDown);
// window.addEventListener("keyup", handleKeyUp);

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
