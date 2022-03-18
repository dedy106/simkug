<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_pbh_rptPbPos extends server_report_basic
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
		$nama_file="pbh_pb".$periode.".xls";
		$sql="select a.no_pb,a.kode_lokasi,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.posted,a.nilai,d.no_dokumen as no_dpc,
case a.progress 
when '0' then 'Pengajuan PB'
when '1' then 'Approve Ver'
when 'C' then 'Return Ver'
when '2' then 'DPC'
when '3' then 'Dibayar'
end as progress
,a.kode_pp,b.nama as nama_pp,
       a.no_ver,convert(varchar,c.tanggal,103) as tgl_app,
	   a.no_kas,convert(varchar,g.tanggal,103) as tgl_kas,
	   a.no_spb,convert(varchar,d.tanggal,103) as tgl_spb
from pbh_pb_m a
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
left join pbh_ver_m c on a.no_ver=c.no_ver and a.kode_lokasi=c.kode_lokasi
left join spb_m d on a.no_spb=d.no_spb and a.kode_lokasi=d.kode_lokasi
left join kas_m g on a.no_kas=g.no_kas and a.kode_lokasi=g.kode_lokasi
$this->filter order by a.no_pb ";

// echo $sql;
		
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
		echo $AddOnLib->judul_laporan("posisi Permintaan Bayar",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1400'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='100'  align='center' class='header_laporan'>No Bukti</td>
	 <td width='60'  align='center' class='header_laporan'>Tanggal</td>
	 <td width='60'  align='center' class='header_laporan'>Kode PP</td>
	 <td width='120'  align='center' class='header_laporan'>Nama PP</td>
   <td width='250'  align='center' class='header_laporan'>Keterangan</td>
	 <td width='90'  align='center' class='header_laporan'>Nilai</td>
	 <td width='60'  align='center' class='header_laporan'>Status</td>
	 <td width='100'  align='center' class='header_laporan'>No Ver</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl Ver</td>
	 <td width='100'  align='center' class='header_laporan'>No DPC</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl DPC</td>
	 <td width='100'  align='center' class='header_laporan'>No Dok DPC</td>
	 <td width='100'  align='center' class='header_laporan'>No KasBank</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl KasBank</td>
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
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenPb('$row->no_pb','$row->kode_lokasi');\">$row->no_pb</a>";
		echo "</td>
	<td class='isi_laporan'>$row->tgl</td>
	 <td class='isi_laporan'>$row->kode_pp</td>
	 <td class='isi_laporan'>".ucwords(strtolower($row->nama_pp))."</td>
	 <td class='isi_laporan'>$row->keterangan</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
	 <td class='isi_laporan'>$row->progress</td>";
	 if($row->no_ver != "-"){
		echo"
		<td class='isi_laporan'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenVer('$row->no_ver','$row->kode_lokasi');\">$row->no_ver</a></td>";
	 }else{
		echo"
		<td class='isi_laporan'>$row->no_ver</td>";
	 }
	 echo"
	 <td class='isi_laporan'>$row->tgl_app</td>";
	 if($row->no_spb != "-"){
		echo"
		<td class='isi_laporan'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenSpb('$row->no_spb','$row->kode_lokasi');\">$row->no_spb</a></td>";
	 }else{
		echo"
		<td class='isi_laporan'>$row->no_spb</td>";
	 }
	 echo"
	 <td class='isi_laporan'>$row->tgl_spb</td>
	 <td class='isi_laporan'>$row->no_dpc</td>";
	 if($row->no_kas != "-"){
		echo"
		<td class='isi_laporan'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKas('$row->no_kas','$row->kode_lokasi');\">$row->no_kas</a></td>";
	 }else{
		echo"
		<td class='isi_laporan'>$row->no_kas</td>";
	 }
	 echo"
	 <td class='isi_laporan'>$row->tgl_kas</td>
	   </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='header_laporan' align='center' colspan='6'>Total</td>
	  <td class='header_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
	  <td class='header_laporan' align='center' colspan='8'>&nbsp;</td>
    </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
