<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_dikti_rptSaldo extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
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
		$sql="select a.kode_lokasi,a.kode_kelas,a.kode_akt,a.kode_jur,a.kode_jur,a.nim,a.nama,a.no_bill,a.akun_piutang,a.tot_bill-isnull(b.tot_lunas,0) as saldo,a.kode_param,a.idx 
		FROM 
		(
				select a.kode_lokasi,c.kode_kelas,c.kode_akt,c.kode_jur,a.nim,c.nama,a.no_bill,a.akun_piutang,a.kode_param,d.idx,sum(a.nilai) as tot_bill 
			from dikti_bill_d a 
				inner join dikti_mhs c on a.nim=c.nim and a.kode_lokasi=c.kode_lokasi 
				inner join dikti_param d on a.kode_param = d.kode_param and a.kode_lokasi=d.kode_lokasi 				
				group by a.kode_lokasi,c.kode_kelas,c.kode_akt,c.kode_jur,a.nim,c.nama,a.no_bill,a.akun_piutang,a.kode_param,d.idx 
		) a 				 
		LEFT JOIN 					 
		( 
				select no_bill,nim,kode_lokasi,kode_param,sum(case dc when 'D' then nilai else -nilai end) as tot_lunas 
			  from dikti_bill_rekon 
				group by nim,no_bill,kode_lokasi,kode_param 
		) b on a.nim=b.nim and a.no_bill=b.no_bill and a.kode_param=b.kode_param

		$this->filter and (a.tot_bill-isnull(b.tot_lunas,0)) > 0 
		ORDER by a.nim,a.idx ";
		echo $sql;

		$rs = $dbLib->execute($sql);	
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("saldo mahasiswa",$this->lokasi,"PERIODE ".$ADDTKOnLib->ubah_periode($periode));
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' >
  <tr bgcolor='#CCCCCC'>
    <td width='30' align='center' class='header_laporan'>No</td>
    <td width='150' align='center' class='header_laporan'>NIM</td>
	<td width='250' align='center' class='header_laporan'>Nama</td>
	<td width='250' align='center' class='header_laporan'>No BILL</td>
	<td width='150' align='center' class='header_laporan'>Akun Piutang</td>
	<td width='250' align='center' class='header_laporan'>Parameter</td>
	<td width='250' align='center' class='header_laporan'>Saldo</td>
	
   </tr>";
			while ($row = $rs->FetchNextObject($toupper=false))
		{
			
			echo "<tr>
   <td class='isi_laporan' align='center'>$i</td>
   <td class='isi_laporan'>$row->nim</td>
   <td class='isi_laporan'>$row->nama</td>
   <td class='isi_laporan'>$row->no_bill</td>
   <td class='isi_laporan'>$row->akun_piutang</td>
   <td class='isi_laporan'>$row->kode_param</td>
   <td class='isi_laporan' align='right'>".number_format($row->saldo,0,",",".")."</td>
   </tr>";	 
			$i=$i+1;
		}
	
		echo "</table></div>";
		return "";
	}
	
}
?>
  
