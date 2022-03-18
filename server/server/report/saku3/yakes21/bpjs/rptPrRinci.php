<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_yakes21_bpjs_rptPrRinci extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select 1";
		
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

		$sql="select a.kode_bulan,a.nama,isnull(b.pensiun,0) as pensiun,isnull(b.pegawai,0) as pegawai,
		isnull(c.n1,0) as n1,isnull(c.n2,0) as n2,isnull(c.n3,0) as n3
		from yk_bulan a
		left join (
		 select substring(a.periode,5,2) as kode_bulan,
		        sum(case when a.jenis='PENSIUN' then a.nilai else 0 end)  as pensiun, 
				sum(case when a.jenis='pegawai' then a.nilai else 0 end)  as pegawai
		       
		 from yk_bpjs_iuran a	 
		 where substring(a.periode,1,4) = '$periode'  $this->filter
		 group by substring(a.periode,5,2)
		 )b on a.kode_bulan=b.kode_bulan
		 
		 left join (
		 select substring(a.periode,5,2) as kode_bulan,       
		        sum(case when a.jenis='PENSIUN' and a.jenis_tpkk='TPKK' then a.nilai else 0 end)  as n1,
		        sum(case when a.jenis='pegawai' and a.jenis_tpkk='TPKK' then a.nilai else 0 end)  as n2,
		        sum(case when a.jenis='group' and a.jenis_tpkk='TPKK' then a.nilai else 0 end)  as n3
		 from yk_bpjs_kapitasi a	 
		 where substring(a.periode,1,4) = '$periode'  $this->filter
		 group by substring(a.periode,5,2)
		 )c on a.kode_bulan=c.kode_bulan 
		 
	order by a.kode_bulan ";


		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("laporan iuran premi kapitasi total",$this->lokasi,"Tahun ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
	 <td width='80' rowspan='2' align='center' class='header_laporan'>Bulan</td>
     <td colspan='3' align='center' class='header_laporan'>Iuran Premi BPJS</td>
     <td colspan='4' align='center' class='header_laporan'>Kapitasi</td>
   </tr>
   <tr bgcolor='#CCCCCC'>
   <td width='90'  align='center' class='header_laporan'>Karyawan</td>
   <td width='90'  align='center' class='header_laporan'>Pensiun</td>
   <td width='90'  align='center' class='header_laporan'>Total</td>
   <td width='90'  align='center' class='header_laporan'>Karyawan</td>
   <td width='90'  align='center' class='header_laporan'>Pensiun</td>
   <td width='90'  align='center' class='header_laporan'>Non Yakes</td>
   <td width='90'  align='center' class='header_laporan'>Total</td>
     </tr>  ";
	 $total=0;$jumalah=0;
	 while ($row = $rs->FetchNextObject($toupper=false))
	 {
		$t_pre=$row->pensiun+$row->pegawai;
		$t_kap=$row->n1+$row->n2+$row->n3;
		$t_n1+=$row->pegawai;
		 $t_n2+=$row->pensiun;
		 $t_n3+=$t_pre;
		 $t_n4+=$row->n1;
		 $t_n5+=$row->n2;
		 $t_n6+=$row->n3;
		 $t_n7+=$t_kap;
		 
		 
	 echo "<tr >
     <td class='isi_laporan' align='center'>$row->nama</td>
  <td class='isi_laporan' align='right'>".number_format($row->pegawai,0,",",".")."</td>
  <td class='isi_laporan' align='right'>".number_format($row->pensiun,0,",",".")."</td>
  <td class='isi_laporan' align='right'>".number_format($t_pre,0,",",".")."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n2,0,",",".")."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n1,0,",",".")."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n3,0,",",".")."</td>
  <td class='isi_laporan' align='right'>".number_format($t_kap,0,",",".")."</td>

  </tr>";
		 $i=$i+1;
	 }
	 echo "<tr bgcolor='#CCCCCC'>
 
   <td class='header_laporan' align='center' >Total</td>
   <td class='isi_laporan' align='right'>".number_format($t_n2,0,",",".")."</td>
   <td class='isi_laporan' align='right'>".number_format($t_n1,0,",",".")."</td>
   <td class='isi_laporan' align='right'>".number_format($t_n3,0,",",".")."</td>
   <td class='isi_laporan' align='right'>".number_format($t_n4,0,",",".")."</td>
   <td class='isi_laporan' align='right'>".number_format($t_n5,0,",",".")."</td>
   <td class='isi_laporan' align='right'>".number_format($t_n6,0,",",".")."</td>
   <td class='isi_laporan' align='right'>".number_format($t_n7,0,",",".")."</td>

  </tr>";
	 echo "</table><br>";
	 echo "</div>";
	 return "";
	 
 }
 
}
?>
