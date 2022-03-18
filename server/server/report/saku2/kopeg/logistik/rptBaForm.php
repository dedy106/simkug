<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_logistik_rptBaForm extends server_report_basic
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
		$sql="select a.no_ba,a.tanggal,a.no_dokumen,a.keterangan,a.no_po,a.kode_vendor,b.nama as nama_vendor,c.no_dokumen as no_kontrak,b.alamat,c.keterangan as ket_po
from log_ba_m a
inner join vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi
inner join log_po_m c on a.no_po=c.no_po and a.kode_lokasi=c.kode_lokasi $this->filter
order by a.no_ba";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		
		$nilai=0;$nilai_ppn=0;$tagihan=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai=$nilai+$row->nilai;
			$nilai_ppn=$nilai_ppn+$row->nilai_ppn;
			$tagihan=$tagihan+$row->tagihan;
		echo "<table width='800' border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td align='center' class='style16'>BERITA ACARA </td>
  </tr>
  <tr>
    <td align='center' class='style16'>UJI TERIMA DAN SERAH TERIMA BARANG</td>
  </tr>
  <tr>
    <td><hr></td>
  </tr>
  <tr>
    <td align='center'><table width='700' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='120'> Pekerjaan </td>
        <td width='670'>: $row->keterangan </td>
      </tr>
      <tr>
        <td> Spesifikasi </td>
        <td>: a </td>
      </tr>
      <tr>
        <td> SPK/SPMK </td>
        <td>: $row->no_kontrak </td>
      </tr>
      <tr>
        <td> Mitra </td>
        <td>: $row->nama_vendor </td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>$row->alamat</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td> Kami yang bertanda tangan dibawah ini mewakili IT TELKOM telah melaksanakan Uji Terima terhadap $row->ket_po dengan hasil sebagai berikut : </td>
  </tr>
  <tr>
    <td align='center'><table width='750' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='28'> 1. </td>
        <td width='712'> Pemeriksaan dan Uji Terima Barang dilaksanakan pada tanggal ".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6)).". </td>
      </tr>
      <tr>
        <td> 2. </td>
        <td> Hasil pengadaan telah dilaksanakan sesuai dengan spesifikasi dan volume yang diminta, dinyatakan : </td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td align='center'>&nbsp;</td>
  </tr>
  <tr>
    <td align='center' class='style18'>DITERIMA DENGAN HASIL BAIK DAN LENGKAP</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td> Demikian Berita Acara ini dibuat dengan sebenarnya dan sejujurnya sebagai dasar proses lebih lanjut</td>
  </tr>
  <tr>
    <td align='center'><table width='600' border='0' cellspacing='2' cellpadding='1'>
        <tr>
          <td colspan='2'> Yang menyerahkan : </td>
          <td width='45'>&nbsp;</td>
          <td width='19'>&nbsp;</td>
          <td width='281'> Yang Menerima: </td>
        </tr>
        <tr>
          <td width='18'>1.</td>
          <td width='215'>............................ ....................... </td>
          <td>&nbsp;</td>
          <td>1.</td>
          <td>............................ .......................</td>
        </tr>
        <tr>
          <td>2.</td>
          <td>........................... .......................</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
    </table></td>
  </tr>
  <tr>
    <td align='center'><p align='center'> Mengetahui / Menyetujui : </p></td>
  </tr>
  <tr>
    <td align='center'> Manajer Logistik </td>
  </tr>
  <tr>
    <td height='50' align='center'>&nbsp;</td>
  </tr>
  <tr>
    <td align='center'> Alex Winarno </td>
  </tr>
</table>";
			$i=$i+1;
		}
	
		
		echo "</div>";
		return "";
		
	}
	
}
?>
