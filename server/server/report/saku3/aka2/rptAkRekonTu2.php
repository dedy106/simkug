<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_aka2_rptAkRekonTu2 extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		
		$sql="select 1 ";
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);		
		}
		error_log($this->rows."/".$count."/".$totPage);
		return $totPage;
	}
	function getHtml()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$periode=$tmp[0];
		$jenis=$tmp[1];
		$kode_lokasi=$tmp[2];
        $pbtl=$tmp[3];
        $filter3=$tmp[4];
		$nama_file="rekon_mhs_".$periode.".xls";

		if($pbtl == "Ya"){
				$filterbtl = " and isnull(b.no_batal,'-') <> '-' ";
		}else{
				$filterbtl = " and isnull(b.no_batal,'-') = '-' ";
		}

$sql="select a.no_rekon,a.keterangan,b.nim,c.nama,c.kode_jur,d.nama as nama_jur,c.kode_fakultas,e.nama as nama_fakultas, isnull(b.bpp,0) as bpp,isnull(b.BPNP,0) as bpnp,isnull(b.sdp2,0) as sdp2,isnull(b.up3,0) as up3 ,isnull(b.sks,0) as sks,isnull(b.perpus,0) as perpus, isnull(b.asur,0) as asur,isnull(b.nilai,0) as total,isnull(b.batal,0) as batal,isnull(b.no_batal,'-') as no_batal,isnull(b.pddk_lain,0) as pddk_lain,isnull(b.denda,0) as denda,isnull(b.ustatus,0) as ustatus,c.kode_akt,f.tahunaka 
from aka_rekon_m a 
inner join (select c.nim,a.no_inv,a.no_rekon,c.kode_lokasi, 
			sum(case when a.kode_produk in ('BPPP') then a.nilai else 0 end) as bpp, 
			sum(case when a.kode_produk in ('BPPNP') then a.nilai else 0 end) as bpnp, 
			sum(case when a.kode_produk in ('SDP2') then a.nilai else 0 end) as sdp2, 
			sum(case when a.kode_produk in ('UP3') then a.nilai else 0 end) as up3, 
			sum(case when a.kode_produk in ('SKS') then a.nilai else 0 end) as sks, 
			sum(case when a.kode_produk in ('PERPUS') then a.nilai else 0 end) as perpus, 
			sum(case when a.kode_produk in ('ASUR') then a.nilai else 0 end) as asur, 
			sum(case when a.kode_produk in ('USTATUS') then a.nilai else 0 end) as ustatus, 
			sum(case when a.kode_produk in ('DENDA') then a.nilai else 0 end) as denda, 			
			sum(case when a.kode_produk in ('BADM','DHER','REMD','WISD') then a.nilai else 0 end) as pddk_lain, isnull(h.no_rekon,'-') as no_batal,
			isnull(h.batal,0) as batal, 
			
			sum(a.nilai) as nilai 
			from aka_rekon_d a 
			inner join aka_mahasiswa c on a.nim=c.nim and a.kode_lokasi=c.kode_lokasi 
			inner join aka_jurusan d on c.kode_jur=d.kode_jur and c.kode_lokasi=d.kode_lokasi 
			inner join aka_tahunaka f on a.periode=f.periode and a.kode_lokasi=f.kode_lokasi 
			
			left join (
				select no_inv,no_rekon,kode_lokasi,sum(case dc when 'C' then nilai else -nilai end) as batal
				from aka_rekon_d 	
				where modul = 'BATAL' and kode_lokasi='$kode_lokasi' group by no_inv,no_rekon,kode_lokasi
			 ) h on a.no_inv=h.no_inv and a.kode_lokasi=h.kode_lokasi 
			 
			$filter3
			group by c.nim,a.no_rekon,c.kode_lokasi,a.no_inv,h.no_rekon,isnull(h.batal,0) )b on a.no_rekon=b.no_rekon and a.kode_lokasi=b.kode_lokasi 
			
