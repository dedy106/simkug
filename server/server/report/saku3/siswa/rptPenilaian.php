<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_siswa_rptPenilaian extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		
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
		$sql="select distinct a.no_bukti,a.kode_ta, b.nama as ta, a.kode_kelas, c.nama as kelas, a.kode_jenis, d.nama as jenis 
from sis_nilai_m a
inner join sis_ta b on a.kode_ta=b.kode_ta
inner join sis_kelas c on a.kode_kelas=c.kode_kelas
inner join sis_jenisnilai d on a.kode_jenis=d.kode_jenis

$this->filter ";

	$rs = $dbLib->execute($sql);	
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("laporan penilaian",$this->lokasi,"");
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table border='1' cellspacing='0' cellpadding='1' class='kotak'>
 
  <tr >
    <td height='23' colspan='7' class='header_laporan'><table  border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='99' class='header_laporan'>Tahun Ajaran</td>
        <td width='360' class='header_laporan'>: $row->ta</td>
      </tr>
	   <tr>
        <td width='150' class='header_laporan'>Kelas</td>
        <td width='360' class='header_laporan'>: $row->kelas</td>
      </tr>
	   <tr>
        <td width='150' class='header_laporan'>Jenis Penilaian</td>
        <td width='360' class='header_laporan'>: $row->jenis</td>
      </tr>	
 
    </table></td>
  </tr>
 
  
  <tr bgcolor='#CCCCCC'>
	<td  width='200' class='header_laporan' align='center'>NIS</td>
    <td width='300' class='header_laporan' align='center'>NAMA</td>
    <td width='150' class='header_laporan' align='center'>NILAI</td>
	</tr>

";
			
			$sql="select a.nis,b.nama,a.nilai
from sis_nilai a
inner join sis_siswa b on a.nis=b.nis
where a.no_bukti='$row->no_bukti'
 ";
			
			$rs1 = $dbLib->execute($sql);
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				
				echo "<tr>
	 <td class='isi_laporan'>$row1->nis</td>
     <td class='isi_laporan'>$row1->nama</td>
     <td class='isi_laporan'>$row1->nilai</td>

 </tr>";
				
			}
			echo "
 </table><br>";
			
			$i=$i+1;
		}
		return "";
	}
	
}

?>
