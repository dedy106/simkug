<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_dago_rptRekapbayar extends server_report_basic
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
		$tmp=explode("/",$this->filter);
		$lokasi=$tmp[0];
		$periode=$tmp[1];
		$sql="select a.no_kwitansi,c.nama as peserta,a.tgl_bayar,a.bayar_paket, 
		a.no_reg,a.nilai_p,a.nilai_t,a.bayar_tambahan - nilai_t as sisat,a.bayar_paket - nilai_p as sisap,a.bayar_tambahan, c.no_peserta
				from dgw_pembayaran a 
				inner join dgw_reg b on a.no_reg=b.no_reg and a.kode_lokasi=b.kode_lokasi 				
				inner join dgw_peserta c on c.no_peserta=b.no_peserta and c.kode_lokasi=b.kode_lokasi 								
				$this->filter";
		$rs = $dbLib->execute($sql);	
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("Rekap Pembayaran",$this->lokasi,"");
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' >
  <tr bgcolor='#CCCCCC'>
    <td width='30' align='center' class='header_laporan'>No</td>
    <td width='80' align='center' class='header_laporan'>No Jamaah</td>
    <td width='100' align='center' class='header_laporan'>No Kwitansi</td>	
	<td width='60' align='center' class='header_laporan'>Tanggal Pembayaran</td>
	<td width='100' align='center' class='header_laporan'>No Registrasi</td>
    <td width='200' align='center' class='header_laporan'>Nama Jamaah</td>
	<td width='200' align='center' class='header_laporan' colspan='2'>Total Tagihan</td>
	<td width='80' align='center' class='header_laporan' colspan='2'>Total Pembayaran</td>
	<td width='60' align='center' class='header_laporan' colspan='2'>Sisa Tagihan</td>
   </tr>";
   echo
	 "<tr>
    <td class='header_laporan' align='center' colspan='6'></td>
    <td width='80' align='center' class='header_laporan'>Paket</td>
	<td width='80' align='center' class='header_laporan'>Tambahan</td>
    <td width='80' align='center' class='header_laporan'>Paket</td>
	<td width='80' align='center' class='header_laporan'>Tambahan</td>
	<td width='80' align='center' class='header_laporan'>Paket</td>
	<td width='80' align='center' class='header_laporan'>Tambahan</td>
    </tr>";	 
			while ($row = $rs->FetchNextObject($toupper=false))
		{
		
		echo "<tr>
    <td class='isi_laporan' align='center'>$i</td>
	 <td class='isi_laporan'>$row->no_peserta</td>
	 <td class='isi_laporan'>$row->no_kwitansi</td>	 
	 <td class='isi_laporan'>$row->tgl_bayar</td>
	 <td class='isi_laporan'>$row->no_reg</td>
	 <td class='isi_laporan'>$row->peserta</td>
	 <td class='isi_laporan' align='right'>".number_format($row->bayar_paket,0,',','.')."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->bayar_tambahan,0,',','.')."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai_p,0,',','.')."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai_t,0,',','.')."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->sisap,0,',','.')."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->sisat,0,',','.')."</td>
	 
	 

    </tr>";
			$i=$i+1;
		}
		echo "</table></div>";
		return "";
	}
	
}
?>
  
