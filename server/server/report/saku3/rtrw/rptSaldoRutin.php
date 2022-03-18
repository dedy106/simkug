<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_rtrw_rptSaldoRutin extends server_report_basic
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
			
		$sql = "select a.kode_rumah,a.kode_lokasi,a.rt,b.nama,isnull(c.bill_rt,0) as bill_rt,isnull(d.bayar_rt,0) as bayar_rt,isnull(e.tagihan_rt,0) as tagihan_rt
from rt_rumah a 
inner join rt_warga b on a.kode_penghuni=b.nik 
left join (select a.kode_rumah,a.kode_lokasi,sum(a.nilai_rt) as bill_rt 
			from rt_bill_d a 
			left join rt_angs_d b on a.kode_rumah=b.kode_rumah and a.kode_lokasi=b.kode_lokasi and a.periode=b.periode_bill and a.kode_jenis=b.kode_jenis 
			where a.kode_lokasi='$kode_lokasi' and a.kode_pp='$kode_pp' and a.kode_jenis = '$jenis' and b.kode_rumah is null and substring(a.periode,1,4)='$tahun'
			group by a.kode_rumah,a.kode_lokasi
			)c on a.kode_rumah=c.kode_rumah and a.kode_lokasi=c.kode_lokasi
left join (select a.kode_rumah,a.kode_lokasi,sum(a.nilai_rt) as bayar_rt 
			from rt_bill_d a 
			left join rt_angs_d b on a.kode_rumah=b.kode_rumah and a.kode_lokasi=b.kode_lokasi and a.periode=b.periode_bill and a.kode_jenis=b.kode_jenis 
			where a.kode_lokasi='$kode_lokasi' and a.kode_pp='$kode_pp' and a.kode_jenis = '$jenis' and b.kode_rumah is not null 
			group by a.kode_rumah,a.kode_lokasi
			)d on a.kode_rumah=d.kode_rumah and a.kode_lokasi=d.kode_lokasi
left join (select a.kode_rumah,a.kode_lokasi,sum(a.nilai_rt) as tagihan_rt 
			from rt_bill_d a 
			where a.kode_lokasi='$kode_lokasi' and a.kode_pp='$kode_pp' and a.kode_jenis = '$jenis' and substring(a.periode,1,4)='$tahun'
			group by a.kode_rumah,a.kode_lokasi
			)e on a.kode_rumah=e.kode_rumah and a.kode_lokasi=e.kode_lokasi
where a.kode_lokasi='$kode_lokasi' and b.flag_aktif='0'
order by a.kode_rumah ";
		echo $sql;
		$rs = $dbLib->execute($sql);	

		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("SALDO IURAN RUTIN",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='2' style='border-collapse: collapse' bordercolor='#111111'>
  <tr bgcolor='#CCCCCC'>
    <td width='30'   class='header_laporan' align='center'>No</td>
    <td width='60'  class='header_laporan' align='center'>Kode Rumah</td>
    <td width='250'  class='header_laporan' align='center'>Nama Penghuni</td>
    <td width='60'  class='header_laporan' align='center'>RT</td>
    <td width='90' class='header_laporan' align='center'>Tagihan</td>
    <td width='90' class='header_laporan' align='center'>Pembayaran</td>
	<td width='90' class='header_laporan' align='center'>Sisa Tagihan</td>
  </tr>
 ";
		$tagihan_rt=0; $bayar_rt=0;
		$bill_rt=0; $so_akhir=0;
		$i=1;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$tagihan_rt+=$row->tagihan_rt;
			$bayar_rt+=$row->bayar_rt;
			$bill_rt+=$row->bill_rt;
			$so_akhir+=$row->so_akhir;
			echo "<tr>
    <td class='isi_laporan' align='center'>$i</td>
    <td class='isi_laporan'>$row->kode_rumah</td>
    <td height='20' class='isi_laporan'>";
	echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBuku('$row->kode_rumah','$row->kode_lokasi','$periode','$row->rt');\">$row->nama</a>";

    echo "</td><td class='isi_laporan' align='center'>$row->rt</td>
	<td class='isi_laporan' align='right'>".number_format($row->tagihan_rt,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->bayar_rt,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->bill_rt,0,',','.')."</td>
  </tr>";
			
			$i=$i+1;
		}
		echo "<tr>
    <td height='20' colspan='4' class='sum_laporan' align='right'>Total</td>
    <td class='sum_laporan' align='right'>".number_format($tagihan_rt,0,',','.')."</td>
    <td class='sum_laporan' align='right'>".number_format($bayar_rt,0,',','.')."</td>
    <td class='sum_laporan' align='right'>".number_format($bill_rt,0,',','.')."</td>
</tr>";
		echo "</table></div>";
		return "";
	}
	
}
?>
