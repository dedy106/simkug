<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_siaga_hris_rptJob extends server_report_basic
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
		$sql="select substring(b.periode,0,7) as periode,a.kode_jab,c.nama as jab,a.kode_job,a.nama,a.keterangan,date_format(a.tgl_mulai,'%d/%m/%Y') as tgl_mulai,date_format(a.tgl_selesai,'%d/%m/%Y') as tgl_selesai
		from gr_rekrut_job a
		inner join (select a.tgl_input,CONVERT(VARCHAR(30),a.tgl_input,112) as periode from gr_rekrut_job a )b on a.tgl_input=b.tgl_input 
		inner join gr_jab c on a.kode_jab=c.kode_jab 
$this->filter
order by a.kode_job";
		
		$rs = $dbLib->execute($sql);		
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("data lowongan pekerjaan",$this->lokasi,"");
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='50'  align='center' class='header_laporan'>Kode</td>
	 <td width='200'  align='center' class='header_laporan'>Posisi</td>
	 <td width='200'  align='center' class='header_laporan'>Jabatan</td>
	 <td width='200'  align='center' class='header_laporan'>Keterangan</td>
     <td width='90'  align='center' class='header_laporan'>Tanggal Mulai</td>
     <td width='90'  align='center' class='header_laporan'>Tanggal Selesai</td>
	  </tr>  ";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>$row->kode_job</td>
	 <td class='isi_laporan'>$row->nama</td>
	 <td class='isi_laporan'>$row->jab</td>
	 <td class='isi_laporan'>$row->keterangan</td>
	 <td class='isi_laporan'>$row->tgl_mulai</td>
	 <td class='isi_laporan'>$row->tgl_selesai</td>
     </tr>";
			$i=$i+1;
		}
	
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
