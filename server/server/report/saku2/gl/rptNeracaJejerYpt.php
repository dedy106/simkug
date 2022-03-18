<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_gl_rptNeracaJejerYpt extends server_report_basic
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
		$sql = "select kode_neraca,kode_fs,tipe,kode_lokasi,nama,tipe,n1,n2,n3,n4,n5,n6,n7,n8,n9,level_spasi from neraca_tmp where modul='A' and nik_user='$nik_user'  order by rowindex ";
		
		$rs = $dbLib->execute($sql);
		$i = 1;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>";
		echo $AddOnLib->judul_laporan($nama_form,$this->lokasi,$AddOnLib->ubah_periode($periode));
		echo "<table  border='1' cellpadding='0' cellspacing='0' class='kotak'>
    <tr bgcolor='#CCCCCC'>
      <td width='300' height='25'  class='header_laporan'>Deskripsi</td>
		<td width='90' class='header_laporan' align='center'>IT Telkom</td>
      <td width='90' class='header_laporan' align='center'>IM Telkom</td>
      <td width='90' class='header_laporan' align='center'>Lakhar</td>
      <td width='90' class='header_laporan' align='center'>Poltek</td>
	  <td width='90' class='header_laporan' align='center'>PDC</td>
	  <td width='90' class='header_laporan' align='center'>STISI</td>
	  <td width='90' class='header_laporan' align='center'>BTP</td>
	  <td width='90' class='header_laporan' align='center'>TPCC</td>
	  <td width='90' class='header_laporan' align='center'>DIR-TAC</td>
<td width='110' class='header_laporan' align='center'>Total</td>
    </tr>";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$total="";
			$n1="";$n2="";$n3="";$n4="";$n5="";$n6="";$n7="";$n8="";$n9="";
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
      <td height='20' class='isi_laporan'>".$AddOnLib->spasi($row->nama,$row->level_spasi)."</td>
<td class='isi_laporan' align='right'>";
			if ($row->tipe=="Posting" && $n1 <> 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','01','$periode');\">$n1</a>";
			}
			else
			{
				echo "$n1";
			}
			echo "</td><td class='isi_laporan' align='right'>";
			if ($row->tipe=="Posting" && $n2 <> 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','02','$periode');\">$n2</a>";
			}
			else
			{
				echo "$n2";
			}
			echo "</td><td class='isi_laporan' align='right'>";
			if ($row->tipe=="Posting" && $n3 <> 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','03','$periode');\">$n3</a>";
			}
			else
			{
				echo "$n3";
			}
			echo "</td><td class='isi_laporan' align='right'>";
			if ($row->tipe=="Posting" && $n4 <> 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','04','$periode');\">$n4</a>";
			}
			else
			{
				echo "$n4";
			}
			echo "</td><td class='isi_laporan' align='right'>";
			if ($row->tipe=="Posting" && $n5 <> 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','05','$periode');\">$n5</a>";
			}
			else
			{
				echo "$n5";
			}
			echo "</td><td class='isi_laporan' align='right'>";
			if ($row->tipe=="Posting" && $n6 <> 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','06','$periode');\">$n6</a>";
			}
			else
			{
				echo "$n6";
			}
			echo "</td><td class='isi_laporan' align='right'>";
			if ($row->tipe=="Posting" && $n7 <> 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','07','$periode');\">$n7</a>";
			}
			else
			{
				echo "$n7";
			}
			echo "</td><td class='isi_laporan' align='right'>";
			if ($row->tipe=="Posting" && $n8 <> 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','08','$periode');\">$n8</a>";
			}
			else
			{
				echo "$n8";
			}
			echo "</td><td class='isi_laporan' align='right'>";
			if ($row->tipe=="Posting" && $n9 <> 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','09','$periode');\">$n9</a>";
			}
			else
			{
				echo "$n9";
			}
			echo "</td><td class='isi_laporan' align='right'>";
			echo "$total";
			echo "</td> </tr>";			
			$i=$i+1;
		}
		echo "<tr><td height='25' colspan='8' class='isi_laporan'>&nbsp;</td></tr>";
		$sql = "select kode_neraca,kode_fs,kode_lokasi,nama,tipe,n1*-1 as n1,n2*-1 as n2,n3*-1 as n3,n4*-1 as n4,n5*-1 as n5,n6*-1 as n6,n7*-1 as n7,n8*-1 as n8,n9*-1 as n9,level_spasi from neraca_tmp where modul='P' and nik_user='$nik_user'  order by rowindex ";
		
		$rs = $dbLib->execute($sql);
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$total="";
			$nilai1="";
			$nilai2="";
			
			$n1="";$n2="";$n3="";$n4="";$n5="";$n6=""; $n7="";$n8="";$n9="";
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
      <td height='20' class='isi_laporan'>".$AddOnLib->spasi($row->nama,$row->level_spasi)."</td>
<td class='isi_laporan' align='right'>";
			if ($row->tipe=="Posting" && $n1 <> 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','01','$periode');\">$n1</a>";
			}
			else
			{
				echo "$n1";
			}
			echo "</td><td class='isi_laporan' align='right'>";
			if ($row->tipe=="Posting" && $n2 <> 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','02','$periode');\">$n2</a>";
			}
			else
			{
				echo "$n2";
			}
			echo "</td><td class='isi_laporan' align='right'>";
			if ($row->tipe=="Posting" && $n3 <> 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','03','$periode');\">$n3</a>";
			}
			else
			{
				echo "$n3";
			}
			echo "</td><td class='isi_laporan' align='right'>";
			if ($row->tipe=="Posting" && $n4 <> 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','04','$periode');\">$n4</a>";
			}
			else
			{
				echo "$n4";
			}
			echo "</td><td class='isi_laporan' align='right'>";
			if ($row->tipe=="Posting" && $n5 <> 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','05','$periode');\">$n5</a>";
			}
			else
			{
				echo "$n5";
			}
			echo "</td><td class='isi_laporan' align='right'>";
			if ($row->tipe=="Posting" && $n6 <> 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','06','$periode');\">$n6</a>";
			}
			else
			{
				echo "$n6";
			}
			echo "</td><td class='isi_laporan' align='right'>";
			if ($row->tipe=="Posting" && $n7 <> 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','07','$periode');\">$n7</a>";
			}
			else
			{
				echo "$n7";
			}
			echo "</td><td class='isi_laporan' align='right'>";
			if ($row->tipe=="Posting" && $n8 <> 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','08','$periode');\">$n8</a>";
			}
			else
			{
				echo "$n8";
			}
			echo "</td><td class='isi_laporan' align='right'>";
			if ($row->tipe=="Posting" && $n9 <> 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','09','$periode');\">$n9</a>";
			}
			else
			{
				echo "$n9";
			}
			echo "</td><td class='isi_laporan' align='right'>";
			if ($row->tipe=="Posting" && $total <> 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','$row->kode_lokasi','$periode4');\">$total</a>";
			}
			else
			{
				echo "$total";
			}
			echo "</td> </tr>";
			
			$i=$i+1;
		}
		echo "</table></div>";
		return "";
	}
	
}
?>
