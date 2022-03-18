<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_siswa_rptKelulusan extends server_report_basic
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
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$kode_pp=$tmp[1];
		$jeno_reg=$tmp[2];
		$nama_file="kelulusan.xls";
		
		$sql="select nama from pp where kode_lokasi='$kode_lokasi' and kode_pp='$kode_pp' ";
		$rs = $dbLib->execute($sql);
		$row = $rs->FetchNextObject($toupper=false);
		$nama_pp=$row->nama;
		
		$sql="select a.no_reg, b.nama, a.kode_ta,a.keterangan,a.nilai 
        from sis_nilai_reg a
        inner join sis_siswareg b on a.no_reg=b.no_reg and a.kode_lokasi=b.kode_lokasi and a.kode_pp=b.kode_pp        
        $this->filter
        order by a.no_reg ";

		if ($jeno_reg=="Excel")
		{
			
			header("Pragma: public");
			header("Expires: 0");
			header("Cache-Control: must-revalidate, post-check=0, pre-check=0"); 
			header("Content-Type: application/force-download");
			header("Content-Type: application/octet-stream");
			header("Content-Type: application/download");;
			header("Content-Disposition: attachment;filename=$nama_file"); 
			header("Content-Transfer-Encoding: binary ");
			
		}
		$rs = $dbLib->execute($sql);	
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("data calon siswa",$this->lokasi."<br>".$nama_pp,"");
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' >
  <tr bgcolor='#CCCCCC'>
  <td width='30' align='center' class='header_laporan'>No</td>
  <td width='60' align='center' class='header_laporan'>No Registrasi</td>
  <td width='300' align='center' class='header_laporan'>Nama</td>
  <td width='60' align='center' class='header_laporan'>Angkatan</td>
  <td width='80' align='center' class='header_laporan'>Status</td>
  <td width='90' align='center' class='header_laporan'>Nilai</td>

</tr>";
			while ($row = $rs->FetchNextObject($toupper=false))
		{
			
			echo "<tr>
            <td class='isi_laporan' align='center'>$i</td> 
            <td class='isi_laporan'>$row->no_reg</a></td>
			<td class='isi_laporan'>$row->nama</td>
			<td class='isi_laporan'>$row->kode_ta</td>
			<td class='isi_laporan'>$row->keterangan</td>
			<td class='isi_laporan'>$row->nilai</td>
    </tr>";	 
			$i=$i+1;
		}
	
		echo "</table></div>";
		return "";
	}
	
}
?>
  
