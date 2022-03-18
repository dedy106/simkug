<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku2_kopeg_bengkel_rptSpkCust extends server_report_basic
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
		
		
		$sql="select distinct a.no_polisi,a.tipe,a.merk,a.cust,a.kode_lokasi
from fri_spk_m a 
$this->filter
order by a.cust ";
		$rs = $dbLib->execute($sql);	
		$i = 1;
		
		$AddOnLib=new server_util_AddOnLib();
		
		
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("riwayat SPK customer",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			
			echo "<table   border='1' cellpadding='0' cellspacing='0' class='kotak'>
  <tr>
    <td colspan='20' style='padding:5px'><table width='100%' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td class='header_laporan' width='114'>Nama Pelanggan </td>
        <td class='header_laporan'>:&nbsp;$row->cust</td>
        </tr>
		<tr>
        <td class='header_laporan' width='114'>Alamat </td>
        <td class='header_laporan'>:&nbsp;</td>
        </tr>
	    <tr>
        <td class='header_laporan'>Nomor Polisi </td>
        <td class='header_laporan'>:&nbsp;$row->no_polisi</td>
      </tr>
      
      <tr>
        <td class='header_laporan'>Merk Mobil   </td>
        <td class='header_laporan'>:&nbsp;$row->merk</td>
      </tr>
	 
    </table></td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='20' align='center' class='header_laporan'>No</td>
	<td width='60' align='center' class='header_laporan'>Tanggal</td>
    <td width='60' align='center' class='header_laporan'>No SPK</td>
    <td width='200' align='center' class='header_laporan'>Catatan</td>
    <td width='200' align='center' class='header_laporan'>Rincian</td>
	 <td width='60' align='center' class='header_laporan'>Jumlah</td>
    <td width='60' align='center' class='header_laporan'>Harga</td>
    <td width='90' align='center' class='header_laporan'>Total</td>
	
  </tr>";
			$sql1="select 'INV' as jenis,b.kode_brg,b.nama+' - '+c.nama+' - '+d.nama as nama,b.no_brg,b.tipe,b.satuan,a.jumlah,date_format(e.tanggal,'%d/%m/%Y') as tgl_spk,a.no_spk,e.catatan,a.harga,a.jumlah*a.harga as total
from fri_spk_d a 
inner join fri_barang_m b on a.kode_brg=b.kode_brg and a.kode_lokasi=b.kode_lokasi 
inner join fri_barang_jenis c on b.kode_jenis=c.kode_jenis and b.kode_lokasi=c.kode_lokasi 
inner join fri_barang_kbm d on b.kode_kbm=d.kode_kbm and b.kode_lokasi=d.kode_lokasi 
inner join fri_spk_m e on a.no_spk=e.no_spk and a.kode_lokasi=e.kode_lokasi
where e.cust='$row->cust' and a.kode_lokasi='$row->kode_lokasi' 
union all 
select 'NON' as jenis,'-' as kode_brg,a.item as nama,'-' as merk,'-' as tipe,a.satuan,a.jumlah,date_format(e.tanggal,'%d/%m/%Y') as tgl_spk,a.no_spk,e.catatan,a.harga,a.jumlah*a.harga as total
from fri_spknon_d a
inner join fri_spk_m e on a.no_spk=e.no_spk and a.kode_lokasi=e.kode_lokasi
where e.cust='$row->cust' and a.kode_lokasi='$row->kode_lokasi' 
order by jenis ";

			
			$rs1 = $dbLib->execute($sql1);
			$j=1;$jumlah=0; $total=0; 
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$jumlah=$jumlah+$row1->jumlah;
				$total=$total+$row1->total;
				
				echo "<tr>
    <td align='center' class='isi_laporan'>$j</td>
    <td  class='isi_laporan'>$row1->tgl_spk</td>
    <td class='isi_laporan'>$row1->no_spk</td>
	<td class='isi_laporan'>$row1->catatan</td>
    <td  class='isi_laporan'>$row1->nama</td>
	 <td align='right' class='isi_laporan'>".number_format($row1->jumlah,0,",",".")."</td>
	 <td align='right' class='isi_laporan'>".number_format($row1->harga,0,",",".")."</td>
   <td align='right' class='isi_laporan'>".number_format($row1->total,0,",",".")."</td>
   </tr>";		
				$j=$j+1;
			}
			echo "<tr>
    <td colspan='5' align='center'  class='header_laporan'>Total</td>
	<td align='right' class='header_laporan'>".number_format($jumlah,0,",",".")."</td>
	<td align='center'  class='header_laporan'>&nbsp;</td>
	<td align='right' class='header_laporan'>".number_format($total,0,",",".")."</td>
   </tr>";
		echo "</table><br>";
		}
		echo "</div>";
		return "";
	}
	
}
?>
  
