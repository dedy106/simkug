<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_tu_kegiatan_rptKegiatan extends server_report_basic
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
		$sql="select a.no_aju,a.keterangan,a.kode_panitia,a.tgl_mulai,a.tgl_selesai,c.nama,a.dasar,a.sasaran,a.tempat,date_format(a.tgl_mulai,'%d/%m/%Y') as tgl_mulai,date_format(a.tgl_selesai,'%d/%m/%Y') as tgl_selesai,a.kode_budget,a.nilai
from keg_aju_m a
 inner join keg_panitia_m c on a.kode_panitia=c.kode_panitia and a.kode_lokasi=c.kode_lokasi
$this->filter and a.progress<>'x' ";

	$rs = $dbLib->execute($sql);	
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("laporan kegiatan",$this->lokasi,"");
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table border='1' cellspacing='0' cellpadding='1' class='kotak'>
 
  <tr >
    <td height='23' colspan='7' class='header_laporan'><table  border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='99' class='header_laporan'>Kode Kegiatan</td>
        <td width='360' class='header_laporan'>: $row->no_aju</td>
      </tr>
	   <tr>
        <td width='150' class='header_laporan'>Deskripsi</td>
        <td width='360' class='header_laporan'>: $row->keterangan</td>
      </tr>	  
	   <tr>
        <td width='150' class='header_laporan'>Dasar</td>
        <td width='360' class='header_laporan'>: $row->dasar</td>
      </tr>	  
	   <tr>
        <td width='150' class='header_laporan'>Sasaran</td>
        <td width='360' class='header_laporan'>: $row->sasaran</td>
      </tr>	  
	   <tr>
        <td width='150' class='header_laporan'>Tempat</td>
        <td width='360' class='header_laporan'>: $row->tempat</td>
      </tr>	  
	  <tr>
        <td width='150' class='header_laporan'>Kode Panitia</td>
        <td width='360' class='header_laporan'>: $row->kode_panitia - $row->nama </td>
      </tr>
	   <tr>
        <td width='150' class='header_laporan'>Tgl Mulai</td>
        <td width='360' class='header_laporan'>: $row->tgl_mulai</td>
      </tr>	
	  <tr>
        <td width='150' class='header_laporan'>Tgl Selesai</td>
        <td width='360' class='header_laporan'>: $row->tgl_selesai</td>
      </tr>	  
	  <tr>
        <td width='150' class='header_laporan'>ID Budget</td>
        <td width='360' class='header_laporan'>: $row->kode_budget</td>
      </tr>	  
	  <tr>
        <td width='150' class='header_laporan'>Nilai Anggaran</td>
        <td width='360' class='header_laporan'>: ".number_format($row->nilai,0,",",".")."</td>
      </tr>
    </table></td>
  </tr>
 
  
  <tr bgcolor='#CCCCCC'>
	<td  width='300' class='header_laporan' align='center'>Kegiatan</td>
    <td width='90' class='header_laporan' align='center'>Nilai</td>
	</tr>

";
			
			$sql="select a.kegiatan,a.nilai
from keg_aju_d a
where a.no_aju='$row->no_aju' 
order by a.no_urut
 ";
			
			$rs1 = $dbLib->execute($sql);
			$total=0;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
							$total+=$row1->nilai;
				echo "<tr>
	 <td class='isi_laporan'>$row1->kegiatan</td>
    <td class='header_laporan' align='right'>".number_format($row1->nilai,0,',','.')."</td>

 </tr>";			
			}
			
			echo "<tr>
        <td class='header_laporan' colspan='1' align='right' >Total</td>
        <td class='header_laporan' colspan='1' align='right'>".number_format($total,0,",",".")."</td>
      </tr>	";

	  
	  echo"
	  
	  
 </table><br>";
			
			$i=$i+1;
		}
		return "";
	}
	
}

?>
