<?php

uses("server_BasicObject");
uses("server_util_Map");
uses("server_util_File");
uses("server_DBConnection_dbLib");
class server_ide_editor extends server_BasicObject
{
	protected $reportName;
	protected $filter;
	function __construct()
	{
		parent::__construct();
		
	}
	protected function doSerialize()
	{
		parent::doSerialize();
	}
	function init()
	{
		parent::init();
	}
	function deinit()
	{
		parent::deinit();
	}
	
	function getControls()
	{
	   $f = new server_util_File(".../classes/ide/component/");
	   //error_log("Path " . $f->realPath());
	   return $f->listFile();
  }
  function saveForm($folder,$filename, $data)
  {    
    try
    {  
        //$f=fopen(".../classes/".$folder . $filename.'js','w');
  		//fwrite($f,$data,strlen($data));
  		//fclose($f);
		global $dbLib;		
		$classname = $filename;//substr($filename,0,str_pos(".",$classname));
		$ret = $dbLib->execQuery("insert into pengkodean (classname, source, datemodified, usermodified, datecreated, usercreated, buffering, degree) VALUES ". 
			"('".$classname."',null,getdate(),'-',getdate(),'-','1',1)");	
		if (!strpos("Error::",$ret)){
			$ret = $dbLib->updateBlob('pengkodean','source',$data,"classname='".$classname."'");			
		}
  		return $ret;  
  	}catch(Exception $e)
  	{
  	   return $e->getMessage();
    }
  }
  function loadClass($classname)
  {
		global $dbLib;
		$ret = $dbLib->execute("select source from pengkodean where classname ='".$classname ."'");
		return $dbLib->BlobDecode( reset($ret->fields) );
  }
  function getContents($filename)
  {
    $f = new server_util_File(".../classes/".$filename);
	   //error_log("Path " . $f->realPath());
	   return $f->getContents(false);
  }
  function listDir($dir)
  {
    $f = new server_util_File(".../classes/" . $dir ."/");
	  //error_log("Path " . $f->realPath());
	  return $f->listFolder();
  }
}
?>
