<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_siswa_rptBayarDaftar extends server_report_basic
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
		$kode_lokasi=$tmp[0];
		$kode_pp=$tmp[1];
		$periode=$tmp[2];
		
		$sql="select nama from pp where kode_lokasi='$kode_lokasi' and kode_pp='$kode_pp' ";
		$rs = $dbLib->execute($sql);
		$row = $rs->FetchNextObject($toupper=false);
		$nama_pp=$row->nama;
		
		
	$sql="select a.no_reg,b.no_kas,b.ref1,a.nama,b.nilai,convert(varchar(20),a.tanggal,103) as tgl
		from sis_siswareg a
		inner join kas_m b on a.no_reg=b.ref1 and a.kode_lokasi=b.kode_lokasi
		$this->filter
 		order by a.no_reg ";
		
		$rs = $dbLib->execute($sql);
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("daftar pembayaran pendaftaran",$this->lokasi."<br>".$nama_pp,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' >
  <tr bgcolor='#CCCCCC'>
    <td width='30' align='center' class='header_laporan'>No</td>
    <td width='100' align='center' class='header_laporan'>No. Bukti</td>
    <td width='60' align='center' class='header_laporan'>Tanggal</td>	
    <td width='100' align='center' class='header_laporan'>ID Registrasi</td>
    <td width='250' align='center' class='header_laporan'>Nama</td>
    <td width='100' align='center' class='header_laporan'>Tarif</td>
   </tr>";
		$total=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$total+=$row->nilai;
			echo "<tr>
   <td class='isi_laporan' align='center'>$i</td>
    <td class='isi_laporan'>$row->no_kas</td>
    <td class='isi_laporan'>$row->tgl</td>	
	<td class='isi_laporan'>$row->no_reg</td>
    <td class='isi_laporan'>$row->nama</td>
	<td class='isi_laporan' align='right'>".number_format($row->nilai,0,',','.')."</td>
			
    </tr>";	 
			$i=$i+1;
		}
		echo "<tr>
			<td class='header_laporan' align='center' colspan='5'>Total</td>
			<td class='isi_laporan' align='right'>".number_format($total,0,',','.')."</td>
    </tr>";	 
		echo "</div>";
		return "";
	}
	
}
?>
  
 
