<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

function fnPersen($nilai)
{
	$tmp="";
	if ($nilai<=50000000)
	{
		$tmp=0.05;
	}
	if ($nilai>50000000 && $nilai<=250000000)
	{
		$tmp=0.15;
	}
	if ($nilai>250000000 && $nilai<=500000000)
	{
		$tmp=0.25;
	}
	if ($nilai>500000000)
	{
		$tmp=0.30;
	}
	return $tmp;
}

class server_report_saku3_tarbak_rptHrGajiPphGra extends server_report_basic
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
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$no_gaji=$tmp[2];
		
		$sql="select a.nik,a.nama,a.status_nikah,a.npwp,isnull(c.nilai,0) as ptkp,a.kode_sdm,
	   isnull(b.remu,0)+isnull(b.tsus,0)+isnull(b.lembur,0)+isnull(b.rapel,0) as pdpt,
	   isnull(b.ikop,0)+isnull(b.pkop,0)+isnull(b.pas,0) as pot
from hr_karyawan a
inner join (select a.nik,a.kode_lokasi,
				sum(case when a.kode_param='GAPOK' then a.nilai else 0 end) as gpok,
				sum(case when a.kode_param='KONJ' then a.nilai else 0 end) as konj,
				sum(case when a.kode_param='TJAB' then a.nilai else 0 end) as tjab,
				sum(case when a.kode_param='TSUS' then a.nilai else 0 end) as tsus,
				sum(case when a.kode_param='LEMBUR' then a.nilai else 0 end) as lembur,
				sum(case when a.kode_param='IKOP' then a.nilai else 0 end) as ikop,
				sum(case when a.kode_param='PKOP' then a.nilai else 0 end) as pkop,
				sum(case when a.kode_param='PAS' then a.nilai else 0 end) as pas,
				sum(case when a.kode_param='REMU' then a.nilai else 0 end) as remu,
				sum(case when a.kode_param='RPL' then a.nilai else 0 end) as rapel
			from hr_gaji_d a
			where a.kode_lokasi='$kode_lokasi' and a.periode='$periode'
			group by a.nik,a.kode_lokasi
			)b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi
inner join hr_pajak c on a.status_nikah=c.kode_pajak and a.kode_lokasi=c.kode_lokasi
$this->filter
order by a.kode_unit,a.nama
";
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("PERHITUNGAN PPH 21",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table  border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td align='center'><table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>NO</td>
     <td width='200'  align='center' class='header_laporan'>NAMA</td>
	 <td width='120'  align='center' class='header_laporan'>NO. NPWP</td>
	 <td width='60'  align='center' class='header_laporan'>STATUS</td>
	 <td width='90'  align='center' class='header_laporan'>PENDAPATAN</td>
	 <td width='90'  align='center' class='header_laporan'>GAJI SETAHUN</td>
	 <td width='90'  align='center' class='header_laporan'>LEMBUR</td>
	 <td width='90'  align='center' class='header_laporan'>TOTAL PENDAPATAN BRUTO</td>
	 <td width='90'  align='center' class='header_laporan'>5% BY JBTN</td>
	 <td width='90'  align='center' class='header_laporan'>TOTAL PENDAPATAN NETTO</td>
     <td width='90'  align='center' class='header_laporan'>P.T.K.P</td>
	 <td width='90'  align='center' class='header_laporan'>P.K.P</td>
	 <td width='90'  align='center' class='header_laporan'>PPH 21 </td>
	</tr>  ";
		$bruto=0; $netto=0; $tot=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$bruto=($row->pdpt*15)+$row->lembur;
			if (0.05*($row->pdpt*15)>6000000)
			{
				$bjab=6000000;
			}
			else
			{
				$bjab=0.05*($row->pdpt*15);
			}
			$netto=$bruto-$bjab;
			$pkp=$netto-$row->ptkp;
			if ($pkp<0)
			{
				$pkp3=(floor(abs($pkp) / 1000) * 1000)*-1;
			}
			else
			{
				$pkp3=floor($pkp/ 1000) * 1000;
			}
			$pph=fnPersen($pkp)*$pkp;
			if ($pph<0)
			{
				$pph=0;
			}
			$tot+=$pph;
			if ($row->kode_sdm=="1")
			{
				$pdpt_tahun=$row->pdpt*15;
			}
			else
			{
				$pdpt_tahun=$row->pdpt*13;
			}
			echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
	 <td class='isi_laporan'>$row->nama</td>
	 <td class='isi_laporan'>$row->npwp</td>
	 <td class='isi_laporan' align='center'>$row->status_nikah</td>
	<td class='isi_laporan' align='right'>".number_format($row->pdpt,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($pdpt_tahun,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->lembur,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($bruto,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($bjab,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($netto,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->ptkp,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($pkp3,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($pph,0,',','.')."</td>
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
     <td class='header_laporan' align='center' colspan='12'>Total</td>
	<td class='header_laporan' align='right'>".number_format($tot,0,',','.')."</td>
     </tr>";
		echo "</table> </td></tr>
  <tr>
    <td align='left' class='isi_laporan'>$footer</td>
  </tr>
</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
