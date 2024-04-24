var theme = localStorage.getItem('isLightTheme');
var themecss = "/assets/css/main.css";
if (theme === "true") {
    themecss = "/assets/css/light.css";
}
 if (theme === undefined) {
  localStorage.setItem('isLightTheme', 'false');
 }
document.getElementById("themecss").href = themecss;
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

if (localStorage.getItem("engine") === undefined) {
    localStorage.setItem("engine", "https://google.com/search?q=%s")
}
document.head = document.head || document.getElementsByTagName('head')[0];

function changeFavicon(src) {
  var link = document.createElement('link'),
    oldLink = document.getElementById('dynamic-favicon');
  link.id = 'dynamic-favicon';
  link.rel = 'shortcut icon';
  link.href = src;
  if (oldLink) {
    document.head.removeChild(oldLink);
  }
  document.head.appendChild(link);
};

function applyCloakSettings() {
  const selectedSite = localStorage.getItem("selectedCloak");
  let titleName = "";
  var favicon = ""

  console.log("Selected Site:", selectedSite); // Log the selected site to ensure it's retrieved correctly
  switch (selectedSite) {
    case 'default':
      titleName = "Google";
      favicon = "/assets/imgs/icons/default.ico"
      break;
    case 'custom':
      titleName = localStorage.getItem("tabName") || "Google";
      favicon = localStorage.getItem("tagIcon") || "/assets/img/icons/default.ico"
      break;
    case 'clever':
      titleName = "Clever | Portal";
      favicon = "/assets/imgs/icons/clever.ico"
      break;
    case 'deltamath':
      titleName = "DeltaMath";
      favicon = "/assets/imgs/icons/deltamath.ico"
      break;
    case 'desmos':
      titleName = "Desmos | Scientific Calculator";
      favicon = "/assets/imgs/icons/desmos.ico"
      break;
    case 'edpuzzle':
      titleName = "Edpuzzle";
      favicon = "/assets/imgs/icons/edpuzzle.ico"
      break;
    case 'classroom':
      titleName = "Home";
      favicon = "/assets/imgs/icons/classroom.ico"
      break;
    case 'drive':
      titleName = "My Drive - Google Drive";
      favicon = "/assets/imgs/icons/drive.ico"
      break;
    case 'infinite-campus':
      titleName = "Home | Infinite Campus";
      favicon = "/assets/imgs/icons/infinite-campus.ico"
      break;
    case 'ixl':
      titleName = "IXL | Dashboard";
      favicon = "/assets/imgs/icons/ixl.ico"
      break;
    case 'getepic':
      titleName = "Epic! - Books for kids";
      favicon = "/assets/imgs/icons/epic.ico"
      break;
    case 'nearpod':
      titleName = "Nearpod";
      favicon = "/assets/imgs/icons/nearpod.ico"
      break;
    case 'prodigy':
      titleName = "Play Prodigy";
      favicon = "/assets/imgs/icons/prodigy.ico"
      break;
    case 'quizziz':
      titleName = "Join a Quizziz activity - Enter code - Join my quiz - Quizziz";
      favicon = "/assets/imgs/icons/quizizz.ico"
      break;
    case 'schoology':
      titleName = "Home | Schoology";
      favicon = "/assets/imgs/icons/schology.ico"
      break;
    case 'campbell':
      titleName = "Quality Soups, Sauces, Food & Recipes | campbell.com";
      favicon = "/assets/imgs/icons/campbell.ico"
      break;
    default:
      titleName = "Google";
      favicon = "/assets/imgs/icons/default.ico"

      break;
  }
  console.log("Title Name:", titleName);
  document.title = titleName;
  localStorage.setItem('favicon', favicon);
  changeFavicon(favicon);
}
function createAboutBlankWindow(url) {
    return window.open("about:blank");
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
        link.href = localStorage.getItem("favicon") || window.location.href + "/assets/imgs/icons/default.ico";
        aboutBlankWindow.document.head.appendChild(link);
        aboutBlankWindow.document.body.appendChild(iframe);
        window.location.href = localStorage.redirectLink;
    }
}

let autoOpen = localStorage.getItem("autoOpen") === "true";

if (autoOpen) {
    openPopup()
}

const savedColor = localStorage.getItem("themeColor");
if (savedColor) {
    document.documentElement.style.setProperty(
        "--theme-color",
        savedColor
    );

}


const savedColor2 = localStorage.getItem("shadowColor");
if (savedColor2) {
    document.documentElement.style.setProperty(
        "--shadow-color",
        savedColor2
    );

}

// Function to handle dropdown change
function toggleBackground() {
  var dropdown = document.getElementById("backgroundToggle");
  var isChecked = dropdown.value === "true"
  localStorage.setItem("backgroundToggle", isChecked);
}

// Function to load background settings from localStorage
function loadBackground() {
  var isChecked = localStorage.getItem("backgroundToggle") === "true";
  var backgroundImage = localStorage.getItem("backgroundImage");

  var dropdown = document.getElementById("backgroundToggle");
  dropdown.value = isChecked ? "true" : "false";

  document.getElementById("background").style.backgroundImage = "url('" + (backgroundImage) + "')";

  document.body.style.color = isChecked ? "#4c4c4c" : "#fff";
}

document.addEventListener("DOMContentLoaded", function () {
    loadBackground();
});

if (localStorage.getItem("backgroundImage")) {
    document.getElementById("background").style.backgroundImage =
        "url('" + localStorage.getItem("backgroundImage") + "')";
}

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

applyCloakSettings()
