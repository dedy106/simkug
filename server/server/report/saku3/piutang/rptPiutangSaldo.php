<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_piutang_rptPiutangSaldo extends server_report_basic
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
		$periode=$tmp[0];
		$kode_lokasi=$tmp[1];
		$nik_user=$tmp[2];
		$sql="exec sp_exs_piutang '$kode_lokasi','$periode','$nik_user'";
		$rs = $dbLib->execute($sql);	
		
		$sql="select a.kode_akun,a.kode_lokasi,b.nama as nama_akun,
        ISNULL(a.n2,0) as n2,ISNULL(a.n3,0) as n3,ISNULL(a.n4,0) as n4
from exs_piutang a
inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
$this->filter and a.nik_user='$nik_user'
order by a.kode_akun ";
		
		$rs = $dbLib->execute($sql);		
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("saldo piutang",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table  border='1' cellpadding='0' cellspacing='0' class='kotak'>
  <tr bgcolor='#CCCCCC'>
    <td width='30'  align='center' class='header_laporan'>No</td>
    <td width='80'  align='center' class='header_laporan'>Kode Akun</td>
    <td width='300'  align='center' class='header_laporan'>Nama Akun</td>
    <td width='100' align='center' class='header_laporan'>Debet </td>
	<td width='100' align='center' class='header_laporan'>Kredit </td>
	<td width='100' align='center' class='header_laporan'>Saldo </td>
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
     <td class='isi_laporan' align='center' class='isi_laporan'>$i</td>
    <td class='isi_laporan' class='isi_laporan'>$row->kode_akun</td>
	 <td class='isi_laporan' class='isi_laporan'>$row->nama_akun</td>
	 <td class='isi_laporan' align='right' class='isi_laporan'>".number_format($row->n2,0,",",".")."</td>
	 <td class='isi_laporan' align='right' class='isi_laporan'>".number_format($row->n3,0,",",".")."</td>
	 <td class='isi_laporan' align='right' class='isi_laporan'>".number_format($row->n2+$row->n3,0,",",".")."</td>
     </tr>";
			$i=$i+1;
		}
		echo "<tr>
    <td colspan='3'>&nbsp;</td>
	 <td class='isi_laporan' align='right'>".number_format($n2,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($n3,0,",",".")."</td>
	   <td class='isi_laporan' align='right'>".number_format($n2+$n3,0,",",".")."</td>
  </tr>
	 ";
		
		echo "</table>";
		echo "</div>";
		return "";
		
	}
	
}
?>
