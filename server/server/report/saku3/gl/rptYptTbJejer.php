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

class server_report_saku3_gl_rptYptTbJejer extends server_report_basic
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
		$trail=$tmp[4];
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$nama_file="neraca_lajur.xls";
		$AddOnLib=new server_util_AddOnLib();	
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
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("LAPORAN NERACA LAJUR",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table  border='1' cellspacing='0' cellpadding='0' class='kotak' width='1200'>
  <tr bgcolor='#CCCCCC'>
    <td  align='center' width='80' class='header_laporan'>Kode Akun</td>
	<td  align='center' width='250' class='header_laporan'>Nama Akun</td>";
		$sql="select kode_lokasi,nama from lokasi where kode_lokkonsol='$kode_lokasi' order by kode_lokasi";
		
		$rs = $dbLib->execute($sql);
		$tmp_sql="";$jum=0;$tmp_sql2="";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			
			$fak[$jum]=$row->kode_lokasi;
			$pdpt[$jum]="n4".strtolower($row->kode_lokasi);
			$jum=$jum+1;
			$tmp_sql.="sum(case when kode_lokasi='$row->kode_lokasi' then (so_akhir) else 0 end) as 'n4$row->kode_lokasi',";
			$tmp_sql2.="sum(case when d.kode_lokasi='$row->kode_lokasi' then (case when c.jenis='Pendapatan' then -a.so_akhir else a.so_akhir  end) else 0 end) as 'n4$row->kode_lokasi',";

    echo "<td  align='center' class='header_laporan'>$row->kode_lokasi - $row->nama</td>";
			
		}
		echo "<td colspan='2' align='center' class='header_laporan'>Total ".$this->lokasi."</td>";
		
		$pdpt[$jum]="n4t";
		$tmp_sql.="sum(so_akhir) as 'n4t',";
		$tmp_sql2.="sum(case when c.jenis='Pendapatan' then -a.so_akhir  else a.so_akhir  end) as 'n4t',";
				
  echo "</tr>";
		$tmp_sql=substr($tmp_sql,0,strlen($tmp_sql)-1);
		$tmp_sql2=substr($tmp_sql2,0,strlen($tmp_sql2)-1);
		$sql="select kode_akun,nama 
from masakun 
where kode_lokasi='$kode_lokasi'
order by kode_akun";
		
		$rs = $dbLib->execute($sql);
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<tr><td class='isi_laporan'>$row->kode_akun</td>
					<td class='isi_laporan'>$row->nama</td>";
			$sql="select kode_akun,$tmp_sql
from exs_glma
where  periode='$periode' and kode_akun='$row->kode_akun' and kode_lokasi<>'$kode_lokasi'
group by kode_akun";
			
			$rs1 = $dbLib->execute($sql);
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				for ($k =0 ; $k < $jum+1; $k++) 
				{
					$tmp="\$row1->$pdpt[$k]";
					eval("\$str = \"$tmp\";");
					echo "<td class='isi_laporan' align='right'>";
					if (substr($pdpt[$k],0,2)=="n2")
					{
						echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenGarSd('$kode_lokasi','$periode','$row->kode_neraca','".$fak[$k]."');\">".number_format($str,0,',','.')."</a>";
					}
					else
					{
						echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$kode_lokasi','$periode','$row->kode_akun','".$fak[$k]."');\">".number_format($str,0,',','.')."</a>";
					}
					echo "</td>";
					
				}
			
				echo "</tr>";
				if ($bentuk=="Detail" && $row->tipe=="Posting")
				{
					$kode_neraca=$row->kode_neraca;
					
					$sql1="	select a.kode_akun,c.nama,$tmp_sql2
								from exs_glma_pp a
								inner join relakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
								inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi
								inner join pp d on a.kode_lokasi=d.kode_lokasi and a.kode_lokasi=d.kode_lokasi
								where b.kode_fs='$kode_fs' and a.kode_lokasi='$kode_lokasi' and b.kode_neraca='$kode_neraca' and a.periode='$periode' 
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
