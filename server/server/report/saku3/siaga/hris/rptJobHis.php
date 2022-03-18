<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_siaga_hris_rptJobHis extends server_report_basic
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
		$sql="select a.nip,a.nama,a.sex,date_format(a.tgl_lahir,'%d/%m/%Y') as tgl_lahir,a.kode_strata,n.nama as jurusan,a.univ,b.kode_job,c.nama as nama_job,m.nama as job,
						date_format(b.tanggal,'%d/%m/%Y') as tgl_lamaran,a.no_hp,a.email,date_format(e.tanggal,'%d/%m/%Y') as tgl1,d.hasil as hasil1, 
							   date_format(g.tanggal,'%d/%m/%Y') as tgl2,f.hasil as hasil2,date_format(i.tanggal,'%d/%m/%Y') as tgl3,h.hasil as hasil3, 
							   date_format(k.tanggal,'%d/%m/%Y') as tgl4,j.hasil as hasil4, cc.nik 
						from gr_rekrut_pelamar a 
						inner join gr_rekrut_job_pelamar b on a.nip=b.nip and a.kode_lokasi=b.kode_lokasi 
						inner join gr_rekrut_job c on b.kode_job=c.kode_job and b.kode_lokasi=c.kode_lokasi 
						left join gr_status_didik l on a.sts_didik=l.sts_didik and a.kode_lokasi=l.kode_lokasi 
						left join gr_rekrut_media m on b.kode_media=m.kode_media and b.kode_lokasi=m.kode_lokasi 
						left join gr_karyawan cc on cc.nip = a.nip and a.kode_lokasi = cc.kode_lokasi 
						left join gr_rekrut_seleksi_d d on b.nip=d.nip and b.kode_job=d.kode_job and b.kode_lokasi=d.kode_lokasi and d.kode_proses='1' and d.flag_seleksi<>'X' 
						left join gr_rekrut_seleksi_m e on d.no_seleksi=e.no_seleksi and d.kode_lokasi=e.kode_lokasi 
						left join gr_rekrut_seleksi_d f on b.nip=f.nip and b.kode_job=f.kode_job and b.kode_lokasi=f.kode_lokasi and f.kode_proses='2' and f.flag_seleksi<>'X'
						left join gr_rekrut_seleksi_m g on f.no_seleksi=g.no_seleksi and f.kode_lokasi=g.kode_lokasi 
						left join gr_rekrut_seleksi_d h on b.nip=h.nip and b.kode_job=h.kode_job and b.kode_lokasi=h.kode_lokasi and h.kode_proses='3' and h.flag_seleksi<>'X' 
						left join gr_rekrut_seleksi_m i on h.no_seleksi=i.no_seleksi and h.kode_lokasi=i.kode_lokasi 
						left join gr_rekrut_seleksi_d j on b.nip=j.nip and b.kode_job=j.kode_job and b.kode_lokasi=j.kode_lokasi and j.kode_proses='4' and j.flag_seleksi<>'X' 
						left join gr_rekrut_seleksi_m k on j.no_seleksi=k.no_seleksi and j.kode_lokasi=k.kode_lokasi 
						left join gr_jur n on a.kode_jur=n.kode_jur and a.kode_lokasi=n.kode_lokasi 
						$this->filter
							  order by a.nip ";
							  
							  
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("data history lowongan",$this->lokasi,"");
		echo "<table border='1' cellspacing='0' cellpadding='0' colspan='7' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='80'  align='center' class='header_laporan'>NIP</td>
     <td width='200'  align='center' class='header_laporan'>Nama</td>
     <td width='50'  align='center' class='header_laporan'>L/P</td>
     <td width='150'  align='center' class='header_laporan'>Tgl Lahir</td>
	 <td width='150'  align='center' class='header_laporan'>Pendidikan</td>
	 <td width='150'  align='center' class='header_laporan'>Jurusan</td>
     <td width='150'  align='center' class='header_laporan'>Institusi</td>
	 <td width='100'  align='center' class='header_laporan'>Kode Job</td>
     <td width='200'  align='center' class='header_laporan'>Nama Job</td>
     <td width='150'  align='center' class='header_laporan'>Sumber Kandidat</td>
	 <td width='100'  align='center' class='header_laporan'>Tgl Lamaran</td>
     <td width='90'  align='center' class='header_laporan'>No HP</td>
     <td width='100'  align='center' class='header_laporan'>Email</td>
	 <td width='90'  align='center' class='header_laporan'>Tgl Seleksi Administrasi</td>
     <td width='90'  align='center' class='header_laporan'>Hasil Seleksi Administrasi</td>
     <td width='100'  align='center' class='header_laporan'>Tgl Wawancara I</td>
	 <td width='100'  align='center' class='header_laporan'>Hasil Wawancara I</td>
     <td width='100'  align='center' class='header_laporan'>Tgl Psikotes</td>
	 <td width='100'  align='center' class='header_laporan'>Hasil Psikotes I</td>
     <td width='100'  align='center' class='header_laporan'>Tgl Wawancara 2</td>
	 <td width='100'  align='center' class='header_laporan'>Hasil Wawancara 2</td>
	  </tr>  ";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>$row->nip</td>
	 <td class='isi_laporan'>$row->nama</td>
	 <td class='isi_laporan'>$row->sex</td>
	 <td class='isi_laporan'>$row->tgl_lahir</td>
	 <td class='isi_laporan'>$row->kode_strata</td>
	 <td class='isi_laporan'>$row->jurusan</td>
	 <td class='isi_laporan'>$row->univ</td>
     <td class='isi_laporan'>$row->kode_job</td>
	 <td class='isi_laporan'>$row->nama_job</td>
	 <td class='isi_laporan'>$row->job</td>
	 <td class='isi_laporan'>$row->tgl_lamaran</td>
	 <td class='isi_laporan'>$row->no_hp</td>
	 <td class='isi_laporan'>$row->email</td>
     <td class='isi_laporan'>$row->tgl1</td>
	 <td class='isi_laporan'>$row->hasil1</td>
	 <td class='isi_laporan'>$row->tgl2</td>
	 <td class='isi_laporan'>$row->hasil2</td>
	 <td class='isi_laporan'>$row->tgl3</td>
	 <td class='isi_laporan'>$row->hasil3</td>
	 <td class='isi_laporan'>$row->tgl4</td>
	 <td class='isi_laporan'>$row->hasil4</td>
     </tr>";
			$i=$i+1;
		}
	
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
