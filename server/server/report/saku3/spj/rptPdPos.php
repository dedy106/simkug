<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_spj_rptPdPos extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$periode=$tmp[0];
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
		
		$sql="select a.no_aju,a.kode_lokasi,a.no_dokumen,a.nik,a.kode_pp,b.nama as nama_pp,c.nama,a.tempat,a.keterangan,
a.no_app1,a.no_app2,a.no_app3,f.no_app,f.no_spb,f.no_ver,i.no_fiat,l.no_kas,
f.transport,f.harian,f.transport+f.harian as nilai,
convert(varchar,d.tanggal,103) as tgl_app1,convert(varchar,e.tanggal,103) as tgl_app2,
convert(varchar,f.tanggal,103) as tgl_app3,convert(varchar,h.tanggal,103) as tgl_app,
convert(varchar,i.tanggal,103) as tgl_spb,convert(varchar,k.tanggal,103) as tgl_fiat,
convert(varchar,l.tanggal,103) as tgl_kas,convert(varchar,a.tanggal,103) as tgl_aju
from pdss_aju_m a
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
inner join karyawan c on a.nik=c.nik and a.kode_lokasi=c.kode_lokasi
left join pdss_app_m d on a.no_app1=d.no_app and a.kode_lokasi=d.kode_lokasi
left join pdss_app_m e on a.no_app2=e.no_app and a.kode_lokasi=e.kode_lokasi
left join yk_spj_m f on a.no_aju=f.no_spj and a.kode_lokasi=f.kode_lokasi
left join app_d g on f.no_spj=g.no_bukti and f.kode_lokasi=g.kode_lokasi 
left join app_m h on g.no_app=h.no_app and g.kode_lokasi=h.kode_lokasi
left join spb_m i on f.no_spb=i.no_spb and f.kode_lokasi=i.kode_lokasi
left join app_d j on i.no_spb=j.no_bukti and i.kode_lokasi=j.kode_lokasi
left join app_m k on j.no_app=k.no_app and j.kode_lokasi=k.kode_lokasi
left join kas_m l on i.no_kas=l.no_kas and i.kode_lokasi=l.kode_lokasi
$this->filter 
order by a.no_aju";
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("posisi pengajuan perjalanan dinas",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='100'  align='center' class='header_laporan'>No Bukti</td>
	 <td width='100'  align='center' class='header_laporan'>No Dokumen</td>
	 <td width='60'  align='center' class='header_laporan'>Tanggal</td>
	 <td width='60'  align='center' class='header_laporan'>NIK</td>
	 <td width='150'  align='center' class='header_laporan'>Nama</td>
	 <td width='60'  align='center' class='header_laporan'>Kode PP</td>
	 <td width='150'  align='center' class='header_laporan'>Nama PP</td>
	 <td width='200'  align='center' class='header_laporan'>Keterangan</td>
	  <td width='90'  align='center' class='header_laporan'>Uang Transport</td>
	 <td width='90'  align='center' class='header_laporan'>Uang Harian</td>
	 <td width='90'  align='center' class='header_laporan'>Total</td>
	 <td width='90'  align='center' class='header_laporan'>No App 1</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl App 1</td>
	  <td width='90'  align='center' class='header_laporan'>No App 2</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl App 2</td>
	
	   <td width='90'  align='center' class='header_laporan'>No App</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl App</td>
	  <td width='90'  align='center' class='header_laporan'>No SPB</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl SPB</td>
	 <td width='90'  align='center' class='header_laporan'>No Fiat</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl Fiat</td>
	 <td width='90'  align='center' class='header_laporan'>No KasBank</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl KasBank</td>
     </tr>  ";
		$nilai=0;$harian=0;$transport=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai=$nilai+$row->nilai;
			$harian=$harian+$row->harian;
			$transport=$transport+$row->transport;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>";
	echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBukti('$row->no_aju','$row->kode_lokasi');\">$row->no_aju</a></td>";
	  echo "<td class='isi_laporan'>$row->no_dokumen</td>
	 <td class='isi_laporan'>$row->tgl_aju</td>
	  <td class='isi_laporan'>$row->nik</td>
	 <td class='isi_laporan'>$row->nama</td>
	 <td class='isi_laporan'>$row->kode_pp</td>
	 <td class='isi_laporan'>$row->nama_pp</td>
	<td class='isi_laporan'>$row->keterangan</td>
	<td class='isi_laporan' align='right'>".number_format($row->transport,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->harian,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
	<td class='isi_laporan'>$row->no_app1</td>
	 <td class='isi_laporan'>$row->tgl_app2</td>
	 <td class='isi_laporan'>$row->no_app2</td>
	 <td class='isi_laporan'>$row->tgl_app2</td>
	
	 <td class='isi_laporan'>$row->no_app</td>
	 <td class='isi_laporan'>$row->tgl_app</td>
	 <td class='isi_laporan'>$row->no_spb</td>
	 <td class='isi_laporan'>$row->tgl_spb</td>
	  <td class='isi_laporan'>$row->no_fiat</td>
	 <td class='isi_laporan'>$row->tgl_fiat</td>
	 <td class='isi_laporan'>$row->no_kas</td>
	 <td class='isi_laporan'>$row->tgl_kas</td>
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='isi_laporan' align='center' colspan='9'>Total</td>
	   <td class='isi_laporan' align='right'>".number_format($transport,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($harian,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
    </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
