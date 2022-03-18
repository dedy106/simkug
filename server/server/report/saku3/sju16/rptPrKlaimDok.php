<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_sju16_rptPrKlaimDok extends server_report_basic
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
		$nama_cab=$tmp[1];
		$sql="select a.no_klaim,a.kode_lokasi,c.kode_ref,d.nama as nama_ref,c.ket_dok,c.no_file,e.no_polis,f.nama as nama_cust
from sju_klaim a
inner join sju_dok_m b on a.no_klaim=b.no_klaim and a.kode_lokasi=b.kode_lokasi
inner join sju_dok_d c on b.no_dok=c.no_dok and b.kode_lokasi=c.kode_lokasi
inner join sju_ref d on c.kode_ref=d.kode_ref and c.kode_lokasi=d.kode_lokasi
inner join sju_polis_m e on a.no_polis=e.no_polis and a.kode_lokasi=e.kode_lokasi
inner join sju_cust f on e.kode_cust=f.kode_cust and e.kode_lokasi=f.kode_lokasi
$this->filter
order by a.no_klaim
";

		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("dokumen klaim",$this->lokasi,"");
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1000'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='80'  align='center' class='header_laporan'>No Klaim</td>
	  <td width='100'  align='center' class='header_laporan'>No Polis</td>
     <td width='150'  align='center' class='header_laporan'>Tertanggung</td>
	 <td width='40'  align='center' class='header_laporan'>Kode Ref</td>
	 <td width='100'  align='center' class='header_laporan'>Nama Ref</td>
	 <td width='100'  align='center' class='header_laporan'>Keterangan</td>
	 <td width='100'  align='center' class='header_laporan'>FIle Dokumen</td>
	  </tr>  ";
		$nilai=0;$nilai_nego=0;$tagihan=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai+=$row->nilai;
			$nilai_nego+=$row->nilai_nego;
			$nilai_final+=$row->nilai_final;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>$row->no_klaim</td>
	 <td class='isi_laporan'>$row->no_polis</td>
	 <td class='isi_laporan'>$row->nama_cust</td>
	 <td class='isi_laporan'>$row->kode_ref</td>
	  <td class='isi_laporan'>$row->nama_ref</td>
	   <td class='isi_laporan'>$row->ket_dok</td>
	<td class='isi_laporan'>$row->no_file</td>     
	 </tr>";
			$i=$i+1;
		}
		
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
