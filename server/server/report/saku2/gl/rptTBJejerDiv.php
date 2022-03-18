<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_gl_rptTBJejerDiv extends server_report_basic
{
	function getSumPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$mutasi=$tmp[1];
		$periode=$tmp[2];
		$sql = "select count(a.kode_lokasi),sum(a.dn1) as n1,sum(a.dn2) as n2
from (
select kode_lokasi,
case when n1>0 then n1 else 0 end as dn1,case when n1<0 then -n1 else 0 end as cn1,
case when n2>0 then n2 else 0 end as dn2,case when n2<0 then -n2 else 0 end as cn2
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
		$result=$totPage."/".$n1."/".$n2;
		
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
		  $sql.=$this->filter." and nik_user='$nik_user' and (n1<>0 or n2<>0  ";
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
		$sql = "select kode_akun,nama,n1,n2 from glma_jejer_tmp ";
		if ($mutasi=="Tidak")
		{
		  $sql.=$this->filter." and nik_user='$nik_user' and (n1<>0 or n2<>0) order by kode_akun";
		}
		else
		{
		  $sql.=$this->filter." and nik_user='$nik_user' order by kode_akun ";
		}
		
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
     <td width='90' class='header_laporan' align='center'>Kopegtel Divre 3 Simpan Pinjam</td>
      <td width='90' class='header_laporan' align='center'>Kopegtel Divre 3 Perusahaan</td>
     
<td width='110' class='header_laporan' align='center'>Total</div></td>
    </tr>";
		$total="";$n1="";$n2="";$n3="";$n4="";$n5="";$n6="";$n7="";$n8="";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			if ($row->tipe!="Header" && $row->nama!="." && $row->nama!="")
			{
				$total=$row->n1+$row->n2+$row->n3+$row->n4+$row->n5+$row->n6+$row->n7;
				$n1=number_format($row->n1,0,",",".");
				$n2=number_format($row->n2,0,",",".");
				
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
			echo "$total";
			echo "</td></tr>";
			$i=$i+1;
		}
		$result=$this->getSumPage();
		$tmp=explode("/",$result);
		$max=$tmp[0];
		$n1=$tmp[1];
		$n2=$tmp[2];
		
		if ($this->page==$max)
		{
		$total=$n1+$n2;	
		echo "<tr>
    <td height='20' colspan='3' class='sum_laporan' align='right'>Total</td>
    <td class='sum_laporan' align='right'>".number_format($n1,0,',','.')."</td>
    <td class='sum_laporan' align='right'>".number_format($n2,0,',','.')."</td>
  
	<td class='sum_laporan' align='right'>".number_format($total,0,',','.')."</div></td>

</tr>";
		}
		echo "</table></div>";
		return "";
	}
	
}
?>
