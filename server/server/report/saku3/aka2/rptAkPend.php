<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_aka2_rptAkPend extends server_report_basic
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
        $sts_batal=$tmp[2];
        $filter4=$tmp[3];
		$nama_file="pend_mhs_".$periode.".xls";
		$sql_batal="";
		if ($sts_batal=="Batal")
		{
			$sql_batal=" and isnull(g.no_bill,'-')<>'-' ";
		}
		if ($sts_batal=="Aktif")
		{
			$sql_batal=" and isnull(g.no_bill,'-')='-' ";
		}
        $sql=" select * from(
        select distinct a.periode,a.no_amor as no_bill,
		a.keterangan,b.nim,c.nama,d.kode_jur,d.nama as nama_jur,d.kode_fakultas,e.nama as nama_fakultas
		, isnull(b.bpp,0) as bpp,isnull(b.bppnp,0) as bppnp,isnull(b.sdp2,0) as sdp2,isnull(b.up3,0) as up3 ,isnull(b.sks,0) as sks,isnull(b.perpus,0) as perpus, isnull(b.denda,0) as denda,isnull(b.ustatus,0) as ustatus,isnull(b.asur,0) as asur,isnull(b.pddk_lain,0) as pddk_lain, isnull(b.total,0) as total,b.no_inv
		,isnull(g.no_amor,'-') as no_batal ,
		c.kode_akt
		,f.tahunaka,case when substring(f.tahunaka,1,2) = substring(c.kode_akt,3,2) then 'MABA' else 'MALA' end as sts_mhs  
		from aka_amor_m a 
		inner join (select c.nim,a.no_amor,a.no_inv,c.kode_lokasi, 
		            sum(case when a.kode_produk in ('BPPP') then a.nilai else 0 end) as bpp, 
					sum(case when a.kode_produk in ('BPPNP') then a.nilai else 0 end) as bppnp, 
					sum(case when a.kode_produk in ('SDP2') then a.nilai else 0 end) as sdp2, 
					sum(case when a.kode_produk in ('UP3') then a.nilai else 0 end) as up3, 
					sum(case when a.kode_produk in ('SKS') then a.nilai else 0 end) as sks, 
					sum(case when a.kode_produk in ('PERPUS') then a.nilai else 0 end) as perpus, 
					sum(case when a.kode_produk in ('DENDA') then a.nilai else 0 end) as denda, 
					sum(case when a.kode_produk in ('USTATUS') then a.nilai else 0 end) as ustatus, 
					sum(case when a.kode_produk in ('ASUR') then a.nilai else 0 end) as asur,  
					sum(case when a.kode_produk not in ('BPPP','BPPNP','SDP2','UP3','SKS','PERPUS','DENDA','USTATUS','ASUR')  then a.nilai else 0 end) as pddk_lain, 
					sum(a.nilai) as total from aka_amor_d a inner join aka_mahasiswa c on a.nim=c.nim and a.kode_lokasi=c.kode_lokasi 
					inner join aka_jurusan d on c.kode_jur=d.kode_jur and c.kode_lokasi=d.kode_lokasi	
					inner join aka_tahunaka f on a.periode=f.periode and a.kode_lokasi=f.kode_lokasi 
			group by c.nim,a.no_amor,a.no_inv,c.kode_lokasi )b on a.no_amor=b.no_amor and a.kode_lokasi=b.kode_lokasi 
