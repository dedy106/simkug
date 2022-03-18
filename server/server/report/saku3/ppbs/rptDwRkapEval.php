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
class server_report_saku3_ppbs_rptDwRkapEval extends server_report_basic
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
		$kode_lokasi=$tmp[0];
		$tahun=$tmp[1];
		$kode_fs=$tmp[2];
		$lev=$tmp[3];
		$bentuk=$tmp[4];
		$nik_user=$tmp[5];
		
		$tahun_rev=$tahun-1;
		$tahun_rev2=$tahun-2;
		$tahun_rev3=$tahun-3;
		$tahun_rev4=$tahun-4;
		$sql="exec sp_agg_neraca_eval_tmp '$kode_fs','$kode_lokasi','$tahun','$nik_user'; ";
		$rs = $dbLib->execute($sql);  
		
		if ($bentuk=="Detail"){
			$sql="exec sp_agg_glma_eval_tmp '$kode_lokasi','$tahun','$nik_user'";
			$rs = $dbLib->execute($sql);
			
		}
		
		$sql = "select kode_neraca,kode_fs,kode_lokasi,nama,tipe,level_spasi,
					case jenis_akun when 'Pendapatan' then -n1 else n1 end as n1, 
					case jenis_akun when 'Pendapatan' then -n2 else n2 end as n2, 
				    case jenis_akun when  'Pendapatan' then -n3 else n3 end as n3,
					case jenis_akun when  'Pendapatan' then -n4 else n4 end as n4,
					case jenis_akun when  'Pendapatan' then -n5 else n5 end as n5,
					case jenis_akun when  'Pendapatan' then -n6 else n6 end as n6,
					case jenis_akun when  'Pendapatan' then -n7 else n7 end as n7,
					case jenis_akun when  'Pendapatan' then -n8 else n8 end as n8,
					case jenis_akun when  'Pendapatan' then -n9 else n9 end as n9
			from agg_neraca_eval_tmp
			$this->filter and modul='L' and  level_lap<=$lev and nik_user='$nik_user'
			order by rowindex ";

			//echo $sql;
		
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
    <td class='lokasi_laporan' align='center'>$this->lokasi</td>
  </tr>
  <tr>
    <td  class='lokasi_laporan2' align='center'>LAPORAN LABA RUGI REALISASI dan PROYEKSI</td>
  </tr>
  <tr>
    <td class='lokasi_laporan' align='center'>Tahun $tahun</td>
  </tr>
  <tr>
    <td align='center'>";
		echo "<table width='1300' border='1' cellpadding='0' cellspacing='0' class='kotak'>
  <tr bgcolor='#dbeef3'>
    <td width='300' rowspan='2' align='center' class='header_laporan'>Deskripsi</td>
	<td width='90' rowspan='2' align='center' class='header_laporan'>Realisasi $tahun_rev3 </td>
	<td width='90' rowspan='2' align='center' class='header_laporan'>Realisasi $tahun_rev2 </td>
    <td colspan='3' align='center' class='header_laporan'>$tahun_rev</td>
    <td width='90' rowspan='2' align='center' class='header_laporan'>Anggaran $tahun </td>
	<td colspan='3' align='center' class='header_laporan'>Growth</td>
  </tr>
  <tr bgcolor='#dbeef3'>
    <td width='90' align='center' class='header_laporan'>RKA</td>
    <td width='90' align='center' class='header_laporan'>Outlook</td>
    <td width='50' align='center' class='header_laporan'>Ach</td>
	<td width='50' align='center' class='header_laporan'>$tahun_rev2</td>
	<td width='50' align='center' class='header_laporan'>$tahun_rev</td>
	<td width='50' align='center' class='header_laporan'>$tahun</td>
  </tr>";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$persen1=0;$persen2=0;$persen3=0;$persen4=0;
			if ($row->n3!=0)
			{
				$persen1=($row->n4/$row->n3)*100;
			}
			if ($row->n1!=0)
			{
				$persen2=((($row->n2-$row->n1)/abs($row->n1)))*100;
			}
			if ($row->n2!=0)
			{
				$persen3=((($row->n4-$row->n2)/abs($row->n2)))*100;
			}
			if ($row->n4!=0)
			{
				$persen4=((($row->n5-$row->n4)/abs($row->n4)))*100;
			}
			echo "<tr >
					<td class='isi_laporan'> ";
			echo fnSpasi($row->level_spasi);
			echo "$row->nama </td>
					<td class='isi_laporan' align='right'>".number_format($row->n1,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row->n2,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row->n3,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row->n4,0,',','.')."</td>
					<td class='isi_laporan' align='center'>".number_format($persen1,2,',','.')."%</td>
					<td class='isi_laporan' align='right'>".number_format($row->n5,0,',','.')."</td>
					<td class='isi_laporan' align='center'>".number_format($persen2,2,',','.')."%</td>
					<td class='isi_laporan' align='center'>".number_format($persen3,2,',','.')."%</td>
					<td class='isi_laporan' align='center'>".number_format($persen4,2,',','.')."%</td>
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
						case c.jenis when 'Pendapatan' then -a.n4 else a.n4 end as n4, 
						case c.jenis when 'Pendapatan' then -a.n5 else a.n5 end as n5, 
						case c.jenis when  'Pendapatan' then -a.n6 else a.n6 end as n6,
						case c.jenis when 'Pendapatan' then -a.n7 else a.n7 end as n7, 
						case c.jenis when 'Pendapatan' then -a.n8 else a.n8 end as n8, 
						case c.jenis when  'Pendapatan' then -a.n9 else a.n9 end as n9
					from agg_glma_eval_tmp a
					inner join relakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
					inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi
					where a.nik_user='$nik_user' and b.kode_fs='$kode_fs' and b.kode_lokasi='$kode_lokasi' and b.kode_neraca='$kode_neraca' and a.tahun='$tahun' and (a.n1<>0 or a.n2<>0 or a.n4<>0 or a.n5<>0) 
					order by a.kode_akun ";
				if ($row->kode_lokasi=="11") 
				{
					$sql1="select a.kode_akun,c.nama,
						case c.jenis when 'Pendapatan' then -a.n1 else a.n1 end as n1, 
						case c.jenis when 'Pendapatan' then -a.n2 else a.n2 end as n2, 
						case c.jenis when  'Pendapatan' then -a.n3 else a.n3 end as n3,
						case c.jenis when 'Pendapatan' then -a.n4 else a.n4 end as n4, 
						case c.jenis when 'Pendapatan' then -a.n5 else a.n5 end as n5, 
						case c.jenis when  'Pendapatan' then -a.n6 else a.n6 end as n6,
						case c.jenis when 'Pendapatan' then -a.n7 else a.n7 end as n7, 
						case c.jenis when 'Pendapatan' then -a.n8 else a.n8 end as n8, 
						case c.jenis when  'Pendapatan' then -a.n9 else a.n9 end as n9
					from agg_glma_eval_tmp a
					inner join relakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
					inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi
					where a.nik_user='$nik_user' and b.kode_fs='$kode_fs' and b.kode_lokasi='$kode_lokasi' and b.kode_neraca='$kode_neraca' and a.tahun='$tahun' 
					and (a.n1<>0 or a.n2<>0 or a.n4<>0 or a.n5<>0) and (a.kode_akun+a.kode_lokasi) not in (select kode_akun+kode_lokasi from flag_relasi where kode_flag='057' and kode_lokasi='11')
					order by a.kode_akun ";
				}
				$rs1 = $dbLib->execute($sql1);
				
				while ($row1 = $rs1->FetchNextObject($toupper=false))
				{	
					$so_akhir=number_format($row1->so_akhir,0,",",".");
					$nama=$row1->kode_akun." - ".$row1->nama;
					$persen1=0;$persen2=0;$persen3=0;$persen4=0;
					if ($row1->n3!=0)
					{
						$persen1=($row1->n4/$row1->n3)*100;
					}
					if ($row1->n1!=0)
					{
						$persen2=((($row1->n2-$row1->n1)/abs($row1->n1)))*100;
					}
					if ($row1->n2!=0)
					{
						$persen3=((($row1->n4-$row1->n2)/abs($row1->n2)))*100;
					}
					if ($row1->n4!=0)
					{
						$persen4=((($row1->n5-$row1->n4)/abs($row1->n4)))*100;
					}
					echo "<tr>
					<td height='20' class='detail_laporan'>".$AddOnLib->spasi($nama,$row->level_spasi+1)."</td>
					<td class='isi_laporan' align='right'>".number_format($row1->n1,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row1->n2,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row1->n3,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row1->n4,0,',','.')."</td>
					<td class='isi_laporan' align='center'>".number_format($persen1,2,',','.')."%</td>
					<td class='isi_laporan' align='right'>".number_format($row1->n5,0,',','.')."</td>
					<td class='isi_laporan' align='center'>".number_format($persen2,2,',','.')."%</td>
					<td class='isi_laporan' align='center'>".number_format($persen3,2,',','.')."%</td>
					<td class='isi_laporan' align='center'>".number_format($persen4,2,',','.')."%</td>
				  </tr>";
				}
				
			}
		}
		echo "</table></div>";
		return "";
	}
	
}
?>
