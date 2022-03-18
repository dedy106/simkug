<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku2_kopeg_logistik_rptPo extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$sql="select count(a.no_po)
from log_po_m a
inner join vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi  $this->filter ";
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
		
		
		$sql="select a.no_po,date_format(a.tanggal,'%d/%m/%Y') as tanggal,date_format(a.tgl_mulai,'%d/%m/%Y') as tgl_mulai,date_format(a.tgl_selesai,'%d/%m/%Y') as tgl_selesai,a.no_dokumen,a.keterangan,
		a.kode_vendor,b.nama as nama_vendor,date_format(a.tgl_spph,'%d/%m/%Y') as tgl_spph,date_format(a.tgl_nego,'%d/%m/%Y') as tgl_nego
from log_po_m a
inner join vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi  $this->filter
order by a.no_po";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		$i = 1;
		
		$AddOnLib=new server_util_AddOnLib();
		
		
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("kontrak kerja",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table   border='1' cellpadding='0' cellspacing='0' class='kotak'>
  <tr>
    <td colspan='20' style='padding:5px'><table width='100%' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td class='header_laporan' width='114'>No Bukti </td>
        <td class='header_laporan'>:&nbsp;$row->no_po</td>
        </tr>
	    <tr>
        <td class='header_laporan'>vendor </td>
        <td class='header_laporan'>:&nbsp;$row->kode_vendor -&nbsp; $row->nama_vendor</td>
      </tr>
	   <tr>
        <td class='header_laporan'>Tanggal SPPH  </td>
        <td class='header_laporan'>:&nbsp;$row->tgl_spph</td>
      </tr>
	   <tr>
        <td class='header_laporan'>Tanggal Negosiasi  </td>
        <td class='header_laporan'>:&nbsp;$row->tgl_nego</td>
      </tr>
       <tr>
        <td class='header_laporan'>Tanggal   </td>
        <td class='header_laporan'>:&nbsp;$row->tanggal</td>
      </tr>
	   <tr>
        <td class='header_laporan'>Jangka Waktu   </td>
        <td class='header_laporan'>:&nbsp;$row->tgl_mulai sd $row->tgl_selesai</td>
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
	<td width='80' align='center' class='header_laporan'>No Pesan</td>
	<td width='150' align='center' class='header_laporan'>Item Barang</td>
    <td width='100' align='center' class='header_laporan'>Merk</td>
    <td width='100' align='center' class='header_laporan'>Tipe</td>
    <td width='150' align='center' class='header_laporan'>Catatan</td>
	<td width='150' align='center' class='header_laporan'>Sumber Dana</td>
	 <td width='60' align='center' class='header_laporan'>Jumlah</td>
    <td width='90' align='center' class='header_laporan'>Nilai</td>
	
  </tr>";
			$sql1="select a.item,a.merk,a.tipe,a.catatan,a.nilai,a.jumlah,a.harga,b.nama as nama_dana,a.no_pesan 
from log_pesan_d a
inner join log_dana b on a.kode_dana=b.kode_dana and a.kode_lokasi=b.kode_lokasi
where a.no_po='$row->no_po' ";

			
			$rs1 = $dbLib->execute($sql1);
			$j=1;$jumlah=0; $nilai=0; 
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$jumlah=$jumlah+$row1->jumlah;
				$nilai=$nilai+$row1->nilai;
				
				echo "<tr>
    <td align='center' class='isi_laporan'>$j</td>
	<td  class='isi_laporan'>$row1->no_pesan</td>
    <td  class='isi_laporan'>$row1->item</td>
    <td class='isi_laporan'>$row1->merk</td>
	<td class='isi_laporan'>$row1->tipe</td>
    <td  class='isi_laporan'>$row1->catatan</td>
	<td  class='isi_laporan'>$row1->nama_dana</td>
   <td align='right' class='isi_laporan'>".number_format($row1->jumlah,0,",",".")."</td>
    <td align='right' class='isi_laporan'>".number_format($row1->nilai,0,",",".")."</td>
  </tr>";		
				$j=$j+1;
			}
			echo "<tr>
    <td colspan='7' align='center'  class='header_laporan'>Total</td>
	<td align='right' class='header_laporan'>".number_format($jumlah,0,",",".")."</td>
   <td align='right' class='header_laporan'>".number_format($nilai,0,",",".")."</td>
  </tr>";
		echo "<tr>
    <td colspan='9' align='center'  class='header_laporan'>&nbsp;</td></tr>";
		 echo "<tr bgcolor='#CCCCCC'>
    <td width='15' align='center' class='header_laporan'>No</td>
	<td width='40' align='center' class='header_laporan'>Jenis</td>
	<td width='100' align='center' class='header_laporan'>Termin</td>
    <td width='150' align='center' class='header_laporan'>Keterangan</td>
    <td width='80' align='center' class='header_laporan'>Nilai</td>
    <td width='80' align='center' class='header_laporan'>PPN</td>
	<td width='80' align='center' class='header_laporan'>Total</td>
  </tr>";
			$sql1="select a.jenis,a.termin,a.keterangan,a.nilai,a.nilai_ppn,a.nilai,a.nilai+a.nilai_ppn as total
from log_po_termin a
where a.no_po='$row->no_po'
order by a.nu  ";

			
			$rs1 = $dbLib->execute($sql1);
			$j=1;$nilai_ppn=0; $nilai=0; $total=0;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$nilai_ppn=$nilai_ppn+$row1->nilai_ppn;
				$nilai=$nilai+$row1->nilai;
				$total=$total+$row1->total;
				echo "<tr>
    <td align='center' class='isi_laporan'>$j</td>
	<td  class='isi_laporan'>$row1->jenis</td>
    <td  class='isi_laporan'>$row1->termin</td>
    <td class='isi_laporan'>$row1->keterangan</td>
	<td align='right' class='isi_laporan'>".number_format($row1->nilai,0,",",".")."</td>
    <td align='right' class='isi_laporan'>".number_format($row1->nilai_ppn,0,",",".")."</td>
	<td align='right' class='isi_laporan'>".number_format($row1->total,0,",",".")."</td>
  </tr>";		
				$j=$j+1;
			}
			echo "<tr>
    <td colspan='4' align='center'  class='header_laporan'>Total</td>
	<td align='right' class='header_laporan'>".number_format($nilai,0,",",".")."</td>
   <td align='right' class='header_laporan'>".number_format($nilai_ppn,0,",",".")."</td>
    <td align='right' class='header_laporan'>".number_format($total,0,",",".")."</td>
  </tr><br>";
		}
		echo "</div>";
		return "";
	}
	
}
?>
  
