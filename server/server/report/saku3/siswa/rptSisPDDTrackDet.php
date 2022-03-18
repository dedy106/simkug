<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_siswa_rptSisPDDTrackDet extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$bentuk=$tmp[2];
		$sql="select 1 ";
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);		
		}
		error_log($this->rows."/".$count."/".$totPage);
		return $totPage;
	}
	function getHtml()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$nik_user=$tmp[2];
		$dc = $tmp[3];

		$sql="select a.no_bukti,a.kode_lokasi,a.no_dokumen,a.periode,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,convert(varchar,a.tanggal,103) as tanggal,d.nama as nama_user,a.nik_user, isnull(total,0) as total  
		from trans_m a
        left join karyawan d on a.nik_user=d.nik and a.kode_lokasi=d.kode_lokasi
		left join ( select a.no_bukti,a.kode_lokasi,sum(a.nilai) as total 
					from aka_cd_d a
					where a.kode_akun='2141101' and a.dc='$dc'
					group by a.no_bukti,a.kode_lokasi 
			) c on a.no_bukti=c.no_bukti and a.kode_lokasi=c.kode_lokasi
        $this->filter
        ";
		$rs = $dbLib->execute($sql);
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>
		<style>
			.border-black{
				border:1px solid black;
			}
		</style>"; 
		echo $AddOnLib->judul_laporan("Detail Dokumen Vouching PDD",$this->lokasi,"");
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		
		while ($row = $rs->FetchNextObject($toupper=false))
		{ 
			echo "
			<table border='0' cellspacing='0' cellpadding='1' style='border-collapse:collapse'>
			<tr >
			 	<td height='23' colspan='9' style='padding:5px'>
				 	<table  border='0' cellspacing='2' cellpadding='1'>
					<tr>
						<td class='header_laporan' width='100'>No Bukti</td>
						<td class='header_laporan' >:&nbsp;$row->no_bukti</td>
					</tr>
					<tr>
						<td class='header_laporan'>No Dokumen </td>
						<td class='header_laporan'>:&nbsp;$row->no_dokumen</td>
					</tr>
					<tr>
						<td class='header_laporan'>Tanggal </td>
						<td class='header_laporan'>:&nbsp;$row->tanggal</td>
					</tr>
					<tr>
						<td class='header_laporan'>Periode </td>
						<td class='header_laporan'>:&nbsp;$row->periode</td>
					</tr>
					<tr>
						<td class='header_laporan'>Keterangan </td>
						<td class='header_laporan'>:&nbsp;$row->keterangan</td>
					</tr>
					<tr>
						<td class='header_laporan'>Total </td>
						<td class='header_laporan'>:&nbsp;".number_format($row->total,0,",",".")."</td>
					</tr>
					</table>
				</td>
			</tr>
			<tr bgcolor='#CCCCCC'>
				<td width='100' class='header_laporan border-black' align='center'>NIM</td>
				<td width='320' class='header_laporan border-black' align='center'>Nama</td>
				<td width='90' class='header_laporan border-black' align='center'>Nilai</td>
			</tr>";
		 
			$sql="select b.nim,c.nama,b.nilai from trans_m a
			inner join aka_cd_d b on a.no_bukti=b.no_bukti and a.kode_lokasi=b.kode_lokasi and b.kode_akun='2141101'
			inner join aka_mahasiswa c on b.nim=c.nim and b.kode_lokasi=c.kode_lokasi
			where a.kode_lokasi='$row->kode_lokasi' and a.no_bukti='$row->no_bukti' and b.dc='$dc'
			";
			$rs1 = $dbLib->execute($sql);
			$nilai=0;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$nilai+=$row1->nilai;	
				echo "<tr>
				<td valign='top' class='isi_laporan border-black'>".$row1->nim."</td>
			 	<td valign='top' class='isi_laporan border-black'>".$row1->nama."</td>
				<td valign='top' class='isi_laporan border-black' align='right'>".number_format($row1->nilai,0,',','.')."</td>
		   		</tr>";			 
			}
			echo "<tr>
			<td colspan='2' valign='top' class='header_laporan border-black' align='right'>Total&nbsp;</td>
			<td valign='top' class='header_laporan border-black' align='right'>".number_format($nilai,0,',','.')."</td>
		  </tr>
		  <tr >
			 	<td height='23' colspan='9' style='padding:5px'>
				 	<table  border='0' cellspacing='2' cellpadding='1'>
					<tr>
						<td class='header_laporan' width='65%'></td>
						<td class='header_laporan' width='35%' align='center'>&nbsp;Dibuat Oleh,</td>
					</tr>
					<tr>
						<td class='header_laporan' width='65%'></td>
						<td class='header_laporan' width='35%' height='60'>&nbsp;</td>
					</tr>
					<tr>
						<td class='header_laporan' width='65%'></td>
						<td class='header_laporan' width='35%' align='center'>&nbsp;$row->nama_user</td>
					</tr>
					<tr>
						<td class='header_laporan' width='65%'></td>
						<td class='header_laporan' width='35%' align='center'>&nbsp;NIP. $row->nik_user</td>
					</tr>
					</table>
				</td>
		   </tr>
		  </table>
		  <br>
		  <DIV style='page-break-after:always'></DIV>";
			$i=$i+1;
		}
		echo "</div>";
		return "";
	}
	
}
?>