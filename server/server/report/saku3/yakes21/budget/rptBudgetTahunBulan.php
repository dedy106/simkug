<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_yakes21_budget_rptBudgetTahunBulan extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$sql = "select 1 ";
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
		$kode_lokasi=$tmp[0];
		$tahun=$tmp[1];
		$nik_user=$tmp[2];
		$jenis_akun=$tmp[3];
		$jenis=$tmp[4];
		$nama_file="komparasi_bulan_".$tahun.".xls";
		
		$sql="exec sp_akundrk '$kode_lokasi','$tahun','$nik_user'";
		$rs = $dbLib->execute($sql);
		//echo $sql;
		
		if ($jenis_akun=="Investasi") {
			$jenis_akun="Neraca"; 
		}
		$sql = "select  a.kode_lokasi,a.kode_akun,a.kode_pp,a.kode_drk,
	   b.nama as nama_akun,c.nama as nama_pp,d.nama as nama_drk,a.tahun,
	   isnull(e.agg_01,0) as n1,isnull(e.agg_02,0) as n2,isnull(e.agg_03,0) as n3,isnull(e.agg_04,0) as n4,isnull(e.agg_05,0) as n5,isnull(e.agg_06,0) as n6
		 ,isnull(e.agg_07,0) as n7,isnull(e.agg_08,0) as n8,isnull(e.agg_09,0) as n9,isnull(e.agg_10,0) as n10,isnull(e.agg_11,0) as n11,isnull(e.agg_12,0) as n12
         ,isnull(f.real_01,0) as n13,isnull(f.real_02,0) as n14,isnull(f.real_03,0) as n15,isnull(f.real_04,0) as n16,isnull(f.real_05,0) as n17,isnull(f.real_06,0) as n18
		 ,isnull(f.real_07,0) as n19,isnull(f.real_08,0) as n20,isnull(f.real_09,0) as n21,isnull(f.real_10,0) as n22,isnull(f.real_11,0) as n23,isnull(f.real_12,0) as n24
from akundrk a
inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
inner join drk d on a.kode_drk=d.kode_drk and a.tahun=d.tahun and a.kode_lokasi=d.kode_lokasi
left join (select x.kode_lokasi,x.kode_akun,x.kode_pp,x.kode_drk
	  , sum(case when substring(x.periode,5,2) ='01' then case when dc='D' then nilai else -nilai end else 0 end ) as agg_01
      , sum(case when substring(x.periode,5,2) ='02' then case when dc='D' then nilai else -nilai end else 0 end ) as agg_02
	  , sum(case when substring(x.periode,5,2) ='03' then case when dc='D' then nilai else -nilai end else 0 end ) as agg_03
	  , sum(case when substring(x.periode,5,2) ='04' then case when dc='D' then nilai else -nilai end else 0 end ) as agg_04
	  , sum(case when substring(x.periode,5,2) ='05' then case when dc='D' then nilai else -nilai end else 0 end ) as agg_05
      , sum(case when substring(x.periode,5,2) ='06' then case when dc='D' then nilai else -nilai end else 0 end ) as agg_06
	  , sum(case when substring(x.periode,5,2) ='07' then case when dc='D' then nilai else -nilai end else 0 end ) as agg_07
	  , sum(case when substring(x.periode,5,2) ='08' then case when dc='D' then nilai else -nilai end else 0 end ) as agg_08
	  , sum(case when substring(x.periode,5,2) ='09' then case when dc='D' then nilai else -nilai end else 0 end ) as agg_09
      , sum(case when substring(x.periode,5,2) ='10' then case when dc='D' then nilai else -nilai end else 0 end ) as agg_10
	  , sum(case when substring(x.periode,5,2) ='11' then case when dc='D' then nilai else -nilai end else 0 end ) as agg_11
	  , sum(case when substring(x.periode,5,2) ='12' then case when dc='D' then nilai else -nilai end else 0 end ) as agg_12
	from anggaran_d x
	where x.kode_lokasi='$kode_lokasi'  and substring(x.periode,1,4)='$tahun'
	group by x.kode_lokasi,x.kode_akun,x.kode_pp,x.kode_drk
	)e on a.kode_akun=e.kode_akun and a.kode_pp=e.kode_pp and a.kode_drk=e.kode_drk and a.kode_lokasi=e.kode_lokasi
