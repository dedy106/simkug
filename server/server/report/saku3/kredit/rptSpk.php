<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_kredit_rptSpk extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$sql="select 1";
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
		
		
		$sql="select a.no_ttb,a.kode_lokasi,a.tanggal,b.nama,c.nama as nama_survey
from kre_ttb2_m a
inner join kre_agg b on a.no_agg=b.no_agg and a.kode_lokasi=b.kode_lokasi
inner join karyawan c on a.nik_ss=c.nik and a.kode_lokasi=c.kode_lokasi
$this->filter
order by a.no_ttb";
		$rs = $dbLib->execute($sql);	
		//$start = (($this->page-1) * $this->rows);
		//$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		$i = 1;
		
		$AddOnLib=new server_util_AddOnLib();
		
		$logo="image/jawa_makmur.jpg";
		echo "<div align='center'>"; 
		//echo $AddOnLib->judul_laporan("kuitansi",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table width='800' border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td><img src='$logo' width='200' height='64'></td>
  </tr>
  <tr>
    <td align='center' valign='top'><strong>PERJANJIAN JUAL BELI</strong></td>
  </tr>
  <tr>
    <td align='center' valign='top'>$row->no_ttb </td>
  </tr>
  <tr>
    <td align='center' valign='top'>&nbsp;</td>
  </tr>
  <tr>
    <td>Yang bertanda tangan di bawah ini :</td>
  </tr>
  <tr>
    <td><strong>Surveyor</strong> yang bertindak atas nama</td>
  </tr>
  <tr>
    <td height='40' valign='bottom'><strong>PT JAWA MAKMUR</strong></td>
  </tr>
  <tr>
    <td>Yang selanjutnya disebut <strong>PIHAK I</strong></td>
  </tr>
  <tr>
    <td>Pembeli/Kordinator, yang tertera pada tanda terima barang, yang selanjutnya disebut <strong>PIHAK II</strong></td>
  </tr>
  <tr>
    <td>dengan ini mengadakan perjanjian Jual Beli dengan ketentuan sebagai berikut :</td>
  </tr>
  <tr>
    <td height='40' align='center' valign='bottom'><strong>Pasal 1</strong></td>
  </tr>
  <tr>
    <td align='center'><strong>PIHAK II</strong> Mengakui menerima sejumlah barang yang tertera pada tanda terima barang <strong>PIHAK I</strong></td>
  </tr>
  <tr>
    <td height='40' align='center' valign='bottom'><strong>Pasal 2</strong></td>
  </tr>
  <tr>
    <td align='center'>PIHAK I akan memberi kwitansi resmi untuk setiap pembayaran dan pembayaran dianggap sah bila pembeli menerima bukti kwitansi sesuai dengan contoh dan cap resmi, Pembayaran tanpa Kwitansi atau menggunakan tanda pembayaran yang tidak sesuai dengan contoh adalah resiko dan tanggung jawab Pembeli Kordinator.</td>
  </tr>
  <tr>
    <td height='40' align='center' valign='bottom'><strong>Pasal 3</strong></td>
  </tr>
  <tr>
    <td align='center'>Apabila karena suatu hal pembeli <strong>membatalkan/mengembalikan</strong> barang maka, <strong>angsuran yang sudah terbayar tidak dapat dikembalikan</strong> oleh <strong>PIHAK I</strong> kepada <strong>PIHAK II</strong>.</td>
  </tr>
  <tr>
    <td height='40' align='center' valign='bottom'><strong>Pasal 4</strong></td>
  </tr>
  <tr>
    <td align='center'><strong>PIHAK II</strong> berkewajiban melakukan pembayaran resmi sesuai tanggal pengiriman barang dari <strong>PIHAK I</strong> selama waktu yang telah disepakati oleh kedua belah pihak.</td>
  </tr>
  <tr>
    <td height='40' align='center' valign='bottom'><strong>Pasal 5</strong></td>
  </tr>
  <tr>
    <td align='center'>Apabila <strong>PIHAK II</strong> <strong>gagal atau Lambat membayar angsuran</strong> pada waktu yang telah ditetapkan, maka <strong>PIHAK I</strong> dapat <strong>menarik kembali barang yang telah dibeli</strong> oleh <strong>PIHAK II</strong> atau menyita barang milik <strong>PIHAK II</strong> sesuai sisa hutang.</td>
  </tr>
  <tr>
    <td height='40' align='center' valign='bottom'><strong>Pasal 6</strong></td>
  </tr>
  <tr>
    <td align='center'>Jika dikemudian hari terjadi hal-hal yang tidak dapat diselesaikan musyawarah oleh kedua belah pihak maka,<strong>PIHAK I</strong> memilih Pengadilan Negeri setempat untuk diselesaikan secara hukum.</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>Demikian Perjanjian Jual Beli ini dibuat dalam rangkap dua yang masing-masing mempunyai kekuatan hukum yang sama untu kebaikan kedua belah pihak.</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='300' align='center'><strong>PIHAK I</strong> </td>
        <td width='200'>&nbsp;</td>
        <td width='300' align='center'>PIHAK II </td>
      </tr>
      <tr>
        <td height='60' align='center'>&nbsp;</td>
        <td>&nbsp;</td>
        <td align='center'>&nbsp;</td>
      </tr>
	  <tr>
        <td align='center'>$row->nama_survey</td>
        <td>&nbsp;</td>
        <td align='center'>$row->nama</td>
      </tr>
      <tr>
        <td align='center'><strong>(Surveyor)</strong></td>
        <td>&nbsp;</td>
        <td align='center'><strong>(Pembeli/Kordinator)</strong></td>
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
  
