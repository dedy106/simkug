<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku2_anggaran_rptAggTpkk extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$sql="select count(a.no_tpkk)
from agg_tpkk_m a $this->filter ";
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
		
		$sql="select a.no_tpkk,a.tahun
from agg_tpkk_m a  $this->filter
order by a.no_tpkk  ";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		$i = 1;
		
		$AddOnLib=new server_util_AddOnLib();
		echo $AddOnLib->judul_laporan("THP TPKK",$this->lokasi,"TAHUN $tahun");
		
		echo "<div align='center'>"; 
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table   border='1' cellpadding='0' cellspacing='0' class='kotak'>
  <tr>
    <td colspan='12' style='padding:5px'><table width='100%' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td class='header_laporan' width='114'>No Bukti </td>
        <td class='header_laporan'>:&nbsp;$row->no_tpkk</td>
        </tr>
	   
      <tr>
        <td class='header_laporan'>Tahun Anggaran   </td>
        <td class='header_laporan'>:&nbsp;$row->tahun</td>
      </tr>
	
    </table></td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='15' align='center' class='header_laporan'>No</td>
	<td width='60' align='center' class='header_laporan'>Kode Dokter</td>
    <td width='150' align='center' class='header_laporan'>Nama Dokter</td>
    <td width='60' align='center' class='header_laporan'>Kode Akun</td>
    <td width='150' align='center' class='header_laporan'>Nama Akun</td>
    <td width='60' align='center' class='header_laporan'>Kode PP</td>
    <td width='150' align='center' class='header_laporan'>Nama PP</td>
    <td width='50' align='center' class='header_laporan'>Kode Param</td>
	<td width='150' align='center' class='header_laporan'>Nama Param</td>
	<td width='60' align='center' class='header_laporan'>Periode</td>
	<td width='60' align='center' class='header_laporan'>Status</td>
	<td width='90' align='center' class='header_laporan'>Nilai</td>
</tr>";
			$sql1="select a.kode_dokter,b.nama as nama_dokter, a.kode_akun,d.nama as nama_akun, a.kode_pp,c.nama as nama_pp,
a.kode_param,e.nama as nama_param, a.periode,a.status, a.nilai
from agg_tpkk_d a
inner join agg_dokter b on a.kode_dokter=b.kode_dokter and a.kode_lokasi=b.kode_lokasi
inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
inner join masakun d on a.kode_akun=d.kode_akun and a.kode_lokasi=d.kode_lokasi
inner join agg_param e on a.kode_param=e.kode_param
where a.no_tpkk='$row->no_tpkk' and a.nilai<>0";
			
			$rs1 = $dbLib->execute($sql1);
			$j=1;$nilai=0;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$nilai=$nilai+$row1->nilai;
				echo "<tr>
    <td align='center' class='isi_laporan'>$j</td>
    <td  class='isi_laporan'>$row1->kode_dokter</td>
    <td class='isi_laporan'>$row1->nama_dokter</td>
	<td class='isi_laporan'>$row1->kode_akun</td>
    <td  class='isi_laporan'>$row1->nama_akun</td>
    <td class='isi_laporan'>$row1->kode_pp</td>
    <td  class='isi_laporan'>$row1->nama_pp</td>
	<td  class='isi_laporan'>$row1->kode_param</td>
	 <td  class='isi_laporan'>$row1->nama_param</td>
	<td  align='center' class='isi_laporan'>$row1->periode</td>
	 <td  align='center' class='isi_laporan'>$row1->status</td>
     <td align='right' class='isi_laporan'>".number_format($row1->nilai,0,",",".")."</td>
    </tr>";		
				$j=$j+1;
			}
			echo "<tr>
    <td colspan='11' align='center'  class='header_laporan'>Total</td>
	<td align='right' class='header_laporan'>".number_format($nilai,0,",",".")."</td>
    </tr>";
		}
		echo "</div>";
		return "";
	}
	
}
?>
  
