function pulisciTabella() {
    document.getElementById("tabella").innerHTML =
        "<tr><th>Nome</th><th>Prezzo</th><th>Descrizione</th><th></th></tr>";
}

function LetturaFileXML() {
    pulisciTabella();

    let leggi = new XMLHttpRequest();
    leggi.open('GET', 'https://realessandro.github.io/TPS/e-commerce/Lavoro.xml', true);
    leggi.send();

    leggi.onload = function () {
      const xml = leggi.responseXML;
      

      const prodotto = xml.getElementsByTagName("prodotto");

      for (let i = 0; i < prodotto.length; i++) {
        let nome = prodotto[i].getElementsByTagName("nome")[0].textContent;
        let prezzo = prodotto[i].getElementsByTagName("prezzo")[0].textContent;
        let descrizione = prodotto[i].getElementsByTagName("descrizione")[0].textContent;


        aggiungiriga(nome, prezzo, descrizione);
      }

    }
}


function LetturaFileJSON() {
    pulisciTabella();

    let leggi = new XMLHttpRequest();

    leggi.open('GET', 'https://realessandro.github.io/TPS/e-commerce/elettrodomestici.json', true);
    leggi.send();
    leggi.onload = function () {
        
    const dati = JSON.parse(leggi.responseText);

        for (i = 0; i < dati.prodotti.length; i++) {
            let x = dati.prodotti[i];
            aggiungiriga(x.nome, x.prezzo, x.descrizione);
        }
    }
}

function LetturaFileCSV() {

    pulisciTabella();

    let leggi = new XMLHttpRequest();
    leggi.open('GET', 'https://realessandro.github.io/TPS/e-commerce/sport.csv', true);
    leggi.send();
    leggi.onload = function () {
        var str = "";
        const righe = leggi.responseText.split("\n");
        for (let i = 1; i < righe.length; i++) {
            const colonne = righe[i].split(",");
            aggiungiriga(colonne[0], colonne[1], colonne[2]);
        }
    }
}

function LetturaFileTXT(){
    pulisciTabella();

    let leggi = new XMLHttpRequest();
    leggi.open('GET', 'https://realessandro.github.io/TPS/e-commerce/aerei.txt', true);
    leggi.send();

    leggi.onload = function () {
        const righe = leggi.responseText.split("\n");

        for (let i = 0; i < righe.length; i++) {
            const colonne = righe[i].split(";");
            aggiungiriga(colonne[0], colonne[1], colonne[2]);
        }
    }
}

function acquista(nome, prezzo) {
    alert("Hai acquistato: " + nome + " (€" + prezzo + ")");
}

function aggiungiriga(nome, prezzo, descrizione) {
    const tabella = document.getElementById("tabella");

    tabella.innerHTML +=
        "<tr><td>" + nome + "</td><td>" + prezzo + "</td><td>" + descrizione +
        "</td><td><button onclick='acquista(\"" + nome + "\", \"" + prezzo + "\")'>Acquista</button></td></tr>";
}


