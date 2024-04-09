      const colorPicker = document.getElementById("colorPicker");
        colorPicker.addEventListener("input", function () {
            document.documentElement.style.setProperty(
                "--theme-color",
                colorPicker.value
            );
            localStorage.setItem("themeColor", colorPicker.value);
        });

            
      // Event listener for keydown
      document.addEventListener('keydown', function(event) {
        if (event.key === '`') {
          openGame();
          // Redirect to Google Classroom after the game window has been opened
          window.location.href = 'https://classroom.google.com';
        }
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


        // Function to toggle the background color
        function toggleBackground() {
            // Check the current state of the checkbox
            var isChecked = document.getElementById("backgroundToggle").checked;

            // Set the background color based on the checkbox state
            document.body.style.backgroundColor = isChecked ? "white" : "#212121";
            document.body.style.color = isChecked ? "#4c4c4c" : "#fff";
            
            
            // Save the state to local storage
            localStorage.setItem("backgroundToggle", isChecked);
        }

        // Function to load the saved background color
        function loadBackground() {
            // Get the saved state from local storage
            var isChecked = localStorage.getItem("backgroundToggle") === "true";

            // Set the checkbox state and background color
            document.getElementById("backgroundToggle").checked = isChecked;
            toggleBackground();
        }

        // Add event listener to the checkbox
        document.addEventListener("DOMContentLoaded", function () {
            var checkbox = document.getElementById("backgroundToggle");
            checkbox.addEventListener("change", toggleBackground);

            // Load the background color when the page is loaded
            loadBackground();
        });
        // Check for saved background in localStorage
        if (localStorage.getItem("backgroundImage")) {
            document.getElementById("background").style.backgroundImage =
                localStorage.getItem("backgroundImage");
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
                    var backgroundImage = "url(" + e.target.result + ")";
                    document.getElementById(
                        "background"
                    ).style.backgroundImage = backgroundImage;
                    localStorage.setItem("backgroundImage", backgroundImage);
                };
                reader.readAsDataURL(file);
            });

        document
            .getElementById("reset-img")
            .addEventListener("click", function () {
                // Reset the background to the default state
                document.getElementById("background").style.backgroundImage =
                    "";
                localStorage.removeItem("backgroundImage");
            });

        function myClock() {
            setTimeout(function () {
                const d = new Date();
                const n = d.toLocaleTimeString();
                document.getElementById("time").innerHTML = n;
                myClock();
            }, 1000);
        }
        myClock();

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
        document.addEventListener("DOMContentLoaded", () => {
            const currentUrl = "https://desmos.com";
            const defaultKey = "`";
            let triggerKey = defaultKey;

            function updateTriggerKey(value) {
                triggerKey = value.slice(0, 1); // Limit to the first character
            }

            document
                .getElementById("keyInput")
                .addEventListener("input", (e) => {
                    updateTriggerKey(e.target.value);
                });

            document
                .getElementById("keyInput")
                .addEventListener("keypress", (e) => {
                    if (e.key === "Enter") {
                        updateTriggerKey(e.target.value);
                        e.preventDefault(); // Prevent form submission if inside a form
                    }
                });

            document.addEventListener("keydown", (e) => {
                if (e.key === triggerKey) {
                    window.location.href = currentUrl;
                }
            });
        });

        function openGame() {
            var win = window.open();
            var url = window.location.href;
            var iframe = win.document.createElement("iframe");
            iframe.style.frameborder = "0";
            iframe.style.marginwidth = "0";
            iframe.style.width = "100%";
            iframe.style.height = "100%";
            iframe.style.border = "none";
            iframe.style.position = "fixed";
            iframe.style.inset = "0px";
            iframe.style.outline = "none";
            iframe.style.scrolling = "auto";
            iframe.src = url;
            win.document.title = "Google";
            var link = win.document.createElement("link");
            link.rel = "icon";
            link.type = "image/x-icon";
            link.href = "https://www.google.com/favicon.ico";
            win.document.head.appendChild(link);
            win.document.body.appendChild(iframe);
        }
