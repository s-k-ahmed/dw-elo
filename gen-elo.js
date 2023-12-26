let episodesWatched = []    // true for episodes marked as watched, false for episodes not marked as watched
let episodesNRanked = []    // number of times the episode has been ranked against another
let episodesElos = []       // elo scores for each episode
let optionA;
let optionB;
const versionNumber = "2.1.9";

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

document.getElementById("version") ? document.getElementById("version").textContent = "v" + versionNumber : null;

if (typeof(Storage) == "undefined") {
    document.getElementById("storage").textContent += "\nSorry, your browser does not support local storage, so data won't be saved between sessions."
}

function resetClick(start, end, bool) {
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
    resetClick(drEps[doctor][0], drEps[doctor][1], document.getElementById("dr" + doctor).checked)
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
    localStorage.setItem("notfirsttime" + extension, "true")
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
    let kFactor;
    kFactor = 10 * (Math.max(...episodesNRanked) * 2 / (episodesNRanked[optionA] + episodesNRanked[optionB]));
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
function importBackup(){
let eloBackup = [1570, 1242, 1513, 1569, 1515, 1527, 1344, 1277, 1394, 1389, 1510, 1601, 1644, 1309, 1396, 1411, 1347, 1674, 1251, 1508, 1305, 1595, 1277, 1520, 1223, 1401, 1611, 1607, 1222, 1610, 1466, 1261, 1361, 1426, 1595, 1504, 1450, 1500, 1500, 1500, 1500, 1500, 1500, 1500, 1500, 1500, 1500, 1500, 1500, 1500, 1500, 1485, 1699, 1478, 1676, 1449, 1491, 1432, 1343, 1628, 1410, 1627, 1622, 1601, 1389, 1689, 1284, 1605, 1250, 1613, 1718, 1530, 1244, 1474, 1576, 1361, 1689, 1316, 1731, 1271, 1524, 1612, 1349, 1457, 1703, 1719, 1487, 1548, 1619, 1359, 1744, 1436, 1717, 1280, 1644, 1641, 1230, 1500, 1396, 1284, 1437, 1591, 1312, 1319, 1436, 1723, 1241, 1521, 1264, 1500, 1500, 1500, 1500, 1500, 1500, 1500, 1500, 1364, 1500, 1500, 1500, 1398, 1500, 1500, 1500, 1500, 1500, 1500, 1500, 1500, 1500, 1500, 1500, 1500, 1500, 1501, 1675, 1324, 1500, 1448, 1500, 1500, 1500, 1500, 1500, 1500, 1500, 1500, 1230, 1500, 1500, 1500, 1500, 1500, 1500, 1500, 1500, 1571, 1500, 1551, 1342, 1526, 1364, 1506, 1466, 1640, 1334, 1631, 1627, 1384, 1464, 1627, 1316, 1385, 1628, 1715, 1497, 1511, 1616, 1381, 1376, 1643, 1648, 1513, 1252, 1501, 1351, 1351, 1361, 1720, 1787, 1476, 1414, 1744, 1736, 1423, 1673, 1559, 1742, 1738, 1761, 1745, 1712, 1438, 1552, 1722, 1407, 1568, 1445, 1234, 1673, 1617, 1750, 1452, 1692, 1609, 1694, 1586, 1743, 1279, 1732, 1610, 1414, 1276, 1302, 1626, 1550, 1322, 1266, 1515, 1372, 1307, 1499, 1686, 1599, 1377, 1413, 1326, 1379, 1477, 1677, 1559, 1298, 1403, 1691, 1289, 1376, 1425, 1459, 1350, 1691, 1346, 1235, 1554, 1521, 1253, 1259, 1635, 1474, 1633, 1381, 1583, 1510, 1297, 1644, 1771, 1644, 1742, 1335, 1605, 1436, 1600, 1438, 1649, 1757, 1569, 1295, 1316, 1365, 1596, 1276, 1415, 1499, 1511, 1503, 1271, 1516, 1308, 1380, 1668, 1334, 1497, 1436, 1304, 1658, 1637, 1546, 1279, 1700, 1391, 1418, 1584, 1607, 1378, 1724, 1532, 1367, 1622, 1318, 1604, 1578, 1782, 1507];
let nRankBackup = [96, 89, 91, 93, 90, 90, 91, 96, 85, 89, 89, 87, 90, 87, 86, 88, 86, 89, 88, 83, 87, 87, 88, 92, 87, 86, 90, 87, 88, 87, 89, 90, 81, 87, 88, 87, 86, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 85, 84, 86, 84, 83, 86, 83, 85, 87, 86, 88, 87, 85, 92, 85, 86, 88, 90, 92, 87, 87, 87, 85, 88, 94, 86, 93, 90, 90, 91, 88, 88, 90, 86, 89, 85, 86, 84, 84, 88, 87, 86, 85, 88, 82, 83, 0, 85, 86, 87, 82, 88, 85, 84, 85, 88, 85, 86, 0, 0, 0, 0, 0, 0, 0, 0, 87, 0, 0, 0, 86, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 81, 83, 82, 0, 87, 0, 0, 0, 0, 0, 0, 0, 0, 81, 0, 0, 0, 0, 0, 0, 0, 0, 85, 0, 84, 83, 82, 83, 84, 84, 86, 86, 84, 82, 84, 84, 84, 85, 85, 88, 85, 82, 89, 83, 88, 82, 91, 87, 89, 88, 88, 90, 87, 90, 87, 91, 87, 84, 89, 89, 86, 84, 85, 85, 86, 86, 82, 91, 86, 83, 84, 87, 88, 88, 86, 84, 85, 87, 88, 87, 86, 83, 86, 88, 84, 82, 88, 86, 81, 86, 85, 85, 87, 88, 87, 84, 88, 87, 83, 85, 87, 86, 84, 85, 88, 87, 86, 89, 87, 88, 90, 88, 91, 88, 94, 87, 86, 87, 84, 89, 85, 89, 81, 84, 88, 85, 86, 86, 86, 87, 89, 83, 89, 86, 87, 85, 83, 84, 85, 85, 87, 85, 87, 88, 84, 84, 85, 80, 81, 80, 86, 84, 82, 85, 85, 82, 83, 87, 82, 84, 86, 84, 89, 87, 85, 81, 82, 82, 81, 83, 87, 78, 81, 80, 78, 79, 78, 55];
    localStorage.setItem("eps-nranked", JSON.stringify(nRankBackup));
/* "[81,72,75,79,73,72,75,79,71,68,71,69,72,71,72,74,71,68,72,71,69,70,75,70,71,69,71,70,72,72,71,72,68,69,66,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,68,69,71,68,69,70,71,68,68,70,70,71,69,73,66,69,67,72,71,72,69,71,73,71,75,72,73,75,72,73,72,73,70,69,73,71,71,71,70,69,61,52,41,68,0,0,0,67,70,69,70,66,72,71,70,70,0,0,0,0,0,0,0,0,0,0,68,0,0,0,72,0,0,0,0,0,0,0,0,0,0,0,0,0,64,66,69,0,53,0,0,0,0,0,0,0,0,67,0,0,0,0,0,0,0,0,54,0,68,66,68,70,65,66,67,65,69,67,64,69,72,71,69,75,71,68,70,69,69,69,68,68,71,71,70,70,73,72,70,71,72,72,72,72,72,69,68,73,69,72,71,69,71,68,68,69,71,67,69,69,68,66,71,68,72,72,70,69,67,68,68,65,68,68,69,68,69,71,68,68,70,70,71,69,67,67,63,66,69,68,69,68,69,68,72,75,71,71,71,71,73,71,72,71,68,71,70,69,69,68,72,67,70,67,69,68,69,71,66,68,73,73,70,72,71,66,72,67,66,70,66,66,64,67,70,65,68,68,69,67,67,68,66,68,68,69,67,67,71,0,0,0,0,70,68,0,0,0,0,0,0,0]");
*/
    localStorage.setItem("eps-elos", JSON.stringify(eloBackup));
/* "[1592,1278,1499,1551,1504,1535,1339,1301,1400,1413,1532,1569,1606,1328,1403,1425,1367,1637,1272,1495,1344,1599,1295,1533,1268,1414,1607,1578,1262,1574,1464,1301,1362,1401,1559,1500,1500,1500,1500,1500,1500,1500,1500,1500,1500,1500,1500,1500,1500,1500,1500,1478,1687,1474,1642,1453,1493,1437,1397,1607,1447,1593,1616,1606,1421,1653,1308,1570,1301,1603,1694,1514,1282,1489,1545,1398,1661,1333,1719,1301,1538,1596,1354,1469,1668,1677,1492,1535,1621,1396,1718,1436,1659,1398,1595,1500,1500,1500,1419,1312,1459,1577,1358,1335,1452,1695,1279,1500,1500,1500,1500,1500,1500,1500,1500,1500,1500,1390,1500,1500,1500,1385,1500,1500,1500,1500,1500,1500,1500,1500,1500,1500,1500,1500,1500,1513,1628,1330,1500,1444,1500,1500,1500,1500,1500,1500,1500,1500,1265,1500,1500,1500,1500,1500,1500,1500,1500,1549,1500,1579,1374,1529,1381,1496,1471,1615,1363,1596,1629,1398,1468,1602,1318,1388,1596,1686,1492,1490,1580,1375,1383,1615,1600,1514,1277,1513,1387,1385,1375,1688,1738,1496,1414,1721,1697,1454,1640,1542,1713,1690,1734,1725,1684,1456,1548,1687,1425,1541,1446,1279,1651,1583,1711,1460,1657,1588,1660,1563,1699,1295,1705,1565,1454,1286,1339,1591,1525,1356,1294,1502,1385,1308,1493,1655,1594,1411,1433,1378,1375,1460,1666,1555,1330,1413,1671,1309,1406,1457,1448,1361,1665,1336,1260,1546,1512,1296,1276,1616,1471,1622,1400,1576,1503,1313,1648,1724,1621,1704,1360,1621,1439,1590,1434,1619,1726,1580,1322,1322,1388,1592,1296,1445,1500,1521,1485,1292,1524,1334,1402,1634,1354,1500,1438,1330,1632,1631,1522,1315,1650,1399,1500,1500,1500,1500,1697,1528,1500,1500,1500,1500,1500,1500,1500]");
    */
}