<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_anggaran_rptGlJurnal extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
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
		$kode_lokasi=$tmp[1];
		$sql="select nama from lokasi where kode_lokasi='$kode_lokasi'";
		$rs = $dbLib->execute($sql);
		$row = $rs->FetchNextObject($toupper=false);
		$nama_lokasi=$row->nama;
		$sql="select a.no_bukti,a.no_dokumen,date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.kode_akun,b.nama,a.kode_pp,a.kode_drk,a.modul,a.keterangan, 
a.debet,a.kredit 
from (select kode_lokasi,periode,dc,no_bukti,no_dokumen,tanggal,kode_akun,kode_pp,kode_drk,modul,keterangan, 
	   case when dc='D' then nilai else 0 end as debet,case when dc='C' then nilai else 0 end as kredit 
from agg_gldt  $this->filter 
) a  
inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
order by a.periode,a.no_bukti,a.dc desc ";
		$rs = $dbLib->execute($sql);
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("memo jurnal",$nama_lokasi,$AddOnLib->ubah_periode($periode));
		echo "<table border='0' cellspacing='2' cellpadding='1'>
			  
			  <tr>
				<td><table border='1' cellspacing='0' cellpadding='0' class='kotak'>
				<tr bgcolor='#CCCCCC'>
				<td width='30' class='header_laporan'><div align='center'>No</div></td>
				<td width='60' class='header_laporan'><div align='center'>No Bukti</div></td>
				<td width='60' class='header_laporan'><div align='center'>No Dokumen</div></td>
				<td width='60' class='header_laporan'><div align='center'>Tanggal</div></td>
				<td width='60' class='header_laporan'><div align='center'>Kode Akun</div></td>
				<td width='200' class='header_laporan'><div align='center'>Nama Akun </div></td>
				<td width='200' class='header_laporan'><div align='center'>Keterangan </div></td>
				<td width='40' class='header_laporan'><div align='center'>PP </div></td>
				<td width='60' class='header_laporan'><div align='center'>DRK </div></td>
				<td width='90' class='header_laporan'><div align='center'>Debet</div></td>
				<td width='90' class='header_laporan'><div align='center'>Kredit</div></td>
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
