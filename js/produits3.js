




// Mettre le choix de l'utilisateur dans une variable
// const 



/*
Récupération  de l'id du produit à afficher dans l'url (récupération de la chaîne de requete dans l'URL)
*/
const queryString_url_id = window.location.search;
console.log(queryString_url_id);

//  extraire l' id  on utilise un constructeur

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

    for(let color of article.colors ) {  
    choixCouleur.innerHTML +=`<option id="couleur" value="color">${color}</option>`;
    }
   console.log(choixCouleur);
    /*
  
    var couleurSelect = [];
    console.log(couleurSelect);
    selectBox = document.getElementById("couleur"),
    j;

        for (j=0; j < selectBox.article.colors.length; j++) 
        {
          if (selectBox.article.colors[j].selected) 
          {
            couleurSelect.push(selectBox.article.colors[j]);
          }
        }
        console.log(couleurSelect);

    */


    /**
     var couleurSelect = document.getElementById("couleur").options[document.getElementById('couleur').selectedIndex].text;
        choixCouleur.addEventListener("mouseup", localStorage.setItem('color', choixcouleurSelectCouleur)); 
    
    */

  prix = document.getElementById("prix").innerText = "Prix : " + article.price / 100 + " € ";

  document.getElementById("btn_panier").onclick = function (){

// **************récuperation des valeurs du formulaire

const produitSelect = {
  img : article.imageUrl,
  id: article._id,
  name: article.name,
  // color: article.colors.selected,
  //  color: couleurSelect, 
  price: article.price,
  quantity: 1
 }

 console.log(produitSelect)

// ********Le Local storage
// **stocker la récuperation des valeurs du formulaire dans le local storage

// Déclaration de la variable 'produitEnregistreDansLocalStorage' dans laquelle on met les key et les values qui sont dans le local storage

let produitEnregistreDansLocalStorage = JSON.parse(localStorage.getItem("produit"));// pour le moment le local storage est vide pour l remplir il faut d'abord utiliser 'setItem' pour envoyer les données puis 'getItem' pour les recuperer
// JESON.pars c'est pour convertir les données au format JSON qui sont dans le local storage en objet javaScript

console.log(produitEnregistreDansLocalStorage);

/*

// fonction fenetre pop up
const popupConfirmaion = () => {
    if(window.confirm(`${article.name} couleur : ${'couleur'} a bienété ajouté au panier 
Cliquez sur  OK pour consulter le panier  ou ANNULER pour revenir à l'accueil`)){
       window.location.href = "panier.html";

    }else{
      window.location.href = "index.html";
     }
}
*/


    quantity = 1;

    if(produitEnregistreDansLocalStorage){

      // produitEnregistreDansLocalStorage.quantity++;
      produitEnregistreDansLocalStorage.push(produitSelect)
      localStorage.setItem("produit", JSON.stringify(produitEnregistreDansLocalStorage));
      console.log(produitEnregistreDansLocalStorage);
      console.log("helloIf");
      // popupConfirmaion();
    }else{
      produitEnregistreDansLocalStorage = [];
      produitEnregistreDansLocalStorage.push(produitSelect)
      console.log(produitEnregistreDansLocalStorage);
      localStorage.setItem("produit", JSON.stringify(produitEnregistreDansLocalStorage)); // setItem pour envoyer 'produitEnregistreDansLocalStorage' dans le local storage en lui attribuant la key produit
      console.log("helloElse");
      // popupConfirmaion();
    }

  } ;

})

.catch(function (err) {
  alert(err);
});







