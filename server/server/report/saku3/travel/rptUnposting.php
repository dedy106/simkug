<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_travel_rptUnposting extends server_report_basic
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
		$sql="select b.nama as nama_user,c.nama as nama_app,a.no_unpost,a.kode_lokasi,a.periode,date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.modul,a.keterangan,a.nik_buat,a.nik_app,a.no_del,a.tgl_input,a.nik_user,a.nilai
from unposting_m a
inner join karyawan b on a.nik_user=b.nik and a.kode_lokasi=b.kode_lokasi
inner join karyawan c on a.nik_app=c.nik and a.kode_lokasi=c.kode_lokasi
$this->filter order by a.no_unpost";
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("data unposting",$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='80'  align='center' class='header_laporan'>No Unposting</td>
	  <td width='100'  align='center' class='header_laporan'>Keterangan</td>
	 <td width='80'  align='center' class='header_laporan'>Modul</td>
     <td width='90'  align='center' class='header_laporan'>Tanggal</td>
     <td width='150'  align='center' class='header_laporan'>Tanggal Input</td>
	 <td width='90'  align='center' class='header_laporan'>NIK User</td>
	 <td width='150'  align='center' class='header_laporan'>Nama</td>
	 <td width='90'  align='center' class='header_laporan'>NIK APP</td>
	 <td width='150'  align='center' class='header_laporan'>Nama</td>
     <td width='90'  align='center' class='header_laporan'>Nilai</td>

	  </tr>  ";
		$nilai=0;$nilai_ppn=0;$tagihan=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai=$nilai+$row->nilai;
			$nilai_ppn=$nilai_ppn+$row->nilai_ppn;
			$tagihan=$tagihan+$row->tagihan;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>$row->no_unpost</td>
	 <td class='isi_laporan'>$row->keterangan</td>
	 <td class='isi_laporan'>$row->modul</td>
	 <td class='isi_laporan'>$row->tanggal</td>
	 <td class='isi_laporan'>$row->tgl_input</td>
	 <td class='isi_laporan'>$row->nik_user</td>
	 <td class='isi_laporan'>$row->nama_user</td>
	 <td class='isi_laporan'>$row->nik_app</td>
	 <td class='isi_laporan'>$row->nama_app</td>
	 <td class='isi_laporan'>$row->nilai</td>
     </tr>";
			$i=$i+1;
		}
	
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
