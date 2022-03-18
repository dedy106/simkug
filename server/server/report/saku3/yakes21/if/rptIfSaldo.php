<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_yakes21_if_rptIfSaldo extends server_report_basic
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
		$sql="select a.no_aju,a.kode_akun,b.nama as akun,a.kode_pp,a.nilai,CONVERT(varchar, a.tanggal, 105) as tgl1,a.keterangan,
		a.no_app,CONVERT(varchar, c.tanggal, 105) as tgl2,a.no_reim,CONVERT(varchar, d.tanggal, 105) as tgl3
		from if_aju_m a 
		inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi =b.kode_lokasi
		left join yks_app_m c on a.no_aju=c.no_bukti and a.kode_lokasi =c.kode_lokasi
		left join if_reim_m d on a.no_reim=d.no_reim and a.kode_lokasi =d.kode_lokasi
$this->filter order by a.no_aju";
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("data posisi pengajuan imprest fund",$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='100'  align='center' class='header_laporan'>No IF</td>
	  <td width='90'  align='center' class='header_laporan'>Kode Akun</td>
	 <td width='200'  align='center' class='header_laporan'>Nama Akun</td>
     <td width='90'  align='center' class='header_laporan'>Kode PP</td>
     <td width='90'  align='center' class='header_laporan'>Nilai</td>
     <td width='120'  align='center' class='header_laporan'>Tanggal Transaksi</td>
     <td width='200'  align='center' class='header_laporan'>Keterangan</td>
	 <td width='150'  align='center' class='header_laporan'>No Approve Budget</td>
     <td width='150'  align='center' class='header_laporan'>Tanggal Approve Budget</td>
     <td width='100'  align='center' class='header_laporan'>No Reimburse</td>
	 <td width='90'  align='center' class='header_laporan'>Tanggal Reimburse</td>
	  </tr>  ";
		while ($row = $rs->FetchNextObject($toupper=false))
		{

			echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>$row->no_aju</td>
	 <td class='isi_laporan'>$row->kode_akun</td>
	 <td class='isi_laporan'>$row->akun</td>
	 <td class='isi_laporan'>$row->kode_pp</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
	 <td class='isi_laporan'>$row->tgl1</td>
	 <td class='isi_laporan'>$row->keterangan</td>
	 <td class='isi_laporan'>$row->no_app</td>
	 <td class='isi_laporan'>$row->tgl2</td>
	 <td class='isi_laporan'>$row->no_reim</td>
	 <td class='isi_laporan'>$row->tgl3</td>
     </tr>";
			$i=$i+1;
		}
	
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
