<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_yakes21_piutang_rptHutangKesVendor extends server_report_basic
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
		$periode=$tmp[0];
		$kode_lokasi=$tmp[1];
		$nik_user=$tmp[2];
		$sql="exec sp_yk_hutang_tmp '$kode_lokasi','$periode','$nik_user'";
		
		$rs = $dbLib->execute($sql);	
		$sql="select a.kode_vendor,c.nama as nama_vendor,
       sum(ISNULL(a.n1,0)) as n1,sum(ISNULL(a.n2,0)) as n2,sum(ISNULL(a.n3,0)) as n3,sum(ISNULL(a.n4,0)) as n4,
       sum(ISNULL(a.n5,0)) as n5,sum(ISNULL(a.n6,0)) as n6,sum(ISNULL(a.n7,0)) as n7,sum(ISNULL(a.n8,0)) as n8
from yk_hutang_tmp a
inner join vendor c on a.kode_vendor=c.kode_vendor and a.kode_lokasi=c.kode_lokasi
$this->filter and a.nik_user='$nik_user' and (a.n1<>0 or a.n2<>0 or a.n3<>0 or a.n4<>0 or a.n5<>0 or a.n6<>0 or a.n7<>0 or a.n8<>0) 
group by a.kode_vendor,c.nama
order by a.kode_vendor ";
		$rs = $dbLib->execute($sql);		
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("saldo hutang",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table width='1200' border='1' cellpadding='0' cellspacing='0' class='kotak'>
  <tr bgcolor='#CCCCCC'>
    <td width='30' rowspan='2' align='center' class='header_laporan'>No</td>
    <td width='60' rowspan='2' align='center' class='header_laporan'>Kode Vendor</td>
    <td width='250' rowspan='2' align='center' class='header_laporan'>Nama Vendor</td>
    <td colspan='2' align='center' class='header_laporan'>Saldo Awal</td>
    <td colspan='2' align='center' class='header_laporan'>Debet</td>
    <td colspan='2' align='center' class='header_laporan'>Kredit</td>
    <td colspan='2' align='center' class='header_laporan'>Saldo Akhir </td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='80' align='center' class='header_laporan'>BP</td>
    <td width='80' align='center' class='header_laporan'>CC</td>
    <td width='80' align='center' class='header_laporan'>BP</td>
    <td width='80' align='center' class='header_laporan'>CC</td>
    <td width='80' align='center' class='header_laporan'>BP</td>
    <td width='80' align='center' class='header_laporan'>CC</td>
    <td width='80' align='center' class='header_laporan'>BP</td>
    <td width='80' align='center' class='header_laporan'>CC</td>
  </tr>  ";
		$n1=0;$n2=0;$n3=0;$n4=0;$n5=0;$n6=0;$n7=0;$n8=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			
			$n1+=$row->n1;
			$n2+=$row->n2;
			$n3+=$row->n3;
			$n4+=$row->n4;
			$n5+=$row->n5;
			$n6+=$row->n6;
			$n7+=$row->n7;
			$n8+=$row->n8;
		echo "<tr >
     <td class='isi_laporan' align='center' class='isi_laporan'>$i</td>
	 <td class='isi_laporan' class='isi_laporan'>$row->kode_vendor</td>
	 <td class='isi_laporan' class='isi_laporan'>$row->nama_vendor</td>
     <td class='isi_laporan' align='right' class='isi_laporan'>".number_format($row->n1,0,",",".")."</td>
	 <td class='isi_laporan' align='right' class='isi_laporan'>".number_format($row->n2,0,",",".")."</td>
	 <td class='isi_laporan' align='right' class='isi_laporan'>".number_format($row->n3,0,",",".")."</td>
	 <td class='isi_laporan' align='right' class='isi_laporan'>".number_format($row->n4,0,",",".")."</td>
	 <td class='isi_laporan' align='right' class='isi_laporan'>".number_format($row->n5,0,",",".")."</td>
	 <td class='isi_laporan' align='right' class='isi_laporan'>".number_format($row->n6,0,",",".")."</td>
	 <td class='isi_laporan' align='right' class='isi_laporan'>".number_format($row->n7,0,",",".")."</td>
	 <td class='isi_laporan' align='right' class='isi_laporan'>".number_format($row->n8,0,",",".")."</td>
     </tr>";
			$i=$i+1;
		}
		echo "<tr>
    <td colspan='3'>&nbsp;</td>
    <td class='isi_laporan' align='right'>".number_format($n1,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($n2,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($n3,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($n4,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($n5,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($n6,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($n7,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($n8,0,",",".")."</td>
  </tr>
	 ";
		
		echo "</table>";
		echo "</div>";
		return "";
		
	}
	
}
?>
