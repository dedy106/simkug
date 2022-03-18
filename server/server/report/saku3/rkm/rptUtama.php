<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_rkm_rptUtama extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
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
		$sql=" select x.kode_bidang,b.nama as bidang,x.kode_pu,x.nama as pu
        from rkm_pu_h x
		  inner join rkm_bidang b on x.kode_bidang=b.kode_bidang and x.kode_lokasi=b.kode_lokasi
		$this->filter";
		

		$rs = $dbLib->execute($sql);	
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' >
  <tr bgcolor='#CCCCCC'>
	<td width='25' height='25'  class='header_laporan'><div align='center'>No</div></td>
	<td width='70' class='header_laporan'><div align='center'>Kode Bidang </div></td>
	<td width='200' class='header_laporan'><div align='center'>Nama Bidang</div></td>
	<td width='50' class='header_laporan'><div align='center'>Kode PP</div></td>
	<td width='135' class='header_laporan'><div align='center'>Nama PP</div></td>
    <td width='70'  class='header_laporan'><div align='center'>Kode DRK</div></td>
    <td width='190' class='header_laporan'><div align='center'>Nama DRK</div></td>	
	
   </tr>";
		$total=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$total+=$row->skor;
			echo "<tr>
  <td height='23'  class='isi_laporan' align='center'>$i</td>
  <td class='isi_laporan'>$row->kode_bidang</td>
  <td class='isi_laporan'>$row->bidang</td>
  <td class='isi_laporan'> </td>
  <td class='isi_laporan'> </td>
  <td  class='isi_laporan'> </td>
  <td class='isi_laporan'> </td>

</tr>";
			
			$i=$i+1;
		}
		
		echo "</table></div>";
		return "";
	}
	
}
?>		

  
