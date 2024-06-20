var competenceStatus="verifier";

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

function updateCompetences(competence) {
    fetch('assets/competences.json')
    .then(response => {
        return response.json();
    })
    .then(data => {
        var mainDiv= document.getElementById('competencesContainer');
        mainDiv.innerHTML = "";
        for( var i = 0; i < data[competence].length; i++){
            mainDiv.innerHTML+="<div class=\"competencesCard\"><div class=\"iconContainer\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d=\"M176 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64c-35.3 0-64 28.7-64 64H24c-13.3 0-24 10.7-24 24s10.7 24 24 24H64v56H24c-13.3 0-24 10.7-24 24s10.7 24 24 24H64v56H24c-13.3 0-24 10.7-24 24s10.7 24 24 24H64c0 35.3 28.7 64 64 64v40c0 13.3 10.7 24 24 24s24-10.7 24-24V448h56v40c0 13.3 10.7 24 24 24s24-10.7 24-24V448h56v40c0 13.3 10.7 24 24 24s24-10.7 24-24V448c35.3 0 64-28.7 64-64h40c13.3 0 24-10.7 24-24s-10.7-24-24-24H448V280h40c13.3 0 24-10.7 24-24s-10.7-24-24-24H448V176h40c13.3 0 24-10.7 24-24s-10.7-24-24-24H448c0-35.3-28.7-64-64-64V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H280V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H176V24zM160 128H352c17.7 0 32 14.3 32 32V352c0 17.7-14.3 32-32 32H160c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32zm192 32H160V352H352V160z\"/></svg></div><h2 id=\"h"+i+"\">"+data[competence][i].nom+"</h2><p id=\"r"+i+"\" class=\"ressource\">"+ data[competence][i].ressource +"</p><div onclick=\"showCompetences("+i+")\" class=\"buttonSeeMore\">Voir plus</div></div>"
        }
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });

}

function showCompetences(id){
    var bgBlur = document.getElementById('blurBg');
    var popUp = document.getElementById('popUp');
    var titlePopUp = document.getElementById('popUpTitle');
    var ressName = document.getElementById('RName');
    var content = document.getElementById('description');
    var img = document.getElementById('imgR');
    type= competenceStatus=="verifier"?"V":"C";
    img.src="assets/imgs/"+type+id+".png";
    titlePopUp.innerText = document.getElementById('h'+id).innerText;
    ressName.innerText = document.getElementById('r'+id).innerText;
    bgBlur.style.display = "flex";
    popUp.style.display = "flex";

    // Empêcher le défilement
    document.body.style.overflow = 'hidden';
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
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
    var speed = 500;

    async function typeWriter() {
        if (i < name.length) {
            text += name[i];
            nameDiv.innerHTML = text;
            i++;
            await sleep(speed);
            typeWriter();
        }else{
            typeWriterSurname();
        }
    }

    async function typeWriterSurname() {
        if (j < surname.length) {
            text2 += surname[j];
            nameDiv2.innerHTML = text2;
            j++;
            await sleep(speed);
            typeWriterSurname();
        } else {
            nameDiv2.innerHTML = "Perret|";
            await sleep(speed);
            nameDiv2.innerHTML = "Perret ";
            await sleep(speed);
            typeWriterSurname();
        }
    }
    typeWriter();
});
window.addEventListener("scroll", (event) => {
    var scrollButton = document.getElementById('downArrow');
    if(window.scrollY > 50){
        scrollButton.style.bottom = "-1000px";
        sleep(900).then(() => {
            scrollButton.style.display = "none";
        });
    }
    else{
        scrollButton.style.display = "flex";
        scrollButton.style.bottom = "40px";
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