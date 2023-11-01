if (typeof(Storage) == "undefined") {
    document.getElementById("storage").textContent += "\nSorry, your browser does not support local storage, so data won't be saved between sessions."
}

function resetClick(start, end, bool) {
    for (ep = start; ep <= end; ep++) {
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
    resetClick(drEps[doctor][0], drEps[doctor][1], document.getElementById("dr" + doctor).checked)
    saveToStorage();
    updateWatchCount();
}
function importBackup() {
    /*
    localStorage.setItem("eps-nranked", "[81,72,75,79,73,72,75,79,71,68,71,69,72,71,72,74,71,68,72,71,69,70,75,70,71,69,71,70,72,72,71,72,68,69,66,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,68,69,71,68,69,70,71,68,68,70,70,71,69,73,66,69,67,72,71,72,69,71,73,71,75,72,73,75,72,73,72,73,70,69,73,71,71,71,70,69,61,52,41,68,0,0,0,67,70,69,70,66,72,71,70,70,0,0,0,0,0,0,0,0,0,0,68,0,0,0,72,0,0,0,0,0,0,0,0,0,0,0,0,0,64,66,69,0,53,0,0,0,0,0,0,0,0,67,0,0,0,0,0,0,0,0,54,0,68,66,68,70,65,66,67,65,69,67,64,69,72,71,69,75,71,68,70,69,69,69,68,68,71,71,70,70,73,72,70,71,72,72,72,72,72,69,68,73,69,72,71,69,71,68,68,69,71,67,69,69,68,66,71,68,72,72,70,69,67,68,68,65,68,68,69,68,69,71,68,68,70,70,71,69,67,67,63,66,69,68,69,68,69,68,72,75,71,71,71,71,73,71,72,71,68,71,70,69,69,68,72,67,70,67,69,68,69,71,66,68,73,73,70,72,71,66,72,67,66,70,66,66,64,67,70,65,68,68,69,67,67,68,66,68,68,69,67,67,71,0,0,0,0,70,68,0,0,0,0,0,0,0]");
    localStorage.setItem("eps-elos", "[1592,1278,1499,1551,1504,1535,1339,1301,1400,1413,1532,1569,1606,1328,1403,1425,1367,1637,1272,1495,1344,1599,1295,1533,1268,1414,1607,1578,1262,1574,1464,1301,1362,1401,1559,1500,1500,1500,1500,1500,1500,1500,1500,1500,1500,1500,1500,1500,1500,1500,1500,1478,1687,1474,1642,1453,1493,1437,1397,1607,1447,1593,1616,1606,1421,1653,1308,1570,1301,1603,1694,1514,1282,1489,1545,1398,1661,1333,1719,1301,1538,1596,1354,1469,1668,1677,1492,1535,1621,1396,1718,1436,1659,1398,1595,1500,1500,1500,1419,1312,1459,1577,1358,1335,1452,1695,1279,1500,1500,1500,1500,1500,1500,1500,1500,1500,1500,1390,1500,1500,1500,1385,1500,1500,1500,1500,1500,1500,1500,1500,1500,1500,1500,1500,1500,1513,1628,1330,1500,1444,1500,1500,1500,1500,1500,1500,1500,1500,1265,1500,1500,1500,1500,1500,1500,1500,1500,1549,1500,1579,1374,1529,1381,1496,1471,1615,1363,1596,1629,1398,1468,1602,1318,1388,1596,1686,1492,1490,1580,1375,1383,1615,1600,1514,1277,1513,1387,1385,1375,1688,1738,1496,1414,1721,1697,1454,1640,1542,1713,1690,1734,1725,1684,1456,1548,1687,1425,1541,1446,1279,1651,1583,1711,1460,1657,1588,1660,1563,1699,1295,1705,1565,1454,1286,1339,1591,1525,1356,1294,1502,1385,1308,1493,1655,1594,1411,1433,1378,1375,1460,1666,1555,1330,1413,1671,1309,1406,1457,1448,1361,1665,1336,1260,1546,1512,1296,1276,1616,1471,1622,1400,1576,1503,1313,1648,1724,1621,1704,1360,1621,1439,1590,1434,1619,1726,1580,1322,1322,1388,1592,1296,1445,1500,1521,1485,1292,1524,1334,1402,1634,1354,1500,1438,1330,1632,1631,1522,1315,1650,1399,1500,1500,1500,1500,1697,1528,1500,1500,1500,1500,1500,1500,1500]");
    */
}
function saveToStorage() {
    jsonWatched = JSON.stringify(episodesWatched);
    localStorage.setItem("eps-watched", jsonWatched);
    jsonNRanked = JSON.stringify(episodesNRanked);
    localStorage.setItem("eps-nranked", jsonNRanked);
    jsonElos = JSON.stringify(episodesElos);
    localStorage.setItem("eps-elos", jsonElos);
}
function getFromStorage() {
    var jsonWatched = localStorage.getItem("eps-watched");
    episodesWatched = JSON.parse(jsonWatched);
    updateWatchCount();
    var jsonNRanked = localStorage.getItem("eps-nranked");
    episodesNRanked = JSON.parse(jsonNRanked);
    var jsonElos = localStorage.getItem("eps-elos");
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
        document.getElementById("hide-drs").textContent = "Hide Doctors"
    } else {
        drList.style.display = "none";
        document.getElementById("hide-drs").textContent = "Show Doctors"
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
    for (ep=0; ep<episodeTitles.length; ep++) {
        episodesWatched[ep] = false;
        episodesNRanked[ep] = 0;
        episodesElos[ep] = 1500;
    }
    saveToStorage();
    localStorage.setItem("notfirsttime", "true")
}
function setUp() {
    if (localStorage.getItem("notfirsttime") != "true") {
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

    for (ep=0; ep<episodeTitles.length; ep++) {
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
    
    for (dr=0; dr<doctors.length; dr++) {
        drxArray[dr] = document.createElement("input");
        drListCheck.appendChild(drxArray[dr]);
        drxArray[dr].type = "checkbox";
        drxArray[dr].id = "dr" + dr;
        drxArray[dr].doctor = dr;
        drxArray[dr].addEventListener("click", clickDrCheck);
    
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
    var epsWatchIndices = [];
    episodesWatched.forEach((value, index) => value === true ? epsWatchIndices.push(index) : null)
    epsWatchIndices.sort((a, b) => (Math.random()*((episodesNRanked[a]+1)**2)) - (Math.random()*((episodesNRanked[b]+1)**2)))
    window.optionA = epsWatchIndices[0];
    window.optionB = epsWatchIndices[1];
    document.getElementById("option-1").textContent = episodeTitles[optionA];
    document.getElementById("option-2").textContent = episodeTitles[optionB];
}
function rankerClick(option) {
    episodesNRanked[window.optionA]++
    episodesNRanked[window.optionB]++
    updateRankCount();
    var eloInitA = episodesElos[window.optionA];
    var eloInitB = episodesElos[window.optionB];
    const kFactor = 10;
    var qA = 10 ** (eloInitA / 400);
    var qB = 10 ** (eloInitB / 400);
    var expScoreA = qA / (qA + qB);
    var expScoreB = qB / (qA + qB);
    var scoreA = 0.5 + (option / 2);
    var scoreB = 0.5 - (option / 2);
    var eloNewA = Math.round(eloInitA + kFactor * (scoreA - expScoreA));
    var eloNewB = Math.round(eloInitB + kFactor * (scoreB - expScoreB));
    episodesElos[window.optionA] = eloNewA;
    episodesElos[window.optionB] = eloNewB;
    saveToStorage();
    updateEpRankings();
    updateDrRankings();
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
        document.getElementById("view-dr-rankings").textContent = "Hide rankings by Doctor"
    } else {
        drRank.style.display = "none";
        document.getElementById("view-dr-rankings").textContent = "Show rankings by Doctor"
    }
}
function updateEpRankings(){
    document.getElementById("ep-rankings").textContent = "Rank \t Rating \t nRanked \t Episode";
    var epsRankIndices = [];
    episodesNRanked.forEach((value, index) => value > 0 && episodesWatched[index] == true ? epsRankIndices.push(index) : null);
    epsRankIndices.sort((a, b) => episodesElos[b] - episodesElos[a]);
    for (index = 0; index < epsRankIndices.length; index++) {
        document.getElementById("ep-rankings").textContent += "\n" + (index + 1) + "\t" + episodesElos[epsRankIndices[index]] + "\t" + episodesNRanked[epsRankIndices[index]] + "\t" + episodeTitles[epsRankIndices[index]];
    }
}
function updateDrRankings(){
    document.getElementById("dr-rankings").textContent = "Rank \t avg Rating \t Doctor";
    const drEloMeans = [];
    var drIndices = [];
    for (dr=0; dr < doctors.length; dr++) {
        drIndices[dr] = dr;
        var drEpIndices = [];
        let drFirst = drEps[dr][0];
        let drLast = drEps[dr][1];
        for (ep=0; ep < episodesNRanked.length; ep++) {
            if (episodesNRanked[ep] > 0 && ep >= drFirst && ep <= drLast) {
                drEpIndices.push(ep);
            }
        }
        const drWatchedElos = drEpIndices.map(value => episodesElos[value]);
        drEloMeans[dr] = Math.round(drWatchedElos.reduce((x, y) => x + y, 0) / drEpIndices.length);
    }
    var drIndFilt = drIndices.filter(x => !isNaN(drEloMeans[x]))
    drIndFilt.sort((a, b) => drEloMeans[b] - drEloMeans[a]);
    for (index = 0; index < drIndFilt.length; index++) {
        document.getElementById("dr-rankings").textContent += "\n" + (index + 1) + "\t" + drEloMeans[drIndFilt[index]] + "\t" + doctors[drIndFilt[index]];
    }
}
function updateRankCount(){
    var totalNRanked = episodesNRanked.reduce((x, y) => x + y) / 2;
    document.getElementById("rank-count").textContent = "Rankings so far: " + totalNRanked;
}

const episodeTitles = [
    "An Unearthly Child",
    "100,000 BC",
    "The Daleks",
    "The Edge of Destruction",
    "Marco Polo",
    "The Keys of Marinus",
    "The Aztecs",
    "The Sensorites",
    "The Reign of Terror",
    "Planet of Giants",
    "The Dalek Invasion of Earth",
    "The Rescue",
    "The Romans",
    "The Web Planet",
    "The Crusade",
    "The Space Museum",
    "The Chase",
    "The Time Meddler",
    "Galaxy 4",
    "Mission to the Unknown",
    "The Myth Makers",
    "The Daleks' Master Plan",
    "The Massacre of St Bartholomew's Eve",
    "The Ark",
    "The Celestial Toymaker",
    "The Gunfighters",
    "The Savages",
    "The War Machines",
    "The Smugglers",
    "The Tenth Planet",
    "The Power of the Daleks",
    "The Highlanders",
    "The Underwater Menace",
    "The Moonbase",
    "The Macra Terror",
    "The Faceless Ones",
    "The Evil of the Daleks",
    "The Tomb of the Cybermen",
    "The Abominable Snowmen",
    "The Ice Warriors",
    "The Enemy of the World",
    "The Web of Fear",
    "Fury from the Deep",
    "The Wheel in Space",
    "The Dominators",
    "The Mind Robber",
    "The Invasion",
    "The Krotons",
    "The Seeds of Death",
    "The Space Pirates",
    "The War Games",
    "Spearhead from Space",
    "Doctor Who and the Silurians",
    "The Ambassadors of Death",
    "Inferno",
    "Terror of the Autons",
    "The Mind of Evil",
    "The Claws of Axos",
    "Colony in Space",
    "The Dæmons",
    "Day of the Daleks",
    "The Curse of Peladon",
    "The Sea Devils",
    "The Mutants",
    "The Time Monster",
    "The Three Doctors",
    "Carnival of Monsters",
    "Frontier in Space",
    "Planet of the Daleks",
    "The Green Death",
    "The Time Warrior",
    "Invasion of the Dinosaurs",
    "Death to the Daleks",
    "The Monster of Peladon",
    "Planet of the Spiders",
    "Robot",
    "The Ark in Space",
    "The Sontaran Experiment",
    "Genesis of the Daleks",
    "Revenge of the Cybermen",
    "Terror of the Zygons",
    "Planet of Evil",
    "Pyramids of Mars",
    "The Android Invasion",
    "The Brain of Morbius",
    "The Seeds of Doom",
    "The Masque of Mandragora",
    "The Hand of Fear",
    "The Deadly Assassin",
    "The Face of Evil",
    "The Robots of Death",
    "The Talons of Weng-Chiang",
    "Horror of Fang Rock",
    "The Invisible Enemy",
    "Image of the Fendahl",
    "The Sun Makers",
    "Underworld",
    "The Invasion of Time",
    "The Ribos Operation",
    "The Pirate Planet",
    "The Stones of Blood",
    "The Androids of Tara",
    "The Power of Kroll",
    "The Armageddon Factor",
    "Destiny of the Daleks",
    "City of Death",
    "The Creature from the Pit",
    "Nightmare of Eden",
    "The Horns of Nimon",
    "Shada",
    "The Leisure Hive",
    "Meglos",
    "Full Circle",
    "State of Decay",
    "Warriors' Gate",
    "The Keeper of Traken",
    "Logopolis",
    "Castrovalva",
    "Four to Doomsday",
    "Kinda",
    "The Visitation",
    "Black Orchid",
    "Earthshock",
    "Time-Flight",
    "Arc of Infinity",
    "Snakedance",
    "Mawdryn Undead",
    "Terminus",
    "Enlightenment",
    "The King's Demons",
    "The Five Doctors",
    "Warriors of the Deep",
    "The Awakening",
    "Frontios",
    "Resurrection of the Daleks",
    "Planet of Fire",
    "The Caves of Androzani",
    "The Twin Dilemma",
    "Attack of the Cybermen",
    "Vengeance on Varos",
    "The Mark of the Rani",
    "The Two Doctors",
    "Timelash",
    "Revelation of the Daleks",
    "The Mysterious Planet",
    "Mindwarp",
    "Terror of the Vervoids",
    "The Ultimate Foe",
    "Time and the Rani",
    "Paradise Towers",
    "Delta and the Bannermen",
    "Dragonfire",
    "Remembrance of the Daleks",
    "The Happiness Patrol",
    "Silver Nemesis",
    "The Greatest Show in the Galaxy",
    "Battlefield",
    "Ghost Light",
    "The Curse of Fenric",
    "Survival",
    "Doctor Who",
    "Rose",
    "The End of the World",
    "The Unquiet Dead",
    "Aliens of London",
    "Dalek",
    "The Long Game",
    "Father's Day",
    "The Empty Child",
    "Boom Town",
    "Bad Wolf",
    "The Christmas Invasion",
    "New Earth",
    "Tooth and Claw",
    "School Reunion",
    "The Girl in the Fireplace",
    "Rise of the Cybermen",
    "The Idiot's Lantern",
    "The Impossible Planet",
    "Love and Monsters",
    "Fear Her",
    "Doomsday",
    "The Runaway Bride",
    "Smith & Jones",
    "The Shakespeare Code",
    "Gridlock",
    "Evolution of the Daleks",
    "The Lazarus Experiment",
    "42",
    "Human Nature",
    "Blink",
    "Utopia/Last of the Time Lords",
    "Voyage of the Damned",
    "Partners in Crime",
    "The Fires of Pompeii",
    "Planet of the Ood",
    "The Sontaran Stratagem",
    "The Doctor's Daughter",
    "The Unicorn and the Wasp",
    "Silence in the Library",
    "Midnight",
    "Turn Left",
    "Journey's End",
    "The Next Doctor",
    "Planet of the Dead",
    "The Waters of Mars",
    "The End of Time",
    "The Eleventh Hour",
    "The Beast Below",
    "Victory of the Daleks",
    "The Time of Angels",
    "The Vampires of Venice",
    "Amy's Choice",
    "Cold Blood",
    "Vincent and the Doctor",
    "The Lodger",
    "The Big Bang",
    "A Christmas Carol",
    "The Impossible Astronaut",
    "The Curse of the Black Spot",
    "The Doctor's Wife",
    "The Rebel Flesh",
    "A Good Man Goes to War",
    "Let's Kill Hitler",
    "Night Terrors",
    "The Girl Who Waited",
    "The God Complex",
    "Closing Time",
    "The Wedding of River Song",
    "The Doctor, the Widow and the Wardrobe",
    "Asylum of the Daleks",
    "Dinosaurs on a Spaceship",
    "A Town Called Mercy",
    "The Power of Three",
    "The Angels Take Manhattan",
    "The Snowmen",
    "The Bells of Saint John",
    "The Rings of Akhaten",
    "Cold War",
    "Hide",
    "Journey to the Centre of the TARDIS",
    "The Crimson Horror",
    "Nightmare in Silver",
    "The Name of the Doctor",
    "The Day of the Doctor",
    "The Time of the Doctor",
    "Deep Breath",
    "Into the Dalek",
    "Robot of Sherwood",
    "Listen",
    "Time Heist",
    "The Caretaker",
    "Kill the Moon",
    "Mummy on the Orient Express",
    "Flatline",
    "In the Forest of the Night",
    "Death in Heaven",
    "Last Christmas",
    "The Magician's Apprentice",
    "Under the Lake / Before the Flood",
    "The Girl Who Died",
    "The Woman Who Lived",
    "The Zygon Invasion",
    "Sleep No More",
    "Face the Raven",
    "Heaven Sent",
    "Hell Bent",
    "The Husbands of River Song",
    "The Return of Doctor Mysterio",
    "The Pilot",
    "Smile",
    "Thin Ice",
    "Knock Knock",
    "Oxygen",
    "Extremis",
    "The Pyramid at the End of the World",
    "The Lie of the Land",
    "Empress of Mars",
    "The Eaters of Light",
    "World Enough and Time",
    "Twice Upon A Time",
    "The Woman Who Fell to Earth",
    "The Ghost Monument",
    "Rosa",
    "Arachnids in the UK",
    "The Tsuranga Conundrum",
    "Demons of the Punjab",
    "Kerblam!",
    "The Witchfinders",
    "It Takes You Away",
    "The Battle of Ranskoor av Kolos",
    "Resolution",
    "Spyfall",
    "Orphan 55",
    "Nikola Tesla's Night of Terror",
    "Fugitive of the Judoon",
    "Praxeus",
    "Can You Hear Me?",
    "The Haunting of Villa Diodati",
    "Ascension of the Cybermen",
    "Revolution of the Daleks",
    "The Halloween Apocalypse",
    "War of the Sontarans",
    "Once, Upon Time",
    "Village of the Angels",
    "Survivors of the Flux",
    "The Vanquishers",
    "Eve of the Daleks",
    "Legend of the Sea Devils",
    "The Power of the Doctor",
    "The Star Beast",
    "Wild Blue Yonder",
    "The Giggle",
]
const doctors = [
    "1st (Hartnell)", 
    "2nd (Troughton)", 
    "3rd (Pertwee)", 
    "4th (Baker)", 
    "5th (Davison)", 
    "6th (Baker)", 
    "7th (McCoy)", 
    "8th (McGann)", 
    "9th (Eccleston)", 
    "10th (Tennant)", 
    "11th (Smith)",
    "12th (Capaldi)",
    "13th (Whittaker)",
    "14th (Tennant)"
]
const drEps = [
    [0, 29], [30, 50], [51, 74], [75, 116], [117, 136], [137, 147], [148, 159], [160, 160], [161, 170], [171, 206], [207, 245], [246, 280], [281, 309], [310, 312]
]

var episodesWatched = []    // true for episodes marked as watched, false for episodes not marked as watched
var episodesNRanked = []    // number of times the episode has been ranked against another
var episodesElos = []       // elo scores for each episode
var optionA;
var optionB;

importBackup();
initialise();
newRankOptions();

window.addEventListener("keydown", function(event){
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
})