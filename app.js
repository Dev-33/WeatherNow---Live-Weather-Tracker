// ===== CONFIGURATION =====
const API_KEY = 'bd5e378503939ddaee76f12ad7a97608'; // Free OpenWeatherMap API key
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const STORAGE_KEY = 'weatherAppHistory';
const DARK_MODE_KEY = 'weatherAppDarkMode';
const MAX_HISTORY = 5;

// ===== DOM ELEMENTS =====
const elements = {
    searchForm: document.getElementById('searchForm'),
    cityInput: document.getElementById('cityInput'),
    searchHistory: document.getElementById('searchHistory'),
    loading: document.getElementById('loading'),
    error: document.getElementById('error'),
    errorTitle: document.getElementById('errorTitle'),
    errorMessage: document.getElementById('errorMessage'),
    weatherDisplay: document.getElementById('weatherDisplay'),
    darkModeToggle: document.getElementById('darkModeToggle')
};

// ===== STATE MANAGEMENT =====
let searchHistory = [];

// ===== INITIALIZATION =====
const init = () => {
    // Load dark mode preference
    const isDarkMode = localStorage.getItem(DARK_MODE_KEY) === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    }

    // Load search history
    loadSearchHistory();
    renderSearchHistory();

    // Event listeners
    elements.searchForm.addEventListener('submit', handleSearch);
    elements.darkModeToggle.addEventListener('click', toggleDarkMode);

    // Event delegation for search history
    elements.searchHistory.addEventListener('click', handleHistoryClick);
};

// ===== DARK MODE =====
const toggleDarkMode = () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem(DARK_MODE_KEY, isDark);
};

// ===== SEARCH FUNCTIONALITY =====
const handleSearch = async (event) => {
    event.preventDefault(); // Prevent page reload
    
    const city = elements.cityInput.value.trim();
    
    if (!city) {
        showError('Please enter a city name', 'Empty Input');
        return;
    }

    await fetchWeatherData(city);
};

