<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_siswa_rptNilaiReg extends server_report_basic
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
		$kode_pp=$tmp[1];
		
		$sql="select nama from pp where kode_lokasi='$kode_lokasi' and kode_pp='$kode_pp' ";
		$rs = $dbLib->execute($sql);
		$row = $rs->FetchNextObject($toupper=false);
		$nama_pp=$row->nama;
		
		$sql="select a.no_bukti,a.kode_ta,a.kode_pp,a.kode_lokasi,a.no_reg,b.nama as nama_reg,a.nilai,a.keterangan
from sis_nilai_reg a
inner join sis_siswareg b on a.no_reg=b.no_reg and a.kode_lokasi=b.kode_lokasi
$this->filter
order by a.no_bukti,a.no_reg ";
		
		$rs = $dbLib->execute($sql);	
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("data nilai kelulusan",$this->lokasi."<br>".$nama_pp,"");
		echo "<table border='1' cellspacing='0' cellpadding='1' class='kotak'>
  <tr bgcolor='#CCCCCC'>
	<td  width='30' class='header_laporan' align='center'>No</td>
	<td  width='100' class='header_laporan' align='center'>No Bukti</td>
	<td  width='80' class='header_laporan' align='center'>Tahun Ajaran</td>
	<td  width='100' class='header_laporan' align='center'>No Registrasi</td>
    <td width='250' class='header_laporan' align='center'>Nama</td>
	<td width='100'  class='header_laporan' align='center'>Keterangan</td>	
    <td width='60' class='header_laporan' align='center'>Nilai</td>
	

	</tr>
";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			
	echo "<tr>
	 <td class='isi_laporan' align='center'>$i</td>
	 <td class='isi_laporan'>$row->no_bukti</td>
	 <td class='isi_laporan'>$row->kode_ta</td>
	 <td class='isi_laporan'>$row->no_reg</td>
     <td class='isi_laporan'>$row->nama_reg</td>
	 <td class='isi_laporan'>$row->keterangan</td>
	 <td class='isi_laporan' align='right'>$row->nilai</td>
     
 </tr>";
				
			
			
			$i=$i+1;
		}
		
			echo "
 </table><br>";
		return "";
	}
	
}

?>
