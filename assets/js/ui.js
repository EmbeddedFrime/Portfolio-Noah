/**
 * @file ui.js
 * @description Gestion de l’interface utilisateur (DOM, pop-up, affichage dynamique).
 * @author Noah PERRET & Noan LISSELOUR
 */

import {setSection} from "./data.js";

//Variables internes :
let currentCompetence = "verifier";
let currentBook = "S6";


/***************** Partie Ecoute *******************/

export function initUI() {
    initImageZoom();
    initClosingPopup();
    initMobileBurger();
    initChangeCompetence();
    initChangeSemester();
    //Précharge
    preloadImagesByCategory(currentCompetence);
}


// --- Gestion du zoom image ---
function initImageZoom() {
    const img = document.getElementById('imgR');
    if (img) {
        img.addEventListener('click', () => {
            window.open(img.src, '_blank');
        });
    }
}

// Variable à placer en haut de ton fichier ui.js
const loadedCategories = {}; 

function preloadImagesByCategory(chosenCompetence) {
    const types = { verifier: "V", concevoir: "C", maintenir: "M", implanter: "I" };
    const prefix = types[chosenCompetence];

    // 1. Chargement des Projets Persos (Une seule fois au premier appel quel qu'il soit)
    if (!loadedCategories['pp']) { //Changer la valeur fixe 8 si on ajoute des projets
        for (let i = 0; i < 8; i++) {
            const img = new Image();
            img.src = `assets/imgs/pp${i}.webp`;
            console.log(`Préchargement de : ${prefix}${i}.webp`); // Optionnel : 
        }
        loadedCategories['pp'] = true;
    }

    if (!loadedCategories['S5']) { //Changer la valeur fixe 8 si on ajoute des projets
        for (let i = 0; i < 8; i++) {
            const img = new Image();
            img.src = `assets/imgs/S5${i}.webp`;
            console.log(`Préchargement de : ${prefix}${i}.webp`); // Optionnel : 
        }
        loadedCategories['b'] = true;
    }

    // 2. Chargement de la catégorie d'onglet (Si pas déjà fait)
    if (prefix && !loadedCategories[chosenCompetence]) {
        for (let i = 0; i < 9; i++) {
            const img = new Image();
            img.src = `assets/imgs/${prefix}${i}.webp`;
            console.log(`Préchargement de : ${prefix}${i}.webp`); // Optionnel : 

        }
        loadedCategories[chosenCompetence] = true;
    }
}

/**
 * Initialise la fermeture globale (Bannière & PopUp) via Clavier et Clic
 */
function initClosingPopup() {
    const banner = document.getElementById('banner');
    const closeBtnPop = document.getElementById('closePopUp');
    const closeBtnBanner = document.getElementById('close-banner');
    const popUp = document.getElementById('popUp');
    const blurBg = document.getElementById('blurBg');
    //const burger = document.getElementById('mobileMenu');//En cours de dev


    // La logique de fermeture partagée
    const closeEverything = () => {
        if (banner) banner.style.display = 'none';
        if (popUp) popUp.style.display = 'none';
        if (blurBg) blurBg.style.display = 'none';
        //if (burger) burger.style.display = 'none'; // en cours de dev
        document.body.style.overflow = 'auto'; // rétablit le scroll
    };

    // Écouteur Clavier (Echap)
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' || e.key === 'Esc') closeEverything();
    });

    // Écouteur Clic (Croix de popup)
    if (closeBtnPop) {
        closeBtnPop.addEventListener('click', closeEverything);
    }

    // Écouteur Clic (Croix de bannière)
    if (closeBtnBanner) {
        closeBtnBanner.addEventListener('click', closeEverything);
    }

    //à mettre à jour la compétence card est trop grande 
    //Clic sur le fond flou pour fermer la PopUp
    if (blurBg) {
        blurBg.addEventListener('click', closeEverything);
    }
}

// --- Gestion du Menu Burger ---
function initMobileBurger() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.style.display = (mobileMenu.style.display === 'block') ? 'none' : 'block';
        });
    }
}


function initChangeCompetence() {
    const select = document.getElementById('tab-select');
    const buttons = document.querySelectorAll('.tab-button');

    // Écouteur pour les boutons (Desktop)
    buttons.forEach(btn => {
        btn.addEventListener('click', e => changeCard("competence", e.currentTarget.id));
    });

    // Écouteur pour le menu déroulant (Mobile)
    if (select) {
        select.addEventListener('change', e => {
            changeCard("competence", e.target.value);
        });
    }
}


