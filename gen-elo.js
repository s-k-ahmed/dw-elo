let episodesWatched = []    // true for episodes marked as watched, false for episodes not marked as watched
let episodesNRanked = []    // number of times the episode has been ranked against another
let episodesElos = []       // elo scores for each episode
let optionA;
let optionB;
const versionNumber = "2.2.1";

initialise();
newRankOptions();

window.addEventListener("keydown", handleKeydown);

document.getElementById("version") ? document.getElementById("version").textContent = "v" + versionNumber : null;

if (typeof(Storage) == "undefined") {
    document.getElementById("storage").textContent += "\nSorry, your browser does not support local storage, so data won't be saved between sessions."
}

function handleKeydown(event) {
    switch (event.code) {
        case "ArrowLeft":
            rankerClick(1);
            break;
        case "ArrowDown":
            rankerClick(0);
            break;
        case "ArrowRight":
            rankerClick(-1);
            break;
    }
}

function resetChecks(start, end, bool) {
    for (let ep = start; ep <= end; ep++) {
        episodesWatched[ep] = bool
        document.getElementById("ep" + ep).checked = bool
    }
}
function clickEpCheck(evt) {
    let epnum = evt.currentTarget.episode
    episodesWatched[epnum] = document.getElementById("ep" + epnum).checked
    //document.getElementById("ep-watched-count").innerHTML = epnum + " " + episodesWatched[epnum] + " " + episodesWatched.filter(Boolean).length;
    updateWatchCount();
    saveToStorage();
}
function clickDrCheck(evt) {
    let doctor = evt.currentTarget.doctor
    resetChecks(drEps[doctor][0], drEps[doctor][1], document.getElementById("dr" + doctor).checked)
    saveToStorage();
    updateWatchCount();
}
function saveToStorage() {
    jsonWatched = JSON.stringify(episodesWatched);
    localStorage.setItem("eps-watched" + extension, jsonWatched);
    jsonNRanked = JSON.stringify(episodesNRanked);
    localStorage.setItem("eps-nranked" + extension, jsonNRanked);
    jsonElos = JSON.stringify(episodesElos);
    localStorage.setItem("eps-elos" + extension, jsonElos);
}
function getFromStorage() {
    let jsonWatched = localStorage.getItem("eps-watched" + extension);
    episodesWatched = JSON.parse(jsonWatched);
    updateWatchCount();
    let jsonNRanked = localStorage.getItem("eps-nranked" + extension);
    episodesNRanked = JSON.parse(jsonNRanked);
    let jsonElos = localStorage.getItem("eps-elos" + extension);
    episodesElos = JSON.parse(jsonElos);
}
function hideEps() {
    const epList = document.getElementById("ep-list-check");
    if (epList.style.display == "none") {
        epList.style.display = "block";
        document.getElementById("hide-eps").textContent = "Hide episodes"
    } else {
        epList.style.display = "none";
        document.getElementById("hide-eps").textContent = "Show episodes"
    }
}
function hideDrs() {
    drList = document.getElementById("dr-list-check");
    if (drList.style.display == "none") {
        drList.style.display = "block";
        document.getElementById("hide-drs").textContent = "Hide " + docOrSeries[1];
    } else {
        drList.style.display = "none";
        document.getElementById("hide-drs").textContent = "Show " + docOrSeries[1];
    }
}
function updateWatchCount() {
    document.getElementById("ep-watch-count").textContent = "Episodes/serials watched: " + episodesWatched.filter(Boolean).length;
}
function initialise() {
    setUp();
    buildChecxLabels();
    updateWatchCount();
    updateRankCount();
    hideDrs();
    hideEps();
    hideRankings();
    hideDrRankings();
}

