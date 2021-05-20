//récupération des données des produits du local storage 

let produitEnregistreDansLocalStorage = JSON.parse(localStorage.getItem("basket"));
console.log('produitEnregistreDansLocalStorage')
console.log(produitEnregistreDansLocalStorage)


// fonction pour la Gestion du boutton supprimer l'article 

const removeElementFromBasket = (id, color, name, quantity) => {
     console.log("element supprimer");
    console.log(id, color, name, quantity); 
        
    const basketWithoutRemovedElement = produitEnregistreDansLocalStorage.filter(
      (elem) => {
        console.log("elem.id !== id && elem.color !== color");
        console.log(elem.id === id && elem.color === color);
        console.log("elem.quantity avant le  if");
        console.log(elem.quantity, elem.id, elem.color );
           

        if (elem.quantity > 1  ){
            console.log("le 1er if");
            if( elem.id === id && elem.color === color){
                console.log("le 2eme if");
                elem.quantity = elem.quantity - 1; 
                return elem.quantity;               
            }            
               
        }else if(elem.id !== id){
            console.log("le else");
            return (elem.id !== id );
        }
        
         return (elem.id !== id && elem.color !== color && elem.quantity );
        
    }
    );
    console.log("basketWithoutRemovedElement");
    console.log(basketWithoutRemovedElement);
    localStorage.setItem("basket", JSON.stringify(basketWithoutRemovedElement));
    console.log(basketWithoutRemovedElement);
     document.location.reload();
  };
  
// Fin fonction pour la Gestion du boutton supprimer l'article 

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
                           
            </div>            
         `;

         const deleteButton = document.createElement("button");
         deleteButton.innerHTML = "supprimer";

         panierVide.appendChild(DivProduit); 
         panierVide.appendChild(deleteButton); 

          // Supression de l'article du local storage
          console.log("element.id, element.color");
          console.log(element.id, element.color,element.name, element.quantity);

          deleteButton.addEventListener("click", () =>{
              console.log("apres le click");
            //   console.log(removeElementFromBasket(element.id, element.color, element.quantity));
            removeElementFromBasket(element.id, element.color, element.name, element.quantity);
            console.log("element.id, element.color, element.quantity");
            console.log(element.id, element.color, element.name, element.quantity);
          }        
         ); 

        
    });


    var prixTotalPanier = document.createElement("p");
        prixTotalPanier.innerHTML = `<p id="prixTotal">Total de votre panier : ${totalPrice/100} € </p> `
        panierVide.appendChild(prixTotalPanier);
        


}else{
document.getElementById('panierVide').innerText = "Votre panier est vide";
console.log('hello');
 }

 //*************************** Gestion du boutton supprimer l'article ************************* 
 
 





 //*************************** Fin DE la Gestion du boutton supprimer l'article *************************  



// ***************************************addEventListener pour le boutton "je valide mon panier et mes informations" formulaire***********************
const btnEnvoyerFormulaire = document.getElementById("envoiFormulaire");
btnEnvoyerFormulaire.addEventListener("click", ()=>{
// e.preventDefault(); // a enlever

    //*****************************************récuperation des valeurs du formulaire de commande pour les mettre dans le local storage*********************************************/

const contact = {
    firstName: document.getElementById("prenom").value,    
    lastName : document.getElementById("nomUtilisateur").value,
    email : document.getElementById("mail").value,
    address : document.getElementById("adresse").value,
    city : document.getElementById("ville").value,   
};

localStorage.setItem("contact", JSON.stringify(contact));

const products = produitEnregistreDansLocalStorage.map(
    (produit) => produit.id
);

console.log("products");
console.log(products);
console.log("contact");
console.log(contact);


//*****************************************Fin récuperation des valeurs du formulaire de commande pour les mettre dans le local storage********


// mettre les values du formulaire et les produits selectionnées dans l'objet 'aEnvoyer'  pour les  envoyer vers le serveur

/*
var aEnvoyer = { 
   products,
   contact
}

console.log('aEnvoyer');
console.log(aEnvoyer);
*/

//  Envoie de l'objet 'aEnvoyer' vers le serveur

    fetch("http://localhost:3000/api/teddies/order", {
    method: "POST",
    body: JSON.stringify({ 
        products,
        contact
     }),
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});


});

// ************************mettre le contenu de la key 'contact' du local storage dans les champs du formulaire 
// prendre  la key 'contact' du local storage est la mettre dans une variable


var formulaireValuesLocalStorage = JSON.parse(localStorage.getItem("contact")) || [];
console.log("formulaireValuesLocalStorage");
console.log(formulaireValuesLocalStorage);
// mettre les valeurs "formulaireValuesLocalStorage" dans les champs du formulaire
document.getElementById("prenom").value = formulaireValuesLocalStorage.firstName;
document.getElementById("nomUtilisateur").value = formulaireValuesLocalStorage.lastName;
document.getElementById("mail").value = formulaireValuesLocalStorage.email;
document.getElementById("adresse").value = formulaireValuesLocalStorage.address;
document.getElementById("ville").value = formulaireValuesLocalStorage.city;
// document.getElementById("codePostal").value = formulaireValuesLocalStorage.codePostal;

// ************************ fin mettre le contenu de la key 'contact' du local storage dans les champs du formulaire 