<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_pajak_rptHonor2 extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
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
		$periode=$tmp[0];
		$nama_cab=$tmp[1];
		$sql="select a.no_aju,a.kode_lokasi,a.no_kas,a.kode_pp,a.tanggal,c.nilai+c.pajak as honor,c.pajak,c.nama_rek,
		c.keterangan,date_format(b.tanggal,'%d/%m/%Y') as tgl_kas,
		case when d.flag_dosen='1' then pajak else 0 end as tunj_pajak,
		case when d.flag_dosen='1' then c.nilai else (c.nilai+c.pajak)-c.pajak end as netto,
		case when d.flag_dosen='1' then 'Pegawai' else 'Dosen Luar Biasa' end as jenis_sdm
from it_aju_m a
inner join kas_m b on a.no_kas=b.no_kas and a.kode_lokasi=b.kode_lokasi
inner join it_aju_rek c on a.no_aju=c.no_aju and a.kode_lokasi=c.kode_lokasi
inner join  it_dosen d on c.keterangan=d.kode_dosen and c.kode_lokasi=d.kode_lokasi
$this->filter 
order by b.tanggal,c.keterangan ";
		
		$rs = $dbLib->execute($sql);	
		$AddOnLib=new server_util_AddOnLib();	
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("REKAP DETAIL HONOR",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
	   <tr bgcolor='#CCCCCC'>
		 <td width='30'  align='center' class='header_laporan'>No</td>
		 <td width='60'  align='center' class='header_laporan'>TGL</td>
		 <td width='100'  align='center' class='header_laporan'>No Bukti</td>
		 <td width='60'  align='center' class='header_laporan'>Kode</td>
		 <td width='200'  align='center' class='header_laporan'>Nama</td>
		 <td width='60'  align='center' class='header_laporan'>Kode PP</td>
		 <td width='100'  align='center' class='header_laporan'>Status</td>
		 <td width='90'  align='center' class='header_laporan'>Jumlah Honor</td>
		 <td width='90'  align='center' class='header_laporan'>PPH</td>
		 <td width='90'  align='center' class='header_laporan'>Tunjangan PPH</td>
		 <td width='100'  align='center' class='header_laporan'>Jumlah Dibayar</td>
		 </tr>  ";
		$i=1;$nilai=0;$pajak=0;$tunj_pajak=0;$netto=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$honor+=$row->honor;
			$pajak+=$row->pajak;
			$tunj_pajak+=$row->tunj_pajak;
			$netto+=$row->netto;
			echo "<tr>
    <td class='isi_laporan' align='center'>$i</td>
	<td class='isi_laporan'>$row->tgl_kas</td>
    <td class='isi_laporan'>$row->no_kas</td>
	<td class='isi_laporan'>$row->keterangan</td>
    <td class='isi_laporan'>$row->nama_rek</td>
	<td class='isi_laporan'>$row->kode_pp</td>
    <td class='isi_laporan'>$row->jenis_sdm</td>
    <td class='isi_laporan' align='right'>".number_format($row->honor,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->pajak,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->tunj_pajak,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->netto,0,",",".")."</td>";
			$i=$i+1;
		}
		echo "<tr>
    <td class='isi_laporan' align='center' colspan='7'>Total</td>
    <td class='isi_laporan' align='right'>".number_format($honor,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($pajak,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($tunj_pajak,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($netto,0,",",".")."</td>";
		echo "</div>";
		return "";
		
	}
	
}
?>
