<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_siaga_simlog_rptBarangGedung extends server_report_basic
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
		$klp=$tmp[1];
		$sql="select a.kode_lokasi,a.kode_klp,a.nama,isnull(b.jumlah,0) as jumlah
from log_gedung_klp a
left join (select b.kode_klp,a.kode_lokasi,count(a.no_fa) as jumlah
		   from fa_asset a
		   inner join log_gedung b on a.kode_gedung=b.kode_gedung and a.kode_lokasi=b.kode_lokasi
		   where a.kode_lokasi='$kode_lokasi'
		   group by b.kode_klp,a.kode_lokasi
		   ) b on a.kode_klp=b.kode_klp and a.kode_lokasi=b.kode_lokasi
$this->filter
order by a.kode_klp";
		
		$rs = $dbLib->execute($sql);		
		$AddOnLib=new server_util_AddOnLib();	
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("data barang per gedung",$this->lokasi,"");
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='50'  align='center' class='header_laporan'>Kode</td>
	  <td width='300'  align='center' class='header_laporan'>Kelompok Gedung</td>
	 <td width='100'  align='center' class='header_laporan'>Jumlah</td>
	  </tr>  ";
		$jumlah=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$jumlah+=$row->jumlah;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>$row->kode_klp</td>
	 <td class='isi_laporan'>$row->nama</td>
	 <td class='header_laporan' align='center'>".number_format($row->jumlah,0,",",".")."</td>
     </tr>";
			
			$sql="select a.kode_lokasi,a.kode_gedung,a.nama,isnull(b.jumlah,0) as jumlah,a.kode_klp,c.nama as nama_klp
				from log_gedung a
				left join (select a.kode_gedung,a.kode_lokasi,count(a.no_fa) as jumlah
						   from fa_asset a
						   where a.kode_lokasi='$kode_lokasi'
						   group by a.kode_gedung,kode_lokasi
						   ) b on a.kode_gedung=b.kode_gedung and a.kode_lokasi=b.kode_lokasi
				inner join log_gedung_klp c on a.kode_klp=c.kode_klp and a.kode_lokasi=c.kode_lokasi
				where a.kode_klp='$row->kode_klp' and a.kode_lokasi='$row->kode_lokasi'
				order by a.kode_klp,a.kode_gedung";
			$rs1 = $dbLib->execute($sql);
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				 echo "<tr >
				 <td class='isi_laporan' align='center'>&nbsp;</td>
				 <td class='isi_laporan'>$row1->kode_gedung</td>
				 <td class='isi_laporan'>";
				 echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKartu('$row1->kode_gedung','$row1->kode_lokasi');\">$row1->nama</a>";				  
				 echo "</td>
				 <td class='header_laporan' align='center'>".number_format($row1->jumlah,0,",",".")."</td>
				 </tr>";
			}
			$i=$i+1;
		}
		echo "<tr >
     <td class='header_laporan' align='center' colspan='3'>Total</td>
	 <td class='header_laporan' align='center'>".number_format($jumlah,0,",",".")."</td>
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
