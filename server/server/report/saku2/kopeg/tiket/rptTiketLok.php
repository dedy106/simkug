<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku2_kopeg_tiket_rptTiketLok extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$sql="select count(a.no_tiket) 
			from sai_tiket_m a $this->filter ";
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
		$sql="select a.kode_lokasi,a.nama,isnull(b.jum_open,0) as jum_open,isnull(c.jum_close,0) as jum_close
from (select a.kode_lokasi,a.periode,b.nama
from sai_tiket_m a
inner join lokasi b on a.kode_lokasi=b.kode_lokasi 
group by a.kode_lokasi,b.nama,a.periode
	  )a
left join (select kode_lokasi,count(no_tiket) as jum_open 
		   from sai_tiket_m 
		   where  progress<>'CLOSE'
		   group by kode_lokasi
		  )b on a.kode_lokasi=b.kode_lokasi
left join (select kode_lokasi,count(no_tiket) as jum_close
		   from sai_tiket_m 
		   where  progress='CLOSE'
		   group by kode_lokasi
		  )c on a.kode_lokasi=c.kode_lokasi $this->filter		
order by a.kode_lokasi ";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("rekap tiket per lokasi",$this->lokasi,"");
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' >
  <tr bgcolor='#CCCCCC'>
    <td width='30' align='center' class='header_laporan'>No</td>
      <td width='80' align='center' class='header_laporan'>Kode Lokasi</td>
    <td width='150' align='center' class='header_laporan'>Nama Lokasi</td>
    <td width='80' align='center' class='header_laporan'>Jumlah Open</td>
	<td width='80' align='center' class='header_laporan'>Jumlah Close</td>
   </tr>";
			while ($row = $rs->FetchNextObject($toupper=false))
		{
			
			echo "<tr>
   <td class='isi_laporan' align='center'>$i</td>
   <td class='isi_laporan'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTiket('$row->kode_lokasi','$row->kode_lokasi');\">$row->kode_lokasi</a>";
			echo "</td>
			<td class='isi_laporan'>$row->nama</td>
			<td class='isi_laporan'>$row->jum_open</td>
			<td class='isi_laporan'>$row->jum_close</td>
    </tr>";	 
			$i=$i+1;
		}
	
		echo "</table></div>";
		return "";
	}
	
}
?>
  
