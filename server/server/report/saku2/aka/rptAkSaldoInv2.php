<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku2_aka_rptAkSaldoInv2 extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$kode_jur=$tmp[2];
		$filter_jur="";
		if ($kode_jur!="")
		{
			$filter_jur=" and y.kode_jur='$kode_jur' ";
		}
		$sql="select count(a.nim)
from aka_mahasiswa a 
inner join aka_jurusan d on a.kode_jur=d.kode_jur and a.kode_lokasi=d.kode_lokasi 
inner join (select x.nim,x.no_inv 
			from aka_bill_d x
			where x.kode_lokasi='$kode_lokasi' and x.periode<='$periode'
			group by x.nim,x.no_inv
			)e on a.nim=e.nim 
inner join (select y.nim,x.no_inv,
			       sum(case x.kode_produk when 'BPP' then x.nilai else 0 end) as bpp, 
				   sum(case x.kode_produk when 'SDP2' then x.nilai else 0 end) as sdp2, 
				   sum(case x.kode_produk when 'UP3' then x.nilai else 0 end) as up3,
				   sum(case x.kode_produk when 'SKS' then x.nilai else 0 end) as sks,
				   sum(case x.kode_produk when 'S2' then x.nilai else 0 end) as s2,
				   sum(x.nilai) as total 		
			from aka_bill_d x 
			inner join aka_mahasiswa y on x.nim=y.nim and x.kode_lokasi=y.kode_lokasi 
			where x.kode_lokasi='$kode_lokasi' and x.periode<='$periode' $filter_jur
			group by y.nim,x.no_inv 
			)b on a.nim=b.nim and b.no_inv=e.no_inv
			$this->filter and (isnull(b.bpp,0)+isnull(b.sdp2,0)+isnull(b.up3,0) +isnull(b.sks,0)+isnull(b.s2,0) <>0 ) ";
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
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$kode_jur=$tmp[2];
		$filter_jur="";
		if ($kode_jur!="")
		{
			$filter_jur=" and y.kode_jur='$kode_jur' ";
		}
		$sql="select a.nim,a.nama,a.kode_jur,d.nama as nama_jur,a.kode_akt,e.no_inv,
	   isnull(b.bpp,0) as debet_bpp,isnull(b.sdp2,0) as debet_sdp2,isnull(b.up3,0) as debet_up3,isnull(b.sks,0) as debet_sks,isnull(b.s2,0) as debet_s2,
	   isnull(b.bpp,0)+isnull(b.sdp2,0)+isnull(b.up3,0)+isnull(b.sks,0)+isnull(b.s2,0) as debet_total,
	   isnull(c.bpp,0) as kredit_bpp,isnull(c.sdp2,0) as kredit_sdp2,isnull(c.up3,0) as kredit_up3,isnull(c.sks,0) as kredit_sks,isnull(c.s2,0) as kredit_s2,
	   isnull(c.bpp,0)+isnull(c.sdp2,0)+isnull(c.up3,0)+isnull(c.sks,0)+isnull(c.s2,0) as kredit_total,
	   (isnull(b.bpp,0)+isnull(b.sdp2,0)+isnull(b.up3,0)+isnull(b.sks,0)+isnull(b.s2,0))-(isnull(c.bpp,0)+isnull(c.sdp2,0)+isnull(c.up3,0)+isnull(c.sks,0)+isnull(c.s2,0)) as saldo
from aka_mahasiswa a 
inner join aka_jurusan d on a.kode_jur=d.kode_jur and a.kode_lokasi=d.kode_lokasi 
inner join (select x.nim,x.no_inv 
			from aka_bill_d x
			where x.kode_lokasi='$kode_lokasi' and x.periode<='$periode'
			group by x.nim,x.no_inv
			)e on a.nim=e.nim
inner join (select y.nim,x.no_inv,
			       sum(case x.kode_produk when 'BPP' then x.nilai else 0 end) as bpp, 
				   sum(case x.kode_produk when 'SDP2' then x.nilai else 0 end) as sdp2, 
				   sum(case x.kode_produk when 'UP3' then x.nilai else 0 end) as up3,
				   sum(case x.kode_produk when 'SKS' then x.nilai else 0 end) as sks,
				   sum(case x.kode_produk when 'S2' then x.nilai else 0 end) as s2,
				   sum(nilai) as total 
			from aka_bill_d x 
			inner join aka_mahasiswa y on x.nim=y.nim and x.kode_lokasi=y.kode_lokasi 
			where x.kode_lokasi='$kode_lokasi' and x.periode<='$periode' $filter_jur
			group by y.nim,x.no_inv 
			)b on a.nim=b.nim and b.no_inv=e.no_inv 
