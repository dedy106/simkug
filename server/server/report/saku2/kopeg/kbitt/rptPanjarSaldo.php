<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_kbitt_rptPanjarSaldo extends server_report_basic
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
		$kode_lokasi=$tmp[1];
		$sql="select a.no_aju,a.kode_lokasi,a.no_ptg,a.no_kas,c.tanggal,a.keterangan,b.nilai,b.periode,a.kode_pp,e.nama as nama_pp,a.nik_panjar,f.nama as nama_panjar,
	   isnull(d.nilai,0) as nilai_kas,isnull(d.no_kas,'-') as no_kas_ptg,isnull(g.no_kas,'-') as no_ptg,isnull(g.nilai,0) as nilai_ptg,date_format(a.tanggal,'%d/%m/%Y') as tgl
from it_aju_m a
inner join it_aju_d b on a.no_aju=b.no_aju and a.kode_Lokasi=b.kode_lokasi
inner join kas_m c on a.no_kas=c.no_kas and a.kode_lokasi=c.kode_lokasi
inner join pp e on a.kode_pp=e.kode_pp and a.kode_lokasi=e.kode_lokasi
inner join karyawan f on a.nik_panjar=f.nik and a.kode_lokasi=f.kode_lokasi
left join (select a.no_ptg as no_aju,a.no_kas,c.nilai
			from it_aju_m a
			inner join kas_m b on a.no_kas=b.no_kas and a.kode_lokasi=b.kode_lokasi
		    inner join it_aju_d c on a.no_aju=c.no_aju and a.kode_Lokasi=c.kode_lokasi
			where a.kode_lokasi='$kode_lokasi' and a.modul='PJPTG' and b.periode<'$periode' and c.jenis='PJ'
			union 
			select a.no_ptg as no_aju,a.no_aju as no_kas,c.nilai 
			from it_aju_m a
			inner join ptg_m b on a.no_aju=b.no_ptg and a.kode_lokasi=b.kode_lokasi
			inner join it_aju_d c on a.no_aju=c.no_aju and a.kode_Lokasi=c.kode_lokasi
			where a.kode_lokasi='$kode_lokasi' and c.jenis='PJ' and b.periode<'$periode' 
			)d on a.no_aju=d.no_aju
left join (select a.no_ptg as no_aju,a.no_kas,c.nilai
			from it_aju_m a
			inner join kas_m b on a.no_kas=b.no_kas and a.kode_lokasi=b.kode_lokasi
		    inner join it_aju_d c on a.no_aju=c.no_aju and a.kode_Lokasi=c.kode_lokasi
			where a.kode_lokasi='$kode_lokasi' and a.modul='PJPTG' and b.periode='$periode' and c.jenis='PJ'
			union 
			select a.no_ptg as no_aju,a.no_aju as no_kas,c.nilai 
			from it_aju_m a
			inner join ptg_m b on a.no_aju=b.no_ptg and a.kode_lokasi=b.kode_lokasi
			inner join it_aju_d c on a.no_aju=c.no_aju and a.kode_Lokasi=c.kode_lokasi
			where a.kode_lokasi='$kode_lokasi' and c.jenis='PJ' and b.periode='$periode' 
			)g on a.no_aju=g.no_aju

$this->filter
order by c.periode,a.no_aju";

		$rs = $dbLib->execute($sql);	
		$i=1;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("saldo panjar",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr bgcolor='#CCCCCC'>
    <td width='30'  align='center' class='header_laporan'>No</td>
	<td width='60'  align='center' class='header_laporan'>NIK</td>
    <td width='150'  align='center' class='header_laporan'>Nama</td>
	<td width='60'  align='center' class='header_laporan'>Kode PP</td>
    <td width='150'  align='center' class='header_laporan'>Nama PP</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl Panjar</td>
    <td width='200'  align='center' class='header_laporan'>Keterangan</td>
    <td width='80'  align='center' class='header_laporan'>No Panjar</td>
	<td width='80'  align='center' class='header_laporan'>No KasBank</td>
	<td width='80'  align='center' class='header_laporan'>No PTG Panjar</td>
	<td width='90'  align='center' class='header_laporan'>Nilai Panjar</td>
	<td width='90'  align='center' class='header_laporan'>Nilai PTG Panjar</td>
	<td width='90'  align='center' class='header_laporan'>Saldo Panjar</td>
  </tr>
 ";
		$nilai=0; $tot_nilai_ptg=0; $nilai_kas=0; $saldo=0; $selisih=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			
			$nilai_ptg=0;
			if ($row->nilai_kas!=0)
			{	
				$nilai_ptg=$row->nilai_kas;
			}
			else
			{
				$nilai_ptg=$row->nilai_ptg;
			}
			if($row->no_kas_ptg!="-")
			{
				$no_ptg=$row->no_kas_ptg;
			}
			else
			{
				$no_ptg=$row->no_ptg;
			}
			$nilai+=$row->nilai;
			$tot_nilai_ptg+=$row->nilai_ptg;
			$saldo+=$row->nilai-$nilai_ptg;
		echo "<tr>
    <td class='isi_laporan' align='center'>$i</td>
	<td class='isi_laporan'>$row->nik_panjar</td>
    <td class='isi_laporan'>$row->nama_panjar</td>
	<td class='isi_laporan'>$row->kode_pp</td>
    <td class='isi_laporan'>$row->nama_pp</td>
	<td class='isi_laporan'>$row->tgl</td>
    <td class='isi_laporan'>$row->keterangan</td>
    <td class='isi_laporan'>$row->no_aju</td>
	 <td class='isi_laporan'>";
	 echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKas('$row->no_kas','$row->kode_lokasi');\">$row->no_kas</a>";
		echo "</td>
	    <td class='isi_laporan'>";
		 echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenPtg('$no_ptg','$row->kode_lokasi');\">$no_ptg</a>";
		echo "</td>
    <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
  	  <td class='isi_laporan' align='right'>".number_format($nilai_ptg,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->nilai-$nilai_ptg,0,",",".")."</td>
  </tr>";
			$i=$i+1;
		}
		echo "<tr>
    <td class='header_laporan' align='center' colspan='10'>Total</td>
	<td class='header_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
     <td class='header_laporan' align='right'>".number_format($tot_nilai_ptg,0,",",".")."</td>
	  <td class='header_laporan' align='right'>".number_format($saldo,0,",",".")."</td>
  </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
