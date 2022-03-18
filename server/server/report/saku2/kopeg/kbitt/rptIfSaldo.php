<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_kbitt_rptIfSaldo extends server_report_basic
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
		$periode=$tmp[0];
		$kode_lokasi=$tmp[1];
		$sql="select a.nik,b.nama,a.kode_pp,c.nama as nama_pp,a.kode_lokasi,
	   a.nilai as so_awal,isnull(d.nilai,0) as kredit,isnull(e.nilai_kas,0) as debet,a.nilai+isnull(e.nilai_kas,0)-isnull(d.nilai,0) as so_akhir
from it_if a
inner join karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi
inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
left join (select a.kode_lokasi,b.nik_panjar,sum(a.nilai) as nilai
		   from it_ifaju_m a
		   inner join it_aju_m b on a.no_aju=b.no_aju and a.kode_lokasi=b.kode_lokasi
		   where a.kode_lokasi='$kode_lokasi'
		   group by a.kode_lokasi,b.nik_panjar
		  )d on a.nik=d.nik_panjar and a.kode_lokasi=b.kode_lokasi 
left join (select a.kode_lokasi,a.nik_panjar,sum(a.nilai) as nilai_kas
		   from it_aju_m a
		   inner join kas_m b on a.no_kas=b.no_kas and a.kode_lokasi=b.kode_lokasi
		   where a.kode_lokasi='$kode_lokasi' and a.modul='HUTIF'
		   group by a.kode_lokasi,a.nik_panjar
		  )e on a.nik=e.nik_panjar and a.kode_lokasi=e.kode_lokasi 
where a.kode_lokasi='$kode_lokasi' ";
		
		$rs = $dbLib->execute($sql);	
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("saldo bymhd",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
	 <td width='60'  align='center' class='header_laporan'>NIK</td>
     <td width='200'  align='center' class='header_laporan'>Nama</td>
	 <td width='60'  align='center' class='header_laporan'>PP</td>
     <td width='150'  align='center' class='header_laporan'>Nama PP</td>
	 <td width='90'  align='center' class='header_laporan'>Saldo Awal</td>
	 <td width='90'  align='center' class='header_laporan'>Debet</td>
     <td width='90'  align='center' class='header_laporan'>Kredit</td>
	 <td width='90'  align='center' class='header_laporan'>Saldo Akhir</td>
	 
   </tr>  ";
		$so_awal=0;$debet=0;$kredit=0;$so_akhir=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$so_awal+=$row->so_awal;
			$debet+=$row->debet;
			$kredit+=$row->kredit;
			$so_akhir+=$row->so_akhir;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
	 <td class='isi_laporan'>$row->nik</td>
	 <td class='isi_laporan'>$row->nama</td>
	 <td class='isi_laporan'>$row->kode_pp</td>
	 <td class='isi_laporan'>$row->nama_pp</td>
	 <td class='isi_laporan' align='right'>".number_format($row->so_awal,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->debet,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->kredit,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->so_akhir,0,",",".")."</td>
	  </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='isi_laporan' align='center' colspan='5'>Total</td>
     <td class='isi_laporan' align='right'>".number_format($so_awal,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($debet,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($kredit,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($so_akhir,0,",",".")."</td>
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
