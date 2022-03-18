<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_tu_kegiatan_rptPanitia extends server_report_basic
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
		$sql="select a.kode_panitia,a.nama,a.pic,a.no_tel,b.nama as nampic	
from keg_panitia_m a
 inner join karyawan b on a.pic=b.nik and a.kode_lokasi=b.kode_lokasi
$this->filter ";

	$rs = $dbLib->execute($sql);	
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("laporan panitia kegiatan",$this->lokasi,"");
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table border='1' cellspacing='0' cellpadding='1' class='kotak'>
 
  <tr >
    <td height='23' colspan='7' class='header_laporan'><table  border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='99' class='header_laporan'>Kode Panitia</td>
        <td width='360' class='header_laporan'>: $row->kode_panitia</td>
      </tr>
	   <tr>
        <td width='150' class='header_laporan'>Nama Panitia</td>
        <td width='360' class='header_laporan'>: $row->nama</td>
      </tr>	   <tr>
        <td width='150' class='header_laporan'>PIC</td>
        <td width='360' class='header_laporan'>: $row->pic - $row->nampic</td>
      </tr>
	   <tr>
        <td width='150' class='header_laporan'>No. Telp</td>
        <td width='360' class='header_laporan'>: $row->no_tel</td>
      </tr>
    </table></td>
  </tr>
 
  
  <tr bgcolor='#CCCCCC'>
	<td  width='200' class='header_laporan' align='center'>NAMA</td>
    <td width='300' class='header_laporan' align='center'>JABATAN</td>
	</tr>

";
			
			$sql="select a.anggota,a.jabatan
from keg_panitia_d a
where a.kode_panitia='$row->kode_panitia'
order by a.no_urut
 ";
			
			$rs1 = $dbLib->execute($sql);
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				
				echo "<tr>
	 <td class='isi_laporan'>$row1->anggota</td>
     <td class='isi_laporan'>$row1->jabatan</td>

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
