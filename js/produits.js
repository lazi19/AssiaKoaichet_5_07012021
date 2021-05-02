/**
 * Récupération  de l'id du produit à afficher dans l'url
 */

//  const url_string = produits.html;
//  const url = new URL(url_string);
//  const id = url.searchParams.get("_id");  
//  console.log(id)          

const divProduit = document.getElementById("produit");
console.log(divProduit);

fetch("http://localhost:3000/api/teddies")
    .then(function(response) {
      console.log("FIN DE LA REQUETE");
      
      console.log(response);
        return response.json();
        
    })
    .then(function(article) {
        // divProduit.src = article[0].url
        // + lang.get(0));
      console.log(article);
      for (let i in article) {

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
     }
        
    })

    .catch(function(err) {
      alert(err)      
    });