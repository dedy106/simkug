<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_sju_rptPrKonfirmasi extends server_report_basic
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
		$jenis=$tmp[1];
		$sql="select a.no_quo,a.no_app,c.nama as nama_cust,c.alamat,d.nama as nama_tipe,a.tanggal,a.p_premi 
from sju_quo_m a
inner join sju_app_m b on a.no_app=b.no_app and a.kode_lokasi=b.kode_lokasi
inner join sju_cust c on a.kode_cust=c.kode_cust and a.kode_lokasi=c.kode_lokasi
inner join sju_tipe d on a.kode_tipe=d.kode_tipe and a.kode_lokasi=d.kode_lokasi
inner join sju_quo_vendor e on a.no_quo=e.no_quo and a.kode_lokasi=e.kode_lokasi $this->filter ";
		
		$rs=$dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		
		echo "<div align='center'>";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table width='800' border='0' cellspacing='2' cellpadding='1'>
 
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>Kepada Yth : </td>
  </tr>
  <tr>
    <td>$row->nama_cust</td>
  </tr>
  <tr>
    <td>$row->alamat</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>Dengan Hormat </td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>Menunjuk pengajuan  Bapak/Ibu untuk penutupan asuransi atas aset dan atau kepentingan Bapak/Ibu, dengan ini kami sampaikan Terms and Conditions polis berikut dengan tarip preminya, sebagai berikut:</td>
  </tr>
  <tr>
    <td><table width='600' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='20'>1.</td>
        <td width='580'>Terms and Conditions sebagaimana terlampir </td>
      </tr>
      <tr>
        <td>2.</td>
        <td>Tarip Premi sebesar ".number_format($row->p_premi,2,',','.')." % </td>
      </tr>
     
    </table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>Selanjutnya untuk proses penerbitan polis, kami mohon konfirmasi persetujuan Bapak/Ibu atas Terms and Conditions dan tarip premi tersebut di atas. </td>
  </tr>
  <tr>
    <td>Demikian kami sampaikan, atas perhatiannya kami ucapkan Terimakasih.</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
 
  <tr>
    <td>Jakarta , ".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))."</td>
  </tr>
  <tr>
    <td height='40'>&nbsp;</td>
  </tr>
  <tr>
    <td>$row->nama_cab</td>
  </tr>
  <tr>
    <td>Kepala Cabang</td>
  </tr>
 
</table>";
		echo "<DIV style='page-break-after:always'></DIV>";
		}

		return "<?div>";
		
	}
	
}
?>
