<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_siaga_simlog_rptPesanDetail extends server_report_basic
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
		$tahun=substr($tmp[0],0,4);
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$sql="--Approval Request
select 'P1' as prog,b.no_app as no_bukti,convert(varchar,b.tanggal,103) as tgl,a.catatan as ket1,'' as ket2,'' as ket3
from app_d a
left join app_m b on a.no_app=b.no_app and a.kode_lokasi=b.kode_lokasi
where a.no_bukti='01-PR1905.0004' and a.modul='LOGREQ_TRM'
union 
--Approval Logistik
select 'P2' as prog,b.no_app as no_bukti,convert(varchar,b.tanggal,103) as tgl,a.catatan as ket1,'' as ket2,'' as ket3
from app_d a
left join app_m b on a.no_app=b.no_app and a.kode_lokasi=b.kode_lokasi
where a.no_bukti='01-PR1905.0004' and a.modul='LOGREQ_APP'
union
--spph
select 'P3' as prog,a.no_spph as no_bukti,convert(varchar,b.tanggal,103) as tgl,b.keterangan as ket1,d.nama as ket2,'' as ket3
from log_pesan_m a
inner join log_spph_m b on a.no_spph=b.no_spph and a.kode_lokasi=b.kode_lokasi
inner join log_spph_vendor c on b.no_spph=c.no_spph and b.kode_lokasi=c.kode_lokasi
inner join vendor d on c.kode_vendor=d.kode_vendor and c.kode_lokasi=d.kode_lokasi
where a.no_pesan='01-PR1905.0004'
--sph
union
select 'P4' as prog,e.no_sph as no_bukti,convert(varchar,e.tanggal,103) as tgl,e.keterangan as ket1,d.nama as ket2,isnull(e.nilai,0) as ket3
from log_pesan_m a
inner join log_spph_m b on a.no_spph=b.no_spph and a.kode_lokasi=b.kode_lokasi
inner join log_spph_vendor c on b.no_spph=c.no_spph and b.kode_lokasi=c.kode_lokasi
inner join vendor d on c.kode_vendor=d.kode_vendor and c.kode_lokasi=d.kode_lokasi
inner join log_sph_m e on c.no_spph=e.no_spph and c.kode_lokasi=e.kode_lokasi and c.kode_vendor=e.kode_vendor 
where a.no_pesan='01-PR1905.0004'
union
--nego
select 'P5' as prog,f.no_nego as no_bukti,convert(varchar,f.tanggal,103) as tgl,f.keterangan as ket1,d.nama as ket2,isnull(f.nilai,0) as ket3
from log_pesan_m a
inner join log_spph_m b on a.no_spph=b.no_spph and a.kode_lokasi=b.kode_lokasi
inner join log_spph_vendor c on b.no_spph=c.no_spph and b.kode_lokasi=c.kode_lokasi
inner join vendor d on c.kode_vendor=d.kode_vendor and c.kode_lokasi=d.kode_lokasi
inner join log_sph_m e on c.no_spph=e.no_spph and c.kode_lokasi=e.kode_lokasi and c.kode_vendor=e.kode_vendor 
inner join log_nego_m f on e.no_sph=f.no_sph and e.kode_lokasi=f.kode_lokasi and e.kode_vendor=f.kode_vendor 
where a.no_pesan='01-PR1905.0004'
union
--penetapan
select 'P6' as prog,g.no_tap as no_bukti,convert(varchar,g.tanggal,103) as tgl,g.keterangan as ket1,d.nama as ket2,isnull(f.nilai,0) as ket3
from log_pesan_m a
inner join log_spph_m b on a.no_spph=b.no_spph and a.kode_lokasi=b.kode_lokasi
inner join log_spph_vendor c on b.no_spph=c.no_spph and b.kode_lokasi=c.kode_lokasi
inner join vendor d on c.kode_vendor=d.kode_vendor and c.kode_lokasi=d.kode_lokasi
inner join log_sph_m e on c.no_spph=e.no_spph and c.kode_lokasi=e.kode_lokasi and c.kode_vendor=e.kode_vendor 
inner join log_nego_m f on e.no_sph=f.no_sph and e.kode_lokasi=f.kode_lokasi and e.kode_vendor=f.kode_vendor 
inner join log_tap_m g on f.no_tap=g.no_tap and f.kode_lokasi=g.kode_lokasi  
where a.no_pesan='01-PR1905.0004'
union
--spk/po
select 'P7' as prog,h.no_spk as no_bukti,convert(varchar,h.tanggal,103) as tgl,h.keterangan as ket1,d.nama as ket2,isnull(h.total,0) as ket3
from log_pesan_m a
inner join log_spph_m b on a.no_spph=b.no_spph and a.kode_lokasi=b.kode_lokasi
inner join log_spph_vendor c on b.no_spph=c.no_spph and b.kode_lokasi=c.kode_lokasi
inner join vendor d on c.kode_vendor=d.kode_vendor and c.kode_lokasi=d.kode_lokasi
inner join log_sph_m e on c.no_spph=e.no_spph and c.kode_lokasi=e.kode_lokasi and c.kode_vendor=e.kode_vendor 
inner join log_nego_m f on e.no_sph=f.no_sph and e.kode_lokasi=f.kode_lokasi and e.kode_vendor=f.kode_vendor 
inner join log_tap_m g on f.no_tap=g.no_tap and f.kode_lokasi=g.kode_lokasi 
inner join log_spk_m h on g.no_spk=h.no_spk and g.kode_lokasi=h.kode_lokasi   
where a.no_pesan='01-PR1905.0004'
order by prog";
		
		$rs = $dbLib->execute($sql);	
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("detail pengadaan",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='800'>
   <tr bgcolor='#CCCCCC'>
	 <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='60'  align='center' class='header_laporan'>Tanggal</td>
     <td width='120'  align='center' class='header_laporan'>No Bukti</td>
	 <td width='200'  align='center' class='header_laporan'>Keterangan</td>
	 <td width='200'  align='center' class='header_laporan'>Vendor</td>
	 <td width='100'  align='center' class='header_laporan'>Nilai</td>
	  </tr>  ";
		$nilai=0;
		
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			
			$nilai=$nilai+$row->nilai;
			
		echo "<tr >
			<td class='isi_laporan' >$i</td>
			<td class='isi_laporan' >$row->tgl</td>
			<td class='isi_laporan' >$row->no_bukti</td>
			<td class='isi_laporan' >$row->ket1</td>
			<td class='isi_laporan' >$row->ket2</td>
			<td class='isi_laporan' align='right'>".number_format($row->ket3,0,",",".")."</td>
	   </tr>";
			$i=$i+1;
		}
	
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
