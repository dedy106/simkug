<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_kbitt_rptIFRevisi extends server_report_basic
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
		$kode_lokasi=$tmp[2];
		$nama_file="beban_".$periode.".xls";
		$sql="select a.progress,a.kode_lokasi,a.no_aju,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.kode_pp,b.nama as nama_pp,a.nilai,a.kode_drk,j.nama as nama_drk,a.npajak,a.nilai+a.npajak as bruto,
        case when a.progress='D' then 'Ambil Berkas' when a.progress='R' then 'Revisi' when a.progress='1' then 'Verifikasi Akun' when a.progress='2' then 'Pembuatan SPB' when a.progress='S' then 'Pembayaran SPB' when a.progress='0' then 'Verifikasi Dokumen' when a.progress='A' then 'User' when a.progress='3' then 'Finish' else a.progress end progress, a.kode_akun,h.nama as nama_akun,isnull(r.jum_rev,0) as jum_rev,a.periode,
         a.no_ver, isnull (i.nama,'-') as nama
		from it_aju_m a 
        inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
        inner join masakun h on a.kode_akun=h.kode_akun and a.kode_lokasi=h.kode_lokasi 
		left join ( 
		SELECT no_bukti, nama
		FROM (
			select  c.no_bukti,b.nama, ROW_NUMBER() OVER(PARTITION BY c.no_bukti ORDER BY a.tgl_input desc) Obs
			from ver_m a 
			inner join jenis_app b on a.kode_jenis=b.kode_jenis and a.kode_lokasi=b.kode_lokasi 
			inner join ver_d c on a.no_ver=c.no_ver and a.kode_lokasi=c.kode_lokasi 
			where a.status='revisi' 
		) t0 WHERE Obs = 1
) i on a.no_aju=i.no_bukti	
        left join drk j on a.kode_drk=j.kode_drk and a.kode_lokasi=j.kode_lokasi and j.tahun='$tahun' 
        left join it_ajuapp_m k on a.no_aju=k.no_aju and a.kode_lokasi=k.kode_lokasi and a.no_app=k.no_app 
		left join ( select a.no_bukti, a.kode_lokasi, count(*) as jum_rev 
					from ver_d a
                    where a.status in ('R','D')
					group by a.no_bukti,a.kode_lokasi
					) r on a.no_aju=r.no_bukti and a.kode_lokasi=r.kode_lokasi
        $this->filter
		order by a.no_aju";
		//echo $sql;
		
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
		echo $AddOnLib->judul_laporan("revisi imprest fund",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1500'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='80'  align='center' class='header_laporan'>No Agenda</td>
	 <td width='60'  align='center' class='header_laporan'>Tanggal</td>
	 <td width='60'  align='center' class='header_laporan'>Kode PP</td>
	 <td width='150'  align='center' class='header_laporan'>Nama PP</td>
	 <td width='60'  align='center' class='header_laporan'>Kode Akun</td>
	 <td width='150'  align='center' class='header_laporan'>Nama Akun</td>
	  <td width='60'  align='center' class='header_laporan'>Kode DRK</td>
	 <td width='150'  align='center' class='header_laporan'>Nama DRK</td>
   <td width='200'  align='center' class='header_laporan'>Keterangan</td>
	 <td width='90'  align='center' class='header_laporan'>Nilai Bruto</td>
	  <td width='90'  align='center' class='header_laporan'>Nilai Pajak</td>
	   <td width='90'  align='center' class='header_laporan'>Nilai Netto</td>
	  <td width='100'  align='center' class='header_laporan'>Status Agenda</td>
	  <td width='100'  align='center' class='header_laporan'>Jenis Status</td>
	 <td width='60'  align='center' class='header_laporan'>Revisi</td>
	  </tr>  ";
		$bruto=0;$npajak=0;$nilai=0;$rev=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$bruto+=$row->bruto;
			$npajak+=$row->npajak;
			$nilai+=$row->nilai;
            $rev+=$row->jum_rev;
		echo "<tr >
        <td class='isi_laporan' align='center'>$i</td>
        <td class='isi_laporan'>$row->no_aju</td>
        <td class='isi_laporan'>$row->tgl</td>
        <td class='isi_laporan'>$row->kode_pp</td>
        <td class='isi_laporan'>$row->nama_pp</td>
        <td class='isi_laporan'>$row->kode_akun</td>
        <td class='isi_laporan'>$row->nama_akun</td>
        <td class='isi_laporan'>$row->kode_drk</td>
        <td class='isi_laporan'>$row->nama_drk</td>
        <td class='isi_laporan'>$row->keterangan</td>
        <td class='isi_laporan' align='right'>".number_format($row->bruto,0,",",".")."</td>
        <td class='isi_laporan' align='right'>".number_format($row->npajak,0,",",".")."</td>
        <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
        <td class='isi_laporan'>$row->progress</td>
        <td class='isi_laporan'>$row->nama</td>
        <td class='isi_laporan'  align='center' ><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenVer('$row->no_aju','$row->kode_pp','$row->periode','$row->kode_lokasi');\">$row->jum_rev</a></td>
	   </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='header_laporan' align='center' colspan='11'>Total</td>
	  <td class='header_laporan' align='right'>".number_format($bruto,0,",",".")."</td>
	  <td class='header_laporan' align='right'>".number_format($npajak,0,",",".")."</td>
	  <td class='header_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
	  <td class='header_laporan' align='center' >&nbsp;</td>
	  <td class='header_laporan' align='center'>".number_format($rev,0,",",".")."</td>
    </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
