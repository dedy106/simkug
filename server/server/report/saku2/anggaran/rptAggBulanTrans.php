<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku2_anggaran_rptAggBulanTrans extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$sql = "select 1";
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);		
		}
		error_log($sql."/".$totPage."-".$count."-".$this->rows);
		
		return $totPage;
	}
	
	function getHtml()
	{
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];

		$sql = "select a.no_bukti,a.modul,a.kode_lokasi,a.kode_akun,b.nama as nama_akun,a.kode_pp,a.kode_drk,a.periode,a.keterangan,a.jumlah,a.volume,a.nilai,
		c.nama as nama_drk,d.nama as nama_pp,a.kode_pk,a.kode_rka
from agg_d a
inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
inner join agg_drk c on a.kode_drk=c.kode_drk and a.tahun=c.tahun
inner join pp d on a.kode_pp=d.kode_pp and a.kode_lokasi=d.kode_lokasi  $this->filter
order by a.no_bukti";
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$rs = $dbLib->execute($sql);
		$i = $start+1;
		$AddOnLib=new server_util_AddOnLib();
		echo $AddOnLib->judul_laporan("Anggaran per akun",$this->lokasi,$AddOnLib->ubah_periode($periode));
		
		echo "<center><table  border='1' cellspacing='0' cellpadding='0' class='kotak'>
<tr bgcolor='#CCCCCC'>
<td width='25' height='25' class='header_laporan'  align='center'>No</td>
<td width='100' class='header_laporan'  align='center'>No Bukti</td>
<td width='60' class='header_laporan'  align='center'>Modul</td>
<td width='60' class='header_laporan'  align='center'>Periode</td>
<td width='80' class='header_laporan'  align='center'>Kode Akun</td>
<td width='200' class='header_laporan'  align='center'>Nama Akun</td>
<td width='80' class='header_laporan'  align='center'>Kode PP</td>
<td width='100' class='header_laporan'  align='center'>Nama PP</td>
<td width='80' class='header_laporan'  align='center'>Kode DRK</td>
<td width='200' class='header_laporan'  align='center'>Nama DRK</td>
<td width='250' class='header_laporan'  align='center'>Kegiatan</td>
<td width='60' class='header_laporan'  align='center'>NIK</td>
<td width='60' class='header_laporan'  align='center'>Kode Param</td>
<td width='40' class='header_laporan'  align='center'>Jumlah</td>
<td width='40' class='header_laporan'  align='center'>Volume</td>
<td width='100' class='header_laporan'  align='center'>Nilai</td>

  </tr>";
		$i=1;
		$jumlah=0;$volume=0;$nilai=0;$persen=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$jumlah=$jumlah+$row->jumlah;
			$volume=$volume+$row->volume;
			$nilai=$nilai+$row->nilai;
			$persen=$persen+$row->persen;
			echo "<tr>
  <td height='23' class='isi_laporan' align='center'>$i</td>
  <td height='20'  class='isi_laporan'>";
	echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBukti('$row->no_bukti','$row->kode_lokasi');\">$row->no_bukti</a>";
	echo "</td>
  <td class='isi_laporan'>$row->modul</td>
  <td class='isi_laporan'>$row->periode</td>
  <td class='isi_laporan'>$row->kode_akun</td>
  <td class='isi_laporan'>$row->nama_akun</td>
  <td class='isi_laporan'>$row->kode_pp</td>
  <td class='isi_laporan'>$row->nama_pp</td>
  <td class='isi_laporan'>$row->kode_drk</td>
  <td class='isi_laporan'>$row->nama_drk</td>
  <td class='isi_laporan'>$row->keterangan</td>
  <td class='isi_laporan'>$row->kode_pk</td>
  <td class='isi_laporan'>$row->kode_rka</td>
  <td class='isi_laporan' align='center'>".number_format($row->jumlah,0,',','.')."</td>
  <td class='isi_laporan' align='center'>".number_format($row->volume,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->nilai,0,',','.')."</td>
</tr>";
			
			$i=$i+1;
		}
		echo "<tr>
  <td height='23' class='header_laporan' align='center' colspan='13'>Total</td>
  <td class='header_laporan' align='center'>".number_format($jumlah,0,',','.')."</td>
  <td class='header_laporan' align='center'>".number_format($volume,0,',','.')."</td>
  <td class='header_laporan' align='right'>".number_format($nilai,0,',','.')."</td>
</tr>";
		
		echo "</table></center>";
		return "";
	}
	
	
}

