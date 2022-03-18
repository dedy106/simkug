<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_ppbs_rptDwOutPp extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$sql = "select 1 ";
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);		
		}
		error_log($sql."/".$totPage."-".$count."-".$this->rows);
		
		return $totPage;
	}
	
	function getHtml()
	{
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$tahun=$tmp[0];
		$kode_pp=$tmp[1];
		$jenis=$tmp[2];
		$trail=$tmp[3];
		
		$nama_file="outlook.xls";
		if ($jenis=="Excel")
		{
			
			header("Pragma: public");
			header("Expires: 0");
			header("Cache-Control: must-revalidate, post-check=0, pre-check=0"); 
			header("Content-Type: application/force-download");
			header("Content-Type: application/octet-stream");
			header("Content-Type: application/download");;
			header("Content-Disposition: attachment;filename=$nama_file"); 
			header("Content-Transfer-Encoding: binary ");
			
		}
		$sql="select nama from agg_pp where kode_pp='$kode_pp'";
		$rs2 = $dbLib->execute($sql);
		$row2 = $rs2->FetchNextObject($toupper=false);
		$nama_pp=$row2->nama;
		
		$sql = "select a.kode_lokasi,a.kode_pp,a.kode_akun,b.nama,
				   sum(case when substring(a.periode,5,2) between '01' and '12' then (case when b.jenis='Pendapatan' then a.nilai else a.nilai end) else 0 end) as total, 	
				   sum(case when substring(a.periode,5,2)='01' then (case when b.jenis='Pendapatan' then a.nilai else a.nilai end) else 0 end) as n1,
				   sum(case when substring(a.periode,5,2)='02' then (case when b.jenis='Pendapatan' then a.nilai else a.nilai end) else 0 end) as n2, 
				   sum(case when substring(a.periode,5,2)='03' then (case when b.jenis='Pendapatan' then a.nilai else a.nilai end) else 0 end) as n3, 
				   sum(case when substring(a.periode,5,2)='04' then (case when b.jenis='Pendapatan' then a.nilai else a.nilai end) else 0 end) as n4, 
				   sum(case when substring(a.periode,5,2)='05' then (case when b.jenis='Pendapatan' then a.nilai else a.nilai end) else 0 end) as n5, 
				   sum(case when substring(a.periode,5,2)='06' then (case when b.jenis='Pendapatan' then a.nilai else a.nilai end) else 0 end) as n6, 
				   sum(case when substring(a.periode,5,2)='07' then (case when b.jenis='Pendapatan' then a.nilai else a.nilai end) else 0 end) as n7, 
				   sum(case when substring(a.periode,5,2)='08' then (case when b.jenis='Pendapatan' then a.nilai else a.nilai end) else 0 end) as n8, 
				   sum(case when substring(a.periode,5,2)='09' then (case when b.jenis='Pendapatan' then a.nilai else a.nilai end) else 0 end) as n9, 
				   sum(case when substring(a.periode,5,2)='10' then (case when b.jenis='Pendapatan' then a.nilai else a.nilai end) else 0 end) as n10, 
				   sum(case when substring(a.periode,5,2)='11' then (case when b.jenis='Pendapatan' then a.nilai else a.nilai end) else 0 end) as n11, 
				   sum(case when substring(a.periode,5,2)='12' then (case when b.jenis='Pendapatan' then a.nilai else a.nilai end) else 0 end) as n12 
			from agg_outlook_d a
			inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
			$this->filter
			group by a.kode_lokasi,a.kode_pp,a.kode_akun,b.nama
			order by a.kode_akun";
		//echo $sql;
		
		if ($trail=="T")
		{
			$sql = "select a.kode_lokasi,a.kode_pp,a.kode_akun,b.nama,
				   sum(case when substring(a.periode,5,2) between '01' and '12' then (case when b.jenis='Pendapatan' then a.nilai else a.nilai end) else 0 end) as total, 	
				   sum(case when substring(a.periode,5,2)='01' then (case when b.jenis='Pendapatan' then a.nilai else a.nilai end) else 0 end) as n1,
				   sum(case when substring(a.periode,5,2)='02' then (case when b.jenis='Pendapatan' then a.nilai else a.nilai end) else 0 end) as n2, 
				   sum(case when substring(a.periode,5,2)='03' then (case when b.jenis='Pendapatan' then a.nilai else a.nilai end) else 0 end) as n3, 
				   sum(case when substring(a.periode,5,2)='04' then (case when b.jenis='Pendapatan' then a.nilai else a.nilai end) else 0 end) as n4, 
				   sum(case when substring(a.periode,5,2)='05' then (case when b.jenis='Pendapatan' then a.nilai else a.nilai end) else 0 end) as n5, 
				   sum(case when substring(a.periode,5,2)='06' then (case when b.jenis='Pendapatan' then a.nilai else a.nilai end) else 0 end) as n6, 
				   sum(case when substring(a.periode,5,2)='07' then (case when b.jenis='Pendapatan' then a.nilai else a.nilai end) else 0 end) as n7, 
				   sum(case when substring(a.periode,5,2)='08' then (case when b.jenis='Pendapatan' then a.nilai else a.nilai end) else 0 end) as n8, 
				   sum(case when substring(a.periode,5,2)='09' then (case when b.jenis='Pendapatan' then a.nilai else a.nilai end) else 0 end) as n9, 
				   sum(case when substring(a.periode,5,2)='10' then (case when b.jenis='Pendapatan' then a.nilai else a.nilai end) else 0 end) as n10, 
				   sum(case when substring(a.periode,5,2)='11' then (case when b.jenis='Pendapatan' then a.nilai else a.nilai end) else 0 end) as n11, 
				   sum(case when substring(a.periode,5,2)='12' then (case when b.jenis='Pendapatan' then a.nilai else a.nilai end) else 0 end) as n12 
			from agg_outlook_d a
			inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
			inner join relakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi
			$this->filter
			group by a.kode_lokasi,a.kode_pp,a.kode_akun,b.nama
			order by a.kode_akun";
		}
		//echo $sql;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();
		echo $AddOnLib->judul_laporan("laporan data outlook",$this->lokasi."<br>".$nama_pp,$AddOnLib->ubah_periode($periode));
		echo "<table width='1500' border='1' cellspacing='0' cellpadding='0' class='kotak'>
<tr bgcolor='#CCCCCC'>
<td width='25' height='25' class='header_laporan' align='center'>No</td>
<td width='70' class='header_laporan' align='center'>Kode Akun </td>
<td width='150' class='header_laporan' align='center'>Nama Akun</td>
<td width='70' class='header_laporan' align='center'>Kode PP </td>
    <td width='90' class='header_laporan' align='center'>Januari</td>
    <td width='90' class='header_laporan' align='center'>Februari</td>
    <td width='90' class='header_laporan' align='center'>Maret</td>
    <td width='90' class='header_laporan' align='center'>April</td>
<td width='90' class='header_laporan' align='center'>Mei</td>
    <td width='90' class='header_laporan' align='center'>Juni</td>
    <td width='90' class='header_laporan' align='center'>Juli</td>
    <td width='90' class='header_laporan' align='center'>Agustus</td>
<td width='90' class='header_laporan' align='center'>September</td>
    <td width='90' class='header_laporan' align='center'>Oktober</td>
    <td width='90' class='header_laporan' align='center'>November</td>
    <td width='90' class='header_laporan' align='center'>Desember</td>
    <td width='100' class='header_laporan' align='center'>Total</td>
  </tr>";
		$i=$start+1;
		$total=0; $n1=0; $n2=0; $n3=0; $n4=0; $n5=0; $n6=0; $n7=0; $n8=0; $n9=0; $n10=0; $n11=0; $n12=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$n1=$n1+$row->n1;
			$n2=$n2+$row->n2;
			$n3=$n3+$row->n3;
			$n4=$n4+$row->n4;
			$n5=$n5+$row->n5;
			$n6=$n6+$row->n6;
			$n7=$n7+$row->n7;
			$n8=$n8+$row->n8;
			$n9=$n9+$row->n9;
			$n10=$n10+$row->n10;
			$n11=$n11+$row->n11;
			$n12=$n12+$row->n12;
			$total=$total+$row->total;
			echo "<tr>
  <td height='23' class='isi_laporan' align='center'>$i</td>
  <td class='isi_laporan'>$row->kode_akun</td>
   <td class='isi_laporan'>";
  echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenUsulan('$row->kode_akun','$row->kode_pp','$row->kode_lokasi','$row->tahun');\">$row->nama</a>";
  echo "</td>
  <td class='isi_laporan'>$row->kode_pp</td>
  <td class='isi_laporan' align='right'>".number_format($row->n1,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n2,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n3,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n4,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n5,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n6,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n7,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n8,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n9,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n10,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n11,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n12,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->total,0,',','.')."</td>
</tr>";
			
			$i=$i+1;
		}
		echo "<tr>
  <td height='23' class='isi_laporan' align='center' colspan='4'>Total</td>
  <td class='isi_laporan' align='right'>".number_format($n1,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($n2,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($n3,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($n4,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($n5,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($n6,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($n7,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($n8,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($n9,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($n10,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($n11,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($n12,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($total,0,',','.')."</td>
</tr>";
		
		echo "</table>";
		return "";
	}
	
	
}

