<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_logistik_rptBaFormLampiran extends server_report_basic
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
		$sql="select a.no_ba,a.tanggal,a.no_dokumen,a.keterangan,a.no_po,a.kode_vendor,b.nama as nama_vendor,c.no_dokumen as no_kontrak,b.alamat,c.keterangan as ket_po,a.no_po
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
    <td align='center' class='style16'>LAMPIRAN BERITA ACARA SERAH TERIMA DAN UJI TERIMA BARANG</td>
  </tr>
  <tr>
    <td><hr></td>
  </tr>
 <tr>
    <td align='center'>$row->ket_po</td>
  </tr>
  <tr>
    <td align='center'>&nbsp;</td>
  </tr>
  <tr>
    <td><table width='800' border='1' cellspacing='0' cellpadding='0' class='kotak'>
        <tr align='center' bgcolor='#CCCCCC'>
          <td width='30' class='header_laporan'>No</td>
          <td width='150' class='header_laporan'>Nama Barang </td>
		  <td width='100' class='header_laporan'>Merk</td>
		  <td width='100' class='header_laporan'>Tipe</td>
          <td width='150' class='header_laporan'>Spesifikasi</td>
          <td width='50' class='header_laporan'>Jumlah</td>
          <td width='40' class='header_laporan'>Sat</td>
          <td width='80' class='header_laporan'>Diterima</td>
          <td width='80' class='header_laporan'>Ditolak</td>
        </tr>";
			$sql1="select a.item,a.merk,a.tipe,a.catatan,a.jumlah
from log_pesan_d a
where a.no_po='$row->no_po'  ";
			
			$rs1 = $dbLib->execute($sql1);
			$j=1;$jumlah=0; 
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
        echo "<tr>
          <td align='center' class='isi_laporan'>$j</td>
          <td class='isi_laporan'>$row1->item</td>
          <td class='isi_laporan'>$row1->merk</td>
          <td class='isi_laporan'>$row1->tipe</td>
          <td class='isi_laporan'>$row1->catatan</td>
          <td class='isi_laporan' align='center'>".number_format($row1->jumlah,0,",",".")."</td>
          <td class='isi_laporan'>Unit</td>
		  <td class='isi_laporan'>&nbsp;</td>
		  <td class='isi_laporan'>&nbsp;</td>
        </tr>";
				$jumlah+=$row1->jumlah;
				$j=$j+1;
			}
			  echo "<tr>
          <td align='center' class='header_laporan' colspan='5'>Jumlah</td>
        
          <td class='header_laporan' align='center' >".number_format($jumlah,0,",",".")."</td>
          <td class='header_laporan' colspan='3' >&nbsp;</td>
		
        </tr>";
    echo "</table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
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
