<?php
	ob_start();
	$cmd = $_REQUEST["cmd"];
	$key = $_REQUEST["key"];
	if ($key != "nankninknonk") echo "";
	$file = $_REQUEST["file"];
	$filename = str_replace("_", "/", $file) ;
	$url = $_REQUEST["url"];
	if ($cmd == "update"){
		if (!is_dir($file)){
			$param = http_build_query(
			    array(
				'cmd' => 'checkout',			
				'file'  => $file,
				'key' => $key
			    )
			);
			$content = getURL("http://$url/project.php",$param);
			$ok = file_put_contents($file,$content);
		}else $ok = "true";		
		echo $ok;
	}else if ($cmd == "finfo"){		
		$param = http_build_query(
		    array(
			'cmd' => 'minfo',			
			'file'  => $file,
			'key' => $key
		    )
		);
		$content = getURL("http://$url/project.php",$param);				
		echo $content;
	}else if ($cmd == "flist"){		
		$param = http_build_query(
		    array(
			'cmd' => 'list',			
			'file'  => $file,
			'key' => $key
		    )
		);
		$content = getURL("http://$url/project.php",$param);				
		echo $content;
	}else if ($cmd == "checkout"){
		if (file_exists($filename)){
			$content = file_get_contents($filename);
		}else $content = "";		
		echo $content;
	}else if ($cmd == "minfo"){
		if (file_exists($filename)){
			$content = filemtime($filename);
		}else $content = "";		
		echo $content;
	}else if ($cmd == "list"){
		if (is_dir($filename)){
			listDir($filename);
		}
	}else if ($cmd == "save"){
		file_put_contents("classes/app/projectSynch/".$file, $_REQUEST["content"]);
	}
	function listDir($dir){
		$files = scandir($dir);
		foreach($files as $key =>$value){
			if ($value != ".svn" && $value != "." && $value != ".."){		
				$filename = $dir ."/". $value;
				if (file_exists($filename)) {
					echo $filename ."=". filemtime($filename) ."<br>";
					if (is_dir($filename))
						listDir($filename);
				}else {
					echo $value ."=folder";									
				}
			}
		}
	}
	function getURL($url, $param){
		$opts = array('http' =>
		    array(
			'method'  => 'POST',
			'header'  => 'Content-type: application/x-www-form-urlencoded',
			'content' => $param,
			'timeout'       => 120
		    )
		);
		$context  = stream_context_create($opts);
		$result = file_get_contents($url, false, $context);
	return $result; 
	ob_end_flush();
}
?>