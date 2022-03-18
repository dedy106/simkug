<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_siswa_rptSisPdd extends server_report_basic
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
		$periode=$tmp[2];
		
		$sql="select nama from pp where kode_lokasi='$kode_lokasi' and kode_pp='$kode_pp' ";
		$rs = $dbLib->execute($sql);
		$row = $rs->FetchNextObject($toupper=false);
		$nama_pp=$row->nama;
		
		$sql="select a.no_kas,a.keterangan,a.kode_pp,a.ref1,convert(varchar(20),a.tanggal,103) as tgl,a.keterangan,a.kode_lokasi
from kas_m a
$this->filter
order by a.no_kas ";
		
		$rs = $dbLib->execute($sql);	
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("daftar pdd calon siswa",$this->lokasi."<br>".$nama_pp,"");
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table border='1' cellspacing='0' cellpadding='1' class='kotak'>
 
  <tr >
    <td height='23' colspan='8' class='header_laporan'><table  border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='99' class='header_laporan'>No. Bukti</td>
        <td width='360' class='header_laporan'>: $row->no_kas</td>
      </tr>
	  <tr>
        <td width='99' class='header_laporan'>Tanggak</td>
        <td width='360' class='header_laporan'>: $row->tgl</td>
      </tr>
	   <tr>
        <td width='99' class='header_laporan'>Keterangan</td>
        <td width='360' class='header_laporan'>: $row->keterangan</td>
      </tr>
	  
    </table></td>
  </tr>
 
  
  <tr bgcolor='#CCCCCC'>
	<td  width='100' class='header_laporan' align='center'>ID Registrasi</td>
    <td width='300' class='header_laporan' align='center'>Nama</td>
    <td width='80' class='header_laporan' align='center'>Nilai</td>

	</tr>

";
			
			$sql="select a.nilai,a.nis,b.nama as nama_siswa,a.no_ref1
from sis_cd_d a
inner join sis_siswareg b on a.no_ref1=b.no_reg and a.kode_lokasi=b.kode_lokasi
where a.no_bukti='$row->no_kas' and a.kode_lokasi='$row->kode_lokasi'
 ";
		
			$rs1 = $dbLib->execute($sql);
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				
				echo "<tr>
	 <td class='isi_laporan'>$row1->no_ref1</td>
     <td class='isi_laporan'>$row1->nama_siswa</td>
	 <td class='isi_laporan' align='right'>".number_format($row1->nilai,0,',','.')."</td>

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
