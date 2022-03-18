<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_sju16_rptAjuProm extends server_report_basic
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
   a.keterangan,h.logo,h.alamat,a.nama_aju,a.nama_jabat,c.jabatan as jab_aju, d.jabatan as jab_jabat,e.nama as nama_tahu, f.nama as nama_bdh, e.jabatan as jab_tahu, f.jabatan as jab_bdh
from sju_dnp_m a
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
left join lokasi h on a.kode_lokasi=h.kode_lokasi
left join karyawan c on a.nik_aju=c.nik and a.kode_lokasi=c.kode_lokasi
left join karyawan d on a.nik_jabat=d.nik and a.kode_lokasi=d.kode_lokasi
left join karyawan e on a.nik_tahu=e.nik and a.kode_lokasi=e.kode_lokasi
left join karyawan f on a.nik_bdh=f.nik and a.kode_lokasi=f.kode_lokasi
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
    <td><table width='750' border='0' cellspacing='0' cellpadding='0' >
    <tr>
      <td width='200'><img src=$logo width='120' height='105' align='right' /></td>";
      echo $AddOnLib->judul_laporan("pengajuan biaya promosi ",$this->lokasi," ");

    echo "</tr>
    </table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>";
  // echo"
  // <tr>
  //   <td height='30' align='center' valign='middle' class='judul_bukti'>PENGAJUAN BIAYA PROMOSI</td>
  // </tr>";
  
  echo"  
  <tr>
  <td height='10'>&nbsp;</td>
  </tr>
  <tr>
    <td colspan='2' style='padding:10px;'><table width='800' border='0' cellpadding='0' cellspacing='0' >
  <tr>
    <td><table width='100%'  border='0' style='border:1px solid black'>
	  <tr>
        <td width='200'>No DN</td>
        <td width='600' class='judul_bukti'>: $row->no_dn </td>
      </tr>
      <tr>
        <td>Tanggal DN</td>
        <td>: $row->tgl </td>
      </tr>
    <tr>
      <td width='200'>Tahun Pajak</td>
      <td width='600'>: $row->tahun_pajak </td>
    </tr>

      <tr>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      </tr>
      <tr>
        <td><b>Data Penerima</b></td>
      </tr>
      <tr>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      </tr>
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
<td width='200'>Tanggal</td>
<td width='600'>: $row->tgl_terima </td>
</tr>
<tr>
<td width='200'>Bentuk dan Jenis biaya</td>
<td width='600'>: $row->jenis </td>
</tr>
<tr>
<td width='200'>Jumlah (Rp)</td>
<td>: ".number_format($row->jumlah,0,",",".")."</td>
</tr>
<tr>
<td width='200'>Keterangan</td>
<td width='600'>: $row->keterangan </td>
</tr>
<tr>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
</tr>
<tr>
<td><b>Pemotongan PPH</b></td>
</tr>
<tr>
<td>&nbsp;</td>
<td>&nbsp;</td>
</tr>
<tr>
<td width='200'>Jumlah PPh</td>
<td>: ".number_format($row->pph,0,",",".")."</td>
</tr>
<tr>
<td width='200'>Nomor Bukti Potong</td>
<td width='600'>: $row->no_pot </td>
</tr>

      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
     
    </table></td>
  </tr>
 
  <tr>
    <td><table width='100%'  border='0' cellpadding='0' cellspacing='0'>
    <tr>
    <td>&nbsp;</td>
  </tr>
	   <tr align='center'>
        <td width='300'><b>Yang  Mengajukan </b> </td>
        <td width='200'><b>Mengetahui </b></td>
        <td width='300'><b>Otorisasi Oleh </b></td>
      </tr>
      <tr align='center'>
        <td width='300' height='80'>&nbsp;</td>
        <td width='200' height='80'>&nbsp;</td>
        <td width='300' height='80'>&nbsp;</td>
      </tr> 
	    <tr align='center'>
        <td width='300'><b>$row->nama_aju </b> </td>
        <td width='200'><b>$row->nama_tahu</b></td>
        <td width='300'><b>$row->nama_jabat</b></td>
      </tr>
      <tr align='center'>
        <td width='300' ><b>$row->jab_aju</b></td>
        <td width='200' ><b>$row->jab_tahu</b></td>
        <td width='300' ><b>$row->jab_jabat</b></td>
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
