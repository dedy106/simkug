<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_siaga_rptAggPos extends server_report_basic
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
		$nama_cab=$tmp[1];
		
		$sql="select a.no_pdrk,a.kode_lokasi,a.keterangan,a.kode_pp, b.nama as nama_pp,isnull(g.nilai,0) as nilai,
		convert(varchar,a.tanggal,103) as tanggal,convert(varchar,d.tanggal,103) as tgl_app,c.no_bukti as no_app
 from rra_pdrk_m a
 inner join pp b on a.kode_pp=b.kode_pp and b.kode_lokasi=b.kode_lokasi  
 left join rra_app_m d on a.no_pdrk=d.no_app and a.kode_lokasi=d.kode_lokasi 
 left join rra_app_d c on a.no_pdrk=c.no_app and a.kode_lokasi=c.kode_lokasi and c.sts_pdrk='RRR' and c.status='APPROVE'
 left join (select no_pdrk,kode_lokasi,sum(nilai) as nilai	
			from rra_pdrk_d 
			where dc='D'
			group by no_pdrk,kode_lokasi
			)g on a.no_pdrk=g.no_pdrk and a.kode_lokasi=g.kode_lokasi
$this->filter
order by a.no_pdrk";


		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$rs = $dbLib->execute($sql);	
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("kontrol pengajuan rra",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1000'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='80'  align='center' class='header_laporan'>No PDRK</td>
	 <td width='60'  align='center' class='header_laporan'>Tanggal</td>
	 <td width='50'  align='center' class='header_laporan'>Kode PP</td>
	 <td width='150'  align='center' class='header_laporan'>Nama PP</td>
	  <td width='200'  align='center' class='header_laporan'>Keterangan</td>
	  <td width='90'  align='center' class='header_laporan'>Nilai</td>
	 <td width='80'  align='center' class='header_laporan'>No Anggaran</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl App</td>
	<td width='80'  align='center' class='header_laporan'>No Direksi</td>
	<td width='60'  align='center' class='header_laporan'>Tgl App</td>
     </tr>  ";
		$nilai=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai=$nilai+$row->nilai;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
    <td class='isi_laporan'>";
	echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBukti('$row->no_pdrk','$row->kode_lokasi');\">$row->no_pdrk</a>";
	 echo "</td>
	 <td class='isi_laporan'>$row->tanggal</td>
	 <td class='isi_laporan'>$row->kode_pp</td>
	 <td class='isi_laporan'>$row->nama_pp</td>
	<td class='isi_laporan'>$row->keterangan</td>
	<td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
	 <td class='isi_laporan'>$row->no_app</td>
	 <td class='isi_laporan'>$row->tgl_app</td>
	   <td class='isi_laporan'>$row->no_app</td>
	 <td class='isi_laporan'>$row->tgl_app</td>
   </tr>";
			$i=$i+1;
		}
		
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
