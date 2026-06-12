/**
 * @file data.js
 * @description Services de gestion des données (JSON, compétences, projets personnels).
 * @author Noah PERRET
 * 
 *  !! To be upgrade : mettre des class 
 */

import { showCard } from './ui.js';
import { sleep } from "./utils.js";

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
 *  - Appelle la fonction showCard() avec cet identifiant.
 */
function clickOnCard() {
    const cards = document.querySelectorAll('.competencesCard');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const id = card.dataset.id;
            const type = card.dataset.type; // Récupère "pp" ou undefined
 
            let finalId = id;
            if (type === 'pp') {
                finalId = 'pp' + id;
            } else {
                // On regarde si la carte cliquée est dans le book ou les compétences
                const isBook = card.closest('#bookContainer');
                finalId = isBook ? 'b' + id : 'c' + id; // Renvoie 'b0', 'b1' ou 'c0', 'c1'
            }
            
            showCard(finalId);
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
        let cardHTML = `
            <div class="competencesCard" data-type="${dataType}" data-id="${i}">
                ${illustrationContainer}
                <h2 id="h${id}">${data[i].nom}</h2>
                <p style="display:none;" id="d${id}">${data[i].texte}</p>
                <p id="r${id}" class="ressource">${data[i].ressource}</p>
                <div class="buttonSeeMore">Voir plus</div>
            </div>`;

        //On ajoute au html à chaque fois qu'une carte est chargé
        mainDiv.insertAdjacentHTML("beforeend", cardHTML);
        await sleep(50);
    }
    clickOnCard(); //Détecteur d'appuis sur la carte
}



/**
 * @brief Charge et affiche de façon générique les cartes d'une section du portfolio.
 * @async
 * @param {string} sectionType - Le type de section ('competence', 'book', ou 'projetsPerso').
 * @param {string} [key] - La sous-clé optionnelle (ex: 'verifier', 'S5', 'S6').
 */
export async function setSection(sectionType, tabKey = '') {
    let jName;
    let jKey;
    let containerId;
    let prefix;
    let type;

    switch (sectionType) {
        case 'competence':
            jName = 'competences';
            jKey = tabKey;
            containerId = 'competencesContainer';
            prefix = 'c'
            type = '';
        break;

        case 'book':
            jName = 'book';
            jKey = tabKey;
            containerId = 'bookContainer';
            prefix = 'b'
            type = '';    
        break;

        case 'projetPerso':
            jName = 'projetsPerso';
            jKey = 'projetsPerso';
            containerId = 'projetPersoContainer';
            prefix = 'pp'
            type = 'pp';    
        break;
    
        default:
            console.error(`La section "${sectionType}" n'existe pas.`);
            return;
        break;
    }

    await fillCards({
        jsoncName: jName, 
        jsoncKey: jKey, 
        HTMLcontainerId: containerId, 
        idPrefix: prefix, 
        dataType: type 
    });
  
    // Appel à la fonction fillCards avec la bonne configuration
    await fillCards(currentConfig);
}



