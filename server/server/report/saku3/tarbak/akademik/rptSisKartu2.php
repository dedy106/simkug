<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_tarbak_akademik_rptSisKartu2 extends server_report_basic
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
		$sql="select x.kode_lokasi,sum(x.nilai) as tagihan,sum(c.bayar) as bayar,d.masuk,d.keluar
		from sis_bill_d x 
		inner join sis_siswa y on x.nis=y.nis and x.kode_lokasi=y.kode_lokasi and x.kode_pp=y.kode_pp
		left join sis_bill_m b on x.no_bill=b.no_bill and x.kode_lokasi=b.kode_lokasi 
		left join (select y.kode_pp,y.nis,x.kode_lokasi,
		sum(case when x.modul <>'BTLREKON' then x.nilai else 0 end) as bayar
		from sis_rekon_d x 
		inner join sis_siswa y on x.nis=y.nis and x.kode_lokasi=y.kode_lokasi and x.kode_pp=y.kode_pp 
		left join sis_rekon_m d on x.no_rekon=d.no_rekon and x.kode_lokasi=d.kode_lokasi
		left join (select no_kas,kode_lokasi from kas_m where kode_lokasi='01'
		 union select no_ju as no_kas,kode_lokasi from ju_m where kode_lokasi='01') e on x.no_rekon=e.no_kas and x.kode_lokasi=e.kode_lokasi 
		where x.kode_lokasi = '01' and x.nis='181901004' and x.kode_pp='04' and x.nilai<>0
		group by y.kode_pp,y.nis,x.kode_lokasi  
		)c on x.nis=c.nis and x.kode_lokasi=c.kode_lokasi and x.kode_pp=c.kode_pp

		left join (select x.kode_lokasi, x.kode_pp,sum(case when x.dc='D' then x.nilai else 0 end) as masuk,
			sum(case when x.dc='C' then x.nilai else 0 end) as keluar
		from sis_cd_d x 
		inner join sis_siswa y on x.nis=y.nis and x.kode_lokasi=y.kode_lokasi and x.kode_pp=y.kode_pp 
		where x.kode_lokasi = '01' and x.nis='181901004' and x.kode_pp='04' and x.nilai<>0 
		group by x.kode_lokasi, x.kode_pp
		)d on c.kode_lokasi=d.kode_lokasi and c.kode_pp=d.kode_pp
		$this->filter		and b.nilai<>0 
		group by x.kode_lokasi,x.nis,d.masuk,d.keluar
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
		echo $AddOnLib->judul_laporan("kartusiswa",$this->lokasi."<br>".$nama_pp,"PERIODE ".$AddOnLib->ubah_periode($periode));
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1000'>
  <tr align='center' bgcolor='#CCCCCC'>
    <td width='20'  rowspan='2' class='header_laporan'>No</td>
    <td width='50'  rowspan='2' class='header_laporan'>NIS </td>
    <td width='200'  rowspan='2' class='header_laporan'>Nama</td>
		<td width='50' colspan='3' class='header_laporan'>Saldo Tagihan</td>
		<td width='50' colspan='3' class='header_laporan'>Saldo PDD</td>
		 
		</tr>
		<tr bgcolor='#CCCCCC'>
		<td width='80'  align='center' class='header_laporan'>Tagihan</td>
		<td width='80'  align='center' class='header_laporan'>Pembayaran</td>
		<td width='80'  align='center' class='header_laporan'>Saldo</td>
		<td width='80'  align='center' class='header_laporan'>Pemasukan</td>
		<td width='80'  align='center' class='header_laporan'>Pengeluaran</td>
		<td width='80'  align='center' class='header_laporan'>Saldo</td>
		</tr>
  ";
	$tagihan=0;$bayar=0;$saldo=0;$saldo_pdd=0;$masuk=0;$keluar=0;
		
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$tagihan+=$row->tagihan;
			$bayar+=$row->bayar;
			$masuk+=$row->masuk;
			$keluar+=$row->keluar;
			$saldo=$saldo+$row->tagihan-$row->bayar;
			$saldo_pdd=$saldo_pdd+$row->masuk-$row->keluar;
		echo "<tr>
   <td class='isi_laporan' align='center'>$i</td>
    
    <td class='isi_laporan'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKartu('$row->nis','$row->kode_lokasi','$kode_pp');\">$row->nis</a>";
			echo "</td>
	<td class='isi_laporan'>$row->nama</td>
	<td align='right' class='isi_laporan'>".number_format($row->tagihan,0,",",".")."</td>
	<td align='right' class='isi_laporan'>".number_format($row->bayar,0,",",".")."</td>
	<td align='right' class='isi_laporan'>".number_format($saldo,0,",",".")."</td>
	<td align='right' class='isi_laporan'>".number_format($row->masuk,0,",",".")."</td>
	<td align='right' class='isi_laporan'>".number_format($row->keluar,0,",",".")."</td>
	<td align='right' class='isi_laporan'>".number_format($saldo_pdd,0,",",".")."</td>
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
  
