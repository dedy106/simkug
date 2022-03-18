<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_siaga_rptPanjarPtgKontrol extends server_report_basic
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
		
		$sql="select a.no_ptg,a.kode_lokasi,a.no_dokumen,a.nik_buat,
		convert(varchar(20),a.tanggal,103) as tgl_aju,a.keterangan,a.kode_pp,b.nama as nama_pp,a.nilai,
	   a.no_app,convert(varchar(20),f.tanggal,103) as tgl_app,
	   a.no_ver,convert(varchar(20),c.tanggal,103) as tgl_ver,
	   a.no_final,convert(varchar(20),d.tanggal,103) as tgl_final,
	   d.no_kas,convert(varchar(20),e.tanggal,103) as tgl_kas
from gr_panjarptg_m a
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
left join gr_app_m f on a.no_app=f.no_app and a.kode_lokasi=f.kode_lokasi
left join gr_beban_m c on a.no_ver=c.no_beban and a.kode_lokasi=c.kode_lokasi
left join ptg_m d on a.no_final=d.no_ptg and a.kode_lokasi=d.kode_lokasi
left join kas_m e on d.no_kas=e.no_kas and d.kode_lokasi=e.kode_lokasi
$this->filter order by a.no_ptg";
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("kontrol pertanggungan panjar",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1400'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='100'  align='center' class='header_laporan'>No Bukti</td>
	 <td width='60'  align='center' class='header_laporan'>Tanggal</td>
	 <td width='60'  align='center' class='header_laporan'>Kode PP</td>
	 <td width='150'  align='center' class='header_laporan'>Nama PP</td>
     <td width='200'  align='center' class='header_laporan'>Keterangan</td>
	 <td width='90'  align='center' class='header_laporan'>Nilai</td>
	 <td width='100'  align='center' class='header_laporan'>No Approve Budget</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl Approve</td>
	 <td width='100'  align='center' class='header_laporan'>No Approve Akunting</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl Aprove</td>
	 <td width='100'  align='center' class='header_laporan'>No Final</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl Final</td>
	 <td width='120'  align='center' class='header_laporan'>No KasBank</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl Kasbank</td>
	
     </tr>  ";
		$nilai=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai=$nilai+$row->nilai;
			
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
      <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenAju('$row->no_ptg','$row->kode_lokasi');\">$row->no_ptg</a>";
		echo "</td>
	 <td class='isi_laporan'>$row->tgl_aju</td>
	 <td class='isi_laporan'>$row->kode_pp</td>
	 <td class='isi_laporan'>$row->nama_pp</td>
	 <td class='isi_laporan'>$row->keterangan</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
	  <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenVer('$row->no_app','$row->kode_lokasi');\">$row->no_app</a>";
		echo "</td>
	 <td class='isi_laporan'>$row->tgl_app</td>
	 <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenVer('$row->no_ver','$row->kode_lokasi');\">$row->no_ver</a>";
		echo "</td>
	 <td class='isi_laporan'>$row->tgl_ver</td>
	  <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenSpb('$row->no_final','$row->kode_lokasi');\">$row->no_final</a>";
		echo "</td>
	 <td class='isi_laporan'>$row->tgl_final</td>
	  <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKas('$row->no_kas','$row->kode_lokasi');\">$row->no_kas</a>";
		echo "</td>
	 <td class='isi_laporan'>$row->tgl_kas</td>
	 
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='isi_laporan' align='center' colspan='7'>Total</td>
	  <td class='isi_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
	 
    </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
