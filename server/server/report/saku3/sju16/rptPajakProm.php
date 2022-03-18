<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_sju16_rptPajakProm extends server_report_basic
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
		$sql="select a.no_dn,a.kode_lokasi,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.tahun_pajak,a.tanggal,a.kode_pp,a.alamat as alamat_sju,
    a.jenis,a.jumlah,a.kategori,date_format(a.tgl_terima,'%d/%m/%Y') as tgl_terima,a.nama,a.npwp,a.alamat,a.pph,a.no_pot,
   a.keterangan,h.logo,h.alamat,a.nama_aju,a.nama_jabat
from sju_dnp_m a
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
    <td align='center'><img src='$logo' width='200' height='72'></td>
  </tr>
  <tr>
    <td align='center' class='isi_laporan'>$alamat</td>
  </tr>
  <tr>
    <td><hr /></td>
  </tr>
  <tr>
    <td height='30' align='center' valign='middle' class='judul_bukti'>LAPORAN UNTUK PAJAK</td>
  </tr>
  
  <tr>
    <td colspan='2' style='padding:10px;'><table width='800' border='0' cellpadding='0' cellspacing='0' >
  <tr>
    <td><table width='100%'  border='0'>
    <tr>
    <td width='200'>Nama</td>
    <td width='600'>: $row->nama </td>
  </tr>
  <tr>
  <td width='200'>NPWP</td>
  <td width='600'>: $row->npwp </td>
</tr>
<tr>
<td width='200'>Alamat</td>
<td width='600'>: $row->alamat_sju </td>
</tr>
<tr>
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
where a.tahun_pajak='$row->tahun_pajak' and a.kode_lokasi='$row->kode_lokasi' and a.nama='$row->nama' ";


      $rs1 = $dbLib->execute($sql);
      $j=1; $nilai=0; $pajak=0; $netto=0;
	  while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
			$nilai+=$row1->jumlah;
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
