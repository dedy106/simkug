<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_bengkel_rptJualHarian extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
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
		$tmp=explode("|",$this->filter2);
		$periode=$tmp[0];
		$tanggal=$tmp[1];
		
		
		$sql="select a.no_jual,a.tanggal,b.no_spk,b.kode_lokasi,b.cust,b.merk,b.no_polisi,date_format(a.tanggal,'%d/%m/%Y') as tgl,b.jenis,a.no_faktur,
		a.nilai,a.nilai_diskon,a.nilai_ppn,a.nilai_service,a.nilai-a.nilai_diskon+a.nilai_ppn+a.nilai_service as total
from fri_jual_m a
inner join fri_spk_m b on a.no_jual=b.no_jual and a.kode_lokasi=b.kode_lokasi
$this->filter $tgl
order by a.tanggal,a.no_jual";
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("laporan penjualan harian",$this->lokasi,"Tanggal ".$tanggal);
		echo "<table border='0' cellspacing='2' cellpadding='1' width='1400'>
  <tr>
    <td><table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='20'  align='center' class='header_laporan'>No</td>
	 <td width='60'  align='center' class='header_laporan'>No Bukti</td>
     <td width='60'  align='center' class='header_laporan'>No Faktur</td>
	 <td width='60'  align='center' class='header_laporan'>Tanggal</td>
	 <td width='60'  align='center' class='header_laporan'>Jenis</td>
	 <td width='200'  align='center' class='header_laporan'>Customer</td>
     <td width='120'  align='center' class='header_laporan'>Merk Mobil</td>
	 <td width='80'  align='center' class='header_laporan'>No Pol</td>
	 <td width='80'  align='center' class='header_laporan'>No SPK</td>
      <td width='80'  align='center' class='header_laporan'>Biaya (I)</td>
	 <td width='80'  align='center' class='header_laporan'>Biaya (II)</td>
	 <td width='80'  align='center' class='header_laporan'>Disc</td>
	 <td width='80'  align='center' class='header_laporan'>Ppn</td>
	 <td width='80'  align='center' class='header_laporan'>Total</td>
	  </tr>  ";
		$nilai=0;$nilai_ppn=0;$nilai_service=0;$nilai_diskon=0;$total=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai+=$row->nilai;
			$nilai_ppn+=$row->nilai_ppn;
			$nilai_service+=$row->nilai_service;
			$nilai_diskon+=$row->nilai_diskon;
			$total+=$row->total;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>$row->no_jual</td>
	 <td class='isi_laporan'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenFaktur('$row->no_jual','$row->kode_lokasi');\">$row->no_faktur</a></td>
	  <td class='isi_laporan'>$row->tgl</td>
	   <td class='isi_laporan'>$row->jenis</td>
	 <td class='isi_laporan'>$row->cust</td>
	 <td class='isi_laporan'>$row->merk</td>
	 <td class='isi_laporan'>$row->no_polisi</td>
	  <td class='isi_laporan'>$row->no_spk</td>
	 <td align='right' class='isi_laporan'>".number_format($row->nilai,0,",",".")."</td>
	 <td align='right' class='isi_laporan'>".number_format($row->nilai_service,0,",",".")."</td>
	 <td align='right' class='isi_laporan'>".number_format($row->nilai_diskon,0,",",".")."</td>
	 <td align='right' class='isi_laporan'>".number_format($row->nilai_ppn,0,",",".")."</td>
	  <td align='right' class='isi_laporan'>".number_format($row->total,0,",",".")."</td>
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
     <td class='isi_laporan' align='center' colspan='9'>Total</td>
    <td align='right' class='isi_laporan'>".number_format($nilai,0,",",".")."</td>
	 <td align='right' class='isi_laporan'>".number_format($nilai_service,0,",",".")."</td>
	 <td align='right' class='isi_laporan'>".number_format($nilai_diskon,0,",",".")."</td>
	 <td align='right' class='isi_laporan'>".number_format($nilai_ppn,0,",",".")."</td>
	  <td align='right' class='isi_laporan'>".number_format($total,0,",",".")."</td>
     </tr>";
		echo "</table></td>
  </tr>
  
</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
