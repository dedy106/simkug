<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_sppd_rptGroupSp extends server_report_basic
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
		$sql="select a.no_spj,a.no_perintah,a.nik_spj+' - '+a.nama_spj as nik 
		,convert(varchar,b.tgl_mulai,103) as tglawal,convert(varchar,c.tgl_selesai,103) as tglakhir 
		,datediff(day,b.tgl_mulai,c.tgl_selesai) + 1 as lama, a.no_app1,a.no_app2, a.nik_app1+' - '+isnull(d.nama,'-') as nik1,
	a.nik_app2+' - '+isnull(e.nama,'-') as nik2, 
		case  when a.progress = '0' then 'PENGAJUAN' 
			   when a.progress = '1' then 'APPROVE ATASAN 1' 
			   when a.progress = 'R' then 'REVISI ATASAN 1' 
			   when a.progress = 'X' then 'REJECT ATASAN 1' 
			   when a.progress = '2' then 'APPROVE ATASAN 2'
			   when a.progress = 'B' then 'REVISI ATASAN 2' 
			   when a.progress = 'Z' then 'REJECT ATASAN 2' 						
		end as progress 
		
		from sp_spj_m a  
		
		inner join ( 
		select no_spj,min(tgl_mulai) as tgl_mulai from sp_spj_dh 
		group by no_spj 
		) b on a.no_spj=b.no_spj 
		
		inner join ( 
		select no_spj,max(tgl_selesai) as tgl_selesai from sp_spj_dh 
		group by no_spj 
		) c on a.no_spj=c.no_spj 

		left join karyawan d on a.nik_app1 = d.nik and a.kode_lokasi=d.kode_lokasi 
		left join karyawan e on a.nik_app2 = e.nik and a.kode_lokasi=e.kode_lokasi 
		
		$this->filter order by a.no_spj";
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("data group surat perintah",$this->lokasi,"");
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='150'  align='center' class='header_laporan'>No Pengajuan</td>
	  <td width='150'  align='center' class='header_laporan'>No SP</td>
	 <td width='300'  align='center' class='header_laporan'>NIK - Nama</td>
     <td width='100'  align='center' class='header_laporan'>Tanggal Berangkat</td>
     <td width='90'  align='center' class='header_laporan'>Tangal Tiba</td>
     <td width='90'  align='center' class='header_laporan'>Lama Hari</td>
	 <td width='300'  align='center' class='header_laporan'>NIK Atasan 1</td>
     <td width='150'  align='center' class='header_laporan'>APP Atasan 1</td>
     <td width='300'  align='center' class='header_laporan'>NIK Atasan 2</td>
     <td width='150'  align='center' class='header_laporan'>APP Atasan 2</td>
	 <td width='150'  align='center' class='header_laporan'>Progress</td>
	  </tr>  ";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>$row->no_spj</td>
	 <td class='isi_laporan'>$row->no_perintah</td>
	 <td class='isi_laporan'>$row->nik</td>
	 <td class='isi_laporan'>$row->tglawal</td>
	 <td class='isi_laporan'>$row->tglakhir</td>
	 <td class='isi_laporan'>$row->lama</td>
	 <td class='isi_laporan'>$row->nik1</td>
	 <td class='isi_laporan'>$row->no_app1</td>
	 <td class='isi_laporan'>$row->nik2</td>
	 <td class='isi_laporan'>$row->no_app2</td>
	 <td class='isi_laporan'>$row->progress</td>
     </tr>";
			$i=$i+1;
		}
	
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
