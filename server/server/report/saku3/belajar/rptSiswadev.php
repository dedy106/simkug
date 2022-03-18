<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_belajar_rptSiswadev extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
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
        $sql="select a.nim,a.nama,a.kode_jur,b.nama as nama_jur
        from dev_siswa a 
        inner join dev_jur b on a.kode_jur = b.kode_jur
        $this->filter
		order by a.nim ";
		print_r($rootDir);
		
		$rs = $dbLib->execute($sql);	
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("daftar siswa",$this->lokasi,"");
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' >
        <tr bgcolor='#CCCCCC'>
            <td width='30' align='center' class='header_laporan'>No</td>
            <td width='60' align='center' class='header_laporan'>NIM</td>
            <td width='250' align='center' class='header_laporan'>Nama</td>
            <td width='250' align='center' class='header_laporan'>Kode Jurusan</td>
            <td width='250' align='center' class='header_laporan'>Nama Jurusan</td>
        </tr>";
			while ($row = $rs->FetchNextObject($toupper=false))
		{
			
			echo "<tr>
                <td class='isi_laporan' align='center'>$i</td>
                <td class='isi_laporan'>$row->nim</td>
                <td class='isi_laporan'>$row->nama</td>
                <td class='isi_laporan'>$row->kode_jur</td>
                <td class='isi_laporan'>$row->nama_jur</td>
            </tr>";	 
			$i=$i+1;
		}
	
		echo "</table></div>";
		return "";
	}
	
}
?>
  
