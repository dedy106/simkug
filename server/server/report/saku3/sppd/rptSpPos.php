<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_sppd_rptSpPos extends server_report_basic
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
		
		$sql="select a.no_perintah,a.kode_lokasi,a.keterangan,convert(varchar(10),a.tanggal,103) as tgl_perintah,
	   b.no_spj,b.nik_spj,c.nama as nama_spj,convert(varchar(10),b.tanggal,103) as tgl_spj,b.nilai_trans,b.nilai_uhar,b.kode_pp,b.kode_unit,
	   b.no_app1,convert(varchar(10),d.tanggal,103) as tgl_app1,
	   b.no_app2,convert(varchar(10),e.tanggal,103) as tgl_app2,
	   b.no_appsdm,convert(varchar(10),j.tanggal,103) as tgl_sdm,
	   b.no_stugas,convert(varchar(10),f.tanggal,103) as tgl_stugas,
	   f.no_aju,h.nama as nama_pp,i.nama as nama_unit,
	   g.no_app,convert(varchar(10),k.tgl_input,103) as tgl_dok,
       g.no_ver,convert(varchar(10),l.tanggal,103) as tgl_ver,
	   g.no_fiat,convert(varchar(10),m.tanggal,103) as tgl_fiat,
	   g.no_spb,convert(varchar(10),n.tanggal,103) as tgl_spb,
	   g.no_kas,convert(varchar(10),o.tanggal,103) as tgl_kas    
from sp_perintah_m a
left join sp_spj_m b on a.no_perintah=b.no_perintah and a.kode_lokasi=b.kode_lokasi
left join karyawan c on b.nik_spj=c.nik and b.kode_lokasi=c.kode_lokasi
left join sp_spj_app_m d on b.no_app1=d.no_app and b.kode_lokasi=d.kode_lokasi
left join sp_spj_app_m e on b.no_app2=e.no_app and b.kode_lokasi=e.kode_lokasi
left join sp_spj_app_m j on b.no_appsdm=j.no_app and b.kode_lokasi=j.kode_lokasi
left join sp_stugas_m f on b.no_stugas=f.no_stugas and b.kode_lokasi=f.kode_lokasi
left join it_aju_m g on f.no_aju=g.no_aju and f.kode_lokasi=g.kode_lokasi
left join pp h on b.kode_pp=h.kode_pp and b.kode_lokasi=h.kode_lokasi
left join sp_unit i on b.kode_unit=i.kode_unit and b.kode_lokasi=i.kode_lokasi 
left join it_ajuapp_m k on g.no_aju=k.no_aju and g.kode_lokasi=k.kode_lokasi
left join ver_m l on g.no_ver=l.no_ver and g.kode_lokasi=l.kode_lokasi
left join fiat_m m on g.no_fiat=m.no_fiat and g.kode_lokasi=m.kode_lokasi
left join it_spb_m n on g.no_spb=n.no_spb and g.kode_lokasi=n.kode_lokasi
left join kas_m o on g.no_kas=o.no_kas and g.kode_lokasi=o.kode_lokasi
$this->filter order by a.no_perintah";
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("posisi pengajuan perjalanan dinas",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='2000'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='80'  align='center' class='header_laporan'>No Perintah</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl Perintah</td>
	 <td width='200'  align='center' class='header_laporan'>Keterangan</td>
	 <td width='80'  align='center' class='header_laporan'>No Sppd</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl Sppd</td>
	 <td width='60'  align='center' class='header_laporan'>Nik</td>
	 <td width='150'  align='center' class='header_laporan'>Nama</td>
	 <td width='60'  align='center' class='header_laporan'>Kode PP</td>
	 <td width='60'  align='center' class='header_laporan'>Kode Unit</td>
	 <td width='90'  align='center' class='header_laporan'>Uang Transport</td>
	 <td width='90'  align='center' class='header_laporan'>Uang Harian</td>
	 <td width='90'  align='center' class='header_laporan'>Total</td>
	   <td width='90'  align='center' class='header_laporan'>No App 1</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl App 1</td>
	  <td width='90'  align='center' class='header_laporan'>No App 2</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl App 2</td>
	 <td width='90'  align='center' class='header_laporan'>No SDM</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl SDM</td>
	 <td width='90'  align='center' class='header_laporan'>No Surat Tugas</td>
	 <td width='90'  align='center' class='header_laporan'>No Agenda</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl Surat Tugas</td>
	 <td width='90'  align='center' class='header_laporan'>No Dok</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl Dok</td>
	 <td width='90'  align='center' class='header_laporan'>No Ver Dok</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl Ver Dok</td>
	 <td width='90'  align='center' class='header_laporan'>No Ver Akun</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl Ver Akun</td>
	 <td width='90'  align='center' class='header_laporan'>No SPB</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl SPB</td>
	 <td width='90'  align='center' class='header_laporan'>No Kas</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl Kas</td>
     </tr>  ";
		$nilai_trans=0;$nilai_uhar=0;$transport=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai_trans+=$row->nilai_trans;
			$nilai_uhar+=$row->nilai_uhar;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>";
	echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBukti('$row->no_perintah','$row->kode_lokasi');\">$row->no_perintah</a>";
	 echo "</td>
	  <td class='isi_laporan'>$row->tgl_perintah</td>
	 <td class='isi_laporan'>$row->keterangan</td>
	  <td class='isi_laporan'>$row->no_spj</td>
	 <td class='isi_laporan'>$row->tgl_spj</td>
	 <td class='isi_laporan'>$row->nik_spj</td>
	 <td class='isi_laporan'>$row->nama_spj</td>
	 <td class='isi_laporan'>$row->kode_pp</td>
	<td class='isi_laporan'>$row->kode_unit</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai_trans,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai_uhar,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai_trans+$row->nilai_uhar,0,",",".")."</td>
	 <td class='isi_laporan'>$row->no_app1</td>
	 <td class='isi_laporan'>$row->tgl_app1</td>
	 <td class='isi_laporan'>$row->no_app2</td>
	 <td class='isi_laporan'>$row->tgl_app2</td>
	  <td class='isi_laporan'>$row->no_appsdm</td>
	 <td class='isi_laporan'>$row->tgl_sdm</td>
	 <td class='isi_laporan'>$row->no_stugas</td>
	 <td class='isi_laporan'>$row->no_aju</td>
	 <td class='isi_laporan'>$row->tgl_stugas</td>
	 <td class='isi_laporan'>$row->no_app</td>
	 <td class='isi_laporan'>$row->tgl_dok</td>
	 <td class='isi_laporan'>$row->no_ver</td>
	 <td class='isi_laporan'>$row->tgl_ver</td>
	 <td class='isi_laporan'>$row->no_fiat</td>
	 <td class='isi_laporan'>$row->tgl_fiat</td>
	 <td class='isi_laporan'>$row->no_spb</td>
	 <td class='isi_laporan'>$row->tgl_spb</td>
	 <td class='isi_laporan'>$row->no_kas</td>
	 <td class='isi_laporan'>$row->tgl_kas</td>
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='isi_laporan' align='center' colspan='10'>Total</td>
	   <td class='isi_laporan' align='right'>".number_format($nilai_trans,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($nilai_uhar,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($nilai_trans+$nilai_uhar,0,",",".")."</td>
	  <td class='isi_laporan' align='center' colspan='20'>&nbsp;</td>
    </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
