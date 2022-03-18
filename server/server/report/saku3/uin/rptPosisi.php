<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_uin_rptPosisi extends server_report_basic
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

		$sql2="select a.no_aju,a.nilai,a.nilai-a.ppn-a.pph as nilai_aju,a.nilai_pj,a.nilai,a.nilai-a.ppn-a.pph-a.nilai_pj as sisa,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.kode_pp,b.nama as nama_pp,
	   a.no_fisik,a.no_ver,a.no_nota,a.no_spm,a.no_sppd,e.no_kas,g.no_sppd,g.no_kas as no_cair,
	   convert(varchar,c.tanggal,103) as tgl_fisik, convert(varchar,d.tanggal,103) as tgl_ver,
	   convert(varchar,e.tanggal,103) as tgl_nota,convert(varchar,f.tanggal,103) as tgl_kas,
	   convert(varchar,g.tanggal,103) as tgl_sppd,convert(varchar,h.tanggal,103) as tgl_cair,
	   d.status as sts_rev,d.keterangan as ket_rev,a.jenis
from uin_aju_m a
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
left join uin_stdok_m c on a.no_fisik=c.no_fisik and a.kode_lokasi=c.kode_lokasi
left join uin_ver_m d on a.no_ver=d.no_ver and a.kode_lokasi=d.kode_lokasi
left join uin_nota_m e on a.no_nota=e.no_nota and a.kode_lokasi=e.kode_lokasi
left join uin_cair_m f on e.no_kas=f.no_cair and e.kode_lokasi=f.kode_lokasi
left join uin_sppd_m g on f.no_cair=g.no_kas and f.kode_lokasi=g.kode_lokasi
left join trans_m h on g.no_kas=h.no_bukti and g.kode_lokasi=h.kode_lokasi
        $this->filter
        order by a.no_aju
        ";
    

		$resource = $_GET["resource"];
        $fullId = $_GET["fullId"];
        
		$rs2 = $dbLib->execute($sql2);
       
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("Laporan Posisi Realisasi RAB",$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1600' >
        <tr bgcolor='#CCCCCC'>
            <td width='30'  align='center' class='header_laporan'>No</td>
			<td width='100'  align='center' class='header_laporan'>No Bukti</td>
            <td width='50'  align='center' class='header_laporan'>Jenis</td>
			<td width='60'  align='center' class='header_laporan'>Tanggal</td>
            <td width='200'  align='center' class='header_laporan'>Keterangan</td>
            <td width='60'  align='center' class='header_laporan'>Kode Unit</td>
            <td width='150'  align='center' class='header_laporan'>Nama Unit</td>
			<td width='90'  align='center' class='header_laporan'>Nilai Pengajuan</td>
			<td width='90'  align='center' class='header_laporan'>Nilai Panjar</td>
			<td width='90'  align='center' class='header_laporan'>Sisa</td>
            <td width='90'  align='center' class='header_laporan'>No Dok</td>
            <td width='60'  align='center' class='header_laporan'>Tgl Dok</td>   
            <td width='90'  align='center' class='header_laporan'>No Verifikasi</td>
            <td width='60'  align='center' class='header_laporan'>Tgl Verifikasi</td>
			<td width='100'  align='center' class='header_laporan'>Keterangan</td>
            <td width='90'  align='center' class='header_laporan'>No Nota</td>
            <td width='60'  align='center' class='header_laporan'>Tgl Nota</td>  '
			<td width='90'  align='center' class='header_laporan'>No Pencairan Nota</td>
            <td width='60'  align='center' class='header_laporan'>Tgl Cair</td> 
			<td width='90'  align='center' class='header_laporan'>No Silabi</td>
            <td width='60'  align='center' class='header_laporan'>Tgl Silabi</td> 
			<td width='90'  align='center' class='header_laporan'>No Cair Silabi</td>
            <td width='60'  align='center' class='header_laporan'>Tgl Cair</td> 
            </tr>  ";
		$nilai=0;
		while ($row = $rs2->FetchNextObject($toupper=false))
		{
			$nilai+=$row->nilai_aju;
			$nilai_pj+=$row->nilai_pj;
			$sisa+=$row->sisa;
		echo "<tr >
		     <td class='isi_laporan' align='center'>$i</td>
            <td class='isi_laporan'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBukti('$row->no_aju','$row->kode_lokasi');\">$row->no_aju</a></td>
            <td class='isi_laporan'>$row->jenis</td>
			<td class='isi_laporan'>$row->tgl</td>
            <td class='isi_laporan'>$row->keterangan</td>
            <td class='isi_laporan'>$row->kode_pp</td>
            <td class='isi_laporan'>$row->nama_pp</td>
			<td class='isi_laporan' align='right'>".number_format($row->nilai_aju,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($row->nilai_pj,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($row->sisa,0,",",".")."</td>
            <td class='isi_laporan'>$row->no_fisik</td>
            <td class='isi_laporan'>$row->tgl_fisik</td>
            <td class='isi_laporan'>$row->no_ver</td>
            <td class='isi_laporan'>$row->tgl_ver</td>
            <td class='isi_laporan'>$row->sts_rev - $row->ket_rev</td>
			<td class='isi_laporan'>$row->no_nota</td>
            <td class='isi_laporan'>$row->tgl_nota</td>
			<td class='isi_laporan'>$row->no_kas</td>
            <td class='isi_laporan'>$row->tgl_kas</td>
			<td class='isi_laporan'>$row->no_sppd</td>
            <td class='isi_laporan'>$row->tgl_sppd</td>
			<td class='isi_laporan'>$row->no_cair</td>
            <td class='isi_laporan'>$row->tgl_cair</td>
            </tr>";
			$i=$i+1;
		}
		 echo "<tr >
    
            <td class='header_laporan' align='center' colspan='7'>Total</td>
			<td class='header_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
			<td class='header_laporan' align='right'>".number_format($nilai_pj,0,",",".")."</td>
			<td class='header_laporan' align='right'>".number_format($sisa,0,",",".")."</td>
           <td class='header_laporan' align='center' colspan='13'>&nbsp;</td>
	
        </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
