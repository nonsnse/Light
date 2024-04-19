function checkUnsetPanic() {
    let panicKey = localStorage.getItem("panicKey");
    let redirectLink = localStorage.getItem("redirectLink");

    if (!panicKey) {
        panicKey = "`";
        localStorage.setItem("panicKey", panicKey);
        document.getElementById("panicKeyInput").value = panicKey;
    }

    if (!redirectLink) {
        redirectLink = "https://desmos.com/scientific";
        localStorage.setItem("redirectLink", redirectLink);
    }
}

checkUnsetPanic();

window.addEventListener("keydown", function (event) {
    const panicKey = localStorage.getItem("panicKey");
    if (event.key === panicKey) {
        const redirectLink = localStorage.getItem("redirectLink");
        window.location.href = redirectLink;
    }
});
function openAboutBlankWindow() {
    return window.open("about:blank");
}

function openPopup() {
    if (window === window.top) { // Check if it's the top window
        const aboutBlankWindow = createAboutBlankWindow();
        const iframe = document.createElement("iframe");
        iframe.src = window.location.href;
        iframe.style.width = "100%";
        iframe.style.height = "100%";
        iframe.style.border = "none";
        iframe.style.frameborder = "0";
        iframe.style.marginwidth = "0";
        iframe.style.position = "fixed";
        iframe.style.inset = "0px";
        iframe.style.outline = "none";
        iframe.style.scrolling = "auto";
        aboutBlankWindow.document.title = document.title;
        const link = aboutBlankWindow.document.createElement("link");
        link.rel = "icon";
        link.type = "image/x-icon";
        link.href = "https://www.google.com/favicon.ico"; // Change this to your preferred favicon
        aboutBlankWindow.document.head.appendChild(link);
        aboutBlankWindow.document.body.appendChild(iframe);
    }
}

let autoOpen = localStorage.getItem("autoOpen") === "true";

if (autoOpen) {
    openPopup()
}
const colorPicker = document.getElementById("colorPicker");
colorPicker.addEventListener("input", function () {
    document.documentElement.style.setProperty(
        "--theme-color",
        colorPicker.value
    );
    localStorage.setItem("themeColor", colorPicker.value);
});

const savedColor = localStorage.getItem("themeColor");
if (savedColor) {
    document.documentElement.style.setProperty(
        "--theme-color",
        savedColor
    );
    colorPicker.value = savedColor;
}

const colorPicker2 = document.getElementById("colorPicker2");
colorPicker2.addEventListener("input", function () {
    document.documentElement.style.setProperty(
        "--shadow-color",
        colorPicker2.value
    );
    localStorage.setItem("shadowColor", colorPicker2.value);
});

const savedColor2 = localStorage.getItem("shadowColor");
if (savedColor2) {
    document.documentElement.style.setProperty(
        "--shadow-color",
        savedColor2
    );
    colorPicker2.value = savedColor2;
}


const colorPicker3 = document.getElementById("colorPicker3");
colorPicker3.addEventListener("input", function () {
    document.documentElement.style.setProperty(
        "--bgshadow-color",
        colorPicker3.value
    );
    localStorage.setItem("bgshadowColor", colorPicker3.value);
});

const savedColor3 = localStorage.getItem("bgshadowColor");
if (savedColor3) {
    document.documentElement.style.setProperty(
        "--bgshadow-color",
        savedColor3
    );
    colorPicker3.value = savedColor3;
}

// Function to toggle the background color
function toggleBackground() {
    // Check the current state of the checkbox
    var isChecked = document.getElementById("backgroundToggle").checked;

    // Set the background color based on the checkbox state
    document.body.style.backgroundColor = isChecked ? "white" : "#212121";
    document.body.style.color = isChecked ? "#4c4c4c" : "#fff";


    // Save the state to local storage
    localStorage.setItem("backgroundToggle", isChecked);
}