function initChangeSemester() {
    const select = document.getElementById('tab-select-book');
    const buttons = document.querySelectorAll('.tab-button-book');

    // Écouteur pour les boutons (Desktop)
    buttons.forEach(btn => {
        btn.addEventListener('click', e => changeCard("book", e.currentTarget.id));
    });

    // Écouteur pour le menu déroulant (Mobile)
    if (select) {
        select.addEventListener('change', e => {
            changeCard("book", e.target.value);
        });
    }
}
/***************** Partie Action *******************/


window.showCard = showCard;
// On attache la fonction à l'objet window pour qu'elle soit accessible partout
/**
 * Affiche la pop-up de détails d'une compétence ou d'un projet.
 * @param {string} id - L'identifiant technique de l'élément.
 */
export function showCard(id) {
    const bgBlur = document.getElementById('blurBg');
    const popUp = document.getElementById('popUp');
    const titlePopUp = document.getElementById('popUpTitle');
    const ressName = document.getElementById('RName');
    const texte = document.getElementById('description');
    const img = document.getElementById('imgR');

    let imgSrc = "";

    //Si c'est un projet personelle il n'y a pas de catégorie
    if (id.includes("pp")) {
        imgSrc = `assets/imgs/${id}.webp`; // ex: assets/imgs/pp0.webp
    } 
    // On vérifie si l'élément HTML cliqué provient du conteneur du Book
    else if (id.startsWith("b")) {
        const numId = id.replace("b", ""); // Extrait le numéro (ex: "b0" -> "0")
        // On récupère le semestre actif depuis notre objet d'état (ex: "S5" ou "S6")
        imgSrc = `assets/imgs/${currentBook}${numId}.webp`;
    } 
    // 3. Gestion des Compétences (par défaut)
    else if (id.startsWith("c")){
        const numId = id.replace("c", ""); // Extrait le numéro
        let type = "";
        switch (currentCompetence) {
            case "verifier":  type = "V"; break;
            case "concevoir": type = "C"; break;
            case "maintenir": type = "M"; break;
            case "implanter": type = "I"; break;
        }
        imgSrc = `assets/imgs/${type}${numId}.webp`; // ex: assets/imgs/V0.webp
    }
    
    //Demander à noan si il a un beau chargement :

    // On cache l'image ou on met une opacité basse pendant le chargement
    img.style.opacity = "0"; 

    // On définit la nouvelle source
    img.src = imgSrc

    // Dès que l'image est chargée par le navigateur, on la réaffiche avec une transition
    img.onload = () => {
        img.style.transition = "opacity 0.2s";
        img.style.opacity = "1";
    };


    titlePopUp.innerText = document.getElementById('h' + id).innerText;
    ressName.innerText = document.getElementById('r' + id).innerText;
    texte.innerHTML = document.getElementById('d' + id).innerHTML;
    bgBlur.style.display = "flex";
    popUp.style.display = "flex";

    // Empêcher le défilement
    document.body.style.overflow = 'hidden';
}



/**
 * Gère le changement d'onglet des compétences.
 * 
 * @param {string} sectionType - Le type de section ('competence', 'book', ou 'projetsPerso').
 * @param {*} chosenTab La catégorie choisie.
 * @returns 
 */
export function changeCard(sectionType, chosenTab) {
    let containerSelector;
    let buttonClass;

    switch (sectionType) {
        case 'competence':
            if (chosenTab == currentCompetence ) return;  // optimisation on ne recharge pas une compétence déjà chargé
            containerSelector = ".tab-container";
            buttonClass = "tab-button";

            currentCompetence = chosenTab; // set current value
        break;

        case 'book':
            if (chosenTab == currentBook ) return;  // optimisation on ne recharge pas une compétence déjà chargé
            containerSelector = ".tab-container-book";
            buttonClass = "tab-button-book";

            currentBook = chosenTab; // set current value 
        break;
    
        default:
            console.error(`La section "${sectionType}" n'existe pas.`);
            return;
        break;
    }

    setSection(sectionType, chosenTab);

    //preloadImagesByCategory(chosenTab);

    //clear all CSS
    var allButtons = document.querySelector(containerSelector)
    console.log(allButtons.children[0])
    Array.from(allButtons.children).forEach(button => {
        button.className=buttonClass
        console.log(button.style)
    });

    //set current
    document.getElementById(chosenTab).classList.add("active")
}


//Pour quelle soit appelé depuis le JSON
window.afficherImageAgauche = afficherImageAgauche;


//!! l'appeler toutes les 20 seconde pour faire une sorte de carrouselle ?
export function afficherImageAgauche(imgLink) {
    var img = document.getElementById('imgR');
    img.src = "assets/imgs/more/" + imgLink + ".webp";
}





