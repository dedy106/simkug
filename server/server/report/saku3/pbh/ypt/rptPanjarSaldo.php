<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_pbh_ypt_rptPanjarSaldo extends server_report_basic
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
		$sql="select a.no_pj,a.no_kas,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai,
	   a.kode_pp,c.nama as nama_pp,a.nik_pengaju,d.nama,
	   b.no_ptg,b.no_kas as kas_ptg,isnull(b.nilai,0)+isnull(b.nilai_kas,0) as nilai_ptg
from panjar_m a
left join ptg_m b on a.no_pj=b.no_pj and a.kode_lokasi=b.kode_lokasi
inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
inner join karyawan d on a.nik_pengaju=d.nik and a.kode_lokasi=d.kode_lokasi
$this->filter 
order by a.no_pj ";

		
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
	<td class='isi_laporan'>$row->nik_pengaju</td>
    <td class='isi_laporan'>$row->nama</td>
	<td class='isi_laporan'>$row->kode_pp</td>
    <td class='isi_laporan'>$row->nama_pp</td>
	<td class='isi_laporan'>$row->tgl</td>
    <td class='isi_laporan'>$row->keterangan</td>
    <td class='isi_laporan'>$row->no_pj</td>
	 <td class='isi_laporan'>";
	 echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKas('$row->no_kas','$row->kode_lokasi');\">$row->no_kas</a>";
		echo "</td>
	    <td class='isi_laporan'>";
		 echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenPtg('$row->kas_ptg','$row->kode_lokasi');\">$row->kas_ptg</a>";
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
