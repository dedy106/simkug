<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_amu_rptQrCode extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select 1";
		
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);		
		}		
		return $totPage;
	}
	function getHtml()
	{
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
        $kode_lokasi=$tmp[0];
        
        $sql="select a.no_bukti, a.nama_inv,a.barcode
        from amu_asset_bergerak a
        $this->filter
        order by a.no_bukti";
        
        
        
        $rs = $dbLib->execute($sql);	
		$i = 1;
        $resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
        $AddOnLib=new server_util_AddOnLib();	
        
        $root_ser="http://".$_SERVER['SERVER_NAME']."/web/server/amu";
        $root=$_SERVER["DOCUMENT_ROOT"];
        include $root."web/lib/phpqrcode/qrlib.php"; //<-- LOKASI FILE UTAMA PLUGINNYA

        $tempdir = $root."web/server/amu/temp/"; 

		echo "<div align='center'>"; 
		//echo "$sql";
		echo $AddOnLib->judul_laporan("data inventaris",$this->lokasi,"");
        echo "<table border='0' cellspacing='0' cellpadding='0' class='kotak' width='800'>
        <style>
            td{
                padding:15px !important;
            }
        </style>
         ";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
            $barcode= $row->barcode;
            $isi_teks = $row->barcode;
            $namafile = $row->barcode.".png";
            $quality = 'H'; //ada 4 pilihan, L (Low), M(Medium), Q(Good), H(High)
            $ukuran = 5; //batasan 1 paling kecil, 10 paling besar
            $padding = 0;
    
            QRCode::png($isi_teks,$tempdir.$namafile,$quality,$ukuran,$padding);
    
		echo "<tr>
        <td width='200'  align='center' class='header_laporan'><h6>$row->barcode</h6><img alt='$row->no_no_bukti' src='$root_ser/temp/$row->barcode.png'></td>
        <td width='200'  align='center' class='header_laporan'><h6>$row->barcode</h6><img alt='$row->no_no_bukti' src='$root_ser/temp/$row->barcode.png'></td>
        <td width='200'  align='center' class='header_laporan'><h6>$row->barcode</h6><img alt='$row->no_no_bukti' src='$root_ser/temp/$row->barcode.png'></td>
        <td width='200'  align='center' class='header_laporan'><h6>$row->barcode</h6><img alt='$row->no_no_bukti' src='$root_ser/temp/$row->barcode.png'></td>
        </tr>";
			$i=$i+1;
		}
		echo "</table><br>";        
		echo "</div>";
		return "";
		
	}
	
}
?>
