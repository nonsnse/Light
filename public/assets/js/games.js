let games = JSON.parse(localStorage.getItem('games'));

// Function to fetch JSON data from the file
// Function to fetch JSON data from the file and update localStorage
async function fetchGameData() {
  try {
      const response = await fetch("/assets/json/g.json");
      const jsonGames = await response.json(); // Fetch JSON data
      const storedGames = JSON.parse(localStorage.getItem('games')) || []; // Get games from localStorage

      // Filter out duplicates from jsonGames
      const uniqueGames = jsonGames.filter(newGame => {
          return !storedGames.some(existingGame => existingGame.name.toLowerCase() === newGame.name.toLowerCase());
      });

      // Combine uniqueGames with storedGames
      const updatedGames = [...storedGames, ...uniqueGames];

      // Sort the updated games alphabetically
      updatedGames.sort((a, b) => a.name.localeCompare(b.name));

      localStorage.setItem('games', JSON.stringify(updatedGames)); // Update localStorage
      renderGames(); // Render games after fetching and updating data
  } catch (error) {
      console.error("Error fetching JSON data:", error);
  }
}


// Check if games is empty in localStorage, then fetch data from JSON file if necessary
if (!games || games.length === 0) {
    fetchGameData();
} else {
    renderGames(); // Render games from localStorage
}

// Function to handle category selection change
function handleCategoryChange() {
  const selectedCategory = document.getElementById("categoryDropdown").value;
  
  // Filter games based on the selected category
  let filteredGames = games;
  if (selectedCategory !== "all") {
      filteredGames = games.filter(game => game.categories.includes(selectedCategory));
  }

  // Render filtered games
  renderGames(filteredGames);
}


// Save the state of games to localStorage
function saveGameData() {
    localStorage.setItem('games', JSON.stringify(games));
}

// Add a new game to the collection of games
function addGame() {
  const name = prompt("Enter the name of the game:");
  const link = prompt("Enter the link to the game:");
  const image = prompt("Enter the URL of the game image:");

  // Preventing the addition of duplicate games
  const exists = games.some(game => game.name.toLowerCase() === name.toLowerCase());
  if (exists) {
    alert('A game with this name already exists.');
    return;
  }

  if (name && link && image) {
    const newGame = {
      name: "Custom:" + name,
      link: link,
      image: image,
      categories: ["all", "custom"] // Assuming no categories for custom games
    };

    // Add the new game to gamesData
    games.push(newGame);
    games.sort((a, b) => a.name.localeCompare(b.name)); // Keep the games sorted after addition
    renderGames();
    saveGameData(); // Save to localStorage after adding a new game
  } else {
    alert('Please ensure all fields are filled in correctly.');
  }
}

function addCustomGame(name, link, image) {
  if (!name || !link || !image) {
    alert('Please ensure all fields for the custom game are filled in correctly.');
    return false; // Do not proceed with adding the game.
  }

  const existingGameIndex = games.findIndex(game => game.name.toLowerCase() === name.toLowerCase());
  if (existingGameIndex !== -1) {
    alert('A game with this name already exists.');
    return false; // Do not proceed with adding the game.
  }

  const newCustomGame = { name, link, image,  categories: ["all", "custom"]};
  games.push(newCustomGame);
  saveGameData(); // Save the updated games array.
  renderGames(); // Re-render the game list.

  return true; // Successfully added the game.
}

// Render the games, filtering them if a search query is provided
function renderGames(filteredGames = games) {
  const gamesGrid = document.getElementById('gamesGrid');

  // Clear previous games
  gamesGrid.innerHTML = `<div class="app" onclick="launch('https://forms.gle/uMbusHTjMuh3RpqB9')">
  <img src="/assets/imgs/a/request.png">
  <p>! Request a game</p>
  </div>
  <div class="app" id="addCustomGameBtn">
  <img src="/assets/imgs/a/custom.png">
  <p>Add a custom game</p>
  </div> `;

  const sortedGames = [...filteredGames];

    // Sort the copied array alphabetically
    sortedGames.sort((a, b) => a.name.localeCompare(b.name));

    // Render each game using the provided getGameElement function
    sortedGames.forEach((game) => {
    const gameElement = document.createElement("div");
    gameElement.className = "app";
    gameElement.onclick = function () {
        launch(game.link);
    };

    const imgElement = document.createElement("img");
    imgElement.src = game.image;

    const pElement = document.createElement("p");
    pElement.textContent = game.name;

    gameElement.appendChild(imgElement);
    gameElement.appendChild(pElement);

    gamesGrid.appendChild(gameElement);
  });
}

// Filter the games based on the search query
function searchGames() {
  const searchQuery = document.getElementById('searchBar').value.trim().toLowerCase();
  const filteredGames = games.filter(game => game.name.toLowerCase().includes(searchQuery));
  renderGames(filteredGames);
}

// Clear the form fields
function clearForm() {
  document.getElementById('gameName').value = '';
  document.getElementById('gameUrl').value = '';
  document.getElementById('gameImgUrl').value = '';
}

// Bind the form submission function and render the games on window load
window.onload = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const searchQuery = searchParams.get('search');
  if (searchQuery) {
    document.getElementById('searchBar').value = searchQuery;
    searchGames();
  } else {
    renderGames();
  }
  document.getElementById('searchBar').addEventListener('input', searchGames);

  // Add event listener for category selection change
document.getElementById("categoryDropdown").addEventListener("change", handleCategoryChange);


  // Add event listener for adding custom game
  document.getElementById('addCustomGameBtn').addEventListener('click', function () {
    const name = prompt("Enter the name of the game:");
    const url = prompt("Enter the link to the game:");
    const imgUrl = prompt("Enter the URL of the game image:");

    if (addCustomGame(name, url, imgUrl)) {
      renderGames(); // Render the games after adding one.
    }
  });
};

function selectRandomGame() {
  // Select a random index within the range of gamesData length
  const randomIndex = Math.floor(Math.random() * games.length);
  
  // Get the corresponding game element
  const gameElement = document.querySelectorAll('.app')[randomIndex];

  // Simulate a click on the selected game element
  gameElement.click();
}
