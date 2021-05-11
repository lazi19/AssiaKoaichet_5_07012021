//récupération des données du local storage 

let produitEnregistreDansLocalStorage = JSON.parse(localStorage.getItem("produit"));
// console.log(produitEnregistreDansLocalStorage)
// injection de l HTML

if (produitEnregistreDansLocalStorage){
    produitEnregistreDansLocalStorage.forEach(element => {
       
        var DivProduit = document.createElement("div");

        DivProduit.innerHTML =
         ` 
            <div class="blocProduit">
                <img src="${element.img}" alt="" width= 200>  
                <p id="nom">${element.name}</p>
                <p id="quantite">Quantité : ${'1'} </p>
                <p id="couleur">Couleur :</p>
                <p id="prix">Prix : ${element.price/100} €</p>
                <button>suprimer</button>            
            </div>
            
         `;
         
         panierVide.appendChild(DivProduit); 
           
    });

}else{
document.getElementById('panierVide').innerText = "Votre panier est vide";
console.log('hello');
 }

 /*
 
 var prixTotalPanier = 0;
     convertPriceEnNombre = parseInt(produitEnregistreDansLocalStorage.price);
     prixTotalPanier += convertPriceEnNombre/100; //calculer le prix total du panier
       
    var PprixTotalPanier = document.createElement("p");
        PprixTotalPanier.innerHTML = `<p id="prixTotal">Total de votre panier : ${prixTotalPanier} € </p> `
        panierVide.appendChild(PprixTotalPanier);
            
           
 
 */
 
    

