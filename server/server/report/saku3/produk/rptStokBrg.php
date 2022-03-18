<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_produk_rptStokBrg extends server_report_basic
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
		$nik_user=$tmp[2];
		$tmp="";
		if ($jenis=="Tidak")
		{
			$tmp=" and a.stok<>0 ";
		}
		$sql= "exec sp_brg_stok_mutasi '$periode','$kode_lokasi','$nik_user' ";
		$rs = $dbLib->execute($sql);
		
		$sql= "exec sp_brg_hpp '$periode','$kode_lokasi','$nik_user' ";
		$rs = $dbLib->execute($sql);
		
		$sql="select a.kode_barang,a.kode_gudang,a.stok,a.kode_lokasi,a.so_awal,a.debet,a.kredit,d.h_avg,d.h_avg*a.stok as nilai,b.sat_kecil, 
	   b.nama as nama_barang,c.nama as nama_gudang
from brg_stok a
inner join brg_barang b on a.kode_barang=b.kode_barang and a.kode_lokasi=b.kode_lokasi 
inner join brg_gudang c on a.kode_gudang=c.kode_gudang and a.kode_lokasi=c.kode_lokasi 
inner join brg_hpp d on a.kode_lokasi=d.kode_lokasi and a.kode_barang=d.kode_barang and a.nik_user=d.nik_user
$this->filter and a.nik_user='$nik_user'
order by a.kode_barang,a.kode_gudang ";
		
		$rs = $dbLib->execute($sql);
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("stok barang",$this->lokasi," Periode ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' >
		
  <tr bgcolor='#CCCCCC'>
    <td width='30' rowspan='2' align='center' class='header_laporan'>No</td>
    <td width='80' rowspan='2' align='center' class='header_laporan'>Kode Barang</td>
    <td width='250' rowspan='2' align='center' class='header_laporan'>Nama Barang</td>
	 <td width='60' rowspan='2' align='center' class='header_laporan'>Kode Gudang</td>	
	 <td width='150' rowspan='2' align='center' class='header_laporan'>Nama Gudang</td>
	 <td width='50' rowspan='2' align='center' class='header_laporan'>Satuan</td>
	 <td width='60' rowspan='2' align='center' class='header_laporan'>Stok Awal </td>
	 <td colspan='2' align='center' class='header_laporan'>Mutasi</td>	 
    <td width='60' rowspan='2' align='center' class='header_laporan'>Stok Akhir </td>
    <td width='80' rowspan='2' align='center' class='header_laporan'>Harga Rata-Rata</td>
    <td width='90' rowspan='2' align='center' class='header_laporan'>Saldo Stok</td>
   </tr>
   
   <tr bgcolor='#CCCCCC'>
     <td width='60'  align='center' class='header_laporan'>Masuk</td>
	 <td width='60'  align='center' class='header_laporan'>Keluar</td>
     </tr>  ";

   
		$stok=0; $nilai=0; $so_awal=0;  $debet=0;  $kredit=0;  
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$stok+=$row->stok;
			$so_awal+=$row->so_awal;
			$nilai+=$row->nilai;
			$debet+=$row->debet;
			$kredit+=$row->kredit;
			echo "<tr>
			<td class='isi_laporan' align='center'>$i</td>
			 <td class='isi_laporan'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKartu('$row->kode_barang','$row->kode_gudang','$row->kode_lokasi');\">$row->kode_barang</a></td>
			<td class='isi_laporan'>$row->nama_barang</td>
			<td class='isi_laporan'>$row->kode_gudang</td>
			<td class='isi_laporan'>$row->nama_gudang</td>
			<td class='isi_laporan'>$row->sat_kecil</td>
			<td class='isi_laporan' align='right'>".number_format($row->so_awal,0,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format($row->debet,0,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format($row->kredit,0,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format($row->stok,0,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format($row->h_avg,0,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format($row->nilai,0,',','.')."</td>

			</tr>";	 
			$i=$i+1;
		}
		echo "<tr>
			<td class='header_laporan' align='center' colspan='6'>Total</td>
			<td class='header_laporan' align='right'>".number_format($so_awal,0,',','.')."</td>
			<td class='header_laporan' align='right'>".number_format($debet,0,',','.')."</td>
			<td class='header_laporan' align='right'>".number_format($kredit,0,',','.')."</td>
  			<td class='header_laporan' align='right'>".number_format($stok,0,',','.')."</td>
  			<td class='header_laporan' align='right'>&nbsp;</td>
  			<td class='header_laporan' align='right'>".number_format($nilai,0,',','.')."</td>
 
 </tr>";	 
		echo "</div>";
		return "";
	}
	
}
?>
  
