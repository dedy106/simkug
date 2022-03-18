<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_produk_rptSiswa extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		
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
		$periode=$tmp[1];
		$sql="select distinct a.kode_akt,a.kode_kelas,b.nama as akt,c.nama as kls,d.nama as stat
from sis_siswa a
inner join sis_angkat b on a.kode_akt=b.kode_akt and a.kode_lokasi=b.kode_lokasi
inner join sis_kelas c on a.kode_kelas=c.kode_kelas and a.kode_lokasi=c.kode_lokasi
inner join sis_siswa_status d on a.kode_status=d.kode_ss and a.kode_lokasi=d.kode_lokasi
$this->filter
order by a.kode_akt ";

	$rs = $dbLib->execute($sql);	
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("daftar siswa",$this->lokasi,"");
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table border='1' cellspacing='0' cellpadding='1' class='kotak'>
 
  <tr >
    <td height='23' colspan='7' class='header_laporan'><table  border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='99' class='header_laporan'>Angkatan</td>
        <td width='360' class='header_laporan'>: $row->akt</td>
      </tr>
	   <tr>
        <td width='99' class='header_laporan'>Kelas</td>
        <td width='360' class='header_laporan'>: $row->kode_kelas - $row->kls</td>
      </tr>

	  <tr>
        <td class='header_laporan'>Status </td>
        <td class='header_laporan'>: $row->stat</td>
      </tr>

	  
    </table></td>
  </tr>
 
  
  <tr bgcolor='#CCCCCC'>
	<td  width='50' class='header_laporan' align='center'>NIS</td>
    <td width='200' class='header_laporan' align='center'>Nama</td>
    <td width='250' class='header_laporan' align='center'>Tempat, Tanggal Lahir</td>
	<td width='60'  class='header_laporan' align='center'>Jenis Kelamin</td>	
	<td width='300' class='header_laporan' align='center'>Alamat</td>	
	<td width='150' class='header_laporan' align='center'>HP Siswa</td>
	<td width='150' class='header_laporan' align='center'>HP Ayah</td>
	</tr>

";
			
			$sql="select a.nis,a.nama,a.tmplahir,a.tgllahir,a.jk,a.alamat_siswa,a.hp_siswa,a.tlp_ayah
from sis_siswa a
where a.kode_akt='$row->kode_akt' and a.kode_kelas='$row->kode_kelas'
 ";
			
			$rs1 = $dbLib->execute($sql);
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				
				echo "<tr>
	 <td class='isi_laporan'>$row1->nis</td>
     <td class='isi_laporan'>$row1->nama</td>
	 <td class='isi_laporan'>$row1->tmplahir - $row1->tgllahir</td>
     <td class='isi_laporan'>$row1->jk</td>
      <td class='isi_laporan'>$row1->alamat_siswa</td>
     <td class='isi_laporan'>$row1->hp_siswa</td>
     <td class='isi_laporan'>$row1->tlp_ayah</td>

 </tr>";
				
			}
			echo "
 </table><br>";
			
			$i=$i+1;
		}
		return "";
	}
	
}

?>
