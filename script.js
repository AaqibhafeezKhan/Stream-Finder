const API_KEY = 'e1397be1c562b21fb75ae207765852dc';
const BASE_URL = 'https://api.themoviedb.org/3';
const POSTER_BASE_URL = 'https://image.tmdb.org/t/p/w200';
const streamingBaseUrls = {
    'Netflix': 'https://www.netflix.com/search?q=',
    'Amazon Prime Video': 'https://www.primevideo.com/s?k=',
    'Disney Plus': 'https://www.disneyplus.com/search?q=',
    'Hulu': 'https://www.hulu.com/search?q=',
    'HBO Max': 'https://www.max.com/search?q=',
    'Apple TV Plus': 'https://tv.apple.com/search?term=',
    'Paramount Plus': 'https://www.paramountplus.com/search/?q=',
    'Peacock': 'https://www.peacocktv.com/search?q=',
    'Crunchyroll': 'https://www.crunchyroll.com/search?q=',
    'Tubi TV': 'https://tubitv.com/search?q=',
    'YouTube': 'https://www.youtube.com/results?search_query=',
    'Google Play Movies': 'https://play.google.com/store/search?q=',
    'Vudu': 'https://www.vudu.com/content/movies/search?phrase=',
    'Microsoft Store': 'https://www.microsoft.com/en-us/search?q=',
};


const defaultStreamingUrl = 'https://www.google.com/search?q=watch+';

const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const searchResults = document.getElementById('searchResults');
const loadingSpinner = document.getElementById('loading');
const tabButtons = document.querySelectorAll('.tab-button');

let currentType = 'movie';

searchButton.addEventListener('click', handleSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSearch();
    }
});

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        currentType = button.getAttribute('data-type');
        
        if (searchInput.value.trim()) {
            handleSearch();
        }
    });
});

async function handleSearch() {
    const query = searchInput.value.trim();
    
    if (!query) {
        displayError('Please enter a movie or TV show title');
        return;
    }
    
    loadingSpinner.classList.remove('hidden');
    searchResults.innerHTML = '';
    
    try {
        if (API_KEY === 'YOUR_TMDB_API_KEY') {
            throw new Error('Please set your TMDB API key in the script.js file');
        }
        
        const searchResults = await searchTMDB(query, currentType);
        
        if (searchResults.length === 0) {
            displayMessage(`No ${currentType === 'movie' ? 'movies' : 'TV shows'} found for "${query}"`);
            return;
        }
        
        await displayResults(searchResults);
        
    } catch (error) {
        displayError(error.message);
    } finally {
        loadingSpinner.classList.add('hidden');
    }
}

async function searchTMDB(query, type) {
    const url = `${BASE_URL}/search/${type}?api_key=${API_KEY}&query=${encodeURIComponent(query)}&include_adult=false`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
        throw new Error(`Error searching for ${type}: ${response.status}`);
    }
    
    const data = await response.json();
    return data.results.slice(0, 10);
}

async function getStreamingProviders(id, type) {
    const url = `${BASE_URL}/${type}/${id}/watch/providers?api_key=${API_KEY}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
        return null;
    }
    
    const data = await response.json();
    
    return data.results.US || null;
}

function getStreamingServiceUrl(serviceName, title) {
    const formattedTitle = encodeURIComponent(title);
    
    if (streamingBaseUrls[serviceName]) {
        return streamingBaseUrls[serviceName] + formattedTitle;
    }
    
    return defaultStreamingUrl + formattedTitle;
}

async function displayResults(results) {
    searchResults.innerHTML = '';
    
    for (const result of results) {
        const resultItem = document.createElement('div');
        resultItem.className = 'result-item';
        
        const posterPath = result.poster_path 
            ? `${POSTER_BASE_URL}${result.poster_path}`
            : 'https://via.placeholder.com/120x180?text=No+Image';
        
        const year = result.release_date 
            ? result.release_date.substring(0, 4)
            : result.first_air_date
                ? result.first_air_date.substring(0, 4)
                : 'N/A';
        
        const title = result.title || result.name;
        
        const providers = await getStreamingProviders(result.id, currentType);
        
        resultItem.innerHTML = `
            <img src="${posterPath}" alt="${title}" class="result-poster">
            <div class="result-info">
                <div class="result-title">${title}</div>
                <div class="result-year">${year}</div>
                <div class="result-overview">${result.overview.substring(0, 200)}${result.overview.length > 200 ? '...' : ''}</div>
                ${buildStreamingSection(providers, title)}
            </div>
        `;
        
        searchResults.appendChild(resultItem);
    }
}

function buildStreamingSection(providers, title) {
    if (!providers) {
        return '<div class="streaming-title">Streaming: Not available in your region</div>';
    }
    
    let html = '<div class="streaming-title">Streaming Services:</div>';
    
    if (providers.flatrate && providers.flatrate.length > 0) {
        html += '<div class="streaming-services">';
        providers.flatrate.forEach(provider => {
            const serviceUrl = getStreamingServiceUrl(provider.provider_name, title);
            html += `<a href="${serviceUrl}" target="_blank" class="streaming-service" title="Search for ${title} on ${provider.provider_name}">${provider.provider_name}</a>`;
        });
        html += '</div>';
    } else {
        html += '<div>No subscription streaming services available</div>';
    }
    
    if (providers.rent && providers.rent.length > 0) {
        html += '<div class="streaming-title" style="margin-top: 15px;">Available for Rent:</div>';
        html += '<div class="streaming-services">';
        providers.rent.forEach(provider => {
            const serviceUrl = getStreamingServiceUrl(provider.provider_name, title);
            html += `<a href="${serviceUrl}" target="_blank" class="streaming-service" title="Rent ${title} on ${provider.provider_name}">${provider.provider_name}</a>`;
        });
        html += '</div>';
    }
    
    if (providers.buy && providers.buy.length > 0) {
        html += '<div class="streaming-title" style="margin-top: 15px;">Available for Purchase:</div>';
        html += '<div class="streaming-services">';
        providers.buy.forEach(provider => {
            const serviceUrl = getStreamingServiceUrl(provider.provider_name, title);
            html += `<a href="${serviceUrl}" target="_blank" class="streaming-service" title="Buy ${title} on ${provider.provider_name}">${provider.provider_name}</a>`;
        });
        html += '</div>';
    }
    
    return html;
}

function displayError(message) {
    searchResults.innerHTML = `<div class="error-message">${message}</div>`;
    loadingSpinner.classList.add('hidden');
}

function displayMessage(message) {
    searchResults.innerHTML = `<div class="no-results">${message}</div>`;
    loadingSpinner.classList.add('hidden');
}