// ===== API INTEGRATION =====
const fetchWeatherData = async (city) => {
    try {
        // Show loading state
        showLoading();

        // Construct API URL
        const url = `${API_BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

        // Fetch with timeout
        const response = await fetchWithTimeout(url, 5000);

        // Check response status
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('City not found. Please check the spelling and try again.');
            } else if (response.status === 401) {
                throw new Error('API authentication failed. Please contact support.');
            } else if (response.status === 429) {
                throw new Error('Too many requests. Please try again in a minute.');
            } else {
                throw new Error(`Server error (${response.status}). Please try again later.`);
            }
        }

        // Parse JSON response
        const data = await response.json();

        // Add to search history
        addToHistory(city);

        // Display weather data
        displayWeather(data);

    } catch (error) {
        // Handle different error types
        if (error.name === 'AbortError') {
            showError('Request timed out. Please check your internet connection.', 'Timeout Error');
        } else if (error.message.includes('Failed to fetch')) {
            showError('Network error. Please check your internet connection.', 'Network Error');
        } else {
            showError(error.message, 'Error');
        }

        console.error('Weather fetch error:', error);
    }
};

// ===== FETCH WITH TIMEOUT =====
const fetchWithTimeout = (url, timeout = 5000) => {
    return new Promise((resolve, reject) => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => {
            controller.abort();
        }, timeout);

        fetch(url, { signal: controller.signal })
            .then(response => {
                clearTimeout(timeoutId);
                resolve(response);
            })
            .catch(error => {
                clearTimeout(timeoutId);
                reject(error);
            });
    });
};

// ===== DISPLAY WEATHER (Dynamic DOM) =====
const displayWeather = (data) => {
    // Extract data using destructuring
    const {
        name,
        sys: { country },
        weather,
        main: { temp, feels_like, humidity, pressure },
        wind: { speed },
        visibility
    } = data;

    const weatherInfo = weather[0];
    const { description, icon } = weatherInfo;

    // Get weather icon emoji
    const weatherEmoji = getWeatherEmoji(icon);

    // Format current date
    const currentDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Create HTML dynamically using template literals
    const weatherHTML = `
        <div class="weather-card">
            <div class="weather-header">
                <h2 class="city-name">${name}, ${country}</h2>
                <p class="weather-date">${currentDate}</p>
            </div>

            <div class="weather-main">
                <div class="weather-icon-large">${weatherEmoji}</div>
                <div class="temperature-section">
                    <div class="temperature">${Math.round(temp)}°C</div>
                    <p class="weather-description">${description}</p>
                    <p class="feels-like">Feels like ${Math.round(feels_like)}°C</p>
                </div>
            </div>

            <div class="weather-details">
                <div class="detail-card">
                    <p class="detail-label">
                        💧 Humidity
                    </p>
                    <p class="detail-value">
                        ${humidity}<span class="detail-unit">%</span>
                    </p>
                </div>

                <div class="detail-card">
                    <p class="detail-label">
                        💨 Wind Speed
                    </p>
                    <p class="detail-value">
                        ${speed}<span class="detail-unit">m/s</span>
                    </p>
                </div>

                <div class="detail-card">
                    <p class="detail-label">
                        🔽 Pressure
                    </p>
                    <p class="detail-value">
                        ${pressure}<span class="detail-unit">hPa</span>
                    </p>
                </div>

                <div class="detail-card">
                    <p class="detail-label">
                        👁️ Visibility
                    </p>
                    <p class="detail-value">
                        ${(visibility / 1000).toFixed(1)}<span class="detail-unit">km</span>
                    </p>
                </div>
            </div>
        </div>
    `;

    // Update DOM
    elements.weatherDisplay.innerHTML = weatherHTML;

    // Show weather display
    hideLoading();
    hideError();
    elements.weatherDisplay.classList.add('show');

    // Clear input
    elements.cityInput.value = '';
};

// ===== WEATHER ICON MAPPING =====
const getWeatherEmoji = (iconCode) => {
    const iconMap = {
        '01d': '☀️',  // clear sky day
        '01n': '🌙',  // clear sky night
        '02d': '⛅',  // few clouds day
        '02n': '☁️',  // few clouds night
        '03d': '☁️',  // scattered clouds
        '03n': '☁️',
        '04d': '☁️',  // broken clouds
        '04n': '☁️',
        '09d': '🌧️',  // shower rain
        '09n': '🌧️',
        '10d': '🌦️',  // rain day
        '10n': '🌧️',  // rain night
        '11d': '⛈️',  // thunderstorm
        '11n': '⛈️',
        '13d': '❄️',  // snow
        '13n': '❄️',
        '50d': '🌫️',  // mist
        '50n': '🌫️'
    };

    return iconMap[iconCode] || '🌡️';
};

// ===== SEARCH HISTORY (localStorage) =====
const loadSearchHistory = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    
    if (stored) {
        try {
            // Parse JSON from localStorage
            searchHistory = JSON.parse(stored);
        } catch (error) {
            console.error('Failed to parse search history:', error);
            searchHistory = [];
        }
    }
};

const addToHistory = (city) => {
    // Convert to title case
    const formattedCity = city
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    // Remove if already exists (to avoid duplicates)
    searchHistory = searchHistory.filter(item => 
        item.toLowerCase() !== formattedCity.toLowerCase()
    );

    // Add to beginning of array
    searchHistory.unshift(formattedCity);

    // Limit history size
    if (searchHistory.length > MAX_HISTORY) {
        searchHistory = searchHistory.slice(0, MAX_HISTORY);
    }

    // Save to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(searchHistory));

    // Re-render history
    renderSearchHistory();
};

const renderSearchHistory = () => {
    if (searchHistory.length === 0) {
        elements.searchHistory.innerHTML = '';
        return;
    }

    // Use .map() to transform data into HTML
    const historyHTML = searchHistory.map(city => `
        <button class="history-item" data-city="${city}">
            🕐 ${city}
        </button>
    `).join('');

    const clearButton = `
        <button class="clear-history" id="clearHistory">
            🗑️ Clear History
        </button>
    `;

    elements.searchHistory.innerHTML = historyHTML + clearButton;
};

const clearHistory = () => {
    searchHistory = [];
    localStorage.removeItem(STORAGE_KEY);
    renderSearchHistory();
};

// ===== EVENT DELEGATION FOR HISTORY =====
const handleHistoryClick = (event) => {
    const historyItem = event.target.closest('.history-item');
    const clearBtn = event.target.closest('.clear-history');

    if (historyItem) {
        const city = historyItem.dataset.city;
        fetchWeatherData(city);
    } else if (clearBtn) {
        clearHistory();
    }
};

// ===== UI STATE MANAGEMENT =====
const showLoading = () => {
    elements.loading.classList.add('show');
    elements.error.classList.remove('show');
    elements.weatherDisplay.classList.remove('show');
};

const hideLoading = () => {
    elements.loading.classList.remove('show');
};

const showError = (message, title = 'Error') => {
    elements.errorTitle.textContent = title;
    elements.errorMessage.textContent = message;
    elements.error.classList.add('show');
    elements.loading.classList.remove('show');
    elements.weatherDisplay.classList.remove('show');
};

const hideError = () => {
    elements.error.classList.remove('show');
};

// ===== START APP =====
document.addEventListener('DOMContentLoaded', init);

// ===== DEMONSTRATION OF ES6+ FEATURES USED =====
/*
✅ SCOPE & DECLARATION:
   - const for all variables that don't change
   - let for variables that need reassignment (none in this app!)
   - Block scoping throughout

✅ MODERN FUNCTIONS:
   - Arrow functions everywhere: () => {}
   - Implicit returns in .map()
   - Proper 'this' binding in event handlers

✅ ARRAY METHODS:
   - .map() to transform search history into HTML
   - .filter() to remove duplicates from history
   - .join() to combine array into string

✅ DESTRUCTURING:
   - Object destructuring in displayWeather()
   - Extracting API response data elegantly

✅ DOM MANIPULATION:
   - querySelector for modern element selection
   - classList for class management
   - Dynamic content with template literals

✅ EVENT HANDLING:
   - addEventListener for all events
   - event.preventDefault() for form submission
   - Event delegation for history items

✅ ASYNC/AWAIT:
   - async functions for API calls
   - await for promises
   - try/catch for error handling

✅ LOCALSTORAGE:
   - JSON.stringify() to save objects
   - JSON.parse() to retrieve objects
   - Persistent dark mode and search history

✅ ERROR HANDLING:
   - Specific error messages for different scenarios
   - Graceful UI fallbacks
   - User-friendly error display
*/
