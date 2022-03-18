<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_yspt_rptDropingPosisi extends server_report_basic
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
		$lokasi=$tmp[0];
		$periode=$tmp[1];
		$tahun=substr($tmp[0],0,4);
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$jenis=$tmp[1];
		$nama_file="if_".$periode.".xls";
		$sql="select a.no_minta,a.kode_lokasi,a.no_dokumen,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.keterangan,
		isnull(e.nilai,0) as nilai,a.kode_pp,b.nama as nama_pp,
	   a.no_app,date_format(c.tanggal,'%d/%m/%Y') as tgl_app,
	   a.no_kas,date_format(d.tanggal,'%d/%m/%Y') as tgl_kas,c.catatan,
	   case when c.status='1' then 'OK' else 'RETURN' end as status_app 
from ys_minta_m a
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
left join ys_app_m c on a.no_app=c.no_app and a.kode_lokasi=c.kode_lokasi
left join kas_m d on a.no_kas=d.no_kas and a.kode_lokasi=d.kode_lokasi
left join (select a.no_minta,a.kode_lokasi,sum(a.nilai_usul) as nilai
from ys_minta_d a
where a.kode_lokasi='$lokasi'
group by a.no_minta,a.kode_lokasi
		)e on a.no_minta=e.no_minta and a.kode_lokasi=e.kode_lokasi
$this->filter 
order by a.no_minta ";
		
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
			$rs = $dbLib->execute($sql);
		}
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("posisi pengajuan droping ",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1200'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='100'  align='center' class='header_laporan'>No Bukti</td>
	 <td width='60'  align='center' class='header_laporan'>Tanggal</td>
	 <td width='60'  align='center' class='header_laporan'>Kode PP</td>
	 <td width='200'  align='center' class='header_laporan'>Nama PP</td>
   <td width='200'  align='center' class='header_laporan'>Keterangan</td>
	 <td width='90'  align='center' class='header_laporan'>Nilai</td>
	 <td width='100'  align='center' class='header_laporan'>No App </td>
	 <td width='60'  align='center' class='header_laporan'>Tgl App</td>
	 <td width='60'  align='center' class='header_laporan'>Status</td>
	 <td width='150'  align='center' class='header_laporan'>Keterangan</td>
	 <td width='100'  align='center' class='header_laporan'>No KasBank</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl KasBank</td>
	  </tr> ";
		$nilai=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			
			$nilai+=$row->nilai;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
      <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBukti('$row->no_minta','$row->kode_lokasi');\">$row->no_minta</a>";
		echo "</td>
	<td class='isi_laporan'>$row->tgl</td>
	 <td class='isi_laporan'>$row->kode_pp</td>
	 <td class='isi_laporan'>".ucwords(strtolower($row->nama_pp))."</td>
	 <td class='isi_laporan'>$row->keterangan</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
	 <td class='isi_laporan'>$row->no_app</td>
	 <td class='isi_laporan'>$row->tgl_app</td>
	  <td class='isi_laporan'>$row->status_app</td>
	   <td class='isi_laporan'>$row->catatan</td>
	  <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKas('$row->no_kas','$row->kode_lokasi');\">$row->no_kas</a>";
		echo "</td>
	 <td class='isi_laporan'>$row->tgl_kas</td>
	   </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='header_laporan' align='center' colspan='6'>Total</td>
	  <td class='header_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
	  <td class='header_laporan' align='center' colspan='4'>&nbsp;</td>
    </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
