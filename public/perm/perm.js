setColorMode("..")
const body = document.getElementById("body");

let bouton = [];
let placesTotal = [];
let nbDemandes = [];
let demandes = []
let demande = []
let places = [];

let ouvert = []
let cout = []
let nbAmis = []
let nbAmisDemande = []

let inscrits = [];
let inscrit = []

let horaires = ["8h-9h","9h-10h","10h-11h","11h-12h","13h-14h","14h-15h","15h-16h"]

let divHoraires = document.createElement("div")
let text = document.createElement("button")
    text.className = "jours tableau";
    text.style.height = "50px";
    text.style.visibility = "hidden";
    divHoraires.appendChild(text);
for (let h = 0; h < 7; h++) {
    let horaire = document.createElement("button")
    horaire.innerHTML = horaires[h]
    horaire.className = "horaire"
    divHoraires.appendChild(horaire);

}
body.appendChild(divHoraires);

for (let j = 0; j < 5; j++) {
    let div = document.createElement("div")
    let text = document.createElement("button")
    text.className = "jours tableau";
    text.innerHTML = dayMer[j]
    div.appendChild(text);

    bouton[j] = []
    placesTotal[j] = []
    places[j] = []

    nbAmis[j] = []
    nbAmisDemande[j] = []
    nbDemandes[j] = []
    demandes[j] = []
    demande[j] = [false, false]

    inscrits[j] = []
    inscrit[j] = [false, false]
    ouvert[j] = [0, 0]
    cout[j] = [1, 1]
    for (let h = 0; h < 7; h++) {
        bouton[j][h] = document.createElement("button")
        if((j == 2 && h >3) || (h == 3 && j != 2)){
            bouton[j][h].style.visibility = "hidden";
        }

        //bouton[j][h].id = "" + j + h;
        let heure = h + 8
        if(h >= 4){
            heure += 1
        }
        bouton[j][h].onclick = function () { select(j, h) };
        bouton[j][h].className = "crenau"
        div.appendChild(bouton[j][h]);

    }
    body.appendChild(div);

}

document.getElementById("semainePrecedente").addEventListener("click", function () {
    week = week - 1
    writeCookie("week", week)
    refreshDatabase()
});

document.getElementById("semaineActuelle").addEventListener("click", function () {
    week = actualWeek
    writeCookie("week", week)
    refreshDatabase()
});


document.getElementById("semaineSuivante").addEventListener("click", function () {
    week = week + 1
    writeCookie("week", week)
    refreshDatabase()
});

function semaine(nombreSemaineSup){ //nombreSemaineSup = nombre de semaine ce trouve l'intervalle à creer
	let aujd= new Date();
	let jour=aujd.getDay()-1;
	let dateBeg=(Date.now()+604800000*nombreSemaineSup)-jour*86400000; //86400000ms=1 jour et 604800000ms= 1semaine
	let dateEnd=dateBeg+4*86400000;
	dateBeg=new Date(dateBeg);
	dateEnd=new Date(dateEnd);
	dateBeg = dateBeg.toLocaleString();
	dateEnd = dateEnd.toLocaleString();
	let mois=["janvier","fevrier","mars","avril","mai","juin","juillet","aout","septembre","octobre","novembre","decembre"];
	return(dateBeg[0]+dateBeg[1]+" "+mois[parseInt(dateBeg[3]+dateBeg[4])]+" au "+dateEnd[0]+dateEnd[1]+" "+mois[parseInt(dateEnd[3]+dateEnd[4])]);
	// renvoie un intervalle de jour de forme : 11 avril au 15 avril 
	}


function refreshDatabase() {

    let sn = [semaine(0),semaine(1),semaine(2),semaine(3)]

    let text = "Semaine n°" + week + " du " + sn[week - actualWeek]
    if (week == actualWeek) {
        text = "Cette semaine"
    }
    document.getElementById("semaine").innerHTML = text

    

    for (let j = 0; j < 5; j++) {
        for (let h = 0; h < 7; h++) {
            let heure = h + 8
            if(h >= 4){
                heure += 1
            }
            bouton[j][h].innerHTML = "aucune info"
            bouton[j][h].className = "crenau"
            database.ref(pathPerm(j,h) + "/ouvert").once("value", function (snapshot) {

                let ouv = snapshot.val()
                if (ouv == null){
                    ouv = 0
                }
                ouvert[j][h] = ouv
                if(ouv == 0){
                    database.ref(pathPerm(j,h) + "/classes").once("value", function (snapshot2) {
                        let str = ""
                        snapshot2.forEach(function (child) {
                            const name = child.key
                            if(name == classe){
                                bouton[j][h].className = "crenau inscrit"
                            }
                            if(str != ""){
                                str += ", "
                            }
                            str += name
    
                        });
                        if(str != ""){
                            bouton[j][h].innerHTML = str
                        }
                        
                    });
                }else{
                    switch(ouv){
                        case 1:
                            bouton[j][h].innerHTML = "fermé"
                            bouton[j][h].className = "crenau ferme"
                            break;
                        case 2:
                            bouton[j][h].innerHTML = "ouvert à tous"
                            bouton[j][h].className = "crenau inscrit"
                            break;
                        case 3:
                            bouton[j][h].innerHTML = "réservé"
                            bouton[j][h].className = "crenau reserve"
                            break;
                        case 4:
                            bouton[j][h].innerHTML = "vacances"
                            bouton[j][h].className = "crenau ferme"
                            break;
                    }
                    
                }

                

            })


        }
    }

}


function loop() {
    console.log("update database")
    refreshDatabase();
    setTimeout(loop, 20000);
}
loop();


function select(j, h){
    console.log("click")
    sessionStorage.setItem("j", j);
    sessionStorage.setItem("h", h);
    if (ouvert[j][h] == 0) {
        window.location.href = "demandePerm.html";
    } 
}
