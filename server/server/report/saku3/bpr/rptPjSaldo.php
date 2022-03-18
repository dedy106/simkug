<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_bpr_rptPjSaldo extends server_report_basic
{
	
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$mutasi=$tmp[1];
		$periode=$tmp[2];
		$sql = "select count(kode_akun) as jum from glma_tmp ";
		if ($mutasi=="Tidak")
		{
		  $sql = "$this->filter and nik_user='$nik_user' and (so_awal<>0 or debet<>0 or kredit<>0 or so_akhir<>0) ";
		}
		else
		{
		  $sql="$this->filter and nik_user='$nik_user'";
		}
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
		$mutasi=$tmp[1];
		$periode=$tmp[2];
		$sql = "select kode_akun,nama,'*' as lokasi,debet,kredit,so_awal,so_akhir, 
       case when so_awal>0 then so_awal else 0 end as so_awal_debet,
       case when so_awal<0 then -so_awal else 0 end as so_awal_kredit, 
       case when so_akhir>0 then so_akhir else 0 end as so_akhir_debet,
       case when so_akhir<0 then -so_akhir else 0 end as so_akhir_kredit
from glma_tmp ";
		if ($mutasi=="Tidak")
		{
		  $sql = "$this->filter and nik_user='$nik_user' and (so_awal<>0 or debet<>0 or kredit<>0 or so_akhir<>0) order by kode_akun ";
		}
		else
		{
		  $sql ="$this->filter and nik_user='$nik_user' order by kode_akun ";
		}
		error_log($sql);
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		$html=$AddOnLib->judul_laporan("laporan saldo panjar",$this->lokasi,$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='2' style='border-collapse: collapse' bordercolor='#111111'>
  <tr bgcolor='#CCCCCC'>
    <td width='30' rowspan='2'  class='header_laporan'><div align='center'>No</div></td>
    <td width='50' rowspan='2' class='header_laporan'><div align='center'>Kode</div></td>
    <td width='200' rowspan='2' class='header_laporan'><div align='center'>Nama Akun</div></td>
    <td width='30' rowspan='2' class='header_laporan'><div align='center'>Lok</div></td>
    <td height='25' colspan='2' class='header_laporan'><div align='center'>Saldo Awal </div></td>
    <td colspan='2' class='header_laporan'><div align='center'>Mutasi</div></td>
    <td colspan='2' class='header_laporan'><div align='center'>Saldo Akhir </div></td>
  </tr>
  <tr bgcolor='#CCCCCC'> 
    <td width='90' height='25' class='header_laporan'><div align='center'>Debet</div></td>
    <td width='90' class='header_laporan'><div align='center'>Kredit</div></td>
    <td width='90' class='header_laporan'><div align='center'>Debet</div></td>
    <td width='90' class='header_laporan'><div align='center'>Kredit</div></td>
    <td width='90' class='header_laporan'><div align='center'>Debet</div></td>
    <td width='90' class='header_laporan'><div align='center'>Kredit</div></td>
  </tr>";
		$so_awal_debet=0;
		$so_awal_kredit=0;
		$debet=0;
		$kredit=0;
		$so_akhir_debet=0;
		$so_akhir_kredit=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$so_awal_debet=$so_awal_debet+$row->so_awal_debet;
			$so_awal_kredit=$so_awal_kredit+$row->so_awal_kredit;
			$debet=$debet+$row->debet;
			$kredit=$kredit+$row->kredit;
			$so_akhir_debet=$so_akhir_debet + $row->so_akhir_debet;
			$so_akhir_kredit=$so_akhir_kredit + $row->so_akhir_kredit;
			echo "<tr>
    <td class='isi_laporan'>
      <div align='center'>$i</div></td>
    <td class='isi_laporan'>$row->kode_akun</td>
    <td height='20' class='isi_laporan'>$row->nama</td>
    <td class='isi_laporan'>$row->kode_lokasi</td>
<td class='isi_laporan'><div align='right'>".number_format($row->so_awal_debet,0,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($row->so_awal_kredit,0,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($row->debet,0,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($row->kredit,0,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($row->so_akhir_debet,0,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($row->so_akhir_kredit,0,',','.')."</div></td>
  </tr>";
			
			$i=$i+1;
		}
		
		echo "<tr>
    <td height='20' colspan='4' class='sum_laporan'><div align='right'>Total</div></td>
    <td class='sum_laporan'><div align='right'>".number_format($so_awal_debet,0,',','.')."</div></td>
    <td class='sum_laporan'><div align='right'>".number_format(abs($so_awal_kredit),0,',','.')."</div></td>
    <td class='sum_laporan'><div align='right'>".number_format($debet,0,',','.')."</div></td>
    <td class='sum_laporan'><div align='right'>".number_format($kredit,0,',','.')."</div></td>
    <td class='sum_laporan'><div align='right' >".number_format($so_akhir_debet,0,',','.')."</div></td>
    <td class='sum_laporan'><div align='right' >".number_format(abs($so_akhir_kredit),0,',','.')."</div></td>
</tr>
</table>";
		
		return $html;
	}
	
}

?>
