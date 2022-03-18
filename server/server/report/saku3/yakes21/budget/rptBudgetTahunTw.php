<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_yakes21_budget_rptBudgetTahunTw extends server_report_basic
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
		$kode_lokasi=$tmp[0];
		$tahun=$tmp[1];
		$nik_user=$tmp[2];
		$jenis_akun=$tmp[3];
		$jenis=$tmp[4];
		$nama_file="komparasi_bulan_".$tahun.".xls";
		
		$sql="exec sp_akundrk '$kode_lokasi','$tahun','$nik_user'";
		$rs = $dbLib->execute($sql);
		//echo $sql;
		
		if ($jenis_akun=="Investasi") {
			$jenis_akun="Neraca"; 
		}
		$sql = "select  a.kode_lokasi,a.kode_akun,a.kode_pp,a.kode_drk,
	   b.nama as nama_akun,c.nama as nama_pp,d.nama as nama_drk,a.tahun,
	   isnull(e.agg_01,0) as ntw1,isnull(e.agg_02,0) as ntw2,isnull(e.agg_03,0) as ntw3,isnull(e.agg_04,0) as ntw4
         ,isnull(f.real_01,0) as rtw1,isnull(f.real_02,0) as rtw2,isnull(f.real_03,0) as rtw3,isnull(f.real_04,0) as rtw4
from akundrk a
inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
inner join drk d on a.kode_drk=d.kode_drk and a.tahun=d.tahun and a.kode_lokasi=d.kode_lokasi
left join (select x.kode_lokasi,x.kode_akun,x.kode_pp,x.kode_drk
	  , sum(case when substring(x.periode,5,2) between '01' and '03' then case when dc='D' then nilai else -nilai end else 0 end ) as agg_01
      , sum(case when substring(x.periode,5,2) between '04' and '06' then case when dc='D' then nilai else -nilai end else 0 end ) as agg_02
	  , sum(case when substring(x.periode,5,2) between '07' and '09' then case when dc='D' then nilai else -nilai end else 0 end ) as agg_03
	  , sum(case when substring(x.periode,5,2) between '10' and '12' then case when dc='D' then nilai else -nilai end else 0 end ) as agg_04
	from anggaran_d x
	where x.kode_lokasi='$kode_lokasi'  and substring(x.periode,1,4)='$tahun'
	group by x.kode_lokasi,x.kode_akun,x.kode_pp,x.kode_drk
	)e on a.kode_akun=e.kode_akun and a.kode_pp=e.kode_pp and a.kode_drk=e.kode_drk and a.kode_lokasi=e.kode_lokasi
left join (select x.kode_lokasi,x.kode_akun,x.kode_pp,x.kode_drk
       , sum(case when substring(x.periode1,5,2) between '01' and '03' then case when x.dc='D' then x.nilai else -x.nilai end else 0 end ) as real_01
       , sum(case when substring(x.periode1,5,2) between '04' and '06' then case when x.dc='D' then x.nilai else -x.nilai end else 0 end ) as real_02
	   , sum(case when substring(x.periode1,5,2) between '07' and '09' then case when x.dc='D' then x.nilai else -x.nilai end else 0 end ) as real_03
	   , sum(case when substring(x.periode1,5,2) between '10' and '12' then case when x.dc='D' then x.nilai else -x.nilai end else 0 end ) as real_04
	from angg_r x
	where x.kode_lokasi='$kode_lokasi' and substring(x.periode1,1,4)='$tahun'
	group by x.kode_lokasi,x.kode_akun,x.kode_pp,x.kode_drk
	)f on a.kode_akun=f.kode_akun and a.kode_pp=f.kode_pp and a.kode_drk=f.kode_drk and a.kode_lokasi=f.kode_lokasi
$this->filter and a.nik_user='$nik_user' and b.jenis='$jenis_akun'
order by a.kode_akun";
		//echo $sql;
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
		
		$rs = $dbLib->execute($sql);
		
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		
		$i = 1;
		
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("laporan realisasi komparasi anggaran",$this->lokasi,$AddOnLib->ubah_periode($periode));
		echo "<table width='2000' border='1' cellpadding='0' cellspacing='0' bordercolor='#111111' class='kotak'>
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

