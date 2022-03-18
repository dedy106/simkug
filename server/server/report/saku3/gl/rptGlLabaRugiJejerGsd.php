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
class server_report_saku3_gl_rptGlLabaRugiJejerGsd extends server_report_basic
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
		$sql="call sp_neraca_jejer_spm_dw '$kode_fs','L','S','1','$periode','$kode_lokasi','$nik_user' ";
		
		$rs = $dbLib->execute($sql);		
		$sql = "select a.kode_lokasi,a.kode_neraca,a.nama,a.level_spasi,a.tipe,
				   case jenis_akun when  'Pendapatan' then -a.n1 else a.n1 end as n1,
				   case jenis_akun when  'Pendapatan' then -a.n2 else a.n2 end as n2,
				   case jenis_akun when  'Pendapatan' then -a.n3 else a.n3 end as n3,
				   case jenis_akun when  'Pendapatan' then -a.n4 else a.n4 end as n4,
				   case jenis_akun when  'Pendapatan' then -a.n5 else a.n5 end as n5,
				   case jenis_akun when  'Pendapatan' then -a.n6 else a.n6 end as n6,
				   case jenis_akun when  'Pendapatan' then -a.n7 else a.n7 end as n7,
				   case jenis_akun when  'Pendapatan' then -a.n8 else a.n8 end as n8,
				   case jenis_akun when  'Pendapatan' then -a.n9 else a.n9 end as n9,
				   case jenis_akun when  'Pendapatan' then -a.n10 else a.n10 end as n10,
				   case jenis_akun when  'Pendapatan' then -a.n11 else a.n11 end as n11,
				   case jenis_akun when  'Pendapatan' then -a.n12 else a.n12 end as n12,
				   case jenis_akun when  'Pendapatan' then -a.n13 else a.n13 end as n13,
				   case jenis_akun when  'Pendapatan' then -a.n14 else a.n14 end as n14,
				   case jenis_akun when  'Pendapatan' then -a.n15 else a.n15 end as n15,
				   case jenis_akun when  'Pendapatan' then -a.n16 else a.n16 end as n16,
				   case jenis_akun when  'Pendapatan' then -a.n17 else a.n17 end as n17,
				   case jenis_akun when  'Pendapatan' then -a.n18 else a.n18 end as n18,
				   case jenis_akun when  'Pendapatan' then -a.n19 else a.n19 end as n19,
				   case jenis_akun when  'Pendapatan' then -a.n20 else a.n20 end as n20,
				   case jenis_akun when  'Pendapatan' then -a.n21 else a.n21 end as n21,
				   case jenis_akun when  'Pendapatan' then -a.n22 else a.n22 end as n22
				from neraca_tmp a where nik_user='$nik_user' and modul='L' order by rowindex";
		$rs = $dbLib->execute($sql);
		//echo $sql;
		$i = $start+1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("LAPORAN aktifitas",$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' >
  <tr align='center' bgcolor='#dbeef3'>
    <td width='300' class='header_laporan'>Keterangan</td>
     <td width='90' class='header_laporan' align='center'>Alfa Cikande</td>
      <td width='90' class='header_laporan' align='center'>IDM Enim</td>
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
    	
	  <td valign='top' class='isi_laporan' align='right'>$n22</td>
  </tr>";
			$i=$i+1;
		}
	
	  echo " </table>";
	  echo "<br>";
	
		echo "</div>";
		return "";
	}
	
}
?>
