<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_tu_kantin_rptBa extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$periode=$tmp[0];
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
		$periode=$tmp[0];
		$sql="select a.no_load,convert(varchar,a.tanggal,103) as tgl,keterangan,b.nama as nama_kantin,c.nama as nama_user
from kantin_load a
inner join ktu_kantin b on a.kode_kantin=b.kode_kantin and a.kode_lokasi=b.kode_lokasi
inner join ktu_user c on a.nik_kasir=c.nik and a.kode_lokasi=b.kode_lokasi						
$this->filter
order by a.no_load ";
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("berita acara",$this->lokasi);
		while ($row = $rs->FetchNextObject($toupper=false))
		{
		echo "<table width='800' border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td><table  border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='120' class='header_laporan'>No Bukti</td>
        <td width='600' class='header_laporan'>: $row->no_load </td>
      </tr>
      <tr>
        <td class='header_laporan'>Tanggal</td>
        <td class='header_laporan'>: $row->tgl </td>
      </tr>
      <tr>
        <td class='header_laporan'>Keterangan</td>
        <td class='header_laporan'>: $row->keterangan </td>
      </tr>
      <tr>
        <td class='header_laporan'>Lokasi Kantin</td>
        <td class='header_laporan'>: $row->nama_kantin </td>
      </tr>
      <tr>
        <td class='header_laporan'>Kasir</td>
        <td class='header_laporan'>: $row->nama_user</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td class='header_laporan'>Nota Tenant </td>
  </tr>
  <tr>
    <td><table width='500' border='1' cellspacing='0' cellpadding='0' class='kotak'>
      <tr>
        <td width='30' align='center' class='header_laporan'>No</td>
        <td width='470' align='center' class='header_laporan'>Nama Tenant </td>
        <td width='100' align='center' class='header_laporan'>Nota</td>
        <td width='100' align='center' class='header_laporan'>NIlai</td>
      </tr>";
	  $sql="select b.nama as nama_tenan,a.jumlah,a.nilai
from kantin_nota a
inner join ktu_tenan b on a.kode_tenan=b.kode_tenan and a.kode_lokasi=b.kode_lokasi
where a.no_load='$row->no_load'";
		
	  $rs1 = $dbLib->execute($sql);
	  $i=1;
	  while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
		  echo "<tr>
			<td class='isi_laporan'>$i</td>
			<td class='isi_laporan'>$row1->nama_tenan</td>
			<td class='isi_laporan' align='right'>".number_format($row1->jumlah,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($row1->nilai,0,",",".")."</td>
		  </tr>";
			$i=$i+1;
		}
    echo "</table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td class='header_laporan'>Nota Kasir </td>
  </tr>
  <tr>
    <td><table width='500' border='1' cellspacing='0' cellpadding='0' class='kotak'>
      <tr>
        <td width='30' align='center' class='header_laporan'>No</td>
        <td width='470' align='center' class='header_laporan'>Nama Barang </td>
        <td width='100' align='center' class='header_laporan'>Nota</td>
        <td width='100' align='center' class='header_laporan'>NIlai</td>
      </tr>";
	  $sql="select b.nama as nama_barang,a.jumlah,a.nilai
from kantin_kasir a
inner join ktu_barang b on a.kode_barang=b.kode_barang and a.kode_lokasi=b.kode_lokasi
where a.no_load='$row->no_load'";
	  $rs1 = $dbLib->execute($sql);
	  $i=1;
	  while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
		  echo "<tr>
			<td class='isi_laporan'>$i</td>
			<td class='isi_laporan'>$row1->nama_barang</td>
			<td class='isi_laporan' align='right'>".number_format($row1->jumlah,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($row1->nilai,0,",",".")."</td>
		  </tr>";
			$i=$i+1;
		}
    echo "</table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td class='header_laporan'>Pembayaran</td>
  </tr>
  <tr>
    <td><table width='500' border='1' cellspacing='0' cellpadding='0' class='kotak'>
      <tr>
        <td width='30' align='center' class='header_laporan'>No</td>
        <td width='470' align='center' class='header_laporan'>Pembayaran </td>
        <td width='100' align='center' class='header_laporan'>Nota</td>
        <td width='100' align='center' class='header_laporan'>NIlai</td>
     </tr>";
	  $sql="select b.ket as nama_bayar,a.jumlah,a.nilai
from kantin_bayar a
inner join ktu_jbayar b on a.kode_bayar=b.kode_bayar and a.kode_lokasi=b.kode_lokasi
where a.no_load='$row->no_load'";
	  $rs1 = $dbLib->execute($sql);
	  $i=1;
	  while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
		  echo "<tr>
			<td class='isi_laporan'>$i</td>
			<td class='isi_laporan'>$row1->nama_bayar</td>
			<td class='isi_laporan' align='right'>".number_format($row1->jumlah,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($row1->nilai,0,",",".")."</td>
		  </tr>";
			$i=$i+1;
		}
    echo "</table></td>
  </tr>
</table>";

	}

	echo "</div>";
	return "";
		
	}
	
}
?>