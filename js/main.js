//  l'appel a la API Fetch pour récupérer et afficher tout les infos de tous les produits (ours en peluche)
const divProduitListe = document.getElementById("produitListe");
console.log(divProduitListe);

fetch("http://localhost:3000/api/teddies")

  .then(function (response) {    
       return response.json(); //Il renvoie une promesse qui se résout avec un objet JavaScript
                               // qui est le résultat de l'analyse du corps de texte en JSON (donc malgré le nom de la méthode json() le résultat n'est pas JSON mais est plutôt un objet JavaScript 
  })

  .then(function (articles) {
    console.log(articles);
//affichage de chaque produit sous forme de liste avec la boucle forEach

    articles.forEach((element) => {
      var DivProduit = document.createElement("div");
//contenu de chaque produit affiché dans la vue sous forme de liste et injection de HTML
      DivProduit.innerHTML = ` 
            <div id="carteProduit" class="carteProduit" >
                <div class="div_img">
                    <img id="img"  class="img" src="${
                      element.imageUrl
                    }" alt="ours" >
                </div>
                <div class="textProduit">
                    <h2 id ="name" class="name">${element.name}</h2>  
                    <p id ="description" class="description" >${
                      element.price + " €"
                    }</p>            
                    <a href="produits.html?id=${
                      element._id
                    }" class="plus_de_detail"  >Pour plus de détails</a>
                </div>
            </div> `;

      console.log(divProduitListe);
      divProduitListe.appendChild(DivProduit); // rajouter le contenu de la variable  DivProduit dans la variable divProduitListe au HTML
    });
  })

  .catch(function (err) {
    alert(err);
  });
