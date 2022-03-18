<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_fitnes_rptRekapKas extends server_report_basic
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
		$nik_user=$tmp[2];
		$sql="exec sp_fi_rekap_kas '$kode_lokasi','$periode','$nik_user'";
		$rs = $dbLib->execute($sql);
		
		$sql="select a.kode_lokasi,a.periode,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.hari,a.n1,a.n2,a.n3,a.n4,a.n5,(a.n1+a.n2+a.n3+a.n4+a.n5) as n6
		from fi_rekap_tmp a
$this->filter and nik_user='$nik_user'
order by a.nu ";
		
		$rs = $dbLib->execute($sql);	
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("rekapitulasi penerimaan",$this->lokasi,"");
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' >
  <tr bgcolor='#CCCCCC'>
    <td width='30' align='center' class='header_laporan'>No</td>
    <td width='80' align='center' class='header_laporan'>Hari</td>
	<td width='60' align='center' class='header_laporan'>Tanggal</td>
	<td width='80' align='center' class='header_laporan'>Pegawai</td>
    <td width='80' align='center' class='header_laporan'>Keluarga Pegawai</td>
	<td width='80' align='center' class='header_laporan'>Pensiunan</td>
	<td width='80' align='center' class='header_laporan'>Keluarga Pensiunan</td>
	<td width='80' align='center' class='header_laporan'>Umum</td>
<td width='90' align='center' class='header_laporan'>Total</td>
   </tr>";
			$n1=0; $n2=0; $n3=0; $n4=0; $n5=0; $n6=0;
			while ($row = $rs->FetchNextObject($toupper=false))
		{
			$n1+=$row->n1;
			$n2+=$row->n2;
			$n3+=$row->n3;
			$n4+=$row->n4;
			$n5+=$row->n5;
			$n6+=$row->n6;
			$tgl2=substr($row->tgl,6,4)."-".substr($row->tgl,3,2)."-".substr($row->tgl,0,2);
			echo "<tr>
    <td class='isi_laporan' align='center'>$i</td>
    <td class='isi_laporan'>$row->hari</td>
    <td class='isi_laporan'>$row->tgl</td>";
			echo "<td  class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenDetail('11','$row->periode','$row->kode_lokasi','$tgl2');\">".number_format($row->n1,0,',','.')."</a></td>";				  
			echo "<td  class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenDetail('12','$row->periode','$row->kode_lokasi','$tgl2');\">".number_format($row->n2,0,',','.')."</a></td>";				  
			echo "<td  class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenDetail('21','$row->periode','$row->kode_lokasi','$tgl2');\">".number_format($row->n3,0,',','.')."</a></td>";				  
			echo "<td  class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenDetail('22','$row->periode','$row->kode_lokasi','$tgl2');\">".number_format($row->n4,0,',','.')."</a></td>";				  
			echo "<td  class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenDetail('50','$row->periode','$row->kode_lokasi','$tgl2');\">".number_format($row->n5,0,',','.')."</a></td>";				  
			echo "<td  class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenDetail('10','$row->periode','$row->kode_lokasi','$tgl2');\">".number_format($row->n6,0,',','.')."</a></td>";				  

			echo " </tr>";	 
			$i=$i+1;
		}
		echo "<tr>
    <td class='isi_laporan' align='center' colspan='3'>Total</td>
	 <td class='isi_laporan' align='right'>".number_format($n1,0,',','.')."</td>
	 <td class='isi_laporan' align='right'>".number_format($n2,0,',','.')."</td>
	 <td class='isi_laporan' align='right'>".number_format($n3,0,',','.')."</td>
	 <td class='isi_laporan' align='right'>".number_format($n4,0,',','.')."</td>
	 <td class='isi_laporan' align='right'>".number_format($n5,0,',','.')."</td>
	 <td class='isi_laporan' align='right'>".number_format($n6,0,',','.')."</td>
    </tr>";	 
		echo "</table></div>";
		return "";
	}
	
}
?>
  
