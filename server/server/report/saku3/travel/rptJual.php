<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_travel_rptJual extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$sql="select count(a.no_bukti)
from trans_m a
$this->filter ";
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
		$kode_lokasi=$tmp[1];
		
		$sql="select distinct a.no_bukti,a.tanggal,a.keterangan ,d.kode_gudang,c.nama as nama_pp ,a.nik_user,f.nama as nama_user, a.nilai1,a.nilai2, a.nilai3
from trans_m a 
left join brg_trans_d d on a.no_bukti=d.no_bukti and a.kode_lokasi=d.kode_lokasi 
 inner join brg_gudang c on d.kode_gudang=c.kode_gudang and d.kode_lokasi=c.kode_lokasi
inner join trans_j e on e.no_bukti=a.no_bukti and e.kode_lokasi=a.kode_lokasi
 inner join karyawan f on a.nik_user=f.nik and a.kode_lokasi=f.kode_lokasi 
$this->filter
order by a.no_bukti";

// echo $sql;
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		$i = 1;
		
		$AddOnLib=new server_util_AddOnLib();
		
		
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("penjualan",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table  border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td>";
			echo "<table   border='1' cellpadding='0' cellspacing='0' class='kotak'>
  <tr>
    <td colspan='18' style='padding:5px'><table width='100%' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td class='header_laporan' width='114'>No Bukti </td>
        <td class='header_laporan'>:&nbsp;$row->no_bukti</td>
        </tr>
		  <tr>
        <td class='header_laporan'>Tanggal   </td>
        <td class='header_laporan'>:&nbsp;$row->tanggal</td>
      </tr>
     
	   <tr>
        <td class='header_laporan'>Gudang  </td>
        <td class='header_laporan'>:&nbsp;$row->kode_gudang -&nbsp; $row->nama_pp</td>
      </tr>

	  <tr>
        <td class='header_laporan'>Keterangan   </td>
        <td class='header_laporan'>:&nbsp;$row->keterangan</td>
      </tr>
    </table></td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='20' align='center' class='header_laporan'>No</td>
	<td width='70' align='center' class='header_laporan'>Kode Barang</td>
    <td width='250' align='center' class='header_laporan'>Nama Barang</td>
	 <td width='60' align='center' class='header_laporan'>Satuan</td>
    <td width='90' align='center' class='header_laporan'>Harga</td>
    <td width='90' align='center' class='header_laporan'>Diskon</td>
	<td width='50' align='center' class='header_laporan'>Jumlah</td>
	<td width='50' align='center' class='header_laporan'>Bonus</td>
	<td width='90' align='center' class='header_laporan'>Sub Total</td>
  </tr>";
			$sql1="select distinct a.kode_barang,b.nama as nama_brg,a.satuan,a.jumlah,a.bonus,a.harga,a.diskon,(a.harga-a.diskon)*a.jumlah as total
from brg_trans_d a
inner join brg_barang b on a.kode_barang=b.kode_barang and a.kode_lokasi=b.kode_lokasi
where a.no_bukti='$row->no_bukti' 
order by a.kode_barang ";
			
			$rs1 = $dbLib->execute($sql1);
			$j=1;$harga=0; $diskon=0; $jumlah=0; $bonus=0; $total=0; 
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$harga=$harga+$row1->harga;
				$diskon=$diskon+$row1->diskon;
				$jumlah=$jumlah+$row1->jumlah;
				$bonus=$bonus+$row1->bonus;
				$total=$total+$row1->total;
				echo "<tr>
    <td align='center' class='isi_laporan'>$j</td>
    <td  class='isi_laporan'>$row1->kode_barang</td>
    <td class='isi_laporan'>$row1->nama_brg</td>
	<td class='isi_laporan'>$row1->satuan</td>
    <td align='right' class='isi_laporan'>".number_format($row1->harga,0,",",".")."</td>
	<td align='right' class='isi_laporan'>".number_format($row1->diskon,0,",",".")."</td>
	<td align='right' class='isi_laporan'>".number_format($row1->jumlah,0,",",".")."</td>
	<td align='right' class='isi_laporan'>".number_format($row1->bonus,0,",",".")."</td>
	<td align='right' class='isi_laporan'>".number_format($row1->total,0,",",".")."</td>
  </tr>";		
				$j=$j+1;
			}
			echo "<tr>
    <td colspan='4' align='center'  class='header_laporan'>Total</td>
	<td align='right' class='header_laporan'>".number_format($harga,0,",",".")."</td>
   <td align='right' class='header_laporan'>".number_format($diskon,0,",",".")."</td>
   <td align='right' class='header_laporan'>".number_format($jumlah,0,",",".")."</td>
   <td align='right' class='header_laporan'>".number_format($bonus,0,",",".")."</td>
   <td align='right' class='header_laporan'>".number_format($total,0,",",".")."</td>
  </tr>";
			echo "<tr>
    <td colspan='8' align='right'  class='header_laporan'>PPN</td>
   <td align='right' class='header_laporan'>".number_format($row->nilai2,0,",",".")."</td>
  </tr>";

			
			echo "<tr>
    <td colspan='8' align='right'  class='header_laporan'>Total</td>
	  <td align='right' class='header_laporan'>".number_format($row->nilai1,0,",",".")."</td>
  </tr>";
			echo "<tr>
    <td colspan='11' class='header_laporan'> Terbilang : ".$AddOnLib->terbilang($row->nilai1)."</td>
  </tr>";
		echo "</table>";
		echo "</td>
  </tr>
  <tr>
    <td align='right'><table width='600' border='1' cellspacing='0' cellpadding='0' class='kotak'>
      <tr>
        <td width='300' valign='top'><table width='100%' border='0' cellpadding='1' cellspacing='2'>
          <tr>
            <td align='center' class='header_laporan'>Barang telah diterima dengan baik,</td>
          </tr>
          <tr>
            <td height='50' align='center'>&nbsp;</td>
          </tr>
          <tr>
            <td align='center'>&nbsp;</td>
          </tr>
          <tr>
            <td align='center' class='header_laporan'>NIK.</td>
          </tr>
        </table></td>
        <td width='200' valign='top'><table width='100%' border='0' cellpadding='1' cellspacing='2'>
          <tr>
            <td align='center' class='header_laporan'>Controler,</td>
          </tr>
          <tr>
            <td height='50' align='center'>&nbsp;</td>
          </tr>
          <tr>
            <td align='center'>&nbsp;</td>
          </tr>
          <tr>
            <td align='center' class='header_laporan'>NIK.</td>
          </tr>
        </table></td>
        <td width='200' valign='top'><table width='100%' border='0' cellpadding='1' cellspacing='2'>
          <tr>
            <td align='center' class='header_laporan' class='header_laporan'>Hormat Kami,</td>
          </tr>
          <tr>
            <td height='50' align='center'>&nbsp;</td>
          </tr>
          <tr>
            <td align='center' class='header_laporan'><u>$row->nama_user</u></td>
          </tr>
          <tr>
            <td align='center' class='header_laporan'>NIK.$row->nik_user</td>
          </tr>
        </table></td>
      </tr>
    </table></td>
  </tr>
</table>";
			echo "<DIV style='page-break-after:always'></DIV>";
		}
		echo "</div>";
		return "";
	}
	
}
?>
  
