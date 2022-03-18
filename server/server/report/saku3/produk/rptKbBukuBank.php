<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_produk_rptKbBukuBank extends server_report_basic
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
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("BUKU BANK",$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			
			echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr>
   
    <td colspan='9' class='header_laporan'>Kode Akun : ".$AddOnLib->fnAkun($row->kode_akun)." - ".$row->nama."</td>
  </tr>
  <tr align='center' bgcolor='#dbeef3'>
    <td width='30' class='header_laporan'>No</td>
    <td width='60' class='header_laporan'>Tanggal</td>
    <td width='100' class='header_laporan'>No Dokumen</td>
	<td width='60' class='header_laporan'>Kode PP</td>
    <td width='300' class='header_laporan'>Keterangan</td>
    <td width='80' class='header_laporan'>Kode Akun</td>
    <td width='80' class='header_laporan'>Debet</td>
    <td width='80' class='header_laporan'>Kredit</td>
    <td width='80' class='header_laporan'>Saldo Akhir</td>
  </tr>";
			echo " <tr>
    <td colspan='4'>&nbsp;</td>
    <td colspan='2' class='header_laporan'>Saldo Awal</td>
    <td class='header_laporan' align='right'>".number_format($row->so_debet,2,',','.')."</td>
    <td class='header_laporan' align='right'>".number_format($row->so_kredit,2,',','.')."</td>
    <td>&nbsp;</td>
  </tr>";
	$filter_pp=" and a.kode_pp='$row->kode_pp'";
	if ($pp=="All")
	{
		$filter_pp="";
	}
	
	$sql1="select a.no_bukti,b.kode_akun,b.kode_akun,convert(varchar(20),b.tanggal,103) as tgl,b.keterangan,
				   isnull(b.debet,0) as debet,isnull(b.kredit,0) as kredit,b.kode_pp
from (select a.no_bukti ,a.kode_lokasi,a.kode_akun
	  from trans_j a
	  inner join trans_m b on a.no_bukti=b.no_bukti and a.kode_lokasi=b.kode_lokasi
	  where a.periode='$periode' and a.kode_lokasi='$kode_lokasi' and a.kode_akun='$row->kode_akun' $filter_pp
	  group by a.no_bukti,a.kode_lokasi,a.kode_akun
	  )a
inner join (select a.no_bukti,a.tanggal,a.kode_lokasi,a.keterangan,a.kode_akun,a.kode_pp,
				   case when a.dc='C' then a.nilai else 0 end as debet,case when a.dc='D' then a.nilai else 0 end as kredit
		    from trans_j a
			inner join trans_m b on a.no_bukti=b.no_bukti and a.kode_lokasi=b.kode_lokasi
		    where a.periode='$periode' and a.kode_lokasi='$kode_lokasi' and a.kode_akun<>'$row->kode_akun' $filter_pp
		    )b on a.no_bukti=b.no_bukti and a.kode_lokasi=b.kode_lokasi
where a.kode_akun='$row->kode_akun' and a.kode_lokasi='$kode_lokasi'
					order by b.tanggal ";
		
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
				<td class='isi_laporan'>".$AddOnLib->fnAkun($row1->kode_akun)."</td>
				<td class='isi_laporan' align='right'>".number_format($row1->debet,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row1->kredit,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($saldo,2,',','.')."</td>
			  </tr>";
				$i=$i+1;
		}
	
	  echo " <tr>
    <td colspan='6' align='center' class='header_laporan'>Total</td>
  <td class='header_laporan' align='right'>".number_format($tot_debet,2,',','.')."</td>
	<td class='header_laporan' align='right'>".number_format($tot_kredit,2,',','.')."</td>
	<td class='header_laporan' align='right'>".number_format($saldo,2,',','.')."</td>
  </tr>";
			echo "<br>";
			$i=$i+1;
		}
		echo "</div>";
		return "";
	}
	
}
?>
