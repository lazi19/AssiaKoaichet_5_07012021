//  l'appel a la API pour addicher tout les teddies 

const divProduitListe = document.getElementById("produitListe");
console.log(divProduitListe);

fetch("http://localhost:3000/api/teddies")
    .then(function(response) {
      console.log("FIN DE LA REQUETE");
      console.log(response);
        return response.json();
        
    })
    .then(function(articles) {

      console.log(articles);
     
      articles.forEach((element) => {
                      
            var DivProduit = document.createElement("div");
                    
            DivProduit.innerHTML = ` 
            <div id="carteProduit" class="carteProduit" >
            <div class="div_img"><img id="img"  class="img" src="${element.imageUrl}" alt="ours" ></div>
            <h2 id ="name" class="name">${element.name}</h2>  
            <p id ="description" class="description" >${element.price + " €"}</p>            
            <a href={"produits.html?id=${element._id} class="plus_de_detail"}>Pour plus de détails</a>
            </div> `;
            
console.log(divProduitListe)
        divProduitListe.appendChild(DivProduit);
          });
    })

    .catch(function(err) {
      alert(err)      
    });