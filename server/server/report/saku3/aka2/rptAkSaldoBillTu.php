<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_aka2_rptAkSaldoBillTu extends server_report_basic
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
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$jenis=$tmp[2];
		$lap=$tmp[3];
		$sts=$tmp[5];
		$periode2=$tmp[6];
		$per=$tmp[7];
		$nama_file="bill.xls";

		// echo $per;

		if($periode2==''){$strperiode=" and periode='$periode' ";}
		else  {$strperiode=" and periode between '$periode' and '$periode2' ";}

		$mutasi="";
		if($jenis=="Tidak"){
			$mutasi=" and ( a.bpp <> 0 or a.sdp2 <> 0 or a.up3 <> 0 or a.sks <> 0 or a.lain <> 0 
			or isnull(d.bayarbpp,0) <> 0 or isnull(e.bayarsdp2,0) <> 0 or
			isnull(f.bayarup3,0) <> 0 or isnull(g.bayarsks,0) <> 0 or isnull(h.bayarlain,0) <> 0 or isnull(i.bayarpddk,0) <> 0)";
		}else{
			$mutasi="";
		}

		$tagih="";
		if($sts== "TIDAK" OR $sts == "TERTAGIH"){
			$tagih=" and b.sts_tagih ='$sts' ";
		}else{
			$tagih="";
		}

		// echo $mutasi;
		// echo $tagih;
		
		$sql="select 
		b.nim,b.nama,b.kode_akt,c.kode_jur,c.nama as nama_jur,a.tahunaka, a.bpp,a.sdp2,a.up3,a.sks,a.lain,a.pddk_lain,a.bpp+a.sdp2+a.up3+a.sks+a.lain+a.pddk_lain as to_tagih
		,isnull(d.bayarbpp,0) as bayarbpp
		,isnull(e.bayarsdp2,0) as bayarsdp2
		,isnull(f.bayarup3,0) as bayarup3
		,isnull(g.bayarsks,0) as bayarsks
		,isnull(h.bayarlain,0) as bayarlain,isnull(i.bayarpddk,0) as bayarpddk, isnull(d.bayarbpp,0)+isnull(e.bayarsdp2,0)+isnull(f.bayarup3,0)+isnull(g.bayarsks,0)+isnull(h.bayarlain,0)+isnull(i.bayarpddk,0) as to_byr,a.bpp-isnull(d.bayarbpp,0) as so_bpp,a.sdp2-isnull(e.bayarsdp2,0) as so_sdp2,a.up3-isnull(f.bayarup3,0) as so_up3, a.sks-isnull(g.bayarsks,0) as so_sks,a.lain-isnull(h.bayarlain,0) as so_lain,a.pddk_lain-isnull(i.bayarpddk,0) as so_pddk,  (a.bpp-isnull(d.bayarbpp,0))+(a.sdp2-isnull(e.bayarsdp2,0)) + (a.up3-isnull(f.bayarup3,0)) + (a.sks-isnull(g.bayarsks,0)) + (a.lain-isnull(h.bayarlain,0))+(a.pddk_lain-isnull(i.bayarpddk,0)) as so_total  
		from 
		(
		select x.nim,x.tahunaka,x.no_inv,case when sum(x.bpp) < 0 then 0 else sum(x.bpp) end as bpp,case when sum(x.sdp2) < 0 then 0 else sum(x.sdp2) end as sdp2,case when sum(x.up3) < 0 then 0 else sum(x.up3) end as up3,case when sum(x.sks) < 0 then 0 else  sum(x.sks) end as sks,case when sum(x.lain) < 0 then 0 else sum(x.lain) end as lain,case when sum(x.pddk_lain) < 0 then 0 else sum(x.pddk_lain) end as pddk_lain
		from (
			select a.nim,b.tahunaka,a.no_inv
			,case substring(a.kode_produk,1,3) when 'BPP' then sum(case a.dc when 'D' then a.nilai else -a.nilai end) else 0 end as bpp
			,case a.kode_produk when 'SDP2' then sum(case a.dc when 'D' then a.nilai else -a.nilai end) else 0 end as sdp2
			,case a.kode_produk when 'UP3' then sum(case a.dc when 'D' then a.nilai else -a.nilai end) else 0 end as up3
			,case a.kode_produk when 'SKS' then sum(case a.dc when 'D' then a.nilai else -a.nilai end) else 0 end as sks
			,case when a.kode_produk in ('PERPUS','DENDA','USTATUS','ASUR') then sum(case a.dc when 'D' then a.nilai else -a.nilai end) else 0 end as lain,case when a.kode_produk in ('BADM','DHER','REMD','WISD') then sum(case a.dc when 'D' then a.nilai else -a.nilai end) else 0 end as pddk_lain 
			from aka_bill_d a 
			inner join aka_tahunaka b on a.periode=b.periode and a.kode_lokasi=b.kode_lokasi
			where  a.kode_lokasi ='$kode_lokasi' 
			group by a.nim,b.tahunaka,a.no_inv,a.kode_produk
			) x group by x.nim,x.tahunaka,x.no_inv
		
		) a 
		inner join aka_mahasiswa b on a.nim=b.nim 
		inner join aka_jurusan c on b.kode_jur=c.kode_jur and b.kode_lokasi=c.kode_lokasi
		
		left join (
		select no_inv,sum(case dc when 'D' then nilai else -nilai end) as bayarbpp
		from aka_rekon_d where kode_lokasi='$kode_lokasi' and kode_produk like 'BPP%' $per
		group by no_inv 
		) d on a.no_inv=d.no_inv
		
		left join (
		select no_inv,sum(case dc when 'D' then nilai else -nilai end) as bayarsdp2
		from aka_rekon_d where kode_lokasi='$kode_lokasi' and kode_produk = 'SDP2' $per
		group by no_inv 
		) e on a.no_inv=e.no_inv
		
		left join (
		select no_inv,sum(case dc when 'D' then nilai else -nilai end) as bayarup3
		from aka_rekon_d where kode_lokasi='$kode_lokasi' and kode_produk = 'UP3' $per
		group by no_inv 
		) f on a.no_inv=f.no_inv
		
		left join (
		select no_inv,sum(case dc when 'D' then nilai else -nilai end) as bayarsks
		from aka_rekon_d where kode_lokasi='$kode_lokasi' and kode_produk = 'SKS' $per
		group by no_inv 
		) g on a.no_inv=g.no_inv
		
		left join (
		select no_inv,sum(case dc when 'D' then nilai else -nilai end) as bayarlain
		from aka_rekon_d where kode_lokasi='$kode_lokasi' and kode_produk in ('PERPUS','DENDA','USTATUS','ASUR') $per
		group by no_inv 
		) h on a.no_inv=h.no_inv
		left join (
			select no_inv,sum(case dc when 'D' then nilai else -nilai end) as bayarpddk
			from aka_rekon_d where kode_lokasi='$kode_lokasi' and kode_produk in ('BADM','DHER','REMD','WISD') $per
			group by no_inv 
		) i on a.no_inv=i.no_inv
		
		$this->filter $mutasi $tagih
		order by b.nim,a.tahunaka ";

		// echo $sql;
		
		$rs = $dbLib->execute($sql);

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
		$i = 1;
		$jum=$rs->RecordCount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("saldo piutang mahasiswa",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1500'>
  <tr align='center' bgcolor='#CCCCCC'>
    <td width='20' rowspan='2' class='header_laporan'>No</td>
    <td width='50' rowspan='2' class='header_laporan'>Kode</td>
    <td width='200' rowspan='2' class='header_laporan'>Nama Jurusan </td>
	<td width='50' rowspan='2' class='header_laporan'>NPM</td>
	<td width='200' rowspan='2' class='header_laporan'>Nama Mahasiswa </td>
	<td width='60' rowspan='2' class='header_laporan'>Angkatan</td>
	<td width='60' rowspan='2' class='header_laporan'>Tahun Akademik</td>
    <td colspan='7' class='header_laporan'>Tagihan</td>
    <td colspan='7' class='header_laporan'>Pembayaran</td>
    <td colspan='7' class='header_laporan'>Saldo Akhir </td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='80' align='center' class='header_laporan'>BPP</td>
    <td width='80' align='center' class='header_laporan'>SDP2</td>
    <td width='80' align='center' class='header_laporan'>UP3</td>
	<td width='80' align='center' class='header_laporan'>SKS</td>
	<td width='80' align='center' class='header_laporan'>LAIN</td>
	<td width='80' align='center' class='header_laporan'>PDDK LAINNYA</td>
    <td width='90' align='center' class='header_laporan'>Total</td>
    <td width='80' align='center' class='header_laporan'>BPP</td>
    <td width='80' align='center' class='header_laporan'>SDP2</td>
    <td width='80' align='center' class='header_laporan'>UP3</td>
	<td width='80' align='center' class='header_laporan'>SKS</td>
	<td width='80' align='center' class='header_laporan'>LAIN</td>	
	<td width='80' align='center' class='header_laporan'>PDDK LAINNYA</td>
    <td width='90' align='center' class='header_laporan'>Total</td>
    <td width='80' align='center' class='header_laporan'>BPP</td>
    <td width='80' align='center' class='header_laporan'>SDP2</td>
    <td width='80' align='center' class='header_laporan'>UP3</td>
	<td width='80' align='center' class='header_laporan'>SKS</td>
	<td width='80' align='center' class='header_laporan'>LAIN</td>
	<td width='80' align='center' class='header_laporan'>PDDK LAINNYA</td>
    <td width='90' align='center' class='header_laporan'>Total</td>
  </tr>";
		$sa_bpp=0;$sa_sdp2=0;$sa_up3=0;$sa_total=0;$sa_sks=0;$sa_perpus=0;$sa_pddk=0;
		$sak_bpp=0;$sak_sdp2=0;$sak_up3=0;$sak_total=0;$sak_sks=0;$sak_perpus=0;$sak_pddk=0;
		$debet_bpp=0;$debet_sdp2=0;$debet_up3=0;$debet_total=0;$debet_sks=0;$debet_perpus=0;$debet_pddk=0;
		$kredit_bpp=0;$kredit_sdp2=0;$kredit_up3=0;$kredit_total=0;$kredit_sks=0;$kredit_perpus=0;$kredit_pddk=0;
		$sak_bpp=0;$sak_sdp2=0;$sak_up3=0;$sak_total=0;$sak_sks=0;$sak_perpus=0;$sak_pddk=0;
		$sak2_bpp=0;$sak2_sdp2=0;$sak2_up3=0;$sak2_total=0;$sak2_sks=0;$sak2_perpus=0;$sak2_pddk=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			// $sa_bpp=$row->so_bpp+$row->bpp-$row->bayarbpp;
			// $sa_sdp2=$row->so_sdp2+$row->sdp2-$row->bayarsdp2;
			// $sa_up3=$row->so_up3+$row->up3-$row->bayarup3;
			// $sa_sks=$row->so_sks+$row->sks-$row->bayarsks;
			// $sa_perpus=$row->so_perpus+$row->lain-$row->bayarlain;
			// $sa_total=$row->so_total+$row->to_tagih-$row->to_byr;


			$sa_bpp+=$row->so_bpp;
			$sa_sdp2+=$row->so_sdp2;
			$sa_up3+=$row->so_up3;
			$sa_sks+=$row->so_sks;
			$sa_perpus+=$row->so_lain;
			$sa_pddk+=$row->so_pddk;
			$sa_total+=$row->so_total;
			
			$sak_bpp+=$sa_bpp;
			$sak_sdp2+=$sa_sdp2;
			$sak_up3+=$sa_up3;
			$sak_sks+=$sa_sks;
			$sak_perpus+=$sa_perpus;
			$sak_pddk+=$sa_pddk;
			$sak_total+=$sa_total;
						
			$debet_bpp=$debet_bpp+$row->bpp;
			$debet_sdp2=$debet_sdp2+$row->sdp2;
			$debet_up3=$debet_up3+$row->up3;
			$debet_sks=$debet_sks+$row->sks;
			$debet_perpus=$debet_perpus+$row->lain;
			$debet_pddk=$debet_pddk+$row->pddk_lain;
			$debet_total=$debet_total+$row->to_tagih;
			
			$kredit_bpp=$kredit_bpp+$row->bayarbpp;
			$kredit_sdp2=$kredit_sdp2+$row->bayarsdp2;
			$kredit_up3=$kredit_up3+$row->bayarup3;
			$kredit_sks=$kredit_sks+$row->bayarsks;
			$kredit_perpus=$kredit_perpus+$row->bayarlain;
			$kredit_pddk=$kredit_pddk+$row->bayarpddk;
			$kredit_total=$kredit_total+$row->to_byr;

			echo "<tr>
			<td class='isi_laporan' align='center'>$i</td>
			<td class='isi_laporan'>$row->kode_jur</td>
			<td class='isi_laporan'>$row->nama_jur</td>
			<td class='isi_laporan'>$row->nim</td>
			<td class='isi_laporan'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenSaldoMhs('$row->nim','$row->kode_lokasi','$row->kode_fakultas');\">$row->nama</a>";
			echo "</td>
			<td class='isi_laporan'>$row->kode_akt</td>
			<td class='isi_laporan'>$row->tahunaka</td>
			<td class='isi_laporan' align='right'>".number_format($row->bpp,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($row->sdp2,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($row->up3,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($row->sks,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($row->lain,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($row->pddk_lain,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($row->to_tagih,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($row->bayarbpp,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($row->bayarsdp2,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($row->bayarup3,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($row->bayarsks,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($row->bayarlain,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($row->bayarpddk,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($row->to_byr,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($row->so_bpp,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($row->so_sdp2,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($row->so_up3,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($row->so_sks,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($row->so_lain,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($row->so_pddk,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($row->so_total,0,",",".")."</td>
		</tr>";	 
			$i=$i+1;
		}

		
		$sak2_bpp=$debet_bpp-$kredit_bpp;
		$sak2_sdp2=$debet_sdp2-$kredit_sdp2;
		$sak2_up3=$debet_up3-$kredit_up3;
		$sak2_sks=$debet_sks-$kredit_sks;
		$sak2_perpus=$debet_perpus-$kredit_perpus;
		$sak2_pddk=$debet_pddk-$kredit_pddk;
		$sak2_total=$debet_total-$kredit_total;
		echo "<tr>
   <td class='isi_laporan' align='center' colspan='7'>Total</td>
    <td class='isi_laporan' align='right'>".number_format($debet_bpp,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($debet_sdp2,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($debet_up3,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($debet_sks,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($debet_perpus,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($debet_pddk,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($debet_total,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($kredit_bpp,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($kredit_sdp2,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($kredit_up3,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($kredit_sks,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($kredit_perpus,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($kredit_pddk,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($kredit_total,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($sak2_bpp,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($sak2_sdp2,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($sak2_up3,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($sak2_sks,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($sak2_perpus,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($sak2_pddk,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($sak2_total,0,",",".")."</td>
  </tr>";	 
		echo "</table></div>";
		return "";
	}
	
}
?>
  
