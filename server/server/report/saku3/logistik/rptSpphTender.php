<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_logistik_rptSpphTender extends server_report_basic
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
		$periode=$tmp[0];
		
		
		$sql="select a.no_pesan,date_format(f.tanggal,'%d/%m/%Y') as tanggal,f.no_dokumen,f.keterangan,a.kode_pp,b.nama as nama_pp,
		a.kode_drk,d.nama as nama_drk,a.kode_akun,c.nama as nama_akun,e.nama as nama_lokasi,a.lok_proses,a.maksud,a.aspek,a.no_spph
from log_pesan_m a
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi
inner join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi
inner join lokasi e on a.lok_proses=e.kode_lokasi
inner join log_spph_m f on a.no_spph=f.no_spph and a.kode_lokasi=f.kode_lokasi and f.modul='TD'
$this->filter
order by f.no_spph";
		
		$rs = $dbLib->execute($sql);		
		
		$i = 1;
		
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("rapar penjelasan",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$maksud=urldecode($row->maksud);
			$aspek=urldecode($row->aspek);
			echo "<table   border='1' cellpadding='0' cellspacing='0' class='kotak'>
  <tr>
    <td colspan='20' style='padding:5px'><table width='100%' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td class='header_laporan' width='114'>No Bukti </td>
        <td class='header_laporan'>:&nbsp;$row->no_spph</td>
        </tr>
		<tr>
        <td class='header_laporan' width='114'>Tanggal </td>
        <td class='header_laporan'>:&nbsp;$row->tanggal</td>
        </tr>
		 <tr>
        <td class='header_laporan'>No Dokumen   </td>
        <td class='header_laporan'>:&nbsp;$row->no_dokumen</td>
      </tr>
	  
		 <tr>
        <td class='header_laporan'>Keterangan   </td>
        <td class='header_laporan'>:&nbsp;$row->keterangan</td>
      </tr>
		<tr>
        <td class='header_laporan' width='114'>No Justifikasi </td>
        <td class='header_laporan'>:&nbsp;$row->no_pesan</td>
        </tr>
		<tr>
        <td class='header_laporan'>PP </td>
        <td class='header_laporan'>:&nbsp;$row->kode_pp -&nbsp; $row->nama_pp</td>
      </tr>
      <tr>
        <td class='header_laporan'>Akun Anggaran </td>
        <td class='header_laporan'>:&nbsp;$row->kode_akun -&nbsp; $row->nama_akun</td>
      </tr>
	  <tr>
        <td class='header_laporan'>DRK </td>
        <td class='header_laporan'>:&nbsp;$row->kode_drk -&nbsp; $row->nama_drk</td>
      </tr>
     
	  <tr>
        <td class='header_laporan'>Lokasi Proses</td>
        <td class='header_laporan'>:&nbsp;$row->lok_proses -&nbsp; $row->nama_lokasi</td>
      </tr>
	 
	 
    </table></td>
  </tr>
   <tr>
    <td colspan='20' style='padding:5px'><table width='800' border='1' cellspacing='0' cellpadding='0' class='kotak'>
      <tr bgcolor='#CCCCCC'>
        <td width='106' align='center' class='header_laporan'>Kode</td>
        <td width='307' align='center' class='header_laporan'>Nama</td>
        <td width='379' align='center' class='header_laporan'>Alamat</td>
      </tr>";
	  $sql1="select a.kode_vendor,b.nama,b.alamat
from log_spph_vendor a
inner join vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi
where a.no_spph='$row->no_spph'
order by a.kode_vendor ";

			
			$rs1 = $dbLib->execute($sql1);
			$j=1;$jumlah=0; $total=0; 
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
      echo "<tr>
        <td class='isi_laporan'>$row1->kode_vendor</td>
        <td class='isi_laporan'>$row1->nama</td>
        <td class='isi_laporan'>$row1->alamat</td>
      </tr>";
			}
    echo "</table></td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='15' align='center' class='header_laporan'>No</td>
	<td width='50' align='center' class='header_laporan'>Kode Barang</td>
	<td width='150' align='center' class='header_laporan'>Nama Barang</td>
	<td width='200' align='center' class='header_laporan'>Item Barang</td>
    <td width='100' align='center' class='header_laporan'>Merk</td>
    <td width='100' align='center' class='header_laporan'>Tipe</td>
    <td width='200' align='center' class='header_laporan'>Spesifikasi</td>
	 <td width='40' align='center' class='header_laporan'>Jumlah</td>
    <td width='90' align='center' class='header_laporan'>Harga</td>
     <td width='90' align='center' class='header_laporan'>PPN</td>
	  <td width='90' align='center' class='header_laporan'>Total</td>
  </tr>";
			$sql1="select a.kode_klpfa,b.nama as nama_klp,a.item,a.merk,a.tipe,a.catatan,a.harga,a.jumlah,a.ppn,(a.harga*a.jumlah)+a.ppn as total
from log_spph_d a
inner join fa_klp b on a.kode_klpfa=b.kode_klpfa and a.kode_lokasi=b.kode_lokasi
where a.no_spph='$row->no_spph'
order by a.kode_klpfa ";

			
			$rs1 = $dbLib->execute($sql1);
			$j=1;$jumlah=0; $total=0; 
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$jumlah=$jumlah+$row1->jumlah;
				$total=$total+$row1->total;
				
				echo "<tr>
    <td align='center' class='isi_laporan'>$j</td>
	<td  class='isi_laporan'>$row1->kode_klpfa</td>
	<td  class='isi_laporan'>$row1->nama_klp</td>
    <td  class='isi_laporan'>$row1->item</td>
    <td class='isi_laporan'>$row1->merk</td>
	<td class='isi_laporan'>$row1->tipe</td>
    <td  class='isi_laporan'>$row1->catatan</td>
   <td align='right' class='isi_laporan'>".number_format($row1->jumlah,0,",",".")."</td>
    <td align='right' class='isi_laporan'>".number_format($row1->harga,0,",",".")."</td>
	 <td align='right' class='isi_laporan'>".number_format($row1->ppn,0,",",".")."</td>
    <td align='right' class='isi_laporan'>".number_format($row1->total,0,",",".")."</td>
  </tr>";		
				$j=$j+1;
			}
			echo "<tr>
    <td colspan='7' align='center'  class='header_laporan'>Total</td>
	<td align='right' class='header_laporan'>".number_format($jumlah,0,",",".")."</td>
	 <td colspan='2' align='center'  class='header_laporan'>&nbsp;</td>
    <td  align='right' class='header_laporan'>".number_format($total,0,",",".")."</td>
  </tr><br>";
		}
		echo "</div>";
		return "";
	}
	
}
?>
  
