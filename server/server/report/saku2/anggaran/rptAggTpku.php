<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku2_anggaran_rptAggTpku extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$sql="select count(a.no_tpku)
from agg_tpku_m a
inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi
inner join agg_drk d on a.kode_drk=d.kode_drk and a.tahun=d.tahun $this->filter ";
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
		$tahun=$tmp[0];
	
		$sql="select a.no_tpku,a.tahun,a.nilai,a.kode_akun,a.kode_drk,c.nama as nama_akun,d.nama as nama_drk
from agg_tpku_m a
inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi
inner join agg_drk d on a.kode_drk=d.kode_drk and a.tahun=d.tahun $this->filter
order by a.no_tpku ";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		$i = 1;
		
		$AddOnLib=new server_util_AddOnLib();
		echo $AddOnLib->judul_laporan("THP TPKU",$this->lokasi,"TAHUN $tahun");
		
		echo "<div align='center'>"; 
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table   border='1' cellpadding='0' cellspacing='0' class='kotak'>
  <tr>
    <td colspan='20' style='padding:5px'><table width='100%' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td class='header_laporan' width='114'>No Bukti </td>
        <td class='header_laporan'>:&nbsp;$row->no_tpku</td>
        </tr>
	   
	  <tr>
        <td class='header_laporan'>DRK </td>
        <td class='header_laporan'>:&nbsp;$row->kode_drk -&nbsp; $row->nama_drk</td>
      </tr>
      <tr>
        <td class='header_laporan'>Tahun Anggaran   </td>
        <td class='header_laporan'>:&nbsp;$row->tahun</td>
      </tr>
	
    </table></td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='15' align='center' class='header_laporan'>No</td>
	<td width='150' align='center' class='header_laporan'>No Kontrak</td>
    <td width='200' align='center' class='header_laporan'>Dokter</td>
    <td width='200' align='center' class='header_laporan'>Alamat</td>
    <td width='60' align='center' class='header_laporan'>Jenis</td>
    <td width='50' align='center' class='header_laporan'>Status</td>
	<td width='50' align='center' class='header_laporan'>Periode</td>
    <td width='60' align='center' class='header_laporan'>Pensiun</td>
    <td width='60' align='center' class='header_laporan'>Pegawai</td>
	<td width='90' align='center' class='header_laporan'>Nilai</td>
</tr>";
			$sql1="select  a.no_kontrak, a.dokter, a.alamat,a.jenis, a.status,a.pensiun, a.pegawai, a.nilai,a.periode
from agg_tpku_d a
where a.no_tpku='$row->no_tpku' and a.nilai<>0";
			
			$rs1 = $dbLib->execute($sql1);
			$j=1;$pensiun=0; $pegawai=0; $nilai=0;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$pensiun=$pensiun+$row1->pensiun;
				$pegawai=$pegawai+$row1->pegawai;
				$nilai=$nilai+$row1->nilai;
				echo "<tr>
    <td align='center' class='isi_laporan'>$j</td>
    <td  class='isi_laporan'>$row1->no_kontrak</td>
    <td class='isi_laporan'>$row1->dokter</td>
	<td class='isi_laporan'>$row1->alamat</td>
    <td  align='center' class='isi_laporan'>$row1->jenis</td>
    <td  align='center' class='isi_laporan'>$row1->status</td>
	<td  align='center' class='isi_laporan'>$row1->periode</td>
    <td align='center' class='isi_laporan'>".number_format($row1->pensiun,0,",",".")."</td>
    <td align='center' class='isi_laporan'>".number_format($row1->pegawai,0,",",".")."</td>
    <td align='right' class='isi_laporan'>".number_format($row1->nilai,0,",",".")."</td>
    </tr>";		
				$j=$j+1;
			}
			echo "<tr>
    <td colspan='7' align='center'  class='header_laporan'>Total</td>
	<td align='center' class='header_laporan'>".number_format($pensiun,0,",",".")."</td>
    <td align='center' class='header_laporan'>".number_format($pegawai,0,",",".")."</td>
    <td align='right' class='header_laporan'>".number_format($nilai,0,",",".")."</td>
    </tr>";
		}
		echo "</div>";
		return "";
	}
	
}
?>
