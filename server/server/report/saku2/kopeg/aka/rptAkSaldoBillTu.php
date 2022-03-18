<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku2_kopeg_aka_rptAkSaldoBillTu extends server_report_basic
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
		error_log($this->rows."/".$count."/".$totPage);
		return $totPage;
	}
	function getHtml()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$saldo=$tmp[2];
		$jenis=$tmp[3];
		$sql_sub=$tmp[4];
		$nama_file="saldo_mhs_".$periode.".xls";
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
		$tmp="";
		if ($saldo=="Tidak")
		{
			$tmp=" and (isnull(b.bpp,0)-isnull(d.bpp,0)-isnull(f.bpp,0) + isnull(b.sdp2,0)-isnull(d.sdp2,0)-isnull(f.sdp2,0) + isnull(b.up3,0)-isnull(d.up3,0)-isnull(f.up3,0) + isnull(b.sks,0)-isnull(d.sks,0)-isnull(f.sks,0)+
	   isnull(c.bpp,0)-isnull(g.bpp,0) + isnull(c.sdp2,0)-isnull(g.sdp2,0) + isnull(c.up3,0)-isnull(g.up3,0) + isnull(c.sks,0)-isnull(g.sks,0) -
	   isnull(e.bpp,0) + isnull(e.sdp2,0)+ isnull(e.up3,0) + isnull(e.sks,0) <>0 ) ";
		}
		$sql="select a.nim,a.nama,a.kode_lokasi,h.no_inv,a.kode_jur,i.nama as nama_jur,a.kode_fakultas,j.nama as nama_fakultas
	   ,isnull(b.bpp,0)-isnull(d.bpp,0)-isnull(f.bpp,0) as so_bpp,isnull(b.sdp2,0)-isnull(d.sdp2,0)-isnull(f.sdp2,0) as so_sdp2,isnull(b.up3,0)-isnull(d.up3,0)-isnull(f.up3,0) as so_up3,isnull(b.sks,0)-isnull(d.sks,0)-isnull(f.sks,0) as so_sks,
	   isnull(b.bpp,0)-isnull(d.bpp,0)-isnull(f.bpp,0) + isnull(b.sdp2,0)-isnull(d.sdp2,0)-isnull(f.sdp2,0) + isnull(b.up3,0)-isnull(d.up3,0)-isnull(f.up3,0) + isnull(b.sks,0)-isnull(d.sks,0)-isnull(f.sks,0) as so_total,	
	   isnull(c.bpp,0)-isnull(g.bpp,0) as debet_bpp,isnull(c.sdp2,0)-isnull(g.sdp2,0) as debet_sdp2,isnull(c.up3,0)-isnull(g.up3,0) as debet_up3,isnull(c.sks,0)-isnull(g.sks,0) as debet_sks,
	   isnull(c.bpp,0)-isnull(g.bpp,0) + isnull(c.sdp2,0)-isnull(g.sdp2,0) + isnull(c.up3,0)-isnull(g.up3,0) + isnull(c.sks,0)-isnull(g.sks,0) as debet_total,
	   isnull(e.bpp,0) as kredit_bpp,isnull(e.sdp2,0) as kredit_sdp2,isnull(e.up3,0) as kredit_up3,isnull(e.sks,0) as kredit_sks,
	   isnull(e.bpp,0) + isnull(e.sdp2,0)+ isnull(e.up3,0) + isnull(e.sks,0) as kredit_total
from aka_mahasiswa a 
inner join (select x.kode_lokasi,x.nim,x.no_inv
			from aka_bill_d x
			inner join aka_mahasiswa y on x.nim=y.nim and x.kode_lokasi=y.kode_lokasi 
			$sql_sub
			group by x.kode_lokasi,x.nim,x.no_inv
			)h on a.nim=h.nim and a.kode_lokasi=h.kode_lokasi
