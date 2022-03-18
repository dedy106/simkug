<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_sju_rptGlRekapVendor extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select 1";
		
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
		$jenis=$tmp[2];
		$periode2=$tmp[3];
		$periode_bayar=$tmp[4];
		$status=$tmp[5];
		$sql="";
		$AddOnLib=new server_util_AddOnLib();	
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$i=1;
		$nama_periode="Periode ".$AddOnLib->ubah_periode($periode);
		if ($jenis=="Range")
		{
			$nama_periode="Periode ".$AddOnLib->ubah_periode($periode)." Sd ".$AddOnLib->ubah_periode($periode2);
		}
		if ($jenis=="All")
		{
			$nama_periode="Semua Periode";
		}
		
		
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("Laporan Hutang Premi ",$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
		echo "<table  border='1' cellpadding='0' cellspacing='0' class='kotak' >
      <tr align='center' bgcolor='#dbeef3'>
        <td  width='25' class='header_laporan'>No</td>
        <td width='300' class='header_laporan'>Insurer</td>
        <td width='100' class='header_laporan'>Nominal</td>
        
      </tr>
     ";
		$sql="select a.kode_vendor,a.nama,a.kode_lokasi 
from sju_vendor a
inner join (select a.kode_vendor,a.kode_lokasi 
			from gldt_tmp a
			$this->filter and a.kode_akun='211010000'
			group by a.kode_vendor,a.kode_lokasi
			) b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi
where a.kode_lokasi='$kode_lokasi'
order by a.kode_vendor";
		
		$rs=$dbLib->execute($sql);
		$tot_nilai=0; 
		while ($row = $rs->FetchNextObject($toupper=false))
		{
		  echo "<tr>
			<td colspan='3' class='header_laporan'>&nbsp;&nbsp;&nbsp;Penanggung : $row->nama</td>
		  </tr>";
			$sql="select a.kode_tipe,a.nama,ISNULL(b.nilai,0) as nilai
from sju_tipe a
inner join (select a.kode_proyek,a.kode_lokasi,SUM(case when dc='D' then a.nilai else -a.nilai end) as nilai
from gldt_tmp a
$this->filter and  a.kode_akun='211010000' and a.dc='C' and a.kode_vendor='$row->kode_vendor'
group by a.kode_proyek,a.kode_lokasi 
		   )b on a.kode_tipe=b.kode_proyek and a.kode_lokasi=b.kode_lokasi
where a.kode_lokasi='$kode_lokasi'
order by a.kode_tipe";
			
			$rs1=$dbLib->execute($sql);
			$i=1;
			$nilai=0; 
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$nilai+=$row1->nilai;
			  echo "<tr>
				<td align='center' class='isi_laporan'>$i</td>
				<td class='isi_laporan'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenDetail('$row->kode_vendor','$row->kode_lokasi','$row1->kode_tipe');\">$row1->nama</a></td>
				<td class='isi_laporan' align='right'>".number_format($row1->nilai,2,',','.')."</td>
			  </tr>";
				$i=$i+1;
			 }
			$tot_nilai+=$nilai;
		
      echo "<tr>
        <td colspan='2' align='center' class='header_laporan'>Jumlah</td>
        <td class='isi_laporan' align='right'>".number_format($nilai,2,',','.')."</td>
      </tr>";
		}
		
      echo "<tr>
        <td colspan='2' align='center' class='header_laporan'>Total</td>
        <td class='isi_laporan' align='right'>".number_format($tot_nilai,2,',','.')."</td>
      </tr>";
    echo "</table>";
	
		echo "</div>";
		return "";
		
	}
	
}
?>
