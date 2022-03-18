<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_siaga_hris_gaji_rptLpGaji extends server_report_basic
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
		$periode=$tmp[1];

		$sql="select a.nik,a.nama,a.no_rek,a.nama_rek,a.cabang,g.nama as nama_bank,isnull(b.nilai,0) as nilai
from gr_karyawan a
inner join (select a.nik,a.kode_lokasi,sum(b.nilai) as nilai
			from gr_karyawan a 
			inner join  gr_gaji_d b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi
			$this->filter and b.periode='$periode' and a.flag_gaji<>'HARIAN' and b.kode_param<>'PPPH'
			group by a.nik,a.kode_lokasi
			)b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi
left join gr_jab c on a.kode_jab=c.kode_jab and a.kode_lokasi=c.kode_lokasi
left join gr_loker d on a.kode_loker=d.kode_loker and a.kode_lokasi=d.kode_lokasi
left join gr_dept e on a.kode_dept=e.kode_dept and a.kode_lokasi=e.kode_lokasi
left join gr_dir f on a.kode_dir=f.kode_dir and a.kode_lokasi=f.kode_lokasi
inner join gr_status_bank g on a.sts_bank=g.sts_bank and a.kode_lokasi=g.kode_lokasi
$this->filter 
order by a.nik
 ";


		
		$rs = $dbLib->execute($sql);
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("lampiran gaji",$this->lokasi);
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' >
  <tr bgcolor='#CCCCCC'>
  <td width='30'  align='center' class='header_laporan'>No</td>
  <td width='60'  align='center' class='header_laporan'>NIK</td>
  <td width='200'  align='center' class='header_laporan'>Nama</td>
  <td width='100'  align='center' class='header_laporan'>Bank</td>
  <td width='150'  align='center' class='header_laporan'>Cabang</td>
  <td width='90'  align='center' class='header_laporan'>No Rekening</td>
  <td width='200'  align='center' class='header_laporan'>Nama Rekening</td>
  <td width='90'  align='center' class='header_laporan'>Nilai Transfer</td>

   </tr>";
		$hna=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			// $bruto=$row->pdpt + $row->pdptlain + $row->lmbr + $row->total;
			// $netto=$bruto - $row->b_jab;
			echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
	 <td class='isi_laporan'>$row->nik</td>
	 <td class='isi_laporan'>$row->nama</td>
	 <td class='isi_laporan'>$row->nama_bank</td>
	 <td class='isi_laporan'>$row->cabang</td>
	 <td class='isi_laporan'>$row->no_rek</td>
	 <td class='isi_laporan'>$row->nama_rek</td>
	<td class='isi_laporan' align='right'>".number_format($row->nilai,0,',','.')."</td>

    </tr>";	 
			$i=$i+1;
		}
	
		echo "</div>";
		return "";
	}
	
}
?>
  
