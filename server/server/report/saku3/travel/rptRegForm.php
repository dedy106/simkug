<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_travel_rptRegForm extends server_report_basic
{
	
	function getTotalPage()
	{
		global $dbLib;
		
		$sql = "select 1";
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
		$sql="select a.no_reg, a.info, a.tgl_input,b.alamat, a.no_quota, a.uk_pakaian, b.hp, a.no_peserta, b.nopass, b.norek, b.nama as peserta, b.status, a.no_paket, c.nama as namapaket, a.no_jadwal, d.tgl_berangkat, 
			a.no_agen, e.nama_agen, a.no_type, f.nama as type, a.harga, h.nama_marketing, a.kode_lokasi
			from dgw_reg a		
			inner join dgw_peserta b on b.no_peserta=a.no_peserta and b.kode_lokasi=a.kode_lokasi
			inner join dgw_paket c on c.no_paket=a.no_paket and c.kode_lokasi=a.kode_lokasi
			inner join dgw_jadwal d on d.no_jadwal=a.no_jadwal and d.kode_lokasi=a.kode_lokasi
			inner join dgw_agent e on e.no_agen=a.no_agen and a.kode_lokasi=e.kode_lokasi
			inner join dgw_typeroom f on f.no_type=a.no_type and a.kode_lokasi=f.kode_lokasi
			inner join dgw_marketing h on h.no_marketing=e.kode_marketing and h.kode_lokasi=e.kode_lokasi 
      $this->filter
      order by a.no_reg";
		echo $sql;
		$rs = $dbLib->execute($sql);	
		$i = $start+1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		$path = $_SERVER["SCRIPT_NAME"];				
		$path = substr($path,0,strpos($path,"server/serverApp.php"));		
		$pathfoto = $path . "image/dago.png";
		echo "<div align='center'>"; 
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			
			echo	"<table width='800' border='0' cellspacing='1' cellpadding='2'>
  <tr>
    <td colspan='2' align='center'>FORMULIR PENDAFATARAN UMROH </td>
  </tr>
  <tr>
    <td colspan='2'>DATA PRIBADI </td>
  </tr>
  <tr>
    <td width='238'>NAMA LENGKAP </td>
    <td width='552'>$row->peserta</td>
  </tr>
  <tr>
    <td>NO ID CARD </td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>STATUS</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>JENIS KELAMIN </td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>TEMPAT &amp; TGL LAHIR </td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>BERANGKAT DENGAN </td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>PERNAH UMROH / HAJI </td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>PEKERJAAN</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>NO PASSPORT </td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>KANTOR IMIGRASI </td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>HP</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>TELEPON</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>EMAIL</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>ALAMAT</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>NO EMERGENCY </td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>MARKETING</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>AGEN</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>REFERAL</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td colspan='2'>&nbsp;</td>
  </tr>
  <tr>
    <td colspan='2'>DATA KELANGKAPAN PERJALANAN </td>
  </tr>
  <tr>
    <td>PAKET</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>PROGRAM UMROH / HAJI </td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>TYPE ROOM </td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>BIAYA PAKET </td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>DISKON</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>TGL KEBERANGKATAN </td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>UKURAN PAKAIAN </td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>SUMBER INFORMASI </td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align='center'>Calon Jamaah</td>
    <td align='center'>MO</td>
  </tr>
  <tr>
    <td height='60'>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
</table>
<br><DIV style='page-break-after:always'></DIV>
";
		
		}
		echo "</div>";
		return "";
	}
}
?>