var searchStored = localStorage.getItem("engine")
var searchSel = document.getElementById("searchSwitcher")

function switchSearch() {
  const selecter = document.getElementById("searchSwitcher");
  const selectedOption = selecter.value;
  var inputValue = document.getElementById('searchUrl').value;

  const finalValue = inputValue.trim() !== '' ? inputValue : selectedOption;
  localStorage.setItem("engine", finalValue);
};

function saveSelectedProxyOption() {
  var selectedOption = document.getElementById("proxySwitcher").value;
  localStorage.setItem("proxy", selectedOption);
}

function loadSavedProxyOption() {
  var savedOption = localStorage.getItem("proxy");
  if (savedOption) {
    document.getElementById("proxySwitcher").value = savedOption;
  }
}


document.getElementById("proxySwitcher").addEventListener("change", function () {
  saveSelectedProxyOption();
  location.reload();
});

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
    document.getElementById("redirectLinkInput").value = redirectLink;
  }
}

function checkPanicValues() {
  let panicKey = localStorage.getItem("panicKey");
  let redirectLink = localStorage.getItem("redirectLink");
  document.getElementById("panicKeyInput").value = panicKey;
  document.getElementById("redirectLinkInput").value = redirectLink;
}

function savePanicKey() {
  const panicKey = document.getElementById("panicKeyInput").value;
  const redirectLink = document.getElementById("redirectLinkInput").value;
  localStorage.setItem("panicKey", panicKey);
  localStorage.setItem("redirectLink", redirectLink);
  location.reload();
}

function resetPanicKey() {
  document.getElementById("panicKeyInput").value = "";
  localStorage.removeItem("panicKey");
  document.getElementById("redirectLinkInput").value = "";
  localStorage.removeItem("redirectLink");
  checkUnsetPanic();
}

window.addEventListener("keydown", function (event) {
  const panicKey = localStorage.getItem("panicKey");
  if (event.key === panicKey) {
      const redirectLink = localStorage.getItem("redirectLink");
      window.location.href = redirectLink;
  }
});

function createAboutBlankWindow(url) {
  return window.open("about:blank");
}

let autoOpen = localStorage.getItem("autoOpen") === "true";
document.getElementById("autoOpenCheckbox").checked = autoOpen;

function toggleAutoOpen() {
  autoOpen = !autoOpen;
  localStorage.setItem("autoOpen", autoOpen);
}

function openPopup() {
  if (window === window.top) {
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
function saveTabSettings() {
  const siteSelect = document.getElementById("siteSelect");
  const selectedSite = siteSelect.value;
  const iconInput = document.getElementById("iconInput").value;
  const nameInput = document.getElementById("nameInput").value;

  localStorage.setItem("selectedSite", selectedSite);
  localStorage.setItem("tabIcon", iconInput);
  localStorage.setItem("tabName", nameInput);

  applyTabSettings();
}

function applyTabSettings() {
  const selectedSite = localStorage.getItem("selectedSite");
  const tabIcon = localStorage.getItem("tabIcon");
  const tabName = localStorage.getItem("tabName");

  if (selectedSite !== "default") {
    const favicon = document.querySelector("link[rel='icon']");
    if (favicon) {
      favicon.href = `https://example.com/${selectedSite}-favicon.ico`;
    }
  }

  if (tabIcon) {
    const favicon = document.querySelector("link[rel='icon']");
    if (favicon) {
      favicon.href = tabIcon;
    }
  }

  if (tabName) {
    document.title = tabName;
  }
}

function resetCloak() {
  localStorage.removeItem("selectedSite");
  localStorage.removeItem("tabIcon");
  localStorage.removeItem("tabName");

  applyTabSettings();
}

applyTabSettings();


if (autoOpen) {
  openPopup()
}

window.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
      openPopup();
  }
});


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


const saveButton = document.getElementById("saveColors");
const resetButton = document.getElementById("resetColors");

saveButton.addEventListener("click", function () {
    const themeColor = colorPicker.value;
    const shadowColor = colorPicker2.value;

    localStorage.setItem("themeColor", themeColor);
    localStorage.setItem("shadowColor", shadowColor);

    location.reload();
});

resetButton.addEventListener("click", function () {
    localStorage.removeItem("themeColor");
    localStorage.removeItem("shadowColor");

    document.documentElement.style.setProperty("--theme-color", "#00FF7F");
    document.documentElement.style.setProperty("--shadow-color", "#00FF7F");
    location.reload();
});

window.addEventListener("load", function () {
    const savedThemeColor = localStorage.getItem("themeColor");
    const savedShadowColor = localStorage.getItem("shadowColor");

    if (savedThemeColor) {
        document.documentElement.style.setProperty("--theme-color", savedThemeColor);
        colorPicker.value = savedThemeColor;
    }

    if (savedShadowColor) {
        document.documentElement.style.setProperty("--shadow-color", savedShadowColor);
        colorPicker2.value = savedShadowColor;
    }

});


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

searchSel.value = searchStored;
window.addEventListener("load", loadSavedProxyOption);
window.addEventListener("load", checkUnsetPanic);
window.addEventListener("load", checkPanicValues);
if ( localStorage.getItem("engine") === undefined ) {
  localStorage.setItem("engine", "https://google.com/search?q=%s")
}