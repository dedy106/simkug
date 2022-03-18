<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_siaga_hris_rptPelamar extends server_report_basic
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
		$sql="select a.nip,a.sts_didik,a.kode_kota, a.nama,a.no_ktp, a.tempat, date_format(a.tgl_lahir,'%d/%m/%Y') as tanggal , a.alamat, c.nama as kota, b.nama as prov,kodepos, a.no_telp, a.no_hp, 
							  a.sex, a.email, a.gol_darah, a.hobi, d.nama as pendidikan, a.jurusan, a.univ, a.ipk 
							  from gr_rekrut_pelamar a 
							  left join gr_prov b on a.kode_prov=b.kode_prov  
							  left join gr_kota c on a.kode_kota=c.kode_kota  
							  left join gr_status_didik d on a.sts_didik=d.sts_didik and a.kode_lokasi=d.kode_lokasi 
							  $this->filter
							  order by a.nip ";
							  
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("data pelamar",$this->lokasi,"");
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='80'  align='center' class='header_laporan'>NIP</td>
	  <td width='150'  align='center' class='header_laporan'>No KTP</td>
     <td width='100'  align='center' class='header_laporan'>Nama</td>
     <td width='150'  align='center' class='header_laporan'>Pendidikan</td>
     <td width='90'  align='center' class='header_laporan'>L/P</td>
	 <td width='100'  align='center' class='header_laporan'>Institusi</td>
	  </tr>  ";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>$row->nip</td>
	 <td class='isi_laporan'>$row->no_ktp</td>
	 <td class='isi_laporan'>$row->nama</td>
	 <td class='isi_laporan'>$row->pendidikan</td>
	 <td class='isi_laporan'>$row->sex</td>
	 <td class='isi_laporan'>$row->univ</td>
     </tr>";
			$i=$i+1;
		}
	
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
