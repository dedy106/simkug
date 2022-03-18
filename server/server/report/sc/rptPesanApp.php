<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_sc_rptPesanApp extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$sql="select count(a.no_ver)
from sc_ver_m a
inner join sc_karyawan b on a.nik_app=b.nik   ";
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
		$nama_ver=$tmp[0];
		$ver=$tmp[1];
		$tahun=$tmp[2];
		$bidang=$tmp[3];
		
		$sql="select  a.no_ver, date_format(a.tanggal,'%d/%m/%Y') as tanggal, a.keterangan, a.modul, a.nik_app,b.nama as nama_app
from sc_ver_m a
inner join sc_karyawan b on a.nik_app=b.nik
order by a.no_ver ";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		$i = 1;
		
		$AddOnLib=new server_util_AddOnLib();
		echo $AddOnLib->judul_laporan("approval pesanan",$this->lokasi,$AddOnLib->ubah_periode($periode));
		
		echo "<div align='center'>"; 
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table   border='1' cellpadding='0' cellspacing='0' class='kotak'>
  <tr>
    <td colspan='20' style='padding:5px'><table width='100%' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td class='header_laporan' width='114'>No Bukti </td>
        <td class='header_laporan'>:&nbsp;$row->no_ver</td>
        </tr>
		<tr>
        <td class='header_laporan' width='114'>Tanggal </td>
        <td class='header_laporan'>:&nbsp;$row->tanggal</td>
        </tr>
	   
      <tr>
        <td class='header_laporan'>Keterangan  </td>
        <td class='header_laporan'>:&nbsp;$row->keterangan</td>
      </tr>
	 
	  <tr>
        <td class='header_laporan'>NIK Approve  </td>
        <td class='header_laporan'>:&nbsp;$row->nik_app -&nbsp; $row->nama_app</td>
      </tr>
    </table></td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='15' align='center' class='header_laporan'>No</td>
	<td width='100' align='center' class='header_laporan'>No Bukti</td>
    <td width='150' align='center' class='header_laporan'>Catatan</td>
    <td width='60' align='center' class='header_laporan'>Tanggal</td>
	<td width='150' align='center' class='header_laporan'>Keterangan</td>
	<td width='80' align='center' class='header_laporan'>Nilai</td>
	
  </tr>";
			$sql1="select a.no_bukti,a.catatan,date_format(b.tanggal,'%d/%m/%Y') as tanggal,b.keterangan,b.nilai 
from sc_ver_d a
inner join sc_pesan_m b on a.no_bukti=b.no_pesan
where a.no_ver='$row->no_ver' ";
			
			$rs1 = $dbLib->execute($sql1);
			$j=1;$nilai=0; 
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$nilai=$jumlah+$row1->nilai;
				echo "<tr>
    <td align='center' class='isi_laporan'>$j</td>
    <td  class='isi_laporan'>$row1->no_bukti</td>
    <td class='isi_laporan'>$row1->catatan</td>
	<td class='isi_laporan'>$row1->tanggal</td>
	<td class='isi_laporan'>$row1->keterangan</td>
   <td align='right' class='isi_laporan'>".number_format($row1->nilai,0,",",".")."</td>
   </tr>";		
				$j=$j+1;
			}
			echo "<tr>
    <td colspan='5' align='center'  class='header_laporan'>Total</td>
	<td align='right' class='header_laporan'>".number_format($nilai,0,",",".")."</td>
   </tr></table><br>";
		}
		echo "</div>";
		return "";
	}
	
}
?>
  
1