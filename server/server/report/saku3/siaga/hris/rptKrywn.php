<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_siaga_hris_rptKrywn extends server_report_basic
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
		$nik_user=$tmp[0];
		$kode_lokasi=$tmp[1];
		
		$AddOnLib=new server_util_AddOnLib();
		$sql2="select a.kode_lokasi,a.kode_kolom,b.kode_tabel,b.nama
				from gr_kolom_tmp a
				inner join gr_kolom b on a.kode_kolom=b.kode_kolom and a.kode_lokasi=b.kode_lokasi
				where a.nik_user='$nik_user' and a.kode_lokasi='$kode_lokasi' ";
		echo $sql;
		$rs = $dbLib->execute($sql);
		$kolom="";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$kolom.=$row->kode_tabel." as ".$row->nama.",";
		}
		echo $kolom;
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("data Vendor",$this->lokasi,"");
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     
	  </tr>  ";
		$nilai=0;$nilai_ppn=0;$tagihan=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai=$nilai+$row->nilai;
			$nilai_ppn=$nilai_ppn+$row->nilai_ppn;
			$tagihan=$tagihan+$row->tagihan;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     
     </tr>";
			$i=$i+1;
		}
	
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
