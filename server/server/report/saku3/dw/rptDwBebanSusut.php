<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_dw_rptDwBebanSusut extends server_report_basic
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
		$periode_awal=$tahun.'01';
		$i = $start+1;
		
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("laporan Proporsi Beban Penyusutan",$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' style='border-collapse: collapse' bordercolor='#111111'>
  <tr bgcolor='#CCCCCC'>
    <td width='50' class='header_laporan' align='center'>Kode Prodi</td>
    <td width='300' class='header_laporan' align='center'>Nama Prodi / Fakultas</td>
    <td width='60' class='header_laporan' align='center'>Area Fakultas</td>
    <td width='60' class='header_laporan' align='center'>% Proporsi Area Fakultas</td>
	<td width='60' class='header_laporan' align='center'>Student Body</td>
	<td width='60' class='header_laporan' align='center'>% Proporsi Student Body</td>
	<td width='60' class='header_laporan' align='center'>Tarif Beban Penyusutan</td>
	<td width='100' class='header_laporan' align='center'>Proporsi Sharing Beban Penyusutan Gedung Bangunan</td>
	<td width='100' class='header_laporan' align='center'>Proporsi Sharing Beban Penyusutan Sarana Pendidikan</td>
	<td width='100' class='header_laporan' align='center'>Proporsi Sharing Beban Penyusutan Inventaris Kantor</td>
	<td width='100' class='header_laporan' align='center'>Proporsi Sharing Beban Penyusutan Alat Pengolah Data</td>
	<td width='100' class='header_laporan' align='center'>Total Beban Penyusutan</td>
  </tr>
  ";
		$sql="select a.kode_akun,sum(a.debet) as nilai 
from exs_glma a
where (a.periode between '$periode_awal' and '$periode') and a.kode_akun in ('5712101','5712103','5712104','5712105')
group by a.kode_akun ";
		
		$rs2 = $dbLib->execute($sql);$jum=0;$tbp=0;
		while ($row2 = $rs2->FetchNextObject($toupper=false))
		{
			$bp[$jum]=$row2->nilai;
			$jum=$jum+1;
			$tbp+=$row2->nilai;
		}
		
		$sql = "select a.kode_fakultas,a.kode_lokasi,a.nama,b.area,b.persen*100 as persen 
		from exs_fakultas a
		inner join exs_fakultas_area b on a.kode_fakultas=b.kode_fakultas and a.kode_lokasi=b.kode_lokasi
		where a.kode_lokasi='$kode_lokasi'
order by a.kode_fakultas ";

		$rs2 = $dbLib->execute($sql);
		
		$area=0; $persen=0;$pn2=0;
		while ($row2 = $rs2->FetchNextObject($toupper=false))
		{
			$area+=$row2->area;
			$persen+=$row2->persen;
			
			$sql = "select a.kode_pp,b.nama,a.n1,a.n2,a.p1,a.p2,a.n1-a.n2 as deviasi,a.p3*100 as p3,a.p4*100 as p4
			from exs_pdpt_ppbs a
			inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
			inner join exs_bidang c on b.kode_bidang=c.kode_bidang and b.kode_lokasi=c.kode_lokasi
			inner join exs_fakultas_bidang d on c.kode_bidang=d.kode_bidang and c.kode_lokasi=d.kode_lokasi
			where a.kode_lokasi='$kode_lokasi' and d.kode_fakultas='$row2->kode_fakultas' and a.periode='201502'
			order by a.kode_pp ";
			$rs = $dbLib->execute($sql);
			$tn2=0;$tp3=0; $tp4=0;
			while ($row = $rs->FetchNextObject($toupper=false))
			{
					$tn2+=$row->n2;
					$tp3+=$row->p3;
					$tp4+=$row->p4;
					$pn2+=$row->n2;
					
					$tpersen+=$persen;
					echo "<tr>
			
			<td class='isi_laporan' align='center'>$row->kode_pp</td>
			<td class='isi_laporan'>$row->nama</td>
			<td class='isi_laporan' align='right'></td>
			<td class='isi_laporan' align='right'></td>
			<td class='isi_laporan' align='right'>".number_format($row->n2,0,',','.')."</td>
			<td class='isi_laporan' align='center'>".number_format($row->p3,2,',','.')."%</td>
			<td class='isi_laporan' align='center'>".number_format($row->p4,2,',','.')."%</td>
			<td class='isi_laporan' align='right'>".number_format(($row->p4/100)*$bp[0],0,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format(($row->p4/100)*$bp[1],0,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format(($row->p4/100)*$bp[2],0,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format(($row->p4/100)*$bp[3],0,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format(($row->p4/100)*$tbp,0,',','.')."</td>
		  </tr>";
			}
			
		
			echo "<tr>
			
			<td class='header_laporan' align='center'>$row2->kode_fakultas</td>
			<td class='header_laporan'>$row2->nama</td>
			<td class='header_laporan' align='right'>".number_format($row2->area,0,',','.')."</td>
			<td class='header_laporan' align='right'>".number_format($row2->persen,0,',','.')."%</td>
			<td class='header_laporan' align='right'>".number_format($tn2,0,',','.')."</td>
			<td class='header_laporan' align='center'>".number_format($tp3,2,',','.')."%</td>
			<td class='header_laporan' align='center'>".number_format($tp4,2,',','.')."%</td>
			<td class='sum_laporan' align='right'>".number_format(($tp4/100)*$bp[0],0,',','.')."</td>
			<td class='sum_laporan' align='right'>".number_format(($tp4/100)*$bp[1],0,',','.')."</td>
			<td class='sum_laporan' align='right'>".number_format(($tp4/100)*$bp[2],0,',','.')."</td>
			<td class='sum_laporan' align='right'>".number_format(($tp4/100)*$bp[3],0,',','.')."</td>
			<td class='sum_laporan' align='right'>".number_format(($tp4/100)*$tbp,0,',','.')."</td>
		  </tr>";
			$i=$i+1;
		}
		
	echo "<tr>
    <td height='20' colspan='2' class='sum_laporan' align='center'>Total Telkom University</td>
    <td class='sum_laporan' align='right'>".number_format($area,0,',','.')."</td>
    <td class='sum_laporan' align='right'>".number_format($persen,0,',','.')."%</td>
    <td class='sum_laporan' align='right'>".number_format($pn2,0,',','.')."</td>
    <td class='sum_laporan' align='center'></td>
	<td class='sum_laporan' align='center'>&nbsp;</td>
    <td class='sum_laporan' align='right'>".number_format($bp[0],0,',','.')."</td>
	<td class='sum_laporan' align='right'>".number_format($bp[1],0,',','.')."</td>
	<td class='sum_laporan' align='right'>".number_format($bp[2],0,',','.')."</td>
	<td class='sum_laporan' align='right'>".number_format($bp[3],0,',','.')."</td>
	<td class='sum_laporan' align='right'>".number_format($tbp,0,',','.')."</td>
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
