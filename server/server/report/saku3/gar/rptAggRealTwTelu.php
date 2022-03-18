<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_gar_rptAggRealTwTelu extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$sql = "select 1";
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);		
		}
		error_log($sql."/".$totPage."-".$count."-".$this->rows);
		
		return $totPage;
	}
	function getHtml()
	{
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$tahun=$tmp[1];
		$jenis_file=$tmp[2];
		$kode_lokasi=$tmp[3];
		$jenis=$tmp[4];
		$nama_file="komparasi_tw_".$tahun.".xls";
		
		if ($jenis=='Investasi')
		{
			$jenis='Neraca';
		}

		if ($kode_lokasi == "11"){
				$filterakun= "  and a.kode_akun not in ('5213116xx') ";
		}else{
				$filterakun= "";
		}
		//$sql="exec sp_agg_real_tw '$kode_lokasi','$jenis','$tahun','$nik_user'";
		//$rs = $dbLib->execute($sql);	
		
		$sql = "select a.kode_lokasi,a.kode_akun,a.kode_pp,a.kode_drk,a.nama_akun,a.nama_pp,a.nama_drk,a.periode,substring(a.periode,1,4) as tahun,
					a.n1+a.n2+a.n3 as ntw1,a.n4+a.n5+a.n6 as ntw2,a.n7+a.n8+a.n9 as ntw3,a.n10+a.n11+a.n12 as ntw4,
					a.n13+a.n14+a.n15 as rtw1,a.n16+a.n17+a.n18 as rtw2,a.n19+a.n20+a.n21 as rtw3,a.n22+a.n23+a.n24 as rtw4
				from exs_glma_drk a
				inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.jenis='$jenis'
				".$this->filter." $filterakun order by a.kode_akun";

				// echo $sql;
		
		if ($jenis_file=="Excell")
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
		$rs = $dbLib->execute($sql);
		
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		
		$i = $start+1;
		if ($i<0) {$i=1;}
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("laporan realisasi komparasi anggaran",$this->lokasi,$AddOnLib->ubah_periode($periode));
		echo "<table width='1600' border='1' cellpadding='0' cellspacing='0' bordercolor='#111111' class='kotak'>
<tr>
    <td rowspan='2' bgcolor='#CCCCCC' class='header_laporan'><div align='center'>No</div></td>
    <td rowspan='2' bgcolor='#CCCCCC' class='header_laporan'><div align='center'>Kode Akun</div></td>
<td rowspan='2' bgcolor='#CCCCCC' class='header_laporan'><div align='center'>Nama Akun</div></td>
    <td rowspan='2' bgcolor='#CCCCCC' class='header_laporan'><div align='center'>Kode PP </div></td>
<td rowspan='2' bgcolor='#CCCCCC' class='header_laporan'><div align='center'>Nama PP</div></td>
    <td rowspan='2' bgcolor='#CCCCCC' class='header_laporan'><div align='center'>Kode DRK</div></td>
<td rowspan='2' bgcolor='#CCCCCC' class='header_laporan'><div align='center'>Nama DRK</div></td>
    <td height='20' colspan='3' bgcolor='#CCCCCC' class='header_laporan'><div align='center'>Triwulan I </div></td>
    <td colspan='3' bgcolor='#CCCCCC' class='header_laporan'><div align='center'>Triwulan II </div></td>
    <td colspan='3' bgcolor='#CCCCCC' class='header_laporan'><div align='center'>Triwulan III </div></td>
    <td colspan='3' bgcolor='#CCCCCC' class='header_laporan'><div align='center'>Triwulan IV </div></td>
  </tr>
  <tr>
    <td width='80' height='20' bgcolor='#CCCCCC' class='header_laporan'><div align='center'>Anggaran</div></td>
    <td width='80' bgcolor='#CCCCCC' class='header_laporan'><div align='center'>Realisasi</div></td>
    <td width='80' bgcolor='#CCCCCC' class='header_laporan'><div align='center'>Sisa</div></td>
    <td width='80' bgcolor='#CCCCCC' class='header_laporan'><div align='center'>Anggaran</div></td>
    <td width='80' bgcolor='#CCCCCC' class='header_laporan'><div align='center'>Realisasi</div></td>
    <td width='80' bgcolor='#CCCCCC' class='header_laporan'><div align='center'>Sisa</div></td>
    <td width='80' bgcolor='#CCCCCC' class='header_laporan'><div align='center'>Anggaran</div></td>
    <td width='80' bgcolor='#CCCCCC' class='header_laporan'><div align='center'>Realisasi</div></td>
    <td width='80' bgcolor='#CCCCCC' class='header_laporan'><div align='center'>Sisa</div></td>
    <td width='80' bgcolor='#CCCCCC' class='header_laporan'><div align='center'>Anggaran</div></td>
    <td width='80' bgcolor='#CCCCCC' class='header_laporan'><div align='center'>Realisasi</div></td>
    <td width='80' bgcolor='#CCCCCC' class='header_laporan'><div align='center'>Sisa</div></td>
  </tr>";
		$i=$start+1;
		$ntw1=0;$ntw2=0;$ntw3=0;$ntw4=0;
		$rtw1=0;$rtw2=0;$rtw3=0;$rtw4=0;
		$sisa=0;
		$stw1=0;$stw2=0;$stw3=0;$stw4=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$ntw1+=$row->ntw1;
			$ntw2+=$row->ntw2;
			$ntw3+=$row->ntw3;
			$ntw4+=$row->ntw4;
			
			$rtw1+=$row->rtw1;
			$rtw2+=$row->rtw2;
			$rtw3+=$row->rtw3;
			$rtw4+=$row->rtw4;
			
			
			$stw1+=$row->ntw1-$row->rtw1;
			$stw2+=$row->ntw2-$row->rtw2;
			$stw3+=$row->ntw3-$row->rtw3;
			$stw4+=$row->ntw4-$row->rtw4;
			
			echo "<tr>
    <td width='25' ><div align='center'>$i</div></td>
    <td width='70' height='20' class='isi_laporan'>$row->kode_akun</td>
<td width='200' height='20' class='isi_laporan'>$row->nama_akun</td>
    <td width='70' class='isi_laporan'>$row->kode_pp</td>
<td width='100' height='20' class='isi_laporan'>$row->nama_pp</td>
    <td width='50' class='isi_laporan'>$row->kode_drk</td>
<td width='200' height='20' class='isi_laporan'>$row->nama_drk</td>
   <td class='isi_laporan' align='right'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenGar('$row->kode_akun','$row->kode_lokasi','$row->tahun','$row->kode_pp','$row->kode_drk','tw1');\">".number_format($row->ntw1,0,',','.')."</a>";
			echo " </td>
    <td class='isi_laporan'><div align='right'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKartu('$row->kode_akun','$row->kode_lokasi','$row->tahun','$row->kode_pp','$row->kode_drk','tw1');\">".number_format($row->rtw1,0,',','.')."</a>";
			echo " </div></td>
    <td class='isi_laporan'><div align='right'>".number_format($row->ntw1-$row->rtw1,0,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenGar('$row->kode_akun','$row->kode_lokasi','$row->tahun','$row->kode_pp','$row->kode_drk','tw2');\">".number_format($row->ntw2,0,',','.')."</a>";
			echo "</div></td>
    <td class='isi_laporan'><div align='right'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKartu('$row->kode_akun','$row->kode_lokasi','$row->tahun','$row->kode_pp','$row->kode_drk','tw2');\">".number_format($row->rtw2,0,',','.')."</a>";
			echo "</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($row->ntw2-$row->rtw2,0,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenGar('$row->kode_akun','$row->kode_lokasi','$row->tahun','$row->kode_pp','$row->kode_drk','tw3');\">".number_format($row->ntw3,0,',','.')."</a>";
			echo "</div></td>
    <td class='isi_laporan'><div align='right'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKartu('$row->kode_akun','$row->kode_lokasi','$row->tahun','$row->kode_pp','$row->kode_drk','tw3');\">".number_format($row->rtw3,0,',','.')."</a>";
			echo "</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($row->ntw3-$row->rtw3,0,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenGar('$row->kode_akun','$row->kode_lokasi','$row->tahun','$row->kode_pp','$row->kode_drk','tw4');\">".number_format($row->ntw4,0,',','.')."</a>";
			echo "</div></td>
    <td class='isi_laporan'><div align='right'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKartu('$row->kode_akun','$row->kode_lokasi','$row->tahun','$row->kode_pp','$row->kode_drk','tw4');\">".number_format($row->rtw4,0,',','.')."</a>";
			echo "</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($row->ntw4-$row->rtw4,0,',','.')."</div></td>
  </tr>";
			
			$i=$i+1;
		}
		
		echo "<tr>
    <td height='20' colspan='7' class='isi_laporan'><div align='right'>Total&nbsp;</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($ntw1,0,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($rtw1,0,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($stw1,0,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($ntw2,0,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($rtw2,0,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($stw2,0,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($ntw3,0,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($rtw3,0,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($stw3,0,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($ntw4,0,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($rtw4,0,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($stw4,0,',','.')."</div></td>
  </tr>
</table> </div>";
		
		return "";
	}
	
	
}

