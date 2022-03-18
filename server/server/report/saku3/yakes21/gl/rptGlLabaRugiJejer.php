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
function fnTanggal($periode) {
	$AddOnLib=new server_util_AddOnLib();
	$bln = substr($periode,4);
		$thn = substr($periode,0,4);
		if (floatval($bln) > 12) $bln = 12;
		$totime = date("d M Y",strtotime("-1 second",strtotime("+1 month",strtotime($bln.'/01/'.$thn.' 00:00:00'))));
		$now = strtotime(date("d M Y"));
		$time = strtotime($totime);
		$bln = $AddOnLib->ubah_bulan(substr($periode,4));
		$totime = explode(" ",$totime);
		if ($time > $now){
			 $now = date("d M Y");
			 $now = explode(" ",$now);
			 $totime[0] = $now[0];
		}		
		$totime = $totime[0] . " ". $bln ." ". $totime[2];
		return $totime;
}

class server_report_saku3_yakes21_gl_rptGlLabaRugiJejer extends server_report_basic
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
		//error_log($this->rows."/".$count."/".$totPage);
		return $totPage;
	}
	function getHtml()
	{
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$periode=$tmp[1];
		$kode_lokasi=$tmp[2];
		$lev=$tmp[3];
		$format=$tmp[4];
		$kode_fs=$tmp[5];
		$tahun = substr($periode,0,4);
        $bln = substr($periode,4,2);
        $tahunrev = intval($tahun)-1;
		$periode_rev = $tahunrev.$bln; 
		if ($kode_lokasi=="") {
			$kode_lokasi='00';
		}
		$sql="exec sp_neraca_jejer_yk '$kode_fs','L','S','$lev','$periode','$kode_lokasi','$nik_user' ";
		//echo $sql;
		$rs = $dbLib->execute($sql);	
		
		$sql = "select kode_neraca,kode_fs,kode_lokasi,nama,tipe,level_spasi,
				   case jenis_akun when  'Pendapatan' then -n1 else n1 end as n1,
				   case jenis_akun when  'Pendapatan' then -n2 else n2 end as n2,
				   case jenis_akun when  'Pendapatan' then -n3 else n3 end as n3,
				   case jenis_akun when  'Pendapatan' then -n4 else n4 end as n4,
				   case jenis_akun when  'Pendapatan' then -n5 else n5 end as n5,
				   case jenis_akun when  'Pendapatan' then -n6 else n6 end as n6,
				   case jenis_akun when  'Pendapatan' then -n7 else n7 end as n7,
				   case jenis_akun when  'Pendapatan' then -n8 else n8 end as n8,
				   case jenis_akun when  'Pendapatan' then -(n1+n2+n3+n4+n5+n6+n7+n8) else (n1+n2+n3+n4+n5+n6+n7+n8) end as n9
			from neraca_tmp 
			where modul='L' and nik_user='$nik_user' 
			order by rowindex ";
		//echo $sql;
		$rs = $dbLib->execute($sql);
		$i = 1;
		$tgl1=fnTanggal($periode);
		$tgl2=fnTanggal($periode_rev);
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>";
		echo "<table border='0' cellspacing='0' cellpadding='0' >
  <tr>
    <td class='lokasi_laporan' align='center'>$this->lokasi</td>
  </tr>
  <tr>
    <td  class='lokasi_laporan2' align='center'>LAPORAN AKTIVITAS</td>
  </tr>
  <tr>
    <td class='lokasi_laporan' align='center'>Untuk Periode Yang Berakhir Pada Tanggal $totime</td>
  </tr>
  <tr>
    <td align='center'>";
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr align='center' bgcolor='#CCCCCC'>
    <td width='400' class='header_laporan'>Keterangan</td>
    <td width='90' class='header_laporan' align='center'>PUSAT</td>
      <td width='90' class='header_laporan' align='center'>AREA 1</td>
      <td width='90' class='header_laporan' align='center'>AREA 2</td>
      <td width='90' class='header_laporan' align='center'>AREA 3</td>
	  <td width='90' class='header_laporan' align='center'>AREA 4</td>
	  <td width='90' class='header_laporan' align='center'>AREA 5</td>
	  <td width='90' class='header_laporan' align='center'>AREA 6</td>
	  <td width='90' class='header_laporan' align='center'>AREA 7</td>
	<td width='100' class='header_laporan' align='center'>TOTAL</td>
  </tr>";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$n1=""; $n2=""; $n3=""; $n4=""; $n5=""; $n6=""; $n7="";$n8="";$n9="";
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
			}
			echo "<tr>
     <td class='isi_laporan'>";
			echo fnSpasi($row->level_spasi);
			echo $row->nama;
			echo "</td>
    <td valign='top' class='isi_laporan' align='right'>";
			if ($row->tipe=="Posting" && $row->n8 <> 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','99','$periode');\">$n8</a>";
			}
			else
			{
				echo "$n8";
			}
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
	  <td valign='top' class='isi_laporan' align='right'>$n9</td>
  </tr>";
			$i=$i+1;
		}
	
	  echo " </table>";
	 
	
		echo "</td></tr>";
		echo "</table></div>";
		return "";
	}
	
}
?>
