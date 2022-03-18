<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_kredit_rptBrgKartu extends server_report_basic
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
		$periode_rev=$periode-1;
		$sql="exec sp_kre_stok_periode '$periode_rev','$kode_lokasi','$nik_user'";
		$rs1 = $dbLib->execute($sql);
		
		$sql="select a.kode_brg,a.nama,a.merk,a.tipe,a.satuan,b.nama as nama_pp,b.kode_pp
from kre_brg a
cross join pp b 
$this->filter
order by a.kode_brg";
		$rs = $dbLib->execute($sql);		
		
		$i = 1;
		
		$AddOnLib=new server_util_AddOnLib();
		
		
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("kartu persediaan barang",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table   border='1' cellpadding='0' cellspacing='0' class='kotak'>
  <tr>
    <td colspan='20' style='padding:5px'><table width='100%' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td class='header_laporan' width='114'>Kode Barang </td>
        <td class='header_laporan'>:&nbsp;$row->kode_brg</td>
        </tr>
		  <tr>
        <td class='header_laporan'>Nama barang   </td>
        <td class='header_laporan'>:&nbsp;$row->nama</td>
      </tr>
	    <tr>
        <td class='header_laporan' width='114'>Area Bisnis </td>
        <td class='header_laporan'>:&nbsp;$row->nama_pp</td>
        </tr>
	   
      <tr>
        <td class='header_laporan'>Merk   </td>
        <td class='header_laporan'>:&nbsp;$row->merk</td>
      </tr>
	  <tr>
        <td class='header_laporan'>Tipe   </td>
        <td class='header_laporan'>:&nbsp;$row->tipe</td>
      </tr>
    </table></td>
  </tr>";
			$sql="select so_awal from kre_stok_periode where nik_user='$nik_user' and kode_pp='$row->kode_pp' and kode_brg='$row->kode_brg' ";
		
			$rs1 = $dbLib->execute($sql);
			$row1 = $rs1->FetchNextObject($toupper=false);
			$so_awal=$row1->so_awal;
			echo "<tr>
    <td colspan='5' align='right'  class='header_laporan'>Persediaan Awal</td>
  <td align='center' class='header_laporan'>".number_format($so_awal,0,",",".")."</td>
  </tr>";
  echo "<tr bgcolor='#CCCCCC'>
    <td width='60' align='center' class='header_laporan'>Tanggal</td>
	<td width='80' align='center' class='header_laporan'>No Bukti</td>
    <td width='150' align='center' class='header_laporan'>Keterangan</td>
    <td width='50' align='center' class='header_laporan'>Masuk</td>
    <td width='50' align='center' class='header_laporan'>Keluar</td>
	 <td width='50' align='center' class='header_laporan'>Sisa</td>
	
  </tr>";
			
			
			$sql1="select a.no_beli as no_bukti,a.tanggal,a.keterangan,b.jumlah as masuk,0 as keluar,date_format(a.tanggal,'%d/%m/%Y') as tgl
from kre_beli_m a
inner join kre_beli_d b on a.no_beli=b.no_beli and a.kode_lokasi=b.kode_lokasi
where b.kode_brg='$row->kode_brg' and a.kode_pp='$row->kode_pp' and b.kode_brg='$row->kode_brg' and a.periode='$periode'
union all
select a.no_jual as no_bukti,a.tanggal,a.keterangan,0 as masuk,b.jumlah as keluar,date_format(a.tanggal,'%d/%m/%Y') as tgl
from kre_jual_m a
inner join kre_jual_d b on a.no_jual=b.no_jual and a.kode_lokasi=b.kode_lokasi
where b.kode_brg='$row->kode_brg' and a.kode_pp='$row->kode_pp' and b.kode_brg='$row->kode_brg' and a.periode='$periode'
order by tanggal desc
 ";
			
			$rs1 = $dbLib->execute($sql1);
			$j=1;$jumlah=0; $masuk=0; $keluar=0;
			$sisa=$so_awal;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$sisa=$sisa+$row1->masuk-$row1->keluar;
				$masuk+=$row1->masuk;
				$keluar+=$row1->keluar;
				echo "<tr>
    <td  class='isi_laporan'>$row1->tgl</td>
    <td class='isi_laporan'>$row1->no_bukti</td>
	<td class='isi_laporan'>$row1->keterangan</td>
	<td align='center' class='isi_laporan'>".number_format($row1->masuk,0,",",".")."</td>
	<td align='center' class='isi_laporan'>".number_format($row1->keluar,0,",",".")."</td>
 	<td align='center' class='isi_laporan'>".number_format($sisa,0,",",".")."</td>
	 </tr>";		
				$j=$j+1;
			}
			echo "<tr>
    <td colspan='3' align='center'  class='header_laporan'>Total</td>
  <td align='center' class='header_laporan'>".number_format($masuk,0,",",".")."</td>
  <td align='center' class='header_laporan'>".number_format($keluar,0,",",".")."</td>
  <td align='center' class='header_laporan'>".number_format($sisa,0,",",".")."</td>
  </tr><br>";
		}
		echo "</div>";
		return "";
	}
	
}
?>
  
