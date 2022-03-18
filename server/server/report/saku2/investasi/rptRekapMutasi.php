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
class server_report_saku2_investasi_rptRekapMutasi extends server_report_basic
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
		
		$sql="exec sp_neraca_mutasi '$kode_lokasi','FS3','$periode','$nik_user'";
		$rs = $dbLib->execute($sql);		
		$sql = "select kode_neraca,kode_fs,kode_lokasi,nama,tipe,level_spasi,n1,n2,n3,n4
			from neraca_tmp 
			where nik_user='$nik_user' 
			order by rowindex ";
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("KOMPOSISI BERDASARKAN JENIS INVESTASI",$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
		echo "<table width='800' border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr bgcolor='#dbeef3'>
    <td width='250' rowspan='2' align='center' class='header_laporan'>Alokasi Aset/Portofolio Investasi</td>
    <td width='100' rowspan='2' align='center' class='header_laporan'>Harga Perolehan 31/12/2012</td>
    <td colspan='3' align='center' class='header_laporan'>Mutasi s.d Maret 2013</td>
    <td width='100' rowspan='2' align='center' class='header_laporan'>Harga Perolehan 31/03/2013</td>
  </tr>
  <tr bgcolor='#dbeef3'>
    <td width='100' align='center' class='header_laporan'>Penambahan</td>
    <td width='100' align='center' class='header_laporan'>Pengurangan</td>
    <td width='100' align='center' class='header_laporan'>Jumlah</td>
  </tr>";
		
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$persen1="-'";
			if ($row->n2 > 0)
			{
				$persen1=($row->n2 *100 )/ $row->n4;
			}
			
			$n1="";	$n2="";	$n3="";	$n4="";	$n5="";	
			if ($row->tipe!="Header" && $row->nama!="." && $row->nama!="")
			{
				$n1=number_format($row->n1,0,",",".");
				$n2=number_format($row->n2,0,",",".");
				$n3=number_format($row->n3,0,",",".");
				$n4=number_format($row->n2-$row->n3,0,",",".");
				$n5=number_format($row->n4,0,",",".");
			}
		
			echo "<tr>
    <td class='isi_laporan'>";
			echo fnSpasi($row->level_spasi);
			echo $row->nama;
			echo "</td>
     <td valign='top' class='isi_laporan' align='right'>$n1</td>
    <td valign='top' class='isi_laporan' align='right'>$n2</td>
   <td valign='top' class='isi_laporan' align='right'>$n3</td>
    <td valign='top' class='isi_laporan' align='right'>$n4</td>
   <td valign='top' class='isi_laporan' align='right'>$n5</td>
   </tr>";
			$i=$i+1;
		}
	
	
		
		echo "</div>";
		return "";
	}
	
}
?>
