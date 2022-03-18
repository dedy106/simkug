<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_tu_rptProduk extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
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
		$nama_cab=$tmp[1];
		$sql="select kode_produk,nama,kode_lokasi,akun_piutang,akun_pdpt,akun_pdd,akun_bp,akun_ap,no_urut,kode_pp,kode_drk,kode_akt,kode_jalur,tarif
from aka_produk
$this->filter order by kode_produk";
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("data produk",$this->lokasi,"");
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='80'  align='center' class='header_laporan'>Kode Produk</td>
	  <td width='200'  align='center' class='header_laporan'>Nama</td>
	 <td width='90'  align='center' class='header_laporan'>Akun Piutang</td>
     <td width='90'  align='center' class='header_laporan'>Akun Pdpt</td>
     <td width='90'  align='center' class='header_laporan'>Akun PDD</td>
     <td width='90'  align='center' class='header_laporan'>Akun BP</td>
	 <td width='90'  align='center' class='header_laporan'>Akun AP</td>
     <td width='90'  align='center' class='header_laporan'>Kode DRK</td>
	  <td width='90'  align='center' class='header_laporan'>Kode Akt</td>
	 <td width='90'  align='center' class='header_laporan'>Prodi</td>
     <td width='90'  align='center' class='header_laporan'>Kelas</td>
     <td width='90'  align='center' class='header_laporan'>Tarif</td>
	  </tr>  ";
		$nilai=0;$nilai_ppn=0;$tagihan=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai=$nilai+$row->nilai;
			$nilai_ppn=$nilai_ppn+$row->nilai_ppn;
			$tagihan=$tagihan+$row->tagihan;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>$row->kode_produk</td>
	 <td class='isi_laporan'>$row->nama</td>
	 <td class='isi_laporan'>$row->akun_piutang</td>
	 <td class='isi_laporan'>$row->akun_pdpt</td>
	 <td class='isi_laporan'>$row->akun_pdd</td>
	 <td class='isi_laporan'>$row->akun_bp</td>
	 <td class='isi_laporan'>$row->akun_ap</td>
	 <td class='isi_laporan'>$row->kode_drk</td>
	 <td class='isi_laporan'>$row->kode_akt</td>
	 <td class='isi_laporan'>$row->kode_pp</td>
	 <td class='isi_laporan'>$row->kode_jalur</td>
	 <td class='isi_laporan'>$row->tarif</td>
     </tr>";
			$i=$i+1;
		}
	
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
