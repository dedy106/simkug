<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_kredit_rptBrgKeluar extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$sql="select 1 ";
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
		
		
		$sql="select a.no_jual,date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.no_dokumen,a.keterangan,b.nama as nama_pp
from kre_jual_m a
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi 
$this->filter
order by a.no_jual";
		$rs = $dbLib->execute($sql);		
		
		$i = 1;
		
		$AddOnLib=new server_util_AddOnLib();
		
		
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("barang keluar ",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table   border='1' cellpadding='0' cellspacing='0' class='kotak'>
  <tr>
    <td colspan='20' style='padding:5px'><table width='100%' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td class='header_laporan' width='114'>No Bukti </td>
        <td class='header_laporan'>:&nbsp;$row->no_jual</td>
        </tr>
		  <tr>
        <td class='header_laporan'>Tanggal   </td>
        <td class='header_laporan'>:&nbsp;$row->tanggal</td>
      </tr>
	    <tr>
        <td class='header_laporan' width='114'>Area Bisnis </td>
        <td class='header_laporan'>:&nbsp;$row->nama_pp</td>
        </tr>
	   
      <tr>
        <td class='header_laporan'>No Dokumen   </td>
        <td class='header_laporan'>:&nbsp;$row->no_dokumen</td>
      </tr>
	  <tr>
        <td class='header_laporan'>Keterangan   </td>
        <td class='header_laporan'>:&nbsp;$row->keterangan</td>
      </tr>
    </table></td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='15' align='center' class='header_laporan'>No</td>
	<td width='50' align='center' class='header_laporan'>Kode Barang</td>
    <td width='150' align='center' class='header_laporan'>Nama Barang</td>
    <td width='100' align='center' class='header_laporan'>Merk</td>
    <td width='100' align='center' class='header_laporan'>Tipe</td>
	 <td width='80' align='center' class='header_laporan'>Satuan</td>
   <td width='50' align='center' class='header_laporan'>Jumlah</td>
	
  </tr>";
			$sql1="select a.kode_brg,b.nama as nama_brg,b.merk,b.tipe,a.satuan,a.jumlah
from kre_jual_d a
inner join kre_brg b on a.kode_brg=b.kode_brg and a.kode_lokasi=b.kode_lokasi
where a.no_jual='$row->no_jual' 
order by a.kode_brg ";
		
			$rs1 = $dbLib->execute($sql1);
			$j=1;$jumlah=0;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$jumlah+=$row1->jumlah;
				echo "<tr>
    <td align='center' class='isi_laporan'>$j</td>
    <td  class='isi_laporan'>$row1->kode_brg</td>
    <td class='isi_laporan'>$row1->nama_brg</td>
	<td class='isi_laporan'>$row1->merk</td>
	<td class='isi_laporan'>$row1->tipe</td>
	<td class='isi_laporan'>$row1->satuan</td>
 	<td align='right' class='isi_laporan'>".number_format($row1->jumlah,0,",",".")."</td>
	 </tr>";		
				$j=$j+1;
			}
			echo "<tr>
    <td colspan='6' align='center'  class='header_laporan'>Total</td>
  <td align='right' class='header_laporan'>".number_format($jumlah,0,",",".")."</td>
  </tr><br>";
		}
		echo "</div>";
		return "";
	}
	
}
?>
  
