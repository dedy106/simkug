<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("yakes");

class server_report_budget_rptAggBp extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$sql="select count(*) as jum from (select a.kode_pk
from agg_d a
inner join agg_pk b on a.kode_pk=b.kode_pk
inner join agg_drk c on a.kode_drk=c.kode_drk
inner join agg_pp d on a.kode_pp=d.kode_pp and a.kode_lokasi=d.kode_lokasi $this->filter
group by a.kode_pk,b.nama,a.kode_drk,c.nama,a.keterangan,a.kode_pp,a.kode_rka,a.kode_akun,a.bulan) abau ";
		error_log($sql);
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
		$sql="select a.kode_pk,b.nama as nama_pk,a.kode_drk,c.nama as nama_drk,a.keterangan,a.kode_pp
       ,a.kode_rka,a.kode_akun,a.bulan,sum(a.jumlah) as jumlah,sum(a.volume) as volume
       ,sum(a.nilai) as rka
       ,sum(case when a.jumlah<>0 then (a.nilai/(a.jumlah*a.volume)) else a.nilai end) as satuan
       ,sum(case when bulan between '01' and '03' then nilai else 0 end) as tw1
       ,sum(case when bulan between '04' and '06' then nilai else 0 end) as tw2,
       sum(case when bulan between '07' and '09' then nilai else 0 end) as tw3,
       sum(case when bulan between '10' and '12' then nilai else 0 end) as tw4
from agg_d a
inner join agg_pk b on a.kode_pk=b.kode_pk
inner join agg_drk c on a.kode_drk=c.kode_drk
inner join agg_pp d on a.kode_pp=d.kode_pp and a.kode_lokasi=d.kode_lokasi $this->filter
group by a.kode_pk,b.nama,a.kode_drk,c.nama,a.keterangan,a.kode_pp
         ,a.kode_rka,a.kode_akun,a.bulan
order by a.kode_rka,a.bulan";
		//error_log($sql);
		$start = (($this->page-1) * $this->rows);
		//$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		$i = 1;
		
		$AddOnLib=new server_util_AddOnLib();
		//echo $AddOnLib->judul_laporan("laporan buku rka",$this->lokasi,$AddOnLib->ubah_periode($periode));
		$judul="<div class='lokasi_laporan2'>".$this->lokasi."<br>LAPORAN BUKU RKA<br>TAHUN $tahun<br></div>";
		echo "<div align='center'>$judul"; 
		echo "<table border='1' cellpadding='0' cellspacing='0' class='kotak'>
  <tr bgcolor='#66FF33'>
    <td width='80' rowspan='3' align='center' class='header_laporan' >Lokasi</td>
    <td width='40' rowspan='3' align='center' class='header_laporan' >BAND</td>
    <td colspan='14' align='center' class='header_laporan' >JANUARI</td>
  </tr>
  <tr bgcolor='#66FF33'>
    <td colspan='2' align='center' class='header_laporan' >RJTP TPKK</td>
    <td colspan='2' align='center' class='header_laporan' >RJTP TPKU</td>
    <td colspan='2' align='center' class='header_laporan' >RJTL</td>
    <td colspan='2' align='center' class='header_laporan' >RI BEDAH</td>
    <td colspan='2' align='center' class='header_laporan' >RI NON BEDAH</td>
    <td colspan='2' align='center' class='header_laporan' >RESTITUSI</td>
	 <td colspan='2' align='center' class='header_laporan' >TOTAL</td>
  </tr>
  <tr bgcolor='#66FF33'>
    <td width='60' align='center' bgcolor='#66FF33' class='header_laporan' >Jml Kunjungan </td>
    <td width='60' align='center' class='header_laporan' >Besar Uang </td>
    <td align='center' class='header_laporan' >Jml Kunjungan </td>
    <td align='center' class='header_laporan' >Besar Uang </td>
    <td align='center' class='header_laporan' >Jml Kunjungan </td>
    <td align='center' class='header_laporan' >Besar Uang </td>
    <td align='center' class='header_laporan' >Jml Kunjungan </td>
    <td align='center' class='header_laporan' >Besar Uang </td>
    <td align='center' class='header_laporan' >Jml Kunjungan </td>
    <td align='center' class='header_laporan' >Besar Uang </td>
    <td align='center' class='header_laporan' >Jml Kunjungan </td>
    <td align='center' class='header_laporan' >Besar Uang </td>
	 <td align='center' class='header_laporan' >Jml Kunjungan </td>
    <td align='center' class='header_laporan' >Besar Uang </td>
  </tr>
</table>";
		echo "</div>";
		return "";
	}
	
}
?>
  
