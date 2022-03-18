<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_kb_rptKbSaldoCurr extends server_report_basic
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
		$periode=$tmp[1];
		$nik_user=$tmp[2];
		$jenis=$tmp[3];
		$sql="exec sp_kas_dw_curr_tmp '$kode_lokasi','$periode','$nik_user' ";
		
		$mutasi="";
		if ($jenis=="Tidak")
		{
			$mutasi="and (a.so_awal_curr<>0 or a.debet_curr<>0 or a.kredit_curr<>0 or a.so_akhir_curr<>0) ";
		}
		$rs = $dbLib->execute($sql);
		$sql = "select kode_akun,nama,kode_lokasi,debet_curr,kredit_curr,so_awal_curr,so_akhir_curr,kode_curr,
       case when so_awal_curr>0 then so_awal_curr else 0 end as so_awal_curr_debet,
       case when so_awal_curr<0 then -so_awal_curr else 0 end as so_awal_curr_kredit, 
       case when so_akhir_curr>0 then so_akhir_curr else 0 end as so_akhir_curr_debet,
       case when so_akhir_curr<0 then -so_akhir_curr else 0 end as so_akhir_curr_kredit
from glma_tmp $this->filter and nik_user='$nik_user' $mutasi order by kode_akun ";
		
		$rs = $dbLib->execute($sql);	
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("SALDO KASBANK",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='2' style='border-collapse: collapse' bordercolor='#111111'>
  <tr bgcolor='#CCCCCC'>
    <td width='30' rowspan='2'  class='header_laporan' align='center'>No</td>
    <td width='50' rowspan='2' class='header_laporan' align='center'>Kode</td>
    <td width='250' rowspan='2' class='header_laporan' align='center'>Nama Akun</td>
    <td width='30' rowspan='2' class='header_laporan' align='center'>Curr</td>
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
		$so_awal_curr_debet=0;
		$so_awal_curr_kredit=0;
		$debet_curr=0;
		$kredit_curr=0;
		$so_akhir_curr_debet=0;
		$so_akhir_curr_kredit=0;
		$i=1;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$so_awal_curr_debet=$so_awal_curr_debet+$row->so_awal_curr_debet;
			$so_awal_curr_kredit=$so_awal_curr_kredit+$row->so_awal_curr_kredit;
			$debet_curr+=$row->debet_curr;
			$kredit_curr+=$row->kredit_curr;
			$so_akhir_curr_debet=$so_akhir_curr_debet + $row->so_akhir_curr_debet;
			$so_akhir_curr_kredit=$so_akhir_curr_kredit + $row->so_akhir_curr_kredit;
			echo "<tr>
    <td class='isi_laporan' align='center'>$i</td>
    <td class='isi_laporan'>$row->kode_akun</td>
    <td height='20' class='isi_laporan'>";
	echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBb('$row->kode_akun','$row->kode_lokasi','$periode');\">$row->nama</a>";

    echo "</td><td class='isi_laporan' align='center'>$row->kode_curr</td>
<td class='isi_laporan' align='right'>".number_format($row->so_awal_curr_debet,2,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->so_awal_curr_kredit,2,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->debet_curr,2,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->kredit_curr,2,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->so_akhir_curr_debet,2,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->so_akhir_curr_kredit,2,',','.')."</td>
  </tr>";
			
			$i=$i+1;
		}
		echo "<tr>
    <td height='20' colspan='4' class='sum_laporan' align='right'>Total</td>
    <td class='sum_laporan' align='right'>".number_format($so_awal_curr_debet,2,',','.')."</td>
    <td class='sum_laporan' align='right'>".number_format($so_awal_curr_kredit,2,',','.')."</td>
    <td class='sum_laporan' align='right'>".number_format($debet,2,',','.')."</td>
    <td class='sum_laporan' align='right'>".number_format($kredit,2,',','.')."</td>
    <td class='sum_laporan' align='right'>".number_format($so_akhir_curr_debet,2,',','.')."</td>
    <td class='sum_laporan' align='right'>".number_format($so_akhir_curr_kredit,2,',','.')."</td>
</tr>";
		echo "</table></div>";
		return "";
	}
	
}
?>
