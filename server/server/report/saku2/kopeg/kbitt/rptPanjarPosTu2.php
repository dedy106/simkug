<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_kbitt_rptPanjarPosTu2 extends server_report_basic
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
		$jenis=$tmp[1];
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$nama_file="panjar_".$periode.".xls";
		
		$sql="select a.kode_lokasi,a.no_aju,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.keterangan,a.kode_pp,b.nama as nama_pp,a.nilai,k.jenis,
	   a.no_kas,date_format(c.tanggal,'%d/%m/%Y') as tgl_kas,c.nilai as nilai_kas,
	   a.no_ver,date_format(d.tanggal,'%d/%m/%Y') as tgl_ver,
	   a.no_fiat,date_format(e.tanggal,'%d/%m/%Y') as tgl_fiat,
	   case when f.status='1' then 'Ok' else f.status end as sts_ver,f.catatan as cat_ver,
	   case when g.status='2' then 'Ok' else g.status end as sts_fiat,g.catatan as cat_fiat,
	   a.nik_panjar,h.nama as nama_panjar,c.kode_bank,a.no_app,
	   a.no_app,date_format(k.tgl_input,'%d/%m/%Y') as tgl_app1,date_format(k.tgl_aju,'%d/%m/%Y') as tgl_app,
	   a.no_spb,date_format(l.tgl_input,'%d/%m/%Y') as tgl_spb,
	   isnull(n.jum_dok,0) as jum_dok
from it_aju_m a
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
left join kas_m c on a.no_kas=c.no_kas and a.kode_lokasi=c.kode_lokasi
left join ver_m d on a.no_ver=d.no_ver and a.kode_lokasi=d.kode_lokasi
left join ver_d f on d.no_ver=f.no_ver and d.kode_lokasi=f.kode_lokasi
left join fiat_m e on a.no_fiat=e.no_fiat and a.kode_lokasi=e.kode_lokasi
left join fiat_d g on e.no_fiat=g.no_fiat and e.kode_lokasi=g.kode_lokasi
inner join karyawan h on a.nik_panjar=h.nik and a.kode_lokasi=h.kode_lokasi
left join it_ajuapp_m k on a.no_aju=k.no_aju and a.kode_lokasi=k.kode_lokasi and a.no_app=k.no_app
left join it_spb_m l on a.no_spb=l.no_spb and a.kode_lokasi=l.kode_lokasi
left join (select no_bukti, kode_lokasi,count(no_gambar) as jum_dok 
from it_aju_dok
group by no_bukti,kode_lokasi) n on a.kode_lokasi=n.kode_lokasi and a.no_aju=n.no_bukti
$this->filter order by a.no_aju";

// echo $sql;
		
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
		echo $AddOnLib->judul_laporan("posisi pengajuan panjar",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='2000'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='100'  align='center' class='header_laporan'>No Agenda</td>
	 <td width='60'  align='center' class='header_laporan'>Tanggal</td>
	 <td width='60'  align='center' class='header_laporan'>NIK</td>
	  <td width='150'  align='center' class='header_laporan'>Nama</td>
	 <td width='60'  align='center' class='header_laporan'>Kode PP</td>
	 <td width='150'  align='center' class='header_laporan'>Nama PP</td>
   <td width='200'  align='center' class='header_laporan'>Keterangan</td>
	 <td width='90'  align='center' class='header_laporan'>Nilai</td>
	 <td width='90'  align='center' class='header_laporan'>No Dok</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl Dok</td>
	 <td width='60'  align='center' class='header_laporan'>Jenis Dok Fisik</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl Input Agenda</td>
	 <td width='90'  align='center' class='header_laporan'>No Ver Dok</td>
	 <td width='90'  align='center' class='header_laporan'>Tgl Ver Dok</td>
	  <td width='40'  align='center' class='header_laporan'>Status Ver Dok</td>
	 <td width='150'  align='center' class='header_laporan'>Keterangan Ver Dok</td>
	  <td width='90'  align='center' class='header_laporan'>No Ver Akun</td>
	 <td width='90'  align='center' class='header_laporan'>Tgl Ver Akun</td>
	  <td width='40'  align='center' class='header_laporan'>Status Ver Akun</td>
	 <td width='150'  align='center' class='header_laporan'>Keterangan Ver Akun</td>
	 <td width='90'  align='center' class='header_laporan'>No SPB</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl SPB</td>
	 <td width='90'  align='center' class='header_laporan'>No KasBank</td>
	 <td width='90'  align='center' class='header_laporan'>Tgl KasBank</td>
	 <td width='90'  align='center' class='header_laporan'>Jenis Bayar</td>
	 <td width='60'  align='center' class='header_laporan'>Jumlah Dokumen</td>
	  </tr>  ";
		$nilai=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai=$nilai+$row->nilai;
			
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBukti('$row->no_aju','$row->kode_lokasi');\">$row->no_aju</a>";
		echo "</td>
	 <td class='isi_laporan'>$row->tgl</td>
	 <td class='isi_laporan'>$row->nik_panjar</td>
	 <td class='isi_laporan'>$row->nama_panjar</td>
	 <td class='isi_laporan'>$row->kode_pp</td>
	 <td class='isi_laporan'>$row->nama_pp</td>
	 <td class='isi_laporan'>$row->keterangan</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
	 <td class='isi_laporan'>$row->no_app</td>
	 <td class='isi_laporan'>$row->tgl_app1</td>
	 <td class='isi_laporan'>$row->jenis</td>
	 <td class='isi_laporan'>$row->tgl_app</td>
	 <td class='isi_laporan'>$row->no_ver</td>
	 <td class='isi_laporan'>$row->tgl_ver</td>
	  <td class='isi_laporan' align='center'>$row->sts_ver</td>
	   <td class='isi_laporan'>$row->cat_ver</td>
	 <td class='isi_laporan'>$row->no_fiat</td>
	 <td class='isi_laporan'>$row->tgl_fiat</td>
	  <td class='isi_laporan' align='center'>$row->sts_fiat</td>
	   <td class='isi_laporan'>$row->cat_fiat</td>
	
		 <td class='isi_laporan'>";
		 echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenSpb('$row->no_spb','$row->kode_lokasi');\">$row->no_spb</a>";
		echo "</td>
	   <td class='isi_laporan'>$row->tgl_spb</td>
	  <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKas('$row->no_kas','$row->kode_lokasi');\">$row->no_kas</a>";
		echo "</td>
	 <td class='isi_laporan'>$row->tgl_kas</td>
	 
	  <td class='isi_laporan'>$row->kode_bank</td>
	  <td class='isi_laporan'  align='center' >";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenDok('$row->no_aju','$row->kode_lokasi');\">$row->jum_dok</a>";
		echo "</td>
	   </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='isi_laporan' align='center' colspan='7'>Total</td>
	  <td class='isi_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
	  <td class='isi_laporan' align='center' colspan='10'>&nbsp;</td>
    </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
