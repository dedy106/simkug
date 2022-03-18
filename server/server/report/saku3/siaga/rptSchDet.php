<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_siaga_rptSchDet extends server_report_basic
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
		$sql="select a.no_kartu,a.keterangan, a.kode_vendor, b.nama as vend, date_format(a.tanggal,'%d/%m/%Y') as tanggal, a.nilai, a.lama_bayar
from gr_kartu_m a
inner join vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi 
$this->filter order by a.kode_vendor ";
		
		$rs = $dbLib->execute($sql);	
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("expense schedule",$this->lokasi,"");
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table border='1' cellspacing='0' cellpadding='1' class='kotak'>
 
  <tr >
    <td height='23' colspan='3' class='header_laporan'><table  border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='99' class='header_laporan'>No Kartu</td>
        <td width='360' class='header_laporan'>: $row->no_kartu</td>
      </tr>
	   <tr>
        <td width='99' class='header_laporan'>Tanggal</td>
        <td width='360' class='header_laporan'>: $row->tanggal</td>
      </tr>
	  <tr>
        <td width='99' class='header_laporan'>Vendor</td>
        <td width='360' class='header_laporan'>: $row->vend</td>
      </tr>
	  <tr>
        <td class='header_laporan'>Keterangan </td>
        <td class='header_laporan'>: $row->keterangan</td>
      </tr>
      <tr>
        <td class='header_laporan'>Nilai </td>
        <td class='header_laporan'>: ".number_format($row->nilai,0,',','.')."</td>
      </tr>
	   <tr>
        <td class='header_laporan'>Lama Bayar</td>
        <td class='header_laporan'>: $row->lama_bayar </td>
      </tr>
	  
    </table></td>
  </tr>
  <tr bgcolor='#CCCCCC'>
	<td width='50' class='header_laporan' align='center'>Periode</td>
    <td  width='250' class='header_laporan' align='center'>Flag Gen</td>
     <td  width='100' class='header_laporan' align='center'>Nilai Schedule</td>
 </tr>";
			
			$sql="select a.no_kartu,a.kode_lokasi,a.nilai,a.no_bill,a.periode
from gr_kartu_sch a
where a.no_kartu='$row->no_kartu'
order by a.periode ";
			
			$rs1 = $dbLib->execute($sql);
			$nilai_p=0;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				
				$nilai_p+=$row1->nilai;
				echo "<tr>
	 <td class='isi_laporan'>$row1->periode</td>
	<td class='isi_laporan' align='right'>$row1->no_bill</td>
    <td class='isi_laporan' align='right'>".number_format($row1->nilai,0,',','.')."</td>
  </tr>";
				
			}
			echo "
		<tr>
   <td  colspan='2' valign='top' class='header_laporan' align='right'>Total&nbsp;</td>
   <td valign='top' class='header_laporan' align='right'>".number_format($nilai_p,0,',','.')."</td>
 </tr>
 </table><br>";
			
			$i=$i+1;
		}
		return "";
	}
	
}
?>
