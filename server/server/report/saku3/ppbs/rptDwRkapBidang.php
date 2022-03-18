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
class server_report_saku3_ppbs_rptDwRkapBidang extends server_report_basic
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
		
		$sql="select a.kode_bidang,a.nama,a.kode_lokasi,a.tahun  
			  from agg_bidang a 
			  $this->filter
			  order by a.kode_bidang ";
		 
		$rs2 = $dbLib->execute($sql);
		while ($row2 = $rs2->FetchNextObject($toupper=false))
		{
			
			$sql = "select c.kode_neraca,c.kode_fs,c.kode_lokasi,c.nama,c.tipe,c.level_spasi,
			case c.jenis_akun when  'Pendapatan' then -c.n13 else c.n13 end as n13,
			case c.jenis_akun when  'Pendapatan' then -c.n1 else c.n1 end as n1,
			case c.jenis_akun when  'Pendapatan' then -c.n2 else c.n2 end as n2,
			case c.jenis_akun when  'Pendapatan' then -c.n3 else c.n3 end as n3,
			case c.jenis_akun when  'Pendapatan' then -c.n4 else c.n4 end as n4,
			case c.jenis_akun when  'Pendapatan' then -c.n5 else c.n5 end as n5,
			case c.jenis_akun when  'Pendapatan' then -c.n6 else c.n6 end as n6,
			case c.jenis_akun when  'Pendapatan' then -c.n7 else c.n7 end as n7,
			case c.jenis_akun when  'Pendapatan' then -c.n8 else c.n8 end as n8,
			case c.jenis_akun when  'Pendapatan' then -c.n9 else c.n9 end as n9,
			case c.jenis_akun when  'Pendapatan' then -c.n10 else c.n10 end as n10,
			case c.jenis_akun when  'Pendapatan' then -c.n11 else c.n11 end as n11,
			case c.jenis_akun when  'Pendapatan' then -c.n12 else c.n12 end as n12
				from agg_neraca_bidang c
				inner join agg_bidang a on c.kode_bidang=a.kode_bidang and a.kode_lokasi=c.kode_lokasi and a.tahun=c.tahun 
				where c.kode_lokasi='$row2->kode_lokasi' and c.kode_bidang='$row2->kode_bidang' and c.tahun='$row2->tahun' and c.kode_fs='$kode_fs'
				order by c.rowindex ";
			$rs = $dbLib->execute($sql);
			$i = 1;
			
			$AddOnLib=new server_util_AddOnLib();
			
			//echo $AddOnLib->judul_laporan($nama_form,$this->lokasi,$AddOnLib->ubah_periode($periode));
			
			$resource = $_GET["resource"];
			$fullId = $_GET["fullId"];
			echo "<div align='center'>";
			echo $AddOnLib->judul_laporan("LAPORAN REKAP ANGGARAN LABARUGI",$this->lokasi."<br>".$row2->nama,"TAHUN $tahun");
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
				if ($row->tipe=="Posting" && $row->n13 <> 0)
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
	  <td class='isi_laporan' align='right'>".number_format($row->n13,0,',','.')."</td>
				  </tr>";
				if ($bentuk=="Detail" && $row->tipe=="Posting")
				{
					$kode_neraca=$row->kode_neraca;
					$kode_fs=$row->kode_fs;
					$kode_lokasi=$row->kode_lokasi;
					$sql1="select a.kode_akun,c.nama,
					   sum(case when substring(a.periode,5,2) between '01' and '12' then a.total else 0 end) as total, 	
					   sum(case when substring(a.periode,5,2)='01' then a.total else 0 end) as n1,
					   sum(case when substring(a.periode,5,2)='02' then a.total else 0 end) as n2, 
					   sum(case when substring(a.periode,5,2)='03' then a.total else 0 end) as n3, 
					   sum(case when substring(a.periode,5,2)='04' then a.total else 0 end) as n4, 
					   sum(case when substring(a.periode,5,2)='05' then a.total else 0 end) as n5, 
					   sum(case when substring(a.periode,5,2)='06' then a.total else 0 end) as n6, 
					   sum(case when substring(a.periode,5,2)='07' then a.total else 0 end) as n7, 
					   sum(case when substring(a.periode,5,2)='08' then a.total else 0 end) as n8, 
					   sum(case when substring(a.periode,5,2)='09' then a.total else 0 end) as n9, 
					   sum(case when substring(a.periode,5,2)='10' then a.total else 0 end) as n10, 
					   sum(case when substring(a.periode,5,2)='11' then a.total else 0 end) as n11, 
					   sum(case when substring(a.periode,5,2)='12' then a.total else 0 end) as n12 
				from dw_glma_pp a
				inner join relakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
				inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi
				inner join agg_pp d on a.kode_pp=d.kode_pp and a.kode_lokasi=d.kode_lokasi
				where b.kode_fs='$kode_fs' and b.kode_lokasi='$kode_lokasi' and b.kode_neraca='$kode_neraca' and a.nik_user='$nik_user' and d.kode_bidang='$row2->kode_bidang'
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
			
			echo "</div><br>
			<DIV style='page-break-after:always'></DIV>";
		}
		return "";
	}
	
}
?>
