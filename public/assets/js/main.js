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
  } else {
    console.log("already in about:blank")
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
  gascript.setAttribute("src", "//banddisordergraceless.com/5b/d2/9b/5bd29b62af75682aa2a77e20931069ee.js");
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

document.addEventListener("DOMContentLoaded", function () {
  var background = document.getElementById("background");
  var menu = createMenu();

  background.addEventListener("contextmenu", function (event) {
    event.preventDefault();
    menu.style.display = "block";
    menu.style.left = event.pageX + "px";
    menu.style.top = event.pageY + "px";
  });

  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("menu-item")) {
      var menuItemText = event.target.textContent;
      console.log("You clicked", menuItemText);

      if (menuItemText === "Change Background") {
        changeBackground();
      } else if (menuItemText === "About:Blank") {
        openPopup()
      } else if (menuItemText === "Panic") {
        triggerPanic();
      } else if (menuItemText === "Settings") {
        location.href = "/s"
      }
    }
    menu.style.display = "none";
  });

  function createMenu() {
    var menu = document.createElement("div");
    menu.classList.add("menu");

    var items = ["Change Background", "About:Blank", "Panic", "Settings"];

    items.forEach(function (itemText, index) {
      var menuItem = document.createElement("div");
      menuItem.classList.add("menu-item");
      menuItem.textContent = itemText;
      menuItem.setAttribute("id", "menu-item-" + (index + 1));
      menu.appendChild(menuItem);
    });

    document.body.appendChild(menu);
    return menu;
  }

  function changeBackground() {
    document.getElementById("file-input").addEventListener("change", function (event) {
      var file = event.target.files[0];
      var reader = new FileReader();
      reader.onload = function (e) {
        var backgroundImage = e.target.result;
        document.getElementById("background").style.backgroundImage = backgroundImage;
        localStorage.setItem("backgroundImage", backgroundImage);
      };
      reader.readAsDataURL(file);
      location.reload();
    });
    document.getElementById("file-input").click();

  }

  function triggerPanic() {
    const redirectLink = localStorage.getItem("redirectLink");
    window.location.href = redirectLink;
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const navbarLinks = document.querySelectorAll(".navbarLink");

  navbarLinks.forEach(function (link) {
    link.addEventListener("contextmenu", function (event) {
      event.preventDefault(); // Prevent default anchor behavior
      const parentAnchor = link.parentNode;
      const url = parentAnchor.href;
      const navMenu = createNavbarMenu(url);
      showNavbarMenu(event, navMenu);
    });
  });

  function createNavbarMenu(url) {
    const navMenu = document.createElement("div");
    navMenu.classList.add("menu");

    const openInNewTabOption = document.createElement("div");
    openInNewTabOption.classList.add("menu-item");
    openInNewTabOption.textContent = "Open in New Tab";
    openInNewTabOption.style.padding = "5px 15px";
    openInNewTabOption.style.cursor = "pointer";
    openInNewTabOption.addEventListener("click", function () {
      window.open(url, "_blank");
      navMenu.style.display = "none";
    });
    navMenu.appendChild(openInNewTabOption);

    const goToURLOption = document.createElement("div");
    goToURLOption.classList.add("menu-item");
    goToURLOption.textContent = "Go to URL";
    goToURLOption.style.padding = "5px 15px";
    goToURLOption.style.cursor = "pointer";
    goToURLOption.addEventListener("click", function () {
      window.location.href = url;
      navMenu.style.display = "none";
    });
    navMenu.appendChild(goToURLOption);

    document.body.appendChild(navMenu);
    navMenu.style.display = "none";
    return navMenu;
  }

  function showNavbarMenu(event, navMenu) {
    navMenu.style.display = "block";
    navMenu.style.left = event.pageX + "px";
    navMenu.style.top = event.pageY + "px";

    document.addEventListener("click", function hideMenu() {
      navMenu.style.display = "none";
      document.removeEventListener("click", hideMenu);
    });
  }
});
