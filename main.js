/* Fonction ------------------------------------------------------------------------------------------------------------------------------------------------------*/

var competenceStatus = "verifier";
setPersonalProjects();
function afficherImageAgauche(imgLink) {
    var img = document.getElementById('imgR');
    img.src = "assets/imgs/more/" + imgLink + ".png";
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

function closePopUp() {
    var popUp = document.getElementById('popUp');
    var bgBlur = document.getElementById('blurBg');
    popUp.style.display = "none";
    bgBlur.style.display = "none";

    // Permettre à nouveau le défilement
    document.body.style.overflow = 'auto';
}

function changeCompetences(choosenCompetence) {
    updateCompetences(choosenCompetence);
    competenceStatus = choosenCompetence;

    //clear all CSS
    var allButtons = document.querySelector(".tab-container")
    console.log(allButtons.children[0])
    Array.from(allButtons.children).forEach(button => {
        button.className="tab-button"
        console.log(button.style)
    });

    //set current
    document.getElementById(choosenCompetence).classList.add("active")
}

async function updateCompetences(competence) {
    var data = await getJSONFile('competences'); // Attendre que les données soient chargées
    var mainDiv = document.getElementById('competencesContainer');

    /*//test Ajoute la classe d'animation
    mainDiv.classList.add('slide');

    // Quand l'animation est terminée, retire la classe
    mainDiv.addEventListener('animationend', function handler() {
        mainDiv.classList.remove('slide');
        mainDiv.removeEventListener('animationend', handler);
    });*/ 


    mainDiv.innerHTML = "";

    for (var i = 0; i < data[competence].length; i++) {
        let illustrationContainer = data[competence][i].svg
            ? `<div class="iconContainer">${data[competence][i].svg}</div>`
            : `<div class="imgContainer"><img src="${data[competence][i].img}"></div>`;

        mainDiv.innerHTML += `
            <div class="competencesCard" onclick="showCompetences('${i}')">
                ${illustrationContainer}
                <h2 id="h${i}">${data[competence][i].nom}</h2>
                <p style="display:none;" id="d${i}">${data[competence][i].texte}</p>
                <p id="r${i}" class="ressource">${data[competence][i].ressource}</p>
                <div onclick="showCompetences('${i}')" class="buttonSeeMore">Voir plus</div>
            </div>
        `;
    }
}


async function setPersonalProjects() {
    var data = await getJSONFile('projetsPerso'); // Attendre que les données soient chargées

    data = data['projetsPerso'];
    var mainDiv = document.getElementById('ProjetPersoContainer');
    mainDiv.innerHTML = "";

    for (var i = 0; i < data.length; i++) {
        let id = "pp" + i;
        let illustrationContainer = data[i].svg
            ? `<div class="iconContainer">${data[i].svg}</div>`
            : `<div class="imgContainer"><img src="${data[i].img}"></div>`;

        mainDiv.innerHTML += `
            <div class="competencesCard" onclick="showCompetences('${id}')">
                ${illustrationContainer}
                <h2 id="h${id}">${data[i].nom}</h2>
                <p style="display:none;" id="d${id}">${data[i].texte}</p>
                <p id="r${id}" class="ressource">${data[i].ressource}</p>
                <div onclick="showCompetences('${id}')" class="buttonSeeMore">Voir plus</div>
            </div>`;
    }
}

function showCompetences(id) {
    var bgBlur = document.getElementById('blurBg');
    var popUp = document.getElementById('popUp');
    var titlePopUp = document.getElementById('popUpTitle');
    var ressName = document.getElementById('RName');
    var texte = document.getElementById('description');
    var img = document.getElementById('imgR');
    var header = document.querySelector("header");
    let type = "";
    
    if (!id.includes("pp")) {
        switch (competenceStatus) {
            case "verifier":
                type = "V";
                break;
            case "concevoir":
                type = "C";
                break;
            case "maintenir":
                type = "M";
                break;
            case "implanter":
                type = "I"; 
                break;
        }
    }


    img.src = "assets/imgs/" + type + id + ".png";
    titlePopUp.innerText = document.getElementById('h' + id).innerText;
    ressName.innerText = document.getElementById('r' + id).innerText;
    texte.innerHTML = document.getElementById('d' + id).innerHTML;
    bgBlur.style.display = "flex";
    popUp.style.display = "flex";
    //header.style.transform = `translateY(-8vh)`; // Pour cacher le header lors de l'affichage de la pop-up


    
    //here

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
    var speed = 250;
    var speedCursor = 500;
    var cursor = '<span class="cursor">│</span>'; // Curseur dans un span

    async function typeWriter() {
        if (i < name.length) {
            text = name.slice(0, i + 1); // Get the substring up to the current letter
            nameDiv.innerHTML = text + cursor; // Show the cursor while typing
            i++;
            await sleep(speed);
            typeWriter(); // Continue typing the next letter
        } else {
            nameDiv.innerHTML = name; // Remove the cursor after "Noah" is fully typed
            await sleep(speed);
            typeWriterSurname(); // Move to typing the surname
        }
    }

    async function typeWriterSurname() {
        if (j < surname.length) {
            text2 = surname.slice(0, j + 1); // Get the substring for the surname
            nameDiv2.innerHTML = text2 + cursor; // Show the cursor while typing
            j++;
            await sleep(speed);
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
    if (window.scrollY > 50) {
        scrollButton.style.bottom = "-1000px";
    }
    else {
        scrollButton.style.display = "flex";
        scrollButton.style.bottom = "35px";
    }
    if (scrollButton.style.bottom == "-1000px") {
        scrollButton.style.display = "none";
    }
});

// scroll down arrow button
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('downArrow').addEventListener('click', function () {
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
document.addEventListener('DOMContentLoaded', function () {
    var img = document.getElementById('imgR');
    //var audio = new Audio('./assets/a.mp3'); // Crée un nouvel élément audio

    img.addEventListener('click', function () {
        var imgSrc = img.src;
        window.open(imgSrc, '_blank');
        // audio.play();
    });
});


document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('close-banner').addEventListener('click', function () {
        document.getElementById('banner').style.display = 'none';
    });
});


// Gestion du menu burger mobile
document.addEventListener('DOMContentLoaded', function () {
    menuToggle.addEventListener('click', function () {
        if (mobileMenu.style.display === 'block') {
            mobileMenu.style.display = 'none';
        } else {
            mobileMenu.style.display = 'block';
        }
    });
});


// Gestion de la navbar et du défilement
document.addEventListener("DOMContentLoaded", () => { //Vérifie que le DOM est chargé
  const header = document.querySelector("header");
  let lastScrollY = window.scrollY;
  let headerOffset = 0;
  const headerHeight = header.offsetHeight;

  window.addEventListener("scroll", () => {
    const currentScroll = window.scrollY;
    const delta = currentScroll - lastScrollY;

    // Met à jour l’offset en fonction du scroll
    headerOffset -= delta;

    // Limite l'offset entre 0 (visible) et -headerHeight (caché complètement)
    headerOffset = Math.max(-headerHeight, Math.min(0, headerOffset));

    // Applique la translation verticale
    header.style.transform = `translateY(${headerOffset}px)`;

    lastScrollY = currentScroll;
  });
});

