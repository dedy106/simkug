<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku2_kopeg_aka_rptAkBillBatal extends server_report_basic
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
		$sql="select a.no_batal,a.keterangan,b.nim,c.nama,c.kode_jur,d.nama as nama_jur,
	   isnull(b.bpp,0) as bpp,isnull(b.sdp2,0) as sdp2,isnull(b.up3,0) as up3 ,isnull(b.sks,0) as sks,
	   isnull(b.bpp,0)+isnull(b.sdp2,0)+isnull(b.up3,0)+isnull(b.sks,0) as total      
from aka_batal_m a
inner join (select c.nim,a.no_batal,c.kode_lokasi,
			       sum(case when a.kode_produk in ('BPP','S2BPP','D3BPP') then a.nilai else 0 end) as bpp, 
				   sum(case when a.kode_produk in ('SDP2','S2SDP2','D3SDP2') then a.nilai else 0 end) as sdp2, 
				   sum(case when a.kode_produk in ('UP3','S2UP3','D3UP3') then a.nilai else 0 end) as up3,
				   sum(case when a.kode_produk in ('SKS','S2SKS','D3SKS') then a.nilai else 0 end) as sks		
			from aka_batal_d a 
			inner join aka_mahasiswa c on a.nim=c.nim and a.kode_lokasi=c.kode_lokasi $this->filter
			group by c.nim,a.no_batal,c.kode_lokasi 
			)b on a.no_batal=b.no_batal and a.kode_lokasi=b.kode_lokasi
inner join aka_mahasiswa c on b.nim=c.nim and b.kode_lokasi=c.kode_lokasi
inner join aka_jurusan d on c.kode_jur=d.kode_jur and c.kode_lokasi=d.kode_lokasi $this->filter
order by b.nim

 ";
	
		$rs = $dbLib->execute($sql);
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("pembatalan tagihan mahasiswa",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' >
  <tr bgcolor='#CCCCCC'>
    <td width='30' align='center' class='header_laporan'>No</td>
	 <td width='100' align='center' class='header_laporan'>No Batal</td>
	  <td width='200' align='center' class='header_laporan'>Keterangan</td>
    <td width='60' align='center' class='header_laporan'>NIM</td>
    <td width='200' align='center' class='header_laporan'>Nama</td>
    <td width='60' align='center' class='header_laporan'>Jurusan</td>
    <td width='80' align='center' class='header_laporan'>BPP</td>
    <td width='80' align='center' class='header_laporan'>SDP2</td>
    <td width='80' align='center' class='header_laporan'>UP3</td>
	<td width='80' align='center' class='header_laporan'>SKS</td>
	 <td width='90' align='center' class='header_laporan'>Total</td>
   
  </tr>";
		$bpp=0;$sdp2=0;$up3=0;$sks=0;$total=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			
			$bpp=$bpp+$row->bpp;
			$sdp2=$sdp2+$row->sdp2;
			$up3=$up3+$row->up3;
			$sks=$sks+$row->sks;
			$total=$total+$row->total;
			
		
			echo "<tr>
   <td class='isi_laporan' align='center'>$i</td>
  		<td class='isi_laporan'>$row->no_batal</td>
			<td class='isi_laporan'>$row->keterangan</td>
			<td class='isi_laporan'>$row->nim</td>
			<td class='isi_laporan'>$row->nama</td>
			<td class='isi_laporan'>$row->kode_jur</td>
    <td class='isi_laporan' align='right'>".number_format($row->bpp,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->sdp2,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->up3,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->sks,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->total,0,",",".")."</td>
  
  </tr>";	 
			$i=$i+1;
		}
		echo "<tr>
   <td class='isi_laporan' align='center' colspan='6'>Total</td>
   
    <td class='isi_laporan' align='right'>".number_format($bpp,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($sdp2,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($up3,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($sks,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($total,0,",",".")."</td>
 
  </tr>";	 
		echo "</table></div>";
		return "";
	}
	
}
?>
  
