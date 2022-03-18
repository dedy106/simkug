<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_sju_rptGlTbSimulasiTahun extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$sql="select 1 ";
		
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
		$trail=$tmp[4];
		$periode_awal=$tmp[5];
		$sql="exec sp_glma_tahun_dw_tmp_sim '$kode_lokasi','$periode','$nik_user' ";
		
		$mutasi="";
		if ($jenis=="Tidak")
		{
			$mutasi="and (a.so_awal<>0 or a.debet<>0 or a.kredit<>0 or a.so_akhir<>0) ";
		}
		$rs = $dbLib->execute($sql);
		$sql = "select a.kode_lokasi,a.kode_akun,a.nama,a.so_awal,a.periode,a.debet,a.kredit,a.so_akhir
				from glma_tmp a 
				$this->filter and a.nik_user='$nik_user' $mutasi
				order by a.kode_akun";
		if ($trail=="1")
		{
			$sql = "select a.kode_lokasi,a.kode_akun,a.nama,a.so_awal,a.periode,a.debet,a.kredit,a.so_akhir
				from glma_tmp a 
				inner join relakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
				$this->filter and a.nik_user='$nik_user' $mutasi
				order by a.kode_akun";
		}
		if ($trail=="2")
		{
			$sql = "select a.kode_lokasi,a.kode_akun,a.nama,a.so_awal,a.periode,a.debet,a.kredit,a.so_akhir
				from glma_tmp a 
				inner join relakunproduk b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
				$this->filter and a.nik_user='$nik_user' $mutasi
				order by a.kode_akun";
		}
		
		
		$rs = $dbLib->execute($sql);
		$i = $start+1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("TRIAL BALANCE (TAHUNAN)",$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode_awal)." Sd ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr align='center' bgcolor='#dbeef3'>
    <td width='100' class='header_laporan'>Account No.</td>
    <td width='300' class='header_laporan'>Description</td>
    <td width='100' class='header_laporan'>Opening Balance</td>
    <td width='90' class='header_laporan'>Debit</td>
    <td width='90' class='header_laporan'>Credit</td>
    <td width='100' class='header_laporan'>Ending Balance</td>
  </tr>";
		$debet=0; $kredit=0; $so_awal=0; $so_akhir=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$debet=$debet+$row->debet;
			$kredit=$kredit+$row->kredit;
			$so_awal=$so_awal+$row->so_awal;
			$so_akhir=$so_akhir+$row->so_akhir;
			echo "<tr>";
	echo "<td class='isi_laporan'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBbTahun('$row->kode_akun','$row->kode_lokasi','$periode');\">".$AddOnLib->fnAkun($row->kode_akun)."</a></td>";
    echo "<td class='isi_laporan'>$row->nama</td>
    <td valign='top' class='isi_laporan' align='right'>".number_format($row->so_awal,2,',','.')."</td>
    <td valign='top' class='isi_laporan' align='right'>".number_format($row->debet,2,',','.')."</td>
   <td valign='top' class='isi_laporan' align='right'>".number_format($row->kredit,2,',','.')."</td>
    <td valign='top' class='isi_laporan' align='right'>".number_format($row->so_akhir,2,',','.')."</td>
  </tr>";
			$i=$i+1;
		}
	
	  echo " <tr>
    <td colspan='2' align='center' class='header_laporan'>Total</td>
	<td class='header_laporan' align='right'>".number_format($so_awal,2,',','.')."</td>
  <td class='header_laporan' align='right'>".number_format($debet,2,',','.')."</td>
	<td class='header_laporan' align='right'>".number_format($kredit,2,',','.')."</td>
	<td class='header_laporan' align='right'>".number_format($so_akhir,2,',','.')."</td>
  </tr></table>";
		
		echo "</div>";
		return "";
	}
	
}
?>
