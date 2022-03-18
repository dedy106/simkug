<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mysql");

class server_report_eclaim_rptDokumen extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$sql="select count(a.no_dok) 
from eclaim_dok_m a $this->filter ";
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
		
		$sql="select a.no_dok,a.no_klaim,date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.keterangan,a.kode_ttg,a.kode_ttg
from eclaim_dok_m a $this->filter order by a.no_dok";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		$i = 1;
		
		$AddOnLib=new server_util_AddOnLib();
		echo $AddOnLib->judul_laporan("kelengkapan dokumen",$this->lokasi,$AddOnLib->ubah_periode($periode));
		echo "<div align='center'>"; 
		$jenis="";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table border='1' cellpadding='0' cellspacing='0' class='kotak'>
  <tr>
    <td colspan='10' style='padding:5px'><table width='100%' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td class='header_laporan' width='114'>No Dokumen </td>
        <td class='header_laporan'>:&nbsp;$row->no_dok</td>
        </tr>
	    <tr>
        <td class='header_laporan'>No Klaim </td>
        <td class='header_laporan'>:&nbsp;$row->no_klaim</td>
      </tr>
      <tr>
        <td class='header_laporan'>Tanggal   </td>
        <td class='header_laporan'>:&nbsp;$row->tanggal</td>
      </tr>
	<tr>
        <td class='header_laporan'>Keterangan   </td>
        <td class='header_laporan'>:&nbsp;$row->keterangan</td>
      </tr>
	
    </table></td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='30' align='center' class='header_laporan'>No</td>
	<td width='80' align='center' class='header_laporan'>Kode Ref</td>
    <td width='200' align='center' class='header_laporan'>Nama Ref </td>
	<td width='250' align='center' class='header_laporan'>Keterangan</td>
    
  </tr>";
		
	 $sql1="select a.kode_ref,a.no_dok,d.nama as nama_dok,a.no_file,a.ket_dok
from eclaim_dok_d a
inner join eclaim_dok_m b on a.no_dok=b.no_dok and a.kode_ttg=b.kode_ttg
inner join eclaim_klaim c on b.no_klaim=c.no_klaim and b.kode_ttg=c.kode_ttg
inner join eclaim_ref d on a.kode_ref=d.kode_ref and a.kode_ttg=d.kode_ttg and c.kode_asuransi=d.kode_asuransi
where c.no_klaim = '$row->no_klaim' and c.kode_ttg='$row->kode_ttg' order by a.kode_ref ";
		
		$rs1 = $dbLib->execute($sql1);
		$j=1;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
			echo "<tr>
    <td align='center' class='isi_laporan'>$j</td>
    <td align='left' class='isi_laporan'>";
	echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBbAsset('$row1->no_file','');\">$row1->kode_ref</a>";				  
			echo "<td align='left' class='isi_laporan'>$row1->nama_dok</td>
	<td align='left' class='isi_laporan'>$row1->ket_dok </td>
	
  </tr>";
		$j=$j+1;
		}
		
	  echo " </table></td>
  </tr>
 
</table><br>";
			
			$i=$i+1;
		}
		echo "</div>";
			
		return "";
	}
	
}
?>
  
