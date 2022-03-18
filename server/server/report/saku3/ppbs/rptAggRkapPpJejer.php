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
class server_report_saku3_ppbs_rptAggRkapPpJejer extends server_report_basic
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
		$jenis=$tmp[6];
		$nama_file="ppbs_".$tahun.".xls";
		
		if ($jenis=="Excell")
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
		
		$sql="exec sp_agg_pp_jejer '$kode_fs','$tahun','$lokasi','$nik_user' ";
		
		$rs = $dbLib->execute($sql);
		$sql = "select kode_neraca,kode_fs,kode_lokasi,nama,tipe,level_spasi,
				case jenis_akun when  'Pendapatan' then -n0 else n0 end as n0,
				case jenis_akun when 'Pendapatan' then -n1 else n1 end as n1,
				case jenis_akun when 'Pendapatan' then -n2 else n2 end as n2,
				case jenis_akun when 'Pendapatan' then -n3 else n3 end as n3,
				case jenis_akun when 'Pendapatan' then -n4 else n4 end as n4,
				case jenis_akun when 'Pendapatan' then -n5 else n5 end as n5,
				case jenis_akun when 'Pendapatan' then -n6 else n6 end as n6,
				case jenis_akun when 'Pendapatan' then -n7 else n7 end as n7,
				case jenis_akun when 'Pendapatan' then -n8 else n8 end as n8,
				case jenis_akun when 'Pendapatan' then -n9 else n9 end as n9,
				case jenis_akun when 'Pendapatan' then -n10 else n10 end as n10,
				case jenis_akun when 'Pendapatan' then -n11 else n11 end as n11,
				case jenis_akun when 'Pendapatan' then -n12 else n12 end as n12,
				case jenis_akun when 'Pendapatan' then -n13 else n13 end as n13,
				case jenis_akun when 'Pendapatan' then -n14 else n14 end as n14,
				case jenis_akun when 'Pendapatan' then -n15 else n15 end as n15,
				case jenis_akun when 'Pendapatan' then -n16 else n16 end as n16,
				case jenis_akun when 'Pendapatan' then -n17 else n17 end as n17,
				case jenis_akun when 'Pendapatan' then -n18 else n18 end as n18,
				case jenis_akun when 'Pendapatan' then -n19 else n19 end as n19,
				case jenis_akun when 'Pendapatan' then -n20 else n20 end as n20,
				case jenis_akun when 'Pendapatan' then -n21 else n21 end as n21,
				case jenis_akun when 'Pendapatan' then -n22 else n22 end as n22,
				case jenis_akun when 'Pendapatan' then -n23 else n23 end as n23,
				case jenis_akun when 'Pendapatan' then -n24 else n24 end as n24,
				case jenis_akun when 'Pendapatan' then -n25 else n25 end as n25,
				case jenis_akun when 'Pendapatan' then -n26 else n26 end as n26,
				case jenis_akun when 'Pendapatan' then -n27 else n27 end as n27,
				case jenis_akun when 'Pendapatan' then -n28 else n28 end as n28,
				case jenis_akun when 'Pendapatan' then -n29 else n29 end as n29,
				case jenis_akun when 'Pendapatan' then -n30 else n30 end as n30,
				case jenis_akun when 'Pendapatan' then -n31 else n31 end as n31,
				case jenis_akun when 'Pendapatan' then -n32 else n32 end as n32,
				case jenis_akun when 'Pendapatan' then -n33 else n33 end as n33,
				case jenis_akun when 'Pendapatan' then -n34 else n34 end as n34,
				case jenis_akun when 'Pendapatan' then -n35 else n35 end as n35,
				case jenis_akun when 'Pendapatan' then -n36 else n36 end as n36,
				case jenis_akun when 'Pendapatan' then -n37 else n37 end as n37,
				case jenis_akun when 'Pendapatan' then -n38 else n38 end as n38,
				case jenis_akun when 'Pendapatan' then -n39 else n39 end as n39,
				case jenis_akun when 'Pendapatan' then -n40 else n40 end as n40,
				case jenis_akun when 'Pendapatan' then -n41 else n41 end as n41,
				case jenis_akun when 'Pendapatan' then -n42 else n42 end as n42,
				case jenis_akun when 'Pendapatan' then -n43 else n43 end as n43,
				case jenis_akun when 'Pendapatan' then -n44 else n44 end as n44,
				case jenis_akun when 'Pendapatan' then -n45 else n45 end as n45,
				case jenis_akun when 'Pendapatan' then -n46 else n46 end as n46,
				case jenis_akun when 'Pendapatan' then -n47 else n47 end as n47,
				case jenis_akun when 'Pendapatan' then -n48 else n48 end as n48,
				case jenis_akun when 'Pendapatan' then -n49 else n49 end as n49,
				case jenis_akun when 'Pendapatan' then -n50 else n50 end as n50,
				case jenis_akun when 'Pendapatan' then -n51 else n51 end as n51,
				case jenis_akun when 'Pendapatan' then -n52 else n52 end as n52,
				case jenis_akun when 'Pendapatan' then -n53 else n53 end as n53,
				case jenis_akun when 'Pendapatan' then -n54 else n54 end as n54,
				case jenis_akun when 'Pendapatan' then -n55 else n55 end as n55,
				case jenis_akun when 'Pendapatan' then -n56 else n56 end as n56,
				case jenis_akun when 'Pendapatan' then -n57 else n57 end as n57,
				case jenis_akun when 'Pendapatan' then -n58 else n58 end as n58,
				case jenis_akun when 'Pendapatan' then -n59 else n59 end as n59,
				case jenis_akun when 'Pendapatan' then -n60 else n60 end as n60,
				case jenis_akun when 'Pendapatan' then -n61 else n61 end as n61,
				case jenis_akun when 'Pendapatan' then -n62 else n62 end as n62,
				case jenis_akun when 'Pendapatan' then -n63 else n63 end as n63,
				case jenis_akun when 'Pendapatan' then -n64 else n64 end as n64,
				case jenis_akun when 'Pendapatan' then -n65 else n65 end as n65,
				case jenis_akun when 'Pendapatan' then -n66 else n66 end as n66,
				case jenis_akun when 'Pendapatan' then -n67 else n67 end as n67,
				case jenis_akun when 'Pendapatan' then -n68 else n68 end as n68,
				case jenis_akun when 'Pendapatan' then -n69 else n69 end as n69,
				case jenis_akun when 'Pendapatan' then -n70 else n70 end as n70,
				case jenis_akun when 'Pendapatan' then -n71 else n71 end as n71,
				case jenis_akun when 'Pendapatan' then -n72 else n72 end as n72,
				case jenis_akun when 'Pendapatan' then -n73 else n73 end as n73,
				case jenis_akun when 'Pendapatan' then -n74 else n74 end as n74,
				case jenis_akun when 'Pendapatan' then -n75 else n75 end as n75,
				case jenis_akun when 'Pendapatan' then -n76 else n76 end as n76,
				case jenis_akun when 'Pendapatan' then -n77 else n77 end as n77,
				case jenis_akun when 'Pendapatan' then -n78 else n78 end as n78
			from neracapp_tmp 
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
		echo $AddOnLib->judul_laporan("LAPORAN REKAP ANGGARAN LABARUGI JEJER PP",$this->lokasi,"TAHUN $tahun");
		echo "<table border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td><table border='1' cellspacing='0' cellpadding='0' class='kotak' width'5000'>
		  <tr bgcolor='#CCCCCC'>
			<td width='300' height='25'  class='header_laporan' align='center'>Deskripsi</td>";
			$sql="select kode_pp,nama from agg_pp where kode_lokasi='$lokasi' and tahun='$tahun' order by kode_pp";
			$rs2 = $dbLib->execute($sql);
			while ($row2 = $rs2->FetchNextObject($toupper=false))
			{
				echo "<td width='90' class='header_laporan' align='center'>$row2->nama - $row2->kode_pp</td>";
			}
			echo "<td width='100' class='header_laporan' align='center'>Total</td>
		</tr>";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$koma=0;
			if ($row->kode_neraca=="48")
			{
				$koma=2;
			}
			echo "<tr><td height='20' class='isi_laporan'>$row->nama</td>";
			$sql="select kode_pp,nama from agg_pp where kode_lokasi='$lokasi' and tahun='$tahun' order by kode_pp";
			$rs2 = $dbLib->execute($sql);
			$i=1;
			while ($row2 = $rs2->FetchNextObject($toupper=false))
			{
				$tmp="\$row->n$i";
				eval("\$str = \"$tmp\";");
				echo "	  <td class='isi_laporan' align='right'>".number_format($str,$koma,',','.')."</td>";
				$i+=1;
			}
			echo "<td class='isi_laporan' align='right'>".number_format($row->n0,$koma,',','.')."</td>";
			echo "</tr>";
			if ($bentuk=="Detail" && $row->tipe=="Posting")
			{
				$kode_neraca=$row->kode_neraca;
				$kode_fs=$row->kode_fs;
				$kode_lokasi=$row->kode_lokasi;
				$sql1="select a.kode_akun,c.nama,	
				   	sum(case when a.kode_pp='1101' then (case c.jenis when 'Pendapatan' then a.total else a.total end) else 0 end) as n1,
sum(case when a.kode_pp='1102' then (case c.jenis when 'Pendapatan' then a.total else a.total end) else 0 end) as n2,
sum(case when a.kode_pp='1103' then (case c.jenis when 'Pendapatan' then a.total else a.total end) else 0 end) as n3,
sum(case when a.kode_pp='1104' then (case c.jenis when 'Pendapatan' then a.total else a.total end) else 0 end) as n4,
sum(case when a.kode_pp='1199' then (case c.jenis when 'Pendapatan' then a.total else a.total end) else 0 end) as n5,
sum(case when a.kode_pp='1201' then (case c.jenis when 'Pendapatan' then a.total else a.total end) else 0 end) as n6,
sum(case when a.kode_pp='1202' then (case c.jenis when 'Pendapatan' then a.total else a.total end) else 0 end) as n7,
sum(case when a.kode_pp='1203' then (case c.jenis when 'Pendapatan' then a.total else a.total end) else 0 end) as n8,
sum(case when a.kode_pp='1299' then (case c.jenis when 'Pendapatan' then a.total else a.total end) else 0 end) as n9,
sum(case when a.kode_pp='1301' then (case c.jenis when 'Pendapatan' then a.total else a.total end) else 0 end) as n10,
sum(case when a.kode_pp='1901' then (case c.jenis when 'Pendapatan' then a.total else a.total end) else 0 end) as n11,
sum(case when a.kode_pp='2101' then (case c.jenis when 'Pendapatan' then a.total else a.total end) else 0 end) as n12,
sum(case when a.kode_pp='2102' then (case c.jenis when 'Pendapatan' then a.total else a.total end) else 0 end) as n13,
sum(case when a.kode_pp='2103' then (case c.jenis when 'Pendapatan' then a.total else a.total end) else 0 end) as n14,
sum(case when a.kode_pp='2199' then (case c.jenis when 'Pendapatan' then a.total else a.total end) else 0 end) as n15,
sum(case when a.kode_pp='2201' then (case c.jenis when 'Pendapatan' then a.total else a.total end) else 0 end) as n16,
sum(case when a.kode_pp='2202' then (case c.jenis when 'Pendapatan' then a.total else a.total end) else 0 end) as n17,
sum(case when a.kode_pp='2203' then (case c.jenis when 'Pendapatan' then a.total else a.total end) else 0 end) as n18,
sum(case when a.kode_pp='2204' then (case c.jenis when 'Pendapatan' then a.total else a.total end) else 0 end) as n19,
sum(case when a.kode_pp='2299' then (case c.jenis when 'Pendapatan' then a.total else a.total end) else 0 end) as n20,
sum(case when a.kode_pp='2901' then (case c.jenis when 'Pendapatan' then a.total else a.total end) else 0 end) as n21,
sum(case when a.kode_pp='3101' then (case c.jenis when 'Pendapatan' then a.total else a.total end) else 0 end) as n22,
sum(case when a.kode_pp='3102' then (case c.jenis when 'Pendapatan' then a.total else a.total end) else 0 end) as n23,
sum(case when a.kode_pp='3199' then (case c.jenis when 'Pendapatan' then a.total else a.total end) else 0 end) as n24,
sum(case when a.kode_pp='3201' then (case c.jenis when 'Pendapatan' then a.total else a.total end) else 0 end) as n25,
sum(case when a.kode_pp='3301' then (case c.jenis when 'Pendapatan' then a.total else a.total end) else 0 end) as n26,
sum(case when a.kode_pp='3901' then (case c.jenis when 'Pendapatan' then a.total else a.total end) else 0 end) as n27,
sum(case when a.kode_pp='4101' then (case c.jenis when 'Pendapatan' then a.total else a.total end) else 0 end) as n28,
sum(case when a.kode_pp='4102' then (case c.jenis when 'Pendapatan' then a.total else a.total end) else 0 end) as n29,
sum(case when a.kode_pp='4199' then (case c.jenis when 'Pendapatan' then a.total else a.total end) else 0 end) as n30,
sum(case when a.kode_pp='4201' then (case c.jenis when 'Pendapatan' then a.total else a.total end) else 0 end) as n31,
sum(case when a.kode_pp='4202' then (case c.jenis when 'Pendapatan' then a.total else a.total end) else 0 end) as n32,
sum(case when a.kode_pp='4299' then (case c.jenis when 'Pendapatan' then a.total else a.total end) else 0 end) as n33,
sum(case when a.kode_pp='4301' then (case c.jenis when 'Pendapatan' then a.total else a.total end) else 0 end) as n34,
sum(case when a.kode_pp='4302' then (case c.jenis when 'Pendapatan' then a.total else a.total end) else 0 end) as n35,
sum(case when a.kode_pp='4399' then (case c.jenis when 'Pendapatan' then a.total else a.total end) else 0 end) as n36,
sum(case when a.kode_pp='4401' then (case c.jenis when 'Pendapatan' then a.total else a.total end) else 0 end) as n37,
sum(case when a.kode_pp='4901' then (case c.jenis when 'Pendapatan' then a.total else a.total end) else 0 end) as n38,
sum(case when a.kode_pp='5101' then (case c.jenis when 'Pendapatan' then a.total else a.total end) else 0 end) as n39,
sum(case when a.kode_pp='5102' then (case c.jenis when 'Pendapatan' then a.total else a.total end) else 0 end) as n40,
sum(case when a.kode_pp='5103' then (case c.jenis when 'Pendapatan' then a.total else a.total end) else 0 end) as n41,
sum(case when a.kode_pp='5104' then (case c.jenis when 'Pendapatan' then a.total else a.total end) else 0 end) as n42,
sum(case when a.kode_pp='5105' then (case c.jenis when 'Pendapatan' then a.total else a.total end) else 0 end) as n43,
sum(case when a.kode_pp='5106' then (case c.jenis when 'Pendapatan' then a.total else a.total end) else 0 end) as n44,
sum(case when a.kode_pp='5199' then (case c.jenis when 'Pendapatan' then a.total else a.total end) else 0 end) as n45,
sum(case when a.kode_pp='5201' then (case c.jenis when 'Pendapatan' then a.total else a.total end) else 0 end) as n46,
sum(case when a.kode_pp='5202' then (case c.jenis when 'Pendapatan' then a.total else a.total end) else 0 end) as n47,
sum(case when a.kode_pp='5203' then (case c.jenis when 'Pendapatan' then a.total else a.total end) else 0 end) as n48,
sum(case when a.kode_pp='5299' then (case c.jenis when 'Pendapatan' then a.total else a.total end) else 0 end) as n49,
sum(case when a.kode_pp='5301' then (case c.jenis when 'Pendapatan' then a.total else a.total end) else 0 end) as n50,
sum(case when a.kode_pp='5302' then (case c.jenis when 'Pendapatan' then a.total else a.total end) else 0 end) as n51,
sum(case when a.kode_pp='5303' then (case c.jenis when 'Pendapatan' then a.total else a.total end) else 0 end) as n52,
sum(case when a.kode_pp='5399' then (case c.jenis when 'Pendapatan' then a.total else a.total end) else 0 end) as n53,
sum(case when a.kode_pp='5401' then (case c.jenis when 'Pendapatan' then a.total else a.total end) else 0 end) as n54,
sum(case when a.kode_pp='5402' then (case c.jenis when 'Pendapatan' then a.total else a.total end) else 0 end) as n55,
sum(case when a.kode_pp='5403' then (case c.jenis when 'Pendapatan' then a.total else a.total end) else 0 end) as n56,
sum(case when a.kode_pp='5499' then (case c.jenis when 'Pendapatan' then a.total else a.total end) else 0 end) as n57,
sum(case when a.kode_pp='5501' then (case c.jenis when 'Pendapatan' then a.total else a.total end) else 0 end) as n58,
sum(case when a.kode_pp='5502' then (case c.jenis when 'Pendapatan' then a.total else a.total end) else 0 end) as n59,
sum(case when a.kode_pp='5599' then (case c.jenis when 'Pendapatan' then a.total else a.total end) else 0 end) as n60,
sum(case when a.kode_pp='5601' then (case c.jenis when 'Pendapatan' then a.total else a.total end) else 0 end) as n61,
sum(case when a.kode_pp='5602' then (case c.jenis when 'Pendapatan' then a.total else a.total end) else 0 end) as n62,
sum(case when a.kode_pp='5603' then (case c.jenis when 'Pendapatan' then a.total else a.total end) else 0 end) as n63,
sum(case when a.kode_pp='5604' then (case c.jenis when 'Pendapatan' then a.total else a.total end) else 0 end) as n64,
sum(case when a.kode_pp='5605' then (case c.jenis when 'Pendapatan' then a.total else a.total end) else 0 end) as n65,
sum(case when a.kode_pp='5699' then (case c.jenis when 'Pendapatan' then a.total else a.total end) else 0 end) as n66,
sum(case when a.kode_pp='5701' then (case c.jenis when 'Pendapatan' then a.total else a.total end) else 0 end) as n67,
sum(case when a.kode_pp='5702' then (case c.jenis when 'Pendapatan' then a.total else a.total end) else 0 end) as n68,
sum(case when a.kode_pp='5703' then (case c.jenis when 'Pendapatan' then a.total else a.total end) else 0 end) as n69,
sum(case when a.kode_pp='5704' then (case c.jenis when 'Pendapatan' then a.total else a.total end) else 0 end) as n70,
sum(case when a.kode_pp='5705' then (case c.jenis when 'Pendapatan' then a.total else a.total end) else 0 end) as n71,
sum(case when a.kode_pp='5706' then (case c.jenis when 'Pendapatan' then a.total else a.total end) else 0 end) as n72,
sum(case when a.kode_pp='5707' then (case c.jenis when 'Pendapatan' then a.total else a.total end) else 0 end) as n73,
sum(case when a.kode_pp='5799' then (case c.jenis when 'Pendapatan' then a.total else a.total end) else 0 end) as n74,
sum(case when a.kode_pp='9101' then (case c.jenis when 'Pendapatan' then a.total else a.total end) else 0 end) as n75,
sum(case when a.kode_pp='9102' then (case c.jenis when 'Pendapatan' then a.total else a.total end) else 0 end) as n76,
sum(case when a.kode_pp='9103' then (case c.jenis when 'Pendapatan' then a.total else a.total end) else 0 end) as n77,
sum(case when a.kode_pp='9104' then (case c.jenis when 'Pendapatan' then a.total else a.total end) else 0 end) as n78,
				    sum(case c.jenis when 'Pendapatan' then a.total else a.total end) as n0
			from dw_glma_pp a
			inner join relakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
			inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi
			where b.kode_fs='$kode_fs' and b.kode_lokasi='$kode_lokasi' and b.kode_neraca='$kode_neraca' and a.nik_user='$nik_user'
			group by a.kode_akun,c.nama
			order by a.kode_akun ";
				
				$rs1 = $dbLib->execute($sql1);
				while ($row1 = $rs1->FetchNextObject($toupper=false))
				{	
					$so_akhir=number_format($row1->so_akhir,0,",",".");
					$nama=$row1->kode_akun." - ".$row1->nama;
					echo "<tr><td height='20' class='detail_laporan'>".$AddOnLib->spasi($nama,$row->level_spasi+1)."</td>";
					$sql="select kode_pp,nama from agg_pp where kode_lokasi='$lokasi' and tahun='$tahun' order by kode_pp";
					$rs2 = $dbLib->execute($sql);
					$i=1;
					while ($row2 = $rs2->FetchNextObject($toupper=false))
					{
						$tmp="\$row1->n$i";
						eval("\$str = \"$tmp\";");
						echo "	  <td class='isi_laporan' align='right'>".number_format($str,$koma,',','.')."</td>";
						$i+=1;
					}
					echo "<td class='isi_laporan' align='right'>".number_format($row1->n0,$koma,',','.')."</td>";
				    echo "</tr>";
				}
			}
		}
		echo "</table></td>
  </tr>
  
</table>";
		
		echo "</div>";
		return "";
	}
	
}
?>