inner join aka_mahasiswa c on b.nim=c.nim and b.kode_lokasi=c.kode_lokasi 
inner join aka_jurusan d on c.kode_jur=d.kode_jur and c.kode_lokasi=d.kode_lokasi 
inner join aka_fakultas e on d.kode_fakultas=e.kode_fakultas and d.kode_lokasi=e.kode_lokasi 
inner join aka_tahunaka f on a.kode_lokasi=f.kode_lokasi and a.periode=f.periode 
left join aka_amor_d g on b.no_inv=g.no_inv and b.nim =g.nim and a.kode_lokasi=g.kode_lokasi and g.no_del='BATAL'
$filter4 and (isnull(b.bpp,0) <> 0 or isnull(b.bppnp,0) <> 0 or isnull(b.sdp2,0) <> 0 or isnull(b.up3,0)  <> 0 or isnull(b.sks,0) <> 0 or isnull(b.perpus,0) <> 0 or isnull(b.denda,0) <> 0 or isnull(b.ustatus,0) <> 0 or isnull(b.asur,0) <> 0 or isnull(b.pddk_lain,0) <> 0  or isnull(b.total,0) <> 0) 
union all
select distinct a.periode,a.no_bill,
a.keterangan,b.nim,c.nama,d.kode_jur,d.nama as nama_jur,d.kode_fakultas,e.nama as nama_fakultas, 0 as bpp,0 as bppnp,isnull(b.sdp2,0) as sdp2,isnull(b.up3,0) as up3 ,isnull(b.sks,0) as sks,isnull(b.perpus,0) as perpus, isnull(b.denda,0) as denda,isnull(b.ustatus,0) as ustatus,isnull(b.asur,0) as asur,isnull(b.pddk_lain,0) as pddk_lain, isnull(b.total,0)-isnull(b.bpp,0)-isnull(b.bppnp,0) as total,a.no_bill+'|'+b.nim as no_inv ,
isnull(g.no_bill,'-') as no_batal ,
c.kode_akt,f.tahunaka,case when substring(x.tahunaka,1,2) = substring(c.kode_akt,3,2) then 'MABA' else 'MALA' end as sts_mhs  
from aka_bill_m a 
inner join (select c.nim,a.no_bill,a.no_inv,c.kode_lokasi,
			sum(case when a.kode_produk in ('BPPP') then a.nilai else 0 end) as bpp, 
			sum(case when a.kode_produk in ('BPPNP') then a.nilai else 0 end) as bppnp,
			sum(case when a.kode_produk in ('SDP2') then a.nilai else 0 end) as sdp2, 
			sum(case when a.kode_produk in ('UP3') then a.nilai else 0 end) as up3, 
			sum(case when a.kode_produk in ('SKS') then a.nilai else 0 end) as sks, 
			sum(case when a.kode_produk in ('PERPUS') then a.nilai else 0 end) as perpus, 
			sum(case when a.kode_produk in ('DENDA') then a.nilai else 0 end) as denda, 
			sum(case when a.kode_produk in ('USTATUS') then a.nilai else 0 end) as ustatus, 
			sum(case when a.kode_produk in ('ASUR') then a.nilai else 0 end) as asur,  
			sum(case when a.kode_produk not in ('BPPP','BPPNP','SDP2','UP3','SKS','PERPUS','DENDA','USTATUS','ASUR')  then a.nilai else 0 end) as pddk_lain, 
			sum(a.nilai) as total from aka_bill_d a inner join aka_mahasiswa c on a.nim=c.nim and a.kode_lokasi=c.kode_lokasi 
			inner join aka_jurusan d on c.kode_jur=d.kode_jur and c.kode_lokasi=d.kode_lokasi	
			inner join aka_tahunaka f on a.periode=f.periode and a.kode_lokasi=f.kode_lokasi
	group by c.nim,a.no_bill,a.no_inv,c.kode_lokasi )b on a.no_bill=substring(b.no_inv,1,15) and a.kode_lokasi=b.kode_lokasi 
	inner join aka_mahasiswa c on b.nim=c.nim and b.kode_lokasi=c.kode_lokasi 
	inner join aka_jurusan d on c.kode_jur=d.kode_jur and c.kode_lokasi=d.kode_lokasi 
	inner join aka_fakultas e on d.kode_fakultas=e.kode_fakultas and d.kode_lokasi=e.kode_lokasi 
	inner join aka_bill_d f on b.no_bill=f.no_bill and b.no_inv=f.no_inv and b.nim=f.nim and a.kode_lokasi=f.kode_lokasi and a.periode=f.periode
	left join aka_bill_d g on a.no_bill=substring(g.no_inv,1,15) and 
	b.nim =g.nim and a.kode_lokasi=g.kode_lokasi and g.modul='BATAL' and g.kode_produk not in ('BPPP','BPPNP')
	inner join aka_tahunaka x on a.kode_lokasi=x.kode_lokasi and a.periode=x.periode
	$this->filter $sql_batal and (isnull(b.bpp,0) <> 0 or isnull(b.bppnp,0) <> 0 or isnull(b.sdp2,0) <> 0 or isnull(b.up3,0)  <> 0 or isnull(b.sks,0) <> 0 or isnull(b.perpus,0) <> 0 or isnull(b.denda,0) <> 0 or isnull(b.ustatus,0) <> 0 or isnull(b.asur,0) <> 0 or isnull(b.pddk_lain,0) <> 0  or (isnull(b.total,0)-isnull(b.bpp,0)-isnull(b.bppnp,0)) <> 0)
