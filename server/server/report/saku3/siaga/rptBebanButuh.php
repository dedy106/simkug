<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_siaga_rptBebanButuh extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		
		$sql = "select 1 ";
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
		$nama_user=$tmp[0];
		$sql = "select a.no_pb as no_kas,a.keterangan,b.nama,a.atensi as ref1,'Jakarta' as kota,tanggal,convert(varchar(20),a.tanggal,103) as tgl,
		a.nilai,a.kurs,a.nilai,a.nilai_curr,d.nama as nama_curr,a.kode_curr
from gr_pb_m a
inner join karyawan b on a.nik_buat=b.nik
inner join curr d on a.kode_curr=d.kode_curr
$this->filter order by a.no_pb ";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		$i = $start+1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		$path = $_SERVER["SCRIPT_NAME"];				
		$path = substr($path,0,strpos($path,"server/serverApp.php"));		
		$pathfoto = $path . "image/gratika.jpg";
		echo "<div align='center'>"; 
		while ($row = $rs->FetchNextObject($toupper=false))
		{
		
				echo	"<table width='800' border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td align='center'>FORM KEBUTUHAN BARANG / JASA</td>
  </tr>
  <tr>
    <td align='center'>(Pembelian dengan Cash &amp; Carry)</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='162'>Nomor Dokumen</td>
        <td width='628'>: a </td>
      </tr>
      <tr>
        <td>Unit Kerja</td>
        <td>: a </td>
      </tr>
      <tr>
        <td>Nomor Akun</td>
        <td>: a </td>
      </tr>
      <tr>
        <td>Total Nilai Anggaran</td>
        <td>: a </td>
      </tr>
      <tr>
        <td>Saat Penggunaan</td>
        <td>: a </td>
      </tr>
      <tr>
        <td>Data Kebutuhan</td>
        <td>: a </td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td><table width='800' border='1' cellspacing='0' cellpadding='0'>
      <tr>
        <td width='29' align='center'>No</td>
        <td width='340' align='center'>Nama Barang / Jasa</td>
        <td width='115' align='center'>Satuan</td>
        <td width='76' align='center'>Quantity</td>
        <td width='101' align='center'>Harga Satuan</td>
        <td width='125' align='center'>Jumlah Harga</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>Terbilang :</td>
  </tr>
  <tr>
    <td>Jakarta,</td>
  </tr>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td>Dibuat oleh,</td>
        <td>Disetujui oleh,</td>
      </tr>
      <tr>
        <td height='60'>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>user</td>
        <td>atasan user</td>
      </tr>
      <tr>
        <td>a</td>
        <td>a</td>
      </tr>
    </table></td>
  </tr>
</table>";

		}
		echo "</div>";
		return "";
	}
}
?>