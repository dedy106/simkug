<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_rra_rptAggPdrk2 extends server_report_basic
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
		$sql="select a.kode_lokasi,b.nama as loc,a.kode_pp,c.nama as pp,a.kode_drk,a.kode_akun,d.nama as akun,
		case when substring(a.periode,5,2)='01' then a.nilai else 0 end as '1',
		case when substring(a.periode,5,2)='02' then a.nilai else 0 end as '2',
		case when substring(a.periode,5,2)='03' then a.nilai else 0 end as '3',
		case when substring(a.periode,5,2)='04' then a.nilai else 0 end as '4',
		case when substring(a.periode,5,2)='05' then a.nilai else 0 end as '5',
		case when substring(a.periode,5,2)='06' then a.nilai else 0 end as '6',
		case when substring(a.periode,5,2)='07' then a.nilai else 0 end as '7',
		case when substring(a.periode,5,2)='08' then a.nilai else 0 end as '8',
		case when substring(a.periode,5,2)='09' then a.nilai else 0 end as '9',
		case when substring(a.periode,5,2)='10' then a.nilai else 0 end as '10',
		case when substring(a.periode,5,2)='11' then a.nilai else 0 end as '11',
		case when substring(a.periode,5,2)='12' then a.nilai else 0 end as '12'
		
from rra_pdrk_d a
inner join lokasi b on a.kode_lokasi=b.kode_lokasi
inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
inner join masakun d on a.kode_akun=d.kode_akun
 $this->filter ";

 echo $sql;
 
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("reprogramming anggaran",$this->lokasi);
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  rowspan='2' align='center' class='header_laporan'>No</td>
     <td width='150'  rowspan='2' align='center' class='header_laporan'>Lokasi</td>
	 <td width='150' rowspan='2' align='center' class='header_laporan'>PP</td>
	 <td width='150' rowspan='2' align='center' class='header_laporan'>DRK</td>
	 <td width='60' rowspan='2' align='center' class='header_laporan'>Akun</td>
	 <td colspan='2' align='center' class='header_laporan'>Reprogramming</td>

   </tr>
   <tr bgcolor='#CCCCCC'>
	 <td width='90' colspan='2' align='center' class='header_laporan'>1</td>
	 <td width='90' colspan='2' align='center' class='header_laporan'>2</td>
	 <td width='90' colspan='2' align='center' class='header_laporan'>3</td>
	 <td width='90' colspan='2' align='center' class='header_laporan'>4</td>
	 <td width='90' colspan='2' align='center' class='header_laporan'>5</td>
	 <td width='90' colspan='2' align='center' class='header_laporan'>6</td>
	 <td width='90' colspan='2' align='center' class='header_laporan'>7</td>
	 <td width='90' colspan='2' align='center' class='header_laporan'>8</td>
	 <td width='90' colspan='2'  align='center' class='header_laporan'>9</td>
	 <td width='90' colspan='2' align='center' class='header_laporan'>10</td>
	 <td width='90' colspan='2'  align='center' class='header_laporan'>11</td>
	 <td width='90' colspan='2' align='center' class='header_laporan'>12</td>
	  
     </tr>  ";
		$nilai=0;  $nilai_ppn=0;  $byr=0; $nilai_or=0; $bdd=0; $saldo=0; $nilai_pph=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai+=$row->nilai;
			$nilai_or+=$row->nilai_or;
			$bdd+=$row->bdd;
			$saldo+=$row->saldo;
			$nilai_ppn+=$row->nilai_ppn;
			$nilai_pph+=$row->nilai_pph;
			$byr+=$row->byr;
			$p_or+=$row->p_or;
			$r_or+=$row->r_or;

		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
	  <td class='isi_laporan' align='center'>$row->loc</td>
	 <td class='isi_laporan' >$row->pp</td>
	  <td class='isi_laporan'>$row->kode_drk</td>
	 <td class='isi_laporan'>$row->akun</td>
	 <td class='isi_laporan' align='right'>".number_format($row->'1',0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->'2',0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->'3',0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->'4',0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->'5',0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->'6',0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->'7',0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->'8',0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->'9',0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->'10',0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->'11',0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->'12',0,",",".")."</td>
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