left join (select x.kode_lokasi,x.kode_akun,x.kode_pp,x.kode_drk
       , sum(case when substring(x.periode1,5,2) ='01' then case when x.dc='D' then x.nilai else -x.nilai end else 0 end ) as real_01
       , sum(case when substring(x.periode1,5,2) ='02' then case when x.dc='D' then x.nilai else -x.nilai end else 0 end ) as real_02
	   , sum(case when substring(x.periode1,5,2) ='03' then case when x.dc='D' then x.nilai else -x.nilai end else 0 end ) as real_03
	   , sum(case when substring(x.periode1,5,2) ='04' then case when x.dc='D' then x.nilai else -x.nilai end else 0 end ) as real_04
	   , sum(case when substring(x.periode1,5,2) ='05' then case when x.dc='D' then x.nilai else -x.nilai end else 0 end ) as real_05
       , sum(case when substring(x.periode1,5,2) ='06' then case when x.dc='D' then x.nilai else -x.nilai end else 0 end ) as real_06
	   , sum(case when substring(x.periode1,5,2) ='07' then case when x.dc='D' then x.nilai else -x.nilai end else 0 end ) as real_07
	   , sum(case when substring(x.periode1,5,2) ='08' then case when x.dc='D' then x.nilai else -x.nilai end else 0 end ) as real_08
	   , sum(case when substring(x.periode1,5,2) ='09' then case when x.dc='D' then x.nilai else -x.nilai end else 0 end ) as real_09
       , sum(case when substring(x.periode1,5,2) ='10' then case when x.dc='D' then x.nilai else -x.nilai end else 0 end ) as real_10
	   , sum(case when substring(x.periode1,5,2) ='11' then case when x.dc='D' then x.nilai else -x.nilai end else 0 end ) as real_11
	   , sum(case when substring(x.periode1,5,2) ='12' then case when x.dc='D' then x.nilai else -x.nilai end else 0 end ) as real_12
	from angg_r x
	where x.kode_lokasi='$kode_lokasi' and substring(x.periode1,1,4)='$tahun'
	group by x.kode_lokasi,x.kode_akun,x.kode_pp,x.kode_drk
	)f on a.kode_akun=f.kode_akun and a.kode_pp=f.kode_pp and a.kode_drk=f.kode_drk and a.kode_lokasi=f.kode_lokasi
$this->filter and a.nik_user='$nik_user' and b.jenis='$jenis_akun'
order by a.kode_akun";
		//echo $sql;
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
		
		$rs = $dbLib->execute($sql);
		
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		
		$i = 1;
		
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("laporan realisasi komparasi anggaran",$this->lokasi,"Tahun $tahun");
		echo "<table width='4000' border='1' cellpadding='0' cellspacing='0' bordercolor='#111111' class='kotak'>
<tr>
    <td rowspan='2' bgcolor='#CCCCCC' class='header_laporan'><div align='center'>No</div></td>
    <td rowspan='2' bgcolor='#CCCCCC' class='header_laporan'><div align='center'>Kode Akun</div></td>
<td rowspan='2' bgcolor='#CCCCCC' class='header_laporan'><div align='center'>Nama Akun</div></td>
    <td rowspan='2' bgcolor='#CCCCCC' class='header_laporan'><div align='center'>Kode PP </div></td>
<td rowspan='2' bgcolor='#CCCCCC' class='header_laporan'><div align='center'>Nama PP</div></td>
    <td rowspan='2' bgcolor='#CCCCCC' class='header_laporan'><div align='center'>Kode DRK</div></td>
