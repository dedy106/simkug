<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_dakem_rptDakemForm extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select count(a.no_dakem)
from yk_dakem_m a
inner join yk_dakem_d b on a.no_dakem=b.kdtrans and a.kode_lokasi=b.kode_lokasi
inner join karyawan c on a.nik_buat=c.nik
inner join lokasi d on a.kode_lokasi=d.kode_lokasi ";
		
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
		$sql="select a.no_dakem,a.nik_buat,c.nama as nama_buat,a.alamat,a.jenis_bayar,a.tgl_transfer,b.tgl_lahir,a.tanggal,
	   b.nik,b.nikkes,b.nama_nikes,b.namaaw,b.statusaw,b.nominal,b.tglmeninggal,b.namabank,b.norek,b.cabang,
	   d.kota,e.flag as nik_bdh,e.nama as nama_bdh,f.flag as nik_fiat,f.nama as nama_fiat
from yk_dakem_m a
inner join yk_dakem_d b on a.no_dakem=b.kdtrans and a.kode_lokasi=b.kode_lokasi
inner join karyawan c on a.nik_buat=c.nik
inner join lokasi d on a.kode_lokasi=d.kode_lokasi
left join spro e on a.kode_lokasi=e.kode_lokasi and e.kode_spro='BDH1'
left join spro f on a.kode_lokasi=f.kode_lokasi and f.kode_spro='BDH2' $this->filter 
order by a.no_dakem ";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		$nominal=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$tanggal=substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6));
			$tglmeninggal=substr($row->tglmeninggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tglmeninggal),0,6));
			$tgl_lahir=substr($row->tgl_lahir,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tgl_lahir),0,6));
			$nominal=number_format($row->nominal,0,",",".");
			$terbilang=$AddOnLib->terbilang($row->nominal);
			echo "<table width='750' border='0' cellpadding='1' cellspacing='2'>
  <tr>
    <td width='453' rowspan='4'>&nbsp;    </td>
    <td width='447'> LAMPIRAN-III:Keputusan Direksi Perusahaan Perseroan (Persero) </td>
  </tr>
  <tr>
    <td> PT. Telekomunikasi Indonesia, Tbk. </td>
  </tr>
  <tr>
    <td> Nomor : KD. 23 /PS680/SDM-11/99 </td>
  </tr>
  <tr>
    <td> Tanggal : 30 Agustus 1999 </td>
  </tr>
 
  <tr>
    <td>Kepada Yth. </td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>Pengurus Yayasan Kesehatan Pegawai Telkom</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>Di Tempat </td>
    <td>&nbsp;</td>
  </tr>
   <tr>
    <td>&nbsp; </td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td colspan='2'> Perihal : PERMINTAAN PEMBAYARAN SUMBANGAN DANA KEMATIAN </td>
  </tr>
 <tr>
    <td>&nbsp; </td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>Yang bertanda tangan di bawah ini : </td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td colspan='2'><table width='100%' border='0' cellpadding='1' cellspacing='2'>
      <tr>
        <td width='15%'> Nama </td>
        <td width='2%'><div align='center'>:</div></td>
        <td width='83%'>$row->namaaw</td>
      </tr>
      <tr>
        <td>Ahli Waris dari </td>
        <td><div align='center'>:</div></td>
        <td>$row->nama_nikes</td>
      </tr>
      <tr>
        <td> NIK / NIPP </td>
        <td><div align='center'>:</div></td>
        <td>$row->nik</td>
      </tr>
	
      <tr>
        <td> Bank / No Rek </td>
        <td><div align='center'>:</div></td>
        <td>$row->namabank / $row->norek</td>
      </tr>
	
      <tr>
        <td valign='top'> Alamat Rumah </td>
        <td valign='top'><div align='center'>:</div></td>
        <td>$row->alamat</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td><div align='center'></div></td>
        <td>&nbsp;</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td colspan='2'> <div align='justify'>dengan ini mengajukan permintaan pembayaran Sumbangan Dana Kematian sehubungan dengan meninggalnya $row->statusaw saya yang bernama
		$row->nama_nikes , lahir pada tanggal $tgl_lahir , $row->statusaw yang meninggal dunia pada $tglmeninggal 
    </div></td>
  </tr>
  <tr>
    <td colspan='2'><p> Bersama surat permintaan ini saya lampirkan : </p> </td>
  </tr>
  <tr>
    <td colspan='2'><table width='100%' border='0' cellpadding='1' cellspacing='2'>
      <tr>
        <td width='2%'>-</td>
        <td width='98%'> <div align='justify'>Surat Keterangan Kematian dari Rumah Sakit/ Puskesmas atau Lurah/ Kepala Desa*) setempat atau yang setara dengan itu; </div></td>
      </tr>";
	  if($row->statusaw =='Anak ') {
      echo "<tr>
        <td valign='top'>-.</td>
        <td> <div align='justify'>Surat Pernyataan dari orang tua/ wali *) yang menyatakan bahwa anak sebelum meninggal masih sekolah dan belum mempunyai penghasilan sendiri serta belum pernah kawin, yang dilengkapi dengan fotocopy kartu siswa/ mahasiswa yang masih berlaku atau fotocopy rapor/ daftar nilai semester/ triwulan terakhir atau Surat Keterangan masih bersekolah/ kuliah dari pimpinan sekolahnya (Khusus bila anak yang meninggal dunia telah berusia lebih dari 17 tahun **) sampai dengan 25 tahun); </div></td>
      </tr>";
	  } 
	  if ($row->statusaw =='Suami/Istri ') {
      echo "<tr>
        <td valign='top'>-</td>
        <td> <div align='justify'>Surat Keterangan dari Lurah/ Kepala Desa setempat atau yang setara dengan itu *) yang menyatakan bahwa janda/ duda belum pernah kawin lagi (Khusus bila janda/ duda yang meninggal dunia). </div></td>
      </tr>";
	   };
    echo "</table></td>
  </tr>
  <tr>
    <td colspan='2'> Demikian surat permintaan ini dibuat dengan sebenarnya. </td>
  </tr>
  <tr>
    <td colspan='2'>&nbsp;</td>
  </tr>
  <tr>
    <td colspan='2'>&nbsp;</td>
  </tr>
  <tr>
    <td colspan='2'><table width='100%' border='0' cellpadding='1' cellspacing='2'>
      <tr>
        <td width='28%'><div align='CENTER'>$row->kota ,$tanggal </div></td>
        <td width='47%'>&nbsp; </td>
        <td width='25%'><div align='center'>Fiatur, </div></td>
      </tr>
      <tr>
        <td><div align='center'>Yang mengajukan, </div></td>
        <td>&nbsp;</td>
        <td><p align='center'>
        </p></td>
      </tr>
      <tr>
        <td><div align='center'></div></td>
        <td>&nbsp;</td>
        <td><div align='center'></div></td>
      </tr>
      <tr>
        <td><div align='center'></div></td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td><div align='center'></div></td>
        <td>&nbsp;</td>
        <td><div align='center'></div></td>
      </tr>
      <tr>
        <td><div align='center'><font style='text-decoration:underline'>$row->namaaw   </font>
  
      </div></td>
        <td>&nbsp;</td>
        <td><div align='center'><font style='text-decoration:underline'>$row->nama_fiat
        </font></div></td>
      </tr>
      <tr>
        <td><div align='left'></div></td>
        <td>&nbsp; </td>
        <td><div align='center'>NIK.$row->nik_fiat
        </div></td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td colspan='2'>&nbsp;</td>
  </tr>
  <tr>
    <td colspan='2'><p> Catatan Bendaharawan : </p></td>
  </tr>";
  if ($row->jenis_bayar=='t') 
  { 
	  echo "<tr>
		<td colspan='2'> <div align='justify'>Permintaan pembayaran Sumbangan Dana Kematian tersebut telah diselesaikan dengan Giro Bilyet/Cek .............. transfer *) &nbsp;</div></td>
	  </tr>
	  <tr>
		<td colspan='2'>ke No Rekening *) $row->norek tanggal $tgl_transfer sebesar Rp. $nominal ( $terbilang ) Bank $row->nama_bank Cabang $row->cabang </td>
	  </tr>";
   } 
   else 
   { 
	   echo "<tr>
		<td colspan='2'> <div align='justify'>Permintaan pembayaran Sumbangan Dana Kematian tersebut telah diselesaikan dengan Pembayaran Tunai &nbsp;</div></td>
	  </tr>
	  <tr>
		<td colspan='2'>pada tanggal $tgl_transfer  sebesar Rp. $nominal ( $terbilang )</td>
	  </tr>";
   } 
  echo "<tr>
    <td colspan='2'>&nbsp;</td>
  </tr>
  <tr>
    <td colspan='2'><table width='100%' border='0' cellpadding='1' cellspacing='2'>
      <tr>
        <td width='33'> *)</td>
        <td width='523'> Coret salah satu </td>
        <td width='194'><div align='center'>
        </div></td>
      </tr>
      <tr>
        <td> **) </td>
        <td> Usia 17 Tahun pada huruf b, tidak dimaksudkan </td>
        <td><div align='center'></div></td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>merubah usia 21 tahun pada Pasal 4 ayat (4) </td>
        <td><div align='center'></div></td>
      </tr>
     
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td><u>$row->nama_bdh</u></td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp; </td>
        <td>NIK. $row->nik_bdh</td>
      </tr>
    </table></td>
  </tr>
</table>";
			echo "<br>";
			$i=$i+1;
		}
		
	
		echo "</div>";
		return "";
		
	}
	
}
?>
