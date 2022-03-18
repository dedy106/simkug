<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_rtrw_rptSaldoLain extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$mutasi=$tmp[1];
		$periode=$tmp[2];
		$sql = "select 1 ";
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
		$kode_pp=$tmp[1];
		$tahun=$tmp[2];
		$kode_rumah=$tmp[3];
		$jenis=$tmp[4];
		
		$sql="select nama from pp where kode_lokasi='$kode_lokasi' and kode_pp='$kode_pp'";
		$rs = $dbLib->execute($sql);
		$row=$rs->FetchNextObject($toupper=false);
		$nama_pp=$row->nama;
		
		$sql="select nama from rt_iuran_jenis where kode_lokasi='$kode_lokasi' and kode_jenis='$jenis'";
		$rs = $dbLib->execute($sql);
		$row=$rs->FetchNextObject($toupper=false);
		$nama_jenis=$row->nama;
		
			
		$sql = "select a.kode_rumah,a.kode_lokasi,a.rt,b.nama,isnull(c.bayar_rt,0) as bayar_rt
		from rt_rumah a 
		inner join rt_warga b on a.kode_penghuni=b.nik 
		left join (select a.kode_rumah,a.kode_lokasi,sum(a.nilai_rt+a.nilai_rw) as bayar_rt 
					from rt_angs_d a 
					where a.kode_lokasi='$kode_lokasi' and a.kode_pp='$kode_pp' and a.kode_jenis = '$jenis' 
					group by a.kode_rumah,a.kode_lokasi
					)c on a.kode_rumah=c.kode_rumah and a.kode_lokasi=c.kode_lokasi
		where a.kode_lokasi='$kode_lokasi' and isnull(c.bayar_rt,0)<>0
		order by a.kode_rumah ";
	
		$rs = $dbLib->execute($sql);	

		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("SALDO $nama_jenis ",$this->lokasi."<br>$nama_rt","TAHUN $tahun ");
		echo "<table border='1' cellspacing='0' cellpadding='2' style='border-collapse: collapse' bordercolor='#111111'>
  <tr bgcolor='#CCCCCC'>
    <td width='30'   class='header_laporan' align='center'>No</td>
    <td width='60'  class='header_laporan' align='center'>Kode Rumah</td>
    <td width='250'  class='header_laporan' align='center'>Nama Penghuni</td>
    <td width='90' class='header_laporan' align='center'>Pembayaran</td>
  </tr>
 ";
		$bayar_rt=0;
	
		$i=1;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			
			$bayar_rt+=$row->bayar_rt;
			echo "<tr>
    <td class='isi_laporan' align='center'>$i</td>
    <td class='isi_laporan'>$row->kode_rumah</td>
    <td height='20' class='isi_laporan'>";
	echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBuku('$row->kode_rumah','$row->kode_lokasi','$periode','$row->rt');\">$row->nama</a>";

    echo "
    <td class='isi_laporan' align='right'>".number_format($row->bayar_rt,0,',','.')."</td>
  </tr>";
			
			$i=$i+1;
		}
		echo "<tr>
    <td height='20' colspan='3' class='sum_laporan' align='right'>Total</td>
    <td class='sum_laporan' align='right'>".number_format($bayar_rt,0,',','.')."</td>
</tr>";
		echo "</table></div>";
		return "";
	}
	
}
?>
