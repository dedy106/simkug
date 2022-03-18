<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_gl_rptLRTuAgg extends server_report_basic
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
		$periode=$tmp[1];
		$nik_user=$tmp[0];
		$bentuk=$tmp[2];
		$level_lap=$tmp[3];
		$nama_form=$tmp[4];
		$sql = "select kode_neraca,kode_fs,kode_lokasi,nama,tipe,level_spasi,
					case jenis_akun when  'Pendapatan' then -n1 else n1 end as n1,
					case jenis_akun when  'Pendapatan' then -n2 else n2 end as n2,
					case jenis_akun when  'Pendapatan' then -n3 else n3 end as n3,
					case jenis_akun when  'Pendapatan' then -n4 else n4 end as n4,
				    case jenis_akun when  'Pendapatan' then -n5 else n5 end as n5,
					case jenis_akun when  'Pendapatan' then -n6 else n6 end as n6
			from neraca_tmp 
			where modul='L' and nik_user='$nik_user' and level_lap<=$level_lap
			order by rowindex ";
		
		$rs = $dbLib->execute($sql);		
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$i = $start+1;
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("labarugi anggaran",$this->lokasi,$AddOnLib->ubah_periode($periode));
		echo "<table  border='1' cellpadding='0' cellspacing='0' class='kotak'>
    <tr bgcolor='#CCCCCC'>
      <td width='20'  class='header_laporan' align='center'>No</td>
     <td width='200' height='25'  class='header_laporan' align='center'>Nama</td>
     <td width='90' class='header_laporan' align='center'>Target Tahun</td>
      <td width='90' class='header_laporan' align='center'>Target s.d Bulan Berjalan</td>
      <td width='90' class='header_laporan' align='center'>RKA Bulan Berjalan</td>
	  <td width='90' class='header_laporan' align='center'>Realisasi s.d Bulan Berjalan</td>
	<td width='90' class='header_laporan' align='center'>Realisasi Bulan Berjalan</td>
	<td width='90' class='header_laporan' align='center'>Realisasi Bulan Lalu</td>
	<td width='60' class='header_laporan' align='center'>Growth</td>
	<td width='60' class='header_laporan' align='center'>Pencapaian</td>
	<td width='90' class='header_laporan' align='center'>Sisa Anggaran Tahun</td>
    </tr>";
		
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			
			$persen1=0;$persen2=0;
			if ($row->n6!=0)
			{
				$persen1=($row->n5/$row->n6)*100;
			}
			if ($row->n1!=0)
			{
				$persen2=($row->n4/$row->n1)*100;
			}
			if ($row->n1==0)
			{
				$sisa=0;
			}
			else
			{
				$sisa=$row->n1-$row->n4;
			}
			echo "<tr>
      <td class='isi_laporan'><div align='center'>$i</div></td>
    
      <td height='20' class='isi_laporan'>$row->nama</td>
        <td class='isi_laporan' align='right'>".number_format($row->n1,0,',','.')."</td>
	    <td class='isi_laporan' align='right'>".number_format($row->n2,0,',','.')."</td>
		<td class='isi_laporan' align='right'>".number_format($row->n3,0,',','.')."</td>
		<td class='isi_laporan' align='right'>".number_format($row->n4,0,',','.')."</td>
		<td class='isi_laporan' align='right'>".number_format($row->n5,0,',','.')."</td>
		<td class='isi_laporan' align='right'>".number_format($row->n6,0,',','.')."</td>
		<td class='isi_laporan' align='right'>".number_format($persen1,2,',','.')."</td>
		<td class='isi_laporan' align='right'>".number_format($persen2,2,',','.')."</td>
		<td class='isi_laporan' align='right'>".number_format($sisa,0,',','.')."</td>
		</tr>";
			$i=$i+1;
		}
		
		echo "</table></div>";
		return "";
	}
	
}
?>
