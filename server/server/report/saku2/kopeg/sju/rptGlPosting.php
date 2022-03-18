<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_sju_rptGlPosting extends server_report_basic
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
		$sql="select a.no_post,a.keterangan,a.tanggal,a.modul,a.periode,a.nik_buat,a.nik_app,
		date_format(a.tanggal,'%d/%m/%Y') as tgl,convert(varchar, a.tgl_input, 103)+' '+convert(varchar, a.tgl_input, 108) as tgl_server,
b.nama as nama_buat,c.nama as nama_app
from posting_m a
left join karyawan b on a.nik_buat=b.nik
left join karyawan c on a.nik_app=c.nik
$this->filter order by a.tgl_input desc";
		
		$rs = $dbLib->execute($sql);	
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("data posting",$this->lokasi,"");
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='80'  align='center' class='header_laporan'>No Bukti</td>
	  <td width='60'  align='center' class='header_laporan'>Periode</td>
	 <td width='100'  align='center' class='header_laporan'>Tanggal Posting</td>
	 <td width='60'  align='center' class='header_laporan'>Tanggal Input</td>
     <td width='40'  align='center' class='header_laporan'>Modul</td>
     <td width='150'  align='center' class='header_laporan'>Nik Pembuat</td>
     <td width='150'  align='center' class='header_laporan'>Nik Approve</td>
	 <td width='200'  align='center' class='header_laporan'>Keterangan</td>
	  </tr>  ";
		$nilai=0;$nilai_ppn=0;$tagihan=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai=$nilai+$row->nilai;
			$nilai_ppn=$nilai_ppn+$row->nilai_ppn;
			$tagihan=$tagihan+$row->tagihan;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>$row->no_post</td>
	 <td class='isi_laporan'>$row->periode</td>
	 <td class='isi_laporan'>$row->tgl_server</td>
	 <td class='isi_laporan'>$row->tgl</td>
	 <td class='isi_laporan'>$row->modul</td>
	 <td class='isi_laporan'>$row->nik_buat - $row->nama_buat</td>
	 <td class='isi_laporan'>$row->nik_app - $row->nama_app</td>
	 <td class='isi_laporan'>$row->keterangan</td>
     </tr>";
			$i=$i+1;
		}
	
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
