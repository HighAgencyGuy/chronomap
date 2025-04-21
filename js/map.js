// Initialize the map
let map;
let markersLayer;
let currentMarkers = [];
let activeFilters = ['War', 'Culture', 'Science', 'Religion', 'Politics'];

// Initialize map when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeMap();
    // Handle window resize
    window.addEventListener('resize', () => {
        if (map) {
            map.invalidateSize();
        }
    });
});

function initializeMap() {
    try {
        // Initialize the map with specific options
        map = L.map('map', {
            minZoom: 2,
            maxZoom: 18,
            zoomControl: false, // We'll add zoom control in a better position
            attributionControl: true
        }).setView([30, 0], 3);

        // Add zoom control to the right side
        L.control.zoom({
            position: 'topright'
        }).addTo(map);

        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 18
        }).addTo(map);

        // Store markers layer
        markersLayer = L.layerGroup().addTo(map);

        // Initialize event listeners
        initializeEventListeners();
        
        // Force a resize check after initialization
        setTimeout(() => {
            map.invalidateSize();
        }, 100);

        console.log('Map initialized successfully');
    } catch (error) {
        console.error('Error initializing map:', error);
    }
}

// Function to create a popup content
function createPopupContent(event) {
    return `
        <div class="event-popup">
            <h3>${event.title}</h3>
            <p><strong>Year:</strong> ${event.year < 0 ? Math.abs(event.year) + ' BC' : event.year + ' AD'}</p>
            <p><strong>Category:</strong> ${event.category}</p>
            <p>${event.description}</p>
            <a href="${event.link}" target="_blank" class="read-more">Read More</a>
        </div>
    `;
}

// Function to update markers based on year and filters
function updateMarkers(year, tolerance = 10) {
    if (!map || !markersLayer) {
        console.error('Map not initialized yet');
        return;
    }

    // Clear existing markers
    markersLayer.clearLayers();
    currentMarkers = [];

    // Filter events based on year and categories
    const visibleEvents = historicalEvents.filter(event => {
        const yearMatch = Math.abs(event.year - year) <= tolerance;
        const categoryMatch = activeFilters.includes(event.category);
        return yearMatch && categoryMatch;
    });

    // Add new markers
    visibleEvents.forEach(event => {
        const marker = L.marker([event.location.lat, event.location.lng])
            .bindPopup(createPopupContent(event));
        currentMarkers.push(marker);
        markersLayer.addLayer(marker);
    });
}

function initializeEventListeners() {
    // Handle category filter changes
    document.querySelectorAll('.filter-group input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            if (e.target.checked) {
                activeFilters.push(e.target.value);
            } else {
                activeFilters = activeFilters.filter(filter => filter !== e.target.value);
            }
            updateMarkers(getCurrentYear());
        });
    });

    // Handle sidebar toggle
    const toggleButton = document.getElementById('toggleSidebar');
    const sidebar = document.getElementById('sidebar');
    if (toggleButton && sidebar) {
        toggleButton.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
            // Trigger a map resize after sidebar toggle animation
            setTimeout(() => {
                map.invalidateSize();
            }, 300); // Match the transition duration
        });
    }

    // Handle surprise me button
    const surpriseButton = document.getElementById('surpriseMe');
    if (surpriseButton) {
        surpriseButton.addEventListener('click', () => {
            const randomEvent = historicalEvents[Math.floor(Math.random() * historicalEvents.length)];
            map.setView([randomEvent.location.lat, randomEvent.location.lng], 6);
            
            // Create and open a popup for the random event
            L.popup()
                .setLatLng([randomEvent.location.lat, randomEvent.location.lng])
                .setContent(createPopupContent(randomEvent))
                .openOn(map);
            
            // Update the timeline to match the event's year
            if (typeof setYear === 'function') {
                setYear(randomEvent.year);
            }
        });
    }
} 