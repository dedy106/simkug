<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_yks_rptIcdx extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$sql = "select 1 ";
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
		$kode_lokasi1=$tmp[0];
		$kode_lokasi2=$tmp[1];
		$periode1=$tmp[2];
		$periode2=$tmp[3];
		$periode="$periode1 sd $periode2";		
		if ($kode_lokasi1=="01") { $lokasi="AREA I";}
		if ($kode_lokasi1=="02") { $lokasi="AREA II";}
		if ($kode_lokasi1=="03") { $lokasi="AREA III";}
		if ($kode_lokasi1=="04") { $lokasi="AREA IV";}
		if ($kode_lokasi1=="05") { $lokasi="AREA V";}
		if ($kode_lokasi1=="06") { $lokasi="AREA VI";}
		if ($kode_lokasi1=="07") { $lokasi="AREA VII";}
		if ($kode_lokasi1=="99") { $lokasi="PUSAT";}
		if ($kode_lokasi1=="01" and $kode_lokasi2=="07") { $lokasi="SELURUH AREA [I - VII]";}
		if ($kode_lokasi1=="01" and $kode_lokasi2=="99") { $lokasi="KONSOLIDASI NASIONAL";}
		$sql = "select a.icdx,isnull(b.nama,'-')as nama,sum(case when c.jenis = 'PENSIUN' then a.nilai else 0 end) as pensiun,
	   sum(case when c.jenis <> 'PENSIUN' then a.nilai else 0 end) as pegawai,sum(a.nilai) as nilai
from yk_bill_d a 
inner join cust c on a.loker=c.kode_cust
left join yk_icdx b on substring(a.icdx,1,3)=b.kode_icdx $this->filter and a.flag_aktif <> 'X' 
group by a.icdx,isnull(b.nama,'-')
order by a.nilai desc ";
      
		$rs = $dbLib->execute($sql);
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		$tanggal="<div style='font-family: Arial;font-size: 10px;'> Dicetak ".date("d/m/Y  H:m:s")."<div>";
		$judul="<div style='font-family: Arial;font-size: 12px;font-weight: bold;padding:3px;'>".$lokasi."<br>LAPORAN ICDX<br>PERIODE $periode <br></div>$tanggal";
		echo "<div align='center'>$judul<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr bgcolor='#CCCCCC'>
	<td width='60' class='header_laporan' align='center'>Kode ICDX</td>
    <td width='400' height='25'  class='header_laporan' align='center'>Keterangan</td>
    <td width='90' class='header_laporan' align='center'>Pensiun</td>
	<td width='90' class='header_laporan' align='center'>Pegawai</td>
	<td width='90' class='header_laporan' align='center'>Total</td>
</tr>";
		$jum=0;$nilai=0;$pegawai=0;$pensiun=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$jum=$jum+$row->jumlah;
			$nilai=$nilai+$row->nilai;
			$pegawai=$pegawai+$row->pegawai;
			$pensiun=$pensiun+$row->pensiun;
			echo "<tr>
	<td height='20' class='isi_laporan' align='center'>$row->icdx</td>		
    <td height='20' class='isi_laporan'>$row->nama</td>
	<td class='isi_laporan' align='right'>".number_format($row->pensiun,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->pegawai,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td></tr>";
		}
		echo " <tr bgcolor='#CCCCCC'>
    <td height='25' colspan='2' align='right' class='header_laporan'>Total</td>
    <td class='header_laporan' align='right'>".number_format($pensiun,0,",",".")."</td>
	<td class='header_laporan' align='right'>".number_format($pegawai,0,",",".")."</td>
    <td class='header_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
  </tr>";	
		echo "</table></div>";
		
		return "";
	}
	
	
}
?>
