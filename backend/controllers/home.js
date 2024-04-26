// Import the required modules
const path = require('path');


// Define the getHomePage function serve the homepage html
const getHomePage = (req, res) => {
    res
    .status(200)
    .sendFile(path.join(__dirname, '..','..', 'frontend', 'views', 'home.html'));
}


// Export controller functions 
module.exports = {
    getHomePage
}