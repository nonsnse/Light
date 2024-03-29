"use strict";

/**
 * @type {HTMLFormElement}
 */
const form = document.getElementById("uv-form");
/**
 * @type {HTMLInputElement}
 */
const address = document.getElementById("uv-address");
/**
 * @type {HTMLInputElement}
 */
const searchEngine = document.getElementById("uv-search-engine");
/**
 * @type {HTMLParagraphElement}
 */
const error = document.getElementById("uv-error");
/**
 * @type {HTMLPreElement}
 */
const errorCode = document.getElementById("uv-error-code");

const input = document.querySelector("input");

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

// Search function definition
function search(input) {
  input = input.trim();  // Trim the input to remove any whitespace
  // Retrieve the search engine URL template from localStorage or use default
  const searchTemplate = 'https://google.com/search?q=%s';

  try {
    // Try to treat the input as a URL
    return new URL(input).toString();
  } catch (err) {
    // The input was not a valid URL; attempt to prepend 'http://'
    try {
      const url = new URL(`http://${input}`);
      if (url.hostname.includes(".")) {
        return url.toString();
      }
      throw new Error('Invalid hostname');  // Force jump to the next catch block
    } catch (err) {
      // The input was not a valid URL - treat as a search query
      return searchTemplate.replace("%s", encodeURIComponent(input));
    }
  }
}
if ('serviceWorker' in navigator) {
  var proxySetting = 'uv';
  let swConfig = {
    'uv': { file: '/uv/sw.js', config: __uv$config }
  };

  let { file: swFile, config: swConfigSettings } = swConfig[proxySetting];

  navigator.serviceWorker.register(swFile, { scope: swConfigSettings.prefix })
    .then((registration) => {
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
      form.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        let encodedUrl = swConfigSettings.prefix + crypts.encode(search(address.value));
        location.href = encodedUrl;
      });
    })
    .catch((error) => {
      console.error('ServiceWorker registration failed:', error);
    });
}
