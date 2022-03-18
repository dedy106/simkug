<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_ypt_ginas_rptGajiBank extends server_report_basic
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
		$sql="select a.kode_lokasi,a.nik,a.nama as kryn,a.bank,a.no_rek,
		sum(case when b.kode_param in ('TGDAS','TTJAB','TLBR','TTKOM','TRPL','NGPOK','NTMK','NTJAB','NLBR') then b.nilai else 0 end) as pdpt,
		sum(case when b.kode_param in ('TKSUM','THDR','TKOCI','TBPJS','TKKPT','TGIAT','NLAIN','NGINS','NPYROL','NBPJS') then b.nilai else 0 end) as pot
			  from hr_karyawan a
		inner join hr_gaji_d b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi
		$this->filter 
		GROUP BY a.kode_lokasi,a.nik,a.nama,a.bank,a.no_rek
		ORDER BY a.nik";

		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("DAFTAR GAJI BANK",$this->lokasi," ");
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' >
  <tr bgcolor='#CCCCCC'>
	<td width='30' align='center' class='header_laporan'>No</td>
	<td width='60' align='center' class='header_laporan'>NAMA</td>
	<td width='80' align='center' class='header_laporan'>REKENING</td>
	<td width='60' align='center' class='header_laporan'>KETERANGAN</td>
    <td width='150' align='center' class='header_laporan'>NOMINAL</td>
  </tr> 
    ";
		$nilai=0;  $nilai1=0; 
		
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai=$row->pdpt-$row->pot;
			$nilai1+=$nilai;
			
			echo "</td>
	 <td class='isi_laporan' align='center'>$i</td>
	 <td class='isi_laporan'>$row->kryn</td>
	 <td class='isi_laporan'>$row->no_rek</td>
	 <td class='isi_laporan'>$row->bank</td>
		<td class='isi_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
     </tr>";
			$i=$i+1;
		}
		echo "<tr>
    <td class='header_laporan'  colspan='4' align='right'>Jumlah</td>
    <td class='header_laporan' align='right'>".number_format($nilai1,0,",",".")."</td>
  </tr>
";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
