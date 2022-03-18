<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_siswa_rptSisBillTk extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		
		$sql="select 1 ";
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);		
		}
		error_log($this->rows."/".$count."/".$totPage);
		return $totPage;
	}
	function getHtml()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$filter2=$tmp[0];
		$kode_lokasi=$tmp[1];
		$kode_pp=$tmp[2];
		$periode=$tmp[3];
		$jenis=$tmp[4];
		$nama_file="tagihan.xls";
		
		$sql="select nama from pp where kode_lokasi='$kode_lokasi' and kode_pp='$kode_pp' ";
		$rs = $dbLib->execute($sql);
		$row = $rs->FetchNextObject($toupper=false);
		$nama_pp=$row->nama;

		$sql="
		select kode_param from sis_param where kode_param LIKE '%_TK' and kode_param not in ('SPP','SPP_TK')
		union all
		select 'PRAKTIKUM' as kode_param  ";
		$res = $dbLib->execute($sql);
		$kolom = "";
		$td = "";
		$sumkolom = "sum(case when a.kode_param in ('SPP','SPP_TK') then a.nilai else 0 end) as n0 ";
		$i=1;
		$n0=0;
		while ($row2 = $res->FetchNextObject($toupper=false))
		{
			// ${"n" . $i} = 0;
			if($i == 1){
				$kolom .= " isnull(b.n$i,0) as n$i";
			}else{

				$kolom .= ", isnull(b.n$i,0) as n$i";
			}
			
			$sumkolom .= " , sum(case when a.kode_param in ('$row2->kode_param') then a.nilai else 0 end) as n$i ";
			$td .= "<td width='80' align='center' class='header_laporan'>".strtoupper($row2->kode_param)."</td>";
			$i++;
		}
		
//  echo $kolom."<br>";
//  echo $sumkolom."<br>";

		
		$sql="select a.no_bill,a.keterangan,b.nis,c.nama,e.kode_jur,c.kode_kelas,a.periode,substring(a.periode,5,2) as bulan,c.kode_akt,isnull(b.n0,0) as n0,
	    $kolom ,
		isnull(b.total,0) as total ,a.kode_pp
from sis_bill_m a
inner join (select a.nis,a.no_bill,a.kode_lokasi,
			       $sumkolom,
				   sum(a.nilai) as total
			from sis_bill_d a 
			$filter2
			group by a.nis,a.no_bill,a.kode_lokasi 
			)b on a.no_bill=b.no_bill and a.kode_lokasi=b.kode_lokasi
inner join sis_siswa c on b.nis=c.nis and b.kode_lokasi=c.kode_lokasi and a.kode_pp=c.kode_pp
inner join sis_kelas e on c.kode_kelas=e.kode_kelas and c.kode_lokasi=e.kode_lokasi and c.kode_pp=e.kode_pp
$this->filter 
order by c.kode_kelas,c.nis

 ";

