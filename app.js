/*
GAME RULES:

- The game has 2 players, playing in rounds +
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score +
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn +
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn+
- The first player to reach 100 points on GLOBAL score wins the game +

*/

/*
Challenge
1- if one player rolls two 6's in a row; the player will lose all his CURRENT and ROUND SCORE points, and the next player turn will start. +
2- let the players set their preferable winning score. +
3- add another dice, if one of them is one; the player will lose his CURRENT score, if two of them are six then it will be like the first task. + 
*/


//initial program.
var sum, activePlayer, globalScore, activeScore, gameStatus, counter;
init();
globalScore = document.getElementById("final-score").value;
console.log("global score is " + globalScore);

//defining diceImg and styiling the Dice.
var diceImg = document.querySelector(".dice");
var diceImg2 = document.querySelector(".dice2");


//Roll Dice button event

document.getElementById("btn-dice").addEventListener("click", function () {
    //check game status before rolling
    if (gameStatus) {
        //define two dices
        var dice = Math.floor(Math.random() * 6 + 1);
        console.log(dice);
        diceImg.src = "images/dice-" + dice + ".png";
        var dice2 = Math.floor(Math.random() * 6 + 1);
        diceImg2.src = "images/dice-" + dice2 + ".png";
        if (dice == 6) {
            counter++;
            console.log("first dice is 6");
            console.log("counter is " + counter);
        }
        if (dice2 == 6) {
            counter++
            console.log("second dice is 6");
            console.log("counter is " + counter);
        }
        //if one dice is = 1, go to next player
        if ((dice > 1 || dice2 > 1) && counter < 2) {
            sum = sum + dice + dice2;
            document.getElementById("score-" + activePlayer).textContent = sum;
        } else {
            counter = 0;
            document.getElementById("score-" + activePlayer).textContent = 0;
            sum = 0;
            activePlayer == 0 ? activePlayer = 1 : activePlayer = 0;
            console.log("counter is more than 2 or both dices are 1");
        }
    }
});

//submit score
document.getElementById("btn-hold").addEventListener("click", function () {
    if (gameStatus) {
        //add and store the score of the active player
        activeScore[activePlayer] += sum;
        //change the html with the new score
        document.getElementById("current-" + activePlayer + "-score").textContent = activeScore[activePlayer];
        console.log("player num " + activePlayer + " is " + activeScore[activePlayer]);
        console.log("global score after hold " + globalScore);
        //check if player score equal or more than the final score
        if (activeScore[activePlayer] >= globalScore) {
            //change html to player 0/1 winner 
            document.getElementById("player-" + activePlayer).textContent = "PLAYER " + (activePlayer + 1) + " WINNER!";
            //stop the game
            gameStatus = false;
            console.log("player " + activePlayer + " won");

        } else {
            //if the submitted score doesn't euqal or exceeds the final score, reset the sum and change player.
            document.getElementById("score-" + activePlayer).textContent = 0;
            sum = 0;
            activePlayer == 0 ? activePlayer = 1 : activePlayer = 0;
            counter = 0;
        }
    }
})
//create new final score
document.getElementById("btn-final-score").addEventListener("click", function () {
    globalScore = document.getElementById("final-score").value;
    document.querySelector(".score-input").style.display = "none";
    document.querySelector(".dice-controllers").style.display="block";
    console.log("new final score is " + globalScore);
})



//initiate new game
document.getElementById("btn-new").addEventListener("click", function () {
    init();
    diceImg.src = "images/dice-1.png";
    diceImg2.src = "images/dice-1.png";
});


//reset all elements
function init() {
    gameStatus = true;
    activeScore = [0, 0];
    sum = 0;
    activePlayer = 0;
    globalScore = 20;
    counter = 0;
    document.getElementById("player-0").textContent = "PLAYER 1";
    document.getElementById("player-1").textContent = "PLAYER 2";
    document.getElementById("current-" + 0 + "-score").textContent = 0;
    document.getElementById("current-" + 1 + "-score").textContent = 0;
    document.getElementById("score-0").textContent = 0;
    document.getElementById("score-1").textContent = 0;
    document.querySelector(".score-input").style.display ="block";
    document.querySelector(".dice-controllers").style.display="none";
}