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

class server_report_saku3_sju16_rptGlTbJejerPp extends server_report_basic
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
		$periode=$tmp[1];
		$nik_user=$tmp[2];
		$jenis=$tmp[3];
		$nama_file="tb_jejer.xls";
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		//echo $bentuk;
		
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
		
		$AddOnLib=new server_util_AddOnLib();	
		
		$sql="exec sp_glma_pp_dw_tmp '$kode_lokasi','$periode','$nik_user';";
		$rs = $dbLib->execute($sql);
		
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("trial balance JEJER",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table  border='1' cellspacing='0' cellpadding='0' class='kotak' width='1500'>
  <tr bgcolor='#CCCCCC'>
     <td  align='center' width='80' class='header_laporan'>Kode Akun</td>
	<td  align='center' width='250' class='header_laporan'>Nama Akun</td>";
		$sql="select kode_pp,nama from pp where kode_lokasi='$kode_lokasi'  order by kode_pp";
		//echo $sql;
		$rs = $dbLib->execute($sql);
		$tmp_sql="";$jum=0;$tmp_sql2="";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$fak[$jum]=$row->kode_pp;
			$pdpt[$jum]="n4".strtolower($row->kode_pp);
			$jum=$jum+1;
			$tmp_sql.="sum(case when a.kode_pp='$row->kode_pp' then a.so_akhir else 0 end) as 'n4$row->kode_pp',";

    echo "<td align='center' class='header_laporan'>$row->kode_pp - $row->nama</td>";
			
		}
		echo "<td  align='center' class='header_laporan'>Total</td>";
		$pdpt[$jum]="n4t";
		//$jum=$jum+1;
		$tmp_sql.="sum(a.so_akhir)  as 'n4t',";
				
  echo "</tr>";
		
		$tmp_sql=substr($tmp_sql,0,strlen($tmp_sql)-1);
		$tmp_sql2=substr($tmp_sql2,0,strlen($tmp_sql2)-1);
		$sql="select a.kode_akun,a.nama
from masakun a
inner join (select kode_akun,kode_lokasi,periode
			from glma_pp_tmp
			where nik_user='$nik_user'
			group by kode_akun,kode_lokasi,periode
			) b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
$this->filter and a.kode_lokasi='$kode_lokasi' 
order by a.kode_akun";
		$rs = $dbLib->execute($sql);
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<tr><td class='isi_laporan'>".$AddOnLib->fnAkun($row->kode_akun)."</td>
				<td class='isi_laporan'>$row->nama</td>";
			$sql="select a.kode_akun,$tmp_sql
from glma_pp_tmp a
where a.kode_lokasi='$kode_lokasi' and a.periode='$periode' and a.kode_akun='$row->kode_akun' and a.nik_user='$nik_user'
group by a.kode_akun ";
			
			$rs1 = $dbLib->execute($sql);
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				for ($k =0 ; $k < $jum+1; $k++) 
				{
					$tmp="\$row1->$pdpt[$k]";
					eval("\$str = \"$tmp\";");
					
						echo "<td class='isi_laporan' align='right'>";
				
					echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBb('$row->kode_akun','$kode_lokasi','$periode','".$fak[$k]."');\">".number_format($str,2,',','.')."</a>";
					
					echo "</td>";
					
				}
			
				echo "</tr>";
				if ($bentuk=="Detail" && $row->tipe=="Posting")
				{
					$kode_neraca=$row->kode_neraca;
					
					$sql1="	select a.kode_akun,c.nama,$tmp_sql2
								from agg_glma_pp a
								inner join relakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
								inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi
								inner join agg_pp d on a.kode_pp=d.kode_pp and a.kode_lokasi=d.kode_lokasi and a.tahun=d.tahun
								where a.kode_lokasi='$kode_lokasi' and b.kode_fs='$kode_fs' and b.kode_neraca='$row->kode_neraca' and a.tahun='$tahun' 
								group by a.kode_akun,c.nama
								order by a.kode_akun ";
					//echo $sql1;
					$rs3 = $dbLib->execute($sql1);
					while ($row3 = $rs3->FetchNextObject($toupper=false))
					{
						echo "<tr>
							<td height='20' class='detail_laporan'>$row3->kode_akun - $row3->nama</td>";
						for ($k =0 ; $k < $jum+1; $k++) 
						{
							$tmp="\$row3->$pdpt[$k]";
							eval("\$str = \"$tmp\";");
							echo "<td class='isi_laporan' align='right'>".number_format($str,2,',','.')."</td>";
							
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
