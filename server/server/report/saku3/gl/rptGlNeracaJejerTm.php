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
class server_report_saku3_gl_rptGlNeracaJejerTm extends server_report_basic
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
		$kode_fs=$tmp[3];
	
		$sql="exec sp_neraca_jejer_spm_dw '$kode_fs','N','S','1','$periode','$kode_lokasi','$nik_user' ";
		
		$rs = $dbLib->execute($sql);		
		$sql = "select a.kode_lokasi,a.kode_neraca,a.nama,a.n1,a.n2,a.n3,a.n4,a.n5,a.n6,a.n7,a.n8,a.n9,a.n10,a.n11,a.n12,a.n13,a.n14,a.n15,a.n16,a.n17,a.n18,a.n19,a.n20,a.n21,a.n22
					,a.level_spasi,a.tipe
				from neraca_tmp a where nik_user='$nik_user' and modul='A' order by rowindex";
		
		$rs = $dbLib->execute($sql);
		
		$i = $start+1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("LAPORAN NERACA",$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1300'>
  <tr align='center' bgcolor='#dbeef3'>
    <td width='300' class='header_laporan'>Keterangan</td>
     
    <td width='90' class='header_laporan' align='center'>REGIONAL SUMATERA</td>
      <td width='90' class='header_laporan' align='center'>REGIONAL JAKARTA</td>
      <td width='90' class='header_laporan' align='center'>REGIONAL JAWA BARAT</td>
      <td width='90' class='header_laporan' align='center'>REGIONAL JAWA TENGAH</td>
	  <td width='90' class='header_laporan' align='center'>REGIONAL JAWA TIMUR</td>
	  <td width='90' class='header_laporan' align='center'>REGIONAL KALIMANTAN</td>
	  <td width='90' class='header_laporan' align='center'>REGIONAL KEPULAUAN</td>
	  <td width='90' class='header_laporan' align='center'>PUSAT</td>
	<td width='100' class='header_laporan' align='center'>NASIONAL</td>
  </tr>";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$n1=""; $n2=""; $n3=""; $n4=""; $n5=""; $n6=""; $n7="";$n8="";$n9="";$n10="";
			$n11=""; $n12=""; $n13=""; $n14=""; $n15=""; $n16=""; $n17="";$n18="";$n19="";$n20="";$n21="";$n22="";
			if ($row->tipe!="Header" && $row->nama!="." )
			{
				$n1=number_format($row->n1,0,",",".");
				$n2=number_format($row->n2,0,",",".");
				$n3=number_format($row->n3,0,",",".");
				$n4=number_format($row->n4,0,",",".");
				$n5=number_format($row->n5,0,",",".");
				$n6=number_format($row->n6,0,",",".");
				$n7=number_format($row->n7,0,",",".");
				$n8=number_format($row->n8,0,",",".");
				$n9=number_format($row->n9,0,",",".");
				$n10=number_format($row->n10,0,",",".");
				$n11=number_format($row->n11,0,",",".");
				$n12=number_format($row->n12,0,",",".");
				$n13=number_format($row->n13,0,",",".");
				$n14=number_format($row->n14,0,",",".");
				$n15=number_format($row->n15,0,",",".");
				$n16=number_format($row->n16,0,",",".");
				$n17=number_format($row->n17,0,",",".");
				$n18=number_format($row->n18,0,",",".");
				$n19=number_format($row->n19,0,",",".");
				$n20=number_format($row->n20,0,",",".");
				$n21=number_format($row->n21,0,",",".");
				$n22=number_format($row->n22,0,",",".");
			}
			echo "<tr>
     <td class='isi_laporan'>";
			echo fnSpasi($row->level_spasi);
			echo $row->nama;
			echo "</td>
    <td valign='top' class='isi_laporan' align='right'>";
			if ($row->tipe=="Posting" && $row->n1 <> 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','01','$periode');\">$n1</a>";
			}
			else
			{
				echo "$n1";
			}
			echo "</td>
   <td valign='top' class='isi_laporan' align='right'>";
			if ($row->tipe=="Posting" && $row->n2 <> 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','02','$periode');\">$n2</a>";
			}
			else
			{
				echo "$n2";
			}
			echo "</td>
    <td valign='top' class='isi_laporan' align='right'>";
			if ($row->tipe=="Posting" && $row->n3 <> 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','03','$periode');\">$n3</a>";
			}
			else
			{
				echo "$n3";
			}
			echo "</td>
	 <td valign='top' class='isi_laporan' align='right'>";
			if ($row->tipe=="Posting" && $row->n4 <> 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','04','$periode');\">$n4</a>";
			}
			else
			{
				echo "$n4";
			}
			echo "</td>
	 <td valign='top' class='isi_laporan' align='right'>";
			if ($row->tipe=="Posting" && $row->n5 <> 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','05','$periode');\">$n5</a>";
			}
			else
			{
				echo "$n5";
			}
			echo "</td>
	 <td valign='top' class='isi_laporan' align='right'>";
			if ($row->tipe=="Posting" && $row->n6 <> 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','06','$periode');\">$n6</a>";
			}
			else
			{
				echo "$n6";
			}
			echo "</td>
	 <td valign='top' class='isi_laporan' align='right'>";
			if ($row->tipe=="Posting" && $row->n7 <> 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','07','$periode');\">$n7</a>";
			}
			else
			{
				echo "$n7";
			}
			
			echo "</td>
	 <td valign='top' class='isi_laporan' align='right'>";
			if ($row->tipe=="Posting" && $row->n9 <> 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','09','$periode');\">$n9</a>";
			}
			else
			{
				echo "$n9";
			}
			
			echo "</td>
	  <td valign='top' class='isi_laporan' align='right'>$n22</td>
  </tr>";
			$i=$i+1;
		}
	
	
	  $sql = "select a.kode_lokasi,a.kode_neraca,a.nama,a.n1*-1 as n1,a.n2*-1 as n2,a.n3*-1 as n3,a.n4*-1 as n4,a.n5*-1 as n5 ,a.n6*-1 as n6,a.n7*-1 as n7,a.n8*-1 as n8,a.n9*-1 as n9,a.n10*-1 as n10,
					 a.n10*-1 as n10,a.n11*-1 as n11,a.n12*-1 as n12,a.n13*-1 as n13,a.n14*-1 as n14,a.n15*-1 as n15 ,a.n16*-1 as n16,a.n17*-1 as n17,a.n18*-1 as n18,a.n19*-1 as n19,a.n20*-1 as n20,
					 a.n21*-1 as n21,a.n22*-1 as n22,a.level_spasi,a.tipe
			from neraca_tmp a where nik_user='$nik_user' and modul='P' order by rowindex";
	
		$rs = $dbLib->execute($sql);
		
		
		
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$n1=""; $n2=""; $n3=""; $n4=""; $n5=""; $n6=""; $n7="";$n8="";$n9="";$n10="";
			$n11=""; $n12=""; $n13=""; $n14=""; $n15=""; $n16=""; $n17="";$n18="";$n19="";$n20="";$n21="";$n22="";
			if ($row->tipe!="Header" && $row->nama!="." )
			{
				$n1=number_format($row->n1,0,",",".");
				$n2=number_format($row->n2,0,",",".");
				$n3=number_format($row->n3,0,",",".");
				$n4=number_format($row->n4,0,",",".");
				$n5=number_format($row->n5,0,",",".");
				$n6=number_format($row->n6,0,",",".");
				$n7=number_format($row->n7,0,",",".");
				$n8=number_format($row->n8,0,",",".");
				$n9=number_format($row->n9,0,",",".");
				$n10=number_format($row->n10,0,",",".");
				$n11=number_format($row->n11,0,",",".");
				$n12=number_format($row->n12,0,",",".");
				$n13=number_format($row->n13,0,",",".");
				$n14=number_format($row->n14,0,",",".");
				$n15=number_format($row->n15,0,",",".");
				$n16=number_format($row->n16,0,",",".");
				$n17=number_format($row->n17,0,",",".");
				$n18=number_format($row->n18,0,",",".");
				$n19=number_format($row->n19,0,",",".");
				$n20=number_format($row->n20,0,",",".");
				$n21=number_format($row->n21,0,",",".");
				$n22=number_format($row->n22,0,",",".");
			}
			echo "<tr>
     <td class='isi_laporan'>";
			echo fnSpasi($row->level_spasi);
			echo $row->nama;
			echo "</td>
    <td valign='top' class='isi_laporan' align='right'>";
			if ($row->tipe=="Posting" && $row->n1 <> 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','01','$periode');\">$n1</a>";
			}
			else
			{
				echo "$n1";
			}
			echo "</td>
   <td valign='top' class='isi_laporan' align='right'>";
			if ($row->tipe=="Posting" && $row->n2 <> 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','02','$periode');\">$n2</a>";
			}
			else
			{
				echo "$n2";
			}
			echo "</td>
    <td valign='top' class='isi_laporan' align='right'>";
			if ($row->tipe=="Posting" && $row->n3 <> 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','03','$periode');\">$n3</a>";
			}
			else
			{
				echo "$n3";
			}
			echo "</td>
	 <td valign='top' class='isi_laporan' align='right'>";
			if ($row->tipe=="Posting" && $row->n4 <> 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','04','$periode');\">$n4</a>";
			}
			else
			{
				echo "$n4";
			}
			echo "</td>
	 <td valign='top' class='isi_laporan' align='right'>";
			if ($row->tipe=="Posting" && $row->n5 <> 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','05','$periode');\">$n5</a>";
			}
			else
			{
				echo "$n5";
			}
			echo "</td>
	 <td valign='top' class='isi_laporan' align='right'>";
			if ($row->tipe=="Posting" && $row->n6 <> 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','06','$periode');\">$n6</a>";
			}
			else
			{
				echo "$n6";
			}
			echo "</td>
	 <td valign='top' class='isi_laporan' align='right'>";
			if ($row->tipe=="Posting" && $row->n7 <> 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','07','$periode');\">$n7</a>";
			}
			else
			{
				echo "$n7";
			}
			
			echo "</td>
	 <td valign='top' class='isi_laporan' align='right'>";
			if ($row->tipe=="Posting" && $row->n9 <> 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','09','$periode');\">$n9</a>";
			}
			else
			{
				echo "$n9";
			}
			
			echo "</td>
	  <td valign='top' class='isi_laporan' align='right'>$n22</td>
  </tr>";
			$i=$i+1;
		}
	
	  echo " </table>";
		
		echo "</div>";
		return "";
	}
	
}
?>