// Function to load the saved background color
function loadBackground() {
    // Get the saved state from local storage
    var isChecked = localStorage.getItem("backgroundToggle") === "true";

    // Set the checkbox state and background color
    document.getElementById("backgroundToggle").checked = isChecked;
    toggleBackground();
}

// Add event listener to the checkbox
document.addEventListener("DOMContentLoaded", function () {
    var checkbox = document.getElementById("backgroundToggle");
    checkbox.addEventListener("change", toggleBackground);

    // Load the background color when the page is loaded
    loadBackground();
});
// Check for saved background in localStorage
if (localStorage.getItem("backgroundImage")) {
    document.getElementById("background").style.backgroundImage =
        localStorage.getItem("backgroundImage");
}

document
    .getElementById("upload-img")
    .addEventListener("click", function () {
        document.getElementById("file-input").click();
    });

document
    .getElementById("file-input")
    .addEventListener("change", function (event) {
        var file = event.target.files[0];
        var reader = new FileReader();
        reader.onload = function (e) {
            var backgroundImage = "url(" + e.target.result + ")";
            document.getElementById(
                "background"
            ).style.backgroundImage = backgroundImage;
            localStorage.setItem("backgroundImage", backgroundImage);
        };
        reader.readAsDataURL(file);
    });

document
    .getElementById("reset-img")
    .addEventListener("click", function () {
        // Reset the background to the default state
        document.getElementById("background").style.backgroundImage =
            "";
        localStorage.removeItem("backgroundImage");
    });

function myClock() {
    setTimeout(function () {
        const d = new Date();
        const n = d.toLocaleTimeString();
        document.getElementById("time").innerHTML = n;
        myClock();
    }, 1000);
}
myClock();

var elem = document.documentElement;

function openFullscreen() {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
        /* Safari */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
        /* IE11 */
        elem.msRequestFullscreen();
    }
}

function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        /* Safari */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        /* IE11 */
        document.msExitFullscreen();
    }
}
document.addEventListener("DOMContentLoaded", () => {
    const currentUrl = "https://desmos.com";
    const defaultKey = "`";
    let triggerKey = defaultKey;

    function updateTriggerKey(value) {
        triggerKey = value.slice(0, 1); // Limit to the first character
    }

    document
        .getElementById("keyInput")
        .addEventListener("input", (e) => {
            updateTriggerKey(e.target.value);
        });

    document
        .getElementById("keyInput")
        .addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                updateTriggerKey(e.target.value);
                e.preventDefault(); // Prevent form submission if inside a form
            }
        });

    document.addEventListener("keydown", (e) => {
        if (e.key === triggerKey) {
            window.location.href = currentUrl;
        }
    });
});

function openGame() {
    var win = window.open();
    var url = window.location.href;
    var iframe = win.document.createElement("iframe");
    iframe.style.frameborder = "0";
    iframe.style.marginwidth = "0";
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.border = "none";
    iframe.style.position = "fixed";
    iframe.style.inset = "0px";
    iframe.style.outline = "none";
    iframe.style.scrolling = "auto";
    iframe.src = url;
    win.document.title = "Google";
    var link = win.document.createElement("link");
    link.rel = "icon";
    link.type = "image/x-icon";
    link.href = "https://www.google.com/favicon.ico";
    win.document.head.appendChild(link);
    win.document.body.appendChild(iframe);
}

window.onload = function () {
    // Array of splash messages
    var splashes = [
        "Join our Discord!",
        "12K users daily!",
        "Fast, Simple, Easy."
    ];

    // Get the last displayed index from local storage, or start at 0
    var lastIndex = parseInt(localStorage.getItem('splashIndex')) || 0;

    // Calculate the next index
    var nextIndex = (lastIndex + 1) % splashes.length;

    // Display the next splash message
    document.getElementById('splash-text').textContent = splashes[nextIndex];

    // Update the index in local storage
    localStorage.setItem('splashIndex', nextIndex);
}