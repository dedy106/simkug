<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_klinik_rptKirim extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$sql="select count(a.no_kirim)
from kli_kirim_m a  $this->filter ";
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
		
		
		$sql="select a.no_kirim,date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.no_dokumen,a.keterangan,a.kode_pp_asal,b.nama as nama_asal ,a.kode_pp_tujuan,c.nama as nama_tujuan
from kli_kirim_m a
inner join kli_pp b on a.kode_pp_asal=b.kode_pp and a.kode_lokasi=b.kode_lokasi
inner join kli_pp c on a.kode_pp_tujuan=c.kode_pp and a.kode_lokasi=c.kode_lokasi  $this->filter
order by a.no_kirim";
	
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		$i = 1;
		
		$AddOnLib=new server_util_AddOnLib();
		
		
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("mutasi kirim ",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table   border='1' cellpadding='0' cellspacing='0' class='kotak'>
  <tr>
    <td colspan='20' style='padding:5px'><table width='100%' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td class='header_laporan' width='114'>No Bukti </td>
        <td class='header_laporan'>:&nbsp;$row->no_kirim</td>
        </tr>
		  <tr>
        <td class='header_laporan'>Tanggal   </td>
        <td class='header_laporan'>:&nbsp;$row->tanggal</td>
      </tr>
	    <tr>
        <td class='header_laporan'>Gudang Asal </td>
        <td class='header_laporan'>:&nbsp;$row->kode_pp_asal -&nbsp; $row->nama_asal</td>
      </tr>
     
	   <tr>
        <td class='header_laporan'>Gudang Tujuan </td>
        <td class='header_laporan'>:&nbsp;$row->kode_pp_tujuan -&nbsp; $row->nama_tujuan</td>
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
    <td width='25' align='center' class='header_laporan'>No</td>
	<td width='80' align='center' class='header_laporan'>Kode Barang</td>
    <td width='300' align='center' class='header_laporan'>Nama Barang</td>
     <td width='60' align='center' class='header_laporan'>Batch</td>
	<td width='60' align='center' class='header_laporan'>Exp Date</td>
	 <td width='60' align='center' class='header_laporan'>Satuan</td>
    <td width='50' align='center' class='header_laporan'>Jumlah</td>
	
  </tr>";
			$sql1="select a.kode_obat,b.nama as nama_obat,a.satuan,a.jumlah,a.no_batch,date_format(a.tgl_ed,'%d/%m/%Y') as tgl_ed
from kli_kirim_d a
inner join kli_obat b on a.kode_obat=b.kode_obat and a.kode_lokasi=b.kode_lokasi
where a.no_kirim='$row->no_kirim' 
order by a.kode_obat ";
		
			$rs1 = $dbLib->execute($sql1);
			$j=1;$stok=0;$jumlah=0;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$stok=$stok+$row1->stok;
				$jumlah=$jumlah+$row1->jumlah;
				echo "<tr>
    <td align='center' class='isi_laporan'>$j</td>
    <td  class='isi_laporan'>$row1->kode_obat</td>
    <td class='isi_laporan'>$row1->nama_obat</td>
	<td class='isi_laporan'>$row1->no_batch</td>
	<td class='isi_laporan'>$row1->tgl_ed</td>
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
  
