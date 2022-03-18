<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_sju16_rptBayarAju3 extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		
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
		$sql = "select a.no_dokumen,a.no_pb ,convert(varchar(20),a.tanggal,103) as tgl, a.nik_buat,a.kode_pp,b.nama as buat,
		c.nama as pp,a.kode_lokasi,a.nik_app1,a.nik_app2,a.nik_app3,a.nik_app4, e.nama as app1, f.nama as app2,
		 g.nama as app3, h.nama as app4,a.nilai,i.aju,case when i.aju<>k.edit then j.nama else '-' end as editt,a.nik_atasan,m.nama as atasan,
		 b.jabatan as jab1,e.jabatan as jab2,f.jabatan as jab3,g.jabatan as jab4,h.jabatan as jab5,m.jabatan as jab6
		from sju_pb_m a
		left join karyawan b on a.nik_buat=b.nik
		 inner join pp c on a.kode_pp=c.kode_pp 
		left join karyawan e on a.nik_app1=e.nik 
		left join karyawan f on a.nik_app2=f.nik 
		left join karyawan g on a.nik_app3=g.nik 
		left join karyawan h on a.nik_app4=h.nik 
		left JOIN( SELECT max(nik_user) as aju,no_pb 
		FROM sju_pb_user GROUP BY no_pb ) i ON a.no_pb=i.no_pb 
		left JOIN( SELECT top 1 nik_user as edit,no_pb 
		FROM sju_pb_user
		 ORDER BY tgl_input desc) k ON i.no_pb=k.no_pb 
		left join karyawan j on k.edit=j.nik 
		left join karyawan m on a.nik_atasan=m.nik


		$this->filter order by a.no_pb ";
		// echo $sql;
	
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$rs = $dbLib->execute($sql);	
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		
		echo "<div align='center'>"; 
		$path = $_SERVER["SCRIPT_NAME"];				
		$path = substr($path,0,strpos($path,"server/serverApp.php"));		
		$logo = $path . "image/sju.jpg";

		
		

		while ($row = $rs->FetchNextObject($toupper=false))
		{

			echo"<table width='750' border='0' cellspacing='0' cellpadding='0' class='kotak'>
			<tr>
			  <td>
			  <table width='750' border='0' cellspacing='0' cellpadding='0' >
				<tr>
				  <td width='200'><img src=$logo width='120' height='105' align='right' /></td>";
				  echo $AddOnLib->judul_laporan("pengajuan pembayaran",$this->lokasi," ");

				echo "</tr>
			  </table>
			  </td>
			</tr>
			</table>
			
			
			
			<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
 
  <tr >
    <td height='23' colspan='7' class='header_laporan'><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='99' class='header_laporan'>Tanggal Pengajuan</td>
        <td width='360' class='header_laporan'>: $row->tgl</td>
      </tr>
	  <tr>
        <td width='99' class='header_laporan'>Nomor Bukti</td>
        <td width='360' class='header_laporan'>: $row->no_pb</td>
	  </tr>
	  <tr>
        <td width='99' class='header_laporan'>Nomor Dokumen</td>
        <td width='360' class='header_laporan'>: $row->no_dokumen</td>
      </tr>
      <tr>
        <td class='header_laporan'>Nama (Yang Mengajukan) </td>
        <td class='header_laporan'>: $row->buat</td>
      </tr>
	  <tr>
        <td class='header_laporan'>Unit/Divisi </td>
        <td class='header_laporan'>: $row->pp</td>
			</tr>
			<tr>
			<td colspan='9'>Bersama ini kami ajukan permohonan pembayaran sesuai dengan rincian sebagai berikut :</td>
			</tr>
			<br>
    </table></td>
  </tr>
 

	
  <tr bgcolor='#CCCCCC'>
	<td width='30' align='center' class='header_laporan'>No</td>
	<td width='120' align='center' class='header_laporan'>Jenis Beban </td>
	<td width='310' align='center' class='header_laporan'>Deskripsi </td>
	<td width='80' align='center' class='header_laporan'>Kode PP</td>
	<td width='80' align='center' class='header_laporan'>Curr</td>
	<td width='80' align='center' class='header_laporan'>Nilai</td>
</tr>
";
			
$sql="select a.no_urut,a.no_pb,a.kode_akun,b.nama as nama_akun,a.keterangan,a.kode_pp,c.nama as pp,a.kode_curr,d.nama as curr,
case when a.dc='D' then a.nilai else -nilai end as nilai
from sju_pb_j a
inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
inner join pp c on a.kode_pp=c.kode_pp
inner join curr d on a.kode_curr=d.kode_curr
where a.no_pb='$row->no_pb' and a.kode_lokasi='$row->kode_lokasi' 
order by a.no_urut ";
			
			$rs1 = $dbLib->execute($sql);
			$i=1; $nilai1=0;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$nilai1+=$row1->nilai;
				
				echo "<tr>
        <td class='isi_laporan' align='center'>$i</td>
        <td class='isi_laporan'>$row1->kode_akun - $row1->nama_akun</td>
        <td class='isi_laporan'>$row1->keterangan</td>
        <td class='isi_laporan'>$row1->pp</td>
        <td class='isi_laporan'>$row1->kode_curr</td>
        <td class='isi_laporan' align='right'>".number_format($row1->nilai,0,",",".")."</td>
			  </tr>";
			  $i=$i+1;

			}
			echo "<tr>
   <td height='23' colspan='5' valign='top' class='isi_laporan' align='right'>Total&nbsp;</td>
   <td valign='top' class='isi_laporan' align='right'>".number_format($nilai1,0,',','.')."</td>
 </tr>
 </table>
