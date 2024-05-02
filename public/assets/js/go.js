const form = document.getElementById("uv-form");
const address = document.getElementById("uv-address");
const input = document.querySelector("input");

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
if ("serviceWorker" in navigator) {
  var proxySetting = localStorage.getItem("proxy") || "uv";
  let swConfig = {
    uv: { file: "/@/sw.js", config: __uv$config },
    dynamic: { file: "/dynamic/sw.js", config: __dynamic$config },
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

const swConfig = {
  uv: { file: "/@/sw.js", config: __uv$config },
  dynamic: { file: "/dynamic/sw.js", config: __dynamic$config },
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