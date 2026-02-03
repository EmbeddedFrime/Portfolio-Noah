/**
 * @file data.js
 * @description Services de gestion des données (JSON, compétences, projets personnels).
 * @author Noah PERRET
 * 
 *  !! To be upgrade : mettre des class 
 */

import { showCompetences } from './ui.js';

/**
 * Charge un fichier JSON depuis le dossier assets/json.
 * * @param {string} file - Nom du fichier (sans l’extension .json).
 *   @returns {Promise<Object|null>} Objet JSON ou null en cas d’erreur.
 */
async function getJSONFile(file) {
    try {
        const response = await fetch(`assets/json/${file}.jsonc`);
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
 * @brief Ajoute un gestionnaire de clic à chaque carte de compétence.
 *
 * Pour chaque carte (.competencesCard) :
 *  - Récupère l'ID et le type (pp, b, etc.) stockés dans les data-attributes.
 *  - Construit un identifiant final : type + l'ID 
 *  - Appelle la fonction showCompetences() avec cet identifiant.
 */
function clickOnCard() {
    const cards = document.querySelectorAll('.competencesCard');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const id = card.dataset.id;
            const type = card.dataset.type; // Récupère "pp" ou undefined

            // Logique robuste : si un type existe (pp, b, etc.), on le préfixe.
            // Sinon, on utilise uniquement l'ID.
            const finalId = type ? type + id : id;
            
            showCompetences(finalId);
        });
    });
}

/**
 * @brief Rmplie les cartes HTML à partir de fichier JSONC.
 *
 * Charge les données, crée les cartes (image ou SVG, texte, ressource)
 * et les insère dans le conteneur HTML donné.
 *
 * @async
 * @param {string} jsoncName       Nom du fichier JSONC.
 * @param {string} jsoncKey        Clé du tableau de données.
 * @param {string} HTMLcontainerId ID du conteneur HTML.
 * @param {string} idPrefix        Préfixe des IDs générés.
 * @param {string} dataType        Type de données des cartes.
 */

async function fillCards({
    jsoncName,
    jsoncKey,
    HTMLcontainerId,
    idPrefix,
    dataType
}) {
    var data = await getJSONFile(jsoncName); // Attendre que les données soient chargées
    data = data[jsoncKey]; //sépare en tableau

    var mainDiv = document.getElementById(HTMLcontainerId);
    mainDiv.innerHTML = ""; //Efface l'ancien contennue

    //Pour chaque carte :
    for (var i = 0; i < data.length; i++) {
        let id = idPrefix + i;
        //Mettre l'image ou le svg
        let illustrationContainer = data[i].svg
            ? `<div class="iconContainer">${data[i].svg}</div>`
            : `<div class="imgContainer"><img src="${data[i].img}"></div>`;

        //Charge le texte, la ressource  et le titre
        mainDiv.innerHTML += `
            <div class="competencesCard" data-type="${dataType}" data-id="${i}">
                ${illustrationContainer}
                <h2 id="h${id}">${data[i].nom}</h2>
                <p style="display:none;" id="d${id}">${data[i].texte}</p>
                <p id="r${id}" class="ressource">${data[i].ressource}</p>
                <div class="buttonSeeMore">Voir plus</div>
            </div>`;
    }
    clickOnCard(); //Détecteur d'appuis sur la carte
}
/**
 * @brief Charge et affiche les projets personnels dans le conteneur HTML dédié.
 *
 * @async
 */
export async function setPersonalProjects(){
    // Ajout des { } pour passer un objet
    await fillCards({jsoncName: 'projetsPerso',
        jsoncKey: 'projetsPerso', 
        HTMLcontainerId: 'projetPersoContainer', 
        idPrefix: 'pp', 
        dataType: 'pp' 
    });
}

/**
 * @brief Charge et affiche les carte book dans le conteneur HTML dédié.
 *
 * @async
 */
export async function setBook(){
    // Ajout des { } pour passer un objet
    await fillCards({
        jsoncName: 'book', 
        jsoncKey: 'book', 
        HTMLcontainerId: 'bookContainer', 
        idPrefix: 'b', 
        dataType: 'b' 
    });
}

/**
 * @brief Charge et affiche les compétences spécifiées dans le conteneur HTML dédié.
 *
 * @async
 * @param {string} competence Clé du tableau de compétences à charger.
 */
export async function setCompetence(competence){
    // Ajout des { } pour passer un objet
    await fillCards({
        jsoncName: 'competences', 
        jsoncKey: competence, 
        HTMLcontainerId: 'competencesContainer', 
        idPrefix: '', 
        dataType: '' 
    });
}



