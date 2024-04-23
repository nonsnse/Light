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

    window.location.href = localStorage.redirectLink;

  }
}

var cloakSelect = document.getElementById("siteSelect");

function saveCloakSettings() {
  const selectedCloak = cloakSelect.value;
  const iconInput = document.getElementById("iconInput").value;
  const nameInput = document.getElementById("nameInput").value;

  localStorage.setItem("selectedCloak", selectedCloak);
  if (selectedCloak === "custom") {
    localStorage.setItem("tabIcon", iconInput);
    localStorage.setItem("tabName", nameInput);
  }
  location.reload();
  applyCloakSettings();
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

  console.log("Selected Site:", selectedSite); // Log the selected site to ensure it's retrieved correctly

  switch (selectedSite) {
    case 'default':
      titleName = "Google";
      changeFavicon("/assets/imgs/icons/default.ico")
      break;
    case 'custom':
      titleName = localStorage.getItem("tabName") || "Google";
      changeFavicon(localStorage.getItem("tagIcon") || "/assets/img/icons/default.ico")
      break;
    case 'clever':
      titleName = "Clever | Portal";
      changeFavicon("/assets/imgs/icons/clever.ico")
      break;
    case 'deltamath':
      titleName = "DeltaMath";
      changeFavicon("/assets/imgs/icons/deltamath.ico")
      break;
    case 'desmos':
      titleName = "Desmos | Scientific Calculator";
      changeFavicon("/assets/imgs/icons/desmos.ico")
      break;
    case 'edpuzzle':
      titleName = "Edpuzzle";
      changeFavicon("/assets/imgs/icons/edpuzzle.ico")
      break;
    case 'classroom':
      titleName = "Home";
      changeFavicon("/assets/imgs/icons/classroom.ico")
      break;
    case 'drive':
      titleName = "My Drive - Google Drive";
      changeFavicon("/assets/imgs/icons/drive.ico")
      break;
    case 'infinite-campus':
      titleName = "Home | Infinite Campus";
      changeFavicon("/assets/imgs/icons/infinite-campus.ico")
      break;
    case 'ixl':
      titleName = "IXL | Dashboard";
      changeFavicon("/assets/imgs/icons/ixl.ico")
      break;
    case 'nearpod':
      titleName = "Nearpod";
      changeFavicon("/assets/imgs/icons/nearpod.ico")
      break;
    case 'prodigy':
      titleName = "Play Prodigy";
      changeFavicon("/assets/imgs/icons/prodigy.ico")
      break;
    case 'quizziz':
      titleName = "Join a Quizziz activity - Enter code - Join my quiz - Quizziz";
      changeFavicon("/assets/imgs/icons/quizizz.ico")
      break;
    case 'schoology':
      titleName = "Home | Schoology";
      changeFavicon("/assets/imgs/icons/schology.ico")
      break;
    case 'campbell':
      titleName = "Quality Soups, Sauces, Food & Recipes | campbell.com";
      changeFavicon("/assets/imgs/icons/campbell.ico")
      break;
    default:
      titleName = "Google";
      changeFavicon("/assets/imgs/icons/default.ico")

      break;
  }
  console.log("Title Name:", titleName);
  document.title = titleName;
}
function resetCloak() {
  localStorage.removeItem("selectedSite");
  localStorage.removeItem("tabIcon");
  localStorage.removeItem("tabName");

  applyCloakSettings();
}

applyCloakSettings();

function encrypt(text, secretKey) {
  let output = '';
  for (let i = 0; i < text.length; i++) {
    let charCode = text.charCodeAt(i) ^ secretKey.charCodeAt(i % secretKey.length);
    output += String.fromCharCode(charCode);
  }
  return window.btoa(output);
}

function decrypt(encryptedData, secretKey) {
  let data = window.atob(encryptedData);
  let output = '';
  for (let i = 0; i < data.length; i++) {
    let charCode = data.charCodeAt(i) ^ secretKey.charCodeAt(i % secretKey.length);
    output += String.fromCharCode(charCode);
  }
  return output;
}

function extractCookies() {
  let cookies = {};
  document.cookie.split(';').forEach(function (c) {
    let parts = c.split('=');
    cookies[parts.shift().trim()] = decodeURI(parts.join('='));
  });
  return cookies;
}

