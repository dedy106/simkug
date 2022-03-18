<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_tk_rptSiswa extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select count(a.kode_siswa)
from tk_siswa a
$this->filter";
		
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
		$nama_cab=$tmp[1];
		$sql="select   a.kode_siswa, a.kode_lokasi, a.kode_tingkat, a.nama, a.tempat, a.tgl_lahir, a.goldar, a.agama, a.ayah, a.ibu, a.alamat, a.no_tel
from tk_siswa a
$this->filter order by a.kode_siswa";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("data siswa",$this->lokasi,"");
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='80'  align='center' class='header_laporan'>Kode Siswa</td>
	  <td width='200'  align='center' class='header_laporan'>Nama</td>
	  <td width='60'  align='center' class='header_laporan'>Tingkat</td>
	 <td width='200'  align='center' class='header_laporan'>Alamat</td>
     <td width='90'  align='center' class='header_laporan'>No Telp</td>
     <td width='60'  align='center' class='header_laporan'>Tgl Lahir</td>
     <td width='100'  align='center' class='header_laporan'>Tempat</td>
	 <td width='70'  align='center' class='header_laporan'>Agama</td>
	 <td width='40'  align='center' class='header_laporan'>Gol Darah</td>
	 <td width='100'  align='center' class='header_laporan'>Ayah</td>
	 <td width='100'  align='center' class='header_laporan'>Ibu</td>
	  </tr>  ";
		$nilai=0;$nilai_ppn=0;$tagihan=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>$row->kode_siswa</td>
	 <td class='isi_laporan'>$row->nama</td>
	 <td class='isi_laporan'>$row->kode_tingkat</td>
	 <td class='isi_laporan'>$row->alamat</td>
	 <td class='isi_laporan'>$row->no_telp</td>
	 <td class='isi_laporan'>$row->tgl_lahir</td>
	 <td class='isi_laporan'>$row->tempat</td>
	 <td class='isi_laporan'>$row->agama</td>
	 <td class='isi_laporan'>$row->goldar</td>
	 <td class='isi_laporan'>$row->ayah</td>
	 <td class='isi_laporan'>$row->ibu</td>
     </tr>";
			$i=$i+1;
		}
	
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
