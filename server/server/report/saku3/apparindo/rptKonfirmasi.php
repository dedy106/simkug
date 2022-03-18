<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_apparindo_rptKonfirmasi extends server_report_basic
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
		$sql="select a.kode_cust, a.no_bukti, a.no_inv, a.keterangan, a.nilai, a.bank,b.nama as cust
		from lab_konfirmasi a
		inner join cust2 b on a.kode_lokasi=b.kode_lokasi and a.kode_cust=b.kode_cust
$this->filter order by a.kode_cust";
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("data konfirmasi pembayaran",$this->lokasi,"");
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='150'  align='center' class='header_laporan'>No. Bukti</td>
	<td width='150'  align='center' class='header_laporan'>No. Invoice</td>
	 <td width='300'  align='center' class='header_laporan'>Customer</td>
     <td width='200'  align='center' class='header_laporan'>Keterangan</td>
     <td width='150'  align='center' class='header_laporan'>Bank</td>
     <td width='90'  align='center' class='header_laporan'>Nilai</td>
	  </tr>  ";
		$nilai=0;$nilai_ppn=0;$tagihan=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai+=$row->nilai;
			// $nilai_ppn=$nilai_ppn+$row->nilai_ppn;
			// $tagihan=$tagihan+$row->tagihan;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>$row->no_bukti</td>
	 <td class='isi_laporan'>$row->no_inv</td>
	 <td class='isi_laporan'>$row->cust</td>
	 <td class='isi_laporan'>$row->keterangan</td>
	 <td class='isi_laporan'>$row->bank</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
     </tr>";
			$i=$i+1;
		}
		echo "<tr>
        <td colspan='6' align='center' class='header_laporan'>Total</td>
        <td class='isi_bukti' align='right' class='header_laporan'>".number_format($nilai,0,",",".")."</td>
      </tr>";
	
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
