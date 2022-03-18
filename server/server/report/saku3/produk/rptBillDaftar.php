<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_produk_rptBillDaftar extends server_report_basic
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
		$sql="select a.no_bill,a.kode_lokasi,convert(varchar,a.tanggal,103) as tgl,a.no_kontrak,a.keterangan,b.nama as nama_cust,
		a.keterangan,a.nilai,a.nilai_ppn,a.nilai+a.nilai_ppn as total,
		convert(varchar,a.tgl_mulai,103) as tgl_mulai,convert(varchar,a.tgl_selesai,103) as tgl_selesai
from bill_m a
inner join cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi
$this->filter
order by a.no_bill";


		$rs = $dbLib->execute($sql);	
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];		
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("laporan tagihan",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1200'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='100'  align='center' class='header_laporan'>No Bill</td>
	 <td width='60'  align='center' class='header_laporan'>Tanggal</td>
	 <td width='120'  align='center' class='header_laporan'>No Kontrak</td>
	 <td width='200'  align='center' class='header_laporan'>Customer</td>
	 <td width='100'  align='center' class='header_laporan'>Tgl Pelaksanaan</td>
     <td width='200'  align='center' class='header_laporan'>Keterangan</td>
     <td width='90'  align='center' class='header_laporan'>Tagihan </td>
     <td width='90'  align='center' class='header_laporan'>Nilai PPN</td>
     <td width='90'  align='center' class='header_laporan'>Total</td>
	 <td width='50'  align='center' class='header_laporan'>Action</td>
	  </tr>  ";
		$nilai=0;$nilai_ppn=0;$total=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai+=$row->nilai;
			$nilai_ppn+=$row->nilai_ppn;
			$total+=$row->total;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
	
	 <td class='isi_laporan'>$row->no_bill</td>
	  <td class='isi_laporan'>$row->tgl</td>
	 <td class='isi_laporan'>$row->no_kontrak</td>
	 <td class='isi_laporan'>$row->nama_cust</td>
	 <td class='isi_laporan'>$row->tgl_mulai - $row->tgl_selesai</td>
	 <td class='isi_laporan'>$row->keterangan</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->nilai_ppn,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->total,0,",",".")."</td>
	 <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBill('$row->no_bill','$row->kode_lokasi');\">Cetak</a>";
		echo "</td>
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='isi_laporan' align='center' colspan='7'>Total</td>
	  <td class='isi_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($nilai_ppn,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($total,0,",",".")."</td>
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
