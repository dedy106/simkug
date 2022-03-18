<?php
/**
 * an example URL for viewing a base64-encoded image:
 * http://example.com/decode.php?image/png;base64,iVBORw0KGgoAAAANS...
 */
$data = split(";", $_SERVER["QUERY_STRING"]);
$type = $data[0];
$data = split(",", $data[1]);
header("Content-type: ".$type);
echo base64_decode($data[1]);
?>
