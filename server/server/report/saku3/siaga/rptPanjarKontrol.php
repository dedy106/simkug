<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_siaga_rptPanjarKontrol extends server_report_basic
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
		$xperiode=$tmp[1];
		$periode=$tmp[2];
		$periode2=$tmp[3];
		$jenis=$tmp[4];
		$nama_file="panjar_kontrol.xls";

		$AddOnLib=new server_util_AddOnLib();	
		$nama_periode="Periode ".$AddOnLib->ubah_periode($periode);
		if ($xperiode=="Range")
		{
			$nama_periode="Periode ".$AddOnLib->ubah_periode($periode)." Sd ".$AddOnLib->ubah_periode($periode2);
		}
		if ($xperiode=="All")
		{
			$nama_periode="Semua Periode";
		}
		$sql="select a.no_pb,a.kode_lokasi,a.no_dokumen,convert(varchar(20),a.tanggal,103) as tgl_aju,a.keterangan,a.atensi,a.kode_pp,b.nama as nama_pp,a.nilai,
	   a.no_ver,convert(varchar(20),c.tanggal,103) as tgl_ver,a.no_spb,convert(varchar(20),d.tanggal,103) as tgl_spb,
	   d.no_kas,convert(varchar(20),e.tanggal,103) as tgl_kas,
	   a.no_app,convert(varchar(20),f.tanggal,103) as tgl_app,
	   a.nik_buat,g.nama as nama_buat,isnull(e.nilai,0) as nilai_kas,
	   h.no_ptg,convert(varchar(20),h.tanggal,103) as tgl_ptg,
	   h.no_app as no_app_ptg,convert(varchar(20),i.tanggal,103) as tgl_app_ptg,
	   h.no_ver as no_ver_ptg,convert(varchar(20),j.tanggal,103) as tgl_ver_ptg,
	   h.no_final,convert(varchar(20),k.tanggal,103) as tgl_final,
	   l.no_kas as no_kas_ptg,convert(varchar(20),l.tanggal,103) as tgl_kas_ptg,
	   isnull(h.nilai,0) as nilai_ptg,isnull(h.nilai_kas,0) as nilai_kas_ptg
from gr_pb_m a
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
left join gr_app_m f on a.no_app=f.no_app and a.kode_lokasi=f.kode_lokasi
left join gr_beban_m c on a.no_ver=c.no_beban and a.kode_lokasi=c.kode_lokasi
left join gr_spb2_m d on a.no_spb=d.no_spb and a.kode_lokasi=d.kode_lokasi
left join kas_m e on d.no_kas=e.no_kas and d.kode_lokasi=e.kode_lokasi
inner join karyawan g on a.nik_buat=g.nik and a.kode_lokasi=g.kode_lokasi
left join gr_panjarptg_m h on a.no_pb=h.no_panjar and a.kode_lokasi=h.kode_lokasi
left join gr_app_m i on h.no_app=i.no_app and h.kode_lokasi=i.kode_lokasi
left join gr_beban_m j on h.no_ver=j.no_beban and h.kode_lokasi=j.kode_lokasi
left join ptg_m k on h.no_final=k.no_ptg and h.kode_lokasi=k.kode_lokasi
left join kas_m l on h.no_final=l.no_dokumen and h.kode_lokasi=l.kode_lokasi and l.no_dokumen not in ('-')
$this->filter order by a.tanggal";

