setColorMode("../..")
const menu = "perm.html"

let j = sessionStorage.getItem("j");
let h = parseInt(sessionStorage.getItem("h"));

let charge = 1
const nbCharge = 1;




let divDemandes = document.getElementById("demandes")






database.ref(pathPerm(j,h) + "/demandes").once('value').then(function(snapshot) {
    console.log(pathPerm(j,h) + "/demandes")
    if(snapshot.val() != null){
        divDemandes.innerHTML = ""
    }
    snapshot.forEach(function(child) {
        let name = child.key
        let nb = child.val()
        console.log(name)
        but = document.createElement("button")
        but.classList.add("amis")
        but.innerHTML = name +  " (" + nb +")"
        divDemandes.appendChild(but);
    })
    charged()
});



function charged(){
    if(charge < nbCharge){
        charge++
        return
    }
    console.log("charged")



    document.getElementById("article").style.display = "inline"
    document.getElementById("chargement").style.display = "none"

    document.getElementById("oui").addEventListener("click", function() {
        let val = document.getElementById("input").value
        let nb = document.getElementById("nb").value
        if(val.lenght != 0 && nb != ""){
            database.ref(pathPerm(j,h) + "/demandes/" + val).set(nb)
            window.location.href = menu;
        }
        
    })


    /*let reste = places - inscrits
    document.getElementById("info").innerHTML = "Demander l'inscription pour le "+ day[j]  +  " à " + (h+11) 
    + "h<br>Il reste " + reste + " places<br>(" + inscrits + " inscrits pour " + places + " places)<br>Il y déjà " + demandes
    + " demandes en cours<br>Votre score est de " + textScore

    if(h == 1){
        document.getElementById("opt").style.display = "inline"

    }


    document.getElementById("oui").addEventListener("click", function() {
        database.ref(path(j,h) + "/users/" + user + "/score").set(score);
        database.ref(path(j,h) + "/users/" + user + "/classe").set(classe);
        let str = ""
        for(let i in boolAmis){
            if(boolAmis[i]){
                str += amis[i] + "/"
                database.ref(path(j,h) + "/users/" + user + "/amis/" + amis[i]).set(0);
            }
            
        }
        writeCookie("derniere demande",str)
        

        
        if(h == 1){
            let fini = document.getElementById("12h20").checked
            let commence = document.getElementById("12h50").checked
            if(fini || commence){
                database.ref(path(j,h) + "/users/" + user + "/horaire").set((fini?1:0) + (commence?2:0));
            }
        }
        database.ref(path(j,h) + "/demandes/" + user).set(score);
        database.ref(path(j,h) + "/demandes/" + user).once('value').then(function(snapshot) {
            if(snapshot.val() == score){
                setTimeout(function() {
                    window.location.href = menu;
                },1000);
                
            }
        });
        
        
    });
    document.getElementById("non").addEventListener("click", function() {
        window.location.href = menu;
    });*/

}


setTimeout(function(){
    while(charge < nbCharge - 1){
        charge++
    }
    charged()
}, 5000);