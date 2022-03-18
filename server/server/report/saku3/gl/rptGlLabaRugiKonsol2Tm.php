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
class server_report_saku3_gl_rptGlLabaRugiKonsol2Tm extends server_report_basic
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
		$periode=$tmp[1];
		$nik_user=$tmp[0];
		$kode_lokasi=$tmp[2];
		$periode2=$tmp[3];
		$kode_fs=$tmp[4];
		
		$sql="exec sp_neraca_konsol2 '$kode_fs','L','K','1','$periode','$periode2','$kode_lokasi','$nik_user' ";
		
		$rs = $dbLib->execute($sql);
		$sql = "select kode_neraca,kode_fs,kode_lokasi,nama,tipe,level_spasi,
				 case jenis_akun when  'Pendapatan' then -n1 else n1 end as n1,
				   case jenis_akun when  'Pendapatan' then -n2 else n2 end as n2
			from neraca_tmp 
			where modul='L' and nik_user='$nik_user' 
			order by rowindex ";
		
		$rs = $dbLib->execute($sql);
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		
		//echo $AddOnLib->judul_laporan($nama_form,$this->lokasi,$AddOnLib->ubah_periode($periode));
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
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>";
		//echo $AddOnLib->judul_laporan("laporan aktifitas",$this->lokasi,"Untuk Periode Yang Berakhir Pada Tanggal $totime");
		echo "<table border='0' cellspacing='0' cellpadding='0' >
  <tr>
    <td class='lokasi_laporan' align='center'>$this->lokasi</td>
  </tr>
  <tr>
    <td  class='lokasi_laporan2' align='center'>LAPORAN LABARUGI</td>
  </tr>
  <tr>
    <td class='lokasi_laporan' align='center'>Untuk Periode Yang Berakhir Pada Tanggal $totime</td>
  </tr>
  <tr>
    <td align='center'>";
		echo "<table border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td><table border='1' cellspacing='0' cellpadding='0' class='kotak'>
		  <tr bgcolor='#CCCCCC'>
			<td width='500' height='25'  class='header_laporan'><div align='center'>Deskripsi</div></td>
			<td width='100' class='header_laporan' align='center'>$periode</td>
			<td width='100' class='header_laporan' align='center'>$periode2</td>
		</tr>";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai1="";$nilai2="";
			if ($row->tipe!="Header" && $row->nama!="." && $row->nama!="")
			{
				$nilai1=number_format($row->n1,0,",",".");
				$nilai2=number_format($row->n2,0,",",".");
			}
			echo "<tr><td height='20' class='isi_laporan'>";
			echo fnSpasi($row->level_spasi);
			echo $row->nama;
			echo "</td>
    <td valign='top' class='isi_laporan' align='right'>";
			if ($row->tipe=="Posting" && $row->n1 <> 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTbJejer('$row->kode_neraca','$kode_lokasi','$periode');\">$nilai1</a>";
			}
			else
			{
				echo "$nilai1";
			}
			echo "</td>
    <td valign='top' class='isi_laporan' align='right'>";
			if ($row->tipe=="Posting" && $row->n2 <> 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTbJejer('$row->kode_neraca','$kode_lokasi','$periode2');\">$nilai2</a>";
			}
			else
			{
				echo "$nilai2";
			}
			echo "</td>";
			echo " </tr>";
			
			$i=$i+1;
		}
		echo "</table></td>
  </tr>";
		echo "</td></tr>";
		echo "</table></div>";
		return "";
	}
	
}
?>
