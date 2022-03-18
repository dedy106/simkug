<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_sju_rptPrTagihan extends server_report_basic
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
		$sql="";
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		$sql="select a.no_tagih,a.tanggal,b.nama as nama_cust,b.alamat,b.pic,d.bank,d.no_rek ,a.kode_lokasi,a.kode_tagih,d.no_fax,e.nama as nama_app,e.jabatan 
from (select a.no_tagih,a.tanggal,d.kode_tagih,c.kode_lokasi,a.periode,a.nik_app
from sju_tagih_m a
inner join sju_tagih_d b on a.no_tagih=b.no_tagih and a.kode_lokasi=b.kode_lokasi
inner join sju_polis_m c on b.no_polis=c.no_polis and b.kode_lokasi=c.kode_lokasi
inner join sju_cust d on c.kode_cust=d.kode_cust and c.kode_lokasi=d.kode_lokasi
group by a.no_tagih,a.tanggal,d.kode_tagih,c.kode_lokasi,a.periode,a.nik_app
	 )a
inner join sju_cust b on a.kode_tagih=b.kode_cust and a.kode_lokasi=b.kode_lokasi
inner join lokasi d on a.kode_lokasi=d.kode_lokasi
inner join karyawan e on a.nik_app=e.nik
$this->filter
order by a.no_tagih
 ";
	
		$rs=$dbLib->execute($sql);
		$tot_total=0; $tot_n_premi=0; $tot_n_fee=0; $tot_ppn=0; $tot_pph=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table width='800' border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td>No $row->no_tagih </td>
  </tr>
  <tr>
    <td>".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))."</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>Kepada</td>
  </tr>
  <tr>
    <td>Yth. $row->pic </td>
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
    <td align='center'>Tagihan Premi Asuransi $row->nama_tipe </td>
  </tr>
  <tr>
    <td align='center'>An. $row->nama_cust </td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>Dengan Hormat,</td>
  </tr>
  <tr>
    <td>Bersama ini kami sampaikan Polis dan Kuitansi asli serta duplikat atas tagihan premi asuransi dengan rincian sebagai berikut : </td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td><table width='800' border='1' cellspacing='0' cellpadding='0' class='kotak'>
      <tr align='center'>
        <td width='33' class='header_laporan'>No</td>
        <td width='150' class='header_laporan'>Nomor Polis</td>
        <td width='150' class='header_laporan'>No Kuitansi </td>
        <td width='200' class='header_laporan'>Tertanggung</td>
		<td width='100' class='header_laporan'>COB</td>
        <td width='90' class='header_laporan'>Tagihan</td>
      </tr>";
		$sql="select a.no_polis,b.no_dok,c.nama as nama_cust,b.kode_tipe,d.nama as nama_tipe,e.premi+e.materai+e.p_cost as n_premi
from sju_tagih_d a
inner join sju_polis_m b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi 
inner join sju_cust c on b.kode_cust=c.kode_cust and b.kode_lokasi=c.kode_lokasi
inner join sju_tipe d on b.kode_tipe=d.kode_tipe and b.kode_lokasi=d.kode_lokasi
inner join sju_polis_termin e on a.no_polis=e.no_polis and a.kode_lokasi=e.kode_lokasi and a.nu=e.nu 
where c.kode_tagih='$row->kode_tagih' and a.kode_lokasi='$row->kode_lokasi' and a.no_tagih='$row->no_tagih'";
		
		$rs1=$dbLib->execute($sql);
		$i=1; $n_premi=0;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
			$n_premi+=$row1->n_premi;
      echo "<tr>
        <td align='center' class='isi_laporan'>$i</td>
        <td class='isi_laporan'>$row1->no_dok</td>
        <td class='isi_laporan'>&nbsp;</td>
        <td class='isi_laporan'>$row1->nama_cust</td>
		<td class='isi_laporan'>$row1->nama_tipe</td>
        <td class='isi_laporan' align='right'>".number_format($row1->n_premi,2,',','.')."</td>
      </tr>";
			$i+=1;
		}
      echo "<tr>
        <td colspan='5' align='center' class='header_laporan'>Jumlah</td>
        <td align='right' class='header_laporan'>".number_format($n_premi,2,',','.')."</td>
      </tr>";
    echo "</table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>Sehubungan dengan hal tersebut , Kami mohon kiranya premi diatas dapat dibayarkan secara <strong>tunai</strong> atau <strong>transfer</strong> ke rekening kami pada : </td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align='center'>$row->bank</td>
  </tr>
  <tr>
    <td align='center'>Rekening No : $row->no_rek </td>
  </tr>
  <tr>
    <td align='center'>atas nama PT. Sarana Janesia Utama </td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>Untuk menghindari dari ditolaknya klaim yang disebabkan premi belum dilunasi, maka kami mohon kiranya premi dapat dibayarkan paing lambat dalam waktu 7 (tujuh) hari kalender sejak diterbitkannya polis. </td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>Demikian atas perhatian dan kerjasamanya kami ucapkan terima kasih. </td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td><table width='364' border='0' cellspacing='2' cellpadding='1'>
          <tr>
            <td width='358'>Hormat kami </td>
          </tr>
          <tr>
            <td>PT. Sarana Janesia Utama </td>
          </tr>
          <tr>
            <td height='60'>&nbsp;</td>
          </tr>
          <tr>
            <td>$row->nama_app</td>
          </tr>
          <tr>
            <td>$row->jabatan</td>
          </tr>
        </table></td>
        <td><table width='400' border='1' cellspacing='0' cellpadding='0' class='kotak'>
          <tr>
            <td><table width='400' border='0' cellspacing='2' cellpadding='1'>
              <tr>
                <td align='center'><b>PENTING ! </b></td>
              </tr>
              <tr>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td>Apabila pembayaran premi dengan cara Transfer , agara bukti Transfer disertai keterangan nomor polis yang dibayarkan dapat disampaikan kepada kami melalui fax no. $row->no_fax </td>
              </tr>
            </table></td>
          </tr>
        </table></td>
      </tr>
    </table></td>
  </tr>
</table>";
		}
		echo "</div>";
		return "";
		
	}
	
}
?>
