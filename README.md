# WeatherNow - Live Weather Tracker 🌤️

A modern, responsive weather application built with vanilla JavaScript (ES6+), demonstrating core web development concepts including API integration, localStorage, and dynamic DOM manipulation.

## 🎯 Project Overview

This project fulfills all requirements of Assignment 1: The JavaScript Developer's Handbook & Capstone Integration. It showcases mastery of:

- **Modern JavaScript (ES6+)**: Arrow functions, destructuring, template literals, async/await
- **DOM Manipulation**: Dynamic content generation, event delegation
- **API Integration**: RESTful API calls with proper error handling
- **Data Persistence**: localStorage for search history and user preferences
- **Responsive Design**: Mobile-first CSS with dark mode

## ✨ Features

### Core Functionality
- 🔍 **Live Weather Search**: Search any city worldwide
- 🌡️ **Real-time Data**: Temperature, humidity, wind speed, pressure, visibility
- 📍 **Search History**: Quick access to recent searches (saved in localStorage)
- 🌓 **Dark Mode**: Toggle between light and dark themes (preference saved)
- 📱 **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- ⚡ **Error Handling**: Graceful error messages for network failures and invalid cities

### Technical Highlights
- **Zero external dependencies**: Pure vanilla JavaScript
- **Modern ES6+ syntax**: Throughout the codebase
- **Accessible UI**: Semantic HTML and ARIA labels
- **Performance optimized**: Minimal API calls, efficient DOM updates
- **Clean code**: Well-commented and organized

## 🛠️ Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern layouts with Flexbox/Grid, CSS variables, animations
- **JavaScript ES6+**: Async/await, modules pattern, array methods
- **OpenWeatherMap API**: Free weather data API
- **localStorage**: Browser-based data persistence

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Text editor (VS Code, Sublime, etc.)
- Git (for deployment)

### Local Setup

1. **Download the project files**
   ```
   weather-app/
   ├── index.html
   ├── styles.css
   ├── app.js
   └── README.md
   ```

2. **Open the project**
   - Simply open `index.html` in your web browser
   - Or use a local server:
     ```bash
     # Python 3
     python -m http.server 8000
     
     # Or use VS Code Live Server extension
     ```

3. **Test the app**
   - Search for any city (e.g., "London", "New York", "Tokyo")
   - Try dark mode toggle
   - Check search history

## 📦 Deployment to GitHub Pages

### Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon → "New repository"
3. Name it: `weather-app` (or any name you prefer)
4. Make it **Public**
5. Click "Create repository"

### Step 2: Upload Files

**Option A: Using GitHub Web Interface (Easiest)**
1. On your new repository page, click "uploading an existing file"
2. Drag and drop all files (`index.html`, `styles.css`, `app.js`, `README.md`)
3. Click "Commit changes"

**Option B: Using Git Commands**
```bash
# Initialize git in your project folder
cd weather-app
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Weather app"

# Connect to GitHub
git remote add origin https://github.com/YOUR_USERNAME/weather-app.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll down to **Pages** section (left sidebar)
4. Under "Source", select:
   - Branch: `main`
   - Folder: `/ (root)`
5. Click **Save**
6. Wait 1-2 minutes

### Step 4: Get Your Live URL

Your app will be live at:
```
https://YOUR_USERNAME.github.io/weather-app/
```

Example: `https://johndoe.github.io/weather-app/`

## 🎨 Alternative Deployment: Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "New Project"
4. Import your GitHub repository
5. Click "Deploy"
6. Get instant live URL: `https://weather-app-xyz.vercel.app`

## 📝 API Configuration

The app uses OpenWeatherMap's free tier API. The included API key is for demonstration purposes.

### Get Your Own API Key (Optional)

1. Sign up at [OpenWeatherMap](https://openweathermap.org/api)
2. Get your free API key
3. Replace in `app.js`:
   ```javascript
   const API_KEY = 'YOUR_API_KEY_HERE';
   ```

**Free tier limits:**
- 60 calls/minute
- 1,000,000 calls/month

## 🎓 Learning Outcomes Demonstrated

### Part 1: ES6+ Fundamentals
- ✅ `const`/`let` usage (no `var`)
- ✅ Arrow functions with implicit returns
- ✅ `.map()`, `.filter()` for data transformation
- ✅ Object destructuring in API responses
- ✅ Spread operator for array manipulation

### Part 2: DOM Manipulation
- ✅ `querySelector` for element selection
- ✅ Dynamic HTML generation with template literals
- ✅ Event delegation for efficient event handling
- ✅ `classList` methods for styling
- ✅ localStorage with JSON.stringify/parse

### Part 3: Asynchronous JavaScript
- ✅ `async/await` for API calls
- ✅ `try/catch` error handling
- ✅ Promise-based fetch with timeout
- ✅ Specific error messages for different scenarios
- ✅ Loading states and user feedback

## 🎯 Assignment Requirements Checklist

- ✅ **Live Data**: Fetches from OpenWeatherMap API
- ✅ **Interaction**: Search input triggers API call
- ✅ **Dynamic DOM**: All content generated via JavaScript
- ✅ **Persistence**: Search history and dark mode saved in localStorage
- ✅ **Robustness**: Comprehensive error handling with user-friendly messages
- ✅ **Hosted**: Deployable to GitHub Pages/Vercel

## 🐛 Troubleshooting

### Common Issues

**Problem**: "City not found"
- **Solution**: Check spelling, try adding country code (e.g., "London, UK")

**Problem**: API not working
- **Solution**: Check internet connection, API key might be rate-limited

**Problem**: Dark mode not persisting
- **Solution**: Check if browser allows localStorage (incognito mode blocks it)

**Problem**: GitHub Pages not updating
- **Solution**: Wait 5 minutes, hard refresh browser (Ctrl+Shift+R)

## 📄 File Structure

```
weather-app/
│
├── index.html          # Main HTML structure
├── styles.css          # All styling and animations
├── app.js              # JavaScript logic and API integration
└── README.md           # This file
```

## 🌟 Future Enhancements

Potential features to add:
- 5-day forecast
- Weather maps
- Geolocation for current location weather
- Multiple city comparison
- Temperature unit toggle (°C/°F)
- Weather alerts and notifications

## 📧 Support

If you encounter issues:
1. Check browser console (F12) for errors
2. Verify API key is working
3. Ensure all files are in the same directory

## 📜 License

This project is created for educational purposes as part of a JavaScript development course.

---

**Built with ❤️ using vanilla JavaScript**


