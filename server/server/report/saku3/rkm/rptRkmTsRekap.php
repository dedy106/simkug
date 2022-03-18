<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_rkm_rptRkmTsRekap extends server_report_basic
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
		$tahun=$tmp[1];		
		$sql="select a.kode_ts,a.nama,a.kode_lokasi,isnull(b.nilai,0) as nilai,isnull(c.jum,0) as jum
from rkm_ts a
left join (select a.kode_lokasi,d.kode_ts,sum(a.nilai) as nilai
from rkm_target_d a
inner join rkm_ip b on a.kode_ip=b.kode_ip and a.kode_lokasi=b.kode_lokasi
inner join rkm_pu c on b.kode_pu=c.kode_pu and b.kode_lokasi=c.kode_lokasi
inner join rkm_ss d on c.kode_ss=d.kode_ss and c.kode_lokasi=d.kode_lokasi
where a.kode_lokasi='$kode_lokasi' and substring(a.periode,1,4)='$tahun'
group by a.kode_lokasi,d.kode_ts
		)b on a.kode_ts=b.kode_ts and a.kode_lokasi=b.kode_lokasi
left join (select b.kode_lokasi,d.kode_ts,count(b.kode_ip) as jum
from rkm_ip b
inner join rkm_pu c on b.kode_pu=c.kode_pu and b.kode_lokasi=c.kode_lokasi
inner join rkm_ss d on c.kode_ss=d.kode_ss and c.kode_lokasi=d.kode_lokasi
where b.kode_lokasi='$kode_lokasi' and b.tahun='$tahun'
group by b.kode_lokasi,d.kode_ts
		)c on a.kode_ts=c.kode_ts and a.kode_lokasi=c.kode_lokasi
		$this->filter
		order by a.kode_ts ";
		
	
		$rs = $dbLib->execute($sql);	
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("laporan program utama",$this->lokasi,"TAHUN $tahun");
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' >
  <tr bgcolor='#CCCCCC'>
    <td width='30' align='center' class='header_laporan'>No</td>
    <td width='80' align='center' class='header_laporan'>Kode</td>
	<td width='300' align='center' class='header_laporan'>Nama Program</td>
	<td width='100' align='center' class='header_laporan'>Nilai</td>
	<td width='60' align='center' class='header_laporan'>Jumlah</td>
   </tr>";
			$nilai=0; $jum=0;
			while ($row = $rs->FetchNextObject($toupper=false))
		{
				$nilai+=$row->nilai;
				$jum+=$row->jum;
			echo "<tr>
    <td class='isi_laporan' align='center'>$i</td>
	<td class='isi_laporan'>$row->kode_ts</td>";
	echo "<td class='isi_laporan' ><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenSs('$row->kode_ts','$row->kode_lokasi','$tahun');\">$row->nama</a></td>";
	echo "<td class='isi_laporan' align='right'>".number_format($row->nilai,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->jum,0,',','.')."</td>
    </tr>";	 
			$i=$i+1;
		}
		echo "<tr>
    <td class='header_laporan' align='center' colspan='3'>Total</td>
	<td class='header_laporan' align='right'>".number_format($nilai,0,',','.')."</td>
	<td class='header_laporan' align='right'>".number_format($jum,0,',','.')."</td>
    </tr>";	 
		echo "</table></div>";
		return "";
	}
	
}
?>		

  

