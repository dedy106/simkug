<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_dw_rptDwStudentBodyProdi extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$sql="select 1 ";
		
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
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$kode_jurusan=$tmp[2];
		$tahun=substr($periode,0,4);
		$sql = "select a.kode_jur,a.nama,ISNULL(c.jum,0) as n2,ISNULL(b.jum,0) as n4,ISNULL(b.jum,0)-ISNULL(c.jum,0) as deviasi  
from aka_jurusan a
left join (select a.kode_jur,a.kode_lokasi,COUNT(a.nim) as jum 
from (select b.kode_jur,b.nim,a.kode_lokasi 
from aka_bill_d a
inner join aka_mahasiswa b on a.nim=b.nim and a.kode_lokasi=b.kode_lokasi
where a.kode_lokasi='$kode_lokasi' and a.periode='201502'
group by b.kode_jur,b.nim,a.kode_lokasi 
	  )a
group by a.kode_jur,a.kode_lokasi
		  )b on a.kode_jur=b.kode_jur and a.kode_lokasi=b.kode_lokasi
left join (select a.kode_pp,a.kode_lokasi,sum(a.jumlah) as jum
		from exs_pdpt_ppbs a
		where a.kode_lokasi='$kode_lokasi' and a.periode='201502'
		group by a.kode_pp,a.kode_lokasi
		   )c on a.kode_jur=c.kode_pp and a.kode_lokasi=c.kode_lokasi
where a.kode_lokasi='$kode_lokasi' and a.kode_jur='$kode_jurusan'
order by a.kode_jur";
		
		$rs = $dbLib->execute($sql);
		$i = $start+1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("laporan student body prodi",$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' style='border-collapse: collapse' bordercolor='#111111'>
  <tr bgcolor='#CCCCCC'>
    <td width='30'  class='header_laporan' align='center'>No</td>
    <td width='50' class='header_laporan' align='center'>Kode </td>
    <td width='300' class='header_laporan' align='center'>Nama Fakultas</td>
    <td width='80' class='header_laporan' align='center'>Target</td>
    <td width='80' class='header_laporan' align='center'>Realisasi</td>
	<td width='80' class='header_laporan' align='center'>Deviasi</td>
	<td width='60' class='header_laporan' align='center'>% Pencapaian</td>
  </tr>
  ";
		$deviasi=0; $n2=0; $n4=0;
		$i=1;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$n2+=$row->n2;
			$n4+=$row->n4;
			$deviasi+=$row->deviasi;
			$persen=0;
			if ($row->n2!=0)
			{
				$persen=($row->n4/$row->n2)*100;
			}
			echo "<tr>
    <td class='isi_laporan' align='center'>$i</td>
    <td class='isi_laporan'>$row->kode_jur</td>
    <td class='isi_laporan'>$row->nama</td>
	<td class='isi_laporan' align='right'>".number_format($row->n2,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n4,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->deviasi,0,',','.')."</td>
	<td class='isi_laporan' align='center'>".number_format($persen,0,',','.')."%</td>
  </tr>";
			
			$i=$i+1;
		}
	
	echo "<tr>
    <td height='20' colspan='3' class='sum_laporan' align='right'>Total</td>
    <td class='sum_laporan' align='right'>".number_format($n2,0,',','.')."</td>
    <td class='sum_laporan' align='right'>".number_format($n4,0,',','.')."</td>
    <td class='sum_laporan' align='right'>".number_format($deviasi,0,',','.')."</td>
    <td class='sum_laporan' align='center'>".number_format($persen,0,',','.')."%</td>
</tr>";
		echo "</table>";
	
		echo "</div>";
		return "";
	}
	
	function getHtml2()
	{
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$kode_jurusan=$tmp[2];
		$tahun=substr($periode,0,4);
		$sql = "select a.kode_jur,a.nama,ISNULL(c.jum,0) as n2,ISNULL(b.jum,0) as n4,ISNULL(b.jum,0)-ISNULL(c.jum,0) as deviasi  
from aka_jurusan a
left join (select a.kode_jur,a.kode_lokasi,COUNT(a.nim) as jum 
from (select b.kode_jur,b.nim,a.kode_lokasi 
from aka_bill_d a
inner join aka_mahasiswa b on a.nim=b.nim and a.kode_lokasi=b.kode_lokasi
where a.kode_lokasi='$kode_lokasi' and a.periode='201502'
group by b.kode_jur,b.nim,a.kode_lokasi 
	  )a
group by a.kode_jur,a.kode_lokasi
		  )b on a.kode_jur=b.kode_jur and a.kode_lokasi=b.kode_lokasi
left join (select a.kode_pp,a.kode_lokasi,sum(a.jumlah) as jum
		from exs_pdpt_ppbs a
		where a.kode_lokasi='$kode_lokasi' and a.periode='201502'
		group by a.kode_pp,a.kode_lokasi
		   )c on a.kode_jur=c.kode_pp and a.kode_lokasi=c.kode_lokasi
where a.kode_lokasi='$kode_lokasi' and a.kode_jur='$kode_jurusan'
order by a.kode_jur";
		
		$rs = $dbLib->execute($sql);
		$i = $start+1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$content = "<div align='center' style='width:100%;overflow:auto'>"; 
		$content .= $AddOnLib->judul_laporan("laporan student body prodi",$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
		$content .= "<table border='1' cellspacing='0' cellpadding='0' class='table table-striped table-hover' style='border-collapse : collapse;bordercolor : #111111;'>
  <tr class='info'>
    <td width='30'  class='header_laporan' align='center'>No</td>
    <td width='50' class='header_laporan' align='center'>Kode </td>
    <td width='300' class='header_laporan' align='center'>Nama Fakultas</td>
    <td width='80' class='header_laporan' align='center'>Target</td>
    <td width='80' class='header_laporan' align='center'>Realisasi</td>
	<td width='80' class='header_laporan' align='center'>Deviasi</td>
	<td width='60' class='header_laporan' align='center'>% Pencapaian</td>
  </tr>
  ";
		$deviasi=0; $n2=0; $n4=0;
		$i=1;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$n2+=$row->n2;
			$n4+=$row->n4;
			$deviasi+=$row->deviasi;
			$persen=0;
			if ($row->n2!=0)
			{
				$persen=($row->n4/$row->n2)*100;
			}
			$content .= "<tr>
    <td class='isi_laporan' align='center'>$i</td>
    <td class='isi_laporan'>$row->kode_jur</td>
    <td class='isi_laporan'>$row->nama</td>
	<td class='isi_laporan' align='right'>".number_format($row->n2,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n4,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->deviasi,0,',','.')."</td>
	<td class='isi_laporan' align='center'>".number_format($persen,0,',','.')."%</td>
  </tr>";
			
			$i=$i+1;
		}
	
	$content .= "<tr>
    <td height='20' colspan='3' class='sum_laporan' align='right'>Total</td>
    <td class='sum_laporan' align='right'>".number_format($n2,0,',','.')."</td>
    <td class='sum_laporan' align='right'>".number_format($n4,0,',','.')."</td>
    <td class='sum_laporan' align='right'>".number_format($deviasi,0,',','.')."</td>
    <td class='sum_laporan' align='center'>".number_format($persen,0,',','.')."%</td>
</tr>";
		$content .= "</table>";
	
		$content .= "</div>";
		return $content;
	}
	
}
?>
