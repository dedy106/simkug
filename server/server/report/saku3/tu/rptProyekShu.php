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
class server_report_saku3_tu_rptProyekShu extends server_report_basic
{
	
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$mutasi=$tmp[1];
		$periode=$tmp[2];
		$sql = "select 1";
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);		
		}
		error_log($sql);
		return $totPage;
	}
	function getHtml()
	{
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$bentuk=$tmp[2];
		$kode_pp=$tmp[3];
		$jenis=$tmp[4];
		$nama_file="labarugi_pp_".$periode.".xls";
		$tahun=substr($periode,0,4);
		$tahun_rev=substr($periode,0,4)-1;
		
		
		$sql="exec sp_exs_neraca_pp 'FP5','$kode_lokasi','$periode' ";
		$rs3 = $dbLib->execute($sql);
		
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
		$sql="select a.kode_pp,a.nama from pp a $kode_pp order by a.kode_pp";
		
		$rs2 = $dbLib->execute($sql);
		
		while ($row2 = $rs2->FetchNextObject($toupper=false))
		{
			$nama=$row2->nama;
			$sql = "select a.kode_neraca,a.kode_fs,a.kode_lokasi,a.nama,a.tipe,a.level_spasi,a.kode_pp,
						case a.jenis_akun when  'Pendapatan' then -a.n4 else a.n4 end as n4
				from exs_neraca_pp a
				$this->filter and a.modul='L' and a.kode_pp='$row2->kode_pp'
				order by a.rowindex ";
			$rs = $dbLib->execute($sql);		
			
			$resource = $_GET["resource"];
			$fullId = $_GET["fullId"];
			$i = $start+1;
			$AddOnLib=new server_util_AddOnLib();
			
			echo "<div align='center' >"; 
			echo $AddOnLib->judul_laporan("laporan laba rugi unit"."<br>".$nama,$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
			echo "<table  border='1' cellpadding='0' cellspacing='0' class='kotak'>
		<tr bgcolor='#CCCCCC'>
		<td width='400' height='25'  class='header_laporan' align='center'>Keterangan</td>
		<td width='100' class='header_laporan' align='center'>Jumlah</td>
			</tr>
		";
			
			while ($row = $rs->FetchNextObject($toupper=false))
			{
				
				$nilai="";
				if ($row->tipe!="Header" && $row->nama!="." && $row->nama!="")
				{
					$nilai=number_format($row->n4,0,",",".");
				}
				if ($row->kode_neraca=="OR")
				{
					$nilai=number_format($row->n4,2,",",".");
				}
				echo "<tr>
		
		  <td height='20' class='isi_laporan'>";
				echo fnSpasi($row->level_spasi);
				if ($row->tipe=="Posting" && $row->n4 <> 0)
				{
					echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_lokasi','$periode','$row->kode_neraca','$row->kode_pp');\">$row->nama</a>";
				}
				else
				{
					echo "$row->nama";
				}
				echo "</td>";
				
				echo "<td class='isi_laporan' align='right'>$nilai</td>";
				
				if ($bentuk=="Detail" && $row->tipe=="Posting")
				{
					$kode_neraca=$row->kode_neraca;
					$kode_fs=$row->kode_fs;
					$kode_lokasi=$row->kode_lokasi;
					$sql1="	select a.kode_akun,c.nama,
								case c.jenis when  'Pendapatan' then -a.so_akhir else a.so_akhir end as n4
							from exs_glma_pp a
							inner join relakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
							inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi
							where b.kode_fs='$kode_fs' and a.kode_lokasi='$kode_lokasi' and b.kode_neraca='$kode_neraca' and a.periode='$periode' and a.kode_pp='$row2->kode_pp'
							order by a.kode_akun ";
					
					$rs1 = $dbLib->execute($sql1);
					
					while ($row1 = $rs1->FetchNextObject($toupper=false))
					{	
						
						$nama=$row1->kode_akun." - ".$row1->nama;
						echo "<tr>
						<td height='20' class='detail_laporan'>".$AddOnLib->spasi($nama,$row->level_spasi+1)."</td>
						<td class='detail_laporan' align='right'>".number_format($row1->n4,2,",",".")."</td>
						
					  </tr>";
					}
				}
				$i=$i+1;
			}
			
			echo "</table></div><br>";
		}
		return "";
	}
	
	function getHtml2()
	{
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$bentuk=$tmp[2];
		$kode_pp=$tmp[3];
		$jenis=$tmp[4];
		$nama_file="labarugi_pp_".$periode.".xls";
		$tahun=substr($periode,0,4);
		$tahun_rev=substr($periode,0,4)-1;
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
		$sql="select a.kode_pp,a.nama from pp a $kode_pp order by a.kode_pp";
		$rs2 = $dbLib->execute($sql);
		while ($row2 = $rs2->FetchNextObject($toupper=false))
		{
			$nama=$row2->nama;
			$sql = "select a.kode_neraca,a.kode_fs,a.kode_lokasi,a.nama,a.tipe,a.level_spasi,
						case a.jenis_akun when  'Pendapatan' then -a.n1 else a.n1 end as n1,
						case a.jenis_akun when  'Pendapatan' then -a.n2 else a.n2 end as n2,
						case a.jenis_akun when  'Pendapatan' then -a.n3 else a.n3 end as n3,
						case a.jenis_akun when  'Pendapatan' then -a.n4 else a.n4 end as n4,
						case a.jenis_akun when  'Pendapatan' then -a.n5 else a.n5 end as n5,
						case a.jenis_akun when  'Pendapatan' then -a.n6 else a.n6 end as n6,
						case a.jenis_akun when  'Pendapatan' then -a.n7 else a.n7 end as n7
				from exs_neraca_pp a
				$this->filter and a.modul='L' and a.kode_pp='$row2->kode_pp'
				order by a.rowindex ";
			$rs = $dbLib->execute($sql);		
			
			$resource = $_GET["resource"];
			$fullId = $_GET["fullId"];
			$i = $start+1;
			$AddOnLib=new server_util_AddOnLib();
			$content="";
			$content = "<div align='center' style='width:100%;overflow:auto'>"; 
			$content .= $AddOnLib->judul_laporan("laporan laba rugi prodi"."<br>".$nama,$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
			$content .= "<table  border='1' cellpadding='0' cellspacing='0' class='table table-striped table-hover' style='border-collapse : collapse;bordercolor : #111111;'>
		<tr class='info'>
		<td width='350' height='25'  class='header_laporan' align='center'>Keterangan</td>
		<td width='100' class='header_laporan' align='center'>RKA $tahun</td>
		<td width='100' class='header_laporan' align='center'>RKA s.d Bulan Berjalan $tahun</td>
		<td width='100' class='header_laporan' align='center'>Realisasi s.d Bulan Berjalan $tahun</td>
		<td width='80' class='header_laporan' align='center'>Realisasi s.d Bulan Berjalan thd RKA $tahun</td>
		<td width='80' class='header_laporan' align='center'>Realisasi s.d Bulan Berjalan thd RKA s.d Bulan Berjalan $tahun</td>
		</tr>
		<tr class='info'>
		  <td height='25'  class='header_laporan' align='center'>&nbsp;</td>
		  <td class='header_laporan' align='center'>1</td>
		  <td class='header_laporan' align='center'>3</td>
		  <td class='header_laporan' align='center'>4</td>
		  <td class='header_laporan' align='center'>6=4/1</td>
		  <td class='header_laporan' align='center'>7=4/3</td>
		</tr>";
			
			while ($row = $rs->FetchNextObject($toupper=false))
			{
				
				$persen1=0;$persen2=0;$persen3=0;
				if ($row->n1!=0)
				{
					$persen1=($row->n4/$row->n1)*100;
				}
				if ($row->n2!=0)
				{
					$persen2=($row->n4/$row->n2)*100;
				}
				if ($row->n5!=0)
				{
					$persen3=($row->n4-$row->n5)/$row->n5*100;
				}
				$content .= "<tr>
		
		  <td height='20' class='isi_laporan'>";
				$content .= fnSpasi($row->level_spasi);
				$content .= $row->nama;
				$content .= "</td>";
				if ($row->kode_neraca!="OR")
				{
				$content .= "<td class='isi_laporan' align='right'>".number_format($row->n1,0,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format($row->n2,0,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format($row->n4,0,',','.')."</td>
			<td class='isi_laporan' align='center'>".number_format($persen1,2,',','.')."%</td>
			<td class='isi_laporan' align='center'>".number_format($persen2,2,',','.')."%</td>";
				}
				else
				{
				$content .= "<td class='isi_laporan' align='center'>".number_format($row->n1,2,',','.')."</td>
			<td class='isi_laporan' align='center'>".number_format($row->n2,2,',','.')."</td>
			<td class='isi_laporan' align='center'>".number_format($row->n4,2,',','.')."</td>
			<td class='isi_laporan' align='center'>".number_format($persen1,2,',','.')."%</td>
			<td class='isi_laporan' align='center'>".number_format($persen2,2,',','.')."%</td>";
				}
				if ($bentuk=="Detail" && $row->tipe=="Posting")
				{
					$kode_neraca=$row->kode_neraca;
					$kode_fs=$row->kode_fs;
					$kode_lokasi=$row->kode_lokasi;
					$sql1="	select a.kode_akun,c.nama,
								case c.jenis when  'Pendapatan' then -n1 else n1 end as n1,
								case c.jenis when  'Pendapatan' then -n2 else n2 end as n2,
								case c.jenis when  'Pendapatan' then -n3 else n3 end as n3,
								case c.jenis when  'Pendapatan' then -n4 else n4 end as n4,
								case c.jenis when  'Pendapatan' then -n5 else n5 end as n5
							from exs_glma_gar_pp a
							inner join relakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
							inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi
							where b.kode_fs='$kode_fs' and a.kode_lokasi='$kode_lokasi' and b.kode_neraca='$kode_neraca' and a.periode='$periode' and a.kode_pp='$row2->kode_pp'
							order by a.kode_akun ";
					
					$rs1 = $dbLib->execute($sql1);
					
					while ($row1 = $rs1->FetchNextObject($toupper=false))
					{	
						$persen1=0;$persen2=0;$persen3=0;
						if ($row1->n1!=0)
						{
							$persen1=($row1->n4/$row1->n1)*100;
						}
						if ($row1->n2!=0)
						{
							$persen2=($row1->n4/$row1->n2)*100;
						}
						if ($row1->n5!=0)
						{
							$persen3=($row1->n4-$row1->n5)/$row1->n5*100;
						}
						$nama=$row1->kode_akun." - ".$row1->nama;
						$content .= "<tr>
						<td height='20' class='detail_laporan'>".$AddOnLib->spasi($nama,$row->level_spasi+1)."</td>
						<td class='detail_laporan' align='right'>".number_format($row1->n1,0,",",".")."</td>
						<td class='detail_laporan' align='right'>".number_format($row1->n2,0,",",".")."</td>
						<td class='detail_laporan' align='right'>".number_format($row1->n4,0,",",".")."</td>
						<td class='detail_laporan' align='center'>".number_format($persen1,2,',','.')."%</td>
						<td class='detail_laporan' align='center'>".number_format($persen2,2,',','.')."%</td>
					  </tr>";
					}
				}
				$i=$i+1;
			}
			
			$content .= "</table></div><br>";
		}
		return $content;
	}
	
}
?>
