<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_gl_rptTBLajurFakultas extends server_report_basic
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
		$mutasi=$tmp[1];
		$periode=$tmp[2];
		$trail=$tmp[3];
		
		$sql = "select a.kode_akun,d.nama,c.kode_fakultas,c.nama as nama_fakultas,sum(debet) as debet,sum(kredit) as kredit,
	   sum(case when a.so_awal>0 then a.so_awal else 0 end) as so_awal_debet,
       sum(case when a.so_awal<0 then -a.so_awal else 0 end) as so_awal_kredit, 
       sum(case when a.so_akhir>0 then a.so_akhir else 0 end) as so_akhir_debet,
       sum(case when a.so_akhir<0 then -a.so_akhir else 0 end) as so_akhir_kredit
from glma_pp_tmp a
inner join pp_fakultas b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
inner join aka_fakultas c on b.kode_fakultas=c.kode_fakultas and b.kode_lokasi=c.kode_lokasi
inner join masakun d on a.kode_akun=d.kode_akun and a.kode_lokasi=d.kode_lokasi
";
		
		if ($mutasi=="Tidak")
		{
		  $sql.=$this->filter." and a.nik_user='$nik_user' and (a.so_awal<>0 or a.debet<>0 or a.kredit<>0 or a.so_akhir<>0) group by a.kode_akun,d.nama,c.kode_fakultas,c.nama  order by a.kode_akun ";
		}
		else
		{
		  $sql.=$this->filter." and a.nik_user='$nik_user' group by a.kode_akun,d.nama,c.kode_fakultas,c.nama  order by a.kode_akun ";
		}		
		
		if ($trail=="1")
		{
			$sql = "select a.kode_akun,d.nama,c.kode_fakultas,c.nama as nama_fakultas,sum(debet) as debet,sum(kredit) as kredit,
	   sum(case when a.so_awal>0 then a.so_awal else 0 end) as so_awal_debet,
       sum(case when a.so_awal<0 then -a.so_awal else 0 end) as so_awal_kredit, 
       sum(case when a.so_akhir>0 then a.so_akhir else 0 end) as so_akhir_debet,
       sum(case when a.so_akhir<0 then -a.so_akhir else 0 end) as so_akhir_kredit
from glma_pp_tmp a
inner join pp_fakultas b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
inner join aka_fakultas c on b.kode_fakultas=c.kode_fakultas and b.kode_lokasi=c.kode_lokasi
inner join masakun d on a.kode_akun=d.kode_akun and a.kode_lokasi=d.kode_lokasi
inner join relakun e on a.kode_akun=e.kode_akun and a.kode_lokasi=e.kode_lokasi
$this->filter and (a.so_awal<>0 or a.debet<>0 or a.kredit<>0 or a.so_akhir<>0)
group by a.kode_akun,d.nama,c.kode_fakultas,c.nama
order by a.kode_akun 
";

		}
		echo $sql;
		$rs = $dbLib->execute($sql);
		
		$i = $start+1;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("NERACA LAJUR",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='2' style='border-collapse: collapse' bordercolor='#111111'>
  <tr bgcolor='#CCCCCC'>
    <td width='30' rowspan='2'  class='header_laporan' align='center'>No</td>
    <td width='50' rowspan='2' class='header_laporan' align='center'>Kode</td>
    <td width='250' rowspan='2' class='header_laporan' align='center'>Nama Akun</td>
    <td width='150' rowspan='2' class='header_laporan' align='center'>Fakultas</td>
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
	echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBb('$row->kode_akun','$row->kode_lokasi');\">$row->nama</a>";
	echo "</td>
    <td class='isi_laporan' >$row->nama_fakultas</td>
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
    <td class='sum_laporan' align='right'>".number_format(abs($so_awal_kredit),0,',','.')."</td>
    <td class='sum_laporan' align='right'>".number_format($debet,0,',','.')."</td>
    <td class='sum_laporan' align='right'>".number_format($kredit,0,',','.')."</td>
    <td class='sum_laporan' align='right'>".number_format($so_akhir_debet,0,',','.')."</td>
    <td class='sum_laporan' align='right'>".number_format(abs($so_akhir_kredit),0,',','.')."</td>
</tr>";
	
		echo "</table></div>";
		return "";
	}
	
}
?>
