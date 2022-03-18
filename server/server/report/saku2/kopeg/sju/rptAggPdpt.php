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
class server_report_saku2_kopeg_sju_rptAggPdpt extends server_report_basic
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
		$nik_user=$tmp[2];
		$kode_lokasi2=$tmp[3];
		$cabang="";
		if ($kode_lokasi2=="")
		{
			if ($kode_lokasi=="00") {$cabang="KANTOR PUSAT";};
			if ($kode_lokasi=="01") {$cabang="KANTOR JAKARTA";};
			if ($kode_lokasi=="02") {$cabang="KANTOR BANDUNG";};
			if ($kode_lokasi=="03") {$cabang="KANTOR SEMARANG";};
			if ($kode_lokasi=="04") {$cabang="KANTOR SURABAYA";};
		}
		if ($kode_lokasi2=="")
		{
			$kode_lokasi2=$kode_lokasi;
		}
		$tahun=substr($periode,0,4);
		$tahun_rev=strval(intval($tahun)-1);
		$bulan=substr($periode,4,2);
		$periode_rev=strval(intval($tahun)-1).$bulan;
		if ($bulan=="01") {$bulan="JANUARI";};
		if ($bulan=="02") {$bulan="FEBRUARI";};
		if ($bulan=="03") {$bulan="MARET";};
		if ($bulan=="04") {$bulan="APRIL";};
		if ($bulan=="05") {$bulan="MEI";};
		if ($bulan=="06") {$bulan="JUNI";};
		if ($bulan=="07") {$bulan="JULI";};
		if ($bulan=="08") {$bulan="AGUSTUS";};
		if ($bulan=="09") {$bulan="SEPTEMBER";};
		if ($bulan=="10") {$bulan="OKTOBER";};
		if ($bulan=="11") {$bulan="NOVEMBER";};
		if ($bulan=="12") {$bulan="DESEMBER";};
		if ($bulan=="13") {$bulan="DESEMBER";};
		$sql="exec sp_pdpt '$kode_lokasi','FS1','$periode','$nik_user'";
		
		$rs = $dbLib->execute($sql);		
		$sql = "select kode_neraca,kode_fs,kode_lokasi,nama,tipe,level_spasi,n1,n2,n3,n4
			from sju_pdpt_tmp 
			where nik_user='$nik_user' 
			order by rowindex ";
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo "<table border='0' cellspacing='0' cellpadding='0' width ='100%'>
  <tr>
    <td colspan='2' class='lokasi_laporan' align='center'>PT SARANA JANESIA UTAMA</td>
  </tr>
  <tr>
    <td  class='lokasi_laporan2' align='center'>PENDAPATAN USAHA GROSS</td>
  </tr>
  <tr>
    <td class='lokasi_laporan' align='center'>Per $bulan $tahun dan $bulan $tahun_rev</td>
  </tr>
 
</table>";
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='800'>
  <tr align='center' bgcolor='#dbeef3'>
    <td width='200' rowspan='3' class='header_laporan'>TERTANGGUNG</td>
    <td colspan='3' class='header_laporan'>TAHUN $tahun </td>
    <td rowspan='2' class='header_laporan'>REALISASI SD $bulan $tahun_rev</td>
    <td colspan='4' class='header_laporan'>PROSENTASE</td>
  </tr>
  <tr bgcolor='#dbeef3'>
    <td align='center' class='header_laporan'>ANGGARAN</td>
    <td align='center' class='header_laporan'>ANGGARAN SD TW II </td>
    <td align='center' class='header_laporan'>REALISASI SD $bulan $tahun</td>
    <td colspan='3' class='header_laporan' align='center'>PENCAPAIAN</td>
    <td align='center' class='header_laporan'>GRWTH</td>
  </tr>
  <tr align='center' bgcolor='#dbeef3'>
    <td width='90' align='center' class='header_laporan'>1</td>
    <td width='90' align='center' class='header_laporan'>2</td>
    <td width='90' align='center' class='header_laporan'>3</td>
    <td width='90' align='center' class='header_laporan'>4</td>
    <td width='40' class='header_laporan'>2/1</td>
    <td width='40' class='header_laporan'>3/1</td>
    <td width='40' class='header_laporan'>3/2</td>
    <td width='40' class='header_laporan'>3/4</td>
  </tr>";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$persen1="'";$persen2="'";$persen3="'";$persen4="'";
			if ($row->n1 > 0)
			{
				$persen1=($row->n2 *100 )/ $row->n1;
				$persen2=($row->n3 *100 )/ $row->n1;
			}
			if ($row->n2 > 0)
			{
				$persen3=($row->n3 *100 )/ $row->n2;
			}
			if ($row->n4 > 0)
			{
				$persen4=($row->n3 *100 )/ $row->n4;
			}
		  echo "<tr>
			<td class='isi_laporan'>".fnSpasi($row->level_spasi)."$row->nama</td>
			<td  class='isi_laporan' align='right'>".number_format($row->n1,0,',','.')."</td>
			<td  class='isi_laporan' align='right'>".number_format($row->n2,0,',','.')."</td>
			<td  class='isi_laporan' align='right'>".number_format($row->n3,0,',','.')."</td>
			<td  class='isi_laporan' align='right'>".number_format($row->n4,0,',','.')."</td>
			<td  class='isi_laporan' align='center'>".number_format($persen1,2,',','.')."</td>
			<td  class='isi_laporan' align='center'>".number_format($persen2,2,',','.')."</td>
			<td  class='isi_laporan' align='center'>".number_format($persen3,2,',','.')."</td>
			<td  class='isi_laporan' align='center'>".number_format($persen4,2,',','.')."</td>
		  </tr>";
		}
		echo "</div>";
		return "";
	}
	
}
?>
