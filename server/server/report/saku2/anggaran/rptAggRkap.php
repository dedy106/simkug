<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku2_anggaran_rptAggRkap extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$sql="select 1 ";
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
		$tahun=$tmp[1];
		$nik_user=$tmp[0];
		$bentuk=$tmp[2];
		$nama_ver=$tmp[3];
		$ver=$tmp[4];
		$kode_lokasi1=$tmp[5];
		$kode_lokasi2=$tmp[6];
		$jenis=$tmp[7];
		$prog=$tmp[8];
		$bentuk_lap=$tmp[9];
		$kode_bidang1=$tmp[10];
		$kode_bidang2=$tmp[11];
		$kode_fs=$tmp[12];
		$outlook=$tmp[13];
		$tahun_rev=$tahun-1;
		$program="";
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$judul_prog="SELURUH PROGRAM";
		if (substr($outlook,4,2)=="01") {$bulan="JANUARI";};
		if (substr($outlook,4,2)=="02") {$bulan="FEBRUARI";};
		if (substr($outlook,4,2)=="03") {$bulan="MARET";};
		if (substr($outlook,4,2)=="04") {$bulan="APRIL";};
		if (substr($outlook,4,2)=="05") {$bulan="MEI";};
		if (substr($outlook,4,2)=="06") {$bulan="JUNI";};
		if (substr($outlook,4,2)=="07") {$bulan="JULI";};
		if (substr($outlook,4,2)=="08") {$bulan="AGUSTUS";};
		if (substr($outlook,4,2)=="09") {$bulan="SEPTEMBER";};
		if (substr($outlook,4,2)=="10") {$bulan="OKTOBER";};
		if (substr($outlook,4,2)=="11") {$bulan="NOVEMBER";};
		if (substr($outlook,4,2)=="12") {$bulan="DESEMBER";};
		
		$sql = "select nik_user,kode_neraca,jenis_akun,kode_lokasi,tipe,nama,level_spasi,n0,n1,n2,n3,n4,n5,n6,n7,n8,n9,n10,
		case when n0<>0 then (n2/n0)*100 else 0 end as g03,	
       case when n2<>0 then ((n5-n2)/n2)*100 else 0 end as g01,	
       case when n2<>0 then ((n7-n2)/n2)*100 else 0 end as g02
