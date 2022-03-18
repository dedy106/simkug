<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
function fnSpasi($level)
{
	$tmp="";
	for ($i=1; $i<=$level; $i++)
	{
		$tmp=$tmp."&nbsp;&nbsp;&nbsp;&nbsp;";
	}
	return $tmp;
}
class server_report_saku3_inves2_rptDwPortofolio extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$sql = "select 1 ";
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);		
		}
		//error_log($this->rows."/".$count."/".$totPage);
		return $totPage;
	}
	function getHtml()
	{
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$periode=$tmp[1];
		$kode_lokasi=$tmp[2];
		$tgl=$tmp[3];
		$kode_fs=$tmp[4];
		//$sql="exec sp_inv_portofolio '$kode_fs','$periode','$kode_lokasi','$nik_user','$tgl' ";
		//$rs = $dbLib->execute($sql);	
		
		$sql="select sum(c.n3) as nmax
from inv_grafik_m a
inner join inv_grafik_d b on a.kode_grafik=b.kode_grafik and a.kode_lokasi=b.kode_lokasi
inner join neraca_tmp c on b.kode_neraca=c.kode_neraca and b.kode_lokasi=c.kode_lokasi
where c.nik_user='$nik_user' ";
		$rs = $dbLib->execute($sql);
		$row = $rs->FetchNextObject($toupper=false);
		$nmax=$row->nmax;
		
		$sql = "select a.kode_grafik,a.nama,a.pmin,a.pmax,a.palokasi,isnull(b.n3,0) as n2
from inv_grafik_m a
left join (select a.kode_grafik,sum(c.n3) as n3
from inv_grafik_m a
inner join inv_grafik_d b on a.kode_grafik=b.kode_grafik and a.kode_lokasi=b.kode_lokasi
inner join neraca_tmp c on b.kode_neraca=c.kode_neraca and b.kode_lokasi=c.kode_lokasi
where c.nik_user='$nik_user' 
group by a.kode_grafik
		)b on a.kode_grafik=b.kode_grafik
where a.kode_klp='GR1'
order by a.kode_grafik ";
		
		$rs = $dbLib->execute($sql);
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		
		//echo $AddOnLib->judul_laporan($nama_form,$this->lokasi,$AddOnLib->ubah_periode($periode));
		$bln = substr($periode,4);
		$thn = substr($periode,0,4);
		if (floatval($bln) > 12) $bln = 12;
		$totime = date("d M Y",strtotime("-1 second",strtotime("+1 month",strtotime($bln.'/01/'.$thn.' 00:00:00'))));
		$now = strtotime(date("d M Y"));
		$time = strtotime($totime);
		$bln = $AddOnLib->ubah_bulan(substr($periode,4));
		$totime = explode(" ",$totime);
		if ($time > $now){
			 $now = date("d M Y");
			 $now = explode(" ",$now);
			 $totime[0] = $now[0];
		}		
		$totime = $totime[0] . " ". $bln ." ". $totime[2];
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>";
		//echo $AddOnLib->judul_laporan("laporan laba rugi",$this->lokasi,"Per $totime");
		echo "<table border='0' cellspacing='0' cellpadding='0' >
  <tr>
    <td class='lokasi_laporan' align='center'>$this->lokasi</td>
  </tr>
  <tr>
    <td  class='lokasi_laporan2' align='center'>Alokasi Plan Asser Vs Batasan Arahan per April 2016</td>
  </tr>
  <tr>
    <td class='lokasi_laporan' align='center'>Untuk Periode Yang Berakhir Pada Tanggal $totime</td>
  </tr>
  <tr>
    <td align='center'>";
		echo "<table border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td><table border='1' cellspacing='0' cellpadding='0' class='kotak'>
		  <tr bgcolor='#CCCCCC'>
			<td width='400' rowspan='2' align='center'  class='header_laporan'>Kelompok Aset</td>
			<td width='100' rowspan='2' align='center' class='header_laporan'>Nilai Wajar</td>
			<td width='60' rowspan='2' align='center' class='header_laporan'>Realisasi Alokasi</td>
			<td width='60' rowspan='2' align='center' class='header_laporan'>Alokasi Acuan</td>
			<td height='25' colspan='2' align='center' class='header_laporan'>Batasan</td>
		</tr>
		  <tr bgcolor='#CCCCCC'>
		    <td width='50' height='25' align='center' class='header_laporan'>maks</td>
		    <td width='50' align='center' class='header_laporan'>min</td>
  </tr>";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$n1="";$n2="";$n3="";$n4="";
			$p1=($row->n2/$nmax)*100;
			echo "<tr><td height='20' class='isi_laporan'>";
			echo fnSpasi($row->level_spasi);
			echo "$row->nama";
			echo "</td>
				<td class='isi_laporan' align='right'>".number_format($row->n2,0,",",".")."</td>
				<td class='isi_laporan' align='center'>".number_format($p1,2,",",".")."%</td>
				<td class='isi_laporan' align='center'>".number_format($row->palokasi,2,",",".")."%</td>
				<td class='isi_laporan' align='center'>".number_format($row->pmax,2,",",".")." %</td>
				<td class='isi_laporan' align='center'>".number_format($row->pmin,2,",",".")." %</td>
			  </tr>";
			
			$i=$i+1;
		}
		echo "</table></td>
  </tr>";
		echo "</td></tr>";
		echo "</table></div>";
		return "";
	}
	
}
?>
