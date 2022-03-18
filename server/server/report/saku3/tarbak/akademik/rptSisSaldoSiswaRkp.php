<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_tarbak_akademik_rptSisSaldoSiswaRkp extends server_report_basic
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
		$kode_pp=$tmp[1];
		$periode=$tmp[2];
		$jenis=$tmp[3];
		$nama_file="saldo.xls";
		
		$sql="select nama from pp where kode_lokasi='$kode_lokasi' and kode_pp='$kode_pp' ";
		$rs = $dbLib->execute($sql);
		$row = $rs->FetchNextObject($toupper=false);
		$nama_pp=$row->nama;
		
		$sql="select a.kode_lokasi,a.kode_pp,h.nama as sklh,
		sum(case when substring(c.periode,5,2)='01' then c.total else 0 end) as satu,
		sum(case when substring(c.periode,5,2)='02' then c.total else 0 end) as dua,
		sum(case when substring(c.periode,5,2)='03' then c.total else 0 end) as tiga,
		sum(case when substring(c.periode,5,2)='04' then c.total else 0 end) as empat,
		sum(case when substring(c.periode,5,2)='05' then c.total else 0 end) as lima,
		sum(case when substring(c.periode,5,2)='06' then c.total else 0 end) as enam,
		sum(case when substring(c.periode,5,2)='07' then c.total else 0 end) as tujuh,
		sum(case when substring(c.periode,5,2)='08' then c.total else 0 end) as dlpn,
		sum(case when substring(c.periode,5,2)='09' then c.total else 0 end) as smbln,
		sum(case when substring(c.periode,5,2)='10' then c.total else 0 end) as splh,
		sum(case when substring(c.periode,5,2)='11' then c.total else 0 end) as sbls,
		sum(case when substring(c.periode,5,2)='12' then c.total else 0 end) as duabls,
		
	   sum(case when substring(e.periode,5,2)='01' then e.total else 0 end) as satup,
	   sum(case when substring(e.periode,5,2)='01' then e.total else 0 end) as duap,
	   sum(case when substring(e.periode,5,2)='01' then e.total else 0 end) as tigap,
	   sum(case when substring(e.periode,5,2)='01' then e.total else 0 end) as empatp,
	   sum(case when substring(e.periode,5,2)='01' then e.total else 0 end) as limap,
	   sum(case when substring(e.periode,5,2)='01' then e.total else 0 end) as enamp,
	   sum(case when substring(e.periode,5,2)='01' then e.total else 0 end) as tujuhp,
	   sum(case when substring(e.periode,5,2)='01' then e.total else 0 end) as dlpnp,
	   sum(case when substring(e.periode,5,2)='01' then e.total else 0 end) as smblnp,
	   sum(case when substring(e.periode,5,2)='01' then e.total else 0 end) as splhp,
	   sum(case when substring(e.periode,5,2)='01' then e.total else 0 end) as sblsp,
	   sum(case when substring(e.periode,5,2)='01' then e.total else 0 end) as duablsp		
from sis_siswa a 

