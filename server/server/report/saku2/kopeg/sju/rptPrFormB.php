<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_sju_rptPrFormB extends server_report_basic
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
		
		echo "<table width='800' border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td><table width='800' border='0' cellpadding='1' cellspacing='2'>
        <tr>
          <td width='189' class='style16'>PT. Sarana Janesia Utama </td>
          <td width='421'>&nbsp;</td>
          <td width='176' align='right' class='style16'></td>
        </tr>
        <tr>
          <td class='style16'>$this->lokasi</td>
          <td align='center'>&nbsp;</td>
          <td class='istyle12' align='right'>Lampiran XXXVIII</td>
        </tr>
        <tr>
          <td>&nbsp;</td>
          <td align='center' class='style16'>B. LAPORAN OPERASIONAL </td>
          <td class='istyle12' align='right'>Keputusan DJLK No</td>
        </tr>
        <tr>
          <td>&nbsp;</td>
          <td align='center' class='style16'>Perusahaan Pialang Asuransi/Reasuransi </td>
          <td class='istyle12' align='right'>Kep-4033/LK/2004</td>
        </tr>
        <tr>
          <td>&nbsp;</td>
          <td align='center'><br></td>
          <td class='istyle12' align='right'>Tanggal 14 September 2004</td>
        </tr>
    </table></td>
  </tr>
  <tr>
    <td><table border='1' cellspacing='0' cellpadding='0' class='kotak'>
        <tr bgcolor='#dbeef3'>
           <td width='30' align='center' class='header_laporan'>No</td>
		   <td width='250' align='center' class='header_laporan'>Cabang Asuransi</td>
        <td width='120' class='header_laporan' align='center'>Banyaknya Polis/Penutupan<br>Yang Diperantarai<br>(Dalam Satuan)</td>
        <td width='120' class='header_laporan' align='center'>Pendapatan Jasa<br>Perantara<br> (Dalam Jutaan Rp)</td>
        <td width='120' class='header_laporan' align='center'>Premi<br>(Dalam Jutaan Rp)</td>
        <td width='120' class='header_laporan' align='center'>Pendapatan Jasa<br>Konsultasi<br>(Dalam Jutaan Rp)</td>
        </tr>";
       
		$sql="select a.kode_tipe,b.nama,count(a.no_polis) as jum,sum(a.n_fee) as n_fee,sum(a.n_premi) as n_premi
from sju_polis_m a
inner join sju_tipe b on a.kode_tipe=b.kode_tipe and a.kode_lokasi=b.kode_lokasi
group by a.kode_tipe,b.nama";
		$rs = $dbLib->execute($sql);		
		$n_fee=0;$ppn=0;$n_premi=0;$jum=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$jum+=$row->jum;
			$n_premi+=$row->n_premi;
			$n_fee+=$row->n_fee;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
   	 <td class='isi_laporan'>$row->nama</td>
	 <td class='isi_laporan' align='right'>".number_format($row->jum,2,',','.')."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n_fee,2,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->n_premi,2,',','.')."</td>
	<td class='isi_laporan' align='center'>Nihil</td>
	
     </tr>";
			$i=$i+1;
		}
	
		echo " <tr>
          <td colspan='2' align='center' class='header_laporan'>Total</td>
		  <td class='header_laporan' align='right'>".number_format($jum,2,',','.')."</td>
         <td class='header_laporan' align='right'>".number_format($n_fee,2,',','.')."</td>
		<td class='header_laporan' align='right'>".number_format($n_premi,2,',','.')."</td>
		<td class='header_laporan' align='center'>Nihil</td>
        </tr>
    </table></td>
  </tr>
</table> ";
		echo "</div>";
		return "";
		
	}
	
}
?>
