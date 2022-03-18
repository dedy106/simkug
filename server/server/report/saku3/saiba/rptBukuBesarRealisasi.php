<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_saiba_rptBukuBesarRealisasi extends server_report_basic
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
		$sql="exec sp_kas_pp_dw_tmp '$kode_lokasi','$periode','$nik_user' ";
		
		if ($pp=="All")
		{
			$sql="exec sp_kas_dw_tmp '$kode_lokasi','$periode','$nik_user' ";
			
		}
		
		$rs = $dbLib->execute($sql);		
		$sql = "select a.kode_lokasi,a.kode_akun,a.kode_pp,a.nama,a.so_awal,a.periode,a.so_akhir,
					   case when a.so_awal>=0 then a.so_awal else 0 end as so_debet,case when a.so_awal<0 then a.so_awal else 0 end as so_kredit
				from glma_pp_tmp a $this->filter and a.nik_user='$nik_user' $tmp
				order by a.kode_akun";
		
		$rs = $dbLib->execute($sql);
		
		$i = $start+1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$judul="BUKU BESAR AKRUAL";
			
			echo "<table width='800' border='0' cellspacing='2' cellpadding='1' >
  <tr>
    <td><table width='100%'  border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='600'><table width='100%'  border='0' cellspacing='2' cellpadding='1'>
          <tr>
            <td class='style16'>$row->nama </td>
          </tr>
          <tr>
            <td class='style16'>$row->kota</td>
          </tr>
        </table></td>
        <td width='200' align='center'><table width='100%'  border='0' cellspacing='0' cellpadding='0' class='kotak'>
        
          <tr>
            <td align='center' class='istyle15'>Kd Lap : </td>
          </tr>
          <tr>
             <td align='center' class='istyle15'>Tanggal : </td>
         </tr>
        </table></td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td align='center' class='istyle17'>$judul</td>
    <td align='center' class='istyle17'>".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))."</td>
	
  </tr>
			

			
<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr>
    <td colspan='9' class='header_laporan'>BUKU BESAR - ".$AddOnLib->fnAkun($row->kode_akun)." - ".$row->nama."</td>
  </tr>
  <tr align='center' bgcolor='#dbeef3'>
    <td width='60' class='header_laporan'>TGL POS</td>
    <td width='60' class='header_laporan'>TGL DOK</td>
    <td width='100' class='header_laporan'>JNS DOK</td>
	<td width='100' class='header_laporan'>NO DOK</td>
    <td width='300' class='header_laporan'>BAES1WILSATK</td>
    <td width='60' class='header_laporan'>KPPN</td>
    <td width='80' class='header_laporan'>Debet</td>
    <td width='80' class='header_laporan'>Kredit</td>
    <td width='80' class='header_laporan'>Saldo</td>
  </tr>";

	$filter_pp=" and a.kode_pp='$row->kode_pp'";
	if ($pp=="All")
	{
		$filter_pp="";
	}
	$sql1="select a.kode_lokasi,a.no_bukti,a.tanggal,a.kode_akun,a.dc,a.nilai,a.keterangan,a.kode_pp,
				   case when a.dc='D' then a.nilai else 0 end as debet,
				   case when a.dc='C' then a.nilai else 0 end as kredit,
				   a.kode_curr,convert(varchar(20),a.tanggal,103) as tgl
			from trans_j a
			inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
			where a.kode_lokasi='$row->kode_lokasi' and a.kode_akun='$row->kode_akun' $filter_pp
			order by a.tanggal ";
		
		$rs1 = $dbLib->execute($sql1);
		$i=1;
		
		$saldo=$row->so_awal; $tot_debet=0;$tot_kredit=0;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
			$tot_debet=$tot_debet+$row1->debet;
			$tot_kredit=$tot_kredit+$row1->kredit;
			$saldo=$saldo + $row1->debet - $row1->kredit;
			echo "<tr>
				<td class='isi_laporan' align='center'>$i</td>
				<td class='isi_laporan'>$row1->tgl</td>";
				echo "<td class='isi_laporan'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenJurnal('$row1->no_bukti','$row->kode_lokasi');\">$row1->no_bukti</a></td>";
				echo "<td class='isi_laporan'>$row1->kode_pp</td>
				<td class='isi_laporan'>$row1->keterangan</td>
				<td class='isi_laporan' align='right'>".number_format($row1->debet,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row1->kredit,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($saldo,2,',','.')."</td>
			  </tr>";
				$i=$i+1;
		}
		$saldo_debet=""; $saldo_kredit="";
		if ($saldo>=0)
		{
			$saldo_debet=$saldo;
		}
		else
		{
			$saldo_kredit=$saldo;
		}

	  echo " <tr>
    <td colspan='5' align='right' class='header_laporan'>Saldo Akhir</td>
  <td class='header_laporan' align='right'>".number_format($saldo_debet,2,',','.')."</td>
	<td class='header_laporan' align='right'>".number_format($saldo_kredit,2,',','.')."</td>
	<td class='header_laporan' align='right'>&nbsp;</td>
  </tr>";
			echo "<br>";
			$i=$i+1;
		}
		echo "</div>";
		return "";
	}
	
}
?>
