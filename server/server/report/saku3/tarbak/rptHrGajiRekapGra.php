<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_tarbak_rptHrGajiRekapGra extends server_report_basic
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
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$sql="select a.nik,a.nama,c.nama as nama_jab,d.nama as nama_unit,a.bank,a.no_rek,
	   isnull(b.gpok,0) as gpok,isnull(b.konj,0) as konj,isnull(b.tjab,0) as tjab,
	   isnull(b.tsus,0) as tsus,isnull(b.lembur,0) as lembur,isnull(b.ikop,0) as ikop,
	   isnull(b.pkop,0) as pkop,isnull(b.pas,0) as pas,isnull(b.remu,0) as remu,isnull(b.rpl,0) as rpl,
	   isnull(b.remu,0)+isnull(b.tsus,0)+isnull(b.lembur,0)+isnull(b.rpl,0) as pdpt,
	   isnull(b.ikop,0)+isnull(b.pkop,0)+isnull(b.pas,0) as pot
from hr_karyawan a
inner join (select a.nik,a.kode_lokasi,
				sum(case when a.kode_param='GAPOK' then a.nilai else 0 end) as gpok,
				sum(case when a.kode_param='KONJ' then a.nilai else 0 end) as konj,
				sum(case when a.kode_param='TJAB' then a.nilai else 0 end) as tjab,
				sum(case when a.kode_param='TSUS' then a.nilai else 0 end) as tsus,
				sum(case when a.kode_param='LEMBUR' then a.nilai else 0 end) as lembur,
				sum(case when a.kode_param='IKOP' then a.nilai else 0 end) as ikop,
				sum(case when a.kode_param='PKOP' then a.nilai else 0 end) as pkop,
				sum(case when a.kode_param='PAS' then a.nilai else 0 end) as pas,
				sum(case when a.kode_param='REMU' then a.nilai else 0 end) as remu,
				sum(case when a.kode_param='RPL' then a.nilai else 0 end) as rpl
			from hr_gaji_d a
			where a.kode_lokasi='$kode_lokasi' and a.periode='$periode'
			group by a.nik,a.kode_lokasi
			)b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi
inner join hr_jab c on a.kode_jab=c.kode_jab and a.kode_lokasi=c.kode_lokasi
inner join hr_unit d on a.kode_unit=d.kode_unit and a.kode_lokasi=d.kode_lokasi
$this->filter
order by a.kode_unit,a.nama
";
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("GAJI KARYAWAN",$this->lokasi,"");
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1400'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='150'  align='center' class='header_laporan'>NAMA</td>
	  <td width='60'  align='center' class='header_laporan'>NIK</td>
	 <td width='200'  align='center' class='header_laporan'>JABATAN/ POSISI</td>
     <td width='200'  align='center' class='header_laporan'>SUB DIREKTORAT</td>
     <td width='90'  align='center' class='header_laporan'>REMUNERASI</td>
     <td width='90'  align='center' class='header_laporan'>TUNJANGAN KHUSUS</td>
	 <td width='90'  align='center' class='header_laporan'>LEMBUR</td>
	 <td width='90'  align='center' class='header_laporan'>RAPEL</td>
	 <td width='90'  align='center' class='header_laporan'>TOTAL PENDAPATAN</td>
	 <td width='90'  align='center' class='header_laporan'>IURAN  KOPERASI</td>
	 <td width='90'  align='center' class='header_laporan'>POTONGAN KOPERASI</td>
	 <td width='90'  align='center' class='header_laporan'>POTONGAN ASURANSI</td>
	 <td width='90'  align='center' class='header_laporan'>TOTAL POTONGAN</td>
	 <td width='90'  align='center' class='header_laporan'>TOTAL TRANSFER</td>
	  </tr>  ";
		$rem=0; $tsus=0; $lembur=0; $rpl=0; $pdpt=0; $ikop=0; $pkop=0; $pas=0; $pot=0; 
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$remu+=$row->remu;
			$tsus+=$row->tsus;
			$lembur+=$row->lembur;
			$rpl+=$row->rpl;
			$pdpt+=$row->pdpt;
			$ikop+=$row->ikop;
			$pkop+=$row->pkop;
			$pas+=$row->pas;
			$pot+=$row->pot;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>$row->nama</td>
	 <td class='isi_laporan'>$row->nik</td>
	 <td class='isi_laporan'>$row->nama_jab</td>
	 <td class='isi_laporan'>$row->nama_unit</td>
	 <td class='isi_laporan' align='right'>".number_format($row->remu,0,',','.')."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->tsus,0,',','.')."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->lembur,0,',','.')."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->rpl,0,',','.')."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->pdpt,0,',','.')."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->ikop,0,',','.')."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->pkop,0,',','.')."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->pas,0,',','.')."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->pot,0,',','.')."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->pdpt-$row->pot,0,',','.')."</td>
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
     <td class='header_laporan' align='center' colspan='5' >Total</td>
	 <td class='header_laporan' align='right'>".number_format($remu,0,',','.')."</td>
	 <td class='header_laporan' align='right'>".number_format($tsus,0,',','.')."</td>
	 <td class='header_laporan' align='right'>".number_format($lembur,0,',','.')."</td>
	  <td class='header_laporan' align='right'>".number_format($rpl,0,',','.')."</td>
	 <td class='header_laporan' align='right'>".number_format($pdpt,0,',','.')."</td>
	 <td class='header_laporan' align='right'>".number_format($ikop,0,',','.')."</td>
	 <td class='header_laporan' align='right'>".number_format($pkop,0,',','.')."</td>
	 <td class='header_laporan' align='right'>".number_format($pas,0,',','.')."</td>
	 <td class='header_laporan' align='right'>".number_format($pot,0,',','.')."</td>
	 <td class='header_laporan' align='right'>".number_format($pdpt-$pot,0,',','.')."</td>
	 <td class='header_laporan'>$row->bank</td>
	 <td class='header_laporan'>$row->no_rek</td>
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
