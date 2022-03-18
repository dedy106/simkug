<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kb_rptIfAppJurnal extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$periode=$tmp[0];
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
		$periode=$tmp[0];
		
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		$sql="select a.no_app,a.kode_lokasi
from yk_ifapp_m a  $this->filter 
order by a.no_app ";
	
		$rs1 = $dbLib->execute($sql);		
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
			$periode2="<br>NOMOR : ".strtoupper($row1->no_app);
			echo $AddOnLib->judul_laporan("RINCIAN PERTANGGUNGAN IMPREST FUND".$periode2,$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
			echo "<table border='1' cellspacing='0' cellpadding='2' class='kotak'>
	  <tr bgcolor='#CCCCCC'>
		<td width='25'  class='header_laporan'><div align='center'>No</div></td>
		<td width='50' class='header_laporan'><div align='center'>Tanggal</div></td>
		<td width='80' class='header_laporan'><div align='center'>No Bukti</div></td>
		<td width='70' height='25' class='header_laporan'><div align='center'>No Akun</div></td>
		<td width='200' class='header_laporan'><div align='center'>Nama Akun </div></td>
		<td width='40' class='header_laporan'><div align='center'>PP</div></td>
		<td width='50' class='header_laporan'><div align='center'>DRK</div></td>
		<td width='200' class='header_laporan'><div align='center'>Keterangan</div></td>
		<td width='80' class='header_laporan'><div align='center'>Nilai</div></td>
	  </tr>";
			$sql="select a.no_ifptg as no_bukti,a.no_dokumen,date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.kode_akun,b.nama,a.kode_pp,a.kode_drk,a.keterangan,a.nilai 
	from yk_ifptg_j a  
	inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
	inner join yk_ifptg_m c on a.no_ifptg=c.no_ifptg and a.kode_lokasi=c.kode_lokasi
	where c.no_app='$row1->no_app' and a.kode_lokasi='$row1->kode_lokasi'
	order by a.periode,a.no_ifptg,a.dc desc ";
		
			$rs = $dbLib->execute($sql);		
			$nilai=0;$tmp="";
			$first = true;
			while ($row = $rs->FetchNextObject($toupper=false))
			{
				$nilai=$nilai+$row->nilai;
				$nnilai=number_format($nilai,0,',','.');
				echo "<tr>
		<td valign='middle' class='isi_laporan'><div align='center'>$i</div></td>
		  <td height='20' valign='middle' class='isi_laporan'>$row->tanggal</td>
	  <td valign='middle' class='isi_laporan'>$row->no_bukti</td>
		<td valign='middle' class='isi_laporan'>$row->kode_akun</td>
		<td valign='middle' class='isi_laporan'>".ucwords(strtolower($row->nama))."</td>
		<td valign='middle' class='isi_laporan' align='center'>$row->kode_pp</td>
		<td valign='middle' class='isi_laporan'>$row->kode_drk</td>
		  <td valign='middle' class='isi_laporan'>".ucwords(strtolower($row->keterangan))."</td>
		<td valign='middle' class='isi_laporan'><div align='right' >".number_format($row->nilai,0,',','.')."</div></td>
	   </tr>";
				$first = true;
				$i=$i+1;
			}
			$nilai=$nilai+$row->nilai;
			$nnilai=number_format($nilai,0,',','.');
			echo "<tr>
		<td height='25' colspan='8' align='right'  class='header_laporan'>Total</td>
		<td class='header_laporan' class='header_laporan' align='right'>$nnilai</td>
	   </tr>";
			echo "</table>";
		}
		echo "</div>";
		return "";
		
	}
	
}
?>
