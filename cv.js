document.addEventListener("DOMContentLoaded", function () {
    fetch("cv.json")
        .then(response => response.json())
        .then(data => {
            displayCVData(data);
        })
        .catch(error => console.error("Error loading CV data:", error));
});

function displayCVData(data) {
    let pubList = document.getElementById("publication-list");
    data.publications.forEach((pub, index) => {
        let listItem = document.createElement("li");
        listItem.innerHTML = `
            <strong>[${pub.id || "J" + (index + 1)}] ${pub.title}</strong><br>
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
            <strong>[${conf.id || "C" + (index + 1)}]</strong> 
            ${formatAuthors(conf.authors)} <br>
            "${conf.title}" (${conf.year}). <i>${conf.conference}</i>.
        `;
        confList.appendChild(listItem);
    });

    let otherConfList = document.getElementById("other-conference-list");
    data.other_conferences.forEach((conf, index) => {
        let listItem = document.createElement("li");
        listItem.innerHTML = `
            <strong>[${conf.id || "OC" + (index + 1)}]</strong> 
            ${formatAuthors(conf.authors)} <br>
            "${conf.title}" (${conf.year}). <i>${conf.conference}</i>.
        `;
        otherConfList.appendChild(listItem);
    });

    let awardList = document.getElementById("award-list");
    data.awards.forEach((award, index) => {
        let listItem = document.createElement("li");
        listItem.innerHTML = `
            <strong>[${award.id || "A" + (index + 1)}]</strong> 
            ${award.name}, ${award.organization}, ${award.year}.
        `;
        awardList.appendChild(listItem);
    });

    let talkList = document.getElementById("talk-list");
    data.talks.forEach((talk, index) => {
        let listItem = document.createElement("li");
        listItem.innerHTML = `
            <strong>[${talk.id || "I" + (index + 1)}]</strong> 
            ${talk.title}, ${talk.event}, ${talk.year}.
        `;
        talkList.appendChild(listItem);
    });
}

// Function to bold 'Hohyun Henry Lee' in the author list
function formatAuthors(authorString) {
    let nameToBold = "Lee, Hs.";
    return authorString.replace(nameToBold, `<strong><u>${nameToBold}</u></strong>`);
}
