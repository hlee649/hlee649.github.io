document.addEventListener("DOMContentLoaded", function () {
    fetch("cv.json")
        .then(response => response.json())
        .then(data => {
            // Convert year values to numbers (in case any are strings)
            ["publications", "conferences", "other_conferences", "awards", "talks", "conference_proceedings", "patents"]
                .forEach(section => {
                    data[section]?.forEach(item => {
                        item.year = Number(item.year) || 0; // Ensure it's a number
                    });
                });

            // Sort all sections by year (most recent first)
            data.publications.sort((a, b) => b.year - a.year);
            data.conferences.sort((a, b) => b.year - a.year);
            data.other_conferences.sort((a, b) => b.year - a.year);
            data.awards.sort((a, b) => b.year - a.year);
            data.talks.sort((a, b) => b.year - a.year);

            // Display the sorted data
            displayCVData(data);
        })
        .catch(error => console.error("Error loading CV data:", error));
});


function displayCVData(data) {
    let pubList = document.getElementById("publication-list");
    data.publications.forEach((pub, index) => {
        let listItem = document.createElement("li");
        listItem.innerHTML = `
            <strong>[J${index + 1}] ${pub.title}</strong><br>
            ${formatAuthors(pub.authors)}<br>
            <i>${pub.journal}, ${pub.year}</i>
            <a href="${pub.doi}" target="_blank">DOI</a>
        `;
        pubList.appendChild(listItem);
    });

    

    let confList = document.getElementById("conference-list");
    data.conferences.forEach((conf, index) => {
        let listItem = document.createElement("li");
        listItem.innerHTML = `
            <strong>[C${index + 1}] "${conf.title}"</strong><br>
            ${formatAuthors(conf.authors)}<br>
            <i>${conf.conference}, ${conf.year}</i>
        `;
        confList.appendChild(listItem);
    });

    let otherConfList = document.getElementById("other-conference-list");
    data.other_conferences.forEach((conf, index) => {
        let listItem = document.createElement("li");
        listItem.innerHTML = `
            <strong>[OC${index + 1}] "${conf.title}"</strong><br>
            ${formatAuthors(conf.authors)}<br>
            <i>${conf.conference}, ${conf.year}</i>
        `;
        otherConfList.appendChild(listItem);
    });

    let awardList = document.getElementById("award-list");
    data.awards.forEach((award, index) => {
        let listItem = document.createElement("li");
        listItem.innerHTML = `
            <strong>[A${index + 1}]</strong> ${award.name}, <i>${award.organization}</i>, ${award.year}.
        `;
        awardList.appendChild(listItem);
    });

    let talkList = document.getElementById("talk-list");
    data.talks.forEach((talk, index) => {
        let listItem = document.createElement("li");
        listItem.innerHTML = `
            <strong>[I${index + 1}]</strong> "${talk.title}", ${talk.event}, ${talk.year}.
        `;
        talkList.appendChild(listItem);
    });

    let confProcList = document.getElementById("conference-proceedings-list");
    data.conference_proceedings.forEach((cp, index) => {
        let listItem = document.createElement("li");
        listItem.innerHTML = `
            <strong>[CP${index + 1}] ${cp.title}</strong><br>
            ${formatAuthors(cp.authors)}<br>
            <i>${cp.conference}, ${cp.year}</i>
        `;
        confProcList.appendChild(listItem);
    });

    let patentList = document.getElementById("patent-list");
    data.patents.forEach((pat, index) => {
        let listItem = document.createElement("li");
        listItem.innerHTML = `
            <strong>[P${index + 1}] ${pat.title} </strong><br>
            ${formatAuthors(pat.inventors)}<br>
            <i>Patent No: ${pat.patent_number}, ${pat.year}</i>
        `;
        patentList.appendChild(listItem);
    });

    let expList = document.getElementById("experience-list");
    data.experience.forEach((exp, index) => {
    let listItem = document.createElement("li");
    listItem.innerHTML = `
        <strong>${exp.role}</strong> — ${exp.organization} <br>
        <span class="muted">${exp.location} | ${exp.year}</span><br>
        <span>${exp.description}</span>
    `;
    expList.appendChild(listItem);
    });



}


// Function to bold and underline 'Hohyun Henry Lee' in author lists
function formatAuthors(authorString) {
    let nameToFormat = "Lee, H.";
    let regex = new RegExp(nameToFormat, "g");
    return authorString.replace(regex, `<strong><u style="color: orange;">${nameToFormat}</u></strong>`);
}



