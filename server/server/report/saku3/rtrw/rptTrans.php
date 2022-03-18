<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_rtrw_rptTrans extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$urut=$tmp[1];
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
		$AddOnLib=new server_util_AddOnLib();	
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$ref=$tmp[2];
		
		$sql="select nama from trans_ref where kode_ref='$ref'";
		$rs = $dbLib->execute($sql);
		$row = $rs->FetchNextObject($toupper=false);
		$nama=$row->nama;
		
		$sql="select no_bukti,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai1,a.param1
			from trans_m a
		$this->filter
		order by a.tanggal ";
		//error_log($sql);	
		$rs = $dbLib->execute($sql);
		
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("LAPORAN TRANSAKSI",$this->lokasi,$nama);
		echo "<table border='1' cellspacing='0' cellpadding='2' class='kotak'>
  <tr bgcolor='#CCCCCC'>
    <td width='20'  class='header_laporan' align='center'>No</td>
    <td width='100' class='header_laporan' align='center'>No Bukti</td>
    <td width='60' class='header_laporan' align='center'>Ref</td>
	<td width='60' class='header_laporan' align='center'>Tanggal</td>
    <td width='300' class='header_laporan' align='center'>Keterangan</td>
    <td width='80' class='header_laporan' align='center'>Nilai</td>
  </tr>";
		$nilai1=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			
			$nilai1+=$row->nilai1;
			
			echo "<tr>
    <td  class='isi_laporan'><div align='center'>$i</div></td>
    <td  class='isi_laporan'>$row->no_bukti</td>
	<td  class='isi_laporan'>$row->param1</td>
    <td  class='isi_laporan'>$row->tgl</td>
    <td  class='isi_laporan'>$row->keterangan</td>
    <td  class='isi_laporan' align='right'>".number_format($row->nilai1,0,',','.')."</td>
  </tr>";
			$first = true;
			$i=$i+1;
		}
	
		echo "<tr>
    <td colspan='5' align='right'  class='header_laporan'>Total</td>
    <td  class='header_laporan' align='right'>".number_format($nilai1,0,',','.')."</td>
  </tr>";
		echo "</table></div>";
		return "";
		
	}
	
}
?>
