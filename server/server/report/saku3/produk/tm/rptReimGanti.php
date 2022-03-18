<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_produk_tm_rptReimGanti extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		
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
		$periode=$tmp[0];
		$kode_lokasi=$tmp[1];
		$tahun=substr($periode,0,4);
		$sql="select a.no_kas,a.keterangan,a.kode_lokasi 
from kas_m a
$this->filter 
order by a.no_kas";
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$rs = $dbLib->execute($sql);	
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("laporan penggantian imprest fund",$this->lokasi,"");
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table border='1' cellspacing='0' cellpadding='1' class='kotak'>
 
  <tr >
    <td height='23' colspan='10' class='header_laporan'><table  border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='99' class='header_laporan'>No Bukti</td>
        <td  class='header_laporan'>: $row->no_kas</td>
      </tr>
	  <tr>
        <td width='99' class='header_laporan'>Keterangan</td>
        <td class='header_laporan'>: $row->keterangan</td>
      </tr>
    </table></td>
  </tr>";
 
  echo "<tr bgcolor='#CCCCCC'>
    <td width='100' height='23' class='header_laporan' align='center'>No Reim</td>
    <td width='300' class='header_laporan' align='center'>NIK</td>
    <td width='80' class='header_laporan' align='center'>PP</td>
	<td width='80' class='header_laporan' align='center'>Keterangan</td>
	<td width='90' class='header_laporan' align='center'>Nilai</td>
  </tr>
";
			
			$sql="select a.no_reim, b.nik,b.nama as pemegang, c.kode_pp,c.nama as pp, a.kode_pp, a.keterangan,a.akun_hutang,a.nilai 
					 from if_reim_m a 
					 	inner join karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi 
					 	inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
where a.progress='1' and a.kode_lokasi='$row->kode_lokasi' and a.nilai<>0
order by a.no_reim
 ";
			
			$rs1 = $dbLib->execute($sql);
			$nilai=0; 
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$nilai1+=$row1->nilai;
				echo "<tr>
    <td  class='isi_laporan'>$row1->no_reim</td>
    <td  class='isi_laporan'>$row1->nik - $row1->pemegang</td>				
    <td  class='isi_laporan'>$row1->pp</td>
    <td  class='isi_laporan'>$row1->keterangan</td>
    <td  class='isi_laporan' align='right'>".number_format($row1->nilai,0,',','.')."</td>
  </tr>";
				
			}
			echo "<tr>
   <td height='23' colspan='4'  class='header_laporan' align='right'>Total&nbsp;</td>
   <td  class='header_laporan' align='right'>".number_format($nilai1,0,',','.')."</td>
 </tr></table><br>";
			
			$i=$i+1;
		}
		return "";
	}
	
}
?>
