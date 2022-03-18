<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_cianjur_rptTagihan extends server_report_basic
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
		$sql="select a.no_bukti, a.keterangan, a.no_ref1, a.param1, b.kode_project, c.nama as proyek,d.nama as cust, c.nilai as nilai_proyek, b.nilai as tagihan,
		b.nilai_ppn,b.nilai+b.nilai_ppn as total
from trans_m a
inner join piutang_d b on a.no_bukti=b.no_piutang and a.kode_lokasi=b.kode_lokasi
inner join pr_proyek c on b.kode_project=c.kode_proyek and c.kode_lokasi=b.kode_lokasi
inner join cust d on b.kode_cust=d.kode_cust and d.kode_lokasi=b.kode_lokasi
$this->filter order by a.no_bukti";
		
		$rs = $dbLib->execute($sql);		
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("data tagihan",$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='150'  align='center' class='header_laporan'>No Bukti</td>
	  <td width='150'  align='center' class='header_laporan'>No Faktur Pajak</td>
	 <td width='200'  align='center' class='header_laporan'>Keterangan</td>
     <td width='90'  align='center' class='header_laporan'>Kode Customer</td>
     <td width='90'  align='center' class='header_laporan'>Nama Customer</td>
     <td width='90'  align='center' class='header_laporan'>Kode Proyek</td>
     <td width='90'  align='center' class='header_laporan'>Nama Proyek</td>
     <td width='90'  align='center' class='header_laporan'>Nilai Tagihan</td>
     <td width='90'  align='center' class='header_laporan'>Nilai PPN</td>
	 <td width='90'  align='center' class='header_laporan'>Total</td>
	  </tr>  ";
		$nilai=0;$nilai_proyek=0;$saldo=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$tagihan=$tagihan+$row->tagihan;
			$nilai_ppn=$nilai_ppn+$row->nilai_ppn;
			$total=$total+$row->total;
		echo "<tr >
		<td class='isi_laporan' align='center'>$i</td>
		<td class='isi_laporan'>$row->no_bukti</td>
		<td class='isi_laporan'>$row->no_ref1</td>
		<td class='isi_laporan'>$row->keterangan</td>
		<td class='isi_laporan'>$row->param1</td>
		<td class='isi_laporan'>$row->cust</td>
		<td class='isi_laporan'>$row->kode_project</td>
		<td class='isi_laporan'>$row->proyek</td>
		<td class='isi_laporan' align='right'>".number_format($row->tagihan,0,',','.')."</td>
		<td class='isi_laporan' align='right'>".number_format($row->nilai_ppn,0,',','.')."</td>
		<td class='isi_laporan' align='right'>".number_format($row->total,0,',','.')."</td>
     	</tr>";
			$i=$i+1;
		}
		echo "<tr >
		<td class='header_laporan' align='center' colspan='8'>Total</td>
		<td class='header_laporan' align='right'>".number_format($tagihan,0,',','.')."</td>
		<td class='header_laporan' align='right'>".number_format($nilai_ppn,0,',','.')."</td>
		<td class='header_laporan' align='right'>".number_format($total,0,',','.')."</td>
		</tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
