<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_aka2_rptDwBillTu extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		
		$sql="select count(*)
			from exs_aka_bill a
			inner join aka_mahasiswa b on a.nim=b.nim and a.kode_lokasi=b.kode_lokasi 
			inner join aka_jurusan c on b.kode_jur=c.kode_jur and b.kode_lokasi=c.kode_lokasi 
			inner join aka_fakultas d on c.kode_fakultas=d.kode_fakultas and c.kode_lokasi=d.kode_lokasi 
			inner join aka_bill_m e on a.no_bill=e.no_bill and a.kode_lokasi=e.kode_lokasi
			left join exs_aka_bea f on a.no_inv=f.no_inv and a.kode_lokasi=f.kode_lokasi
			$this->filter ";
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
		$periode=$tmp[1];
		$jenis=$tmp[2];
		$sts_batal=$tmp[3];
		$filter_rekon=$tmp[4];
		$nama_file="bill_mhs_".$periode.".xls";
		$sql_batal="";
		if ($sts_batal=="Batal")
		{
			$sql_batal=" and isnull(g.no_bill,'-')<>'-' ";
		}
		if ($sts_batal=="Aktif")
		{
			$sql_batal=" and isnull(g.no_bill,'-')='-' ";
		}
		
		$bpp=0;$bppnp=0;$sdp2=0;$up3=0;$sks=0;$total=0;$perpus=0;$denda=0;$ustatus=0;$asur=0;$pddk_lain=0;$bea=0;$bayar=0;$sisa=0;$selisih=0;
		
		$sql="select a.no_bill,a.no_inv,a.nim,b.nama,c.nama as nama_jur,d.nama as nama_fak,a.tahunaka,
       a.n1 as bpp,a.n2 as bppnp,a.n3 as sdp2,a.n4 as up3,a.n5 as sks,a.n6 as perpus,a.n7 as denda,a.n8 as ustatus,a.n9 as asur,a.n10 as pddk_lain,a.total,
	   isnull(f.n1,0) as bea,e.keterangan,isnull(g.no_bill,'-') as no_batal,
	   isnull(h.bayar,0)-isnull(f.n1,0) as bayar,isnull(h.bayar,0) as bayar_total,a.total-isnull(h.bayar,0) as selisih
from exs_aka_bill a
inner join aka_mahasiswa b on a.nim=b.nim and a.kode_lokasi=b.kode_lokasi 
inner join aka_jurusan c on b.kode_jur=c.kode_jur and b.kode_lokasi=c.kode_lokasi 
inner join aka_fakultas d on c.kode_fakultas=d.kode_fakultas and c.kode_lokasi=d.kode_lokasi 
inner join aka_bill_m e on a.no_bill=e.no_bill and a.kode_lokasi=e.kode_lokasi
left join exs_aka_bea f on a.no_inv=f.no_inv and a.kode_lokasi=f.kode_lokasi
left join exs_aka_bill_batal g on a.no_inv=g.no_inv and a.kode_lokasi=g.kode_lokasi
left join (select a.no_inv,a.kode_lokasi,sum(a.total) as bayar
		   from exs_aka_rekon a
		   inner join aka_mahasiswa b on a.nim=b.nim and a.kode_lokasi=b.kode_lokasi 
		   inner join aka_jurusan c on b.kode_jur=c.kode_jur and b.kode_lokasi=c.kode_lokasi 
		   $filter_rekon
		   group by a.no_inv,a.kode_lokasi
		  )h on a.no_inv=h.no_inv and a.kode_lokasi=h.kode_lokasi
$this->filter $sql_batal
order by a.nim,a.no_bill
 ";
		
	
		if ($jenis=="Excell") {
			header("Pragma: public");
			header("Expires: 0");
			header("Cache-Control: must-revalidate, post-check=0, pre-check=0"); 
			header("Content-Type: application/force-download");
			header("Content-Type: application/octet-stream");
			header("Content-Type: application/download");;
			header("Content-Disposition: attachment;filename=$nama_file"); 
			header("Content-Transfer-Encoding: binary ");
			$i = 1;
			$rs = $dbLib->execute($sql);
		}
		else {
			$start = (($this->page-1) * $this->rows);
			$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
			$i = $start+1;
		}
		
		
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("tagihan mahasiswa",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='2000'>
  <tr bgcolor='#CCCCCC'>
    <td width='30' align='center' class='header_laporan'>No</td>
	 <td width='100' align='center' class='header_laporan'>No Tagihan</td>
	 <td width='100' align='center' class='header_laporan'>No Invoice</td>
	 <td width='60' align='center' class='header_laporan'>NIM</td>
	 <td width='150' align='center' class='header_laporan'>Nama</td>
	 <td width='60' align='center' class='header_laporan'>Tahun Akademik</td>
	 <td width='140' align='center' class='header_laporan'>Fakultas</td>
    <td width='140' align='center' class='header_laporan'>Jurusan</td>
	<td width='150' align='center' class='header_laporan'>Keterangan</td>
	<td width='100' align='center' class='header_laporan'>No Batal</td>
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
	 <td width='90' align='center' class='header_laporan'>Total Tagihan</td>
	 <td width='75' align='center' class='header_laporan'>Beasiswa</td>
	  <td width='75' align='center' class='header_laporan'>Bayar</td>
	 <td width='75' align='center' class='header_laporan'>Total Bayar</td>
	 <td width='75' align='center' class='header_laporan'>selisih</td>
	
   
  </tr>";
		$bpp=0;$bppnp=0;$sdp2=0;$up3=0;$sks=0;$total=0;$perpus=0;$denda=0;$ustatus=0;$asur=0;$pddk_lain=0;$bea=0;
		$bayar=0;$bayar_total=0;$selisih=0;
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
			$bea+=$row->bea;
			$sisa+=$row->total_bea;
			$bayar+=$row->bayar;
			$selisih+=$row->selisih;
			$bayar_total+=$row->bayar_total;
		
			echo "<tr>
   <td class='isi_laporan' align='center'>$i</td>
  	<td class='isi_laporan'>$row->no_bill</td>
	<td class='isi_laporan'>$row->no_inv</td>
	<td class='isi_laporan'>$row->nim</td>
	<td class='isi_laporan'>$row->nama</td>
	<td class='isi_laporan'>$row->tahunaka</td>
	<td class='isi_laporan'>$row->nama_fak</td>
	<td class='isi_laporan'>$row->nama_jur</td>
	<td class='isi_laporan'>$row->keterangan</td>
	<td class='isi_laporan' align='right'>$row->no_batal</td>
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
	<td class='isi_laporan' align='right'>".number_format($row->bea,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->bayar,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->bayar_total,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->selisih,0,",",".")."</td>
  </tr>";	 
			$i=$i+1;
		}
		echo "<tr>
   <td class='isi_laporan' align='center' colspan='10'>Total</td>
   
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
	  <td class='isi_laporan' align='right'>".number_format($bea,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($bayar,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($bayar_total,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($selisih,0,",",".")."</td>
 
  </tr>";	 
		echo "</table></div>";
		return "";
	}
	
}
?>
  
