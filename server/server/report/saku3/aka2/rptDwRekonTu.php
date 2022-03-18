<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_aka2_rptDwRekonTu extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		
		$sql="select count(*)
			from exs_aka_rekon a
			inner join aka_mahasiswa b on a.nim=b.nim and a.kode_lokasi=b.kode_lokasi 
			inner join aka_jurusan c on b.kode_jur=c.kode_jur and b.kode_lokasi=c.kode_lokasi 
			inner join aka_fakultas d on c.kode_fakultas=d.kode_fakultas and c.kode_lokasi=d.kode_lokasi 
			inner join exs_aka_bill e on a.no_inv=e.no_inv and a.kode_lokasi=e.kode_lokasi
			left join exs_aka_rekon_batal f on a.no_rekon=f.no_rekon and a.no_inv=f.no_inv and a.kode_lokasi=f.kode_lokasi
			$this->filter
		";
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
		$nama_file="rekon_mhs_".$periode.".xls";

		if($pbtl == "Ya"){
				$filterbtl = " and isnull(f.no_rekon,'-') <> '-' ";
		}else{
				$filterbtl = " and isnull(f.no_rekon,'-') = '-' ";
		}

		$sql="select a.no_rekon,a.no_inv,a.nim,b.nama,c.nama as nama_jur,c.kode_fakultas,d.nama as nama_fak,e.tahunaka,
			   a.n1 as bpp,a.n2 as bppnp,a.n3 as sdp2,a.n4 as up3,a.n5 as sks,a.n6 as perpus,a.n7 as denda,a.n8 as ustatus,
			   a.n9 as asur,a.n10 as pddk_lain,a.total,
			   isnull(f.no_rekon,'-') as no_batal
		from exs_aka_rekon a
		inner join aka_mahasiswa b on a.nim=b.nim and a.kode_lokasi=b.kode_lokasi 
		inner join aka_jurusan c on b.kode_jur=c.kode_jur and b.kode_lokasi=c.kode_lokasi 
		inner join aka_fakultas d on c.kode_fakultas=d.kode_fakultas and c.kode_lokasi=d.kode_lokasi 
		inner join exs_aka_bill e on a.no_inv=e.no_inv and a.kode_lokasi=e.kode_lokasi
		left join exs_aka_rekon_batal f on e.no_inv=f.no_inv and e.kode_lokasi=f.kode_lokasi
		$this->filter $filterbtl
		order by a.nim,a.no_rekon
		";
		
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
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1500'>
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
			<td class='isi_laporan'>$row->kode_fakultas - $row->nama_fak</td>
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
  
