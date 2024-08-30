// Function to fetch travel recommendations
function fetchTravelRecommendations() {
    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            console.log('Fetched data:', data);
            displayRecommendations(data);
        })
        .catch(error => {
            console.error('Error fetching travel recommendations:', error);
        });
}

// Function to display recommendations
function displayRecommendations(recommendations) {
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = ''; // Clear previous results

    if (recommendations.length === 0) {
        resultsContainer.innerHTML = '<p>No recommendations found. Try searching for "beach", "temple", or "country".</p>';
        return;
    }

    recommendations.forEach(recommendation => {
        const recommendationElement = document.createElement('div');
        recommendationElement.className = 'recommendation';
        recommendationElement.innerHTML = `
            <img src="${getImageUrl(recommendation.imageUrl)}" alt="${recommendation.name}">
            <h2>${recommendation.name}</h2>
            <p>${recommendation.description}</p>
            <p>Rating: ${recommendation.rating}/5</p>
            ${recommendation.type === 'country' ? `<p class="country-time" data-timezone="${recommendation.timezone}">Loading time...</p>` : ''}
        `;
        resultsContainer.appendChild(recommendationElement);
    });

    // Update times for countries
    updateCountryTimes();
}

// Function to get image URL (replace with your own images)
function getImageUrl(imageUrl) {
    // This is a placeholder function. In a real scenario, you would map the imageUrl
    // from the JSON to your own image files.
    const imageMap = {
        'beach1.jpg': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
        'beach2.jpg': 'https://images.unsplash.com/photo-1520454974749-611b7248ffdb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
        'temple1.jpg': 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
        'temple2.jpg': 'https://images.unsplash.com/photo-1609834265242-4af6bbc7e2e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
        'country1.jpg': 'https://images.unsplash.com/photo-1492571350019-22de08371fd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
        'country2.jpg': 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    };
    return imageMap[imageUrl] || 'https://via.placeholder.com/400x300';
}

// Function to handle search
function handleSearch() {
    const searchInput = document.getElementById('search-input');
    const searchTerm = searchInput.value.toLowerCase().trim();

    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            let filteredRecommendations;

            if (['beach', 'temple', 'country'].includes(searchTerm)) {
                filteredRecommendations = data.filter(recommendation => 
                    recommendation.type === searchTerm
                );
            } else {
                filteredRecommendations = data.filter(recommendation => 
                    recommendation.name.toLowerCase().includes(searchTerm) ||
                    recommendation.description.toLowerCase().includes(searchTerm)
                );
            }

            console.log('Filtered recommendations:', filteredRecommendations);
            displayRecommendations(filteredRecommendations);
        })
        .catch(error => {
            console.error('Error fetching travel recommendations:', error);
        });
}

// Function to reset search
function resetSearch() {
    document.getElementById('search-input').value = '';
    fetchTravelRecommendations();
}

// Function to clear results
function clearResults() {
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = '';
    document.getElementById('search-input').value = '';
}

// Function to update country times
function updateCountryTimes() {
    const countryTimes = document.querySelectorAll('.country-time');
    countryTimes.forEach(timeElement => {
        const timezone = timeElement.dataset.timezone;
        const options = { timeZone: timezone, hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
        const time = new Date().toLocaleTimeString('en-US', options);
        timeElement.textContent = `Current time: ${time}`;
    });
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    fetchTravelRecommendations();
    document.getElementById('search-button').addEventListener('click', handleSearch);
    document.getElementById('reset-button').addEventListener('click', resetSearch);
    //document.getElementById('clear-button').addEventListener('click', clearResults);

    // Update country times every second
    setInterval(updateCountryTimes, 1000);
});