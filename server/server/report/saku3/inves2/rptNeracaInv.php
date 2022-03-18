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
class server_report_saku3_investasi_rptNeracaInv extends server_report_basic
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
		$kode_fs=$tmp[4];
		$sql="exec sp_inv_dw '$kode_fs','$periode','$kode_lokasi','$nik_user' ";
		
		$rs = $dbLib->execute($sql);	
		
		$sql = "select kode_neraca,kode_fs,kode_lokasi,nama,tipe,level_spasi,n1,n2,n3,n4
			from neraca_tmp 
			where nik_user='$nik_user' 
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
		//echo $AddOnLib->judul_laporan("laporan laba rugi",$this->lokasi,"Per $totime");
		echo "<table border='0' cellspacing='0' cellpadding='0' >
  <tr>
    <td class='lokasi_laporan' align='center'>$this->lokasi</td>
  </tr>
  <tr>
    <td  class='lokasi_laporan2' align='center'>LAPORAN PORTOFOLIO</td>
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
			<td width='400' height='25'  class='header_laporan' align='center'>Kelompok Aset dan Jenis Investasi</td>
			<td width='100' class='header_laporan' align='center'>Harga Perolehan</td>
			<td width='100' class='header_laporan' align='center'>Nilai Buku</td>
			<td width='100' class='header_laporan' align='center'>Nilai Wajar</td>
			<td width='60' class='header_laporan' align='center'>Komposisi Nilai Wajar</td>
		</tr>";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$n1="";$n2="";$n3="";$n4="";
			if ($row->tipe!="Header" && $row->nama!=".")
			{
				$n1=number_format($row->n1,0,",",".");
				$n2=number_format($row->n2,0,",",".");
				$n3=number_format($row->n3,0,",",".");
				$n4=number_format($row->n4,2,",",".");
			}
			echo "<tr><td height='20' class='isi_laporan'>";
			echo fnSpasi($row->level_spasi);
			echo "$row->nama";
			echo "</td>
				<td class='isi_laporan' align='right'>$n1</td>
				<td class='isi_laporan' align='right'>$n2</td>
				<td class='isi_laporan' align='right'>$n3</td>
				<td class='isi_laporan' align='center'>$n4 %</td>
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
