# ChronoMap

An interactive historical timeline map that visualizes significant events throughout history. Users can explore events across different time periods and categories, with an intuitive slider interface and detailed event information.

## Features

- Interactive timeline slider
- Year input with BC/AD support
- Category filters (War, Culture, Science, Religion, Politics)
- Event markers on the map with popup information
- Responsive design for all screen sizes
- "Surprise Me!" feature for random event discovery

## Local Development

1. Clone the repository:
```bash
git clone https://github.com/HighAgencyGuy/chronomap.git
cd chronomap
```

2. Start a local server:
```bash
python3 -m http.server 8000
```

3. Open in your browser:
```
http://localhost:8000
```

## Making Changes

1. Before making changes, pull the latest version:
```bash
git add .
git commit -m "Description of your changes"
git push
```

2. Make your changes to the files

3. Save your changes:
```bash
git add .
git commit -m "Description of your changes"
git push
```

## Project Structure

- `index.html` - Landing page
- `map.html` - Main map interface
- `about.html` - About page
- `css/styles.css` - Styling
- `js/` - JavaScript files
  - `data.js` - Event data handling
  - `map.js` - Map functionality
  - `slider.js` - Timeline slider
  - `funfacts.js` - Fun facts feature
- `data/events.json` - Historical events data 