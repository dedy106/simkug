<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_spm_rptPanjarPtgPos extends server_report_basic
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
		$tahun=substr($tmp[0],0,4);
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$jenis=$tmp[1];
		$nama_file="if_".$periode.".xls";
		
		$sql="select a.no_ptg,a.kode_lokasi,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.kode_pp,a.keterangan,a.nilai,a.progress,b.nama as nama_pp,
       a.no_app,date_format(c.tanggal,'%d/%m/%Y') as tgl_app,
	   a.no_app2,date_format(h.tanggal,'%d/%m/%Y') as tgl_app2,
       a.no_ver,date_format(d.tanggal,'%d/%m/%Y') as tgl_ver,
       a.no_app3,date_format(e.tanggal,'%d/%m/%Y') as tgl_app3,
       g.no_kas,date_format(g.tanggal,'%d/%m/%Y') as tgl_kas,a.no_final
from panjarptg2_m a
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
left join spm_app_m c on a.no_app=c.no_app and a.kode_lokasi=c.kode_lokasi
left join spm_app_m d on a.no_ver=d.no_app and a.kode_lokasi=d.kode_lokasi
left join spm_app_m e on a.no_app3=e.no_app and a.kode_lokasi=e.kode_lokasi
left join spm_app_m h on a.no_app2=h.no_app and a.kode_lokasi=h.kode_lokasi
left join ptg_m f on a.no_final=f.no_ptg and a.kode_lokasi=f.kode_lokasi
left join kas_m g on f.no_kas=g.no_kas and f.kode_lokasi=g.kode_lokasi
$this->filter order by a.no_ptg ";
		
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
			$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		}
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("posisi pertanggungan panjar",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1500'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='100'  align='center' class='header_laporan'>No Bukti</td>
	 <td width='60'  align='center' class='header_laporan'>Tanggal</td>
	 <td width='60'  align='center' class='header_laporan'>Kode PP</td>
	 <td width='200'  align='center' class='header_laporan'>Nama PP</td>
   <td width='200'  align='center' class='header_laporan'>Keterangan</td>
	 <td width='90'  align='center' class='header_laporan'>Nilai</td>
	 <td width='90'  align='center' class='header_laporan'>Status</td>
	 <td width='90'  align='center' class='header_laporan'>No App Cabang</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl App Cabang</td>
	 <td width='90'  align='center' class='header_laporan'>No App SDM</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl App SDM</td>
	 <td width='60'  align='center' class='header_laporan'>No Ver/SPB</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl Ver</td>
	 <td width='90'  align='center' class='header_laporan'>No App Kug</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl App Kug</td>
	 <td width='90'  align='center' class='header_laporan'>No Final</td>
	 <td width='90'  align='center' class='header_laporan'>No KasBank</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl KasBank</td>
	  </tr>  ";
		$bruto=0;$npajak=0;$nilai=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$bruto+=$row->bruto;
			$npajak+=$row->npajak;
			$nilai+=$row->nilai;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
      <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBukti('$row->no_ptg','$row->kode_lokasi');\">$row->no_ptg</a>";
		echo "</td>
	 <td class='isi_laporan'>$row->tgl</td>
	 <td class='isi_laporan'>$row->kode_pp</td>
	 <td class='isi_laporan'>".ucwords(strtolower($row->nama_pp))."</td>
	 <td class='isi_laporan'>$row->keterangan</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
	<td class='isi_laporan'>$row->progress</td>	
	<td class='isi_laporan'>$row->no_app</td>
	 <td class='isi_laporan'>$row->tgl_app</td>
	<td class='isi_laporan'>$row->no_app2</td>
	 <td class='isi_laporan'>$row->tgl_app2</td>
	 <td class='isi_laporan'>$row->no_ver</td>
	 <td class='isi_laporan'>$row->tgl_ver</td>
	 <td class='isi_laporan'>$row->no_app3</td>
	 <td class='isi_laporan'>$row->tgl_app3</td>
	  <td class='isi_laporan'>$row->no_final</td>
	  <td class='isi_laporan'>$row->no_kas</td>
	 <td class='isi_laporan'>$row->tgl_kas</td>
	   </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='header_laporan' align='center' colspan='6'>Total</td>
	  <td class='header_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
	  <td class='header_laporan' align='center' colspan='10'>&nbsp;</td>
    </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