function resetLocalStorage() {
    for (let ep=0; ep<episodeTitles.length; ep++) {
        episodesWatched[ep] = false;
        episodesNRanked[ep] = 0;
        episodesElos[ep] = 1500;
    }
    saveToStorage();
    localStorage.setItem("notfirsttime" + extension, "true");
    
    let resetTextEl = document.getElementById("reset-all");
    resetTextEl.innerText = "⚠ Reset everything";
}
function setUp() {
    if (localStorage.getItem("notfirsttime" + extension) != "true") {
        resetLocalStorage();
    } else {
        getFromStorage();
    }
}
function buildChecxLabels() {
    const checxArray = [];
    const labepArray = [];
    const drxArray = [];
    const labdrArray = [];
    const epListCheck = document.getElementById("ep-list-check");
    const drListCheck = document.getElementById("dr-list-check");

    for (let ep=0; ep<episodeTitles.length; ep++) {
        checxArray[ep] = document.createElement("input");
        epListCheck.appendChild(checxArray[ep]);
        checxArray[ep].type = "checkbox";
        checxArray[ep].id = "ep" + ep;
        checxArray[ep].episode = ep;
        checxArray[ep].addEventListener("click", clickEpCheck);
        checxArray[ep].checked = episodesWatched[ep];
    
        labepArray[ep] = document.createElement("label");
        labepArray[ep].for = "ep" + ep;
        labepArray[ep].id = "ep" + ep + "-lab";
        labepArray[ep].textContent = episodeTitles[ep];
        labepArray[ep].episode = ep;
        epListCheck.appendChild(labepArray[ep]);
        epListCheck.append(document.createElement("br"));
    }
    
    for (let dr=0; dr<doctors.length; dr++) {
        drxArray[dr] = document.createElement("input");
        drListCheck.appendChild(drxArray[dr]);
        drxArray[dr].type = "checkbox";
        drxArray[dr].id = "dr" + dr;
        drxArray[dr].doctor = dr;
        drxArray[dr].addEventListener("click", clickDrCheck);
        drxArray[dr].checked = episodesWatched.reduce((p, c, i) => (i >= drEps[dr][0] && i <= drEps[dr][1]) ? (p && c) : p, true);
    
        labdrArray[dr] = document.createElement("label");
        labdrArray[dr].for = "dr" + dr;
        labdrArray[dr].id = "dr" + dr + "-lab";
        labdrArray[dr].textContent = doctors[dr];
        labdrArray[dr].episode = dr;
        drListCheck.appendChild(labdrArray[dr]);
        drListCheck.append(document.createElement("br"));
    }
}
function newRankOptions() {
    let epsWatchIndices = [];
    episodesWatched.forEach((value, index) => value === true ? epsWatchIndices.push(index) : null)
    epsWatchIndices.sort((a, b) => {
        let rankedA = episodesNRanked[a] ? episodesNRanked[a] : 0;
        let rankedB = episodesNRanked[b] ? episodesNRanked[b] : 0; 
        return (Math.random()*((rankedA+1)**3)) - (Math.random()*((rankedB+1)**3))
    })
    let index2 = 1 + Math.floor(Math.random() * (epsWatchIndices.length / 2));
    let index1 = (epsWatchIndices[index2] == null) ? null : 0;
    
    // start test code
        /*
        let elo1 = episodesElos[epsWatchIndices[index1]];
        let lowerTen = epsWatchIndices.slice(1, 10);
        lowerTen.forEach(x => console.log(episodesElos[x]));
        let options = lowerTen.map((x) => Math.abs(elo1 - episodesElos[x]));
        index2 = 1 + options.indexOf(Math.min(...options));
        */
    // end test code

    if (Math.random() > .5) {
        [index1, index2] = [index2, index1];
    }
    optionA = epsWatchIndices[index1];
    optionB = epsWatchIndices[index2];
    document.getElementById("option-1").textContent = episodeTitles[optionA];
    document.getElementById("option-2").textContent = episodeTitles[optionB];
}
function rankerClick(option) {
    episodesNRanked[optionA] = episodesNRanked[optionA] ? episodesNRanked[optionA] + 1 : 1;
    episodesNRanked[optionB] = episodesNRanked[optionB] ? episodesNRanked[optionB] + 1 : 1;
    updateRankCount();
    let eloInitA = episodesElos[optionA] ? episodesElos[optionA] : 1500;
    let eloInitB = episodesElos[optionB] ? episodesElos[optionB] : 1500;
    let kFactor = 10;
    let maxNRanked = episodesNRanked.reduce((max, current) => max > current? max : current);
    kFactor = 10 * ((maxNRanked * 2 + 20) / (episodesNRanked[optionA] + episodesNRanked[optionB] + 20));
    let qA = 10 ** (eloInitA / 400);
    let qB = 10 ** (eloInitB / 400);
    let expScoreA = qA / (qA + qB);
    let expScoreB = qB / (qA + qB);
    let scoreA = 0.5 + (option / 2);
    let scoreB = 0.5 - (option / 2);
    let eloNewA = Math.round(eloInitA + kFactor * (scoreA - expScoreA));
    let eloNewB = Math.round(eloInitB + kFactor * (scoreB - expScoreB));
    episodesElos[optionA] = eloNewA;
    episodesElos[optionB] = eloNewB;
    saveToStorage();
    updateEpRankings();
    updateDrRankings();
    //typeof newOptionsNeighbours != "undefined" ? newOptionsNeighbours() : newRankOptions();
    newRankOptions();
}
function hideRankings(){
    updateEpRankings();
    const epRank = document.getElementById("ep-rankings");
    if (epRank.style.display == "none") {
        epRank.style.display = "block";
        document.getElementById("view-rankings").textContent = "Hide rankings"
    } else {
        epRank.style.display = "none";
        document.getElementById("view-rankings").textContent = "Show rankings"
    }
}
function hideDrRankings(){
    updateDrRankings();
    const drRank = document.getElementById("dr-rankings");
    if (drRank.style.display == "none") {
        drRank.style.display = "block";
        document.getElementById("view-dr-rankings").textContent = "Hide rankings by " + docOrSeries[0]
    } else {
        drRank.style.display = "none";
        document.getElementById("view-dr-rankings").textContent = "Show rankings by " + docOrSeries[0]
    }
}
function updateEpRankings(){
    document.getElementById("ep-rankings").textContent = "Rank\tRating\tnRanked\tEpisode";
    let epsRankIndices = [];
    episodesNRanked.forEach((value, index) => value > 0 && episodesWatched[index] == true ? epsRankIndices.push(index) : null);
    epsRankIndices.sort((a, b) => episodesElos[b] - episodesElos[a]);
    for (let index = 0; index < epsRankIndices.length; index++) {
        document.getElementById("ep-rankings").textContent += "\n" + (index + 1) + "\t" + episodesElos[epsRankIndices[index]] + "\t" + episodesNRanked[epsRankIndices[index]] + "\t" + episodeTitles[epsRankIndices[index]];
    }
}
function updateDrRankings(){
    document.getElementById("dr-rankings").textContent = "Rank\tavg\t" + docOrSeries[0];
    const drEloMeans = [];
    let drIndices = [];
    for (let dr=0; dr < doctors.length; dr++) {
        drIndices[dr] = dr;
        let drEpIndices = [];
        let drFirst = drEps[dr][0];
        let drLast = drEps[dr][1];
        for (let ep=0; ep < episodesNRanked.length; ep++) {
            if (episodesNRanked[ep] > 0 && ep >= drFirst && ep <= drLast) {
                drEpIndices.push(ep);
            }
        }
        const drWatchedElos = drEpIndices.map(value => episodesElos[value]);
        drEloMeans[dr] = Math.round(drWatchedElos.reduce((x, y) => x + y, 0) / drEpIndices.length);
    }
    let drIndFilt = drIndices.filter(x => !isNaN(drEloMeans[x]))
    drIndFilt.sort((a, b) => drEloMeans[b] - drEloMeans[a]);
    for (let index = 0; index < drIndFilt.length; index++) {
        document.getElementById("dr-rankings").textContent += "\n" + (index + 1) + "\t" + drEloMeans[drIndFilt[index]] + "\t" + doctors[drIndFilt[index]];
    }
}
function updateRankCount(){
    let totalNRanked = episodesNRanked.reduce((x, y) => x + y) / 2;
    document.getElementById("rank-count").textContent = "Rankings so far: " + totalNRanked;
}
function resetClick() {
    let resetTextEl = document.getElementById("reset-all");
    if (resetTextEl.innerText == "⚠ Reset everything") {
        resetTextEl.innerText = "⚠ Confirm reset";
    } else {
        resetLocalStorage();
        location.reload();
    }
}
function exportRankings(){
    let epRankings = document.getElementById("ep-rankings").textContent;
    navigator.clipboard.writeText(epRankings);
    alert("Rankings copied to clipboard");
}
function importRankings(){
    resetLocalStorage();
    let importText = document.getElementById('import-text').value;
    let importEps = importText.split("\n");
    importEps.shift();
    importEps.forEach(x => {
        let a = x.split("\t");
        let elo = parseInt(a[1]);
        let nRank = parseInt(a[2]);
        let title = a[3];
        let ep = episodeTitles.indexOf(title);
        episodesWatched[ep] = true;
        episodesNRanked[ep] = nRank;
        episodesElos[ep] = elo;
        console.log(title + elo + nRank);
    });
    saveToStorage();
    location.reload();
    document.getElementById('import-text').value = "";
}