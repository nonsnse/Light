let gamesData = []; // Define gamesData as a global variable
let selectedCategory = 'all'; // Define selectedCategory as a global variable and initialize it to 'all'

// Function to create game elements
function getGameElement(game) {
    const gameElement = document.createElement('div');
    gameElement.className = 'app';
    gameElement.onclick = function() {
        launch(game.link);
    };

    const imgElement = document.createElement('img');
    imgElement.src = game.image;

    const pElement = document.createElement('p');
    pElement.textContent = game.name;

    gameElement.appendChild(imgElement);
    gameElement.appendChild(pElement);

    return gameElement;
}

// Function to render games based on the selected category
function renderGames(filteredGames = []) {
    const gamesGrid = document.getElementById('gamesGrid');
    gamesGrid.innerHTML = `<div class="app" onclick="launch('https://forms.gle/uMbusHTjMuh3RpqB9')">
    <img src="/assets/imgs/a/request.png">
    <p>! Request a game</p>
    </div> `; // Clear previous games
    filteredGames.sort((a, b) => a.name.localeCompare(b.name));
    // Render each game using the provided getGameElement function
    filteredGames.forEach(game => {
        const gameElement = getGameElement(game);
        gamesGrid.appendChild(gameElement);
    });
}

// Function to perform search and render filtered games
function searchAndFilterGames() {
    const searchQuery = document.getElementById('searchBar').value.toLowerCase();
    const filteredGames = gamesData.filter(game => {
        const matchesSearch = game.name.toLowerCase().includes(searchQuery);
        const matchesCategory = selectedCategory === 'all' || game.categories.includes(selectedCategory);
        return matchesSearch && matchesCategory;
    });
    renderGames(filteredGames);
}

// Function to handle category selection change
function handleCategoryChange() {
    selectedCategory = this.value; // Update selectedCategory to the selected value
    searchAndFilterGames(); // Perform search and filter based on the selected category
}

// Function to fetch JSON data from the file
async function fetchGameData() {
    try {
        const response = await fetch('/assets/json/g.json');
        gamesData = await response.json(); // Assign gamesData to the global variable
        return gamesData;
    } catch (error) {
        console.error('Error fetching JSON data:', error);
        return [];
    }
}

// Function to initialize the page
async function initializePage() {
    // Fetch JSON data and render games on window load
    await fetchGameData();
    renderGames(gamesData);

    // Add event listener for search input
    document.getElementById('searchBar').addEventListener('input', searchAndFilterGames);

    // Add event listener for category selection change
    document.getElementById('categoryDropdown').addEventListener('change', handleCategoryChange);
}

// Call initializePage() to initialize the page
initializePage();
