class Soldier {
    constructor(who) {
        let soldier;

        if (who === "player") {
            soldier = new PIXI.AnimatedSprite(playerSheet.soldierMove);
            soldier.anchor.set(0.5);
            soldier.animationSpeed = 0.3;
            soldier.loop = true;
            soldier.x = 50;
            soldier.y = app.view.height - 17;
            soldier.play();
            app.stage.addChild(soldier);

            playerSoldiers.push({
                type: "normal",
                sprite: soldier,
                attack: this.attack,
                attacking: false,
                healthPoints: 30,
                health: 30,
                soldierSize: 32,
            });
        } else if (who === "enemy") {
            soldier = new PIXI.AnimatedSprite(enemySheet.soldierMove);
            soldier.anchor.set(0.5);
            soldier.animationSpeed = 0.4;
            soldier.loop = true;
            soldier.x = app.view.width - 50;
            soldier.y = app.view.height - 20;
            soldier.play();
            app.stage.addChild(soldier);
            enemySoldiers.push({
                sprite: soldier,
                attack: this.attack,
                attacking: false,
                healthPoints: 50,
                health: 50,
                soldierSize: 32,
            });
        }

        app.stage.addChild(soldier);
    }

    attack(object) {
        let randomDamage = Math.floor(Math.random() * (20 - 10)) + 10;
        if (object.healthPoints > 0) object.healthPoints -= randomDamage;
    }
}

class StrongSoldier {
    constructor(who) {
        let soldier;

        if (who === "player") {
            soldier = new PIXI.AnimatedSprite(playerSheet.strongSoldierMove);
            soldier.anchor.set(0.5);
            soldier.animationSpeed = 0.3;
            soldier.loop = true;
            soldier.x = 50;
            soldier.y = app.view.height - 33;
            soldier.play();
            app.stage.addChild(soldier);

            playerSoldiers.push({
                type: "strong",
                sprite: soldier,
                attack: this.attack,
                attacking: false,
                healthPoints: 30,
                health: 30,
                soldierSize: 64,
            });
        } else if (who === "enemy") {
            soldier = new PIXI.AnimatedSprite(enemySheet.strongSoldierMove);
            soldier.anchor.set(0.5);
            soldier.animationSpeed = 0.4;
            soldier.loop = true;
            soldier.x = app.view.width - 50;
            soldier.y = app.view.height - 20;
            soldier.play();
            app.stage.addChild(soldier);
            enemySoldiers.push({
                sprite: soldier,
                attack: this.attack,
                attacking: false,
                healthPoints: 50,
                health: 50,
                soldierSize: 48,
            });
        }

        app.stage.addChild(soldier);
    }

    attack(object) {
        let randomDamage = Math.floor(Math.random() * (50 - 25)) + 25;
        if (object.healthPoints > 0) object.healthPoints -= randomDamage;
    }
}

let app;
let playerSoldiers = [];
let enemySoldiers = [];
let playerBase = {};
let enemyBase = {};
let playerGold = 1000;
let enemyGold = 1000;
let playerSoldierCost = 10;
let playerStrongSoldierCost = 10;
let enemySoldierCost = 10;
let enemyStrongSoldierCost = 10;
let goldInfo;
let playerSheet = {};
let enemySheet = {};
let background;
let computerMakesMove = true;

let song = document.getElementById("mySong");

app = new PIXI.Application({
    width: 1000,
    height: 500,
});

app.loader.add("playerSoldierMove", "images/playerSoldierMove.png");
app.loader.add("playerSoldierAttack", "images/playerSoldierAttack.png");
app.loader.add("playerSoldierIdle", "images/playerSoldierIdle.png");

app.loader.add("playerStrongSoldierMove", "images/playerStrongSoldierMove.png");
app.loader.add(
    "playerStrongSoldierAttack",
    "images/playerStrongSoldierAttack.png"
);
app.loader.add("playerStrongSoldierIdle", "images/playerStrongSoldierIdle.png");

