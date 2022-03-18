<?php
$request = $_SERVER['REQUEST_URI'];
//echo $request;
$request2 = explode('/',$request);


switch ($request2[4]) {
    case '' :
        require __DIR__ . '/views/index.php';
        break;
    case 'about' :
        require __DIR__ . '/views/about.php';
        break;
	case 'login' :
        require __DIR__ . '/views/login.php';
        break;
	case 'main' :
        require __DIR__ . '/views/main.php';
        break;
	case 'page' :
        require __DIR__ . '/views/page.php';
        break;
	
    default:
        require __DIR__ . '/views/404.php';
        break;
}

?>