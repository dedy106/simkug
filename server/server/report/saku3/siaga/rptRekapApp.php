<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_siaga_rptRekapApp extends server_report_basic
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
		convert(varchar,app4.tanggal,103) as tgl_dir_unit,case app4.status when '2' then 'APPROVE' when '3' then 'RETURN' else '-' end as sts_dir_unit
		from gr_pb_m a
		inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
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
		$this->filter and ((case app3.status when '2' then 'APPROVE' when '3' then 'RETURN' else '-' end) = 'APPROVE') and ((case app4.status when '2' then 'APPROVE' when '3' then 'RETURN' else '-' end) <> 'APPROVE') 
		order by a.no_pb";

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
		echo $AddOnLib->judul_laporan("pengajuan persetujuan digital",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1140'>
        <tr bgcolor='#CCCCCC'>
            <td width='30' rowspan='2' align='center' class='header_laporan'>No</td>
            <td width='60' rowspan='2' align='center' class='header_laporan'>Tgl</td>
            <td width='100' rowspan='2' align='center' class='header_laporan'>Nomor Dokumen</td>
            <td width='200' rowspan='2' align='center' class='header_laporan'>Nama PP</td>
            <td width='250' rowspan='2' align='center' class='header_laporan'>Justifikasi</td>
            <td width='100' rowspan='2' align='center' class='header_laporan'>Nilai Pengajuan</td>
            <td width='400' colspan='4' align='center' class='header_laporan'>Menyetujui</td>
        </tr>
        <tr bgcolor='#CCCCCC'>
            <td width='100' align='center' class='header_laporan'>Manager</td>
            <td width='100' align='center' class='header_laporan'>VP</td>
            <td width='100' align='center' class='header_laporan'>PBC</td>
            <td width='100' align='center' class='header_laporan'>Direksi</td>
        </tr>
        ";
		$nilai=0; $nilai_rev=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai+=$row->nilai;
			$nilai_rev+=$row->nilai_rev;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
	 <td class='isi_laporan'>$row->tgl_aju</td>
      <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenAju('$row->no_pb','$row->kode_lokasi');\">$row->no_pb</a>";
		echo "</td>
	 <td class='isi_laporan'>$row->nama_pp</td>
	 <td class='isi_laporan'>$row->keterangan</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
     <td class='isi_laporan'>".strtoupper($row->sts_mgr_unit)."</td>
     <td class='isi_laporan'>".strtoupper($row->sts_vp_unit)."</td>
     <td class='isi_laporan'>".strtoupper($row->sts_ver_agg)."</td>
     <td class='isi_laporan'>".strtoupper($row->sts_dir_unit)."</td>
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='header_laporan' align='center' colspan='5'>Total</td>
	  <td class='header_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
     <td class='header_laporan' align='center' colspan='4'></td>

    </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
