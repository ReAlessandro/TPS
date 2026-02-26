<?php

//Server SOAP

function Convert($qty, $from, $to){

$fileXML="unita.xml";

$xml = simplexml_load_file($fileXML);

$fattori = [];

foreach($xml->unita as $c) {

    if ($from==$c['codice'] || $to==$c['codice']) {
        $fattori[(string)$c['codice']] = (float)$c['fattore'] ;
    }

}
    if(isset($fattori[$from]) || isset($fattori[$to])){
        $ris = round(($qty / $fattori[$from] * $fattori[$to]),3);
    }
    return $ris; 

}

$server= new SoapServer("funzione.wsdl");

$server->addFunction("Convert");

$server->handle();

?>
