<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_gl_rptTBJejerTu extends server_report_basic
{
	
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$mutasi=$tmp[1];
		$periode=$tmp[2];
		$sql = "select 1";
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
		$mutasi=$tmp[1];
		$periode=$tmp[2];
		$sql = "select kode_akun,nama,n1,n2,n3,n4,n5,n6,n7,n8,n9 from glma_jejer_tmp ";
		if ($mutasi=="Tidak")
		{
		  $sql.=$this->filter." and nik_user='$nik_user' and (n1<>0 or n2<>0 or n3<>0 or n4<>0 or n5<>0 or n6<>0 or n7<>0 or n8<>0 or n9<>0) order by kode_akun";
		}
		else
		{
		  $sql.=$this->filter." and nik_user='$nik_user' order by kode_akun ";
		}
		
		$rs = $dbLib->execute($sql);		
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$i = $start+1;
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("laporan trial balance jejer",$this->lokasi,$AddOnLib->ubah_periode($periode));
		echo "<table  border='1' cellpadding='0' cellspacing='0' class='kotak'>
    <tr bgcolor='#CCCCCC'>
      <td width='20'  class='header_laporan' align='center'>No</td>
      <td width='70'  class='header_laporan' align='center'>Akun</td>
      <td width='300' height='25'  class='header_laporan' align='center'>Nama</td>
   <td width='90' class='header_laporan' align='center'>Fakultas Teknik</td>
      <td width='90' class='header_laporan' align='center'>Fakultas Bisnis & Manajemen</td>
      <td width='90' class='header_laporan' align='center'>Faklutas Ilmu Terapan</td>
	  <td width='90' class='header_laporan' align='center'>Fakultas Industri Kreatif</td>
	 <td width='110' class='header_laporan' align='center'>Total</td>
    </tr>";
		$total="";$n1="";$n2="";$n3="";$n4="";$n5="";$n6="";$n7="";$n8="";$n9="";
		$ntotal=0;$tn1=0;$tn2=0;$tn3=0;$tn4=0;$tn5=0;$tn6=0;$tn7=0;$tn8=0;$tn9=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$tn1+=$row->n1;
			$tn2=$tn2+$row->n2;
			$tn3=$tn3+$row->n3;
			$tn4=$tn4+$row->n4;
			$tn5=$tn5+$row->n5;
			$tn6=$tn6+$row->n6;
			$tn7=$tn7+$row->n7;
			$tn8=$tn8+$row->n8;
			$tn9=$tn9+$row->n9;
		
			$ntotal=$ntotal+$row->n1+$row->n2+$row->n3+$row->n4+$row->n5+$row->n6+$row->n7+$row->n8+$row->n9;
			if ($row->tipe!="Header" && $row->nama!="." && $row->nama!="")
			{
				$total=$row->n1+$row->n2+$row->n3+$row->n4+$row->n5+$row->n6+$row->n7+$row->n8+$row->n9;
				$n1=number_format($row->n1,0,",",".");
				$n2=number_format($row->n2,0,",",".");
				$n3=number_format($row->n3,0,",",".");
				$n4=number_format($row->n4,0,",",".");
				$n5=number_format($row->n5,0,",",".");
				$n6=number_format($row->n6,0,",",".");
				$n7=number_format($row->n7,0,",",".");
				$n8=number_format($row->n8,0,",",".");
				$n9=number_format($row->n9,0,",",".");
				$total=number_format($total,0,",",".");
			}
			echo "<tr>
      <td class='isi_laporan'><div align='center'>$i</div></td>
      <td class='isi_laporan'>$row->kode_akun</td>
      <td height='20' class='isi_laporan'>$row->nama</td>
      <td class='isi_laporan' align='right'>";
			if ($n1 <> 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_akun','01','$periode');\">$n1</a>";
			}
			else
			{
				echo "$n1";
			}
			echo "</td><td class='isi_laporan' align='right'>";
			if ($n2 <> 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_akun','02','$periode');\">$n2</a>";
			}
			else
			{
				echo "$n2";
			}
			echo "</td>";
			
			echo "<td class='isi_laporan' align='right'>";
			if ($n4 <> 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_akun','04','$periode');\">$n4</a>";
			}
			else
			{
				echo "$n4";
			}
			echo "</td>";
			
			echo "<td class='isi_laporan' align='right'>";
			if ($n6 <> 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_akun','06','$periode');\">$n6</a>";
			}
			else
			{
				echo "$n6";
			}
			echo "</td>";
		
			echo "<td class='isi_laporan' align='right'>";
			echo "$total";
			echo "</td></tr>";
			$i=$i+1;
		}
			echo "<tr>
    <td height='20' colspan='3' class='sum_laporan' align='right'>Total</td>
    <td class='sum_laporan' align='right'>".number_format($tn1,0,',','.')."</td>
    <td class='sum_laporan' align='right'>".number_format($tn2,0,',','.')."</td>
    <td class='sum_laporan' align='right'>".number_format($tn4,0,',','.')."</td>
    <td class='sum_laporan' align='right'>".number_format($tn6,0,',','.')."</td>
	<td class='sum_laporan' align='right'>".number_format($ntotal,0,',','.')."</td>

</tr>";
		echo "</table></div>";
		return "";
	}
	
}
?>
