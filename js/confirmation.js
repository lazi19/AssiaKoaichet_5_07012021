//récupération des infos (ferstName, orderId, prixTotal )de la commande confirmée, sotckées dans le localStorage

// let infoConfirmation = JSON.parse(localStorage.getItem("contact.firstName, orderId, totalPrice"));
// console.log(infoConfirmation);
// mettre ses infos dans les champs du formulaire
 let    firstName = JSON.parse(localStorage.getItem("contact")) || [];
    console.log(JSON.parse(localStorage.getItem("contact(0)")));
   let  orderId = JSON.parse(localStorage.getItem("orderId")) || [];
    console.log(orderId);
   let  totalPrice = JSON.parse(localStorage.getItem("totalPrice")) || [];
    console.log(totalPrice);

document.getElementById("firstName").innerHTML =`bonjour ${firstName.firstName}.`;
document.getElementById("orderId").innerHTML = `N° de commande : ${orderId}`;
document.getElementById("total").innerHTML = `Prix total TTC : ${totalPrice} €`;



