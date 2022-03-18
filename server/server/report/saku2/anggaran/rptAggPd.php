<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku2_anggaran_rptAggPd extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$sql="select count(a.no_pd)
from agg_pd_m a
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi $this->filter ";
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
		
		$sql="select a.no_pd,a.tahun,a.kode_pp,a.kode_akun,a.nilai,b.nama as nama_pp,c.nama as nama_akun 
from agg_pd_m a
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi $this->filter
order by a.no_pd";
		
		//error_log($sql);
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		$i = 1;
		
		$AddOnLib=new server_util_AddOnLib();
		echo $AddOnLib->judul_laporan("biaya perjalanan dinas",$this->lokasi,$AddOnLib->ubah_periode($periode));
		
		echo "<div align='center'>"; 
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table   border='1' cellpadding='0' cellspacing='0' class='kotak'>
  <tr>
    <td colspan='20' style='padding:5px'><table width='100%' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td class='header_laporan' width='114'>No Bukti </td>
        <td class='header_laporan'>:&nbsp;$row->no_pd</td>
        </tr>
	    <tr>
        <td class='header_laporan'>PPt </td>
        <td class='header_laporan'>:&nbsp;$row->kode_pp -&nbsp; $row->nama_pp</td>
      </tr>
      
      <tr>
        <td class='header_laporan'>Tahun Anggaran   </td>
        <td class='header_laporan'>:&nbsp;$row->tahun</td>
      </tr>
	<tr>
        <td class='header_laporan'>Kode Akun </td>
        <td class='header_laporan'>:&nbsp;$row->kode_akun - $row->nama_akun</td>
      </tr>
    </table></td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='15' align='center' class='header_laporan'>No</td>
	<td width='40' align='center' class='header_laporan'>NIK</td>
    <td width='150' align='center' class='header_laporan'>Nama</td>
    <td width='40' align='center' class='header_laporan'>Band</td>
    <td width='60' align='center' class='header_laporan'>Kode DRK </td>
    <td width='200' align='center' class='header_laporan'>Nama DRK </td>
    <td width='50' align='center' class='header_laporan'>Kode Rute</td>
    <td width='150' align='center' class='header_laporan'>Nama Rute </td>
    <td width='50' align='center' class='header_laporan'>Status</td>
    <td width='200' align='center' class='header_laporan'>Kegiatan</td>
    <td width='40' align='center' class='header_laporan'>Bulan</td>
    <td width='40' align='center' class='header_laporan'>Jml Hari </td>
    <td width='80' align='center' class='header_laporan'>Tarif Uang Harian </td>
	 <td width='80' align='center' class='header_laporan'>Nilai Uang Harian </td>
    <td width='80' align='center' class='header_laporan'>Tarif Transport </td>
 	<td width='90' align='center' class='header_laporan'>Total</td>
	
  </tr>";
			$sql1="select a.no_pd, a.tahun, a.nik, b.nama, a.kode_band, a.kode_drk, c.nama as nama_drk, a.kode_rute,
      d.nama as nama_rute,a.bulan, a.jml_hari, a.tarif_uh, a.tarif_trans, a.nilai_uh, a.total, a.status,a.kegiatan
from agg_pd_d a
inner join karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi
inner join drk c on a.kode_drk=c.kode_drk and a.kode_lokasi=c.kode_lokasi
inner join agg_pd_trans d on a.kode_rute=d.kode_rute 
where a.no_pd='$row->no_pd' ";
			
			$rs1 = $dbLib->execute($sql1);
			$j=1;$nilai_uh=0; $tarif_trans=0; $total=0;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$nilai_uh=$nilai_uh+$row1->nilai_uh;
				$tarif_trans=$tarif_trans+$row1->tarif_trans;
				$total=$total+$row1->total;
				echo "<tr>
    <td align='center' class='isi_laporan'>$j</td>
    <td  class='isi_laporan'>$row1->nik</td>
    <td class='isi_laporan'>$row1->nama</td>
    <td  class='isi_laporan'>$row1->kode_band</td>
    <td  class='isi_laporan'>$row1->kode_drk</td>
    <td class='isi_laporan'>$row1->nama_drk</td>
    <td class='isi_laporan'>$row1->kode_rute</td>
    <td  class='isi_laporan'>$row1->nama_rute</td>
    <td align='center' class='isi_laporan'>$row1->status</td>
    <td class='isi_laporan'>$row1->kegiatan</td>
    <td align='center' class='isi_laporan'>".number_format($row1->bulan,0,",",".")."</td>
    <td align='center' class='isi_laporan'>".number_format($row1->jml_hari,0,",",".")."</td>
    <td align='right' class='isi_laporan'>".number_format($row1->tarif_uh,0,",",".")."</td>
    <td align='right' class='isi_laporan'>".number_format($row1->nilai_uh,0,",",".")."</td>
    <td align='right' class='isi_laporan'>".number_format($row1->tarif_trans,0,",",".")."</td>
    <td align='right' class='isi_laporan'>".number_format($row1->total,0,",",".")."</td>
  </tr>";		
				$j=$j+1;
			}
			echo "<tr>
    <td colspan='13' align='center'  class='header_laporan'>Total</td>
    <td align='right' class='header_laporan'>".number_format($nilai_uh,0,",",".")."</td>
    <td align='right' class='header_laporan'>".number_format($tarif_trans,0,",",".")."</td>
    <td align='right' class='header_laporan'>".number_format($total,0,",",".")."</td>
  </tr><br>";
		}
		echo "</div>";
		return "";
	}
	
}
?>
  