from agg_neraca_tmp where modul='B' and nik_user='$nik_user' order by rowindex ";
		
		$rs = $dbLib->execute($sql);
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		//echo $AddOnLib->judul_laporan("laporan rekapitulasi rkap",$this->lokasi,"TAHUN ".$tahun);
		$tanggal="<div style='font-family: Arial;font-size: 10px;'> Dicetak ".date("d/m/Y  H:m:s")."<div>";
		$lokasi="AREA [$kode_lokasi1 - $kode_lokasi2]";
		if ($kode_lokasi1=="01" and $kode_lokasi2=="01") { $lokasi="AREA I";}
		if ($kode_lokasi1=="02" and $kode_lokasi2=="02") { $lokasi="AREA II";}
		if ($kode_lokasi1=="03" and $kode_lokasi2=="03") { $lokasi="AREA III";}
		if ($kode_lokasi1=="04" and $kode_lokasi2=="04") { $lokasi="AREA IV";}
		if ($kode_lokasi1=="05" and $kode_lokasi2=="05") { $lokasi="AREA V";}
		if ($kode_lokasi1=="06" and $kode_lokasi2=="06") { $lokasi="AREA VI";}
		if ($kode_lokasi1=="07" and $kode_lokasi2=="07") { $lokasi="AREA VII";}
		if ($kode_lokasi1=="99" and $kode_lokasi2=="99") { $lokasi="PUSAT";}
		if ($kode_lokasi1=="01" and $kode_lokasi2=="07") { $lokasi="SELURUH AREA [I - VII]";}
		if ($kode_lokasi1=="01" and $kode_lokasi2=="99") { $lokasi="KONSOLIDASI NASIONAL";}
		
		$bidang="BIDANG [$kode_bidang1 - $kode_bidang2]";
		if ($kode_bidang1=="1" and $kode_bidang2=="1") { $bidang="BIDANG YANKESTA";}
		if ($kode_bidang1=="2" and $kode_bidang2=="2") { $bidang="BIDANG KEUANGAN";}
		if ($kode_bidang1=="3" and $kode_bidang2=="3") { $bidang="BIDANG UMUM";}
		if ($kode_bidang1=="4" and $kode_bidang2=="4") { $bidang="BIDANG INVESTASI";}
				
		$judul="<div style='font-family: Arial;font-size: 12px;font-weight: bold;padding:3px;'>".$lokasi."<br>LAPORAN REKAPITULASI RKAP<br>$judul_prog<br>$bidang<br>TAHUN $tahun <br></div>$tanggal";

		echo "<center>$judul<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr bgcolor='#CCCCCC'>
    <td width='40' height='25'  class='header_laporan' align='center'>Kode</td> 
    <td width='250' height='25'  class='header_laporan' align='center'>Deskripsi</td>
     <td width='90' class='header_laporan' align='center'>RKA $tahun_rev</td>
	<td width='90' class='header_laporan' align='center'>REALISASI SD $bulan $tahun_rev</td>
	<td width='90' class='header_laporan' align='center'>ESTIMASI $tahun_rev</td>
	<td width='90' class='header_laporan' align='center'>OUTLOOK $tahun_rev</td>
	<td width='90' class='header_laporan' align='center'>SELISIH RKA VS OUTLOOK $tahun_rev</td>
	<td width='60' class='header_laporan' align='center'>% PENYERAPAN</td>
	<td width='80' class='header_laporan' align='center'>USULAN RKA $tahun PROGRAM LAMA</td>
	<td width='80' class='header_laporan' align='center'>USULAN RKA $tahun PROGRAM BARU</td>
	<td width='80' class='header_laporan' align='center'>TOTAL USULAN RKA $tahun</td>
	<td width='60' class='header_laporan' align='center'>GROWTH PROGRAM LAMA 11 VS OUTLOOK $tahun_rev</td>
	<td width='60' class='header_laporan' align='center'>GROWTH TOTAL $tahun VS OUTLOOK $tahun_rev</td>
