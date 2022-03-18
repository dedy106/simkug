<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_yks_rptPiutangSaldo extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$sql = "select 1 ";
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
		$nik_user=$tmp[0];
		$periode=$tmp[2];
		$kode_lokasi=$tmp[1];
		$sql2="exec sp_yk_saldo_hutang '$periode','$kode_lokasi','$nik_user' ";
		$rs2 = $dbLib->execute($sql2);
		$sql = "select kode_cust,nama,nik_user,tgl_input,n1,n2,n3,n4,n5,n6,n7,n8,n9,n10,n11,n12,n13,n14,n15,n16 from yk_bill_lap where nik_user='$nik_user' ";
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		error_log($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("REKAPITULASI SALDO PIUTANG MITRA",$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
		echo "<table width='1550'  border='1' cellpadding='0' cellspacing='0' class='kotak'>
  <tr bgcolor='#CCCCCC'>
    <td width='70' rowspan='2' align='center' class='header_laporan'>Kode Mitra </td>
    <td width='200' rowspan='2' align='center' class='header_laporan'>Nama Mitra </td>
	<td colspan='4' align='center' class='header_laporan'>Saldo Awal </td>
    <td colspan='4' align='center' class='header_laporan'>Tagihan</td>
    <td colspan='4' align='center' class='header_laporan'>Pembayaran</td>
    <td colspan='4' align='center' class='header_laporan'>Saldo Akhir</td>
  </tr>
  <tr bgcolor='#CCCCCC'> 
    <td width='80' align='center' class='header_laporan'>Biaya Pengobatan</td>
    <td width='80' align='center' class='header_laporan'>Kunjungan</td>
    <td width='80' align='center' class='header_laporan'>Cost Sharing </td>
    <td width='80' align='center' class='header_laporan'>Total</td>
    <td width='80' align='center' class='header_laporan'>Biaya Pengobatan</td>
    <td width='80' align='center' class='header_laporan'>Kunjungan</td>
    <td width='80' align='center' class='header_laporan'>Cost Sharing </td>
    <td width='80' align='center' class='header_laporan'>Total</td>
    <td width='80' align='center' class='header_laporan'>Biaya Pengobatan</td>
    <td width='80' align='center' class='header_laporan'>Kunjungan</td>
    <td width='80' align='center' class='header_laporan'>Cost Sharing </td>
    <td width='80' align='center' class='header_laporan'>Total</td>
    <td width='80' align='center' class='header_laporan'>Biaya Pengobatan</td>
    <td width='80' align='center' class='header_laporan'>Kunjungan</td>
    <td width='80' align='center' class='header_laporan'>Cost Sharing </td>
    <td width='80' align='center' class='header_laporan'>Total</td>
  </tr>";
		$sa_nilai=0;$sa_nilai_kunj=0;$sa_nilai_cs=0;$sa_total=0;$debet_nilai=0;$debet_nilai_kunj=0;$debet_nilai_cs=0;$debet_total=0;
		$kredit_nilai=0;$kredit_nilai_kunj=0;$kredit_nilai_cs=0;$kredit_total=0;$sk_nilai=0;$sk_nilai_kunj=0;$sk_nilai_cs=0;$sk_total=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{	
			$sk_mut=0;
			$sa_nilai=$sa_nilai+$row->n1;
			$sa_nilai_kunj=$sa_nilai_kunj+$row->n2;
			$sa_nilai_cs=$sa_nilai_cs+$row->n3;
			$sa_total=$sa_total+$row->n4;
			$debet_nilai=$debet_nilai+$row->n5;
			$debet_nilai_kunj=$debet_nilai_kunj+$row->n6;
			$debet_nilai_cs=$debet_nilai_cs+$row->n7;
			$debet_total=$debet_total+$row->n8;
			$kredit_nilai=$kredit_nilai+$row->n9;
			$kredit_nilai_kunj=$kredit_nilai_kunj+$row->n10;
			$kredit_nilai_cs=$kredit_nilai_cs+$row->n11;
			$kredit_total=$kredit_total+$row->n12;
			$sk_nilai=$sk_nilai+$row->n13;
			$sk_nilai_kunj=$sk_nilai_kunj+$row->n14;
			$sk_nilai_cs=$sk_nilai_cs+$row->n15;
			$sk_total=$sk_total+$row->n13+$row->n14-$row->n15;
			$sk_mut=$row->n13+$row->n14-$row->n15;
			echo "<tr>
    <td class='isi_laporan' align='center'>$row->kode_cust</td>
    <td class='isi_laporan'>$row->nama</td>
    <td width='80' align='right' class='isi_laporan'>".number_format($row->n1,0,",",".")."</td>
    <td width='80' align='right' class='isi_laporan'>".number_format($row->n2,0,",",".")."</td>
	<td width='80' align='right' class='isi_laporan'>".number_format($row->n3,0,",",".")."</td>
    <td width='80' align='right' class='isi_laporan'>".number_format($row->n4,0,",",".")."</td>
    <td width='80' align='right' class='isi_laporan'>".number_format($row->n5,0,",",".")."</td>
    <td width='80' align='right' class='isi_laporan'>".number_format($row->n6,0,",",".")."</td>
	<td width='80' align='right' class='isi_laporan'>".number_format($row->n7,0,",",".")."</td>
    <td width='80' align='right' class='isi_laporan'>".number_format($row->n8,0,",",".")."</td>
    <td width='80' align='right' class='isi_laporan'>".number_format($row->n9,0,",",".")."</td>
    <td width='80' align='right' class='isi_laporan'>".number_format($row->n10,0,",",".")."</td>
	<td width='80' align='right' class='isi_laporan'>".number_format($row->n11,0,",",".")."</td>
    <td width='80' align='right' class='isi_laporan'>".number_format($row->n12,0,",",".")."</td>
     <td width='80' align='right' class='isi_laporan'>".number_format($row->n13,0,",",".")."</td>
    <td width='80' align='right' class='isi_laporan'>".number_format($row->n14,0,",",".")."</td>
	<td width='80' align='right' class='isi_laporan'>".number_format($row->n15,0,",",".")."</td>
    <td width='80' align='right' class='isi_laporan'>".number_format($sk_mut,0,",",".")."</td>
  </tr>";
		
		}
		echo "<tr>
    <td colspan='2' align='center' class='isi_laporan'>Total</td>
    <td width='80' align='right' class='isi_laporan'>".number_format($sa_nilai,0,",",".")."</td>
    <td width='80' align='right' class='isi_laporan'>".number_format($sa_nilai_kunj,0,",",".")."</td>
	<td width='80' align='right' class='isi_laporan'>".number_format($sa_nilai_cs,0,",",".")."</td>
    <td width='80' align='right' class='isi_laporan'>".number_format($sa_total,0,",",".")."</td>
    <td width='80' align='right' class='isi_laporan'>".number_format($debet_nilai,0,",",".")."</td>
    <td width='80' align='right' class='isi_laporan'>".number_format($debet_nilai_kunj,0,",",".")."</td>
	<td width='80' align='right' class='isi_laporan'>".number_format($debet_nilai_cs,0,",",".")."</td>
    <td width='80' align='right' class='isi_laporan'>".number_format($debet_total,0,",",".")."</td>
    <td width='80' align='right' class='isi_laporan'>".number_format($kredit_nilai,0,",",".")."</td>
    <td width='80' align='right' class='isi_laporan'>".number_format($kredit_nilai_kunj,0,",",".")."</td>
	<td width='80' align='right' class='isi_laporan'>".number_format($kredit_nilai_cs,0,",",".")."</td>
    <td width='80' align='right' class='isi_laporan'>".number_format($kredit_total,0,",",".")."</td>
    <td width='80' align='right' class='isi_laporan'>".number_format($sk_nilai,0,",",".")."</td>
    <td width='80' align='right' class='isi_laporan'>".number_format($sk_nilai_kunj,0,",",".")."</td>
	 <td width='80' align='right' class='isi_laporan'>".number_format($sk_nilai_cs,0,",",".")."</td>
    <td width='80' align='right' class='isi_laporan'>".number_format($sk_total,0,",",".")."</td>
  </tr>";
		echo "</table></div>";
		return "";
	}
	
	
}
?>
