<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_sju16_rptPiutangSaldoPolis extends server_report_basic
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
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$urut=$tmp[2];
		$nik_user=$tmp[3];
		$sql="exec sp_sju_saldo_polis '$kode_lokasi','$periode','$nik_user';";
		$rs = $dbLib->execute($sql);	
		$sql="select a.kode_cust,b.nama,a.n1,a.n2,a.n3,a.n4,a.no_polis,c.no_dok,c.no_dok2,a.kode_lokasi
from sju_saldo_polis a
inner join sju_cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi
inner join sju_polis_m c on a.no_polis=c.no_polis and a.kode_lokasi=c.kode_lokasi
$this->filter and (a.n1<>0 or a.n2<>0 or a.n3<>0 or a.n4<>0) and a.nik_user='$nik_user'
order by $urut";
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("saldo piutang",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'   align='center' class='header_laporan'>No</td>
	 <td width='60'  align='center' class='header_laporan'>Kode</td>
	 <td width='250'  align='center' class='header_laporan'>Nama Customer</td>
	 <td width='100'  align='center' class='header_laporan'>No Register</td>
	 <td width='100'  align='center' class='header_laporan'>No Polis</td>
	 <td width='100'  align='center' class='header_laporan'>No Sertifikat</td>
	 <td width='100'  align='center' class='header_laporan'>Saldo Awal Piutang</td>
	 <td width='100'  align='center' class='header_laporan'>Piutang Bulan ini</td>
	 <td width='100'  align='center' class='header_laporan'>Pembayaran Bulan ini</td>
	 <td width='100'  align='center' class='header_laporan'>Saldo Akhir Piutang</td>
   </tr>
   ";
		$n1=0;$n2=0;$n3=0;$n4=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$n1+=$row->n1;
			$n2+=$row->n2;
			$n3+=$row->n3;
			$n4+=$row->n4;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
  	<td class='isi_laporan'>$row->kode_cust</td>
	 <td class='isi_laporan'>$row->nama</td>
	  <td class='isi_laporan'>$row->no_polis</td>
	   <td class='isi_laporan'>$row->no_dok</td>
	    <td class='isi_laporan'>$row->no_dok2</td>
	<td class='isi_laporan' align='right'>".number_format($row->n1,2,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n2,2,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->n3,2,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->n4,2,",",".")."</td>
	
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='isi_laporan' align='center' colspan='6'>Total</td>
       <td class='isi_laporan' align='right'>".number_format($n1,2,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($n2,2,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($n3,2,",",".")."</td>
   <td class='isi_laporan' align='right'>".number_format($n4,2,",",".")."</td>
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
