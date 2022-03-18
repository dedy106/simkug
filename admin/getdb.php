<?php
	try{
		$url = $_REQUEST["url"];
		$cmd = $_REQUEST["cmd"];
		$data = $_REQUEST["sql"];	
		$param = http_build_query(
		    array(
			'cmd' => $cmd,
			'sql' => urlencode($data)
		    )
		);		
		$content = getURL($url, $param);
		//$content = file_get_contents($url. "?" . $param);	
		echo $content;
	}catch(Exception $e){
		echo "Error: " . $e->getMessage();
		error_log($e->getMessage());
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
}
?>