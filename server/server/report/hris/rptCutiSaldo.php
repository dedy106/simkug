<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_hris_rptCutiSaldo extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
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
		$tmp=explode("/",$this->filter2);
		$tahun=$tmp[0];
		$sts_cuti=$tmp[1];
		$nama_cuti=$tmp[2];
		$periode=$tmp[3];
		$bulan=$tmp[4];
		$sql="select a.nik,a.nama,b.nama as jabatan,date_format(a.tgl_masuk,'%d/%m/%Y') as tgl_masuk,isnull(c.so_awal,0) as so_awal,
	   isnull(c.plafon,0) as plafon1,isnull(c.tambah,0) as tambah1,isnull(d.debet,0)+isnull(e.debet,0)  as debet1,
	   isnull(c.so_awal,0)+isnull(c.tambah,0)-isnull(d.debet,0)-isnull(e.debet,0)-isnull(c.kurang,0)-isnull(f.sd,0) as so_akhir1,
	   isnull(f.sd,0) as sd
from gr_karyawan a
inner join gr_jab b on a.kode_jab=b.kode_jab
left join (select nik,sum(jumlah) as plafon,sum(tambah) as tambah,sum(jumlah) as so_awal,sum(kurang) as kurang
		   from gr_cuti_karyawan
           where sts_cuti='$sts_cuti' and substring(periode,1,4)='$tahun'
           group by nik,sts_cuti
		   )c on a.nik=c.nik
left join (select nik_buat,sum(lama+lama_lalu) as debet
		   from gr_cuti
           where sts_cuti='$sts_cuti' and substring(periode,1,4)='$tahun' and no_cuti not like '%CLS%'
           group by nik_buat
		   )d on a.nik=d.nik_buat
left join (select nik,sum(lama) as debet
		   from gr_cuti_d
           where sts_cuti='$sts_cuti' and substring(periode,1,4)='$tahun'
           group by nik
		   )e on a.nik=e.nik
left join (select nik_buat,sum(lama_lalu) as sd
		   from gr_cuti
           where sts_cuti='$sts_cuti' and periode<='$periode' and substring(periode,1,4)='$tahun' and no_cuti like '%CLS%'
           group by nik_buat
		   )f on a.nik=f.nik_buat
left join (select nik,sum(jumlah+tambah) as so_awal
		   from gr_cuti_karyawan
           where sts_cuti='$sts_cuti' and periode<='$periode' and substring(periode,1,4)='$tahun'
           group by nik,sts_cuti
		   )g on a.nik=g.nik
$this->filter
order by a.nik ";
		
		$rs = $dbLib->execute($sql);
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		echo $AddOnLib->judul_laporan("SISA CUTI PEGAWAI",$this->lokasi,"TAHUN ".$tahun);
		echo "<div align='center'>";
		echo "<table  border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr bgcolor='#CCCCCC'>
	<td width='20' rowspan='2' align='center' class='header_laporan'>No</td>
    <td width='60' rowspan='2' align='center' class='header_laporan'>NIK</td>
    <td width='200' rowspan='2' align='center' class='header_laporan'>Nama</td>
    <td width='200' rowspan='2' align='center' class='header_laporan'>Jabatan</td>
    <td width='60' rowspan='2' align='center' class='header_laporan'>Tgl Masuk </td>
    <td colspan='5' align='center' class='header_laporan'>$nama_cuti</td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='60' align='center' class='header_laporan'>Hak Cuti Tahun Ini</td>
    <td width='60' align='center' class='header_laporan'>Sisa Cuti Tahun Lalu</td>
    <td width='60' align='center' class='header_laporan'>Pemakaian</td>
	<td width='60' align='center' class='header_laporan'>Pemutihan</td>
	<td width='60' align='center' class='header_laporan'>Sisa Cuti Tahun Ini</td>
  </tr>";
		
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$hari=$AddOnLib->ubahNamaHari($row->hari);
			$bulan=$AddOnLib->ubah_bulan($row->bulan);
			echo " <tr>
	<td class='isi_laporan'>$i</td>
    <td class='isi_laporan'>$row->nik</td>
    <td class='isi_laporan'>$row->nama</td>
    <td class='isi_laporan'>$row->jabatan</td>
    <td class='isi_laporan'>$row->tgl_masuk</td>
    <td align='center' class='isi_laporan'>".number_format($row->so_awal,0,',','.')."</td>
    <td align='center' class='isi_laporan'>".number_format($row->tambah1,0,',','.')."</td>
    <td align='center' class='isi_laporan'>".number_format($row->debet1,0,',','.')."</td>
	<td align='center' class='isi_laporan'>".number_format($row->sd,0,',','.')."</td>
    <td align='center' class='isi_laporan'>".number_format($row->so_akhir1,0,',','.')."</td>
  </tr>";
			
			$i=$i+1;
		}
		echo "</table></div>";
			
		return "";
	}
	
}
?>
  
