<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_tu_kegiatan_rptRedist extends server_report_basic
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
		$sql="select a.no_rra,a.keterangan,date_format(a.tanggal,'%d/%m/%Y') as tgl
from keg_rra_m a
$this->filter ";

	$rs = $dbLib->execute($sql);	
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("laporan RRA kegiatan",$this->lokasi,"");
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table border='1' cellspacing='0' cellpadding='1' class='kotak'>
 
  <tr >
    <td height='23' colspan='8' class='header_laporan'><table  border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='99' class='header_laporan'>Tanggal</td>
        <td width='360' class='header_laporan'>: $row->tgl</td>
      </tr>
	   <tr>
        <td width='150' class='header_laporan'>No Redistribusi</td>
        <td width='360' class='header_laporan'>: $row->no_rra</td>
      </tr>	  
	   <tr>
        <td width='150' class='header_laporan'>Keterangan</td>
        <td width='360' class='header_laporan'>: $row->keterangan</td>
      </tr>	  
    </table></td>
  </tr>
 
  
  <tr bgcolor='#CCCCCC'>
	<td  width='100' class='header_laporan' align='center'>ID Kegiatan</td>
    <td width='200' class='header_laporan' align='center'>Nama Kegiatan</td>
	<td width='200' class='header_laporan' align='center'>Distribusi Kegiatan</td>
    <td width='80' class='header_laporan' align='center'>Donor</td>
	<td  width='80' class='header_laporan' align='center'>Penerima</td>
	</tr>

";
			
			$sql="select a.no_aju,b.keterangan,a.kegiatan,
	   case when a.no_aju=c.kode_terima then abs(a.nilai) else 0 end as terima,
case when a.no_aju=c.kode_donor then abs(a.nilai) else 0 end as donor
from keg_aju_d a
inner join keg_aju_m b on a.no_aju=b.no_aju and a.kode_lokasi=b.kode_lokasi
inner join keg_rra_m c on a.no_ref=c.no_rra and a.kode_lokasi=c.kode_lokasi
where a.no_ref='$row->no_rra'
order by a.no_aju ";

			$rs1 = $dbLib->execute($sql);
			$don=0;
			$trm=0;
			$total1=0;
			$total2=0;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$don+=$row1->donor;
				$trm+=$row1->terima;
				echo "<tr>
	 <td class='isi_laporan'>$row1->no_aju</td>
	 <td class='isi_laporan'>$row1->keterangan</td>
	 <td class='isi_laporan'>$row1->kegiatan</td>
	 <td class='isi_laporan' align='right'>".number_format($row1->donor,0,',','.')."</td>
	 <td class='isi_laporan' align='right'>".number_format($row1->terima,0,',','.')."</td>
 </tr>";
				
			}
					 echo "<tr>
        <td class='header_laporan' colspan='3' align='right'>Total</td>
		<td class='header_laporan' align='right'>".number_format($don,0,",",".")."</td>
		   <td class='header_laporan' align='right'>".number_format($trm,0,",",".")."</td>
      </tr>";					
	 
			echo "
 </table><br>";
			
			$i=$i+1;
		}
		return "";
	}
	
}

?>
