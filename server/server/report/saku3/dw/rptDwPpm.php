<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_dw_rptDwPpm extends server_report_basic
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
		$tahun=substr($periode,0,4);
		$sql = "select a.kode_lap,a.kode_lokasi,a.nama,ISNULL(b.n1,0) as n2,ISNULL(c.n2,0) as n4
from exs_lap_m a
left join (select a.kode_lap,a.kode_lokasi,
				  sum(case when a.jenis='SA' then b.nilai else 0 end) as n1
		   from exs_lap_d a
		   inner join exs_gar_orgi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
		   inner join exs_lap_m c on a.kode_lap=c.kode_lap and a.kode_lokasi=c.kode_lokasi
		   where a.kode_lokasi='$kode_lokasi' and c.kode_klp='K02' and a.dc='D'  and substring(b.periode,1,4)='$tahun'
		   group by a.kode_lap,a.kode_lokasi
		   )b on a.kode_lap=b.kode_lap and a.kode_lokasi=b.kode_lokasi
left join (select a.kode_lap,a.kode_lokasi,
				  sum(case when a.jenis='SA' then b.so_akhir else b.debet-b.kredit end) as n2
		   from exs_lap_d a
		   inner join exs_glma b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
		   inner join exs_lap_m c on a.kode_lap=c.kode_lap and a.kode_lokasi=c.kode_lokasi
		   where a.kode_lokasi='$kode_lokasi' and c.kode_klp='K02' and a.dc='D' and b.periode='$periode'
		   group by a.kode_lap,a.kode_lokasi
		   )c on a.kode_lap=c.kode_lap and a.kode_lokasi=c.kode_lokasi
where a.kode_klp='K02'
order by a.kode_klp";
		
		$rs = $dbLib->execute($sql);
		$i = $start+1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("laporan BIAYA PENELITIAN"."<br>".$nama_akun,$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' style='border-collapse: collapse' bordercolor='#111111'>
  <tr bgcolor='#CCCCCC'>
    <td width='30'  class='header_laporan' align='center'>NO</td>
    <td width='300' class='header_laporan' align='center'>URAIAN</td>
    <td width='100' class='header_laporan' align='center'>ANGGARAN RKA</td>
    <td width='100' class='header_laporan' align='center'>REALISASI</td>
    <td width='60' class='header_laporan' align='center'>RASIO</td>
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
    <td class='isi_laporan'>$row->nama</td>
	<td class='isi_laporan' align='right'>".number_format($row->n2,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n4,0,',','.')."</td>
	<td class='isi_laporan' align='center'>".number_format($persen,2,',','.')."</td>
  </tr>";
			
			$i=$i+1;
		}
	
	echo "<tr>
    <td height='20' colspan='2' class='sum_laporan' align='right'>Total</td>
    <td class='sum_laporan' align='right'>".number_format($n2,0,',','.')."</td>
    <td class='sum_laporan' align='right'>".number_format($n4,0,',','.')."</td>
	<td class='isi_laporan' align='center'>".number_format($persen,2,',','.')."</td>
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
		$kode_akun=$tmp[2];
		$kode_fakultas=$tmp[3];
		$sql="select nama from masakun where kode_akun='$kode_akun' and kode_lokasi='$kode_lokasi'";
		
		$rs = $dbLib->execute($sql);
		$row = $rs->FetchNextObject($toupper=false);
		$nama_akun=$row->nama;
		$sql = "select a.kode_pp,a.nama,ISNULL(b.n2*-1,0) as n2,ISNULL(b.n4*-1,0) as n4,ISNULL(b.n4*-1,0)-ISNULL(b.n2*-1,0) as deviasi
from exs_pp a
left join (select a.kode_pp,a.kode_lokasi,a.kode_akun,sum(n2) as n2,sum(n4) as n4 
from exs_glma_gar_pp a
$this->filter
group by a.kode_pp,a.kode_lokasi,a.kode_akun
		  )b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
where a.kode_lokasi='$kode_lokasi' and (ISNULL(b.n2,0)<>0 or ISNULL(b.n4,0)<>0)";
		
		$rs = $dbLib->execute($sql);
		$i = $start+1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$content = "<div align='center' style='width:100%;overflow:auto'>"; 
		$content .= $AddOnLib->judul_laporan("laporan pencapaian pendapatan"."<br>".$nama_akun,$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
		$content .= "<table border='1' cellspacing='0' cellpadding='0' class='table table-striped table-hover' style='border-collapse : collapse;bordercolor : #111111;'>
  <tr class='info'>
    <td width='30'  class='header_laporan' align='center'>No</td>
    <td width='50' class='header_laporan' align='center'>Kode PP</td>
    <td width='300' class='header_laporan' align='center'>Nama PP</td>
    <td width='100' class='header_laporan' align='center'>RKA TW 1</td>
    <td width='100' class='header_laporan' align='center'>Realisai TW 1 </td>
	<td width='100' class='header_laporan' align='center'>Deviasi</td>
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
    <td class='isi_laporan'>$row->kode_pp</td>
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
		$content .= "</table></div>";
		return $content;
	}
	
	
}
?>
