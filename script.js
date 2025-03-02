/* Fonction ------------------------------------------------------------------------------------------------------------------------------------------------------*/

var competenceStatus="verifier";
setPersonalProjects();
function afficherImageAgauche(imgLink){
    var img = document.getElementById('imgR');
    img.src = "assets/imgs/more/"+imgLink+".png";
}

async function getJSONFile(file) {
    try {
        const response = await fetch(`assets/json/${file}.json`);
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
        return await response.json(); // Retourne les données
    } catch (error) {
        console.error('Erreur lors du chargement du JSON:', error);
        return null; // Pour éviter les erreurs si le JSON ne se charge pas
    }
}

function closePopUp(){
    var popUp = document.getElementById('popUp');
    var bgBlur = document.getElementById('blurBg');
    popUp.style.display = "none";
    bgBlur.style.display = "none";

    // Permettre à nouveau le défilement
    document.body.style.overflow = 'auto';
}

function changeCompetences(){
    if (competenceStatus == "verifier"){
        updateCompetences("concevoir");
        competenceStatus = "concevoir";
    }else{
        updateCompetences("verifier");
        competenceStatus = "verifier";
    }
}

async function updateCompetences(competence) {
    var data = await getJSONFile('competences'); // Attendre que les données soient chargées

    var mainDiv = document.getElementById('competencesContainer');
    mainDiv.innerHTML = "";

    for (var i = 0; i < data[competence].length; i++) {
        let illustrationContainer = data[competence][i].svg 
            ? `<div class="iconContainer">${data[competence][i].svg}</div>` 
            : `<div class="imgContainer"><img src="${data[competence][i].img}"></div>`;

        mainDiv.innerHTML += `
            <div class="competencesCard">
                ${illustrationContainer}
                <h2 id="h${i}">${data[competence][i].nom}</h2>
                <p style="display:none;" id="d${i}">${data[competence][i].texte}</p>
                <p id="r${i}" class="ressource">${data[competence][i].ressource}</p>
                <div onclick="showCompetences(${i})" class="buttonSeeMore">Voir plus</div>
            </div>
        `;
    }
}


//can be merged with updateCompetences
async function setPersonalProjects(){
    var data = await getJSONFile('projetsPerso'); // Attendre que les données soient chargées

    data = data['projetsPerso'];
    console.log(data);
    var mainDiv = document.getElementById('ProjetPersoContainer');
    mainDiv.innerHTML = "";

    for (var i = 0; i < data.length; i++) {
        let illustrationContainer = data[i].svg 
            ? `<div class="iconContainer">${data[i].svg}</div>` 
            : `<div class="imgContainer"><img src="${data[i].img}"></div>`;

        mainDiv.innerHTML += `
            <div class="competencesCard">
                ${illustrationContainer}
                <h2 id="h${i}">${data[i].nom}</h2>
                <p style="display:none;" id="d${i}">${data[i].texte}</p>
                <p id="r${i}" class="ressource">${data[i].ressource}</p>
                <div onclick="showCompetences(${i}, true)" class="buttonSeeMore">Voir plus</div>
            </div>
        `;
    }
}

