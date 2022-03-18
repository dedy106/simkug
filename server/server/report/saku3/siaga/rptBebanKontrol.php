<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_siaga_rptBebanKontrol extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
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
		$jenis=$tmp[1];
		$nama_file="bebankontrol_".$periode.".xls";
		
		$sql="select a.no_pb,a.kode_lokasi,a.no_dokumen,convert(varchar(20),a.tanggal,103) as tgl_aju,a.keterangan,a.kode_pp,b.nama as nama_pp,a.nilai,
	   a.no_ver,convert(varchar(20),c.tanggal,103) as tgl_ver,a.no_spb,convert(varchar(20),d.tanggal,103) as tgl_spb,
	   d.no_kas,convert(varchar(20),e.tanggal,103) as tgl_kas,
	   a.no_app,convert(varchar(20),f.tanggal,103) as tgl_app,f.status as sts_app,
	   isnull(c.nilai,0) as nilai_rev,case when c.atensi is null then a.atensi else c.atensi end as atensi,
	   g.no_ju,convert(varchar(20),g.tanggal,103) as tgl_ju
from gr_pb_m a
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
left join gr_app_m f on a.no_app=f.no_app and a.kode_lokasi=f.kode_lokasi
left join gr_beban_m c on a.no_ver=c.no_beban and a.kode_lokasi=c.kode_lokasi
left join gr_spb2_m d on a.no_spb=d.no_spb and a.kode_lokasi=d.kode_lokasi
left join kas_m e on d.no_kas=e.no_kas and d.kode_lokasi=e.kode_lokasi
left join ju_m g on c.no_beban=g.no_dokumen and c.kode_lokasi=g.kode_lokasi
$this->filter order by a.no_pb";

if ($jenis=="Excell")
{
	header("Pragma: public");
	header("Expires: 0");
	header("Cache-Control: must-revalidate, post-check=0, pre-check=0"); 
	header("Content-Type: application/force-download");
	header("Content-Type: application/octet-stream");
	header("Content-Type: application/download");;
	header("Content-Disposition: attachment;filename=$nama_file"); 
	header("Content-Transfer-Encoding: binary ");
	$rs = $dbLib->execute($sql);
}
else
{
	$start = (($this->page-1) * $this->rows);
	if ($start<0) 
	{
		$start=1;
	}
	$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
}
		
		$rs = $dbLib->execute($sql);
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("kontrol pengeluaran",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1400'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='100'  align='center' class='header_laporan'>No Bukti</td>
	 <td width='60'  align='center' class='header_laporan'>Tanggal</td>
	 <td width='60'  align='center' class='header_laporan'>Kode PP</td>
	 <td width='150'  align='center' class='header_laporan'>Nama PP</td>
	 <td width='150'  align='center' class='header_laporan'>Attensi</td>
     <td width='200'  align='center' class='header_laporan'>Keterangan</td>
	 <td width='90'  align='center' class='header_laporan'>Nilai Pengajuan</td>
	 <td width='90'  align='center' class='header_laporan'>Nilai Revisi</td>
	 <td width='100'  align='center' class='header_laporan'>No Approve Budget</td>
	<td width='90'  align='center' class='header_laporan'>Status</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl Approve</td>
	 <td width='100'  align='center' class='header_laporan'>No Approve Akunting</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl Aprove</td>
	 <td width='100'  align='center' class='header_laporan'>No BYMHD</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl BYMHD</td>
	 <td width='100'  align='center' class='header_laporan'>No SPB</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl SPB</td>
	 <td width='120'  align='center' class='header_laporan'>No KasBank</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl Kasbank</td>
	
     </tr>  ";
		$nilai=0; $nilai_rev=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai+=$row->nilai;
			$nilai_rev+=$row->nilai_rev;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
      <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenAju('$row->no_pb','$row->kode_lokasi');\">$row->no_pb</a>";
		echo "</td>
	 <td class='isi_laporan'>$row->tgl_aju</td>
	 <td class='isi_laporan'>$row->kode_pp</td>
	 <td class='isi_laporan'>$row->nama_pp</td>
	 <td class='isi_laporan'>$row->atensi</td>
	 <td class='isi_laporan'>$row->keterangan</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai_rev,0,",",".")."</td>
	  <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenVer('$row->no_app','$row->kode_lokasi');\">$row->no_app</a>";
		echo "</td>
		<td class='isi_laporan'>$row->sts_app</td>
	 <td class='isi_laporan'>$row->tgl_app</td>
	 <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenVer('$row->no_ver','$row->kode_lokasi');\">$row->no_ver</a>";
		echo "</td>
	 <td class='isi_laporan'>$row->tgl_ver</td>
	 <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenJu('$row->no_ju','$row->kode_lokasi');\">$row->no_ju</a>";
		echo "</td>
		 <td class='isi_laporan'>$row->tgl_ju</td>
	  <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenSpb('$row->no_spb','$row->kode_lokasi');\">$row->no_spb</a>";
		echo "</td>
	 <td class='isi_laporan'>$row->tgl_spb</td>
	  <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKas('$row->no_kas','$row->kode_lokasi');\">$row->no_kas</a>";
		echo "</td>
	 <td class='isi_laporan'>$row->tgl_kas</td>
	 
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='header_laporan' align='center' colspan='7'>Total</td>
	  <td class='header_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
	 <td class='header_laporan' align='right'>".number_format($nilai_rev,0,",",".")."</td>
    </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
