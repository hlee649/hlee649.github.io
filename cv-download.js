document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ Script Loaded: cv-download.js");

    const downloadButton = document.getElementById("download-pdf");
    if (!downloadButton) {
        console.error("❌ Download button not found!");
        return;
    }

    downloadButton.addEventListener("click", function () {
        console.log("✅ Download button clicked!");

        const element = document.getElementById("cv-content");
        if (!element) {
            console.error("❌ CV content section not found!");
            return;
        }

        console.log("📄 Generating PDF...");
        html2pdf()
            .set({
                margin: 10,
                filename: 'Hohyun_Henry_Lee_CV.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { format: 'a4', orientation: 'portrait' }
            })
            .from(element)
            .save()
            .then(() => console.log("✅ PDF Downloaded Successfully"))
            .catch(err => console.error("❌ PDF Generation Error:", err));
    });
});
