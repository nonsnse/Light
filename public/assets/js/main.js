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

if ( localStorage.getItem("engine") === undefined ) {
    localStorage.setItem("engine", "https://google.com/search?q=%s")
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
        link.href = "https://www.google.com/favicon.ico";
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
