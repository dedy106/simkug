<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_ypt_logistik_rptMonitoringPengadaan extends server_report_basic
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

		$sql2="select a.keterangan as kegiatan,'-' as userpengaju, isnull(c.nama,'-') as vendor,a.jenis,a.kode_akun,a.nilai as nilai_juskeb, isnull(b.nilai+b.ppn,0) as nilai_spk,
        a.nilai- isnull(b.nilai+b.ppn,0) as selisih,
        isnull(convert(varchar,b.tgl_mulai,103),'-') as tgl_mulai,isnull(convert(varchar,b.tgl_selesai,103),'-') as tgl_selesai,
        isnull(datediff(day,tgl_mulai,tgl_selesai),0) as jkwaktu,
        case when b.no_spk is null then '-' 
        else
            (
            case when b.no_ba = '-' then cast (datediff(day,getdate(),tgl_selesai) as varchar)
            else 'SELESAI' end
            )
        end	 
        as sisa_waktu,
        isnull(convert(varchar,d.tanggal,103),'-') as tgl_bast,
        
        case when not d.no_hutang is null then 'BAST'
             when not b.no_spk is null then 'SPK'
        else 'REQUEST'
        end status,
        isnull(e.bayar,0) as bayar,
        isnull(b.nilai+b.ppn,0) - isnull(e.bayar,0) as belum_bayar,b.no_spk,a.kode_lokasi
        
        from log_pesan_m a 
        left join log_spk_m b on a.no_pesan=b.no_pesan and a.kode_lokasi=b.kode_lokasi
        left join vendor c on b.kode_vendor=c.kode_vendor and b.kode_lokasi=c.kode_lokasi
        left join hutang_m d on b.no_spk=d.no_dokumen and b.kode_lokasi=d.kode_lokasi
        
        left join (
            select x.no_spk,sum(bayar) as bayar
            from
            (
            select c.no_spk,sum(a.nilai_final) as bayar
            from yk_pb_m a
            inner join log_spk_m c on a.no_hutang=c.no_spk  and a.kode_lokasi=c.kode_lokasi
            where a.kode_lokasi='$kode_lokasi'
            group by c.no_spk
            
            union all
            
            select c.no_spk,sum(a.nilai_final) as bayar
            from yk_pb_m a 
            inner join hutang_m b on a.no_hutang=b.no_hutang and a.kode_lokasi=b.kode_lokasi
            inner join log_spk_m c on b.no_dokumen=c.no_spk  and c.kode_lokasi=b.kode_lokasi
            where a.kode_lokasi='$kode_lokasi'
            group by c.no_spk
            ) x 
            group by x.no_spk
        ) e on b.no_spk=e.no_spk
        
        $this->filter  ";
        
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
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
			$rs = $dbLib->execute($sql2);
		}
		else
		{
			$rs = $dbLib->execute($sql2);
		}
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("Monitoring Pengadaan",$this->lokasi);
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1850'>
        <tr bgcolor='#CCCCCC'>
            <td width='30'  align='center' class='header_laporan'>NO</td>
            <td width='200' align='center' class='header_laporan'>KEGIATAN</td>
            <td width='150' align='center' class='header_laporan'>USER</td>
            <td width='100' align='center' class='header_laporan'>VENDOR</td>
            <td width='80'  align='center' class='header_laporan'>OPEX/CAPEX</td>
            <td width='80'  align='center' class='header_laporan'>AKUN</td>
            <td width='90'  align='center' class='header_laporan'>NILAI JUSKEB TERAKHIR</td>
            <td width='90'  align='center' class='header_laporan'>NILAI SPK/KONTRAK TERAKHIR</td>
            <td width='90'  align='center' class='header_laporan'>SELISIH</td>
            <td width='90'  align='center' class='header_laporan'>MULAI PEKERJAAN</td>
            <td width='90'  align='center' class='header_laporan'>TARGET SELESAI</td>
            <td width='90'  align='center' class='header_laporan'>JANGKA WAKTU</td>
            <td width='90'  align='center' class='header_laporan'>SISA WAKTU (HARI)</td>
            <td width='90'  align='center' class='header_laporan'>SELESAI</td>
            <td width='90'  align='center' class='header_laporan'>POSISI SAAT INI</td>
            <td width='90'  align='center' class='header_laporan'>SUDAH DIBAYARKAN</td>
            <td width='90'  align='center' class='header_laporan'>BELUM DIBAYARKAN</td>
        </tr> ";
        $juskeb=0;$spk=0;$selisih=0;$bayar=0;$belum_bayar=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$juskeb+=$row->nilai_juskeb;
			$spk+=$row->nilai_spk;
			$selisih+=$row->selisih;
            $bayar+=$row->bayar;
            $belum_bayar+=$row->belum_bayar;
		echo "<tr >
            <td class='isi_laporan' align='center'>$i</td>
            <td class='isi_laporan'>$row->kegiatan</td>
            <td class='isi_laporan'>$row->userpengaju</td>
            <td class='isi_laporan'>$row->vendor</td>
            <td class='isi_laporan'>$row->jenis</td>
            <td class='isi_laporan'>$row->kode_akun</td>
            <td class='isi_laporan'>".number_format($row->nilai_juskeb,0,",",".")."</td>
            <td class='isi_laporan'>".number_format($row->nilai_spk,0,",",".")."</td>
            <td class='isi_laporan'>".number_format($row->selisih,0,",",".")."</td>
            <td class='isi_laporan'>$row->tgl_mulai</td>
            <td class='isi_laporan'>$row->tgl_selesai</td>
            <td class='isi_laporan'>$row->jkwaktu</td>
            <td class='isi_laporan'>$row->sisa_waktu</td>
            <td class='isi_laporan'>$row->tgl_bast</td>
            <td class='isi_laporan'>$row->status</td>
            <td class='isi_laporan'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenDetail('$row->no_spk','$row->kode_lokasi');\">".number_format($row->bayar,0,",",".")."</a></td>
            <td class='isi_laporan'>".number_format($row->belum_bayar,0,",",".")."</td>
	   </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='header_laporan' align='center' colspan='6'>Total</td>
	  <td class='header_laporan' align='right'>".number_format($juskeb,0,",",".")."</td>
	  <td class='header_laporan' align='right'>".number_format($spk,0,",",".")."</td>
	  <td class='header_laporan' align='right'>".number_format($selisih,0,",",".")."</td>
	  <td class='header_laporan' align='center' colspan='6'></td>
	  <td class='header_laporan' align='right'>".number_format($bayar,0,",",".")."</td>
	  <td class='header_laporan' align='right'>".number_format($belum_bayar,0,",",".")."</td>
    </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
		
	}
}
?>
