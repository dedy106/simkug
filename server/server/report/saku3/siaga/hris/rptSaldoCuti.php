<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_siaga_hris_rptSaldoCuti extends server_report_basic
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
		$sts_cuti=$tmp[2];
		$periode_awal=substr($periode,0,4)."01";
		$type_periode = $tmp[3];
		if($type_periode == "<="){
			$filter_periode = " and periode between $periode_awal and $periode ";
		}else{
			$filter_periode = " and periode = '$periode' ";
		}
		$sql="select a.nik,a.nama,b.nama as jabatan,convert(varchar,a.tgl_masuk,103) as tgl_masuk,
	   isnull(c.jumlah,0) as jumlah,isnull(c.tambah,0) as tambah,isnull(c.kurang,0) as kurang,
	   isnull(d.pakai,0) as pakai,isnull(e.closing,0) as closing,
	   isnull(c.jumlah,0)+isnull(c.tambah,0)-isnull(c.kurang,0)-isnull(d.pakai,0)-isnull(e.closing,0) as saldo
from gr_karyawan a
inner join gr_jab b on a.kode_jab=b.kode_jab
inner join (select nik,sum(jumlah) as jumlah,sum(tambah) as tambah,sum(kurang) as kurang
			from gr_cuti_karyawan
			where kode_lokasi='$kode_lokasi' and periode='$periode_awal' and sts_cuti='$sts_cuti'
			group by nik
		  )c on a.nik=c.nik
left join (select a.nik,sum(a.lama) as pakai
			from ( 
				select nik,lama
				from gr_cuti_d
				where kode_lokasi='$kode_lokasi' $filter_periode and sts_cuti='$sts_cuti'
				union all
				select nik_buat as nik,lama+lama_lalu as lama
				from gr_cuti
				where kode_lokasi='$kode_lokasi' $filter_periode and no_cuti not like '%CLS%' and sts_cuti='$sts_cuti'
			) a
			group by a.nik
		  )d on a.nik=d.nik
left join (select nik_buat,sum(lama+lama_lalu) as closing
			from gr_cuti
			where kode_lokasi='$kode_lokasi' $filter_periode and no_cuti like '%CLS%' and sts_cuti='$sts_cuti'
			group by nik_buat
		  )e on a.nik=e.nik_buat
$this->filter
 order by a.nik";
  

	
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("saldo cuti",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1000'>
   <tr bgcolor='#CCCCCC'>
     <td width='30' rowspan='2'  align='center' class='header_laporan'>No</td>
     <td width='90' rowspan='2' align='center' class='header_laporan'>NIK</td>
	 <td width='150' rowspan='2' align='center' class='header_laporan'>Nama</td>
	 <td width='200' rowspan='2' align='center' class='header_laporan'>Jabatan</td>
	 <td width='60' rowspan='2' align='center' class='header_laporan'>Tgl Masuk</td>
   </tr>
   <tr bgcolor='#CCCCCC'>
     <td width='60'  align='center' class='header_laporan'>Hak Cuti Tahun Ini</td>
	 <td width='60' align='center' class='header_laporan'>Sisa Cuti Tahun Lalu</td>
	 <td width='60' align='center' class='header_laporan'>Pemakaian</td>
	 <td width='60' align='center' class='header_laporan'>Pemutihan</td>
	 <td width='60' align='center' class='header_laporan'>Sisa Cuti Tahun Ini</td>
	  </tr>  ";
		$jumlah=0;$tambah=0;$pakai=0;$closing=0;$saldo=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$jumlah+=$row->tagihan;
			$tambah+=$row->tambah;
			$pakai+=$row->pakai;
			$closing+=$row->closing;
			$saldo+=$row->saldo;
		echo "<tr >
		<td class='isi_laporan'>$i</td>
		<td class='isi_laporan'>$row->nik</td>
		<td class='isi_laporan'>$row->nama</td>
		<td class='isi_laporan'>$row->jabatan</td>
		<td class='isi_laporan'>$row->tgl_masuk</td>
		<td align='center' class='isi_laporan'>".number_format($row->jumlah,0,',','.')."</td>
		<td align='center' class='isi_laporan'>".number_format($row->tambah,0,',','.')."</td>
		<td align='center' class='isi_laporan'>".number_format($row->pakai,0,',','.')."</td>
		<td align='center' class='isi_laporan'>".number_format($row->closing,0,',','.')."</td>
		<td align='center' class='isi_laporan'>".number_format($row->saldo,0,',','.')."</td>
		 </tr>";
			$i=$i+1;
		}

		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
