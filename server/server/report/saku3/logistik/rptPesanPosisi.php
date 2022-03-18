<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_logistik_rptPesanPosisi extends server_report_basic
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
		$sql="select  a.kode_lokasi,a.no_pesan,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.keterangan,a.kode_pp,b.nama as nama_pp,a.nilai,
		a.kode_drk,d.nama as nama_drk,a.kode_akun,c.nama as nama_akun,a.no_app,a.no_terima,a.no_spph,i.no_sph,i.no_nego,k.no_tap,k.no_spk,l.no_pks,
		date_format(e.tanggal,'%d/%m/%Y') as tgl_app,date_format(f.tanggal,'%d/%m/%Y') as tgl_terima,date_format(g.tanggal,'%d/%m/%Y') as tgl_spph,
		date_format(i.tanggal,'%d/%m/%Y') as tgl_sph,date_format(j.tanggal,'%d/%m/%Y') as tgl_nego,date_format(k.tanggal,'%d/%m/%Y') as tgl_tap,
		date_format(l.tanggal,'%d/%m/%Y') as tgl_spk,date_format(m.tanggal,'%d/%m/%Y') as tgl_pks,
		n.no_sanggup,date_format(n.tanggal,'%d/%m/%Y') as tgl_sanggup,o.nama as nama_vendor,
		p.no_terima,date_format(p.tanggal,'%d/%m/%Y') as tgl_terima,
		q.no_hutang,date_format(q.tanggal,'%d/%m/%Y') as tgl_hutang,
		r.no_pb,date_format(r.tanggal,'%d/%m/%Y') as tgl_pb,
		case when f.jenis='TL' then 'Penunjukan Langsung' 
			 when f.jenis='PL' then 'Pemilihan Langsung'
			 else '-' end as jenis
