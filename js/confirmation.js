//récupération des infos (ferstName, orderId, prixTotal )de la commande confirmée, sotckées dans le localStorage

let firstName = JSON.parse(localStorage.getItem("contact")) || [];

let orderId = JSON.parse(localStorage.getItem("orderId")) || [];

let totalPrice = JSON.parse(localStorage.getItem("totalPrice")) || [];

// mettre ses infos dans HTML de la page confirmation

document.getElementById("firstName").innerHTML = `bonjour ${firstName.firstName}.`;
document.getElementById("orderId").innerHTML = `N° de commande : ${orderId}`;
document.getElementById("total").innerHTML = `Prix total TTC : ${totalPrice} €`;
