<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_inves2_rptRoiDep extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		
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
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$jenis=$tmp[2];
		$nik_user=$tmp[3];
		//$sql="exec sp_exs_roi '$kode_lokasi','$periode','$nik_user','$jenis'";
		
		//$rs=$dbLib->execute($sql);
		$sql="select a.periode, a.tanggal, a.jenis, a.kode_kelola, a.sawal, a.masuk, a.keluar, a.sakhir, 
		a.bunga, a.pajak, a.beban, a.bunga_net, a.roi_hari, a.roi_kinerja, a.roi_kum,date_format(a.tanggal,'%d/%m/%Y') as tgl
from inv_depo_roi a
$this->filter order by a.tanggal";
		
		$rs=$dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		
		echo "<div align='center'>";
		echo $AddOnLib->judul_laporan("roi harian $jenis",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr bgcolor='#CCCCCC'>
    <td width='60' align='center' class='header_laporan'>Tanggal</td>
    <td width='100' align='center' class='header_laporan'>Saldo Awal </td>
    <td width='90' align='center' class='header_laporan'>Masuk</td>
    <td width='90' align='center' class='header_laporan'>Keluar</td>
    <td width='100' align='center' class='header_laporan'>Saldo Akhir </td>
    <td width='90' align='center' class='header_laporan'>Bunga</td>
    <td width='90' align='center' class='header_laporan'>Pajak</td>
    <td width='90' align='center' class='header_laporan'>Beban</td>
    <td width='90' align='center' class='header_laporan'>Bunga Net</td>
    <td width='60' align='center' class='header_laporan'>Harian</td>
    <td width='60' align='center' class='header_laporan'>Hari n+1</td>
    <td width='60' align='center' class='header_laporan'>Kumulatif</td>
  </tr>
  ";
		$persen3=0; 
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$persen1=0; 
			if ($row->n1!=0)
			{
				$persen1=($row->n7/$row->n1)*100;
			}
			$persen3+=$persen1;
		echo "<tr>
    <td class='isi_laporan' align='center'>$row->tgl</td>
    <td class='isi_laporan' align='right'>".number_format($row->sawal,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->masuk,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->keluar,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->sakhir,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->bunga,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->pajak,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->beban,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->bunga_net,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->roi_hari,4,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->roi_kinerja,4,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->roi_kum,4,",",".")."</td>
  </tr>";
			
			
		}
		echo "</table>";
		echo "</div>";
		return "";
		
	}
	
}
?>
