//récupération des données des produits du local storage (basket)

let produitEnregistreDansLocalStorage = JSON.parse(
  localStorage.getItem("basket")
);

//declaration de la variable panierVIde
let panierVide = document.getElementById("panierVide");
// fonction pour la Gestion du boutton supprimer l'article

const removeElementFromBasket = (id, color, name, quantity) => {
  const basketWithoutRemovedElement = produitEnregistreDansLocalStorage.filter(
    (elem) => {
      if (elem.id === id && elem.color === color) {
        if (elem.quantity > 1) {
          elem.quantity = elem.quantity - 1;
          // return elem.quantity;
          return true;
        } else {
          return false;
        }
      } else {
        // return (elem);
        return true;
      }
    }
  );

  localStorage.setItem("basket", JSON.stringify(basketWithoutRemovedElement));
  console.log(basketWithoutRemovedElement);
  document.location.reload();
};

// Fin fonction pour la Gestion du boutton supprimer l'article

// condition si le panier est plein affiche la page recapitulative de l'ensemble des achats en injectant l'HTML des produits en précision la quantité la couleur et le prix
if (produitEnregistreDansLocalStorage) {
  let totalPrice = 0;
  // *************************** injection de l HTML ***************************
  produitEnregistreDansLocalStorage.forEach((element) => {
    totalPrice = totalPrice + element.price * element.quantity; // calcule du prix total de tous les articles

    var DivProduit = document.createElement("div");
    DivProduit.classList.add("DivProduit");
    DivProduit.innerHTML = ` 
            <div id="blocProduit" class="blocProduit">
                <img src="${element.img}" alt="" width= 200> 
                <div id="blocProduitText" class="blocProduit_text"> 
                        <div>  
                            <p id="nom">${element.name}</p>
                            <p id="couleur">Couleur : ${element.color} </p>
                        </div>
                        <div>    
                            <p id="quantite">Quantité : ${element.quantity} </p>
                            <p id="prix">Prix : ${
                              element.price / 100
                            } €</p>                           
                        </div>
                </div> 
            </div>         
         `;
    // création du bouton supprimer
    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = ` <i class="fas fa-trash"></i> `;
    deleteButton.classList.add("btnSupprimer");

    //question concernant panierVide je n'ai pas déclaré cette variable  document.getElementById('panierVide').appendChild(DivProduit);

    panierVide.appendChild(DivProduit);
    //  panierVide.appendChild(deleteButton);
    DivProduit.appendChild(deleteButton);

    // *************************** Fin injection de l HTML si le panier est rempli ***************************

    //*************************** Gestion du boutton supprimer l'article *************************

    // Supression de l'article du local storage

    deleteButton.addEventListener("click", () => {
      removeElementFromBasket(
        element.id,
        element.color,
        element.name,
        element.quantity
      );
    });

    //*************************** Fin DE la Gestion du boutton supprimer l'article *************************
  });

  // injection de  HTML  du resultats prix total
  var prixTotalPanier = document.createElement("p");
  prixTotalPanier.innerHTML = `<p id="prixTotal">Total de votre panier : ${
    totalPrice / 100
  } € </p> `;
  panierVide.appendChild(prixTotalPanier);

  localStorage.setItem("totalPrice", totalPrice / 100);
}

// ***************************************(écoute de la soumission du formulaire)addEventListener pour le boutton "je valide mon panier et mes informations" ***********************

const btnEnvoyerFormulaire = document.getElementById("formOrder");
btnEnvoyerFormulaire.addEventListener("submit", (e) => {
  e.preventDefault();

  let totalPrice = JSON.parse(localStorage.getItem("totalPrice"));

  if (
    produitEnregistreDansLocalStorage &&
    produitEnregistreDansLocalStorage.length > 0
  ) {
    //*****************************************récuperation des valeurs du formulaire de commande pour les mettre dans le local storage*********************************************/
    const contact = {
      firstName: document.getElementById("prenom").value,
      lastName: document.getElementById("nomUtilisateur").value,
      email: document.getElementById("mail").value,
      address: document.getElementById("adresse").value,
      city: document.getElementById("ville").value,
    };

    localStorage.setItem("contact", JSON.stringify(contact));
    // avec La méthode map() on a créer un nouveau tableau ne contient que les id des produits
    const products = produitEnregistreDansLocalStorage.map(
      (produit) => produit.id
    );

    //*****************************************Fin récuperation des valeurs du formulaire de commande pour les mettre dans le local storage********
    //  Envoie de l'objet qui contient la constante products (les id des produits) et la constante contact(valeurs du formulaire)  vers le serveur

    fetch("http://localhost:3000/api/teddies/order", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        products,
        contact,
      }),
    })
      .then(function (res) {
        if (res.ok) {
          return res.json();
        }
      })

      .then(function (value) {
        recupOrderId = value.orderId;
        console.log(recupOrderId);
        localStorage.setItem("orderId", JSON.stringify(recupOrderId));
      });

    // chargement de la page confirmation
    document.location.href = "confirmation.html";
  } else {
    // injection de l'HTML  Votre panier est vide
    panierVide.style.color = "red";
    panierVide.innerText = "Votre panier est vide";
  }
});
