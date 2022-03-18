<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_rra_rptAggPdrkS extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
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
		$nama_cab=$tmp[0];
		$kode_lokasi=$tmp[1];
		$sql="select a.kode_lokasi,a.kode_pp,a.kode_drk,a.kode_akun,b.nama as nama_akun,
		case when substring(a.periode,5,2)='01' then a.saldo else 0 end as n1,
		case when substring(a.periode,5,2)='02' then a.saldo else 0 end as n2,
		case when substring(a.periode,5,2)='03' then a.saldo else 0 end as n3,
		case when substring(a.periode,5,2)='04' then a.saldo else 0 end as n4,
		case when substring(a.periode,5,2)='05' then a.saldo else 0 end as n5,
		case when substring(a.periode,5,2)='06' then a.saldo else 0 end as n6,
		case when substring(a.periode,5,2)='07' then a.saldo else 0 end as n7,
		case when substring(a.periode,5,2)='08' then a.saldo else 0 end as n8,
		case when substring(a.periode,5,2)='09' then a.saldo else 0 end as n9,
		case when substring(a.periode,5,2)='10' then a.saldo else 0 end as n10,
		case when substring(a.periode,5,2)='11' then a.saldo else 0 end as n11,
		case when substring(a.periode,5,2)='12' then a.saldo else 0 end as n12,
		a.saldo as jumlah
from rra_pdrk_d a
inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
$this->filter
order by a.kode_akun ";
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("REPROGRAMMING ANGGARAN<br>REDISTRIBUSI, REALOKASI, RESCHEDULE, ANGGARAN BIAYA TAMBAHAN, OPEN HOLD<br>OPEX / CAPEX / PENDAPATAN",$this->lokasi);
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  rowspan='2' align='center' class='header_laporan'>No</td>
     <td width='40'  rowspan='2' align='center' class='header_laporan'>Lokasi</td>
	 <td width='60' rowspan='2' align='center' class='header_laporan'>PP</td>
	 <td width='60' rowspan='2' align='center' class='header_laporan'>DRK</td>
	 <td width='80' rowspan='2' align='center' class='header_laporan'>Kode Akun</td>
	 <td width='200' rowspan='2' align='center' class='header_laporan'>Nama Akun</td>
	 <td colspan='12' align='center' class='header_laporan'>Sebelum Reprogramming</td>
	 <td width='90' rowspan='2' align='center' class='header_laporan'>Jumlah</td>

   </tr>
   <tr bgcolor='#CCCCCC'>
	 <td width='80'  align='center' class='header_laporan'>1</td>
	 <td width='80'  align='center' class='header_laporan'>2</td>
	 <td width='80'  align='center' class='header_laporan'>3</td>
	 <td width='80'  align='center' class='header_laporan'>4</td>
	 <td width='80'  align='center' class='header_laporan'>5</td>
	 <td width='80'  align='center' class='header_laporan'>6</td>
	 <td width='80'  align='center' class='header_laporan'>7</td>
	 <td width='80'  align='center' class='header_laporan'>8</td>
	 <td width='90'   align='center' class='header_laporan'>9</td>
	 <td width='80'  align='center' class='header_laporan'>10</td>
	 <td width='90'   align='center' class='header_laporan'>11</td>
	 <td width='80'  align='center' class='header_laporan'>12</td>
	  
     </tr>  ";

	 while ($row = $rs->FetchNextObject($toupper=false))
		{

		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
	  <td class='isi_laporan' align='center'>$row->kode_lokasi</td>
	 <td class='isi_laporan' >$row->kode_pp</td>
	  <td class='isi_laporan'>$row->kode_drk</td>
	 <td class='isi_laporan'>$row->kode_akun</td>
	 <td class='isi_laporan'>$row->nama_akun</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n1,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n2,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n3,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n4,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n5,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n6,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n7,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n8,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n9,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n10,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n11,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n12,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->jumlah,0,",",".")."</td>
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
     </tr>";
		echo "</table><br>";
		$sql="select a.kode_lokasi,a.kode_pp,a.kode_drk,a.kode_akun,b.nama as nama_akun,
		case when substring(a.periode,5,2)='01' then a.nilai else 0 end as n1,
		case when substring(a.periode,5,2)='02' then a.nilai else 0 end as n2,
		case when substring(a.periode,5,2)='03' then a.nilai else 0 end as n3,
		case when substring(a.periode,5,2)='04' then a.nilai else 0 end as n4,
		case when substring(a.periode,5,2)='05' then a.nilai else 0 end as n5,
		case when substring(a.periode,5,2)='06' then a.nilai else 0 end as n6,
		case when substring(a.periode,5,2)='07' then a.nilai else 0 end as n7,
		case when substring(a.periode,5,2)='08' then a.nilai else 0 end as n8,
		case when substring(a.periode,5,2)='09' then a.nilai else 0 end as n9,
		case when substring(a.periode,5,2)='10' then a.nilai else 0 end as n10,
		case when substring(a.periode,5,2)='11' then a.nilai else 0 end as n11,
		case when substring(a.periode,5,2)='12' then a.nilai else 0 end as n12,
		a.nilai as jumlah
