let appsData = []; // Define appsData as a global variable
let selectedCategory = "all"; // Define selectedCategory as a global variable and initialize it to 'all'

// Function to create app elements
function getAppElement(app) {
  const appElement = document.createElement("div");
  appElement.className = "app";
  appElement.onclick = function () {
    launch(app.link);
  };

  const imgElement = document.createElement("img");
  imgElement.src = app.image;

  const pElement = document.createElement("p");
  pElement.textContent = app.name;

  appElement.appendChild(imgElement);
  appElement.appendChild(pElement);

  return appElement;
}

// Function to render apps based on the selected category
function renderApps(filteredApps = []) {
  const appsGrid = document.getElementById("appsGrid");
  appsGrid.innerHTML = `<div class="app" onclick="launch('https://forms.gle/uMbusHTjMuh3RpqB9')">
    <img src="/assets/imgs/a/request.png">
    <p>! Request an app</p>
    </div> `; // Clear previous apps

  filteredApps.sort((a, b) => a.name.localeCompare(b.name));

  // Render each app using the provided getAppElement function
  filteredApps.forEach((app) => {
    const appElement = getAppElement(app);
    appsGrid.appendChild(appElement);
  });
}

// Function to perform search and render filtered apps
function searchAndFilterApps() {
  const searchQuery = document.getElementById("searchBar").value.toLowerCase();
  const filteredApps = appsData.filter((app) => {
    const matchesSearch = app.name.toLowerCase().includes(searchQuery);
    const matchesCategory = selectedCategory === "all" || app.categories.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });
  renderApps(filteredApps);
}

// Function to handle category selection change
function handleCategoryChange() {
  selectedCategory = this.value; // Update selectedCategory to the selected value
  searchAndFilterApps(); // Perform search and filter based on the selected category
}

// Function to fetch JSON data from the file
async function fetchAppData() {
  try {
    const response = await fetch("/assets/json/a.json");
    appsData = await response.json(); // Assign appsData to the global variable
    return appsData;
  } catch (error) {
    console.error("Error fetching JSON data:", error);
    return [];
  }
}

// Function to initialize the page
async function initializePage() {
  // Fetch JSON data and render apps on window load
  await fetchAppData();
  renderApps(appsData);

  // Add event listener for search input
  document.getElementById("searchBar").addEventListener("input", searchAndFilterApps);

  // Add event listener for category selection change
  document.getElementById("categoryDropdown").addEventListener("change", handleCategoryChange);
}

// Call initializePage() to initialize the page
initializePage();