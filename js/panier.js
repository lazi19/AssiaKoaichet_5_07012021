//récupération des données du local storage 

let produitEnregistreDansLocalStorage = JSON.parse(localStorage.getItem("basket"));
console.log('produitEnregistreDansLocalStorage')
console.log(produitEnregistreDansLocalStorage)



// injection de l HTML

if (produitEnregistreDansLocalStorage){

    let totalPrice = 0;

    produitEnregistreDansLocalStorage.forEach(element => {

       totalPrice = totalPrice + element.price * element.quantity; // le prix total de tous les articles

        var DivProduit = document.createElement("div");

        DivProduit.innerHTML =
         ` 
            <div class="blocProduit">
                <img src="${element.img}" alt="" width= 200>  
                <p id="nom">${element.name}</p>
                <p id="quantite">Quantité : ${element.quantity} </p>
                <p id="couleur">Couleur : ${element.color} </p>
                <p id="prix">Prix : ${element.price/100} €</p>
                <button id="${element.id} " class="btn-supprimer">supprimer ${element.name} ${element.color}</button>            
            </div>            
         `;
         
         panierVide.appendChild(DivProduit); 
           
    });


    var prixTotalPanier = document.createElement("p");
        prixTotalPanier.innerHTML = `<p id="prixTotal">Total de votre panier : ${totalPrice/100} € </p> `
        panierVide.appendChild(prixTotalPanier);
        

}else{
document.getElementById('panierVide').innerText = "Votre panier est vide";
console.log('hello');
 }

 //*************************** Gestion du boutton supprimer l'article *************************/
  


// sélection de l'id du produit qui va être supprimer en cliquant sur le boutton supprimer 


let btnSupprimer = document.querySelectorAll(".btn-supprimer");
console.log(btnSupprimer);

//Suppression de l'élément  "produit supprimer"

    btnSupprimer.forEach((element) => {

    element.addEventListener("click" , (event) =>{ 
    event.preventDefault()
    
    let idProduitSupprimer = element.id;
    let colorProduitSupprimer = element.color;
    console.log('id') 
    console.log(idProduitSupprimer) 
    console.log('color')
    console.log(colorProduitSupprimer)

// avec la methode filter je séléctionne  les elements à garder et je supprime l'élément où le btn supprimer a été cliqué

    let newProduitEnregistrer = produitEnregistreDansLocalStorage.filter(ele => ele.id !== idProduitSupprimer  && ele.color !== colorProduitSupprimer)
    console.log('newProduitEnregistrer');
    console.log(newProduitEnregistrer);
    // on envoie la variable "newProduitEnregistrer" dans le local storage
    // la transformation en format JSON et l'envoyer dans la key "basket" du local storage
    localStorage.setItem("basket", JSON.stringify(newProduitEnregistrer));
    });
    
})
//**************************************** */ Fin de Suppression de l'élément  "produit supprimer"*******************

// ***************************************addEventListener pour le boutton "je valide mon panier et mes informations" formulaire***********************
const btnEnvoyerFormulaire = document.getElementById("envoiFormulaire");
btnEnvoyerFormulaire.addEventListener("click", (e)=>{
e.preventDefault();

    //*****************************************récuperation des valeurs du formulaire de commande pour le mettre dans le local storage*********************************************/

var formulaireValues = {
    prenom : document.getElementById("prenom").value,    
    nom : document.getElementById("nomUtilisateur").value,
    mail : document.getElementById("mail").value,
    adresse : document.getElementById("adresse").value,
    ville : document.getElementById("ville").value,
    codePostal : document.getElementById("codePostal").value
}

console.log("formulaireValues");
console.log(formulaireValues);


// ***************************gestion validation de formulaire (contrôle du formulaire)

var regExPrenomNomVille = (value) => {
    return /^[A-Za-z]{3,20}$/.test(value) 
}
// fonction pour controler de la validité du prenom nom et ville
function prenomNomVilleControle(){
            
        var lePrenom = formulaireValues.prenom;
        var leNom = formulaireValues.nom;
        var laVille = formulaireValues.ville;        

        if(regExPrenomNomVille(lePrenom) && regExPrenomNomVille(leNom) && regExPrenomNomVille(laVille)){
            return true;
        }else{            
            alert("chiffre et symbole non autorisé \n Ne pas dépasser 20 caractères, minmum 3 caractères");
            return false;
        };
}
// fonction pour controler  la validité du code postal

function codePostalControle(){
            
    var leCodepostal = formulaireValues.codePostal;          

    if(/^[0-9]{5}$/.test (leCodepostal)){
        return true;
    }else{            
        alert("Code Postal : doit être composé de 5 chiffres");
        return false;
    };
}

// fonction pour controler  la validité du email

function mailControle(){
            
    var leMail = formulaireValues.mail;          

    if(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test (leMail)){
        return true;
    }else{            
        alert("Adresse e-mail non valid");
        return false;
    };
}

if(prenomNomVilleControle() && codePostalControle() && mailControle() ){
// envoyer les valeurs du formulaire de commande dans le local storage s'il est rempli correctement
localStorage.setItem("formulaireValues", JSON.stringify(formulaireValues));

}else{
    alert("Veuillez bien remplir le formulaire");
}



// *******Fin gestion validation de formulaire (contrôle du formulaire)

//*****************************************Fin récuperation des valeurs du formulaire de commande pour le mettre dans le local storage********


// mettre les values du formulaire et les produits selectionnées dans l'objet 'aEnvoyer'  à envoyer vers le serveur

var aEnvoyer = { 
    produitEnregistreDansLocalStorage,
    formulaireValues
}

console.log('aEnvoyer');
console.log(aEnvoyer);

//  Envoie de l'objet 'aEnvoyer' vers le serveur
var promise01 = fetch("http://jsonplaceholder.typicode.com/users", {
    method: "POST",
    body: JSON.stringify(aEnvoyer),
    headers: {
        "Content-type" : "application:json",
    },
});
console.log("promise01");
console.log(promise01);

});

// ************************mettre le contenu de la key 'formulaireValues' du local storage dans les champs du formulaire 
// prendre  la key 'formulaireValues' du local storage est la mettre dans une variable

var formulaireValuesLocalStorage = JSON.parse(localStorage.getItem("formulaireValues"));
console.log("formulaireValuesLocalStorage");
console.log(formulaireValuesLocalStorage);
// mettre les valeurs "formulaireValuesLocalStorage" dans les champs du formulaire
document.getElementById("prenom").value = formulaireValuesLocalStorage.prenom;
document.getElementById("nomUtilisateur").value = formulaireValuesLocalStorage.nom;
document.getElementById("mail").value = formulaireValuesLocalStorage.mail;
document.getElementById("adresse").value = formulaireValuesLocalStorage.adresse;
document.getElementById("ville").value = formulaireValuesLocalStorage.ville;
document.getElementById("codePostal").value = formulaireValuesLocalStorage.codePostal;

// ************************ fin mettre le contenu de la key 'formulaireValues' du local storage dans les champs du formulaire 