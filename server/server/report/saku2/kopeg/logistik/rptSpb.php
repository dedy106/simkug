<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku2_kopeg_logistik_rptSpb extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$sql="select count(a.no_spb)
from spb_m a $this->filter ";
		error_log($sql);
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
		
		
		$sql="select a.no_spb,date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.keterangan 
from spb_m a $this->filter
order by a.no_spb";
	
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		$i = 1;
		
		$AddOnLib=new server_util_AddOnLib();
		
		
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("spb",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table   border='1' cellpadding='0' cellspacing='0' class='kotak'>
  <tr>
    <td colspan='20' style='padding:5px'><table width='100%' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td class='header_laporan' width='114'>No Bukti </td>
        <td class='header_laporan'>:&nbsp;$row->no_spb</td>
        </tr>
		<tr>
        <td class='header_laporan' width='114'>Tanggal </td>
        <td class='header_laporan'>:&nbsp;$row->tanggal</td>
        </tr>
	      
      
	  <tr>
        <td class='header_laporan'>Keterangan   </td>
        <td class='header_laporan'>:&nbsp;$row->keterangan</td>
      </tr>
    </table></td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='15' align='center' class='header_laporan'>No</td>
	<td width='100' align='center' class='header_laporan'>No Bukti</td>
    <td width='60' align='center' class='header_laporan'>Modul</td>
    <td width='100' align='center' class='header_laporan'>Bank</td>
    <td width='100' align='center' class='header_laporan'>Cabang</td>
	 <td width='80' align='center' class='header_laporan'>No Rekening</td>
    <td width='100' align='center' class='header_laporan'>Nama Rekening</td>
  <td width='90' align='center' class='header_laporan'>Nilai</td>
	
  </tr>";
			$sql1="select a.no_bukti,a.modul,a.nilai,a.bank,a.cabang,a.no_rek,a.nama_rek
from spb_d a
where a.no_spb='$row->no_spb' ";

			
			$rs1 = $dbLib->execute($sql1);
			$j=1; $nilai=0; 
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$nilai=$nilai+$row1->nilai;
				
				echo "<tr>
    <td align='center' class='isi_laporan'>$j</td>
    <td  class='isi_laporan'>$row1->no_bukti</td>
    <td class='isi_laporan'>$row1->modul</td>
	<td class='isi_laporan'>$row1->bank</td>
    <td  class='isi_laporan'>$row1->cabang</td>
	<td  class='isi_laporan'>$row1->no_rek</td>
	<td  class='isi_laporan'>$row1->nama_rek</td>
   <td align='right' class='isi_laporan'>".number_format($row1->nilai,0,",",".")."</td>
  </tr>";		
				$j=$j+1;
			}
			echo "<tr>
    <td colspan='7' align='center'  class='header_laporan'>Total</td>
  <td align='right' class='header_laporan'>".number_format($nilai,0,",",".")."</td>
  </tr><br>";
		}
		echo "</div>";
		return "";
	}
	
}
?>
  
