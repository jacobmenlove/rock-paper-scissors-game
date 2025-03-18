let wins = 0;
let ties = 0;
let losses = 0;
let rockCount = 0;
let paperCount = 0;
let scissorsCount = 0;

let winsElement, tiesElement, lossesElement;
let rockCountElement, paperCountElement, scissorsCountElement;
let resultMessageElement;

document.addEventListener('DOMContentLoaded', function() {
 
    winsElement = document.getElementById('wins');
    tiesElement = document.getElementById('ties');
    lossesElement = document.getElementById('losses');
    rockCountElement = document.getElementById('rockCount');
    paperCountElement = document.getElementById('paperCount');
    scissorsCountElement = document.getElementById('scissorsCount');
    
    const startButton = document.getElementById('startButton');
    
    startButton.addEventListener('click', playRound);
    
    document.getElementById('rock').addEventListener('click', function() {
        handleOptionClick('R');
    });
    
    document.getElementById('paper').addEventListener('click', function() {
        handleOptionClick('P');
    });
    
    document.getElementById('scissors').addEventListener('click', function() {
        handleOptionClick('S');
    });
});

function handleOptionClick(choice) {
  
    highlightOption(choice);
    
    playRound();
}

function highlightOption(choice) {
    // Remove highlight from all options
    document.getElementById('rock').classList.remove('selected');
    document.getElementById('paper').classList.remove('selected');
    document.getElementById('scissors').classList.remove('selected');
    
    if (choice === 'R') {
        document.getElementById('rock').classList.add('selected');
    } else if (choice === 'P') {
        document.getElementById('paper').classList.add('selected');
    } else if (choice === 'S') {
        document.getElementById('scissors').classList.add('selected');
    }
}

function playRound() {

    let userChoice = prompt("Enter R for Rock, P for Paper, or S for Scissors:");
    
    if (userChoice === null) {
        endGame();
        return;
    }
    
    userChoice = userChoice.toUpperCase();
    
    if (userChoice !== 'R' && userChoice !== 'P' && userChoice !== 'S') {
        alert("Invalid choice! Please enter R, P, or S.");
        playRound();
        return;
    }
    
    highlightOption(userChoice);
    
    updateChoiceCount(userChoice);
    
    const choices = ['R', 'P', 'S'];
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    
    const result = determineWinner(userChoice, computerChoice);
    
    updateStats(result);
    
    let computerChoiceText = computerChoice === 'R' ? 'Rock' : computerChoice === 'P' ? 'Paper' : 'Scissors';
    let userChoiceText = userChoice === 'R' ? 'Rock' : userChoice === 'P' ? 'Paper' : 'Scissors';

    alert(`You chose: ${userChoiceText}\nComputer chose: ${computerChoiceText}\n\nResult: ${getResultText(result)}\n\nCurrent Stats:\nWins: ${wins}\nTies: ${ties}\nLosses: ${losses}`);
    
    const playAgain = confirm("Do you want to play again?");
    if (playAgain) {
        playRound();
    } else {
        endGame();
    }
}

function determineWinner(userChoice, computerChoice) {
    if (userChoice === computerChoice) {
        return "tie";
    } else if (
        (userChoice === 'R' && computerChoice === 'S') ||
        (userChoice === 'P' && computerChoice === 'R') ||
        (userChoice === 'S' && computerChoice === 'P')
    ) {
        return "win";
    } else {
        return "loss";
    }
}

function getResultText(result) {
    if (result === "win") {
        return "You win!";
    } else if (result === "tie") {
        return "It's a tie!";
    } else {
        return "You lose!";
    }
}

function updateChoiceCount(choice) {
    if (choice === 'R') {
        rockCount++;
        rockCountElement.textContent = rockCount;
    } else if (choice === 'P') {
        paperCount++;
        paperCountElement.textContent = paperCount;
    } else if (choice === 'S') {
        scissorsCount++;
        scissorsCountElement.textContent = scissorsCount;
    }
}

function updateStats(result) {
    if (result === "win") {
        wins++;
        winsElement.textContent = wins;
    } else if (result === "tie") {
        ties++;
        tiesElement.textContent = ties;
    } else {
        losses++;
        lossesElement.textContent = losses;
    }
}

function endGame() {
    // Display the final results
    alert(`Game Over!\n\nFinal Score:\nWins: ${wins}\nTies: ${ties}\nLosses: ${losses}\n\nYour Choices:\nRock: ${rockCount}\nPaper: ${paperCount}\nScissors: ${scissorsCount}`);
}