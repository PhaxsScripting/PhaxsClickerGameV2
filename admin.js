const SECRET_CODE = "67";
let adminUnlocked = false;
let clickMultiplier = 1;
let intervals = [];

document.addEventListener("keydown", function(e) {
    if (e.key === "`") {
        const panel = document.getElementById("adminPanel");
        panel.style.display =
            panel.style.display === "block" ? "none" : "block";
    }
});

function getGame() {
    return window.reactClicker || null;
}

function resetAll() {
    const game = getGame();
    if (!game) return;

    game.setState({
        clicks: 0,
        upgrades: game.state.upgrades.map(() => 0)
    });

    intervals.forEach(i => clearInterval(i));
    intervals = [];
    alert("Game Reset");
}

function unlockAdmin() {
    const input = document.getElementById("adminCodeInput").value;
    if (input === SECRET_CODE) {
        adminUnlocked = true;
        document.getElementById("adminControls").style.display = "block";
        alert("Admin Unlocked");
    }
}

const modList = [

    // Economy Mods
    () => modifyClicks(1000000),
    () => multiplyClicks(5),
    () => divideClicks(2),
    () => randomizeClicks(),
    () => bankrupt(),
    () => gamble(),
    () => drainOverTime(),
    () => explodeClicks(),
    () => reverseClicks(),
    () => freezeClicks(),
    () => chaoticMoney(),
    () => massiveSpike(),
    () => slowDecay(),
    () => fastDecay(),
    () => tripleRandom(),
    () => halveRandom(),
    () => percentageBoost(250),
    () => percentageBoost(-50),
    () => prestigeBlast(),
    () => nanoBoost(),

    // Upgrade Mods
    () => maxUpgrades(),
    () => wipeUpgrades(),
    () => randomizeUpgrades(),
    () => duplicateUpgrades(),
    () => corruptUpgrades(),
    () => boostUpgrades(),
    () => drainUpgrades(),
    () => invertUpgrades(),
    () => spikeUpgrades(),
    () => chaosUpgrades(),

    // Time Mods
    () => speedGame(10),
    () => speedGame(0.5),
    () => rapidFire(),
    () => superRapid(),
    () => ultraRapid(),
    () => tickStorm(),
    () => timeWarp(),
    () => stutterMode(),

];

// Duplicate with variations to exceed 100
while (modList.length < 110) {
    modList.push(() => {
        const game = getGame();
        if (!game) return;
        game.setState(prev => ({
            clicks: prev.clicks + Math.floor(Math.random() * 100000)
        }));
    });
}

function runRandomMod() {
    if (!adminUnlocked) return;
    const mod = modList[Math.floor(Math.random() * modList.length)];
    mod();
}

function modifyClicks(amount) {
    const game = getGame();
    if (!game) return;
    game.setState(prev => ({ clicks: prev.clicks + amount }));
}

function multiplyClicks(mult) {
    const game = getGame();
    if (!game) return;
    game.setState(prev => ({ clicks: prev.clicks * mult }));
}

function divideClicks(div) {
    const game = getGame();
    if (!game) return;
    game.setState(prev => ({ clicks: Math.floor(prev.clicks / div) }));
}

function randomizeClicks() {
    const game = getGame();
    if (!game) return;
    game.setState({ clicks: Math.floor(Math.random() * 100000000) });
}

function bankrupt() { modifyClicks(-999999999); }

function gamble() {
    const game = getGame();
    if (!game) return;
    if (Math.random() > 0.5)
        multiplyClicks(3);
    else
        divideClicks(2);
}

function drainOverTime() {
    const game = getGame();
    const i = setInterval(() => {
        game.setState(prev => ({ clicks: prev.clicks - 100 }));
    }, 1000);
    intervals.push(i);
}

function explodeClicks() { multiplyClicks(50); }
function reverseClicks() { multiplyClicks(-1); }

function freezeClicks() {
    const game = getGame();
    const value = game.state.clicks;
    const i = setInterval(() => {
        game.setState({ clicks: value });
    }, 100);
    intervals.push(i);
}

function chaoticMoney() { randomizeClicks(); }
function massiveSpike() { modifyClicks(999999999); }
function slowDecay() { drainOverTime(); }
function fastDecay() { drainOverTime(); }
function tripleRandom() { multiplyClicks(Math.random() * 3); }
function halveRandom() { divideClicks(Math.random() * 5 + 1); }

function percentageBoost(p) {
    const game = getGame();
    game.setState(prev => ({
        clicks: Math.floor(prev.clicks * (1 + p/100))
    }));
}

function prestigeBlast() {
    const game = getGame();
    game.setState(prev => ({
        clicks: Math.floor(prev.clicks * 0.1),
        upgrades: prev.upgrades.map(u => u + 50)
    }));
}

function nanoBoost() { modifyClicks(100); }

function maxUpgrades() {
    const game = getGame();
    game.setState({ upgrades: game.state.upgrades.map(() => 9999) });
}

function wipeUpgrades() {
    const game = getGame();
    game.setState({ upgrades: game.state.upgrades.map(() => 0) });
}

function randomizeUpgrades() {
    const game = getGame();
    game.setState({
        upgrades: game.state.upgrades.map(() => Math.floor(Math.random()*100))
    });
}

function duplicateUpgrades() {
    const game = getGame();
    game.setState({
        upgrades: game.state.upgrades.map(u => u*2)
    });
}

function corruptUpgrades() { randomizeUpgrades(); }
function boostUpgrades() { duplicateUpgrades(); }
function drainUpgrades() { wipeUpgrades(); }
function invertUpgrades() {
    const game = getGame();
    game.setState({
        upgrades: game.state.upgrades.map(u => -u)
    });
}
function spikeUpgrades() { maxUpgrades(); }
function chaosUpgrades() { randomizeUpgrades(); }

function speedGame(mult) {
    const game = getGame();
    game.props.updateInterval = 1000 / mult;
}

function rapidFire() { modifyClicks(5000); }
function superRapid() { modifyClicks(20000); }
function ultraRapid() { modifyClicks(100000); }
function tickStorm() { modifyClicks(1000000); }
function timeWarp() { multiplyClicks(10); }
function stutterMode() { divideClicks(2); }
