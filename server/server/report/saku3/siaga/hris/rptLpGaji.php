<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_siaga_hris_rptLpGaji extends server_report_basic
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
		$periode=$tmp[0];
		$kode_lokasi=$tmp[1];
		$nik_user=$tmp[2];
		
		$sql="select a.nik,a.nama,d.nama as bank,a.cabang,a.no_rek,a.nama_rek,isnull(e.total,0) as total 
		from gr_karyawan a 
		inner join (select distinct x.nik 
					from gr_gaji_d x 
				   )f on  a.nik=f.nik 
		inner join gr_status_bank d on a.sts_bank=d.sts_bank and a.kode_lokasi=d.kode_lokasi 
		left join (select nik,sum(case y.dc when 'D' then x.nilai else -x.nilai end) as total  
				   from gr_gaji_d x 
				   inner join gr_gaji_param y on x.kode_param=y.kode_param and x.kode_lokasi=y.kode_lokasi 
				   where y.jenis='T' 
				   group by x.nik 
				   )e on a.nik=e.nik 
				   $this->filter
		  			order by a.nik";


		
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
	 <td class='isi_laporan'>$row->bank</td>
	 <td class='isi_laporan'>$row->cabang</td>
	 <td class='isi_laporan'>$row->no_rek</td>
	 <td class='isi_laporan'>$row->nama_rek</td>
	<td class='isi_laporan' align='right'>".number_format($row->total,0,',','.')."</td>

    </tr>";	 
			$i=$i+1;
		}
	
		echo "</div>";
		return "";
	}
	
}
?>
  