//  echo $sql;
		

		if ($jenis=="Excell")
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
		$rs = $dbLib->execute($sql);
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("tagihan siswa",$this->lokasi."<br>".$nama_pp,"PERIODE ".$AddOnLib->ubah_periode($periode));
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' >
  <tr bgcolor='#CCCCCC'>
    <td width='30' align='center' class='header_laporan'>No</td>
	 <td width='100' align='center' class='header_laporan'>No Bukti</td>
		 
	 <td width='60' align='center' class='header_laporan'>NIM</td>
	 <td width='200' align='center' class='header_laporan'>Nama</td>
	 <td width='60' align='center' class='header_laporan'>Kode PP</td> 
	<td width='60' align='center' class='header_laporan'>Jurusan</td>
	<td width='60' align='center' class='header_laporan'>Kelas</td>
	<td width='60' align='center' class='header_laporan'>Tahun Ajaran</td>
	<td width='60' align='center' class='header_laporan'>Bulan</td>
	<td width='150' align='center' class='header_laporan'>Keterangan</td>
	<td width='80' align='center' class='header_laporan'>SPP</td>
	$td
	<td width='90' align='center' class='header_laporan'>Jumlah</td>
  </tr>";
		$n1=0;$n2=0;$n3=0;$n4=0;$n5=0;$n6=0;$n7=0;$n8=0;$n9=0;$total=0;
		$n10=0;$n11=0;$n12=0;$n13=0;$n14=0;$n15=0;$n16=0;$n17=0;$n18=0;$n19=0;$n0=0;$n20=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			// $i=0;
			// while ($row2 = $res->FetchNextObject($toupper=false))
			// {
			// 	${"n" . $i} = $row->{"n".$i};
			// 	$i++;
			// }
			
			$n0+=$row->n0;
			$n1+=$row->n1;
			$n2+=$row->n2;
			$n3+=$row->n3;
			$n4+=$row->n4;
			$n5+=$row->n5;
			$n6+=$row->n6;
			$n7+=$row->n7;
			$n8+=$row->n8;
			$n9+=$row->n9;
			$n10+=$row->n10;
			$n11+=$row->n11;
			$n12+=$row->n12;
			$n13+=$row->n13;
			$n14+=$row->n14;
			$n15+=$row->n15;
			$n16+=$row->n16;
			$n17+=$row->n17;
			$n18+=$row->n18;
			$n19+=$row->n19;
			$n20+=$row->n20;
			$total=$total+$row->total;
			
		
			echo "<tr>
   <td class='isi_laporan' align='center'>$i</td>
  		<td class='isi_laporan'>$row->no_bill</td>
			
			<td class='isi_laporan'>$row->nis</td>
			<td class='isi_laporan'>$row->nama</td>
			<td class='isi_laporan'>$row->kode_pp</td>		
			<td class='isi_laporan'>$row->kode_jur</td>
			<td class='isi_laporan'>$row->kode_kelas</td>
			
			<td class='isi_laporan'>$row->kode_akt</td>
			<td class='isi_laporan'>$row->bulan</td>
			<td class='isi_laporan'>$row->keterangan</td>
	<td class='isi_laporan' align='right'>".number_format($row->n0,0,",",".")."</td>
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
    <td class='isi_laporan' align='right'>".number_format($row->n13,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->n14,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->n15,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->n16,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->n17,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->n18,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->n19,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->n20,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->total,0,",",".")."</td>
  
  </tr>";	 
			$i=$i+1;
		}
		echo "<tr>
   <td class='header_laporan' align='center' colspan='10'>Total</td>
   	<td class='header_laporan' align='right'>".number_format($n0,0,",",".")."</td>
    <td class='header_laporan' align='right'>".number_format($n1,0,",",".")."</td>
    <td class='header_laporan' align='right'>".number_format($n2,0,",",".")."</td>
    <td class='header_laporan' align='right'>".number_format($n3,0,",",".")."</td>
	<td class='header_laporan' align='right'>".number_format($n4,0,",",".")."</td>
	<td class='header_laporan' align='right'>".number_format($n5,0,",",".")."</td>
	<td class='header_laporan' align='right'>".number_format($n6,0,",",".")."</td>
	<td class='header_laporan' align='right'>".number_format($n7,0,",",".")."</td>
	<td class='header_laporan' align='right'>".number_format($n8,0,",",".")."</td>
	<td class='header_laporan' align='right'>".number_format($n9,0,",",".")."</td>
	<td class='header_laporan' align='right'>".number_format($n10,0,",",".")."</td>
    <td class='header_laporan' align='right'>".number_format($n11,0,",",".")."</td>
    <td class='header_laporan' align='right'>".number_format($n12,0,",",".")."</td>
    <td class='header_laporan' align='right'>".number_format($n13,0,",",".")."</td>
	<td class='header_laporan' align='right'>".number_format($n14,0,",",".")."</td>
	<td class='header_laporan' align='right'>".number_format($n15,0,",",".")."</td>
	<td class='header_laporan' align='right'>".number_format($n16,0,",",".")."</td>
	<td class='header_laporan' align='right'>".number_format($n17,0,",",".")."</td>
	<td class='header_laporan' align='right'>".number_format($n18,0,",",".")."</td>
	<td class='header_laporan' align='right'>".number_format($n19,0,",",".")."</td>
	<td class='header_laporan' align='right'>".number_format($n20,0,",",".")."</td>
	  <td class='header_laporan' align='right'>".number_format($total,0,",",".")."</td>
 
  </tr>";	 
		echo "</table></div>";
		return "";
	}
	
}
?>
  
