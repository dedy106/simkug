<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_sppd_rptSurPerintah extends server_report_basic
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
    $sql="select a.no_dokumen,a.tempat,a.dasar, a.nik_user,a.no_perintah, a.kode_lokasi,a.tanggal, 
		a.keterangan, a.nik_buat, a.nik_app ,convert(varchar,a.tgl_mulai,103) as tgl_mulai,convert(varchar,a.tgl_selesai,103) as tgl_selesai,
		a.kode_kategori,b.nama as kat,c.nama as perintah,d.nama as buat,a.jum_hari,e.nama as kota,c.jabatan,a.asal,f.nama as asal1
		from sp_perintah_m a 
          inner join sp_kategori b on a.kode_kategori=b.kode_kategori and a.kode_lokasi=b.kode_lokasi
          inner join karyawan c on a.nik_app=c.nik and a.kode_lokasi=c.kode_lokasi
          inner join karyawan d on a.nik_buat=d.nik and a.kode_lokasi=d.kode_lokasi
          inner join sp_kota e on a.tempat=e.kode_kota and a.kode_lokasi=e.kode_lokasi
          inner join sp_kota f on a.asal=f.kode_kota and a.kode_lokasi=f.kode_lokasi
  $this->filter
  order by a.no_perintah ";

		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		$logo="image/tu.jpg";
		$nilai=0;$nilai_ppn=0;$tagihan=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai=$nilai+$row->nilai;
		echo "<table width='800' border='0' cellspacing='0' cellpadding='0' >
  <tr>
    <td align='center'><img src='$logo' width='200' height='72'></td>
  </tr>
  <tr>
  <td height='30' align='center' valign='middle' class='judul_bukti'>SURAT PERINTAH PERJALANAN DINAS (SPPD) </td>
</tr>
  <tr>
    <td align='center' class='isi_laporan'>NOMOR : $row->no_perintah</td>
  </tr>
  <tr>
    <td><hr /></td>
  </tr>

  
  <tr>
    <td colspan='2' style='padding:10px;'><table width='800' border='0' cellpadding='0' cellspacing='0' >
  <tr>
    <td><table width='100%'  border='0'>

      <tr>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
    </tr>
      <tr>
        <td>Maksud dan Tujuan</td>
        <td>: $row->keterangan</td>
      </tr>
	   <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td width='200'>Dasar Perjalanan Dinas</td>
        <td width='600'>: $row->dasar </td>
      </tr>
      <tr>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
    </tr>
      <tr>
        <td>Kategori</td>
        <td>: $row->kat</td>
      </tr>

    <tr>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
    <tr>
    <td>Tanggal Mulai</td>
    <td>: $row->tgl_mulai </td>
  </tr>
  <tr>
  <td>&nbsp;</td>
  <td>&nbsp;</td>
</tr>
<tr>
<td>Tanggal Selesai</td>
<td>: $row->tgl_selesai </td>
</tr>
      <tr>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
    </tr>
	
      <tr>
      <td>Lama Waktu Perjalanan Dinas</td>
      <td>: $row->jum_hari </td>
    </tr>
	
      <tr>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
    </tr> 
		  <tr>
        <td width='200'>Kota Asal</td>
        <td width='600' >: $row->asal1 </td>
      </tr>
	        <tr>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
    </tr>
	
			  <tr>
        <td width='200'>Kota Tujuan</td>
        <td width='600' >: $row->kota </td>
      </tr>
	        <tr>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
    </tr>

    </table></td>
  </tr>
  <tr>
    <td><hr /></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr
  <tr>
    <td><table width='100%'  border='0' cellpadding='0' cellspacing='0'>
      <tr align='center'>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td align='center'>Bandung, ".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))."</td>
      </tr>
	   <tr align='center'>
        <td width='200'>&nbsp;</td>
        <td width='400'>&nbsp;</td>
        <td width='200'>&nbsp;</td>
      </tr>
      <tr align='center'>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >$row->jabatan </td>
      </tr>
    
      <tr align='center' valign='bottom'>
        <td height='70' class='garis_bawah'>&nbsp;</td>
        <td>&nbsp;</td>
        <td class='garis_bawah'>$row->perintah </td>
      </tr>
      <tr align='center' valign='bottom'>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>NIP : $row->nik_app</td>
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
