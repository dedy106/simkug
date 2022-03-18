<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_siaga_rptBebanKontrol2 extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
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
		$jenis=$tmp[1];
		$nama_file="bebankontrol_".$periode.".xls";
		
		$sql="select a.no_pb,a.kode_lokasi,a.no_dokumen,convert(varchar(20),a.tanggal,103) as tgl_aju,a.keterangan,a.kode_pp,b.nama as nama_pp,a.nilai,
        convert(varchar,app1.tanggal,103) as tgl_mgr_unit,case app1.status when '2' then 'APPROVE' when '3' then 'RETURN' else '-' end as sts_mgr_unit,
        convert(varchar,app2.tanggal,103) as tgl_vp_unit,case app2.status when '2' then 'APPROVE' when '3' then 'RETURN' else '-' end as sts_vp_unit,
        convert(varchar,app3.tanggal,103) as tgl_ver_agg,case app3.status when '2' then 'APPROVE' when '3' then 'RETURN' else '-' end as sts_ver_agg,
        convert(varchar,app4.tanggal,103) as tgl_dir_unit,case app4.status when '2' then 'APPROVE' when '3' then 'RETURN' else '-' end as sts_dir_unit,
        a.no_ver,convert(varchar(20),c.tanggal,103) as tgl_ver,a.no_spb,convert(varchar(20),d.tanggal,103) as tgl_spb,
        convert(varchar,app5.tanggal,103) as tgl_mgr_kug,case app5.status when '2' then 'APPROVE' when '3' then 'RETURN' else '-' end as sts_mgr_kug,
        convert(varchar,app6.tanggal,103) as tgl_vp_kug,case app6.status when '2' then 'APPROVE' when '3' then 'RETURN' else '-' end as sts_vp_kug,
        convert(varchar,app7.tanggal,103) as tgl_dir_kug,case app7.status when '2' then 'APPROVE' when '3' then 'RETURN' else '-' end as sts_dir_kug,
        d.no_kas,convert(varchar(20),e.tanggal,103) as tgl_kas,
        a.no_app,convert(varchar(20),f.tanggal,103) as tgl_app,f.status as sts_app,
        isnull(c.nilai,0) as nilai_rev,case when c.atensi is null then a.atensi else c.atensi end as atensi,
        g.no_ju,convert(varchar(20),g.tanggal,103) as tgl_ju,isnull(dk.jum,0) as jum_dok
 from gr_pb_m a
 inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
 left join gr_app_m f on a.no_app=f.no_app and a.kode_lokasi=f.kode_lokasi
 left join gr_beban_m c on a.no_ver=c.no_beban and a.kode_lokasi=c.kode_lokasi
 left join gr_spb2_m d on a.no_spb=d.no_spb and a.kode_lokasi=d.kode_lokasi
 left join kas_m e on d.no_kas=e.no_kas and d.kode_lokasi=e.kode_lokasi
 left join ju_m g on c.no_beban=g.no_dokumen and c.kode_lokasi=g.kode_lokasi
 left join (select a.no_bukti,a.kode_lokasi,a.nik,max(b.id) as maxno
            from apv_flow a
            inner join apv_pesan b on a.no_bukti=b.no_bukti and a.kode_lokasi=b.kode_lokasi and a.no_urut=b.no_urut
            where a.no_urut=1 
            group by a.no_bukti,a.kode_lokasi,a.nik
             ) ap1 on a.no_pb=ap1.no_bukti and a.kode_lokasi=ap1.kode_lokasi
 left join apv_pesan app1 on ap1.no_bukti=app1.no_bukti and ap1.kode_lokasi=app1.kode_lokasi and ap1.maxno=app1.id
 left join (select a.no_bukti,a.kode_lokasi,a.nik,max(b.id) as maxno
            from apv_flow a
            inner join apv_pesan b on a.no_bukti=b.no_bukti and a.kode_lokasi=b.kode_lokasi and a.no_urut=b.no_urut
            where a.no_urut=2 
            group by a.no_bukti,a.kode_lokasi,a.nik
             ) ap2 on a.no_pb=ap2.no_bukti and a.kode_lokasi=ap2.kode_lokasi
 left join apv_pesan app2 on ap2.no_bukti=app2.no_bukti and ap2.kode_lokasi=app2.kode_lokasi and ap2.maxno=app2.id
 left join (select a.no_bukti,a.kode_lokasi,a.nik,max(b.id) as maxno
            from apv_flow a
            inner join apv_pesan b on a.no_bukti=b.no_bukti and a.kode_lokasi=b.kode_lokasi and a.no_urut=b.no_urut
            where a.no_urut=3 
            group by a.no_bukti,a.kode_lokasi,a.nik
             ) ap3 on a.no_pb=ap3.no_bukti and a.kode_lokasi=ap3.kode_lokasi
 left join apv_pesan app3 on ap3.no_bukti=app3.no_bukti and ap3.kode_lokasi=app3.kode_lokasi and ap3.maxno=app3.id
 left join (select a.no_bukti,a.kode_lokasi,a.nik,max(b.id) as maxno
            from apv_flow a
            inner join apv_pesan b on a.no_bukti=b.no_bukti and a.kode_lokasi=b.kode_lokasi and a.no_urut=b.no_urut
            where a.no_urut=4 
            group by a.no_bukti,a.kode_lokasi,a.nik
             ) ap4 on a.no_pb=ap4.no_bukti and a.kode_lokasi=ap4.kode_lokasi
 left join apv_pesan app4 on ap4.no_bukti=app4.no_bukti and ap4.kode_lokasi=app4.kode_lokasi and ap4.maxno=app4.id
 left join (select a.no_bukti,a.kode_lokasi,a.nik,max(b.id) as maxno
            from apv_flow a
            inner join apv_pesan b on a.no_bukti=b.no_bukti and a.kode_lokasi=b.kode_lokasi and a.no_urut=b.no_urut
            where a.no_urut=1 
            group by a.no_bukti,a.kode_lokasi,a.nik
             ) ap5 on a.no_spb=ap5.no_bukti and a.kode_lokasi=ap5.kode_lokasi
 left join apv_pesan app5 on ap5.no_bukti=app5.no_bukti and ap5.kode_lokasi=app5.kode_lokasi and ap5.maxno=app5.id
 left join (select a.no_bukti,a.kode_lokasi,a.nik,max(b.id) as maxno
            from apv_flow a
            inner join apv_pesan b on a.no_bukti=b.no_bukti and a.kode_lokasi=b.kode_lokasi and a.no_urut=b.no_urut
            where a.no_urut=2 
            group by a.no_bukti,a.kode_lokasi,a.nik
             ) ap6 on a.no_spb=ap6.no_bukti and a.kode_lokasi=ap6.kode_lokasi
 left join apv_pesan app6 on ap6.no_bukti=app6.no_bukti and ap6.kode_lokasi=app6.kode_lokasi and ap6.maxno=app6.id
 left join (select a.no_bukti,a.kode_lokasi,a.nik,max(b.id) as maxno
            from apv_flow a
            inner join apv_pesan b on a.no_bukti=b.no_bukti and a.kode_lokasi=b.kode_lokasi and a.no_urut=b.no_urut
            where a.no_urut=3 
            group by a.no_bukti,a.kode_lokasi,a.nik
             ) ap7 on a.no_spb=ap7.no_bukti and a.kode_lokasi=ap7.kode_lokasi
 left join apv_pesan app7 on ap7.no_bukti=app7.no_bukti and ap7.kode_lokasi=app7.kode_lokasi and ap7.maxno=app7.id
 left join (select a.no_pb,a.kode_lokasi,count(a.no_pb) as jum 
 from gr_pb_dok a
 group by a.no_pb,a.kode_lokasi
 )dk on a.no_pb=dk.no_pb and a.kode_lokasi=dk.kode_lokasi 
