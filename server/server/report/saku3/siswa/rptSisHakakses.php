<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_siswa_rptSisHakakses extends server_report_basic
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
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$kode_pp=$tmp[1];
        $periode=$tmp[2];
        
        // echo json_encode($tmp);
		
		$sql="select a.nik,a.pass,b.nama
        from sis_hakakses a
        inner join sis_siswa b on a.nik = b.nis and a.kode_lokasi=b.kode_lokasi and a.kode_pp=b.kode_pp
        $this->filter
        order by a.nik";

		$start = (($this->page-1) * $this->rows);
        // $rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
        $rs=$dbLib->execute($sql);	
		
		$i = 1;
		
		$AddOnLib=new server_util_AddOnLib();
		
		
        echo "<div align='center'>"; 
        echo $AddOnLib->judul_laporan("laporan user akses siswa ",$this->lokasi);
        echo "<table   border='1' cellpadding='0' cellspacing='0' class='kotak'>
            <tr bgcolor='#CCCCCC'>
                <td width='100' align='center' class='header_laporan'>NIK</td>
                <td width='200' align='center' class='header_laporan'>Nama</td>
                <td width='100' align='center' class='header_laporan'>Password</td>                
            </tr>";
		while ($row = $rs->FetchNextObject($toupper=false))
		{   
            echo "<tr>
                <td  class='isi_laporan'>$row->nik</td>
                <td class='isi_laporan'>$row->nama</td>
                <td class='isi_laporan'>$row->pass</td>
                </tr>";	
        }
        
		echo "</table></div>";
		return "";
	}
	
}
?>
  
