<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_aka2_rptAkSaldoMhsTu extends server_report_basic
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
		
		$mutasi="";
		if($jenis=="Tidak"){
			$mutasi=" and ((isnull(b.bpp,0)-isnull(d.bpp,0)-isnull(f.bpp,0) <> 0) or (isnull(b.sdp2,0)-isnull(d.sdp2,0)-isnull(f.sdp2,0) <> 0) or (isnull(b.up3,0)-isnull(d.up3,0)-isnull(f.up3,0) <> 0) or (isnull(b.sks,0)-isnull(d.sks,0)-isnull(f.sks,0) <> 0) or (isnull(b.perpus,0)-isnull(d.perpus,0)-isnull(f.perpus,0) <> 0) or (isnull(b.pddk_lain,0)-isnull(d.pddk_lain,0)-isnull(f.pddk_lain,0) <> 0) or (isnull(c.bpp,0)-isnull(g.bpp,0) <> 0) or (isnull(c.sdp2,0)-isnull(g.sdp2,0) <> 0) or (isnull(c.up3,0)-isnull(g.up3,0) <> 0) or (isnull(c.sks,0)-isnull(g.sks,0) <> 0) or (isnull(c.perpus,0)-isnull(g.perpus,0) <> 0) or (isnull(c.pddk_lain,0)-isnull(g.pddk_lain,0) <> 0) or (isnull(e.bpp,0) <> 0) or (isnull(e.sdp2,0) <> 0) or (isnull(e.up3,0) <> 0) or (isnull(e.sks,0) <> 0) or (isnull(e.perpus,0) <> 0) or (isnull(e.pddk_lain,0) <> 0))";
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
		$sql="select distinct a.kode_jur,a.nama,a.kode_lokasi,a.nim,h.nama as nama_jurusan
	   ,isnull(b.bpp,0)-isnull(d.bpp,0)-isnull(f.bpp,0) as so_bpp,isnull(b.sdp2,0)-isnull(d.sdp2,0)-isnull(f.sdp2,0) as so_sdp2,isnull(b.up3,0)-isnull(d.up3,0)-isnull(f.up3,0) as so_up3,isnull(b.sks,0)-isnull(d.sks,0)-isnull(f.sks,0) as so_sks,isnull(b.perpus,0)-isnull(d.perpus,0)-isnull(f.perpus,0) as so_perpus,isnull(b.pddk_lain,0)-isnull(d.pddk_lain,0)-isnull(f.pddk_lain,0) as so_pddk_lain,
	   isnull(b.bpp,0)-isnull(d.bpp,0)-isnull(f.bpp,0) + isnull(b.sdp2,0)-isnull(d.sdp2,0)-isnull(f.sdp2,0) + isnull(b.up3,0)-isnull(d.up3,0)-isnull(f.up3,0) + isnull(b.sks,0)-isnull(d.sks,0)-isnull(f.sks,0) + isnull(b.perpus,0)-isnull(d.perpus,0)-isnull(f.perpus,0)+ isnull(b.pddk_lain,0)-isnull(d.pddk_lain,0)-isnull(f.pddk_lain,0) as so_total,	
	   isnull(c.bpp,0)-isnull(g.bpp,0) as debet_bpp,isnull(c.sdp2,0)-isnull(g.sdp2,0) as debet_sdp2,isnull(c.up3,0)-isnull(g.up3,0) as debet_up3,isnull(c.sks,0)-isnull(g.sks,0) as debet_sks,isnull(c.perpus,0)-isnull(g.perpus,0) as debet_perpus,isnull(c.pddk_lain,0)-isnull(g.pddk_lain,0) as debet_pddk_lain,
	   isnull(c.bpp,0)-isnull(g.bpp,0) + isnull(c.sdp2,0)-isnull(g.sdp2,0) + isnull(c.up3,0)-isnull(g.up3,0) + isnull(c.sks,0)-isnull(g.sks,0) + isnull(c.perpus,0)-isnull(g.perpus,0)+ isnull(c.pddk_lain,0)-isnull(g.pddk_lain,0) as debet_total,
	   isnull(e.bpp,0) as kredit_bpp,isnull(e.sdp2,0) as kredit_sdp2,isnull(e.up3,0) as kredit_up3,isnull(e.sks,0) as kredit_sks,isnull(e.perpus,0) as kredit_perpus,isnull(e.pddk_lain,0) as kredit_pddk_lain,
	   isnull(e.bpp,0) + isnull(e.sdp2,0)+ isnull(e.up3,0) + isnull(e.sks,0)  + isnull(e.perpus,0)  + isnull(e.pddk_lain,0)  as kredit_total
from aka_mahasiswa a
inner join aka_jurusan h on a.kode_jur=h.kode_jur and a.kode_lokasi=h.kode_lokasi
left join (select y.nim,y.kode_lokasi,sum(case when x.kode_produk in ('BPPP','BPPNP') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as bpp, 
				   sum(case when x.kode_produk in ('SDP2') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as sdp2, 
				   sum(case when x.kode_produk in ('UP3') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as up3,
				   sum(case when x.kode_produk in ('SKS') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as sks,
				   sum(case when x.kode_produk in ('PERPUS','DENDA','USTATUS','ASUR') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as perpus,
				   sum(case when x.kode_produk not in ('BPPP','BPPNP','SDP2','UP3','SKS','PERPUS','DENDA','USTATUS','ASUR')  then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as pddk_lain,
				   sum(x.nilai) as total		
			from aka_bill_d x 			
			inner join aka_mahasiswa y on x.nim=y.nim and x.kode_lokasi=y.kode_lokasi  
			$sub_sql and x.periode < '$periode'			
			group by y.nim,y.kode_lokasi		
			)b on a.nim=b.nim and a.kode_lokasi=b.kode_lokasi 
left join (select y.nim,y.kode_lokasi,sum(case when x.kode_produk in ('BPPP','BPPNP') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as bpp, 
				   sum(case when x.kode_produk in ('SDP2') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as sdp2, 
				   sum(case when x.kode_produk in ('UP3') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as up3,
				   sum(case when x.kode_produk in ('SKS') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as sks,
				   sum(case when x.kode_produk in ('PERPUS','DENDA','USTATUS','ASUR') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as perpus,
				   sum(case when x.kode_produk not in ('BPPP','BPPNP','SDP2','UP3','SKS','PERPUS','DENDA','USTATUS','ASUR')  then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as pddk_lain,
				   sum(x.nilai) as total			
			from aka_bill_d x 			
			inner join aka_mahasiswa y on x.nim=y.nim and x.kode_lokasi=y.kode_lokasi  
			$sub_sql and x.periode = '$periode'
			group by y.nim,y.kode_lokasi			
			)c on a.nim=c.nim and a.kode_lokasi=c.kode_lokasi 
left join (select z.nim,z.kode_lokasi,
					sum(case when z.kode_produk in ('BPPP','BPPNP') then (case when z.dc='D' then z.nilai else -z.nilai end) else 0 end) as bpp, 
					sum(case when z.kode_produk in ('SDP2') then (case when z.dc='D' then z.nilai else -z.nilai end) else 0 end) as sdp2, 
					sum(case when z.kode_produk in ('UP3') then (case when z.dc='D' then z.nilai else -z.nilai end) else 0 end) as up3,
					sum(case when z.kode_produk in ('SKS') then (case when z.dc='D' then z.nilai else -z.nilai end) else 0 end) as sks,
					sum(case when z.kode_produk in ('PERPUS','DENDA','USTATUS','ASUR') then (case when z.dc='D' then z.nilai else -z.nilai end) else 0 end) as perpus,
					sum(case when z.kode_produk not in ('BPPP','BPPNP','SDP2','UP3','SKS','PERPUS','DENDA','USTATUS','ASUR')  then (case when z.dc='D' then z.nilai else -z.nilai end) else 0 end) as pddk_lain,
					sum(case when z.dc='D' then z.nilai else -z.nilai end) as total	
			from aka_rekon_d z		
			inner join aka_mahasiswa y on z.nim=y.nim and z.kode_lokasi=y.kode_lokasi
			inner join aka_bill_d x on z.no_inv=x.no_inv and z.kode_produk=x.kode_produk 
			$sub_sql and z.periode <'$periode'		
			group by z.nim,z.kode_lokasi			
			)d on a.nim=d.nim and a.kode_lokasi=d.kode_lokasi 
left join (select z.nim,z.kode_lokasi,
					sum(case when z.kode_produk in ('BPPP','BPPNP') then (case when z.dc='D' then z.nilai else -z.nilai end) else 0 end) as bpp, 
					sum(case when z.kode_produk in ('SDP2') then (case when z.dc='D' then z.nilai else -z.nilai end) else 0 end) as sdp2, 
					sum(case when z.kode_produk in ('UP3') then (case when z.dc='D' then z.nilai else -z.nilai end) else 0 end) as up3,
					sum(case when z.kode_produk in ('SKS') then (case when z.dc='D' then z.nilai else -z.nilai end) else 0 end) as sks,
					sum(case when z.kode_produk in ('PERPUS','DENDA','USTATUS','ASUR') then (case when z.dc='D' then z.nilai else -z.nilai end) else 0 end) as perpus,
					sum(case when z.kode_produk not in ('BPPP','BPPNP','SDP2','UP3','SKS','PERPUS','DENDA','USTATUS','ASUR')  then (case when z.dc='D' then z.nilai else -z.nilai end) else 0 end) as pddk_lain,
					sum(case when z.dc='D' then z.nilai else -z.nilai end) as total	
			from aka_rekon_d z		
			inner join aka_mahasiswa y on z.nim=y.nim and z.kode_lokasi=y.kode_lokasi
			inner join aka_bill_d x on z.no_inv=x.no_inv and z.kode_produk=x.kode_produk
			$sub_sql and z.periode = '$periode'	
			group by z.nim,z.kode_lokasi			
			)e on a.nim=e.nim and a.kode_lokasi=e.kode_lokasi 
left join (select z.nim,z.kode_lokasi,
					sum(case when z.kode_produk in ('BPPP','BPPNP') then (case when z.dc='D' then z.nilai else -z.nilai end) else 0 end) as bpp, 
					sum(case when z.kode_produk in ('SDP2') then (case when z.dc='D' then z.nilai else -z.nilai end) else 0 end) as sdp2, 
					sum(case when z.kode_produk in ('UP3') then (case when z.dc='D' then z.nilai else -z.nilai end) else 0 end) as up3,
					sum(case when z.kode_produk in ('SKS') then (case when z.dc='D' then z.nilai else -z.nilai end) else 0 end) as sks,
					sum(case when z.kode_produk in ('PERPUS','DENDA','USTATUS','ASUR') then (case when z.dc='D' then z.nilai else -z.nilai end) else 0 end) as perpus,
					sum(case when z.kode_produk not in ('BPPP','BPPNP','SDP2','UP3','SKS','PERPUS','DENDA','USTATUS','ASUR')  then (case when z.dc='D' then z.nilai else -z.nilai end) else 0 end) as pddk_lain,
					sum(case when z.dc='D' then z.nilai else -z.nilai end) as total		
			from aka_batal_d z		
			inner join aka_mahasiswa y on z.nim=y.nim and z.kode_lokasi=y.kode_lokasi
			inner join aka_bill_d x on z.no_inv=x.no_inv and z.kode_produk=x.kode_produk
			$sub_sql and z.periode < '$periode'			
			group by z.nim,z.kode_lokasi			
			)f on a.nim=f.nim and a.kode_lokasi=f.kode_lokasi 
left join (select z.nim,z.kode_lokasi,
					sum(case when z.kode_produk in ('BPPP','BPPNP') then (case when z.dc='D' then z.nilai else -z.nilai end) else 0 end) as bpp, 
					sum(case when z.kode_produk in ('SDP2') then (case when z.dc='D' then z.nilai else -z.nilai end) else 0 end) as sdp2, 
					sum(case when z.kode_produk in ('UP3') then (case when z.dc='D' then z.nilai else -z.nilai end) else 0 end) as up3,
					sum(case when z.kode_produk in ('SKS') then (case when z.dc='D' then z.nilai else -z.nilai end) else 0 end) as sks,
					sum(case when z.kode_produk in ('PERPUS','DENDA','USTATUS','ASUR') then (case when z.dc='D' then z.nilai else -z.nilai end) else 0 end) as perpus,
					sum(case when z.kode_produk not in ('BPPP','BPPNP','SDP2','UP3','SKS','PERPUS','DENDA','USTATUS','ASUR')  then (case when z.dc='D' then z.nilai else -z.nilai end) else 0 end) as pddk_lain,
					sum(case when z.dc='D' then z.nilai else -z.nilai end) as total		
			from aka_batal_d z					
			inner join aka_mahasiswa y on z.nim=y.nim and z.kode_lokasi=y.kode_lokasi
			inner join aka_bill_d x on z.no_inv=x.no_inv and z.kode_produk=x.kode_produk
			$sub_sql and z.periode = '$periode'		
			group by z.nim,z.kode_lokasi			
			)g on a.nim=g.nim and a.kode_lokasi=g.kode_lokasi 
$this->filter $mutasi $tagih
order by a.kode_jur,a.nim
 ";
		 echo $sql;

		$rs = $dbLib->execute($sql);
		$i = 1;
		$jum=$rs->recordcount();
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
    <td colspan='7' class='header_laporan'>Saldo Awal </td>
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
    <td width='80' align='center' class='header_laporan'>BPP</td>
    <td width='80' align='center' class='header_laporan'>SDP2</td>
    <td width='80' align='center' class='header_laporan'>UP3</td>
	<td width='80' align='center' class='header_laporan'>SKS</td>
	<td width='80' align='center' class='header_laporan'>LAIN</td>
	<td width='80' align='center' class='header_laporan'>PDDK LAINNYA</td>
    <td width='90' align='center' class='header_laporan'>Total</td>
  </tr>";
		$sa_bpp=0;$sa_sdp2=0;$sa_up3=0;$sa_total=0;$sa_sks=0;$sa_perpus=0;$sa_pddk_lain=0;
		$sak_bpp=0;$sak_sdp2=0;$sak_up3=0;$sak_total=0;$sak_sks=0;$sak_perpus=0;$sak_pddk_lain=0;
		$so_bpp=0;$so_sdp2=0;$so_up3=0;$so_total=0;$so_sks=0;$so_perpus=0;$so_pddk_lain=0;
		$debet_bpp=0;$debet_sdp2=0;$debet_up3=0;$debet_total=0;$debet_sks=0;$debet_perpus=0;$debet_pddk_lain=0;
		$kredit_bpp=0;$kredit_sdp2=0;$kredit_up3=0;$kredit_total=0;$kredit_sks=0;$kredit_perpus=0;$kredit_pddk_lain=0;
		$sak_bpp=0;$sak_sdp2=0;$sak_up3=0;$sak_total=0;$sak_sks=0;$sak_perpus=0;$sak_pddk_lain=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$sa_bpp=$row->so_bpp+$row->debet_bpp-$row->kredit_bpp;
			$sa_sdp2=$row->so_sdp2+$row->debet_sdp2-$row->kredit_sdp2;
			$sa_up3=$row->so_up3+$row->debet_up3-$row->kredit_up3;
			$sa_sks=$row->so_sks+$row->debet_sks-$row->kredit_sks;
			$sa_perpus=$row->so_perpus+$row->debet_perpus-$row->kredit_perpus;
			$sa_pddk_lain=$row->so_pddk_lain+$row->debet_pddk_lain-$row->kredit_pddk_lain;
			$sa_total=$row->so_total+$row->debet_total-$row->kredit_total;
			
			$sak_bpp=$sak_bpp+$sa_bpp;
			$sak_sdp2=$sak_sdp2+$sa_sdp2;
			$sak_up3=$sak_up3+$sa_up3;
			$sak_sks=$sak_sks+$sa_sks;
			$sak_perpus=$sak_perpus+$sa_perpus;
			$sak_pddk_lain=$sak_pddk_lain+$sa_pddk_lain;
			$sak_total=$sak_total+$sa_total;
			
			$so_bpp=$so_bpp+$row->so_bpp;
			$so_sdp2=$so_sdp2+$row->so_sdp2;
			$so_up3=$so_up3+$row->so_up3;
			$so_sks=$so_sks+$row->so_sks;
			$so_perpus=$so_perpus+$row->so_perpus;
			$so_pddk_lain=$so_pddk_lain+$row->so_pddk_lain;
			$so_total=$so_total+$row->so_total;
			
			$debet_bpp=$debet_bpp+$row->debet_bpp;
			$debet_sdp2=$debet_sdp2+$row->debet_sdp2;
			$debet_up3=$debet_up3+$row->debet_up3;
			$debet_sks=$debet_sks+$row->debet_sks;
			$debet_perpus=$debet_perpus+$row->debet_perpus;
			$debet_pddk_lain=$debet_pddk_lain+$row->debet_pddk_lain;
			$debet_total=$debet_total+$row->debet_total;
			
			$kredit_bpp=$kredit_bpp+$row->kredit_bpp;
			$kredit_sdp2=$kredit_sdp2+$row->kredit_sdp2;
			$kredit_up3=$kredit_up3+$row->kredit_up3;
			$kredit_sks=$kredit_sks+$row->kredit_sks;
			$kredit_perpus=$kredit_perpus+$row->kredit_perpus;
			$kredit_pddk_lain=$kredit_pddk_lain+$row->kredit_pddk_lain;
			$kredit_total=$kredit_total+$row->kredit_total;
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
    <td class='isi_laporan' align='right'>".number_format($row->debet_bpp,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->debet_sdp2,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->debet_up3,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->debet_sks,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->debet_perpus,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->debet_pddk_lain,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->debet_total,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->kredit_bpp,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->kredit_sdp2,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->kredit_up3,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->kredit_sks,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->kredit_perpus,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->kredit_pddk_lain,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->kredit_total,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($sa_bpp,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($sa_sdp2,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($sa_up3,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($sa_sks,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($sa_perpus,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($sa_pddk_lain,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($sa_total,0,",",".")."</td>
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
    <td class='isi_laporan' align='right'>".number_format($debet_bpp,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($debet_sdp2,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($debet_up3,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($debet_sks,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($debet_perpus,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($debet_pddk_lain,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($debet_total,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($kredit_bpp,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($kredit_sdp2,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($kredit_up3,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($kredit_sks,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($kredit_perpus,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($kredit_pddk_lain,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($kredit_total,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($sak_bpp,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($sak_sdp2,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($sak_up3,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($sak_sks,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($sak_perpus,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($sak_pddk_lain,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($sak_total,0,",",".")."</td>
  </tr>";	 
		echo "</table></div>";
		return "";
	}
	
}
?>
  
