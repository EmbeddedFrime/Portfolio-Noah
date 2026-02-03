/**
 * @file utils.js
 * @description Fonctions utilitaires génériques et helpers réutilisables.
 * @author Noah PERRET & Noan LISSELOUR
 */


export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
