<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_tak_rptTakSaldo extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$periode=$tmp[0];
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
		$periode=$tmp[0];
		/*
		$sql="select a.no_kirim,a.modul,a.kode_lokasi,a.kode_loktuj,a.keterangan,a.nilai,date_format(a.tanggal,'%d/%m/%Y') as tgl_kirim,a.kode_loktuj,
b.no_terima,date_format(b.tanggal,'%d/%m/%Y')  as tgl_terima
from takkirim_m a
left join takterima_m b on a.no_kirim=b.no_kirim and a.kode_lokasi=b.kode_lokkirim

";
*/
	$sql="select a.no_kirim,a.modul,a.kode_lokasi,a.kode_loktuj,a.keterangan,a.nilai,date_format(a.tanggal,'%d/%m/%Y') as tgl_kirim,a.kode_loktuj,
b.no_terima,date_format(b.tanggal,'%d/%m/%Y')  as tgl_terima
from takkirim_m a
left join takterima_m b on a.no_terima=b.no_terima 

";
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("tak outstanding","nasional","TAHUN $tahun");
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='90'  align='center' class='header_laporan'>No Kirim</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl Kirim</td>
	 <td width='50'  align='center' class='header_laporan'>Modul</td>
	 <td width='50'  align='center' class='header_laporan'>Lokasi Awal</td>
	 <td width='50'  align='center' class='header_laporan'>Lokasi Tujuan</td>
	 <td width='250'  align='center' class='header_laporan'>Keterangan</td>
	 <td width='90'  align='center' class='header_laporan'>Nilai</td>
	 <td width='90'  align='center' class='header_laporan'>No Terima</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl Terima</td>
     </tr>  ";
		$nilai=0;$harian=0;$transport=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>";
	
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBukti('$row->no_kirim','$row->kode_loktuj','$row->modul');\">$row->no_kirim</a>";
	
	 echo "</td>
	  <td class='isi_laporan' align='center'>$row->tgl_kirim</td>
	  <td class='isi_laporan' align='center'>$row->modul</td>
	 <td class='isi_laporan' align='center'>$row->kode_lokasi</td>
	  <td class='isi_laporan' align='center'>$row->kode_loktuj</td>
	 <td class='isi_laporan'>$row->keterangan</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
	 <td class='isi_laporan' align='center'>$row->no_terima</td>
	 <td class='isi_laporan' align='center'>$row->tgl_terima</td>
	 </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='isi_laporan' align='center' colspan='7'>Total</td>
	  <td class='isi_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
    </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