from rra_pdrk_d a
inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
$this->filter
order by a.kode_akun ";
		
		$rs = $dbLib->execute($sql);
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  rowspan='2' align='center' class='header_laporan'>No</td>
     <td width='40'  rowspan='2' align='center' class='header_laporan'>Lokasi</td>
	 <td width='60' rowspan='2' align='center' class='header_laporan'>PP</td>
	 <td width='60' rowspan='2' align='center' class='header_laporan'>DRK</td>
	 <td width='80' rowspan='2' align='center' class='header_laporan'>Kode Akun</td>
	 <td width='200' rowspan='2' align='center' class='header_laporan'>Nama Akun</td>
	 <td colspan='12' align='center' class='header_laporan'>Sebelum Reprogramming</td>
	 <td width='90' rowspan='2' align='center' class='header_laporan'>Jumlah</td>

   </tr>
   <tr bgcolor='#CCCCCC'>
	 <td width='80'  align='center' class='header_laporan'>1</td>
	 <td width='80'  align='center' class='header_laporan'>2</td>
	 <td width='80'  align='center' class='header_laporan'>3</td>
	 <td width='80'  align='center' class='header_laporan'>4</td>
	 <td width='80'  align='center' class='header_laporan'>5</td>
	 <td width='80'  align='center' class='header_laporan'>6</td>
	 <td width='80'  align='center' class='header_laporan'>7</td>
	 <td width='80'  align='center' class='header_laporan'>8</td>
	 <td width='90'   align='center' class='header_laporan'>9</td>
	 <td width='80'  align='center' class='header_laporan'>10</td>
	 <td width='90'   align='center' class='header_laporan'>11</td>
	 <td width='80'  align='center' class='header_laporan'>12</td>
	  
     </tr>  ";
	
	 while ($row = $rs->FetchNextObject($toupper=false))
		{

		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
	  <td class='isi_laporan' align='center'>$row->kode_lokasi</td>
	 <td class='isi_laporan' >$row->kode_pp</td>
	  <td class='isi_laporan'>$row->kode_drk</td>
	 <td class='isi_laporan'>$row->kode_akun</td>
	 <td class='isi_laporan'>$row->nama_akun</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n1,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n2,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n3,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n4,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n5,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n6,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n7,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n8,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n9,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n10,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n11,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n12,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->jumlah,0,",",".")."</td>
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
     </tr>";
		echo "</table><br>";
		$sql="select a.kode_lokasi,a.kode_pp,a.kode_drk,a.kode_akun,b.nama as nama_akun,
		case when substring(a.periode,5,2)='01' then (case when a.dc='D' then a.saldo+a.nilai else a.saldo-a.nilai end) else 0 end as n1,
		case when substring(a.periode,5,2)='02' then (case when a.dc='D' then a.saldo+a.nilai else a.saldo-a.nilai end) else 0 end as n2,
		case when substring(a.periode,5,2)='03' then (case when a.dc='D' then a.saldo+a.nilai else a.saldo-a.nilai end) else 0 end as n3,
		case when substring(a.periode,5,2)='04' then (case when a.dc='D' then a.saldo+a.nilai else a.saldo-a.nilai end) else 0 end as n4,
		case when substring(a.periode,5,2)='05' then (case when a.dc='D' then a.saldo+a.nilai else a.saldo-a.nilai end) else 0 end as n5,
		case when substring(a.periode,5,2)='06' then (case when a.dc='D' then a.saldo+a.nilai else a.saldo-a.nilai end) else 0 end as n6,
		case when substring(a.periode,5,2)='07' then (case when a.dc='D' then a.saldo+a.nilai else a.saldo-a.nilai end) else 0 end as n7,
		case when substring(a.periode,5,2)='08' then (case when a.dc='D' then a.saldo+a.nilai else a.saldo-a.nilai end) else 0 end as n8,
		case when substring(a.periode,5,2)='09' then (case when a.dc='D' then a.saldo+a.nilai else a.saldo-a.nilai end) else 0 end as n9,
		case when substring(a.periode,5,2)='10' then (case when a.dc='D' then a.saldo+a.nilai else a.saldo-a.nilai end) else 0 end as n10,
		case when substring(a.periode,5,2)='11' then (case when a.dc='D' then a.saldo+a.nilai else a.saldo-a.nilai end) else 0 end as n11,
		case when substring(a.periode,5,2)='12' then (case when a.dc='D' then a.saldo+a.nilai else a.saldo-a.nilai end) else 0 end as n12,
		(case when a.dc='D' then a.saldo+a.nilai else a.saldo-a.nilai end) as jumlah
