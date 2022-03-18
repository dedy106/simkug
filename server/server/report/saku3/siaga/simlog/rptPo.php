<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_siaga_simlog_rptPo extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$periode=$tmp[0];
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
    $sql="select a.periode,a.no_spk,a.kode_vendor,b.nama as vendor,b.alamat,b.no_telp,f.nama as buat,a.kode_lokasi,a.no_dokumen,a.kode_curr,
    a.ket_harga,a.ket_bayar,a.ket_kirim,a.ket_garansi,a.ket_denda,a.ket_spek,a.nik_ttd1,f.nama as nama1,a.nik_ttd3, a.jab_ttd1,b.pic
from log_spk_m a
inner join vendor b on a.kode_lokasi=b.kode_lokasi and a.kode_vendor=b.kode_vendor
inner join karyawan f on a.nik_ttd1=f.nik and f.flag_aktif='1' and f.kode_lokasi=a.kode_lokasi
$this->filter 
and a.modul = 'PO'";


		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$logo="image/gratika2.jpg";
		echo "<div align='center'>"; 
		//echo $AddOnLib->judul_laporan("LAPORAN JURNAL KASBANK",$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
		echo "<div align='center'>"; 
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			// $logo="image/".$row->logo;
			$alamat=$row->alamat;
			$nama_lokasi=strtoupper($row->nama_lokasi);
		echo "<table width='800' border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td align='right'><img src='$logo' width='251' height='100'></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align='center' class='istyle17'><u>PURCHASE ORDER (PO) </td><u>
  </tr>
  <tr>
    <td align='center' class='istyle17'>NO : $row->no_spk</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>

  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      
      <tr>
        <td  height='20' class='isi_bukti' width='150'>VENDOR NAME</td>
        <td class='isi_bukti'>: $row->vendor </td>
      </tr>
      <tr>
        <td  height='20' class='isi_bukti'>ALAMAT</td>
        <td class='isi_bukti'>: $row->alamat </td>
      </tr>
      <tr>
        <td  height='20' class='isi_bukti'>TELP</td>
        <td class='isi_bukti'>: $row->no_telp </td>
      </tr>
      <tr>
        <td  height='20' class='isi_bukti'>ATTENTION</td>
        <td class='isi_bukti'>: $row->pic  </td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>

  <tr>
    <td><table width='800' border='1' cellspacing='0' cellpadding='0' class='kotak'>
      <tr bgcolor='#CCCCCC'>
        <td width='30' align='center' class='isi_bukti'>NO</td>
        <td width='300' align='center' class='isi_bukti'>URAIAN</td>
        <td width='100' align='center' class='isi_bukti'>Type</td>
        <td width='80' align='center' class='isi_bukti'>QTY </td>
        <td width='100' align='center' class='isi_bukti'>HARGA SATUAN ($row->kode_curr)</td>
        <td width='100' align='center' class='isi_bukti'>TOTAL HARGA ($row->kode_curr)</td>
      </tr>";
    $sql1="select a.item,a.jumlah,a.harga,a.harga*a.jumlah as total,a.tipe
    from log_spk_d a 
    where a.no_spk='$row->no_spk' and a.kode_lokasi='$row->kode_lokasi'
    GROUP BY a.item,a.jumlah,a.harga,a.tipe,a.no_urut
    order by a.no_urut  ";

	
		$rs1 = $dbLib->execute($sql1);
		$i=1;
		$nilai=0;$npajak=0;$netto=0;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{	
			$nilai+=$row1->total;
			// $npajak+=$row1->npajak;
			// $netto+=$row1->netto;
      echo "<tr>
        <td class='isi_bukti' align='center'>$i</td>
        <td class='isi_bukti'>$row1->item</td>
        <td class='isi_bukti'>$row1->tipe</td>
        <td class='isi_bukti'>$row1->jumlah</td>     
        <td class='isi_bukti' align='right'>".number_format($row1->harga,0,",",".")."</td>
        <td class='isi_bukti' align='right'>".number_format($row1->total,0,",",".")."</td>
      </tr>";
			$i=$i+1;
		}
      echo "<tr>
        <td colspan='5' align='center' class='isi_bukti'>JUMLAH</td>
        <td class='isi_bukti' align='right'>".number_format($nilai,0,",",".")."</td>
      </tr>
	 
    </table></td>
  </tr>
 
  <tr>
  <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
    <tr>
    <td  height='5' class='isi_bukti'><b>Keterangan</td></b>
 </tr>
    <tr>
      <td   width='300' class='isi_bukti'>1. Harga</td>
      <td class='isi_bukti'>: $row->ket_harga </td>
    </tr>
    <tr>
      <td  width='300' class='isi_bukti'>2. Sistem Pembayaran</td>
      <td class='isi_bukti'>: $row->ket_bayar </td>
    </tr>
    <tr>
      <td  width='300' class='isi_bukti'>3. Pengiriman</td>
      <td class='isi_bukti'>: $row->ket_kirim </td>
    </tr>
    <tr>
      <td  width='300' class='isi_bukti'>4. Garansi</td>
      <td class='isi_bukti'>: $row->ket_garansi  </td>
    </tr> 
       <tr>
    <td  width='300' class='isi_bukti'>5. Denda Keterlambatan</td>
    <td class='isi_bukti'>: Gratika berhak mengenakan denda 1% (satu permil) dari total harga PO, sebelum PPN 10% perhari keterlambatan atau sampai dengan jumlah maksimum 50 hari kerja atau 5% (lima persen) dari harga sebelum PPN 10%.  </td>
  </tr>
  <tr>
  <td  width='300' class='isi_bukti'>6. Spesifikasi Barang</td>
  <td class='isi_bukti'>: Apabila barang/pekerjaan yang disupply oleh <b>$row->vendor</b> tidak sesuai dengan spesifikasi atau fungsi yang telah disepakati, maka <b>$row->vendor</b> berkewajiban dan setuju untuk memenuhi spesifikasi atau fungsi yang kurang tanpa tambahan biaya dan waktu pelaksanaan pekerjaan.  </td>
</tr>
  </table></td>
</tr>

<tr>
<td align='center'><table border='0' cellspacing='2' cellpadding='1'>
<br>
<br>
  <tr>
    <td width='150' class='header_laporan'>NIK TTD 1 : </td>
  

  </tr>
  <tr>
    <td height='60'>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td class='header_laporan'>$row->nama1</td>
   
  </tr>
  <tr>
    <td class='header_laporan'>$row->jab_ttd1</td>
    

  </tr>
</table></td>
</tr>

  <tr>
    <td>&nbsp;</td>

</table>";
			$i=$i+1;
		}
		echo "</div>";
		return "";
		
	}
	
}
?>
