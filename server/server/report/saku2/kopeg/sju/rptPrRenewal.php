<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_sju_rptPrRenewal extends server_report_basic
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
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$acc=$tmp[2];
		$sql="select a.no_renew,a.kode_lokasi,b.no_polis,c.no_dok,e.nama as nama_cust,c.total,c.objek,e.alamat,g.nama as nama_tipe,
       c.tgl_selesai,i.nama as nama_cab,d.n_premi,j.nama,j.alamat as alamat_sju
from sju_renew_m a
inner join sju_renew_d b on a.no_renew=b.no_renew and a.kode_lokasi=b.kode_lokasi
inner join sju_polis_m c on b.no_polis=c.no_polis and b.kode_lokasi=c.kode_lokasi
inner join sju_polis_vendor d on c.no_polis=d.no_polis and c.kode_lokasi=d.kode_lokasi
inner join sju_cust e on c.kode_cust=e.kode_cust and c.kode_lokasi=e.kode_lokasi
inner join sju_vendor f on d.kode_vendor=f.kode_vendor and d.kode_lokasi=f.kode_lokasi
inner join sju_tipe g on c.kode_tipe=g.kode_tipe and c.kode_lokasi=g.kode_lokasi
left join spro h on h.kode_spro='KACAB' and a.kode_lokasi=h.kode_lokasi
left join karyawan i on h.flag=i.nik and h.kode_lokasi=i.kode_lokasi
inner join lokasi j on a.kode_lokasi=j.kode_lokasi
$this->filter $acc
order by b.no_polis
 ";
		
		$rs=$dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		
		echo "<div align='center'>";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table width='800' border='0' cellspacing='2' cellpadding='1'>
  
  <tr>
    <td>No : $row->no_renew </td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>Kepada Yth : </td>
  </tr>
  <tr>
    <td>$row->nama_cust</td>
  </tr>
  <tr>
    <td>$row->alamat</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>Dengan Hormat </td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>Dengan ini kami beritahukan bahwa polis asuransi $row->nama_tipe atas nama Saudara dengan : </td>
  </tr>
  <tr>
    <td><table width='600' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='154'>No. Polis</td>
        <td width='436'>: $row->no_dok </td>
      </tr>
      <tr>
        <td>Harga Pertanggungan </td>
        <td>: Rp. ".number_format($row->total,2,',','.')." </td>
      </tr>
      <tr>
        <td>Obyek Pertanggungan</td>
        <td>: $row->objek </td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>Berakhir masa pertanggungannya pada tanggal ".substr($row->tgl_selesai,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tgl_selesai),0,6))." </td>
  </tr>
  <tr>
    <td>Sehubungan dengan hal tersebut , kami mohon konfirmasi dari Saudara mengenai perpanjangan polis ini dengan cara mengisi lembaran tersebut di bawah ini , dan segera mengembaikannya kepada kami dalam waktu dekat. </td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>Atas perhatian dan kerjasama Saudara, kami ucapkan terima kasih.</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>Jakarta , ".substr($row->tgl_selesai,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tgl_selesai),0,6))."</td>
  </tr>
  <tr>
    <td height='40'>&nbsp;</td>
  </tr>
  <tr>
    <td>$row->nama_cab</td>
  </tr>
  <tr>
    <td>Kepala Cabang</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td><hr></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td class='style18'>Kepada Yth, </td>
  </tr>
  <tr>
    <td class='style16'>PT SARANA JANESIA UTAMA</td>
  </tr>
  <tr>
    <td class='style18'>$row->nama</td>
  </tr>
  <tr>
    <td class='style18'>$row->alamat_sju</td>
  </tr>
  
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>Bersama ini kami harapkan agar polis kami No. $row->no_dok atas nama $row->nama_cust dapat dilakukan : </td>
  </tr>
  <tr>
    <td><table width='700' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='30' align='center'>1.</td>
        <td width='37'>&nbsp;</td>
        <td width='619'>Agar diperpanjang dengan kondisi yang sama </td>
      </tr>
      <tr>
        <td align='center'>2.</td>
        <td>&nbsp;</td>
        <td>Agar dibuat perubahan sebagai berikut </td>
      </tr>
      <tr>
        <td align='center'>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td align='center'>3.</td>
        <td>&nbsp;</td>
        <td>Dibatalkan dengan alasan : </td>
      </tr>
      <tr>
        <td align='center'>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>Premi segeara kami lunasi, setelah polis kami terima </td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>Catatan </td>
  </tr>
  <tr>
    <td>Polis harap dikirim ke </td>
  </tr>
  <tr>
    <td>Alamat : </td>
  </tr>
  <tr>
    <td>Telp : </td>
  </tr>
</table>";
		}

		return "<?div>";
		
	}
	
}
?>
