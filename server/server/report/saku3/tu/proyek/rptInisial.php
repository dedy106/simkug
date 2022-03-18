<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_tu_proyek_rptInisial extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
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
		$sql="select a.kode_pp,a.kode_proyek,a.nama,a.kode_jenis,a.nilai_or,a.kode_drkb,a.tgl_mulai,a.tgl_selesai,a.no_pks
from tu_proyek a
$this->filter
order by a.kode_proyek";
		$rs = $dbLib->execute($sql);
		
		
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("LAPORAN DATA INISIALISASI",$this->lokasi);
		while ($row = $rs->FetchNextObject($toupper=false))
		{
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
	  <tr>
        <td colspan='7'><table  border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='111' class='header_laporan'>Bagian / Unit</td>
        <td width='379' class='header_laporan'>: $row->kode_pp </td>
      </tr>
      <tr>
        <td class='header_laporan'>ID Kegiatan </td>
        <td class='header_laporan'>: $row->kode_proyek </td>
      </tr>
      <tr>
        <td class='header_laporan'>No Dokumen</td>
        <td class='header_laporan'>: $row->no_pks </td>
      </tr>
      <tr>
        <td class='header_laporan'>Deskripsi</td>
        <td class='header_laporan'>: $row->nama </td>
      </tr>
      <tr >
        <td class='header_laporan'>Jenis </td>
        <td class='header_laporan'>: $row->kode_jenis </td>
      </tr>
      <tr >
        <td class='header_laporan'>Tanggal Mulai </td>
        <td class='header_laporan'>: $row->tgl_mulai </td>
      </tr>
      <tr >
        <td class='header_laporan'>Tanggal Selesai </td>
        <td class='header_laporan'>: $row->tgl_selesai </td>
      </tr>
      <tr>
        <td class='header_laporan'>Nilai Budget</td>
        <td class='header_laporan'>: ".number_format($row->nilai_or,2,',','.')."</td>
      </tr>
      <tr>
        <td class='header_laporan'>DRK Beban</td>
        <td class='header_laporan'>: $row->kode_drkb</td>
      </tr>	  
    </table></td>
	  </tr>";

      echo "";
       echo "

          </table></td>
        </tr>";
    echo "</table><br>";
	}
	echo "</div>";
	return "";
		
	}
	
}
?>
