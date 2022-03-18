<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_apotek_rptStok extends server_report_basic
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
		$kode_lokasi=$tmp[1];
		$nik_user=$tmp[2];
		$jenis=$tmp[3];
		$nama_file="rptStok.xls";
		$sql="exec sp_apo_stok_periode '$periode','$kode_lokasi','$nik_user'";
		$rs = $dbLib->execute($sql);
		$sql="exec sp_apo_tmp_periode '$periode','$kode_lokasi','$nik_user'";
		$rs = $dbLib->execute($sql);
		$sql="select a.kode_brg,c.nama,a.stok,b.h_avg from apo_brg_stok a
inner join apo_brg_tmp b on a.kode_brg=b.kode_brg  and a.nik_user=b.nik_user and a.kode_lokasi=b.kode_lokasi
inner join apo_brg_m c on a.kode_brg=c.kode_brg and a.kode_lokasi=c.kode_lokasi
where a.nik_user='$nik_user' and a.kode_lokasi='$kode_lokasi'and  a.kode_gudang='01' order by a.kode_brg";
		
		$rs = $dbLib->execute($sql);	
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;

		if ($jenis=="Excell")
{
	header("Pragma: public");
	header("Expires: 0");
	header("Cache-Control: must-revalidate, post-check=0, pre-check=0"); 
	header("Content-Type: application/force-download");
	header("Content-Type: application/octet-stream");
	header("Content-Type: application/download");;
	header("Content-Disposition: attachment;filename=$nama_file"); 
	header("Content-Transfer-Encoding: binary ");
}
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("stok barang",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='80'  align='center' class='header_laporan'>Kode Barang</td>
	  <td width='250'  align='center' class='header_laporan'>Nama Barang</td>
	 <td width='60'  align='center' class='header_laporan'>Stok</td>
     <td width='90'  align='center' class='header_laporan'>Harga Average</td>
	  </tr>  ";
		$h_avg=0;$stok=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$h_avg=$h_avg+$row->h_avg;
			$stok=$stok+$row->stok;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>$row->kode_brg</td>
	 <td class='isi_laporan'>$row->nama</td>
	 <td class='isi_laporan' align='right'>".number_format($row->stok,2,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->h_avg,0,",",".")."</td>
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='isi_laporan' align='center' colspan='3'>Total</td>
	  <td class='isi_laporan' align='right'>".number_format($stok,2,",",".")."</td>
     <td class='isi_laporan' align='right'>&nbsp;</td>
   
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
