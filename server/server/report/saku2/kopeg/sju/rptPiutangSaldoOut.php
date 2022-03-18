<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_sju_rptPiutangSaldoOut extends server_report_basic
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
		$sql="exec sp_sju_saldo_cust '$kode_lokasi','$periode','$nik_user';";
		$rs = $dbLib->execute($sql);	
		$sql="select a.kode_cust,b.nama,a.n1,a.n2,a.n3,a.n4,a.kode_lokasi
from sju_saldo_cust a
inner join sju_cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi
where a.kode_lokasi='$kode_lokasi' and round(a.n4,0)>0 and a.nik_user='$nik_user'
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
	 <td width='359'  align='center' class='header_laporan'>Nama Tertanggung</td>
	 <td width='100'  align='center' class='header_laporan'>Piutang Premi</td>
   </tr>
   ";
		$n4=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			
			$n4+=$row->n4;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
  	<td class='isi_laporan'>$row->kode_cust</td>";
	echo "<td class='isi_laporan'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenSaldo('$row->kode_cust','$row->kode_lokasi');\">$row->nama</a></td>";
	 echo "
	  <td class='isi_laporan' align='right'>".number_format($row->n4,2,",",".")."</td>
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='isi_laporan' align='center' colspan='3'>Total</td>
      <td class='isi_laporan' align='right'>".number_format($n4,2,",",".")."</td>
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
