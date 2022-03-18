<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
//$dbLib = new server_DBConnection_dbLib("orarra");

class server_report_rra_rptRekap extends server_report_basic
{
	function setDBConnection($config){
		$this->config = $config;
	}	
	function getTotalPage()
	{
		global $dbLib;
		$dbLib = new server_DBConnection_dbLib($this->config);
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$sql="select count(a.no_pdrk)
			from rra_pdrk_m a
			inner join rra_sukka g on g.no_pdrk = a.no_pdrk and g.kode_lokasi = a.kode_lokasi 
			inner join rra_ubis b on a.kode_ubis=b.kode_ubis and a.kode_lokasi=b.kode_lokasi
			inner join rra_gubis c on a.kode_gubis=c.kode_gubis and a.kode_lokasi=c.kode_lokasi 
			inner join rra_karyawan d on a.nik_app1=d.nik and a.kode_lokasi=d.kode_lokasi
			inner join rra_karyawan e on a.nik_app2=e.nik and a.kode_lokasi=e.kode_lokasi
			inner join rra_karyawan f on a.nik_app3=f.nik and a.kode_lokasi=f.kode_lokasi " . $this->filter;
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);		
		}
		//error_log($sql);		
		return $totPage;
	}
	function getHtml()
	{
		global $dbLib;
		$dbLib = new server_DBConnection_dbLib($this->config);
		$dbLib->connect();
		$dbdriver = $dbLib->connection->driver;
		$tmp=explode("/",$this->filter2);
		$nama_ver=$tmp[0];				
		$sql="select a.kode_ubis, c.nama as ubis, a.sts_pdrk, substr(a.periode, 0,4) as thn,				
				sum(case substr(b.periode, 5,2) when '01' then 1 else 0 end) as j1,
				sum(case substr(b.periode, 5,2) when '02' then 1 else 0 end) as j2,
				sum(case substr(b.periode, 5,2) when '03' then 1 else 0 end) as j3,
				sum(case substr(b.periode, 5,2) when '04' then 1 else 0 end) as j4,
				sum(case substr(b.periode, 5,2) when '05' then 1 else 0 end) as j5,
				sum(case substr(b.periode, 5,2) when '06' then 1 else 0 end) as j6,
				sum(case substr(b.periode, 5,2) when '07' then 1 else 0 end) as j7,
				sum(case substr(b.periode, 5,2) when '08' then 1 else 0 end) as j8,
				sum(case substr(b.periode, 5,2) when '09' then 1 else 0 end) as j9,
				sum(case substr(b.periode, 5,2) when '10' then 1 else 0 end) as j10,
				sum(case substr(b.periode, 5,2) when '11' then 1 else 0 end) as j11,
				sum(case substr(b.periode, 5,2) when '12' then 1 else 0 end) as j12,							
				sum(case substr(b.periode, 5,2) when '01' then b.nilai else 0 end) as n1,
				sum(case substr(b.periode, 5,2) when '02' then b.nilai else 0 end) as n2,
				sum(case substr(b.periode, 5,2) when '03' then b.nilai else 0 end) as n3,
				sum(case substr(b.periode, 5,2) when '04' then b.nilai else 0 end) as n4,
				sum(case substr(b.periode, 5,2) when '05' then b.nilai else 0 end) as n5,
				sum(case substr(b.periode, 5,2) when '06' then b.nilai else 0 end) as n6,
				sum(case substr(b.periode, 5,2) when '07' then b.nilai else 0 end) as n7,
				sum(case substr(b.periode, 5,2) when '08' then b.nilai else 0 end) as n8,
				sum(case substr(b.periode, 5,2) when '09' then b.nilai else 0 end) as n9,
				sum(case substr(b.periode, 5,2) when '10' then b.nilai else 0 end) as n10,
				sum(case substr(b.periode, 5,2) when '11' then b.nilai else 0 end) as n11,
				sum(case substr(b.periode, 5,2) when '12' then b.nilai else 0 end) as n12
			from RRA_PDRK_M a
			inner join rra_anggaran b on b.no_bukti = a.no_pdrk and b.kode_lokasi = a.kode_lokasi and b.dc = 'D'
			inner join rra_ubis c on c.kode_ubis = a.kode_ubis and c.kode_lokasi = a.kode_lokasi 
			" . $this->filter ." group by a.kode_ubis,c.nama, a.sts_pdrk,substr(a.periode, 0,4) ";
		//error_log($sql);
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);			
		
		$i = 1;
		$jum=$rs->recordcount();		
		$AddOnLib=new server_util_AddOnLib();		
		$ix = 1;
		echo "<table><tr><td align='center'>";
				
		$total = array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
		$tmp = "";
		while ($row = $rs->FetchNextObject($toupper=false))
		{						
			if ($tmp != $row->ubis){
				if ($tmp != ""){
					echo "<tr><td colspan='2'>TOTAL</td>";		
					foreach ($total as $k => $value){
						echo "<td>".number_format($value,0,",",".")."</td>";
					}
					echo "</tr></table>";						
				}
				$tmp = $row->ubis;
				$total = array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
				echo "<table>
					<tr><td align='center'>PT TELKOM</td></tr>
					<tr><td align='center'>LAPORAN REPROGRAMING OPEX TAHUN 2011</td></tr>
					<tr><td align='center'>$row->ubis</td></tr>
				</table>";
				echo "<table border=1 class='kotak' >
				<tr>
					<td rowspan='2' align='center' class='header_laporan'>No</td>
					<td rowspan='2' align='center' class='header_laporan'>URAIAN</td>
					<td colspan='2' align='center' class='header_laporan'>JANUARI</td>
					<td colspan='2' align='center' class='header_laporan'>FEBRUARI</td>
					<td colspan='2' align='center' class='header_laporan'>MARET</td>
					<td colspan='2' align='center' class='header_laporan'>APRIL</td>
					<td colspan='2' align='center' class='header_laporan'>MEI</td>
					<td colspan='2' align='center' class='header_laporan'>JUNI</td>
					<td colspan='2' align='center' class='header_laporan'>JULI</td>
					<td colspan='2' align='center' class='header_laporan'>AGUSTUS</td>
					<td colspan='2' align='center' class='header_laporan'>SEPTEMBER</td>
					<td colspan='2' align='center' class='header_laporan'>OKTOBER</td>
					<td colspan='2' align='center' class='header_laporan'>NOPEMBER</td>
					<td colspan='2' align='center' class='header_laporan'>DESEMBER</td>
				</tr>
				<tr>
					<td align='center' class='header_laporan'>JLH TRANS</td>
					<td align='center' class='header_laporan'>NILAI</td>
					<td align='center' class='header_laporan'>JLH TRANS</td>
					<td align='center' class='header_laporan'>NILAI</td>
					<td align='center' class='header_laporan'>JLH TRANS</td>
					<td align='center' class='header_laporan'>NILAI</td>
					<td align='center' class='header_laporan'>JLH TRANS</td>
					<td align='center' class='header_laporan'>NILAI</td>
					<td align='center' class='header_laporan'>JLH TRANS</td>
					<td align='center' class='header_laporan'>NILAI</td>
					<td align='center' class='header_laporan'>JLH TRANS</td>
					<td align='center' class='header_laporan'>NILAI</td>
					<td align='center' class='header_laporan'>JLH TRANS</td>
					<td align='center' class='header_laporan'>NILAI</td>
					<td align='center' class='header_laporan'>JLH TRANS</td>
					<td align='center' class='header_laporan'>NILAI</td>
					<td align='center' class='header_laporan'>JLH TRANS</td>
					<td align='center' class='header_laporan'>NILAI</td>
					<td align='center' class='header_laporan'>JLH TRANS</td>
					<td align='center' class='header_laporan'>NILAI</td>
					<td align='center' class='header_laporan'>JLH TRANS</td>
					<td align='center' class='header_laporan'>NILAI</td>
					<td align='center' class='header_laporan'>JLH TRANS</td>
					<td align='center' class='header_laporan'>NILAI</td>
				</tr>
				";
			}
			
			echo "<tr>
				<td>$ix</td>
				<td>$row->sts_pdrk</td>
				<td align='right'>".number_format($row->j1,0,',','.')."</td>
				<td align='right'>".number_format($row->n1,0,',','.')."</td>
				<td align='right'>".number_format($row->j2,0,',','.')."</td>
				<td align='right'>".number_format($row->n2,0,',','.')."</td>
				<td align='right'>".number_format($row->j3,0,',','.')."</td>
				<td align='right'>".number_format($row->n3,0,',','.')."</td>
				<td align='right'>".number_format($row->j4,0,',','.')."</td>
				<td align='right'>".number_format($row->n4,0,',','.')."</td>
				<td align='right'>".number_format($row->j5,0,',','.')."</td>
				<td align='right'>".number_format($row->n5,0,',','.')."</td>
				<td align='right'>".number_format($row->j6,0,',','.')."</td>
				<td align='right'>".number_format($row->n6,0,',','.')."</td>
				<td align='right'>".number_format($row->j7,0,',','.')."</td>
				<td align='right'>".number_format($row->n7,0,',','.')."</td>
				<td align='right'>".number_format($row->j8,0,',','.')."</td>
				<td align='right'>".number_format($row->n8,0,',','.')."</td>
				<td align='right'>".number_format($row->j9,0,',','.')."</td>
				<td align='right'>".number_format($row->n9,0,',','.')."</td>
				<td align='right'>".number_format($row->j10,0,',','.')."</td>
				<td align='right'>".number_format($row->n10,0,',','.')."</td>
				<td align='right'>".number_format($row->j11,0,',','.')."</td>
				<td align='right'>".number_format($row->n11,0,',','.')."</td>
				<td align='right'>".number_format($row->j12,0,',','.')."</td>
				<td align='right'>".number_format($row->n12,0,',','.')."</td>
				</tr>";
			$total[0] += $row->j1;
			$total[1] += $row->n1;
			$total[2] += $row->j2;
			$total[3] += $row->n2;
			$total[4] += $row->j3;
			$total[5] += $row->n3;
			$total[6] += $row->j4;
			$total[7] += $row->n4;
			$total[8] += $row->j5;
			$total[9] += $row->n5;
			$total[10] += $row->j6;
			$total[11] += $row->n6;
			$total[12] += $row->j7;
			$total[13] += $row->n7;
			$total[14] += $row->j8;
			$total[15] += $row->n8;
			$total[16] += $row->j9;
			$total[17] += $row->n9;
			$total[18] += $row->j10;
			$total[19] += $row->n10;
			$total[20] += $row->j11;
			$total[21] += $row->n11;
			$total[22] += $row->j12;																									
			$total[23] += $row->n12;
			
			$ix+=1;
		}		
		echo "<tr><td colspan='2'>TOTAL</td>";		
		foreach ($total as $k => $value){
			echo "<td align='right'>".number_format($value,0,",",".")."</td>";
		}
		echo "</tr></table>";	
		echo "</td></tr></table>";
		return "";
	}
	
}
?>
