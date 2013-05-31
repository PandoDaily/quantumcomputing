<?php

$letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
$letters = str_split($letters);
print_r($letters);


for( $i = 0; $i <= 25; $i++) {
	$l = $letters[$i];
	$space = 24;
	$exec = " convert DISCOTEQUE.png -crop 20x32+".($i * $space)."+0 $l.png";
	exec($exec);
	}
?>
