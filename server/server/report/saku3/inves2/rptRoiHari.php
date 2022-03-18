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
class server_report_saku3_inves2_rptRoiHari extends server_report_basic
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
		
		//get max date
		$bulan=intval(substr($periode,4,2));
		$tahun=substr($periode,0,4);
		$d=cal_days_in_month(CAL_GREGORIAN,$bulan,$tahun);
		
		$sql="exec sp_inv_roi '$kode_fs','$periode','$kode_lokasi','$nik_user' ";
		$rs = $dbLib->execute($sql);	
		$sql = "select kode_neraca,kode_fs,kode_lokasi,nama,tipe,level_spasi,n0, n1, 
                      n2, n3, n4, n5, n6, n7, n8, n9, n10, n11, n12, n13, n14, n15, n16, n17, n18, n19, n20, n21, n22, n23, n24, n25, n26, n27, n28, n29, n30, n31
			from neraca_tmp 
			where nik_user='$nik_user' 
			order by rowindex ";
		$rs = $dbLib->execute($sql);
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		
		//echo $AddOnLib->judul_laporan($nama_form,$this->lokasi,$AddOnLib->ubah_periode($periode));
		$bln = substr($periode,4);
		$thn = substr($periode,0,4);
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>";
		//echo $AddOnLib->judul_laporan("laporan laba rugi",$this->lokasi,"Per $totime");
		echo "<table border='0' cellspacing='0' cellpadding='0' >
  <tr>
    <td class='lokasi_laporan' align='center'>$this->lokasi</td>
  </tr>
  <tr>
    <td  class='lokasi_laporan2' align='center'>LAPORAN ROI HARIAN</td>
  </tr>
  <tr>
    <td class='lokasi_laporan' align='center'>$AddOnLib->ubah_periode($periode)</td>
  </tr>
  <tr>
    <td align='center'>";
		echo "<table border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td><table border='1' cellspacing='0' cellpadding='0' class='kotak' width='2500'>
		  <tr bgcolor='#CCCCCC'>
			<td width='200' height='25'  class='header_laporan' align='center'>Kelompok Aset dan Jenis Investasi</td>";
		for ($x = 1; $x <= $d; $x++) {
			$date=date_create("$tahun-$bulan-$x");
			$tgl=date_format($date,"d/m/Y");
			echo "<td width='60' class='header_laporan' align='center'>$tgl</td>";
		} 
		echo "</tr>";
		
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			
			echo "<tr><td height='20' class='isi_laporan'>";
			echo fnSpasi($row->level_spasi);
			echo "$row->nama";
			echo "</td>";
			
				for ($x = 1; $x <= $d; $x++) {
					$tmp="\$row->n$x";
					eval("\$str = \"$tmp\";");
					if ($row->tipe=="Posting")
					{
						echo "<td class='isi_laporan' align='center'>".number_format($str,4,",",".")."</td>";
					}
					else
					{
						echo "<td class='isi_laporan' align='center'>&nbsp;</td>";
					}
				}
			
			echo "</tr>";
			
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
