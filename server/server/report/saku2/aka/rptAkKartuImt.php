<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku2_aka_rptAkKartuImt extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$bentuk=$tmp[2];
		$sql="select count(a.nim)
from aka_mahasiswa a
inner join aka_jurusan b on a.kode_jur=b.kode_jur and a.kode_lokasi=b.kode_lokasi
inner join (select distinct nim,kode_lokasi from aka_bill_d) c on a.nim=c.nim and a.kode_lokasi=c.kode_lokasi $this->filter ";
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
		$nama_ver=$tmp[0];
		$sql="select a.nim,a.nama,a.kode_jur,b.nama as nama_jur,a.kode_akt
from aka_mahasiswa a
inner join aka_jurusan b on a.kode_jur=b.kode_jur and a.kode_lokasi=b.kode_lokasi
inner join (select distinct nim,kode_lokasi from aka_bill_d) c on a.nim=c.nim and a.kode_lokasi=c.kode_lokasi $this->filter
order by a.nim ";
		error_log($sql);
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		$tanggal="<div style='font-family: Arial;font-size: 10px;'> Dicetak ".date("d/m/Y  H:m:s")."<div>";
		$judul="<div style='font-family: Arial;font-size: 12px;font-weight: bold;padding:3px;'>".$lokasi."<br>LAPORAN KARTU PIUTANG <br></div>$tanggal";
		$i = 1;
		$jum=$rs->recordcount();
		echo "<div align='center'>$judul"; 
		$AddOnLib=new server_util_AddOnLib();
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table  border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr>
    <td colspan='7' style='padding:3px'><table width='100%'  border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='60' class='header_laporan'>NIM</td>
        <td width='400' class='header_laporan'>: $row->nim</td>
      </tr>
      <tr>
        <td class='header_laporan'>Nama</td>
        <td class='header_laporan'>: $row->nama</td>
      </tr>
      <tr>
        <td class='header_laporan'>Jurusan</td>
        <td class='header_laporan'>: $row->kode_jur - $row->nama_jur</td>
      </tr>
      <tr>
        <td class='header_laporan'>Angkatan</td>
        <td class='header_laporan'>: $row->kode_akt</td>
      </tr>
    </table></td>
  </tr>
  <tr align='center'>
    <td width='120' class='header_laporan'>No Bukti </td>
    <td width='60' class='header_laporan'>Tanggal</td>
    <td width='200' class='header_laporan'>Keterangan</td>
    <td width='80' class='header_laporan'>Debet</td>
    <td width='80' class='header_laporan'>Kredit</td>
    <td width='80' class='header_laporan'>Saldo</td>
  </tr>";
			$sql1="select a.no_inv as no_bukti,date_format(b.tanggal,'%d/%m/%Y') as tanggal,'Invoice '+a.kode_produk as keterangan,a.nilai as debet,0 as kredit
from aka_bill_d a
inner join aka_bill_m b on a.no_bill=b.no_bill and a.kode_lokasi=b.kode_lokasi
where a.nim='$row->nim'
union
select a.no_rekon as no_bukti,date_format(b.tanggal,'%d/%m/%Y') as tanggal,'Rekon '+a.kode_produk as keterangan,0 as debet,a.nilai as kredit
from aka_rekon_d a
inner join aka_rekon_m b on a.no_rekon=b.no_rekon and a.kode_lokasi=b.kode_lokasi
where a.nim='$row->nim'
union
select a.no_batal as no_bukti,date_format(b.tanggal,'%d/%m/%Y') as tanggal,'Batal '+a.kode_produk as keterangan,0 as debet,a.nilai as kredit
from aka_batal_d a
inner join aka_batal_m b on a.no_batal=b.no_batal and a.kode_lokasi=b.kode_lokasi
where a.nim='$row->nim' ";
			$rs1 = $dbLib->execute($sql1);
			$saldo=0;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{	
				$debet=number_format($row1->debet,0,",",".");
				$kredit=number_format($row1->kredit,0,",",".");
				$saldo=$saldo + $row1->debet - $row1->kredit;
				$nsaldo=number_format($saldo,0,",",".");
			  echo "<tr>
				<td class='isi_laporan'>$row1->no_bukti</td>
				<td class='isi_laporan'>$row1->tanggal</td>
				<td class='isi_laporan'>$row1->keterangan</td>
				<td align='right' class='isi_laporan'>$debet</td>
				<td align='right' class='isi_laporan'>$kredit</td>
				<td align='right' class='isi_laporan'>$nsaldo</td>
			  </tr>";
			}
			echo "<br>"; 
			$i=$i+1;
		}
		echo "</table></div>";
		return "";
	}
	
}
?>
  
