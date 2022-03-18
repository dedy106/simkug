<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_sju_rptPrFormC extends server_report_basic
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
		$nama_cab=$tmp[1];
		
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		
		echo "<table width='1300' border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td><table width='1300' border='0' cellpadding='1' cellspacing='2'>
        <tr>
          <td width='189' class='style16'>PT. Sarana Janesia Utama </td>
          <td width='421'>&nbsp;</td>
          <td width='176' align='right' class='style16'>ISKPR</td>
        </tr>
        <tr>
          <td class='style16'>$this->lokasi</td>
          <td align='center'>&nbsp;</td>
          <td class='istyle12' align='right'>Lampiran XXXVIII</td>
        </tr>
        <tr>
          <td>&nbsp;</td>
          <td align='center' class='style16'>C. RINCIAN PREMI YANG BELUM DISETOR </td>
          <td class='istyle12' align='right'>Keputusan DJLK No</td>
        </tr>
        <tr>
          <td>&nbsp;</td>
          <td align='center' class='style16'>Tanggal 14 September 2004 </td>
          <td class='istyle12' align='right'>Kep-4033/LK/2004</td>
        </tr>
        <tr>
          <td>&nbsp;</td>
          <td align='center'><br></td>
          <td class='istyle12' align='right'>dalam Ribuan Rupiah</td>
        </tr>
    </table></td>
  </tr>
  <tr>
    <td><table border='1' cellspacing='0' cellpadding='0' class='kotak'>
        <tr bgcolor='#dbeef3'>
          <td width='30' class='header_laporan' rowspan='2' align='center'>No</td>
          <td width='220' class='header_laporan' rowspan='2'>PENANGGUNG<br></td>
          <td colspan='13' class='header_laporan' align='center'>Cabang Asuransi</td>
        </tr>
        <tr bgcolor='#dbeef3'>
          <td width='90' class='header_laporan' align='center'>HARTA BENDA</td>
          <td width='90' class='header_laporan' align='center'>KBM</td>
          <td width='90' class='header_laporan' align='center'>PENGANGKUTAN</td>
		  <td width='90' class='header_laporan' align='center'>RANGKA KAPAL</td>
          <td width='90' class='header_laporan' align='center'>RANGKA KAPAL</td>
          <td width='90' class='header_laporan' align='center'>SATELIT</td>
          <td width='90' class='header_laporan' align='center'>AVIATION</td>
          <td width='90' class='header_laporan' align='center'>ENGINEERING</td>
          <td width='90' class='header_laporan' align='center'>SURETYSHIP</td>
		   <td width='90' class='header_laporan' align='center'>TANGGUNG GUGAT</td>
          <td width='90' class='header_laporan' align='center'>ANEKA</td>
          <td width='90' class='header_laporan' align='center'>LAIN - LAIN</td>
          <td width='90' class='header_laporan' align='center'>Total</td>
        </tr>";
       
		$sql="select b.kode_vendor,c.nama,
	   sum(case when d.kode_klp='01' then a.n_premi else 0 end) as n01,
	   sum(case when d.kode_klp='02' then a.n_premi else 0 end) as n02, 
	   sum(case when d.kode_klp='03' then a.n_premi else 0 end) as n03,
	   sum(case when d.kode_klp='04' then a.n_premi else 0 end) as n04, 
	   sum(case when d.kode_klp='05' then a.n_premi else 0 end) as n05,
	   sum(case when d.kode_klp='06' then a.n_premi else 0 end) as n06, 
	   sum(case when d.kode_klp='07' then a.n_premi else 0 end) as n07,
	   sum(case when d.kode_klp='08' then a.n_premi else 0 end) as n08,
	   sum(case when d.kode_klp='09' then a.n_premi else 0 end) as n09, 
	   sum(case when d.kode_klp='10' then a.n_premi else 0 end) as n10,
	   sum(case when d.kode_klp='11' then a.n_premi else 0 end) as n11,
	   sum(case when d.kode_klp='12' then a.n_premi else 0 end) as n12,
	   sum(a.n_premi) as total 	   
from sju_polis_m a
inner join sju_polis_vendor b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi 
inner join sju_vendor c on b.kode_vendor=c.kode_vendor and b.kode_lokasi=c.kode_lokasi
inner join sju_tipe d on a.kode_tipe=d.kode_tipe and a.kode_lokasi=d.kode_lokasi
inner join sju_polis_termin e on a.no_polis=e.no_polis and a.kode_lokasi=e.kode_lokasi 
$this->filter
group by b.kode_vendor,c.nama ";
		$rs = $dbLib->execute($sql);		
		$n01=0; $n02=0; $n03=0; $n04=0; $n05=0; $n06=0; $n07=0; $n08=0; $n09=0; $n10=0;$n11=0;$n12=0; $total=0; 
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$n01+=$row->n01;
			$n02+=$row->n02;
			$n03+=$row->n03;
			$n04+=$row->n04;
			$n05+=$row->n05;
			$n06+=$row->n06;
			$n07+=$row->n07;
			$n08+=$row->n08;
			$n09+=$row->n09;
			$n10+=$row->n10;
			$n11+=$row->n11;
			$n12+=$row->n12;
			$total+=$row->total;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
   	 <td class='isi_laporan'>$row->nama</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n01,2,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->n02,2,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->n03,2,',','.')."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n04,2,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->n05,2,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->n06,2,',','.')."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n07,2,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->n08,2,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->n09,2,',','.')."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n10,2,',','.')."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n11,2,',','.')."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n12,2,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->total,2,',','.')."</td>
     </tr>";
			$i=$i+1;
		}
	
		echo " <tr>
          <td colspan='2' align='center' class='header_laporan'>Total</td>
           <td class='isi_laporan' align='right'>".number_format($n01,2,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($n02,2,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($n03,2,',','.')."</td>
	 <td class='isi_laporan' align='right'>".number_format($n04,2,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($n05,2,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($n06,2,',','.')."</td>
	 <td class='isi_laporan' align='right'>".number_format($n07,2,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($n08,2,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($n09,2,',','.')."</td>
	 <td class='isi_laporan' align='right'>".number_format($n10,2,',','.')."</td>
	 <td class='isi_laporan' align='right'>".number_format($n11,2,',','.')."</td>
	 <td class='isi_laporan' align='right'>".number_format($n12,2,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($total,2,',','.')."</td>
        </tr>
    </table></td>
  </tr>
</table> ";
		echo "</div>";
		return "";
		
	}
	
}
?>
