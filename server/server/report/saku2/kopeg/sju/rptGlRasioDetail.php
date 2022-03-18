<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
function calculate_string( $mathString ) 
	{
		$mathString = trim($mathString); // trim white spaces
		$mathString = preg_replace ('[^0-9\+-\*\/\(\) ]', '', $mathString); // remove any non-numbers chars; exception for math operators
		 
		$compute = create_function("", "return (" . $mathString . ");" );
		return 0 + $compute();
	}
class server_report_saku2_kopeg_sju_rptGlRasioDetail extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$mutasi=$tmp[1];
		$periode=$tmp[2];
		$sql = "select 1 ";
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
		$nik_user=$tmp[0];
		$periode=$tmp[1];
		$kode_lokasi=$tmp[2];
		$kode_fs=$tmp[4];
		$sql="exec sp_neraca 'FS1','A','S',5,'$periode','01','00','04','$nik_user'";
		
		$rs = $dbLib->execute($sql);
		$sql = "select kode_rasio,kode_lokasi,nama,keterangan,rumus,klp_rasio from db_rasio_m where kode_lokasi='$kode_lokasi' order by klp_rasio";
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("rasio keuangan",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table  border='1' cellspacing='0' cellpadding='0' class='kotak'>
<tr bgcolor='#CCCCCC'>
<td width='25' class='header_laporan'  align='center'>No</td>
<td width='100' class='header_laporan'  align='center'>Kelompok</td>
<td width='150' class='header_laporan'  align='center'>Rasio</td>
<td width='200' class='header_laporan'  align='center'>Rumus</td>
<td width='200' class='header_laporan'  align='center'>Perhitungan</td>
<td width='50' class='header_laporan'  align='center'>Hasil</td>
<td width='300' class='header_laporan'  align='center'>Keterangan</td>

  </tr>";
	
		$i=1;
		$sql2="delete from db_rasio_tmp where datediff(day,tgl_input,getdate()) >= 1 or nik_user = '$nik_user' ";
		$rs2 = $dbLib->execute($sql2);
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$sql = "select a.kode_neraca,b.nama,abs(round(b.n4,0)) as nilai 
from db_rasio_d a
inner join neraca_tmp b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi
where b.nik_user='$nik_user' and a.kode_rasio='$row->kode_rasio' and a.kode_lokasi='$row->kode_lokasi'";
			
			$rs1 = $dbLib->execute($sql);
			$rumus=$row->rumus;
			$txt_rumus=$row->rumus;
			$nilai_rumus=$row->rumus;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$tmp='$a'.$row1->kode_neraca;
				$rumus=str_replace($tmp,$row1->nilai,$rumus);
				$txt_rumus=str_replace($tmp,$row1->nama,$txt_rumus);
				$nilai_rumus=str_replace($tmp,number_format($row1->nilai,0,',','.'),$nilai_rumus);
			}
			$hasil=calculate_string($rumus);
			
			$sql2="insert into db_rasio_tmp(kode_rasio,kode_lokasi,nama,nilai,nik_user,tgl_input) 
				   values ('$row->kode_rasio','$kode_lokasi','$row->nama',$hasil,'$nik_user',getdate()) ";
			$rs2 = $dbLib->execute($sql2);
			
			echo "<tr>
    <td class='isi_laporan' align='center'>$i</td>
	<td class='isi_laporan' align='center'>$row->klp_rasio</td>
    <td height='20' class='isi_laporan'>";
	echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBb('$row->kode_akun','$row->kode_lokasi','$periode');\">$row->nama</a>";
	echo "</td><td class='isi_laporan' align='left'>$txt_rumus</td>";
	echo "</td><td class='isi_laporan' align='left'>$nilai_rumus</td>
    </td>
<td class='isi_laporan' align='center'>".number_format($hasil,2,',','.')."</td>
  <td class='isi_laporan' align='left'>$row->keterangan</td>
  </tr>";
			
			$i=$i+1;
		}
		
		echo "</table></div>";
		
		return "";
	}
	
}
?>
