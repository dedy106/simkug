<?php
$request = $_SERVER['REQUEST_URI'];
$request2 = explode('/',$request);

//echo $request."|".$request2[4]."|".$request2[5].'.php'."<br>";
//echo __DIR__ . '/fMainMobile.php';
switch ($request2[4]) {
    case '' :
        require __DIR__ . '/fLogin.php';
    break;
	case 'login' :
        require __DIR__ . '/fLogin.php';
    break;
    case 'mobile' :
        require __DIR__ . '/fLoginMobile.php';
    break;
    case 'main' :
        if(isset($request2[5]) AND $request2[5] != ""){
           $_GET['hal']=$request2[5].'.php';
        }
        include_once(__DIR__ . '/fMain.php');
    break;
    case 'mainmobile' :

        if(isset($request2[5]) AND $request2[5] != ""){
           $_GET['hal']=$request2[5].'.php';
        }
        include_once(__DIR__ . '/fMainMobile.php');
    break;
    case 'printPreview' :

        if(isset($request2[5]) AND $request2[5] != ""){
           $_GET['hal']=$request2[5].'.php';
        }
        include_once(__DIR__ . '/printPreview.php');
    break;
    default:
        require __DIR__ . '/404.php';
    break;
}

?>