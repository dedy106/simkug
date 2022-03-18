<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_sju16_rptGlBukuBesarKeg extends server_report_basic
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
		$mutasi=$tmp[3];
		$var_periode=$tmp[4];
		$jenis=$tmp[5];
		$xperiode=$tmp[6];
		$periode2=$tmp[7];
		$pp=$tmp[8];
		$nama_file="buku_besar.xls";
		
		
		$tmp="";
		
		if ($mutasi=="Tidak")
		{
			$tmp=" and (a.so_awal<>0 or a.debet<>0 or a.kredit<>0 or a.so_akhir<>0) ";
		}
		
		if ($pp=="All")
		{
			$sql2="exec sp_glma_dw_tmp '$kode_lokasi','$periode','$nik_user' ";
			$sql = "select a.kode_lokasi,a.kode_akun,d.nama as nama_akun,a.so_awal,a.periode,
					case when a.so_awal>=0 then a.so_awal else 0 end as so_debet,
					case when a.so_awal<0 then a.so_awal else 0 end as so_kredit
				from glma_tmp a 
				inner join masakun d on a.kode_akun=d.kode_akun and a.kode_lokasi=d.kode_lokasi
				$this->filter and a.nik_user='$nik_user' $tmp
				order by a.kode_akun";
		}
		else
		{
			$sql2="exec sp_glma_pp_dw_tmp '$kode_lokasi','$periode','$nik_user' ";
			$sql = "select a.kode_lokasi,a.kode_pp,e.nama as nama_pp,a.kode_akun,d.nama as nama_akun,a.so_awal,a.periode,
					case when a.so_awal>=0 then a.so_awal else 0 end as so_debet,
					case when a.so_awal<0 then a.so_awal else 0 end as so_kredit
				from glma_pp_tmp a 
				inner join masakun d on a.kode_akun=d.kode_akun and a.kode_lokasi=d.kode_lokasi
				inner join pp e on a.kode_pp=e.kode_pp and a.kode_lokasi=e.kode_lokasi
				$this->filter and a.nik_user='$nik_user' $tmp
				order by a.kode_akun";
		}
		$rs = $dbLib->execute($sql2);
		
		
	
		$tmp="";
		
		
		
		if ($jenis=="Excel")
		{
			header("Pragma: public");
			header("Expires: 0");
			header("Cache-Control: must-revalidate, post-check=0, pre-check=0"); 
			header("Content-Type: application/force-download");
			header("Content-Type: application/octet-stream");
			header("Content-Type: application/download");;
			header("Content-Disposition: attachment;filename=$nama_file"); 
			header("Content-Transfer-Encoding: binary ");
			
		}
		else
		{
			
		}
		$rs = $dbLib->execute($sql);	
		$i = $start+1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$nama_periode="Periode ".$AddOnLib->ubah_periode($periode);
		if ($xperiode=="Range")
		{
			$nama_periode="Periode ".$AddOnLib->ubah_periode($periode)." Sd ".$AddOnLib->ubah_periode($periode2);
			$sql2=" and a.periode between '$periode' and '$periode2' ";
		}
		if ($xperiode=="All")
		{
			$nama_periode="Semua Periode";
			$sql2=" and a.periode='$periode' ";
		}
		
		$i = $start+1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		if ($xperiode=="Range")
		{
			echo $AddOnLib->judul_laporan("buku besar produksi",$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode)." Sd ".$AddOnLib->ubah_periode($periode2));
			$sql2=" and periode between '$periode' and '$periode2' ";
		}
		else
		{
			echo $AddOnLib->judul_laporan("buku besar produksi",$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
			$sql2=" and periode='$periode' ";
		}


		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr>
    <td colspan='12' class='header_laporan' height='30'>Kode Akun : ".$AddOnLib->fnAkun($row->kode_akun)." - $row->nama_akun</td>
  </tr>
  <tr align='center' bgcolor='#dbeef3'>
    <td width='30' class='header_laporan'>No</td>
    <td width='60' class='header_laporan'>Tanggal</td>
    <td width='100' class='header_laporan'>No Dokumen</td>
	<td width='40' class='header_laporan'>Kode PP</td>
    <td width='250' class='header_laporan'>Keterangan</td>
	<td width='40' class='header_laporan'>COB</td>
	<td width='150' class='header_laporan'>Penanggung</td>
	<td width='150' class='header_laporan'>Tertanggung</td>
	<td width='150' class='header_laporan'>Kegiatan</td>
	<td width='100' class='header_laporan'>Acc Exec</td>
    <td width='80' class='header_laporan'>Debet</td>
    <td width='80' class='header_laporan'>Kredit</td>
    <td width='80' class='header_laporan'>Saldo</td>
  </tr>";
			echo " <tr>
    <td class='header_laporan' colspan='9' align='right'>Saldo Awal</td>
    <td class='header_laporan' align='right'>".number_format(abs($row->so_debet),2,',','.')."</td>
    <td class='header_laporan' align='right'>".number_format(abs($row->so_kredit),2,',','.')."</td>
    <td>&nbsp;</td>
  </tr>";
	$filter_pp=" and a.kode_pp='$row->kode_pp'";
	if ($pp=="All")
	{
		$filter_pp="";
	}
	$sql1="select a.no_ref3,f.nama as keg,a.kode_lokasi,a.no_bukti,a.tanggal,a.kode_akun,a.dc,a.nilai,a.keterangan,a.kode_pp,
	case when a.dc='D' then a.nilai else 0 end as debet,
	case when a.dc='C' then a.nilai else 0 end as kredit,
	a.kode_curr,convert(varchar(20),a.tanggal,103) as tgl,
	a.kode_cust,a.kode_vendor,a.no_ref1,a.no_ref2,
   c.nama as nama_cust,d.nama as nama_vendor,e.nama as nama_pic
from trans_j a
inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
left join sju_cust c on a.kode_cust=c.kode_cust and a.kode_lokasi=c.kode_lokasi
left join sju_vendor d on a.kode_vendor=d.kode_vendor and a.kode_lokasi=d.kode_lokasi
left join sju_pic e on a.no_ref2=e.kode_pic and a.kode_lokasi=e.kode_lokasi
left join sju_keg f on a.no_ref3=f.kode_keg and a.kode_lokasi=f.kode_lokasi
			where a.kode_lokasi='$row->kode_lokasi' and a.kode_akun='$row->kode_akun' $sql2 $filter_pp
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
				<td class='isi_laporan'>$row1->no_ref1</td>
				<td class='isi_laporan'>$row1->nama_vendor</td>
				<td class='isi_laporan'>$row1->nama_cust</td>
				<td class='isi_laporan'>$row1->keg</td>
				<td class='isi_laporan'>$row1->nama_pic</td>
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
    <td colspan='10' align='right' class='header_laporan'>Total Bulan</td>
  <td class='header_laporan' align='right'>".number_format($tot_debet,2,',','.')."</td>
	<td class='header_laporan' align='right'>".number_format($tot_kredit,2,',','.')."</td>
	<td class='header_laporan' align='right'>&nbsp;</td>
  </tr>";
	  echo " <tr>
    <td colspan='10' align='right' class='header_laporan'>Transaksi</td>
  <td class='header_laporan' align='right'>".number_format($tot_debet,2,',','.')."</td>
	<td class='header_laporan' align='right'>".number_format($tot_kredit,2,',','.')."</td>
	<td class='header_laporan' align='right'>".number_format($tot_debet-$tot_kredit,2,',','.')."</td>
  </tr>";
	  echo " <tr>
    <td colspan='10' align='right' class='header_laporan'>Saldo Akhir</td>
  <td class='header_laporan' align='right'>".number_format(abs($saldo_debet),2,',','.')."</td>
	<td class='header_laporan' align='right'>".number_format(abs($saldo_kredit),2,',','.')."</td>
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
