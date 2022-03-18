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
class server_report_saku3_yakes_inves_rptAlokasi extends server_report_basic
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
		$tgl=$tmp[3];
		$kode_fs=$tmp[4];
		$komp=$tmp[5];
		$kode_plan=$tmp[6];
		$sql="exec sp_inv_portofolio3 '$kode_fs','$periode','$kode_lokasi','$nik_user','$tgl','$komp','$kode_plan' ";
		$rs = $dbLib->execute($sql);	
		$sql = "select kode_neraca,kode_fs,kode_lokasi,nama,tipe,level_spasi,n1,n2,n3,(n3 / (select n3 from neraca_tmp where nik_user='$nik_user' and kode_neraca='6') * 100) as n4 
		from neraca_tmp where nik_user='$nik_user' 
		order by rowindex ";
			// echo $sql;
		$rs = $dbLib->execute($sql);
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
        
        // $persen=" (RD Campuran : FI 30 Saham 70) ";
		// if ($komp=="5050")
		// {
		// 	$persen=" (RD Campuran : FI 50 Saham 50) ";
        // }
        
		//echo $AddOnLib->judul_laporan($nama_form,$this->lokasi,$AddOnLib->ubah_periode($periode));
		// $bln = substr($periode,4);
		$thn = substr($tgl,0,4);
		$date = substr($tgl,8,2);
		// if (floatval($bln) > 12) $bln = 12;
		// $totime = date("d M Y",strtotime("-1 second",strtotime("+1 month",strtotime($bln.'/01/'.$thn.' 00:00:00'))));
		// $now = strtotime(date("d M Y"));
		// $time = strtotime($totime);
		$bln = $AddOnLib->ubah_bulan(substr($tgl,5,2));
		// $totime = explode(" ",$totime);
		// if ($time > $now){
		// 	 $now = date("d M Y");
		// 	 $now = explode(" ",$now);
		// 	 $totime[0] = $now[0];
		// }		
		// $totime = $totime[0] . " ". $bln ." ". $totime[2];
		$totime = $date." ".$bln." ".$thn;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>";
		//echo $AddOnLib->judul_laporan("laporan laba rugi",$this->lokasi,"Per $totime");
		echo "<table border='0' cellspacing='0' cellpadding='0' >
  <tr>
    <td class='lokasi_laporan' align='center'>$this->lokasi</td>
  </tr>
  <tr>
    <td  class='lokasi_laporan2' align='center'>LAPORAN KOMPOSISI ALOKASI ASET $persen</td>
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
			if((($row->tipe =="Header" || $row->tipe == "Summary") && strlen($row->kode_neraca) == 1 ) || strlen($row->kode_neraca) == 1){
				$style="style='font-weight:bold'";
			}else{
				$style="";
			}
			echo "<tr $style ><td height='20' class='isi_laporan'>";
			echo fnSpasi($row->level_spasi);
			echo "$row->nama";
			echo "</td>
				<td class='isi_laporan' align='right'>".number_format($row->n1,0,",",".")."</td>
				<td class='isi_laporan' align='right'>".number_format($row->n2,0,",",".")."</td>
				<td class='isi_laporan' align='right'>".number_format($row->n3,0,",",".")."</td>
				<td class='isi_laporan' align='center'>".number_format($row->n4,2,",",".")." %</td>
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
