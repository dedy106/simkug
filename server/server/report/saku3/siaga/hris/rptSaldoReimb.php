<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_siaga_hris_rptSaldoReimb extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$sql="select 1 ";
		error_log($sql);
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
		$tahun=$tmp[1];
		$nik=$tmp[2];
		
		$sql="select a.nik,a.nama,a.kode_lokasi,b.nama as nama_jab,
		isnull(c.gg,0) as tgg,isnull(c.kd,0) as tkd,isnull(c.km,0) as tkm,isnull(c.ma,0) as tma, isnull(c.pk,0) as tpk,
		isnull(d.gg,0) as rgg,isnull(d.kd,0) as rkd,isnull(d.km,0) as rkm,isnull(d.ma,0) as rma, isnull(d.pk,0) as rpk, 
		isnull(c.gg,0)-isnull(d.gg,0) as sgg,isnull(c.kd,0)-isnull(d.kd,0) as skd, 
		isnull(c.km,0)-isnull(d.km,0) as skm,isnull(c.ma,0)-isnull(d.ma,0) as sma ,
		isnull(c.pk,0)-isnull(d.pk,0) as spk 
from gr_karyawan a   
inner join gr_jab b on a.kode_jab=b.kode_jab and a.kode_lokasi=b.kode_lokasi
left join (select b.nik,b.kode_lokasi,
				 sum(case a.kode_jenis when 'GG' then a.nilai else 0 end) as gg, 
					sum(case a.kode_jenis when 'KD' then a.nilai else 0 end) as kd, 
					sum(case a.kode_jenis when 'KM' then a.nilai else 0 end) as km, 
					sum(case a.kode_jenis when 'MA' then a.nilai else 0 end) as ma,
					sum(case a.kode_jenis when 'PK' then a.nilai else 0 end) as pk 
			from gr_kes_param a 
			inner join gr_karyawan b on a.kode_grade=substring(b.kode_grade,1,1) and a.kode_lokasi=b.kode_lokasi 
			inner join gr_jab c on b.kode_jab=c.kode_jab and b.kode_lokasi=c.kode_lokasi
			inner join gr_klpjab d on c.kode_klpjab=d.kode_klpjab and a.kode_klpjab=d.kode_klpjab and c.kode_lokasi=d.kode_lokasi
			where a.kode_lokasi='$kode_lokasi' and a.tahun='$tahun' 
			group by b.nik,b.kode_lokasi 
			)c on a.nik=c.nik and a.kode_lokasi=c.kode_lokasi 
 left join (select nik,kode_lokasi,
				   sum(case kode_jenis when 'GG' then nilai else 0 end) as gg, 
				   sum(case kode_jenis when 'KD' then nilai else 0 end) as kd, 
				   sum(case kode_jenis when 'KM' then nilai else 0 end) as km, 
				   sum(case kode_jenis when 'MA' then nilai else 0 end) as ma,
				   sum(case kode_jenis when 'PK' then nilai else 0 end) as pk 
			from gr_kes_d 
			where kode_lokasi='$kode_lokasi' and substring(periode,1,4)='$tahun'		
			group by nik,kode_lokasi 
			)d on a.nik=d.nik and a.kode_lokasi=d.kode_lokasi
$this->filter
order by a.nik ";
		
		$rs = $dbLib->execute($sql);
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("laporan saldo benefit",$this->lokasi,'Tahun '.$tahun);
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' >
		<tr>
		<td align='center'><table border='1' cellspacing='0' cellpadding='0' class='kotak'>
	   <tr bgcolor='#CCCCCC'>
		 <td width='30' rowspan='2'  align='center' class='header_laporan'>No</td>
		 <td width='70' rowspan='2'  align='center' class='header_laporan'>NIK</td>
		 <td width='150' rowspan='2'  align='center' class='header_laporan'>Nama</td>
		 <td width='150' rowspan='2'  align='center' class='header_laporan'>Jabatan</td>
		 <td colspan='5'  align='center' class='header_laporan'>Plafon</td>
		 <td colspan='5'  align='center' class='header_laporan'>Realisasi</td>
		 <td colspan='5'  align='center' class='header_laporan'>Saldo</td>
		 </tr>
	   <tr bgcolor='#CCCCCC'>
		 <td width='70'  align='center' class='header_laporan'>Gigi</td>
		 <td width='70'  align='center' class='header_laporan'>Kedukaan</td>
		 <td width='70'  align='center' class='header_laporan'>Kacamata</td>
		 <td width='70'  align='center' class='header_laporan'>Melahirkan</td>
		 <td width='70'  align='center' class='header_laporan'>Pernikahan</td>
		 <td width='70'  align='center' class='header_laporan'>Gigi</td>
		 <td width='70'  align='center' class='header_laporan'>Kedukaan</td>
		 <td width='70'  align='center' class='header_laporan'>Kacamata</td>
		 <td width='70'  align='center' class='header_laporan'>Melahirkan</td>
		  <td width='70'  align='center' class='header_laporan'>Pernikahan</td>
		 <td width='70'  align='center' class='header_laporan'>Gigi</td>
		 <td width='70'  align='center' class='header_laporan'>Kedukaan</td>
		 <td width='70'  align='center' class='header_laporan'>Kacamata</td>
		 <td width='70'  align='center' class='header_laporan'>Melahirkan</td>
		 <td width='70'  align='center' class='header_laporan'>Pernikahan</td>
	   </tr> ";
			$hna=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$hna+=$row->hna;
			echo "<tr>
			<td class='isi_laporan' align='center'>$i</td>
			<td class='isi_laporan'>$row->nik</td>
			<td class='isi_laporan'>$row->nama</td>
			<td class='isi_laporan'>$row->nama_jab</td>
			<td align='right' class='isi_laporan'>".number_format($row->tgg,0,',','.')."</td>
			<td align='right' class='isi_laporan'>".number_format($row->tkd,0,',','.')."</td>
			<td align='right' class='isi_laporan'>".number_format($row->tkm,0,',','.')."</td>
			<td align='right' class='isi_laporan'>".number_format($row->tma,0,',','.')."</td>
			<td align='right' class='isi_laporan'>".number_format($row->tpk,0,',','.')."</td>
			<td align='right' class='isi_laporan'>".number_format($row->rgg,0,',','.')."</td>
			<td align='right' class='isi_laporan'>".number_format($row->rkd,0,',','.')."</td>
			<td align='right' class='isi_laporan'>".number_format($row->rkm,0,',','.')."</td>
			<td align='right' class='isi_laporan'>".number_format($row->rma,0,',','.')."</td>
			<td align='right' class='isi_laporan'>".number_format($row->rpk,0,',','.')."</td>
			<td align='right' class='isi_laporan'>".number_format($row->sgg,0,',','.')."</td>
			<td align='right' class='isi_laporan'>".number_format($row->skd,0,',','.')."</td>
			<td align='right' class='isi_laporan'>".number_format($row->skm,0,',','.')."</td>
			<td align='right' class='isi_laporan'>".number_format($row->sma,0,',','.')."</td>
			<td align='right' class='isi_laporan'>".number_format($row->spk,0,',','.')."</td>
	
    </tr>";	 
			$i=$i+1;
		}
	
		echo "</div>";
		return "";
	}
	
}
?>
  
