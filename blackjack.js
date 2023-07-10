var dealerSum = 0;
var playerSum = 0;

var dealerAceCount = 0;
var playerAceCount = 0;

var hidden;
var deck;

var canHit = true;

var playerMoney = 1000;
var pot = 0;

window.onload = function() {
    document.getElementById("player-money").innerText = playerMoney;
    buildDeck();
    shuffleDeck();
    startGame();
}

function buildDeck() {
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "J", "Q", "K"];
    let types = ["C", "D", "H", "S"];
    deck = [];

    for (let i = 0; i < types.length; i++) {
        for (let j = 0; j < values.length; j++) {
            deck.push(values[j] + "-" + types[i]);
        }
    }
}

function shuffleDeck() {
    for (let i = 0; i < deck.length; i++) {
       let j = Math.floor(Math.random() * deck.length);
       let temp = deck[i];
       deck[i] = deck[j];
       deck[j] = temp;
    }
}

function startGame() {
    hidden = deck.pop();
    dealerSum += getValue(hidden);
    dealerAceCount += checkAce(hidden);

    while(dealerSum < 17)
        addCardToDealer();

    for(let i = 0; i < 2; i++)
        addCardToPlayer();

    document.getElementById("hit").addEventListener("click", hit);
    document.getElementById("stay").addEventListener("click", stay);
    document.getElementById("bet-button").addEventListener("click", bet);
}

function hit() {
    if(!canHit)
        return
    
    addCardToPlayer();

    if(reduceAce(playerSum, playerAceCount) > 21) {
        canHit = false;
    }
}

function addCardToPlayer() {
    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./cards/" + card + ".png";
    playerSum += getValue(card);
    playerAceCount += checkAce(card);
    document.getElementById("player-cards").append(cardImg);

    document.getElementById("player-sum").innerText = playerSum;
}

function addCardToDealer() {
    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./cards/" + card + ".png";
    dealerSum += getValue(card);
    dealerAceCount += checkAce(card);
    document.getElementById("dealer-cards").append(cardImg);

    document.getElementById("dealer-sum").innerText = dealerSum - getValue(hidden);
}

function stay() {
    dealerSum = reduceAce(dealerSum, dealerAceCount);
    playerSum = reduceAce(playerSum, playerAceCount);

    canHit = false;
    document.getElementById("hidden").src = "./cards/" + hidden + ".png";

    let message = "";
    if(playerSum > 21)
        message = "You Lose!";
    else if(dealerSum > 21)
    {
        message = "You Win!";
        playerMoney += pot;
    }
    else if(playerSum == dealerSum)
        message = "Tie!"
    else if (playerSum > dealerSum)
    {
        message = "You Win!";
        playerMoney += pot;
    }
    else if (playerSum < dealerSum)
        message = "You Lose!";

    document.getElementById("player-money").innerText = playerMoney;
    document.getElementById("dealer-sum").innerText = dealerSum;
    document.getElementById("result").innerText = message;
}

function getValue(card) {
    let data = card.split("-");
    let value = data[0];

    if(isNaN(value)) {
        if(value == "A")
            return 11;
        return 10;
    }

    return parseInt(value);
}

function checkAce(card) {
    if(card[0] == "A")
        return 1;
    return 0;
}

function reduceAce(playerSum, playerAceCount) {
    while(playerSum > 21 && playerAceCount > 0) {
        playerSum -= 10;
        playerAceCount -= 1;
    }
    return playerSum;
}

function bet() {
    let betAmount = document.getElementById("bet-input").value;
    if(betAmount > playerMoney || betAmount < 1)
        return
    pot = 2 * betAmount; 
    playerMoney -= betAmount; 

    document.getElementById("player-money").innerText = playerMoney;
    document.getElementById("pot").innerText = pot;
}