inner join aka_mahasiswa c on b.nim=c.nim and b.kode_lokasi=c.kode_lokasi 
inner join aka_jurusan d on c.kode_jur=d.kode_jur and c.kode_lokasi=d.kode_lokasi 
inner join aka_fakultas e on d.kode_fakultas=e.kode_fakultas and d.kode_lokasi=e.kode_lokasi 
inner join aka_tahunaka f on a.periode=f.periode and a.kode_lokasi=f.kode_lokasi 
$this->filter $filterbtl order by b.nim,a.no_rekon";
 
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
		}

		$rs = $dbLib->execute($sql);
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("rekon tagihan mahasiswa",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' >
  <tr bgcolor='#CCCCCC'>
    <td width='30' align='center' class='header_laporan'>No</td>
	 <td width='100' align='center' class='header_laporan'>No Rekon</td>
	 <td width='100' align='center' class='header_laporan'>No Batal</td>
	 <td width='60' align='center' class='header_laporan'>NIM</td>
	<td width='200' align='center' class='header_laporan'>Nama</td>
	<td width='60' align='center' class='header_laporan'>Tahun Akademik</td>
    <td width='140' align='center' class='header_laporan'>Fakultas</td>
	<td width='140' align='center' class='header_laporan'>Jurusan</td>
	 <td width='150' align='center' class='header_laporan'>Keterangan</td>
    <td width='75' align='center' class='header_laporan'>BPPP</td>
    <td width='75' align='center' class='header_laporan'>BPNP</td>
    <td width='75' align='center' class='header_laporan'>SDP2</td>
    <td width='75' align='center' class='header_laporan'>UP3</td>
	<td width='75' align='center' class='header_laporan'>SKS</td>
	<td width='75' align='center' class='header_laporan'>PERPUS</td>
	<td width='75' align='center' class='header_laporan'>DENDA</td>
	<td width='75' align='center' class='header_laporan'>USTATUS</td>
	<td width='75' align='center' class='header_laporan'>ASUR</td>
	<td width='75' align='center' class='header_laporan'>PDDK Lainnya</td>
	 <td width='90' align='center' class='header_laporan'>Total</td>
   
  </tr>";
		$bpp=0;$sdp2=0;$up3=0;$sks=0;$total=0;$pddk_lain=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			
			$bpp=$bpp+$row->bpp;
			$bpnp=$bpnp+$row->bpnp;
			$sdp2=$sdp2+$row->sdp2;
			$up3=$up3+$row->up3;
			$sks=$sks+$row->sks;
			$perpus=$perpus+$row->perpus;
			$asur=$asur+$row->asur;
			$ustatus=$ustatus+$row->ustatus;
			$denda=$denda+$row->denda;
			$pddk_lain=$pddk_lain+$row->pddk_lain;

			$total=$total+$row->total;
			$rtotal=$row->total;
			
		
			echo "<tr>
   <td class='isi_laporan' align='center'>$i</td>
  		<td class='isi_laporan'>$row->no_rekon</td>
  		<td class='isi_laporan'>$row->no_batal</td>
			
			<td class='isi_laporan'>$row->nim</td>
			<td class='isi_laporan'>$row->nama</td>
			<td class='isi_laporan'>$row->tahunaka</td>
			<td class='isi_laporan'>$row->kode_fakultas - $row->nama_fakultas</td>
			<td class='isi_laporan'>$row->kode_jur - $row->nama_jur</td>
			<td class='isi_laporan'>$row->keterangan</td>
    <td class='isi_laporan' align='right'>".number_format($row->bpp,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->bpnp,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->sdp2,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->up3,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->sks,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->perpus,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->denda,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->ustatus,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->asur,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->pddk_lain,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($rtotal,0,",",".")."</td>
  
  </tr>";	 
			$i=$i+1;
		}
		echo "<tr>
   <td class='isi_laporan' align='center' colspan='9'>Total</td>
   
   <td class='isi_laporan' align='right'>".number_format($bpp,0,",",".")."</td>
   <td class='isi_laporan' align='right'>".number_format($bpnp,0,",",".")."</td>
   <td class='isi_laporan' align='right'>".number_format($sdp2,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($up3,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($sks,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($perpus,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($denda,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($ustatus,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($asur,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($pddk_lain,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($total,0,",",".")."</td>
 
  </tr>";	 
		echo "</table></div>";
		return "";
	}
	
}
?>
  
