<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_siswa_rptSiswa extends server_report_basic
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
		$sql="select distinct a.kode_akt,a.kode_kelas,b.nama as akt,c.nama as kls
from sis_siswa a
inner join sis_angkat b on a.kode_akt=b.kode_akt and a.kode_lokasi=b.kode_lokasi and a.kode_pp=b.kode_pp
inner join sis_kelas c on a.kode_kelas=c.kode_kelas and a.kode_lokasi=c.kode_lokasi and a.kode_pp=b.kode_pp
$this->filter
order by a.kode_akt ";

	$rs = $dbLib->execute($sql);	
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("daftar siswa",$this->lokasi,"");
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table border='1' cellspacing='0' cellpadding='1' class='kotak'>
 
  <tr >
    <td height='23' colspan='7' class='header_laporan'><table  border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='99' class='header_laporan'>Angkatan</td>
        <td width='360' class='header_laporan'>: $row->akt</td>
      </tr>
	   <tr>
        <td width='99' class='header_laporan'>Kelas</td>
        <td width='360' class='header_laporan'>: $row->kode_kelas - $row->kls</td>
      </tr>

	  
    </table></td>
  </tr>
 
  
  <tr bgcolor='#CCCCCC'>
	<td  width='50' class='header_laporan' align='center'>NIS</td>
    <td width='200' class='header_laporan' align='center'>Nama</td>
    <td width='250' class='header_laporan' align='center'>ID Bank</td>
	</tr>

";
			
			$sql="select a.nis,a.nama,a.id_bank
from sis_siswa a
where a.kode_akt='$row->kode_akt' and a.kode_kelas='$row->kode_kelas'
 ";
			
			$rs1 = $dbLib->execute($sql);
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				
				echo "<tr>
	 <td class='isi_laporan'>$row1->nis</td>
     <td class='isi_laporan'>$row1->nama</td>
	 <td class='isi_laporan'>$row1->id_bank</td>

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
