//  creation de la fonction ajouterAuPanier pour ajouter l'article au panier apres le clic sur le bouton

const ajouterAuPanier = (article) => {
  alert("votre article a été ajouté au panier");
  console.log("Ajouter au Panier");

  //récupération de la valeur de l'option (couleur choisi par  l'utilisateur)
  const selectElm = document.getElementById("couleurs");
  const selectedColor = selectElm.value;

  // JSON.parse méthode pour convertir les données  format JSON (chaine de caractère) qui sont dans le local storage en objet JavaScript

  const currentBasket = JSON.parse(localStorage.getItem("basket")) || [];
  console.log(currentBasket);
  //création de la const alreadyInBasket qui contient le produit séléctionner si il existe dans basket( avec meme id et la même couleur)
  const alreadyInBasket = currentBasket.find(
    (element) => element.id === article._id && element.color === selectedColor
  );
  // console.log(alreadyInBasket)

  // si la const alreadyInBasket est true incrémente quantity
  if (alreadyInBasket) {
    alreadyInBasket.quantity++;
    console.log(alreadyInBasket);
  } else {
    // sinon avec la méthode push  rajoute cet objet au tableau currentBasket
    currentBasket.push({
      img: article.imageUrl,
      id: article._id,
      name: article.name,
      color: selectedColor,
      price: article.price,
      quantity: 1,
    });
    console.log(currentBasket);
  }

  // **** Stocker les valeurs du produit séléctionner  dans le local storage ****
  localStorage.setItem("basket", JSON.stringify(currentBasket));
};
//  Fin de la création de la fonction ajouterAuPanier pour ajouter l'article au panier

/*
  Récupération  de l'id du produit sélectionné de l'url (récupération de la chaîne de requete dans l'URL)
 */
const queryString_url_id = window.location.search; //L'objets Location est une méthode toString renvoyant l'URL courante et search renvoi La partie de l'URL qui suit le symbole « ? », avec ce symbole inclus
console.log(queryString_url_id);

//  extraire l' id  en utilisant un constructeur

const urlSearchParams = new URLSearchParams(queryString_url_id); //utiliser URLSearchParams pour interroger l'URL
console.log(urlSearchParams);

const id = urlSearchParams.get("id"); //récupèration  de la valeur associée au paramètre id
console.log(id);

//requête http vers le produit correspondant à l'id donné

fetch(`http://localhost:3000/api/teddies/${id}`)
  .then(function (response) {
    console.log(response);
    return response.json();
  })
  //  affichage de l'article qui a été selectionné par l'id dans la page produits
  .then(function (article) {
    console.log(article);
    //  Sélection des elements  ou je vais (injecter)  HTML
    document.getElementById("img").src = article.imageUrl;
    document.getElementById("nom").innerText = article.name;
    document.getElementById("description").innerText = article.description;
    document.getElementById("prix").innerText = "Prix : " + article.price / 100 + " € ";

    //création des options couleurs
    let choixCouleur = document.querySelector("select");
    for (let color of article.colors) {
      choixCouleur.innerHTML += `<option id="couleur" value="${color}">${color}</option>`;
    }
    //Fin création des options couleurs

    // ecouter l'evenement du clic sur le bouton Ajouter au panier

    document.getElementById("btn_panier").onclick = () =>
      ajouterAuPanier(article);
  })

  .catch(function (err) {
    alert(err);
  });
