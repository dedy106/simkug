<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_siaga_hris_rptKrywnV extends server_report_basic
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
		$sql="select a.nik,a.nama,i.nama as status_sdm,date_format(a.tgl_masuk,'%d/%m/%Y') as tgl_masuk,a.kode_grade,date_format(a.tgl_lahir,'%d/%m/%Y') as tgl_lahir,
DATEDIFF(year,a.tgl_lahir,getdate()) as umur,
DATEDIFF(year,a.tgl_masuk,getdate()) as masa_kerja,d.nama as loker,e.nama as dir,f.nama as dept, 	
								   g.nama as jabatan,a.kode_strata,k.nama as nama_jur 
								from gr_karyawan a  
								left join gr_loker d on a.kode_loker=d.kode_loker and a.kode_lokasi=d.kode_lokasi 
								left join gr_dir e on a.kode_dir=e.kode_dir and a.kode_lokasi=e.kode_lokasi 
								left join gr_dept f on a.kode_dept=f.kode_dept and a.kode_lokasi=e.kode_lokasi 
								left join gr_jab g on a.kode_jab=g.kode_jab and a.kode_lokasi=g.kode_lokasi 
								left join gr_status_sdm i on a.sts_sdm=i.sts_sdm and a.kode_lokasi=i.kode_lokasi 
								left join gr_strata j on a.kode_strata=j.kode_strata and a.kode_lokasi=j.kode_lokasi 
								left join gr_jur k on a.kode_jur=k.kode_jur and a.kode_lokasi=k.kode_lokasi 
								left join gr_dinas l on a.nik=l.nik and a.kode_lokasi=l.kode_lokasi and l.flag_aktif='1'
						$this->filter
						order by a.nik ";
							  
							  
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("data karyawan variabel",$this->lokasi,"");
		echo "<table border='1' cellspacing='0' cellpadding='0' colspan='7' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='80'  align='center' class='header_laporan'>NIK</td>
     <td width='200'  align='center' class='header_laporan'>Nama</td>
     <td width='150'  align='center' class='header_laporan'>Status</td>
     <td width='150'  align='center' class='header_laporan'>Tanggal Bekerja</td>
	 <td width='150'  align='center' class='header_laporan'>Tanggal Lahir</td>
     <td width='150'  align='center' class='header_laporan'>Umur</td>
	 <td width='150'  align='center' class='header_laporan'>Masa Kerja</td>
     <td width='150'  align='center' class='header_laporan'>Lokasi Kerja</td>
	 <td width='150'  align='center' class='header_laporan'>Direktorat</td>
     <td width='150'  align='center' class='header_laporan'>Departemen</td>
	 <td width='150'  align='center' class='header_laporan'>Jabatan</td>
     <td width='150'  align='center' class='header_laporan'>Strata</td>
     <td width='150'  align='center' class='header_laporan'>Jurusan</td>
	  </tr>  ";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>$row->nik</td>
	 <td class='isi_laporan'>$row->nama</td>
	 <td class='isi_laporan'>$row->status_sdm</td>
	 <td class='isi_laporan'>$row->tgl_masuk</td>
	 <td class='isi_laporan'>$row->tgl_lahir</td>
	 <td class='isi_laporan'>$row->umur</td>
	 <td class='isi_laporan'>$row->masa_kerja</td>
	 <td class='isi_laporan'>$row->loker</td>
	 <td class='isi_laporan'>$row->dir</td>
	 <td class='isi_laporan'>$row->dept</td>
	 <td class='isi_laporan'>$row->jabatan</td>
 	 <td class='isi_laporan'>$row->kode_strata</td>
	 <td class='isi_laporan'>$row->nama_jur</td>
    </tr>";
			$i=$i+1;
		}
	
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
