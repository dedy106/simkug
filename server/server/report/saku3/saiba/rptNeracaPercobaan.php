<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_saiba_rptNeracaPercobaan extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		
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
		$sql="";
		
		$rs = $dbLib->execute($sql);
		
		$i = $start+1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table border='0' cellspacing='2' cellpadding='1'>
			  <tr>
				<td align='center' class='header_laporan'>Neraca Percobaan</td>
			  </tr>
			  <tr>
				<td><table border='0' cellspacing='2' cellpadding='1'>
				 
				  <tr>
					<td width='100' class='header_laporan'>Kementrian Negara/Lembaga </td>
					<td width='496' class='header_laporan'>:&nbsp;$row-></td>
					</tr>
				 
				 
				  <tr>
					<td class='header_laporan'>Eselon I</td>
					<td class='header_laporan'>:&nbsp;$row-></td>
					</tr>
				 
				<tr>
					<td class='header_laporan'>Wilayah/Propinsi </td>
					<td class='header_laporan'>:&nbsp;$row-></td>
				  </tr>
				<tr>
					<td class='header_laporan'>Satuan Kerja </td>
					<td class='header_laporan'>:&nbsp;$row-></td>
				  </tr>				  
				</table></td>
			  </tr>
			  <tr>
				<td><table border='1' cellspacing='0' cellpadding='0' class='kotak'>
				<tr>
				<td width='30' class='header_laporan'><div align='center'>Kode Trans</div></td>
				<td width='60' class='header_laporan'><div align='center'>Kode Perkiraan</div></td>
				<td width='200' class='header_laporan'><div align='center'>Nama Perkiraan</div></td>
				<td width='90' class='header_laporan'><div align='center'>Debet</div></td>
				<td width='90' class='header_laporan'><div align='center'>Kredit</div></td>
			  </tr>";
	  $sql1=" ";
		//error_log($sql1);
		
		$rs1 = $dbLib->execute($sql1);
		$i=1;
		$tot_debet=0;
		$tot_kredit=0;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
			$debet=number_format($row1->debet,0,',','.');
			$kredit=number_format($row1->kredit,0,',','.');
			$tot_debet=$tot_debet+$row1->debet;
			$tot_kredit=$tot_kredit+$row1->kredit;
			echo "<tr>
				<td class='isi_laporan' align='center'></td>
				<td class='isi_laporan'>$row1-></td>
				<td class='isi_laporan'>$row1-></td>
				<td class='isi_laporan'>$row1-></td>
				<td class='isi_laporan' align='right'>$debet</td>
				<td class='isi_laporan' align='right'>$kredit</td>
			  </tr>";
				$i=$i+1;
		}
		$tot_debet1=number_format($tot_debet,0,',','.');
		$tot_kredit1=number_format($tot_debet,0,',','.');
	  echo "<tr>
   
    <td colspan='4' class='header_laporan' align='right'>Jumlah</td>
    <td class='isi_laporan' align='right'>$tot_debet1</td>
    <td class='isi_laporan' align='right'>$tot_kredit1</td>
  </tr>
	</table></td>
  </tr>
  
</table><br>";
			
			$i=$i+1;
		}
		echo "</div>";
		return "";
	}
	
}
?>
