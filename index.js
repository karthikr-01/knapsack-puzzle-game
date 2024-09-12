// Story logic
const images = ['images/storyImg1.png', 'images/storyImg2.png', 'images/storyImg3.png'];
const texts = [
    'While on a trek of the sahyadri range,<br>you enter a mysterious cave and find...',
    'A huge amount of treasures - gold coins, gemstones<br>pearls and diamonds. But sadly you can carry only a small amount<br>with you in your knapsack',
    'How many gems should you carry with you in one go<br>to ensure you get the maximum value out of them?'
];

let currentIndex = 0;

function previous() {
    if (currentIndex > 0) {
        currentIndex--;
        updateContent();
    }
}

function next() {
    if (currentIndex < images.length - 1) {
        currentIndex++;
        updateContent();
    }
}

function updateContent() {
    document.getElementById('image').src = images[currentIndex];
    document.getElementById('text').innerHTML = texts[currentIndex];
    updateDots();
}

function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentIndex].classList.add('active');
}

updateContent();

// Show game page
function startGame() {
    document.getElementById('story-page').style.display = 'none';
    document.getElementById('game-page').style.display = 'block';
}

// Exit the game
function exitGame() {
    document.getElementById('story-page').style.display = 'none';
    document.getElementById('game-page').style.display = 'none';
    document.getElementById('exit-page').style.display = 'block';
}

// Game logic
let totalWeight = 0;
let totalValue = 0;
const maxWeight = 30;

function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
    event.preventDefault();
    const gemId = event.dataTransfer.getData("text");
    const gem = document.getElementById(gemId);
    const weight = parseInt(gem.dataset.weight);
    const value = parseInt(gem.dataset.value);

    if (totalWeight + weight <= maxWeight) {
        totalWeight += weight;
        totalValue += value;
        const gemClone = gem.cloneNode(true);
        event.target.appendChild(gemClone);
        provideWeightFeedback();
    } else {
        document.getElementById("weight-feedback").textContent = "Too heavy! Try removing some gems.";
    }
}

function provideWeightFeedback() {
    const feedback = document.getElementById("weight-feedback");
    if (totalWeight < maxWeight) {
        feedback.textContent = `Add more weight! Current weight: ${totalWeight}`;
    } else if (totalWeight === maxWeight) {
        feedback.textContent = `Perfect weight! Current weight: ${totalWeight}`;
    } else {
        feedback.textContent = `Too heavy! Current weight: ${totalWeight}`;
    }
}

function submitSelection() {
    const feedback = document.getElementById("game-feedback");
    if (totalWeight === maxWeight) {
        feedback.textContent = "YOU WON!";
    } else if (totalWeight < maxWeight) {
        feedback.textContent = "You need more weight to win!";
    } else {
        feedback.textContent = "You've exceeded the weight limit!";
    }
}

function resetGame() {
    const knapsack = document.getElementById('knapsack');
    knapsack.innerHTML = ''; 
    totalWeight = 0;
    totalValue = 0;
    document.getElementById('weight-feedback').textContent = '';
    document.getElementById('game-feedback').textContent = '';
}
