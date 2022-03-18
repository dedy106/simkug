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

class server_report_saku3_yakes21_gl_rptGlNeracaNetoUbah extends server_report_basic
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
		$periode12 = $tahunrev.'12'; 
		if ($kode_lokasi=="") {
			$kode_lokasi='00';
		}

		$sql="exec sp_neraca_yk '$kode_fs','A','S','$lev','$periode','$kode_lokasi','$nik_user' ";
		
		$rs = $dbLib->execute($sql);	
		
		
		$i = 1;
		$tgl1=fnTanggal($periode);
		$tgl2=fnTanggal($periode12);
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>";
		echo "<table border='0' cellspacing='0' cellpadding='0' >
  <tr>
    <td class='lokasi_laporan' align='center'>YAYASAN KESEHATAN PEGAWAI TELKOM</td>
  </tr>
  <tr>
    <td  class='lokasi_laporan2' align='center'>LAPORAN PERUBAHAN ASET NETTO</td>
  </tr>
  <tr>
    <td class='lokasi_laporan' align='center'>Per $tgl1 , $tgl2</td>
  </tr>
  <tr>
    <td class='lokasi_laporan' align='center'>(Disajikan dalam Rupiah)</td>
  </tr>
  <tr>
    <td align='center'>";
		echo "<table border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td><table border='1' cellspacing='0' cellpadding='0' class='kotak' width='800'>
		  <tr bgcolor='#CCCCCC'>
			<td width='500' height='25'  class='header_laporan'><div align='center'>Deskripsi</div></td>
			<td width='150' class='header_laporan'><div align='center'>$tgl1</div></td>
			<td width='150' class='header_laporan'><div align='center'>$tgl2</div></td>
		</tr>";
		$sql = "select kode_neraca,kode_fs,kode_lokasi,nama,tipe,level_spasi,n1*-1 as n1,n2*-1 as n2
			from neraca_tmp 
			where modul='M' and nik_user='$nik_user' 
			order by rowindex ";
		
		$rs = $dbLib->execute($sql);
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			
			$n1="";$n2="";
		
			if ($row->tipe!="Header" && $row->nama!="." && $row->nama!="")
			{
				$n1=number_format($row->n1,0,",",".");
				$n2=number_format($row->n2,0,",",".");
			}
			echo "<tr>";
			
			echo "<td height='20' class='isi_laporan'>";
			echo fnSpasi($row->level_spasi);
			echo "$row->nama</td>";
			
			if ($row->tipe=="Posting" && $row->n1 <> 0)
			{
				echo "<td height='20' class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','$row->kode_lokasi','$periode');\">$n1</a></td>";
			}
			else
			{
				echo "<td height='20' class='isi_laporan' align='right'>$n1</td>";
			}
			if ($row->tipe=="Posting" && $row->n3 <> 0)
			{
				echo "<td height='20' class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','$row->kode_lokasi','$periode_rev');\">$n2</a></td>";
			}
			else
			{
				echo "<td height='20' class='isi_laporan' align='right'>$n2</td>";
			}
			echo "</tr>";
			
			$i=$i+1;
		}
		
		echo "</table></td>
  </tr>";
		echo "</table></div>";
		return "";
	}
	
}
?>
