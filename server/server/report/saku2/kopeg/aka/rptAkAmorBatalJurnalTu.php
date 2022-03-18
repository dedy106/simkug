<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_aka_rptAkAmorBatalJurnalTu extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select count(a.no_amor) as jum
from aka_amor_m a $this->filter ";
		
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
		$sql="select a.no_amor,a.no_dokumen,a.kode_lokasi,a.periode,a.tanggal,date_format(a.tanggal,'%d/%m/%Y') as tanggal1,a.keterangan,a.kode_lokasi
from aka_amor_m a $this->filter ";
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		$i = $start+1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table border='0' cellspacing='2' cellpadding='1'>
			  <tr>
				<td align='center' class='header_laporan'>JURNAL PEMBATALAN AMORTISASI</td>
			  </tr>
			  <tr>
				<td><table border='0' cellspacing='2' cellpadding='1'>
				 
				  <tr>
					<td width='100' class='header_laporan'>No Bukti </td>
					<td width='496' class='header_laporan'>:&nbsp;$row->no_amor</td>
					</tr>
				  <tr>
					<td width='100' class='header_laporan'>No Dokumen </td>
					<td width='496' class='header_laporan'>:&nbsp;$row->no_dokumen</td>
					</tr>
				  <tr>
					<td class='header_laporan'>Periode</td>
					<td class='header_laporan'>:&nbsp;$row->periode</td>
					</tr>
				  <tr>
					<td class='header_laporan'>Tanggal</td>
					<td class='header_laporan'>:&nbsp;$row->tanggal1</td>
					</tr>
				 
				<tr>
					<td class='header_laporan'>Keterangan </td>
					<td class='header_laporan'>:&nbsp;$row->keterangan</td>
				  </tr>
				</table></td>
			  </tr>
			  <tr>
				<td><table border='1' cellspacing='0' cellpadding='0' class='kotak'>
				<tr bgcolor='#CCCCCC'>
				<td width='30' class='header_laporan'><div align='center'>No</div></td>
				<td width='60' class='header_laporan'><div align='center'>Akun</div></td>
				<td width='200' class='header_laporan'><div align='center'>Nama Akun </div></td>
				<td width='200' class='header_laporan'><div align='center'>Keterangan </div></td>
				<td width='40' class='header_laporan'><div align='center'>PP </div></td>
				<td width='60' class='header_laporan'><div align='center'>DRK </div></td>
				<td width='90' class='header_laporan'><div align='center'>Debet</div></td>
				<td width='90' class='header_laporan'><div align='center'>Kredit</div></td>
			  </tr>";
	  $sql1="select a.kode_akun,b.nama,a.keterangan,a.kode_pp,a.kode_drk,case dc when 'D' then nilai else 0 end as debet,case dc when 'C' then nilai else 0 end as kredit  
			from aka_amor_j a
			inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
			where a.no_amor='$row->no_amor' and a.kode_lokasi='$row->kode_lokasi'
			order by a.dc desc";
		//error_log($sql1);
		$rs1 = $dbLib->execute($sql1);
		$i=1;
		$tot_debet=0;
		$tot_kredit=0;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
			$debet=number_format($row1->debet,0,',','.');
			$kredit=number_format($row1->kredit,0,',','.');
			$tot_debet=$tot_debet+$row1->debet;
			$tot_kredit=$tot_kredit+$row1->kredit;
			echo "<tr>
				<td class='isi_laporan' align='center'>$i</td>
				<td class='isi_laporan'>$row1->kode_akun</td>
				<td class='isi_laporan'>$row1->nama</td>
				<td class='isi_laporan'>$row1->keterangan</td>
				<td class='isi_laporan' align='center'>$row1->kode_pp</td>
				<td class='isi_laporan'>$row1->kode_drk</td>
				<td class='isi_laporan' align='right'>$debet</td>
				<td class='isi_laporan' align='right'>$kredit</td>
			  </tr>";
				$i=$i+1;
		}
		$tot_debet1=number_format($tot_debet,0,',','.');
		$tot_kredit1=number_format($tot_debet,0,',','.');
	  echo "<tr>
   
    <td colspan='6' class='header_laporan' align='right'>Total</td>
    <td class='isi_laporan' align='right'>$tot_debet1</td>
    <td class='isi_laporan' align='right'>$tot_kredit1</td>
  </tr>
	</table></td>
  </tr>
  
</table><br>";
			
			$i=$i+1;
		}
		echo "</div>";
		return "";
	}
	
}
?>
