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


var searchSave = document.getElementById("searchSave");
searchSave.addEventListener("click", function () {
  switchSearch();
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

function savePanicKey() {
  const panicKey = document.getElementById("panicKeyInput").value;
  const redirectLink = document.getElementById("redirectLinkInput").value;
  localStorage.setItem("panicKey", panicKey);
  localStorage.setItem("redirectLink", redirectLink);
}

function resetPanicKey() {
  document.getElementById("panicKeyInput").value = "";
  localStorage.removeItem("panicKey");
}


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
searchSel.value = searchStored;
window.addEventListener("load", loadSavedProxyOption);
window.addEventListener("load", checkUnsetPanic);