app.loader.add("enemyStrongSoldierMove", "images/enemyStrongSoldierMove.png");
app.loader.add(
    "enemyStrongSoldierAttack",
    "images/enemyStrongSoldierAttack.png"
);
app.loader.add("enemyStrongSoldierIdle", "images/enemyStrongSoldierIdle.png");

app.loader.add("enemySoldierMove", "images/enemySoldierMove.png");
app.loader.add("enemySoldierAttack", "images/enemySoldierAttack.png");
app.loader.add("enemySoldierIdle", "images/enemySoldierIdle.png");

app.loader.add("background", "images/background.png");
app.loader.load(doneLoading);

background = PIXI.Sprite.from(app.loader.resources["background"].url);
background.anchor.set(0.5);
background.x = app.view.width / 2;
background.y = app.view.height / 2;
app.stage.addChild(background);

document.querySelector("#game").appendChild(app.view);
app.stage.interactive = true;

document.querySelector("#game").onclick = function () {
    // song.play();
};

playerBase = {
    x: 0,
    y: app.view.height,
    baseSize: 100,
    healthPoints: 100,
    health: 100,
};

enemyBase = {
    x: app.view.width,
    y: app.view.height,
    baseSize: 100,
    healthPoints: 100,
    health: 100,
};

function doneLoading() {
    createPlayerSheet();
    createEnemySheet();
    createPlayerBase();
    createEnemyBase();
    showGold();
    createButton(50, 50, 50, 50, createPlayerSoldier);
    createButton(110, 50, 50, 50, createPlayerStrongSoldier);
    createButton(170, 50, 50, 50, createEnemySoldier);
    createButton(230, 50, 50, 50, createEnemyStrongSoldier);
    createBasesHealthBars(playerBase, enemyBase);
    app.ticker.add(gameLoop);
}

function artificialIntelligence() {
    // let random = Math.floor(Math.random() * (10000 - 1000)) + 1000;
    // let closeToBase = false;
    // for (let i = 0; i < playerSoldiers.length; i++) {
    //     if (playerSoldiers[i].sprite.x >= (app.view.width * 4) / 5) {
    //         closeToBase = true;
    //         console.log("Bardzo blisko!");
    //     }
    // }
    // if (computerMakesMove || closeToBase) {
    //     computerMakesMove = false;
    //     setTimeout(() => {
    //         if (enemyGold >= enemySoldierCost) createEnemySoldier();
    //         computerMakesMove = true;
    //         closeToBase = false;
    //     }, random);
    // }
}

function gameLoop() {
    for (let i = 0; i < playerSoldiers.length; i++) {
        if (playerSoldiers[i].healthPoints <= 0) {
            app.stage.removeChild(playerSoldiers[i].healthBar);
            app.stage.removeChild(playerSoldiers[i].sprite);
            playerSoldiers.splice(i, 1);
            enemyGold += 20;
            console.log(enemyGold);
        }
    }

    for (let i = 0; i < enemySoldiers.length; i++) {
        if (enemySoldiers[i].healthPoints <= 0) {
            app.stage.removeChild(enemySoldiers[i].healthBar);
            app.stage.removeChild(enemySoldiers[i].sprite);
            enemySoldiers.splice(i, 1);
            playerGold += 20;
        }
    }

    artificialIntelligence();
    movePlayerSoldiers();
    moveEnemySoldiers();

    for (let i = 0; i < playerSoldiers.length; i++) {
        createSoldierHealthBar(playerSoldiers[i]);
    }

    for (let i = 0; i < enemySoldiers.length; i++) {
        createSoldierHealthBar(enemySoldiers[i]);
    }

    createBasesHealthBars(playerBase, enemyBase);

    showGold();
    isGameOver();
}

