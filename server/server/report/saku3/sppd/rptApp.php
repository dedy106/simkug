<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_sppd_rptApp extends server_report_basic
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
		$sql="select a.no_spj,a.nilai_trans,a.nilai_uhar ,e.status,e.form,e.no_app,e.no_bukti,a.no_spj as no_bukti,
		convert(varchar,d.tgl_mulai,103) as tglawal, convert(varchar,d.tgl_selesai,103) as tglakhir,c.nama as pp,b.keterangan,a.tempat, 
		a.nik_spj,a.nama_spj as nik,a.no_app1,convert(varchar,a.tgl_input,120) as tglinput, 
		a.kode_pp,a.nik_app2,a.nik_app1,a.kode_lokasi
		from sp_spj_m a 
		inner join sp_perintah_m b on a.no_perintah = b.no_perintah and a.kode_lokasi=b.kode_lokasi 
		inner join pp c on b.kode_pp=c.kode_pp and b.kode_lokasi=c.kode_lokasi 
		inner join ( 					
			select no_spj,min(tgl_mulai) as tgl_mulai,max(tgl_selesai) as tgl_selesai 
			from sp_spj_dh 
			 group by no_spj 						
		) d on a.no_spj=d.no_spj
inner join sp_spj_app_m e on a.no_spj=e.no_bukti and e.kode_lokasi=a.kode_lokasi  and e.status in ('1','R','Z') and e.form ='APPATS'
$this->filter and a.progress in ('1','R','Z')
order by a.no_spj";
		
		$rs = $dbLib->execute($sql);		
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("data approve",$this->lokasi,"");
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
   <td width='30'  align='center' class='header_laporan'>No</td>
   <td width='150'  align='center' class='header_laporan'>No PD</td>
   <td width='150'  align='center' class='header_laporan'>No App</td>
	  <td width='90'  align='center' class='header_laporan'>NIK App</td>
	 <td width='90'  align='center' class='header_laporan'>Tgl Mulai</td>
     <td width='90'  align='center' class='header_laporan'>Tgl Selesai</td>
     <td width='300'  align='center' class='header_laporan'>PP Perintah</td>
     <td width='200'  align='center' class='header_laporan'>Maksud/Tujuan</td>
	 <td width='150'  align='center' class='header_laporan'>Kota</td>
     <td width='300'  align='center' class='header_laporan'>NIK PD</td>
	 <td width='90'  align='center' class='header_laporan'>Total Transport</td>
	 <td width='90'  align='center' class='header_laporan'>Total Uang Harian</td>
	  </tr>  ";
		$nilai=0;$nilai_ppn=0;$tagihan=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai=$nilai+$row->nilai;
			$nilai_ppn=$nilai_ppn+$row->nilai_ppn;
			$tagihan=$tagihan+$row->tagihan;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>$row->no_spj</td>
	 <td class='isi_laporan'>$row->no_app</td>
	 <td class='isi_laporan'>$row->nik_app1</td>
	 <td class='isi_laporan'>$row->tglawal</td>
	 <td class='isi_laporan'>$row->tglakhir</td>
	 <td class='isi_laporan'>$row->kode_pp - $row->pp</td>
	 <td class='isi_laporan'>$row->keterangan</td>
	 <td class='isi_laporan'>$row->tempat</td>
	 <td class='isi_laporan'>$row->nik_spj - $row->nik</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai_trans,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai_uhar,0,",",".")."</td>
     </tr>";
			$i=$i+1;
		}
	
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
