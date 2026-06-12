/**
 * @file animations.js
 * @description Gestion des animations et interactions visuelles (typewriter, scroll, navigation).
 * @author Noah PERRET & Noan LISSELOUR
 */

import {sleep} from "./utils.js";



export function initAnimation() {
    initTypewriter();
    initScrollNavbar();
    initScrollArrow();
    initClickEvents();
}


// gère l'affichage de PERRET Noah
function initTypewriter() {

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


    //Prenom
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

    //Nom
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
}


/**
 * Gère l'apparition/disparition du header au défilement.
 */
function initScrollNavbar() {
    const header = document.querySelector("header");
    if (!header) return;

    let lastScrollY = window.scrollY;
    let headerOffset = 0;
    const headerHeight = header.offsetHeight;

    window.addEventListener("scroll", () => {
        const currentScroll = window.scrollY;
        const delta = currentScroll - lastScrollY;

        // Met à jour l’offset en fonction du scroll
        headerOffset -= delta;

        // Limite l'offset entre 0 (visible) et -headerHeight
        headerOffset = Math.max(-headerHeight, Math.min(0, headerOffset));

        // Applique la translation
        header.style.transform = `translateY(${headerOffset}px)`;

        lastScrollY = currentScroll;
    }, { passive: true }); // Optimisation de performance pour le scroll
}

//arrow // à réparer 2 scroll
function initScrollArrow() {
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
}

/**
 * Initialise les clics sur les élèments ID downArrow (comme la flèche).
 */
function initClickEvents() {
    const scrollButton = document.getElementById('downArrow');
    
    if (scrollButton) {
        scrollButton.addEventListener('click', () => {
            window.scrollBy({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        });
    }
}