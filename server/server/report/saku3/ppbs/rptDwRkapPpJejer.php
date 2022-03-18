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

class server_report_saku3_ppbs_rptDwRkapPpJejer extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		
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
		$tahun=$tmp[1];
		$kode_fs=$tmp[2];
		$bentuk=$tmp[3];
		$jenis=$tmp[4];
		$nama_file="ppbs_".$tahun.".xls";
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		
		$AddOnLib=new server_util_AddOnLib();	
		
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
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("LAPORAN ANGGARAN LABARUGI JEJER ",$this->lokasi,"Tahun $tahun ");
		echo "<table  border='1' cellspacing='0' cellpadding='0' class='kotak' width='1500'>
  <tr bgcolor='#CCCCCC'>
    <td align='center' width='300' class='header_laporan'>Deskripsi</td>";
		$sql="select kode_pp,nama from agg_pp where kode_lokasi='$kode_lokasi' and tahun='$tahun' order by kode_pp";
		
		$rs = $dbLib->execute($sql);
		$tmp_sql="";$jum=0;$tmp_sql2="";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$fak[$jum]=$row->kode_pp;
			$pdpt[$jum]="n13".strtolower($row->kode_pp);
			$jum=$jum+1;
			
			$tmp_sql.="sum(case when kode_pp='$row->kode_pp' then (case when jenis_akun='Pendapatan' then -n13 else n13 end) else 0 end) as 'n13$row->kode_pp',";
			$tmp_sql2.="sum(case when d.kode_pp='$row->kode_pp' then (case when c.jenis='Pendapatan' then -n13 else n13 end) else 0 end) as 'n13$row->kode_pp',";

    echo "<td  align='center' class='header_laporan'>$row->kode_pp - $row->nama</td>";
			
		}
		echo "<td align='center' class='header_laporan'>Total";
		$pdpt[$jum]="n13t";
		
		$tmp_sql.="sum(case when jenis_akun='Pendapatan' then -n13 else n13 end) as 'n13t',";
		$tmp_sql2.="sum(case when c.jenis='Pendapatan' then -n13 else n13 end) as 'n13t',";
				
  echo "</tr>";
		$tmp_sql=substr($tmp_sql,0,strlen($tmp_sql)-1);
		$sql="select kode_neraca,nama ,level_spasi,tipe
from neraca 
where kode_lokasi='$kode_lokasi' and kode_fs='$kode_fs' and modul='L'
order by rowindex";
		$rs = $dbLib->execute($sql);
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<tr><td class='isi_laporan'>";
			echo fnSpasi($row->level_spasi);
			echo $row->nama;
			echo "</td>";
			$sql="select kode_neraca,$tmp_sql
from agg_neraca_pp
where kode_lokasi='$kode_lokasi' and kode_fs='$kode_fs' and kode_neraca='$row->kode_neraca' and tahun='$tahun'
group by kode_neraca";
			
			$rs1 = $dbLib->execute($sql);
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				for ($k =0 ; $k < $jum+1; $k++) 
				{
					$tmp="\$row1->$pdpt[$k]";
					eval("\$str = \"$tmp\";");
					if ($row->tipe!="Header" && $row->nama!="." && $row->nama!="")
					{
						echo "<td class='isi_laporan' align='right'>";
						if (substr($pdpt[$k],0,2)=="n13")
						{
							echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenGarSd('$kode_lokasi','$periode','$row->kode_neraca','".$fak[$k]."');\">".number_format($str,0,',','.')."</a>";
						}
						else
						{
							echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$kode_lokasi','$periode','$row->kode_neraca','".$fak[$k]."');\">".number_format($str,0,',','.')."</a>";
						}
						echo "</td>";
					}
					else
					{
						echo "<td class='isi_laporan' >&nbsp;</td>";
					}
				}
			
				echo "</tr>";
				if ($bentuk=="Detail" && $row->tipe=="Posting")
				{
					$kode_neraca=$row->kode_neraca;
					
					$sql1="	select a.kode_akun,c.nama,$tmp_sql2
								from exs_glma_pp a
								inner join relakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
								inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi
								inner join agg_pp d on a.kode_pp=d.kode_pp and a.kode_lokasi=d.kode_lokasi and d.tahun='$tahun'
								where b.kode_fs='$kode_fs' and a.kode_lokasi='$kode_lokasi' and b.kode_neraca='$kode_neraca' and a.tahun='$tahun'  and nik_user='$nik_user'
								group by a.kode_akun,c.nama
								order by a.kode_akun ";
					
					$rs3 = $dbLib->execute($sql1);
					while ($row3 = $rs3->FetchNextObject($toupper=false))
					{
						echo "<tr>
							<td height='20' class='detail_laporan'>$row3->kode_akun - $row3->nama</td>";
						for ($k =0 ; $k < $jum+1; $k++) 
						{
							$tmp="\$row3->$pdpt[$k]";
							eval("\$str = \"$tmp\";");
							echo "<td class='isi_laporan' align='right'>".number_format($str,0,',','.')."</td>";
							
						}
						echo " </tr>";
					}
				}
			}
		}
		
		echo "</table> </div>";
		return "";
		
	}
	
	
}
?>
