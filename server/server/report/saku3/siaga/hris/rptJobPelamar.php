<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_siaga_hris_rptJobPelamar extends server_report_basic
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
		$sql="select substring(e.periode,0,7) as periode,a.kode_job,b.nama as nama_job,a.nip,c.nama,date_format(a.tanggal,'%d/%m/%Y') as tanggal,d.nama as media 
		from gr_rekrut_job_pelamar a 
		inner join gr_rekrut_job b on a.kode_job=b.kode_job and a.kode_lokasi=b.kode_lokasi 
		inner join gr_rekrut_pelamar c on a.nip=c.nip and a.kode_lokasi=c.kode_lokasi 
		inner join gr_rekrut_media d on a.kode_media=d.kode_media and a.kode_lokasi=d.kode_lokasi 
		inner join (select a.tgl_input,CONVERT(VARCHAR(30),a.tgl_input,112) as periode 
		from gr_rekrut_job_pelamar a )e on a.tgl_input=e.tgl_input			
		$this->filter
		order by a.kode_job";
		
		$rs = $dbLib->execute($sql);		
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("data pelamar pekerjaan",$this->lokasi,"");
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='90'  align='center' class='header_laporan'>Kode Job</td>
	  <td width='200'  align='center' class='header_laporan'>Nama Job</td>
	 <td width='50'  align='center' class='header_laporan'>NIP</td>
     <td width='90'  align='center' class='header_laporan'>Nama</td>
     <td width='90'  align='center' class='header_laporan'>Tanggal</td>
     <td width='90'  align='center' class='header_laporan'>Media</td>
	  </tr>  ";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>$row->kode_job</td>
	 <td class='isi_laporan'>$row->nama_job</td>
	 <td class='isi_laporan'>$row->nip</td>
	 <td class='isi_laporan'>$row->nama</td>
	 <td class='isi_laporan'>$row->tanggal</td>
	 <td class='isi_laporan'>$row->media</td>
     </tr>";
			$i=$i+1;
		}
	
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
