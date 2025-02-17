document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("download-pdf").addEventListener("click", function () {
        const element = document.getElementById("cv-content"); // Selects CV content
        html2pdf()
            .set({
                margin: 10,
                filename: 'Hohyun_Henry_Lee_CV.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { format: 'a4', orientation: 'portrait' }
            })
            .from(element)
            .save();
    });
});
