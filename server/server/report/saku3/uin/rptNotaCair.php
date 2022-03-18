<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_uin_rptNotaCair extends server_report_basic
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
		
		
		$sql="select a.no_cair,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.neto,a.kode_rek,b.nama as nama_rek
from uin_cair_m a
inner join uin_rek b on a.kode_rek=b.kode_rek and a.kode_lokasi=b.kode_lokasi
$this->filter 
order by a.no_cair ";
		$rs = $dbLib->execute($sql);	
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("pencairan nota",$this->lokasi,"");
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table border='1' cellspacing='0' cellpadding='1' class='kotak'>
 
  <tr >
    <td height='23' colspan='7' class='header_laporan'><table  border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='99' class='header_laporan'>No Bukti</td>
        <td width='360' class='header_laporan'>: $row->no_cair</td>
      </tr>
	 
	  <tr>
        <td width='99' class='header_laporan'>Tanggal</td>
        <td width='360' class='header_laporan'>: $row->tgl</td>
      </tr>
      <tr>
        <td class='header_laporan'>Rekening </td>
        <td class='header_laporan'>: $row->kode_rek - $row->nama_rek</td>
      </tr>
	  <tr>
        <td class='header_laporan'>Keterangan </td>
        <td class='header_laporan'>: $row->keterangan</td>
      </tr>
    </table></td>
  </tr>
 
  <tr bgcolor='#CCCCCC'>
	<td width='100' height='23'class='header_laporan' align='center'>No Nota</td>
    <td width='50'  class='header_laporan' align='center'>Jenis</td>
	<td width='60'  class='header_laporan' align='center'>Tanggal</td>
    <td width='300' class='header_laporan' align='center'>Keterangan</td>
    <td width='90' class='header_laporan' align='center'>Nilai</td>
  </tr>
";
			
			$sql="select a.no_nota,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.neto,a.jenis
from uin_nota_m a
where a.no_kas='$row->no_cair'
order by a.no_nota
";
			
			$rs1 = $dbLib->execute($sql);
			$neto=0;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$neto+=$row1->neto;
				echo "<tr>
					<td height='23' class='isi_laporan'>$row1->no_nota</td>
					<td height='23' class='isi_laporan'>$row1->jenis</td>
					<td height='23' class='isi_laporan'>$row1->tgl</td>
					<td class='isi_laporan'>$row1->keterangan</td>
					<td  class='isi_laporan' align='right'>".number_format($row1->neto,0,',','.')."</td>
					</tr>";
				
			}
			echo "<tr>
   <td height='23' colspan='4' class='header_laporan' align='center'>Total</td>
   <td  class='header_laporan' align='right'>".number_format($neto,0,',','.')."</td>
 </tr></table><br>";
			
			$i=$i+1;
		}
		return "";
	}
	
}
?>