function isGameOver() {
    if (playerBase.healthPoints <= 0) {
        //cleanBoard();
        drawEndScreen("Enemy wygrywa!");
    }
    if (enemyBase.healthPoints <= 0) {
        //cleanBoard();
        drawEndScreen("Player wygrywa!");
    }
}

function showGold() {
    app.stage.removeChild(goldInfo);
    goldInfo = new PIXI.Text("Złoto: " + playerGold);
    goldInfo.x = app.view.width / 2;
    goldInfo.y = 20;
    goldInfo.anchor.set(0.5);
    goldInfo.style = new PIXI.TextStyle({
        fill: 0xffffff,
        fontSize: 16,
    });
    app.stage.addChild(goldInfo);
}

// function cleanBoard() {
//     for (let i = 0; i < playerSoldiers.length; i++) {
//         app.stage.removeChild(playerSoldiers[i].healthBar);
//         app.stage.removeChild(playerSoldiers[i].sprite);
//         playerSoldiers.splice(i, 1);
//     }

//     for (let i = 0; i < enemySoldiers.length; i++) {
//         app.stage.removeChild(enemySoldiers[i].healthBar);
//         app.stage.removeChild(enemySoldiers[i].sprite);
//         enemySoldiers.splice(i, 1);
//     }

//     app.stage.removeChild(playerBase.playerBaseImage);
// }

function drawEndScreen(text) {
    let endScreen = new PIXI.Graphics();
    endScreen.beginFill(0x000000);
    endScreen.drawRect(0, 0, app.stage.width, app.stage.height);
    app.stage.addChild(endScreen);

    endText = new PIXI.Text(text);
    endText.x = app.view.width / 2;
    endText.y = app.view.height / 2;
    endText.anchor.set(0.5);
    endText.style = new PIXI.TextStyle({
        fill: 0xffffff,
        fontSize: 40,
    });
    app.stage.addChild(endText);
}

function createPlayerBase() {
    playerBase.playerBaseImage = new PIXI.Sprite.from("images/playerBase.png");
    playerBase.playerBaseImage.anchor.set(0.5);
    playerBase.playerBaseImage.x = playerBase.x + playerBase.baseSize / 2;
    playerBase.playerBaseImage.y = playerBase.y - playerBase.baseSize / 2;
    app.stage.addChild(playerBase.playerBaseImage);
}

function createEnemyBase() {
    enemyBaseImage = new PIXI.Sprite.from("images/enemyBase.png");
    enemyBaseImage.anchor.set(0.5);
    enemyBaseImage.x = enemyBase.x - enemyBase.baseSize / 2;
    enemyBaseImage.y = enemyBase.y - enemyBase.baseSize / 2;
    app.stage.addChild(enemyBaseImage);
}

function createButton(x, y, width, height, functionality) {
    let button = new PIXI.Graphics();
    button.beginFill(0xffffff);
    button.drawRect(x, y, width, height);
    button.interactive = true;
    button.buttonMode = true;
    button.on("pointerdown", functionality);
    app.stage.addChild(button);
}

function createSoldierHealthBar(player) {
    app.stage.removeChild(player.healthBar);

    player.healthBar = new PIXI.Graphics();

    player.healthBar.beginFill(0xff0000);
    player.healthBar.drawRect(player.sprite.x - 5, player.sprite.y - 24, 10, 5);
    app.stage.addChild(player.healthBar);

    player.healthBar.beginFill(0x00ff00);
    player.healthBar.drawRect(
        player.sprite.x - 5,
        player.sprite.y - 24,
        (player.healthPoints / player.health) * 10,
        5
    );
    app.stage.addChild(player.healthBar);
}