from log_pesan_m a
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi
inner join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi
left join app_m e on a.no_app=e.no_app and a.kode_lokasi=e.kode_lokasi
left join log_justerima_m f on a.no_terima=f.no_terima and a.kode_lokasi=f.kode_lokasi
left join log_spph_m g on a.no_spph=g.no_spph and a.kode_lokasi=g.kode_lokasi
left join log_spph_vendor h on g.no_spph=h.no_spph and g.kode_lokasi=h.kode_lokasi
left join vendor o on h.kode_vendor=o.kode_vendor and h.kode_lokasi=o.kode_lokasi
left join log_sph_m i on h.no_sph=i.no_sph and h.kode_lokasi=i.kode_lokasi
left join log_nego_m j on i.no_nego=j.no_nego and i.kode_lokasi=j.kode_lokasi
left join log_tap_m k on j.no_tap=k.no_tap and j.kode_lokasi=k.kode_lokasi
left join log_spk_m l on k.no_spk=l.no_spk and k.kode_lokasi=l.kode_lokasi
left join log_pks_m m on l.no_pks=m.no_pks and l.kode_lokasi=m.kode_lokasi
left join log_sanggup_m n on l.no_sanggup=n.no_sanggup and l.kode_lokasi=n.kode_lokasi
left join log_terima_m p on l.no_spk=p.no_po and l.kode_lokasi=p.kode_lokasi
left join hutang_m q on l.no_spk=q.no_dokumen and l.kode_lokasi=q.kode_lokasi
left join yk_pb_m r on q.no_hutang=r.no_hutang and q.kode_lokasi=r.kode_lokasi
$this->filter  order by a.no_pesan";
		
		$rs = $dbLib->execute($sql);	
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("posisi justifikasi pengadaan",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='2500'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
	
     <td width='100'  align='center' class='header_laporan'>No Bukti</td>
	 <td width='60'  align='center' class='header_laporan'>Tanggal</td>
	 <td width='60'  align='center' class='header_laporan'>Kode PP</td>
	 <td width='150'  align='center' class='header_laporan'>Nama PP</td>
	 <td width='60'  align='center' class='header_laporan'>Kode Akun</td>
	 <td width='150'  align='center' class='header_laporan'>Nama Akun</td>
	  <td width='60'  align='center' class='header_laporan'>Kode DRK</td>
	 <td width='150'  align='center' class='header_laporan'>Nama DRK</td>
   <td width='200'  align='center' class='header_laporan'>Keterangan</td>
	 <td width='90'  align='center' class='header_laporan'>Nilai</td>
	  <td width='90'  align='center' class='header_laporan'>Approve Anggaran</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl Approve</td>
	 <td width='90'  align='center' class='header_laporan'>Approve Justifikasi</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl Approve</td>
	  <td width='100'  align='center' class='header_laporan'>Jenis</td>
	  <td width='90'  align='center' class='header_laporan'>No SPPH</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl SPPH</td>
	 <td width='150'  align='center' class='header_laporan'>Vendor</td>
	  <td width='90'  align='center' class='header_laporan'>No SPH</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl SPH</td>
	  <td width='90'  align='center' class='header_laporan'>Klarifikasi & Negosiasi</td>
	   <td width='60'  align='center' class='header_laporan'>Tgl Klarifikasi</td>
	    <td width='90'  align='center' class='header_laporan'>Penetapan Pemenang</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl Penetapan</td>
	 <td width='90'  align='center' class='header_laporan'>Penerbitan SPK</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl SPK</td>
	 <td width='90'  align='center' class='header_laporan'>Kesanggupan</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl Kesanggupan</td>
	 <td width='90'  align='center' class='header_laporan'>Penerbitan PKS</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl PKS</td>
	 <td width='90'  align='center' class='header_laporan'>Penerimaan Barang</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl Terima</td>
	 <td width='90'  align='center' class='header_laporan'>BAST</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl BAST</td>
	 <td width='90'  align='center' class='header_laporan'>Permohonan Bayar</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl Permohonan</td>
	  </tr>  ";
		$nilai=0;
		$first = true;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$beda = $tmp!=$row->no_pesan; 
			if ($tmp!=$row->no_pesan)
			{
				$tmp=$row->no_pesan;
				$first = true;
				
				if ($i>1)
				{
					$i=1;
					$nilai=0;
					echo "<tr >
	  <td class='header_laporan' align='center' colspan='10'>Total</td>
	  <td class='header_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
	  <td class='header_laporan' align='center' colspan='12'>&nbsp;</td>
    </tr>";
				}
				
			}
			echo $nilai;
			$nilai=$nilai+$row->nilai;
			
		echo "<tr >
     <td class='isi_laporan' align='center'>".($beda && $first? $i:"")."</td>
	
      <td class='isi_laporan'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenPesan('$row->no_pesan','$row->kode_lokasi');\">".($beda && $first? $row->no_pesan:"")."</a></td>
	 <td class='isi_laporan'>".($beda && $first? $row->tgl:"")."</td>
	 <td class='isi_laporan'>".($beda && $first? $row->kode_pp:"")."</td>
	 <td class='isi_laporan'>".($beda && $first? $row->nama_pp:"")."</td>
	  <td class='isi_laporan'>".($beda && $first? $row->kode_akun:"")."</td>
	 <td class='isi_laporan'>".($beda && $first? $row->nama_akun:"")."</td>
	  <td class='isi_laporan'>".($beda && $first? $row->kode_drk:"")."</td>
	 <td class='isi_laporan'>".($beda && $first? $row->nama_drk:"")."</td>
	 <td class='isi_laporan'>".($beda && $first? $row->keterangan:"")."</td>
	 <td class='isi_laporan' align='right'>".($beda && $first? number_format($row->nilai,0,",","."):"")."</td>
	 <td class='isi_laporan'>".($beda && $first? $row->no_app:"")."</td>
	 <td class='isi_laporan'>".($beda && $first? $row->tgl_app:"")."</td>
	 <td class='isi_laporan'>".($beda && $first? $row->no_terima:"")."</td>
	 <td class='isi_laporan'>".($beda && $first? $row->tgl_terima:"")."</td>
	   <td class='isi_laporan' >".($beda && $first? $row->jenis:"")."</td>
	  <td class='isi_laporan'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenSpph('$row->no_spph','$row->kode_lokasi');\">".($beda && $first? $row->no_spph:"")."</a></td>
	   <td class='isi_laporan'>".($beda && $first? $row->tgl_spph:"")."</td>
	   <td class='isi_laporan'>$row->nama_vendor</td>
	 <td class='isi_laporan'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenSph('$row->no_sph','$row->kode_lokasi');\">$row->no_sph</a></td>
	 <td class='isi_laporan'>$row->tgl_sph</td>
	  <td class='isi_laporan'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenNego('$row->no_nego','$row->kode_lokasi');\">$row->no_nego</a></td>
	  <td class='isi_laporan'>$row->tgl_nego</td>
	   <td class='isi_laporan'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenPenetapan('$row->no_tap','$row->kode_lokasi');\">$row->no_tap</a></td>
	  <td class='isi_laporan'>$row->tgl_tap</td>
	   <td class='isi_laporan'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenSpk('$row->no_spk','$row->kode_lokasi');\">$row->no_spk</a></td>
	  <td class='isi_laporan'>$row->tgl_spk</td>
	  <td class='isi_laporan'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenSanggup('$row->no_sanggup','$row->kode_lokasi');\">$row->no_sanggup</a></td>
	  <td class='isi_laporan'>$row->tgl_sanggup</td>
	  <td class='isi_laporan'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenPks('$row->no_pks','$row->kode_lokasi');\">$row->no_pks</a></td>
	  <td class='isi_laporan'>$row->tgl_pks</td>
	  <td class='isi_laporan'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTerima('$row->no_terima','$row->kode_lokasi');\">$row->no_terima</a></td>
	  <td class='isi_laporan'>$row->tgl_terima</td>
	  <td class='isi_laporan'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenHutang('$row->no_hutang','$row->kode_lokasi');\">$row->no_hutang</a></td>
	  <td class='isi_laporan'>$row->tgl_hutang</td>
	  <td class='isi_laporan'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenPb('$row->no_pb','$row->kode_lokasi');\">$row->no_pb</a></td>
	  <td class='isi_laporan'>$row->tgl_pb</td>
	   </tr>";
			$i=$i+1;
			$first = true;
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
