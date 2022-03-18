<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_sju16_rptAjuMoni extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select count(a.no_pb)
from sju_pb_m a
$this->filter";
		
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
		$sql="select a.no_pb,a.keterangan,a.nilai
		from sju_pb_m a
		inner join trans_m b on a.no_kas=b.no_bukti and a.kode_lokasi=b.kode_lokasi	
		  $this->filter ";

		  $start = (($this->page-1) * $this->rows);
		$rs = $dbLib->execute($sql);		
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("detail monitoring pembayaran",$this->lokasi,"");
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='100'  align='center' class='header_laporan'>No PB</td>
	  <td width='300'  align='center' class='header_laporan'>Keterangan</td>
	 <td width='150'  align='center' class='header_laporan'>Nilai</td>
	  </tr>  ";
		$nilai=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai=$nilai+$row->nilai;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
	 <td class='isi_bukti'>$row->no_pb</td>
	 <td class='isi_bukti'>$row->keterangan</td>
	 <td class='isi_bukti' align='right'>".number_format($row->nilai,0,",",".")."</td>
</tr>";
			$i=$i+1;
		}
		echo "<tr>
		<td height='23' colspan='3' valign='top'  class='isi_bukti' align='right'>Total&nbsp;</td>
		<td valign='top'  class='isi_bukti' align='right'>".number_format($nilai,0,',','.')."</td>
	</tr>
		</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
