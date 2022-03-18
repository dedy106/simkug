<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_kredit_rptBrgStok extends server_report_basic
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
		$sql="select a.kode_brg,a.kode_pp,b.nama as nama_brg,c.nama as nama_pp,
		isnull(a.so_awal,0) as so_awal,isnull(a.debet,0) as debet,isnull(a.kredit,0) as kredit,isnull(a.so_akhir,0) as so_akhir
from kre_stok_periode a
inner join kre_brg b on a.kode_brg=b.kode_brg and a.kode_lokasi=b.kode_lokasi
inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
$this->filter and nik_user='$nik_user' and (a.so_awal<>0 or a.debet<>0 or a.kredit<>0 or a.so_akhir<>0)
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
     <td width='150'  align='center' class='header_laporan'>Area Bisnis</td>
	 <td width='60'  align='center' class='header_laporan'>Stok Awal</td>
	 <td width='60'  align='center' class='header_laporan'>Masuk</td>
	 <td width='60'  align='center' class='header_laporan'>Keluar</td>
	 <td width='60'  align='center' class='header_laporan'>Stok Akhir</td>
   </tr>
     ";
		$so_awal=0; $debet=0; $kredit=0; $so_akhir=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$so_awal+=$row->so_awal;
			$debet+=$row->debet;
			$kredit+=$row->kredit;
			$so_akhir+=$row->so_akhir;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKartu('$row->kode_brg','$periode','$row->kode_pp');\">$row->kode_brg</a>";
		echo "</td>
	 <td class='isi_laporan'>$row->nama_brg</td>
	 <td class='isi_laporan'>$row->nama_pp</td>
	 <td class='isi_laporan' align='center'>".number_format($row->so_awal,0,",",".")."</td>
	 <td class='isi_laporan' align='center'>".number_format($row->debet,0,",",".")."</td>
	 <td class='isi_laporan' align='center'>".number_format($row->kredit,0,",",".")."</td>
	 <td class='isi_laporan' align='center'>".number_format($row->so_akhir,0,",",".")."</td>
	 </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='isi_laporan' align='center' colspan='4'>Total</td>
	 <td class='isi_laporan' align='center'>".number_format($so_awal,0,",",".")."</td>
     <td class='isi_laporan' align='center'>".number_format($debet,0,",",".")."</td>
	 <td class='isi_laporan' align='center'>".number_format($kredit,0,",",".")."</td>
	 <td class='isi_laporan' align='center'>".number_format($so_akhir,0,",",".")."</td>
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
