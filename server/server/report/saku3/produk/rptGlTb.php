<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_produk_rptGlTb extends server_report_basic
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
		$pp=$tmp[3];
		$mutasi=$tmp[4];
		$tmp="";
		if ($mutasi=="Tidak")
		{
			$tmp=" and (a.so_awal<>0 or a.debet<>0 or a.kredit<>0 or a.so_akhir<>0) ";
		}
		
		if ($pp=="All")
		{
			$sql2="exec sp_glma_dw_tmp '$kode_lokasi','$periode','$nik_user' ";
			$sql = "select a.kode_lokasi,a.kode_akun,a.nama,a.so_awal,a.periode,a.debet,a.kredit,a.so_akhir,'*' as kode_pp
				from glma_tmp a $this->filter and a.nik_user='$nik_user' $tmp
				order by a.kode_akun";
			
		}
		else
		{
			$sql2="exec sp_glma_pp_dw_tmp '$kode_lokasi','$periode','$nik_user' ";
			$sql = "select a.kode_lokasi,a.kode_akun,a.kode_pp,a.nama,a.so_awal,a.periode,a.debet,a.kredit,a.so_akhir
				from glma_pp_tmp a $this->filter and a.nik_user='$nik_user' $tmp
				order by a.kode_akun";
		}
		echo $sql;
		echo $sql2;
		$rs = $dbLib->execute($sql2);		
		
		
		$rs = $dbLib->execute($sql);
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("TRIAL BALANCE",$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr align='center' bgcolor='#dbeef3'>
    <td width='100' class='header_laporan'>Kode Akun</td>
    <td width='300' class='header_laporan'>Nama Akun</td>
	 <td width='60' class='header_laporan'>Kode PP</td>
    <td width='100' class='header_laporan'>Saldo Awal</td>
    <td width='90' class='header_laporan'>Debet</td>
    <td width='90' class='header_laporan'>Kredit</td>
    <td width='100' class='header_laporan'>Saldo Akhir</td>
  </tr>";
		$debet=0; $kredit=0; $so_awal=0; $so_akhir=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$debet=$debet+$row->debet;
			$kredit=$kredit+$row->kredit;
			$so_awal=$so_awal+$row->so_awal;
			$so_akhir=$so_akhir+$row->so_akhir;
			echo "<tr>";
	echo "<td class='isi_laporan'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBb('$row->kode_akun','$row->kode_lokasi','$periode');\">".$AddOnLib->fnAkun($row->kode_akun)."</a></td>";
    echo "<td class='isi_laporan'>$row->nama</td>
	<td class='isi_laporan'>$row->kode_pp</td>
    <td valign='top' class='isi_laporan' align='right'>".number_format($row->so_awal,2,',','.')."</td>
    <td valign='top' class='isi_laporan' align='right'>".number_format($row->debet,2,',','.')."</td>
   <td valign='top' class='isi_laporan' align='right'>".number_format($row->kredit,2,',','.')."</td>
    <td valign='top' class='isi_laporan' align='right'>".number_format($row->so_akhir,2,',','.')."</td>
  </tr>";
			$i=$i+1;
		}
	
	  echo " <tr>
    <td colspan='3' align='center' class='header_laporan'>Total</td>
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