$this->filter order by a.no_pb";

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
	if ($start<0) 
	{
		$start=1;
	}
	$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
}
		
		$rs = $dbLib->execute($sql);
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("kontrol pengeluaran",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='2400'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='100'  align='center' class='header_laporan'>No Bukti</td>
	 <td width='60'  align='center' class='header_laporan'>Tanggal</td>
	 <td width='60'  align='center' class='header_laporan'>Kode PP</td>
	 <td width='150'  align='center' class='header_laporan'>Nama PP</td>
	 <td width='150'  align='center' class='header_laporan'>Attensi</td>
     <td width='200'  align='center' class='header_laporan'>Keterangan</td>
	 <td width='90'  align='center' class='header_laporan'>Nilai Pengajuan</td>
	 <td width='90'  align='center' class='header_laporan'>Nilai Revisi</td>
	 <td width='90'  align='center' class='header_laporan'>Status Approval Manager</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl Approval Manager</td>
	 <td width='90'  align='center' class='header_laporan'>Status Approval VP</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl Approval VP</td>
	 <td width='90'  align='center' class='header_laporan'>Status Approval Anggaran</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl Approval Anggaran</td>
	 <td width='90'  align='center' class='header_laporan'>Status Approval DIR UNIT</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl Approval DIR UNIT</td>
	 <td width='100'  align='center' class='header_laporan'>No Approve Akunting</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl Aprove</td>
	 <td width='100'  align='center' class='header_laporan'>No BYMHD</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl BYMHD</td>
	 <td width='100'  align='center' class='header_laporan'>No SPB</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl SPB</td>
	 <td width='90'  align='center' class='header_laporan'>Status Approval Manager</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl Approval Manager</td>
	 <td width='90'  align='center' class='header_laporan'>Status Approval VP</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl Approval VP</td>
	 <td width='90'  align='center' class='header_laporan'>Status Approval DIRKUG</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl Approval DIRKUG</td>
	 <td width='120'  align='center' class='header_laporan'>No KasBank</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl Kasbank</td>
	 <td width='60'  align='center' class='header_laporan'>Jumlah Dok</td>
	
     </tr>  ";
		$nilai=0; $nilai_rev=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai+=$row->nilai;
			$nilai_rev+=$row->nilai_rev;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
      <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenAju('$row->no_pb','$row->kode_lokasi');\">$row->no_pb</a>";
		echo "</td>
	 <td class='isi_laporan'>$row->tgl_aju</td>
	 <td class='isi_laporan'>$row->kode_pp</td>
	 <td class='isi_laporan'>$row->nama_pp</td>
	 <td class='isi_laporan'>$row->atensi</td>
	 <td class='isi_laporan'>$row->keterangan</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai_rev,0,",",".")."</td>
     <td class='isi_laporan'>".strtoupper($row->sts_mgr_unit)."</td>
     <td class='isi_laporan'>$row->tgl_mgr_unit</td>
     <td class='isi_laporan'>".strtoupper($row->sts_vp_unit)."</td>
     <td class='isi_laporan'>$row->tgl_vp_unit</td>
     <td class='isi_laporan'>".strtoupper($row->sts_ver_agg)."</td>
     <td class='isi_laporan'>$row->tgl_ver_agg</td>
     <td class='isi_laporan'>".strtoupper($row->sts_dir_unit)."</td>
     <td class='isi_laporan'>$row->tgl_dir_unit</td>";
	//  echo"
	//   <td class='isi_laporan'>";
	// 	echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenVer('$row->no_app','$row->kode_lokasi');\">$row->no_app</a>";
	// 	echo "</td>
	// 	<td class='isi_laporan'>$row->sts_app</td>
	//     <td class='isi_laporan'>$row->tgl_app</td>";
		echo"
	 <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenVer('$row->no_ver','$row->kode_lokasi');\">$row->no_ver</a>";
		echo "</td>
	 <td class='isi_laporan'>$row->tgl_ver</td>
	 <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenJu('$row->no_ju','$row->kode_lokasi');\">$row->no_ju</a>";
		echo "</td>
		 <td class='isi_laporan'>$row->tgl_ju</td>
	  <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenSpb('$row->no_spb','$row->kode_lokasi');\">$row->no_spb</a>";
		echo "</td>
	 <td class='isi_laporan'>$row->tgl_spb</td>
     <td class='isi_laporan'>".strtoupper($row->sts_mgr_kug)."</td>
     <td class='isi_laporan'>$row->tgl_mgr_kug</td>
     <td class='isi_laporan'>".strtoupper($row->sts_vp_kug)."</td>
     <td class='isi_laporan'>$row->tgl_vp_kug</td>
     <td class='isi_laporan'>".strtoupper($row->sts_dir_kug)."</td>
     <td class='isi_laporan'>$row->tgl_dir_kug</td>
	  <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKas('$row->no_kas','$row->kode_lokasi');\">$row->no_kas</a>";
		echo "</td>
	 <td class='isi_laporan'>$row->tgl_kas</td>
	 <td class='isi_laporan' align='center'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenDok('$row->no_pb','$row->kode_lokasi');\">$row->jum_dok</a></td>
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='header_laporan' align='center' colspan='7'>Total</td>
	  <td class='header_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
	 <td class='header_laporan' align='right'>".number_format($nilai_rev,0,",",".")."</td>
     <td class='header_laporan' align='center' colspan='23'></td>

    </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
