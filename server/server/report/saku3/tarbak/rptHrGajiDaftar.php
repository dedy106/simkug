<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_tarbak_rptHrGajiDaftar extends server_report_basic
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
		$sql="select a.nik,a.nama,a.kode_lokasi,a.npwp,a.kode_jab,a.kode_gol,a.kode_pajak,
					isnull(b.gp,0) as gp,isnull(b.ins,0) as ins,isnull(b.jab,0) as jab,isnull(b.mk,0) as mk,isnull(b.pab,0) as pab,
					isnull(b.psp,0) as psp,isnull(b.abs,0) as abs,isnull(b.trans,0) as trans,isnull(b.kon,0) as kon,isnull(b.ijht,0) as ijht,
					isnull(b.pajak,0) as pajak,isnull(b.bank,0) as bank
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
		echo $AddOnLib->judul_laporan("Daftar Gaji Karyawan",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table width='2000' border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr bgcolor='#CCCCCC'>
    <td rowspan='2' align='center' class='judul_laporan'>No</td>
	<td rowspan='2' align='center' class='judul_laporan'>NIK</td>
    <td rowspan='2' align='center' class='judul_laporan'>Nama</td>
    <td rowspan='2' align='center' class='judul_laporan'>Kd</td>
    <td rowspan='2' align='center' class='judul_laporan'>Prest</td>
    <td rowspan='2' align='center' class='judul_laporan'>Gol</td>
    <td colspan='2' align='center' class='judul_laporan'>MK</td>
    <td rowspan='2' align='center' class='judul_laporan'>K/TK</td>
    <td align='center' class='judul_laporan'>GP</td>
    <td rowspan='2' align='center' class='judul_laporan'>Insentif</td>
    <td align='center' class='judul_laporan'>Tunj. Jab/</td>
    <td align='center' class='judul_laporan'>Tunj.</td>
    <td align='center' class='judul_laporan'>Tunj.</td>
    <td align='center' class='judul_laporan'>Py. UMR/ 10%</td>
    <td align='center' class='judul_laporan'>Pendapatan</td>
    <td align='center' class='judul_laporan'>Pot Tdk Hadir</td>
    <td rowspan='2' align='center' class='judul_laporan'>Pot</td>
    <td align='center' class='judul_laporan'>Transport</td>
    <td align='center' class='judul_laporan'>Konsumsi</td>
    <td align='center' class='judul_laporan'>IJHT</td>
    <td align='center' class='judul_laporan'>Pendapatan</td>
    <td rowspan='2' align='center' class='judul_laporan'>Pajak</td>
    <td rowspan='2' align='center' class='judul_laporan'>Potongan</td>
    <td align='center' class='judul_laporan'>Biaya</td>
    <td align='center' class='judul_laporan'>Total</td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td align='center' class='judul_laporan'>Gol</td>
    <td align='center' class='judul_laporan'>YTB</td>
    <td align='center' class='judul_laporan'>PNS 2013</td>
    <td align='center' class='judul_laporan'>Wali Kelas</td>
    <td align='center' class='judul_laporan'>MK YTB</td>
    <td align='center' class='judul_laporan'>Pengabdian</td>
    <td align='center' class='judul_laporan'>PSP/ Py. Gol</td>
    <td align='center' class='judul_laporan'>Bruto</td>
    <td align='center' class='judul_laporan'>Hari</td>
    <td align='center' class='judul_laporan'>RP. 20.000,-</td>
    <td align='center' class='judul_laporan'>Rp. 15.000,-</td>
    <td align='center' class='judul_laporan'>2%</td>
    <td align='center' class='judul_laporan'>Netto</td>
    <td align='center' class='judul_laporan'>Bank</td>
    <td align='center' class='judul_laporan'>Penerimaan</td>
  </tr>
";
		$nilai=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<tr>
     <td class='isi_laporan' align='center'>$i</td>
      <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBukti('$row->nik','$row->kode_lokasi');\">$row->nik</a>";
		echo "</td>
	<td class='isi_laporan'>$row->nama</td>
	<td class='isi_laporan'>$row->kode_jab</td>
	<td class='isi_laporan' align='center'></td>
	 <td class='isi_laporan' align='center'>$row->kode_gol</td>
	 <td class='isi_laporan' align='center'></td>
	 <td class='isi_laporan' align='center'></td>
	 <td class='isi_laporan' align='center'>$row->kode_pajak</td>
	<td class='isi_laporan' align='right'>".number_format($row->gp,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->ins,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->jab,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->mk,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->pab,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->gp,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->gp,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->gp,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->gp,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->gp,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->gp,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->gp,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->gp,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->gp,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->gp,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->gp,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->gp,0,',','.')."</td>
     </tr>";
			$i=$i+1;
		}
		
		echo "</table> </td></tr>
 
</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
