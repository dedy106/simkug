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
class server_report_saku2_kopeg_sju_rptGlNeracaRincianJejerSimulasi extends server_report_basic
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
		$kode_lokasi2=$tmp[3];
		$kode_fs=$tmp[4];
		if ($kode_lokasi2=="")
		{
			$kode_lokasi2=$kode_lokasi;
		}
		$sql="exec sp_produk_jejer_sju_sim '$kode_fs','N','S','1','$periode','$kode_lokasi','$nik_user' ";
		
		$rs = $dbLib->execute($sql);		
		$sql = "select a.kode_lokasi,a.kode_neraca,a.nama,a.n1,a.n2,a.n3,a.n4,a.n5,a.n6,a.n7,a.n8,a.level_spasi,a.tipe
				from neraca_tmp a where nik_user='$nik_user' and modul='A' order by rowindex";
	
		$rs = $dbLib->execute($sql);
		$i = $start+1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("LAPORAN POSISI KEUANGAN","PT SARANA JANESIA UTAMA","Periode ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr align='center' bgcolor='#dbeef3'>
    <td width='400' class='header_laporan'>Description</td>
    <td width='90' class='header_laporan'>Kantor Pusat</td>
    <td width='90' class='header_laporan'>KC Jakarta</td>
    <td width='90' class='header_laporan'>KC Bandung</td>
    <td width='90' class='header_laporan'>KC Semarang</td>
	<td width='90' class='header_laporan'>KC Surabaya</td>
	<td width='90' class='header_laporan'>KC Solo</td>
	<td width='90' class='header_laporan'>KC Medan</td>
	<td width='90' class='header_laporan'>KONSOLIDASI</td>
  </tr>";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$n1=""; $n2=""; $n3=""; $n4=""; $n5=""; $n6=""; $n7="";$n8="";
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
			}
			echo "<tr>
     <td class='isi_laporan'>";
			echo fnSpasi($row->level_spasi);
			if ($row->tipe=="Posting")
			{
				echo ucwords(strtolower($row->nama));
			}
			else
			{
				echo $row->nama;
			}
			echo "</td>
    <td valign='top' class='isi_laporan' align='right'>";
			if ($row->tipe=="Posting" && $row->n1 <> 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','00','$periode');\">$n1</a>";
			}
			else
			{
				echo "$n1";
			}
			echo "</td>
    <td valign='top' class='isi_laporan' align='right'>";
			if ($row->tipe=="Posting" && $row->n2 <> 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','01','$periode');\">$n2</a>";
			}
			else
			{
				echo "$n2";
			}
			echo "</td>
   <td valign='top' class='isi_laporan' align='right'>";
			if ($row->tipe=="Posting" && $row->n3 <> 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','02','$periode');\">$n3</a>";
			}
			else
			{
				echo "$n3";
			}
			echo "</td>
    <td valign='top' class='isi_laporan' align='right'>";
			if ($row->tipe=="Posting" && $row->n4 <> 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','03','$periode');\">$n4</a>";
			}
			else
			{
				echo "$n4";
			}
			echo "</td>
	 <td valign='top' class='isi_laporan' align='right'>";
			if ($row->tipe=="Posting" && $row->n5 <> 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','04','$periode');\">$n5</a>";
			}
			else
			{
				echo "$n5";
			}
			echo "</td>
		 <td valign='top' class='isi_laporan' align='right'>";
			if ($row->tipe=="Posting" && $row->n6 <> 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','05','$periode');\">$n6</a>";
			}
			else
			{
				echo "$n6";
			}
			echo "</td>
			<td valign='top' class='isi_laporan' align='right'>";
			if ($row->tipe=="Posting" && $row->n7 <> 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','06','$periode');\">$n7</a>";
			}
			else
			{
				echo "$n7";
			}
			echo "</td>
	  <td valign='top' class='isi_laporan' align='right'>$n8</td>
  </tr>";
			$i=$i+1;
		}
	
	  echo " </table>";
	  echo "<br>";
	  
	  echo " </table>";
		
		echo "</div>";
		return "";
	}
	
}
?>