union all
select distinct a.periode,a.no_batal as no_bill,
		a.keterangan,b.nim,c.nama,d.kode_jur,d.nama as nama_jur,d.kode_fakultas,e.nama as nama_fakultas, isnull(b.bpp,0)*-1 as bpp,isnull(b.bppnp,0)*-1 as bppnp,isnull(b.sdp2,0)*-1 as sdp2,isnull(b.up3,0)*-1 as up3 ,isnull(b.sks,0)*-1 as sks,isnull(b.perpus,0)*-1 as perpus, isnull(b.denda,0)*-1 as denda,isnull(b.ustatus,0)*-1 as ustatus,isnull(b.asur,0)*-1 as asur,isnull(b.pddk_lain,0)*-1 as pddk_lain, isnull(b.total,0)*-1 as total,b.no_inv as no_inv ,
		isnull(a.no_batal,'-') as no_batal ,
		c.kode_akt
		,f.tahunaka,case when substring(f.tahunaka,1,2) = substring(c.kode_akt,3,2) then 'MABA' else 'MALA' end as sts_mhs  
		from aka_batal_m a 
		inner join (
			select c.nim,a.no_bill,a.no_inv,c.kode_lokasi, sum(case when a.kode_produk in ('BPPP') then g.nilai else 0 end) as bpp, 
			sum(case when a.kode_produk in ('BPPNP') then g.nilai else 0 end) as bppnp, 
			sum(case when a.kode_produk in ('SDP2') then a.nilai else 0 end) as sdp2, 
			sum(case when a.kode_produk in ('UP3') then a.nilai else 0 end) as up3, 
			sum(case when a.kode_produk in ('SKS') then a.nilai else 0 end) as sks, 
			sum(case when a.kode_produk in ('PERPUS') then a.nilai else 0 end) as perpus, 
			sum(case when a.kode_produk in ('DENDA') then a.nilai else 0 end) as denda, 
			sum(case when a.kode_produk in ('USTATUS') then a.nilai else 0 end) as ustatus, 
			sum(case when a.kode_produk in ('ASUR') then a.nilai else 0 end) as asur, 
			sum(case when a.kode_produk not in ('BPPP','BPPNP','SDP2','UP3','SKS','PERPUS','DENDA','USTATUS','ASUR') 
			then a.nilai else 0 end) as pddk_lain, 
			sum(case when a.kode_produk not in ('BPPP','BPPNP') then a.nilai else 0 end)+ sum(case when a.kode_produk in ('BPPP') then g.nilai else 0 end)+sum(case when a.kode_produk in ('BPPNP') then g.nilai else 0 end) as total
			from aka_bill_d a 
			inner join aka_mahasiswa c on a.nim=c.nim and a.kode_lokasi=c.kode_lokasi 
			inner join aka_jurusan d on c.kode_jur=d.kode_jur and c.kode_lokasi=d.kode_lokasi 
			inner join aka_tahunaka f on a.periode=f.periode and a.kode_lokasi=f.kode_lokasi 
			left join aka_amor_d g on a.no_inv=g.no_inv and a.nim=g.nim and a.kode_lokasi=g.kode_lokasi and g.no_del='BATAL' 
			and a.periode=g.periode and a.kode_produk=g.kode_produk 
			where a.modul='BATAL'
			group by c.nim,a.no_bill,a.no_inv,c.kode_lokasi )b on a.no_batal=b.no_bill and a.kode_lokasi=b.kode_lokasi 
