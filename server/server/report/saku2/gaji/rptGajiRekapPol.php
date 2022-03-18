<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_gaji_rptGajiRekapPol extends server_report_basic
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
		$periode=$tmp[1];
		$kode_lokasi=$tmp[0];
		$no_gaji=$tmp[2];
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		
		$AddOnLib=new server_util_AddOnLib();	
		
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("rekap gaji",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table  border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td align='center'><table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
		<td width='30'  align='center' class='header_laporan'>No</td>
		<td width='50'  align='center' class='header_laporan'>NIK</td>
		<td width='200'  align='center' class='header_laporan'>Nama</td>";
		$sql="select a.kode_param,a.nama 
from hr_gaji_param a
inner join (select distinct a.kode_param 
			from hr_gaji_d a
			inner join hr_karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi
			where a.no_gaji='$no_gaji' and a.kode_lokasi='$kode_lokasi'
			)b on a.kode_param=b.kode_param
where  a.dc='D' and a.kode_lokasi='$kode_lokasi'
order by a.no_urut ";
	
		$rs = $dbLib->execute($sql);
		$pdpt1="";$pdpt2="";$jum_pdpt=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$pdpt[$jum_pdpt]=strtolower($row->kode_param);
			echo "<td width='90'  align='center' class='header_laporan'>$row->nama</td>";
			$pdpt2.="sum(case a.kode_param when '$row->kode_param' then a.nilai else 0 end) as ".strtolower($row->kode_param).",";
			$pdpt1.="isnull(b.".strtolower($row->kode_param).",0) as ".strtolower($row->kode_param).",";
			$jum_pdpt=$jum_pdpt+1;
			
		}
		$pdpt1=substr($pdpt1,0,strlen($pdpt1)-1);
		$pdpt2=substr($pdpt2,0,strlen($pdpt2)-1);
		echo "<td width='90'  align='center' class='header_laporan'>Total Pendapatan</td>";
		$sql="select a.kode_param,a.nama 
from hr_gaji_param a
inner join (select distinct a.kode_param 
			from hr_gaji_d a
			inner join hr_karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi
			where a.no_gaji='$no_gaji' and a.kode_lokasi='$kode_lokasi'
			)b on a.kode_param=b.kode_param
where  a.dc='C' and a.kode_lokasi='$kode_lokasi'
order by a.no_urut ";
		
		$rs = $dbLib->execute($sql);
		$beban1="";$beban2="";$jum_beban=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$beban[$jum_beban]=strtolower($row->kode_param);
			echo "<td width='90'  align='center' class='header_laporan'>$row->nama</td>";
			$beban2.="sum(case a.kode_param when '$row->kode_param' then a.nilai else 0 end) as ".strtolower($row->kode_param).",";
			$beban1.="isnull(b.".strtolower($row->kode_param).",0) as ".strtolower($row->kode_param).",";
			$jum_beban=$jum_beban+1;
		}
		$beban1=substr($beban1,0,strlen($beban1)-1);
		$beban2=substr($beban2,0,strlen($beban2)-1);
		echo "<td width='90'  align='center' class='header_laporan'>Total Potongan</td>";
		echo "<td width='90'  align='center' class='header_laporan'>Total Ditransfer</td>";
		echo "</tr>";
		//data gaji
		$sql="select a.nik,a.nama,a.kode_lokasi,$pdpt1,$beban1
from hr_karyawan a
inner join (select a.nik,a.kode_lokasi,$pdpt2,$beban2 
			from hr_gaji_d a
			inner join hr_karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi
			where a.no_gaji='$no_gaji' and a.kode_lokasi='$kode_lokasi'
			group by a.nik,a.kode_lokasi
			)b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi
order by a.nama			";
		
		$rs = $dbLib->execute($sql);
		$i=1;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<tr><td align='center' class='isi_laporan'>$i</td>";
			echo "<td class='isi_laporan'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenSlip('$no_gaji','$row->nik','$row->kode_lokasi');\">$row->nik</a>";
			echo "</td>";
			echo "<td class='isi_laporan'>$row->nama</td>";
			$tot_pdpt=0;
			for ($k =0 ; $k < $jum_pdpt; $k++) 
			{
				$tmp="\$row->$pdpt[$k]";
				eval("\$str = \"$tmp\";");
				echo "<td class='isi_laporan' align='right'>".number_format($str,0,',','.')."</td>";
				$tot_pdpt=$tot_pdpt+$str;
			}
			echo "<td class='isi_laporan' align='right'>".number_format($tot_pdpt,0,',','.')."</td>";
			$tot_beban=0;
			for ($k =0 ; $k < $jum_beban; $k++) 
			{
				$tmp="\$row->$beban[$k]";
				
				eval("\$str = \"$tmp\";");
				echo "<td class='isi_laporan' align='right'>".number_format($str,0,',','.')."</td>";
				$tot_beban=$tot_beban+$str;
			}
			echo "<td class='isi_laporan' align='right'>".number_format($tot_beban,0,',','.')."</td>";
			echo "<td class='isi_laporan' align='right'>".number_format($tot_pdpt-$tot_beban,0,',','.')."</td>";
			echo "</tr>";
			$i=$i+1;
		}
		echo "</table> </div>";
		return "";
		
	}
	
}
?>
