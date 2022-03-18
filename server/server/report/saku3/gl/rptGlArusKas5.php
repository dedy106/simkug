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
class server_report_saku3_gl_rptGlArusKas5 extends server_report_basic
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
		$nik_user=$tmp[0];
		$kode_lokasi=$tmp[1];
		$periode=$tmp[2];
		$kode_fs=$tmp[3];
		
		$periode2=$tmp[4];
		$periode3=$tmp[5];
		$periode4=$tmp[6];
		$periode5=$tmp[7];
		$tahun=substr($periode,0,4);
		$tahun_rev=strval(intval($tahun)-1);
		$bulan=substr($periode,4,2);
		$periode_rev=strval(intval($tahun)-1).$bulan;
		if ($bulan=="01") {$bulan="JANUARI";};
		if ($bulan=="02") {$bulan="FEBRUARI";};
		if ($bulan=="03") {$bulan="MARET";};
		if ($bulan=="04") {$bulan="APRIL";};
		if ($bulan=="05") {$bulan="MEI";};
		if ($bulan=="06") {$bulan="JUNI";};
		if ($bulan=="07") {$bulan="JULI";};
		if ($bulan=="08") {$bulan="AGUSTUS";};
		if ($bulan=="09") {$bulan="SEPTEMBER";};
		if ($bulan=="10") {$bulan="OKTOBER";};
		if ($bulan=="11") {$bulan="NOVEMBER";};
		if ($bulan=="12") {$bulan="DESEMBER";};
		if ($bulan=="13") {$bulan="DESEMBER";};
		$sql="exec sp_aruskas5 '$kode_lokasi','FS1','$periode','$periode2','$periode3','$periode4','$periode5','$nik_user'";
		
		$rs = $dbLib->execute($sql);		
		$sql = "select kode_neraca,kode_fs,kode_lokasi,nama,tipe,level_spasi, 
					   case jenis_akun when  'Beban' then -n1 else -n1 end as n1,
					   case jenis_akun when  'Beban' then -n2 else -n2 end as n2,
					   case jenis_akun when  'Beban' then -n3 else -n3 end as n3,
					   case jenis_akun when  'Beban' then -n4 else -n4 end as n4,
					   case jenis_akun when  'Beban' then -n5 else -n5 end as n5
			from neraca_tmp 
			where nik_user='$nik_user' 
			order by rowindex ";
		
		$rs = $dbLib->execute($sql);
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
		echo "<div align='center'>"; 
		echo "<table border='0' cellspacing='0' cellpadding='0' >
  <tr>
    <td class='lokasi_laporan' align='center'>$this->lokasi</td>
  </tr>
  <tr>
    <td  class='lokasi_laporan2' align='center'>LAPORAN ARUS KAS</td>
  </tr>
  <tr>
    <td class='lokasi_laporan' align='center'>Untuk Periode Yang Berakhir Pada Tanggal $totime</td>
  </tr>
  <tr>
    <td align='center'>";
		
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr align='center' bgcolor='#dbeef3'>
    <td width='350' class='header_laporan' >URAIAN</td>
    <td width='100' class='header_laporan' align='center'>".$AddOnLib->ubah_periode($periode)."</td>
<td width='100' class='header_laporan' align='center'>".$AddOnLib->ubah_periode($periode2)."</td>
<td width='100' class='header_laporan' align='center'>".$AddOnLib->ubah_periode($periode3)."</td>
<td width='100' class='header_laporan' align='center'>".$AddOnLib->ubah_periode($periode4)."</td>
<td width='100' class='header_laporan' align='center'>".$AddOnLib->ubah_periode($periode5)."</td>
  </tr>
 ";
		
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$persen1="'";$persen2="'";
			$n1="";$n2="";$n3="";$n4="";$n5="";
			if ($row->tipe!="Header" && $row->nama!="." && $row->nama!="")
			{
				$n1=number_format($row->n1,0,",",".");
				$n2=number_format($row->n2,0,",",".");
				$n3=number_format($row->n3,0,",",".");
				$n4=number_format($row->n4,0,",",".");
				$n5=number_format($row->n5,0,",",".");
			}
		
			echo "<tr>
    <td class='isi_laporan'>";
			echo fnSpasi($row->level_spasi);
			echo $row->nama;
			echo "</td>
     <td valign='top' class='isi_laporan' align='right'>$n1</td>
    <td valign='top' class='isi_laporan' align='right'>$n2</td>
    <td valign='top' class='isi_laporan' align='right'>$n3</td>
	<td valign='top' class='isi_laporan' align='right'>$n4</td>
	<td valign='top' class='isi_laporan' align='right'>$n5</td>
  </tr>";
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
