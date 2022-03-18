<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_ypt_ginas_rptPayMan extends server_report_basic
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
		$sql="select d.nama as lok,b.kode_lokasi,b.nik,b.nama as kryn,b.bank,b.no_rek,b.nama_rek,sum(gadas+tunjab+lembur+tukom+rapel) as pdpt, 
		sum(kosumba+hadir+kocitel+kkpt+giat+bpjs) as pot
		from hr_karyawan b
 inner join hr_gaji_loadtelu c on b.nik=c.nik and b.kode_lokasi=c.kode_lokasi
 inner join lokasi d on b.kode_lokasi=d.kode_lokasi
$this->filter and b.bank='MANDIRI' 
GROUP BY b.kode_lokasi,b.nik,b.nama,b.bank,b.no_rek,b.nama_rek,d.nama
order by b.nik";

		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("DAFTAR PAYROLL BANK MANDIRI",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' >
  <tr bgcolor='#CCCCCC'>
    <td width='30' align='center' class='header_laporan'>No</td>
    <td width='80' align='center' class='header_laporan'>NO REKENING</td>
    <td width='150' align='center' class='header_laporan'>NOMINAL</td>
	<td width='80' align='center' class='header_laporan'>LEMBAGA</td>
	<td width='60' align='center' class='header_laporan'>CD</td>
	<td width='60' align='center' class='header_laporan'>NAMA</td>
	<td width='60' align='center' class='header_laporan'>KETERANGAN</td>
  </tr> 
    ";
		$nilai=0;  $nilai1=0; 
		
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai=$row->pdpt-$row->pot;
			$nilai1+=$nilai;
			
			echo "</td>
	 <td class='isi_laporan' align='center'>$i</td>
	 <td class='isi_laporan'>$row->no_rek</td>
    <td class='isi_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
	 <td class='isi_laporan'>$row->lok</td>
	  <td class='isi_laporan'>C</td>
	 <td class='isi_laporan'>$row->nama_rek</td>
	 <td class='isi_laporan'>$row->bank</td>
     </tr>";
			$i=$i+1;
		}
		echo "<tr>
    <td class='header_laporan'  colspan='2' align='right'>Jumlah</td>
    <td class='header_laporan' align='right'>".number_format($nilai1,0,",",".")."</td>
    <td class='header_laporan'  colspan='4' align='right'></td>
  </tr>
";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