inner join aka_mahasiswa c on b.nim=c.nim and b.kode_lokasi=c.kode_lokasi 
inner join aka_jurusan d on c.kode_jur=d.kode_jur and c.kode_lokasi=d.kode_lokasi 
inner join aka_fakultas e on d.kode_fakultas=e.kode_fakultas and d.kode_lokasi=e.kode_lokasi 
inner join aka_bill_d f on b.no_bill=f.no_bill and b.no_inv=f.no_inv and b.nim=f.nim and a.kode_lokasi=f.kode_lokasi and a.periode=f.periode
left join aka_bill_d g on a.no_batal=substring(g.no_inv,1,15) and b.nim =g.nim and a.kode_lokasi=g.kode_lokasi and g.modul='BATAL'  
inner join aka_tahunaka x on a.kode_lokasi=x.kode_lokasi and a.periode=x.periode
$this->filter and (isnull(b.bpp,0) <> 0 or isnull(b.bppnp,0) <> 0 or isnull(b.sdp2,0) <> 0 or isnull(b.up3,0)  <> 0 or isnull(b.sks,0) <> 0 or isnull(b.perpus,0) <> 0 or isnull(b.denda,0) <> 0 or isnull(b.ustatus,0) <> 0 or isnull(b.asur,0) <> 0 or isnull(b.pddk_lain,0) <> 0  or isnull(b.total,0) <> 0) 
) a 
order by a.periode,a.nim
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
		echo $AddOnLib->judul_laporan("pendapatan pendidikan",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1700'>
  <tr bgcolor='#CCCCCC'>
    <td width='30' align='center' class='header_laporan'>No</td>
	 <td width='100' align='center' class='header_laporan'>No Tagihan</td>
     <td width='100' align='center' class='header_laporan'>No Invoice</td>
     <td width='100' align='center' class='header_laporan'>No Batal</td>
	 <td width='60' align='center' class='header_laporan'>NIM</td>
	 <td width='150' align='center' class='header_laporan'>Nama</td>
	 <td width='60' align='center' class='header_laporan'>Angkatan</td>
	 <td width='140' align='center' class='header_laporan'>Fakultas</td>
    <td width='140' align='center' class='header_laporan'>Jurusan</td>
	<td width='150' align='center' class='header_laporan'>Semester</td>
	<td width='60' align='center' class='header_laporan'>Status Mahasiswa</td>
    <td width='75' align='center' class='header_laporan'>BPP</td>
	<td width='75' align='center' class='header_laporan'>BPPNP</td>
    <td width='75' align='center' class='header_laporan'>SDP2</td>
    <td width='75' align='center' class='header_laporan'>UP3</td>
	<td width='75' align='center' class='header_laporan'>SKS</td>
	<td width='75' align='center' class='header_laporan'>PERPUS</td>
	<td width='75' align='center' class='header_laporan'>DENDA</td>
	<td width='75' align='center' class='header_laporan'>USTATUS</td>
	<td width='75' align='center' class='header_laporan'>ASUR</td>
	<td width='75' align='center' class='header_laporan'>PDDK LAINNYA</td>
	 <td width='90' align='center' class='header_laporan'>Total</td>
   
  </tr>";
        $bpp=0;$sdp2=0;$up3=0;$sks=0;$total=0;$perpus=0;$denda=0;$ustatus=0;$asur=0;$pddk_lain=0;
        $nbpp=0;$nsdp2=0;$nup3=0;$nsks=0;$ntotal=0;$nperpus=0;$ndenda=0;$nustatus=0;$nasur=0;$npddk_lain=0;
        $sbpp=0;$ssdp2=0;$sup3=0;$ssks=0;$stotal=0;$sperpus=0;$sdenda=0;$sustatus=0;$sasur=0;$spddk_lain=0;
        $total=0;$ntotal=0;$stotal=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			
			$bpp+=$row->bpp;
			$bppnp+=$row->bppnp;
			$sdp2+=+$row->sdp2;
			$up3+=$row->up3;
			$sks+=$row->sks;
			$perpus+=$row->perpus;
			$denda+=$row->denda;
			$ustatus+=$row->ustatus;
			$asur+=$row->asur;
			$pddk_lain+=$row->pddk_lain;
            $total+=$row->total;
            $nbpp+=$row->bpp;
			$nbppnp+=$row->bppnp;
			$nsdp2+=+$row->sdp2;
			$nup3+=$row->up3;
			$nsks+=$row->sks;
			$nperpus+=$row->perpus;
			$ndenda+=$row->denda;
			$nustatus+=$row->ustatus;
			$nasur+=$row->asur;
			$npddk_lain+=$row->pddk_lain;
			$ntotal+=$row->total;
			$sbpp+=$bpp-$nbpp;
			$sbppnp+=$bppnp-$nbppnp;
			$ssdp2+=+$sdp2-$nsdp2;
			$sup3+=$up3-$nup3;
			$ssks+=$sks-$nsks;
			$sperpus+=$perpus-$nperpus;
			$sdenda+=$denda-$ndenda;
			$sustatus+=$ustatus-$nustatus;
			$sasur+=$asur-$nasur;
			$spddk_lain+=$pddk_lain-$npddk_lain;
			$stotal+=$total-$ntotal;
		
			echo "<tr>
   <td class='isi_laporan' align='center'>$i</td>
  		<td class='isi_laporan'>$row->no_bill</td>
        <td class='isi_laporan'>$row->no_inv</td>
		<td class='isi_laporan'>$row->no_batal</td>
			<td class='isi_laporan'>$row->nim</td>
			<td class='isi_laporan'>$row->nama</td>
			<td class='isi_laporan'>$row->kode_akt</td>
			<td class='isi_laporan'>$row->kode_fakultas - $row->nama_fakultas</td>
            <td class='isi_laporan'>$row->kode_jur - $row->nama_jur</td>";
            $temP=explode("/",$row->tahunaka);
            $sem=$temP[1];
            $tahunAka = $temP[0];
    if($sem == "1"){
        $semester = "Ganjil";
    }else if($sem == "2"){
        $semester = "Genap";
    }else{
        $semester = "";
    }
            echo"
			<td class='isi_laporan'>$semester $tahunAka</td>
			<td class='isi_laporan'>".strtoupper($row->sts_mhs)."</td>";
    echo"
    <td class='isi_laporan' align='right'>".number_format($row->bpp,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->bppnp,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->sdp2,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->up3,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->sks,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->perpus,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->denda,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->ustatus,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->asur,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->pddk_lain,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->total,0,",",".")."</td>
  
  </tr>";	 
			$i=$i+1;
		}
		echo "<tr>
   <td class='isi_laporan' align='center' colspan='11'>Total</td>
   
    <td class='isi_laporan' align='right'>".number_format($bpp,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($bppnp,0,",",".")."</td>
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
//   echo "<tr>
//    <td class='isi_laporan' align='center' colspan='10'>Neraca</td>
   
