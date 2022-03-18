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
class server_report_saku3_dw_rptDwLabaRugiFakultasAkreKeluar extends server_report_basic
{
	
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$mutasi=$tmp[1];
		$periode=$tmp[2];
		$sql = "select 1";
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);		
		}
		error_log($sql);
		return $totPage;
	}
	function getHtml()
	{
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$kode_fakultas=$tmp[2];
		$jenis=$tmp[3];
		$nama_file="labarugi_pp_".$periode.".xls";
		$tahun=substr($periode,0,4);
		$tahun_rev=substr($periode,0,4)-1;
		if ($jenis=="Excell")
		{
			header("Pragma: public");
			header("Expires: 0");
			header("Cache-Control: must-revalidate, post-check=0, pre-check=0"); 
			header("Content-Type: application/force-download");
			header("Content-Type: application/octet-stream");
			header("Content-Type: application/download");;
			header("Content-Disposition: attachment;filename=$nama_file"); 
			header("Content-Transfer-Encoding: binary ");
		}
		$sql="select a.kode_fakultas,a.nama from exs_fakultas a $kode_fakultas order by a.kode_fakultas";
		
		$rs2 = $dbLib->execute($sql);
		while ($row2 = $rs2->FetchNextObject($toupper=false))
		{
			$nama=$row2->nama;
			$sql = "select a.kode_neraca,a.kode_fs,a.kode_lokasi,a.nama,a.tipe,a.level_spasi,b.kode_fakultas,
	   case a.jenis_akun when  'Pendapatan' then isnull(b.n4,0) else isnull(b.n4,0) end as n1,
	   case a.jenis_akun when  'Pendapatan' then isnull(c.n4,0) else isnull(c.n4,0) end as n2,
	   case a.jenis_akun when  'Pendapatan' then isnull(d.n4,0) else isnull(d.n4,0) end as n3,
	   case a.jenis_akun when  'Pendapatan' then isnull(e.n4,0) else isnull(e.n4,0) end as n4,
	   case a.jenis_akun when  'Pendapatan' then isnull(f.n4,0) else isnull(f.n4,0) end as n5,
	   case a.jenis_akun when  'Pendapatan' then isnull(g.n4,0) else isnull(g.n4,0) end as n6,
	   case a.jenis_akun when  'Pendapatan' then isnull(h.n4,0) else isnull(h.n4,0) end as n7
from neraca a
left join exs_neraca_fakultas_akre b on a.kode_neraca=b.kode_neraca and a.kode_fs=b.kode_fs and a.kode_lokasi=b.kode_lokasi and b.tahun='2014' and b.kode_fakultas='$row2->kode_fakultas' 
left join exs_neraca_fakultas_akre c on a.kode_neraca=c.kode_neraca and a.kode_fs=c.kode_fs and a.kode_lokasi=c.kode_lokasi and c.tahun='2015' and c.kode_fakultas='$row2->kode_fakultas' 
left join exs_neraca_fakultas_akre d on a.kode_neraca=d.kode_neraca and a.kode_fs=d.kode_fs and a.kode_lokasi=d.kode_lokasi and d.tahun='2016' and d.kode_fakultas='$row2->kode_fakultas' 
left join exs_neraca_fakultas_akre e on a.kode_neraca=e.kode_neraca and a.kode_fs=e.kode_fs and a.kode_lokasi=e.kode_lokasi and e.tahun='2017' and e.kode_fakultas='$row2->kode_fakultas' 
left join exs_neraca_fakultas_akre f on a.kode_neraca=f.kode_neraca and a.kode_fs=f.kode_fs and a.kode_lokasi=f.kode_lokasi and f.tahun='2018' and f.kode_fakultas='$row2->kode_fakultas' 
left join exs_neraca_fakultas_akre g on a.kode_neraca=g.kode_neraca and a.kode_fs=g.kode_fs and a.kode_lokasi=g.kode_lokasi and g.tahun='2019' and g.kode_fakultas='$row2->kode_fakultas' 
left join exs_neraca_fakultas_akre h on a.kode_neraca=h.kode_neraca and a.kode_fs=h.kode_fs and a.kode_lokasi=h.kode_lokasi and h.tahun='2020' and h.kode_fakultas='$row2->kode_fakultas' 
$this->filter and a.modul='L'
order by a.rowindex ";
			$rs = $dbLib->execute($sql);		
			
			$resource = $_GET["resource"];
			$fullId = $_GET["fullId"];
			$i = $start+1;
			$AddOnLib=new server_util_AddOnLib();
			
			echo "<div align='center' >"; 
			echo $AddOnLib->judul_laporan("laporan penggunaan dana fakultas"."<br>".$nama,$this->lokasi,"");
			echo "<table  border='1' cellpadding='0' cellspacing='0' class='kotak'>
		<tr bgcolor='#CCCCCC'>
		<td width='350' height='25'  class='header_laporan' align='center'>Keterangan</td>
		<td width='100' class='header_laporan' align='center'>2017/2018</td>
		<td width='100' class='header_laporan' align='center'>2018/2019</td>
		<td width='100' class='header_laporan' align='center'>2019/2020</td>
		</tr>
		";
			
			while ($row = $rs->FetchNextObject($toupper=false))
			{
				
				echo "<tr>
		  <td height='20' class='isi_laporan'>";
				echo fnSpasi($row->level_spasi);
				echo $row->nama;
				echo "</td>
				<td class='isi_laporan' align='right'>".number_format($row->n4,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row->n5,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row->n6,0,',','.')."</td>";
				$i=$i+1;
			}
			
			echo "</table></div><br>";
		}
		return "";
	}
	
	
	
}
?>
