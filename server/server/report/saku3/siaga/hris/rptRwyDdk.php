<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_siaga_hris_rptRwyDdk extends server_report_basic
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
		$sql="select a.nik,b.nama,c.nama as strata,d.nama as jur,a.institusi,a.tahun,a.keterangan,a.dana 
						from gr_rwypddk a 
						inner join gr_karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi 
						inner join gr_strata c on a.kode_strata=c.kode_strata and a.kode_lokasi=c.kode_lokasi 
						inner join gr_jur d on a.kode_jur=d.kode_jur and a.kode_lokasi=d.kode_lokasi 
						$this->filter
						order by a.nik ";
							  
							  
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("data riwayat pendidikan",$this->lokasi,"");
		echo "<table border='1' cellspacing='0' cellpadding='0' colspan='7' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='80'  align='center' class='header_laporan'>NIK</td>
     <td width='200'  align='center' class='header_laporan'>Nama</td>
     <td width='150'  align='center' class='header_laporan'>Strata</td>
     <td width='150'  align='center' class='header_laporan'>Jurusan</td>
	 <td width='150'  align='center' class='header_laporan'>Institusi</td>
     <td width='150'  align='center' class='header_laporan'>Tahun</td>
	 <td width='150'  align='center' class='header_laporan'>Keterangan</td>
     <td width='150'  align='center' class='header_laporan'>Dana</td>
	  </tr>  ";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>$row->nik</td>
	 <td class='isi_laporan'>$row->nama</td>
	 <td class='isi_laporan'>$row->strata</td>
	 <td class='isi_laporan'>$row->jur</td>
	 <td class='isi_laporan'>$row->institusi</td>
	 <td class='isi_laporan'>$row->tahun</td>
	 <td class='isi_laporan'>$row->keterangan</td>
	 <td class='isi_laporan'>$row->dana</td>
     </tr>";
			$i=$i+1;
		}
	
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
