<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_kb_rptTitipPos extends server_report_basic
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
		$sql="select a.kode_lokasi,a.no_aju,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.keterangan,a.kode_pp,b.nama as nama_pp,a.nilai,a.kode_drk,j.nama as nama_drk,
	   a.no_kas,date_format(c.tanggal,'%d/%m/%Y') as tgl_kas,c.nilai as nilai_kas,
	   a.no_ver,date_format(d.tanggal,'%d/%m/%Y') as tgl_ver,
	   a.no_fiat,date_format(e.tanggal,'%d/%m/%Y') as tgl_fiat,
	   case when f.status='1' then 'Ok' else f.status end as sts_ver,f.catatan as cat_ver,
	   case when g.status='2' then 'Ok' else g.status end as sts_fiat,g.catatan as cat_fiat,
	   c.kode_bank,a.kode_akun,h.nama as nama_akun,isnull(i.no_ju,'-') as no_ju,
	   a.no_app,date_format(k.tgl_input,'%d/%m/%Y') as tgl_app,l.no_kas as no_titip,m.nama as nama_vendor
from it_aju_m a
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
left join kas_m c on a.no_kas=c.no_kas and a.kode_lokasi=c.kode_lokasi
left join ver_m d on a.no_ver=d.no_ver and a.kode_lokasi=d.kode_lokasi
left join ver_d f on d.no_ver=f.no_ver and d.kode_lokasi=f.kode_lokasi
left join fiat_m e on a.no_fiat=e.no_fiat and a.kode_lokasi=e.kode_lokasi
left join fiat_d g on e.no_fiat=g.no_fiat and e.kode_lokasi=g.kode_lokasi
inner join masakun h on a.kode_akun=h.kode_akun and a.kode_lokasi=h.kode_lokasi
left join ju_m i on a.no_fiat=i.no_dokumen and a.kode_lokasi=i.kode_lokasi and i.modul='KBITT'
left join drk j on a.kode_drk=j.kode_drk and a.kode_lokasi=j.kode_lokasi and j.tahun='$tahun'
left join it_ajuapp_m k on a.no_aju=k.no_aju and a.kode_lokasi=k.kode_lokasi and a.no_app=k.no_app
left join kas_titip_d l on a.no_aju=l.no_aju and a.kode_lokasi=l.kode_lokasi
left join it_vendor m on l.kode_vendor=m.kode_vendor and l.kode_lokasi=m.kode_lokasi
$this->filter order by a.no_aju";
		
		$rs = $dbLib->execute($sql);	
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("posisi pertanggungan titipan",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1800'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='100'  align='center' class='header_laporan'>No Agenda</td>
	 <td width='60'  align='center' class='header_laporan'>Tanggal</td>
	 <td width='80'  align='center' class='header_laporan'>No Titipan</td>
	 <td width='150'  align='center' class='header_laporan'>Vendor</td>
	 <td width='60'  align='center' class='header_laporan'>Kode PP</td>
	 <td width='150'  align='center' class='header_laporan'>Nama PP</td>
	 <td width='60'  align='center' class='header_laporan'>Kode Akun</td>
	 <td width='150'  align='center' class='header_laporan'>Nama Akun</td>
	  <td width='60'  align='center' class='header_laporan'>Kode DRK</td>
	 <td width='150'  align='center' class='header_laporan'>Nama DRK</td>
   <td width='200'  align='center' class='header_laporan'>Keterangan</td>
	 <td width='90'  align='center' class='header_laporan'>Nilai</td>
	  <td width='90'  align='center' class='header_laporan'>No Dok</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl Dok</td>
	 <td width='90'  align='center' class='header_laporan'>No Ver</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl Ver</td>
	  <td width='40'  align='center' class='header_laporan'>Status Ver</td>
	 <td width='150'  align='center' class='header_laporan'>Keterangan Ver</td>
	  <td width='90'  align='center' class='header_laporan'>No Fiat</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl Fiat</td>
	  <td width='40'  align='center' class='header_laporan'>Status Fiat</td>
	   <td width='150'  align='center' class='header_laporan'>Keterangan Fiat</td>
	    <td width='90'  align='center' class='header_laporan'>No BYMHD</td>
	 <td width='90'  align='center' class='header_laporan'>No KasBank</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl KasBank</td>
	 <td width='90'  align='center' class='header_laporan'>Jenis Bayar</td>
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
	 <td class='isi_laporan'>$row->no_titip</td>
	 <td class='isi_laporan'>$row->nama_vendor</td>
	 <td class='isi_laporan'>$row->kode_pp</td>
	 <td class='isi_laporan'>$row->nama_pp</td>
	  <td class='isi_laporan'>$row->kode_akun</td>
	 <td class='isi_laporan'>$row->nama_akun</td>
	  <td class='isi_laporan'>$row->kode_drk</td>
	 <td class='isi_laporan'>$row->nama_drk</td>
	 <td class='isi_laporan'>$row->keterangan</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
	 <td class='isi_laporan'>$row->no_app</td>
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
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenJu('$row->no_ju','$row->kode_lokasi');\">$row->no_ju</a>";
		echo "</td>
	  <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKas('$row->no_kas','$row->kode_lokasi');\">$row->no_kas</a>";
		echo "</td>
	 <td class='isi_laporan'>$row->tgl_kas</td>
	  <td class='isi_laporan'>$row->kode_bank</td>
	   </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='header_laporan' align='center' colspan='10'>Total</td>
	  <td class='header_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
	  <td class='header_laporan' align='center' colspan='12'>&nbsp;</td>
    </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
