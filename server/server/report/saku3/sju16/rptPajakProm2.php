<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_sju16_rptPajakProm2 extends server_report_basic
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
		$tahun=substr($tmp[0],0,4);
		$sql="select distinct h.logo,h.alamat,a.tahun_pajak,a.kode_lokasi
        from sju_dnp_m a
        left join lokasi h on a.kode_lokasi=h.kode_lokasi
        $this->filter ";
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
    $i=1;
    $logo="image/sju.jpg";
		echo "<div align='center'>"; 
		
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$alamat=$row->alamat;
		echo "<table width='800' border='0' cellspacing='0' cellpadding='0' >
  <tr>
    <td height='30' align='center' valign='middle' class='judul_bukti'>DAFTAR NOMINATIF BIAYA PRODUKSI</td>
  </tr>
  <tr>
  <td height='20' align='center' valign='middle' class='judul_bukti'>&nbsp;</td>
  </tr>
  <tr>
    <td colspan='2' style='padding:10px;'><table width='800' border='0' cellpadding='0' cellspacing='0' >
  <tr>
  <td><table width='100%'  border='0' class='kotak'>
        <tr>
            <td width='200' class='isi_laporan'>Nama Wajib Pajak</td>
            <td width='300' class='isi_laporan'>: PT Sarana Janesia Utama</td>
            <td width='100' class='isi_laporan'>&nbsp;</td>
            <td width='200' class='isi_laporan'>Lampiran :</td>
        </tr>
        <tr>
            <td width='200' class='isi_laporan'>NPWP</td>
            <td width='300' class='isi_laporan'>: 01.360.761.9-038.000</td>
            <td width='100' class='isi_laporan'>&nbsp;</td>
            <td width='200' class='isi_laporan'>Peraturan Menteri Keuangan
            </td>
        </tr>
        <tr>
            <td width='200' class='isi_laporan'>Alamat</td>
            <td width='300' class='isi_laporan'>: Gedung Dana Pensiun Telkom Lt.3, Jl. Letjend. S. Parman Kav. 56 Jakarta 11410
            Telp. (62-21) 534-7032 (Hunting), Fax. (62-21) 536-75185				
            </td>
            <td width='100' class='isi_laporan'>&nbsp;</td>
            <td width='200' class='isi_laporan'>Nomor: 02/PMK.03/2010 Tentang Biaya Promosi Yang Dapat Dikurangkan Dari Penghasilan Bruto	
            </td>
        </tr>
        <tr>
            <td width='200' class='isi_laporan'>Tahun Pajak</td>
            <td width='300' class='isi_laporan'>: $row->tahun_pajak </td>
        </tr>
        <tr>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
        </tr>
        </table></td>

  </tr>
   <tr>
    <td><table  border='1' cellspacing='0' cellpadding='0' class='kotak'>
    <tr bgcolor='#CCCCCC'>
      <td width='30' align='center' class='header_laporan' rowspan='2'>No</td>
    <td width='200' align='center' class='header_laporan' colspan='7'>Data Penerima</td>
    <td width='80' align='center' class='header_laporan' colspan='2'>Pemotongan PPH</td>
     </tr>";
     echo
     "<tr>
      <td width='400' align='center' class='header_laporan'>Nama</td>
    <td width='150' align='center' class='header_laporan'>NPWP</td>
      <td width='400' align='center' class='header_laporan'>Alamat</td>
    <td width='80' align='center' class='header_laporan'>Tanggal</td>
    <td width='150' align='center' class='header_laporan'>Bentuk dan Jenis Biaya </td>
    <td width='80' align='center' class='header_laporan'>Jumlah (Rp) </td>
    <td width='80' align='center' class='header_laporan'>Keterangan</td>
    <td width='80' align='center' class='header_laporan'>Jumlah PPH</td>
      <td width='150' align='center' class='header_laporan'>No. Bukti Potong</td>
      </tr>";	
	  $sql="select a.no_dn,a.kode_lokasi,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.tahun_pajak,a.tanggal,a.kode_pp,a.alamat as alamat_sju,
    a.jenis,a.jumlah,a.kategori,date_format(a.tgl_terima,'%d/%m/%Y') as tgl_terima,a.nama,a.npwp,a.alamat,a.pph,a.no_pot,
   a.keterangan,h.logo,h.alamat,a.nama_aju,a.nama_jabat
from sju_dnp_m a
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
left join lokasi h on a.kode_lokasi=h.kode_lokasi
$this->filter ";


      $rs1 = $dbLib->execute($sql);
      $j=1; $nilai=0; $pajak=0; $netto=0;
	  while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
            $nilai+=$row1->jumlah;
            $nilai2+=$row1->pph;
      echo "<tr>
        <td class='isi_laporan'>$j</td>
        <td class='isi_laporan'>$row1->nama</td>
        <td class='isi_laporan'>$row1->npwp</td>
        <td class='isi_laporan'>$row1->alamat</td>
        <td class='isi_laporan'>$row1->tgl_terima</td>
        <td class='isi_laporan'>$row1->jenis</td>
        <td class='isi_laporan' align='right'>".number_format($row1->jumlah,0,",",".")."</td>
        <td class='isi_laporan'>$row1->keterangan</td>
        <td class='isi_laporan' align='right'>".number_format($row1->pph,0,",",".")."</td>
        <td class='isi_laporan'>$row1->no_pot</td>
      </tr>";

      $j=$j+1;

		}
		 echo "<tr>
        <td class='header_laporan' colspan='6' align='right'>Total</td>
      
        <td class='header_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
        <td class='header_laporan' >&nbsp;</td>
        <td class='header_laporan' align='right'>".number_format($nilai2,0,",",".")."</td>
      </tr>";
    echo "</table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr
  <tr>
    <td><table width='100%'  class='kotak' border='0' cellpadding='0' cellspacing='0'>

	   <tr align='right'  >
        <td width='200' class='isi_laporan'>Jakarta, &nbsp;&nbsp;&nbsp; Desember $row->tahun_pajak</td>
      </tr>
      <tr align='right'>
       <td height='100'></td>
    </tr>
    <tr align='right'>
    <td width='200' class='isi_laporan'>PT Sarana Janesa Utama</td>
  </tr>
    </table></td>
  </tr>
 
  
</table></td>
  </tr>
</table><br>
			<DIV style='page-break-after:always'></DIV>";
			$i=$i+1;
		}
		
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
