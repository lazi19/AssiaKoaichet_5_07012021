/**
 * Récupération  de l'id du produit à afficher dans l'url (récupération de la chaîne de requete dans l'URL)
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
let response = await fetch(`http://localhost:3000/api/teddies/${id}`)


          fetch("http://localhost:3000/api/teddies")
              .then(function(response) {
                console.log("FIN DE LA REQUETE");
                
                console.log(response);
                  return response.json();
                  
              })
              .then(function(article) {
                  // divProduit.src = article[0].url
                  
                  console.log(article);
                  // divProduit = article[i];
                  // console.log(divProduit);
                  const img = document.getElementById("img")
                  const nom = document.getElementById("nom")
                  const description = document.getElementById("description")
                  const prix = document.getElementById("prix")
                  const id = ""
              for (let i in article) {

                    // divProduit.src = article[i]._id
                    // const id = divProduit.src
                    // return id ;
                      
                
                    const img = document.getElementById("img").innerHTML = `<img id="img" src="http://localhost:3000/images/${teddy_(i+1).jpg}" alt="peluche ours" class="teddy"></img>`;
                    const nom = document.getElementById("nom").innerText = article.name[i];
                    const description = document.getElementById("description").innerText = article.description[i];
                    const couleurs = document.getElementById("couleurs").innerText = article.colors[i];
                    const prix = document.getElementById("prix").innerText += 'Prix :' + article.price[i] +' € ' ;
                  
              }
              
              // console.log( article[i]);

                      leId ="5be9c8541c9d440000665243" ; // je n'ai pas pu récupérer id 

                switch (leId) {
                case leId === "5be9c8541c9d440000665243" :
                article[0];
                break;
                case leId === "5beaa8bf1c9d440000a57d94" :
                (article[1]);
                break;
                case leId === "5beaaa8f1c9d440000a57d95" :
                (article[2]);
                break;
                case leId === "5beaabe91c9d440000a57d96" :
                (article[3]);
                break;
                case leId === "5beaacd41c9d440000a57d97": 
                (article[4])
                break;
                default:
                console.log("cet article n'existe pas");
                }
                  
              })

              .catch(function(err) {
                alert(err)      
              });


  