function createBasesHealthBars(playerBase, enemyBase) {
    let healthBar = new PIXI.Graphics();

    healthBar.beginFill(0xff0000);
    healthBar.drawRect(
        playerBase.x + 10,
        playerBase.y - playerBase.baseSize - 20,
        80,
        10
    );
    app.stage.addChild(healthBar);

    healthBar.beginFill(0x00ff00);
    healthBar.drawRect(
        playerBase.x + 10,
        playerBase.y - playerBase.baseSize - 20,
        (playerBase.healthPoints / playerBase.health) * 80,
        10
    );
    app.stage.addChild(healthBar);

    healthBar.beginFill(0xff0000);
    healthBar.drawRect(
        enemyBase.x - enemyBase.baseSize + 10,
        enemyBase.y - enemyBase.baseSize - 20,
        80,
        10
    );
    app.stage.addChild(healthBar);

    healthBar.beginFill(0x00ff00);
    healthBar.drawRect(
        enemyBase.x - enemyBase.baseSize + 10,
        enemyBase.y - enemyBase.baseSize - 20,
        (enemyBase.healthPoints / enemyBase.health) * 80,
        10
    );
    app.stage.addChild(healthBar);
}

function movePlayerSoldiers() {
    for (let i = 0; i < playerSoldiers.length; i++) {
        //detecting collision with enemy base
        let collisionWithEnemyBase =
            playerSoldiers[i].sprite.x >=
            app.view.width - enemyBase.baseSize - 10;

        //detecting collision with another player soldier
        let collisionWithAnotherPlayerSoldier =
            i > 0 &&
            playerSoldiers[i].sprite.x +
                playerSoldiers[i].soldierSize / 2 +
                6 >=
                playerSoldiers[i - 1].sprite.x;

        //detecting collision with some enemy soldier
        let collisionWithEnemySoldier = false;
        for (let j = 0; j < enemySoldiers.length; j++) {
            if (playerSoldiers[i].sprite.x + 20 == enemySoldiers[j].sprite.x)
                collisionWithEnemySoldier = { bool: true, which: j };
        }

        if (
            !collisionWithEnemyBase &&
            !collisionWithAnotherPlayerSoldier &&
            !collisionWithEnemySoldier.bool
        ) {
            playerSoldiers[i].sprite.x += 2;
            if (!playerSoldiers[i].sprite.playing) {
                playerSoldiers[i].sprite.textures = playerSheet.soldierMove;
                playerSoldiers[i].sprite.animationSpeed = 0.3;
                playerSoldiers[i].sprite.play();
            }
        } else if (collisionWithEnemyBase && !playerSoldiers[i].attacking) {
            playerSoldiers[i].attacking = true;
            playerSoldiers[i].sprite.textures = playerSheet.soldierAttack;
            playerSoldiers[i].sprite.animationSpeed = 0.1;
            playerSoldiers[i].sprite.play();
            setTimeout(() => {
                playerSoldiers[i].attack(enemyBase);
                playerSoldiers[i].attacking = false;
                playerSoldiers[i].sprite.stop();
            }, 1000);
        } else if (
            collisionWithEnemySoldier.bool &&
            !playerSoldiers[i].attacking
        ) {
            playerSoldiers[i].attacking = true;
            playerSoldiers[i].sprite.textures = playerSheet.soldierAttack;
            playerSoldiers[i].sprite.animationSpeed = 0.1;
            playerSoldiers[i].sprite.play();
            setTimeout(() => {
                playerSoldiers[i].attack(
                    enemySoldiers[collisionWithEnemySoldier.which]
                );
                playerSoldiers[i].attacking = false;
                playerSoldiers[i].sprite.stop();
            }, 1000);
        } else if (collisionWithAnotherPlayerSoldier) {
            playerSoldiers[i].sprite.textures = playerSheet.soldierIdle;
            playerSoldiers[i].sprite.animationSpeed = 1;
            playerSoldiers[i].sprite.play();
        }
    }
}