<table>
<tr>
 <td width='800' align='left'><i>Jurnal telah di-review oleh : $row->editt</td></i>
 </tr>
 </table>
<br>";

 echo "<tr>
    <td>";
	if ($row->nilai<=5000000)
	{
	echo "<table width='800' border='0' cellspacing='2' cellpadding='1' class='kotak'>
	<tr>
	<td align='center'><b>Yang Mengajukan</td></b>
	<td align='center'><b>Mengetahui</td></b>
</tr>
<tr>
<td height='60'>&nbsp;</td>
<td>&nbsp;</td>
</tr>
<tr>
<td align='center'><b>$row->buat</td></b>
<td align='center'><b>$row->atasan</td></b>
</td>
</tr>

<tr>
<td align='center'><b>$row->jab1</td></b>
<td align='center'><b>$row->jab6</td></b>
</tr>

<tr>
<td height='20'>&nbsp;</td>
<td>&nbsp;</td>
</tr>


		</table>";
	}
	if ($row->nilai>5000000 && $row->nilai<=100000000)
	{
	echo "<table width='800' border='0' cellspacing='2' cellpadding='1' class='kotak'>
      <tr>
        <td align='center'><b>Yang Mengajukan</td></b>
        <td align='center'><b>Mengetahui</td></b>
			</tr>
			<tr>
			<td height='60'>&nbsp;</td>
			<td>&nbsp;</td>
		</tr>
		<tr>
		<td align='center'><b>$row->buat</td></b>
		<td align='center'><b>$row->atasan</td></b>
		</td>
</tr>

		<tr>
		<td align='center'><b>$row->jab1</td></b>
		<td align='center'><b>$row->jab6</td></b>
</tr>
	
			<tr>
	<td height='20'>&nbsp;</td>
	<td>&nbsp;</td>
</tr>

			<tr>
      <td align='center'><b>$row->jab2</td></b>
      <td align='center'><b>$row->jab3</td></b>
      <td align='center'><b>$row->jab5</td></b>
  </tr>

	<tr>
	<td height='20'>&nbsp;</td>
	<td>&nbsp;</td>
</tr>

		</table>";
	}
	if ($row->nilai>100000000)
	{
	echo "<table width='800' border='0' cellspacing='2' cellpadding='1' class='kotak'>
	<tr>
	<td align='center'><b>Yang Mengajukan</td></b>
	<td align='center'><b>Mengetahui</td></b>
</tr>
<tr>
<td height='60'>&nbsp;</td>
<td>&nbsp;</td>
</tr>
<tr>
<td align='center'><b>$row->buat</td></b>
<td align='center'><b>$row->atasan</td></b>
</td>
</tr>

<tr>
<td align='center'><b>$row->jab1</td></b>
<td align='center'><b>$row->jab6</td></b>
</tr>

<tr>
<td height='20'>&nbsp;</td>
<td>&nbsp;</td>
</tr>

<tr>
<td align='center'><b>Otorisasi Oleh</td></b>
<td align='center'><b>Otorisasi Oleh</td></b>
<td align='center'><b>Otorisasi Oleh</td></b>
<td align='center'><b>Fiat Bayar</td></b>
</tr>

<tr>
	<td height='60'>&nbsp;</td>
	<td>&nbsp;</td>
</tr>
<tr>
<td align='center'><b>$row->app1</td></b>
<td align='center'><b>$row->app2</td></b>
<td align='center'><b>$row->app3</td></b>
<td align='center'><b>$row->app4</td></b>
</td>
</tr>

<tr>
<td align='center'><b>$row->jab2</td></b>
<td align='center'><b>$row->jab3</td></b>
<td align='center'><b>$row->jab4</td></b>
<td align='center'><b>$row->jab5</td></b>
</tr>

		</table>

		<br>";
	}

	
	
	echo "<br> </table>
		 ";
 
 
			
			$i=$i+1;
		}
		

		return "";
	}
	
}
?>
