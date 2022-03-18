<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_siswa_rptSisSiswaYptReg extends server_report_basic
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
		$nama_file="siswa.xls";
		
		$sql="select nama from pp where kode_lokasi='$kode_lokasi' and kode_pp='$kode_pp' ";
		$rs = $dbLib->execute($sql);
		$row = $rs->FetchNextObject($toupper=false);
		$nama_pp=$row->nama;
		
		$sql="select a.no_reg,a.kode_lokasi,a.kode_pp,a.nama,a.id_bank,a.nama,a.agama,a.jk,a.tmp_lahir,a.tgl_lahir,a.kwn,a.foto,a.alamat_siswa,
		a.tlp_siswa,a.hp_siswa,a.email,a.asal_sek,a.no_ijazah,a.nilai_un
from sis_siswareg a
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
  <td width='60' align='center' class='header_laporan'>No Reg</td>
  <td width='300' align='center' class='header_laporan'>Nama</td>
  <td width='60' align='center' class='header_laporan'>PP</td>
  <td width='80' align='center' class='header_laporan'>ID Bank</td>
  <td width='200' align='center' class='header_laporan'>Tempat Lahir</td>
  <td width='60' align='center' class='header_laporan'>Tanggal Lahir</td>
  <td width='30' align='center' class='header_laporan'>JK</td>
  <td width='90' align='center' class='header_laporan'>Agama</td>
  <td width='90' align='center' class='header_laporan'>Kewarganegaraan</td>
  <td width='90' align='center' class='header_laporan'>Tlp Siswa</td>
  <td width='100' align='center' class='header_laporan'>HP Siswa</td>
  <td width='300' align='center' class='header_laporan'>Alamat Siswa</td>
  <td width='90' align='center' class='header_laporan'>Email Siswa</td>
  <td width='300' align='center' class='header_laporan'>Asal Sekolah</td>
  <td width='100' align='center' class='header_laporan'>No. Ijazah</td>
  <td width='90' align='center' class='header_laporan'>Nilai UN</td>

</tr>";
			while ($row = $rs->FetchNextObject($toupper=false))
		{
			
			echo "<tr>
   <td class='isi_laporan' align='center'>$i</td> 
   <td class='isi_laporan'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKartu('$row->no_reg','$row->kode_lokasi','$row->kode_pp');\">$row->no_reg</a>";
			echo "</td>
			<td class='isi_laporan'>$row->nama</td>
			<td class='isi_laporan'>$row->kode_pp</td>
			<td class='isi_laporan'>$row->id_bank</td>
			<td class='isi_laporan'>$row->tmp_lahir</td>
			<td class='isi_laporan'>$row->tgl_lahir</td>
			<td class='isi_laporan'>$row->jk</td>
			<td class='isi_laporan'>$row->agama</td>
			<td class='isi_laporan'>$row->kwn</td>
			<td class='isi_laporan'>$row->tlp_siswa</td>
			<td class='isi_laporan'>$row->hp_siswa</td>
			<td class='isi_laporan'>$row->alamat_siswa</td>
			<td class='isi_laporan'>$row->email</td>
			<td class='isi_laporan'>$row->asal_sek</td>
			<td class='isi_laporan'>$row->no_ijazah</td>
			<td class='isi_laporan'>$row->nilai_un</td>

    </tr>";	 
			$i=$i+1;
		}
	
		echo "</table></div>";
		return "";
	}
	
}
?>
  
