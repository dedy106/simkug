<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_gar_rptAggRealTwYks extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$sql = "select count(a.kode_akun) as jum 
				from glma_drk_tmp a 
				inner join pp d on a.kode_pp=d.kode_pp and a.kode_lokasi=d.kode_lokasi
				where a.nik_user='$nik_user' ".$this->filter;
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
		$sql = "select a.*,substring(a.periode,1,4) as tahun 
				from glma_drk_tmp a
				inner join pp d on a.kode_pp=d.kode_pp and a.kode_lokasi=d.kode_lokasi
				where a.nik_user='$nik_user' ".$this->filter." order by a.kode_akun";
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
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
		$n1=0;$n2=0;$n3=0;$sisa=0;$n4=0;$n5=0;$n6=0;$n7=0;$n8=0;
		$sisa=0;
		$sisatw1=0;$sisatw2=0;$sisatw3=0;$sisatw4=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$n1=$n1+$row->n1;
			$n2=$n2+$row->n2;
			$n3=$n3+$row->n3;
			$n4=$n4+$row->n4;
			$n5=$n5+$row->n5;
			$n6=$n6+$row->n6;
			$n7=$n7+$row->n7;
			$n8=$n8+$row->n8;
			
			echo "<tr>
    <td width='25' class='header_laporan'><div align='center'>$i</div></td>
    <td width='70' height='20' class='isi_laporan'>$row->kode_akun</td>
<td width='200' height='20' class='isi_laporan'>$row->nama_akun</td>
    <td width='70' class='isi_laporan'>$row->kode_pp</td>
<td width='100' height='20' class='isi_laporan'>$row->nama_pp</td>
    <td width='50' class='isi_laporan'>$row->kode_drk</td>
<td width='200' height='20' class='isi_laporan'>$row->nama_drk</td>
   <td class='isi_laporan' align='right'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenGar('$row->kode_akun','$row->kode_lokasi','$row->tahun','$row->kode_pp','$row->kode_drk','tw1');\">".number_format($row->n1,0,',','.')."</a>";
			echo " </td>
    <td class='isi_laporan'><div align='right'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKartu('$row->kode_akun','$row->kode_lokasi','$row->tahun','$row->kode_pp','$row->kode_drk','tw1');\">".number_format($row->n5,0,',','.')."</a>";
			echo " </div></td>
    <td class='isi_laporan'><div align='right'>".number_format($row->n1-$row->n5,0,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenGar('$row->kode_akun','$row->kode_lokasi','$row->tahun','$row->kode_pp','$row->kode_drk','tw2');\">".number_format($row->n2,0,',','.')."</a>";
			echo "</div></td>
    <td class='isi_laporan'><div align='right'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKartu('$row->kode_akun','$row->kode_lokasi','$row->tahun','$row->kode_pp','$row->kode_drk','tw2');\">".number_format($row->n6,0,',','.')."</a>";
			echo "</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($row->n2-$row->n6,0,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenGar('$row->kode_akun','$row->kode_lokasi','$row->tahun','$row->kode_pp','$row->kode_drk','tw3');\">".number_format($row->n3,0,',','.')."</a>";
			echo "</div></td>
    <td class='isi_laporan'><div align='right'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKartu('$row->kode_akun','$row->kode_lokasi','$row->tahun','$row->kode_pp','$row->kode_drk','tw3');\">".number_format($row->n7,0,',','.')."</a>";
			echo "</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($row->n3-$row->n7,0,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenGar('$row->kode_akun','$row->kode_lokasi','$row->tahun','$row->kode_pp','$row->kode_drk','tw4');\">".number_format($row->n4,0,',','.')."</a>";
			echo "</div></td>
    <td class='isi_laporan'><div align='right'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKartu('$row->kode_akun','$row->kode_lokasi','$row->tahun','$row->kode_pp','$row->kode_drk','tw4');\">".number_format($row->n8,0,',','.')."</a>";
			echo "</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($row->n4-$row->n8,0,',','.')."</div></td>
  </tr>";
			
			$i=$i+1;
		}
		
		echo "<tr>
    <td height='20' colspan='7' class='isi_laporan'><div align='right'>Total&nbsp;</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($n1,0,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($n5,0,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($n1-$n5,0,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($n2,0,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($n6,0,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($n2-$n6,0,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($n3,0,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($n7,0,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($n3-$n7,0,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($n4,0,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($n8,0,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($n4-$n8,0,',','.')."</div></td>
  </tr>
</table> </div>";
		
		return "";
	}
	
	
}

