/**
 * Récupération  de l'id du produit à afficher dans l'url
 */
 function myFunction() {
  document.getElementById("element._id")
}
 const url_string = produits.html;
 const url = new URL(url_string);
 const id = url.searchParams.get("_id");  
 console.log(id)          

const divProduit = document.getElementById("produit");
console.log(divProduit);

fetch("http://localhost:3000/api/teddies")
    .then(function(response) {
      console.log("FIN DE LA REQUETE");
      
      console.log(response);
        return response.json();
        
    })
    .then(function(article) {
        divProduit.src = article[0].url
        console.log(article); 
   
     
      for (let i in article) {
        divProduit.src = article[i]._id
          const id = divProduit.src
          // return id ;
         
          const img = document.getElementById("img")
          const nom = document.getElementById("nom")
          const description = document.getElementById("description")
          const couleurs = document.getElementById("couleurs")
          const prix = document.getElementById("prix")
          

          img.innerHTML = `<img id="img" src="http://localhost:3000/images/${teddy_(i+1).jp}g" alt="peluche ours" class="teddy"></img>`;
          nom.innerText = article.name[i];
          description.innerText = article.description[i];
          couleurs.innerText = article.colors[i];
          prix.innerText += 'Prix :' + article.price[i] +' € ' ;


        console.log( article[i]);
        console.log(divProduit.src)
     }

      const id = ''; // je n'ai pas pu récupérer la 
      switch (id) {
      case id === "5be9c8541c9d440000665243" :
      (article[0]);
      break;
      case id === "5beaa8bf1c9d440000a57d94" :
      (article[1]);
      break;
      case id === "5beaaa8f1c9d440000a57d95" :
      (article[2]);
      break;
      case id === "5beaabe91c9d440000a57d96" :
      (article[3]);
      break;
      case id === "5beaacd41c9d440000a57d97": 
      (article[4])
      break;
      default:
      console.log("cet article n'existe pas");
      }
        
    })

    .catch(function(err) {
      alert(err)      
    });