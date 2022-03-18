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
function getBulan($bln)
	{
		$tmp="";
		switch ($bln) 
		{
			case "01":
				$tmp="Januari";
				break;
			case "02":
				$tmp="Februari";
				break;
			case "03":
				$tmp="Maret";
				break;
			case "04":
				$tmp="April";
				break;
			case "05":
				$tmp="Mei";
				break;
			case "06":
				$tmp="Juni";
				break;
			case "07":
				$tmp="Juli";
				break;
			case "08":
				$tmp="Agustus";
				break;
			case "09":
				$tmp="September";
				break;
			case "10":
				$tmp="Oktober";
				break;
			case "11":
				$tmp="November";
				break;
			case "12":
				$tmp="Desember";
				break;
		} 
		return $tmp;
	}
class server_report_saku3_gl_rptYptLabaRugiGarPpReset extends server_report_basic
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
		$nik_user=$tmp[0];
		$kode_lokasi=$tmp[1];
		$periode=$tmp[2];
		$kode_fs=$tmp[3];
		$lev=$tmp[4];
		$bentuk=$tmp[5];
		$kode_pp=$tmp[6];
		
		$tahun=substr($periode,0,4);
		$bln=substr($periode,4,2);
		$bulan=getBulan($bln);
		$tahun_rev=$tahun-1;
		if ($bln=="01")
		{
			$bulan_rev=getBulan($bln);
		}
		else
		{
			$bulan_rev=getBulan($bln-1);
		}
		
		$sql="select nama from pp where kode_lokasi='$kode_lokasi' and kode_pp='$kode_pp'";
		$rs = $dbLib->execute($sql);
		$row = $rs->FetchNextObject($toupper=false);
		$nama_pp=$row->nama;
		
		$sql = "select a.kode_neraca,a.kode_fs,a.kode_lokasi,a.nama,a.tipe,a.level_spasi,
					case jenis_akun when 'Pendapatan' then -n1 else n1 end as n1, 
					case jenis_akun when 'Pendapatan' then -n2 else n2 end as n2, 
				    case jenis_akun when  'Pendapatan' then -n3 else n3 end as n3,
					case jenis_akun when  'Pendapatan' then -n4 else n4 end as n4,
					case jenis_akun when  'Pendapatan' then -n5 else n5 end as n5,
					case jenis_akun when  'Pendapatan' then -n6 else n6 end as n6,
					case jenis_akun when  'Pendapatan' then -n7 else n7 end as n7,
					case jenis_akun when  'Pendapatan' then -n9 else n9 end as n9,
					case jenis_akun when  'Pendapatan' then -n10 else n10 end as n10,
					case jenis_akun when  'Pendapatan' then -n11 else n11 end as n11,
					case jenis_akun when  'Pendapatan' then -n12 else n12 end as n12,
					case jenis_akun when  'Pendapatan' then -n13 else n13 end as n13,
					case jenis_akun when  'Pendapatan' then -n14 else n14 end as n14
			from exs_neraca_pp a
			where a.modul='L'  and a.kode_fs='$kode_fs' and a.periode='$periode'  and a.level_lap<=$lev and a.kode_pp='$kode_pp'
			order by a.rowindex ";
		
		$rs = $dbLib->execute($sql);
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		
		//echo $AddOnLib->judul_laporan($nama_form,$this->lokasi,$AddOnLib->ubah_periode($periode));
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>";
		//echo $AddOnLib->judul_laporan("laporan aktifitas",$this->lokasi,"Untuk Periode Yang Berakhir Pada Tanggal $totime");
		echo "<table border='0' cellspacing='0' cellpadding='0' >
  <tr>
    <td class='lokasi_laporan' align='center'>$this->lokasi <br>$nama_pp</td>
  </tr>
  <tr>
    <td  class='lokasi_laporan2' align='center'>LAPORAN LABA RUGI ANGGARAN</td>
  </tr>
  <tr>
    <td class='lokasi_laporan' align='center'>Periode ".$AddOnLib->ubah_periode($periode)."</td>
  </tr>
  <tr>
    <td align='center'>";
		echo "<table width='1300' border='1' cellpadding='0' cellspacing='0' class='kotak'>
  <tr bgcolor='#dbeef3'>
    <td width='200' rowspan='2' align='center' class='header_laporan'>P&amp;L ITEMS (in Rp.Bn)</td>
    <td width='90' rowspan='2' align='center' class='header_laporan'>Budget Reset $tahun</td>
	<td width='90' rowspan='2' align='center' class='header_laporan'>Actual $bulan_rev $tahun</td>
    <td colspan='4' align='center' class='header_laporan'>$bulan $tahun</td>
    <td width='90' rowspan='2' align='center' class='header_laporan'>Actual Ytd $bulan $tahun_rev</td>
    <td colspan='4' align='center' class='header_laporan'>Ytd $bulan $tahun</td>
  </tr>
  <tr bgcolor='#dbeef3'>
    <td width='90' align='center' class='header_laporan'>Budget Reset</td>
    <td width='90' align='center' class='header_laporan'>Actual</td>
    <td width='60' align='center' class='header_laporan'>Ach.</td>
    <td width='60' align='center' class='header_laporan'>MoM Growth</td>
    <td width='90' align='center' class='header_laporan'>Budget Reset</td>
    <td width='90' align='center' class='header_laporan'>Actual</td>
    <td width='60' align='center' class='header_laporan'>Ach.</td>
    <td width='60' align='center' class='header_laporan'>YoY Growth</td>
  </tr>";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$persen1=0;$persen2=0;$persen3=0;$persen4=0;
			if ($row->n12!=0)
			{
				$persen1=($row->n6/$row->n12)*100;
			}
			if ($row->n9!=0)
			{
				$persen2=((($row->n6-$row->n9)/abs($row->n9)))*100;
			}
			if ($row->n14!=0)
			{
				$persen3=($row->n4/$row->n14)*100;
			}
			if ($row->n5!=0)
			{
				$persen4=($row->n4-$row->n5)/$row->n5;
			}
			echo "<tr >
					<td class='isi_laporan'> ";
			echo fnSpasi($row->level_spasi);
			echo "$row->nama </td>
					<td class='isi_laporan' align='right'>".number_format($row->n14,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row->n9,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row->n12,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row->n6,0,',','.')."</td>
					<td class='isi_laporan' align='center'>".number_format($persen1,2,',','.')."%</td>
					<td class='isi_laporan' align='center'>".number_format($persen2,2,',','.')."%</td>
					<td class='isi_laporan' align='right'>".number_format($row->n13,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row->n2,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row->n4,0,',','.')."</td>
					<td class='isi_laporan' align='center'>".number_format($persen3,2,',','.')."</td>
					<td class='isi_laporan' align='center'>".number_format($persen4,2,',','.')."</td>
				 </tr>";
			if ($bentuk=="Detail" && $row->tipe=="Posting")
			{
				$kode_neraca=$row->kode_neraca;
				$kode_fs=$row->kode_fs;
				$kode_lokasi=$row->kode_lokasi;
				$sql1="select a.kode_akun,c.nama,
							case c.jenis when 'Pendapatan' then -a.n1 else a.n1 end as n1, 
							case c.jenis when 'Pendapatan' then -a.n2 else a.n2 end as n2, 
							case c.jenis when  'Pendapatan' then -a.n3 else a.n3 end as n3,
							case c.jenis when  'Pendapatan' then -a.n4 else a.n4 end as n4,
							case c.jenis when  'Pendapatan' then -a.n5 else a.n5 end as n5,
							case c.jenis when  'Pendapatan' then -a.n6 else a.n6 end as n6,
							case c.jenis when  'Pendapatan' then -a.n7 else a.n7 end as n7,
							case c.jenis when  'Pendapatan' then -a.n9 else a.n9 end as n9,
							case c.jenis when  'Pendapatan' then -a.n10 else a.n10 end as n10,
							case c.jenis when  'Pendapatan' then -a.n11 else a.n11 end as n11,
							case c.jenis when  'Pendapatan' then -a.n12 else a.n12 end as n12,
							case c.jenis when  'Pendapatan' then -a.n13 else a.n13 end as n13,
							case c.jenis when  'Pendapatan' then -a.n14 else a.n14 end as n14
					from exs_glma_gar_pp a
					inner join relakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
					inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi
					where b.kode_fs='$kode_fs' and b.kode_lokasi='$kode_lokasi' and b.kode_neraca='$kode_neraca' and a.periode='$periode' and a.kode_pp='$kode_pp'
					order by a.kode_akun ";
			
				$rs1 = $dbLib->execute($sql1);
				
				while ($row1 = $rs1->FetchNextObject($toupper=false))
				{	
					$so_akhir=number_format($row1->so_akhir,0,",",".");
					$nama=$row1->kode_akun." - ".$row1->nama;
					$persen1=0;$persen2=0;$persen3=0;$persen4=0;
					if ($row1->n12!=0)
					{
						$persen1=$row1->n6/$row1->n12;
					}
					if ($row1->n9!=0)
					{
						$persen2=(($row1->n6/$row1->n9)-1)*100;
					}
					if ($row1->n14!=0)
					{
						$persen3=$row1->n4/$row1->n14;
					}
					if ($row1->n5!=0)
					{
						$persen4=(($row1->n4/$row1->n5)-1)*100;
					}
					echo "<tr>
					<td height='20' class='detail_laporan'>".$AddOnLib->spasi($nama,$row->level_spasi+1)."</td>
					<td class='isi_laporan' align='right'>".number_format($row1->n14,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row1->n9,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row1->n12,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row1->n6,0,',','.')."</td>
					<td class='isi_laporan' align='center'>".number_format($persen1,2,',','.')."%</td>
					<td class='isi_laporan' align='center'>".number_format($persen2,2,',','.')."%</td>
					<td class='isi_laporan' align='right'>".number_format($row1->n13,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row1->n2,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row1->n4,0,',','.')."</td>
					<td class='isi_laporan' align='center'>".number_format($persen3,2,',','.')."</td>
					<td class='isi_laporan' align='center'>".number_format($persen4,2,',','.')."</td>
				  </tr>";
				}
				
			}
		}
		echo "</table></div>";
		return "";
	}
	
}
?>
