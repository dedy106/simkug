<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_tm_rptBillForm2 extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		
		$sql="select 1";
		
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
		$periode=$tmp[0];
		
		
		$sql="select a.no_bill,a.no_dokumen as key_nobill,fn_tanggal(a.tanggal) as key_tglbill,a.keterangan as key_ket,
		a.nilai as key_nilai,fn_terbilang(a.nilai) as key_terbilang,
		b.nama as key_namacust,b.alamat as key_alamat,b.kota as key_kota,a.nama_bill as key_kepada,
		c.jabatan as key_jab,c.nama as key_nama,
		a.bank as key_bank,a.cabang as key_cabang,a.no_rek as key_norek,a.nama_rek as key_namarek,
		d.no_dok as key_pks,fn_tanggal(d.tgl_awal) as key_tglpks,d.keterangan as key_ketpks,
		a.no_ba as key_ketba
from bill_m a
inner join cust2 b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi 
inner join karyawan c on a.nik_app=c.nik and a.kode_lokasi=c.kode_lokasi
inner join kontrak_m d on a.no_kontrak=d.no_kontrak and a.kode_lokasi=d.kode_lokasi
$this->filter order by a.no_bill";
		
		$rs=$dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		
		
		$nilai=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$terbilang="Rp ".number_format($row->key_nilai,0,",",".")." ( ".ucwords(strtolower($row->key_terbilang))." Rupiah )";
			echo "<table border='0' cellspacing='2' cellpadding='1' width='600'>
<tbody>
<tr>
<td>Nomor :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; /KUG-01/TPCC-00/2015<br /></td>
</tr>
<tr>
<td>&nbsp;</td>
</tr>
<tr>
<td>Bandung, $row->tgl</td>
</tr>
<tr>
<td>&nbsp;</td>
</tr>
<tr>
<td>Kepada Yth,</td>
</tr>
<tr>
<td>$row->key_kepada</td>
</tr>
<tr>
<td>$row->key_namacust</td>
</tr>
<tr>
<td>$row->key_alamat</td>
</tr>
<tr>
<td>$row->key_kota</td>
</tr>
<tr>
<td>&nbsp;</td>
</tr>
<tr>
<td>
<table border='0' cellspacing='2' cellpadding='1' width='800'>
<tbody>
<tr>
<td width='96'>Perihal</td>
<td width='694'>: Permohonan Pembayaran $row->key_ket</td>
</tr>
<tr>
<td>Lampiran</td>
<td>: 1 (satu) berkas</td>
</tr>
</tbody>
</table>
</td>
</tr>
<tr>
<td>&nbsp;</td>
</tr>
<tr>
<td>Dengan hormat,</td>
</tr>
<tr>
<td>&nbsp;</td>
</tr>
<tr>
<td>
<table border='0' cellspacing='2' cellpadding='1' width='800'>
<tbody>
<tr>
<td width='24' valign='top'>1.</td>
<td width='766'>Menunjuk</td>
</tr>
<tr>
<td>&nbsp;</td>
<td>a. Nota Pesanan Nomor : $row->key_pks tanggal $row->key_tglpks , tentang $row->key_ketpks</td>
</tr>
<tr>
<td>&nbsp;</td>
<td>b. Berita Acara Penyelesaian Pekerjaan (BAPP) $row->key_ketba <br /></td>
</tr>
<tr>
<td>&nbsp;</td>
<td>&nbsp;</td>
</tr>
<tr>
<td valign='top'>2.</td>
<td>Bersama ini kami sampaikan tagihan pembayaran dari invoice untuk pelaksanaan kegiatan diatas sebesar $terbilang</td>
</tr>
<tr>
<td>&nbsp;</td>
<td>&nbsp;</td>
</tr>
<tr>
<td valign='top'>3.</td>
<td>Adapun untuk pembayaran dapat dilakukan melalui transfer ke : Rekening telkom PCC $row->key_bank $row->key_cabang, AC. Nomor $row->key_norek An. $row->key_namarek</td>
</tr>
<tr>
<td>&nbsp;</td>
<td>&nbsp;</td>
</tr>
<tr>
<td valign='top'>4.</td>
<td>Demikian kami sampaikan, atas perhatian dan kerjasamanya kami ucapkan terima kasih</td>
</tr>
</tbody>
</table>
</td>
</tr>
<tr>
<td>&nbsp;</td>
</tr>
<tr>
<td>Hormat kami,</td>
</tr>
<tr>
<td height='58'>&nbsp;</td>
</tr>
<tr>
<td>$row->key_nama</td>
</tr>
<tr>
<td>$row->key_jab</td>
</tr>
</tbody>
</table>";
			echo "<br>";
			echo "<DIV style='page-break-after:always'></DIV>";
			
		}
		echo "";
	
		return "";
		
	}
	
}
?>