left join (select y.nim,y.kode_lokasi,x.no_inv,  sum(case when x.kode_produk in ('BPP','S2BPP','D3BPP') then x.nilai else 0 end) as bpp, 
				   sum(case when x.kode_produk in ('SDP2','S2SDP2','D3SDP2')  then x.nilai else 0 end) as sdp2, 
				   sum(case when x.kode_produk in ('UP3','S2UP3','D3UP3') then x.nilai else 0 end) as up3,
				   sum(case when x.kode_produk in ('SKS','S2SKS','D3SKS') then x.nilai else 0 end) as sks		
			from aka_bill_d x 			
			inner join aka_mahasiswa y on x.nim=y.nim and x.kode_lokasi=y.kode_lokasi 
			$sql_sub and x.periode < '$periode'			
			group by y.nim,y.kode_lokasi,x.no_inv	
			)b on h.nim=b.nim and h.kode_lokasi=b.kode_lokasi and h.no_inv=b.no_inv
left join (select y.nim,y.kode_lokasi,x.no_inv,   sum(case when x.kode_produk in ('BPP','S2BPP','D3BPP') then x.nilai else 0 end) as bpp, 
				   sum(case when x.kode_produk in ('SDP2','S2SDP2','D3SDP2') then x.nilai else 0 end) as sdp2, 
				   sum(case when x.kode_produk in ('UP3','S2UP3','D3UP3') then x.nilai else 0 end) as up3,
				   sum(case when x.kode_produk in ('SKS','S2SKS','D3SKS') then x.nilai else 0 end) as sks	
			from aka_bill_d x 			
			inner join aka_mahasiswa y on x.nim=y.nim and x.kode_lokasi=y.kode_lokasi 
			$sql_sub and(x.periode = '$periode')			
			group by y.nim,y.kode_lokasi,x.no_inv 			
			)c on h.nim=c.nim and h.kode_lokasi=c.kode_lokasi and h.no_inv=c.no_inv
