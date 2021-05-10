

let produitEnregistreDansLocalStorage = JSON.parse(localStorage.getItem("produit"));
// console.log(produitEnregistreDansLocalStorage)
if (produitEnregistreDansLocalStorage){
    produitEnregistreDansLocalStorage.forEach(element => {
       
        var DivProduit = document.createElement("div");

        DivProduit.innerHTML = ` <div class="blocProduit">
        <img src="${element.imageUrl}" alt="">  
        <p id="nom">${element.name}</p>
        <p id="quantite">Quantité : ${'1'} </p>
        <p id="couleur">Couleur :</p>
        <p id="prix">Prix : ${element.price}</p>
        <button>suprimer</button>
        <p id="prixTotal">Total de votre panier :  </p>
            </div>           `;
            panierVide.appendChild(DivProduit); 


    });

}else{
document.getElementById('panierVide').innerText = "Votre panier est vide";
console.log('hello');
}