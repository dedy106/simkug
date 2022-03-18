<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_siaga_hris_gaji_rptGjAkdhk extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$sql="select 1 ";
		error_log($sql);
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
		$kode_lokasi=$tmp[1];
		$nik_user=$tmp[2];
		
		$sql="select a.nik,a.nama,
		isnull(c.gdas,0) as gdas,isnull(c.tpos,0) as tpos,isnull(c.tpres,0) as tpres,isnull(c.tsus,0) as tsus,isnull(c.trans,0) as trans,
		isnull(c.ht,0) as ht,isnull(c.th,0) as th,
		case when a.flag_gaji='NON' then isnull(c.rem,0) else isnull(c.ht,0)+isnull(c.th,0) end as rem, 
		case when a.flag_gaji='NON' then isnull(c.rem,0)-isnull(c.tpres,0)-isnull(c.tsus,0) else isnull(isnull(c.ht,0)+isnull(c.th,0),0)*0.75 end as upah_dasar,
		case when a.flag_gaji='NON' then 0.0024*(isnull(c.rem,0)-isnull(c.tpres,0)-isnull(c.tsus,0)) else 0.0024*((isnull(c.ht,0)+isnull(c.th,0))*0.75) end as akdhk 
from gr_karyawan a 
inner join (select a.nik,sum(case a.kode_param when 'GDAS' then a.nilai else 0 end) as gdas,  
				  sum(case a.kode_param when 'TPOS' then a.nilai else 0 end) as tpos, 
				  sum(case a.kode_param when 'TPRES' then a.nilai else 0 end) as tpres, 
				  sum(case a.kode_param when 'TSUS' then a.nilai else 0 end) as tsus, 
				  sum(case a.kode_param when 'TRANS' then a.nilai else 0 end) as trans, 
				  sum(case a.kode_param when 'HT' then a.nilai else 0 end) as ht, 
				  sum(case a.kode_param when 'UHAR' then a.nilai*22 else 0 end) as th, 
				  sum(case when a.kode_param in ('GDAS','TPOS','TPRES','TSUS','TRANS') then a.nilai else 0 end) as rem,a.periode 
		    from gr_gaji_d a 
			group by nik,periode 
		   )c on a.nik=c.nik 
		   $this->filter and a.flag_akdhk='AKDHK'
  order by a.nik";



		
		$rs = $dbLib->execute($sql);
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("lampiran gaji",$this->lokasi);
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' >
  <tr bgcolor='#CCCCCC'>
  <td width='30'  align='center' class='header_laporan'>No</td>
  <td width='60'  align='center' class='header_laporan'>NIK</td>
  <td width='200'  align='center' class='header_laporan'>Nama</td>
  <td width='90'  align='center' class='header_laporan'>Gaji Dasar</td>
  <td width='90'  align='center' class='header_laporan'>Tunjangan Posisi</td>
  <td width='90'  align='center' class='header_laporan'>Tunjangan Prestasi</td>
  <td width='90'  align='center' class='header_laporan'>Tunjangan Khusus</td>
  <td width='90'  align='center' class='header_laporan'>Tunjangan Transport</td>
  <td width='90'  align='center' class='header_laporan'>Honor Tetap</td>
  <td width='90'  align='center' class='header_laporan'>Tunjangan Harian (22 hk)</td>
  <td width='90'  align='center' class='header_laporan'>Remunerasi</td>
  <td width='90'  align='center' class='header_laporan'>Upah Dasar</td>
  <td width='90'  align='center' class='header_laporan'>Iuran</td>

   </tr>";
//    $n1=0;$n2=0;$n3=0;$n4=0;$n5=0;$n6=0;$n7=0;$n8=0;$n9=0;$n10=0;$n11=0;$n12=0;$total=0;
   while ($row = $rs->FetchNextObject($toupper=false))
		{
			// $n1=$n1+$row->n1;
			// $n2=$n2+$row->n2;
			// $n3=$n3+$row->n3;
			// $n4=$n4+$row->n4;
			// $n5=$n5+$row->n5;
			// $n6=$n6+$row->n6;
			// $n7=$n7+$row->n7;
			// $n8=$n8+$row->n8;
			// $n9=$n9+$row->n9;
			// $n10=$n10+$row->n10;
			// $n11=$n11+$row->n11;
			// $n12=$n12+$row->n12;
			// $total=$total+$row->total;
			echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
	 <td class='isi_laporan'>$row->nik</td>
	 <td class='isi_laporan'>$row->nama</td>
	 <td class='isi_laporan' align='right'>".number_format($row->gdas,0,',','.')."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->tpos,0,',','.')."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->tpres,0,',','.')."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->tsus,0,',','.')."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->trans,0,',','.')."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->ht,0,',','.')."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->th,0,',','.')."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->rem,0,',','.')."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->upah_dasar,0,',','.')."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->akdhk,0,',','.')."</td>
	  </tr>";	 
			$i=$i+1;
		}
	
		echo "</div>";
		return "";
	}
	
}
?>
  
