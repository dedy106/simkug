<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_siaga_hris_rptProm extends server_report_basic
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
		$periode=$tmp[0];
		$nama_cab=$tmp[1];
		$sql="select a.nik,b.nama,a.no_sk,a.kode_grade,a.kode_so,a.nik_tg, h.nama as reason,i.nama as grade,k.nama as jab,l.nama as dept,m.nama as dir,a.no_dok,a.kode_kelas,
		n.nama as unit,j.nama as sts,date_format(a.tgl_awal,'%d/%m/%Y') as tgl_mulai
		from gr_dinas a
		 inner join gr_karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi 
		 inner join gr_reason h on a.kode_reason=h.kode_reason and a.kode_lokasi=h.kode_lokasi 
		inner join gr_grade i on a.kode_grade=i.kode_grade and a.kode_lokasi=i.kode_lokasi 
		inner join gr_status_sdm j on a.sts_sdm=j.sts_sdm and a.kode_lokasi=j.kode_lokasi							
		left join gr_jab k on a.kode_jab=k.kode_jab and a.kode_lokasi=k.kode_lokasi							
		left join gr_dept l on a.kode_dept=l.kode_dept and a.kode_lokasi=l.kode_lokasi	
		left join gr_dir m on a.kode_dir=m.kode_dir and a.kode_lokasi=m.kode_lokasi	
		left join gr_loker n on a.kode_loker=n.kode_loker and a.kode_lokasi=n.kode_lokasi	
								
						$this->filter and a.flag_form in ('MUTASI','REKRUT','PROMOSI','RDINAS','NONDINAS')
							  order by a.nik ";

							  $rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("data riwayat kedinasan",$this->lokasi," ");
		echo "<table border='1' cellspacing='0' cellpadding='0' colspan='7' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='80'  align='center' class='header_laporan'>NIK</td>
     <td width='200'  align='center' class='header_laporan'>Nama</td>
     <td width='100'  align='center' class='header_laporan'>Tanggal Mulai</td>	 
     <td width='150'  align='center' class='header_laporan'>No. SK</td>
     <td width='150'  align='center' class='header_laporan'>Reason</td>
     <td width='200'  align='center' class='header_laporan'>Status</td>
     <td width='50'  align='center' class='header_laporan'>Grade</td>
     <td width='50'  align='center' class='header_laporan'>Level</td>
	 <td width='150'  align='center' class='header_laporan'>Jabatan</td>
     <td width='200'  align='center' class='header_laporan'>Unit Kerja</td>
     <td width='200'  align='center' class='header_laporan'>Sub Direktorat</td>
     <td width='200'  align='center' class='header_laporan'>Direktorat</td>
	  </tr>  ";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>$row->nik_tg</td>
	 <td class='isi_laporan'>$row->nama</td>
	 <td class='isi_laporan'>$row->tgl_mulai</td>
	 <td class='isi_laporan'>$row->no_dok</td>
	 <td class='isi_laporan'>$row->reason</td>
	 <td class='isi_laporan'>$row->sts</td>
	 <td class='isi_laporan'>$row->kode_grade</td>
	 <td class='isi_laporan'>$row->kode_kelas</td>
	 <td class='isi_laporan'>$row->jab</td>
	 <td class='isi_laporan'>$row->unit</td>
	 <td class='isi_laporan'>$row->dept</td>
	 <td class='isi_laporan'>$row->dir</td>
     </tr>";
			$i=$i+1;
		}
	
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
