<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_kantintu_rptRekon extends server_report_basic
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
		$periode=$tmp[0];
		$nama_cab=$tmp[1];
		$sql="select a.kode_tenan, a.nilai, a.persentase, a.hasil_tenan, a.hasil_tel, a.nama			
				from ktu_rekon_d a
						$this->filter";
						
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("data rekon tenan",$this->lokasi,"");
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='80'  align='center' class='header_laporan'>Kode</td>
	  <td width='150'  align='center' class='header_laporan'>Nama Tenan</td>
	 <td width='150'  align='center' class='header_laporan'>Jumlah Nilai</td>
     <td width='100'  align='center' class='header_laporan'>Persentase</td>
     <td width='150'  align='center' class='header_laporan'>Hasil Tenan</td>
     <td width='150'  align='center' class='header_laporan'>Hasil Tel-U</td>
	  </tr>  ";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>$row->kode_tenan</td>
	 <td class='isi_laporan'>$row->nama</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai,0,',','.')."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->persentase,0,',','.')."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->hasil_tenan,0,',','.')."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->hasil_tel,0,',','.')."</td>
     </tr>";
			$i=$i+1;
		}
	
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
