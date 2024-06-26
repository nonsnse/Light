const form = document.getElementById("uv-form");
const address = document.getElementById("uv-address");
const input = document.querySelector("input");

var theme = localStorage.getItem("isLightTheme");
var themecss = "/assets/css/main.css";
if (theme === "true") {
  themecss = "/assets/css/light.css";
}
if (theme === undefined) {
  localStorage.setItem("isLightTheme", "false");
}

document.getElementById("themecss").href = themecss;

function reload() {
  document.getElementById("iframeId").src = document.getElementById("iframeId").src;
}
function back() {
  document.getElementById("iframeId").contentWindow.history.back();
}
function forward() {
  document.getElementById("iframeId").contentWindow.history.forward();
}

var elem = document.documentElement;
var isFullscreen = false;

function openFullScreen() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    /* IE11 */
    elem.msRequestFullscreen();
  }
  isFullscreen = true;
}

function closeFullScreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    /* IE11 */
    document.msExitFullscreen();
  }
  isFullscreen = false;
}

function toggleFullScreen() {
  if (isFullscreen) {
    closeFullScreen();
  } else {
    openFullScreen();
  }
}

var devToggle = "false";

function inspectelement() {
  if (devToggle == "true") {
    eruda.destroy();
    devToggle = "false";
    console.log(devToggle);
  } else if (devToggle == "false") {
    eruda.init();
    eruda.add(erudaOrientation).add(erudaBenchmark).add(erudaCode).add(erudaTiming).add(erudaFeatures).add(erudaMonitor);
    devToggle = "true";
    console.log(devToggle);
  }
}
eruda.init();
eruda.hide();
setTimeout(function () {
  eruda.destroy();
}, 30);

function newTab() {
  window.open(document.getElementById("iframeId").src);
}

// crypts class definition
class crypts {
  static encode(str) {
    return encodeURIComponent(
      str
        .toString()
        .split("")
        .map((char, ind) => (ind % 2 ? String.fromCharCode(char.charCodeAt() ^ 2) : char))
        .join("")
    );
  }

  static decode(str) {
    if (str.charAt(str.length - 1) === "/") {
      str = str.slice(0, -1);
    }
    return decodeURIComponent(
      str
        .split("")
        .map((char, ind) => (ind % 2 ? String.fromCharCode(char.charCodeAt() ^ 2) : char))
        .join("")
    );
  }
}

function search(input) {
  input = input.trim();
  const searchTemplate = localStorage.getItem("engine") || "https://google.com/search?q=%s";

  try {
    return new URL(input).toString();
  } catch (err) {
    try {
      const url = new URL(`http://${input}`);
      if (url.hostname.includes(".")) {
        return url.toString();
      }
      throw new Error("Invalid hostname");
    } catch (err) {
      return searchTemplate.replace("%s", encodeURIComponent(input));
    }
  }
}

if (localStorage.getItem("proxy") === "rammerhead") {
  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const encodedUrl = await RammerheadEncode(search(address.value));
    sessionStorage.setItem("encodedUrl", encodedUrl);

    const browseSetting = localStorage.getItem("browse");
    const browseUrls = {
      go: "/go",
      norm: encodedUrl,
    };
    const urlToNavigate = browseUrls[browseSetting] || "/go";
    location.href = urlToNavigate;
  });
} else {
  if ("serviceWorker" in navigator) {
    var proxySetting = localStorage.getItem("proxy") || "uv";
    let swConfig = {
      uv: { file: "/@/sw.js", config: __uv$config }
    };

    let { file: swFile, config: swConfigSettings } = swConfig[proxySetting];

    navigator.serviceWorker
      .register(swFile, { scope: swConfigSettings.prefix })
      .then((registration) => {
        console.log("ServiceWorker registration successful with scope: ", registration.scope);
        form.addEventListener("submit", async (event) => {
          event.preventDefault();

          let encodedUrl = swConfigSettings.prefix + crypts.encode(search(address.value));
          document.getElementById("iframeId").src = encodedUrl;
        });
      })
      .catch((error) => {
        console.error("ServiceWorker registration failed:", error);
      });
  }
}

const swConfig = {
  uv: { file: "/@/sw.js", config: __uv$config }
};
function registerSW() {
  if (localStorage.getItem("registerSW") === "true") {
    var proxySetting = localStorage.getItem("proxy") || "uv";
    let { file: swFile, config: swConfigSettings } = swConfig[proxySetting];

    navigator.serviceWorker
      .register(swFile, { scope: swConfigSettings.prefix })
      .then((registration) => {
        console.log("ServiceWorker registration successful with scope: ", registration.scope);
      })
      .catch((error) => {
        console.error("ServiceWorker registration failed:", error);
      });
  }
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

applyCloakSettings();
