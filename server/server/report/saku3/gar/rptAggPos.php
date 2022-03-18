<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_gar_rptAggPos extends server_report_basic
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
		
		$sql="select a.no_pdrk,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,a.kode_pp,f.nama as nama_pp,a.kode_lokasi, 
		d.no_app,convert(varchar,d.tanggal,103) as tgl_app,isnull(g.nilai,0) as nilai,
			case when a.progress='1' then 'Approve' when a.progress='X' then 'Not Approve' else '-' end as status
from rra_pdrk_m a  
inner join karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi  
inner join pp f on a.kode_pp=f.kode_pp and b.kode_lokasi=f.kode_lokasi  
left join rra_app_d c on a.no_pdrk=c.no_bukti 
left join rra_app_m d on c.no_app=d.no_app 
left join (select no_pdrk,sum(nilai) as nilai	
		   from rra_pdrk_d 
		   where dc='D'
		   group by no_pdrk
		   )g on a.no_pdrk=g.no_pdrk 
$this->filter
order by a.no_pdrk";

//echo $sql;

		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$rs = $dbLib->execute($sql);	
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("posisi pengajuan reprograming",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1200'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='80'  align='center' class='header_laporan'>No PDRK</td>
	 <td width='50'  align='center' class='header_laporan'>Tanggal</td>
	 <td width='50'  align='center' class='header_laporan'>Kode PP</td>
	 <td width='150'  align='center' class='header_laporan'>Nama PP</td>
	  <td width='200'  align='center' class='header_laporan'>Keterangan</td>
	  <td width='90'  align='center' class='header_laporan'>Nilai</td>
	 <td width='80'  align='center' class='header_laporan'>No App</td>
	 <td width='50'  align='center' class='header_laporan'>Tgl App</td>
	<td width='50'  align='center' class='header_laporan'>Status</td>
     </tr>  ";
		$nilai=0;$nilai_kas=0;$saldo=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai=$nilai+$row->nilai;
			$nilai_kas=$nilai_kas+$row->nilai_kas;
			$saldo=$saldo+$row->saldo;
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
	 <td class='isi_laporan'>$row->status</td>
   </tr>";
			$i=$i+1;
		}
		
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
