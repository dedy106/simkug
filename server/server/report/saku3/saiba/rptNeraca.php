<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_saiba_rptNeraca extends server_report_basic
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
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$sql="select a.kddept, a.nmdept
from t_dept a
$this->filter ";

	$rs = $dbLib->execute($sql);	
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("neraca","tingkat satuan kerja","per");
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table border='1' cellspacing='0' cellpadding='1' class='kotak'>
 
  <tr >
    <td height='23' colspan='7' class='header_laporan'><table  border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='99' class='header_laporan'>Kementrian/Lembaga</td>
        <td width='360' class='header_laporan'>: $row-></td>
      </tr>
	   <tr>
        <td width='150' class='header_laporan'>Unit Organisasi</td>
        <td width='360' class='header_laporan'>: $row-></td>
      </tr>
	   <tr>
        <td width='150' class='header_laporan'>Wilayah/Propinsi</td>
        <td width='360' class='header_laporan'>: $row-></td>
      </tr>	   <tr>
        <td width='150' class='header_laporan'>Satuan Kerja</td>
        <td width='360' class='header_laporan'>: $row-></td>
      </tr>	
	   <tr>
        <td width='150' class='header_laporan'>Jenis Kewenangan</td>
        <td width='360' class='header_laporan'>: $row-></td>
      </tr>	  
    </table></td>
  </tr>
 
  
  <tr bgcolor='#CCCCCC'>
	<td  width='400' class='header_laporan' align='center'>NAMA PERKIRAAN</td>
    <td width='450' class='header_laporan' align='center'>JUMLAH</td>
	</tr>

";
			
			$sql="
 ";
			
			$rs1 = $dbLib->execute($sql);
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				
				echo "<tr>
	 <td class='isi_laporan'>$row1-></td>
     <td class='isi_laporan'>$row1-></td>

 </tr>";
				
			}
			echo "
 </table><br>";
			
			$i=$i+1;
		}
		return "";
	}
	
}

?>
