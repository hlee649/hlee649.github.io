document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("download-pdf").addEventListener("click", function () {
        const content = document.getElementById("cv-content").outerHTML; // Get full CV content

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

                            /* 🔹 Ensure proper spacing & formatting */
                            body { font-family: Arial, sans-serif; padding: 40px; line-height: 1.6; }
                            h1, h2 { text-align: left; margin-bottom: 20px; }
                            hr { border: 1px solid #ccc; margin: 20px 0; }
                            p, li { font-size: 16px; margin-bottom: 10px; }
                            ul { list-style-type: none !important; padding-left: 0 !important; }
                            li { text-indent: -30px !important; padding-left: 30px !important; }
                            .education-container, .cv-section { margin-bottom: 30px; } /* Ensures spacing between sections */
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
