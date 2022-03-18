<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku2_frigia_rptGajiRekap extends server_report_basic
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
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$sql="select a.nik,a.nama,a.jabatan,a.sts_pajak,a.npwp,c.tanggal,datepart(month,c.tanggal) as bulan,datepart(year,c.tanggal) as tahun,
		d.nama as nama_lok,d.npwp as npwp_lok,
	   isnull(b.gpok,0) as gpok,isnull(b.pasu,0) as pasu,isnull(b.phad,0) as phad,isnull(b.pjam,0) as pjam,
	   isnull(b.pkan,0) as pkan,isnull(b.pkes,0) as pkes,isnull(b.pkop,0) as pkop,isnull(b.plain,0) as plain,
	   isnull(b.ppjk,0) as ppjk,isnull(b.tins,0) as tins,isnull(b.tjab,0) as tjab,isnull(b.tjam,0) as tjam,
	   isnull(b.tkel,0) as tkel,isnull(b.tkes,0) as tkes,isnull(b.tlemb,0) as tlemb,isnull(b.ttrans,0) as ttrans,
	   isnull(b.gpok,0)+isnull(b.tjab,0)+isnull(b.tkel,0)+isnull(b.tjam,0)+isnull(b.tins,0)+isnull(b.tlemb,0)+isnull(b.tkes,0)+isnull(b.ttrans,0) as pdpt,
	   isnull(b.padp,0) as padp,isnull(b.ppjk,0) as ppjk,isnull(b.pkan,0) as pkan,isnull(b.phad,0) as phad,isnull(b.pkop,0) as pkop,
	   isnull(b.pkes,0) as pkes,isnull(b.plain,0) as plain,
	   isnull(b.padp,0)+isnull(b.ppjk,0)+isnull(b.pkan,0)+isnull(b.phad,0)+isnull(b.pkop,0)+isnull(b.pkes,0)+isnull(b.plain,0) as pot
	   
from karyawan a 
left join (select a.nik,a.kode_lokasi,a.no_gaji,
				  sum(case a.kode_param when 'GPOK' then isnull(a.nilai,0) else 0 end) as gpok,
				  sum(case a.kode_param when 'PASU' then isnull(a.nilai,0) else 0 end) as pasu,
				  sum(case a.kode_param when 'PHAD' then isnull(a.nilai,0) else 0 end) as phad,
				  sum(case a.kode_param when 'PJAM' then isnull(a.nilai,0) else 0 end) as pjam,
				  sum(case a.kode_param when 'PKAN' then isnull(a.nilai,0) else 0 end) as pkan,
				  sum(case a.kode_param when 'PKES' then isnull(a.nilai,0) else 0 end) as pkes,
				  sum(case a.kode_param when 'PKOP' then isnull(a.nilai,0) else 0 end) as pkop,
				  sum(case a.kode_param when 'PLAIN' then isnull(a.nilai,0) else 0 end) as plain,
				  sum(case a.kode_param when 'PPJK' then isnull(a.nilai,0) else 0 end) as ppjk,
				  sum(case a.kode_param when 'TINS' then isnull(a.nilai,0) else 0 end) as tins,
				  sum(case a.kode_param when 'TJAB' then isnull(a.nilai,0) else 0 end) as tjab,
				  sum(case a.kode_param when 'TJAM' then isnull(a.nilai,0) else 0 end) as tjam,
				  sum(case a.kode_param when 'TKEL' then isnull(a.nilai,0) else 0 end) as tkel,
			      sum(case a.kode_param when 'TKES' then isnull(a.nilai,0) else 0 end) as tkes,
				  sum(case a.kode_param when 'TLEMB' then isnull(a.nilai,0) else 0 end) as tlemb,
				  sum(case a.kode_param when 'TTRANS' then isnull(a.nilai,0) else 0 end) as ttrans,
				  sum(case a.kode_param when 'PADP' then isnull(a.nilai,0) else 0 end) as padp 
			from fri_gaji_d a 
			where a.kode_lokasi='$kode_lokasi' and a.periode='$periode'
			group by a.nik,a.kode_lokasi,a.no_gaji 
			)b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi 