if ($jenis=="Excel")
		{
			header("Pragma: public");
			header("Expires: 0");
			header("Cache-Control: must-revalidate, post-check=0, pre-check=0"); 
			header("Content-Type: application/force-download");
			header("Content-Type: application/octet-stream");
			header("Content-Type: application/download");;
			header("Content-Disposition: attachment;filename=$nama_file"); 
			header("Content-Transfer-Encoding: binary ");
			
		}
		else
		{
			
		}
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$rs = $dbLib->execute($sql);	
		
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("kontrol pengajuan panjar",$this->lokasi,$nama_periode);
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='2000'>
  <tr bgcolor='#CCCCCC'>
    <td width='30' rowspan='2' align='center' class='header_laporan'>No</td>
    <td width='60' rowspan='2' align='center' class='header_laporan'>NIK</td>
    <td width='150' rowspan='2' align='center' class='header_laporan'>Nama</td>
    <td width='60' rowspan='2' align='center' class='header_laporan'>Kode PP </td>
    <td width='150' rowspan='2' align='center' class='header_laporan'>Nama PP </td>
    <td width='100' rowspan='2' align='center' class='header_laporan'>No Panjar </td>
    <td width='60' rowspan='2' align='center' class='header_laporan'>Tanggal</td>
    <td width='200' rowspan='2' align='center' class='header_laporan'>Keterangan</td>
    <td colspan='6' align='center' class='header_laporan'>Pencairan</td>
    <td colspan='7' align='center' class='header_laporan'>Pertanggungjawaban</td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='100' align='center' class='header_laporan'>No App Budget </td>
    <td width='120' align='center' class='header_laporan'>No Ver Akunting </td>
    <td width='100' align='center' class='header_laporan'>No SPB </td>
    <td width='120' align='center' class='header_laporan'>No KasBank </td>
    <td width='80' align='center' class='header_laporan'>Nilai Pengajuan </td>
    <td width='80' align='center' class='header_laporan'>Nilai Kasbank </td>
    <td width='100' align='center' class='header_laporan'>No Pertanggungan </td>
	<td width='100' align='center' class='header_laporan'>No App Budget </td>
    <td width='100' align='center' class='header_laporan'>No Ver Akunting </td>
    <td width='100' align='center' class='header_laporan'>No Final </td>
	<td width='120' align='center' class='header_laporan'>No KasBank </td>
    <td width='80' align='center' class='header_laporan'>Nilai Pertanggungan </td>
    <td width='80' align='center' class='header_laporan'>Nilai Kasbank </td>
  </tr> ";
		$nilai=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai=$nilai+$row->nilai;
			
			
		echo "<tr>
    <td rowspan='2'  class='isi_laporan' align='center'>$i</td>
    <td rowspan='2'  class='isi_laporan'>$row->nik_buat</td>
    <td rowspan='2'  class='isi_laporan'>$row->nama_buat</td>
    <td rowspan='2'  class='isi_laporan'>$row->kode_pp</td>
    <td rowspan='2'  class='isi_laporan'>$row->nama_pp</td>
    <td rowspan='2' class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenAju('$row->no_pb','$row->kode_lokasi');\">$row->no_pb</a>";
		echo "</td>
    <td rowspan='2'  class='isi_laporan'>$row->tgl_aju</td>
    <td rowspan='2'  class='isi_laporan'>$row->keterangan</td>
     <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenVer('$row->no_app','$row->kode_lokasi');\">$row->no_app</a>";
		echo "</td>
    <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenVer('$row->no_ver','$row->kode_lokasi');\">$row->no_ver</a>";
		echo "</td>
   <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenSpb('$row->no_spb','$row->kode_lokasi');\">$row->no_spb</a>";
		echo "</td>
    <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKas('$row->no_kas','$row->kode_lokasi');\">$row->no_kas</a>";
		echo "</td>
    <td  rowspan='2' class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
    <td  rowspan='2'class='isi_laporan' align='right'>".number_format($row->nilai_kas,0,",",".")."</td>
   <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenAjuPtg('$row->no_ptg','$row->kode_lokasi');\">$row->no_ptg</a>";
		echo "</td>
     <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenAppPtg('$row->no_app_ptg','$row->kode_lokasi');\">$row->no_app_ptg</a>";
		echo "</td>
    <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenVerPtg('$row->no_ver_ptg','$row->kode_lokasi');\">$row->no_ver_ptg</a>";
		echo "</td>
    <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenSpbPtg('$row->no_final','$row->kode_lokasi');\">$row->no_final</a>";
		echo "</td>
	<td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKasPtg('$row->no_kas_ptg','$row->kode_lokasi');\">$row->no_kas_ptg</a>";
		echo "</td>
    <td  rowspan='2' class='isi_laporan' align='right'>".number_format($row->nilai_ptg,0,",",".")."</td>
    <td  rowspan='2'class='isi_laporan' align='right'>".number_format($row->nilai_kas_ptg,0,",",".")."</td>
  </tr>
   <tr >
    <td  class='isi_laporan'>$row->tgl_app</td>
    <td  class='isi_laporan'>$row->tgl_ver</td>
    <td  class='isi_laporan'>$row->tgl_spb</td>
    <td  class='isi_laporan'>$row->tgl_kas</td>
    <td  class='isi_laporan'>$row->tgl_ptg</td>
    <td  class='isi_laporan'>$row->tgl_app_ptg</td>
    <td  class='isi_laporan'>$row->tgl_ver_ptg</td>
    <td  class='isi_laporan'>$row->tgl_final</td>
    <td  class='isi_laporan'>$row->tgl_kas_ptg</td>
  </tr>";
			$i=$i+1;
		}
		echo "<tr >
    <td colspan='8' align='center' class='header_laporan'>&nbsp;</td>
    <td colspan='4' align='center' class='header_laporan'>&nbsp;</td>
    <td align='center' class='header_laporan'>&nbsp;</td>
    <td align='center' class='header_laporan'>&nbsp;</td>
    <td colspan='4' align='center' class='header_laporan'>&nbsp;</td>
    <td align='center' class='header_laporan'>&nbsp;</td>
    <td align='center' class='header_laporan'>&nbsp;</td>
  </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
