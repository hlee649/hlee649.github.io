// cv-download.js
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("download-pdf").addEventListener("click", function () {
    const content = document.querySelector(".cv-container").outerHTML;


    const win = window.open("", "_blank");

    fetch("style.css")
      .then(r => r.text())
      .then(css => {
        win.document.write(`
          <html>
          <head>
            <title>Hohyun Henry Lee - CV</title>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <style>
              ${css}

              /* ===== Letter-sized page look on screen ===== */
              html, body {
                background: #f2f2f2;
                margin: 0;
              }
              .page {
                width: 8.5in;
                min-height: 11in;
                margin: 24px auto;
                background: #fff;
                box-shadow: 0 0 0.75rem rgba(0,0,0,0.15);
                padding: 1in;
                box-sizing: border-box;
              }

              /* Default text */
              body, .page { 
                font-family: Arial, sans-serif; 
                line-height: 1.6; 
              }

              h1, h2 { margin-bottom: 20px; }
              hr { border: 1px solid #ccc; margin: 20px 0; }
              p, li { font-size: 16px; margin-bottom: 10px; }
              ul { list-style-type: none !important; padding-left: 0 !important; }
              li { text-indent: -30px !important; padding-left: 30px !important; }
              .education-container, .cv-section { margin-bottom: 30px; }

              /* Preserve teal headings */
              .cv-container h2, #cv-content h2, .page h2 { color: #ff7043; }

              /* ===== Print rules ===== */
              @page {
                size: letter;
                margin: 1in;
              }
              @media print {
                html, body { background: #fff; }
                .page {
                  box-shadow: none;
                  margin: 0;
                  padding: 0;
                }
              }

              /* Hide the download button inside PDF view */
                .download-btn {
                display: none !important;
                }
            </style>
          </head>
          <body>
            <div class="page">
              <div class="cv-container">
                ${content}
              </div>
            </div>
            <!-- Manual print only -->
          </body>
          </html>
        `);
        win.document.close();
      })
      .catch(err => console.error("❌ Error loading CSS:", err));
  });
});
