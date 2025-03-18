// Game variables
let wins = 0;
let ties = 0;
let losses = 0;
let rockCount = 0;
let paperCount = 0;
let scissorsCount = 0;

// DOM elements
let winsElement, tiesElement, lossesElement;
let rockCountElement, paperCountElement, scissorsCountElement;
let resultMessageElement, playerSelectionElement, computerSelectionElement;
let resetButton;
let options;

document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    winsElement = document.getElementById('wins');
    tiesElement = document.getElementById('ties');
    lossesElement = document.getElementById('losses');
    rockCountElement = document.getElementById('rockCount');
    paperCountElement = document.getElementById('paperCount');
    scissorsCountElement = document.getElementById('scissorsCount');
    resultMessageElement = document.getElementById('result-message');
    playerSelectionElement = document.getElementById('player-selection');
    computerSelectionElement = document.getElementById('computer-selection');
    resetButton = document.getElementById('resetButton');
    options = document.querySelectorAll('.option');
    
    // Add event listeners to option elements
    options.forEach(option => {
        option.addEventListener('click', function() {
            const choice = this.getAttribute('data-choice');
            
            // Briefly show the selection for visual feedback
            this.classList.add('selected');
            
            // Remove the selected class after a short delay
            setTimeout(() => {
                this.classList.remove('selected');
            }, 200);
            
            playGame(choice);
        });
    });
    
    // Add event listener to reset button
    resetButton.addEventListener('click', confirmReset);
});

// Function to play the game
function playGame(userChoice) {
    // Update player's selection display
    updateSelectionDisplay(playerSelectionElement, userChoice);
    
    // Update choice statistics
    updateChoiceCount(userChoice);
    
    // Generate the computer's choice
    const choices = ['R', 'P', 'S'];
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    
    // Update computer's selection display
    updateSelectionDisplay(computerSelectionElement, computerChoice);
    
    // Determine the winner
    const result = determineWinner(userChoice, computerChoice);
    
    // Update the game statistics based on the result
    updateStats(result);
    
    // Display the result message
    displayResult(result, userChoice, computerChoice);
}

// Function to confirm reset
function confirmReset() {
    if (confirm("Are you sure you want to reset the game? All your statistics will be lost.")) {
        resetGame();
    }
}

// Function to update the selection display
function updateSelectionDisplay(element, choice) {
    // Clear existing content
    element.innerHTML = '';
    
    // Create and append the appropriate image
    const img = document.createElement('img');
    
    if (choice === 'R') {
        img.src = 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/270a.svg';
        img.alt = 'Rock';
    } else if (choice === 'P') {
        img.src = 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/270b.svg';
        img.alt = 'Paper';
    } else if (choice === 'S') {
        img.src = 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/270c.svg';
        img.alt = 'Scissors';
    }
    
    element.appendChild(img);
    
    // Add highlight animation to the display area
    element.classList.add('highlight');
    setTimeout(() => {
        element.classList.remove('highlight');
    }, 500);
}

// Function to determine the winner
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

// Function to display the result in the message area
function displayResult(result, userChoice, computerChoice) {
    resultMessageElement.classList.remove('win', 'tie', 'loss');
    
    let userChoiceText = userChoice === 'R' ? 'Rock' : userChoice === 'P' ? 'Paper' : 'Scissors';
    let computerChoiceText = computerChoice === 'R' ? 'Rock' : computerChoice === 'P' ? 'Paper' : 'Scissors';
    
    let resultText;
    if (result === "win") {
        resultText = `You win! ${userChoiceText} beats ${computerChoiceText}.`;
        resultMessageElement.classList.add('win');
    } else if (result === "tie") {
        resultText = `It's a tie! Both chose ${userChoiceText}.`;
        resultMessageElement.classList.add('tie');
    } else {
        resultText = `You lose! ${computerChoiceText} beats ${userChoiceText}.`;
        resultMessageElement.classList.add('loss');
    }
    
    resultMessageElement.textContent = resultText;
    
    // Add animation to result message
    resultMessageElement.classList.add('highlight');
    setTimeout(() => {
        resultMessageElement.classList.remove('highlight');
    }, 500);
}

// Function to update choice count
function updateChoiceCount(choice) {
    if (choice === 'R') {
        rockCount++;
        rockCountElement.textContent = rockCount;
        rockCountElement.classList.add('pulse');
        setTimeout(() => rockCountElement.classList.remove('pulse'), 500);
    } else if (choice === 'P') {
        paperCount++;
        paperCountElement.textContent = paperCount;
        paperCountElement.classList.add('pulse');
        setTimeout(() => paperCountElement.classList.remove('pulse'), 500);
    } else if (choice === 'S') {
        scissorsCount++;
        scissorsCountElement.textContent = scissorsCount;
        scissorsCountElement.classList.add('pulse');
        setTimeout(() => scissorsCountElement.classList.remove('pulse'), 500);
    }
}

// Function to update game statistics
function updateStats(result) {
    if (result === "win") {
        wins++;
        winsElement.textContent = wins;
        winsElement.classList.add('pulse');
        setTimeout(() => winsElement.classList.remove('pulse'), 500);
    } else if (result === "tie") {
        ties++;
        tiesElement.textContent = ties;
        tiesElement.classList.add('pulse');
        setTimeout(() => tiesElement.classList.remove('pulse'), 500);
    } else {
        losses++;
        lossesElement.textContent = losses;
        lossesElement.classList.add('pulse');
        setTimeout(() => lossesElement.classList.remove('pulse'), 500);
    }
}

// Function to reset the game
function resetGame() {
    // Reset game variables
    wins = 0;
    ties = 0;
    losses = 0;
    rockCount = 0;
    paperCount = 0;
    scissorsCount = 0;
    
    // Update display
    winsElement.textContent = '0';
    tiesElement.textContent = '0';
    lossesElement.textContent = '0';
    rockCountElement.textContent = '0';
    paperCountElement.textContent = '0';
    scissorsCountElement.textContent = '0';
    
    // Reset selection displays
    playerSelectionElement.innerHTML = '?';
    computerSelectionElement.innerHTML = '?';
    
    // Reset result message
    resultMessageElement.classList.remove('win', 'tie', 'loss');
    resultMessageElement.textContent = 'Choose an option to start playing!';
}