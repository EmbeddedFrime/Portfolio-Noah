function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
window.addEventListener("load", (event) => {
    var nameDiv = document.getElementById('name');
    var nameDiv2 = document.getElementById('surname');
    var name = "Noah";
    var surname = "Perret ";
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
            console.log(text2);
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
    console.log(window.scrollY);
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