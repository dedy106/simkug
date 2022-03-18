<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_sju16_rptPajakDn extends server_report_basic
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
		$sql="select a.no_dn,a.kode_lokasi,a.tanggal,a.tahun_pajak,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.kode_pp,a.tempat,a.alamat as alamat_sju,
    a.jenis,a.jumlah,a.kategori,a.nama_pihak,date_format(a.tgl_beri,'%d/%m/%Y') as tgl_beri,
   a.posisi,a.nama_usaha,a.jenis_usaha,a.keterangan,h.logo,h.alamat
from sju_dne_m a
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
left join lokasi h on a.kode_lokasi=h.kode_lokasi
$this->filter order by a.no_dn";
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
    $i=1;
    $logo="image/sju.jpg";
		echo "<div align='center'>"; 
		
		
		$nilai=0;$nilai_ppn=0;$tagihan=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$alamat=$row->alamat;
			$nilai=$nilai+$row->nilai;
		echo "<table width='800' border='0' cellspacing='0' cellpadding='0' >
 
  <tr>
    <td height='30' align='center' valign='middle' class='judul_bukti'>DAFTAR NOMINATIF BIAYA ENTERTAINT DAN SEJENISNYA</td>
  </tr>
  
  <tr>
    <td colspan='2' style='padding:10px;'><table width='800' border='0' cellpadding='0' cellspacing='0' >
  <tr>
    <td><table width='100%'  border='0'>
    <tr>
    <td width='200'>Tahun Pajak</td>
    <td width='600'>: $row->tahun_pajak </td>
  </tr>

      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
     
    </table></td>
  </tr>
   <tr>
    <td><table  border='1' cellspacing='0' cellpadding='0' class='kotak' width='1000'>
    <tr bgcolor='#CCCCCC'>
      <td width='30' align='center' class='header_laporan' rowspan='2'>Nomor</td>
    <td width='200' align='center' class='header_laporan' colspan='5'>Pemberian Entertaint dan Sejenisnya</td>
    <td width='80' align='center' class='header_laporan' colspan='4'>Relasi Usaha yang Diberikan Entertaint dan Sejenisnya</td>
    <td width='150' align='center' class='header_laporan' rowspan='2'>Keterangan</td>
     </tr>";
     echo
     "<tr>
      <td width='80' align='center' class='header_laporan'>Tanggal</td>
    <td width='100' align='center' class='header_laporan'>Tempat</td>
      <td width='150' align='center' class='header_laporan'>Alamat</td>
    <td width='150' align='center' class='header_laporan'>Jenis</td>
    <td width='80' align='center' class='header_laporan'>Jumlah (Rp) </td>
    <td width='80' align='center' class='header_laporan'>Nama</td>
    <td width='80' align='center' class='header_laporan'>Posisi</td>
    <td width='200' align='center' class='header_laporan'>Nama Perusahaan</td>
      <td width='80' align='center' class='header_laporan'>Jenis Usaha</td>
      </tr>";	
	  $sql="select a.no_dn,a.kode_lokasi,a.tanggal,a.tahun_pajak,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.kode_pp,c.tempat,c.alamat as alamat_sju,
    c.jenis,c.jumlah,a.kategori,a.nama_pihak,date_format(c.tgl_beri,'%d/%m/%Y') as tgl_beri,a.no_flag,
   a.posisi,a.nama_usaha,a.jenis_usaha,a.keterangan
from sju_dne_m a
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
inner join sju_dne_d c on a.no_dn=c.no_dn and a.kode_lokasi=b.kode_lokasi
where a.tahun_pajak='$row->tahun_pajak' and a.kode_lokasi='$row->kode_lokasi' ";


      $rs1 = $dbLib->execute($sql);
      $j=1; $nilai=0; $pajak=0; $netto=0;
	  while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
			$nilai+=$row1->jumlah;
      echo "<tr>
        <td class='isi_laporan'>$j</td>
        <td class='isi_laporan'>$row1->tgl_beri</td>
        <td class='isi_laporan'>$row1->tempat</td>
        <td class='isi_laporan'>$row1->alamat_sju</td>
        <td class='isi_laporan'>$row1->jenis</td>
        <td class='isi_laporan' align='right'>".number_format($row1->jumlah,0,",",".")."</td>
        <td class='isi_laporan'>$row1->nama_pihak</td>
        <td class='isi_laporan'>$row1->posisi</td>
        <td class='isi_laporan'>$row1->nama_usaha</td>
        <td class='isi_laporan'>$row1->jenis_usaha</td>
        <td class='isi_laporan'>$row1->keterangan</td>
      </tr>";

      $j=$j+1;

		}
		 echo "<tr>
        <td class='header_laporan' colspan='5' align='right'>Total</td>
      
        <td class='header_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
      </tr>";
    echo "</table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr
  <tr>
    <td><table width='100%'  border='0' cellpadding='0' cellspacing='0'>

	   <tr align='left'>
        <td width='200'>Lampiran Surat Edaran Pajak</td>
      </tr>
      <tr align='left'>
       <td width='200'>Nomor : </td>
    </tr>
    <tr align='left'>
    <td width='200'>Tgl. :</td>
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
