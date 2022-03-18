<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_spm_simlog_rptPrPos extends server_report_basic
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
		$sql="select a.no_pesan,a.kode_lokasi,date_format(a.tanggal,'%d/%m/%Y') as tgl_pesan,a.keterangan,a.nilai,a.kode_pp,b.nama as nama_pp,a.kode_proyek,
			  c.no_po,date_format(c.tanggal,'%d/%m/%Y') as tgl_po,
			  d.no_hutang,date_format(d.tanggal,'%d/%m/%Y') as tgl_ba,m.nama as nama_proyek,
			  e.no_pb,date_format(e.tanggal,'%d/%m/%Y') as tgl_pb
from log_pesan_m a
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
inner join log_po_m c on a.no_pesan=c.no_pesan and a.kode_lokasi=c.kode_lokasi
inner join hutang_m d on d.no_hutang=c.no_ba and d.kode_lokasi=c.kode_lokasi
inner join yk_pb_m e on e.no_hutang=d.no_hutang and d.kode_lokasi=e.kode_lokasi
left join spm_proyek m on d.kode_project=m.kode_proyek and d.kode_lokasi=m.kode_lokasi


$this->filter order by a.no_pesan ";
		
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
		echo $AddOnLib->judul_laporan("posisi Purchase Request",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='0'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='90'  align='center' class='header_laporan'>No PR</td>
	 <td width='50'  align='center' class='header_laporan'>Tgl pesan</td>
	 <td width='30'  align='center' class='header_laporan'>Kode PP</td>
	 <td width='90'  align='center' class='header_laporan'>Nama PP</td>
	 <td width='60'  align='center' class='header_laporan'>Proyek</td>
	 <td width='100'  align='center' class='header_laporan'>Nama Proyek</td>
   <td width='150'  align='center' class='header_laporan'>Keterangan</td>
	 <td width='60'  align='center' class='header_laporan'>Nilai</td>
	 <td width='90'  align='center' class='header_laporan'>No PO</td>
	 <td width='50'  align='center' class='header_laporan'>Tgl PO</td>
	 <td width='90'  align='center' class='header_laporan'>No BAST</td>
	 <td width='50'  align='center' class='header_laporan'>Tgl BAST</td>
	 <td width='90'  align='center' class='header_laporan'>No PB</td>
	 <td width='50'  align='center' class='header_laporan'>Tgl PB</td>
	  </tr> ";
		$bruto=0;$npajak=0;$nilai=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$bruto+=$row->bruto;
			$npajak+=$row->npajak;
			$nilai+=$row->nilai;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
      <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBukti('$row->no_pesan','$row->kode_lokasi');\">$row->no_pesan</a>";
		echo "</td>
	<td class='isi_laporan'>$row->tgl_pesan</td>
	 <td class='isi_laporan'>$row->kode_pp</td>
	 <td class='isi_laporan'>".ucwords(strtolower($row->nama_pp))."</td>
	 <td class='isi_laporan'>$row->kode_proyek</td>
	 <td class='isi_laporan'>$row->nama_proyek</td>
	 <td class='isi_laporan'>$row->keterangan</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
	 <td class='isi_laporan'>$row->no_po</td>
	<td class='isi_laporan'>$row->tgl_po</td>
	 <td class='isi_laporan'>$row->no_hutang</td>
	<td class='isi_laporan'>$row->tgl_ba</td>
	 <td class='isi_laporan'>$row->no_pb</td>
	<td class='isi_laporan'>$row->tgl_pb</td>
	   </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='header_laporan' align='center' colspan='8'>Total</td>
	  <td class='header_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
	  <td class='header_laporan' align='center' colspan='12'>&nbsp;</td>
    </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