function exportData(secretKey) {
  let localStorageData = JSON.stringify(localStorage);
  let cookies = extractCookies();

  let data = {
    localStorageData: localStorageData,
    cookies: cookies
  };

  let jsonData = JSON.stringify(data);
  let encryptedData = encrypt(jsonData, secretKey);

  let blob = new Blob([encryptedData], { type: 'application/octet-stream' });

  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveBlob(blob, 'save.light');
  } else {
    let a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'save.light';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  alert('Data exported!');
}


function importData(secretKey) {
  let fileInput = document.getElementById('fileInput');
  let file = fileInput.files[0];
  let reader = new FileReader();

  reader.onload = function (e) {
    let decryptedDataJSON = decrypt(e.target.result, secretKey);
    let decryptedData = JSON.parse(decryptedDataJSON);

    localStorage.clear();
    let localStorageData = JSON.parse(decryptedData.localStorageData);
    for (let key in localStorageData) {
      localStorage.setItem(key, localStorageData[key]);
    }

    document.cookie.split(";").forEach(function (c) {
      document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });

    let cookieData = decryptedData.cookies;
    for (let key in cookieData) {
      document.cookie = key + "=" + cookieData[key] + ";path=/";
    }

    alert('Data has been imported successfully!');
  };

  reader.readAsText(file);
}


document.addEventListener('DOMContentLoaded', function () {
  let importButton = document.getElementById('importButton');

  importButton.addEventListener("click", function () {
    document.getElementById('dataInput').click();
  });
});

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


function toggleBackground() {
  var isChecked = document.getElementById("backgroundToggle").checked;

  var backgroundImage = isChecked ? "/assets/imgs/bg/bglight.jpg" : "/assets/imgs/bg/bgdark.jpg";
  document.getElementById("background").style.backgroundImage = "url('" + backgroundImage + "')";

  document.body.style.color = isChecked ? "#4c4c4c" : "#fff";

  localStorage.setItem("backgroundToggle", isChecked);
  localStorage.setItem("backgroundImage", backgroundImage);
}

function loadBackground() {
  var isChecked = localStorage.getItem("backgroundToggle") === "true";
  var backgroundImage = localStorage.getItem("backgroundImage");

  document.getElementById("backgroundToggle").checked = isChecked;
  document.getElementById("background").style.backgroundImage = "url('" + (backgroundImage || "/assets/imgs/bg/bgdark.jpg") + "')";

  document.body.style.color = isChecked ? "#4c4c4c" : "#fff";
}

document.addEventListener("DOMContentLoaded", function () {
  loadBackground();
});

if (localStorage.getItem("backgroundImage")) {
  document.getElementById("background").style.backgroundImage =
    "url('" + localStorage.getItem("backgroundImage") + "')";
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
      var backgroundImage = e.target.result;
      document.getElementById(
        "background"
      ).style.backgroundImage = backgroundImage;
      localStorage.setItem("backgroundImage", backgroundImage);
    };
    reader.readAsDataURL(file);
    location.reload();
  });

document
  .getElementById("reset-img")
  .addEventListener("click", function () {
    // Reset the background to the default state
    document.getElementById("background").style.backgroundImage =
      "";
    localStorage.removeItem("backgroundImage");
    location.reload();
  });

function saveImageURL() {
  var imageURL = document.getElementById("image-input-url").value;
  if (imageURL.trim() !== "") {
    localStorage.setItem("backgroundImage", imageURL);
    // Update background image if checkbox is not checked
    loadBackground()
  }
  location.reload()
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

searchSel.value = searchStored;
window.addEventListener("load", loadSavedProxyOption);
window.addEventListener("load", checkUnsetPanic);
window.addEventListener("load", checkPanicValues);
if (localStorage.getItem("engine") === undefined) {
  localStorage.setItem("engine", "https://google.com/search?q=%s")
}

cloakSelect.addEventListener("change", function () {
  if (cloakSelect.value === "custom") {
    const cloakInputs = document.getElementById("customCloakinput");
    cloakInputs.style.display = "block";
  } else {
    const cloakInputs = document.getElementById("customCloakinput");
    cloakInputs.style.display = "none";
  }
})

applyCloakSettings();