left join (select y.nim,y.kode_lokasi,x.no_inv,   sum(case when x.kode_produk in ('BPP','S2BPP','D3BPP') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as bpp, 
			      sum(case when x.kode_produk in ('SDP2','S2SDP2','D3SDP2') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as sdp2, 
			      sum(case when x.kode_produk in ('UP3','S2UP3','D3UP3') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as up3,
				  sum(case when x.kode_produk in ('SKS','S2SKS','D3SKS') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as sks
			from aka_rekon_d x 			
			inner join aka_mahasiswa y on x.nim=y.nim and x.kode_lokasi=y.kode_lokasi 
			$sql_sub and(x.periode <'$periode')			
			group by y.nim ,y.kode_lokasi,x.no_inv			
			)d on h.nim=d.nim and h.kode_lokasi=d.kode_lokasi and h.no_inv=d.no_inv
left join (select y.nim,y.kode_lokasi,x.no_inv,   sum(case when x.kode_produk in ('BPP','S2BPP','D3BPP') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as bpp, 
			      sum(case when x.kode_produk in ('SDP2','S2SDP2','D3SDP2') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as sdp2, 
			      sum(case when x.kode_produk in ('UP3','S2UP3','D3UP3') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as up3,
				  sum(case when x.kode_produk in ('SKS','S2SKS','D3SKS') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as sks
			from aka_rekon_d x 			
			inner join aka_mahasiswa y on x.nim=y.nim and x.kode_lokasi=y.kode_lokasi 
			$sql_sub and(x.periode ='$periode')			
			group by y.nim,y.kode_lokasi,x.no_inv 			
			)e on h.nim=e.nim and h.kode_lokasi=e.kode_lokasi and h.no_inv=e.no_inv
left join (select y.nim,y.kode_lokasi,x.no_inv,  sum(case when x.kode_produk in ('BPP','S2BPP','D3BPP') then x.nilai else 0 end) as bpp, 
				   sum(case when x.kode_produk in ('SDP2','S2SDP2','D3SDP2') then x.nilai else 0 end) as sdp2, 
				   sum(case when x.kode_produk in ('UP3','S2UP3','D3UP3') then x.nilai else 0 end) as up3,
				   sum(case when x.kode_produk in ('SKS','S2SKS','D3SKS') then x.nilai else 0 end) as sks	
			from aka_batal_d x 			
			inner join aka_mahasiswa y on x.nim=y.nim and x.kode_lokasi=y.kode_lokasi 
			$sql_sub and(x.periode < '$periode')			
			group by y.nim,y.kode_lokasi,x.no_inv 			
			)f on h.nim=f.nim and h.kode_lokasi=f.kode_lokasi and h.no_inv=f.no_inv
left join (select y.nim,y.kode_lokasi,x.no_inv,   sum(case when x.kode_produk in ('BPP','S2BPP','D3BPP') then x.nilai else 0 end) as bpp, 
				   sum(case when x.kode_produk in ('SDP2','S2SDP2','D3SDP2') then x.nilai else 0 end) as sdp2, 
				   sum(case when x.kode_produk in ('UP3','S2UP3','D3UP3') then x.nilai else 0 end) as up3,
				   sum(case when x.kode_produk in ('SKS','S2SKS','D3SKS') then x.nilai else 0 end) as sks	
			from aka_batal_d x 			
			inner join aka_mahasiswa y on x.nim=y.nim and x.kode_lokasi=y.kode_lokasi 
			$sql_sub and(x.periode = '$periode')			
			group by y.nim,y.kode_lokasi,x.no_inv			
			)g on h.nim=g.nim and h.kode_lokasi=g.kode_lokasi and h.no_inv=g.no_inv
inner join aka_jurusan i on a.kode_jur=i.kode_jur and a.kode_lokasi=i.kode_lokasi
inner join aka_fakultas j on a.kode_fakultas=j.kode_fakultas and a.kode_lokasi=j.kode_lokasi
$this->filter $tmp
order by a.nim
 ";
		
		$rs = $dbLib->execute($sql);
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("saldo piutang mahasiswa",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1800'>
  <tr align='center' bgcolor='#CCCCCC'>
    <td width='20' rowspan='2' class='header_laporan'>No</td>
	<td width='100' rowspan='2' class='header_laporan'>No Invoice </td>
    <td width='50' rowspan='2' class='header_laporan'>NIM </td>
    <td width='200' rowspan='2' class='header_laporan'>Nama</td>
	<td width='150' rowspan='2' class='header_laporan'>Jurusan</td>
	<td width='150' rowspan='2' class='header_laporan'>Fakultas</td>
    <td colspan='5' class='header_laporan'>Saldo Awal </td>
    <td colspan='5' class='header_laporan'>Tagihan</td>
    <td colspan='5' class='header_laporan'>Pembayaran</td>
    <td colspan='5' class='header_laporan'>Saldo Akhir </td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='80' align='center' class='header_laporan'>BPP</td>
    <td width='80' align='center' class='header_laporan'>SDP2</td>
    <td width='80' align='center' class='header_laporan'>UP3</td>
	<td width='80' align='center' class='header_laporan'>SKS</td>
    <td width='90' align='center' class='header_laporan'>Total</td>
    <td width='80' align='center' class='header_laporan'>BPP</td>
    <td width='80' align='center' class='header_laporan'>SDP2</td>
    <td width='80' align='center' class='header_laporan'>UP3</td>
	<td width='80' align='center' class='header_laporan'>SKS</td>
    <td width='90' align='center' class='header_laporan'>Total</td>
    <td width='80' align='center' class='header_laporan'>BPP</td>
    <td width='80' align='center' class='header_laporan'>SDP2</td>
    <td width='80' align='center' class='header_laporan'>UP3</td>
	<td width='80' align='center' class='header_laporan'>SKS</td>
    <td width='90' align='center' class='header_laporan'>Total</td>
    <td width='80' align='center' class='header_laporan'>BPP</td>
    <td width='80' align='center' class='header_laporan'>SDP2</td>
    <td width='80' align='center' class='header_laporan'>UP3</td>
	<td width='80' align='center' class='header_laporan'>SKS</td>
    <td width='90' align='center' class='header_laporan'>Total</td>
  </tr>";
		$sa_bpp=0;$sa_sdp2=0;$sa_up3=0;$sa_total=0;$sa_sks=0;
		$sak_bpp=0;$sak_sdp2=0;$sak_up3=0;$sak_total=0;$sak_sks=0;
		$so_bpp=0;$so_sdp2=0;$so_up3=0;$so_total=0;$so_sks=0;
		$debet_bpp=0;$debet_sdp2=0;$debet_up3=0;$debet_total=0;$debet_sks=0;
		$kredit_bpp=0;$kredit_sdp2=0;$kredit_up3=0;$kredit_total=0;$kredit_sks=0;
		$sak_bpp=0;$sak_sdp2=0;$sak_up3=0;$sak_total=0;$sak_sks=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$sa_bpp=$row->so_bpp+$row->debet_bpp-$row->kredit_bpp;
			$sa_sdp2=$row->so_sdp2+$row->debet_sdp2-$row->kredit_sdp2;
			$sa_up3=$row->so_up3+$row->debet_up3-$row->kredit_up3;
			$sa_sks=$row->so_sks+$row->debet_sks-$row->kredit_sks;
			$sa_total=$row->so_total+$row->debet_total-$row->kredit_total;
			
			$sak_bpp=$sak_bpp+$sa_bpp;
			$sak_sdp2=$sak_sdp2+$sa_sdp2;
			$sak_up3=$sak_up3+$sa_up3;
			$sak_sks=$sak_sks+$sa_sks;
			$sak_total=$sak_total+$sa_total;
			
			$so_bpp=$so_bpp+$row->so_bpp;
			$so_sdp2=$so_sdp2+$row->so_sdp2;
			$so_up3=$so_up3+$row->so_up3;
			$so_sks=$so_sks+$row->so_sks;
			$so_total=$so_total+$row->so_total;
			
			$debet_bpp=$debet_bpp+$row->debet_bpp;
			$debet_sdp2=$debet_sdp2+$row->debet_sdp2;
			$debet_up3=$debet_up3+$row->debet_up3;
			$debet_sks=$debet_sks+$row->debet_sks;
			$debet_total=$debet_total+$row->debet_total;
			
			$kredit_bpp=$kredit_bpp+$row->kredit_bpp;
			$kredit_sdp2=$kredit_sdp2+$row->kredit_sdp2;
			$kredit_up3=$kredit_up3+$row->kredit_up3;
			$kredit_sks=$kredit_sks+$row->kredit_sks;
			$kredit_total=$kredit_total+$row->kredit_total;
			echo "<tr>
   <td class='isi_laporan' align='center'>$i</td>
   <td class='isi_laporan'>$row->no_inv</td>
    <td class='isi_laporan'>$row->nim</td>
    <td class='isi_laporan'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKartuMhs('$row->nim','$row->kode_lokasi');\">$row->nama</a>";
			echo "</td>
			<td class='isi_laporan'>$row->kode_jur - $row->nama_jur</td>
			<td class='isi_laporan'>$row->kode_fakultas - $row->nama_fakultas</td>
    <td class='isi_laporan' align='right'>".number_format($row->so_bpp,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->so_sdp2,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->so_up3,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->so_sks,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->so_total,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->debet_bpp,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->debet_sdp2,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->debet_up3,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->debet_sks,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->debet_total,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->kredit_bpp,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->kredit_sdp2,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->kredit_up3,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->kredit_sks,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->kredit_total,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($sa_bpp,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($sa_sdp2,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($sa_up3,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($sa_sks,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($sa_total,0,",",".")."</td>
  </tr>";	 
			$i=$i+1;
		}
		echo "<tr>
   <td class='isi_laporan' align='center' colspan='6'>Total</td>
    <td class='isi_laporan' align='right'>".number_format($so_bpp,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($so_sdp2,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($so_up3,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($so_sks,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($so_total,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($debet_bpp,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($debet_sdp2,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($debet_up3,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($debet_sks,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($debet_total,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($kredit_bpp,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($kredit_sdp2,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($kredit_up3,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($kredit_sks,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($kredit_total,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($sak_bpp,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($sak_sdp2,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($sak_up3,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($sak_sks,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($sak_total,0,",",".")."</td>
  </tr>";	 
		echo "</table></div>";
		return "";
	}
	
}
?>
  
