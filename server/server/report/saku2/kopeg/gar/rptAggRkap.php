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
class server_report_saku2_kopeg_gar_rptAggRkap extends server_report_basic
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
		$periode=$tmp[1];
		$nik_user=$tmp[0];
		$bentuk=$tmp[2];
		$level_lap=$tmp[3];
		$nama_form=$tmp[4];
		$lokasi=$tmp[5];
		$kode_fs=$tmp[6];
		$sql = "select kode_neraca,kode_fs,kode_lokasi,nama,tipe,level_spasi,
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
				case jenis_akun when  'Pendapatan' then -n0 else n0 end as n0
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
		echo $AddOnLib->judul_laporan($nama_form,$this->lokasi,"Untuk Periode Yang Berakhir Pada Tanggal $totime");
		echo "<table border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td><table border='1' cellspacing='0' cellpadding='0' class='kotak'>
		  <tr bgcolor='#CCCCCC'>
			<td width='500' height='25'  class='header_laporan'><div align='center'>Deskripsi</div></td>
			<td width='90' class='header_laporan'><div align='center'>Januari</div></td>
    <td width='90' class='header_laporan'><div align='center'>Februari</div></td>
    <td width='90' class='header_laporan'><div align='center'>Maret</div></td>
    <td width='90' class='header_laporan'><div align='center'>April</div></td>
<td width='90' class='header_laporan'><div align='center'>Mei</div></td>
    <td width='90' class='header_laporan'><div align='center'>Juni</div></td>
    <td width='90' class='header_laporan'><div align='center'>Juli</div></td>
    <td width='90' class='header_laporan'><div align='center'>Agustus</div></td>
<td width='90' class='header_laporan'><div align='center'>September</div></td>
    <td width='90' class='header_laporan'><div align='center'>Oktober</div></td>
    <td width='90' class='header_laporan'><div align='center'>November</div></td>
    <td width='90' class='header_laporan'><div align='center'>Desember</div></td>
    <td width='100' class='header_laporan'><div align='center'>Total</div></td>
		</tr>";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai="";
		
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
				 <td class='isi_laporan' align='right'>".number_format($row->n1,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n2,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n3,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n4,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n5,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n6,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n7,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n8,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n9,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n10,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n11,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n12,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n0,0,',','.')."</td>
			  </tr>";
			if ($bentuk=="Detail" && $row->tipe=="Posting")
			{
				$kode_neraca=$row->kode_neraca;
				$kode_fs=$row->kode_fs;
				$kode_lokasi=$row->kode_lokasi;
				$sql1="select a.kode_akun,c.nama,
				   sum(case when substring(a.periode,5,2) between '01' and '12' then a.nilai else 0 end) as total, 	
				   sum(case when substring(a.periode,5,2)='01' then a.nilai else 0 end) as n1,
				   sum(case when substring(a.periode,5,2)='02' then a.nilai else 0 end) as n2, 
				   sum(case when substring(a.periode,5,2)='03' then a.nilai else 0 end) as n3, 
				   sum(case when substring(a.periode,5,2)='04' then a.nilai else 0 end) as n4, 
				   sum(case when substring(a.periode,5,2)='05' then a.nilai else 0 end) as n5, 
				   sum(case when substring(a.periode,5,2)='06' then a.nilai else 0 end) as n6, 
				   sum(case when substring(a.periode,5,2)='07' then a.nilai else 0 end) as n7, 
				   sum(case when substring(a.periode,5,2)='08' then a.nilai else 0 end) as n8, 
				   sum(case when substring(a.periode,5,2)='09' then a.nilai else 0 end) as n9, 
				   sum(case when substring(a.periode,5,2)='10' then a.nilai else 0 end) as n10, 
				   sum(case when substring(a.periode,5,2)='11' then a.nilai else 0 end) as n11, 
				   sum(case when substring(a.periode,5,2)='12' then a.nilai else 0 end) as n12 
			from anggaran_d a
			inner join relakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
			inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi
			where b.kode_fs='$kode_fs' and b.kode_lokasi='$kode_lokasi' and b.kode_neraca='$kode_neraca' and substring(a.periode,1,4)='$periode' and a.modul='ORGI'
			group by a.kode_akun,c.nama
			order by a.kode_akun ";
			
				$rs1 = $dbLib->execute($sql1);
				while ($row1 = $rs1->FetchNextObject($toupper=false))
				{	
					$so_akhir=number_format($row1->so_akhir,0,",",".");
					$nama=$row1->kode_akun." - ".$row1->nama;
					echo "<tr>
    <td height='20' class='detail_laporan'>".$AddOnLib->spasi($nama,$row->level_spasi+1)."</td>
   <td class='isi_laporan' align='right'>".number_format($row1->n1,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row1->n2,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row1->n3,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row1->n4,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row1->n5,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row1->n6,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row1->n7,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row1->n8,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row1->n9,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row1->n10,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row1->n11,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row1->n12,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row1->total,0,',','.')."</td>
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
