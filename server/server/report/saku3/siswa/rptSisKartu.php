<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_siswa_rptSisKartu extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		
		$sql="select count(a.nis)
from sis_siswa a
inner join sis_kelas b on a.kode_kelas=b.kode_kelas and a.kode_lokasi=b.kode_lokasi $this->filter ";
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
		$sql="select a.nis,a.nama,a.kode_kelas,b.nama as nama_kelas,b.kode_tingkat,a.kode_lokasi
from sis_siswa a
inner join sis_kelas b on a.kode_kelas=b.kode_kelas and a.kode_lokasi=b.kode_lokasi $this->filter
order by a.nis ";
	
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("kartu siswa",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table  border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr>
    <td colspan='7' style='padding:3px'><table width='100%'  border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='60' class='header_laporan'>NIS</td>
        <td width='400' class='header_laporan'>: $row->nis</td>
      </tr>
      <tr>
        <td class='header_laporan'>Nama</td>
        <td class='header_laporan'>: $row->nama</td>
      </tr>
      <tr>
        <td class='header_laporan'>Kelas</td>
        <td class='header_laporan'>: $row->kode_kelas - $row->nama_kelas</td>
      </tr>
      <tr>
        <td class='header_laporan'>Tingkat</td>
        <td class='header_laporan'>: $row->kode_tingkat</td>
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
			$sql1="select a.no_bill as no_bukti,b.tanggal,date_format(b.tanggal,'%d/%m/%Y') as tgl,'Invoice '+a.kode_param as keterangan,a.nilai as debet,0 as kredit
from sis_bill_d a
inner join sis_bill_m b on a.no_bill=b.no_bill and a.kode_lokasi=b.kode_lokasi
where a.nis='$row->nis' and a.kode_lokasi='$row->kode_lokasi'
union all
select a.no_rekon as no_bukti,b.tanggal,date_format(b.tanggal,'%d/%m/%Y') as tgl,'Rekon '+a.kode_param as keterangan,0 as debet,a.nilai as kredit
from sis_rekon_d a
inner join sis_rekon_m b on a.no_rekon=b.no_rekon and a.kode_lokasi=b.kode_lokasi
where a.nis='$row->nis' and a.kode_lokasi='$row->kode_lokasi'
order by tanggal ";
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
				<td align='right' class='isi_laporan'>".number_format($row1->debet,0,",",".")."</td>
				<td align='right' class='isi_laporan'>".number_format($row1->kredit,0,",",".")."</td>
				<td align='right' class='isi_laporan'>".number_format($saldo,0,",",".")."</td>
			  </tr>";
			}
			 echo "<tr>
				<td align='center' class='header_laporan' colspan='3'>Total</td>
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
  
