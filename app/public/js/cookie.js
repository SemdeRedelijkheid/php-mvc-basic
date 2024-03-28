//get elements from html and set variables
const cookiebutton = document.getElementById('cookiebutton');
let cookiemultiplier = 1;
let jackpotMultiplier = 1;
let autoCookieInterval = null;

//get variables from session storage
let totalCookies = sessionStorage.getItem('totalCookies');
let boughtUpgrades = JSON.parse(sessionStorage.getItem('boughtUpgrades'));
let minutesPassed = parseInt(sessionStorage.getItem('minutesPassed'));
let hoursPassed = parseInt(sessionStorage.getItem('hoursPassed'));

//timer
if (isNaN(minutesPassed) || isNaN(hoursPassed)) {
    minutesPassed = 0;
    hoursPassed = 0;
} else {
    document.getElementById('totalTimePlayed').textContent = `${hoursPassed} hours ${minutesPassed} minutes`;
}

setInterval(updateTimer, 60000); //updates every minute

function updateTimer() {
    minutesPassed++;
    if (minutesPassed === 60) {
        minutesPassed = 0;
        hoursPassed++;
    }
    updateSessionStorage();
    document.getElementById('totalTimePlayed').textContent = `${hoursPassed} hours ${minutesPassed} minutes`;
}

//load upgrades
if (boughtUpgrades === null) {
    boughtUpgrades = [];
} else {
    updateLevels();
}

if (totalCookies === null || isNaN(totalCookies)) {
    totalCookies = 0;
} else {
    totalCookies = parseInt(totalCookies);
}

document.getElementById('totalCookiesCounter').textContent = totalCookies;

//cookie button

cookiebutton.addEventListener('click', function() {
    addCookies();
});

function addCookies() {
    if (Math.random() < 0.05) {
        totalCookies = totalCookies + (cookiemultiplier * jackpotMultiplier);
    } else {
        totalCookies = totalCookies + cookiemultiplier;
    }

    updateSessionStorage();

    updateCookies();
}

function updateSessionStorage() {
    sessionStorage.setItem('totalCookies', totalCookies);
    sessionStorage.setItem('boughtUpgrades', JSON.stringify(boughtUpgrades));
    sessionStorage.setItem('minutesPassed', minutesPassed);
    sessionStorage.setItem('hoursPassed', hoursPassed);
}

function updateCookies() {
    document.getElementById('totalCookiesCounter').textContent = totalCookies;
}

//upgrades section

const tableBody = document.querySelector('tbody');

tableBody.addEventListener('click', function(event) {
    if (event.target.tagName === 'BUTTON') {
        const buttonId = event.target.id;
        if (event.target.textContent === 'Buy') {
            const upgradeId = buttonId.replace('upgradeBuy', '');
            const upgrade = upgrades[upgradeId];

            upgradeBuy(upgrade);
        }
        else {
            const upgradeId = event.target.id.replace('upgradeSell', '');
            const upgrade = upgrades[upgradeId];

            if (!boughtUpgrades.some(boughtUpgrade => boughtUpgrade.id === upgrade.id)) {
                console.log('Upgrade not yet bought:', upgradeId);
                return;
            } else {
                upgradeSell(upgrade);
            }
        }
    }
});

function upgradeBuy(upgrade) {
    // check if enough cookies
    if (totalCookies < upgrade.cost) {
        console.log('Not enough cookies');
        return;
    }

    //subtract cost from total cookies
    totalCookies = totalCookies - upgrade.cost;

    //add upgrade to bought upgrades
    boughtUpgrades.push(upgrade);
    updateSessionStorage();

    //update visible info
    updateCookies();
    updateLevels();
}

function upgradeSell(upgrade) {
    //remove upgrade from bought upgrades
    const index = boughtUpgrades.findIndex(boughtUpgrade => boughtUpgrade.id === upgrade.id);
    if (upgrade.id === 2) {
        autoCookieSpeed = 0;
        clearInterval(autoCookieInterval);
    }
    if (index !== -1) {
        boughtUpgrades.splice(index, 1);
        updateSessionStorage();

        //add cost to total cookies
        totalCookies = totalCookies + upgrade.cost;

        //update visible info
        updateCookies();
        updateLevels();
    }
}

function multiplierAbility(levelUpgrade0) {
    if (levelUpgrade0 > 0) {
        cookiemultiplier = 1 + levelUpgrade0;
    } else {
        cookiemultiplier = 1;
    }
}

function jackpotAbility(levelUpgrade1) {
    jackpotMultiplier = 1 + levelUpgrade1;
}

function autoCookieAbility(levelUpgrade2) {
    if (levelUpgrade2 > 0) {
        if (boughtUpgrades.some(boughtUpgrade => boughtUpgrade.id === 2)) { 
            clearInterval(autoCookieInterval);
        }
        autoCookieInterval = setInterval(function() {
            totalCookies = totalCookies + levelUpgrade2;
            updateCookies();
            updateSessionStorage();
        }, 3000);
    }
}

function updateLevels(){
    let levelUpgrade0 = 0;
    for (let i = 0; i < boughtUpgrades.length; i++) {
        if (boughtUpgrades[i].id === 0) {
            levelUpgrade0++;
        }
    }
    document.getElementById('upgradeLevel0').textContent = levelUpgrade0;
    multiplierAbility(levelUpgrade0);

    let levelUpgrade1 = 0;
    for (let i = 0; i < boughtUpgrades.length; i++) {
        if (boughtUpgrades[i].id === 1) {
            levelUpgrade1++;
        }
    }
    document.getElementById('upgradeLevel1').textContent = levelUpgrade1;
    jackpotAbility(levelUpgrade1);

    let levelUpgrade2 = 0;
    for (let i = 0; i < boughtUpgrades.length; i++) {
        if (boughtUpgrades[i].id === 2) {
            levelUpgrade2++;
        }
    }
    document.getElementById('upgradeLevel2').textContent = levelUpgrade2;
    autoCookieAbility(levelUpgrade2);
}