left join (select y.nim,x.no_inv,
				  sum(case x.kode_produk when 'BPP' then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as bpp, 
			      sum(case x.kode_produk when 'SDP2' then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as sdp2, 
			      sum(case x.kode_produk when 'UP3' then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as up3,
				  sum(case x.kode_produk when 'SKS' then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as sks,
				  sum(case x.kode_produk when 'S2' then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as s2,
		          sum((case when x.dc='D' then x.nilai else -x.nilai end)) as total 
		    from aka_rekon_d x 
			inner join aka_mahasiswa y on x.nim=y.nim and x.kode_lokasi=y.kode_lokasi
			where x.kode_lokasi='$kode_lokasi' and x.periode<='$periode' $filter_jur
		   group by y.nim,x.no_inv 
		  )c on a.nim=c.nim and e.no_inv=c.no_inv 
$this->filter and (isnull(b.bpp,0)+isnull(b.sdp2,0)+isnull(b.up3,0)+isnull(b.sks,0)+isnull(b.s2,0)<>0)
 order by a.nim,e.no_inv 
 ";
		echo $sql;
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("saldo piutang mahasiswa",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1500'>
  <tr bgcolor='#CCCCCC'>
    <td width='30' align='center' class='header_laporan'>No</td>
    <td width='60' align='center' class='header_laporan'>NIM</td>
    <td width='200' align='center' class='header_laporan'>Nama</td>
    <td width='50' align='center' class='header_laporan'>Kode Jurusan</td>
    <td width='150' align='center' class='header_laporan'>Jurusan</td>
    <td width='50' align='center' class='header_laporan'>Angkatan</td>
    <td width='150' align='center' class='header_laporan'>No Invoice</td>
    <td width='80' align='center' class='header_laporan'>BPP</td>
    <td width='80' align='center' class='header_laporan'>SDP2</td>
    <td width='80' align='center' class='header_laporan'>UP3</td>
	<td width='80' align='center' class='header_laporan'>SKS</td>
	<td width='80' align='center' class='header_laporan'>S2</td>
    <td width='90' align='center' class='header_laporan'>Total Tagihan</td>
    <td width='80' align='center' class='header_laporan'>BPP</td>
    <td width='80' align='center' class='header_laporan'>SDP2</td>
    <td width='80' align='center' class='header_laporan'>UP3</td>
	<td width='80' align='center' class='header_laporan'>SKS</td>
	<td width='80' align='center' class='header_laporan'>S2</td>
    <td width='90' align='center' class='header_laporan'>Total Rekon</td>
	<td width='90' align='center' class='header_laporan'>Saldo</td>
  </tr>";
		$debet_bpp=0;$debet_sdp2=0;$debet_up3=0;$debet_sks=0;$debet_s2=0;$debet_total=0;
		$kredit_bpp=0;$kredit_sdp2=0;$kredit_up3=0;$kredit_sks=0;$kredit_s2=0;$kredit_total=0;
		$sak_bpp=0;$sak_sdp2=0;$sak_up3=0;$sak_sks=0;$sak_s2=0;$sak_total=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			
			$sak_bpp=$sak_bpp+$sa_bpp;
			$sak_sdp2=$sak_sdp2+$sa_sdp2;
			$sak_up3=$sak_up3+$sa_up3;
			$sak_sks=$sak_sks+$sa_sks;
			$sak_s2=$sak_s2+$sa_s2;
			$sak_total=$sak_total+$sa_total;
			
			$debet_bpp=$debet_bpp+$row->debet_bpp;
			$debet_sdp2=$debet_sdp2+$row->debet_sdp2;
			$debet_up3=$debet_up3+$row->debet_up3;
			$debet_sks=$debet_sks+$row->debet_sks;
			$debet_s2=$debet_s2+$row->debet_s2;
			$debet_total=$debet_total+$row->debet_total;
			
			$kredit_bpp=$kredit_bpp+$row->kredit_bpp;
			$kredit_sdp2=$kredit_sdp2+$row->kredit_sdp2;
			$kredit_up3=$kredit_up3+$row->kredit_up3;
			$kredit_sks=$kredit_sks+$row->kredit_sks;
			$kredit_s2=$kredit_s2+$row->kredit_s2;
			$kredit_total=$kredit_total+$row->kredit_total;
			echo "<tr>
   <td class='isi_laporan' align='center'>$i</td>
    <td class='isi_laporan'>$row->nim</td>
    <td class='isi_laporan'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenSaldoMhs('$row->kode_jur','$row->kode_lokasi');\">$row->nama</a>";
			echo "</td>
			<td class='isi_laporan'>$row->kode_jur</td>
			<td class='isi_laporan'>$row->nama_jur</td>
			<td class='isi_laporan'>$row->kode_akt</td>
			<td class='isi_laporan'>$row->no_inv</td>
    <td class='isi_laporan' align='right'>".number_format($row->debet_bpp,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->debet_sdp2,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->debet_up3,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->debet_sks,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->debet_s2,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->debet_total,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->kredit_bpp,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->kredit_sdp2,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->kredit_up3,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->kredit_sks,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->kredit_s2,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->kredit_total,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->saldo,0,",",".")."</td>
  
  </tr>";	 
			$i=$i+1;
		}
		echo "<tr>
   <td class='isi_laporan' align='center' colspan='7'>Total</td>
   
    <td class='isi_laporan' align='right'>".number_format($debet_bpp,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($debet_sdp2,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($debet_up3,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($debet_sks,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($debet_s2,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($debet_total,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($kredit_bpp,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($kredit_sdp2,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($kredit_up3,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($kredit_sks,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($kredit_s2,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($kredit_total,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($saldo,0,",",".")."</td>
 
  </tr>";	 
		echo "</table></div>";
		return "";
	}
	
}
?>
  
