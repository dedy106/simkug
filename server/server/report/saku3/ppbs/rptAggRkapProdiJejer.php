<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
function fnSpasi($level)
{
	$tmp="";
	for ($i=1; $i<=$level; $i++)
	{
		$tmp=$tmp."&nbsp;&nbsp;&nbsp;&nbsp;";
	}
	return $tmp;
}
class server_report_saku3_ppbs_rptAggRkapProdiJejer extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$sql = "select 1 ";
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);		
		}
		//error_log($this->rows."/".$count."/".$totPage);
		return $totPage;
	}
	function getHtml()
	{
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$tahun=$tmp[1];
		$nik_user=$tmp[0];
		$bentuk=$tmp[2];
		$level_lap=$tmp[3];
		$kode_fs=$tmp[4];
		$lokasi=$tmp[5];
		$ttd=$tmp[6];
		$sql="exec sp_agg_prodi_jejer '$kode_fs','$tahun','$lokasi','$nik_user' ";
		
		$rs = $dbLib->execute($sql);
		$sql = "select kode_neraca,kode_fs,kode_lokasi,nama,tipe,level_spasi,
				case jenis_akun when  'Pendapatan' then -n0 else n0 end as n0,
				case jenis_akun when  'Pendapatan' then -n1 else n1 end as n1,
				case jenis_akun when  'Pendapatan' then -n2 else n2 end as n2,
				case jenis_akun when  'Pendapatan' then -n3 else n3 end as n3,
				case jenis_akun when  'Pendapatan' then -n4 else n4 end as n4,
				case jenis_akun when  'Pendapatan' then -n5 else n5 end as n5,
				case jenis_akun when  'Pendapatan' then -n6 else n6 end as n6,
				case jenis_akun when  'Pendapatan' then -n7 else n7 end as n7,
				case jenis_akun when  'Pendapatan' then -n8 else n8 end as n8,
				case jenis_akun when  'Pendapatan' then -n9 else n9 end as n9,
				case jenis_akun when  'Pendapatan' then -n10 else n10 end as n10,
				case jenis_akun when  'Pendapatan' then -n11 else n11 end as n11,
				case jenis_akun when  'Pendapatan' then -n12 else n12 end as n12,
				case jenis_akun when  'Pendapatan' then -n13 else n13 end as n13,
				case jenis_akun when  'Pendapatan' then -n14 else n14 end as n14,
				case jenis_akun when  'Pendapatan' then -n15 else n15 end as n15,
				case jenis_akun when  'Pendapatan' then -n16 else n16 end as n16,
				case jenis_akun when  'Pendapatan' then -n17 else n17 end as n17,
				case jenis_akun when  'Pendapatan' then -n18 else n18 end as n18,
				case jenis_akun when  'Pendapatan' then -n19 else n19 end as n19,
				case jenis_akun when  'Pendapatan' then -n20 else n20 end as n20,
				case jenis_akun when  'Pendapatan' then -n21 else n21 end as n21,
				case jenis_akun when  'Pendapatan' then -n22 else n22 end as n22,
				case jenis_akun when  'Pendapatan' then -n23 else n23 end as n23,
				case jenis_akun when  'Pendapatan' then -n24 else n24 end as n24,
				case jenis_akun when  'Pendapatan' then -n25 else n25 end as n25,
				case jenis_akun when  'Pendapatan' then -n26 else n26 end as n26,
				case jenis_akun when  'Pendapatan' then -n27 else n27 end as n27,
				case jenis_akun when  'Pendapatan' then -n28 else n28 end as n28,
				case jenis_akun when  'Pendapatan' then -n29 else n29 end as n29,
				case jenis_akun when  'Pendapatan' then -n30 else n30 end as n30,
				case jenis_akun when  'Pendapatan' then -n31 else n31 end as n31,
				case jenis_akun when  'Pendapatan' then -n32 else n32 end as n32,
				case jenis_akun when  'Pendapatan' then -n33 else n33 end as n33,
				case jenis_akun when  'Pendapatan' then -n34 else n34 end as n34,
				case jenis_akun when  'Pendapatan' then -n35 else n35 end as n35
			from neraca_tmp 
			where nik_user='$nik_user' and level_lap<=$level_lap
			order by rowindex ";
		$rs = $dbLib->execute($sql);
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		
		//echo $AddOnLib->judul_laporan($nama_form,$this->lokasi,$AddOnLib->ubah_periode($periode));
		$bln = substr($periode,4);
		$thn = substr($periode,0,4);
		if (floatval($bln) > 12) $bln = 12;
		$totime = date("d M Y",strtotime("-1 second",strtotime("+1 month",strtotime($bln.'/01/'.$thn.' 00:00:00'))));
		$now = strtotime(date("d M Y"));
		$time = strtotime($totime);
		$bln = $AddOnLib->ubah_bulan(substr($periode,4));
		$totime = explode(" ",$totime);
		if ($time > $now){
			 $now = date("d M Y");
			 $now = explode(" ",$now);
			 $totime[0] = $now[0];
		}		
		$totime = $totime[0] . " ". $bln ." ". $totime[2];
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>";
		echo $AddOnLib->judul_laporan("LAPORAN REKAP ANGGARAN LABARUGI PRODI",$this->lokasi,"TAHUN $tahun");
		echo "<table border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td><table border='1' cellspacing='0' cellpadding='0' class='kotak' width='3000'>
		  <tr bgcolor='#CCCCCC'>
		    <td width='300' rowspan='2' align='center'  class='header_laporan'>Deskripsi</td>
		    <td height='25' colspan='7' align='center' class='header_laporan'>Fakultas Teknik Elektro</td>
		    <td colspan='5' align='center' class='header_laporan'>Fakultas Informatika</td>
		    <td colspan='5' align='center' class='header_laporan'>Fakultas Rekayasa Industri</td>
			<td colspan='5' align='center' class='header_laporan'>Fakultas Ekonomi</td>
			<td colspan='4' align='center' class='header_laporan'>Fakultas Komunikasi dan Bisnis</td>
			<td colspan='7' align='center' class='header_laporan'>Fakultas industri Kreatif</td>
			<td colspan='9' align='center' class='header_laporan'>Fakultas Ilmu Terapan</td>
			<td width='100' rowspan='2' align='center'  class='header_laporan'>Total</td>
      </tr>
		  <tr bgcolor='#CCCCCC'>
			<td width='90' height='25' align='center' class='header_laporan'>Prodi S2 Teknik Telekomunikasi</td>
    <td width='90' class='header_laporan' align='center'>Prodi S1 Teknik Telekomunikasi</td>
    <td width='90' class='header_laporan' align='center'>Prodi S1 Teknik Elektro</td>
    <td width='90' class='header_laporan' align='center'>Prodi S1 Teknik Fisika</td>
<td width='90' class='header_laporan' align='center'>Prodi S1 Sistem Komputer</td>
    <td width='90' class='header_laporan' align='center'>Dekanat Fakultas Teknik Elektro, Sek, Sumber Daya, Akademik Fakultas</td>]
	<td width='90' class='header_laporan' align='center'>Total</td>
    <td width='90' class='header_laporan' align='center'>Prodi S2 Teknik Informatika</td>
    <td width='90' class='header_laporan' align='center'>Prodi S1 Teknik Informatika</td>
