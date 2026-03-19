<?php

//Server SOAP

function Convert($qty, $from, $to){

    $xml = simplexml_load_file("unita.xml");

    $fattori = [];

    foreach($xml->unita as $c) {
        $fattori[(string)$c['codice']] = (float)$c['fattore'];
    }

    if(isset($fattori[$from]) && isset($fattori[$to])){
        return round(($qty / $fattori[$from] * $fattori[$to]),3);
    }

    return "Errore conversione";
}

$server= new SoapServer("funzione.wsdl");

$server->addFunction("Convert");

$server->handle();

?>
