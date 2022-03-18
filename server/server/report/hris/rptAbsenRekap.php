<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_hris_rptAbsenBulan extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
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
		$nik_user=$tmp[0];
		$level=$tmp[1];
		$sql="select a.nik,a.nama,b.nama as loker,c.nama as jab,d.nama as dept,e.nama as dir
from gr_karyawan a
inner join gr_loker b on a.kode_loker=b.kode_loker and a.kode_lokasi=b.kode_lokasi
inner join gr_jab c on a.kode_jab=c.kode_jab and a.kode_lokasi=c.kode_lokasi
inner join gr_dept d on a.kode_dept=d.kode_dept and a.kode_lokasi=d.kode_lokasi
inner join gr_dir e on a.kode_dir=e.kode_dir and a.kode_lokasi=e.kode_lokasi $this->filter order by a.nik";
		error_log($sql);
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		$i = 1;
		$jum=$rs->recordcount();
		echo "<div align='center'>"; 
		echo "<table width='800' border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td><table  border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='150'>NIK</td>
        <td width='250'>: A </td>
        <td width='150'>DIREKTORAT</td>
        <td width='250'>: A </td>
      </tr>
      <tr>
        <td>NAMA</td>
        <td>: A </td>
        <td>DEPARTEMEN</td>
        <td>: A </td>
      </tr>
      <tr>
        <td>JABATAN</td>
        <td>: A </td>
        <td>LOKER</td>
        <td>: A </td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td><table width='100%'  border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='200'>ABSEN BULAN </td>
        <td width='600'>: A </td>
      </tr>
      <tr>
        <td>HARI KERJA SIBULAN </td>
        <td>: A </td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td><table border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='30' rowspan='2' align='center'>NO</td>
        <td colspan='4' align='center'>DATANG</td>
        <td width='150' rowspan='2' align='center'>LOKER</td>
		<td colspan='4' align='center'>PULANG</td>
        <td width='150' rowspan='2' align='center'>KETERANGA N </td>
        </tr>
      <tr>
        <td width='80' align='center'>HARI</td>
        <td width='50' align='center'>JAM KERJA </td>
        <td width='50' align='center'>JAM SWAP</td>
        <td width='50' align='center'>SELISIH</td>
        <td width='80' align='center'>HARI</td>
        <td width='50' align='center'>JAM KERJA </td>
        <td width='50' align='center'>JAM SWAP</td>
        <td width='50' align='center'>SELISIH</td>
        </tr>";
      echo "<tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        </tr>";
    echo "</table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
</table>";
      
			
			$i=$i+1;
		}
		
		echo "</div>";
			
		return "";
	}
	
}
?>
  
