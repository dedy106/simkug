<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_ypt_logistik_rptSpk extends server_report_basic
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
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		
		$sql="select a.no_spk,convert(varchar,a.tanggal,103) as tgl_spk,a.keterangan,a.kode_vendor,b.nama as nama_vendor,a.no_dokumen,
	   a.no_pesan,a.no_spph,a.no_sph,a.no_spph,convert(varchar,a.tgl_selesai,103) as tgl_selesai,convert(varchar,a.tgl_mulai,103) as tgl_mulai,a.nik_tahu,c.nama as nama_tahu,c.jabatan as jab_tahu,a.catatan,a.cara_bayar
from log_spk_m a 
inner join vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi
left join karyawan c on a.nik_tahu=c.nik and a.kode_lokasi=c.kode_lokasi
$this->filter
order by a.no_spk";
		
		$rs = $dbLib->execute($sql);		
		$i = 1;
		$logo="image/ypt.jpeg";
		
		$AddOnLib=new server_util_AddOnLib();
		
		
		echo "<div align='center'>"; 
		// echo $AddOnLib->judul_laporan("SPK/NP/PKS",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table width='100%' cellspacing='0' cellpadding='0' border='0' style='margin-bottom:20px;width:1106px'>
		<tbody>
		<tr>
		  <td width='90%' class='lokasi_laporan'><div align='center'>Badan Pelaksana Kegiatan</div></td>
		  <td rowspan='3' width='10%'><img src='$logo' width='100px'></td>
		</tr>
		<tr>
		  <td class='lokasi_laporan2'><div align='center'>SPK/NP/PKS</div></td>
		</tr>
		<tr>
		  <td class='lokasi_laporan'><div align='center'>Periode ".$AddOnLib->ubah_periode($periode)."</div></td>
		</tr>
	  </tbody></table>";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$maksud=urldecode($row->maksud);
			$aspek=urldecode($row->aspek);
			echo "<table   border='1' cellpadding='0' cellspacing='0' class='kotak'>
  <tr>
    <td colspan='20' style='padding:5px'><table width='100%' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td class='header_laporan' width='114'>No Bukti </td>
        <td class='header_laporan'>:&nbsp;$row->no_spk</td>
        </tr>
		<tr>
        <td class='header_laporan' width='114'>Tanggal Fisik </td>
        <td class='header_laporan'>:&nbsp;$row->tgl_spk</td>
        </tr>
	   <tr>
        <td class='header_laporan'>No Pesan   </td>
        <td class='header_laporan'>:&nbsp;$row->no_pesan</td>
      </tr>
      </tr>
	   <tr>
        <td class='header_laporan'>Vendor   </td>
        <td class='header_laporan'>:&nbsp;$row->kode_vendor - $row->nama_vendor</td>
      </tr>
		 <tr>
        <td class='header_laporan'>Keterangan   </td>
        <td class='header_laporan'>:&nbsp;$row->keterangan</td>
      </tr>
	     <tr>
        <td class='header_laporan' width='114'>TGL Mulai </td>
        <td class='header_laporan'>:&nbsp;$row->tgl_mulai</td>
        </tr>
	   <tr>
        <td class='header_laporan' width='114'>TGL Selesai </td>
        <td class='header_laporan'>:&nbsp;$row->tgl_selesai</td>
        </tr>
	   
	 
    </table></td>
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
    <td width='90' align='center' class='header_laporan'>Nilai</td>
	  <td width='90' align='center' class='header_laporan'>Total</td>
  </tr>";
			$sql1="select a.item,a.merk,a.tipe,a.catatan,a.harga,a.jumlah,c.ppn,(a.harga*a.jumlah)+c.ppn as total,a.kode_klpfa,b.nama as nama_klp
from log_spk_d a
inner join fa_klp b on a.kode_klpfa=b.kode_klpfa and a.kode_lokasi=b.kode_lokasi
inner join log_spk_m c on a.no_spk=c.no_spk and a.kode_lokasi=c.kode_lokasi
where a.no_spk='$row->no_spk'
order by a.no_urut ";
			
			
			$rs1 = $dbLib->execute($sql1);
			$j=1;$jumlah=0; $total=0; $total_nego=0; 
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$jumlah=$jumlah+$row1->jumlah;
				$total=$total+($row1->jumlah*$row1->harga);
				$ppn=$row1->ppn;
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
    <td align='right' class='isi_laporan'>".number_format($row1->jumlah*$row1->harga,0,",",".")."</td>
  </tr>";		
				$j=$j+1;
			}
				$total2=$total+$ppn;
			echo "<tr>
    <td colspan='7' align='center'  class='header_laporan'>Total</td>
	<td align='right' class='header_laporan'>".number_format($jumlah,0,",",".")."</td>
	 <td align='center'  class='header_laporan'>&nbsp;</td>
    <td  align='right' class='header_laporan'>".number_format($total,0,",",".")."</td>
  </tr>
  <tr>
    <td colspan='7' align='center'  class='header_laporan'>PPN</td>
	<td align='right' class='header_laporan'>&nbsp;</td>
	 <td  align='center'  class='header_laporan'>&nbsp;</td>
    <td  align='right' class='header_laporan'>".number_format($ppn,0,",",".")."</td>
  </tr>
  <tr>
  <td colspan='7' align='center'  class='header_laporan'>Total + PPN</td>
  <td align='right' class='header_laporan'>&nbsp;</td>
   <td  align='center'  class='header_laporan'>&nbsp;</td>
  <td  align='right' class='header_laporan'>".number_format($total2,0,",",".")."</td>
</tr>
</table>
<br>
<table  border='1' cellpadding='0' cellspacing='0' class='kotak' style='width:1106px'>
  <tr>
	 <td>
	 	<table width='100%' border='0' cellspacing='2' cellpadding='1'>
			<tr>
				<td colspan='10'>Catatan:</td>
			</tr>
			<tr>
				<td colspan='10'>".urldecode($row->catatan)."</td>
			</tr>
		</table>
	</td>
  <tr>
</table>
<br>
<table  border='1' cellpadding='0' cellspacing='0' class='kotak' style='width:1106px'>
  <tr>
	 <td>
	 	<table width='100%' border='0' cellspacing='2' cellpadding='1'>
			<tr>
				<td colspan='10'>Cara Pembayaran:</td>
			</tr>
			<tr>
				<td colspan='10'>".urldecode($row->cara_bayar)."</td>
			</tr>
		</table>
	</td>
  <tr>
</table>
<br/>
<table border='0' cellspacing='2' cellpadding='1' style='width:1106px'>
  <tr>
	<td colspan='7' width='80%'>	
	</td>
	<td colspan='3' width='20%'>
	Bandung, ".substr($row->tgl_spk,0,2)." ".$AddOnLib->ubah_periode(substr($row->tgl_spk,6,4).''.substr($row->tgl_spk,3,2))."
	</td>
  <tr>
  <tr>
	<td colspan='7'>	
	</td>
	<td colspan='3'>
	$row->jab_tahu
	</td>
  </tr>
  <tr style='height:60px'>
	<td colspan='7'>	
	</td>
	<td colspan='3'>
	</td>
  </tr>
  <tr>
	<td colspan='7'>	
	</td>
	<td colspan='3'>
	<u>$row->nama_tahu</u>
	</td>
  </tr>
</table>
";
		}
		echo "</div>";
		return "";
	}
	
}
?>
  
