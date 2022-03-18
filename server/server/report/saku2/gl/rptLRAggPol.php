<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_gl_rptLRAggPol extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$sql = "select 1 ";
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);		
		}
		error_log($this->rows."/".$count."/".$totPage);
		return $totPage;
	}
	function getHtml()
	{
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$periode=$tmp[1];
		$nik_user=$tmp[0];
		$tahun=substr($periode,0,4);
		$sql = "select kode_neraca,kode_fs,kode_lokasi,nama,tipe,level_spasi,
       case jenis_akun when  'Pendapatan' then -n1 else n1 end as n1,
       case jenis_akun when  'Pendapatan' then -n2 else n2 end as n2,
       case jenis_akun when  'Pendapatan' then -n3 else n3 end as n3,
       case jenis_akun when  'Pendapatan' then -n4 else n4 end as n4,
	   case jenis_akun when  'Pendapatan' then -n5 else n5 end as n5	
from neraca_tmp 
where modul='L' and nik_user='$nik_user' and level_lap=1
order by rowindex ";
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$rs = $dbLib->execute($sql);
		$i = 1;
		echo "<div align='center'>";
		$AddOnLib=new server_util_AddOnLib();
		echo $AddOnLib->judul_laporan("budget commitee",$this->lokasi,$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr bgcolor='#CCCCCC'>
    <td width='300' height='25' class='header_laporan' align='center'>Deskripsi</td>
    <td class='header_laporan' width='100' align='center'>Target</td>
    <td  class='header_laporan' width='100' align='center'>Realisasi</td>
	 <td  class='header_laporan' width='100' align='center'>Outlook</td>
    <td width='100' class='header_laporan' align='center'>Deviasi</td>
   
  </tr>
 ";	
		$beban1=0;$beban2=0; $pdpt1=0;$pdpt2=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$n1="";$n2="";$n3="";$n4="";$n5="";
			if ($row->kode_neraca=="49T")
			{
				$pdpt1=$row->n2;
				$pdpt2=$row->n4;
			}
			if ($row->kode_neraca=="58T")
			{
				$beban1=$row->n2;
				$beban2=$row->n4;
			}
			if ($row->tipe!="Header" && $row->nama!="." && $row->nama!="")
			{
				$n1=number_format($row->n1,0,",",".");
				$n2=number_format($row->n2,0,",",".");
				$n3=number_format($row->n3,0,",",".");
				$n4=number_format($row->n4,0,",",".");
				$n5=number_format($row->n5,0,",",".");
			
			
			}
			echo "<tr >
    <td  class='isi_laporan'>".$AddOnLib->spasi($row->nama,$row->level_spasi+1)."</td>
    <td height='23' class='isi_laporan' align='right'>";
			if ($row->tipe=="Posting" && $row->n2 <> 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenGar('$row->kode_neraca','$row->kode_lokasi','$tahun');\">$n2</a>";
			}
			else
			{
				echo "$n2";
			}
			echo "</td>
    <td height='23' class='isi_laporan' align='right'>";
			if ($row->tipe=="Posting" && $row->n4 <> 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenGar('$row->kode_neraca','$row->kode_lokasi','$tahun');\">$n4</a>";
			}
			else
			{
				echo "$n4";
			}
			echo "</td>
    <td class='isi_laporan' align='right'>$outlook</td>
     <td class='isi_laporan' align='right'>".number_format($row->n2-$row->n4,0,",",".")."</td>
   
    
  </tr>";
			$i=$i+1;
		}
		if ($pdpt1!=0)
		{
			$or1=($beban1/$pdpt1)*100;
		}
		if ($pdpt2!=0)
		{
			$or2=($beban2/$pdpt2)*100;
		}	
		echo "<tr >
    <td  class='header_laporan' align='center'>OPERATING RATIO</td>
	<td  class='header_laporan' align='center'>".number_format($or1,2,",",".")."</td>
	<td  class='header_laporan' align='center'>".number_format($or2,2,",",".")."</td>
	<td  class='header_laporan' align='center'>".number_format($or3,2,",",".")."</td>
	<td  class='header_laporan' align='center'>".number_format($or4,2,",",".")."</td>
		</tr>";
		echo "</table></div>";
		return "";
	}
	
}
?>
