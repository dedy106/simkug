<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_kantin_rptVoucher extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
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
		$lokasi=$tmp[0];
		$periode=$tmp[1];
		$sql="select a.no_ju,a.tanggal,a.keterangan,b.harga,b.kode_kupon,
       ISNULL(c.jumlah,0) as jumlah,ISNULL(c.nilai,0) as nilai,
		date_format(b.tgl_awal,'%d/%m/%Y') as tgl_awal,date_format(b.tgl_akhir,'%d/%m/%Y') as tgl_akhir
from ju_m a
left join (select distinct a.no_bukti,a.kode_lokasi,a.tgl_awal,a.tgl_akhir,a.harga,a.kode_kupon
		   from kt_kupon_d a
		   where a.kode_lokasi='$lokasi' and a.periode='$periode'
		   )b on a.no_ju=b.no_bukti	and a.kode_lokasi=b.kode_lokasi	
left join (select a.no_bukti,a.kode_lokasi,COUNT(a.no_kupon) as jumlah,sum(a.harga) as nilai
		   from kt_kupon_d a
		   where a.kode_lokasi='$lokasi' and a.periode='$periode'
		   group by a.no_bukti,a.kode_lokasi
		   )c on a.no_ju=c.no_bukti	and a.kode_lokasi=c.kode_lokasi	
$this->filter
order by a.no_ju ";
		
		$rs = $dbLib->execute($sql);	
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("data voucher",$this->lokasi,"");
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' >
  <tr bgcolor='#CCCCCC'>
    <td width='30' align='center' class='header_laporan'>No</td>
    <td width='80' align='center' class='header_laporan'>No Bukti</td>
	<td width='60' align='center' class='header_laporan'>Jenis</td>
	<td width='60' align='center' class='header_laporan'>Tgl Aktif</td>
    <td width='60' align='center' class='header_laporan'>Tgl Expire</td>
	<td width='200' align='center' class='header_laporan'>Keterangan</td>
	<td width='80' align='center' class='header_laporan'>Nominal</td>
	<td width='60' align='center' class='header_laporan'>Lembar</td>
	<td width='100' align='center' class='header_laporan'>Total</td>
   </tr>";
			$nilai=0; $jumlah=0;
			while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai+=$row->nilai;
			$jumlah+=$row->jumlah;
			echo "<tr>
    <td class='isi_laporan' align='center'>$i</td>
    <td class='isi_laporan'>$row->no_ju</td>
	<td class='isi_laporan'>$row->kode_kupon</td>
    <td class='isi_laporan'>$row->tgl_awal</td>
	<td class='isi_laporan'>$row->tgl_akhir</td>
	<td class='isi_laporan'>$row->keterangan</td>
	<td class='isi_laporan' align='right'>".number_format($row->harga,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->jumlah,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->nilai,0,',','.')."</td>
    </tr>";	 
			$i=$i+1;
		}
		echo "<tr>
    <td class='isi_laporan' align='center' colspan='7'>Total</td>
	 <td class='isi_laporan' align='right'>".number_format($jumlah,0,',','.')."</td>
	  <td class='isi_laporan' align='right'>".number_format($nilai,0,',','.')."</td>
    </tr>";	 
		echo "</table></div>";
		return "";
	}
	
}
?>
  
