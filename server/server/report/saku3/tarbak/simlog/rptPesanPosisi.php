<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_tarbak_simlog_rptPesanPosisi extends server_report_basic
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
		a.kode_drk,l.no_spk,isnull(convert(varchar,l.tanggal,103),'-') as tgl_spk,p.no_terima,isnull(convert(varchar,p.tanggal,103),'-') as tgl_terima,
		q.no_hutang,isnull(convert(varchar,q.tanggal,103),'-') as tgl_hutang,
		r.no_pb,isnull(convert(varchar,r.tanggal,103),'-') as tgl_pb,isnull(l.kode_vendor,'-') as kode_vendor,isnull(o.nama,'-') as nama_vendor
        from log_pesan_m a
        inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
        left join log_spk_m l on a.no_pesan=l.no_pesan and a.kode_lokasi=l.kode_lokasi
        left join log_terima_m p on l.no_spk=p.no_po and l.kode_lokasi=p.kode_lokasi
        left join hutang_m q on l.no_spk=q.no_dokumen and l.kode_lokasi=q.kode_lokasi
        left join pbh_pb_m r on q.no_hutang=r.no_hutang and q.kode_lokasi=r.kode_lokasi
        left join vendor o on l.kode_vendor=o.kode_vendor and l.kode_lokasi=o.kode_lokasi
        $this->filter  order by a.no_pesan";
		
		$rs = $dbLib->execute($sql);	
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("posisi justifikasi pengadaan",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='900'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
	
     <td width='100'  align='center' class='header_laporan'>No Bukti</td>
	 <td width='60'  align='center' class='header_laporan'>Tanggal</td>
	 <td width='60'  align='center' class='header_laporan'>Kode PP</td>
	 <td width='150'  align='center' class='header_laporan'>Nama PP</td>
     <td width='200'  align='center' class='header_laporan'>Keterangan</td>
	 <td width='90'  align='center' class='header_laporan'>Nilai</td>
	 <td width='150'  align='center' class='header_laporan'>Vendor</td>
	 <td width='90'  align='center' class='header_laporan'>No SPK</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl SPK</td>
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
			
			$nilai=$nilai+$row->nilai;
			
		echo "<tr >
     <td class='isi_laporan' align='center'>".$i."</td>
	
      <td class='isi_laporan'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenPesan('$row->no_pesan','$row->kode_lokasi');\">".$row->no_pesan."</a></td>
	 <td class='isi_laporan'>".$row->tgl."</td>
	 <td class='isi_laporan'>".$row->kode_pp."</td>
	 <td class='isi_laporan'>".$row->nama_pp."</td>
	 <td class='isi_laporan'>".$row->keterangan."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
	   <td class='isi_laporan'>$row->nama_vendor</td>
	   <td class='isi_laporan'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenSpk('$row->no_spk','$row->kode_lokasi');\">$row->no_spk</a></td>
	  <td class='isi_laporan'>$row->tgl_spk</td>
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
    
	  <td class='header_laporan' align='center' colspan='6'>Total</td>
	  <td class='header_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
	  <td class='header_laporan' align='center' colspan='9'>&nbsp;</td>
    </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
