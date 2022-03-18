<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_klinik_rptStok extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$sql="select 1 ";
		error_log($sql);
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
		$tmp="";
		if ($jenis=="Tidak")
		{
			$tmp=" and a.stok<>0 ";
		}
		$sql= "exec sp_kli_stok '$periode','$kode_lokasi','$nik_user'";
	
		$rs = $dbLib->execute($sql);
		$sql="select a.kode_obat,b.nama,a.kode_pp,c.nama as nama_pp,a.stok,a.kode_lokasi,b.kode_klp,a.kode_pp ,a.no_batch,date_format(a.tgl_ed,'%d/%m/%Y') as tgl_ed
from kli_stok a
inner join kli_obat b on a.kode_obat=b.kode_obat and a.kode_lokasi=b.kode_lokasi
inner join kli_pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
where nik_user='$nik_user' $this->filter $tmp
order by a.kode_obat ";
		
		$rs = $dbLib->execute($sql);
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("stok obat",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' >
  <tr bgcolor='#CCCCCC'>
    <td width='30' align='center' class='header_laporan'>No</td>
    <td width='80' align='center' class='header_laporan'>Kode Obat</td>
    <td width='300' align='center' class='header_laporan'>Nama Obat</td>
	<td width='60' align='center' class='header_laporan'>Batch</td>
	<td width='60' align='center' class='header_laporan'>Exp Date</td>
	 <td width='80' align='center' class='header_laporan'>Kelompok</td>
	 <td width='50' align='center' class='header_laporan'>Gudang</td>
    <td width='50' align='center' class='header_laporan'>Stok</td>
   </tr>";
		$stok=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$stok+=$row->stok;
			echo "<tr>
   <td class='isi_laporan' align='center'>$i</td>
   <td class='isi_laporan'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTiket('$row->kode_obat','$row->kode_lokasi');\">$row->kode_obat</a>";
			echo "</td>
			<td class='isi_laporan'>$row->nama</td>
			<td class='isi_laporan'>$row->no_batch</td>
	<td class='isi_laporan'>$row->tgl_ed</td>
			<td class='isi_laporan'>$row->kode_klp</td>
			<td class='isi_laporan'>$row->kode_pp</td>
			<td class='isi_laporan' align='right'>".number_format($row->stok,0,',','.')."</td>
    </tr>";	 
			$i=$i+1;
		}
		echo "<tr>
			<td class='header_laporan' align='center' colspan='7'>Total</td>
  			<td class='header_laporan' align='right'>".number_format($stok,0,',','.')."</td>
    </tr>";	 
		echo "</div>";
		return "";
	}
	
}
?>
  
