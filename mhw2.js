function mostramenu(event) {
    const menu = event.currentTarget;
    if (document.querySelector('.menu-mobile')) {
        chiudiMenu();
        return;
    }
    let overlay = document.createElement("div");
    overlay.classList.add("overlay");
    let menuDiv = document.createElement("div");
    menuDiv.classList.add("menu-mobile");
    const menuItems = [
        { text: "PROFUMI", url: "#" },
        { text: "MAKE-UP", url: "#" },
        { text: "CAPELLI", url: "#" },
        { text: "MARCHI", url: "#" },
        { text: "SPEDIZIONI", url: "#" },
        { text: "BEAUTY CARD", url: "#" }
    ];
    for (let i = 0; i < menuItems.length; i++) {
        const item = document.createElement("a");
        item.textContent = menuItems[i].text;
        item.href = menuItems[i].url;
        item.classList.add("menu-link"); 
        menuDiv.appendChild(item);
    }
    document.body.appendChild(overlay);
    document.body.appendChild(menuDiv);
    document.body.classList.add("body-no-scroll");

    // Delay per evitare chiusura immediata
    setTimeout(() => {
        document.body.addEventListener("click", chiudiMenuBody);
    }, 10);

    overlay.addEventListener("click", chiudiMenu);
}

function chiudiMenu() {
    const menuDiv = document.querySelector('.menu-mobile');
    const overlay = document.querySelector('.overlay');
    if (menuDiv) document.body.removeChild(menuDiv);
    if (overlay) document.body.removeChild(overlay);
    document.body.removeEventListener("click", chiudiMenuBody);
    document.body.classList.remove("body-no-scroll");
}

function chiudiMenuBody(event) {
    const menuDiv = document.querySelector('.menu-mobile');
    const menu = document.querySelector('#menu');

    if (menuDiv && !menuDiv.contains(event.target) && event.target !== menu) {
        chiudiMenu();
    }
}

// Evento per aprire il menu
const menu = document.querySelector('#menu');
menu.addEventListener('click', mostramenu);


// scorrimento immagini

//funzione di supporto 
function aggiornaImmagini( vet,dim) {
    for (let i = 0; i < dim; i++) {
        vet[i].classList.remove("img-showed");
        vet[i].classList.add("img-hidden");
    }
    vet[contatoreimmagini].classList.remove("img-hidden");
    vet[contatoreimmagini].classList.add("img-showed");
}
function mostraImmaginePrecedente(event) {
    const backphoto = event.currentTarget;
        contatoreimmagini--;
        const images = Array.from(document.querySelectorAll("#immagine-principale-da-computer .img-showed, #immagine-principale-da-computer .img-hidden"));
        const Tot = images.length;
        const nextphoto = document.querySelector("#immagine-principale-da-computer .next,#immagine-principale-da-computer .next-hidden");
        if (contatoreimmagini == 0) {
            backphoto.classList.remove("back");
            backphoto.classList.add("back-hidden");
        } else {
            backphoto.classList.remove("back-hidden");
            backphoto.classList.add("back");
        }

        if (contatoreimmagini < Tot - 1) {
            nextphoto.classList.remove("next-hidden");
            nextphoto.classList.add("next");
        }
        aggiornaImmagini(images,Tot);
}

