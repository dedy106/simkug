<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_amu_rptAset extends server_report_basic
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
        $kode_pp=$tmp[1];
        $sql="select a.kode_klp,a.kode_lokasi,a.nama_klp,b.id_gedung,b.no_ruangan,isnull(b.jumlah,0) as jumlah,isnull(b.nilai_perolehan,0) as nilai_perolehan
from amu_klp_brg a
left join (select a.kode_klp,a.kode_lokasi,b.id_gedung,b.no_ruangan,count(a.no_bukti) as jumlah,sum(nilai_perolehan) as nilai_perolehan
		from amu_asset_bergerak a
		inner join amu_ruangan b on a.no_ruang=b.no_ruangan and a.kode_lokasi=b.kode_lokasi 
		$this->filter
		group by a.kode_klp,a.kode_lokasi,b.id_gedung,b.no_ruangan
		)b on a.kode_klp=b.kode_klp and a.kode_lokasi=b.kode_lokasi
where a.kode_lokasi='$kode_lokasi' 
order by a.kode_klp ";
        
        $rs = $dbLib->execute($sql);	
		$i = 1;
        $resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
        $AddOnLib=new server_util_AddOnLib();	
        
        echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("data rekap inventaris",$this->lokasi,"");
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='80'  align='center' class='header_laporan'>Kode</td>
	  <td width='300'  align='center' class='header_laporan'>Nama Barang</td>
	 <td width='60'  align='center' class='header_laporan'>Jumlah</td>
     <td width='100'  align='center' class='header_laporan'>Nilai</td>
	 </tr>  ";
		$jumlah=0;$nilai_perolehan=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$jumlah+=$row->jumlah;
			$nilai_perolehan+=$row->nilai_perolehan;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>$row->kode_klp</td>
	 <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenDetail('$row->id_gedung','$row->no_ruangan','$row->kode_klp','$row->kode_lokasi');\">$row->nama_klp</a>";
		echo "</td>
	 
	 <td class='isi_laporan' align='right'>".number_format($row->jumlah,0,',','.')."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai_perolehan,0,',','.')."</td>
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
     <td class='header_laporan' align='right' colspan='3'>Total</td>
	 <td class='header_laporan' align='right'>".number_format($jumlah,0,',','.')."</td>
	 <td class='header_laporan' align='right'>".number_format($nilai_perolehan,0,',','.')."</td>
     </tr>";
		echo "</table><br>";        
		echo "</div>";
		return "";
		
	}
	
}
?>
