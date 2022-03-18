<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_cianjur_rptHutangPb extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$sql="select count(a.no_pb)
from pb_m a $this->filter ";
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
		$periode=$tmp[0];
		
		
		$sql="select a.no_pb,a.no_hutang,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.keterangan,a.nilai,
		b.nama as nama_vendor,a.nik_buat,a.nik_tahu,c.nama as nama_buat,d.nama as nama_app,a.kode_lokasi,e.kota,a.tanggal,a.kode_vendor
    from pb_m a
    inner join vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi 
    left join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi 
    left join karyawan d on a.nik_tahu=d.nik and a.kode_lokasi=d.kode_lokasi
    inner join lokasi e on a.kode_lokasi=e.kode_lokasi
    $this->filter order by a.no_pb";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		$i = 1;
		
		$AddOnLib=new server_util_AddOnLib();
		$path = $_SERVER["SCRIPT_NAME"];				
		$path = substr($path,0,strpos($path,"server/serverApp.php"));		
		$pathfoto = $path . "image/logo_cianjur.jpg";
		
		echo "<div align='center'>"; 
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table width='800' border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td align='center' class='istyle17'>PERMINTAAN BAYAR</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td><table width='800' border='0' cellpadding='1' cellspacing='2'>
      <tr>
        <td width='100' class='header_laporan'>No Bukti </td>
        <td width='496' class='header_laporan'>:&nbsp;$row->no_pb</td>
      </tr>
      <tr>
        <td width='100' class='header_laporan'>No Hutang </td>
        <td width='496' class='header_laporan'>:&nbsp;$row->no_hutang</td>
      </tr>
      <tr>
        <td class='header_laporan'>Tanggal</td>
        <td class='header_laporan'>:&nbsp;$row->tgl</td>
      </tr>
    
      <tr>
        <td class='header_laporan'>Vendor</td>
        <td class='header_laporan'>: $row->kode_vendor - $row->nama_vendor </td>
      </tr>
	 
      <tr>
        <td class='header_laporan'>Keterangan </td>
        <td class='header_laporan'>:&nbsp;$row->keterangan</td>
      </tr>
	   <tr>
        <td class='header_laporan'>Nilai</td>
        <td class='header_laporan'>:&nbsp;".number_format($row->nilai,0,',','.')."</td>
      </tr>
    </table></td>
  </tr>
 <tr>
    <td align='right' style='padding:10px 10px;'><table width='300' border='1' cellpadding='0' cellspacing='0' class='kotak'>
  <tr>
    <td height='20' class='header_laporan' style='padding-left:20px;'>$row->kota, ".substr($row->tanggal,8,2).' '.$AddOnLib->ubah_periode(substr(str_replace('-','',$row->tanggal),0,6))."</td>
  </tr>
  <tr>
    <td><table border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td colspan='2' class='header_laporan'></td>
      </tr>
      <tr align='center'>
        <td width='150' class='header_laporan'>Diperiksa Oleh : </td>
        <td width='150' class='header_laporan'>Dibuat Oleh : </td>
      </tr>
      <tr>
        <td height='40'>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr align='center'>
        <td class='header_laporan'><u>$row->nama_app</u></td>
        <td class='header_laporan'><u>$row->nama_buat</u></td>
      </tr>
      <tr align='center'>
        <td class='header_laporan'>NIK.$row->nik_app</td>
        <td class='header_laporan'>NIK.$row->nik_buat</td>
      </tr>
    </table></td>
  </tr>
</table></td>
  </tr>
</table><br>";
		echo "<DIV style='page-break-after:always'></DIV>";
		}
		echo "</div>";
		return "";
	}
	
}
?>
  
