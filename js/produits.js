
// ******************************** le Local Storage ******************************* 
// **** Stocker la récuperation des valeurs du formulaire dans le local storage **** 
//  creation de la fonction ajouterAuPanier 

 const ajouterAuPanier = (article) => {


    console.log('Ajouter au Panier')
    console.log(JSON.parse(localStorage.getItem("basket"))) // JSON.parse c'est pour convertir les données au format JSON qui sont dans le local storage en objet JavaScript

    const currentBasket = JSON.parse(localStorage.getItem("basket")) || [] ;
    // console.log('currentBasket')
    
    
    const alreadyInBasket = currentBasket.find(element => element.id === article._id);
    // console.log(alreadyInBasket)

        if (alreadyInBasket){
          alreadyInBasket.quantity++;
        } else {
          currentBasket.push({
            id: article._id,
            name: article.name,
            quantity: 1
          })
        }
};


 
/**
 * localStorage.getItem("basket", JSON.stringify(currentBasket));
  console.log('==== LOCAL STORAGE BASKET====')
  console.log(JSON.parse(localStorage.getItem("basket")))

 */



/*
  Récupération  de l'id du produit à afficher dans l'url (récupération de la chaîne de requete dans l'URL)
 */
const queryString_url_id = window.location.search;
console.log(queryString_url_id);

//  extraire l' id methode 1
//const leId = queryString_url_id.slice(4);
//console.log(leId);

//  extraire l' id methode 2 on utilise un constructeur

const urlSearchParams = new URLSearchParams(queryString_url_id);
console.log(urlSearchParams);

const id = urlSearchParams.get("id");
console.log(id);

//  affichage du produit (de l'objet) qui a été selectionné par l'id

fetch(`http://localhost:3000/api/teddies/${id}`)
  .then(function (response) {
    console.log("FIN DE LA REQUETE");

    console.log(response);
    return response.json();
  })

  .then(function (article) {
    console.log(article);

    //  Sélection des elements  ou je vais (injecter)  changer leur  code HTML

    document.getElementById("img").src = article.imageUrl;
    document.getElementById("nom").innerText = article.name;
    description = document.getElementById("description").innerText = article.description;

    let choixCouleur = document.querySelector("select");
       
    //   article.colors.forEach((color) => {
    //   choixCouleur.innerHTML += `<option>${color}</option>`;
    // })
   
     for(let color of article.colors ) {     
      choixCouleur.innerHTML +=`<option>${color}</option>`;
      
     }

    prix = document.getElementById("prix").innerText = "Prix : " + article.price / 100 + " € ";

    // ecouter l'evenement du clic sur le bouton Ajouter au panier

    document.getElementById("btn_panier").onclick = ()=> ajouterAuPanier(article); // fonction fléchée

    // document.getElementById("btn_panier").onclick = function (){ ajouterAuPanier(article) }; // la fonction normale 
    
  })

  .catch(function (err) {
    alert(err);
  });


  

  


