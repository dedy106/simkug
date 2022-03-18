<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_gl_rptTBJejerYpt extends server_report_basic
{
	function getSumPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$mutasi=$tmp[1];
		$periode=$tmp[2];
		$sql = "select count(a.kode_lokasi),sum(a.dn1) as n1,sum(a.dn2) as n2,sum(a.dn3) as n3,sum(a.dn4) as n4,
		sum(a.dn5) as n5,sum(a.dn6) as n6,sum(a.dn7) as n7,sum(a.dn8) as n8,sum(a.dn9) as n9
from (
select kode_lokasi,
case when n1>0 then n1 else 0 end as dn1,case when n1<0 then -n1 else 0 end as cn1,
case when n2>0 then n2 else 0 end as dn2,case when n2<0 then -n2 else 0 end as cn2,
case when n3>0 then n3 else 0 end as dn3,case when n3<0 then -n3 else 0 end as cn3,
case when n4>0 then n4 else 0 end as dn4,case when n4<0 then -n4 else 0 end as cn4,
case when n5>0 then n5 else 0 end as dn5,case when n5<0 then -n5 else 0 end as cn5,
case when n6>0 then n6 else 0 end as dn6,case when n6<0 then -n6 else 0 end as cn6,
case when n7>0 then n7 else 0 end as dn7,case when n7<0 then -n7 else 0 end as cn7,
case when n8>0 then n8 else 0 end as dn8,case when n8<0 then -n8 else 0 end as cn8,
case when n9>0 then n9 else 0 end as dn8,case when n9<0 then -n9 else 0 end as cn9
from glma_jejer_tmp ";
		if ($mutasi=="Tidak")
		{
		  $sql.=$this->filter." and nik_user='$nik_user' and (n1<>0 or n2<>0 or n3<>0 or n4<>0 or n5<>0 or n6<>0 or n7<>0 or n8<>0))a group by a.kode_lokasi";
		}
		else
		{
		  $sql.=$this->filter." and nik_user='$nik_user')a group by a.kode_lokasi";
		}
		error_log($sql);
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);	
			$n1=$rs->fields[1];
			$n2=$rs->fields[2];
			$n3=$rs->fields[3];
			$n4=$rs->fields[4];
			$n5=$rs->fields[5];
			$n6=$rs->fields[6];
			$n7=$rs->fields[7];
			$n8=$rs->fields[8];
		}
		$result=$totPage."/".$n1."/".$n2."/".$n3."/".$n4."/".$n5."/".$n6."/".$n7;
		
		return $result;
	}
	
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$mutasi=$tmp[1];
		$periode=$tmp[2];
		$sql = "select count(kode_akun) as jum from glma_jejer_tmp ";
		if ($mutasi=="Tidak")
		{
		  $sql.=$this->filter." and nik_user='$nik_user' and (n1<>0 or n2<>0 or n3<>0 or n4<>0 or n5<>0 or n6<>0 or n7<>0 or n8<>0 ) ";
		}
		else
		{
		  $sql.=$this->filter." and nik_user='$nik_user'";
		}
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
		error_log($sql);
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
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
     <td width='90' class='header_laporan' align='center'>IT Telkom</td>
      <td width='90' class='header_laporan' align='center'>IM Telkom</td>
      <td width='90' class='header_laporan' align='center'>Lakhar</td>
      <td width='90' class='header_laporan' align='center'>Poltek</td>
	  <td width='90' class='header_laporan' align='center'>PDC</td>
	  <td width='90' class='header_laporan' align='center'>STISI</td>
	  <td width='90' class='header_laporan' align='center'>BTP</td>
	  <td width='90' class='header_laporan' align='center'>TPCC</td>
	  <td width='90' class='header_laporan' align='center'>DIR-TAC</td>
<td width='110' class='header_laporan' align='center'>Total</div></td>
    </tr>";
		$total="";$n1="";$n2="";$n3="";$n4="";$n5="";$n6="";$n7="";$n8="";$n9="";
		$ntotal=0;$tn1=0;$tn2=0;$tn3=0;$tn4=0;$tn5=0;$tn6=0;$tn7=0;$tn8=0;$tn9=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$tn1=$tn1+$row->n1;
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
			echo "</td><td class='isi_laporan' align='right'>";
			if ($n3 <> 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_akun','03','$periode');\">$n3</a>";
			}
			else
			{
				echo "$n3";
			}
			echo "</td><td class='isi_laporan' align='right'>";
			if ($n4 <> 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_akun','04','$periode');\">$n4</a>";
			}
			else
			{
				echo "$n4";
			}
			echo "</td><td class='isi_laporan' align='right'>";
			if ($n5 <> 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_akun','05','$periode');\">$n5</a>";
			}
			else
			{
				echo "$n5";
			}
			echo "</td><td class='isi_laporan' align='right'>";
			if ($n6 <> 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_akun','06','$periode');\">$n6</a>";
			}
			else
			{
				echo "$n6";
			}
			echo "</td><td class='isi_laporan' align='right'>";
			if ($n7 <> 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_akun','07','$periode');\">$n7</a>";
			}
			else
			{
				echo "$n7";
			}
			echo "</td><td class='isi_laporan' align='right'>";
			if ($n8 <> 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_akun','08','$periode');\">$n8</a>";
			}
			else
			{
				echo "$n8";
			}
			echo "</td><td class='isi_laporan' align='right'>";
			if ($n9 <> 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_akun','09','$periode');\">$n9</a>";
			}
			else
			{
				echo "$n9";
			}
			echo "</td><td class='isi_laporan' align='right'>";
			echo "$total";
			echo "</td></tr>";
			$i=$i+1;
		}
		echo "<tr>
    <td height='20' colspan='3' class='sum_laporan' align='right'>Total</td>
    <td class='sum_laporan' align='right'>".number_format($tn1,0,',','.')."</td>
    <td class='sum_laporan' align='right'>".number_format($tn2,0,',','.')."</td>
    <td class='sum_laporan' align='right'>".number_format($tn3,0,',','.')."</td>
    <td class='sum_laporan' align='right'>".number_format($tn4,0,',','.')."</td>
    <td class='sum_laporan' align='right'>".number_format($tn5,0,',','.')."</td>
    <td class='sum_laporan' align='right'>".number_format($tn6,0,',','.')."</td>
	 <td class='sum_laporan' align='right'>".number_format($tn7,0,',','.')."</td>
	 <td class='sum_laporan' align='right'>".number_format($tn8,0,',','.')."</td>
	  <td class='sum_laporan' align='right'>".number_format($tn9,0,',','.')."</td>
	<td class='sum_laporan' align='right'>".number_format($ntotal,0,',','.')."</div></td>

</tr>";
		echo "</table></div>";
		return "";
	}
	
}
?>
