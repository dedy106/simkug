<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku2_anggaran_rptAggOutAkunTrail extends server_report_basic
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
		$tahun=$tmp[0];
		$jenis=$tmp[1];
		if ($jenis=="rka")
		{
			$sql = "select a.kode_akun,b.nama as nama_akun,a.kode_pp,c.nama as nama_pp,a.kode_lokasi,sum(a.rka) as nilai
from agg_outlook a 
inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi $this->filter and (a.rka<>0)
group by a.kode_akun,b.nama,a.kode_lokasi,a.kode_pp,c.nama
order by a.kode_akun ";
		}
		if ($jenis=="realisasi")
		{
			$sql = "select a.kode_akun,b.nama as nama_akun,a.kode_pp,c.nama as nama_pp,a.kode_lokasi,sum(a.realisasi) as nilai
from agg_outlook a 
inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi $this->filter and (a.realisasi<>0)
group by a.kode_akun,b.nama,a.kode_lokasi,a.kode_pp,c.nama
order by a.kode_akun ";
		}
		if ($jenis=="estimasi")
		{
			$sql = "select a.kode_akun,b.nama as nama_akun,a.kode_pp,c.nama as nama_pp,a.kode_lokasi,sum(a.outlook)-sum(a.realisasi) as nilai
from agg_outlook a 
inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi $this->filter and (a.realisasi<>0 or a.outlook<>0)
group by a.kode_akun,b.nama,a.kode_lokasi,a.kode_pp,c.nama
order by a.kode_akun ";
		}
		if ($jenis=="outlook")
		{
			$sql = "select a.kode_akun,b.nama as nama_akun,a.kode_pp,c.nama as nama_pp,a.kode_lokasi,sum(a.outlook) as nilai
from agg_outlook a 
inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi $this->filter and (a.outlook<>0)
group by a.kode_akun,b.nama,a.kode_lokasi,a.kode_pp,c.nama
order by a.kode_akun ";
			$jenis="";
		}
		
		$rs = $dbLib->execute($sql);
		$i = $start+1;
		$AddOnLib=new server_util_AddOnLib();
		echo $AddOnLib->judul_laporan("outlook $jenis per akun",$this->lokasi,$tahun);
		
		echo "<center><table  border='1' cellspacing='0' cellpadding='0' class='kotak'>
<tr bgcolor='#CCCCCC'>
<td width='25' height='25' class='header_laporan'  align='center'>No</td>
<td width='80' class='header_laporan'  align='center'>Kode Akun</td>
<td width='250' class='header_laporan'  align='center'>Nama Akun</td>
<td width='80' class='header_laporan'  align='center'>Kode PP</td>
<td width='200' class='header_laporan'  align='center'>Nama PP</td>
<td width='100' class='header_laporan'  align='center'>Nilai</td>
 </tr>";
		$i=1;
		$nilai=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai=$nilai+$row->nilai;
			
			echo "<tr>
  <td height='23' class='isi_laporan' align='center'>$i</td>
  <td class='isi_laporan'>$row->kode_akun</td>
  <td class='isi_laporan'>$row->nama_akun</td>
  <td class='isi_laporan'>$row->kode_pp</td>
  <td class='isi_laporan'>$row->nama_pp</td>
  <td class='isi_laporan' align='right'>".number_format($row->nilai,0,',','.')."</td>
 
</tr>";
			
			$i=$i+1;
		}
		echo "<tr>
  <td height='23' class='header_laporan' align='center' colspan='5'>Total</td>
  <td class='header_laporan' align='right'>".number_format($nilai,0,',','.')."</td>


</tr>";
		
		echo "</table></center>";
		return "";
	}
	
	
}

