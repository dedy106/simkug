<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_ypt_ginas_rptPayTun extends server_report_basic
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
		$periode=$tmp[1];
		$sql="select b.kode_lokasi,b.nik,b.nama as kryn,b.bank,b.no_rek,b.nama_rek,SUM(d.nilai) as nominal
		from hr_karyawan b
 inner join hr_gaji_loadumum c on b.nik=c.nik and b.kode_lokasi=c.kode_lokasi
$this->filter order by b.nik";
	
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("DAFTAR PAYROLL TUNAI",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <col width='35' />
  <col width='193' />
  <col width='192' />
  <col width='106' />
  <col width='166' />
  <col width='58' />
  <tr height='26'>
    <td height='26' width='35'>NO</td>
    <td width='193'>NAMA</td>
    <td width='192'>LOKASI</td>
    <td width='106'>JUMLAH</td>
    <td width='166'>TANDA TANGAN</td>
    <td width='58'>KET</td>
  </tr>
  <tr height='50'>
    <td height='50'>1</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr height='50'>
    <td height='50'>2</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr height='50'>
    <td height='50'>3</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr height='50'>
    <td height='50'>4</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr height='50'>
    <td height='50'>5</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr height='50'>
    <td height='50'>6</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr height='50'>
    <td height='50'>7</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr height='50'>
    <td height='50'>8</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr height='50'>
    <td height='50'>9</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr height='50'>
    <td height='50'>10</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr height='29'>
    <td colspan='3' height='29'><div align='center'>JUMLAH</div></td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
    </table>
<table cellspacing='0' cellpadding='0'>  
  <tr height='20'>
    <td height='20'></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr height='20'>
    <td height='20'></td>
    <td></td>
    <td></td>
    <td></td>
    <td colspan='2'>&nbsp;Bandung, 22    september 2017&nbsp;</td>
  </tr>
  <tr height='20'>
    <td height='20'></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr height='20'>
    <td height='20'></td>
    <td align='center'>Mengetahui,</td>
    <td align='center'>Menyetujui,</td>
    <td align='center'>Fiatur</td>
    <td align='center' colspan='2'>Pembuat Daftar,</td>
  </tr>
  <tr height='20'>
    <td height='20'></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr height='20'>
    <td height='20'></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr height='20'>
    <td height='20'></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr height='20'>
    <td height='20'></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr height='20'>
    <td height='20'></td>
    <td align='center' >NOVI CHANDRA DARMAWAN</td>
    <td align='center' >SUJAMRO</td>
    <td align='center' >IYAN WIDIYANA</td>
    <td align='center' colspan='2'>DUDDY DARYADI</td>
  </tr>
  <tr height='20'>
    <td height='20'></td>
    <td align='center'>Direktur</td>
    <td align='center'>Asman Outsourcing Area</td>
    <td align='center'>Keuangan</td>
    <td align='center' colspan='2'>Sdm</td>
  </tr>
";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
