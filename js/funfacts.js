// Fun facts about historical events
const funFacts = [
    "Did you know? The Great Pyramid of Giza was the tallest man-made structure in the world for over 3,800 years!",
    "The Ancient Olympic Games were held every four years from 776 BC to 393 AD, spanning over a millennium.",
    "Julius Caesar was warned about his assassination by a soothsayer who told him to 'Beware the Ides of March.'",
    "The First Crusade was actually preceded by the 'People's Crusade,' which was a disaster and never reached the Holy Land.",
    "Newton was inspired to formulate his theory of gravity when an apple fell from a tree - though it didn't hit his head!",
    "The storming of the Bastille prison in Paris only freed seven prisoners, but it became a symbol of the French Revolution.",
    "World War II's end was marked by the first and only use of atomic weapons in warfare.",
    "Neil Armstrong's first step on the moon was watched by an estimated 600 million people worldwide.",
    "The Berlin Wall fell largely due to a miscommunication at a press conference.",
    "The World Wide Web was originally proposed as a way for scientists to share information more easily."
];

// Function to get a random fun fact
function getRandomFunFact() {
    const randomIndex = Math.floor(Math.random() * funFacts.length);
    return funFacts[randomIndex];
}

// Add fun fact display functionality
document.getElementById('surpriseMe').addEventListener('mouseover', () => {
    const fact = getRandomFunFact();
    const tooltip = document.createElement('div');
    tooltip.className = 'fun-fact-tooltip';
    tooltip.textContent = fact;
    document.body.appendChild(tooltip);
});

document.getElementById('surpriseMe').addEventListener('mouseout', () => {
    const tooltip = document.querySelector('.fun-fact-tooltip');
    if (tooltip) {
        tooltip.remove();
    }
}); 