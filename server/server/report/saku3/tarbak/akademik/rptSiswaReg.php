<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_siswa_rptSiswaReg extends server_report_basic
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
		
		$sql="select nama from pp where kode_lokasi='$kode_lokasi' and kode_pp='$kode_pp' ";
		$rs = $dbLib->execute($sql);
		$row = $rs->FetchNextObject($toupper=false);
		$nama_pp=$row->nama;
		
		$sql="select a.kode_ta, a.kode_pp,a.no_reg,a.nama,a.agama,a.jk,a.tmp_lahir,convert(varchar(20),a.tgl_lahir,103) as tgl,a.alamat_siswa,a.hp_siswa,
			a.asal_sek,a.no_ijazah,a.nilai_un,a.hp_ayah
		from sis_siswareg a
		$this->filter
 		order by a.no_reg ";
		
		$rs = $dbLib->execute($sql);	
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("daftar pendaftaran siswa",$this->lokasi."<br>".$nama_pp,"");
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1200'>
  <tr bgcolor='#CCCCCC'>
	<td  width='30' class='header_laporan' align='center'>No</td>
	<td  width='100' class='header_laporan' align='center'>No. Registrasi</td>
    <td width='200' class='header_laporan' align='center'>Nama</td>
	<td  width='100' class='header_laporan' align='center'>Agama</td>
    <td width='100' class='header_laporan' align='center'>JK</td>
	<td  width='100' class='header_laporan' align='center'>Tempat Lahir</td>
    <td width='60' class='header_laporan' align='center'>Tanggal Lahir</td>
	<td  width='250' class='header_laporan' align='center'>Alamat</td>
    <td width='100' class='header_laporan' align='center'>HP Siswa</td>
	<td  width='100' class='header_laporan' align='center'>Asal Sekolah</td>
    <td width='100' class='header_laporan' align='center'>HP No. Ijazah</td>
	<td  width='80' class='header_laporan' align='center'>Nilai UN</td>
    <td width='100' class='header_laporan' align='center'>HP Orang Tua</td>
   </tr>";
			while ($row = $rs->FetchNextObject($toupper=false))
		{
			
			echo "<tr>
	 <td class='isi_laporan' align='center'>$i</td>
	 <td class='isi_laporan'>$row->no_reg</td>
     <td class='isi_laporan'>$row->nama</td>
	 <td class='isi_laporan'>$row->agama</td>
     <td class='isi_laporan'>$row->jk</td>
      <td class='isi_laporan'>$row->tmp_lahir</td>
     <td class='isi_laporan'>$row->tgl</td>
     <td class='isi_laporan'>$row->alamat_siswa</td>
     <td class='isi_laporan'>$row->hp_siswa</td>
     <td class='isi_laporan'>$row->asal_sek</td>
     <td class='isi_laporan'>$row->no_ijazah</td>
     <td class='isi_laporan'>$row->nilai_un</td>
     <td class='isi_laporan'>$row->hp_ayah</td>
    </tr>";	 
			$i=$i+1;
		}
	
		echo "</table></div>";
		return "";
	}
	
}
?>
  
