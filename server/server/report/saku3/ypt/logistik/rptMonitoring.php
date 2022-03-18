<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_ypt_logistik_rptMonitoring extends server_report_basic
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
 		$sql="select  a.kode_lokasi,a.no_pesan,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.kode_pp,b.nama as nama_pp,a.nilai,
 		a.kode_drk,d.nama as nama_drk,a.kode_akun,c.nama as nama_akun,e.no_app as no_app_pesan,
 		convert(varchar,e.tanggal,103) as tgl_app_pesan,m.no_app,convert(varchar,n.tanggal,103) as tgl_app,
 		f.no_spk,convert(varchar,f.tanggal,103) as tgl_spk,
 		f.kode_vendor,g.nama as nama_vendor,h.no_terima,convert(varchar,h.tanggal,103) as tgl_terima,
 		i.no_hutang,convert(varchar,i.tanggal,103) as tgl_hutang,
 		j.no_pb,j.no_agenda,convert(varchar,j.tanggal,103) as tgl_pb,isnull(f.nilai,0) as nilai_po
 from log_pesan_m a
 inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
 inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi
 inner join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun='$tahun'
 left join app_d l on a.no_pesan=l.no_bukti and a.kode_lokasi=l.kode_lokasi and l.modul='LOGREQ_APP' and l.status='1'
 left join app_m e on l.no_app=e.no_app and l.kode_lokasi=e.kode_lokasi
 left join app_d m on a.no_pesan=m.no_bukti and a.kode_lokasi=m.kode_lokasi and m.modul='LOGREQ_TRM'
 left join app_m n on m.no_app=n.no_app and m.kode_lokasi=n.kode_lokasi
 left join log_spk_m f on a.no_pesan=f.no_pesan and a.kode_lokasi=f.kode_lokasi
 left join vendor g on f.kode_vendor=g.kode_vendor and f.kode_lokasi=g.kode_lokasi
 left join log_terima_m h on f.no_spk=h.no_po and f.kode_lokasi=h.kode_lokasi
 left join hutang_m i on f.no_spk=i.no_dokumen and f.kode_lokasi=i.kode_lokasi and i.modul='LOGBAST'
 left join yk_pb_m j on i.no_hutang=j.no_hutang and i.kode_lokasi=j.kode_lokasi
 left join it_aju_m k on j.no_agenda=k.no_aju and j.kode_lokasi=k.kode_lokasi
 $this->filter  order by a.no_pesan";
		
		 $rs = $dbLib->execute($sql);	
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("monitoring pengajuan",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='2800'>
        <tr bgcolor='#CCCCCC'>
            <td width='30'  align='center' class='header_laporan' rowspan=2>No</td>
            <td width='60'  align='center' class='header_laporan' rowspan=2>Kode PP</td>
            <td width='100'  align='center' class='header_laporan' rowspan=2>Nama PP</td>
            <td width='60'  align='center' class='header_laporan' rowspan=2>Kode Akun</td>
            <td width='150'  align='center' class='header_laporan' rowspan=2>Nama Akun</td>
			<td width='60'  align='center' class='header_laporan' rowspan=2>Kode DRK</td>
            <td width='150'  align='center' class='header_laporan' rowspan=2>Nama DRK</td>
            <td width='150'  align='center' class='header_laporan' rowspan=2>Nama Pekerjaan</td>
            <td width='270'  align='center' class='header_laporan' colspan='3'>Justifikasi Kebutuhan</td>
            <td width='180'  align='center' class='header_laporan' colspan='2'>Approval</td>
            <td width='180'  align='center' class='header_laporan' colspan='2'>Justifikasi Pengadaan</td>
            <td width='270'  align='center' class='header_laporan' colspan='3'>Revisi Justifikasi Kebutuhan</td>
            <td width='270'  align='center' class='header_laporan' colspan='3'>PO</td>
            <td width='270'  align='center' class='header_laporan' colspan='3'>PO Final</td>
            <td width='270'  align='center' class='header_laporan' colspan='3'>Amandemen PO Final</td>
            <td width='270'  align='center' class='header_laporan' colspan='3'>Uji Terima</td>
            <td width='270'  align='center' class='header_laporan' colspan='3'>BAST</td>
        </tr>
        <tr bgcolor='#CCCCCC'>
            <td width='90'  align='center' class='header_laporan' >No Bukti</td>
            <td width='90'  align='center' class='header_laporan' >Tanggal</td>
            <td width='90'  align='center' class='header_laporan' >Nilai Rp.</td>
            <td width='90'  align='center' class='header_laporan' >No Bukti</td>
            <td width='90'  align='center' class='header_laporan' >Tanggal</td>
            <td width='90'  align='center' class='header_laporan' >No Bukti</td>
            <td width='90'  align='center' class='header_laporan' >Tanggal</td>
            <td width='90'  align='center' class='header_laporan' >No Bukti</td>
            <td width='90'  align='center' class='header_laporan' >Tanggal</td>
            <td width='90'  align='center' class='header_laporan' >Nilai Rp.</td>
            <td width='90'  align='center' class='header_laporan' >No Bukti</td>
            <td width='90'  align='center' class='header_laporan' >Tanggal</td>
            <td width='90'  align='center' class='header_laporan' >Nilai Rp.</td>
            <td width='90'  align='center' class='header_laporan' >No Bukti</td>
            <td width='90'  align='center' class='header_laporan' >Tanggal</td>
            <td width='90'  align='center' class='header_laporan' >Nilai Rp.</td>
            <td width='90'  align='center' class='header_laporan' >No Bukti</td>
            <td width='90'  align='center' class='header_laporan' >Tanggal</td>
            <td width='90'  align='center' class='header_laporan' >Nilai Rp.</td>
            <td width='90'  align='center' class='header_laporan' >No Bukti</td>
            <td width='90'  align='center' class='header_laporan' >Tanggal</td>
            <td width='90'  align='center' class='header_laporan' >Nilai Rp.</td>
            <td width='90'  align='center' class='header_laporan' >No Bukti</td>
            <td width='90'  align='center' class='header_laporan' >Tanggal</td>
            <td width='90'  align='center' class='header_laporan' >Nilai Rp.</td>
        </tr>  ";
		$nilai=0;$nilai_po=0;
		$first = true;
	 	while ($row = $rs->FetchNextObject($toupper=false))
	 	{
			
	 		$nilai+=$row->nilai;
	 		$nilai_po+=$row->nilai_po;
	 	echo "<tr >
	 		<td class='isi_laporan' align='center'>$i</td>
			<td class='isi_laporan'>$row->kode_pp</td>
	 		<td class='isi_laporan'>$row->nama_pp</td>
	 		<td class='isi_laporan'>$row->kode_akun</td>
	 		<td class='isi_laporan'>$row->nama_akun</td>
			<td class='isi_laporan'>$row->kode_drk</td>
	 		<td class='isi_laporan'>$row->nama_drk</td>
			<td class='isi_laporan'>$row->keterangan</td>
	 		<td class='isi_laporan'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenPesan('$row->no_pesan','$row->kode_lokasi');\">$row->no_pesan</a></td>
	 		<td class='isi_laporan'>$row->tgl</td>
	 		<td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
	 		<td class='isi_laporan'>$row->no_app_pesan</td>
	 		<td class='isi_laporan'>$row->tgl_app_pesan</td>
	 		<td class='isi_laporan'>$row->no_app</td>
	 		<td class='isi_laporan'>$row->tgl_app</td>
	 		<td class='isi_laporan'>$row->no_spk</td>
	 		<td class='isi_laporan'>$row->tgl_spk</td>
	 		<td class='isi_laporan' align='right'>".number_format($row->nilai_po,0,",",".")."</td>
	 		<td class='isi_laporan'>$row->no_terima</td>
	 		<td class='isi_laporan'>$row->tgl_terima</td>
			<td class='isi_laporan' align='right'>".number_format($row->nilai_po,0,",",".")."</td>
	 		<td class='isi_laporan'>$row->no_hutang</td>
	 		<td class='isi_laporan'>$row->tgl_hutang</td>
			<td class='isi_laporan' align='right'>".number_format($row->nilai_po,0,",",".")."</td>
			<td class='isi_laporan'>$row->no_hutang</td>
	 		<td class='isi_laporan'>$row->tgl_hutang</td>
			<td class='isi_laporan' align='right'>".number_format($row->nilai_po,0,",",".")."</td>
			<td class='isi_laporan'>$row->no_hutang</td>
	 		<td class='isi_laporan'>$row->tgl_hutang</td>
			<td class='isi_laporan' align='right'>".number_format($row->nilai_po,0,",",".")."</td>
			<td class='isi_laporan'>$row->no_hutang</td>
	 		<td class='isi_laporan'>$row->tgl_hutang</td>
			<td class='isi_laporan' align='right'>".number_format($row->nilai_po,0,",",".")."</td>
	
	    </tr>";
	 		$i=$i+1;
	 	}
	 	echo "<tr >
    
	   <td class='header_laporan' align='center' colspan='10'>Total</td>
	   <td class='header_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
	   <td class='header_laporan' align='center' colspan='6'>&nbsp;</td>
	    <td class='header_laporan' align='right'>".number_format($nilai_po,0,",",".")."</td>
	   <td class='header_laporan' align='center' colspan='12'>&nbsp;</td>
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
