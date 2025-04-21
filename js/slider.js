// Initialize the timeline slider
let timeline;
const yearInput = document.getElementById('yearInput');
const goToYearBtn = document.getElementById('goToYear');

// Create the slider when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeSlider();
});

function initializeSlider() {
    timeline = document.getElementById('timeline');
    if (!timeline) {
        console.error('Timeline element not found');
        return;
    }

    // Create the slider
    noUiSlider.create(timeline, {
        start: [1900], // Start at 1900 AD
        connect: true,
        range: {
            'min': -3000,
            'max': new Date().getFullYear()
        },
        step: 1,
        format: {
            to: function(value) {
                const year = Math.round(value);
                return year < 0 ? Math.abs(year) + ' BC' : year + ' AD';
            },
            from: function(value) {
                if (typeof value === 'string') {
                    if (value.includes('BC')) {
                        return -parseInt(value);
                    } else {
                        return parseInt(value);
                    }
                }
                return value;
            }
        },
        tooltips: true,
        pips: {
            mode: 'positions',
            values: [0, 25, 50, 75, 100],
            density: 4,
            format: {
                to: function(value) {
                    const year = Math.round(value);
                    return year < 0 ? Math.abs(year) + ' BC' : year;
                }
            }
        }
    });

    // Function to get current year from slider
    window.getCurrentYear = function() {
        if (!timeline || !timeline.noUiSlider) {
            return 1900; // Default year if slider isn't initialized
        }
        const value = timeline.noUiSlider.get();
        return typeof value === 'string' ? parseInt(value) : value;
    };

    // Function to set year on slider
    window.setYear = function(year) {
        if (timeline && timeline.noUiSlider) {
            timeline.noUiSlider.set(year);
            if (typeof updateMarkers === 'function') {
                updateMarkers(year);
            }
        }
    };

    // Handle slider updates
    timeline.noUiSlider.on('update', function(values, handle) {
        const year = parseInt(values[handle]);
        updateYearInput(year);
        if (typeof updateMarkers === 'function') {
            updateMarkers(year);
        }
    });

    // Initialize event listeners for year input
    initializeYearInputListeners();
}

function updateYearInput(year) {
    if (yearInput) {
        yearInput.value = year < 0 ? Math.abs(year) + ' BC' : year + ' AD';
    }
}

function handleYearInput() {
    const year = parseYearInput(yearInput.value);
    if (!isNaN(year) && year >= -3000 && year <= new Date().getFullYear()) {
        setYear(year);
    } else {
        alert('Please enter a valid year between 3000 BC and present');
        // Reset to current slider value
        updateYearInput(getCurrentYear());
    }
}

function parseYearInput(input) {
    const value = input.trim().toUpperCase();
    if (value.endsWith('BC')) {
        return -parseInt(value.slice(0, -2));
    } else if (value.endsWith('AD')) {
        return parseInt(value.slice(0, -2));
    } else {
        // If no BC/AD specified, assume AD
        const year = parseInt(value);
        return year;
    }
}

function initializeYearInputListeners() {
    if (goToYearBtn) {
        goToYearBtn.addEventListener('click', handleYearInput);
    }

    if (yearInput) {
        yearInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault(); // Prevent form submission
                handleYearInput();
            }
        });

        // Add input validation and formatting
        yearInput.addEventListener('input', (e) => {
            const value = e.target.value.toUpperCase();
            // Allow numbers, spaces, and "BC"/"AD"
            if (!/^[\d\s(BC|AD)]*$/.test(value)) {
                e.target.value = value.replace(/[^\d\s(BC|AD)]/g, '');
            }
        });

        // Format on blur
        yearInput.addEventListener('blur', () => {
            const year = parseYearInput(yearInput.value);
            if (!isNaN(year)) {
                updateYearInput(year);
            }
        });
    }
} 