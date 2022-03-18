<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_aka2_rptAkKartuTu extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		
		$sql="select a.nim,a.nama,a.kode_jur,b.nama as nama_jur,a.kode_akt,a.kode_lokasi,a.kode_fakultas,c.nama as nama_fakultas
from aka_mahasiswa a
inner join aka_jurusan b on a.kode_jur=b.kode_jur and a.kode_lokasi=b.kode_lokasi
inner join aka_fakultas c on b.kode_fakultas=c.kode_fakultas and b.kode_lokasi=c.kode_lokasi $this->filter
order by a.nim ";
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
		$periode=$tmp[0];
		$stsBatal = $tmp[1];
		if($stsBatal == "Tidak"){
			$filterbatal1 = " and isnull(g.no_bill,'-') = '-' ";
			$filterbatal2 = " and isnull(g.no_rekon,'-') = '-' ";
			$filterbatal3 = " and isnull(a.no_batal,'-') = '-' ";
		}else{
			
			$filterbatal1 = "";
			$filterbatal2 = "";
			$filterbatal3 = "";
		}
		$sql="select a.nim,a.nama,a.kode_jur,b.nama as nama_jur,a.kode_akt,a.kode_lokasi,a.kode_fakultas,c.nama as nama_fakultas
from aka_mahasiswa a
inner join aka_jurusan b on a.kode_jur=b.kode_jur and a.kode_lokasi=b.kode_lokasi
inner join aka_fakultas c on b.kode_fakultas=c.kode_fakultas and b.kode_lokasi=c.kode_lokasi $this->filter
order by a.nim ";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		// $rs = $dbLib->execute($sql);	
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("kartu piutang mahasiswa",$this->lokasi);
		
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
        <td class='header_laporan'>Fakultas</td>
        <td class='header_laporan'>: $row->kode_fakultas - $row->nama_fakultas</td>
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
  <tr align='center' bgcolor='#CCCCCC'>
    <td width='120' class='header_laporan'>No Bukti </td>
    <td width='60' class='header_laporan'>Tanggal</td>
    <td width='200' class='header_laporan'>Keterangan</td>
    <td width='60' class='header_laporan'>Tahun Akademik</td>
    <td width='80' class='header_laporan'>Debet</td>
    <td width='80' class='header_laporan'>Kredit</td>
    <td width='80' class='header_laporan'>Saldo</td>
  </tr>";
  if($stsBatal == ""){
	$sql1="select a.no_inv as no_bukti,b.tanggal,date_format(b.tanggal,'%d/%m/%Y') as tgl,'Invoice '+a.kode_produk as keterangan,a.nilai as debet,0 as kredit,a.tahunaka,isnull(g.no_bill,'-') as no_batal
	from aka_bill_d a
	inner join aka_bill_m b on a.no_bill=b.no_bill and a.kode_lokasi=b.kode_lokasi
	left join aka_bill_d g on a.no_inv=g.no_inv and a.nim =g.nim and a.kode_produk=g.kode_produk and a.kode_lokasi=g.kode_lokasi and g.modul='BATAL' 
	where a.nim='$row->nim' and a.kode_lokasi='$row->kode_lokasi'
	union all
	select a.no_bill as no_bukti,b.tanggal,date_format(b.tanggal,'%d/%m/%Y') as tgl,'Invoice '+a.kode_produk as keterangan,0 as debet,a.nilai as kredit,a.tahunaka,isnull(g.no_bill,'-') as no_batal
	from aka_bill_d a
	inner join aka_batal_m b on a.no_bill=b.no_batal and a.kode_lokasi=b.kode_lokasi
	left join aka_bill_d g on a.no_inv=g.no_inv and a.nim =g.nim and a.kode_produk=g.kode_produk and a.kode_lokasi=g.kode_lokasi and g.modul='BATAL' 
	where a.nim='$row->nim' and a.kode_lokasi='$row->kode_lokasi'
	union all
	select a.no_rekon as no_bukti,b.tanggal,date_format(b.tanggal,'%d/%m/%Y') as tgl,'Rekon '+a.kode_produk as keterangan,0 as debet,a.nilai as kredit,f.tahunaka,isnull(g.no_rekon,'-') as no_batal
	from aka_rekon_d a
	inner join aka_rekon_m b on a.no_rekon=b.no_rekon and a.kode_lokasi=b.kode_lokasi
	inner join (SELECT nim,no_inv,kode_lokasi,tahunaka
	FROM aka_bill_d
	GROUP BY nim,no_inv,kode_lokasi,tahunaka)  f on a.no_inv=f.no_inv and a.nim=f.nim and a.kode_lokasi=f.kode_lokasi  
	left join aka_rekon_d g on a.no_inv=g.no_inv and a.nim =g.nim and a.kode_produk=g.kode_produk and a.kode_lokasi=g.kode_lokasi and g.modul='BATAL' 
	where a.nim='$row->nim' and a.kode_lokasi='$row->kode_lokasi' 
	union all
	select a.no_rekon as no_bukti,b.tanggal,date_format(b.tanggal,'%d/%m/%Y') as tgl,'Rekon '+a.kode_produk as keterangan,a.nilai as debet,0 as kredit,f.tahunaka,isnull(g.no_rekon,'-') as no_batal
	from aka_rekon_d a
	inner join aka_batal_m b on a.no_rekon=b.no_batal and a.kode_lokasi=b.kode_lokasi
	inner join (SELECT nim,no_inv,kode_lokasi,tahunaka
	FROM aka_bill_d
	GROUP BY nim,no_inv,kode_lokasi,tahunaka)  f on a.no_inv=f.no_inv and a.nim=f.nim and a.kode_lokasi=f.kode_lokasi  
	left join aka_rekon_d g on a.no_inv=g.no_inv and a.nim =g.nim and a.kode_produk=g.kode_produk and a.kode_lokasi=g.kode_lokasi and g.modul='BATAL' 
	where a.nim='$row->nim' and a.kode_lokasi='$row->kode_lokasi' 
	union all
	select a.no_batal as no_bukti,b.tanggal,date_format(b.tanggal,'%d/%m/%Y') as tgl,'Batal '+a.kode_produk as keterangan,0 as debet,a.nilai as kredit,f.tahunaka,a.no_batal
	from aka_batal_d a
	inner join aka_batal_m b on a.no_batal=b.no_batal and a.kode_lokasi=b.kode_lokasi
	inner join aka_tahunaka f on a.periode=f.periode and a.kode_lokasi=f.kode_lokasi 
	where a.nim='$row->nim' and a.kode_lokasi='$row->kode_lokasi' 
	order by tanggal ";
  }else{
	  
	  $sql1="select a.no_inv as no_bukti,b.tanggal,date_format(b.tanggal,'%d/%m/%Y') as tgl,'Invoice '+a.kode_produk as keterangan,a.nilai as debet,0 as kredit,a.tahunaka,isnull(g.no_bill,'-') as no_batal
from aka_bill_d a
inner join aka_bill_m b on a.no_bill=b.no_bill and a.kode_lokasi=b.kode_lokasi
left join aka_bill_d g on a.no_inv=g.no_inv and a.nim =g.nim and a.kode_produk=g.kode_produk and a.kode_lokasi=g.kode_lokasi and g.modul='BATAL' 
where a.nim='$row->nim' and a.kode_lokasi='$row->kode_lokasi' $filterbatal1
union all
select a.no_rekon as no_bukti,b.tanggal,date_format(b.tanggal,'%d/%m/%Y') as tgl,'Rekon '+a.kode_produk as keterangan,0 as debet,a.nilai as kredit,f.tahunaka,isnull(g.no_rekon,'-') as no_batal
from aka_rekon_d a
inner join aka_rekon_m b on a.no_rekon=b.no_rekon and a.kode_lokasi=b.kode_lokasi
inner join (SELECT nim,no_inv,kode_lokasi,tahunaka
FROM aka_bill_d
GROUP BY nim,no_inv,kode_lokasi,tahunaka)  f on a.no_inv=f.no_inv and a.nim=f.nim and a.kode_lokasi=f.kode_lokasi  
left join aka_rekon_d g on a.no_inv=g.no_inv and a.nim =g.nim and a.kode_produk=g.kode_produk and a.kode_lokasi=g.kode_lokasi and g.modul='BATAL' 
where a.nim='$row->nim' and a.kode_lokasi='$row->kode_lokasi' $filterbatal2
union all
select a.no_batal as no_bukti,b.tanggal,date_format(b.tanggal,'%d/%m/%Y') as tgl,'Batal '+a.kode_produk as keterangan,0 as debet,a.nilai as kredit,f.tahunaka,a.no_batal
from aka_batal_d a
inner join aka_batal_m b on a.no_batal=b.no_batal and a.kode_lokasi=b.kode_lokasi
inner join aka_tahunaka f on a.periode=f.periode and a.kode_lokasi=f.kode_lokasi 
where a.nim='$row->nim' and a.kode_lokasi='$row->kode_lokasi' $filterbatal3
order by tanggal ";
  }

			$rs1 = $dbLib->execute($sql1);
			$saldo=0;$debet=0;$kredit=0;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{	
				$debet=$debet+$row1->debet;
				$kredit=$kredit+$row1->kredit;
				$saldo=$saldo + $row1->debet - $row1->kredit;
				
			  echo "<tr>
				<td class='isi_laporan'>$row1->no_bukti</td>
				<td class='isi_laporan'>$row1->tgl</td>
				<td class='isi_laporan'>$row1->keterangan</td>
				<td class='isi_laporan'>$row1->tahunaka</td>
				<td align='right' class='isi_laporan'>".number_format($row1->debet,0,",",".")."</td>
				<td align='right' class='isi_laporan'>".number_format($row1->kredit,0,",",".")."</td>
				<td align='right' class='isi_laporan'>".number_format($saldo,0,",",".")."</td>
			  </tr>";
			}
			 echo "<tr>
				<td align='center' class='header_laporan' colspan='4'>Total</td>
				<td align='right' class='header_laporan'>".number_format($debet,0,",",".")."</td>
				<td align='right' class='header_laporan'>".number_format($kredit,0,",",".")."</td>
				<td align='right' class='header_laporan'>".number_format($saldo,0,",",".")."</td>
			  </tr>";
			echo "<br>"; 
			$i=$i+1;
		}
		echo "</table></div>";
		return "";
	}
	
}
?>
  
