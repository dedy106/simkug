<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_ypt_logistik_rptRekapRealAggDet extends server_report_basic
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
        $periode=$tmp[1];

		$sql2="
		select a.no_spk,a.keterangan,a.nilai
		from log_spk_m a 
		inner join log_pesan_m b on a.no_pesan=b.no_pesan and a.kode_lokasi=b.kode_lokasi
		$this->filter
      	";
		// echo $sql2;
        
        $root_app="http://".$_SERVER['SERVER_NAME']."/web/server/pbh/";
		
		$AddOnLib=new server_util_AddOnLib();	
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$i=1;
		// if ($jenis=="Excell")
		// {
		// 	header("Pragma: public");
		// 	header("Expires: 0");
		// 	header("Cache-Control: must-revalidate, post-check=0, pre-check=0"); 
		// 	header("Content-Type: application/force-download");
		// 	header("Content-Type: application/octet-stream");
		// 	header("Content-Type: application/download");;
		// 	header("Content-Disposition: attachment;filename=$nama_file"); 
		// 	header("Content-Transfer-Encoding: binary ");
		// 	$rs = $dbLib->execute($sql2);
		// }
		// else
		// {
			$rs = $dbLib->execute($sql2);
		// }
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("Detail PO/SPK",$this->lokasi,"TAHUN ".$periode);
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='520'>
        <tr bgcolor='#CCCCCC'>
            <td width='30' align='center' class='header_laporan'>No</td>
            <td width='100' align='center' class='header_laporan'>No SPK</td>
            <td width='300' align='center' class='header_laporan'>Keterangan</td>
            <td width='90' align='center' class='header_laporan'>Nilai</td>
        </tr> ";
		$nilai=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai+=$row->nilai;
		echo "<tr >
            <td class='isi_laporan' align='center'>$i</td>
            <td class='isi_laporan'>$row->no_spk</td>
            <td class='isi_laporan'>$row->keterangan</td>
            <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
	   </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='header_laporan' align='center' colspan='3'>Total</td>
	  <td class='header_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
    </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
		
	}
}
?>
