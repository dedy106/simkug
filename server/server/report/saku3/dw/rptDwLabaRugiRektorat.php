<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
function fnSpasi($level)
{
	$tmp="";
	for ($i=1; $i<=$level; $i++)
	{
		$tmp=$tmp."&nbsp;&nbsp;&nbsp;&nbsp;";
	}
	return $tmp;
}
class server_report_saku3_dw_rptDwLabaRugiRektorat extends server_report_basic
{
	
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$mutasi=$tmp[1];
		$periode=$tmp[2];
		$sql = "select 1";
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);		
		}
		error_log($sql);
		return $totPage;
	}
	function getHtml()
	{
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		
		
		
		
		$sql = "select a.kode_neraca,a.kode_fs,a.kode_lokasi,a.nama,a.tipe,a.level_spasi,
					case a.jenis_akun when  'Pendapatan' then -a.n1 else a.n1 end as n1,
					case a.jenis_akun when  'Pendapatan' then -a.n2 else a.n2 end as n2,
					case a.jenis_akun when  'Pendapatan' then -a.n3 else a.n3 end as n3,
					case a.jenis_akun when  'Pendapatan' then -a.n4 else a.n4 end as n4,
					case a.jenis_akun when  'Pendapatan' then -a.n5 else a.n5 end as n5,
					case a.jenis_akun when  'Pendapatan' then -a.n6 else a.n6 end as n6,
					case a.jenis_akun when  'Pendapatan' then -a.n7 else a.n7 end as n7
			from exs_neraca_rektor a
			$this->filter and a.modul='L'
			order by a.rowindex ";
		$rs = $dbLib->execute($sql);		
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$i = $start+1;
		$AddOnLib=new server_util_AddOnLib();
		
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("laporan laba rugi rektorat",$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
		echo "<table  border='1' cellpadding='0' cellspacing='0' class='kotak'>
    <tr bgcolor='#CCCCCC'>
     <td width='350' height='25'  class='header_laporan' align='center'>Keterangan</td>
     <td width='100' class='header_laporan' align='center'>RKA</td>
      <td width='100' class='header_laporan' align='center'>RKA s.d Bulan Berjalan</td>
  	  <td width='100' class='header_laporan' align='center'>Realisasi Bulan Berjalan</td>
	<td width='100' class='header_laporan' align='center'>Realisasi s.d Bulan Berjalan</td>
    </tr>
	<tr bgcolor='#CCCCCC'>
      <td height='25'  class='header_laporan' align='center'>&nbsp;</td>
      <td class='header_laporan' align='center'>1</td>
      <td class='header_laporan' align='center'>2</td>
      <td class='header_laporan' align='center'>3</td>
      <td class='header_laporan' align='center'>4</td>
   
    </tr>";
		
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			
			$persen1=0;$persen2=0;$persen3=0;
			if ($row->n3!=0)
			{
				$persen1=($row->n1/$row->n3)*100;
			}
			if ($row->n4!=0)
			{
				$persen2=($row->n1/$row->n4)*100;
			}
			if ($row->n2!=0)
			{
				$persen3=($row->n1-$row->n2)/$row->n2*100;
			}
			echo "<tr>
    
      <td height='20' class='isi_laporan'>";
			echo fnSpasi($row->level_spasi);
			echo $row->nama;
			echo "</td>";
			
			echo "<td class='isi_laporan' align='right'>".number_format($row->n5,0,',','.')."</td>
	    <td class='isi_laporan' align='right'>".number_format($row->n6,0,',','.')."</td>
		<td class='isi_laporan' align='right'>".number_format($row->n2-$row->n3,0,',','.')."</td>
		<td class='isi_laporan' align='right'>".number_format($row->n4,0,',','.')."</td>";
			
		
			
			$i=$i+1;
		}
		
		echo "</table></div>";
		return "";
	}
	
}
?>
