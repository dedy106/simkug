<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku2_aka_rptAkBill extends server_report_basic
{	
	function getTotalPage()
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
		$sql="select count(a.nim)
from aka_mahasiswa a 
inner join aka_jurusan d on a.kode_jur=d.kode_jur and a.kode_lokasi=d.kode_lokasi 
inner join (select x.nim,x.kode_lokasi,x.no_inv 
			from aka_bill_d x
			where x.kode_lokasi='$kode_lokasi' and x.periode<='$periode'
			group by x.nim,x.kode_lokasi,x.no_inv
			)e on a.nim=e.nim and a.kode_lokasi=e.kode_lokasi
inner join (select y.nim,x.no_inv,
			       sum(case when x.kode_produk in ('BPP','S2BPP') then x.nilai else 0 end) as bpp, 
				   sum(case when x.kode_produk in ('SDP2','S2SDP2') then x.nilai else 0 end) as sdp2, 
				   sum(case when x.kode_produk in ('UP3','S2UP3') then x.nilai else 0 end) as up3,
				   sum(case when x.kode_produk in ('SKS','S2SKS') then x.nilai else 0 end) as sks,
				   sum(x.nilai) as total 		
			from aka_bill_d x 
			inner join aka_mahasiswa y on x.nim=y.nim and x.kode_lokasi=y.kode_lokasi 
			where x.kode_lokasi='$kode_lokasi' and x.periode<='$periode' $filter_jur
			group by y.nim,x.no_inv 
			)b on a.nim=b.nim and b.no_inv=e.no_inv
			$this->filter and (isnull(b.bpp,0)+isnull(b.sdp2,0)+isnull(b.up3,0) +isnull(b.sks,0) <>0 ) ";
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
	   isnull(b.bpp,0) as debet_bpp,isnull(b.sdp2,0) as debet_sdp2,isnull(b.up3,0) as debet_up3,isnull(b.sks,0) as debet_sks,
	   isnull(b.bpp,0)+isnull(b.sdp2,0)+isnull(b.up3,0)+isnull(b.sks,0) as debet_total
from aka_mahasiswa a 
inner join aka_jurusan d on a.kode_jur=d.kode_jur and a.kode_lokasi=d.kode_lokasi 
inner join (select x.nim,x.kode_lokasi,x.no_inv 
			from aka_bill_d x
			where x.kode_lokasi='$kode_lokasi' and x.periode<='$periode'
			group by x.nim,x.kode_lokasi,x.no_inv
			)e on a.nim=e.nim and a.kode_lokasi=e.kode_lokasi
inner join (select y.nim,x.no_inv,
			       sum(case when x.kode_produk in ('BPP','S2BPP') then x.nilai else 0 end) as bpp, 
				   sum(case when x.kode_produk in ('SDP2','S2SDP2') then x.nilai else 0 end) as sdp2, 
				   sum(case when x.kode_produk in ('UP3','S2UP3') then x.nilai else 0 end) as up3,
				   sum(case when x.kode_produk in ('SKS','S2SKS') then x.nilai else 0 end) as sks,
				   sum(x.nilai) as total 		
			from aka_bill_d x 
			inner join aka_mahasiswa y on x.nim=y.nim and x.kode_lokasi=y.kode_lokasi 
			where x.kode_lokasi='$kode_lokasi' and x.periode<='$periode' $filter_jur
			group by y.nim,x.no_inv 
			)b on a.nim=b.nim and b.no_inv=e.no_inv 
$this->filter and (isnull(b.bpp,0)+isnull(b.sdp2,0)+isnull(b.up3,0)+isnull(b.sks,0)<>0)
 order by a.nim,e.no_inv 
 ";
	
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("saldo piutang mahasiswa",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' >
  <tr bgcolor='#CCCCCC'>
    <td width='30' align='center' class='header_laporan'>No</td>
    <td width='60' align='center' class='header_laporan'>NIM</td>
    <td width='200' align='center' class='header_laporan'>Nama</td>
    <td width='50' align='center' class='header_laporan'>Kode Jurusan</td>
    <td width='150' align='center' class='header_laporan'>Jurusan</td>
    <td width='50' align='center' class='header_laporan'>Angkatan</td>
	<td width='100' align='center' class='header_laporan'>No Invoice</td>
   <td width='80' align='center' class='header_laporan'>BPP</td>
    <td width='80' align='center' class='header_laporan'>SDP2</td>
    <td width='80' align='center' class='header_laporan'>UP3</td>
	<td width='80' align='center' class='header_laporan'>SKS</td>
	 <td width='90' align='center' class='header_laporan'>Total Tagihan</td>
   
  </tr>";
		$debet_bpp=0;$debet_sdp2=0;$debet_up3=0;$debet_sks=0;$debet_s2=0;$debet_total=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			
			$debet_bpp=$debet_bpp+$row->debet_bpp;
			$debet_sdp2=$debet_sdp2+$row->debet_sdp2;
			$debet_up3=$debet_up3+$row->debet_up3;
			$debet_sks=$debet_sks+$row->debet_sks;
			$debet_total=$debet_total+$row->debet_total;
			
		
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
	  <td class='isi_laporan' align='right'>".number_format($row->debet_total,0,",",".")."</td>
  
  </tr>";	 
			$i=$i+1;
		}
		echo "<tr>
   <td class='isi_laporan' align='center' colspan='7'>Total</td>
   
    <td class='isi_laporan' align='right'>".number_format($debet_bpp,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($debet_sdp2,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($debet_up3,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($debet_sks,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($debet_total,0,",",".")."</td>
 
  </tr>";	 
		echo "</table></div>";
		return "";
	}
	
}
?>
  
