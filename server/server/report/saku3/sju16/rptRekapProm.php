<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_sju16_rptRekapProm extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$sql="select 1 ";
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
		$tmp=explode("/",$this->filter);
		$lokasi=$tmp[0];
		$periode=$tmp[1];
		$sql="select a.no_dn,a.kode_lokasi,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.tahun_pajak,a.tanggal,a.kode_pp,a.alamat as alamat_sju,
		a.jenis,a.jumlah,a.kategori,date_format(a.tgl_terima,'%d/%m/%Y') as tgl_terima,a.nama,a.npwp,a.alamat,a.pph,a.no_pot,
	   a.keterangan,h.logo,h.alamat,a.nama_aju,a.nama_jabat,a.no_bayar,a.persen
	from sju_dnp_m a
	inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
	left join lokasi h on a.kode_lokasi=h.kode_lokasi
$this->filter order by a.no_dn";

		$rs = $dbLib->execute($sql);	
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("REKAPITULASI DAFTAR NOMINATIF BIAYA PROMOSI",$this->lokasi,"");
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' >
  <tr bgcolor='#CCCCCC'>
	<td width='200' align='center' class='header_laporan' colspan='6'>Informasi Umum</td>
	<td width='80' align='center' class='header_laporan' colspan='7'>Data Penerima</td>
	<td width='60' align='center' class='header_laporan' colspan='4'>Pemotongan PPH</td>
   </tr>";
   echo
     "<tr>
     <td width='30' align='center' class='header_laporan'>No</td>
    <td width='150' align='center' class='header_laporan'>No DN</td>
	<td width='60' align='center' class='header_laporan'>Tanggal DN</td>
	<td width='100' align='center' class='header_laporan'>Yang Mengajukan</td>
    <td width='100' align='center' class='header_laporan'>Pejabat Berwenang</td>
    <td width='100' align='center' class='header_laporan'>Tahun Pajak</td>
	<td width='400' align='center' class='header_laporan'>Nama</td>
    <td width='150' align='center' class='header_laporan'>NPWP</td>
      <td width='400' align='center' class='header_laporan'>Alamat</td>
    <td width='80' align='center' class='header_laporan'>Tanggal</td>
    <td width='150' align='center' class='header_laporan'>Bentuk dan Jenis Biaya </td>
    <td width='80' align='center' class='header_laporan'>Jumlah (Rp) </td>
    <td width='80' align='center' class='header_laporan'>Keterangan</td>
    <td width='80' align='center' class='header_laporan'>Jumlah PPH</td>
    <td width='80' align='center' class='header_laporan'>%</td>
      <td width='150' align='center' class='header_laporan'>No. Bukti Potong</td>
      <td width='150' align='center' class='header_laporan'>No. Bukti Bayar</td>

    </tr>";	 
			while ($row = $rs->FetchNextObject($toupper=false))
		{
		
		echo "<tr>
    <td class='isi_laporan' align='center'>$i</td>
	 <td class='isi_laporan'>$row->no_dn</td>
	 <td class='isi_laporan'>$row->tgl</td>	 
	 <td class='isi_laporan'>$row->nama_aju</td>
	 <td class='isi_laporan'>$row->nama_jabat</td>
	 <td class='isi_laporan'>$row->tahun_pajak</td>
	 <td class='isi_laporan'>$row->nama</td>
	 <td class='isi_laporan'>$row->npwp</td>
	 <td class='isi_laporan'>$row->alamat</td>
	 <td class='isi_laporan'>$row->tgl_terima</td>
	 <td class='isi_laporan'>$row->jenis</td>
	 <td class='isi_laporan' align='right'>".number_format($row->jumlah,0,",",".")."</td>
	 <td class='isi_laporan'>$row->keterangan</td>
	 <td class='isi_laporan' align='right'>".number_format($row->pph,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->persen,0,",",".")."</td>
	 <td class='isi_laporan'>$row->no_pot</td>
	 <td class='isi_laporan'>$row->no_bayar</td>

	 

    </tr>";
			$i=$i+1;
		}
		echo "</table></div>";
		return "";
	}
	
}
?>
  
