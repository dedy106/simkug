<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku2_fa_rptFaApp extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$sql="select count(a.no_baps)
from fa_baps_m a
inner join karyawan b on a.nik_app=b.nik and a.kode_lokasi=b.kode_lokasi $this->filter ";
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
		$kode_akun=$tmp[2];
		$kode_rka=$tmp[3];
		$kode_bidang=$tmp[4];
		$ver=$tmp[1];
		$sql="select a.no_baps,a.kode_lokasi,convert(varchar,a.tanggal,103) as tanggal,a.nik_app,b.nama,a.keterangan,a.periode,a.no_bukti
from fa_baps_m a
inner join karyawan b on a.nik_app=b.nik and a.kode_lokasi=b.kode_lokasi $this->filter order by a.no_baps";
		
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		$i = 1;
		
		$AddOnLib=new server_util_AddOnLib();
		echo $AddOnLib->judul_laporan("approval asset",$this->lokasi,$AddOnLib->ubah_periode($periode));
		echo "<div align='center'>"; 
		$jenis="";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$jenis=strtoupper($row->jenis);  
			echo "<table width='900'  border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td align='center'><table border='1' cellpadding='0' cellspacing='0' class='kotak'>
  <tr>
    <td colspan='13' style='padding:5px'><table width='100%' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td class='header_laporan' width='114'>No Approval </td>
        <td class='header_laporan'>:&nbsp;$row->no_baps</td>
        </tr>
	    <tr>
        <td class='header_laporan'>NIK Approve </td>
        <td class='header_laporan'>:&nbsp;$row->nik_app - $row->nama</td>
      </tr>
      <tr>
        <td class='header_laporan'>Tanggal   </td>
        <td class='header_laporan'>:&nbsp;$row->tanggal</td>
      </tr>
	  <tr>
        <td class='header_laporan'>No Bukti   </td>
        <td class='header_laporan'>:&nbsp;$row->no_bukti</td>
      </tr>
	<tr>
        <td class='header_laporan'>Keterangan   </td>
        <td class='header_laporan'>:&nbsp;$row->keterangan</td>
      </tr>
	
    </table></td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='10' align='center' class='header_laporan'>No</td>
	<td width='80' align='center' class='header_laporan'>No Asset</td>
    <td width='200' align='center' class='header_laporan'>Nama </td>
	<td width='60' align='center' class='header_laporan'>Tanggal</td>
   <td width='150' align='center' class='header_laporan'>Kelompok Asset</td>
   <td width='150' align='center' class='header_laporan'>Lokasi</td>
	<td width='90' align='center' class='header_laporan'>Nilai Perolehan</td>
	
  </tr>
";
		
	  $sql1="select a.no_fa,a.kode_lokasi,a.nama,convert(varchar,a.tgl_perolehan,103) as tgl,a.nilai,b.nama as nama_klp,c.nama as nama_lokasi
from fa_asset a
inner join fa_klpakun b on a.kode_klpakun=b.kode_klpakun and a.kode_lokasi=b.kode_lokasi
left join  fa_lokasi c on a.kode_lokfa=c.kode_lokfa and a.kode_lokasi=c.kode_lokasi
where a.no_baps='$row->no_baps' and a.kode_lokasi='$row->kode_lokasi'
order by a.tgl_perolehan desc ";
		
		$rs1 = $dbLib->execute($sql1);
		$j=1;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
			echo "<tr>
    <td align='center' class='isi_laporan'>$j</td>
    <td align='left' class='isi_laporan'>";
	echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBbAsset('$row1->no_fa','$row1->kode_lokasi');\">$row1->no_fa</a>";				  
			echo "</td> <td align='left' class='isi_laporan'>$row1->nama</td>
	<td align='left' class='isi_laporan'>$row1->tgl</td>
	<td align='left' class='isi_laporan'>$row1->nama_klp </td>
	<td align='left' class='isi_laporan'>$row1->nama_lokasi </td>
	<td align='right' class='isi_laporan'>".number_format($row1->nilai,0,",",".")."</td>
	
  </tr>";
		$j=$j+1;
		}
		
	  echo " </table></td>
  </tr>
 
</table><br>";
			
			$i=$i+1;
		}
		echo "</div>";
			
		return "";
	}
	
}
?>
  
