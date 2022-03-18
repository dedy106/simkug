<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_sju16_rptVerifikasiPB extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
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
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$jenis=$tmp[2];
		$periode2=$tmp[3];
		$dokumen=$tmp[5];
		$sql="select a.no_dokumen,a.tanggal,a.nik_user,b.keterangan,b.due_date,b.no_dokumen as catatan
		from sju_ver_m a 
		inner join sju_pb_m b on a.no_ver=b.no_ver and a.kode_lokasi=b.kode_lokasi
		$this->filter";
		
		$rs = $dbLib->execute($sql);		
		$i = $start+1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$getTanggal = explode(" ",$row->tanggal);
			$tanggal_explode = explode("-",$getTanggal[0]);
			$tanggal = $tanggal_explode[2]."/".$tanggal_explode[1]."/".$tanggal_explode[0];
			echo"<table width='800' border='0' cellspacing='0' cellpadding='0'>";
			echo"<tr>
    			<td height='30' align='center' valign='middle' class='judul_bukti'>LAPORAN VERIFIKASI</td>
				</tr>";
			echo"<tr>
    			<td colspan='2' style='padding:10px;'><table width='800' border='0' cellpadding='0' cellspacing='0' >
				<tr>";
			echo"<td>
				<table width='800' border='0' cellspacing='2' cellpadding='1'>";
			echo"<tr>
				<td width='200'>NO PB</td>
				<td width='600'>: $row->no_dokumen </td>
			</tr>";
			echo"<tr>
				<td width='200'>Tanggal PB</td>
				<td width='600'>: $tanggal </td>
			</tr>";
			echo"<tr>
				<td width='200'>Due Date</td>
				<td width='600'>: $row->due_date </td>
			</tr>";
			echo"<tr>
				<td width='200'>Pesan</td>
				<td width='600'>: $row->catatan </td>
			</tr>";
			echo"<tr>
				<td width='200'>Deskripsi</td>
				<td width='600'>: $row->keterangan </td>
			</tr>";
			echo"<tr>
				<td>&nbsp;</td>
				<td>&nbsp;</td>
			</tr>";
			echo"<tr>
    			<td colspan='2'>Jakarta, </td>
			</tr>";
			echo"<tr>
				<td>Diverifikasi Oleh : </td>
				<td>&nbsp;</td>
			</tr>
			<tr>
				<td>&nbsp;</td>
				<td>&nbsp;</td>
			</tr>";
			echo"";  
			echo"</table>
			</td>";
			echo "</table>";
		}
		echo "</div>";
		return "";
	}
	
}
?>
