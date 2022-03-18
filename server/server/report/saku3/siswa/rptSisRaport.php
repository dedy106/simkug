<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_siswa_rptSisRaport extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
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
		
		$sql="
        select a.no_bukti, a.kode_ta,a.kode_sem,a.kode_kelas,c.nama as kls,a.nis,b.nama as ta,d.nama as sis 
        from sis_raport_m a 
        inner join sis_ta b on a.kode_ta=b.kode_ta and a.kode_lokasi=b.kode_lokasi and a.kode_pp=b.kode_pp 
        inner join sis_kelas c on a.kode_kelas=c.kode_kelas and a.kode_lokasi=c.kode_lokasi and a.kode_pp=c.kode_pp 
        inner join sis_siswa d on a.nis=d.nis and a.kode_lokasi=d.kode_lokasi 
        $this->filter
        order by a.kode_ta";
        
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		$i = 1;
		
		$AddOnLib=new server_util_AddOnLib();
		
		
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("laporan raport siswa ",$this->lokasi);
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table   border='1' cellpadding='0' cellspacing='0' class='kotak'>
  <tr>
    <td colspan='20' style='padding:5px'><table width='100%' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td class='header_laporan' width='114'>No. Bukti </td>
        <td class='header_laporan'>:&nbsp;$row->no_bukti</td>
        </tr>
  
  <tr>
        <td class='header_laporan' width='114'>Tahun Ajaran </td>
        <td class='header_laporan'>:&nbsp;$row->ta</td>
        </tr>
		  <tr>
        <td class='header_laporan'>Semester   </td>
        <td class='header_laporan'>:&nbsp;$row->kode_sem</td>
      </tr>
	    <tr>
        <td class='header_laporan'>Kelas </td>
        <td class='header_laporan'>:&nbsp;$row->kls</td>
      </tr>
 	    <tr>
        <td class='header_laporan'>NIS </td>
        <td class='header_laporan'>:&nbsp;$row->nis - $row->sis </td>
      </tr>
    
    </table></td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='100' align='center' class='header_laporan'>Kode Mata Pelajaran</td>
	<td width='250' align='center' class='header_laporan'>Mata Pelajaran</td>
    <td width='100' align='center' class='header_laporan'>Nilai</td>
	
  </tr>";
			$sql1="select a.nilai,a.kode_matpel,d.nama as matpel
			from sis_raport_d a
			inner join sis_matpel d on a.kode_matpel=d.kode_matpel and a.kode_lokasi=d.kode_lokasi
			where a.no_bukti='$row->no_bukti' and a.nis='$row->nis' ";
		
			$rs1 = $dbLib->execute($sql1);
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				echo "<tr>
                <td  class='isi_laporan'>$row1->kode_matpel</td>
                <td class='isi_laporan'>$row1->matpel</td>
                <td class='isi_laporan' align='right'>$row1->nilai</td>
	            </tr>";		
				$j=$j+1;
			}
			echo "<br>";
		}
		echo "</div>";
		return "";
	}
	
}
?>
  
