<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_ppbs_rptAggUsulanRekap extends server_report_basic
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
		$tahun=$tmp[1];
		$kode_pp=$tmp[2];
		$nik_user=$tmp[3];
		$jenis=$tmp[4];
		$nama_file="rkm_".$tahun.".xls";
		$sql="select a.kode_pp,a.nama from agg_pp a 
			  $this->filter
			  order by a.kode_pp";
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
		}
		$rs2 = $dbLib->execute($sql);
		while ($row2 = $rs2->FetchNextObject($toupper=false))
		{
			$sql="exec sp_agg_usulan_rekap '$nik_user','$kode_lokasi','$tahun','$row2->kode_pp'";
			
			$rs = $dbLib->execute($sql);
			$sql="select a.kode_lokasi,b.tahun,a.kode_pp,a.kode_drk,d.kode_rkm,e.kode_program,a.kode_akun,
		   a.keterangan,a.satuan,a.tarif,ISNULL(a.vol,0) as vol,ISNULL(a.vol,0) as vol,ISNULL(a.total,0) as total,
		   b.nama as nama_pp,c.nama as nama_drk,d.nama as nama_rkm,e.nama as nama_program,f.nama as nama_akun
	from agg_usulan_rekap a
	inner join agg_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and a.tahun=b.tahun
	inner join agg_drk c on a.kode_drk=c.kode_drk and a.kode_lokasi=c.kode_lokasi and a.tahun=c.tahun
	inner join agg_rkm d on c.kode_rkm=d.kode_rkm and c.kode_lokasi=d.kode_lokasi and a.tahun=d.tahun
	inner join agg_program e on d.kode_program=e.kode_program and d.kode_lokasi=e.kode_lokasi and a.tahun=e.tahun
	inner join masakun f on a.kode_akun=f.kode_akun and a.kode_lokasi=f.kode_lokasi
	$this->filter and a.nik_user='$nik_user'
	order by a.kode_pp,b.tahun,a.kode_drk,d.kode_rkm,e.kode_program,a.kode_akun,a.keterangan
	";
	
			$rs = $dbLib->execute($sql);
			$AddOnLib=new server_util_AddOnLib();	
			$i=1;
			echo "<div align='center'>"; 
			echo $AddOnLib->judul_laporan("laporan rkm",$this->lokasi,"$row2->kode_pp - $row2->nama");
			echo "<table width='1600' border='1' cellspacing='0' cellpadding='0' class='kotak'>
	  <tr bgcolor='#CCCCCC' align='center'>
		<td width='30' class='header_laporan'>No</td>
		<td width='60' class='header_laporan'>Kode PP</td>
		<td width='150' class='header_laporan'>Nama PP</td>
		<td width='50' class='header_laporan'>Kode RKM</td>
		<td width='150' class='header_laporan'>Nama RKM</td>
		<td width='50' class='header_laporan'>Kode Prog</td>
		<td width='150' class='header_laporan'>Nama Prog</td>
		<td width='50' class='header_laporan'>Kode DRK</td>
		<td width='150' class='header_laporan'>Nama DRK</td>
		<td width='60' class='header_laporan'>Kode Akun</td>
		<td width='150'class='header_laporan'>Nama Akun</td>
		<td width='200' class='header_laporan'>Rincian Kegiatan</td>
		<td width='80' class='header_laporan'>Satuan</td>
		
		<td width='50' class='header_laporan'>Volume</td>
		<td width='90' class='header_laporan'>Harga Satuan</td>
		<td width='90' class='header_laporan'>Jumlah Harga</td>
	  </tr> ";
			$total=0;
			while ($row = $rs->FetchNextObject($toupper=false))
			{
				$total+=$row->total;
			echo "<tr>
			<td class='isi_laporan' align='center'>$i</td>
		<td class='isi_laporan'>$row->kode_pp</td>
		<td class='isi_laporan'>$row->nama_pp</td>
		<td class='isi_laporan'>$row->kode_rkm</td>
		<td class='isi_laporan'>$row->nama_rkm</td>
		<td class='isi_laporan'>$row->kode_program</td>
		<td class='isi_laporan'>$row->nama_program</td>
		<td class='isi_laporan'>$row->kode_drk</td>
		<td class='isi_laporan'>$row->nama_drk</td>
		<td class='isi_laporan'>$row->kode_akun</td>
		<td class='isi_laporan'>$row->nama_akun</td>
		<td class='isi_laporan'>$row->keterangan</td>
		<td class='isi_laporan'>$row->satuan</td>
		<td class='isi_laporan' align='right'>".number_format($row->vol,0,",",".")."</td>
		<td class='isi_laporan' align='right'>".number_format($row->tarif,0,",",".")."</td>
		<td class='isi_laporan' align='right'>".number_format($row->total,0,",",".")."</td>
	  </tr>";
				$i=$i+1;
			}
			echo " <tr>
			<td class='isi_laporan' align='center' colspan='15'>Total</td>
		<td class='header_laporan' align='right'>".number_format($total,0,",",".")."</td>";
			echo "</table><br>";
		}
		echo "</div>";
		return "";
		
	}
	
}
?>
