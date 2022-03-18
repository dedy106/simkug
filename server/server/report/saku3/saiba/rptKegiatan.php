<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_saiba_rptKegiatan extends server_report_basic
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
		$sql="select a.kdfungsi,a.kddept,a.kdunit,a.kdprogram, b.nmdept, c.nmunit, d.nmprogram,e.nmfungsi
from t_giat a
inner join t_dept b on a.kddept=b.kddept
inner join t_unit c on a.kdunit=c.kdunit
inner join t_program d on a.kdprogram=d.kdprogram
inner join t_fungsi e on a.kdfungsi=e.kdfungsi

$this->filter 
";
echo $sql;

	$rs = $dbLib->execute($sql);	
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("daftar kegiatan","","");
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table border='1' cellspacing='0' cellpadding='1' class='kotak'>
 
  <tr >
    <td height='23' colspan='7' class='header_laporan'><table  border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='99' class='header_laporan'>Kode</td>
        <td width='360' class='header_laporan'>: $row->kddept</td>
      </tr>
	   <tr>
        <td width='150' class='header_laporan'>Nama Departemen</td>
        <td width='360' class='header_laporan'>: $row->nmdept</td>
      </tr>
	   <tr>
        <td width='150' class='header_laporan'>Nama Unit</td>
        <td width='360' class='header_laporan'>: $row->nmunit</td>
      </tr>	  
	  
	   <tr>
        <td width='150' class='header_laporan'>Fungsi</td>
        <td width='360' class='header_laporan'>: $row->nmfungsi</td>
      </tr>	  
	  	  
	   <tr>
        <td width='150' class='header_laporan'>Program</td>
        <td width='360' class='header_laporan'>: $row->nmprogram</td>
      </tr>
    </table></td>
  </tr>
 
  
  <tr bgcolor='#CCCCCC'>
	<td  width='150' class='header_laporan' align='center'>Kode</td>
    <td width='400' class='header_laporan' align='center'>Kegiatan</td>
	</tr>

";
			
			$sql="select a.kdgiat,a.nmgiat
from t_giat a
where a.kdfungsi='$row->kdfungsi' and a.kddept='$row->kddept' and a.kdunit='$row->kdunit' 
 ";
			
			$rs1 = $dbLib->execute($sql);
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				
				echo "<tr>
	 <td class='isi_laporan'>$row1->kdgiat</td>
     <td class='isi_laporan'>$row1->nmgiat</td>

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
