<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_gaji_rptGajiLoker extends server_report_basic
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
		$periode=$tmp[0];
		$kode_lokasi=$tmp[1];
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		
		$AddOnLib=new server_util_AddOnLib();	
		
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("rekap gaji per lokasi kerja",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table  border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td align='center'><table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
		<td width='30'  align='center' class='header_laporan'>No</td>
		<td width='50'  align='center' class='header_laporan'>Kode</td>
		<td width='200'  align='center' class='header_laporan'>Nama</td>";
		$sql="select a.kode_param,a.nama 
from hr_gaji_param a
inner join (select distinct b.kode_param 
			from hr_gaji_d b
			inner join hr_karyawan a on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi
			$this->filter
			)b on a.kode_param=b.kode_param
where  a.dc='D' and a.jenis='T' and a.kode_lokasi='$kode_lokasi'
order by a.no_urut ";
		
		$rs = $dbLib->execute($sql);
		$pdpt1="";$pdpt2="";$jum_pdpt=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$pdpt[$jum_pdpt]=strtolower($row->kode_param);
			echo "<td width='90'  align='center' class='header_laporan'>$row->nama</td>";
			$pdpt2.="sum(case b.kode_param when '$row->kode_param' then b.nilai else 0 end) as ".strtolower($row->kode_param).",";
			$pdpt1.="isnull(b.".strtolower($row->kode_param).",0) as ".strtolower($row->kode_param).",";
			$jum_pdpt=$jum_pdpt+1;
			
		}
		$pdpt1=substr($pdpt1,0,strlen($pdpt1)-1);
		$pdpt2=substr($pdpt2,0,strlen($pdpt2)-1);
		echo "<td width='90'  align='center' class='header_laporan'>Total Pendapatan</td>";
		$sql="select a.kode_param,a.nama 
from hr_gaji_param a
inner join (select distinct b.kode_param 
			from hr_gaji_d b
			inner join hr_karyawan a on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi
			$this->filter
			)b on a.kode_param=b.kode_param
where  a.dc='C' and a.jenis='T' and a.kode_lokasi='$kode_lokasi'
order by a.no_urut ";
		
		$rs = $dbLib->execute($sql);
		$beban1="";$beban2="";$jum_beban=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$beban[$jum_beban]=strtolower($row->kode_param);
			echo "<td width='90'  align='center' class='header_laporan'>$row->nama</td>";
			$beban2.="sum(case b.kode_param when '$row->kode_param' then b.nilai else 0 end) as ".strtolower($row->kode_param).",";
			$beban1.="isnull(b.".strtolower($row->kode_param).",0) as ".strtolower($row->kode_param).",";
			$jum_beban=$jum_beban+1;
		}
		$beban1=substr($beban1,0,strlen($beban1)-1);
		$beban2=substr($beban2,0,strlen($beban2)-1);
		echo "<td width='90'  align='center' class='header_laporan'>Total Potongan</td>";
		echo "<td width='90'  align='center' class='header_laporan'>Total Ditransfer</td>";
		echo "<td width='90'  align='center' class='header_laporan'>PPH21</td>";
		echo "</tr>";
		//data gaji
		$sql="select a.kode_loker,c.nama,c.kode_lokasi,$pdpt1,$beban1
from (select a.kode_loker
	  from hr_gaji_d b
	  inner join hr_karyawan a on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi
	  $this->filter
	  group by a.kode_loker
	   ) a
inner join hr_loker c on a.kode_loker=c.kode_loker
inner join (select b.kode_loker,$pdpt2,$beban2 
			from hr_gaji_d b
			inner join hr_karyawan a on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi
			$this->filter
			group by b.kode_loker
			)b on a.kode_loker=b.kode_loker ";
		
		$rs = $dbLib->execute($sql);
		$i=1;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<tr><td align='center' class='isi_laporan'>$i</td>";
			echo "<td class='isi_laporan'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenSlip('$row->kode_loker','$row->kode_lokasi');\">$row->kode_loker</a>";
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
			echo "<td class='isi_laporan' align='right'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenPph('$row->nik','$row->kode_lokasi');\">".number_format($row->pph21,0,',','.')."</a>";
			echo "</td>";
			echo "</tr>";
			$i=$i+1;
		}
		echo "</table> </div>";
		return "";
		
	}
	
}
?>
