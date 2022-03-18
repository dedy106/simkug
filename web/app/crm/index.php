<?php
$request = $_SERVER['REQUEST_URI'];
//echo $request;
$request2 = explode('/',$request);


switch ($request2[4]) {
    case '' :
        // require __DIR__ . '/views/index.php';
        require __DIR__ . '/views/fLogin.php';
    break;
	case 'login' :
        require __DIR__ . '/views/fLogin.php';
    break;
    case 'main' :
        if(isset($request2[5]) AND $request2[5] != ""){
           $_GET['hal']=$request2[5].'.php';
        }
        include_once(__DIR__ . '/views/fMain.php');
    break;
    case 'printPreview' :
        if(isset($request2[5]) AND $request2[5] != ""){
           $_GET['hal']=$request2[5].'.php';
        }
        include_once(__DIR__ . '/views/printPreview.php');
    break;
    default:
        require __DIR__ . '/views/404.php';
    break;
}

?>