<td rowspan='2' bgcolor='#CCCCCC' class='header_laporan'><div align='center'>Nama DRK</div></td>
    <td height='20' colspan='3' bgcolor='#CCCCCC' class='header_laporan'><div align='center'>Januari</div></td>
    <td colspan='3' bgcolor='#CCCCCC' class='header_laporan'><div align='center'>Februari</div></td>
    <td colspan='3' bgcolor='#CCCCCC' class='header_laporan'><div align='center'>Maret </div></td>
    <td colspan='3' bgcolor='#CCCCCC' class='header_laporan'><div align='center'>April</div></td>
	<td colspan='3' bgcolor='#CCCCCC' class='header_laporan'><div align='center'>Mei</div></td>
    <td colspan='3' bgcolor='#CCCCCC' class='header_laporan'><div align='center'>Juni </div></td>
    <td colspan='3' bgcolor='#CCCCCC' class='header_laporan'><div align='center'>Juli</div></td>
	<td colspan='3' bgcolor='#CCCCCC' class='header_laporan'><div align='center'>Agustus</div></td>
    <td colspan='3' bgcolor='#CCCCCC' class='header_laporan'><div align='center'>September </div></td>
    <td colspan='3' bgcolor='#CCCCCC' class='header_laporan'><div align='center'>Oktober</div></td>
	<td colspan='3' bgcolor='#CCCCCC' class='header_laporan'><div align='center'>November</div></td>
    <td colspan='3' bgcolor='#CCCCCC' class='header_laporan'><div align='center'>Desember </div></td>
   </tr>
  <tr>
    <td width='80' height='20' bgcolor='#CCCCCC' class='header_laporan'><div align='center'>Anggaran</div></td>
    <td width='80' bgcolor='#CCCCCC' class='header_laporan'><div align='center'>Realisasi</div></td>
    <td width='80' bgcolor='#CCCCCC' class='header_laporan'><div align='center'>Sisa</div></td>
    <td width='80' bgcolor='#CCCCCC' class='header_laporan'><div align='center'>Anggaran</div></td>
    <td width='80' bgcolor='#CCCCCC' class='header_laporan'><div align='center'>Realisasi</div></td>
    <td width='80' bgcolor='#CCCCCC' class='header_laporan'><div align='center'>Sisa</div></td>
    <td width='80' bgcolor='#CCCCCC' class='header_laporan'><div align='center'>Anggaran</div></td>
    <td width='80' bgcolor='#CCCCCC' class='header_laporan'><div align='center'>Realisasi</div></td>
    <td width='80' bgcolor='#CCCCCC' class='header_laporan'><div align='center'>Sisa</div></td>
    <td width='80' bgcolor='#CCCCCC' class='header_laporan'><div align='center'>Anggaran</div></td>
    <td width='80' bgcolor='#CCCCCC' class='header_laporan'><div align='center'>Realisasi</div></td>
    <td width='80' bgcolor='#CCCCCC' class='header_laporan'><div align='center'>Sisa</div></td>
	 <td width='80' height='20' bgcolor='#CCCCCC' class='header_laporan'><div align='center'>Anggaran</div></td>
    <td width='80' bgcolor='#CCCCCC' class='header_laporan'><div align='center'>Realisasi</div></td>
    <td width='80' bgcolor='#CCCCCC' class='header_laporan'><div align='center'>Sisa</div></td>
    <td width='80' bgcolor='#CCCCCC' class='header_laporan'><div align='center'>Anggaran</div></td>
    <td width='80' bgcolor='#CCCCCC' class='header_laporan'><div align='center'>Realisasi</div></td>
    <td width='80' bgcolor='#CCCCCC' class='header_laporan'><div align='center'>Sisa</div></td>
    <td width='80' bgcolor='#CCCCCC' class='header_laporan'><div align='center'>Anggaran</div></td>
    <td width='80' bgcolor='#CCCCCC' class='header_laporan'><div align='center'>Realisasi</div></td>
    <td width='80' bgcolor='#CCCCCC' class='header_laporan'><div align='center'>Sisa</div></td>
    <td width='80' bgcolor='#CCCCCC' class='header_laporan'><div align='center'>Anggaran</div></td>
    <td width='80' bgcolor='#CCCCCC' class='header_laporan'><div align='center'>Realisasi</div></td>
    <td width='80' bgcolor='#CCCCCC' class='header_laporan'><div align='center'>Sisa</div></td>
	 <td width='80' height='20' bgcolor='#CCCCCC' class='header_laporan'><div align='center'>Anggaran</div></td>
    <td width='80' bgcolor='#CCCCCC' class='header_laporan'><div align='center'>Realisasi</div></td>
    <td width='80' bgcolor='#CCCCCC' class='header_laporan'><div align='center'>Sisa</div></td>
    <td width='80' bgcolor='#CCCCCC' class='header_laporan'><div align='center'>Anggaran</div></td>
    <td width='80' bgcolor='#CCCCCC' class='header_laporan'><div align='center'>Realisasi</div></td>
    <td width='80' bgcolor='#CCCCCC' class='header_laporan'><div align='center'>Sisa</div></td>
    <td width='80' bgcolor='#CCCCCC' class='header_laporan'><div align='center'>Anggaran</div></td>
    <td width='80' bgcolor='#CCCCCC' class='header_laporan'><div align='center'>Realisasi</div></td>
    <td width='80' bgcolor='#CCCCCC' class='header_laporan'><div align='center'>Sisa</div></td>
    <td width='80' bgcolor='#CCCCCC' class='header_laporan'><div align='center'>Anggaran</div></td>
    <td width='80' bgcolor='#CCCCCC' class='header_laporan'><div align='center'>Realisasi</div></td>
    <td width='80' bgcolor='#CCCCCC' class='header_laporan'><div align='center'>Sisa</div></td>
  </tr>";
		$i=$start+1;
		$n1=0;$n2=0;$n3=0;$sisa=0;$n4=0;$n5=0;$n6=0;$n7=0;$n8=0;$n9=0;$n10=0;$n11=0;$n12=0;
		$n13=0;$n14=0;$n15=0;$n16=0;$n17=0;$n18=0;$n19=0;$n20=0;$n21=0;$n22=0;$n23=0;$n24=0;
		$sisa=0;
		$sisa1=0;$sisatw2=0;$sisatw3=0;$sisatw4=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$n1=$n1+$row->n1;
			$n2=$n2+$row->n2;
			$n3=$n3+$row->n3;
			$n4=$n4+$row->n4;
			$n5=$n5+$row->n5;
			$n6=$n6+$row->n6;
			$n7=$n7+$row->n7;
			$n8=$n8+$row->n8;
			$n9=$n9+$row->n9;
			$n10=$n10+$row->n10;
			$n11=$n11+$row->n11;
			$n12=$n12+$row->n12;
			$n13=$n13+$row->n13;
			$n14=$n14+$row->n14;
			$n15=$n15+$row->n15;
			$n16=$n16+$row->n16;
			$n17=$n17+$row->n17;
			$n18=$n18+$row->n18;
			$n19=$n19+$row->n19;
			$n20=$n20+$row->n20;
			$n21=$n21+$row->n21;
			$n22=$n22+$row->n22;
			$n23=$n23+$row->n23;
			$n24=$n24+$row->n24;
			echo "<tr>
    <td width='25' class='header_laporan'><div align='center'>$i</div></td>
    <td width='70' height='20' class='isi_laporan'>$row->kode_akun</td>
