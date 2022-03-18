<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_kredit_rptTtb extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select 1";
		
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
		$nama_cab=$tmp[1];
	$sql="select a.no_ttb,a.kode_lokasi,a.tanggal,b.nama,b.alamat,a.lama_bayar,a.nilai*a.lama_bayar as total,
	    date_format(a.tanggal,'%d/%m/%Y') as tgl,a.keterangan, date_format(a.tgl_so,'%d/%m/%Y') as tgl_so
from kre_ttb2_m a
inner join kre_agg b on a.no_agg=b.no_agg and a.kode_lokasi=b.kode_lokasi
$this->filter 
order by a.no_ttb";
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("laporan tanda terima barang",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		$logo="image/jawa_makmur.jpg";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			
		echo "<table width='800' border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='296' rowspan='4'><img src='$logo' width='200' height='64'></td>
        <td width='120'>No TTB </td>
        <td width='118'>: $row->no_ttb </td>
        <td width='48'>Tgl TTB </td>
        <td width='196'>: $row->tgl </td>
      </tr>
      <tr>
        <td>No SO </td>
        <td>:  </td>
        <td>Tgl SO</td>
        <td>: $row->tgl_so </td>
      </tr>
      <tr>
        <td colspan='4'>Telah terima barang-barang dibawah ini : </td>
        </tr>
		 <tr>
        <td>Nama</td>
        <td colspan='3'>: $row->nama</td>
        </tr>
		 <tr>
		   <td class='istyle17'>Tanda Terima Barang </td>
		   <td>Alamat Langganan </td>
		   <td colspan='3'>: $row->alamat</td>
	    </tr>
    </table></td>
  </tr>
  <tr>
    <td><table width='800' border='1' cellspacing='0' cellpadding='0' class='kotak'>
      <tr>
        <td width='38' align='center' class='header_laporan'>No</td>
        <td width='216'  align='center' class='header_laporan'>Nama Barang </td>
        <td width='85' align='center' class='header_laporan'>Type</td>
        <td width='82'  align='center' class='header_laporan'>Merk</td>
        <td width='60' align='center' class='header_laporan'>Jumlah Barang </td>
		<td width='60' align='center' class='header_laporan'>Bonus Barang </td>
        <td width='90' align='center' class='header_laporan'>Harga Satuan </td>
        <td width='90' align='center' class='header_laporan'>Jumlah</td>
      </tr>
      ";
		$sql="select a.kode_brg,b.nama,b.tipe,b.merk,a.jumlah,a.hjual,a.jumlah*a.hjual as total,a.bonus
from kre_ttb2_d a
inner join kre_brg b on a.kode_brg=b.kode_brg and a.kode_lokasi=b.kode_lokasi
		where a.no_ttb='$row->no_ttb' 
		order by a.kode_brg";
		
		$rs1 = $dbLib->execute($sql);
		$i=1;$total=0; $jumlah=0; $bonus=0;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
			$total+=$row1->total;
			$jumlah+=$row1->jumlah;
			$bonus+=$row1->bonus;
      echo "<tr>
        <td class='isi_laporan' align='center'>$i</td>
        <td class='isi_laporan'>$row1->nama</td>
        <td class='isi_laporan'>$row1->tipe</td>
        <td class='isi_laporan'>$row1->merk</td>
        <td class='isi_laporan' align='center'>".number_format($row1->jumlah,0,',','.')."</td>
		<td class='isi_laporan' align='center'>".number_format($row1->bonus,0,',','.')."</td>
        <td class='isi_laporan' align='right'>".number_format($row1->hjual,0,',','.')."</td>
        <td class='isi_laporan' align='right'>".number_format($row1->total,0,',','.')."</td>
      </tr>";
			$i+=1;
		}
	echo "<tr>
        <td colspan='4' class='header_laporan' align='center'>Total</td>
		<td align='center' class='header_laporan'>".number_format($jumlah,0,',','.')."</td>
		<td align='center' class='header_laporan'>".number_format($bonus,0,',','.')."</td>
        <td align='center' class='header_laporan'>&nbsp;</td>
        <td align='right' class='header_laporan'>".number_format($total,0,',','.')."</td>
      </tr>";
    echo "</table></td>
  </tr>
</table>";
		}
		echo "</div>";
		return "";
		
	}
	
}
?>
