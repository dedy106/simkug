<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_sju16_rptAjuBayar extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		
		$sql = "select 1 ";
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
		$nama_user=$tmp[0];
		$sql = "select a.no_pb ,convert(varchar(20),a.tanggal,103) as tgl,
    a.nik_buat,a.kode_pp,b.nama as buat,c.nama as pp,a.kode_lokasi,a.no_app1,a.no_app2,a.no_app3,a.no_app4,
    e.nama as app1, f.nama as app2, g.nama as app3, h.nama as app4
from sju_pb_m a
inner join karyawan b on a.nik_buat=b.nik
inner join pp c on a.kode_pp=c.kode_pp
inner join karyawan e on a.no_app1=e.nik
left join karyawan f on a.no_app2=f.nik
left join karyawan g on a.no_app3=g.nik
left join karyawan h on a.no_app4=g.nik
$this->filter order by a.no_pb ";

echo $sql;
		
		$rs = $dbLib->execute($sql);	
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		$path = $_SERVER["SCRIPT_NAME"];				
		$path = substr($path,0,strpos($path,"server/serverApp.php"));		
		$pathfoto = $path . "image/gratika.jpg";
		echo "<div align='center'>"; 
		while ($row = $rs->FetchNextObject($toupper=false))
		{
	
				echo	"<table width='800' border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td align='center' class='judul_bukti'>PENGAJUAN PEMBAYARAN</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='29' align='center'>Tanggal Pengajuan</td>
        <td width='606'>: $row->tgl </td>
      </tr>
      <tr>
        <td align='center'>Nomor Pengajuan</td>
        <td>: $row->no_pb </td>
      </tr>
      <tr>
        <td align='center'>Nama (Yang Mengajukan)</td>
        <td>: $row->buat </td>
      </tr>
      <tr>
        <td>Unit/Divisi</td>
        <td>: $row->pp </td>
      </tr>
	  <tr>
        <td>Bersama ini kami ajukan permohonan pembayaran sesuai dengan rincian sebagai berikut :</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td><table width='800' border='1' cellspacing='0' cellpadding='0' class='kotak'>
      <tr>
        <td width='30' align='center' class='header_laporan'>No</td>
        <td width='120' align='center' class='header_laporan'>Jenis Beban </td>
        <td width='310' align='center' class='header_laporan'>Deskripsi </td>
        <td width='80' align='center' class='header_laporan'>Kode PP</td>
        <td width='80' align='center' class='header_laporan'>Curr</td>
	    	<td width='80' align='center' class='header_laporan'>Nilai</td>
      </tr>";
	$sql="select a.no_urut,a.no_pb,a.kode_akun,b.nama as nama_akun,a.keterangan,a.kode_pp,c.nama as pp,a.kode_curr,d.nama as curr,a.nilai
from sju_pb_j a
inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
inner join pp c on a.kode_pp=c.kode_pp
inner join curr d on a.kode_curr=d.kode_curr
where a.no_pb='$row->no_pb' and a.kode_lokasi='$row->kode_lokasi' 
order by a.no_urut ";
	
    $rs1 = $dbLib->execute($sql);
	$i=1; $nilai=0;  $saldo=0; $sisa=0;
	while ($row1 = $rs1->FetchNextObject($toupper=false))
	{
		$nilai+=$row1->nilai;
		$saldo+=$row1->saldo;
		$sisa+=$row1->sisa;
      echo "<tr>
        <td class='isi_laporan' align='center'>$i</td>
        <td class='isi_laporan'>$row1->kode_akun</td>
        <td class='isi_laporan'>$row1->nama_akun</td>
        <td class='isi_laporan'>$row1->keterangan</td>
        <td class='isi_laporan'>$row1->pp</td>
        <td class='isi_laporan'>$row1->curr</td>
        <td class='isi_laporan' align='right'>".number_format($row1->nilai,0,",",".")."</td>
      </tr>";
    }
	echo "</table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>

  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>Jakarta, ".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))."</td>
  </tr>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td>Yang Mengajukan</td>
        <td>Approval 1</td>
        <td>Approval 2</td>
        <td>Approval 3</td>
        <td>Fiat Bayar</td>
      </tr>
      <tr>
        <td height='60'>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
      <td>$row->app1</td>
      <td>$row->app2</td>
      <td>$row->app3</td>
      <td>$row->app4</td>
  </tr>
      <tr>
      <td>$row->no_app1</td>
      <td>$row->no_app2</td>
      <td>$row->no_app3</td>
      <td>$row->no_app4</td>
  </tr>
    </table></td>
  </tr>
</table>
<br>
			<DIV style='page-break-after:always'></DIV>";
			}
		
		}
		echo "</div>";
		return "";
	}
}
?>