left join fri_gaji_m c on b.no_gaji=c.no_gaji and b.kode_lokasi=c.kode_lokasi
inner join lokasi d on a.kode_lokasi=b.kode_lokasi
where c.kode_lokasi='$kode_lokasi' and c.periode='$periode' ";
		
		
		
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		$AddOnLib=new server_util_AddOnLib();
		$i = 1;
		$path = $_SERVER["SCRIPT_NAME"];				
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("DAFTAR GAJI KOMISARIS, DIREKSI & KARYAWAN",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table width='1800' border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr align='center' bgcolor='#CCCCCC'>
    <td rowspan='3' class='header_laporan' width='20'>NO</td>
    <td rowspan='3' class='header_laporan' width='60'>NIP</td>
    <td rowspan='3' class='header_laporan' width='200'>NAMA</td>
	 <td rowspan='3' class='header_laporan' width='80'>GAJI POKOK</td>
    <td colspan='2' rowspan='2' class='header_laporan'>TUNJANGAN TETAP</td>
    <td colspan='5' rowspan='2' class='header_laporan'>TUNJANGAN TIDAK TETAP</td>
    <td rowspan='3' class='header_laporan' width='80'>TOTAL</td>
    <td colspan='6' class='header_laporan' width='80'>POTONGAN</td>
    <td rowspan='3' class='header_laporan' width='80'>KESEHATAN YANG DITERIMA </td>
    <td rowspan='3' class='header_laporan' width='80'>POTONGAN LAIN-LAIN</td>
    <td rowspan='3' class='header_laporan' width='80'>GAJI BERSIH </td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td rowspan='2' align='center' class='header_laporan'>PAJAK</td>
    <td height='43' colspan='2' align='center' class='header_laporan' width='80'>PREMI ASURANSI DIBAYAR</td>
    <td rowspan='2' align='center' class='header_laporan' width='80'>KANTOR</td>
    <td rowspan='2' align='center' class='header_laporan' width='80'>KEHADIRAN</td>
    <td rowspan='2' align='center' class='header_laporan' width='80'>KOPERASI</td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td align='center' class='header_laporan' width='80'>JABATAN</td>
    <td align='center' class='header_laporan' width='80'>KELUARGA</td>
    <td align='center' class='header_laporan' width='80'>PREMI JAMSOSTEK</td>
    <td align='center' class='header_laporan' width='80'>INSENTIF</td>
    <td align='center' class='header_laporan' width='80'>LEMBUR</td>
    <td align='center' class='header_laporan' width='80'>TRANSPORT</td>
    <td align='center' class='header_laporan' width='80'>KESEHATAN</td>
    <td align='center' class='header_laporan' width='80'>PERUSAHAAN</td>
    <td align='center' class='header_laporan' width='80'>PEKERJA</td>
  </tr>";
		$gpok=0;$tjab=0;$tkel=0;$tjam=0;$tins=0;$tlemb=0;$ttrans=0;$tkes=0;$pdpt=0;
		$ppjk=0;$pjam=0;$padp=0;$pkan=0;$phad=0;$pkop=0;$pkes=0;$plain=0;$bersih=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$gpok=$gpok+$row->gpok;
			$tjab=$tjab+$row->tjab;
			$tkel=$tkel+$row->tkel;
			$tjam=$tjam+$row->tjam;
			$tins=$tins+$row->tins;
			$tlemb=$tlemb+$row->tlemb;
			$ttrans=$ttrans+$row->ttrans;
			$pdpt=$pdpt+$row->pdpt;
			$ppjk=$ppjk+$row->ppjk;
			$pjam=$pjam+$row->pjam;
			$padp=$padp+$row->padp;
			$pkan=$pkan+$row->pkan;
			$phad=$phad+$row->phad;
			$pkop=$pkop+$row->pkop;
			$pkes=$pkes+$row->pkes;
			$plain=$plain+$row->plain;
			$bersih=$bersih+$row->pdpt-$row->pot;
			echo "<tr>
    <td align='center' class='isi_laporan' >$i</td>
    <td class='isi_laporan'>$row->nik</td>
    <td class='isi_laporan'>$row->nama</td>
	<td class='isi_laporan' align='right'>".number_format($row->gpok,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->tjab,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->tkel,0,',','.')."</td>
     <td class='isi_laporan' align='right'>".number_format($row->tjam,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->tins,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->tlemb,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->ttrans,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->tkes,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->pdpt,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->ppjk,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->pjam,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->padp,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->pkan,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->phad,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->pkop,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->pkes,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->plain,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->pdpt-$row->pot,0,',','.')."</td>
  </tr>";

			$i=$i+1;
		}
		echo "<tr>
    <td class='isi_laporan' colspan='3' align='right'>Total</td>
  	<td class='isi_laporan' align='right'>".number_format($gpok,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($tjab,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($tkel,0,',','.')."</td>
     <td class='isi_laporan' align='right'>".number_format($tjam,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($tins,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($tlemb,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($ttrans,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($tkes,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($pdpt,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($ppjk,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($pjam,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($padp,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($pkan,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($phad,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($pkop,0,',','.')."</td>
      <td class='isi_laporan' align='right'>".number_format($pkes,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($plain,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($bersih,0,',','.')."</td>
  </tr>";
		echo "</table></div>";
		
		return "";
	}
	
}
?>
  
