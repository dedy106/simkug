<?php
function runCommand($cmd, $path = null) {
  $output = "";
  $err = false;  
  $descriptorspec = array(0 => array('pipe', 'r'), 1 => array('pipe', 'w'), 2 => array('pipe', 'w'));  
  $resource = proc_open($cmd, $descriptorspec, $pipes);
  $error = "";
  if (!is_resource($resource)) {
    echo ("<p>BADCMD: <code>".$cmd."</code></p>");
    exit;
  }

  $handle = $pipes[1];
  $firstline = true;
  while (!feof($handle)) {
    $line = fgets($handle);
    if ($firstline && empty($line))  {
      $err = true;
    }

    $firstline = false;    
    $line = str_replace(" ","&nbsp;",$line);
    echo  ($line ."<br>");	
  }

  while (!feof($pipes[2])) {
    $error .= fgets($pipes[2]);
  }

  $error = trim($error);	
  fclose($pipes[0]);
  fclose($pipes[1]);
  fclose($pipes[2]);

  proc_close($resource);

  if (!$err) {
    echo "";
  } else {
    echo ("<p>BADCMD: <code>".$cmd."</code></p><p>$error</p>");
  }
}
$cmd = $_REQUEST['command'];	
echo $cmd;
if ($cmd == "update")
	runCommand("svn " . $cmd ." /var/jamboo/source/");//is_resource
else if ($cmd == "commit")
	runCommand("svn " . $cmd . " /var/www/portal.roojax.com/publich_html/");
?>