function moveEnemySoldiers() {
    for (let i = 0; i < enemySoldiers.length; i++) {
        //detecting collision with player base
        let collisionWithPlayerBase =
            enemySoldiers[i].sprite.x <= playerBase.baseSize + 16;

        //detecting collision with another enemy soldier
        let collisionWithAnotherEnemySoldier =
            i > 0 &&
            enemySoldiers[i].sprite.x - enemySoldiers[i].soldierSize / 2 - 10 <=
                enemySoldiers[i - 1].sprite.x;

        //detecting collision with some player soldier
        let collisionWithPlayerSoldier = false;
        for (let j = 0; j < playerSoldiers.length; j++) {
            if (enemySoldiers[i].sprite.x - 20 == playerSoldiers[j].sprite.x)
                collisionWithPlayerSoldier = { bool: true, which: j };
        }

        if (
            !collisionWithPlayerBase &&
            !collisionWithAnotherEnemySoldier &&
            !collisionWithPlayerSoldier.bool
        ) {
            enemySoldiers[i].sprite.x -= 2;
            if (!enemySoldiers[i].sprite.playing) {
                enemySoldiers[i].sprite.textures = enemySheet.soldierMove;
                enemySoldiers[i].sprite.animationSpeed = 0.4;
                enemySoldiers[i].sprite.play();
            }
        } else if (collisionWithPlayerBase && !enemySoldiers[i].attacking) {
            enemySoldiers[i].attacking = true;
            enemySoldiers[i].sprite.textures = enemySheet.soldierAttack;
            enemySoldiers[i].sprite.animationSpeed = 0.1;
            enemySoldiers[i].sprite.play();
            setTimeout(() => {
                enemySoldiers[i].attack(playerBase);
                enemySoldiers[i].attacking = false;
                enemySoldiers[i].sprite.stop();
            }, 1005);
        } else if (
            collisionWithPlayerSoldier.bool &&
            !enemySoldiers[i].attacking
        ) {
            enemySoldiers[i].attacking = true;
            enemySoldiers[i].sprite.textures = enemySheet.soldierAttack;
            enemySoldiers[i].sprite.animationSpeed = 0.1;
            enemySoldiers[i].sprite.play();
            setTimeout(() => {
                enemySoldiers[i].attack(
                    playerSoldiers[collisionWithPlayerSoldier.which]
                );
                enemySoldiers[i].attacking = false;
                enemySoldiers[i].sprite.stop();
            }, 1005);
        } else if (collisionWithAnotherEnemySoldier) {
            enemySoldiers[i].sprite.textures = enemySheet.soldierIdle;
            enemySoldiers[i].sprite.animationSpeed = 1;
            enemySoldiers[i].sprite.play();
        }
    }
}

function createPlayerSoldier() {
    if (playerGold >= playerSoldierCost) {
        new Soldier("player");
        playerGold -= playerSoldierCost;
    }
}

function createPlayerStrongSoldier() {
    if (playerGold >= playerStrongSoldierCost) {
        new StrongSoldier("player");
        playerGold -= playerStrongSoldierCost;
    }
}

function createEnemySoldier() {
    if (enemyGold >= enemySoldierCost) {
        new Soldier("enemy");
        enemyGold -= enemySoldierCost;
    }
}

function createEnemyStrongSoldier() {
    if (enemyGold >= enemyStrongSoldierCost) {
        new StrongSoldier("enemy");
        enemyGold -= enemyStrongSoldierCost;
    }
}

