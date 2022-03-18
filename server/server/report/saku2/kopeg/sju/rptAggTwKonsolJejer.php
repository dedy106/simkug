<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku2_kopeg_sju_rptAggTwKonsolJejer extends server_report_basic
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
		
		$sql=" select a.kode_akun,b.nama,
			 isnull(e.agg_01,0) as agg_01,isnull(e.agg_02,0) as agg_02,isnull(e.agg_03,0) as agg_03,isnull(e.agg_04,0) as agg_04,isnull(e.agg_05,0) as agg_05,
			 isnull(e.agg_11,0) as agg_11,isnull(e.agg_12,0) as agg_12,isnull(e.agg_13,0) as agg_13,isnull(e.agg_14,0) as agg_14,isnull(e.agg_15,0) as agg_15,
			 isnull(e.agg_21,0) as agg_21,isnull(e.agg_22,0) as agg_22,isnull(e.agg_23,0) as agg_23,isnull(e.agg_24,0) as agg_24,isnull(e.agg_25,0) as agg_25,
			 isnull(e.agg_41,0) as agg_41,isnull(e.agg_42,0) as agg_42,isnull(e.agg_43,0) as agg_43,isnull(e.agg_44,0) as agg_44,isnull(e.agg_45,0) as agg_45,
			 isnull(e.total,0) as total
	  from (select z.kode_lokkonsol,z.kode_akun
			from anggaran_d x
			inner join masakun y on x.kode_akun=y.kode_akun and x.kode_lokasi=y.kode_lokasi
			inner join konsol_relasi z on x.kode_akun=z.kode_akun and x.kode_lokasi=z.kode_lokasi
			$this->filter
			group by z.kode_lokkonsol,z.kode_akun) a
	  inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokkonsol=b.kode_lokasi
	  left join (select z.kode_lokkonsol,z.kode_akun
	  ,sum(case when x.kode_lokasi='00' and substring(x.periode,5,2) between '01' and '03' then x.nilai else 0 end ) as agg_01
      ,sum(case when x.kode_lokasi='00' and substring(x.periode,5,2) between '04' and '06' then x.nilai else 0 end ) as agg_02
      ,sum(case when x.kode_lokasi='00' and substring(x.periode,5,2) between '07' and '09' then x.nilai else 0 end ) as agg_03
      ,sum(case when x.kode_lokasi='00' and substring(x.periode,5,2) between '10' and '12' then x.nilai else 0 end ) as agg_04
      ,sum(case when x.kode_lokasi='00' then x.nilai else 0 end ) as agg_05
      ,sum(case when x.kode_lokasi='01' and substring(x.periode,5,2) between '01' and '03' then x.nilai else 0 end ) as agg_11
      ,sum(case when x.kode_lokasi='01' and substring(x.periode,5,2) between '04' and '06' then x.nilai else 0 end ) as agg_12
      ,sum(case when x.kode_lokasi='01' and substring(x.periode,5,2) between '07' and '09' then x.nilai else 0 end ) as agg_13
      ,sum(case when x.kode_lokasi='01' and substring(x.periode,5,2) between '10' and '12' then x.nilai else 0 end ) as agg_14
      ,sum(case when x.kode_lokasi='01' then x.nilai else 0 end ) as agg_15
      ,sum(case when x.kode_lokasi='02' and substring(x.periode,5,2) between '01' and '03' then x.nilai else 0 end ) as agg_21
      ,sum(case when x.kode_lokasi='02' and substring(x.periode,5,2) between '04' and '06' then x.nilai else 0 end ) as agg_22
      ,sum(case when x.kode_lokasi='02' and substring(x.periode,5,2) between '07' and '09' then x.nilai else 0 end ) as agg_23
      ,sum(case when x.kode_lokasi='02' and substring(x.periode,5,2) between '10' and '12' then x.nilai else 0 end ) as agg_24
      ,sum(case when x.kode_lokasi='02' then x.nilai else 0 end ) as agg_25
      ,sum(case when x.kode_lokasi='04' and substring(x.periode,5,2) between '01' and '03' then x.nilai else 0 end ) as agg_41
      ,sum(case when x.kode_lokasi='04' and substring(x.periode,5,2) between '04' and '06' then x.nilai else 0 end ) as agg_42
      ,sum(case when x.kode_lokasi='04' and substring(x.periode,5,2) between '07' and '09' then x.nilai else 0 end ) as agg_43
      ,sum(case when x.kode_lokasi='04' and substring(x.periode,5,2) between '10' and '12' then x.nilai else 0 end ) as agg_44
      ,sum(case when x.kode_lokasi='04' then x.nilai else 0 end ) as agg_45
      ,sum(x.nilai) as total
from anggaran_d x
inner join masakun y on x.kode_akun=y.kode_akun and x.kode_lokasi=y.kode_lokasi
inner join konsol_relasi z on x.kode_akun=z.kode_akun and x.kode_lokasi=z.kode_lokasi
$this->filter
group by z.kode_lokkonsol,z.kode_akun) e on a.kode_akun=e.kode_akun and a.kode_lokkonsol=e.kode_lokkonsol
				 order by a.kode_akun ";
			 
		if ($trail=="1")
		{
			$sql=" select a.kode_akun,b.nama,
			 isnull(e.agg_01,0) as agg_01,isnull(e.agg_02,0) as agg_02,isnull(e.agg_03,0) as agg_03,isnull(e.agg_04,0) as agg_04,isnull(e.agg_05,0) as agg_05,
			 isnull(e.agg_11,0) as agg_11,isnull(e.agg_12,0) as agg_12,isnull(e.agg_13,0) as agg_13,isnull(e.agg_14,0) as agg_14,isnull(e.agg_15,0) as agg_15,
			 isnull(e.agg_21,0) as agg_21,isnull(e.agg_22,0) as agg_22,isnull(e.agg_23,0) as agg_23,isnull(e.agg_24,0) as agg_24,isnull(e.agg_25,0) as agg_25,
			 isnull(e.agg_41,0) as agg_41,isnull(e.agg_42,0) as agg_42,isnull(e.agg_43,0) as agg_43,isnull(e.agg_44,0) as agg_44,isnull(e.agg_45,0) as agg_45,
			 isnull(e.total,0) as total
	  from (select z.kode_lokkonsol,z.kode_akun
			from anggaran_d x
			inner join masakun y on x.kode_akun=y.kode_akun and x.kode_lokasi=y.kode_lokasi
			inner join konsol_relasi z on x.kode_akun=z.kode_akun and x.kode_lokasi=z.kode_lokasi
			inner join relakun a on a.kode_akun=x.kode_akun and a.kode_lokasi=x.kode_lokasi
			$this->filter
			group by z.kode_lokkonsol,z.kode_akun) a
	  inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokkonsol=b.kode_lokasi
	  left join (select z.kode_lokkonsol,z.kode_akun
	  ,sum(case when x.kode_lokasi='00' and substring(x.periode,5,2) between '01' and '03' then x.nilai else 0 end ) as agg_01
      ,sum(case when x.kode_lokasi='00' and substring(x.periode,5,2) between '04' and '06' then x.nilai else 0 end ) as agg_02
      ,sum(case when x.kode_lokasi='00' and substring(x.periode,5,2) between '07' and '09' then x.nilai else 0 end ) as agg_03
      ,sum(case when x.kode_lokasi='00' and substring(x.periode,5,2) between '10' and '12' then x.nilai else 0 end ) as agg_04
      ,sum(case when x.kode_lokasi='00' then x.nilai else 0 end ) as agg_05
      ,sum(case when x.kode_lokasi='01' and substring(x.periode,5,2) between '01' and '03' then x.nilai else 0 end ) as agg_11
      ,sum(case when x.kode_lokasi='01' and substring(x.periode,5,2) between '04' and '06' then x.nilai else 0 end ) as agg_12
      ,sum(case when x.kode_lokasi='01' and substring(x.periode,5,2) between '07' and '09' then x.nilai else 0 end ) as agg_13
      ,sum(case when x.kode_lokasi='01' and substring(x.periode,5,2) between '10' and '12' then x.nilai else 0 end ) as agg_14
      ,sum(case when x.kode_lokasi='01' then x.nilai else 0 end ) as agg_15
      ,sum(case when x.kode_lokasi='02' and substring(x.periode,5,2) between '01' and '03' then x.nilai else 0 end ) as agg_21
      ,sum(case when x.kode_lokasi='02' and substring(x.periode,5,2) between '04' and '06' then x.nilai else 0 end ) as agg_22
      ,sum(case when x.kode_lokasi='02' and substring(x.periode,5,2) between '07' and '09' then x.nilai else 0 end ) as agg_23
      ,sum(case when x.kode_lokasi='02' and substring(x.periode,5,2) between '10' and '12' then x.nilai else 0 end ) as agg_24
      ,sum(case when x.kode_lokasi='02' then x.nilai else 0 end ) as agg_25
      ,sum(case when x.kode_lokasi='04' and substring(x.periode,5,2) between '01' and '03' then x.nilai else 0 end ) as agg_41
      ,sum(case when x.kode_lokasi='04' and substring(x.periode,5,2) between '04' and '06' then x.nilai else 0 end ) as agg_42
      ,sum(case when x.kode_lokasi='04' and substring(x.periode,5,2) between '07' and '09' then x.nilai else 0 end ) as agg_43
      ,sum(case when x.kode_lokasi='04' and substring(x.periode,5,2) between '10' and '12' then x.nilai else 0 end ) as agg_44
      ,sum(case when x.kode_lokasi='04' then x.nilai else 0 end ) as agg_45
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
  <tr bgcolor='#dbeef3'>
    <td width='80' rowspan='2' align='center' class='header_laporan'>Kode Akun </td>
	<td width='80' rowspan='2' align='center' class='header_laporan'>Nama Akun </td>
    <td colspan='5' align='center' class='header_laporan'>Kantor Pusat </td>
    <td colspan='5' align='center' class='header_laporan'>KC Jakarta</td>
    <td colspan='5' align='center' class='header_laporan'>KC Bandung</td>
    <td colspan='5' align='center' class='header_laporan'>KC Surabaya</td>
    <td width='80' rowspan='2' align='center' class='header_laporan'>Konsolidasi</td>
  </tr>
  <tr bgcolor='#dbeef3'>
    <td width='80' align='center' class='header_laporan'>TW1</td>
    <td width='80' align='center' class='header_laporan'>TW2</td>
    <td width='80' align='center' class='header_laporan'>TW3</td>
    <td width='80' align='center' class='header_laporan'>TW4</td>
    <td width='80' align='center' class='header_laporan'>Total</td>
    <td width='80' align='center' class='header_laporan'>TW1</td>
    <td width='80' align='center' class='header_laporan'>TW2</td>
    <td width='80' align='center' class='header_laporan'>TW3</td>
    <td width='80' align='center' class='header_laporan'>TW4</td>
    <td width='80' align='center' class='header_laporan'>Total</td>
    <td width='80' align='center' class='header_laporan'>TW1</td>
    <td width='80' align='center' class='header_laporan'>TW2</td>
    <td width='80' align='center' class='header_laporan'>TW3</td>
    <td width='80' align='center' class='header_laporan'>TW4</td>
    <td width='80' align='center' class='header_laporan'>Total</td>
    <td width='80' align='center' class='header_laporan'>TW1</td>
    <td width='80' align='center' class='header_laporan'>TW2</td>
    <td width='80' align='center' class='header_laporan'>TW3</td>
    <td width='80' align='center' class='header_laporan'>TW4</td>
    <td width='80' align='center' class='header_laporan'>Total</td>
  </tr>";
        $agg_01=0; $agg_02=0; $agg_03=0; $agg_04=0; $agg_05=0; $total=0;
		$agg_11=0; $agg_12=0; $agg_13=0; $agg_14=0; $agg_15=0;
		$agg_21=0; $agg_22=0; $agg_23=0; $agg_24=0; $agg_25=0;
		$agg_41=0; $agg_42=0; $agg_43=0; $agg_44=0; $agg_45=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$agg_01+=$row->agg_01; $agg_02+=$row->agg_02; $agg_03+=$row->agg_03; $agg_04+=$row->agg_04; $agg_05+=$row->agg_05;
			$agg_11+=$row->agg_11; $agg_12+=$row->agg_12; $agg_13+=$row->agg_13; $agg_14+=$row->agg_14; $agg_15+=$row->agg_15;
			$agg_21+=$row->agg_21; $agg_22+=$row->agg_22; $agg_23+=$row->agg_23; $agg_24+=$row->agg_24; $agg_25+=$row->agg_25;
			$agg_41+=$row->agg_41; $agg_42+=$row->agg_42; $agg_43+=$row->agg_43; $agg_44+=$row->agg_44; $agg_45+=$row->agg_45;
			$total+=$row->total;
			echo "<tr>
     <td class='isi_laporan'>".$AddOnLib->fnAkun($row->kode_akun)."</td>
	 <td class='isi_laporan'>$row->nama</td>
	 <td class='isi_laporan' align='right'>".number_format($row->agg_01,0,',','.')."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->agg_02,0,',','.')."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->agg_03,0,',','.')."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->agg_04,0,',','.')."</td>
    <td valign='top' class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenGarBulan('$row->kode_akun','00','$tahun');\">".number_format($row->agg_05,0,",",".")."</a></td>
	 <td class='isi_laporan' align='right'>".number_format($row->agg_11,0,',','.')."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->agg_12,0,',','.')."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->agg_13,0,',','.')."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->agg_14,0,',','.')."</td>
	<td valign='top' class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenGarBulan('$row->kode_akun','01','$tahun');\">".number_format($row->agg_15,0,",",".")."</a></td>
	<td class='isi_laporan' align='right'>".number_format($row->agg_21,0,',','.')."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->agg_22,0,',','.')."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->agg_23,0,',','.')."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->agg_24,0,',','.')."</td>
	<td valign='top' class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenGarBulan('$row->kode_akun','02','$tahun');\">".number_format($row->agg_25,0,",",".")."</a></td>
	<td class='isi_laporan' align='right'>".number_format($row->agg_41,0,',','.')."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->agg_42,0,',','.')."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->agg_43,0,',','.')."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->agg_44,0,',','.')."</td>
	<td valign='top' class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenGarBulan('$row->kode_akun','04','$tahun');\">".number_format($row->agg_44,0,",",".")."</a></td>
	<td valign='top' class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenGarBulan('$row->kode_neraca','10','$tahun');\">".number_format($row->total,0,",",".")."</a></td>

  </tr>";
			$i=$i+1;
		}
	  echo "<tr>
    <td height='23' colspan='2' align='right' class='isi_laporan'>Total&nbsp;</td>
    <td class='isi_laporan' align='right'>".number_format($agg_01,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($agg_02,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($agg_03,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($agg_04,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($agg_05,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($agg_11,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($agg_12,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($agg_13,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($agg_14,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($agg_15,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($agg_21,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($agg_22,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($agg_23,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($agg_24,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($agg_25,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($agg_41,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($agg_42,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($agg_43,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($agg_44,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($agg_45,0,',','.')."</td>
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
