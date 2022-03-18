<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku2_kopeg_ppbs_rptAggDetailKeg extends server_report_basic
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
		$tahun=$tmp[0];
		
		$sql="select a.kode_lokasi,a.kode_akun,a.kode_pp,a.kode_drk,b.nama as nama_akun,c.nama as nama_pp,d.nama as nama_drk,a.tahun 
from (select kode_lokasi,kode_akun,kode_pp,kode_drk,substring(periode,1,4) as tahun
from agg_d a $this->filter 
group by kode_lokasi,kode_akun,kode_pp,kode_drk,substring(periode,1,4)
	 )a 
inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
inner join agg_drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun='$tahun' order by a.kode_akun";
		
		$rs = $dbLib->execute($sql);
		$i = 1;
		
		$AddOnLib=new server_util_AddOnLib();
		
		
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("rincian kegiatan",$this->lokasi,"");
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table   border='1' cellpadding='0' cellspacing='0' class='kotak' width='700'>
  <tr>
    <td colspan=2' style='padding:5px'><table width='100%' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td class='header_laporan' width='114'>PP</td>
        <td class='header_laporan' >:&nbsp;$row->kode_pp - $row->nama_pp</td>
        </tr>
	    <tr>
        <td class='header_laporan'>Akun</td>
        <td class='header_laporan'>:&nbsp;$row->kode_akun -&nbsp; $row->nama_akun</td>
      </tr>
      
        <tr>
          <td class='header_laporan'>DRK</td>
          <td class='header_laporan'>:&nbsp;$row->kode_drk -&nbsp; $row->nama_drk</td>
        </tr>
        <tr>
        <td class='header_laporan'>Tahun Anggaran   </td>
        <td class='header_laporan'>:&nbsp;$row->tahun</td>
      </tr>
	
    </table></td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='30' align='center' class='header_laporan'>No</td>
	<td width='670' align='center' class='header_laporan'>Rincian Kegiatan</td>
   
  </tr>
  
  ";
			$sql1="
select kode_lokasi,kode_akun,kode_pp,kode_drk,keterangan
from agg_d
where kode_lokasi='$row->kode_lokasi' and substring(periode,1,4)='$row->tahun' and kode_akun='$row->kode_akun'  and kode_pp='$row->kode_pp' and kode_drk='$row->kode_drk' 
group by kode_lokasi,kode_akun,kode_pp,kode_drk,keterangan ";
			$rs1 = $dbLib->execute($sql1);
			$j=1;$total=0;$vol=0;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				
				echo "<tr>
    <td align='center' class='isi_laporan'>$j</td>
    <td  class='isi_laporan'>$row1->keterangan</td>
     </tr>";		
				$j=$j+1;
			}
			echo "</table><br>";
		}
		echo "</div>";
		return "";
	}
	
}
?>
  
