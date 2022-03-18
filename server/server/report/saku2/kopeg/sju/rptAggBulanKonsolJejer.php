<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku2_kopeg_sju_rptAggBulanKonsolJejer extends server_report_basic
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
		$tahun=$tmp[0];
		$trail=$tmp[1];
		
		$sql=" select a.kode_akun,b.nama,isnull(e.agg_00,0) as n0,
			 isnull(e.agg_01,0) as n1,isnull(e.agg_02,0) as n2,isnull(e.agg_03,0) as n3,isnull(e.agg_04,0) as n4,
			 isnull(e.total,0) as total,isnull(e.agg_05,0) as n5,isnull(e.agg_06,0) as n6
	  from (select z.kode_lokkonsol,z.kode_akun
			from anggaran_d x
			inner join masakun y on x.kode_akun=y.kode_akun and x.kode_lokasi=y.kode_lokasi
			inner join konsol_relasi z on x.kode_akun=z.kode_akun and x.kode_lokasi=z.kode_lokasi
			$this->filter
			group by z.kode_lokkonsol,z.kode_akun) a
	  inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokkonsol=b.kode_lokasi
	  left join (select z.kode_lokkonsol,z.kode_akun
	  ,sum(case when x.kode_lokasi='00' then x.nilai else 0 end ) as agg_00
      ,sum(case when x.kode_lokasi='01' then x.nilai else 0 end ) as agg_01
      ,sum(case when x.kode_lokasi='02' then x.nilai else 0 end ) as agg_02
      ,sum(case when x.kode_lokasi='03' then x.nilai else 0 end ) as agg_03
      ,sum(case when x.kode_lokasi='04' then x.nilai else 0 end ) as agg_04
	  ,sum(case when x.kode_lokasi='05' then x.nilai else 0 end ) as agg_05
	  ,sum(case when x.kode_lokasi='06' then x.nilai else 0 end ) as agg_06
      ,sum(x.nilai) as total
from anggaran_d x
inner join masakun y on x.kode_akun=y.kode_akun and x.kode_lokasi=y.kode_lokasi
inner join konsol_relasi z on x.kode_akun=z.kode_akun and x.kode_lokasi=z.kode_lokasi
$this->filter
group by z.kode_lokkonsol,z.kode_akun) e on a.kode_akun=e.kode_akun and a.kode_lokkonsol=e.kode_lokkonsol
				 order by a.kode_akun ";
			 
		if ($trail=="1")
		{
			$sql=" select a.kode_akun,b.nama,isnull(e.agg_00,0) as n0,
			 isnull(e.agg_01,0) as n1,isnull(e.agg_02,0) as n2,isnull(e.agg_03,0) as n3,isnull(e.agg_04,0) as n4,
			 isnull(e.total,0) as total,isnull(e.agg_05,0) as n5,isnull(e.agg_06,0) as n6
	  from (select z.kode_lokkonsol,z.kode_akun
			from anggaran_d x
			inner join masakun y on x.kode_akun=y.kode_akun and x.kode_lokasi=y.kode_lokasi
			inner join konsol_relasi z on x.kode_akun=z.kode_akun and x.kode_lokasi=z.kode_lokasi
			inner join relakun a on a.kode_akun=x.kode_akun and a.kode_lokasi=x.kode_lokasi
			$this->filter
			group by z.kode_lokkonsol,z.kode_akun) a
	  inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokkonsol=b.kode_lokasi
	  left join (select z.kode_lokkonsol,z.kode_akun
	  ,sum(case when x.kode_lokasi='00' then x.nilai else 0 end ) as agg_00
      ,sum(case when x.kode_lokasi='01' then x.nilai else 0 end ) as agg_01
      ,sum(case when x.kode_lokasi='02' then x.nilai else 0 end ) as agg_02
      ,sum(case when x.kode_lokasi='03' then x.nilai else 0 end ) as agg_03
      ,sum(case when x.kode_lokasi='04' then x.nilai else 0 end ) as agg_04
	  ,sum(case when x.kode_lokasi='05' then x.nilai else 0 end ) as agg_05
	  ,sum(case when x.kode_lokasi='06' then x.nilai else 0 end ) as agg_06
      ,sum(x.nilai) as total
from anggaran_d x
inner join masakun y on x.kode_akun=y.kode_akun and x.kode_lokasi=y.kode_lokasi
inner join konsol_relasi z on x.kode_akun=z.kode_akun and x.kode_lokasi=z.kode_lokasi
inner join relakun a on a.kode_akun=x.kode_akun and a.kode_lokasi=x.kode_lokasi
$this->filter
group by z.kode_lokkonsol,z.kode_akun) e on a.kode_akun=e.kode_akun and a.kode_lokkonsol=e.kode_lokkonsol
				 order by a.kode_akun ";
		}
		
		$rs = $dbLib->execute($sql);
		
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("RENCANA ANGGARAN BEBAN","PT SARANA JANESIA UTAMA","Tahun $tahun");
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr align='center' bgcolor='#dbeef3'>
    <td height='23' width='100' class='header_laporan'>Kode Akun</td>
	<td width='250' class='header_laporan'>Nama Akun</td>
    <td width='90' class='header_laporan'>Kantor Pusat</td>
    <td width='90' class='header_laporan'>KC Jakarta</td>
    <td width='90' class='header_laporan'>KC Bandung</td>
    <td width='90' class='header_laporan'>KC Semarang</td>
	<td width='90' class='header_laporan'>KC Surabaya</td>
	<td width='90' class='header_laporan'>KC Solo</td>
	<td width='90' class='header_laporan'>KC Medan</td>
	<td width='90' class='header_laporan'>KONSOLIDASI</td>
  </tr>";
        $n0=0; $n1=0; $n2=""; $n3=""; $n4=""; $n5=""; $total="";  $n6=""; 
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$n0+=$row->n0;
			$n1+=$row->n1;
			$n2+=$row->n2;
			$n3+=$row->n3;
			$n4+=$row->n4;
			$n5+=$row->n5;
			$n6+=$row->n6;
			$total+=$row->total;
			echo "<tr>
     <td class='isi_laporan'>".$AddOnLib->fnAkun($row->kode_akun)."</td>
	 <td class='isi_laporan'>$row->nama</td>
    <td valign='top' class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenGarBulan('$row->kode_akun','00','$tahun');\">".number_format($row->n0,0,",",".")."</a></td>
	<td valign='top' class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenGarBulan('$row->kode_akun','01','$tahun');\">".number_format($row->n1,0,",",".")."</a></td>
	<td valign='top' class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenGarBulan('$row->kode_akun','02','$tahun');\">".number_format($row->n2,0,",",".")."</a></td>
	<td valign='top' class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenGarBulan('$row->kode_akun','03','$tahun');\">".number_format($row->n3,0,",",".")."</a></td>
	<td valign='top' class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenGarBulan('$row->kode_akun','04','$tahun');\">".number_format($row->n4,0,",",".")."</a></td>
	<td valign='top' class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenGarBulan('$row->kode_akun','05','$tahun');\">".number_format($row->n5,0,",",".")."</a></td>
    <td valign='top' class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenGarBulan('$row->kode_akun','06','$tahun');\">".number_format($row->n6,0,",",".")."</a></td>

	<td valign='top' class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenGarBulan('$row->kode_neraca','10','$tahun');\">".number_format($row->total,0,",",".")."</a></td>

  </tr>";
			$i=$i+1;
		}
	  echo "<tr>
    <td height='23' colspan='2' align='right' class='isi_laporan'>Total&nbsp;</td>
    <td class='isi_laporan' align='right'>".number_format($n0,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($n1,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($n2,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($n3,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($n4,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($n5,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($n6,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($total,0,',','.')."</td>
  </tr>";
	  echo " </table>";
	  echo "<br>";
	  
	  echo " </table>";
		
		echo "</div>";
		return "";
	}
	
}
?>
