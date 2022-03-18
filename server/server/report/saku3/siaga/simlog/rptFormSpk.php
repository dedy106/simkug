<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_siaga_simlog_rptFormSpk extends server_report_basic
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
    $sql="select a.nik_ttd1,a.no_dokumen,a.no_spk,a.periode,a.kode_vendor,b.nama as vendor,a.keterangan,b.pic,b.alamat,a.nik_buat,b.no_telp,c.nama as nama1,a.kode_lokasi,
a.no_pks,date_format(a.tanggal,'%d/%m/%Y') as tgl
from log_spk_m a
inner join vendor b on a.kode_lokasi=b.kode_lokasi and a.kode_vendor=b.kode_vendor
inner join karyawan c on a.kode_lokasi=c.kode_lokasi and a.nik_ttd1=c.nik
 $this->filter ";

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
    <td align='left'><img src='$logo' width='251' height='100'></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align='center' class='istyle17'><u>Surat Perintah Kerja </td></u>
  </tr>
  <tr>
    <td align='center' class='istyle17'>NO : $row->no_dokumen</td>
  </tr>


  <tr>
    <td><table width='300' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td  height='20' class='isi_bukti'>Kepada Yth.</td>
      </tr>
      <tr>
        <td class='isi_bukti'><b> $row->pic </td></b>
      </tr>
      <tr>
      <td class='isi_bukti'><b> $row->vendor </td></b>
      </tr>
      <tr>
      <td class='isi_bukti'>$row->alamat  </td>
    </tr>
    <tr>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
  <td class='isi_bukti'><b> $row->no_telp </td></b>
  </tr>
  <tr>
  <td>&nbsp;</td>
  <td>&nbsp;</td>
</tr>
<tr>
<td class='isi_bukti'>Dengan hormat, </td>
</tr>
<tr>
<td class='isi_bukti'>Menunjuk :</td>
</tr>

<tr>
<td><table class='isi_bukti' width='800' border='0' cellspacing='0' cellpadding='0' class='kotak'>
1. Quotation dari $row->vendor Perihal $row->keterangan Solution No : $row->no_pks tanggal $row->tgl
</td>
</tr>
</table>

<tr>
<td><table class='isi_bukti' width='800' border='0' cellspacing='0' cellpadding='0' class='kotak'>
Maka dengan ini $row->vendor Kami tunjuk untuk melaksanakan $row->keterangan dengan ketentuan sebagai berikut : 
</td>
</tr>
</table>
<br>

    </table></td>
  </tr>
  <tr>
  <td class='isi_bukti'><b>a. Nama & Type Pekerjaan (Rincian Terlampir) </td></b>
  </tr>

  <tr>
    <td><table width='800' border='1' cellspacing='0' cellpadding='0' class='kotak'>
      <tr bgcolor='#CCCCCC'>
        <td width='30' align='center' class='isi_bukti'>NO</td>
        <td width='80' align='center' class='isi_bukti'>Item</td>
        <td width='100' align='center' class='isi_bukti'>Jml </td>
        <td width='250' align='center' class='isi_bukti'>Unit</td>
        <td width='100' align='center' class='isi_bukti'>HARGA (Rp)</td>
        <td width='100' align='center' class='isi_bukti'>TOTAL HARGA (Rp)</td>
      </tr>";
    $sql1="select a.item,a.merk,a.tipe,a.catatan,a.jumlah,a.harga,a.ppn,a.harga * a.jumlah as total
    from log_spk_d a 
    where a.no_spk='$row->no_spk' and a.kode_lokasi='$row->kode_lokasi'
    GROUP BY a.item,a.merk,a.tipe,a.catatan,a.jumlah,a.harga,a.ppn ";

	
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
        <td class='isi_bukti'>$row1->jumlah</td>     
        <td class='isi_bukti'>$row1->tipe</td>
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
  <td><table width='800' border='0' cellspacing='2' cellpadding='0'>
  <b>b. Harga tersebut belum termasuk PPN 10% dan belum termasuk pajak lainnya.</td></b>
 </tr>
 </table>

    <tr>
    <td><table width='200' border='0' cellspacing='2' cellpadding='0'>
      <b>c. Terlampir</b> : Ketentuan & syarat-syarat tambahan. </td>
    </tr>
    </table>
    <br>

    <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='0'>
    Demikian disampaikan, atas perhatian dan kerjasamanya kami ucapkan terimakasih.</td>
    </tr>
    </table>

  </table></td>
</tr>
<br>
<br>

<tr>
<td><table width='800' border='0' cellspacing='2' cellpadding='1'>
<tr>
<td>Jakarta, ".$row->tgl."</td>
</tr>
  <tr>
    <td width='200' class='isi_bukti'>Hormat kami,</td>
    <td width='200'  class='isi_bukti'>&nbsp;</td>
  </tr>

  <tr>
    <td height='60'>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>

  </tr>
  <tr>
    <td class='isi_bukti'><u>$row->nama1</u></td>
  </tr>
  <tr>
    <td class='isi_bukti'>NIP : $row->nik_ttd1</td>
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
