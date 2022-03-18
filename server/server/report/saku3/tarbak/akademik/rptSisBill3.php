<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_tarbak_akademik_rptSisBill3 extends server_report_basic
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
		$sql="select b.no_bill,b.kode_param,b.periode,b.nilai as tagihan,c.keterangan,d.nilai as bayar
		from sis_siswa a 
		inner join sis_bill_d b on a.nis=b.nis and a.kode_lokasi=b.kode_lokasi and a.kode_pp=b.kode_pp
					inner join sis_bill_m c on c.no_bill=b.no_bill and c.kode_lokasi=b.kode_lokasi 
					inner join sis_rekon_d d on a.nis=d.nis and d.no_bill=b.no_bill and d.kode_lokasi=b.kode_lokasi
		$this->filter		and b.nilai<>0 
		GROUP BY a.nis,a.nama
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
		echo $AddOnLib->judul_laporan("saldo siswa",$this->lokasi."<br>".$nama_pp,"PERIODE ".$AddOnLib->ubah_periode($periode));
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1000'>
  <tr align='center' bgcolor='#CCCCCC'>
    <td width='20'  class='header_laporan'>No</td>
    <td width='100'  class='header_laporan'>No Bukti Pemasukan </td>
    <td width='100'  class='header_laporan'>No Bukti Pengeluaran</td>
	<td width='100'   class='header_laporan'>Keterangan</td>
	<td width='50'   class='header_laporan'>Pemasukan</td>
	<td width='50'   class='header_laporan'>Pengeluaran</td>
	<td width='50'   class='header_laporan'>Saldo</td>

		</tr> ";
	$tagihan=0;$bayar=0;$saldo=0;$saldo_pdd=0;$masuk=0;$keluar=0;
		
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$tagihan+=$row->tagihan;
			$bayar+=$row->bayar;
			$saldo=$saldo+$row->tagihan-$row->bayar;
		echo "<tr>
   <td class='isi_laporan' align='center'>$i</td>
    
    <td class='isi_laporan'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKartu('$row->no_bill','$row->kode_lokasi','$kode_pp');\">$row->no_bill</a>";
			echo "</td>
			<td class='isi_laporan'>$row->nama</td>
			<td class='isi_laporan'>$row->kode_param</td>
			<td class='isi_laporan'>$row->keterangan</td>
			<td class='isi_laporan'>$row->periode</td>
			<td align='right' class='isi_laporan'>".number_format($row->tagihan,0,",",".")."</td>
	<td align='right' class='isi_laporan'>".number_format($row->bayar,0,",",".")."</td>
	<td align='right' class='isi_laporan'>".number_format($saldo,0,",",".")."</td>
</tr>";	 
			$i=$i+1;
		}
		echo "<tr>
   <td class='isi_laporan' align='center' colspan='3'>Total</td>
	 <td align='right' class='header_laporan'>".number_format($tagihan,0,",",".")."</td>
	 <td align='right' class='header_laporan'>".number_format($bayar,0,",",".")."</td>
	 <td align='right' class='header_laporan'>".number_format($saldo,0,",",".")."</td>
	 <td align='right' class='header_laporan'>".number_format($masuk,0,",",".")."</td>
	 <td align='right' class='header_laporan'>".number_format($keluar,0,",",".")."</td>
	 <td align='right' class='header_laporan'>".number_format($saldo_pdd,0,",",".")."</td>
</tr>";	 
		echo "</table></div>";
		return "";
	}
	
}
?>
  
