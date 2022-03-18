<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_sapyakes_rptPrTotal extends server_report_basic
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

		$sql="select b.kode_bulan,b.nama,
		sum(case when a.jenis_tpkk<>'TPKK' then a.nilai else 0 end)  as premi,
		sum(case when a.jenis<>'group' and a.jenis_tpkk='TPKK' then a.nilai else 0 end)  as n1,
		sum(case when a.jenis='group' and a.jenis_tpkk='TPKK' then a.nilai else 0 end)  as n2
		from yk_bpjs_iuran a
		right JOIN yk_bulan b on substring(a.periode,5,2)=b.kode_bulan and (substring(a.periode,1,4) = '$periode') and a.kode_lokasi='$kode_lokasi'
		group by b.kode_bulan,b.nama,a.periode ";
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("laporan iuran premi kapitansi total",$this->lokasi,"Tahun ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
	 <td width='80' rowspan='2' align='center' class='header_laporan'>Bulan</td>
     <td width='150' rowspan='2' align='center' class='header_laporan'>Iuran Premi BPJS</td>
     <td colspan='3' align='center' class='header_laporan'>Kapitasi</td>
   </tr>
   <tr bgcolor='#CCCCCC'>
   <td width='90'  align='center' class='header_laporan'>Yakes</td>
   <td width='90'  align='center' class='header_laporan'>Non Yakes</td>
   <td width='90'  align='center' class='header_laporan'>Total</td>
     </tr>  ";
	 $t_kap=0;$t_n1=0;$t_n4=0;$t_n5=0;$t_n7=0;
	 while ($row = $rs->FetchNextObject($toupper=false))
	 {
		$t_kap=$row->n1+$row->n2;
		$t_n1+=$row->premi;
		 $t_n4+=$row->n1;
		 $t_n5+=$row->n2;
		 $t_n7+=$t_kap;
		 
		 
	 echo "<tr >
     <td class='isi_laporan' align='center'>$row->nama</td>
  <td class='isi_laporan' align='right'>".number_format($row->premi,0,",",".")."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n1,0,",",".")."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n2,0,",",".")."</td>
  <td class='isi_laporan' align='right'>".number_format($t_kap,0,",",".")."</td>

  </tr>";
		 $i=$i+1;
	 }
	 echo "<tr bgcolor='#CCCCCC'>
 
   <td class='header_laporan' align='center' >Total</td>
   <td class='isi_laporan' align='right'>".number_format($t_n1,0,",",".")."</td>
   <td class='isi_laporan' align='right'>".number_format($t_n4,0,",",".")."</td>
   <td class='isi_laporan' align='right'>".number_format($t_n5,0,",",".")."</td>
   <td class='isi_laporan' align='right'>".number_format($t_n7,0,",",".")."</td>

  </tr>";
	 echo "</table><br>";
	 echo "</div>";
	 return "";
	 
 }
 
}
?>
