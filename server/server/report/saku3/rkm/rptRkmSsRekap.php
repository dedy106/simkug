<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_rkm_rptRkmSsRekap extends server_report_basic
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
		$sql="select a.kode_ts,a.kode_ss,a.nama as nama_ss,d.nama as nama_ts,a.kode_lokasi,
		isnull(b.rek1,0) as rek1,isnull(b.rek2,0) as rek2,isnull(b.rek3,0) as rek3,
	   isnull(b.rek4,0) as rek4,isnull(b.rek5,0) as rek5,isnull(b.rek9,0) as rek9,
	   case when c.kode_rek='1' then c.jum else 0 end as n1,
	   case when c.kode_rek='2' then c.jum else 0 end as n2,
	   case when c.kode_rek='3' then c.jum else 0 end as n3,
	   case when c.kode_rek='4' then c.jum else 0 end as n4,
	   case when c.kode_rek='5' then c.jum else 0 end as n5,
	   case when c.kode_rek='9' then c.jum else 0 end as n9
from rkm_ss a
inner join rkm_ts d on a.kode_ts=d.kode_ts and a.kode_lokasi=d.kode_lokasi
left join (select a.kode_lokasi,d.kode_ts,d.kode_ss,
			sum(case when d.kode_rek='1' then a.nilai else 0 end) as rek1,
			sum(case when d.kode_rek='2' then a.nilai else 0 end) as rek2,
			sum(case when d.kode_rek='3' then a.nilai else 0 end) as rek3,
			sum(case when d.kode_rek='4' then a.nilai else 0 end) as rek4,
			sum(case when d.kode_rek='5' then a.nilai else 0 end) as rek5,
			sum(case when d.kode_rek='9' then a.nilai else 0 end) as rek9
		from rkm_target_d a
		inner join rkm_ip b on a.kode_ip=b.kode_ip and a.kode_lokasi=b.kode_lokasi
		inner join rkm_pu c on b.kode_pu=c.kode_pu and b.kode_lokasi=c.kode_lokasi
		inner join rkm_ss d on c.kode_ss=d.kode_ss and c.kode_lokasi=d.kode_lokasi
		where a.kode_lokasi='$kode_lokasi' and substring(a.periode,1,4)='$tahun'
		group by a.kode_lokasi,d.kode_ts,d.kode_ss
		)b on a.kode_ts=b.kode_ts and a.kode_lokasi=b.kode_lokasi and a.kode_ss=b.kode_ss
left join (select b.kode_lokasi,d.kode_ts,d.kode_ss,d.kode_rek,count(b.kode_ip) as jum
			from rkm_ip b
			inner join rkm_pu c on b.kode_pu=c.kode_pu and b.kode_lokasi=c.kode_lokasi
			inner join rkm_ss d on c.kode_ss=d.kode_ss and c.kode_lokasi=d.kode_lokasi
			where b.kode_lokasi='$kode_lokasi' and b.tahun='$tahun'
			group by b.kode_lokasi,d.kode_ts,d.kode_ss,d.kode_rek
		)c on a.kode_ts=c.kode_ts and a.kode_lokasi=c.kode_lokasi and a.kode_ss=c.kode_ss
$this->filter
order by a.kode_ts,a.kode_ss";
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
    <td width='30' rowspan='2' align='center' class='header_laporan'>No</td>
    <td width='80' rowspan='2' align='center' class='header_laporan'>Kode</td>
	<td width='200' rowspan='2' align='center' class='header_laporan'>Nama Program</td>
	<td width='80' rowspan='2' align='center' class='header_laporan'>Kode RKM</td>
	<td width='300' rowspan='2' align='center' class='header_laporan'>Nama RKM</td>
	<td colspan='2' align='center' class='header_laporan'>Wakil Rektor I</td>
	<td colspan='2' align='center' class='header_laporan'>Wakil Rektor II</td>
	<td colspan='2' align='center' class='header_laporan'>Wakil Rektor III</td>
	<td colspan='2' align='center' class='header_laporan'>Wakil Rektor IV</td>
	<td colspan='2' align='center' class='header_laporan'>Fakultas</td>
	<td colspan='2' align='center' class='header_laporan'>Rektor</td>
	<td colspan='2' align='center' class='header_laporan'>Total</td>
   </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='90' align='center' class='header_laporan'>Nilai</td>
    <td width='60' align='center' class='header_laporan'>Jumlah</td>
    <td width='90' align='center' class='header_laporan'>Nilai</td>
    <td width='60' align='center' class='header_laporan'>Jumlah</td>
    <td width='90' align='center' class='header_laporan'>Nilai</td>
    <td width='60' align='center' class='header_laporan'>Jumlah</td>
    <td width='90' align='center' class='header_laporan'>Nilai</td>
    <td width='60' align='center' class='header_laporan'>Jumlah</td>
    <td width='90' align='center' class='header_laporan'>Nilai</td>
    <td width='60' align='center' class='header_laporan'>Jumlah</td>
    <td width='90' align='center' class='header_laporan'>Nilai</td>
    <td width='60' align='center' class='header_laporan'>Jumlah</td>
	<td width='90' align='center' class='header_laporan'>Nilai</td>
    <td width='60' align='center' class='header_laporan'>Jumlah</td>
  </tr>";
			$n1=0; $n2=0; $n3=0; $n4=0; $n5=0; $n9=0; $tn=0;
			$rek1=0; $rek2=0; $rek3=0; $rek4=0; $rek5=0; $rek9=0; $trek=0;
			while ($row = $rs->FetchNextObject($toupper=false))
		{
				$n1+=$row->n1;
				$n2+=$row->n2;
				$n3+=$row->n3;
				$n4+=$row->n4;
				$n5+=$row->n5;
				$n9+=$row->n9;
				$tn+=$row->n1+$row->n2+$row->n3+$row->n4+$row->n5+$row->n9;
				
				$rek1+=$row->rek1;
				$rek2+=$row->rek2;
				$rek3+=$row->rek3;
				$rek4+=$row->rek4;
				$rek5+=$row->rek5;
				$rek9+=$row->rek9;
				$trek+=$row->rek1+$row->rek2+$row->rek3+$row->rek4+$row->rek5+$row->rek9;
			echo "<tr>
    <td class='isi_laporan' align='center'>$i</td>
	<td class='isi_laporan'>$row->kode_ts</td>
	<td class='isi_laporan'>$row->nama_ts</td>";
	echo "<td class='isi_laporan' ><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenDrk('$row->kode_ts','$row->kode_ss','$row->kode_lokasi','$tahun');\">$row->kode_ss</a></td>";


	echo "<td class='isi_laporan'>$row->nama_ss</td>";
		echo "<td class='isi_laporan' align='right'>".number_format($row->rek1,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->n1,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->rek2,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->n2,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->rek3,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->n3,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->rek4,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->n4,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->rek5,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->n5,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->rek9,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->n9,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->rek1+$row->rek2+$row->rek3+$row->rek4+$row->rek5+$row->rek9,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->n1+$row->n2+$row->n3+$row->n4+$row->n5+$row->n9,0,',','.')."</td>
	
    </tr>";	 
			$i=$i+1;
		}
		echo "<tr>
    <td class='header_laporan' align='center' colspan='5'>Total</td>
	<td class='isi_laporan' align='right'>".number_format($rek1,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($n1,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($rek2,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($n2,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($rek3,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($n3,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($rek4,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($n4,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($rek5,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($n5,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($rek9,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($n9,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($trek,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($tn,0,',','.')."</td>
    </tr>";	 
		echo "</table></div>";
		return "";
	}
	
}
?>		

  

