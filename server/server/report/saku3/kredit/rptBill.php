<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_kredit_rptBill extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		
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
		$sql="select a.no_bill,a.kode_lokasi,a.tanggal,a.keterangan,date_format(a.tanggal,'%d/%m/%Y') as tgl,
	   ISNULL(b.jum,0) as jum,ISNULL(b.npokok,0) as npokok
from kre_bill_m a
left join (select a.no_bill,COUNT(no_ttb) as jum,SUM(npokok) as npokok
			from kre_ttb2_sch a
			group by a.no_bill
		  )b on a.no_bill=b.no_bill
$this->filter 
order by a.no_bill";
		
		$rs = $dbLib->execute($sql);	
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("billing",$this->lokasi,"");
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table border='1' cellspacing='0' cellpadding='1' class='kotak'>
 
  <tr >
    <td height='23' colspan='13' class='header_laporan'><table  border='0' cellspacing='2' cellpadding='1'> 
	   <tr>
        <td class='header_laporan'>No Bukti</td>
        <td  class='header_laporan'>: $row->no_bill</td>
      </tr>
	  <tr>
        <td  class='header_laporan'>Tanggal</td>
        <td  class='header_laporan'>: $row->tgl</td>
      </tr>
	 
      <tr>
        <td class='header_laporan'>Keterangan </td>
        <td class='header_laporan'>: $row->keterangan</td>
      </tr>
	  
	  <tr>
        <td class='header_laporan'>Jumlah </td>
        <td class='header_laporan'>: ".number_format($row->jum,0,',','.')."</td>
      </tr>
	  <tr>
        <td class='header_laporan'>Nilai </td>
        <td class='header_laporan'>: ".number_format($row->npokok,0,',','.')."</td>
      </tr>
	 
	  
    </table></td>
  </tr>
 
  
  <tr bgcolor='#CCCCCC'>
	 <td width='30' height='23' class='header_laporan' align='center'>No</td>
	  <td width='100' height='23' class='header_laporan' align='center'>No TTB</td>
	 <td width='60' height='23' class='header_laporan' align='center'>Tgl Angsuran</td>
	<td width='50' height='23' class='header_laporan' align='center'>Cicilan Ke</td>
	<td width='80' class='header_laporan' align='center'>Nilai</td>
   
  </tr>
";
			
			$sql="select a.kode_lokasi,a.no_ttb,a.npokok,date_format(a.tgl_angs,'%d/%m/%Y') as tgl,a.cicilan_ke
from kre_ttb2_sch a
where a.no_bill='$row->no_bill' and a.kode_lokasi='$row->kode_lokasi' ";
			$rs1 = $dbLib->execute($sql);
			$npokok=0;
			
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$npokok+=$row1->npokok;
				
				echo "<tr>
	 <td  valign='top' class='isi_laporan' align='center'>$i</td>
	 <td  valign='top' class='isi_laporan'>".$row1->no_ttb."</td>
	 <td  valign='top' class='isi_laporan'>".$row1->tgl."</td>
	<td valign='top' class='isi_laporan' align='center'>".$row1->cicilan_ke."</td>
    <td valign='top' class='isi_laporan' align='right'>".number_format($row1->npokok,0,',','.')."</td>
	 </tr>";
				$i+=1;
			}
			echo "<tr>
   <td height='23' colspan='4' valign='top' class='header_laporan' align='right'>Total&nbsp;</td>
  <td valign='top' class='header_laporan' align='right'>".number_format($npokok,0,',','.')."</td>
 </tr></table><br>";
			
			$i=$i+1;
		}
		return "";
	}
	
}
?>
