<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_produk_rptProyekSaldo extends server_report_basic
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
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$sql="select a.kode_lokasi,a.no_bukti,b.kode_proyek,b.nama as pryk,a.keterangan,
		(a.nilai1+a.nilai2) as total,a.nilai1 as tagihan,c.nama as nama_cust,a.nilai2 as ppn,
	   isnull(d.nilai,0) as byr,(a.nilai1+a.nilai2-d.nilai) as saldo ,d.no_bukti as nobyr
from trans_m a
inner join pr_proyek b on a.no_dokumen=b.kode_proyek and a.kode_lokasi=b.kode_lokasi 
inner join cust c on c.kode_cust=b.kode_cust and c.kode_lokasi=b.kode_lokasi 
left join trans_j d on a.no_bukti=d.no_selesai and a.kode_lokasi=d.kode_lokasi 

$this->filter
 order by a.no_bukti";
	
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("saldo piutang Proyek",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30' rowspan='2'  align='center' class='header_laporan'>No</td>
	 <td width='100' rowspan='2' align='center' class='header_laporan'>No Bukti</td>
	 <td width='100' rowspan='2' align='center' class='header_laporan'>Kode Proyek</td>
	 <td width='150' rowspan='2' align='center' class='header_laporan'>Nama Proyek</td>
     <td width='150' rowspan='2' align='center' class='header_laporan'>Nama Customer</td>
	 <td width='150' rowspan='2' align='center' class='header_laporan'>Keterangan</td>
     <td colspan='3'  align='center' class='header_laporan'>Tagihan</td>
     <td width='90' rowspan='2' align='center' class='header_laporan'>No. Bayar</td>
	 <td width='90' rowspan='2' align='center' class='header_laporan'>Bayar</td>
	 <td width='60' rowspan='2' align='center' class='header_laporan'>Saldo</td>
   </tr>
   <tr bgcolor='#CCCCCC'>
     <td width='90'  align='center' class='header_laporan'>Nilai Tagihan</td>
	 <td width='80'  align='center' class='header_laporan'>Nilai PPN</td>
	 <td width='90'  align='center' class='header_laporan'>Total</td>
     </tr>  ";
		$tagihan=0;$ppn=0;$total=0;$saldo=0;$byr=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$tagihan=$tagihan+$row->tagihan;
			$ppn=$ppn+$row->ppn;
			$total=$total+$row->total;
			$saldo=$saldo+$row->saldo;
			$byr=$byr+$row->byr;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
	 <td class='isi_laporan'>$row->no_bukti</td>
	 <td class='isi_laporan'>$row->kode_proyek</td>
	 <td class='isi_laporan'>$row->pryk</td>
	 <td class='isi_laporan'>$row->nama_cust</td>
	 <td class='isi_laporan'>$row->keterangan</td>
	 <td class='isi_laporan' align='right'>".number_format($row->tagihan,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->ppn,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->total,0,",",".")."</td>
	 <td class='isi_laporan'>$row->nobyr</td>
	  <td class='isi_laporan' align='right'>".number_format($row->byr,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->saldo,0,",",".")."</td>
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='isi_laporan' align='center' colspan='6'>Total</td>
     <td class='isi_laporan' align='right'>".number_format($tagihan,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($ppn,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($total,0,",",".")."</td>
     <td class='isi_laporan' align='right'></td>	 
	 <td class='isi_laporan' align='right'>".number_format($byr,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($saldo,0,",",".")."</td>
   
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