left join (select y.nis,y.kode_lokasi,x.periode,  
				sum(case when x.kode_param in ('DSP') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as n1, 
				   sum(case when x.kode_param in ('SPP') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end)  as n2, 
				   sum(case when x.kode_param not in ('DSP','SPP') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end)  as n3,
				   sum(case when x.dc='D' then x.nilai else -x.nilai end) as total		
			from sis_bill_d x 			
			inner join sis_siswa y on x.nis=y.nis and x.kode_lokasi=y.kode_lokasi and x.kode_pp=y.kode_pp
			where(x.kode_lokasi = '$kode_lokasi')and(x.periode = '$periode') and x.kode_pp='$kode_pp'			
			group by y.nis,y.kode_lokasi,x.periode				
			)c on a.nis=c.nis and a.kode_lokasi=c.kode_lokasi

left join (select y.nis,y.kode_lokasi,x.periode, 
			  sum(case when x.kode_param in ('DSP') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as n1, 
				   sum(case when x.kode_param in ('SPP') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end)  as n2, 
				   sum(case when x.kode_param not in ('DSP','SPP') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end)  as n3,
				   sum(case when x.dc='D' then x.nilai else -x.nilai end) as total			
			from sis_rekon_d x 			
			inner join sis_siswa y on x.nis=y.nis and x.kode_lokasi=y.kode_lokasi and x.kode_pp=y.kode_pp
			where(x.kode_lokasi = '$kode_lokasi')and(x.periode ='$periode') and x.kode_pp='$kode_pp'			
			group by y.nis,y.kode_lokasi,x.periode			
			)e on a.nis=e.nis and a.kode_lokasi=e.kode_lokasi
			
inner join pp h on a.kode_pp=h.kode_pp and a.kode_lokasi=h.kode_lokasi
$this->filter 
group by a.kode_lokasi,a.kode_pp,h.nama ";
 
		
		if ($jenis=="Excel")
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
		echo $AddOnLib->judul_laporan("rekap saldo siswa",$this->lokasi."<br>".$nama_pp,"PERIODE ".$AddOnLib->ubah_periode($periode));
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1500'>
  <tr align='center' bgcolor='#CCCCCC'>
    <td width='20' rowspan='2' class='header_laporan'>No</td>
    <td width='150' rowspan='2' class='header_laporan'>Nama Sekolah </td>
	<td width='60' rowspan='2' class='header_laporan'>Kode PP</td>
	<td width='150' rowspan='2' class='header_laporan'>Saldo s.d 2016</td>
    <td colspan='2' class='header_laporan'>Januari </td>
    <td colspan='2' class='header_laporan'>Februari</td>
    <td colspan='2' class='header_laporan'>Maret</td>
    <td colspan='2' class='header_laporan'>April </td>
    <td colspan='2' class='header_laporan'>Mei </td>
    <td colspan='2' class='header_laporan'>Juni</td>
    <td colspan='2' class='header_laporan'>Juli</td>
    <td colspan='2' class='header_laporan'>Agustus</td>
    <td colspan='2' class='header_laporan'>September </td>
    <td colspan='2' class='header_laporan'>Oktober</td>
    <td colspan='2' class='header_laporan'>November</td>
    <td colspan='2' class='header_laporan'>Desember</td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='80' align='center' class='header_laporan'>Tagihan</td>
    <td width='80' align='center' class='header_laporan'>Pembayaran</td>
    <td width='80' align='center' class='header_laporan'>Tagihan</td>
    <td width='80' align='center' class='header_laporan'>Pembayaran</td>
    <td width='80' align='center' class='header_laporan'>Tagihan</td>
    <td width='80' align='center' class='header_laporan'>Pembayaran</td>
    <td width='80' align='center' class='header_laporan'>Tagihan</td>
    <td width='80' align='center' class='header_laporan'>Pembayaran</td>
    <td width='80' align='center' class='header_laporan'>Tagihan</td>
    <td width='80' align='center' class='header_laporan'>Pembayaran</td>
    <td width='80' align='center' class='header_laporan'>Tagihan</td>
    <td width='80' align='center' class='header_laporan'>Pembayaran</td>
    <td width='80' align='center' class='header_laporan'>Tagihan</td>
    <td width='80' align='center' class='header_laporan'>Pembayaran</td>
    <td width='80' align='center' class='header_laporan'>Tagihan</td>
    <td width='80' align='center' class='header_laporan'>Pembayaran</td>
    <td width='80' align='center' class='header_laporan'>Tagihan</td>
    <td width='80' align='center' class='header_laporan'>Pembayaran</td>
    <td width='80' align='center' class='header_laporan'>Tagihan</td>
    <td width='80' align='center' class='header_laporan'>Pembayaran</td>
    <td width='80' align='center' class='header_laporan'>Tagihan</td>
    <td width='80' align='center' class='header_laporan'>Pembayaran</td>
    <td width='80' align='center' class='header_laporan'>Tagihan</td>
    <td width='80' align='center' class='header_laporan'>Pembayaran</td>
  </tr>";
		$saw_n1=0;$saw_n2=0;$saw_n3=0;$saw_total=0;
		$sak_n1=0;$sak_n2=0;$sak_n3=0;$sak_total=0;
		$debet_n1=0;$debet_n2=0;$debet_n3=0;$debet_total=0;
		$kredit_n1=0;$kredit_n2=0;$kredit_n3=0;$kredit_total=0;
		$sak_bpp=0;$sak_sdp2=0;$sak_up3=0;$sak_total=0;$sak_sks=0;
		$satu=0;
		$dua=0;
		$tiga=0;
		$empat=0;
		$lima=0;
		$enam=0;
		$tujuh=0;
		$dlpn=0;
		$smbln=0;
		$splh=0;
		$sbls=0;
		$duabls=0;	
		$satup=0;
		$duap=0;
		$tigap=0;
		$empatp=0;
		$limap=0;
		$enamp=0;
		$tujuhp=0;
		$dlpnp=0;
		$smblnp=0;
		$splhp=0;
		$sblsp=0;
		$duablsp=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$saw_n1+=$row->saw_n1; $saw_n2+=$row->saw_n2; $saw_n3+=$row->saw_n3; $saw_total+=$row->saw_total;
			$debet_n1+=$row->debet_n1; $debet_n2+=$row->debet_n2; $debet_n2+=$row->debet_n2; 
			
			$satu+=$row->satu; $dua+=$row->dua; $tiga+=$row->tiga; $empat+=$row->empat; $lima+=$row->lima; $enam+=$row->enam;
			$tujuh+=$row->tujuh; $dlpn+=$row->dlpn; $smbln+=$row->smbln; $splh+=$row->splh; $sbls+=$row->sbls; $duabls+=$row->duabls;
			
			$satup+=$row->satup; $duap+=$row->duap; $tigap+=$row->tigap; $empatp+=$row->empatp; $limap+=$row->limap; $enamp+=$row->enamp;
			$tujuhp+=$row->tujuhp; $dlpnp+=$row->dlpnp; $smblnp+=$row->smblnp; $splhp+=$row->splhp; $sblsp+=$row->sblsp; $duablsp+=$row->duablsp;
			
			$satu1+=$satu; $dua2+=$dua; $tiga3+=$tiga; $empat1+=$empat; $lima2+=$lima; $enam3+=$enam;
			$tujuh1+=$tujuh; $dlpn2+=$dlpn; $smbln3+=$smbln; $splh1+=$splh; $sbls2+=$sbls; $duabls3+=$duabls;
			
			$satup1+=$satup; $duap2+=$duap; $tigap3+=$tigap; $empatp1+=$empatp; $limap2+=$limap; $enamp3+=$enamp;
			$tujuhp1+=$tujuhp2; $dlpnp3+=$dlpnp; $smblnp1+=$smblnp; $splhp2+=$splhp; $sblsp3+=$sblsp; $duablsp1+=$duablsp;
			
			$kredit_n1+=$row->kredit_n1; $kredit_n2+=$row->kredit_n2; $kredit_n3+=$row->kredit_n3; $kredit_total+=$row->kredit_total;
			$sak_n1+=$row->sak_n1; $sak_n2+=$row->sak_n2; $sak_n3+=$row->sak_n3; $sak_total+=$row->sak_total;
			echo "<tr>
   <td class='isi_laporan' align='center'>$i</td>
	<td class='isi_laporan'>$row->sklh</td>
	<td class='isi_laporan'>$row->kode_pp</td>
    <td class='isi_laporan' align='right'>$row->kode_pp</td>
    <td class='isi_laporan' align='right'>".number_format($satu,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($satup,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($dua,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($duap,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($tiga,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($tigap,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($empat,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($empatp,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($lima,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($limap,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($enam,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($enamp,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($tujuh,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($tujuhp,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($dlpn,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($dlpnp,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($smbln,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($smblnp,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($splh,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($splhp,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($sbls,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($sblsp,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($duabls,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($duablsp,0,",",".")."</td>
  </tr>";	 
			$i=$i+1;
		}
		echo "<tr>
   <td class='isi_laporan' align='center' colspan='4'>Total</td>
    <td class='isi_laporan' align='right'>".number_format($satu1,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($satup1,0,",",".")."</td>	
    <td class='isi_laporan' align='right'>".number_format($dua2,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($duap2,0,",",".")."</td>	
	<td class='isi_laporan' align='right'>".number_format($tiga3,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($tigap3,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($empat1,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($empatp1,0,",",".")."</td>
   <td class='isi_laporan' align='right'>".number_format($lima2,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($limap2,0,",",".")."</td>
   <td class='isi_laporan' align='right'>".number_format($enam3,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($enamp3,0,",",".")."</td>
   <td class='isi_laporan' align='right'>".number_format($tujuh1,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($tujuhp1,0,",",".")."</td>
   <td class='isi_laporan' align='right'>".number_format($dlpn2,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($dlpnp3,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($smbln3,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($smblnp1,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($splh1,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($splhp2,0,",",".")."</td>
   <td class='isi_laporan' align='right'>".number_format($sbls2,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($sblsp3,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($duabls3,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($duablsp1,0,",",".")."</td>

  </tr>";	 
		echo "</table></div>";
		return "";
	}
	
}
?>
  
