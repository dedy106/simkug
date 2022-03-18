<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;

class server_report_budget_rptAggAbauSum extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$sql="select count(a.no_abau) as jum
from agg_abau_m a
inner join agg_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi $this->filter";
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
		$nama_ver=$tmp[0];
		$ver=$tmp[1];
		$sql="select a.no_abau,a.kode_lokasi,a.tanggal,a.keterangan,a.kode_pp,a.tahun,b.nama as nama_pp,case when a.jenis='L' then 'LAMA' else 'BARU' end as jenis
from agg_abau_m a
inner join agg_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi $this->filter order by a.no_abau";
		error_log($sql);
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo $AddOnLib->judul_laporan("laporan pengajuan biaya norma variabel",$this->lokasi,$AddOnLib->ubah_periode($periode));
		echo "<div align='center'>"; 
		$jenis="";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$jenis=strtoupper($row->jenis);  
			echo "<table width='1700'  border='1' cellpadding='0' cellspacing='0' class='kotak'>
  <tr>
    <td colspan='25' style='padding:5px'><table width='100%' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td class='header_laporan' width='114'>No Bukti </td>
        <td class='header_laporan'>:&nbsp;$row->no_abau</td>
        </tr>
	 
      <tr>
        <td class='header_laporan'>Bisnis Unit </td>
        <td class='header_laporan'>:&nbsp;$row->kode_pp -&nbsp; $row->nama_pp</td>
      </tr>
      <tr>
        <td class='header_laporan'>Jenis</td>
        <td class='header_laporan'>:&nbsp;$jenis</td>
      </tr>
      <tr>
        <td class='header_laporan'>Tahun Anggaran   </td>
        <td class='header_laporan'>:&nbsp;$row->tahun</td>
      </tr>
	<tr>
        <td class='header_laporan'>Versi Anggaran   </td>
        <td class='header_laporan'>:&nbsp;$nama_ver</td>
      </tr>
    </table></td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='15' align='center' class='header_laporan'>No</td>
	<td width='40' align='center' class='header_laporan'>Kode Var </td>
    <td width='40' align='center' class='header_laporan'>No PK </td>
    <td width='200' align='center' class='header_laporan'>Nama PK  </td>
    <td width='50' align='center' class='header_laporan'>Kode DRK </td>
    <td width='200' align='center' class='header_laporan'>Nama DRK </td>
    <td width='50' align='center' class='header_laporan'>Kode RKA </td>
    <td width='200' align='center' class='header_laporan'>Nama RKA </td>
    <td width='40' align='center' class='header_laporan'>Kode PP </td>
    <td width='200' align='center' class='header_laporan'>Nama PP </td>
    <td width='50' align='center' class='header_laporan'>Kode Akun </td>
    <td width='200' align='center' class='header_laporan'>Nama Akun </td>
    <td width='80' align='center' class='header_laporan'>Januari</td>
	<td width='80' align='center' class='header_laporan'>Februari</td>
    <td width='80' align='center' class='header_laporan'>Maret</td>
    <td width='80' align='center' class='header_laporan'>April</td> 
    <td width='80' align='center' class='header_laporan'>Mei</td>
	<td width='80' align='center' class='header_laporan'>Juni</td>
    <td width='80' align='center' class='header_laporan'>Juli</td>
    <td width='80' align='center' class='header_laporan'>Agustus</td> 
    <td width='80' align='center' class='header_laporan'>September</td>
	<td width='80' align='center' class='header_laporan'>Oktober</td>
    <td width='80' align='center' class='header_laporan'>November</td>
    <td width='80' align='center' class='header_laporan'>Desember</td> 	
    <td width='80' align='center' class='header_laporan'>Total </td>
  </tr>
";
  
	  $sql1="select a.kode_var,a.kode_pk,a.kode_drk,a.kode_rka,a.kode_akun,a.kode_pp,
       b.nama as nama_pk,c.nama as nama_drk,d.nama as nama_rka,e.nama as nama_pp,f.nama as nama_akun,
       sum(case when substring(a.periode,5,2)='01' then a.nilai else 0 end) as agg01,
       sum(case when substring(a.periode,5,2)='02' then a.nilai else 0 end) as agg02,
       sum(case when substring(a.periode,5,2)='03' then a.nilai else 0 end) as agg03,
       sum(case when substring(a.periode,5,2)='04' then a.nilai else 0 end) as agg04,
       sum(case when substring(a.periode,5,2)='05' then a.nilai else 0 end) as agg05,
       sum(case when substring(a.periode,5,2)='06' then a.nilai else 0 end) as agg06,
       sum(case when substring(a.periode,5,2)='07' then a.nilai else 0 end) as agg07,
       sum(case when substring(a.periode,5,2)='08' then a.nilai else 0 end) as agg08,
       sum(case when substring(a.periode,5,2)='09' then a.nilai else 0 end) as agg09,
       sum(case when substring(a.periode,5,2)='10' then a.nilai else 0 end) as agg10,
       sum(case when substring(a.periode,5,2)='11' then a.nilai else 0 end) as agg11,
       sum(case when substring(a.periode,5,2)='12' then a.nilai else 0 end) as agg12,
       sum(case when substring(a.periode,5,2) between '01' and '12' then a.nilai else 0 end) as total 	
