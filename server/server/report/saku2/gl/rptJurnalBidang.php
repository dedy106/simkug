<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_gl_rptJurnalBidang extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select count(a.no_bukti)
from (select a.kode_lokasi,a.periode,a.dc,a.no_bukti,a.no_dokumen,a.tanggal,a.kode_akun,a.kode_pp,a.kode_drk,a.modul,a.keterangan, 
	   case when a.dc='D' then a.nilai else 0 end as debet,case when a.dc='C' then a.nilai else 0 end as kredit 
from gldt a
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi $this->filter 
union 
select a.kode_lokasi,a.periode,a.dc,a.no_bukti,a.no_dokumen,a.tanggal,a.kode_akun,a.kode_pp,a.kode_drk,a.modul,a.keterangan, 
	   case when a.dc='D' then a.nilai else 0 end as debet,case when a.dc='C' then a.nilai else 0 end as kredit 
from gldt_h a 
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi $this->filter
) a  
inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi ";
		
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
		$tmp=explode("/",$this->filter);
		
		$sql="select a.no_bukti,a.no_dokumen,date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.kode_akun,b.nama,a.kode_pp,a.kode_drk,a.modul,a.keterangan, 
a.debet,a.kredit
from (select a.kode_lokasi,a.periode,a.dc,a.no_bukti,a.no_dokumen,a.tanggal,a.kode_akun,a.kode_pp,a.kode_drk,a.modul,a.keterangan, 
	   case when a.dc='D' then a.nilai else 0 end as debet,case when a.dc='C' then a.nilai else 0 end as kredit 
from gldt a
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi $this->filter 
union 
select a.kode_lokasi,a.periode,a.dc,a.no_bukti,a.no_dokumen,a.tanggal,a.kode_akun,a.kode_pp,a.kode_drk,a.modul,a.keterangan, 
	   case when a.dc='D' then a.nilai else 0 end as debet,case when a.dc='C' then a.nilai else 0 end as kredit 
from gldt_h a 
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi $this->filter
) a  
inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
order by a.periode,a.no_bukti,a.dc desc ";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$i = $start+1;
		
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>";
		echo "<table border='0' cellspacing='2' cellpadding='1'>
			  <tr>
				<td align='center' class='header_laporan'>MEMO JURNAL </td>
			  </tr>
			  
			  <tr>
				<td><table border='1' cellspacing='0' cellpadding='0' class='kotak'>
				<tr bgcolor='#CCCCCC'>
				<td align='center' width='30' class='header_laporan'>No</td>
				<td align='center' width='60' class='header_laporan'>No Bukti</td>
				<td align='center' width='60' class='header_laporan'>No Dokumen</td>
				<td align='center' width='60' class='header_laporan'>Tanggal</td>
				<td align='center' width='60' class='header_laporan'>Kode Akun</td>
				<td align='center' width='200' class='header_laporan'>Nama Akun </td>
				<td align='center' width='200' class='header_laporan'>Keterangan </td>
				<td align='center' width='40' class='header_laporan'>PP </td>
				<td align='center' width='60' class='header_laporan'>DRK </td>
				<td align='center' width='90' class='header_laporan'>Debet</td>
				<td align='center' width='90' class='header_laporan'>Kredit</td>
			  </tr>";
		$tot_debet=0;
		$tot_kredit=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$debet=number_format($row->debet,0,',','.');
			$kredit=number_format($row->kredit,0,',','.');
			$tot_debet=$tot_debet+$row->debet;
			$tot_kredit=$tot_kredit+$row->kredit;
			echo "<tr>
				<td class='isi_laporan' align='center'>$i</td>
				<td class='isi_laporan'>$row->no_bukti</td>
				<td class='isi_laporan'>$row->no_dokumen</td>
				<td class='isi_laporan'>$row->tanggal</td>
				<td class='isi_laporan'>$row->kode_akun</td>
				<td class='isi_laporan'>$row->nama</td>
				<td class='isi_laporan'>$row->keterangan</td>
				<td class='isi_laporan' align='center'>$row->kode_pp</td>
				<td class='isi_laporan'>$row->kode_drk</td>
				<td class='isi_laporan' align='right'>$debet</td>
				<td class='isi_laporan' align='right'>$kredit</td>
			  </tr>";
			$i=$i+1;
			$tot_debet1=number_format($tot_debet,0,',','.');
			$tot_kredit1=number_format($tot_debet,0,',','.');
		}
		echo "<tr>  
    <td colspan='9' class='header_laporan' align='right'>Total</td>
    <td class='isi_laporan' align='right'>$tot_debet1</td>
    <td class='isi_laporan' align='right'>$tot_kredit1</td>
  </tr>
	</table></td>
  </tr>
  
</table><br>";
		echo "</div>";
		return "";
	}
	
}
?>
