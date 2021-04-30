//  l'appel a la API 

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
                    
            DivProduit.innerHTML = ` <div id="carteProduit" class="" >
            <img id="img" src="${element.imageUrl}" alt="ours" >
            <h2 id ="name" class="name">${element.name}</h2>  
            <p id ="description" class="" >${element.price}</p>
        </div>  `;
            
console.log(divProduitListe)
        divProduitListe.appendChild(DivProduit);
          });
    })

    .catch(function(err) {
      alert(err)      
    });