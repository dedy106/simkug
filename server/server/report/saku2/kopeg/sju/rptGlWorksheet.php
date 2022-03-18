<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_sju_rptGlWorksheet extends server_report_basic
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
		$sql="call sp_glma_dw_tmp '$kode_lokasi','$periode','$nik_user' ";
	
		$mutasi="";
		if ($jenis=="Tidak")
		{
			$mutasi="and (a.so_awal<>0 or a.debet<>0 or a.kredit<>0 or a.so_akhir<>0) ";
		}
		$rs = $dbLib->execute($sql);		
		$sql = "select a.kode_lokasi,a.kode_akun,a.nama,a.so_awal,a.periode,a.debet,a.kredit,a.debet-a.kredit as saldo,b.modul
				from glma_tmp a
				inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
				$this->filter and a.nik_user='$nik_user' $mutasi
				order by a.kode_akun";
		
		$rs = $dbLib->execute($sql);
		$i = $start+1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("Financial Statement Worksheet",$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr align='center' bgcolor='#dbeef3'>
    <td width='100' class='header_laporan'>Account No.</td>
    <td width='250' class='header_laporan'>Description</td>
    <td width='90' class='header_laporan'>Debit</td>
    <td width='90' class='header_laporan'>Credit</td>
    <td width='90' class='header_laporan'>Debit</td>
    <td width='90' class='header_laporan'>Credit</td>
	<td width='90' class='header_laporan'>Net Change</td>
  </tr>";
		$tot_nrc_debet=0; $tot_nrc_kredit=0; $tot_lr_debet=0; $tot_lr_kredit=0; $saldo=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$lr_debet=0; $lr_kredit=0; $nrc_debet=0; $nrc_kredit=0;
			if ($row->modul!="L")
			{
				$nrc_debet=$row->debet;
				$nrc_kredit=$row->kredit;
				
			}
			if ($row->modul=="L")
			{
				$lr_debet=$row->debet;
				$lr_kredit=$row->kredit;
				
			}
			
			$tot_nrc_debet+=$nrc_debet;
			$tot_nrc_kredit+=$nrc_kredit;
			$tot_lr_debet+=$lr_debet;
			$tot_lr_kredit+=$lr_kredit;
			$saldo+=$row->saldo;
			echo "<tr>";
	echo "<td class='isi_laporan'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBb('$row->kode_akun','$row->kode_lokasi','$periode');\">".$AddOnLib->fnAkun($row->kode_akun)."</a></td>";
    echo "<td class='isi_laporan'>$row->nama</td>
    <td valign='top' class='isi_laporan' align='right'>".number_format($nrc_debet,2,',','.')."</td>
    <td valign='top' class='isi_laporan' align='right'>".number_format($nrc_kredit,2,',','.')."</td>
   <td valign='top' class='isi_laporan' align='right'>".number_format($lr_debet,2,',','.')."</td>
    <td valign='top' class='isi_laporan' align='right'>".number_format($lr_kredit,2,',','.')."</td>
	 <td valign='top' class='isi_laporan' align='right'>".number_format($row->saldo,2,',','.')."</td>
  </tr>";
			$i=$i+1;
		}
		$saldo_debet=0; $saldo_kredit=0;
		if ($tot_lr_debet-$tot_lr_kredit >= 0)
		{
			$saldo_debet=$tot_lr_debet-$tot_lr_kredit;
		}
		else
		{
			$saldo_kredit=$tot_lr_debet-$tot_lr_kredit;
		}
	  echo " <tr>
    <td colspan='2' align='center' class='header_laporan'>Total</td>
	<td class='header_laporan' align='right'>".number_format($tot_nrc_debet,2,',','.')."</td>
  <td class='header_laporan' align='right'>".number_format($tot_nrc_kredit,2,',','.')."</td>
	<td class='header_laporan' align='right'>".number_format($tot_lr_debet,2,',','.')."</td>
	<td class='header_laporan' align='right'>".number_format($tot_lr_kredit,2,',','.')."</td>
	<td class='header_laporan' align='right'>".number_format($saldo,2,',','.')."</td>
  </tr>";
	 echo " <tr>
    <td colspan='2' align='center' class='header_laporan'>Net Profit (Loss)</td>
	<td class='header_laporan' align='right'>".number_format($saldo_debet,2,',','.')."</td>
  <td class='header_laporan' align='right'>".number_format($saldo_kredit,2,',','.')."</td>
	<td class='header_laporan' align='right'>".number_format($saldo_debet,2,',','.')."</td>
	<td class='header_laporan' align='right'>".number_format($saldo_kredit,2,',','.')."</td>
	<td class='header_laporan' align='right'>&nbsp;</td>
  </tr></table>";	
		echo "</div>";
		return "";
	}
	
}
?>
