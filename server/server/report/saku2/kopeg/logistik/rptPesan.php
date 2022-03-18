<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku2_kopeg_logistik_rptPesan extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$sql="select count(a.no_pesan)
from log_pesan_m a
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi $this->filter ";
		error_log($sql);
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
		
		
		$sql="select a.no_pesan,date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.no_dokumen,a.keterangan,a.kode_pp,b.nama as nama_pp,a.kode_dana,c.nama as nama_dana 
from log_pesan_m a
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
inner join log_dana c on a.kode_dana=c.kode_dana and a.kode_lokasi=c.kode_lokasi $this->filter
order by a.no_pesan";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		$i = 1;
		
		$AddOnLib=new server_util_AddOnLib();
		
		
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("pemesanan",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table   border='1' cellpadding='0' cellspacing='0' class='kotak'>
  <tr>
    <td colspan='20' style='padding:5px'><table width='100%' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td class='header_laporan' width='114'>No Bukti </td>
        <td class='header_laporan'>:&nbsp;$row->no_pesan</td>
        </tr>
		<tr>
        <td class='header_laporan' width='114'>Tanggal </td>
        <td class='header_laporan'>:&nbsp;$row->tanggal</td>
        </tr>
	    <tr>
        <td class='header_laporan'>PP </td>
        <td class='header_laporan'>:&nbsp;$row->kode_pp -&nbsp; $row->nama_pp</td>
      </tr>
      
      <tr>
        <td class='header_laporan'>No Dokumen   </td>
        <td class='header_laporan'>:&nbsp;$row->no_dokumen</td>
      </tr>
	  <tr>
        <td class='header_laporan'>Sumber Dana</td>
        <td class='header_laporan'>:&nbsp;$row->kode_dana -&nbsp; $row->nama_dana</td>
      </tr>
	  <tr>
        <td class='header_laporan'>Keterangan   </td>
        <td class='header_laporan'>:&nbsp;$row->keterangan</td>
      </tr>
    </table></td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='15' align='center' class='header_laporan'>No</td>
	<td width='200' align='center' class='header_laporan'>Item Barang</td>
    <td width='100' align='center' class='header_laporan'>Merk</td>
    <td width='100' align='center' class='header_laporan'>Tipe</td>
    <td width='200' align='center' class='header_laporan'>Catatan</td>
	 <td width='60' align='center' class='header_laporan'>Jumlah</td>
    <td width='90' align='center' class='header_laporan'>Nilai</td>
  
	
  </tr>";
			$sql1="select a.item,a.merk,a.tipe,a.catatan,a.nilai,a.jumlah,a.harga 
from log_pesan_d a
where a.no_pesan='$row->no_pesan' ";

			
			$rs1 = $dbLib->execute($sql1);
			$j=1;$jumlah=0; $nilai=0; 
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$jumlah=$jumlah+$row1->jumlah;
				$nilai=$nilai+$row1->nilai;
				
				echo "<tr>
    <td align='center' class='isi_laporan'>$j</td>
    <td  class='isi_laporan'>$row1->item</td>
    <td class='isi_laporan'>$row1->merk</td>
	<td class='isi_laporan'>$row1->tipe</td>
    <td  class='isi_laporan'>$row1->catatan</td>
   <td align='right' class='isi_laporan'>".number_format($row1->jumlah,0,",",".")."</td>
    <td align='right' class='isi_laporan'>".number_format($row1->nilai,0,",",".")."</td>
  </tr>";		
				$j=$j+1;
			}
			echo "<tr>
    <td colspan='5' align='center'  class='header_laporan'>Total</td>
	<td align='right' class='header_laporan'>".number_format($jumlah,0,",",".")."</td>
    <td align='right' class='header_laporan'>".number_format($nilai,0,",",".")."</td>
  </tr><br>";
		}
		echo "</div>";
		return "";
	}
	
}
?>
  
