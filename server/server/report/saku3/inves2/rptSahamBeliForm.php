<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_inves2_rptSahamBeliForm extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
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
		$nama_cab=$tmp[1];
		$sql="select a.no_shmbeli,a.no_dokumen,date_format(a.tanggal,'%d/%m/%Y') as tanggal,date_format(a.tgl_set,'%d/%m/%Y') as tgl_set,a.keterangan,
       a.kode_kelola,b.nama as nama_kelola,isnull(c.jumlah,0) as jumlah,isnull(c.n_beli,0) as n_beli,
	   isnull(c.komisi,0) as komisi,isnull(c.vat,0) as vat,isnull(c.levi,0) as levi
from inv_shmbeli_m a
inner join inv_kelola b on a.kode_kelola=b.kode_kelola
left join (select a.no_shmbeli,sum(a.jumlah) as jumlah,sum(a.n_beli) as n_beli,sum(a.komisi) as komisi,
			   sum(a.vat) as vat,sum(a.levi) as levi
		from inv_shmbeli_d a 
		inner join inv_saham b on a.kode_saham=b.kode_saham
		inner join inv_saham_d c on a.kode_saham=c.kode_saham and a.kode_kelola=c.kode_kelola and a.kode_plan=c.kode_plan
		group by a.no_shmbeli
		  )c on a.no_shmbeli=c.no_shmbeli
$this->filter order by a.no_shmbeli";
		
		$rs = $dbLib->execute($sql);	
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		//echo $AddOnLib->judul_laporan("pembelian saham",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		
		$jumlah=0; $n_beli=0; $komisi=0; $vat=0; $levi=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$jumlah=$jumlah+$row->jumlah;
			$n_beli=$n_beli+$row->n_beli;
			$komisi=$komisi+$row->komisi;
			$vat=$vat+$row->vat;
			$levi=$levi+$row->levi;
			echo "<table width='800' border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td>Nomor : a </td>
  </tr>
  <tr>
    <td>Bandung, a </td>
  </tr>
  <tr>
    <td>Kepada Yth. </td>
  </tr>
  <tr>
    <td>CSUTODIAL SERVICE - a u.p. a </td>
  </tr>
  <tr>
    <td>a</td>
  </tr>
  <tr>
    <td>a</td>
  </tr>
  <tr>
    <td>a</td>
  </tr>
  <tr>
    <td>Perihal : a </td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>Dengan Hormat, </td>
  </tr>
  <tr>
    <td>Dengan ini kami instruksikan agar Custodial Service - a melaksanakan penyelesaian transaksi saham untuk Yayasan Kesehatan Pegawai TELKOM (YAKES-TELKOM) dengan kondisi dan ketentuan sebagai berikut : </td>
  </tr>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='160'>1. Tipe Settlement </td>
        <td width='628'>: a </td>
      </tr>
      <tr>
        <td>2. Tanggal Transaksi </td>
        <td>: a </td>
      </tr>
      <tr>
        <td>3. Tanggal Settlement </td>
        <td>: a </td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td>4. Rincian Saham dan Nominal Pembayaran : </td>
  </tr>
  <tr>
    <td><table width='800' border='1' cellspacing='0' cellpadding='0' class='kotak'>
      <tr>
        <td width='200' align='center'>Nama Saham </td>
        <td width='100' align='center'>Scriptless (saham) </td>
        <td width='150' align='center'>Nominal Biaya Pembelian (Rp) </td>
        <td width='200' align='center'>PPh Ps 23 Komisi Broker (Rp) </td>
        <td width='200' align='center'>Nominal Hasil Penjualan + PPh Ps 23 Komisi Broker </td>
        <td width='200' align='center'>Nama Broker </td>
      </tr>
      <tr>
        <td align='center'>1</td>
        <td align='center'>2</td>
        <td align='center'>3</td>
        <td align='center'>4</td>
        <td align='center'>5=3-4</td>
        <td align='center'>6</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td align='center'>Total</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td>5. Saham tersebut dibukukan pada : Kustodian a </td>
  </tr>
  <tr>
    <td>Dana untuk settlement pembelian saham secara RVP diatas akan kamu transfer ke : </td>
  </tr>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='160'>- Nama Rekening </td>
        <td width='626'>: a </td>
      </tr>
      <tr>
        <td>- Nomor Rekening </td>
        <td>: a </td>
      </tr>
      <tr>
        <td>- Nama Bank </td>
        <td>: a </td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>Demikian disampaikan untuk pelaksanaan lebih lanjut dan setelah selesai transaksi mohon di informasikan kepada kami pada kesempatan pertama. Atas perhatian dan kerja sama Saudara, kami ucapkan terima kasih.</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>Hormat kami, </td>
  </tr>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='359' height='60'>&nbsp;</td>
        <td width='431'>&nbsp;</td>
      </tr>
      <tr>
        <td>a</td>
        <td>a</td>
      </tr>
      <tr>
        <td>jab</td>
        <td>jab</td>
      </tr>
    </table></td>
  </tr>
</table>";
			$i=$i+1;
		}
		
		echo "<br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
