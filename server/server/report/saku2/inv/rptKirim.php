<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku2_inv_rptKirim extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$sql="select count(a.no_kirim)
from inv_kirim_m a
inner join karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi
inner join karyawan c on a.nik_setuju=c.nik and a.kode_lokasi=c.kode_lokasi
inner join inv_vendor d on a.kode_vendor=d.kode_vendor and a.kode_lokasi=d.kode_lokasi
inner join inv_cabang e on a.kode_cabang=e.kode_cabang and a.kode_lokasi=e.kode_lokasi $this->filter ";
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
		$sql="select a.no_kirim,a.no_dokumen,a.kode_lokasi,convert(varchar,a.tanggal,103) as tanggal,b.nama as nama_buat,
	   c.nama as nama_setuju,a.keterangan,a.periode,d.nama as nama_vendor,a.kode_cabang,e.nama as nama_cabang,a.nik_buat,a.nik_setuju
from inv_kirim_m a
inner join karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi
inner join karyawan c on a.nik_setuju=c.nik and a.kode_lokasi=c.kode_lokasi
inner join inv_vendor d on a.kode_vendor=d.kode_vendor and a.kode_lokasi=d.kode_lokasi
inner join inv_cabang e on a.kode_cabang=e.kode_cabang and a.kode_lokasi=e.kode_lokasi
 $this->filter order by a.no_kirim";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		$i = 1;
		
		$AddOnLib=new server_util_AddOnLib();
		echo $AddOnLib->judul_laporan("pengeluaran barang",$this->lokasi,$AddOnLib->ubah_periode($periode));
		echo "<div align='center'>"; 
		$jenis="";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$jenis=strtoupper($row->jenis);  
			echo "<table  border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td align='center'><table border='1' cellpadding='0' cellspacing='0' class='kotak'>
  <tr>
    <td colspan='19' style='padding:5px'><table width='100%' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td class='header_laporan' width='114'>No Kirim </td>
        <td class='header_laporan'>: $row->no_kirim</td>
        </tr>
      <tr>
        <td class='header_laporan'>Tanggal   </td>
        <td class='header_laporan'>: $row->tanggal</td>
      </tr>
	  <tr>
	    <td class='header_laporan'>No Dokumen</td>
	    <td class='header_laporan'>: $row->no_dokumen</td>
	    </tr>
	<tr>
	  <td class='header_laporan'>Ekspedisi</td>
	  <td class='header_laporan'>: $row->nama_vendor</td>
	  </tr>
	<tr>
	  <td class='header_laporan'>Lokasi Asal </td>
	  <td class='header_laporan'>: $row->nama_cabang</td>
	  </tr>
	<tr>
	  <td class='header_laporan'>NIK Pembuat </td>
	  <td class='header_laporan'>: $row->nik_buat - $row->nama_buat</td>
	  </tr>
	<tr>
      <td class='header_laporan'>NIK Approve </td>
      <td class='header_laporan'>: $row->nik_setuju - $row->nama_setuju</td>
	  </tr>
	<tr>
      <td class='header_laporan'>Keterangan </td>
      <td class='header_laporan'>: $row->keterangan</td>
	  </tr>
	
    </table></td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='10' align='center' class='header_laporan'>No</td>
	<td width='50' align='center' class='header_laporan'>Lok Tujuan </td>
    <td width='200' align='center' class='header_laporan'>Nama Lok Tujuan </td>
	<td width='60' align='center' class='header_laporan'>Kode Barang </td>
    <td width='200' align='center' class='header_laporan'>Nama Barang </td>
    <td width='100' align='center' class='header_laporan'>Merk</td>
	<td width='100' align='center' class='header_laporan'>Tipe</td>
	<td width='100' align='center' class='header_laporan'>Serial</td>
	<td width='100' align='center' class='header_laporan'>Modul</td>
	<td width='100' align='center' class='header_laporan'>SN Modul </td>
	<td width='100' align='center' class='header_laporan'>Voip </td>
	<td width='100' align='center' class='header_laporan'>SN Voip </td>
	
  </tr>
";
		
	  $sql1="select c.kode_cabangtuj,d.nama as nama_cabangtuj,a.kode_barang,a.nama,a.kode_merk,a.tipe,a.serial,a.modul,a.sn_modul,a.voip,a.sn_voip 
from inv_barang a 
inner join inv_merk b on a.kode_merk=b.kode_merk and a.kode_lokasi=b.kode_lokasi 
inner join inv_kirim_d c on a.kode_barang=c.kode_barang and a.kode_lokasi=c.kode_lokasi
inner join inv_cabang d on c.kode_cabangtuj=d.kode_cabang and c.kode_lokasi=d.kode_lokasi
where c.no_kirim='$row->no_kirim' and a.kode_lokasi='$row->kode_lokasi'
order by a.kode_barang desc ";
		
		$rs1 = $dbLib->execute($sql1);
		$j=1;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
			echo "<tr>
    <td align='center' class='isi_laporan'>$j</td>
	<td align='left' class='isi_laporan'>$row1->kode_cabangtuj</td>
	<td align='left' class='isi_laporan'>$row1->nama_cabangtuj</td>
    <td align='left' class='isi_laporan'>";
	echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBukti('$row1->kode_barang','$row1->kode_lokasi');\">$row1->kode_barang</a>";				  
			echo "</td> <td align='left' class='isi_laporan'>$row1->nama</td>
	<td align='left' class='isi_laporan'>$row1->kode_merk</td>
	<td align='left' class='isi_laporan'>$row1->tipe </td>
	<td align='left' class='isi_laporan'>$row1->serial </td>
	<td align='left' class='isi_laporan'>$row1->modul </td>
	<td align='left' class='isi_laporan'>$row1->sn_modul </td>
	<td align='left' class='isi_laporan'>$row1->voip </td>
	<td align='left' class='isi_laporan'>$row1->sn_voip </td>
  </tr>";
		$j=$j+1;
		}
		
	  echo " </table></td>
  </tr>
 
</table><br>";
			
			$i=$i+1;
		}
		echo "</div>";
			
		return "";
	}
	
}
?>
  
