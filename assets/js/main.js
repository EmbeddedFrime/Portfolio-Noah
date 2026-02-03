/**
 * @file main.js
 * @description Point d’entrée de l’application, initialisation et gestion des événements globaux.
 * @author Noah PERRET & Noan LISSELOUR
 */

// On regroupe tous les imports de data.js sur une seule ligne
import { setCompetence, setPersonalProjects, setBook } from './data.js';
import { initUI } from './ui.js';
import { initAnimation } from './animations.js';



/**
 * Initialisation du site
 * Charge les données et lance les animations de départ.
 */
async function init() {
    console.log("Initialisation du portfolio...");

    initUI();
    initAnimation();
    
    // Promise.all lance les deux fonctions en même temps (plus rapide)
    try {
        await Promise.all([
            setCompetence("verifier"),
            setPersonalProjects(),
            setBook()
        ]);
        console.log("Données chargées avec succès.");
    } catch (error) {
        console.error("Erreur lors de l'initialisation :", error);
    }

   
}

init();