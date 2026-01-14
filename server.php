<?php
$C = $_GET["cifrato"];

echo "Messaggio cifrato: $C";
$file = fopen("priv.json", "r");
$nuovo = fread($file, filesize("priv.json"));
echo $nuovo;
$contenuto = json_decode($nuovo);

$K = $contenuto->K;
$N = $contenuto->N;
function decifrare(int $C, int $K, int $N){
    return pow($C, $K) % $N;
}

echo "<br>Messaggio decifrato: " . decifrare($C, $K, $N);
?>