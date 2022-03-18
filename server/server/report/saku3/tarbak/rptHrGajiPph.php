<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_tarbak_rptHrGajiPph extends server_report_basic
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
		$no_gaji=$tmp[2];
		
		$sql="select a.nik,a.nama,a.kode_lokasi,a.npwp,isnull(b.gp,0) as gp
from hr_karyawan a
inner join (select a.nik,a.kode_lokasi,
				   sum(case when a.kode_param='GP' then a.nilai else 0 end) as gp,
				   sum(case when a.kode_param='INS' then a.nilai else 0 end) as ins,
				   sum(case when a.kode_param='JAB' then a.nilai else 0 end) as jab,
				   sum(case when a.kode_param='MK' then a.nilai else 0 end) as mk,
				   sum(case when a.kode_param='PAB' then a.nilai else 0 end) as pab,
				   sum(case when a.kode_param='PSP' then a.nilai else 0 end) as psp,
				   sum(case when a.kode_param='ABS' then a.nilai else 0 end) as abs,
				   sum(case when a.kode_param='TRANS' then a.nilai else 0 end) as trans,
				   sum(case when a.kode_param='KON' then a.nilai else 0 end) as kon,
				   sum(case when a.kode_param='IJHT' then a.nilai else 0 end) as ijht,
				   sum(case when a.kode_param='PAJAK' then a.nilai else 0 end) as pajak,
				   sum(case when a.kode_param='BANK' then a.nilai else 0 end) as bank
			from hr_gaji_d a
			where a.no_gaji='$no_gaji' and a.kode_lokasi='$kode_lokasi' 
			group by a.nik,a.kode_lokasi
			)b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi
$this->filter
order by a.nama	";
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("perhitungan pajak",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table  border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td align='center'><table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='60'  align='center' class='header_laporan'>NIK</td>
	 <td width='200'  align='center' class='header_laporan'>Nama</td>
	 <td width='60'  align='center' class='header_laporan'>NPWP</td>
	 <td width='90'  align='center' class='header_laporan'>Gaji Pokok</td>
	 <td width='90'  align='center' class='header_laporan'>Tunjangan</td>
	 <td width='90'  align='center' class='header_laporan'>Lemb/Inv/Rem/Pemant/Ekskul</td>
	  <td width='90'  align='center' class='header_laporan'>Penerimaan Lain-Lain</td>
	 <td width='90'  align='center' class='header_laporan'>Pend. Bruto Sebulan</td>
     <td width='90'  align='center' class='header_laporan'>Pend. Bruto Setahun</td>
	 <td width='90'  align='center' class='header_laporan'>Biaya Jabatan</td>
	 <td width='90'  align='center' class='header_laporan'>PTKP</td>
	 <td width='90'  align='center' class='header_laporan'>PKP</td>
	 <td width='90'  align='center' class='header_laporan'>Pembulatan PKP</td>
	 <td width='90'  align='center' class='header_laporan'>PKP 15%</td>
	 <td width='90'  align='center' class='header_laporan'>PKP 5%</td>
	 <td width='90'  align='center' class='header_laporan'>PPh 21 Setahun</td>
	 <td width='90'  align='center' class='header_laporan'>PPh 21 Sebulan</td>
	</tr>  ";
		$nilai=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
      <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBukti('$row->nik','$row->kode_lokasi');\">$row->nik</a>";
		echo "</td>
	 <td class='isi_laporan'>$row->nama</td>
	 <td class='isi_laporan'>$row->npwp</td>
	<td class='isi_laporan' align='right'>".number_format($row->gp,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->total,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->b_jab,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->jam,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->ptkp,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->pkp,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->pph21,0,',','.')."</td>
     </tr>";
			$i=$i+1;
		}
		
		echo "</table> </td></tr>
  <tr>
    <td align='left' class='isi_laporan'>$footer</td>
  </tr>
</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