function mostraImmagineSuccessiva(event) {
    const images =Array.from(document.querySelectorAll("#immagine-principale-da-computer .img-showed, #immagine-principale-da-computer .img-hidden"));
    const Tot = images.length;
    const nextphoto= event.currentTarget;
    const backphoto=document.querySelector("#immagine-principale-da-computer .back, #immagine-principale-da-computer .back-hidden");
    contatoreimmagini++;
     if (contatoreimmagini >= Tot-1){
        nextphoto.classList.remove("next");
        nextphoto.classList.add("next-hidden");
    }
        
    if(contatoreimmagini>=1){
        backphoto.classList.remove("back-hidden");
        backphoto.classList.add("back");
    }
   aggiornaImmagini(images,Tot);
}
function mostraImmagineSuccessivaMobile(event) {
    const images =Array.from(document.querySelectorAll("#immagine-principale-mobile .img-showed, #immagine-principale-mobile .img-hidden"));
    const Tot = images.length;
    const nextphoto= event.currentTarget;
    const backphoto=document.querySelector("#immagine-principale-mobile .back, #immagine-principale-mobile .back-hidden");
    contatoreimmagini++;
     if (contatoreimmagini >= Tot-1){
        nextphoto.classList.remove("next");
        nextphoto.classList.add("next-hidden");
    }
        
    if(contatoreimmagini>=1){
        backphoto.classList.remove("back-hidden");
        backphoto.classList.add("back");
    }
   aggiornaImmagini(images,Tot);
}
function mostraImmaginePrecedenteMobile(event) {
    const backphoto = event.currentTarget;
        contatoreimmagini--;
        const images = Array.from(document.querySelectorAll("#immagine-principale-mobile .img-showed, #immagine-principale-mobile .img-hidden"));
        const Tot = images.length;
        const nextphoto = document.querySelector("#immagine-principale-mobile .next,#immagine-principale-mobile .next-hidden");
        if (contatoreimmagini == 0) {
            backphoto.classList.remove("back");
            backphoto.classList.add("back-hidden");
        } else {
            backphoto.classList.remove("back-hidden");
            backphoto.classList.add("back");
        }

        if (contatoreimmagini < Tot - 1) {
            nextphoto.classList.remove("next-hidden");
            nextphoto.classList.add("next");
        }
        aggiornaImmagini(images,Tot);
}


let contatoreimmagini=0;
const nextphoto=document.querySelector("#immagine-principale-da-computer .next");
const nextphotomobile=document.querySelector("#immagine-principale-mobile .next");
nextphoto.addEventListener("click", mostraImmagineSuccessiva);
nextphotomobile.addEventListener("click", mostraImmagineSuccessivaMobile);
const backphoto=document.querySelector("#immagine-principale-da-computer .back, #immagine-principale-da-computer .back-hidden");
const backphotomobile=document.querySelector("#immagine-principale-mobile .back, #immagine-principale-mobile .back-hidden");
backphoto.addEventListener("click", mostraImmaginePrecedente);
backphotomobile.addEventListener("click", mostraImmaginePrecedenteMobile);


// gestione prodotti preferiti
let numpreferiti=0;
 function aggiornaBadge(){
    const iconContainer = document.querySelector("#preferiti").parentElement; // Seleziona il pulsante <button class="icons"> (il parente del nodo)
    // Controlla se il badge esiste già
    let badge = iconContainer.querySelector(".badge");
     if(numpreferiti>0){
        if (!badge) { 
            //se non esiste lo crea
            badge = document.createElement("span");
            badge.classList.add("badge");
            iconContainer.appendChild(badge); 
        } //altrimenti aggiorna solo il text
        badge.textContent = numpreferiti;
     } else{
        if(badge)
            badge.remove();
     }
   
 }

function rimuovi_preferito(event) {
    const icon = event.currentTarget;
    icon.src='favorite_24dp_1F1F1F_FILL0_wght100_GRAD-25_opsz24.png';
    icon.removeEventListener('click', rimuovi_preferito);
    icon.addEventListener('click', preferiti);
    numpreferiti--;
    aggiornaBadge();
}
function preferiti(event) {
  const icon=event.currentTarget;
  icon.src='favorite_24dp_1F1F1F_FILL1_wght100_GRAD-25_opsz24.png';
  numpreferiti++;
 icon.removeEventListener('click', preferiti);
 icon.addEventListener('click', rimuovi_preferito);
 aggiornaBadge();
}
const icone = document.querySelectorAll('.catalogo .icon');
for (let icon of icone){
    icon.addEventListener('click',preferiti);
}
// funzioni di supporto
function mostraProdotto(el) {
    el.classList.remove("prodotto-hidden");
    el.classList.add("prodotto");
  }
  
  function nascondiProdotto(el) {
    el.classList.remove("prodotto");
    el.classList.add("prodotto-hidden");
  }
  
