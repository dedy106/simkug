<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku2_frigia_rptGajiPph extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
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
		$sql="select x.nik,b.nama,b.sts_pajak,x.total_bln,x.total,x.b_jab as bjab,isnull(c.padp,0)*12 as padp,x.ptkp,x.pkp-isnull(c.padp,0)*12 as pkp,
	   case when y.persen is null then 0 else round((y.nilai_seb+((x.pkp - (isnull(c.padp,0)*12) - y.kurang_seb) * y.persen/100)) / 12,0) end as pph21
from (select a.nik,a.kode_lokasi,c.sts_pajak, 
		 sum(case b.dc when 'D' then a.nilai else -a.nilai end) as total_bln,
		 sum(case b.dc when 'D' then a.nilai else -a.nilai end) * 12 as total,
		 d.nilai as ptkp,d.biaya_jab,d.jab_max,
		 case when round(sum(case b.dc when 'D' then a.nilai else -a.nilai end)* 12 * d.biaya_jab/100,0) > d.jab_max then d.jab_max
		 else round(sum(case b.dc when 'D' then a.nilai else -a.nilai end)* 12 * d.biaya_jab/100,0) end as b_jab,
		 (sum(case b.dc when 'D' then a.nilai else -a.nilai end) * 12) - d.nilai -
		 case when round(sum(case b.dc when 'D' then a.nilai else -a.nilai end)* 12 * d.biaya_jab/100,0) > d.jab_max then d.jab_max
		 else round(sum(case b.dc when 'D' then a.nilai else -a.nilai end)* 12 * d.biaya_jab/100,0) end as pkp
	  from fri_gaji_d a 
	  inner join fri_gaji_param b on a.kode_param=b.kode_param and a.kode_lokasi=b.kode_lokasi
	  inner join karyawan c on a.nik=c.nik and a.kode_lokasi=c.kode_lokasi
	  inner join fri_status_pajak d on c.sts_pajak=d.sts_pajak and c.kode_lokasi=d.kode_lokasi
     where a.kode_lokasi='$kode_lokasi' and a.periode='$periode' and b.dc='D' 
	  group by a.nik,a.kode_lokasi,d.nilai,c.sts_pajak,d.biaya_jab,d.jab_max
	 ) x
inner join karyawan b on b.nik=x.nik and b.kode_lokasi=x.kode_lokasi
left join fri_pph21 y on x.pkp between y.bawah and y.atas and x.kode_lokasi=y.kode_lokasi
left join (select a.nik,a.kode_lokasi,sum(a.nilai) as padp
			from fri_gaji_d a 
			where a.kode_param='PADP' and a.kode_lokasi='$kode_lokasi' and a.periode='$periode'
			group by a.nik,a.kode_lokasi
		   )c on b.nik=c.nik and b.kode_lokasi=c.kode_lokasi ";
		
		$rs = $dbLib->execute($sql);		
		$AddOnLib=new server_util_AddOnLib();
		$i = 1;
		$path = $_SERVER["SCRIPT_NAME"];				
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("DAFTAR PPH21 KOMISARIS, DIREKSI & KARYAWAN",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table  border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr align='center' bgcolor='#CCCCCC'>
    <td  class='header_laporan' width='20'>NO</td>
    <td  class='header_laporan' width='60'>NIP</td>
    <td  class='header_laporan' width='200'>NAMA</td>
	 <td  class='header_laporan' width='80'>STATUS PAJAK</td>
    <td class='header_laporan' width='80'>PENDAPATAN</td>
    <td class='header_laporan' width='80'>BIAYA JABATAN</td>
	 <td class='header_laporan' width='80'>ASURANSI DIBAYAR PEKERJA</td>
    <td  class='header_laporan' width='80'>PTKP</td>
    <td class='header_laporan' width='80'>PKP</td>
    <td  class='header_laporan' width='80'>PPH21 </td>
  </tr>
";
		
		$total=0;$bjab=0;$ptkp=0;$pkp=0;$pph21=0;$padp=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$bulan=strtoupper($AddOnLib->ubah_bulan($row->bulan));
			$total=$total+$row->total;
			$bjab=$bjab+$row->bjab;
			$ptkp=$ptkp+$row->ptkp;
			$pkp=$pkp+$row->pkp;
			$pph21=$pph21+$row->pph21;
			$padp=$padp+$row->padp;
			echo "<tr>
    <td align='center' class='isi_laporan' >$i</td>
    <td class='isi_laporan'>$row->nik</td>
    <td class='isi_laporan'>$row->nama</td>
	<td class='isi_laporan'>$row->sts_pajak</td>
	<td class='isi_laporan' align='right'>".number_format($row->total,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->bjab,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->padp,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->ptkp,0,',','.')."</td>
     <td class='isi_laporan' align='right'>".number_format($row->pkp,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->pph21,0,',','.')."</td>
  
  </tr>";

			$i=$i+1;
		}
		echo "<tr>
    <td class='isi_laporan' colspan='4' align='right'>Total</td>
  	<td class='isi_laporan' align='right'>".number_format($total,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($bjab,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($padp,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($ptkp,0,',','.')."</td>
     <td class='isi_laporan' align='right'>".number_format($pkp,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($pph21,0,',','.')."</td>
    
  </tr>";
		echo "</table></div>";
		
		return "";
	}
	
}
?>
  
