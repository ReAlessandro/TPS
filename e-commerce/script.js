var catalogo = {};
var carrello = [];

// ======= XML =======
fetch("lavoro.xml").then(r => r.text()).then(dati => {
    var xml = new DOMParser().parseFromString(dati, "text/xml");
    var lista = xml.getElementsByTagName("prodotto");
    catalogo["Lavoro"] = [];

    for (var i = 0; i < lista.length; i++) {
        var nome = lista[i].getElementsByTagName("nome")[0].textContent;
        var prezzo = lista[i].getElementsByTagName("prezzo")[0].textContent;
        var descrizione = lista[i].getElementsByTagName("descrizione")[0].textContent;
        catalogo["lavoro"].push({ nome: nome, prezzo: prezzo, descrizione: descrizione});
    }
});

// ======= JSON =======
fetch("elettrodomestici.json").then(r => r.json()).then(dati => {
    catalogo["elettrodomestici"] = dati;
});

// ======= CSV =======
fetch("sport.csv").then(r => r.text()).then(dati => {
    var righe = dati.split("\n");
    catalogo["sport"] = [];

    for (var i = 1; i < righe.length; i++) {
        var campi = righe[i].split(",");
        if (campi.length > 1) {
            catalogo["sport"].push({
                nome: campi[1],
                prezzo: campi[2],
                descrizione: campi[3]
            });
        }
    }
});

// ======= TXT =======
fetch("aerei.txt").then(r => r.text()).then(dati => {
    var righe = dati.split("\n");
    catalogo["Aerei"] = [];

    for (var i = 0; i < righe.length; i++) {
        if (righe[i].includes("|")) {
            var pezzi = righe[i].split("|");
            catalogo["Aerei"].push({
                nome: pezzi[0].trim(),
                prezzo: pezzi[1],
                descrizione: pezzi[2].trim()
            });
        }
    }
});

// ======= MOSTRA CATALOGO =======
setTimeout(function () {
    var div = document.getElementById("catalogo");

    for (var categoria in catalogo) {
        var btn = document.createElement("button");
        btn.innerHTML = categoria;

        btn.onclick = function () {
            mostraProdotti(this.innerHTML);
        };

        div.appendChild(btn);
    }
}, 1000);

// ======= MOSTRA PRODOTTI =======
function mostraProdotti(cat) {
    document.getElementById("titolo").innerHTML = cat;
    var div = document.getElementById("prodotti");
    div.innerHTML = "";

    for (var i = 0; i < catalogo[cat].length; i++) {
        var p = catalogo[cat][i];

        div.innerHTML += 
            p.nome + " - €" + p.prezzo +
            " <button onclick=\"aggiungi('" + p.nome + "', " + p.prezzo + ")\">Acquista</button><br>";
    }
}

// ======= CARRELLO =======
function aggiungi(nome, prezzo) {
    carrello.push({ nome: nome, prezzo: prezzo });
    mostraCarrello();
}

function mostraCarrello() {
    var div = document.getElementById("carrello");
    div.innerHTML = "";
    var totale = 0;

    for (var i = 0; i < carrello.length; i++) {
        div.innerHTML += carrello[i].nome + " - €" + carrello[i].prezzo + "<br>";
        totale += parseFloat(carrello[i].prezzo);
    }

    div.innerHTML += "<b>TOTALE: €" + totale + "</b><br>";
    div.innerHTML += "<button onclick='generaPDF()'>Conferma</button>";
}

// ======= PDF =======
function generaPDF() {
    var doc = new window.jspdf.jsPDF();
    var y = 20;

    doc.text("SCONTRINO", 20, y);
    y += 10;

    var totale = 0;

    for (var i = 0; i < carrello.length; i++) {
        doc.text(carrello[i].nome + " €" + carrello[i].prezzo, 20, y);
        totale += parseFloat(carrello[i].prezzo);
        y += 10;
    }

    y += 10;
    doc.text("TOTALE: €" + totale, 20, y);

    doc.save("scontrino.pdf");
    carrello = [];
    mostraCarrello();
}
