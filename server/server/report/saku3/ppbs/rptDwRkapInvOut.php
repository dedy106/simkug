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
class server_report_saku3_ppbs_rptDwRkapInvOut extends server_report_basic
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
		$lokasi=$tmp[0];
		$tahun=$tmp[1];
		$level_lap=$tmp[2];
		$bentuk=$tmp[3];
		$sql = "select kode_neraca,kode_fs,kode_lokasi,nama,tipe,level_spasi,
				n1,n2,n3,n4,n5,n6,n7,n8,n9,n10,n11,n12,n13
			from agg_neraca_out 
			$this->filter
			order by rowindex ";
		
		$rs = $dbLib->execute($sql);
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		
		//echo $AddOnLib->judul_laporan($nama_form,$this->lokasi,$AddOnLib->ubah_periode($periode));
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>";
		echo $AddOnLib->judul_laporan("LAPORAN REKAP OUTLOOK INVESTASI",$this->lokasi,"TAHUN $tahun");
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
			$koma=0;
			if ($row->kode_neraca=="48")
			{
				$koma=2;
			}
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
				 <td class='isi_laporan' align='right'>".number_format($row->n1,$koma,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n2,$koma,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n3,$koma,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n4,$koma,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n5,$koma,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n6,$koma,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n7,$koma,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n8,$koma,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n9,$koma,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n10,$koma,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n11,$koma,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n12,$koma,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n13,$koma,',','.')."</td>
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
			where b.kode_fs='$kode_fs' and b.kode_lokasi='$kode_lokasi' and b.kode_neraca='$kode_neraca' and a.nik_user='$nik_user'
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
