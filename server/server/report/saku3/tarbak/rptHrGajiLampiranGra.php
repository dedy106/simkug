<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_tarbak_rptHrGajiLampiranGra extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select 1 ";
		
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
		$sql="select a.nik,a.nama,a.bank,a.no_rek,a.bank,a.cabang,a.nama_rek,
	   isnull(b.remu,0)+isnull(b.tsus,0)+isnull(b.lembur,0)+isnull(b.rapel,0) as pdpt,
	   isnull(b.ikop,0)+isnull(b.pkop,0)+isnull(b.pas,0) as pot
from hr_karyawan a
inner join (select a.nik,a.kode_lokasi,
				sum(case when a.kode_param='GAPOK' then a.nilai else 0 end) as gpok,
				sum(case when a.kode_param='KONJ' then a.nilai else 0 end) as konj,
				sum(case when a.kode_param='TJAB' then a.nilai else 0 end) as tjab,
				sum(case when a.kode_param='TSUS' then a.nilai else 0 end) as tsus,
				sum(case when a.kode_param='LEMBUR' then a.nilai else 0 end) as lembur,
				sum(case when a.kode_param='IKOP' then a.nilai else 0 end) as ikop,
				sum(case when a.kode_param='PKOP' then a.nilai else 0 end) as pkop,
				sum(case when a.kode_param='PAS' then a.nilai else 0 end) as pas,
				sum(case when a.kode_param='REMU' then a.nilai else 0 end) as remu,
				sum(case when a.kode_param='RPL' then a.nilai else 0 end) as rapel
			from hr_gaji_d a
			where a.kode_lokasi='$kode_lokasi' and a.periode='$periode'
			group by a.nik,a.kode_lokasi
			)b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi
where a.kode_lokasi='$kode_lokasi'
order by a.kode_unit,a.nama
";
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("lampiran gaji",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table  border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td align='center'><table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>NO</td>
	 <td width='250'  align='center' class='header_laporan'>NAMA</td>
	 <td width='100'  align='center' class='header_laporan'>BANK</td>
	 <td width='100'  align='center' class='header_laporan'>NO REKENING</td>
	 <td width='90'  align='center' class='header_laporan'>NILAI TRANSFER</td>
    
	</tr>  ";
		$pdpt=0; $pot=0; 
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$pdpt+=$row->pdpt;
			$pot+=$row->pot;
			echo "<tr >
			 <td class='isi_laporan' align='center'>$i</td>
			 <td class='isi_laporan'>$row->nama_rek</td>
			  <td class='isi_laporan'>$row->bank $row->cabang</td>
			 <td class='isi_laporan' align='right'>$row->no_rek</td>
			<td class='isi_laporan' align='right'>".number_format($row->pdpt-$row->pot,0,',','.')."</td>
	
     </tr>";
			$i=$i+1;
		}
		echo "<tr><td align='right' class='header_laporan' colspan='4'>Total</td>
	<td class='isi_laporan' align='right'>".number_format($pdpt-$pot,0,',','.')."</td></tr>";
		echo "</table> </td></tr>
  
</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
