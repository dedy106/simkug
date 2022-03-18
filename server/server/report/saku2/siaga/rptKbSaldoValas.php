<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_siaga_rptKbSaldoValas extends server_report_basic
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
		$nik_user=$tmp[0];
		$periode=$tmp[1];
		$sql = "select a.kode_akun,a.nama,a.kode_lokasi,a.debet_curr,a.kredit_curr,a.so_awal_curr,a.so_akhir_curr, 
       case when a.so_awal_curr>0 then a.so_awal_curr else 0 end as so_awal_debet_curr,
       case when a.so_awal_curr<0 then -a.so_awal_curr else 0 end as so_awal_kredit_curr, 
       case when a.so_akhir_curr>0 then a.so_akhir_curr else 0 end as so_akhir_debet_curr,
       case when a.so_akhir_curr<0 then -a.so_akhir_curr else 0 end as so_akhir_kredit_curr
from glma_tmp a
inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
where b.kode_curr<>'IDR' and nik_user='$nik_user' and (a.so_awal_curr<>0 or a.debet_curr<>0 or a.kredit_curr<>0 or a.so_akhir_curr<>0) order by a.kode_akun ";
		
		$rs = $dbLib->execute($sql);	
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("SALDO KASBANK valas",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='2' style='border-collapse: collapse' bordercolor='#111111'>
  <tr bgcolor='#CCCCCC'>
    <td width='30' rowspan='2'  class='header_laporan' align='center'>No</td>
    <td width='50' rowspan='2' class='header_laporan' align='center'>Kode</td>
    <td width='250' rowspan='2' class='header_laporan' align='center'>Nama Akun</td>
    <td width='30' rowspan='2' class='header_laporan' align='center'>Lok</td>
    <td height='25' colspan='2' class='header_laporan' align='center'>Saldo Awal </td>
    <td colspan='2' class='header_laporan' align='center'>Mutasi</td>
    <td colspan='2' class='header_laporan' align='center'>Saldo Akhir </td>
  </tr>
  <tr bgcolor='#CCCCCC'> 
    <td width='90' height='25' class='header_laporan' align='center'>Debet</td>
    <td width='90' class='header_laporan' align='center'>Kredit</td>
    <td width='90' class='header_laporan' align='center'>Debet</td>
    <td width='90' class='header_laporan' align='center'>Kredit</td>
    <td width='90' class='header_laporan' align='center'>Debet</td>
    <td width='90' class='header_laporan' align='center'>Kredit</td>
  </tr>";
		$so_awal_debet_curr=0;
		$so_awal_kredit_curr=0;
		$debet_curr=0;
		$kredit_curr=0;
		$so_akhir_debet_curr=0;
		$so_akhir_kredit_curr=0;
		$i=1;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$so_awal_debet_curr=$so_awal_debet_curr+$row->so_awal_debet_curr;
			$so_awal_kredit_curr=$so_awal_kredit_curr+$row->so_awal_kredit_curr;
			$debet_curr=$debet_curr+$row->debet_curr;
			$kredit_curr=$kredit_curr+$row->kredit_curr;
			$so_akhir_debet_curr=$so_akhir_debet_curr + $row->so_akhir_debet_curr;
			$so_akhir_kredit_curr=$so_akhir_kredit_curr + $row->so_akhir_kredit_curr;
			echo "<tr>
    <td class='isi_laporan' align='center'>$i</td>
    <td class='isi_laporan'>$row->kode_akun</td>
    <td height='20' class='isi_laporan'>";
	echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBb('$row->kode_akun','$row->kode_lokasi','$periode');\">$row->nama</a>";

    echo "</td><td class='isi_laporan' align='center'>$row->kode_lokasi</td>
<td class='isi_laporan' align='right'>".number_format($row->so_awal_debet_curr,2,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->so_awal_kredit_curr,2,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->debet_curr,2,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->kredit_curr,2,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->so_akhir_debet_curr,2,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->so_akhir_kredit_curr,2,',','.')."</td>
  </tr>";
			
			$i=$i+1;
		}
		echo "<tr>
    <td height='20' colspan='4' class='sum_laporan' align='right'>Total</td>
    <td class='sum_laporan' align='right'>".number_format($so_awal_debet_curr,2,',','.')."</td>
    <td class='sum_laporan' align='right'>".number_format($so_awal_kredit_curr,2,',','.')."</td>
    <td class='sum_laporan' align='right'>".number_format($debet_curr,2,',','.')."</td>
    <td class='sum_laporan' align='right'>".number_format($kredit_curr,2,',','.')."</td>
    <td class='sum_laporan' align='right'>".number_format($so_akhir_debet_curr,2,',','.')."</td>
    <td class='sum_laporan' align='right'>".number_format($so_akhir_kredit_curr,2,',','.')."</td>
</tr>";
		echo "</table></div>";
		return "";
	}
	
}
?>
