<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_pbh_ypt_rptIfPosYpt extends server_report_basic
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
		$periode=$tmp[1];
		$tahun=substr($tmp[0],0,4);
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$jenis=$tmp[1];
		$nama_file="pbh_pb".$periode.".xls";
		$sql="select a.no_pb,z.kode_project,a.kode_lokasi,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.posted,a.nilai,d.no_dokumen as no_dpc,
		isnull(j.jum_dok,0) as jum_dok,
case a.progress 
when '0' then 'Pengajuan PB'
when 'D' then 'Ver Dok'
when '1' then 'Ver Akun'
when 'C' then 'Return Ver Dok'
when 'V' then 'Return Ver Akun'
when '2' then 'SPB'
when '3' then 'Dibayar'
end as progress
,a.kode_pp,b.nama as nama_pp,
       a.no_ver,convert(varchar,c.tanggal,103) as tgl_ver,
	   a.no_verdok,convert(varchar,e.tanggal,103) as tgl_verdok,
	   a.no_kas,convert(varchar,g.tanggal,103) as tgl_kas,
	   a.no_spb,convert(varchar,d.tanggal,103) as tgl_spb,
	   a.no_fisik,convert(varchar,h.tanggal,103) as tgl_fisik,
	   a.no_pajak,convert(varchar,i.tanggal,103) as tgl_pajak
from pbh_pb_m a
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
inner join hutang_m z on a.no_pb=z.no_hutang and a.kode_lokasi=z.kode_lokasi
left join pbh_ver_m c on a.no_ver=c.no_ver and a.kode_lokasi=c.kode_lokasi
left join spb_m d on a.no_spb=d.no_spb and a.kode_lokasi=d.kode_lokasi
left join pbh_ver_m e on a.no_verdok=e.no_ver and a.kode_lokasi=e.kode_lokasi
left join kas_m g on a.no_kas=g.no_kas and a.kode_lokasi=g.kode_lokasi
left join pbh_ver_m h on a.no_fisik=h.no_ver and a.kode_lokasi=h.kode_lokasi
left join pbh_ver_m i on a.no_pajak=i.no_ver and a.kode_lokasi=i.kode_lokasi
left join (select b.no_bukti, b.kode_lokasi,count(b.no_gambar) as jum_dok 
		from pbh_pb_m a
		inner join pbh_dok b on a.no_pb=b.no_bukti and a.kode_lokasi=b.kode_lokasi
		$this->filter
		group by b.no_bukti, b.kode_lokasi
		)j on a.no_pb=j.no_bukti and a.kode_lokasi=j.kode_lokasi
$this->filter order by a.no_pb ";


		
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
		echo $AddOnLib->judul_laporan("posisi imprest fund",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1600'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='100'  align='center' class='header_laporan'>No Bukti</td>
     <td width='100'  align='center' class='header_laporan'>Status IF</td>
	 <td width='60'  align='center' class='header_laporan'>Tanggal</td>
	 <td width='60'  align='center' class='header_laporan'>Kode PP</td>
	 <td width='120'  align='center' class='header_laporan'>Nama PP</td>
   <td width='250'  align='center' class='header_laporan'>Keterangan</td>
   <td width='60'  align='center' class='header_laporan'>Jumlah Dok</td>
	 <td width='90'  align='center' class='header_laporan'>Nilai</td>
	 <td width='60'  align='center' class='header_laporan'>Status</td>
	 <td width='100'  align='center' class='header_laporan'>No Terima Dok</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl Terima Dok</td>
	 <td width='100'  align='center' class='header_laporan'>No Ver Dok</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl Ver Dok</td>
	 <td width='100'  align='center' class='header_laporan'>No Ver Pajak</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl Ver Pajak</td>
	 <td width='100'  align='center' class='header_laporan'>No Ver Akun</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl Ver Akun</td>
	 <td width='100'  align='center' class='header_laporan'>No SPB</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl SPB</td>
	 <td width='100'  align='center' class='header_laporan'>No Dok SPB</td>
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
		
	<td class='isi_laporan'>$row->kode_project</td>
	<td class='isi_laporan'>$row->tgl</td>
	 <td class='isi_laporan'>$row->kode_pp</td>
	 <td class='isi_laporan'>".ucwords(strtolower($row->nama_pp))."</td>
	 <td class='isi_laporan'>$row->keterangan</td>
	 <td class='isi_laporan' align='center'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenDok('$row->no_pb','$row->kode_lokasi');\">$row->jum_dok</a></td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
	 <td class='isi_laporan'>$row->progress</td>
	 <td class='isi_laporan'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenVer('$row->no_fisik','$row->kode_lokasi');\">$row->no_fisik</a></td>
	 <td class='isi_laporan'>$row->tgl_fisik</td>
	 <td class='isi_laporan'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenVer('$row->no_verdok','$row->kode_lokasi');\">$row->no_verdok</a></td>
	 <td class='isi_laporan'>$row->tgl_verdok</td>
	<td class='isi_laporan'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenVer('$row->no_pajak','$row->kode_lokasi');\">$row->no_pajak</a></td>
	 <td class='isi_laporan'>$row->tgl_pajak</td>	
	<td class='isi_laporan'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenVer('$row->no_ver','$row->kode_lokasi');\">$row->no_ver</a></td>
	<td class='isi_laporan'>$row->tgl_ver</td>
	<td class='isi_laporan'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenSpb('$row->no_spb','$row->kode_lokasi');\">$row->no_spb</a></td>
	<td class='isi_laporan'>$row->tgl_spb</td>
	 <td class='isi_laporan'>$row->no_dpc</td>
	 <td class='isi_laporan'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKas('$row->no_kas','$row->kode_lokasi');\">$row->no_kas</a></td>
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
