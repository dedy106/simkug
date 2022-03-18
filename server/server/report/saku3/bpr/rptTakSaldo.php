<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_bpr_rptTakSaldo extends server_report_basic
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
		$sql="select a.no_bukti,a.modul,a.kode_lokasi,a.kode_lokasi,a.keterangan,a.nilai1,date_format(a.tanggal,'%d/%m/%Y') as tgl_kirim,a.param1,
b.no_bukti as no_terima,date_format(b.tanggal,'%d/%m/%Y')  as tanggal,d.nama as nama_lokasi,e.nama as nama_loktuj,a.kode_lokasi 
from trans_m a
left join trans_m b on a.no_bukti=b.no_ref1 and a.kode_lokasi=b.param1
inner join lokasi d on a.kode_lokasi=d.kode_lokasi
inner join lokasi e on a.param1=e.kode_lokasi
$this->filter
order by a.no_bukti
";
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("saldo tak",$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='90'  align='center' class='header_laporan'>No Kirim</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl Kirim</td>
	 <td width='200'  align='center' class='header_laporan'>Lokasi Awal</td>
	 <td width='200'  align='center' class='header_laporan'>Lokasi Tujuan</td>
	 <td width='250'  align='center' class='header_laporan'>Keterangan</td>
	 <td width='90'  align='center' class='header_laporan'>Nilai</td>
	 <td width='90'  align='center' class='header_laporan'>No Terima</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl Terima</td>
     </tr>  ";
		$nilai=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai+=$row->nilai1;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>";
	
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKirim('$row->no_bukti','$row->kode_lokasi');\">$row->no_bukti</a>";
	
	 echo "</td>
	  <td class='isi_laporan' >$row->tgl_kirim</td>
	 <td class='isi_laporan'>$row->kode_lokasi - $row->nama_lokasi</td>
	  <td class='isi_laporan'>$row->param1 - $row->nama_loktuj</td>
	 <td class='isi_laporan'>$row->keterangan</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai1,0,",",".")."</td>
	 <td class='isi_laporan' >";
	 echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTerima('$row->no_terima','$row->param1');\">$row->no_terima</a>";

	 echo "</td>
	 <td class='isi_laporan' align='center'>$row->tanggal</td>
	 </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='isi_laporan' align='center' colspan='6'>Total</td>
	  <td class='isi_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
    </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
