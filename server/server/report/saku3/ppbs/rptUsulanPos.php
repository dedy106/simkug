<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_ppbs_rptUsulanPos extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$sql="select 1 ";
		
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
		$jenis=$tmp[0];
		
		$nama_file="usulan.xls";
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
		$sql="select a.no_usul,a.kode_lokasi,a.kode_akun,a.kode_pp,a.kode_rkm,b.nama as nama_akun,c.nama as nama_pp,d.nama as nama_rkm,a.tahun,a.keterangan,
a.kode_drk,e.nama as nama_drk,f.kode_peruntukan,f.kode_gedung,f.kode_ruang,f.kode_lab,g.nama as nama_peruntukan,h.nama as nama_gedung,i.nama as nama_ruang, case f.progress 
when '1' then 'Evaluasi Usulan - Logistik' 
when '2' then 'Evaluasi Usulan - Keuangan' 
when '3' then 'Approval Usulan Final - Keuangan' 
when '4' then 'Evaluasi Usulan - Yayasan'  
when '5' then 'Penyesuaian Usulan Final' 
when '6' then 'Release Finalisasi Usulan'
when 'K' then 'Return Evaluasi Usulan - Keuangan' 
when 'L' then 'Return Evaluasi Usulan - Logistik' 
when 'F' then 'Return Usulan Final - Keuangan' 
when 'Y' then 'Return Evaluasi Usulan - Yayasan'    
else '-'
end as posisi		
from agg_usul_m a
inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
inner join agg_pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi and a.tahun=c.tahun
left join agg_rkm d on a.kode_rkm=d.kode_rkm and a.kode_lokasi=d.kode_lokasi and a.tahun=d.tahun
inner join agg_drk e on a.kode_drk=e.kode_drk and a.kode_lokasi=e.kode_lokasi and a.tahun=e.tahun
inner join log_usul_m f on a.no_usul=f.no_usul and a.kode_lokasi=f.kode_lokasi
left join log_peruntukan g on f.kode_peruntukan=g.kode_peruntukan and f.kode_lokasi=g.kode_lokasi
left join log_gedung h on f.kode_gedung=h.kode_gedung and f.kode_lokasi=h.kode_lokasi
left join log_ruang i on f.kode_ruang=i.kode_ruang and f.kode_lokasi=i.kode_lokasi
$this->filter
order by a.no_usul";
		
		$rs = $dbLib->execute($sql);
		$i = 1;
		
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("usulan",$this->lokasi,"");
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
        <tr bgcolor='#CCCCCC'>
            <td width='30'  align='center' class='header_laporan'>No</td>
            <td width='80'  align='center' class='header_laporan'>No Bukti</td>
            <td width='200'  align='center' class='header_laporan'>Keterangan</td>
            <td width='80'  align='center' class='header_laporan'>PP</td>
            <td width='200'  align='center' class='header_laporan'>Akun</td>
            <td width='200'  align='center' class='header_laporan'>RKM</td>
            <td width='200'  align='center' class='header_laporan'>DRK</td>
            <td width='80'  align='center' class='header_laporan'>Tahun</td>
            <td width='100'  align='center' class='header_laporan'>Gedung</td>
            <td width='100'  align='center' class='header_laporan'>Ruangan</td>
            <td width='100'  align='center' class='header_laporan'>Posisi</td>
	    </tr>  ";
        while ($row = $rs->FetchNextObject($toupper=false))
        {
            echo "<tr >
            <td class='isi_laporan' align='center'>$i</td>
			<td class='isi_laporan'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBukti('$row->no_usul','$row->kode_lokasi');\">".$row->no_usul."</a>
            </td>
            <td class='isi_laporan'>$row->keterangan</td>
            <td class='isi_laporan'>$row->kode_pp - $row->nama_pp</td>
            <td class='isi_laporan'>$row->kode_akun - $row->nama_akun</td>
            <td class='isi_laporan'>$row->kode_rkm - $row->nama_rkm</td>
            <td class='isi_laporan'>$row->kode_drk - $row->nama_drk</td>
            <td class='isi_laporan'>$row->tahun</td>
            <td class='isi_laporan'>$row->kode_gedung - $row->nama_gedung</td>
            <td class='isi_laporan'>$row->kode_ruang - $row->nama_ruang</td>
            <td class='isi_laporan'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenHis('$row->no_usul','$row->kode_lokasi');\">".strtoupper($row->posisi)."</a>
            </td>
            </tr>";
			$i=$i+1;
		}
	
		echo "</table><br>";
		echo "</div>";
		return "";
	}
	
}
?>
  
