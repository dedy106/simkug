<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_bengkel_rptSpkHarian extends server_report_basic
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
		$tmp=explode("|",$this->filter2);
		$periode=$tmp[0];
		$tanggal=$tmp[1];
		$tgl="";
		if ($tanggal!="")
		{
			$tgl=" and a.tanggal='$tanggal' ";
		}
		$sql="select a.no_spk,a.no_polisi,a.tipe,a.merk,a.cust,a.jenis_freon,date_format(a.tanggal,'%d/%m/%Y') as tgl,
		dbo.fnGetMekanik(a.no_spk,a.kode_lokasi) as mekanik
from fri_spk_m a
$this->filter $tgl
order by a.tanggal,a.no_spk";
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("daftar spk keluar harian",$this->lokasi,"Tanggal ".$tanggal);
		echo "<table border='0' cellspacing='2' cellpadding='1' width='900'>
  <tr>
    <td><table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1200'>
   <tr bgcolor='#CCCCCC'>
     <td width='20'  align='center' class='header_laporan'>No</td>
     <td width='80'  align='center' class='header_laporan'>SPK</td>
	 <td width='60'  align='center' class='header_laporan'>TANGGAL</td>
	 <td width='150'  align='center' class='header_laporan'>KENDARAAN</td>
     <td width='60'  align='center' class='header_laporan'>NO.POL</td>
	 <td width='20'  align='center' class='header_laporan'>R</td>
	 <td width='20'  align='center' class='header_laporan'>S</td>
	 <td width='20'  align='center' class='header_laporan'>I</td>
      <td width='20'  align='center' class='header_laporan'>B</td>
	 <td width='100'  align='center' class='header_laporan'>A/C</td>
	 <td width='150'  align='center' class='header_laporan'>MEKANIK</td>
	 <td width='80'  align='center' class='header_laporan'>NO.KW</td>
	 <td width='200'  align='center' class='header_laporan'>PEMILIK</td>
	 <td width='60'  align='center' class='header_laporan'>JENIS FREON</td>
	  </tr>  ";
		
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$r12=""; $r14="";
			if ($row->jenis_freon=="R12") {$r12="X";}
			if ($row->jenis_freon=="R14") {$r14="X";}
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>$row->no_spk</td>
	 <td class='isi_laporan'>$row->tgl</td>
	 <td class='isi_laporan'>$row->merk</td>
	 <td class='isi_laporan'>$row->no_polisi</td>
	 <td class='isi_laporan'></td>
	  <td class='isi_laporan'></td>
	  <td class='isi_laporan'></td>
	  <td class='isi_laporan'></td>
	  <td class='isi_laporan'></td>
	  <td class='isi_laporan'>$row->mekanik</td>
	  <td class='isi_laporan'></td>
	   <td class='isi_laporan'>$row->cust</td>
	  <td class='isi_laporan' align='center'>$row->jenis_freon</td>
     </tr>";
			$i=$i+1;
			
		}
	
		echo "</table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td><table border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='200' align='center'>KEPALA BENGKEL </td>
        <td width='200' align='center'>ADM. CABANG</td>
        <td width='200' align='center'>ADM. PUSAT </td>
        <td width='200'>KEPALA CABANG </td>
      </tr>
      <tr valign='bottom'>
        <td height='70'>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
    </table></td>
  </tr>
</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
