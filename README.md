# Streamfinder Project

## Description

Streamfinder is a sleek, user-friendly web application that helps users discover where to watch their favorite movies and TV shows across various streaming platforms. It leverages The Movie Database (TMDB) API to search for titles and identify which streaming services offer them in the user's region.

The application features a modern, responsive interface that works on both desktop and mobile devices, making it easy to find content wherever you are.

## Features

- **Search for Movies and TV Shows**: Find detailed information about movies and TV shows
- **Streaming Service Links**: Direct links to where content can be watched
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Content Details**: View release year, overview, and streaming availability
- **Separate Movies and TV Shows**: Toggle between movies and TV shows for better search results
- **Multiple Streaming Options**: See where content is available for streaming, renting, or purchase

## Setup

### Prerequisites

- A TMDB API key (free to obtain)
- A web browser
- Basic knowledge of HTML/CSS/JavaScript (for any customization)

### Getting Started

1. **Obtain a TMDB API key:**
   - Visit [The Movie Database website](https://www.themoviedb.org/)
   - Create an account or log in
   - Go to your account settings
   - Navigate to the API section
   - Request an API key for non-commercial use

2. **Set up the application:**
   - Download or clone all project files to your local machine
   - Open the `script.js` file in a text editor
   - Replace my API_KEY with your actual TMDB API key
   - Save the file

3. **Run the application:**
   - Open the `index.html` file in a web browser
   - Alternatively, deploy the files to a web server for online access

## Usage

1. **Search for a movie or TV show:**
   - Enter the title in the search input field
   - Click the "Search" button or press Enter

2. **Toggle between Movies and TV Shows:**
   - Click on the "Movies" or "TV Shows" tab to specify the type of content you're searching for

3. **View search results:**
   - Each result displays:
     - Title
     - Release year
     - Brief overview
     - Poster image (when available)
     - List of streaming services where the title is available

4. **Access streaming services:**
   - Click on any streaming service name to be taken directly to that service
   - The application will open a search for your selected title on that platform
   - Separate sections show where content is available for streaming, renting, or purchasing

## Customization

You can customize this application in several ways:

- **Styling**: Modify the `style.css` file to change the appearance
- **Adding services**: Add more streaming services and their URLs in the `streamingBaseUrls` object in `script.js`
- **Change regions**: Modify the code to display results for regions other than the US

## API Usage Notes

- The application uses the TMDB Search API to find movies and TV shows
- It uses the TMDB Watch Providers API to get information about streaming services
- Results are limited to the first 10 matches for performance reasons
- Streaming availability is currently shown for the US region only

## Important Security Note

The current implementation includes the API key directly in the JavaScript code, which is not recommended for production use. In a real-world scenario, you should:

- Use a backend server to proxy requests to the TMDB API
- Store your API key securely as an environment variable
- Implement proper authentication methods

## Browser Compatibility

This application works on all modern browsers:
- Chrome (recommended)
- Firefox
- Safari
- Edge

## Troubleshooting

If you encounter issues:

1. **No results displayed**: Verify your API key is correct and active
2. **CORS errors**: Some browsers may block API requests due to CORS policies when running locally
3. **Streaming links don't work**: Verify the streaming service base URLs are correct and up-to-date

## Future Enhancements

Potential improvements for future versions:
- User accounts for saving favorite shows
- Notifications when content becomes available on selected services
- Advanced filtering options (genre, year, rating)
- Trailer playback integration

## Disclaimer

This project uses the TMDB API but is not endorsed or certified by TMDB. It is for educational purposes only. All data is provided by The Movie Database (TMDB).

The streaming service information may not be comprehensive or up-to-date. Users should verify availability on the respective streaming platforms.

Please respect the TMDB API terms of use and rate limits when using this application.

## License

This project is released under the MIT License.
