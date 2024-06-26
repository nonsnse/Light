function registerSW() {
    const swConfig = {
        uv: { file: "/@/sw.js", config: __uv$config }
    };
    if (localStorage.getItem("registerSW") === "true") {
        var proxySetting = localStorage.getItem("proxy") || "uv";
        let { file: swFile, config: swConfigSettings } = swConfig[proxySetting];

        navigator.serviceWorker
            .register(swFile, { scope: swConfigSettings.prefix })
            .then((registration) => {
                console.log("ServiceWorker preregistration successful with scope: ", registration.scope);
            })
            .catch((error) => {
                console.error("ServiceWorker registration failed:", error);
            });
    }
}