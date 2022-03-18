<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku2_aka_rptAkKartuTrail extends server_report_basic
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
		$kode_jur=$tmp[2];
		$nim=$tmp[3];
		$sql="select a.nim,a.nama,a.kode_jur,c.nama as nama_jur,e.nama as nama_akt
	   ,isnull(b.bpp,0)-isnull(d.bpp,0) as so_bpp,isnull(b.sdp2,0)-isnull(d.sdp2,0) as so_sdp2,isnull(b.up3,0)-isnull(d.up3,0) as so_up3,
	   isnull(b.bpp,0)-isnull(d.bpp,0) + isnull(b.sdp2,0)-isnull(d.sdp2,0) + isnull(b.up3,0)-isnull(d.up3,0) as so_total
from aka_mahasiswa a 
inner join aka_jurusan c on a.kode_jur=c.kode_jur and a.kode_lokasi=c.kode_lokasi
inner join aka_angkatan e on a.kode_akt=e.kode_akt and a.kode_lokasi=e.kode_lokasi
left join (select y.nim,  sum(case x.kode_produk when 'BPP' then x.nilai else 0 end) as bpp, 
				   sum(case x.kode_produk when 'SDP2' then x.nilai else 0 end) as sdp2, 
				   sum(case x.kode_produk when 'UP3' then x.nilai else 0 end) as up3,sum(nilai) as total 			
			from aka_bill_d x 			
			inner join aka_mahasiswa y on x.nim=y.nim and x.kode_lokasi=y.kode_lokasi 
			where(x.kode_lokasi = '$kode_lokasi')and(x.periode < '$periode') and y.nim='$nim'	
			group by y.nim 			
			)b on a.nim=b.nim 
left join (select y.nim,  sum(case x.kode_produk when 'BPP' then x.nilai else 0 end) as bpp, 
				  sum(case x.kode_produk when 'SDP2' then x.nilai else 0 end) as sdp2, 
				  sum(case x.kode_produk when 'UP3' then x.nilai else 0 end) as up3,sum(nilai) as total 			
			from aka_rekon_d x 			
			inner join aka_mahasiswa y on x.nim=y.nim and x.kode_lokasi=y.kode_lokasi 
			where(x.kode_lokasi = '$kode_lokasi')and(x.periode <'$periode')	and y.nim='$nim'	
			group by y.nim 			
			)d on a.nim=d.nim 
where a.kode_lokasi='$kode_lokasi' and a.nim='$nim'	 ";
		
		$rs = $dbLib->execute($sql);	
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("saldo piutang mahasiswa",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));		
		$i = 1;
		
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table  border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr>
    <td colspan='12' style='padding:3px'><table width='600'  border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='100' class='header_laporan'>NIM</td>
        <td width='500' class='header_laporan'>: $row->nim</td>
      </tr>
      <tr>
        <td class='header_laporan'>Nama</td>
        <td class='header_laporan'>: $row->nama</td>
      </tr>
      <tr>
        <td class='header_laporan'>Jurusan</td>
        <td class='header_laporan'>: $row->kode_jur - $row->nama_jur</td>
      </tr>
      <tr>
        <td class='header_laporan'>Angkatan</td>
        <td class='header_laporan'>: $row->nama_akt</td>
      </tr>
    </table></td>
  </tr>
  <tr align='center'>
    <td colspan='7' rowspan='2' align='right' class='header_laporan'>Saldo Awal&nbsp; </td>
    <td class='header_laporan'>BPP</td>
    <td class='header_laporan'>SDP2</td>
    <td class='header_laporan'>UP3</td>
    <td class='header_laporan'>Total</td>
  </tr>
  <tr align='right'>
    <td class='isi_laporan' align='right'>".number_format($row->so_bpp,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->so_sdp2,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->so_up3,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->so_total,0,",",".")."</td>
  </tr>
  <tr align='center' bgcolor='#CCCCCC'>
	<td width='120' rowspan='2' class='header_laporan'>No Bukti </td>
    <td width='60' rowspan='2' class='header_laporan'>Tanggal</td>
    <td width='200' rowspan='2' class='header_laporan'>Keterangan</td>
    <td colspan='4' class='header_laporan'>Tagihan</td>
    <td colspan='4' class='header_laporan'>Pembayaran</td>
  </tr>
  <tr align='center' bgcolor='#CCCCCC'>
   
    <td width='80' class='header_laporan'>BPP</td>
    <td width='80' class='header_laporan'>SDP2</td>
    <td width='80' class='header_laporan'>UP3</td>
    <td width='90' class='header_laporan'>Total</td>
    <td width='80' class='header_laporan'>BPP</td>
    <td width='80' class='header_laporan'>SDP2</td>
    <td width='80' class='header_laporan'>UP3</td>
    <td width='90' class='header_laporan'>Total</td>
  </tr>";
			$sql1="select a.no_inv as no_bukti,date_format(b.tanggal,'%d/%m/%Y') as tanggal,
			'Invoice '+a.kode_produk as keterangan,
			case a.kode_produk when 'BPP' then a.nilai else 0 end as debet_bpp,
			case a.kode_produk when 'SDP2' then a.nilai else 0 end as debet_sdp2,
			case a.kode_produk when 'UP3' then a.nilai else 0 end as debet_up3,
			0 as kredit_bpp,0 as kredit_sdp2,0 as kredit_up3