//     <td class='isi_laporan' align='right'>".number_format($nbpp,0,",",".")."</td>
// 	<td class='isi_laporan' align='right'>".number_format($nbppnp,0,",",".")."</td>
//     <td class='isi_laporan' align='right'>".number_format($nsdp2,0,",",".")."</td>
//     <td class='isi_laporan' align='right'>".number_format($nup3,0,",",".")."</td>
// 	<td class='isi_laporan' align='right'>".number_format($nsks,0,",",".")."</td>
// 	<td class='isi_laporan' align='right'>".number_format($nperpus,0,",",".")."</td>
// 	<td class='isi_laporan' align='right'>".number_format($ndenda,0,",",".")."</td>
// 	<td class='isi_laporan' align='right'>".number_format($nustatus,0,",",".")."</td>
// 	<td class='isi_laporan' align='right'>".number_format($nasur,0,",",".")."</td>
// 	<td class='isi_laporan' align='right'>".number_format($npddk_lain,0,",",".")."</td>
// 	  <td class='isi_laporan' align='right'>".number_format($ntotal,0,",",".")."</td>
 
//   </tr>";
//   echo "<tr>
//    <td class='isi_laporan' align='center' colspan='10'>Selisih</td>
   
//     <td class='isi_laporan' align='right'>".number_format($sbpp,0,",",".")."</td>
// 	<td class='isi_laporan' align='right'>".number_format($sbppnp,0,",",".")."</td>
//     <td class='isi_laporan' align='right'>".number_format($ssdp2,0,",",".")."</td>
//     <td class='isi_laporan' align='right'>".number_format($sup3,0,",",".")."</td>
// 	<td class='isi_laporan' align='right'>".number_format($ssks,0,",",".")."</td>
// 	<td class='isi_laporan' align='right'>".number_format($sperpus,0,",",".")."</td>
// 	<td class='isi_laporan' align='right'>".number_format($sdenda,0,",",".")."</td>
// 	<td class='isi_laporan' align='right'>".number_format($sustatus,0,",",".")."</td>
// 	<td class='isi_laporan' align='right'>".number_format($sasur,0,",",".")."</td>
// 	<td class='isi_laporan' align='right'>".number_format($spddk_lain,0,",",".")."</td>
// 	  <td class='isi_laporan' align='right'>".number_format($stotal,0,",",".")."</td>
 
//   </tr>";	 	 
		echo "</table></div>";
		return "";
	}
	
}
?>
  
