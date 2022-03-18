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
class server_report_saku2_investasi_rptRekapJenis extends server_report_basic
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
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$nik_user=$tmp[2];
		
		$sql="exec sp_neraca_inv '$kode_lokasi','FS1','$periode','$nik_user'";
		
		$rs = $dbLib->execute($sql);		
		$sql = "select kode_neraca,kode_fs,kode_lokasi,nama,tipe,level_spasi,n1,n2,n3
			from neraca_tmp 
			where nik_user='$nik_user' 
			order by rowindex ";
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("KOMPOSISI BERDASARKAN JENIS INVESTASI",$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr align='center' bgcolor='#dbeef3'>
    <td width='400' class='header_laporan'>Kelompok Aset dan Jenis Investasi</td>
    <td width='90' class='header_laporan'>Harga Perolehan</td>
    <td width='90' class='header_laporan'>Nilai Buku</td>
    <td width='90' class='header_laporan'>Nilai Wajar</td>
    <td width='90' class='header_laporan'>Komposisi Nilai Wajar</td>
   </tr>";
		
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$persen1="-'";
			if ($row->n2 > 0)
			{
				$persen1=($row->n2 *100 )/ $row->n4;
			}
			
			$n1="";	$n2="";	$n3="";	
			if ($row->tipe!="Header" && $row->nama!="." && $row->nama!="")
			{
				$n1=number_format($row->n1,0,",",".");
				$n2=number_format($row->n2,0,",",".");
				$n3=number_format($row->n3,0,",",".");
			}
		
			echo "<tr>
    <td class='isi_laporan'>";
			echo fnSpasi($row->level_spasi);
			echo $row->nama;
			echo "</td>
     <td valign='top' class='isi_laporan' align='right'>$n1</td>
    <td valign='top' class='isi_laporan' align='right'>$n2</td>
   <td valign='top' class='isi_laporan' align='right'>$n3</td>
    <td valign='top' class='isi_laporan' align='center'>".number_format($persen1,0,',','.')."</td>
  </tr>";
			$i=$i+1;
		}
	
	
		
		echo "</div>";
		return "";
	}
	
}
?>