// scorrimento prodotti in avanti aggiunta del bottone back
function aggiornaCatalogo(event) {
    const catalogoAttivo = event.currentTarget.closest(".catalogo");
    let visualizzatiIndex = parseInt(catalogoAttivo.getAttribute("data-visualizzati")) || 5; //get restituisce null se non esiste quindi al primo click su ogni catalogo visualizzatiIndex è 5
    const prodotti = catalogoAttivo.querySelectorAll(".prodotto, .prodotto-hidden");
    const totaleProdotti = prodotti.length;
    const next = catalogoAttivo.querySelector(".next");
    const back_hidden = catalogoAttivo.querySelector(".back-hidden");
    const resto = totaleProdotti % 5;

    let startIndex = visualizzatiIndex - 5;
    for (let i = startIndex; i < visualizzatiIndex; i++) {
        nascondiProdotto(prodotti[i]);
    }

    if (resto !== 0 && visualizzatiIndex >= totaleProdotti - resto) {
        for (let i = totaleProdotti - 5; i < totaleProdotti; i++) {
            if (!prodotti[i].classList.contains("prodotto")) { 
                mostraProdotto(prodotti[i]);
            }
        }

        if (next && visualizzatiIndex >= totaleProdotti - 10) {  
            next.classList.remove("next");
            next.classList.add("next-hidden"); 
        }
        
        if (back_hidden) {  
            back_hidden.classList.remove("back-hidden");
            back_hidden.classList.add("back");    
        } 
    }
   //ultimi prodotti n prodotti multiplo di 5
    if (visualizzatiIndex < totaleProdotti - 5) {
        for (let i = visualizzatiIndex; i < visualizzatiIndex + 5; i++) {
            mostraProdotto(prodotti[i]);
        }
        visualizzatiIndex += 5;
    } else {
        for (let i = visualizzatiIndex; i < totaleProdotti; i++) {
            mostraProdotto(prodotti[i]);
        }
    }

    catalogoAttivo.setAttribute("data-visualizzati", visualizzatiIndex); //aggiungiamo o aggiorniamo valore

    // Rendi visibile il pulsante Back se ci sono prodotti nascosti
    if (visualizzatiIndex > 5) {
        back_hidden.classList.remove("back-hidden");
        back_hidden.classList.add("back");
    }
}

function Back(event) {
    const catalogoAttivo = event.currentTarget.closest(".catalogo");
    let visualizzatiIndex = parseInt(catalogoAttivo.getAttribute("data-visualizzati")) || 5; //converte stringa in numero e riprende l'indice del prodotto del catalogo attivo
    const prodotti = catalogoAttivo.querySelectorAll(".prodotto, .prodotto-hidden");
    const totaleProdotti = prodotti.length;
    const back = catalogoAttivo.querySelector(".back");
    const next_hidden = catalogoAttivo.querySelector(".next-hidden");

    for (let i = visualizzatiIndex - 5; i < visualizzatiIndex; i++) {
        if (i >= 0 && i < totaleProdotti) {
            nascondiProdotto(prodotti[i]);
        }
    }

    visualizzatiIndex -= 5;
    if (visualizzatiIndex < 5) visualizzatiIndex = 5;

    for (let i = visualizzatiIndex - 5; i < visualizzatiIndex; i++) {
        if (i >= 0 && i < totaleProdotti) {
            mostraProdotto(prodotti[i]);
        }
    }

    catalogoAttivo.setAttribute("data-visualizzati", visualizzatiIndex);

    // Nascondi il pulsante Back se torni alla prima pagina
    if (visualizzatiIndex <= 5) {
        back.classList.remove("back");
        back.classList.add("back-hidden");
    }

    // Riattiva il pulsante next
    if (next_hidden) {
        next_hidden.classList.remove("next-hidden");
        next_hidden.classList.add("next");
    }
}

const nextButtons = document.querySelectorAll(".catalogo .next");
for (let i = 0; i < nextButtons.length; i++) {
    nextButtons[i].addEventListener("click", aggiornaCatalogo);
}

const backButtons = document.querySelectorAll(".catalogo .back, .catalogo .back-hidden");
for (let i = 0; i < backButtons.length; i++) {
    backButtons[i].addEventListener("click", Back);
}