from rra_pdrk_d a
inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
$this->filter
order by a.kode_akun ";
		
		$rs = $dbLib->execute($sql);
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  rowspan='2' align='center' class='header_laporan'>No</td>
     <td width='40'  rowspan='2' align='center' class='header_laporan'>Lokasi</td>
	 <td width='60' rowspan='2' align='center' class='header_laporan'>PP</td>
	 <td width='60' rowspan='2' align='center' class='header_laporan'>DRK</td>
	 <td width='80' rowspan='2' align='center' class='header_laporan'>Kode Akun</td>
	 <td width='200' rowspan='2' align='center' class='header_laporan'>Nama Akun</td>
	 <td colspan='12' align='center' class='header_laporan'>Sebelum Reprogramming</td>
	 <td width='90' rowspan='2' align='center' class='header_laporan'>Jumlah</td>

   </tr>
   <tr bgcolor='#CCCCCC'>
	 <td width='80'  align='center' class='header_laporan'>1</td>
	 <td width='80'  align='center' class='header_laporan'>2</td>
	 <td width='80'  align='center' class='header_laporan'>3</td>
	 <td width='80'  align='center' class='header_laporan'>4</td>
	 <td width='80'  align='center' class='header_laporan'>5</td>
	 <td width='80'  align='center' class='header_laporan'>6</td>
	 <td width='80'  align='center' class='header_laporan'>7</td>
	 <td width='80'  align='center' class='header_laporan'>8</td>
	 <td width='90'   align='center' class='header_laporan'>9</td>
	 <td width='80'  align='center' class='header_laporan'>10</td>
	 <td width='90'   align='center' class='header_laporan'>11</td>
	 <td width='80'  align='center' class='header_laporan'>12</td>
	  
     </tr>  ";

	 while ($row = $rs->FetchNextObject($toupper=false))
		{

		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
	  <td class='isi_laporan' align='center'>$row->kode_lokasi</td>
	 <td class='isi_laporan' >$row->kode_pp</td>
	  <td class='isi_laporan'>$row->kode_drk</td>
	 <td class='isi_laporan'>$row->kode_akun</td>
	 <td class='isi_laporan'>$row->nama_akun</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n1,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n2,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n3,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n4,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n5,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n6,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n7,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n8,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n9,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n10,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n11,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n12,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->jumlah,0,",",".")."</td>
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}

?>
