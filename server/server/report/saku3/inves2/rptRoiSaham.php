<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_inves2_rptRoiSaham extends server_report_basic
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
		$sql="select a.periode, a.kode_kelola, a.tanggal, a.nab_awal, a.beli, a.jual, a.spi, a.nab_akhir, a.deviden, a.gainloss, a.naik_turun, a.hasil_gross, a.tarif_pajak, a.nilai_pajak, a.hasil_set_pajak, a.jasa_ta, 
       a.beban_lain, a.jml_beban, a.hasil_net, a.roi_hari_netto, a.roi_kinerja_netto, a.roi_kum_netto, a.roi_hari_gross, a.roi_kinerja_gross, a.roi_kum_gross, a.roi_hari_gbt, a.roi_kinerja_gbt, 
       a.roi_kum_gbt, a.nbuku_awal, a.nbuku_akhir, a.njual_buku, a.spi_jual_rev, a.noleh_awal, a.noleh_akhir, a.njual_oleh,
	   date_format(a.tanggal,'%d/%m/%Y') as tgl,b.nama
from inv_saham_roi a
inner join inv_kelola b on a.kode_kelola=b.kode_kelola
$this->filter order by a.kode_kelola,a.tanggal";
		
		$rs=$dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		
		echo "<div align='center'>";
		echo $AddOnLib->judul_laporan("roi harian $jenis",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr bgcolor='#CCCCCC'>
    <td width='60' align='center' class='header_laporan'>Tanggal</td>
	<td width='60' align='center' class='header_laporan'>Kode </td>
	<td width='150' align='center' class='header_laporan'>Nama Kelola</td>
    <td width='100' align='center' class='header_laporan'>NAB Awal </td>
    <td width='90' align='center' class='header_laporan'>Beli</td>
    <td width='90' align='center' class='header_laporan'>Jual</td>
    <td width='100' align='center' class='header_laporan'>SPI </td>
    <td width='90' align='center' class='header_laporan'>NAB Akhir</td>
    <td width='90' align='center' class='header_laporan'>Deviden</td>
    <td width='90' align='center' class='header_laporan'>GainLoss</td>
	 <td width='90' align='center' class='header_laporan'>Naik Turun</td>
    <td width='90' align='center' class='header_laporan'>Hasil Gross</td>
    <td width='60' align='center' class='header_laporan'>Tarif Pajak</td>
    <td width='60' align='center' class='header_laporan'>Nilai Pajak</td>
    <td width='60' align='center' class='header_laporan'>Hasil Net Pajak</td>
	<td width='90' align='center' class='header_laporan'>Jasa TA</td>
	<td width='90' align='center' class='header_laporan'>Beban Lain</td>
	<td width='90' align='center' class='header_laporan'>Jumlah Beban</td>
	<td width='90' align='center' class='header_laporan'>Hasil Net</td>
	<td width='90' align='center' class='header_laporan'>ROI Hasil Netto</td>
	<td width='90' align='center' class='header_laporan'>ROI Kinerja Netto</td>
	<td width='90' align='center' class='header_laporan'>ROI Kum Netto</td>
	<td width='90' align='center' class='header_laporan'>ROI hari Gross</td>
	<td width='90' align='center' class='header_laporan'>ROI Kinerja Gross</td>
	<td width='90' align='center' class='header_laporan'>ROI Kum Gross</td>
	<td width='90' align='center' class='header_laporan'>ROI hari Gbt</td>
	<td width='90' align='center' class='header_laporan'>ROI Kinerja GBT</td>
	<td width='90' align='center' class='header_laporan'>ROI Kum GBT</td>

	
	<td width='90' align='center' class='header_laporan'>Nilai Buku Awal</td>
	<td width='90' align='center' class='header_laporan'>Nilai Buku Akhir</td>
	<td width='90' align='center' class='header_laporan'>Nilai Jual Buku</td>
	<td width='90' align='center' class='header_laporan'>Nilai Jual Rev</td>
	<td width='90' align='center' class='header_laporan'>Nilai Oleh Awal</td>
	<td width='90' align='center' class='header_laporan'>Nilai Oleh Akhir</td>
	<td width='90' align='center' class='header_laporan'>Nilai Jual Oleh</td>
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
	<td class='isi_laporan' align='center'>$row->kode_kelola</td>
	<td class='isi_laporan' >$row->nama</td>
    <td class='isi_laporan' align='right'>".number_format($row->nab_awal,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->beli,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->jual,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->spi,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->nab_akhir,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->deviden,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->gainloss,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->naik_turun,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->hasil_gross,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->tarif_pajak,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->nilai_pajak,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->hasil_set_pajak,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->jasa_ta,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->beban_lain,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->jml_beban,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->hasil_net,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->roi_hari_netto,4,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->roi_kinerja_netto,4,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->roi_kum_netto,4,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->roi_hari_gross,4,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->roi_kinerja_gross,4,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->roi_kum_gross,4,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->roi_hari_gbt,4,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->roi_kinerja_gbt,4,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->roi_kum_gbt,4,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->nbuku_awal,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->nbuku_akhir,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->njual_buku,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->spi_jual_rev,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->noleh_awal,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->noleh_akhir,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->njual_oleh,0,",",".")."</td>
  </tr>";
			
			
		}
		echo "</table>";
		echo "</div>";
		return "";
		
	}
	
}
?>