from aka_bill_d a
inner join aka_bill_m b on a.no_bill=b.no_bill and a.kode_lokasi=b.kode_lokasi
where a.nim='$row->nim' and a.periode='$periode'
union
select a.no_rekon as no_bukti,date_format(b.tanggal,'%d/%m/%Y') as tanggal,'Rekon '+a.kode_produk as keterangan,
	   0 as debet_bpp,0 as debet_sdp2,0 as debet_up3,
	   case a.kode_produk when 'BPP' then a.nilai else 0 end as kredit_bpp,
	   case a.kode_produk when 'SDP2' then a.nilai else 0 end as kredit_sdp2,
	   case a.kode_produk when 'UP3' then a.nilai else 0 end as kredit_up3
from aka_rekon_d a
inner join aka_rekon_m b on a.no_rekon=b.no_rekon and a.kode_lokasi=b.kode_lokasi
where a.nim='$row->nim' and a.periode='$periode'
 ";
			
			$rs1 = $dbLib->execute($sql1);
			$d=0;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{	
				$debet_total=$row1->debet_bpp + $row1->debet_sdp2 + $row1->debet_up3;
				$kredit_total=$row1->kredit_bpp + $row1->kredit_sdp2 + $row1->kredit_up3;
				$nsaldo=number_format($saldo,0,",",".");
			  echo "<tr>
				<td class='isi_laporan'>$row1->no_bukti</td>
				<td class='isi_laporan'>$row1->tanggal</td>
				<td class='isi_laporan'>$row1->keterangan</td>
				<td class='isi_laporan' align='right'>".number_format($row1->debet_bpp,0,",",".")."</td>
				<td class='isi_laporan' align='right'>".number_format($row1->debet_sdp2,0,",",".")."</td>
				<td class='isi_laporan' align='right'>".number_format($row1->debet_up3,0,",",".")."</td>
				<td class='isi_laporan' align='right'>".number_format($debet_total,0,",",".")."</td>
				<td class='isi_laporan' align='right'>".number_format($row1->kredit_bpp,0,",",".")."</td>
				<td class='isi_laporan' align='right'>".number_format($row1->kredit_sdp2,0,",",".")."</td>
				<td class='isi_laporan' align='right'>".number_format($row1->kredit_up3,0,",",".")."</td>
				<td class='isi_laporan' align='right'>".number_format($kredit_total,0,",",".")."</td>
			  </tr>";
			}
			echo "<br>"; 
			$i=$i+1;
		}
		echo "<tr align='center'>
    <td colspan='3' align='right' class='header_laporan'>Total</td>
    <td class='header_laporan'>&nbsp;</td>
    <td class='header_laporan'>&nbsp;</td>
    <td class='header_laporan'>&nbsp;</td>
    <td class='header_laporan'>&nbsp;</td>
    <td class='header_laporan'>&nbsp;</td>
    <td class='header_laporan'>&nbsp;</td>
    <td class='header_laporan'>&nbsp;</td>
    <td class='header_laporan'>&nbsp;</td>
  </tr>
  <tr align='center'>
    <td colspan='7' align='right' class='header_laporan'>Saldo Akhir&nbsp;</td>
    <td class='header_laporan'>&nbsp;</td>
    <td class='header_laporan'>&nbsp;</td>
    <td class='header_laporan'>&nbsp;</td>
    <td class='header_laporan'>&nbsp;</td>
  </tr>
</table></div>";
		return "";
	}
	
}
?>
  
