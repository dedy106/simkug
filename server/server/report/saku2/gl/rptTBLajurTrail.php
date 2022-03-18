<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_gl_rptTBLajurTrail extends server_report_basic
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
		$sql = "select distinct kode_akun,nama,kode_lokasi,debet,kredit,so_awal,so_akhir, 
       case when so_awal>0 then so_awal else 0 end as so_awal_debet,
       case when so_awal<0 then -so_awal else 0 end as so_awal_kredit, 
       case when so_akhir>0 then so_akhir else 0 end as so_akhir_debet,
       case when so_akhir<0 then -so_akhir else 0 end as so_akhir_kredit
from glma_tmp where nik_user='$nik_user' and (so_awal<>0 or debet<>0 or kredit<>0 or so_akhir<>0) order by kode_akun ";
		
		$rs = $dbLib->execute($sql);	
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("NERACA LAJUR",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='2' style='border-collapse: collapse' bordercolor='#111111'>
  <tr bgcolor='#CCCCCC'>
    <td width='30' rowspan='2'  class='header_laporan' align='center'>No</td>
    <td width='50' rowspan='2' class='header_laporan' align='center'>Kode</td>
    <td width='200' rowspan='2' class='header_laporan' align='center'>Nama Akun</td>
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
		$so_awal_debet=0;
		$so_awal_kredit=0;
		$debet=0;
		$kredit=0;
		$so_akhir_debet=0;
		$so_akhir_kredit=0;
		$i=1;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$so_awal_debet=$so_awal_debet+$row->so_awal_debet;
			$so_awal_kredit=$so_awal_kredit+$row->so_awal_kredit;
			$debet=$debet+$row->debet;
			$kredit=$kredit+$row->kredit;
			$so_akhir_debet=$so_akhir_debet + $row->so_akhir_debet;
			$so_akhir_kredit=$so_akhir_kredit + $row->so_akhir_kredit;
			echo "<tr>
    <td class='isi_laporan' align='center'>$i</td>
    <td class='isi_laporan'>$row->kode_akun</td>
    <td height='20' class='isi_laporan'>";
	echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBb('$row->kode_akun','$row->kode_lokasi','$periode');\">$row->nama</a>";

    echo "</td><td class='isi_laporan' align='center'>$row->kode_lokasi</td>
<td class='isi_laporan' align='right'>".number_format($row->so_awal_debet,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->so_awal_kredit,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->debet,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->kredit,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->so_akhir_debet,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->so_akhir_kredit,0,',','.')."</td>
  </tr>";
			
			$i=$i+1;
		}
		echo "<tr>
    <td height='20' colspan='4' class='sum_laporan' align='right'>Total</td>
    <td class='sum_laporan' align='right'>".number_format($so_awal_debet,0,',','.')."</td>
    <td class='sum_laporan' align='right'>".number_format($so_awal_kredit,0,',','.')."</td>
    <td class='sum_laporan' align='right'>".number_format($debet,0,',','.')."</td>
    <td class='sum_laporan' align='right'>".number_format($kredit,0,',','.')."</td>
    <td class='sum_laporan' align='right'>".number_format($so_akhir_debet,0,',','.')."</td>
    <td class='sum_laporan' align='right'>".number_format($so_akhir_kredit,0,',','.')."</td>
</tr>";
		echo "</table></div>";
		return "";
	}
	
}
?>
