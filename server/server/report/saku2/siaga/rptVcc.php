<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_siaga_rptVcc extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select count(b.no_invoice)
from gr_vcc_m a
inner join gr_vcc_d b on a.no_vcc=b.no_vcc and a.kode_lokasi=b.kode_lokasi
$this->filter";
		
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
		$sql="select b.no_invoice,b.nama_cust,b.nilai,b.diskon,b.nilai-b.diskon as nilai_diskon,b.ppn,b.biaya,b.materai,
       b.nilai-b.diskon+b.ppn+b.biaya+b.materai as total
from gr_vcc_m a
inner join gr_vcc_d b on a.no_vcc=b.no_vcc and a.kode_lokasi=b.kode_lokasi
$this->filter order by b.no_invoice";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("tagihan VCOSS - cabang $nama_cab",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='100'  align='center' class='header_laporan'>No Invoice</td>
     <td width='250'  align='center' class='header_laporan'>Nama Perusahaan</td>
     <td width='80'  align='center' class='header_laporan'>Jumlah Pemakaian</td>
     <td width='70'  align='center' class='header_laporan'>Diskon</td>
     <td width='80'  align='center' class='header_laporan'>Total Setelah Diskon </td>
     <td width='70'  align='center' class='header_laporan'>PPN</td>
     <td width='70'  align='center' class='header_laporan'>Biaya Print Out</td>
     <td width='70'  align='center' class='header_laporan'>Materai </td>
     <td width='90'  align='center' class='header_laporan'>Total Tagihan </td>
   </tr>  ";
		$nilai=0;$diskon=0;$nilai_diskon=0;$ppn=0;$biaya=0;$materai=0;$total=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai=$nilai+$row->nilai;
			$diskon=$diskon+$row->diskon;
			$nilai_diskon=$nilai_diskon+$row->nilai_diskon;
			$ppn=$ppn+$row->ppn;
			$biaya=$biaya+$row->biaya;
			$materai=$materai+$row->materai;
			$total=$total+$row->total;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>$row->no_invoice</td>
	 <td class='isi_laporan'>$row->nama_cust</td>
     <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->diskon,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->nilai_diskon,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->ppn,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->biaya,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->materai,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->total,0,",",".")."</td>
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='isi_laporan' align='center' colspan='3'>Total</td>
     <td class='isi_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($diskon,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($nilai_diskon,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($ppn,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($biaya,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($materai,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($total,0,",",".")."</td>
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
