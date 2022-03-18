<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
function fnSpasi($level)
{
	$tmp="";
	for ($i=1; $i<=$level; $i++)
	{
		$tmp=$tmp."&nbsp;&nbsp;&nbsp;&nbsp;";
	}
	return $tmp;
}
class server_report_saku3_dash_rptDashRtRwNews extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$sql = "select 1 ";
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);		
		}
		//error_log($this->rows."/".$count."/".$totPage);
		return $totPage;
	}
	function getHtml()
	{
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
        $periode=$tmp[1];
        $kode_pp=$tmp[2];
        $nik=$tmp[3];
		$no_konten=$tmp[4];
		$jenis=$tmp[5];
		$blok=$tmp[6];

		$resource = $_GET["resource"];
        $fullId = $_GET["fullId"];

        $path = $_SERVER["SCRIPT_NAME"];				
        $path2 = substr($path,0,strpos($path,"server/serverApp.php"));		
		$path = $path2 . "image/keubg.png";
		
		switch($jenis){
			case "news" :

			$sql="select no_konten,judul,keterangan,file_dok,convert(varchar,tanggal,105) as tanggal from rt_konten where kode_lokasi='$kode_lokasi' and flag_aktif='1' and no_konten='$no_konten' ";
			// $back="server_report_saku3_dash_rptDashSis";


			break;
			case "bp" :
			$sql="select no_bukti as konten,jenis as judul,keterangan,file_gambar as file_dok,convert(varchar,tanggal,105) as tanggal from rt_buku_p where kode_lokasi='$kode_lokasi' and no_bukti='$no_konten' ";

			break;
        }
        

        $rs = $dbLib->execute($sql);  
        $row = $rs->FetchNextObject($toupper=false);

        $judul = $row->judul;
        $keterangan =$row->keterangan;
        $file_dok= $path2. "server/media/".$row->file_dok;
        $tanggal=$row->tanggal;
        
		echo "<div class='panel'>
				<div class='panel-body'>
					<div class='panel-heading'>";
				switch($jenis){
				case "news" :
					echo
						"<a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashRtRw','','$kode_lokasi/$periode/$kode_pp/$nik/$blok');\"> Back <i class='fa fa-arrow-circle-left'></i></a>";
				break;
				case "bp" :
					echo
					"<a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashRtRwDet','','$kode_lokasi/$periode/all/bp/$kode_pp/$nik/$blok');\"> Back <i class='fa fa-arrow-circle-left'></i></a>";
				break;
				}
						

            echo "</div>";
            echo"<h3>$judul</h3>";
            echo"<h4>$tanggal</h4>";
            echo"<img src='$file_dok' width='250px'></img>";
            echo"<p>".urldecode($keterangan)."</p>";
            echo"   
                </div>
            </div>";
    
        echo "<script type='text/javascript'>
            
              </script>";

        
		return "";
	}
	
}
?>
