# Pour recuperer le dossier d'un repositoryt git
`git clone https://url.du.repogit.git`

# Enregistrer son travail:
### On ajoute les fichiers que l'on veux enregistrer
pour ajouter seulement `index.html`
`git add index.html`
Pour ajouter tout les fichiers modofiés
`git add .`

### On décrit les changements effectués
`git commit -m 'changements effectués'`

### puis on envoie les fichiers
`git push`

# Pour recuperer le travail :
`git pull`
si il y a des erreurs :
`git fetch`

ensuite on fait la partie 1 sans push puis :
`git merge`
`git push`