<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_rtrw_rptSaldo extends server_report_basic
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
		$periode=$tmp[2];
		$nik_user=$tmp[3];
		
		$sql="exec sp_trans_pp_tmp '$kode_lokasi','$kode_pp','$periode','$nik_user' ";
		
		$rs = $dbLib->execute($sql);		
		$sql = "select a.kode_lokasi,a.kode_akun,a.kode_pp,a.nama,a.so_awal,a.debet,a.kredit,a.so_akhir,a.periode,b.nama as nama_pp
				from glma_pp_tmp a
				inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
				$this->filter and a.nik_user='$nik_user' and (a.so_awal<>0 or a.debet<>0 or a.kredit<>0 or a.so_akhir<>0)
				order by a.kode_akun";
		
		$rs = $dbLib->execute($sql);	

		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("SALDO",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='2' style='border-collapse: collapse' bordercolor='#111111'>
  <tr bgcolor='#CCCCCC'>
    <td width='30'   class='header_laporan' align='center'>No</td>
    <td width='50'  class='header_laporan' align='center'>Kode</td>
    <td width='250'  class='header_laporan' align='center'>Nama Akun</td>
    <td width='60'  class='header_laporan' align='center'>Kode PP</td>
    <td width='90' class='header_laporan' align='center'>Saldo Awal </td>
    <td width='90' class='header_laporan' align='center'>Debet</td>
    <td width='90' class='header_laporan' align='center'>Kredit </td>
	<td width='90' class='header_laporan' align='center'>Saldo Akhir </td>
  </tr>
 ";
		$debet=0; $so_awal=0;
		$kredit=0; $so_akhir=0;
		$i=1;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$so_awal+=$row->so_awal;
			$debet+=$row->debet;
			$kredit+=$row->kredit;
			$so_akhir+=$row->so_akhir;
			echo "<tr>
    <td class='isi_laporan' align='center'>$i</td>
    <td class='isi_laporan'>$row->kode_akun</td>
    <td height='20' class='isi_laporan'>";
	echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBuku('$row->kode_akun','$row->kode_lokasi','$periode','$row->kode_pp');\">$row->nama</a>";

    echo "</td><td class='isi_laporan' align='center'>$row->kode_pp</td>
	<td class='isi_laporan' align='right'>".number_format($row->so_awal,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->debet,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->kredit,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->so_akhir,0,',','.')."</td>
  </tr>";
			
			$i=$i+1;
		}
		echo "<tr>
    <td height='20' colspan='4' class='sum_laporan' align='right'>Total</td>
    <td class='sum_laporan' align='right'>".number_format($so_awal,0,',','.')."</td>
    <td class='sum_laporan' align='right'>".number_format($debet,0,',','.')."</td>
    <td class='sum_laporan' align='right'>".number_format($kredit,0,',','.')."</td>
    <td class='sum_laporan' align='right'>".number_format($so_akhir,0,',','.')."</td>
</tr>";
		echo "</table></div>";
		return "";
	}
	
}
?>
