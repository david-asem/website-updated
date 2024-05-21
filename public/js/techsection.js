var techServices = document.querySelectorAll('.tech-service');
var tsIcons = document.querySelectorAll(".ts-icons .ts");
var techConnectionLines = document.querySelectorAll('.javLineLink path');
var index = 0;

// Set the duration for the line animation
var lineAnimationDuration = 2000; // Adjust this to match your line animation duration

// Function to activate a card
function activateCard(index) {
    techServices[index].classList.remove('opacity-0');
    techServices[index].classList.add('opacity-100');
    tsIcons[index].classList.remove('unfocus-tech');
    techServices[index].style.transition = "opacity " + 1000 + "ms";
    tsIcons[index].style.transition = "background-color " + 1000 + "ms, fill " + 1000 + "ms, transform " + 1000 + "ms, opacity " + 1000 + "ms";
}

// Function to deactivate a card
function deactivateCard(index) {
    techServices[index].classList.remove('opacity-100');
    techServices[index].classList.add('opacity-0');
    tsIcons[index].classList.add('unfocus-tech');
    techServices[index].style.transition = "opacity " + 1000 + "ms";
    tsIcons[index].style.transition = "background-color " + 1000 + "ms, fill " + 1000 + "ms, transform " + 1000 + "ms, opacity " + 1000 + "ms";
}

// Initial activation
activateCard(index);

// Function to handle the transition
function handleTransition() {
    let currentIndex = index;
    let nextIndex = (index + 1) % techServices.length;

    // Start the line animation
    techConnectionLines[currentIndex]?.classList.add('animated-line');

    // Wait for the line animation to complete before changing the card
    setTimeout(function () {
        // Deactivate current card
        deactivateCard(currentIndex);
        // Remove line animation class from the current line
        techConnectionLines[currentIndex]?.classList.remove('animated-line');
        
        // Activate next card
        activateCard(nextIndex);

        // Update index
        index = nextIndex;
    }, lineAnimationDuration);
}

// Start the transition loop
setInterval(handleTransition, lineAnimationDuration + 1000); // Ensure the interval accounts for both the line animation and card transition durations
