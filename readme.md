# Currency Converter

A responsive, modern currency converter application that supports multiple currencies with real-time exchange rates.

## Features

- 🌍 Support for 150+ currencies
- 💱 Real-time exchange rate conversion
- 🔄 Quick currency swap functionality
- 📱 Fully responsive design (mobile, tablet, desktop)
- 🎨 Modern, clean UI with smooth animations
- 🚀 Fast and lightweight

## Technologies Used

- HTML5
- CSS3 (with Flexbox and Grid)
- Vanilla JavaScript
- Axios for API requests
- Font Awesome icons
- FX Rates API for exchange rates
- Flags API for country flags

## Project Structure

```
currency-converter/
│
├── index.html          # Main HTML file
├── styles.css          # Responsive styles
├── script.js           # JavaScript logic
├── countryList.js      # Currency to country code mapping
└── README.md           # Documentation
```

## Setup & Installation

1. **Clone or download the project**
   ```bash
   git clone <your-repo-url>
   cd currency-converter
   ```

2. API Key Setup ⚠️ IMPORTANT
To ensure the app can fetch real-time exchange rates securely, follow these steps:
Get your Key: Register at fxratesapi.com to obtain your free API key.
Local Configuration:
Create a file named .env in the root of your project.
Add your key using the Vite-specific prefix: VITE_FX_API_KEY=your_actual_key_here.
Security: Ensure .env is listed in your .gitignore to prevent your secret key from being exposed on GitHub.
Vercel Deployment:
Go to your Vercel Dashboard > Settings > Environment Variables.
Add a new variable with the Name VITE_FX_API_KEY and paste your key as the Value.

3. **Run locally**
   - Simply open `index.html` in your browser
   - Or use a local server:
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js (http-server)
     npx http-server
     ```

## Deployment

https://currency-convertor-mu-nine.vercel.app/


## Configuration

### Changing Default Currencies

Edit `script.js`:
```javascript
const DEFAULT_FROM = "USD";  // Change default "from" currency
const DEFAULT_TO = "INR";    // Change default "to" currency
```

### Customizing Colors

Edit `styles.css`:
```css
body {
    background: linear-gradient(135deg, #2c3e37 0%, #3a4e48 100%);
    /* Change gradient colors */
}

.container {
    background-color: #6a7b76; /* Change container color */
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Responsive Breakpoints

- Desktop: > 768px
- Tablet: 481px - 768px
- Mobile: < 480px
- Extra Small: < 360px

## API Rate Limits

The free tier of FX Rates API typically includes:
- 1,000 requests/month
- Updates every hour

For production use, consider upgrading to a paid plan.

## Known Issues & Solutions

**Issue: API rate limit exceeded**
- Solution: Wait an hour or upgrade API plan

**Issue: CORS errors locally**
- Solution: Use a local server instead of opening HTML directly

**Issue: Flags not loading**
- Solution: Check internet connection; flags are loaded from external API

## Future Enhancements

- [ ] Add historical exchange rate charts
- [ ] Save favorite currency pairs
- [ ] Offline support with Service Workers
- [ ] Dark/Light theme toggle
- [ ] Multiple currency conversion at once
- [ ] Currency trend indicators

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Credits

- Exchange rates: [FX Rates API](https://fxratesapi.com/)
- Country flags: [Flags API](https://flagsapi.com/)
- Icons: [Font Awesome](https://fontawesome.com/)

## Support

For issues or questions, please open an issue on GitHub.

---

Made with ❤️ for currency conversion