<td width='200' height='20' class='isi_laporan'>$row->nama_akun</td>
    <td width='70' class='isi_laporan'>$row->kode_pp</td>
<td width='100' height='20' class='isi_laporan'>$row->nama_pp</td>
    <td width='50' class='isi_laporan'>$row->kode_drk</td>
<td width='200' height='20' class='isi_laporan'>$row->nama_drk</td>";
    echo "<td class='isi_laporan' align='right'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenGar('$row->kode_akun','$row->kode_lokasi','$row->tahun','$row->kode_pp','$row->kode_drk','tw1');\">".number_format($row->n1,0,',','.')."</a>";
			echo " </td>
    <td class='isi_laporan'><div align='right'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKartu('$row->kode_akun','$row->kode_lokasi','$row->tahun','$row->kode_pp','$row->kode_drk','tw1');\">".number_format($row->n13,0,',','.')."</a>";
			echo " </div></td>
    <td class='isi_laporan'><div align='right'>".number_format($row->n1-$row->n13,0,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenGar('$row->kode_akun','$row->kode_lokasi','$row->tahun','$row->kode_pp','$row->kode_drk','tw2');\">".number_format($row->n2,0,',','.')."</a>";
			echo "</div></td>
    <td class='isi_laporan'><div align='right'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKartu('$row->kode_akun','$row->kode_lokasi','$row->tahun','$row->kode_pp','$row->kode_drk','tw2');\">".number_format($row->n14,0,',','.')."</a>";
			echo "</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($row->n2-$row->n14,0,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenGar('$row->kode_akun','$row->kode_lokasi','$row->tahun','$row->kode_pp','$row->kode_drk','tw3');\">".number_format($row->n3,0,',','.')."</a>";
			echo "</div></td>
    <td class='isi_laporan'><div align='right'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKartu('$row->kode_akun','$row->kode_lokasi','$row->tahun','$row->kode_pp','$row->kode_drk','tw3');\">".number_format($row->n15,0,',','.')."</a>";
			echo "</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($row->n3-$row->n15,0,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenGar('$row->kode_akun','$row->kode_lokasi','$row->tahun','$row->kode_pp','$row->kode_drk','tw4');\">".number_format($row->n4,0,',','.')."</a>";
			echo "</div></td>
    <td class='isi_laporan'><div align='right'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKartu('$row->kode_akun','$row->kode_lokasi','$row->tahun','$row->kode_pp','$row->kode_drk','tw4');\">".number_format($row->n16,0,',','.')."</a>";
			echo "</div></td>
	<td class='isi_laporan'><div align='right'>".number_format($row->n4-$row->n16,0,',','.')."</div></td>";
	
	 echo "<td class='isi_laporan' align='right'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenGar('$row->kode_akun','$row->kode_lokasi','$row->tahun','$row->kode_pp','$row->kode_drk','tw1');\">".number_format($row->n5,0,',','.')."</a>";
			echo " </td>
    <td class='isi_laporan'><div align='right'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKartu('$row->kode_akun','$row->kode_lokasi','$row->tahun','$row->kode_pp','$row->kode_drk','tw1');\">".number_format($row->n17,0,',','.')."</a>";
			echo " </div></td>
    <td class='isi_laporan'><div align='right'>".number_format($row->n5-$row->n17,0,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenGar('$row->kode_akun','$row->kode_lokasi','$row->tahun','$row->kode_pp','$row->kode_drk','tw2');\">".number_format($row->n6,0,',','.')."</a>";
			echo "</div></td>
    <td class='isi_laporan'><div align='right'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKartu('$row->kode_akun','$row->kode_lokasi','$row->tahun','$row->kode_pp','$row->kode_drk','tw2');\">".number_format($row->n18,0,',','.')."</a>";
			echo "</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($row->n6-$row->n18,0,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenGar('$row->kode_akun','$row->kode_lokasi','$row->tahun','$row->kode_pp','$row->kode_drk','tw3');\">".number_format($row->n7,0,',','.')."</a>";
			echo "</div></td>
    <td class='isi_laporan'><div align='right'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKartu('$row->kode_akun','$row->kode_lokasi','$row->tahun','$row->kode_pp','$row->kode_drk','tw3');\">".number_format($row->n19,0,',','.')."</a>";
			echo "</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($row->n7-$row->n19,0,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenGar('$row->kode_akun','$row->kode_lokasi','$row->tahun','$row->kode_pp','$row->kode_drk','tw4');\">".number_format($row->n8,0,',','.')."</a>";
			echo "</div></td>
    <td class='isi_laporan'><div align='right'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKartu('$row->kode_akun','$row->kode_lokasi','$row->tahun','$row->kode_pp','$row->kode_drk','tw4');\">".number_format($row->n20,0,',','.')."</a>";
			echo "</div></td>
	<td class='isi_laporan'><div align='right'>".number_format($row->n8-$row->n20,0,',','.')."</div></td>";
	
	 echo "<td class='isi_laporan' align='right'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenGar('$row->kode_akun','$row->kode_lokasi','$row->tahun','$row->kode_pp','$row->kode_drk','tw1');\">".number_format($row->n9,0,',','.')."</a>";
			echo " </td>
    <td class='isi_laporan'><div align='right'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKartu('$row->kode_akun','$row->kode_lokasi','$row->tahun','$row->kode_pp','$row->kode_drk','tw1');\">".number_format($row->n21,0,',','.')."</a>";
			echo " </div></td>
    <td class='isi_laporan'><div align='right'>".number_format($row->n9-$row->n21,0,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenGar('$row->kode_akun','$row->kode_lokasi','$row->tahun','$row->kode_pp','$row->kode_drk','tw2');\">".number_format($row->n10,0,',','.')."</a>";
			echo "</div></td>
    <td class='isi_laporan'><div align='right'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKartu('$row->kode_akun','$row->kode_lokasi','$row->tahun','$row->kode_pp','$row->kode_drk','tw2');\">".number_format($row->n22,0,',','.')."</a>";
			echo "</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($row->n10-$row->n22,0,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenGar('$row->kode_akun','$row->kode_lokasi','$row->tahun','$row->kode_pp','$row->kode_drk','tw3');\">".number_format($row->n11,0,',','.')."</a>";
			echo "</div></td>
    <td class='isi_laporan'><div align='right'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKartu('$row->kode_akun','$row->kode_lokasi','$row->tahun','$row->kode_pp','$row->kode_drk','tw3');\">".number_format($row->n23,0,',','.')."</a>";
			echo "</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($row->n11-$row->n23,0,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenGar('$row->kode_akun','$row->kode_lokasi','$row->tahun','$row->kode_pp','$row->kode_drk','tw4');\">".number_format($row->n12,0,',','.')."</a>";
			echo "</div></td>
    <td class='isi_laporan'><div align='right'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKartu('$row->kode_akun','$row->kode_lokasi','$row->tahun','$row->kode_pp','$row->kode_drk','tw4');\">".number_format($row->n24,0,',','.')."</a>";
			echo "</div></td>
	<td class='isi_laporan'><div align='right'>".number_format($row->n12-$row->n24,0,',','.')."</div></td>";
  echo "</tr>";
			
			$i=$i+1;
		}
		
		echo "<tr>
    <td height='20' colspan='7' class='isi_laporan'><div align='right'>Total&nbsp;</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($n1,0,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($n13,0,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($n1-$n13,0,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($n2,0,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($n14,0,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($n2-$n14,0,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($n3,0,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($n15,0,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($n3-$n15,0,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($n4,0,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($n16,0,',','.')."</div></td>
	<td class='isi_laporan'><div align='right'>".number_format($n4-$n16,0,',','.')."</div></td>
	 <td class='isi_laporan'><div align='right'>".number_format($n5,0,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($n17,0,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($n5-$n17,0,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($n6,0,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($n18,0,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($n6-$n18,0,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($n7,0,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($n19,0,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($n7-$n19,0,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($n8,0,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($n20,0,',','.')."</div></td>
	<td class='isi_laporan'><div align='right'>".number_format($n8-$n20,0,',','.')."</div></td>
	 <td class='isi_laporan'><div align='right'>".number_format($n9,0,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($n21,0,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($n9-$n21,0,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($n10,0,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($n22,0,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($n10-$n22,0,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($n11,0,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($n23,0,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($n11-$n23,0,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($n12,0,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($n24,0,',','.')."</div></td>
	<td class='isi_laporan'><div align='right'>".number_format($n12-$n24,0,',','.')."</div></td>
  </tr>
</table> </div>";
		
		return "";
	}
	
	
}

