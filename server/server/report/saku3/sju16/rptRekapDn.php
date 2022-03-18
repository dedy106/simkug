<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_sju16_rptRekapDn extends server_report_basic
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
		$sql="select a.no_dn,a.kode_lokasi,a.tanggal,a.tahun_pajak,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.kode_pp,c.tempat,c.alamat as alamat_sju,
    c.jenis,c.jumlah,a.kategori,a.nama_pihak,date_format(c.tgl_beri,'%d/%m/%Y') as tgl_beri,a.kategori,a.nama_aju,a.nama_jabat,
   a.posisi,a.nama_usaha,a.jenis_usaha,a.keterangan,h.logo,h.alamat
from sju_dne_m a
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
inner join sju_dne_d c on a.no_dn=c.no_dn and a.kode_lokasi=b.kode_lokasi
left join lokasi h on a.kode_lokasi=h.kode_lokasi
$this->filter order by a.no_dn";

		$rs = $dbLib->execute($sql);	
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("REKAPITULASI DAFTAR NOMINATIF BIAYA ENTERTAINMENT",$this->lokasi,"");
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' >
  <tr bgcolor='#CCCCCC'>
	<td width='200' align='center' class='header_laporan' colspan='5'>Informasi Umum</td>
	<td width='80' align='center' class='header_laporan' colspan='5'>Pemberian Entertainment</td>
	<td width='60' align='center' class='header_laporan' colspan='7'>Informasi Pihak Ketiga</td>
   </tr>";
   echo
     "<tr>
     <td width='30' align='center' class='header_laporan'>No</td>
    <td width='150' align='center' class='header_laporan'>No DN</td>
	<td width='60' align='center' class='header_laporan'>Tanggal DN</td>
	<td width='100' align='center' class='header_laporan'>Yang Mengajukan</td>
    <td width='100' align='center' class='header_laporan'>Pejabat Berwenang</td>
    <td width='100' align='center' class='header_laporan'>Tahun Pajak</td>
    <td width='80' align='center' class='header_laporan'>Tanggal</td>
    <td width='300' align='center' class='header_laporan'>Tempat</td>
      <td width='200' align='center' class='header_laporan'>Alamat</td>
    <td width='100' align='center' class='header_laporan'>Jenis</td>
    <td width='80' align='center' class='header_laporan'>Jumlah (Rp) </td>
    <td width='80' align='center' class='header_laporan'>Kategori</td>
    <td width='80' align='center' class='header_laporan'>Nama</td>
    <td width='80' align='center' class='header_laporan'>Posisi</td>
    <td width='80' align='center' class='header_laporan'>Nama Perusahaan</td>
    <td width='80' align='center' class='header_laporan'>Jenis Usaha</td>
    <td width='80' align='center' class='header_laporan'>Keterangan</td>

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
     <td class='isi_laporan'>$row->tgl_beri</td>
     <td class='isi_laporan'>$row->tempat</td>
     <td class='isi_laporan'>$row->alamat_sju</td>
     <td class='isi_laporan'>$row->jenis</td>
     <td class='isi_laporan' align='right'>".number_format($row->jumlah,0,",",".")."</td>
     <td class='isi_laporan'>$row->kategori</td>
     <td class='isi_laporan'>$row->nama_pihak</td>
     <td class='isi_laporan'>$row->posisi</td>
     <td class='isi_laporan'>$row->nama_usaha</td>
     <td class='isi_laporan'>$row->jenis</td>
     <td class='isi_laporan'>$row->keterangan</td>
  
	 

    </tr>";
			$i=$i+1;
		}
		echo "</table></div>";
		return "";
	}
	
}
?>
  
