const form = document.getElementById("uv-form");
const address = document.getElementById("uv-address");
const searchEngine = document.getElementById("uv-search-engine");
const error = document.getElementById("uv-error");
const errorCode = document.getElementById("uv-error-code");
const input = document.querySelector("input");
const connection = new BareMux.BareMuxConnection("/baremux/worker.js")

window.wisp_api = localStorage.getItem("wisp") || (location.protocol === "https:" ? "wss" : "ws") + "://" + location.host + "/wisp/";
console.log("Wisp API: ", window.wisp_api);

const swConfig = {
  uv: { file: "/@/sw.js", config: __uv$config },
  sj: { file: "/$/sw.js", config: $scramjet.config }
};

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

async function setTransports() {
  const transports = localStorage.getItem("transports") || "epoxy";
  if (transports === "epoxy") {
    await connection.setTransport("/epoxy/index.mjs", [{ wisp: window.wisp_api }]);
  } else if (transports === "libcurl") {
    await connection.setTransport("/libcurl/index.mjs", [{ wisp: window.wisp_api }]);
  } else {
    await connection.setTransport("/epoxy/index.mjs", [{ wisp: window.wisp_api }]);
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
    try {
      let url = address.value.trim();

      if (typeof ifUrl === "function" && !ifUrl(url)) {
        url = await search(url);
      } else if (!(url.startsWith("https://") || url.startsWith("http://"))) {
        url = "https://" + url;
      }

      const encodedUrl = await RammerheadEncode(url);

      sessionStorage.setItem("encodedUrl", encodedUrl);

      const browseSetting = localStorage.getItem("browse");
      const browseUrls = {
        go: "/go",
        norm: encodedUrl,
      };
      const urlToNavigate = browseUrls[browseSetting] || "/go";
      location.href = urlToNavigate;
    } catch (error) {
      location.href = "/error";
    }
  });
} else {
  if ("serviceWorker" in navigator) {
    var proxySetting = localStorage.getItem("proxy") || "uv";

    let { file: swFile, config: swConfigSettings } = swConfig[proxySetting];

    navigator.serviceWorker.ready.then(async () => { await setTransports() })
    navigator.serviceWorker.register(swFile, { scope: swConfigSettings.prefix }).then(async (registration) => {
      console.log("ServiceWorker registration successful with scope: ", registration.scope);
      await setTransports();
      form.addEventListener("submit", async (event) => {
        event.preventDefault();
        try {
          let encodedUrl = swConfigSettings.prefix + crypts.encode(search(address.value));
          sessionStorage.setItem("encodedUrl", encodedUrl);
          const browseSetting = localStorage.getItem("browse");
          const browseUrls = {
            go: "/go",
            norm: encodedUrl,
          };

          const urlToNavigate = browseUrls[browseSetting] || "/go";
          location.href = urlToNavigate;
        } catch (error) {
          location.href = "/error";
        }
      });
    })
      .catch((error) => {
        console.error("ServiceWorker registration failed:", error);
      });
  }
}

async function launch(val) {
  if (localStorage.getItem("proxy") === "rammerhead") {
    try {
      let url = val.trim();

      if (typeof ifUrl === "function" && !ifUrl(url)) {
        url = await search(url);
      } else if (!(url.startsWith("https://") || url.startsWith("http://"))) {
        url = "https://" + url;
      }

      const encodedUrl = await RammerheadEncode(url);
      sessionStorage.setItem("encodedUrl", encodedUrl);

      const browseSetting = localStorage.getItem("browse");
      const browseUrls = {
        go: "/go",
        norm: encodedUrl,
      };
      const urlToNavigate = browseUrls[browseSetting] || "/go";
      location.href = urlToNavigate;
    } catch (error) {
      location.href = "/error";
    }
  } else {
    if ("serviceWorker" in navigator) {
      let proxySetting = localStorage.getItem("proxy") || "uv";
      let swConfig = {
        uv: { file: "/@/sw.js", config: __uv$config }
      };

      // Use the selected proxy setting or default to 'uv'
      let { file: swFile, config: swConfigSettings } = swConfig[proxySetting];

      navigator.serviceWorker.ready.then(async () => { await setTransports() })
      navigator.serviceWorker.register(swFile, { scope: swConfigSettings.prefix }).then(async (registration) => {
        await setTransports();
        console.log("ServiceWorker registration successful with scope: ", registration.scope);
        let url = val.trim();
        if (typeof ifUrl === "function" && !ifUrl(url)) {
          url = search(url);
        } else if (!(url.startsWith("https://") || url.startsWith("http://"))) {
          url = "https://" + url;
        }
        try {
          let encodedUrl = swConfigSettings.prefix + crypts.encode(url);
          sessionStorage.setItem("encodedUrl", encodedUrl);
          const browseSetting = localStorage.getItem("browse");
          const browseUrls = {
            go: "/go",
            norm: encodedUrl,
          };
          const urlToNavigate = browseUrls[browseSetting] || "/go";
          location.href = urlToNavigate;
        } catch (error) {
          location.href = "/error";
        }
      })
        .catch((error) => {
          console.error("ServiceWorker registration failed:", error);
        });
    }
  }
}

function ifUrl(val = "") {
  const urlPattern = /^(http(s)?:\/\/)?([\w-]+\.)+[\w]{2,}(\/.*)?$/;
  return urlPattern.test(val);
}