<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_tarbak_akademik_rptSisSaldoSiswaYptDebet extends server_report_basic
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
		$nik_user=$tmp[4];
		
		$nama_file="saldo.xls";
		
		$sql="exec sp_sis_saldo '$periode','$kode_lokasi','$kode_pp','$nik_user' ";
		$rs = $dbLib->execute($sql);
		
		$sql="select nama from pp where kode_lokasi='$kode_lokasi' and kode_pp='$kode_pp' ";
		$rs = $dbLib->execute($sql);
		$row = $rs->FetchNextObject($toupper=false);
		$nama_pp=$row->nama;
		
		$sql="select a.nis,a.nama,a.kode_lokasi,a.kode_pp,a.kode_akt,a.kode_kelas,f.kode_jur,f.nama as nama_jur,
		b.n1 as saw_n1,b.n2 as saw_n2,b.n3 as saw_n3,b.n4 as saw_n4,b.n5 as saw_n5,b.n4+b.n5 as saw_total,
		b.n6 as debet_n1,b.n7 as debet_n2,b.n8 as debet_n3,b.n9 as debet_n4,b.n10 as debet_n5,b.n9+b.n10 as debet_total,
		b.n11 as kredit_n1,b.n12 as kredit_n2,b.n13 as kredit_n3,b.n14 as kredit_n4,b.n15 as kredit_n5,b.n14+b.n15  as kredit_total,
		b.n16 as sak_n1,b.n17 as sak_n2,b.n18 as sak_n3,b.n19 as sak_n4,b.n20 as sak_n5,b.n19+b.n20 as sak_total 
from sis_siswa a 
inner join sis_kelas f on a.kode_kelas=f.kode_kelas and a.kode_lokasi=f.kode_lokasi and a.kode_pp=f.kode_pp
inner join sis_jur g on f.kode_jur=g.kode_jur and f.kode_lokasi=g.kode_lokasi and f.kode_pp=g.kode_pp
inner join sis_siswa_saldo b on a.nis=b.nis and a.kode_lokasi=b.kode_lokasi and a.kode_pp=b.kode_pp and b.nik_user='$nik_user'
$this->filter
order by a.kode_kelas,a.nis
 ";
		
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
		echo $AddOnLib->judul_laporan("laporan data auto debet",$this->lokasi."<br>".$nama_pp,"PERIODE ".$AddOnLib->ubah_periode($periode));
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1500'>
  <tr align='center' bgcolor='#CCCCCC'>
    <td width='20' rowspan='2' class='header_laporan'>No</td>
    <td width='50' rowspan='2' class='header_laporan'>NIS </td>
    <td width='200' rowspan='2' class='header_laporan'>Nama</td>
	<td width='60' rowspan='2' class='header_laporan'>Kelas</td>
    <td colspan='3' class='header_laporan'>Saldo Awal </td>
    <td colspan='3' class='header_laporan'>Tagihan</td>
    <td colspan='3' class='header_laporan'>Pembayaran</td>
    <td colspan='3' class='header_laporan'>Saldo Akhir </td>
  </tr>
  <tr bgcolor='#CCCCCC'>
	<td width='80' align='center' class='header_laporan'>SPP</td>
	<td width='80' align='center' class='header_laporan'>DENDA</td>
    <td width='90' align='center' class='header_laporan'>Total</td>
	<td width='80' align='center' class='header_laporan'>SPP</td>
	<td width='80' align='center' class='header_laporan'>DENDA</td>
    <td width='90' align='center' class='header_laporan'>Total</td>
	<td width='80' align='center' class='header_laporan'>SPP</td>
	<td width='80' align='center' class='header_laporan'>DENDA</td>
    <td width='90' align='center' class='header_laporan'>Total</td>
	<td width='80' align='center' class='header_laporan'>SPP</td>
	<td width='80' align='center' class='header_laporan'>DENDA</td>
    <td width='90' align='center' class='header_laporan'>Total</td>
  </tr>";
		$saw_n1=0;$saw_n2=0;$saw_n3=0;$saw_n4=0;$saw_n5=0;$saw_total=0;
		$sak_n1=0;$sak_n2=0;$sak_n3=0;$sak_n4=0;$sak_n5=0;$sak_total=0;
		$debet_n1=0;$debet_n2=0;$debet_n3=0;$debet_n4=0;$debet_n5=0;$debet_total=0;
		$kredit_n1=0;$kredit_n2=0;$kredit_n3=0;$kredit_n4=0;$kredit_n5=0;$kredit_total=0;
		$sak_bpp=0;$sak_sdp2=0;$sak_up3=0;$sak_up4=0;$sak_up5=0;$sak_total=0;$sak_sks=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$saw_n1+=$row->saw_n1; $saw_n2+=$row->saw_n2; $saw_n3+=$row->saw_n3; $saw_n4+=$row->saw_n4;$saw_n5+=$row->saw_n5;$saw_total+=$row->saw_total;
			$debet_n1+=$row->debet_n1; $debet_n2+=$row->debet_n2; $debet_n3+=$row->debet_n3; $debet_n4+=$row->debet_n4;$debet_n5+=$row->debet_n5;$debet_total+=$row->debet_total;
			$kredit_n1+=$row->kredit_n1; $kredit_n2+=$row->kredit_n2; $kredit_n3+=$row->kredit_n3; $kredit_n4+=$row->kredit_n4;$kredit_n5+=$row->kredit_n5;$kredit_total+=$row->kredit_total;
			$sak_n1+=$row->sak_n1; $sak_n2+=$row->sak_n2; $sak_n3+=$row->sak_n3;$sak_n4+=$row->sak_n4;$sak_n5+=$row->sak_n5; $sak_total+=$row->sak_total;
			echo "<tr>
   <td class='isi_laporan' align='center'>$i</td>
    
    <td class='isi_laporan'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKartu('$row->nis','$row->kode_lokasi','$kode_pp');\">$row->nis</a>";
			echo "</td>
	<td class='isi_laporan'>$row->nama</td>
	<td class='isi_laporan'>$row->kode_kelas</td>
	
	<td class='isi_laporan' align='right'>".number_format($row->saw_n4,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->saw_n5,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->saw_total,0,",",".")."</td>

	<td class='isi_laporan' align='right'>".number_format($row->debet_n4,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->debet_n5,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->debet_total,0,",",".")."</td>
   
	<td class='isi_laporan' align='right'>".number_format($row->kredit_n4,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->kredit_n5,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->kredit_total,0,",",".")."</td>
 
	<td class='isi_laporan' align='right'>".number_format($row->sak_n4,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->sak_n5,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->sak_total,0,",",".")."</td>
  </tr>";	 
			$i=$i+1;
		}
		echo "<tr>
   <td class='isi_laporan' align='center' colspan='4'>Total</td>
   
	<td class='isi_laporan' align='right'>".number_format($saw_n4,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($saw_n5,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($saw_total,0,",",".")."</td>
  
	<td class='isi_laporan' align='right'>".number_format($debet_n4,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($debet_n5,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($debet_total,0,",",".")."</td>
   
	<td class='isi_laporan' align='right'>".number_format($kredit_n4,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($kredit_n5,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($kredit_total,0,",",".")."</td>
   
	<td class='isi_laporan' align='right'>".number_format($sak_n4,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($sak_n5,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($sak_total,0,",",".")."</td>
  </tr>";	 
		echo "</table></div>";
		return "";
	}
	
}
?>
  
