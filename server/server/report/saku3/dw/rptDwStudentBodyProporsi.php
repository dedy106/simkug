<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_dw_rptDwStudentBodyProporsi extends server_report_basic
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
		$bentuk=$tmp[2];
		$tahun=substr($periode,0,4);
		
		$i = $start+1;
		
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("laporan student body prodi",$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' style='border-collapse: collapse' bordercolor='#111111'>
  <tr bgcolor='#CCCCCC'>
    <td width='50' class='header_laporan' align='center'>Kode Prodi</td>
    <td width='300' class='header_laporan' align='center'>Nama Prodi / Fakultas</td>
    <td width='60' class='header_laporan' align='center'>Target</td>
    <td width='60' class='header_laporan' align='center'>Realisasi</td>
	<td width='60' class='header_laporan' align='center'>Deviasi</td>
	<td width='60' class='header_laporan' align='center'>% Pencapaian</td>
	<td width='60' class='header_laporan' align='center'>Proporsi thd Fakultas</td>
	<td width='60' class='header_laporan' align='center'>Proporsi thd seluruh Fakultas</td>
  </tr>
  ";
		$sql = "select a.kode_fakultas,a.kode_lokasi,a.nama 
		from exs_fakultas a
		where a.kode_lokasi='$kode_lokasi'
order by a.kode_fakultas ";

		$rs2 = $dbLib->execute($sql);
		
		$tdeviasi=0; $tn1=0; $tn2=0; $tp1=0; $tp2=0;
		while ($row2 = $rs2->FetchNextObject($toupper=false))
		{
			$sql = "select a.kode_pp,b.nama,a.n1,a.n2,a.p1,a.p2,a.n1-a.n2 as deviasi
			from exs_pdpt_ppbs a
			inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
			inner join exs_bidang c on b.kode_bidang=c.kode_bidang and b.kode_lokasi=c.kode_lokasi
			inner join exs_fakultas_bidang d on c.kode_bidang=d.kode_bidang and c.kode_lokasi=d.kode_lokasi
			where a.kode_lokasi='$kode_lokasi' and d.kode_fakultas='$row2->kode_fakultas' and a.periode='201502'
			order by a.kode_pp ";
			$rs = $dbLib->execute($sql);
			$deviasi=0; $n1=0; $n2=0; $p1=0; $p2=0;
			while ($row = $rs->FetchNextObject($toupper=false))
			{
					$n1+=$row->n1;
					$n2+=$row->n2;
					$p1+=$row->p1;
					$p2+=$row->p2;
					$deviasi+=$row->deviasi;
					$tn1+=$row->n1;
					$tn2+=$row->n2;
					$tp1+=$row->p1;
					$tp2+=$row->p2;
					$tdeviasi+=$row->deviasi;
					
					if ($row->n1!=0)
					{
						$persen=($row->n2/$row->n1)*100;
					}
					$tpersen+=$persen;
					echo "<tr>
			
			<td class='isi_laporan' align='center'>$row->kode_pp</td>
			<td class='isi_laporan'>$row->nama</td>
			<td class='isi_laporan' align='right'>".number_format($row->n1,0,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format($row->n2,0,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format($row->deviasi,0,',','.')."</td>
			<td class='isi_laporan' align='center'>".number_format($persen,2,',','.')."%</td>
			<td class='isi_laporan' align='center'>".number_format($row->p1,2,',','.')."%</td>
			<td class='isi_laporan' align='center'>".number_format($row->p2,2,',','.')."%</td>
		  </tr>";
			}
			if ($n1!=0)
			{
				$persen=($n2/$n1)*100;
			}
			echo "<tr>
			
			<td class='header_laporan' align='center'>$row2->kode_fakultas</td>
			<td class='header_laporan'>$row2->nama</td>
			<td class='header_laporan' align='right'>".number_format($n1,0,',','.')."</td>
			<td class='header_laporan' align='right'>".number_format($n2,0,',','.')."</td>
			<td class='header_laporan' align='right'>".number_format($deviasi,0,',','.')."</td>
			<td class='header_laporan' align='center'>".number_format($persen,2,',','.')."%</td>
			<td class='header_laporan' align='center'>".number_format($p1,2,',','.')."%</td>
			<td class='header_laporan' align='center'>".number_format($p2,2,',','.')."%</td>
		  </tr>";
			$i=$i+1;
		}
		if ($tn1!=0)
		{
			$persen=($tn2/$tn1)*100;
		}
	echo "<tr>
    <td height='20' colspan='2' class='sum_laporan' align='center'>Total Telkom University</td>
    <td class='sum_laporan' align='right'>".number_format($tn1,0,',','.')."</td>
    <td class='sum_laporan' align='right'>".number_format($tn2,0,',','.')."</td>
    <td class='sum_laporan' align='right'>".number_format($tdeviasi,0,',','.')."</td>
    <td class='sum_laporan' align='center'>".number_format($persen,2,',','.')."</td>
	<td class='sum_laporan' align='center'>&nbsp;</td>
    <td class='sum_laporan' align='center'>".number_format($tp2,2,',','.')."%</td>
</tr>";
		echo "</table></div>";
		return "";
	}
	
	function getHtml2()
	{
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$bentuk=$tmp[2];
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
where a.kode_lokasi='$kode_lokasi' 
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
    <td width='50' class='header_laporan' align='center'>Kode Prodi</td>
    <td width='300' class='header_laporan' align='center'>Nama Prodi</td>
    <td width='80' class='header_laporan' align='center'>Target</td>
    <td width='80' class='header_laporan' align='center'>Realisasi</td>
	<td width='80' class='header_laporan' align='center'>Deviasi</td>
	<td width='60' class='header_laporan' align='center'>% Pencapaian</td>
  </tr>
  ";
		$deviasi=0; $n1=0; $n2=0;
		$i=1;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$n1+=$row->n1;
			$n2+=$row->n2;
			$deviasi+=$row->deviasi;
			$persen=0;
			if ($row->n1!=0)
			{
				$persen=($row->n2/$row->n1)*100;
			}
			$content .= "<tr>
  
    <td class='isi_laporan'>$row->kode_pp</td>
    <td class='isi_laporan'>$row->nama</td>
	<td class='isi_laporan' align='right'>".number_format($row->n1,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n2,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->deviasi,0,',','.')."</td>
	<td class='isi_laporan' align='center'>".number_format($persen,0,',','.')."%</td>
  </tr>";
			
			$i=$i+1;
		}
	
	$content .= "<tr>
    <td height='20' colspan='2' class='sum_laporan' align='right'>Total</td>
    <td class='sum_laporan' align='right'>".number_format($n2,0,',','.')."</td>
    <td class='sum_laporan' align='right'>".number_format($n4,0,',','.')."</td>
    <td class='sum_laporan' align='right'>".number_format($deviasi,0,',','.')."</td>
    <td class='sum_laporan' align='center'>".number_format($persen,0,',','.')."%</td>
</tr>";
		$content .= "</table></div>";
		return $content;
	}
	
}
?>