function createPlayerSheet() {
    let sheet = new PIXI.BaseTexture.from(
        app.loader.resources["playerSoldierMove"].url
    );
    let w = 32;
    let h = 32;
    playerSheet["soldierMove"] = [
        new PIXI.Texture(sheet, new PIXI.Rectangle(0 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(1 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(2 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(3 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(4 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(5 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(6 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(7 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(8 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(9 * w, 0, w, h)),
    ];

    sheet = new PIXI.BaseTexture.from(
        app.loader.resources["playerSoldierAttack"].url
    );
    playerSheet["soldierAttack"] = [
        new PIXI.Texture(sheet, new PIXI.Rectangle(0 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(1 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(2 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(3 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(4 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(5 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(6 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(7 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(8 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(9 * w, 0, w, h)),
    ];

    sheet = new PIXI.BaseTexture.from(
        app.loader.resources["playerSoldierIdle"].url
    );
    playerSheet["soldierIdle"] = [
        new PIXI.Texture(sheet, new PIXI.Rectangle(0 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(1 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(2 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(3 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(4 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(5 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(6 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(7 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(8 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(9 * w, 0, w, h)),
    ];

    sheet = new PIXI.BaseTexture.from(
        app.loader.resources["playerStrongSoldierMove"].url
    );

    w = 64;
    h = 64;
    playerSheet["strongSoldierMove"] = [
        new PIXI.Texture(sheet, new PIXI.Rectangle(0 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(1 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(2 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(3 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(4 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(5 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(6 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(7 * w, 0, w, h)),
    ];

    sheet = new PIXI.BaseTexture.from(
        app.loader.resources["playerStrongSoldierAttack"].url
    );

    w = 64;
    h = 64;
    playerSheet["strongSoldierAttack"] = [
        new PIXI.Texture(sheet, new PIXI.Rectangle(0 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(1 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(2 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(3 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(4 * w, 0, w, h)),
    ];

    sheet = new PIXI.BaseTexture.from(
        app.loader.resources["playerStrongSoldierIdle"].url
    );

    w = 64;
    h = 64;
    playerSheet["strongSoldierIdle"] = [
        new PIXI.Texture(sheet, new PIXI.Rectangle(0 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(1 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(2 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(3 * w, 0, w, h)),
    ];
}

function createEnemySheet() {
    let w = 32;
    let h = 32;
    let sheet = new PIXI.BaseTexture.from(
        app.loader.resources["enemySoldierMove"].url
    );

    enemySheet["soldierMove"] = [
        new PIXI.Texture(sheet, new PIXI.Rectangle(0 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(1 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(2 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(3 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(4 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(5 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(6 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(7 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(8 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(9 * w, 0, w, h)),
    ];

    sheet = new PIXI.BaseTexture.from(
        app.loader.resources["enemySoldierAttack"].url
    );
    enemySheet["soldierAttack"] = [
        new PIXI.Texture(sheet, new PIXI.Rectangle(0 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(1 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(2 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(3 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(4 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(5 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(6 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(7 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(8 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(9 * w, 0, w, h)),
    ];

    sheet = new PIXI.BaseTexture.from(
        app.loader.resources["enemySoldierIdle"].url
    );
    enemySheet["soldierIdle"] = [
        new PIXI.Texture(sheet, new PIXI.Rectangle(0 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(1 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(2 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(3 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(4 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(5 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(6 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(7 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(8 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(9 * w, 0, w, h)),
    ];

    w = 48;
    h = 38;
    sheet = new PIXI.BaseTexture.from(
        app.loader.resources["enemyStrongSoldierMove"].url
    );

    enemySheet["strongSoldierMove"] = [
        new PIXI.Texture(sheet, new PIXI.Rectangle(0 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(1 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(2 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(3 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(4 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(5 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(6 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(7 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(8 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(9 * w, 0, w, h)),
    ];

    sheet = new PIXI.BaseTexture.from(
        app.loader.resources["enemyStrongSoldierAttack"].url
    );
    enemySheet["strongSoldierAttack"] = [
        new PIXI.Texture(sheet, new PIXI.Rectangle(0 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(1 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(2 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(3 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(4 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(5 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(6 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(7 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(8 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(9 * w, 0, w, h)),
    ];

    sheet = new PIXI.BaseTexture.from(
        app.loader.resources["enemyStrongSoldierIdle"].url
    );
    enemySheet["strongSoldierIdle"] = [
        new PIXI.Texture(sheet, new PIXI.Rectangle(0 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(1 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(2 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(3 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(4 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(5 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(6 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(7 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(8 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(9 * w, 0, w, h)),
    ];
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
