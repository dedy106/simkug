<?php
	try{
		global $dirSeparator;
		global $serverDir;
		if (!defined('NEW_LINE'))
		   define("NEW_LINE", "<br>\r\n");
		
		define("WIN", "win");
		define("LINUX", "linux");
		if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN')
		{
			$platform = WIN;
			$dirSeparator = "\\";
			$separator = ";";
		}
		else
		{
			$platform = LINUX;
			$dirSeparator = "/";
			$separator = ":";
		}
		error_reporting (E_ALL & ~E_NOTICE );
		
		$serverDir = __FILE__;
		
		global $rootDir;

		$pos = strrpos($serverDir, $dirSeparator);
		$serverDir = substr($serverDir, 0, $pos);
		$pos = strrpos($serverDir, $dirSeparator);
		$rootDir = substr($serverDir, 0, $pos);
		$pos = strrpos($rootDir, $dirSeparator);
		$path = $rootDir;
		$rootDir = substr($rootDir,$pos);
		
		include_once("library.php");
		uses("server_DBConnection_dbLib");
		$done = false;	
		$dbLib = new server_DBConnection_dbLib("mssql");	
		$list = array("message" => array());
		//----------- List
		$result = array("message" => "", "rows" => 0, "kode" => "" );			
			$rs = $dbLib->execute("select no_konten,judul from sai_konten where kode_klp='BRT' ");					
			$tmp=array();
			$kode = array();
			if (!$rs->EOF)
			{	
				
				while ($row = $rs->FetchNextObject(false)){
					$tmp[]=$row->judul;
					$kode[] = $row->no_konten;
				}
			}		
			$result["message"] = $tmp;
			$result["kode"] = $kode;
			$list["message"]["list"] = $result;
		//------------- Dok
			$result = array("message" => "", "rows" => 0, "kode" => "" );			
			$rs = $dbLib->execute("select no_konten,judul from sai_konten where kode_klp='DOC' ");					
			$tmp=array();
			$kode = array();
			if (!$rs->EOF)
			{	
				
				while ($row = $rs->FetchNextObject(false)){
					$tmp[]=$row->judul;
					$kode[] = $row->no_konten;
				}
			}		
			$result["message"] = $tmp;
			$result["kode"] = $kode;
			$list["message"]["dok"] = $result;

		//------------- Msg
			$result = array("message" => "", "rows" => 0, "kode" => "" );			
			$rs = $dbLib->execute("select no_pesan,judul from sai_pesan_m where kepada='$userid' ");					
			$tmp=array();
			$kode = array();
			if (!$rs->EOF)
			{	
				while ($row = $rs->FetchNextObject(false)){
					$tmp[]=$row->judul;
					$kode[] = $row->no_pesan;
				}
			}
			else
			{
				$tmp[]="";
				$kode[] = "";
			}
			$result["message"] = $tmp;
			$result["kode"] = $kode;
			$list["message"]["msg"] = $result;
		//------- remainder
			$result = array("message" => "", "rows" => 0, "kode" => "" );			
			$rs = $dbLib->execute("select no_konten,judul from sai_konten where kode_klp='RMD' ");					
			$tmp=array();
			$kode = array();
			if (!$rs->EOF)
			{	
				
				while ($row = $rs->FetchNextObject(false)){
					$tmp[]=$row->judul;
					$kode[] = $row->no_konten;
				}
			}		
			$result["message"] = $tmp;
			$result["kode"] = $kode;
			$list["message"]["remainder"] = $result;
		//------------- ticket
			$result = array("message" => "", "rows" => 0, "kode" => "" );			
			$rs = $dbLib->execute("select no_tiket,judul from sai_tiket_m where nik_user='$userid'");					
			$tmp=array();
			$kode = array();
			if (!$rs->EOF)
			{	
				
				while ($row = $rs->FetchNextObject(false)){
					$tmp[]=$row->judul;
					$kode[] = $row->no_tiket;
				}
			}	
			else
			{
				$tmp[]="";
				$kode[] = "";
			}
			$result["message"] = $tmp;
			$result["kode"] = $kode;
			$list["message"]["ticket"] = $result;
		//------------- todo
			$result = array("message" => "", "rows" => 0, "kode" => "" );			
			$rs = $dbLib->execute("select no_konten,judul from sai_konten where kode_klp='TDL' ");					
			$tmp=array();
			$kode = array();
			if (!$rs->EOF)
			{	
				
				while ($row = $rs->FetchNextObject(false)){
					$tmp[]=$row->judul;
					$kode[] = $row->no_konten;
				}
			}		
			$result["message"] = $tmp;
			$result["kode"] = $kode;
			$list["message"]["todo"] = $result;
		//--------------- tools
			$result = array("message" => "", "rows" => 0, "kode" => "" );			
			$rs = $dbLib->execute("select no_konten,judul from sai_konten where kode_klp='TOL' ");					
			$tmp=array();
			$kode = array();
			if (!$rs->EOF)
			{	
				
				while ($row = $rs->FetchNextObject(false)){
					$tmp[]=$row->judul;
					$kode[] = $row->no_konten;
				}
			}		
			$result["message"] = $tmp;
			$result["kode"] = $kode;
			$list["message"]["tools"] = $result;

			
		//---- notifikasi
		$lokasi=$_GET["lokasi"];
		$periode=$_GET["periode"];
		$sql="exec sp_notifikasi '$lokasi','$periode'";
		$rs = $dbLib->execute($sql);
			$result = array("message" => "", "rows" => 0, "kode" => "" );		
			$sql="select kode_klp, nama from sai_klp where kode_lokasi='$lokasi'";
			$rs = $dbLib->execute($sql);
			$top=0;$content="";
			while ($row = $rs->FetchNextObject($toupper=false))
			{
				$sql="select kode_lokasi, modul, nama, jumlah,kode_form from sai_notifikasi where kode_lokasi='$lokasi' and kode_klp='$row->kode_klp'";
				$rs1 = $dbLib->execute($sql);
				
				$content .= "<div style='position:relative;height:auto;width:100%;'>
							<div onclick='this.nextSibling.style.display ==\"\" ? this.nextSibling.style.display=\"none\" : this.nextSibling.style.display=\"\"' style='cursor:pointer;position:relative;border-top:1px solid rgba(255,255,255,0.2);border-bottom:1px solid rgba(255,255,255,0.2);background:#3EBBFA;left:0;;width:100%;height:25px'><span style='position:absolute;left:20;top:5;font-size:12'>$row->nama</span></div><div style='position:relative;left:0;display:none;width:100%;height:100%;'>";
				while ($row1 = $rs1->FetchNextObject($toupper=false))
				{
					$jumlah=number_format($row1->jumlah,0,',','.');
					$content .= "<div onclick='system.getActiveApplication()._mainForm.runTCODE(\"$row1->kode_form\");' style='cursor:pointer;position:relative;left:0;width:100%;height:25px;border-bottom:1px solid rgba(255,255,255,0.2);'><span style='position:absolute;left:30;top:7'>$row1->nama</span> <div style='position:absolute;left:100%;top:0;width:20px;height:100%;'><span style='position:absolute;left:-70;top:7'>$jumlah</span><img src='icon/sai/link.png' style='position:absolute;left:-40px;top:3;width:20;height:20;'/></div></div>";
					
				}
				$content .= "</div></div>";
			}
			
			$result["message"] = $content;
			//$result["periode"] = $periode;
			//$result["lokasi"] = $lokasi;
			$list["message"]["notifikasi"] = $result;
			echo json_encode($list);
			sleep(10);
	}catch(Exception $e){
		error_log($e->GetMessage() );
		echo $e->GetMessage() . "...\n";
	}
?>