from agg_abau_d a
inner join agg_pk b on a.kode_pk=b.kode_pk 
inner join agg_drk c on a.kode_drk=c.kode_drk 
inner join agg_rka d on a.kode_rka=d.kode_rka 
inner join agg_pp e on a.kode_pp=e.kode_pp and a.kode_lokasi=e.kode_lokasi
inner join agg_masakun f on a.kode_akun=f.kode_akun and a.kode_lokasi=f.kode_lokasi
where a.no_abau='$row->no_abau' and a.kode_lokasi='$row->kode_lokasi' and a.progress='$ver'
group by a.kode_var,a.kode_pk,a.kode_drk,a.kode_rka,a.kode_akun,a.kode_pp,b.nama,c.nama,d.nama,e.nama,f.nama
order by a.kode_var ";
		error_log($sql1);
		$rs1 = $dbLib->execute($sql1);
		$j=1;
		$tagg01=0;$tagg02=0;$tagg03=0;$tagg04=0;$tagg05=0;$tagg06=0;
		$tagg07=0;$tagg08=0;$tagg09=0;$tagg10=0;$tagg11=0;$tagg12=0;
		$tot=0;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
			$agg01=number_format($row1->agg01,0,",",".");
			$agg02=number_format($row1->agg02,0,",",".");
			$agg03=number_format($row1->agg03,0,",",".");
			$agg04=number_format($row1->agg04,0,",",".");
			$agg05=number_format($row1->agg05,0,",",".");
			$agg06=number_format($row1->agg06,0,",",".");
			$agg07=number_format($row1->agg07,0,",",".");
			$agg08=number_format($row1->agg08,0,",",".");
			$agg09=number_format($row1->agg09,0,",",".");
			$agg10=number_format($row1->agg10,0,",",".");
			$agg11=number_format($row1->agg11,0,",",".");
			$agg12=number_format($row1->agg12,0,",",".");
			$total=number_format($row1->total,0,",",".");
			$tagg01=$tagg01+$row1->agg01;
			$tagg02=$tagg02+$row1->agg02;
			$tagg03=$tagg03+$row1->agg03;
			$tagg04=$tagg04+$row1->agg04;
			$tagg05=$tagg05+$row1->agg05;
			$tagg06=$tagg06+$row1->agg06;
			$tagg07=$tagg07+$row1->agg07;
			$tagg08=$tagg08+$row1->agg08;
			$tagg09=$tagg09+$row1->agg09;
			$tagg10=$tagg10+$row1->agg10;
			$tagg11=$tagg11+$row1->agg11;
			$tagg12=$tagg12+$row1->agg12;
			$tot=$tot+$row1->total;
			
			echo "<tr>
    <td align='center' class='isi_laporan'>$j</td>
	<td align='left' class='isi_laporan'>$row1->kode_var</td>
    <td align='left' class='isi_laporan'>$row1->kode_pk</td>
    <td align='left' class='isi_laporan'>$row1->nama_pk</td>
    <td align='left' class='isi_laporan'>$row1->kode_drk</td>
    <td align='left' class='isi_laporan'>$row1->nama_drk</td>
    <td align='left' class='isi_laporan'>$row1->kode_rka</td>
    <td align='left' class='isi_laporan'>$row1->nama_rka</td>
    <td align='left' class='isi_laporan'>$row1->kode_pp</td>
    <td align='left' class='isi_laporan'>$row1->nama_pp</td>
    <td align='left' class='isi_laporan'>$row1->kode_akun</td>
    <td align='left' class='isi_laporan'>$row1->nama_akun</td>
    <td align='right' class='isi_laporan'>$agg01</td>
    <td align='right' class='isi_laporan'>$agg02</td>
    <td align='right' class='isi_laporan'>$agg03</td
	<td align='right' class='isi_laporan'>$agg04</td>
    <td align='right' class='isi_laporan'>$agg05</td>
    <td align='right' class='isi_laporan'>$agg06</td>
	<td align='right' class='isi_laporan'>$agg07</td>
    <td align='right' class='isi_laporan'>$agg08</td>
    <td align='right' class='isi_laporan'>$agg09</td>
	<td align='right' class='isi_laporan'>$agg10</td>
    <td align='right' class='isi_laporan'>$agg11</td>
    <td align='right' class='isi_laporan'>$agg12</td>
    <td align='right' class='isi_laporan'>$total </td>
  </tr>";
		$j=$j+1;
		}
		$tagg01=number_format($tagg01,0,",",".");
		$tagg02=number_format($tagg02,0,",",".");
		$tagg03=number_format($tagg03,0,",",".");
		$tagg04=number_format($tagg04,0,",",".");
		$tagg05=number_format($tagg05,0,",",".");
		$tagg06=number_format($tagg06,0,",",".");
		$tagg07=number_format($tagg07,0,",",".");
		$tagg08=number_format($tagg08,0,",",".");
		$tagg09=number_format($tagg09,0,",",".");
		$tagg10=number_format($tagg10,0,",",".");
		$tagg11=number_format($tagg11,0,",",".");
		$tagg12=number_format($tagg12,0,",",".");
		$tot=number_format($tot,0,",",".");
	  echo " <tr bgcolor='#CCCCCC'>
    <td colspan='12' align='right' class='header_laporan'>Total&nbsp;</td>
    <td align='right' class='header_laporan'>$tagg01</td>
	<td align='right' class='header_laporan'>$tagg02</td>
    <td align='right' class='header_laporan'>$tagg03</td>
    <td align='right' class='header_laporan'>$tagg04</td> 
    <td align='right' class='header_laporan'>$tagg05</td>
	<td align='right' class='header_laporan'>$tagg06</td>
    <td align='right' class='header_laporan'>$tagg07</td>
    <td align='right' class='header_laporan'>$tagg08</td> 
    <td align='right' class='header_laporan'>$tagg09</td>
	<td align='right' class='header_laporan'>$tagg10</td>
    <td align='right' class='header_laporan'>$tagg11</td>
    <td align='right' class='header_laporan'>$tagg12</td> 	
    <td align='right' class='header_laporan'>$tot </td>
  </tr> </table><br>";
			
			$i=$i+1;
		}
		echo "</div>";
			
		return "";
	}
	
}
?>
