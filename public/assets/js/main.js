var theme = localStorage.getItem("isLightTheme");
var themecss = "/assets/css/main.css";
if (theme === "true") {
  themecss = "/assets/css/light.css";
}
if (theme === undefined) {
  localStorage.setItem("isLightTheme", "false");
}

var canExecute = true;

window.addEventListener("load", function () {
  var adsOn = window.localStorage.getItem("adsOn");
  if (!adsOn) {
    localStorage.setItem("adsOn", "true");
  }
  setTimeout(function () {
    canExecute = false;
  }, 300); // 1800 milliseconds = 1.8 seconds

  window.addEventListener("keydown", function (event) {
    if (canExecute && event.key === "Enter") {
      openPopup();
    }
  });
});

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
  localStorage.setItem("engine", "https://google.com/search?q=%s");
}
document.head = document.head || document.getElementsByTagName("head")[0];

function changeFavicon(src) {
  var link = document.createElement("link"),
    oldLink = document.getElementById("dynamic-favicon");
  link.id = "dynamic-favicon";
  link.rel = "shortcut icon";
  link.href = src;
  if (oldLink) {
    document.head.removeChild(oldLink);
  }
  document.head.appendChild(link);
}

function applyCloakSettings() {
  const selectedSite = localStorage.getItem("selectedCloak");
  let titleName = "";
  var favicon = "";

  console.log("Selected Site:", selectedSite); // Log the selected site to ensure it's retrieved correctly
  switch (selectedSite) {
    case "default":
      titleName = "Google";
      favicon = "/assets/imgs/icons/default.ico";
      break;
    case "custom":
      titleName = localStorage.getItem("tabName") || "Google";
      favicon = localStorage.getItem("tagIcon") || "/assets/img/icons/default.ico";
      break;
    case "clever":
      titleName = "Clever | Portal";
      favicon = "/assets/imgs/icons/clever.ico";
      break;
    case "deltamath":
      titleName = "DeltaMath";
      favicon = "/assets/imgs/icons/deltamath.ico";
      break;
    case "desmos":
      titleName = "Desmos | Scientific Calculator";
      favicon = "/assets/imgs/icons/desmos.ico";
      break;
    case "edpuzzle":
      titleName = "Edpuzzle";
      favicon = "/assets/imgs/icons/edpuzzle.ico";
      break;
    case "classroom":
      titleName = "Home";
      favicon = "/assets/imgs/icons/classroom.ico";
      break;
    case "drive":
      titleName = "My Drive - Google Drive";
      favicon = "/assets/imgs/icons/drive.ico";
      break;
    case "infinite-campus":
      titleName = "Home | Infinite Campus";
      favicon = "/assets/imgs/icons/infinite-campus.ico";
      break;
    case "ixl":
      titleName = "IXL | Dashboard";
      favicon = "/assets/imgs/icons/ixl.ico";
      break;
    case "getepic":
      titleName = "Epic! - Books for kids";
      favicon = "/assets/imgs/icons/epic.ico";
      break;
    case "nearpod":
      titleName = "Nearpod";
      favicon = "/assets/imgs/icons/nearpod.ico";
      break;
    case "prodigy":
      titleName = "Play Prodigy";
      favicon = "/assets/imgs/icons/prodigy.ico";
      break;
    case "quizziz":
      titleName = "Join a Quizziz activity - Enter code - Join my quiz - Quizziz";
      favicon = "/assets/imgs/icons/quizizz.ico";
      break;
    case "schoology":
      titleName = "Home | Schoology";
      favicon = "/assets/imgs/icons/schology.ico";
      break;
    case "campbell":
      titleName = "Quality Soups, Sauces, Food & Recipes | campbell.com";
      favicon = "/assets/imgs/icons/campbell.ico";
      break;
    default:
      titleName = "Google";
      favicon = "/assets/imgs/icons/default.ico";

      break;
  }
  console.log("Title Name:", titleName);
  document.title = titleName;
  localStorage.setItem("favicon", favicon);
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
  openPopup();
}

const savedColor = localStorage.getItem("themeColor");
if (savedColor) {
  document.documentElement.style.setProperty("--theme-color", savedColor);
}

const savedColor2 = localStorage.getItem("shadowColor");
if (savedColor2) {
  document.documentElement.style.setProperty("--shadow-color", savedColor2);
}

// Function to handle dropdown change
function toggleBackground() {
  var dropdown = document.getElementById("backgroundToggle");
  var isChecked = dropdown.value === "true";
  localStorage.setItem("backgroundToggle", isChecked);
}

// Function to load background settings from localStorage
function loadBackground() {
  var isChecked = localStorage.getItem("backgroundToggle") === "true";
  var backgroundImage = localStorage.getItem("backgroundImage");

  var dropdown = document.getElementById("backgroundToggle");
  dropdown.value = isChecked ? "true" : "false";

  document.getElementById("background").style.backgroundImage = "url('" + backgroundImage + "')";

  document.body.style.color = isChecked ? "#4c4c4c" : "#fff";
}

document.addEventListener("DOMContentLoaded", function () {
  loadBackground();
});

if (localStorage.getItem("backgroundImage")) {
  document.getElementById("background").style.backgroundImage = "url('" + localStorage.getItem("backgroundImage") + "')";
}

applyCloakSettings();

var adsOn = window.localStorage.getItem("adsOn");
var gAdsOn = window.localStorage.getItem("gAdsOn");

if (adsOn === "false") {
  console.log("User said no ads :( okkkk");
} else {
  const gascript = document.createElement("script");
  gascript.setAttribute("src", "//pl23207130.highcpmgate.com/7f/1d/1c/7f1d1c315887fde89dd6ce89a57b9d57.js");
  document.head.append(gascript);
  console.log("Added Advert Script");
}

if (gAdsOn === "false") {
  console.log("User said no google ads :( okkkk");
} else {
  const googleascript = document.createElement("script");
  googleascript.setAttribute("src", "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2804638430420139");
  googleascript.setAttribute("crossorigin", "anonymous");
  document.head.append(googleascript);
  console.log("Added Goggle Adsense Script");
}