<td width='90' class='header_laporan' align='center'>Prodi S1 Ilmu Komputasi</td>
    <td width='90' class='header_laporan' align='center'>Dekanat Fakultas Informatika, Sek, Sumber Daya, Akademik Fakultas</td>
	<td width='90' class='header_laporan' align='center'>Total</td>
    <td width='90' class='header_laporan' align='center'>Prodi S2 Teknik Industri (internasional)</td>
    <td width='90' class='header_laporan' align='center'>Prodi S1 Teknik Industri</td>
    <td width='90' class='header_laporan' align='center'>Prodi S1 Sistem Informasi</td>
	<td width='90' class='header_laporan' align='center'>Dekanat Fakultas Rekayasa Industri, Sek, Sumber Daya, Akademik Fakultas</td>
	<td width='90' class='header_laporan' align='center'>Total</td>
	<td width='90' class='header_laporan' align='center'>Prodi S2 Magister Manajemen</td>
	<td width='90' class='header_laporan' align='center'>Prodi S1 Manajemen Bisnis Telekomunikasi dan Informatika (MBTI)</td>
	<td width='90' class='header_laporan' align='center'>Prodi S1 Akuntansi</td>
	<td width='90' class='header_laporan' align='center'>Dekanat Fakultas Ekonomi dan Bisnis, Sek, Sumber Daya, Akademik Fakultas</td>
	<td width='90' class='header_laporan' align='center'>Total</td>
	<td width='90' class='header_laporan' align='center'>Prodi S1 Ilmu Administrasi Bisnis</td>
	<td width='90' class='header_laporan' align='center'>Prodi S1 Ilmu Komunikasi </td>
	<td width='90' class='header_laporan' align='center'>Dekanat Fakultas Komunikasi dan Bisnis, Sek, Sumber Daya, Akademik Fakultas</td>
	<td width='90' class='header_laporan' align='center'>Total</td>
	<td width='90' class='header_laporan' align='center'>Prodi S1 Seni Rupa Murni</td>
	<td width='90' class='header_laporan' align='center'>Prodi S1 Kriya Tekstil & Mode</td>
	<td width='90' class='header_laporan' align='center'>Prodi S1 Desain Interior</td>
	<td width='90' class='header_laporan' align='center'>Prodi S1 Desain Produk</td>
	<td width='90' class='header_laporan' align='center'>Prodi S1 Desain Komunikasi Visual</td>
	<td width='90' class='header_laporan' align='center'>Dekanat Fakultas industri Kreatif, Sek, Sumber Daya, Akademik Fakultas</td>
	<td width='90' class='header_laporan' align='center'>Total</td>
	<td width='90' class='header_laporan' align='center'>Prodi D3 Teknik Telekomunikasi</td>
	<td width='90' class='header_laporan' align='center'>Prodi D3 Teknik Komputer</td>
	<td width='90' class='header_laporan' align='center'>Prodi D3 Manajemen Informatika</td>
	<td width='90' class='header_laporan' align='center'>Prodi D3 Teknik Informatika</td>
	<td width='90' class='header_laporan' align='center'>Prodi D3 Komputerisasi Akuntansi</td>
	<td width='90' class='header_laporan' align='center'>Prodi D3 Manajemen Pemasaran</td>
	<td width='90' class='header_laporan' align='center'>Prodi D3 Perhotelan</td>
	<td width='90' class='header_laporan' align='center'>DekanatFakultas Ilmu Terapan, Sek, Sumber Daya, Akademik Fakultas</td>
	<td width='90' class='header_laporan' align='center'>Total</td>
	
		</tr>";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$total1=$row->n1+$row->n2+$row->n3+$row->n4+$row->n5+$row->n6;
			$total2=$row->n7+$row->n8+$row->n9+$row->n10;
			$total3=$row->n11+$row->n12+$row->n13+$row->n14;
			$total4=$row->n15+$row->n16+$row->n17+$row->n18;
			$total5=$row->n19+$row->n20+$row->n21;
			$total6=$row->n22+$row->n23+$row->n24+$row->n25+$row->n26+$row->n27;
			$total7=$row->n28+$row->n29+$row->n30+$row->n31+$row->n32+$row->n33+$row->n34+$row->n35;
			$nilai="";
			$koma=0;
			if ($row->kode_neraca=="48")
			{
				$koma=2;
			}
			echo "<tr><td height='20' class='isi_laporan'>";
			echo fnSpasi($row->level_spasi);
			if ($row->tipe=="Posting" && $row->n0 <> 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','$row->kode_lokasi');\">$row->nama</a>";
			}
			else
			{
				echo "$row->nama";
			}
			echo "</td>
				 <td class='isi_laporan' align='right'>".number_format($row->n1,$koma,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n2,$koma,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n3,$koma,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n4,$koma,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n5,$koma,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n6,$koma,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($total1,$koma,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n7,$koma,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n8,$koma,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n9,$koma,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n10,$koma,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($total2,$koma,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n11,$koma,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n12,$koma,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n13,$koma,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n14,$koma,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($total3,$koma,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n15,$koma,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n16,$koma,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n17,$koma,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n18,$koma,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($total4,$koma,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n19,$koma,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n20,$koma,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n21,$koma,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($total5,$koma,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n22,$koma,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n23,$koma,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n24,$koma,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n25,$koma,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n26,$koma,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n27,$koma,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($total6,$koma,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n28,$koma,',','.')."</td>
  
  <td class='isi_laporan' align='right'>".number_format($row->n29,$koma,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n30,$koma,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n31,$koma,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n32,$koma,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n33,$koma,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n34,$koma,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n35,$koma,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($total7,$koma,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n0,$koma,',','.')."</td>
			  </tr>";
			if ($bentuk=="Detail" && $row->tipe=="Posting")
			{
				$kode_neraca=$row->kode_neraca;
				$kode_fs=$row->kode_fs;
				$kode_lokasi=$row->kode_lokasi;
				$sql1="select a.kode_akun,c.nama,
				   case jenis_akun when  'Pendapatan' then -n0 else n0 end as n0,
				case jenis_akun when  'Pendapatan' then -n1 else n1 end as n1,
				case jenis_akun when  'Pendapatan' then -n2 else n2 end as n2,
				case jenis_akun when  'Pendapatan' then -n3 else n3 end as n3,
				case jenis_akun when  'Pendapatan' then -n4 else n4 end as n4,
				case jenis_akun when  'Pendapatan' then -n5 else n5 end as n5,
				case jenis_akun when  'Pendapatan' then -n6 else n6 end as n6,
				case jenis_akun when  'Pendapatan' then -n7 else n7 end as n7,
				case jenis_akun when  'Pendapatan' then -n8 else n8 end as n8,
				case jenis_akun when  'Pendapatan' then -n9 else n9 end as n9,
				case jenis_akun when  'Pendapatan' then -n10 else n10 end as n10,
				case jenis_akun when  'Pendapatan' then -n11 else n11 end as n11,
				case jenis_akun when  'Pendapatan' then -n12 else n12 end as n12,
				case jenis_akun when  'Pendapatan' then -n13 else n13 end as n13,
				case jenis_akun when  'Pendapatan' then -n14 else n14 end as n14,
				case jenis_akun when  'Pendapatan' then -n15 else n15 end as n15,
				case jenis_akun when  'Pendapatan' then -n16 else n16 end as n16,
				case jenis_akun when  'Pendapatan' then -n17 else n17 end as n17,
				case jenis_akun when  'Pendapatan' then -n18 else n18 end as n18,
				case jenis_akun when  'Pendapatan' then -n19 else n19 end as n19,
				case jenis_akun when  'Pendapatan' then -n20 else n20 end as n20,
				case jenis_akun when  'Pendapatan' then -n21 else n21 end as n21,
				case jenis_akun when  'Pendapatan' then -n22 else n22 end as n22,
				case jenis_akun when  'Pendapatan' then -n23 else n23 end as n23,
				case jenis_akun when  'Pendapatan' then -n24 else n24 end as n24,
				case jenis_akun when  'Pendapatan' then -n25 else n25 end as n25,
				case jenis_akun when  'Pendapatan' then -n26 else n26 end as n26,
				case jenis_akun when  'Pendapatan' then -n27 else n27 end as n27,
				case jenis_akun when  'Pendapatan' then -n28 else n28 end as n28,
				case jenis_akun when  'Pendapatan' then -n29 else n29 end as n29,
				case jenis_akun when  'Pendapatan' then -n30 else n30 end as n30,
				case jenis_akun when  'Pendapatan' then -n31 else n31 end as n31,
				case jenis_akun when  'Pendapatan' then -n32 else n32 end as n32,
				case jenis_akun when  'Pendapatan' then -n33 else n33 end as n33,
				case jenis_akun when  'Pendapatan' then -n34 else n34 end as n34,
				case jenis_akun when  'Pendapatan' then -n35 else n35 end as n35
			from dw_glma_pp a
			inner join relakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
			inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi
			inner join agg_pp d on a.kode_pp=d.kode_pp and a.kode_lokasi=d.kode_lokasi
			where b.kode_fs='$kode_fs' and b.kode_lokasi='$kode_lokasi' and b.kode_neraca='$kode_neraca' and a.nik_user='$nik_user'
			group by a.kode_akun,c.nama
			order by a.kode_akun ";
				
				$rs1 = $dbLib->execute($sql1);
				while ($row1 = $rs1->FetchNextObject($toupper=false))
				{	
					$total1=$row->n1+$row->n2+$row->n3+$row->n4+$row->n5+$row->n6;
					$total2=$row->n7+$row->n8+$row->n9+$row->n10;
					$total3=$row->n11+$row->n12+$row->n13+$row->n14;
					$total4=$row->n15+$row->n16+$row->n17+$row->n18;
					$total5=$row->n19+$row->n20+$row->n21;
					$total6=$row->n22+$row->n23+$row->n24+$row->n25+$row->n26+$row->n27+$row->n28;
					$total7=$row->n29+$row->n30+$row->n31+$row->n32+$row->n33+$row->n34+$row->n35;
					$nama=$row1->kode_akun." - ".$row1->nama;
					echo "<tr>
     <td class='isi_laporan' align='right'>".number_format($row->n1,$koma,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n2,$koma,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n3,$koma,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n4,$koma,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n5,$koma,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n6,$koma,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($total1,$koma,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n7,$koma,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n8,$koma,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n9,$koma,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n10,$koma,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($total2,$koma,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n11,$koma,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n12,$koma,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n13,$koma,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n14,$koma,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($total3,$koma,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n15,$koma,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n16,$koma,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n17,$koma,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n18,$koma,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($total4,$koma,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n19,$koma,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n20,$koma,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n21,$koma,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($total5,$koma,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n22,$koma,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n23,$koma,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n24,$koma,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n25,$koma,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n26,$koma,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n27,$koma,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n28,$koma,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($total6,$koma,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n29,$koma,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n30,$koma,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n31,$koma,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n32,$koma,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n33,$koma,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n34,$koma,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n35,$koma,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($total7,$koma,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n0,$koma,',','.')."</td>
  </tr>";
				}
			}
			$i=$i+1;
		}
		echo "</table></td>
  </tr>
  
</table>";
		
		echo "</div>";
		return "";
	}
	
}
?>
