<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_sju16_rptAjuSpd extends server_report_basic
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
    $sql="select a.no_perdin,a.kode_lokasi,h.alamat,a.tujuan,convert(varchar,a.tanggal, 105) as tgl,convert(varchar,a.tgl_mulai, 105) as mulai,convert(varchar,a.tgl_selesai, 105) as selesai,
    a.transport,a.agenda,a.nik_user,b.jabatan,b.nama as krywn
from sju_perdin_m a
left join karyawan b on a.kode_lokasi=b.kode_lokasi and a.nik_user=b.nik
left join lokasi h on a.kode_lokasi=h.kode_lokasi
$this->filter order by a.no_perdin";
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		
		
		$nilai=0;$nilai_ppn=0;$tagihan=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$logo="image/sju.jpg";
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
    <td height='30' align='center' valign='middle' class='judul_bukti'>SURAT PERJALANAN DINAS</td>
  </tr>
  
  <tr>
    <td colspan='2' style='padding:10px;'><table width='800' border='0' cellpadding='0' cellspacing='0' >
  <tr>
    <td><table width='100%'  border='0'>
	  <tr>
        <td width='200'>No.</td>
        <td width='600' class='judul_bukti'>$row->no_perdin </td>
      </tr>
      <tr>
        <td>Nama</td>
        <td>: $row->krywn </td>
      </tr>
	    <tr>
        <td width='200'>Jabatan</td>
        <td width='600'>: $row->jabatan </td>
      </tr>
      <tr>
        <td>Tujuan</td>
        <td>: $row->tujuan </td>
      </tr>
      <tr>
        <td>Berangkat</td>
        <td>: $row->mulai </td>
      </tr>
     
      <tr>
        <td>Kembali</td>
        <td>: $row->selesai </td>
      </tr>
      <tr>
      <td>Transportasi</td>
      <td>: $row->transport </td>
    </tr>
      <tr>
        <td>Referensi</td>
        <td>: Pengajuan Perjalanan Dinas Terlampir </td>
      </tr>
     
    </table></td>
  </tr>
   
  <tr>
    <td>&nbsp;</td>
  </tr
  <tr>
    <td><table width='100%'  border='0' cellpadding='0' cellspacing='0'>
      <tr align='center'>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td align='left'>Ditetapkan di : Jakarta</td>
      </tr>
      <tr align='center'>
      <td width='200'>&nbsp;</td>
      <td width='200'>&nbsp;</td>
      <td width='200'>&nbsp;</td>
      <td width='200'>&nbsp;</td>
       </tr>
	   <tr align='center'>
     <td width='200'>&nbsp;</td>
     <td width='200'>&nbsp;</td>
     <td width='200'>&nbsp;</td>
     <td width='200' align='left'>Pada Tanggal : $row->tgl</td>
      </tr>
      <tr align='center'>
      <td width='200'>&nbsp;</td>
      <td width='200'>&nbsp;</td>
      <td width='200'>&nbsp;</td>
      <td width='200'>&nbsp;</td>
       </tr>
      <tr align='center'>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td align='left'><b>PT. Sarana Janesia Utama</b></td>
      </tr>
      <tr align='center'>
      <td width='200'>&nbsp;</td>
      <td width='200'>&nbsp;</td>
      <td width='200'>&nbsp;</td>
      <td width='200'>&nbsp;</td>
       </tr>
       <tr align='center'>
      <td width='200'>&nbsp;</td>
      <td width='200'>&nbsp;</td>
      <td width='200'>&nbsp;</td>
      <td width='200'>&nbsp;</td>
       </tr>
      <tr align='center' valign='bottom'>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td align='left' class='garis_bawah'>$row->krywn </td>
      </tr>
      <tr align='center'>
      <td width='200'>&nbsp;</td>
      <td width='200'>&nbsp;</td>
      <td width='200'>&nbsp;</td>
      <td width='200'>&nbsp;</td>
       </tr>
       <tr align='center'>
      <td width='200'>&nbsp;</td>
      <td width='200'>&nbsp;</td>
      <td width='200'>&nbsp;</td>
      <td width='200'>&nbsp;</td>
       </tr>
      <tr align='center' valign='bottom'>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td align='left'>$row->jabatan</td>
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
