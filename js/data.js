// Initialize events array
let historicalEvents = [];

// Function to load events from JSON file
async function loadEvents() {
    try {
        const response = await fetch('/data/events.json');
        const data = await response.json();
        historicalEvents = data.events;
        
        // Initialize the map with the loaded events
        if (typeof updateMarkers === 'function' && typeof getCurrentYear === 'function') {
            updateMarkers(getCurrentYear());
        } else {
            // Fallback to sample data if map functions aren't ready
            historicalEvents = sampleHistoricalEvents;
        }
        
        // Hide loading overlay once data is loaded
        document.querySelector('.loading-overlay').classList.add('hidden');
        
        return historicalEvents;
    } catch (error) {
        console.error('Error loading events:', error);
        // Fallback to sample data
        historicalEvents = sampleHistoricalEvents;
        updateMarkers(getCurrentYear());
        document.querySelector('.loading-overlay').classList.add('hidden');
        return historicalEvents;
    }
}

// Load events when the page loads
document.addEventListener('DOMContentLoaded', async () => {
    await loadEvents();
});

// Sample historical events data
const sampleHistoricalEvents = [
    {
        title: "Fall of the Berlin Wall",
        year: 1989,
        location: { lat: 52.5163, lng: 13.3777 },
        category: "Politics",
        description: "The Berlin Wall was brought down, marking the end of the Cold War and the division between East and West Germany.",
        link: "https://en.wikipedia.org/wiki/Berlin_Wall"
    },
    {
        title: "Construction of the Great Pyramid of Giza",
        year: -2560,
        location: { lat: 29.9792, lng: 31.1342 },
        category: "Culture",
        description: "The Great Pyramid was built as a tomb for the Pharaoh Khufu of the Fourth Dynasty of ancient Egypt.",
        link: "https://en.wikipedia.org/wiki/Great_Pyramid_of_Giza"
    },
    {
        title: "First Olympic Games",
        year: -776,
        location: { lat: 37.6382, lng: 21.6300 },
        category: "Culture",
        description: "The first recorded Olympic Games were held in Olympia, Greece.",
        link: "https://en.wikipedia.org/wiki/Ancient_Olympic_Games"
    },
    {
        title: "Assassination of Julius Caesar",
        year: -44,
        location: { lat: 41.8902, lng: 12.4922 },
        category: "Politics",
        description: "Julius Caesar was assassinated by Roman senators, leading to the end of the Roman Republic.",
        link: "https://en.wikipedia.org/wiki/Assassination_of_Julius_Caesar"
    },
    {
        title: "First Crusade Begins",
        year: 1096,
        location: { lat: 41.9028, lng: 12.4964 },
        category: "Religion",
        description: "Pope Urban II calls for the First Crusade at the Council of Clermont.",
        link: "https://en.wikipedia.org/wiki/First_Crusade"
    },
    {
        title: "Newton's Theory of Gravity",
        year: 1687,
        location: { lat: 52.2053, lng: 0.1218 },
        category: "Science",
        description: "Isaac Newton publishes his laws of motion and universal gravitation in Principia Mathematica.",
        link: "https://en.wikipedia.org/wiki/Philosophi%C3%A6_Naturalis_Principia_Mathematica"
    },
    {
        title: "French Revolution Begins",
        year: 1789,
        location: { lat: 48.8566, lng: 2.3522 },
        category: "Politics",
        description: "The French Revolution begins with the storming of the Bastille.",
        link: "https://en.wikipedia.org/wiki/French_Revolution"
    },
    {
        title: "World War II Ends",
        year: 1945,
        location: { lat: 35.6762, lng: 139.6503 },
        category: "War",
        description: "World War II ends with the surrender of Japan following the atomic bombings of Hiroshima and Nagasaki.",
        link: "https://en.wikipedia.org/wiki/Surrender_of_Japan"
    },
    {
        title: "First Moon Landing",
        year: 1969,
        location: { lat: 0.6741, lng: 23.4707 },
        category: "Science",
        description: "Apollo 11 astronauts Neil Armstrong and Buzz Aldrin become the first humans to walk on the Moon.",
        link: "https://en.wikipedia.org/wiki/Apollo_11"
    },
    {
        title: "World Wide Web Invented",
        year: 1989,
        location: { lat: 46.2344, lng: 6.0500 },
        category: "Science",
        description: "Tim Berners-Lee invents the World Wide Web while working at CERN.",
        link: "https://en.wikipedia.org/wiki/History_of_the_World_Wide_Web"
    }
]; 