function showCompetences(id, isProject = false){
    var bgBlur = document.getElementById('blurBg');
    var popUp = document.getElementById('popUp');
    var titlePopUp = document.getElementById('popUpTitle');
    var ressName = document.getElementById('RName');
    var texte = document.getElementById('description');
    var img = document.getElementById('imgR');

    if (isProject) {
        // Fetch project data from projetsPerso.json
        getJSONFile('projetsPerso').then(data => {
            data = data['projetsPerso'][id];
            img.src = data.img ? data.img : "assets/imgs/default.png";
            titlePopUp.innerText = data.nom;
            ressName.innerText = data.ressource;
            texte.innerHTML = data.texte;
        });
    } else {
        type = competenceStatus == "verifier" ? "V" : "C";
        img.src = "assets/imgs/" + type + id + ".png";
        titlePopUp.innerText = document.getElementById('h' + id).innerText;
        ressName.innerText = document.getElementById('r' + id).innerText;
        texte.innerHTML = document.getElementById('d' + id).innerHTML;
    }

    bgBlur.style.display = "flex";
    popUp.style.display = "flex";

    // Empêcher le défilement
    document.body.style.overflow = 'hidden';
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// gère l'affichage de PERRET Noah
window.addEventListener("load", (event) => {
    updateCompetences("verifier");
    var nameDiv = document.getElementById('name');
    var nameDiv2 = document.getElementById('surname');
    var name = "Noah";
    var surname = "Perret";
    var j = 0;
    var i = 0;
    var text = "";
    var text2 = "";
    var baseSpeed = 200;
    var speedCursor = 500;
    var cursor = '<span class="cursor">│</span>'; // Curseur dans un span

    function getRandomSpeed() {
        return baseSpeed + Math.random() * 100 - 50; // Variation de +/- 50ms
    }

    async function typeWriter() {
        if (i < name.length) {
            text = name.slice(0, i + 1); // Get the substring up to the current letter
            nameDiv.innerHTML = text + cursor; // Show the cursor while typing
            i++;
            await sleep(getRandomSpeed());
            typeWriter(); // Continue typing the next letter
        } else {
            nameDiv.innerHTML = name; // Remove the cursor after "Noah" is fully typed
            await sleep(getRandomSpeed());
            typeWriterSurname(); // Move to typing the surname
        }
    }

    async function typeWriterSurname() {
        if (j < surname.length) {
            text2 = surname.slice(0, j + 1); // Get the substring for the surname
            nameDiv2.innerHTML = text2 + cursor; // Show the cursor while typing
            j++;
            await sleep(getRandomSpeed());
            typeWriterSurname(); // Continue typing the next letter
        } else {
            nameDiv2.innerHTML = "Perret" + cursor; // Blinking cursor after the full surname
            await sleep(speedCursor);
            nameDiv2.innerHTML = "Perret "; // Remove cursor momentarily
            await sleep(speedCursor);
            typeWriterSurname(); // Keep the cursor blinking after finishing the surname
        }
    }

    typeWriter();
});

//descend la fleche quand on scroll
window.addEventListener("scroll", (event) => {
    var scrollButton = document.getElementById('downArrow');
    if(window.scrollY > 50){
        scrollButton.style.bottom = "-1000px";
    }
    else{
        scrollButton.style.display = "flex";
        scrollButton.style.bottom = "40px";
    }
    if(scrollButton.style.bottom == "-1000px"){
        scrollButton.style.display = "none";
    }
});

// scroll down arrow button
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('downArrow').addEventListener('click', function() {
        window.scrollBy({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    });
});

//détection appuis sur echap pour fermer la popUp
window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' || event.key === 'Esc') {
        closePopUp();
    }
});

//affichage de l'image en pleine écran lorsqu'on clique dessus
document.addEventListener('DOMContentLoaded', function() {
    var img = document.getElementById('imgR');
    //var audio = new Audio('./assets/a.mp3'); // Crée un nouvel élément audio

    img.addEventListener('click', function() {
        var imgSrc = img.src;
        window.open(imgSrc, '_blank');
        //audio.play();
    });
});

//affication du message d'erreur si l'utilisateur est sur mobile
function checkDevice() {
    if (window.innerWidth <= 800) {
        document.getElementById("mobileMessage").style.display = "block";
        var bgBlur = document.getElementById('blurBg');
        bgBlur.style.display = "flex";
    }else {
        document.getElementById("mobileMessage").style.display = "none";
        var bgBlur = document.getElementById('blurBg');
        bgBlur.style.display = "none";
    }
}

document.addEventListener('DOMContentLoaded', checkDevice);
window.addEventListener('resize', checkDevice);
