document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("download-pdf").addEventListener("click", function () {
        const content = document.getElementById("cv-content").outerHTML; // Get full HTML structure

        // Open a new window
        const newWindow = window.open("", "_blank");

        // Fetch the CSS file and inject it
        fetch("style.css")
            .then(response => response.text())
            .then(css => {
                newWindow.document.write(`
                    <html>
                    <head>
                        <title>Hohyun Henry Lee - CV</title>
                        <style>
                            ${css}  /* Injects existing CSS */
                            /* Manually ensure bullet points are removed */
                            ul { list-style-type: none !important; padding-left: 0 !important; }
                            li { text-indent: -30px !important; padding-left: 30px !important; }
                            body { font-family: Arial, sans-serif; padding: 20px; }
                            h2 { text-align: left; }
                            hr { border: 1px solid #ccc; }
                        </style>
                    </head>
                    <body>
                        ${content}  <!-- Injects CV content -->
                    </body>
                    </html>
                `);

                newWindow.document.close();
            })
            .catch(error => console.error("❌ Error loading CSS:", error));
    });
});