</tr>";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$n0="";$n1="";$n2="";$n3="";$n4="";$n5="";$n6="";$n7="";$n8="";$n9="";$n10="";
			$warna="style='color:#000000' ";
			$warna2="style='color:#000000' ";
			if ($row->n8 > 110)
			{
				$warna="style='color:#FF0000' ";
			}
			if ($row->n9 > 110)
			{
				$warna2="style='color:#FF0000' ";
			}
			if ($row->tipe!="Header" && $row->nama!="." && $row->nama!="")
			{
				$n0=number_format($row->n0,0,",",".");
				$n1=number_format($row->n1,0,",",".");
				$n10=number_format($row->n10,0,",",".");
				$n2=number_format($row->n2,0,",",".");
				$n3=number_format($row->n3,0,",",".");
				$n4=number_format($row->g03,2,",",".");
				$n5=number_format($row->n5,0,",",".");
				$n6=number_format($row->n6,0,",",".");
				$n7=number_format($row->n7,0,",",".");
				$n8=number_format($row->g01,2,",",".");
				$n9=number_format($row->g02,2,",",".");
				
			}
			$css="isi_laporan";
			if ($row->tipe!="Posting")
			{
				$css="isi_laporan";
			}
			$nama=$AddOnLib->spasi($row->nama,$row->level_spasi);
			echo "<tr>
	<td class='$css' align='left'>$row->kode_neraca</td>
	<td height='20' class='$css' align='left'>$nama</td>
    <td class='$css' align='right'>$n0</td>
	<td class='$css' align='right'>$n1</td>
	<td class='$css' align='right'>$n10</td>
	<td class='$css' align='right'>$n2</td>
	<td class='$css' align='right'>$n3</td>
	<td class='$css' align='right'>$n4</td>
	<td class='$css' align='right'>$n5</td>
	<td class='$css' align='right'>$n6</td>
	<td class='$css' align='right'>$n7</td>
	<td class='$css' align='right' $warna2>$n8</td>
	<td class='$css' align='right' $warna>$n9</td>
  </tr>";
			$kode_neraca=$row->kode_neraca;
			$kode_lokasi=$row->kode_lokasi;
			$kode_bidang1=$tmp[10];
			$kode_bidang2=$tmp[11];
			/*
			if ($row->jenis_akun=="INV")
			{
				$kode_bidang1="4";
				$kode_bidang2="4";
			}
			if ($row->jenis_akun=="BEBAN")
			{
				$kode_bidang1="1";
				$kode_bidang2="4";
			}
			*/
			if ($bentuk=="Detail" && $row->tipe=="Posting")
			{
				
				if ($jenis=="Akun" || $jenis=="")
				{
					
					$sql1="select a.kode_akun as kode_akunlok,a.nama,isnull(d.rka,0) as rka,isnull(d.realisasi,0) as realisasi,isnull(d.outlook,0) as outlook,
				isnull(d.rka,0)-isnull(d.outlook,0) as selisih,
				case when isnull(d.rka,0)<>0 then (isnull(d.outlook,0)/isnull(d.rka,0))*100 else 0 end as penyerapan,
				isnull(f.lama,0) as lama,isnull(f.baru,0) as baru,isnull(f.usulan,0) as usulan,
				case when isnull(d.outlook,0)<>0 then ((isnull(f.lama,0)-isnull(d.outlook,0))/isnull(d.outlook,0))*100 else 0 end as growth1,
				case when isnull(d.outlook,0)<>0 then ((isnull(f.usulan,0)-isnull(d.outlook,0))/isnull(d.outlook,0))*100 else 0 end as growth2,
				isnull(d.estimasi,0) as estimasi
	from masakun a
	inner join agg_relakungar e on a.kode_akun=e.kode_akun and a.kode_lokasi=e.kode_lokasi 
	left join (select a.kode_akun,isnull(sum(a.rka),0) as rka,isnull(sum(a.realisasi),0) as realisasi,isnull(sum(a.outlook),0) as outlook,sum(estimasi) as estimasi
				from agg_outlook a
				inner join agg_relakungar b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi 
				inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
				where (a.kode_lokasi between '$kode_lokasi1' and '$kode_lokasi2') and a.periode='$outlook' and b.kode_neraca='$row->kode_neraca' and (c.kode_bidang between '$kode_bidang1' and '$kode_bidang2')
				group by a.kode_akun
				)d on a.kode_akun=d.kode_akun 
	left join (select a.kode_akun,sum(case when a.jenis_agg='T' then a.nilai else 0 end) as baru,
					sum(case when a.jenis_agg<>'T' then a.nilai else 0 end) as lama,
					sum(a.nilai) as usulan
				from agg_d a
				inner join agg_relakungar b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi 
				inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
				where (a.kode_lokasi between '$kode_lokasi1' and '$kode_lokasi2') and a.tahun='$tahun' and b.kode_neraca='$row->kode_neraca' $program and (c.kode_bidang between '$kode_bidang1' and '$kode_bidang2')
				group by a.kode_akun
				)f on a.kode_akun=f.kode_akun			
	where a.kode_lokasi='$kode_lokasi' and e.kode_neraca='$row->kode_neraca'  and (isnull(d.rka,0)<>0 or isnull(d.realisasi,0)<>0 or isnull(d.outlook,0)<>0 or isnull(f.usulan,0)<>0) order by a.kode_akun";
				}
				
				if ($jenis=="Akun Lokasi")
				{
					$sql1="select a.kode_lokasi+'-'+a.kode_akun as kode_akunlok,b.nama,isnull(d.rka,0) as rka,isnull(d.realisasi,0) as realisasi,isnull(d.outlook,0) as outlook,
				isnull(d.rka,0)-isnull(d.outlook,0) as selisih,
				case when isnull(d.rka,0)<>0 then (isnull(d.outlook,0)/isnull(d.rka,0))*100 else 0 end as penyerapan,
				isnull(f.lama,0) as lama,isnull(f.baru,0) as baru,isnull(f.usulan,0) as usulan,
				case when isnull(d.rka,0)<>0 then ((isnull(f.usulan,0)-isnull(d.rka,0))/isnull(d.rka,0))*100 else 0 end as growth1,
				case when isnull(d.outlook,0)<>0 then ((isnull(f.usulan,0)-isnull(d.outlook,0))/isnull(d.outlook,0))*100 else 0 end as growth2,
				isnull(d.estimasi,0) as estimasi
	from (select a.kode_lokasi,a.kode_akun
		  from agg_outlook a
		  inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
		  where (a.kode_lokasi between '$kode_lokasi1' and '$kode_lokasi2') and a.tahun='$tahun_rev' and (b.kode_bidang between '$kode_bidang1' and '$kode_bidang2')
		  group by a.kode_lokasi,a.kode_akun
		  union
		  select a.kode_lokasi,a.kode_akun
		  from agg_d a
		  inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
		  where (a.kode_lokasi between '$kode_lokasi1' and '$kode_lokasi2') and a.tahun='$tahun' and (b.kode_bidang between '$kode_bidang1' and '$kode_bidang2')
		  group by a.kode_lokasi,a.kode_akun) a
	inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
	left join (select a.kode_lokasi,a.kode_akun,isnull(sum(a.rka),0) as rka,isnull(sum(a.realisasi),0) as realisasi,isnull(sum(a.outlook),0) as outlook,sum(estimasi) as estimasi
				from agg_outlook a
				inner join agg_relakungar b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
				inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
				where (a.kode_lokasi between '$kode_lokasi1' and '$kode_lokasi2') and a.periode='$outlook' and b.kode_neraca='$row->kode_neraca' and (c.kode_bidang between '$kode_bidang1' and '$kode_bidang2') 
				group by a.kode_lokasi,a.kode_akun
				)d on a.kode_akun=d.kode_akun and a.kode_lokasi=d.kode_lokasi
	left join (select a.kode_lokasi,a.kode_akun,sum(case when a.jenis_agg='T' then a.nilai else 0 end) as baru,
					sum(case when a.jenis_agg<>'T' then a.nilai else 0 end) as lama,
					sum(a.nilai) as usulan
				from agg_d a
				inner join agg_relakungar b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
				inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
				where (a.kode_lokasi between '$kode_lokasi1' and '$kode_lokasi2') and a.tahun='$tahun' and b.kode_neraca='$row->kode_neraca' $program and (c.kode_bidang between '$kode_bidang1' and '$kode_bidang2') 
				group by a.kode_lokasi,a.kode_akun
				)f on a.kode_akun=f.kode_akun and a.kode_lokasi=f.kode_lokasi			
	where (isnull(d.rka,0)<>0 or isnull(d.realisasi,0)<>0 or isnull(d.outlook,0)<>0 or isnull(f.usulan,0)<>0) order by a.kode_akun,a.kode_lokasi";

				}
				if ($jenis=="Akun Bidang")
				{
					$sql1="select a.kode_lokasi+'-'+a.kode_bidang+'-'+a.kode_akun as kode_akunlok,b.nama,isnull(d.rka,0) as rka,isnull(d.realisasi,0) as realisasi,isnull(d.outlook,0) as outlook,
				isnull(d.rka,0)-isnull(d.outlook,0) as selisih,
				case when isnull(d.rka,0)<>0 then (isnull(d.outlook,0)/isnull(d.rka,0))*100 else 0 end as penyerapan,
				isnull(f.lama,0) as lama,isnull(f.baru,0) as baru,isnull(f.usulan,0) as usulan,
				case when isnull(d.rka,0)<>0 then ((isnull(f.usulan,0)-isnull(d.rka,0))/isnull(d.rka,0))*100 else 0 end as growth1,
				case when isnull(d.outlook,0)<>0 then ((isnull(f.usulan,0)-isnull(d.outlook,0))/isnull(d.outlook,0))*100 else 0 end as growth2,
				isnull(d.estimasi,0) as estimasi
	from (select a.kode_lokasi,b.kode_bidang,a.kode_akun
		  from agg_outlook a
		  inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
		  where (a.kode_lokasi between '$kode_lokasi1' and '$kode_lokasi2') and a.periode='$outlook' and (b.kode_bidang between '$kode_bidang1' and '$kode_bidang2')
		  group by a.kode_lokasi,b.kode_bidang,a.kode_akun
		  union
		  select a.kode_lokasi,b.kode_bidang,a.kode_akun
		  from agg_d a
		  inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
		  where (a.kode_lokasi between '$kode_lokasi1' and '$kode_lokasi2') and a.tahun='$tahun' and (b.kode_bidang between '$kode_bidang1' and '$kode_bidang2')
		  group by a.kode_lokasi,b.kode_bidang,a.kode_akun) a
	inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
	left join (select a.kode_lokasi,c.kode_bidang,a.kode_akun,isnull(sum(a.rka),0) as rka,isnull(sum(a.realisasi),0) as realisasi,isnull(sum(a.outlook),0) as outlook,sum(estimasi) as estimasi
				from agg_outlook a
				inner join agg_relakungar b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
				inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
				where (a.kode_lokasi between '$kode_lokasi1' and '$kode_lokasi2') and a.periode='$outlook' and b.kode_neraca='$row->kode_neraca' and (c.kode_bidang between '$kode_bidang1' and '$kode_bidang2')
				group by a.kode_lokasi,c.kode_bidang,a.kode_akun
				)d on a.kode_akun=d.kode_akun and a.kode_lokasi=d.kode_lokasi and a.kode_bidang=d.kode_bidang
	left join (select a.kode_lokasi,c.kode_bidang,a.kode_akun,sum(case when a.jenis_agg='T' then a.nilai else 0 end) as baru,
					sum(case when a.jenis_agg<>'T' then a.nilai else 0 end) as lama,
					sum(a.nilai) as usulan
				from agg_d a
				inner join agg_relakungar b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
				inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
				where (a.kode_lokasi between '$kode_lokasi1' and '$kode_lokasi2') and a.tahun='$tahun' and b.kode_neraca='$row->kode_neraca' $program and (c.kode_bidang between '$kode_bidang1' and '$kode_bidang2')
				group by a.kode_lokasi,c.kode_bidang,a.kode_akun
				)f on a.kode_akun=f.kode_akun and a.kode_lokasi=f.kode_lokasi and a.kode_bidang=f.kode_bidang	
	where (isnull(d.rka,0)<>0 or isnull(d.realisasi,0)<>0 or isnull(d.outlook,0)<>0 or isnull(f.usulan,0)<>0) order by a.kode_akun,a.kode_lokasi";

				}
				if ($jenis=="Akun DRK")
				{
					$sql1="select a.kode_akun+'-'+d.kode_drk as kode_akunlok,a.nama+'-'+g.nama as nama,0 as rka,0 as realisasi,0 as outlook,
				0 as selisih,
				0 as penyerapan,
				isnull(f.lama,0) as lama,isnull(f.baru,0) as baru,isnull(f.usulan,0) as usulan,
				0 as growth1,
				0 as growth2
	from masakun a
	inner join agg_relakungar e on a.kode_akun=e.kode_akun and a.kode_lokasi=e.kode_lokasi
	left join (select a.kode_akun,a.kode_drk
	           from agg_d a
			   inner join agg_relakungar b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
			   inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
 			   where (a.kode_lokasi between '$kode_lokasi1' and '$kode_lokasi2') and a.tahun='$tahun' and b.kode_neraca='$row->kode_neraca' and (c.kode_bidang between '$kode_bidang1' and '$kode_bidang2')
				group by a.kode_akun,a.kode_drk
				)d on a.kode_akun=d.kode_akun 
	left join (select a.kode_akun,a.kode_drk,sum(case when a.jenis_agg='T' then a.nilai else 0 end) as baru,
					sum(case when a.jenis_agg<>'T' then a.nilai else 0 end) as lama,
					sum(a.nilai) as usulan
				from agg_d a
				inner join agg_relakungar b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
				inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
				where (a.kode_lokasi between '$kode_lokasi1' and '$kode_lokasi2') and a.tahun='$tahun' and b.kode_neraca='$row->kode_neraca' $program and (c.kode_bidang between '$kode_bidang1' and '$kode_bidang2')
				group by a.kode_akun,a.kode_drk
				)f on a.kode_akun=f.kode_akun and d.kode_drk=f.kode_drk			
	inner join agg_drk g on d.kode_drk=g.kode_drk 
	where a.kode_lokasi='$kode_lokasi' and e.kode_neraca='$row->kode_neraca'  and (isnull(f.usulan,0)<>0) order by a.kode_akun";
				}
						
				
				error_log($sql1);
				$rs1 = $dbLib->execute($sql1);
				while ($row1 = $rs1->FetchNextObject($toupper=false))
				{	
					$warna1="style='color:#0000FF; font-family : Arial; font-size : 10px; text-decoration : none; padding:3px;'";
					$warna2="style='color:#0000FF; font-family : Arial; font-size : 10px; text-decoration : none; padding:3px;'";

					if ($row1->growth2 > 110)
					{
						$warna1="style='color:#FF0000; font-family : Arial; font-size : 10px; text-decoration : none; padding:3px;'";
					}
					if ($row1->growth1 > 110)
					{
						$warna2="style='color:#FF0000; font-family : Arial; font-size : 10px; text-decoration : none; padding:3px;'";
					}
					
					$n0=number_format($row1->rka,0,",",".");
					$n1=number_format($row1->realisasi,0,",",".");
					$n2=number_format($row1->outlook,0,",",".");
					$n3=number_format($row1->selisih,0,",",".");
					$n4=number_format($row1->penyerapan,2,",",".");
					$n5=number_format($row1->lama,0,",",".");
					$n6=number_format($row1->baru,0,",",".");
					$n7=number_format($row1->usulan,0,",",".");
					$n8=number_format($row1->growth1,2,",",".");
					$n9=number_format($row1->growth2,2,",",".");
					$n10=number_format($row1->estimasi,0,",",".");
					$css="detail_laporan";
					echo "<tr>
	<td class='$css' align='left'>$row1->kode_akunlok</td>
	<td height='20' class='$css' align='left'>$row1->nama</td>
    <td class='$css' align='right'>$n0</td>
	<td class='$css' align='right'>$n1</td>
	<td class='$css' align='right'>$n10</td>
	<td class='$css' align='right'>$n2</td>
	<td class='$css' align='right'>$n3</td>
	<td class='$css' align='right'>$n4</td>
	<td class='$css' align='right'>$n5</td>
	<td class='$css' align='right'>$n6</td>
	<td class='$css' align='right'>$n7</td>
	<td class='$css' align='right' $warna2>$n8</td>
	<td align='right' $warna1>$n9</td>
  </tr>";
				}
			}
			$i=$i+1;
		}
		echo "</table></center>";
		
		return "";
	}
	
}
?>
  
