<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_kbitt_rptIfReimPos extends server_report_basic
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
		$nama_file="beban_".$periode.".xls";
		$sql="select a.progress,a.kode_lokasi,o.no_aju,convert(varchar,o.tanggal,103) as tgl,o.keterangan,o.kode_pp,b.nama as nama_pp,o.nilai,o.kode_drk,j.nama as nama_drk,a.npajak,o.nilai as bruto,k.jenis,
        a.no_kas,convert(varchar,c.tanggal,103) as tgl_kas,c.nilai as nilai_kas,
        a.no_ver,convert(varchar,d.tanggal,103) as tgl_ver,
        a.no_fiat,convert(varchar,e.tanggal,103) as tgl_fiat,
        case when a.progress='D' then 'Ambil Berkas' when a.progress='R' then 'Revisi' when a.progress='1' then 'Verifikasi Akun' 
        when a.progress='2' then 'Pembuatan SPB' when a.progress='S' then 'Pembayaran SPB' when a.progress='0' then 'Verifikasi Dokumen' when a.progress='A' then 'User' when a.progress='3' then 'Finis'
        else a.progress end progress,
        c.kode_bank,o.kode_akun,h.nama as nama_akun, 
        case when f.status='1' then 'Ok' else f.status end as sts_ver,f.catatan as cat_ver,
        case when g.status='2' then 'Ok' else g.status end as sts_fiat,g.catatan as cat_fiat,
        c.kode_bank,o.kode_akun,h.nama as nama_akun,isnull(i.no_ju,'-') as no_ju,
        a.no_app,convert(varchar,k.tgl_input,103) as tgl_app,
        a.no_spb,convert(varchar,l.tanggal,103) as tgl_spb,
        isnull(n.jum_dok,0) as jum_dok,isnull(c.posted,'-') as posted
 from it_aju_m a
 inner join it_ifreim_j o on a.no_aju=o.no_aju and a.kode_lokasi=o.kode_lokasi
 inner join pp b on o.kode_pp=b.kode_pp and o.kode_lokasi=b.kode_lokasi
 left join kas_m c on a.no_kas=c.no_kas and a.kode_lokasi=c.kode_lokasi
 left join ver_m d on a.no_ver=d.no_ver and a.kode_lokasi=d.kode_lokasi
 left join ver_d f on d.no_ver=f.no_ver and d.kode_lokasi=f.kode_lokasi
 left join fiat_m e on a.no_fiat=e.no_fiat and a.kode_lokasi=e.kode_lokasi
 left join fiat_d g on e.no_fiat=g.no_fiat and e.kode_lokasi=g.kode_lokasi
 inner join masakun h on o.kode_akun=h.kode_akun and o.kode_lokasi=h.kode_lokasi
 left join ju_m i on a.no_spb=i.no_dokumen and a.kode_lokasi=i.kode_lokasi 
 left join drk j on o.kode_drk=j.kode_drk and o.kode_lokasi=j.kode_lokasi and j.tahun='$tahun'
 left join it_ajuapp_m k on a.no_aju=k.no_aju and a.kode_lokasi=k.kode_lokasi and a.no_app=k.no_app
 left join it_spb_m l on a.no_spb=l.no_spb and a.kode_lokasi=l.kode_lokasi
 left join (select no_bukti, kode_lokasi,count(no_gambar) as jum_dok 
 from it_aju_dok
 group by no_bukti,kode_lokasi) n on a.kode_lokasi=n.kode_lokasi and a.no_aju=n.no_bukti
 $this->filter order by a.no_aju";
//  echo $sql;

		
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
			$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		}
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("rekap reimburse",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='2500'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='100'  align='center' class='header_laporan'>No Agenda</td>
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
	  <td width='150'  align='center' class='header_laporan'>Status Agenda</td>
	  <td width='90'  align='center' class='header_laporan'>No Dok</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl Dok</td>
	 <td width='60'  align='center' class='header_laporan'>Jenis Dok Fisik</td>
	 <td width='90'  align='center' class='header_laporan'>No Ver Dok</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl Ver Dok</td>
	  <td width='40'  align='center' class='header_laporan'>Status Ver Dok</td>
	 <td width='150'  align='center' class='header_laporan'>Keterangan Ver Dok</td>
	  <td width='90'  align='center' class='header_laporan'>No Ver Akun</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl Ver Akun</td>
	  <td width='40'  align='center' class='header_laporan'>Status Ver Akun</td>
	   <td width='150'  align='center' class='header_laporan'>Keterangan Ver Akun</td>
	    <td width='90'  align='center' class='header_laporan'>No BYMHD</td>
		<td width='90'  align='center' class='header_laporan'>No SPB</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl SPB</td>
	 <td width='90'  align='center' class='header_laporan'>No KasBank</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl KasBank</td>
	 <td width='90'  align='center' class='header_laporan'>Jenis Bayar</td>
	 <td width='60'  align='center' class='header_laporan'>Posted</td>
	 <td width='60'  align='center' class='header_laporan'>Jumlah Dokumen</td>
	  </tr>  ";
		$bruto=0;$npajak=0;$nilai=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$bruto+=$row->bruto;
			$npajak+=$row->npajak;
			$nilai+=$row->nilai;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
      <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBukti('$row->no_aju','$row->kode_lokasi');\">$row->no_aju</a>";
		echo "</td>
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
	 <td class='isi_laporan'>$row->no_app</td>
	 <td class='isi_laporan'>$row->tgl_app</td>
	 <td class='isi_laporan'>$row->jenis</td>
	 <td class='isi_laporan'>$row->no_ver</td>
	 <td class='isi_laporan'>$row->tgl_ver</td>
	  <td class='isi_laporan' align='center'>$row->sts_ver</td>
	   <td class='isi_laporan'>$row->cat_ver</td>
	 <td class='isi_laporan'>$row->no_fiat</td>
	 <td class='isi_laporan'>$row->tgl_fiat</td>
	  <td class='isi_laporan' align='center'>$row->sts_fiat</td>
	  <td class='isi_laporan'>$row->cat_fiat</td>
	  <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenJu('$row->no_ju','$row->kode_lokasi');\">$row->no_ju</a>";
		echo "</td>
		 <td class='isi_laporan'>";
		 echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenSpb('$row->no_spb','$row->kode_lokasi');\">$row->no_spb</a>";
		echo "</td>
	   <td class='isi_laporan'>$row->tgl_spb</td>
	  <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKas('$row->no_kas','$row->kode_lokasi');\">$row->no_kas</a>";
		echo "</td>
	 <td class='isi_laporan'>$row->tgl_kas</td>
	 
	  <td class='isi_laporan'>$row->kode_bank</td>
	  <td class='isi_laporan' align='center'>$row->posted</td>
	  <td class='isi_laporan'  align='center' >";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenDok('$row->no_aju','$row->kode_lokasi');\">$row->jum_dok</a>";
		echo "</td>
	   </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='header_laporan' align='center' colspan='10'>Total</td>
	  <td class='header_laporan' align='right'>".number_format($bruto,0,",",".")."</td>
	  <td class='header_laporan' align='right'>".number_format($npajak,0,",",".")."</td>
	  <td class='header_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
	  <td class='header_laporan' align='center' colspan='13'>&nbsp;</td>
    </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>