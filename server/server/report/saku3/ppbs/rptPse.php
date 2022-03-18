<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_ppbs_rptPse extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select 1";
		
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
		$jenis=$tmp[1];
		$tahun=$tmp[2];
		$nama_file="drk.xls";
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
	
		
		
		//echo $sql;
		$sql="select a.nama,a.kode_bidang,isnull(b.nilai,0) as pdpt,isnull(c.nilai,0) as beban,isnull(d.nilai,0) as sdm,
		isnull(e.nilai,0) as susut,isnull(c.nilai,0)-isnull(d.nilai,0)-isnull(e.nilai,0) as lain,
		isnull(b.nilai,0)-isnull(c.nilai,0) as shu,
		case when isnull(b.nilai,0)>0 then (isnull(c.nilai,0)/isnull(b.nilai,0))*100 else 0 end as por
  from bidang a
  left join (select a.kode_lokasi,c.kode_bidang,sum(a.total) as nilai
		  from agg_d a
		  inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
		  inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
		  where a.kode_lokasi='$kode_lokasi' and SUBSTRING(a.periode,1,4)='$tahun' and b.jenis='Pendapatan' 
		  group by a.kode_lokasi,c.kode_bidang		
		  )b on a.kode_bidang=b.kode_bidang and a.kode_lokasi=b.kode_lokasi
  left join (select a.kode_lokasi,c.kode_bidang,sum(a.total) as nilai
		  from agg_d a
		  inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
		  inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
		  where a.kode_lokasi='$kode_lokasi' and SUBSTRING(a.periode,1,4)='$tahun' and b.jenis='Beban' 
		  group by a.kode_lokasi,c.kode_bidang		
		  )c on a.kode_bidang=c.kode_bidang and a.kode_lokasi=c.kode_lokasi	
  left join (select a.kode_lokasi,c.kode_bidang,sum(a.total) as nilai
		  from agg_d a
		  inner join relakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
		  inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
		  where a.kode_lokasi='$kode_lokasi' and SUBSTRING(a.periode,1,4)='$tahun' and b.kode_fs='FS1' 
			   and b.kode_neraca in ('51101','51102','51103','51104','51106','51107','51108','511051','511052')
		  group by a.kode_lokasi,c.kode_bidang
		  )d on a.kode_bidang=d.kode_bidang and a.kode_lokasi=d.kode_lokasi	
  left join (select a.kode_lokasi,c.kode_bidang,sum(a.total) as nilai
		  from agg_d a
		  inner join relakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
		  inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
		  where a.kode_lokasi='$kode_lokasi' and SUBSTRING(a.periode,1,4)='$tahun' and b.kode_fs='FS1' and b.kode_neraca='5202'
		  group by a.kode_lokasi,c.kode_bidang
		  )e on a.kode_bidang=e.kode_bidang and a.kode_lokasi=e.kode_lokasi
  where a.kode_lokasi='$kode_lokasi' and isnull(c.nilai,0)>0
  order by a.kode_bidang";
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("LABARUGI",$this->lokasi,"Tahun $tahun");
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1100'>
   <tr bgcolor='#CCCCCC'>
	  <td width='250'  align='center' class='header_laporan' height='25'>Nama PP</td>
	 <td width='100'  align='center' class='header_laporan'>Pendapatan</td>
     <td width='100'  align='center' class='header_laporan'>Beban</td>
	 <td width='100'  align='center' class='header_laporan'>Beban SDM</td>
     <td width='100'  align='center' class='header_laporan'>Beban Penyusutan</td>
	 <td width='100'  align='center' class='header_laporan'>Beban Non</td>
	 <td width='100'  align='center' class='header_laporan'>SHU</td>
	 <td width='50'  align='center' class='header_laporan'>OR</td>
	  </tr>  ";
		$pdpt=0; $beban=0; $sdm=0; $susut=0; $lain=0; $shu=0; 
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$pdpt+=$row->pdpt;
			$beban+=$row->beban;
			$sdm+=$row->sdm;
			$susut+=$row->susut;
			$lain+=$row->lain;
			$shu+=$row->shu;
			echo "<tr bgcolor='#dbeef3'>
		<td class='isi_laporan'>$row->nama</td>
		<td class='isi_laporan' align='right'>".number_format($row->pdpt,0,',','.')."</td>
		<td class='isi_laporan' align='right'>".number_format($row->beban,0,',','.')."</td>
		<td class='isi_laporan' align='right'>".number_format($row->sdm,0,',','.')."</td>
		<td class='isi_laporan' align='right'>".number_format($row->susut,0,',','.')."</td>
		<td class='isi_laporan' align='right'>".number_format($row->lain,0,',','.')."</td>
		<td class='isi_laporan' align='right'>".number_format($row->shu,0,',','.')."</td>
		<td class='isi_laporan' align='center'>".number_format($row->por,2,',','.')."%</td>
		</tr>";
			$sql2="select a.kode_pp,a.nama,isnull(b.nilai,0) as pdpt,isnull(c.nilai,0) as beban,isnull(d.nilai,0) as sdm,
				isnull(e.nilai,0) as susut,isnull(c.nilai,0)-isnull(d.nilai,0)-isnull(e.nilai,0) as lain,
				isnull(b.nilai,0)-isnull(c.nilai,0) as shu,
				case when isnull(b.nilai,0)>0 then (isnull(c.nilai,0)/isnull(b.nilai,0))*100 else 0 end as por
			from pp a
			left join (select a.kode_lokasi,a.kode_pp,sum(a.total) as nilai
				from agg_d a
				inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
				inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
				where a.kode_lokasi='$kode_lokasi' and SUBSTRING(a.periode,1,4)='$tahun' and b.jenis='Pendapatan' and c.kode_bidang='$row->kode_bidang'
				group by a.kode_lokasi,a.kode_pp		
				)b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
			left join (select a.kode_lokasi,a.kode_pp,sum(a.total) as nilai
				from agg_d a
				inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
				inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
				where a.kode_lokasi='$kode_lokasi' and SUBSTRING(a.periode,1,4)='$tahun' and b.jenis='Beban' and c.kode_bidang='$row->kode_bidang'
				group by a.kode_lokasi,a.kode_pp		
				)c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi	
			left join (select a.kode_lokasi,a.kode_pp,sum(a.total) as nilai
				from agg_d a
				inner join relakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
				inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
				where a.kode_lokasi='$kode_lokasi' and SUBSTRING(a.periode,1,4)='$tahun' and b.kode_fs='FS1' 
						and b.kode_neraca in ('51101','51102','51103','51104','51106','51107','51108','511051','511052') and c.kode_bidang='$row->kode_bidang'
				group by a.kode_lokasi,a.kode_pp
				)d on a.kode_pp=d.kode_pp and a.kode_lokasi=d.kode_lokasi	
			left join (select a.kode_lokasi,a.kode_pp,sum(a.total) as nilai
				from agg_d a
				inner join relakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
				inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
				where a.kode_lokasi='$kode_lokasi' and SUBSTRING(a.periode,1,4)='$tahun' and b.kode_fs='FS1' and b.kode_neraca='5202' and c.kode_bidang='$row->kode_bidang'
				group by a.kode_lokasi,a.kode_pp
				)e on a.kode_pp=e.kode_pp and a.kode_lokasi=e.kode_lokasi
			where a.kode_lokasi='$kode_lokasi' and a.kode_bidang='$row->kode_bidang'
			order by a.kode_pp";
			$rs2 = $dbLib->execute($sql2);
			while ($row2 = $rs2->FetchNextObject($toupper=false))
			{
				echo "<tr >
				<td class='isi_laporan'>&nbsp;&nbsp;&nbsp;&nbsp;$row2->nama</td>
				<td class='isi_laporan' align='right'>".number_format($row2->pdpt,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->beban,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->sdm,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->susut,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->lain,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->shu,0,',','.')."</td>
				<td class='isi_laporan' align='center'>".number_format($row2->por,2,',','.')."%</td>
				</tr>";
			}
			$i=$i+1;
		}
		
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
