<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_ypt_logistik_rptMonitoringPbyr extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
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
		$periode=$tmp[0];
		$tahun=substr($tmp[0],0,4);
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$sql="select a.kode_lokasi,a.no_pesan,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.kode_pp,b.nama as nama_pp,
	   isnull(e.nilai,0) as nilai,a.kode_drk,d.nama as nama_drk,a.kode_akun,c.nama as nama_akun,
	   f.nama as nama_vendor,i.no_kas,convert(varchar,j.tanggal,103) as tgl_kas,isnull(i.nilai,0) as nilai_kas
from log_pesan_m a
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi
inner join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun='2020'
left join log_spk_m e on a.no_pesan=e.no_pesan and a.kode_lokasi=e.kode_lokasi
left join vendor f on e.kode_vendor=f.kode_vendor and e.kode_lokasi=f.kode_lokasi
left join hutang_m g on e.no_spk=g.no_dokumen and e.kode_lokasi=g.kode_lokasi and g.modul='LOGBAST'
left join yk_pb_m h on g.no_hutang=h.no_hutang and g.kode_lokasi=h.kode_lokasi
left join it_aju_m i on h.no_agenda=i.no_aju and h.kode_lokasi=i.kode_lokasi
left join kas_m j on i.no_kas=j.no_kas and i.kode_lokasi=j.kode_lokasi
$this->filter  order by a.no_pesan";

		 $rs = $dbLib->execute($sql);	
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("monitoring pembayaran",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1400'>
        <tr bgcolor='#CCCCCC'>
            <td width='30'  align='center' class='header_laporan' rowspan=2>No</td>
            <td width='60'  align='center' class='header_laporan' rowspan=2>Kode PP</td>
            <td width='100'  align='center' class='header_laporan' rowspan=2>Nama PP</td>
            <td width='60'  align='center' class='header_laporan' rowspan=2>Kode Akun</td>
            <td width='150'  align='center' class='header_laporan' rowspan=2>Nama Akun</td>
            <td width='60'  align='center' class='header_laporan' rowspan=2>Kode DRK</td>
            <td width='150'  align='center' class='header_laporan' rowspan=2>Nama DRK</td>
            <td width='150'  align='center' class='header_laporan' rowspan=2>Nama Pekerjaan</td>
			<td width='150'  align='center' class='header_laporan' rowspan=2>Nama Vendor</td>
            <td width='150'  align='center' class='header_laporan' rowspan=2>Nilai PO Final/ Amandemen (Rp.)</td>
            <td width='270'  align='center' class='header_laporan' colspan='3'>Pembayaran</td>
            <td width='100'  align='center' class='header_laporan' rowspan='2'>Sisa</td>
			<td width='100'  align='center' class='header_laporan' rowspan='2'>Status</td>
        </tr>
        <tr bgcolor='#CCCCCC'>
            <td width='90'  align='center' class='header_laporan' >No Bukti</td>
            <td width='90'  align='center' class='header_laporan' >Tanggal</td>
            <td width='90'  align='center' class='header_laporan' >Nilai Rp.</td>
        </tr>  ";
		$nilai=0;$nilai_kas=0;
		$first = true;
	 	while ($row = $rs->FetchNextObject($toupper=false))
	 	{
			
	 		$nilai+=$row->nilai;
	 		$nilai_kas+=$row->nilai_kas;
	 	echo "<tr >
	 		<td class='isi_laporan' align='center'>$i</td>
			<td class='isi_laporan'>$row->kode_pp</td>
	 		<td class='isi_laporan'>$row->nama_pp</td>
			<td class='isi_laporan'>$row->kode_akun</td>
	 		<td class='isi_laporan'>$row->nama_akun</td>
	 		<td class='isi_laporan'>$row->kode_drk</td>
	 		<td class='isi_laporan'>$row->nama_drk</td>
			<td class='isi_laporan'>$row->keterangan</td>
			<td class='isi_laporan'>$row->nama_vendor</td>
	 		<td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
	 		<td class='isi_laporan'>$row->no_kas</td>
	 		<td class='isi_laporan'>$row->tgl_kas</td>
	 		<td class='isi_laporan' align='right'>".number_format($row->nilai_kas,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($row->nilai-$row->nilai_kas,0,",",".")."</td>
	 		<td class='isi_laporan'></td>
	
	    </tr>";
	 		$i=$i+1;
	 	}
	 	echo "<tr >
    
	   <td class='header_laporan' align='center' colspan='9'>Total</td>
	   <td class='header_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
	   <td class='header_laporan' align='center' colspan='3'>&nbsp;</td>
	   <td class='header_laporan' align='right'>".number_format($nilai_kas,0,",",".")."</td>
	   <td class='header_laporan' align='right'>".number_format($nilai-$nilai_kas,0,",",".")."</td>
	   <td class='header_laporan' align='center' >&nbsp;</td>
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
