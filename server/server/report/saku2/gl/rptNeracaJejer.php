<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_gl_rptNeracaJejer extends server_report_basic
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
		error_log($sql);
		return $totPage;
	}
	function getHtml()
	{
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$periode=$tmp[1];
		$nama_form=$tmp[2];
		$sql = "select kode_neraca,kode_fs,tipe,kode_lokasi,nama,tipe,n1,n2,n3,n4,n5,n6,n7,n8,level_spasi from neraca_tmp where modul='A' and nik_user='$nik_user'  order by rowindex ";
		
		$rs = $dbLib->execute($sql);
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>";
		echo $AddOnLib->judul_laporan($nama_form,$this->lokasi,$AddOnLib->ubah_periode($periode));
		echo "<table  border='1' cellpadding='0' cellspacing='0' bordercolor='#111111' style='border-collapse: collapse'>
    <tr bgcolor='#CCCCCC'>
      <td width='300' height='25'  class='header_laporan'><div align='center'>Deskripsi</div></td>
<td width='90' class='header_laporan'><div align='center'>PUSAT</div></td>
<td width='90' class='header_laporan'><div align='center'>AREA 1</div></td>
      <td width='90' class='header_laporan'><div align='center'>AREA 2</div></td>
      <td width='90' class='header_laporan'><div align='center'>AREA 3</div></td>
      <td width='90' class='header_laporan'><div align='center'>AREA 4</div></td>
      <td width='90' class='header_laporan'><div align='center'>AREA 5</div></td>
	  <td width='90' class='header_laporan'><div align='center'>AREA 6</div></td>
	  <td width='90' class='header_laporan'><div align='center'>AREA 7</div></td>
<td width='110' class='header_laporan'><div align='center'>Total</div></td>
    </tr>";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$total="";
			$n1="";$n2="";$n3="";$n4="";$n5="";$n6="";$n7="";$n8="";
			if ($row->tipe!="Header" && $row->nama!="." && $row->nama!="")
			{
				$total=$row->n1+$row->n2+$row->n3+$row->n4+$row->n5+$row->n6+$row->n7+$row->n8;
				$n1=number_format($row->n1,0,",",".");
				$n2=number_format($row->n2,0,",",".");
				$n3=number_format($row->n3,0,",",".");
				$n4=number_format($row->n4,0,",",".");
				$n5=number_format($row->n5,0,",",".");
				$n6=number_format($row->n6,0,",",".");
				$n7=number_format($row->n7,0,",",".");
				$n8=number_format($row->n8,0,",",".");
				$total=number_format($total,0,",",".");
			}
			
			echo "<tr>
      <td height='20' class='isi_laporan'>".$AddOnLib->spasi($row->nama,$row->level_spasi)."</td>
<td class='isi_laporan'><div align='right'>$n1</div></td>
<td class='isi_laporan'><div align='right'>$n2</div></td>
<td class='isi_laporan'><div align='right'>$n3</div></td>
<td class='isi_laporan'><div align='right'>$n4</div></td>
<td class='isi_laporan'><div align='right'>$n5</div></td>
<td class='isi_laporan'><div align='right'>$n6</div></td>
<td class='isi_laporan'><div align='right'>$n7</div></td>
<td class='isi_laporan'><div align='right'>$n8</div></td>
<td class='isi_laporan'><div align='right'>$total</div></td>
</tr>";
			
			$i=$i+1;
		}
		echo "<tr><td height='25' colspan='9' class='isi_laporan'>&nbsp;</td></tr>";
		$sql = "select kode_neraca,kode_fs,kode_lokasi,nama,tipe,n1*-1 as n1,n2*-1 as n2,n3*-1 as n3,n4*-1 as n4,n5*-1 as n5,n6*-1 as n6,n7*-1 as n7,n8*-1 as n8,level_spasi from neraca_tmp where modul='P' and nik_user='$nik_user'  order by rowindex ";
		error_log($sql);
		$rs = $dbLib->execute($sql);
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$total="";
			$nilai1="";
			$nilai2="";
			
			$n1="";$n2="";$n3="";$n4="";$n5="";$n6="";$n7="";$n8="";
			if ($row->tipe!="Header" && $row->nama!="." && $row->nama!="")
			{
				$total=$row->n1+$row->n2+$row->n3+$row->n4+$row->n5+$row->n6+$row->n7+$row->n8;
				$n1=number_format($row->n1,0,",",".");
				$n2=number_format($row->n2,0,",",".");
				$n3=number_format($row->n3,0,",",".");
				$n4=number_format($row->n4,0,",",".");
				$n5=number_format($row->n5,0,",",".");
				$n6=number_format($row->n6,0,",",".");
				$n7=number_format($row->n7,0,",",".");
				$n8=number_format($row->n8,0,",",".");
				$total=number_format($total,0,",",".");
			}
			echo "<tr>
      <td height='20' class='isi_laporan'>".$AddOnLib->spasi($row->nama,$row->level_spasi)."</td>
<td class='isi_laporan'><div align='right'>$n1</div></td>
<td class='isi_laporan'><div align='right'>$n2</div></td>
<td class='isi_laporan'><div align='right'>$n3</div></td>
<td class='isi_laporan'><div align='right'>$n4</div></td>
<td class='isi_laporan'><div align='right'>$n5</div></td>
<td class='isi_laporan'><div align='right'>$n6</div></td>
<td class='isi_laporan'><div align='right'>$n7</div></td>
<td class='isi_laporan'><div align='right'>$n8</div></td>
<td class='isi_laporan'><div align='right'>$total</div></td>
</tr>";
			
			$i=$i+1;
		}
		echo "</table></div>";
		return "";
	}
	
}
?>
