<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_aka2_rptAkSaldoMhsTu2 extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$bentuk=$tmp[2];
		$sql="select 1 ";
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);		
		}
		//error_log($this->rows."/".$count."/".$totPage);
		return $totPage;
	}
	function getHtml()
	{
		global $dbLib;
		$tmp=explode("|",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$jenis=$tmp[2];
		$lap=$tmp[3];
		$sub_sql=$tmp[4];
		$nama_file="saldo_".$periode.".xls";
		$strperiode=$tmp[5];
		$sts=$tmp[6];
		$tahun=substr($periode,0,4);
		$mutasi="";
		if($jenis=="Tidak"){
			$mutasi=" and ( isnull(b.so_bpp1,0)<>0 or isnull(b.so_sdp2,0)<>0  or isnull(b.so_up3,0)<>0 or isnull(b.so_sks,0)<>0 or isnull(b.so_perpus,0)<>0 or isnull(b.so_lain,0)<>0 ) ";
		}else{
			$mutasi="";
		}

		$tagih="";
		if($sts== "TIDAK" OR $sts == "TERTAGIH"){
			$tagih=" and a.sts_tagih ='$sts' ";
		}else{
			$tagih="";
		}
		if ($lap=="Excell")
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
		$sql="select a.nim,a.nama,a.kode_jur,c.nama as nama_jurusan,a.kode_akt,
		isnull(b.so_bpp1,0) as so_bpp1,isnull(b.so_sdp2,0) as so_sdp2,isnull(b.so_up3,0) as so_up3,isnull(b.so_sks,0) as so_sks,
		isnull(b.so_perpus,0) as so_perpus,isnull(b.so_lain,0) as so_lain,isnull(b.so_total,0) as so_total
 from aka_mahasiswa a
 inner join aka_jurusan c on a.kode_jur=c.kode_jur and a.kode_lokasi=c.kode_lokasi
 inner join (select a.nim,a.kode_lokasi,
					sum(case when a.kode_produk in ('BPPP','BPPNP') then a.so_awal+isnull(b.nilai,0)-isnull(c.nilai,0)-isnull(d.nilai,0) else 0 end) as so_bpp1,
					sum(case when a.kode_produk in ('SDP2') then a.so_awal+isnull(b.nilai,0)-isnull(c.nilai,0)-isnull(d.nilai,0) else 0 end) as so_sdp2,
					sum(case when a.kode_produk in ('UP3') then a.so_awal+isnull(b.nilai,0)-isnull(c.nilai,0)-isnull(d.nilai,0) else 0 end) as so_up3,
					sum(case when a.kode_produk in ('SKS') then a.so_awal+isnull(b.nilai,0)-isnull(c.nilai,0)-isnull(d.nilai,0) else 0 end) as so_sks,
					sum(case when a.kode_produk in ('PERPUS','DENDA','USTATUS','ASUR') then a.so_awal+isnull(b.nilai,0)-isnull(c.nilai,0)-isnull(d.nilai,0) else 0 end) as so_perpus,
					sum(case when a.kode_produk in ('BADM','BEASISWA','DHER','REMD','WISD') then a.so_awal+isnull(b.nilai,0)-isnull(c.nilai,0)-isnull(d.nilai,0) else 0 end) as so_lain,
					sum(a.so_awal+isnull(b.nilai,0)-isnull(c.nilai,0)-isnull(d.nilai,0)) as so_total
			 from aka_glma_mhs a
			 left join (select a.nim,a.kode_lokasi,a.kode_produk,sum(case when a.dc='D' then a.nilai else -a.nilai end) as nilai
					 from aka_bill_d a
					 where a.kode_lokasi='$kode_lokasi' and a.periode<='$periode' and substring(a.periode,1,4)='$tahun' 
					 group by a.nim,a.kode_lokasi,a.kode_produk 
					   )b on a.nim=b.nim and a.kode_lokasi=b.kode_lokasi and a.kode_produk=b.kode_produk
			 left join (select a.nim,a.kode_lokasi,a.kode_produk,sum(case when a.dc='D' then a.nilai else -a.nilai end) as nilai
					 from aka_rekon_d a
					 where a.kode_lokasi='$kode_lokasi' and a.periode<='$periode' and substring(a.periode,1,4)='$tahun' 
					 group by a.nim,a.kode_lokasi,a.kode_produk 
					   )c on a.nim=c.nim and a.kode_lokasi=c.kode_lokasi and a.kode_produk=c.kode_produk
			 left join (select a.nim,a.kode_lokasi,a.kode_produk,sum(case when a.dc='D' then a.nilai else -a.nilai end) as nilai
					 from aka_batal_d a
					 where a.kode_lokasi='$kode_lokasi' and a.periode<='$periode' and substring(a.periode,1,4)='$tahun' 
					 group by a.nim,a.kode_lokasi,a.kode_produk 
					   )d on a.nim=d.nim and a.kode_lokasi=d.kode_lokasi and a.kode_produk=d.kode_produk
			 where a.kode_lokasi='$kode_lokasi' and a.tahun='$tahun'
			 group by a.nim,a.kode_lokasi
			)b on a.nim=b.nim and a.kode_lokasi=b.kode_lokasi
 $this->filter $mutasi
 order by a.nim
 ";
		//  echo $sql;

		$rs = $dbLib->execute($sql);
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("saldo piutang mahasiswa",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1200'>
  <tr align='center' bgcolor='#CCCCCC'>
    <td width='20'  class='header_laporan'>No</td>
    <td width='50'  class='header_laporan'>Kode</td>
	<td width='200'  class='header_laporan'>Nama Jurusan </td>
	<td width='50'  class='header_laporan'>NPM</td>
    <td width='250' class='header_laporan'>Nama Mahasiswa </td>
    <td width='100' align='center' class='header_laporan'>BPP</td>
    <td width='100' align='center' class='header_laporan'>SDP2</td>
    <td width='100' align='center' class='header_laporan'>UP3</td>
	<td width='100' align='center' class='header_laporan'>SKS</td>
	<td width='100' align='center' class='header_laporan'>LAIN</td>
	<td width='100' align='center' class='header_laporan'>PDDK LAINNYA</td>
    <td width='100' align='center' class='header_laporan'>Total</td>
  </tr>
 ";
		$so_bpp=0;$so_sdp2=0;$so_up3=0;$so_total=0;$so_sks=0;$so_perpus=0;$so_pddk_lain=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$so_bpp+=$row->so_bpp;
			$so_sdp2+=$row->so_sdp2;
			$so_up3+=$row->so_up3;
			$so_total+=$row->so_total;
			$so_sks+=$row->so_sks;
			$so_perpus+=$row->so_perpus;
			$so_pddk_lain+=$row->so_pddk_lain;
			echo "<tr>
   <td class='isi_laporan' align='center'>$i</td>
   <td class='isi_laporan'>$row->kode_jur</td>
   <td class='isi_laporan'>$row->nama_jurusan</td>
    <td class='isi_laporan'>$row->nim</td>
    <td class='isi_laporan'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenSaldoMhs('$row->nim','$row->kode_lokasi','$row->kode_fakultas');\">$row->nama</a>";
			echo "</td>
    <td class='isi_laporan' align='right'>".number_format($row->so_bpp,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->so_sdp2,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->so_up3,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->so_sks,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->so_perpus,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->so_pddk_lain,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->so_total,0,",",".")."</td>
  </tr>";	 
			$i=$i+1;
		}
		echo "<tr>
   <td class='isi_laporan' align='center' colspan='5'>Total</td>
    <td class='isi_laporan' align='right'>".number_format($so_bpp,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($so_sdp2,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($so_up3,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($so_sks,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($so_perpus,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($so_pddk_lain,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($so_total,0,",",".")."</td>
  </tr>";	 
		echo "</table></div>";
		return "";
	}
	
}
?>
  
