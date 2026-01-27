/**
 * @file data.js
 * @description Services de gestion des données (JSON, compétences, projets personnels).
 * @author Noah PERRET & Noan LISSELOUR
 */


import { showCompetences } from './ui.js';

/**
 * Charge un fichier JSON depuis le dossier assets/json.
 * * @param {string} file - Nom du fichier (sans l’extension .json).
 *   @returns {Promise<Object|null>} Objet JSON ou null en cas d’erreur.
 */
async function getJSONFile(file) {
    try {
        const response = await fetch(`../assets/json/${file}.jsonc`);
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const text = await response.text();//données brut

        // Supprime uniquement les commentaires /* ... */
        const noBlockComments = text.replace(/\/\*[\s\S]*?\*\//g, '');

        return JSON.parse(noBlockComments);// retourne les données

    } catch (error) {
        console.error('Erreur lors du chargement du JSON:', error);
        return null;
    }
}


/**
 * @brief Remplit la section des projets personnels depuis projetsPerso.json.
 * @returns {Promise<void>} Résolution après génération du contenu HTML.
 */
export async function setPersonalProjects() {
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
            <div class="competencesCard" data-type="pp" data-id="${i}">
                ${illustrationContainer}
                <h2 id="h${id}">${data[i].nom}</h2>
                <p style="display:none;" id="d${id}">${data[i].texte}</p>
                <p id="r${id}" class="ressource">${data[i].ressource}</p>
                <div class="buttonSeeMore">Voir plus</div>
            </div>`;
    }
    clickOnCard();
}


/**
 * @brief Met à jour l’affichage des compétences pour une catégorie.
 * @param {string} competence Clé de catégorie présente dans competences.json.
 * @returns {Promise<void>} Résolution après mise à jour du DOM.
 */
export async function updateCompetences(competence) {
    var data = await getJSONFile('competences'); // Attendre que les données soient chargées
    var mainDiv = document.getElementById('competencesContainer');

    mainDiv.innerHTML = "";

    for (var i = 0; i < data[competence].length; i++) {
        let illustrationContainer = data[competence][i].svg
            ? `<div class="iconContainer">${data[competence][i].svg}</div>`
            : `<div class="imgContainer"><img src="${data[competence][i].img}"></div>`;

        mainDiv.innerHTML += `
            <div class="competencesCard" data-id="${i}">
                ${illustrationContainer}
                <h2 id="h${i}">${data[competence][i].nom}</h2>
                <p style="display:none;" id="d${i}">${data[competence][i].texte}</p>
                <p id="r${i}" class="ressource">${data[competence][i].ressource}</p>
                <div class="buttonSeeMore">Voir plus</div>
            </div>`;
    }
    //On écoute si il y a un clic 
    clickOnCard();
}


function clickOnCard() {
    const cards = document.querySelectorAll('.competencesCard');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const id = card.dataset.id;
            const type = card.dataset.type; // Récupère "pp" ou undefined

            // Si c'est un projet perso, on envoie "pp0", sinon juste "0"
            const finalId = type ? type + id : id;
            
            showCompetences(finalId);
        });
    });
}