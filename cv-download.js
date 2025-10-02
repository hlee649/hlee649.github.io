// cv-download.js
document.addEventListener("DOMContentLoaded", function () {
  const btn = document.getElementById("download-pdf");
  if (!btn) return;

  btn.addEventListener("click", function () {
    const cvContentEl = document.getElementById("cv-content");
    if (!cvContentEl) return;

    // 1) Grab CV body
    const contentHTML = cvContentEl.outerHTML;

    // 2) Find a header <h1> (prefer inside #cv-content; else from .cv-header)
    const headerInContent = cvContentEl.querySelector("h1");
    const headerInHeader = document.querySelector(".cv-header h1");

    // 3) Build a normalized header for PDF with consistent styling
    let headerHTML = "";
    const sourceH1 = headerInContent || headerInHeader;
    if (sourceH1) {
      // Preserve any inner spans (e.g., <span class="muted"> | email</span>)
      headerHTML = `<h1 class="cv-name">${sourceH1.innerHTML}</h1>`;
    }

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
              html, body { background: #f2f2f2; margin: 0; }
              .page {
                width: 8.5in;
                min-height: 11in;
                margin: 24px auto;
                background: #fff;
                box-shadow: 0 0 0.75rem rgba(0,0,0,0.15);
                padding: 1in;
                box-sizing: border-box;
              }

              /* Normalize PDF header appearance */
              .cv-name {
                margin: 0 0 12px 0;
                font-size: 28px;      /* set the size you want */
                line-height: 1.2;
                font-weight: 700;
                color: #222;          /* main name color */
              }
              .cv-name .muted {
                font-size: 16px;      /* email size */
                font-weight: 400;
                color: #666;          /* muted email color */
              }

              /* Body defaults */
              body, .page { font-family: Arial, sans-serif; line-height: 1.6; }
              h2 { margin-bottom: 12px; }
              hr { border: 1px solid #ccc; margin: 12px 0; }
              p, li { font-size: 16px; margin-bottom: 8px; }
              ul { list-style-type: none !important; padding-left: 0 !important; }
              li { text-indent: -30px !important; padding-left: 30px !important; }

              /* Education spacing (you asked for it tighter) */
              #education .education-container { gap: 4px; }
              #education .education-content ul li { padding: 1px 0; margin: 0; }

              /* Keep your chosen heading color for section titles */
              .cv-container h2, #cv-content h2, .page h2 { color: #ff7043; }

              /* Muted metadata everywhere */
              .muted { color: #666; font-style: italic; }

              /* Print rules */
              @page { size: letter; margin: 1in; }
              @media print {
                html, body { background: #fff; }
                .page { box-shadow: none; margin: 0; padding: 0; }
                .download-btn { display: none !important; } /* never show the button in print */
              }
            </style>
          </head>
          <body>
            <div class="page">
              <div class="cv-container">
                ${headerHTML}
                ${contentHTML}
              </div>
            </div>
          </body>
          </html>
        `);
        win.document.close();
      })
      .catch(err => console.error("❌ Error loading CSS:", err));
  });
});
