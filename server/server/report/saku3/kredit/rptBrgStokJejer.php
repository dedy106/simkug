<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_kredit_rptBrgStokJejer extends server_report_basic
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
		$nik_user=$tmp[2];
		$periode_rev=$periode-1;
		$sql="exec sp_kre_stok_periode '$periode','$kode_lokasi','$nik_user'";
		
		$rs1 = $dbLib->execute($sql);
		$sql="select a.kode_brg,a.nama,ISNULL(b.so_akhir,0) as n1,ISNULL(c.so_akhir,0) as n2
from kre_brg a
left join (select a.kode_brg,a.kode_lokasi,SUM(a.so_akhir) as so_akhir
		   from kre_stok_periode a
		   $this->filter and nik_user='$nik_user' and a.kode_pp='01'
		   group by a.kode_brg,a.kode_lokasi
		   )b on a.kode_brg=b.kode_brg and a.kode_lokasi=b.kode_lokasi
left join (select a.kode_brg,a.kode_lokasi,SUM(a.so_akhir) as so_akhir
		   from kre_stok_periode a
		   $this->filter and nik_user='$nik_user' and a.kode_pp='05'
		   group by a.kode_brg,a.kode_lokasi
		   )c on a.kode_brg=c.kode_brg and a.kode_lokasi=c.kode_lokasi		   
where a.kode_lokasi='$kode_lokasi' 
order by a.kode_brg ";
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("stok barang",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'   align='center' class='header_laporan'>No</td>
	 <td width='50'  align='center' class='header_laporan'>Kode Barang</td>
	 <td width='200'  align='center' class='header_laporan'>Nama Barang</td>
     <td width='60'  align='center' class='header_laporan'>Tasikmalaya</td>
	 <td width='60'  align='center' class='header_laporan'>Bandung I</td>
	 <td width='60'  align='center' class='header_laporan'>Total</td>
   </tr>
     ";
		$n1=0; $n2=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$n1+=$row->n1;
			$n2+=$row->n2;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKartu('$row->kode_brg','$periode','$row->kode_pp');\">$row->kode_brg</a>";
		echo "</td>
	 <td class='isi_laporan'>$row->nama</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n1,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n2,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n1+$row->n2,0,",",".")."</td>
	 </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='isi_laporan' align='center' colspan='3'>Total</td>
	 <td class='isi_laporan' align='right'>".number_format($n1,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($n2,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($n1+$n2,0,",",".")."</td>
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
