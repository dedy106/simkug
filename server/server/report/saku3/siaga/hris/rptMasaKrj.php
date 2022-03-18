<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_siaga_hris_rptMasaKrj extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
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
		$nama_cab=$tmp[1];
		$sql="select a.nik,a.nama,date_format(a.tgl_masuk,'%d/%m/%Y') as tgl_masuk, datediff (month,a.tgl_masuk,GETDATE())-1 as bulan, a.kode_grade,b.nama as grade,d.nama as loker,c.nama as jabatan, a.kode_so 
from gr_karyawan a
 left join gr_grade  b on a.kode_grade=b.kode_grade and a.kode_lokasi=b.kode_lokasi 
left join gr_so  c on a.kode_so=c.kode_so and a.kode_lokasi=c.kode_lokasi 
 left join gr_loker d on a.kode_loker=d.kode_loker and a.kode_lokasi=d.kode_lokasi 
 
								
						$this->filter 
						order by a.nik ";
						
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("data masa kerja",$this->lokasi,"");
		echo "<table border='1' cellspacing='0' cellpadding='0' colspan='7' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='80'  align='center' class='header_laporan'>NIK</td>
     <td width='200'  align='center' class='header_laporan'>Nama</td>
     <td width='90'  align='center' class='header_laporan'>Tgl Masuk</td>
     <td width='80'  align='center' class='header_laporan'>Bulan</td>
	 <td width='150'  align='center' class='header_laporan'>Grade</td>
     <td width='150'  align='center' class='header_laporan'>Lokasi Kerja</td>
     <td width='150'  align='center' class='header_laporan'>Jabatan</td>
	  </tr>  ";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>$row->nik</td>
	 <td class='isi_laporan'>$row->nama</td>
	 <td class='isi_laporan'>$row->tgl_masuk</td>
	 <td class='isi_laporan' align='center' >$row->bulan</td>
	 <td class='isi_laporan'>$row->grade</td>
	 <td class='isi_laporan'>$row->loker</td>
	 <td class='isi_laporan'>$row->jabatan</td>
     </tr>";
			$i=$i+1;
		}
	
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
