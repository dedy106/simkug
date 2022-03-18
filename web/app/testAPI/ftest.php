<?php 
$valid=FALSE;
$user = 'admin';
$password = 'password';
$valid=FALSE;
if ( !isset($_SERVER['PHP_AUTH_USER']) )
{
    header('WWW-Authenticate: Basic realm="Login"');
    header('HTTP/1.0 401 Unauthorized');
    echo("Please enter a valid username and password");
    exit();        
}
else if ( ($_SERVER['PHP_AUTH_USER'] == $user) && ($_SERVER['PHP_AUTH_PW'] == $password) )
{
    $valid=TRUE;
}
else
{
    echo("Please enter a valid username and password");
    exit();
}
if($valid):
    echo"tampilkan form buat login ke sistem";
}

        